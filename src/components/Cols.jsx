import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

// An alias of the Row component
export default function Cols(props) {
  const {
    children,
  } = props;

  return (
    <Row>
      {children}
    </Row>
  );
}

Cols.propTypes = {
  children: PropTypes.node,
};
