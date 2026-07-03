// Mock auth only — real auth (JWT/session) is out of scope for this exercise.
// Any non-empty username/password "logs in"; we just remember the username.
const KEY = 'username';

export function isAuthed() {
  return localStorage.getItem(KEY) !== null;
}

export function getUsername() {
  return localStorage.getItem(KEY) ?? '';
}

export function login(username: string) {
  localStorage.setItem(KEY, username);
}

export function logout() {
  localStorage.removeItem(KEY);
}
