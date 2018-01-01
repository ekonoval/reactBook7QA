//@flow
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import Actions from '../components/Actions';
import Dialog from '../components/Dialog';
import Form from '../components/Form';
import FormInput from '../components/FormInput';
import Rating from '../components/Rating';

import invariant from 'invariant';

type Data = Array<Object>;

type Props = {
  schema: Array<Object>,
  initialData: Data,
  onDataChange: Function,
};

type State = {
  data: Data,
  sortby: ?string, // schema.id
  descending: boolean,
  edit: ?EditState,
  dialog: ?DialogState
};

type EditState = {
  row: number,
  key: string
}

type DialogState = {
  idx: number,
  type: string
}

// Excel.propTypes = {
//   schema: PropTypes.arrayOf(
//     PropTypes.object
//   ),
//   initialData: PropTypes.arrayOf(
//     PropTypes.object
//   ),
//   onDataChange: PropTypes.func,
// };
//
// Excel.defaultProps = {
//   onDataChange: () => {}
// };

class Excel extends Component<Props, State> {

  props: Props;
  state: State;

  static defaultProps = {
    onDataChange: () => {}
  };

  constructor(props:Props) {
    super(props);

    this.state = {
      data: this.props.initialData,
      sortby: null, // schema.id
      descending: false,
      edit: null, // [row index, schema.id],
      dialog: null, // {type, idx}
    };
  }

  componentWillReceiveProps(nextProps:Props) {
    this.setState({data: nextProps.initialData});
  }

  _fireDataChange(data:Data) {
    this.props.onDataChange(data);
  }

  _sort(key:string) {
    let data = Array.from(this.state.data);
    const descending = this.state.sortby === key && !this.state.descending;
    data.sort(function (a, b) {
      return descending
        ? (a[key] < b[key] ? 1 : -1)
        : (a[key] > b[key] ? 1 : -1);
    });
    this.setState({
      data: data,
      sortby: key,
      descending: descending,
    });
    this._fireDataChange(data);
  }

  _showEditor(e:Event) {
    const target = ((e.target:any):HTMLElement);

    this.setState({
      edit: {
        row: parseInt(target.dataset.row, 10),
        key: target.dataset.key,
      }
    });
  }

  _save(e:Event) {
    e.preventDefault();
    const value = this.refs.input.getValue();
    let data = Array.from(this.state.data);
    invariant(this.state.edit, 'Messed up edit state');
    data[this.state.edit.row][this.state.edit.key] = value;
    this.setState({
      edit: null,
      data: data,
    });
    this._fireDataChange(data);
  }

  _editorKeyDown(e:Event) {
    // escape
    if (e.keyCode === 27) {
      this.setState({edit: null});
    }
  }

  _actionClick(rowidx:number, action:string, p3:any) {
    // console.log(arguments);
    // console.log(rowidx, action);
    this.setState({dialog: {type: action, idx: rowidx}});
  }

