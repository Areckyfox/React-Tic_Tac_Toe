import React from 'react';

const square = props => {
  const { onClick, value } = props;
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default square;