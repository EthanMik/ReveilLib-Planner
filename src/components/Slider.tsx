import { useRef } from "react";

type SliderProps = {
    value: number,
    setValue?: (value: number) => void; 
}

export default function Slider({value, setValue}: SliderProps) {
const trackRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    let newValue = ((clientX - rect.left) / rect.width) * 100;

    newValue = Math.max(0, Math.min(100, newValue));
    setValue?.(newValue);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const move = (evt: MouseEvent | TouchEvent) => {
      if (evt instanceof TouchEvent) {
        handleMove(evt.touches[0].clientX);
      } else {
        handleMove(evt.clientX);
      }
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", stop);
  };

  return (
    <div
      ref={trackRef}
      style={{
        width: "300px",
        height: "6px",
        background: "#ddd",
        borderRadius: "3px",
        position: "relative",
      }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${value}%`,
          transform: "translate(-50%, -50%)",
          width: "18px",
          height: "18px",
          background: "#007bff",
          borderRadius: "50%",
          cursor: "grab",
        }}
      />
    </div>
  );
}