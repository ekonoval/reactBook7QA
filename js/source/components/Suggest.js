import React, {Component, PropTypes} from 'react';

class Suggest extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.defaultValue}
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const randomId = Math.random().toString(16).substring(2);

    return (
      <div className="Suggest">
        <input
          list={randomId}
          id={this.props.id}
          defaultValue={this.props.defaultValue}
          onChange={e => this.setState({value: e.target.value})}
        />

        <datalist id={randomId}>{
          this.props.options.map((item, idx) =>
            <option value={item} key={idx} />
          )
        }</datalist>

      </div>
    );
  }
}

export default Suggest;