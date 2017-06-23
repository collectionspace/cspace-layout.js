import React from 'react';
import PropTypes from 'prop-types';

export default function Column(props) {
  const {
    children,
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

Column.propTypes = {
  children: PropTypes.node,
};
