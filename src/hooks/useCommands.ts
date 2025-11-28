import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Command } from "../core/Path";

let globalCommands: Command[] = [];

let listeners: Array<Dispatch<SetStateAction<Command[]>>> = [];

function setGlobalCommand(next: Command[]) {
  globalCommands = next;
  listeners.forEach((listener) => listener(globalCommands));
}

export function useCommand() {
  const [commands, setCommandState] = useState<Command[]>(globalCommands);

  useEffect(() => {
    listeners.push(setCommandState);
    return () => {
      listeners = listeners.filter((l) => l !== setCommandState);
    };
  }, []);

  const setCommand: Dispatch<SetStateAction<Command[]>> = (next) => {
    if (typeof next === "function") {
      const updater = next as (prev: Command[]) => Command[];
      const computed = updater(globalCommands);
      setGlobalCommand(computed);
    } else {
      setGlobalCommand(next);
    }
  };

  return { commands, setCommand };
}
