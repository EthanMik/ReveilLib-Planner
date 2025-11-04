import { makeId } from "./Util";

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
    controls: Control[];
}