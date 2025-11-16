import type { Coordinate } from "./Path";

export interface Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
}

export const FIELD_REAL_DIMENSIONS: Rectangle = { x: -72, y: 72, w: 144, h: 144 };
export const FIELD_IMG_DIMENSIONS: Rectangle = { x: 0, y: 0, w: 575, h: 575 };

export function addVector2(pos1: Coordinate, pos2: Coordinate) {
    return { x: pos1.x + pos2.x, y: pos1.y + pos2.y};
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function toInch(position: Coordinate, field: Rectangle, img: Rectangle): Coordinate {
    img.y = -img.y
    const sx = field.w / img.w
    const sy = field.h / img.h 

    const dx = field.x + sx * (position.x - img.x)
    const dy = field.y + sy * (position.y - img.y)

    return {x: dx, y: dy}
}

export function toPX(position: Coordinate, field: Rectangle, img: Rectangle): Coordinate {
    img.y = -img.y
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