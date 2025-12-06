import type { PathFormat } from "../formats/PathFormat";
import { kHeadingPID, kOdomDrivePID, kOdomHeadingPID, kturnPID } from "./mikLibSim/Constants";
import { driveToPoint, turnToPoint } from "./mikLibSim/DriveMotions";
import { PID } from "./mikLibSim/PID";
import type { Path } from "./Path";
import type { Robot } from "./Robot";


export function convertPathtoSim(path: Path): ((robot: Robot, dt: number) => boolean)[] {
    const turnPID = new PID(kturnPID);
    const drivePID = new PID(kOdomDrivePID);
    const headingPID = new PID(kOdomHeadingPID);
    
    const auton: ((robot: Robot, dt: number) => boolean)[] = [];

    for (let idx = 0; idx < path.segments.length; idx++) {
        const control = path.segments[idx];

        if (idx === 0) {
            auton.push(
                (robot: Robot, dt: number): boolean => { 
                    return robot.setPose(control.pose.x, control.pose.y, control.pose.angle);
                }
            )
            continue;
        }

        auton.push(
            (robot: Robot, dt: number): boolean => { 
                drivePID.update(kOdomDrivePID);
                headingPID.update(kHeadingPID);
                return driveToPoint(robot, dt, control.pose.x, control.pose.y, drivePID, headingPID);
            }
        );
        
        if (control.turnToPos !== null) {
            auton.push(
                (robot: Robot, dt: number): boolean => { 
                    turnPID.update(kturnPID);
                    return turnToPoint(robot, dt, control.pose.x, control.pose.y, 0, turnPID);
                }
                );            
        }
    }
        
    return auton;
}

export function convertPath(path: Path, pathFormat: PathFormat): string {
    // let pathString: string = '';

    // for (let idx = 0; idx < path.segments.length; idx++) {
    //     const control = path.segments[idx];

    //     if (idx === 0) {
    //         pathString += pathFormat.startToString(control.position, control.heading);
    //         continue;
    //     }

    //     pathString += pathFormat.driveToString(control.position, control.drivePower / 100, '', true);
    //     if (control.turnToPos !== null) {
    //         pathString += pathFormat.turnToString(control.turnToPos, control.turnPower / 100, '', true);
    //     }
    // }
    
    // return pathString;
    return ""
}