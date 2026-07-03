export type Status = 'New' | 'In Progress' | 'Done';

export interface ClientRequest {
  _id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}
