import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
  const { granted } = await Notifications.getPermissionsAsync()

  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }

  if (granted) {
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    console.log('push token', token)
  }
}