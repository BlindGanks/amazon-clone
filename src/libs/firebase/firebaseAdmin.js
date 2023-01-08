import admin from "firebase-admin";
import { firebaseServiceAccount } from "./firebase-creds";

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: firebaseServiceAccount.private_key.replace(/\\n/g, "\n"),
      clientEmail: firebaseServiceAccount.client_email,
      projectId: firebaseServiceAccount.project_id,
    }),
  });
  console.log("Initialized.");
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
