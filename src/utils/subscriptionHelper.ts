export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const VAPID_PUBLIC_KEY = 'BHSYoGVeG1ZeAHLGAvHYbCr72Z3iGiq5CxEkcZCYKYm4L2px0pcqLn-UNI3Y7ggbhBDEdSM_y7CW9sVG-i8cSs4';


export const unsubscribe = async (): Promise<void> => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
    console.log('Successfully unsubscribed from push notifications.');
  }
};

export const subscribe = async (): Promise<void> => {
  const registration = await navigator.serviceWorker.ready;
  const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });
    console.log('Successfully subscribed to push notifications!', subscription);
  } catch (error) {
    console.error('Subscription failed:', error);
  }
};

export async function sendNotification(
  symbol: string,
  price: number,
  change: number
): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    if (!registration.pushManager) {
      console.error('PushManager is not available in this browser.');
      return;
    }

    const notificationData = {
      title: `Stock Alert: ${symbol}`,
      message: `The price has changed by ${change.toFixed(2)}%. Current price: $${price.toFixed(2)}.`,
    };

    registration.active?.postMessage(notificationData);
    console.log('Notification sent to service worker!');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

