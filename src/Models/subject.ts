export class Subject {
    id: number;
    subjectCode: string;
    name: string;
    type: string;
    status: boolean;
    description: string;
    credits: number;
    prerequisite: number | null;
}