import { makeId } from "./Util";

export class Command {
    public name: string;
    public id: string;

    constructor (name: string) {
        this.name = name;
        this.id = makeId(10)
    }
}