import re

with open('src/lib/store.ts', 'r') as f:
    content = f.read()

# Make deleteSubmission more robust and log to alert for testing
old_delete = """export const deleteSubmission = async (sessionId: string): Promise<void> => {
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
};"""

new_delete = """export const deleteSubmission = async (sessionId: string): Promise<void> => {
  try {
    const docRef = doc(db, "submissions", sessionId);
    await deleteDoc(docRef);
  } catch (e: any) {
    console.error("Failed to delete from Firestore", e);
    alert("Erreur de suppression Firestore: " + e.message);
  }
  
  // Local fallback
  const data = localStorage.getItem("aapi_submissions");
  if (data) {
    let submissions: FormState[] = JSON.parse(data);
    submissions = submissions.filter(s => s.sessionId !== sessionId);
    localStorage.setItem("aapi_submissions", JSON.stringify(submissions));
  }
};"""

content = content.replace(old_delete, new_delete)
with open('src/lib/store.ts', 'w') as f:
    f.write(content)
