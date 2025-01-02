self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: './public/Icons/897604002bfa46ce8e6b85e039c79499.jpg'
  };
  event.waitUntil(
    self.registration.showNotification('Your App Name', options)
  );
});

self.addEventListener('message', (event) => {
  console.log('Message received from client:', event.data);
  const data = event.data;

  self.registration.showNotification(data.title, {
    body: data.message,
    icon: './public/Icons/897604002bfa46ce8e6b85e039c79499.jpg'
  });
});