import { Time } from "@angular/common";
import { Course } from "../Academic/course";

export class Session {
  id: string;
  name: string;
  course:Course;
  status:string;
  startTime:Time;
  endTime:Time;
  dateDay:Date;
  isActive: boolean;
  slot: number;
}
