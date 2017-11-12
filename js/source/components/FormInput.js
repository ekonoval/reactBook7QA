import React, {Component, PropTypes} from 'react';
import Rating from './Rating';
import Suggest from './Suggest';

class FormInput extends Component {
  render(){
    alert("fi");
    return null;
  }
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.any
};

export default FormInput;