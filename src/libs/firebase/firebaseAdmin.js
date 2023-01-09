import { initializeApp } from "firebase-admin";
import { getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseServiceAccount } from "./firebase-creds";
let app =
  !getApp("admin-app") &&
  initializeApp({
    credential: admin.credential.cert(
      {
        privateKey: firebaseServiceAccount.private_key.replace(/\\n/g, "\n"),
        clientEmail: firebaseServiceAccount.client_email,
        projectId: firebaseServiceAccount.project_id,
      },
      "admin-app"
    ),
  });

const adminFirestore = getFirestore(app);

export default adminFirestore;
