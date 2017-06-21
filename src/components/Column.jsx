import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../styles/cspace-layout/Column.css';

export default function Column(props) {
  const {
    right,
    left,
    children,
  } = props;

  const classes = classNames(
    styles.normal, right ? styles.right : '', left ? styles.left : ''
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Column.propTypes = {
  children: PropTypes.node,
  right: PropTypes.bool,
  left: PropTypes.bool,
};
