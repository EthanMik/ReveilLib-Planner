import type { Coordinate } from "./Coordinate";

export interface Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
}

export function toPX(position: Coordinate, field: Rectangle, img: Rectangle): Coordinate {
    const sx = img.w / field.w
    const sy = img.h / field.h 

    const dx = img.x + sx * (position.x - field.x)
    const dy = img.y + sy * (position.y - field.y)

    return {x: dx, y: dy}
}

export function makeId(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}