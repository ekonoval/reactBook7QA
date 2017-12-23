import React, {Component, PropTypes} from 'react';
import Button from './Button';

class Dialog extends Component {

  constructor() {
    super();
    this.onEscape = this.onEscape.bind(this);
  }

  render() {
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={this.props.modal ? 'DialogModalWrap' : null}>
          <div className="DialogHeader">{this.props.header}</div>
          <div className="DialogBody">{this.props.children}</div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  Cancel
                </span>
              : null
            }
            <Button onClick={this.props.onAction.bind(this,
                this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * @see https://github.com/conorhastings/react-close-on-escape/blob/master/src/index.js
   * @see constructor
   */
  onEscape({keyCode}) {
    if (keyCode === 27) {
      this.props.onAction('dismiss');
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEscape);
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscape);
    document.body.classList.remove('DialogModalOpen');
  }
}

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool,
};

Dialog.defaultProps = {
  confirmLabel: 'ok',
  modal: false,
  onAction: () => {},
  hasCancel: true
};

export default Dialog;