import userSessionStore from "stores/userSessionStore";

const createNotification = (message: string, autoHideDuration?: number) => {
  userSessionStore.notifications.push({
    message,
    autoHideDuration
  });
};

export default createNotification;
