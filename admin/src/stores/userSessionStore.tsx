import { observable } from "mobx";

enum Urgency {
  "DEBUG",
  "INFO",
  "WARN"
}

export interface NotificationInstance {
  message: string;
  urgency?: Urgency;
  autoHideDuration?: number;
}

class userSessionStore {
  @observable
  notifications: NotificationInstance[] = [];
}

const UserSessionStore = new userSessionStore();

export default UserSessionStore;
