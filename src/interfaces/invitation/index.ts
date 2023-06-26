import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  inviter_id: string;
  invitee_email: string;
  role: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  inviter_id?: string;
  invitee_email?: string;
  role?: string;
}
