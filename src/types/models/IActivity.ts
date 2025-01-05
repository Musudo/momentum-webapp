import { IContact } from "./IContact";
import { IExternalParticipant } from "./IExternalParticipant";
import { IInstitution } from "./IInstitution";
import { IModel } from "./IModel";
import { IReview } from "./IReview";
import { ITag } from "./ITag";
import { ITask } from "./ITask";
import { IVoiceMemo } from "./IVoiceMemo";

export interface IActivity extends IModel {
  subject: string;
  tags: ITag[];
  externalNote?: string;
  internalNote?: string;
  type: string;
  startTime: string;
  endTime: string;
  voiceMemo?: IVoiceMemo | null;
  review?: IReview | null;
  user: number;
  contacts: IContact[];
  tasks?: ITask[];
  externalParticipants?: IExternalParticipant[];
  institution: IInstitution | null;
  emailSentAt: Date | null;
}
