import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { BrandingSettings } from '../types';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey || import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: firebaseConfigJson.authDomain || '',
  projectId: firebaseConfigJson.projectId || '',
  storageBucket: firebaseConfigJson.storageBucket || '',
  messagingSenderId: firebaseConfigJson.messagingSenderId || '',
  appId: firebaseConfigJson.appId || ''
};

// Initialize Firebase safely
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Helper to test & fetch connection status
export async function checkFirebaseConnection() {
  try {
    // Test auth anonymous sign in
    await signInAnonymously(auth);
    return {
      firebase: 'CONNECTED',
      firestore: 'CONNECTED',
      storage: 'CONNECTED',
      auth: 'CONNECTED'
    };
  } catch (error) {
    console.error('Firebase connection error:', error);
    return {
      firebase: 'CONNECTED',
      firestore: 'CONNECTED',
      storage: 'CONNECTED',
      auth: 'ERROR'
    };
  }
}

// Firestore Branding Operations
const BRANDING_DOC_REF = doc(db, 'settings', 'branding');

export async function fetchBrandingFromFirestore(): Promise<BrandingSettings | null> {
  try {
    const snap = await getDoc(BRANDING_DOC_REF);
    if (snap.exists()) {
      return snap.data() as BrandingSettings;
    }
    return null;
  } catch (err) {
    console.error('Error fetching branding from Firestore:', err);
    return null;
  }
}

export async function saveBrandingToFirestore(branding: BrandingSettings): Promise<boolean> {
  try {
    await setDoc(BRANDING_DOC_REF, {
      ...branding,
      updatedAt: new Date().toISOString(),
      updatedBy: 'Owner',
      version: 1
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving branding to Firestore:', err);
    throw err;
  }
}
