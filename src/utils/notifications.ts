export const askForNotificationPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    }).catch(err => {
      console.error("Failed to obtain notification permission:", err);
    });
  }
};
