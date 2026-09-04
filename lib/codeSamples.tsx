/**
 * @module codeSamples
 * @description This module defines the structure and content of code samples to be displayed in the portfolio website. Each code sample includes a code snippet, programming language, title, file name, description, and an associated icon. The code samples are organized in a record object for easy access and rendering within the application.
 */

export type CodeSample = {
  code: string;
  language: 'python' | 'tsx' | 'ts' | 'sql';
  title: string;
  fileName: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
};

/**
 * A record object containing multiple code samples, each identified by a unique key. Each code sample includes a code snippet, programming language, title, file name, description, and an associated icon. This data structure allows for easy access and rendering of code examples within the portfolio website, showcasing the individual's coding skills and experience across different programming languages and projects.
 */
const codeSamples: Record<string, CodeSample> = {
  sample1: {
    code: `
/**
 * Create a new locker item for the specified locker.
 * @param lockerId The ID of the locker to add the item to.
 * @param encryptedData The encrypted data for the locker item.
 * @param data The metadata for the locker item, including category and title.
 * @returns {Promise<ActionState<{ lockerId: string; itemId: string }>>} The action state containing the locker ID and the newly created item ID.
 */
export async function handleCreateLockerItem(
  lockerId: string,
  encryptedData: EncryptedData, // The encrypted data from the client
  data: { category: string; title: string },
): Promise<ActionState<{ lockerId: string; itemId: string }>> {
  const status = await getCurrentUser();
  if (!status.success) {
    return { success: false, error: 'User not authenticated', type: 'UNAUTHORIZED' };
  }
  const currentUser = status.data;
  if (!currentUser) {
    return { success: false, error: 'User not authenticated', type: 'UNAUTHORIZED' };
  }
  // Verify locker ownership
  const locker = await getLockerById(lockerId);
  if (!locker.success || !locker.data) {
    return { success: false, error: 'Locker not found', type: 'NOT_FOUND' };
  }
  // Save the encrypted data to the database without ever exposing plaintext to the server
  const result = await createLockerItem(lockerId, currentUser.id, {
    category: data.category,
    title: data.title,
    iv: new Uint8Array(encryptedData.iv),
    tag: new Uint8Array(encryptedData.tag),
    ownerId: currentUser.id!,
    ciphertext: new Uint8Array(encryptedData.ciphertext),
    lockerId: lockerId,
    isCompromised: false,
    lastScan: null,
  });

  if (!result.success) {
    return { success: false, error: 'Failed to create locker item', type: 'SERVER_ERROR' };
  }
  
  revalidatePath(\`/locker/\${lockerId}\`);
  revalidatePath(\`/locker/\${lockerId}/item/\${result.data.itemId}\`);
  return { success: true, data: { lockerId: lockerId, itemId: result.data?.itemId || '' } };
} 
    `,
    language: 'ts',
    title: 'Zero-Knowledge Data Handling',
    fileName: 'lockerActions.ts',
    description: (
      <>
        A Next.js Server Action demonstrating strict authentication checks
        before inserting encrypted locker items. Notice how the server only
        handles raw Uint8Array buffers for the ciphertext and initialization
        vectors, ensuring the backend never parses or logs plaintext user
        credentials.
      </>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="h-6 w-6"
      >
        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" />
        <path
          data-name="original"
          fill="#007acc"
          d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
        />
      </svg>
    ),
  },
  sample2: {
    code: `
"use server";
import { cookies } from "next/headers";
import { ActionState } from "@/types";

/**
 * Next.js BFF (Backend-For-Frontend) API Gateway Wrapper.
 * Securely proxies requests to the isolated FastAPI Python microservice.
 */
export default async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ActionState<T>> {
  const headers = new Headers(options.headers);
  const cookieStore = await cookies();

  // 1. Securely inject HttpOnly session tokens into the microservice request
  const token = cookieStore.get("accessToken")?.value;
  if (token) {
    headers.set("Authorization", \`Bearer \${token}\`);
  }

  headers.set("Content-Type", "application/json");

  try {
    let response = await fetch(\`\${process.env.BACKEND_BASE_URL}\${endpoint}\`, {
      ...options,
      headers,
    });

    // 2. Automatic Interceptor: Seamless Token Refresh Rotation
    if (response.status === 401) {
      // attemptTokenRefresh() calls the backend /refresh endpoint 
      // and securely sets the new HttpOnly cookies on the Next.js server
      const newToken = await attemptTokenRefresh(); 

      if (newToken) {
        // Refresh succeeded: Update scoped header and retry original request
        headers.set("Authorization", \`Bearer \${newToken}\`);
        response = await fetch(\`\${process.env.BACKEND_BASE_URL}\${endpoint}\`, {
          ...options,
          headers,
        });
      } else {
        return { success: false, error: "Session expired", type: "UNAUTHORIZED" };
      }
    }

    // 3. Standardize and return type-safe ActionState to the React client
    // ... (error handling and status code parsing omitted for brevity)
    
    if (!response.ok) throw new Error(\`API Error: \${response.status}\`);
    
    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    return { success: false, error: "Backend unreachable", type: "SERVER_ERROR" };
  }
}
    `,
    language: 'ts',
    title: 'FastAPI API Gateway',
    fileName: 'fetchWrapper.ts',
    description: (
      <>
        This Next.js utility function acts as the Backend-For-Frontend (BFF)
        gateway. It securely proxies requests to the isolated FastAPI
        microservice, attaching the user&apos;s OAuth token to the headers and
        standardizing the error handling before passing data back to the React
        client
      </>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="h-6 w-6"
      >
        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" />
        <path
          data-name="original"
          fill="#007acc"
          d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
        />
      </svg>
    ),
  },
  sample3: {
    code: `
'use client';

export interface EncryptedData {
  ciphertext: Uint8Array;
  iv: Uint8Array;
  tag: Uint8Array;
}

/** 
 * Encrypts a JSON-serializable object using AES-256-GCM.
 * This executes entirely in the user's browser; plaintext never hits the network.
 */
export async function encryptPayload(payload: unknown, hexKey: string): Promise<EncryptedData> {
  // Convert 32-byte hex string to a usable Web Crypto API CryptoKey
  const key = await importKey(hexKey); 
  
  // Generate a cryptographically secure random Initialization Vector (IV)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Serialize and encode the payload
  const jsonPayload = JSON.stringify(payload);
  const encodedPayload = new TextEncoder().encode(jsonPayload);

  // Web Crypto API automatically appends a 16-byte auth tag to the end of the ciphertext
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, 
    key, 
    encodedPayload
  );

  const encryptedBytes = new Uint8Array(encryptedBuffer);

  // Explicitly separate the ciphertext and the authentication tag for the backend
  const ciphertext = encryptedBytes.slice(0, -16);
  const tag = encryptedBytes.slice(-16);

  return { ciphertext, iv, tag };
}
    `,
    language: 'ts',
    title: 'Client-Side AES-256-GCM',
    fileName: 'crypto.ts',
    description: (
      <>
        The core cryptographic module utilizing the native Web Crypto API. This
        runs entirely in the browser, deriving a secure key from the user&apos;s
        master password using Argon2id, and encrypting the payload via
        AES-256-GCM before it ever hits the network.
      </>
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        className="h-6 w-6"
      >
        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" />
        <path
          data-name="original"
          fill="#007acc"
          d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
        />
      </svg>
    ),
  },
};

export default codeSamples;
