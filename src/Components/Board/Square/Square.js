import React from 'react';

const Square = (props) => {
  const { onClick, value, toColor } = props;
  const classNameButton = "square " + toColor;
  return (
    <button className={classNameButton} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;