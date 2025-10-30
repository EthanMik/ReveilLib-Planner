import { FIELD_IMG_DIMENSIONS, FIELD_REAL_DIMENSIONS, makeId, toInch } from "./Util";

export interface Coordinate {
    x: number
    y: number
}

export class Control {
    public id: string;

    public position: Coordinate
    public heading: number;

    constructor(position: Coordinate, heading = 0) {
        this.position = position
        this.heading = heading
        this.id = makeId(10)
    }
}

export interface Segment {
    id: string;
    controls: Control[];
}

export function addControlToSegment(segments: Segment[], segmentId: string, cursorX: number, cursorY: number, heading = 0): Segment[] {
    const posIn = toInch({ x: cursorX, y: cursorY }, FIELD_REAL_DIMENSIONS, FIELD_IMG_DIMENSIONS);
    const control = new Control(posIn, heading);

    return segments.map(s =>
    s.id === segmentId
        ? { ...s, controls: [...s.controls, control] }
        : s
    );
}