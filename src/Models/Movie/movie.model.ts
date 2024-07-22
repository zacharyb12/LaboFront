import { Person } from "../Person/person.model";

export interface Movie {
    id : number;
    title : string;
    description : string;
    realisatorId : number;
    casting : Person[]
}