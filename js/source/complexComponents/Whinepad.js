import Button from '../components/Button'; // <- for the "add new item"
import Dialog from '../components/Dialog'; // <- to pop the "add new item" form
import Excel from './Excel'; // <- the table of all items
import Form from '../components/Form'; // <- the "add new item" form
import React, {Component, PropTypes} from 'react';

class Whinepad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.initialData,
      addnew: false,
    };

    this._preSearchData = null;
  }

  _addNewDialog() {
    this.setState({addnew: true});
  }

  _addNew(action) {
    if (action === 'dismiss') {
      this.setState({addnew: false});
      return;
    }

    let data = Array.from(this.state.data);
    data.unshift(this.refs.form.getData());
    this.setState({
      addnew: false,
      data: data,
    });

    this._commitToStorage(data);
  }

  _onExcelDataChange(data) {
    this.setState({data: data});
    this._commitToStorage(data);
  }

  _commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  _startSearching() {
    this._preSearchData = this.state.data;
  }

  _doneSearching() {
    this.setState({
      data: this._preSearchData,
    });
  }

  _search(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({data: this._preSearchData});
      return;
    }

    const fields = this.props.schema.map(item => item.id);

    const searchdata = this._preSearchData.filter(row => {
      let fieldName;

      for (let f = 0; f < fields.length; f++) {
        fieldName = fields[f];

        if (fieldName === 'rating') {
          continue;
        }

        if (row[fieldName].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }
      return false;
    });

    this.setState({data: searchdata});
  }

  render() {
    return (
      <div className="Whinepad">

        <div className="WhinepadToolbar">

          {/* toolbars */}
          <div className="WhinepadToolbarAdd">
            <Button
              onClick={this._addNewDialog.bind(this)}
              className="WhinepadToolbarAddButton">
              + add
            </Button>

            <Button
              onClick={() => {
                /**
                 * When Excel::componentWillReceiveProps() is defined then setState() updates Excel data
                 * @see _addNew method too - without Excel::componentWillReceiveProps
                 * new item appears only after page update.
                 * Working with this.state directly updates excel event without Excel::componentWillReceiveProps
                 */
                let data = Array.from(this.state.data);
                //data.unshift(this.refs.form.getData());

                data.splice(0, 1);
                console.log(data);

                this.setState({
                  data: data
                });
              }}
            >
              test
            </Button>
          </div>

          {/* search */}
          <div className="WhinepadToolbarSearch">
            <input
              placeholder="Search..."
              onChange={this._search.bind(this)}
              onFocus={this._startSearching.bind(this)}
              onBlur={this._doneSearching.bind(this)}/>
          </div>
        </div>

        {/* Excel */}
        <div className="WhinepadDatagrid">
          <Excel
            schema={this.props.schema}
            initialData={this.state.data}
            onDataChange={this._onExcelDataChange.bind(this)}/>
        </div>

        {/* addNew dialog render */}
        {this.state.addnew
          ? <Dialog
            modal={true}
            header="Add new item"
            confirmLabel="Add"
            onAction={this._addNew.bind(this)}
          >
            <Form
              ref="form"
              fields={this.props.schema}/>
          </Dialog>
          : null
        }

      </div>
    );
  }
}

Whinepad.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.object
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.object
  ),
};

export default Whinepad;
