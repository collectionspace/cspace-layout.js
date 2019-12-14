import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace-layout/Row.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: undefined,
};

export default function Row(props) {
  const {
    children,
  } = props;

  return (
    <div className={styles.normal}>
      {children}
    </div>
  );
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;
