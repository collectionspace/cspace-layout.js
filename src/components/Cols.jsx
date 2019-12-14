import React from 'react';
import Row from './Row';

// An alias of the Row component
export default function Cols(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Row {...props} />
  );
}
