//@flow
import FormInput from './FormInput';
import Rating from './Rating';
import React, {Component, PropTypes} from 'react';

import type {FormInputField, FormInputFieldValue} from "./FormInput";

type FormProps = {
  fields: Array<FormInputField>,
  initialData?: Object,
  readonly?: boolean,
};

// Form.propTypes = {
//   fields: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     type: PropTypes.string,
//     options: PropTypes.arrayOf(PropTypes.string),
//   })).isRequired,
//   initialData: PropTypes.object,
//   readonly: PropTypes.bool,
// };

class Form extends Component<FormProps> {

  props: FormProps;

  // getData() {
  //   let data = {};
  //   this.props.fields.forEach(field =>
  //     data[field.id] = this.refs[field.id].getValue()
  //   );
  //   return data;
  // }

  render() {
    return (
      <form className="Form">
      {this.props.fields.map((field:FormInputField) => {
        // isset behavior - interesting
        const prefilledVal:FormInputFieldValue = (this.props.initialData && this.props.initialData[field.id]) || '';

        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
              <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
              <FormInput {...field} ref={field.id} defaultValue={prefilledVal}/>
            </div>
          );
        }

        if (!prefilledVal) {
          return null;
        }

        // for readonly
        return (
          <div className="FormRow" key={field.id}>
            <span className="FormLabel">{field.label}:</span>
            {/* just an example of anonymous function */}
            {(() => {
              if (field.type === 'rating') {
                  return <Rating readonly={true} defaultValue={parseInt(prefilledVal, 10)}/>;
              } else {
                return <div>{prefilledVal}</div>;
              }
            })()}
{/*
            {
              field.type === 'rating'
                ? <Rating readonly={true} defaultValue={parseInt(prefilledVal, 10)}/>
                : <div>{prefilledVal}</div>
            }
            */}
          </div>
        );
      }, this)}
      </form>
    );
  }
}

// Form.propTypes = {
//   fields: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     type: PropTypes.string,
//     options: PropTypes.arrayOf(PropTypes.string),
//   })).isRequired,
//   initialData: PropTypes.object,
//   readonly: PropTypes.bool,
// };

export default Form;
