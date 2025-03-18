import {IExternalParticipant} from "./IExternalParticipant";
import {IReview} from "./IReview";
import {ITag} from "./ITag";
import {ITask} from "./ITask";
import {IVoiceMemo} from "./IVoiceMemo";
import {IInstitution} from "./IInstitution.ts";
import {IContact} from "./IContact.ts";

export interface IActivity {
  id: string;
  subject: string;
  tags: ITag[];
  tagIds: string[];
  contacts: IContact[];
  contactIds: string[];
  institutionId: string;
  institutionName: string;
  externalNote?: string;
  internalNote?: string;
  type: string;
  startTime: string;
  endTime: string;
  voiceMemo?: IVoiceMemo | null;
  review?: IReview | null;
  tasks?: ITask[];
  institution: IInstitution;
  externalParticipants?: IExternalParticipant[];
  emailSentAt: string;
  createdAt: string;
}
