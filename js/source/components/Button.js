/* @flow */

import classNames from 'classnames';
//import React, {PropTypes} from 'react';
import React from 'react';

function Button(props:Object) {
  const cssclasses = classNames('Button', props.className);
  return props.href
    ? <a {...props} className={cssclasses}/>
    : <button {...props} className={cssclasses}/>;
}

Button.propTypes = {
  href: React.PropTypes.string,
};

/* old style alternative

var Button = React.createClass({
  propTypes: {
    href: React.PropTypes.string
  },

  render: function() {
    const cssclasses = classNames('Button', this.props.className);
    return this.props.href
      ? <a {...this.props} className={cssclasses}/>
      : <button {...this.props} className={cssclasses}/>;
  }
});
*/

/* new short way

const Button = props =>
  props.href
    ? <a {...props} className={classNames('Button', props.className)}/>
    : <button {...props} className={classNames('Button', props.className)}/>

Button.propTypes = {
  href: PropTypes.string,
};

*/

export default Button;
