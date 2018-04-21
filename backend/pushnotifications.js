const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
}

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
    'mailto:brandonpereiras@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

/**
 * Method to send push notification to the front-end.
 * @param {Object} payload Payload of notification
 * @param {Object} payload.title Title of notification (required)
 * @param {Object} payload.body Body of notification
 * @param {String} pushSubscription user push subscription
 * @return {Promise}
 */
module.exports = async (payload, pushSubscription) => {
    try {
        pushSubscription = JSON.parse(pushSubscription);
        pushSubscription.keys.p256dh = Buffer.from(pushSubscription.keys.p256dh).toString();
        pushSubscription.keys.auth = Buffer.from(pushSubscription.keys.auth).toString();
    } catch(err) {
        throw new Error("Invalid/Corrupt Push Subscription");
    }
    if (pushSubscription && pushSubscription.keys && pushSubscription.keys.p256dh && pushSubscription.keys.auth && payload && payload.title) {
        payload.badge = "notification-badge.png";
        payload.icon = 'android-chrome-192x192.png';
        return webpush.sendNotification(pushSubscription, JSON.stringify(payload));
    } else {
        throw new Error("Invalid payload or pushsubscription");
    }
}