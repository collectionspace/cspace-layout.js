import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: undefined,
};

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

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;
