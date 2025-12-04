import { createSharedState } from "../core/SharedState";

export const useRobotVisibility = createSharedState<boolean>(false);
