import admin from './firebase.js';

export const sendNotification = async (fcmToken, title, body, data = {}) => {
    try {
        const message = {
            notification: {
                title: title,
                body: body,
            },
            data: Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, String(value)])
            ),
            token: fcmToken,
        };
        await admin.messaging().send(message);
        console.log("Notification sent successfully");
    } catch (error) {
        console.log("Error sending notification", error);
    }
};