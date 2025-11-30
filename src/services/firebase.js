import admin from 'firebase-admin';
import fs from 'fs';

// already initialized check (assert se bachne ke liye) 
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
        fs.readFileSync('./ecommerceapp-1d0a8-firebase-adminsdk-fbsvc-f049fb2748.json', 'utf8')
    );
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default admin;
