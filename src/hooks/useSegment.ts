import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Segment } from "../core/Path";

let globalSegment: Segment = { controls: [] };

let listeners: Array<Dispatch<SetStateAction<Segment>>> = [];

function setGlobalSegment(next: Segment) {
  globalSegment = next;
  listeners.forEach((listener) => listener(globalSegment));
}

export function useSegment() {
  const [segment, setSegmentState] = useState<Segment>(globalSegment);

  useEffect(() => {
    listeners.push(setSegmentState);
    return () => {
      listeners = listeners.filter((l) => l !== setSegmentState);
    };
  }, []);

  const setSegment: Dispatch<SetStateAction<Segment>> = (next) => {
    if (typeof next === "function") {
      const updater = next as (prev: Segment) => Segment;
      const computed = updater(globalSegment);
      setGlobalSegment(computed);
    } else {
      setGlobalSegment(next);
    }
  };

  return { segment, setSegment };
}
