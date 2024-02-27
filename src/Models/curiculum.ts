import { Subject } from "./subject";

export class Curiculum {
    id: number
    subject: Subject;
    subMajorId: number;
    semester: number;
    createAt: Date;
}