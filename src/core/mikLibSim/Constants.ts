export interface PIDConstants {
    maxSpeed: number;
    minSpeed: number;
    kp: number, 
    ki: number, 
    kd: number, 
    starti: number, 
    settleTime: number, 
    settleError: number, 
    timeout: number
}

export const kturnPID: PIDConstants = {
    maxSpeed: 1,
    minSpeed: 0,
    kp: .4,
    ki: .03,
    kd: 3,
    starti: 15,
    settleTime: 300,
    settleError: 1,
    timeout: 0
}

export const kDrivePID: PIDConstants = {
    maxSpeed: .8,
    minSpeed: 0,
    kp: 1.5,
    ki: 0,
    kd: 10,
    starti: 0,
    settleTime: 300,
    settleError: 1.5,
    timeout: 5000
}

export const kHeadingPID: PIDConstants = {
    maxSpeed: .5,
    minSpeed: 0,
    kp: .4,
    ki: 0,
    kd: 1,
    starti: 0,
    settleTime: 300,
    settleError: 1.5,
    timeout: 5000
}

export const kOdomDrivePID: PIDConstants = {
    maxSpeed: .6,
    minSpeed: 0,
    kp: 1.5,
    ki: 0,
    kd: 10,
    starti: 0,
    settleTime: 300,
    settleError: 3,
    timeout: 5000
}

export const kOdomHeadingPID: PIDConstants = {
    maxSpeed: .8,
    minSpeed: 0,
    kp: .4,
    ki: 0,
    kd: 1,
    starti: 0,
    settleTime: 300,
    settleError: 1.5,
    timeout: 5000
}