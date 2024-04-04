import { SubMajor } from "../Major/submajor";
import { Class } from "../Unit/class";
import { Room } from "../Unit/room";
import { Subject } from "../subject";
import { Semester } from "./semester";

export class Course {
    id: number;
    classs:Class;
    subMajor:SubMajor;
    room:Room;
    semester:Semester;
    subject:Subject;
    name:string;
    days:string;
    status:string;
    slots:string;
}