// Field.tsx
import React, { useRef } from "react";

type FieldImageProps = {
  src: string;
  width?: number;
  height?: number;
  onCursorMove?: (x: number, y: number) => void;
};

export default function Field({ src, width, height, onCursorMove }: FieldImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handlePointerMove: React.PointerEventHandler<HTMLImageElement> = (e) => {
    if (!imgRef.current || !onCursorMove) return;
    const rect = imgRef.current.getBoundingClientRect();
    onCursorMove(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <img
      ref={imgRef}
      src={src}
      width={width}
      height={height}
      onPointerMove={handlePointerMove}
    />
  );
}
