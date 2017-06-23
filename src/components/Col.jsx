import React from 'react';
import PropTypes from 'prop-types';

export default function Col(props) {
  const {
    children,
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

Col.propTypes = {
  children: PropTypes.node,
};
