import React, {Component, PropTypes} from 'react';

class Suggest extends React.Component {
  getValue() {
    return this.refs.lowLevelInput.value;
  }

  render() {
    const randomId = Math.random().toString(16).substring(2);

    return (
      <div id={randomId} className="Suggest">
        <h5>suggest component stub</h5>
      </div>
    );
  }
}

export default Suggest;