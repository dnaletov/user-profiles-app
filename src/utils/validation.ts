export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): void {
  if (!email.trim()) {
    throw new Error("Email cannot be empty");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
}

export function validatePassword(password: string): void {
  if (!password.trim()) {
    throw new Error("Password cannot be empty");
  }
}
