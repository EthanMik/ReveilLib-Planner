import { useEffect, useState } from "react";
import Slider from "./Slider";
import play from "../assets/play.svg";
import { Robot } from "../core/Robot";
import { driveDistance, driveToPoint, turnToAngle } from "../core/mikLibSim/DriveMotions";
import { PID } from "../core/mikLibSim/PID";
import { kOdomDrivePID, kOdomHeadingPID, kturnPID } from "../core/mikLibSim/Constants";
import { precomputePath, type PathSim } from "../core/PathSim";
import { usePose } from "../hooks/usePose";
import { clamp } from "../core/Util";

const robot = new Robot(
    -55, // Start x
    -12, // Start y
    110, // Start angle
    14, // Width (inches)
    14, // Height (inches)
    6, // Speed (ft/s)
    16,  // Track Radius (inches)
    15 // Max Accel (ft/s^2)
);

const turnPID = new PID(kturnPID);
const drivePID = new PID(kOdomDrivePID);
const headingPID = new PID(kOdomHeadingPID);

const auton = [
    (robot: Robot, dt: number):boolean =>{return driveToPoint(robot, dt, -23, -24, drivePID, headingPID);},
    (robot: Robot, dt: number):boolean =>{return driveToPoint(robot, dt, -11, -38, drivePID, headingPID);},
    (robot: Robot, dt: number):boolean =>{return driveToPoint(robot, dt, -26, -27, drivePID, headingPID);},
    (robot: Robot, dt: number):boolean =>{return turnToAngle(robot, dt, -139, turnPID);},
    (robot: Robot, dt: number):boolean =>{return driveToPoint(robot, dt, -42, -46, drivePID, headingPID);},
    (robot: Robot, dt: number):boolean =>{return turnToAngle(robot, dt, 270, turnPID);},
    (robot: Robot, dt: number):boolean =>{return driveDistance(robot, dt, 15, robot.getAngle(), drivePID, headingPID);},
    (robot: Robot, dt: number):boolean =>{return driveDistance(robot, dt, -22, robot.getAngle(), drivePID, headingPID);},
];

const path = precomputePath(robot, auton)


export default function PathSimulator() {
    const [time, setTime] = useState<number>(0);
    const [ pose, setPose ] = usePose()

    const setPathPercent = (path: PathSim, percent: number) => {
        if (!path.trajectory.length) return;

        percent = clamp(percent, 0, 100) / 100;

        // Pick the corresponding snapshot on the trajectory
        const idx = Math.floor(percent * (path.trajectory.length - 1));
        const snap = path.trajectory[idx];

        setPose({x: snap.x, y: snap.y, angle: snap.angle})
    }

    useEffect(() => {
        setPathPercent(path, time);
    }, [time])

    return (
        <div className="flex bg-medgray w-[575px] h-[65px] rounded-lg 
            items-center justify-center gap-7"
        >
            <img src={play}/>
            <Slider 
                value={time} 
                setValue={setTime} 
                sliderWidth={400} 
                sliderHeight={8} 
                knobHeight={22} 
                knobWidth={22}/>
            <span className="block">{time.toFixed(1)}</span>
        </div>        
    );
}