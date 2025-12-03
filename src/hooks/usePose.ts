import type { Pose } from "../core/Path";
import { createSharedState } from "../core/SharedState";

export const usePose = createSharedState<Pose | null>(null);