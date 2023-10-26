import { useState } from 'react';

const useDraggable = () => {
    
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleDragStart = (e) => {
    setDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleDrag = (e) => {
    if (!dragging) return;

    const dx = (e.clientX - startX) * 0.3;
    const dy = (e.clientY - startY) * 0.3;

    setOffsetX((prevOffsetX) => prevOffsetX + dx);
    setOffsetY((prevOffsetY) => prevOffsetY + dy);

    setStartX(e.clientX);
    setStartY(e.clientY);
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    e.preventDefault();
  };

  return {
    handleDragStart,
    handleDrag,
    handleDragEnd,
    offsetX,
    offsetY,
  };
};

export default useDraggable;