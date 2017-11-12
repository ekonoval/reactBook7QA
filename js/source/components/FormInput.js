import React, {Component, PropTypes} from 'react';
import Rating from './Rating';
import Suggest from './Suggest';

class FormInput extends Component {
  render() {
    const common = {
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue
    };

    switch (this.props.type) {
      case 'year':
        return (
          <input
            {...common}
            type="number"
            defaultValue={this.props.defaultValue || new Date().getFullYear()}
          />
        );

      case 'suggest':
        return <Suggest {...common} options={this.props.options}/>;

      case 'rating':
        return <Rating {...common} defaultValue={this.props.defaultValue}/>;
      case 'text':
        return <textarea {...common}/>;
      default:
        return <input {...common} type="text"/>;
    }

    return null;
  }

  getValue() {
    return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
  }
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.any
};

export default FormInput;