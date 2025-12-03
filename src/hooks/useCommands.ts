import type { Command } from "../core/Command";
import { createSharedState } from "../core/SharedState";

export const useCommand = createSharedState<Command[]>([]);