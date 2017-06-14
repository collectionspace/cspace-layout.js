import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace-layout/Row.css';

export default function Row(props) {
  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node,
};
