import React, { PropTypes } from 'react';
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
