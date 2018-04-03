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

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/dOl-zpwjGPI:APA91bFNcS9sps3f1l3-lHCJef5JN2vEzt4P480eqUxhR23f2oGWOWIGJKMx-8qP1csgDUsCpsZ1joO-VImBOf61OSAnqKLyz6L9jwn5OlPQ5vIA5iaHg1BsHGXODR6hRJHqkj3BhKPT", "expirationTime": null, "keys": { "p256dh": "BMuYFZkaPPXW6yzc5vMcalrST4VjmjUjnt55M8ZSO1w8QbjvlpQPN6VScJaAR4V3zxFxS1tL2yhNwouf7sqWSFQ=", "auth": "79RctAB0rDQLX1jki-l4Tg==" } }
module.exports = (text) => {
    pushSubscription.keys.p256dh = Buffer.from(pushSubscription.keys.p256dh).toString();
    pushSubscription.keys.auth = Buffer.from(pushSubscription.keys.auth).toString();
    webpush.sendNotification(pushSubscription, JSON.stringify({title: text}));
}