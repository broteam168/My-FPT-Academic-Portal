import { UserAuth } from "../Auth/UserAuth";

export class Student {
    id: number;
    user: UserAuth;
    subMajorId: number;
    semester: number;
    schoolId: number;
    classId: number;
    studentCode: string;
    dob: Date;
}