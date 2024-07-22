import { Person } from "../Person/person.model";

export interface CreateMovie {

    title : string;
    description : string;
    realisatorId : number;
    casting : Person[];
}