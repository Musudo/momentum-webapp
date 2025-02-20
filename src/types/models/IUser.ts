import {IActivity} from "./IActivity";
import {IInstitution} from "./IInstitution";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  activities: IActivity[];
  institutions: IInstitution[];
}
