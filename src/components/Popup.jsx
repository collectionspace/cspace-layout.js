import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  children: undefined,
  tabIndex: '-1',
  onBlur: undefined,
  onKeyDown: undefined,
  onMouseLeave: undefined,
  onMount: undefined,
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

    return (
      <div
        className={styles.common}
        ref={this.handleRef}
        role="presentation"
        tabIndex={tabIndex}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    );
  }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;
