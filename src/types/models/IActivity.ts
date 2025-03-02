import {IExternalParticipant} from "./IExternalParticipant";
import {IReview} from "./IReview";
import {ITag} from "./ITag";
import {ITask} from "./ITask";
import {IVoiceMemo} from "./IVoiceMemo";

export interface IActivity {
  id: string;
  subject: string;
  tags: ITag[];
  externalNote?: string;
  internalNote?: string;
  type: string;
  startTime: string;
  endTime: string;
  voiceMemo?: IVoiceMemo | null;
  review?: IReview | null;
  tasks?: ITask[];
  externalParticipants?: IExternalParticipant[];
  emailSentAt: string;
  createdAt: string;
}
