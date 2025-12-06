import type { Path } from "../core/Path";
import { createSharedState } from "../core/SharedState";

const saved = localStorage.getItem("path");
const initialData = saved ? JSON.parse(saved) : { segments: [] };

export const usePath = createSharedState<Path>({segments: []});