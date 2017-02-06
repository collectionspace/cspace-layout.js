import React, { Component, PropTypes } from 'react';
import styles from '../../styles/cspace-layout/Popup.css';

const propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseLeave: PropTypes.func,

  /**
   * Callback to be executed after the Popup has mounted.
   */
  onMount: PropTypes.func,
};

const defaultProps = {
  tabIndex: '-1',
};

export default class Popup extends Component {
  constructor() {
    super();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    const {
      onMount,
    } = this.props;

    if (onMount) {
      onMount();
    }
  }

  focus() {
    if (this.domNode) {
      this.domNode.focus();
    }
  }

  handleBlur(event) {
    const {
      onBlur,
    } = this.props;

    if (onBlur) {
      onBlur(event);
    }
  }

  handleKeyDown(event) {
    const {
      onKeyDown,
    } = this.props;

    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  render() {
    const {
      children,
      tabIndex,
      onMouseLeave,
    } = this.props;

    // TODO: ARIA

    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div
        className={styles.common}
        ref={this.handleRef}
        tabIndex={tabIndex}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    );
  }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;
