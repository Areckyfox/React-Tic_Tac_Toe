import React from 'react';

interface SquareProps {
  onClick: (el: number) => void;
  value: string | null;
  toColor: string | null;
}

const Square: React.FC<SquareProps> = ({ onClick, value, toColor }) => {

    const classNameButton = "square " + toColor;
  return (
    <button className={classNameButton} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;