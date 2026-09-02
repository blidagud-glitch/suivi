import { FormState } from "../types";

export const getSubmissions = async (): Promise<FormState[]> => {
  try {
    const res = await fetch('/api/sessions');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch from API", e);
  }
  // Fallback to local storage if API fails
  const data = localStorage.getItem("aapi_submissions");
  return data ? JSON.parse(data) : [];
};

export const saveSubmission = async (formState: FormState): Promise<void> => {
  try {
    await fetch(`/api/sessions/${formState.sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    });
  } catch (e) {
    console.error("Failed to save to API", e);
  }
  
  // Also save to local storage as fallback
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
    const res = await fetch(`/api/sessions/${sessionId}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch session from API", e);
  }
  // Fallback
  const data = localStorage.getItem("aapi_submissions");
  const submissions: FormState[] = data ? JSON.parse(data) : [];
  return submissions.find(s => s.sessionId === sessionId);
};

export const deleteSubmission = async (sessionId: string): Promise<void> => {
  try {
    await fetch(`/api/sessions/${sessionId}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.error("Failed to delete from API", e);
  }
  // Local fallback
  const data = localStorage.getItem("aapi_submissions");
  if (data) {
    let submissions: FormState[] = JSON.parse(data);
    submissions = submissions.filter(s => s.sessionId !== sessionId);
    localStorage.setItem("aapi_submissions", JSON.stringify(submissions));
  }
};
