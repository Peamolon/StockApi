self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/Icons/897604002bfa46ce8e6b85e039c79499.jpg'
  });
});