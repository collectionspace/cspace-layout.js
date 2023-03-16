/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popup from './Popup';
import styles from '../../styles/cspace-layout/Popover.css';

const focus = (component) => {
  if (component) {
    component.focus();
  }
};

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  align: PropTypes.string,
  openDelay: PropTypes.number,
  renderContent: PropTypes.func,
  onBeforeOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  header: undefined,
  align: 'left',
  openDelay: 250,
  renderContent: undefined,
  onBeforeOpen: undefined,
  onBeforeClose: undefined,
};

export default class Popover extends Component {
  constructor() {
    super();

    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleHeaderKeyDown = this.handleHeaderKeyDown.bind(this);
    this.handleHeaderMouseEnter = this.handleHeaderMouseEnter.bind(this);
    this.handleHeaderMouseLeave = this.handleHeaderMouseLeave.bind(this);
    this.handlePopupBlur = this.handlePopupBlur.bind(this);
    this.handlePopupKeyDown = this.handlePopupKeyDown.bind(this);
    this.handlePopupMouseLeave = this.handlePopupMouseLeave.bind(this);

    this.state = {
      open: false,
    };
  }

  handleHeaderClick(event) {
    event.preventDefault();

    this.open();
  }

  handleHeaderKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      this.open();
    }
  }

  handleHeaderMouseEnter() {
    const {
      openDelay,
    } = this.props;

    const {
      open,
    } = this.state;

    if (!open) {
      this.openTimer = setTimeout(() => {
        this.open();
      }, openDelay);
    }
  }

  handleHeaderMouseLeave() {
    this.cancelOpen();
  }

  handlePopupBlur() {
    this.close();
  }

  handlePopupKeyDown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  handlePopupMouseLeave() {
    this.close();
  }

  cancelOpen() {
    if (this.openTimer) {
      window.clearTimeout(this.openTimer);

      this.openTimer = null;
    }
  }

  close() {
    this.cancelOpen();

    const {
      open,
    } = this.state;

    if (open) {
      const {
        onBeforeClose,
      } = this.props;

      if (onBeforeClose) {
        onBeforeClose();
      }

      this.setState({
        open: false,
      });
    }
  }

  open() {
    this.cancelOpen();

    const {
      open,
    } = this.state;

    if (!open) {
      const {
        onBeforeOpen,
      } = this.props;

      if (onBeforeOpen) {
        onBeforeOpen();
      }

      this.setState({
        open: true,
      });
    }
  }

  renderHeader() {
    const {
      header,
    } = this.props;

    return (
      <button
        type="button"
        onClick={this.handleHeaderClick}
        onKeyDown={this.handleHeaderKeyDown}
        onMouseEnter={this.handleHeaderMouseEnter}
        onMouseLeave={this.handleHeaderMouseLeave}
      >
        {header}
      </button>
    );
  }

  renderPopup() {
    const {
      children,
      renderContent,
    } = this.props;

    const {
      open,
    } = this.state;

    if (open) {
      const content = renderContent ? renderContent() : children;

      if (content) {
        return (
          <Popup
            ref={focus}
            tabIndex="0"
            onBlur={this.handlePopupBlur}
            onKeyDown={this.handlePopupKeyDown}
            onMouseLeave={this.handlePopupMouseLeave}
          >
            {content}
          </Popup>
        );
      }
    }

    return null;
  }

  render() {
    const {
      align,
    } = this.props;

    const {
      open,
    } = this.state;

    const classes = classNames(styles.common, styles[align], {
      [styles.open]: open,
    });

    return (
      <div className={classes}>
        {this.renderHeader()}
        {this.renderPopup()}
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;
