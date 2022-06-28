import {User} from "./user";

export interface Export {
  id: string,
  timestamp: Date,
  users: User[]
}
