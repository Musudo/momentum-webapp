import {IInstitution} from "./IInstitution.ts";

export interface IContact {
    id: string;
    firstName: string;
    lastName: string;
    email1: string;
    email2?: string | null
    phone1: string;
    phone2?: string | null;
    jobTitle: string;
    institution: IInstitution;
    institutionId: string;
    createdAt: string;
}