  _deleteConfirmationClick(action:string) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data.splice(this.state.dialog.idx, 1);
    this.setState({
      dialog: null,
      data: data,
    });
    this._fireDataChange(data);
  }

  _closeDialog() {
    this.setState({dialog: null});
  }

  _saveDataDialog(action) {
    if (action === 'dismiss') {
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data[this.state.dialog.idx] = this.refs.form.getData();
    this.setState({
      dialog: null,
      data: data,
    });
    this._fireDataChange(data);
  }

  render() {
    return (
      <div className="Excel">
        {this._renderTable()}
        {this._renderDialog()}
      </div>
    );
  }

  _renderDialog() {
    if (!this.state.dialog) {
      return null;
    }

    switch (this.state.dialog.type) {
      case 'delete':
        return this._renderDeleteDialog();
      case 'info':
        return this._renderFormDialog(true);
      case 'edit':
        return this._renderFormDialog();
      default:
        throw Error(`Unexpected dialog type ${this.state.dialog.type}`);
    }
  }

  _renderDeleteDialog() {
    const row = this.state.data[this.state.dialog.idx];
    const nameguess = row[Object.keys(row)[0]];

    return (
      <Dialog
        modal={true}
        header="Confirm deletion"
        confirmLabel="Delete"
        onAction={this._deleteConfirmationClick.bind(this)}
      >
        {`Are you sure you want to delete "${nameguess}"?`}
        {/*Are you sure you want to delete "{nameguess}"?*/}
      </Dialog>
    );
  }

  _renderFormDialog(readonly) {
    return (
      <Dialog
        modal={true}
        header={readonly ? 'Item info' : 'Edit item'}
        confirmLabel={readonly ? 'ok' : 'Save'}
        hasCancel={!readonly}
        onAction={this._saveDataDialog.bind(this)}
      >
        <Form
          ref="form" // pay attention here - not defined as property
          fields={this.props.schema}
          initialData={this.state.data[this.state.dialog.idx]}
          readonly={readonly}/>
      </Dialog>
    );
  }

  _renderTable() {
    return (
      <table>
        <thead>
        <tr>{
          this.props.schema.map(item => {
            if (!item.show) {
              return null;
            }

            let title = item.label;
            if (this.state.sortby === item.id) {
              title += this.state.descending ? ' \u2191' : ' \u2193';
            }
            
            return (
              <th
                className={`schema-${item.id}`}
                key={item.id}
                onClick={this._sort.bind(this, item.id)}
              >
                {title}
              </th>
            );
          }, this)
        }
          <th className="ExcelNotSortable">Actions</th>
        </tr>
        </thead>

        <tbody onDoubleClick={this._showEditor.bind(this)}>
        {/* iterate over state.data */}
        {this.state.data.map((row, rowidx) => {
          return (
            <tr key={rowidx}>{
              // iterate over row.keys
              Object.keys(row).map((cell, idx) => {
                const schemaCell = this.props.schema[idx];

                if (!schemaCell || !schemaCell.show) {
                  return null;
                }

                // composing each cell content
                const isRating = schemaCell.type === 'rating';
                const edit = this.state.edit;
                let content = row[cell];

                if (
                  !isRating
                  && edit && edit.row === rowidx
                  && edit.key === schemaCell.id
                ) {
                  content = (
                    <form onSubmit={this._save.bind(this)} onKeyDown={this._editorKeyDown.bind(this)}>
                      <FormInput ref="input" {...schemaCell} defaultValue={content}/>
                    </form>
                  );
                } else if (isRating) {
                  content = <Rating readonly={true} defaultValue={Number(content)}/>;
                }

                return (
                  <td
                    className={classNames({
                      [`schema-${schemaCell.id}`]: true,
                      'ExcelEditable': !isRating,
                      'ExcelDataLeft': schemaCell.align === 'left',
                      'ExcelDataRight': schemaCell.align === 'right',
                      'ExcelDataCenter': schemaCell.align !== 'left' &&
                      schemaCell.align !== 'right',
                    })}
                    key={idx}
                    data-row={rowidx}
                    data-key={schemaCell.id}>
                    {content}
                  </td>
                );
              }, this)}
              <td className="ExcelDataCenter">
                {/* automatically appends onAction - `type` param + some internal stuff */}
                {/*<Actions onAction={this._actionClick.bind(this, rowidx)}/>*/}

                {/* more detailed method - no additional auto params are appended */}
                <Actions onAction={(type) => {
                  this._actionClick(rowidx, type); // pay attention not like below
                  //this._actionClick.bind(this, rowidx, type)
                }}/>
              </td>
            </tr>
          );
        }, this)}
        </tbody>
      </table>
    );
  }

}

// Excel.propTypes = {
//   schema: PropTypes.arrayOf(
//     PropTypes.object
//   ),
//   initialData: PropTypes.arrayOf(
//     PropTypes.object
//   ),
//   onDataChange: PropTypes.func,
// };
//
// Excel.defaultProps = {
//   onDataChange: () => {}
// };


export default Excel;
