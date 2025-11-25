import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

let globalCommands: string[] = [];

let listeners: Array<Dispatch<SetStateAction<string[]>>> = [];

function setGlobalCommand(next: string[]) {
  globalCommands = next;
  listeners.forEach((listener) => listener(globalCommands));
}

export function useCommand() {
  const [commands, setCommandState] = useState<string[]>(globalCommands);

  useEffect(() => {
    listeners.push(setCommandState);
    return () => {
      listeners = listeners.filter((l) => l !== setCommandState);
    };
  }, []);

  const setCommand: Dispatch<SetStateAction<string[]>> = (next) => {
    if (typeof next === "function") {
      const updater = next as (prev: string[]) => string[];
      const computed = updater(globalCommands);
      setGlobalCommand(computed);
    } else {
      setGlobalCommand(next);
    }
  };

  return { commands, setCommand };
}
