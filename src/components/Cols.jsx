import React from 'react';
import PropTypes from 'prop-types';

export default function Cols(props) {
  const {
    children,
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

Cols.propTypes = {
  children: PropTypes.node,
};
