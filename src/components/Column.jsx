import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../styles/cspace-layout/Column.css';

const propTypes = {
  children: PropTypes.node,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

export default class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      right,
      left,
      children,
    } = this.props;

    const classes = classNames(
      styles.normal, right ? styles.right : '', left ? styles.left: ''
    );

    return (
      <div className={classes}>
        {children}
      </div>
    );
  };
}

Column.propTypes = propTypes;

