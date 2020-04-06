import React from 'react';

const Square = ({ onClick, value, toColor }) => {

    const classNameButton = "square " + toColor;
  return (
    <button className={classNameButton} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;