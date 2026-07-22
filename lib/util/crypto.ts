import argon2 from 'argon2';
import 'server-only';

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('Server configuration error: SECRET_KEY is not defined');
}

const PEPPER_BUFFER = Buffer.from(SECRET_KEY);

/**
 * Creates a secure hash of the provided password using the Argon2id algorithm.
 * @param password The plaintext password to hash.
 * @returns A promise that resolves to the hashed password string.
 */
export async function createPasswordHash(password: string): Promise<string> {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      secret: PEPPER_BUFFER,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verifies a plaintext password against a hashed password.
 * @param hash The hashed password to compare against.
 * @param password The plaintext password to verify.
 * @return A promise that resolves to true if the password is valid, or false if it is not.
 */
export async function verifyPasswordHash(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    const isValid = await argon2.verify(hash, password, {
      secret: PEPPER_BUFFER,
    });
    return isValid;
  } catch (error) {
    console.debug('Error verifying password:', error);
    return false;
  }
}
