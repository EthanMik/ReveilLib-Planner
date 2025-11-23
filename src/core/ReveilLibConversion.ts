import type { PathFormat } from "../formats/PathFormat";
import type { Segment } from "./Path";

export function convertPath(path: Segment, pathFormat: PathFormat): string {
    let pathString: string = '';

    for (let idx = 0; idx < path.controls.length; idx++) {
        const control = path.controls[idx];

        if (idx === 0) {
            pathString += pathFormat.startToString(control.position, control.heading);
            continue;
        }

        pathString += pathFormat.driveToString(control.position, control.drivePower / 100, '', true);
        if (control.turnToPos !== null) {
            pathString += pathFormat.turnToString(control.turnToPos, control.turnPower / 100, '', true);
        }
    }
    
    return pathString;
}