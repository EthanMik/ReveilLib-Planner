import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

let globalField: string = "";

let listeners: Dispatch<SetStateAction<string>>[] = [];

function setGlobalField(next: string) {
    globalField = next;
    listeners.forEach((listener) => listener(globalField));
}

export function useField() {
  const [field, setFieldState] = useState<string>(globalField);

  useEffect(() => {
    listeners.push(setFieldState);
    return () => {
      listeners = listeners.filter((l) => l !== setFieldState);
    };
  }, []);

  const setField: Dispatch<SetStateAction<string>> = (next) => {
    if (typeof next === "function") {
      const updater = next as (prev: string) => string;
      const computed = updater(globalField);
      setGlobalField(computed);
    } else {
      setGlobalField(next);
    }
  };

  return { field, setField };
}
