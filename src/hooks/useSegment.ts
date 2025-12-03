import type { Segment } from "../core/Path";
import { createSharedState } from "../core/SharedState";

export const useSegment = createSharedState<Segment>({ controls: [] });