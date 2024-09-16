import {onRequest} from "firebase-functions/v2/https";
import {firestore } from 'firebase-admin';
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {logger} from"firebase-functions";
import {initializeApp}  from"firebase-admin/app";

initializeApp();

if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log('Using Firestore Emulator');
  firestore().settings({
    host: process.env.FIRESTORE_EMULATOR_HOST,
    ssl: false,
  });
}

exports.createRecord = onRequest(async (req: any, res: any) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).send('Bad Request: Missing or invalid name');
    }

    try {
        const result = await firestore().collection('records').add({ name: name });
        logger.log("Record created", result);
        return res.status(201).send('Record created');
    } catch (error) {
        console.error('Error creating record:', error);
        return res.status(500).send('Internal Server Error');
    }
});

exports.listRecord = onRequest(async (req: any, res: any) => {

  try {
    const snapshot = await firestore().collection('records').get();
    const records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return res.status(200).json(records);
  } catch (error) {
      console.error('Error creating record:', error);
      return res.status(500).send('Internal Server Error');
  }
});

exports.incrementId = onDocumentCreated("/records/{documentId}", async (event: any) => {
  const record = event.data.data();

  const incrementDocRef = firestore().collection('incrementIds').doc('current');
  const snapshot = await incrementDocRef.get();

  let incrementId = 1;

  if (snapshot.exists) {
      const data = snapshot.data();
      if (data && typeof data.currentId === 'number') {
          incrementId = data.currentId + 1;
      }
  }
  logger.log("incrementId", incrementId, record);

  await event.data.ref.set({increment_id: incrementId}, { merge: true });
  await incrementDocRef.set({ currentId: incrementId });
});