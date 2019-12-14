import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../styles/cspace-layout/Panel.css';
import buttonBarStyles from '../../styles/cspace-layout/PanelButtonBar.css';

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  color: PropTypes.string,
  header: PropTypes.node,
  name: PropTypes.string,
  onToggleCollapsed: PropTypes.func,
};

const defaultProps = {
  buttons: undefined,
  children: undefined,
  className: undefined,
  collapsible: false,
  collapsed: false,
  color: 'black',
  header: undefined,
  name: undefined,
  onToggleCollapsed: undefined,
};

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick() {
    const {
      collapsible,
      collapsed,
      name,
      onToggleCollapsed,
    } = this.props;

    if (collapsible && onToggleCollapsed) {
      onToggleCollapsed(name, !collapsed);
    }
  }

  renderHeader() {
    const {
      buttons,
      collapsible,
      header,
    } = this.props;

    if (!header) {
      return null;
    }

    const content = collapsible
      ? <button type="button" onClick={this.handleHeaderClick}>{header}</button>
      : <div>{header}</div>;

    let buttonBar = null;

    if (buttons && buttons.length > 0) {
      buttonBar = (
        <div className={buttonBarStyles.common}>
          {buttons}
        </div>
      );
    }

    return (
      <header>
        {content}
        {buttonBar}
      </header>
    );
  }

  renderBody() {
    const {
      collapsible,
      collapsed,
      children,
    } = this.props;

    if (collapsible && collapsed) {
      return null;
    }

    return (
      <div>
        {children}
      </div>
    );
  }

  render() {
    const header = this.renderHeader();
    const body = this.renderBody();

    const {
      className,
      collapsible,
      collapsed,
      color,
    } = this.props;

    const classes = classNames(
      className,
      styles.common,
      styles[color],
      (collapsible && collapsed) ? styles.collapsed : '',
    );

    return (
      <section className={classes}>
        {header}
        {body}
      </section>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
