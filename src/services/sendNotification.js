import admin from './firebase.js';

export const sendNotification = async (fcmToken, title, body, data = {}) => {
    try {
        const message = {
            notification: {
                title: title,
                body: body,
            },
            data,
            token: fcmToken,
        };
        await admin.messaging().send(message);
        console.log("Notification sent successfully");
    } catch (error) {
        console.log("Error sending notification", error);
    }
};