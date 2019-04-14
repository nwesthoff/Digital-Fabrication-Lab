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

class UserSessionStore {
  @observable
  notifications: NotificationInstance[] = [];
  @observable
  isLoggedIn: Boolean = false;
}

const userSessionStore = new UserSessionStore();

export default userSessionStore;
