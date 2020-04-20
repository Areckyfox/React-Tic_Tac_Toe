import React from 'react';

interface SquareProps {
  onClicked: () => void;
  value: string | null;
  toColor: string | null;
}

const Square: React.FC<SquareProps> = ({ onClicked, value, toColor }) => {

    const classNameButton = "square " + toColor;
  return (
    <button className={classNameButton} onClick={onClicked}>
      {value}
    </button>
  );
};

export default Square;