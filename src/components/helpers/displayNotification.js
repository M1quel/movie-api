export default function displayNotification (message) {
  if(Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification(message, {
        vibrate: [200, 100, 200, 100, 400]
      })
    })
  }
}