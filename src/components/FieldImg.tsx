import { useCallback, useState } from "react";
import type { Segment } from "../core/Path";
import Field from "./FieldWithMarkers";

export default function FieldContainer({ src, img }: { src: string; img: { x: number, y: number, w: number; h: number } }) {
  const [segment, setSegment] = useState<Segment>({ controls: [] });

  const handleChange = useCallback((next: Segment) => {
    setSegment(next);
  }, []);

  return (
    <Field
      src={src}
      img={img}
      segment={segment}
      onChange={handleChange}
    />
  );
}