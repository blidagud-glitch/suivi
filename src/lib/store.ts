import { FormState } from "../types";
import { db } from "./firebase";
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export const getSubmissions = async (): Promise<FormState[]> => {
  try {
    const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as FormState);
  } catch (e) {
    console.error("Failed to fetch from Firestore", e);
    // Fallback if offline or errors
    const data = localStorage.getItem("aapi_submissions");
    return data ? JSON.parse(data) : [];
  }
};

export const saveSubmission = async (formState: FormState): Promise<void> => {
  try {
    const docRef = doc(db, "submissions", formState.sessionId);
    await setDoc(docRef, formState);
  } catch (e) {
    console.error("Failed to save to Firestore", e);
  }
  
  // Also save to local storage as fallback for offline
  const data = localStorage.getItem("aapi_submissions");
  const submissions: FormState[] = data ? JSON.parse(data) : [];
  const index = submissions.findIndex(s => s.sessionId === formState.sessionId);
  if (index !== -1) {
    submissions[index] = formState;
  } else {
    submissions.push(formState);
  }
  localStorage.setItem("aapi_submissions", JSON.stringify(submissions));
};

export const getSubmission = async (sessionId: string): Promise<FormState | undefined> => {
  try {
    const docRef = doc(db, "submissions", sessionId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as FormState;
    }
  } catch (e) {
    console.error("Failed to fetch session from Firestore", e);
  }
  
  // Fallback
  const data = localStorage.getItem("aapi_submissions");
  const submissions: FormState[] = data ? JSON.parse(data) : [];
  return submissions.find(s => s.sessionId === sessionId);
};

export const deleteSubmission = async (sessionId: string): Promise<void> => {
  try {
    const docRef = doc(db, "submissions", sessionId);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Failed to delete from Firestore", e);
  }
  
  // Local fallback
  const data = localStorage.getItem("aapi_submissions");
  if (data) {
    let submissions: FormState[] = JSON.parse(data);
    submissions = submissions.filter(s => s.sessionId !== sessionId);
    localStorage.setItem("aapi_submissions", JSON.stringify(submissions));
  }
};

export const subscribeToSubmissions = (callback: (data: FormState[]) => void) => {
  const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => doc.data() as FormState);
    callback(data);
    // update local storage mirror for offline fallback
    localStorage.setItem("aapi_submissions", JSON.stringify(data));
  }, (error) => {
    console.error("Firebase realtime listener error", error);
  });
};
