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
const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/fsDNncq8OME:APA91bF--7fKsN64vQFBRsbaKhniDYMQodBhPLAt1UiiU4tnNez21vaaU-gBqktXpmxDe_SeoJkO2g16qM7qbIPtoEWKiJckZIPf5OLVqv8AJIeCMnTkcuzw9u1-9RYLdkxjQ3g8SwYV", "expirationTime": null, "keys": { "p256dh": "BFuBMeZxTVjAPbCRcDQzLqdAARTpPvm7WqURNuNzEtdLiAyDVXMdnBL7R4X26cmQgRrgx2wdCuhCfmh_yQU-nkY=", "auth": "N8WpeDuIqyQ8lkzce-aiVA==" } }
module.exports = (text) => {
    pushSubscription.keys.p256dh = Buffer.from(pushSubscription.keys.p256dh).toString();
    pushSubscription.keys.auth = Buffer.from(pushSubscription.keys.auth).toString();
    webpush.sendNotification(pushSubscription, text);
}