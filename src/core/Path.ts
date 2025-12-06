import { kOdomDrivePID, type PIDConstants } from "./mikLibSim/Constants";
import { makeId } from "./Util";

export interface Coordinate {
    x: number
    y: number
}

export interface Pose {
    x: number | null,
    y: number | null,
    angle: number | null
}

export class Control {
    public id: string;
    public selected: boolean;
    public locked: boolean;
    public visible: boolean;
    
    public position: Coordinate
    public heading: number;
    public turnToPos: Coordinate | null;
    public turnPower: number;
    public drivePower: number;

    constructor(position: Coordinate, heading = 0) {
        this.position = position;
        this.heading = heading;
        this.id = makeId(10);
        this.selected = false;
        this.locked = false;
        this.visible = false;
        this.turnToPos = null;
        this.turnPower = 0;
        this.drivePower = 0;
    }
}

// export abstract class Segment {
//     abstract id: string;
//     abstract selected: boolean;
//     abstract locked: boolean;
//     abstract visible: boolean;
//     abstract pose: Pose;
//     abstract constants: PIDConstants;
// }

// export class PointDriveSegment extends Segment {
//     public id: string;
//     public selected: boolean;
//     public locked: boolean;
//     public visible: boolean;
//     public pose: Pose = { x: null, y: null, angle: null };
//     public constants: PIDConstants;

//     constructor (position: Coordinate) {
//         super();
//         this.id = makeId(10);
//         this.selected = false;
//         this.locked = false;
//         this.visible = true;
//         this.pose.x = position.x;
//         this.pose.y = position.y;
//         this.constants = kOdomDrivePID;
//     }
// }

// export class PoseDriveSegment extends Segment {
//     public id: string;
//     public selected: boolean;
//     public locked: boolean;
//     public visible: boolean;
//     public pose: Pose = { x: null, y: null, angle: null };
//     public constants: PIDConstants;

//     constructor (position: Coordinate) {
//         super();
//         this.id = makeId(10);
//         this.selected = false;
//         this.locked = false;
//         this.visible = true;
//         this.pose.x = position.x;
//         this.pose.y = position.y;
//         this.constants = kOdomDrivePID;
//     }
// }    

// export class PointTurnSegment extends Segment {
//     public id: string;
//     public selected: boolean;
//     public locked: boolean;
//     public visible: boolean;
//     public pose: Pose = { x: null, y: null, angle: null };
//     public constants: PIDConstants;

//     constructor (position: Coordinate) {
//         super();
//         this.id = makeId(10);
//         this.selected = false;
//         this.locked = false;
//         this.visible = true;
//         this.pose.x = position.x;
//         this.pose.y = position.y;
//         this.constants = kOdomDrivePID;
//     }
// }

// export class AngleTurnSegment extends Segment {
//     public id: string;
//     public selected: boolean;
//     public locked: boolean;
//     public visible: boolean;
//     public pose: Pose = { x: null, y: null, angle: null };
//     public constants: PIDConstants;

//     constructor (position: Coordinate) {
//         super();
//         this.id = makeId(10);
//         this.selected = false;
//         this.locked = false;
//         this.visible = true;
//         this.pose.x = position.x;
//         this.pose.y = position.y;
//         this.constants = kOdomDrivePID;
//     }    
// }

// export interface Path {
//     segments: Segment[];
// }

export interface Segment {
    controls: Control[];
}