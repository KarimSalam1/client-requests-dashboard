// Mock auth only — real auth (JWT/session) is out of scope for this exercise.
const KEY = 'loggedIn';

export function isAuthed() {
  return localStorage.getItem(KEY) === 'true';
}

export function login() {
  localStorage.setItem(KEY, 'true');
}

export function logout() {
  localStorage.removeItem(KEY);
}
