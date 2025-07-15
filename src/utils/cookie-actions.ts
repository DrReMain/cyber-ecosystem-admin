'use server';

import { cookies } from 'next/headers';

interface CookieOptions {
  maxAge?: number;
  expires?: number | Date | undefined;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie with the given name, value, and options (server-side only).
 * @param name Cookie name
 * @param value Cookie value
 * @param options Optional cookie settings
 * @throws {Error} Throws if the cookie name or value is invalid
 */
export async function setCookieServer(name: string, value: string, options: CookieOptions = {}) {
  try {
    const defaultOptions: CookieOptions = {
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production only
      httpOnly: true, // Prevent client-side access via JavaScript
      sameSite: 'strict', // Helps mitigate CSRF attacks
      domain: process.env.NEXT_PUBLIC_APP_HOST, // Set domain to app host
      maxAge: 31536000, // One year in seconds (persistent cookie)
    };

    const cookieOptions = { ...defaultOptions, ...options };

    (await cookies()).set(name, value, {
      maxAge: cookieOptions.maxAge,
      expires: cookieOptions.expires,
      path: cookieOptions.path,
      domain: cookieOptions.domain,
      secure: cookieOptions.secure,
      httpOnly: cookieOptions.httpOnly,
      sameSite: cookieOptions.sameSite,
    });
  }
  catch (error) {
    console.error('Error setting cookie:', error);
    throw error;
  }
}

/**
 * Delete a cookie by name (server-side only).
 * @param name Cookie name
 * @throws {Error} Throws if the cookie name is invalid
 */
export async function deleteCookieServer(name: string) {
  try {
    (await cookies()).delete(name);
  }
  catch (error) {
    console.error('Error deleting cookie:', error);
    throw error;
  }
}

/**
 * Get a cookie value by name (server-side only).
 * @param name Cookie name
 * @param c Optional external cookie store
 * @returns Cookie value or undefined if not found
 * @throws {Error} Throws if the cookie name is invalid
 */
export async function getCookieServer(
  name: string,
  c?: Awaited<ReturnType<typeof cookies>>,
): Promise<string | undefined> {
  try {
    const cookieStore = c ?? await cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value;
  }
  catch (error) {
    console.error('Error retrieving cookie:', error);
    throw error;
  }
}

/**
 * Check if a cookie exists by name (server-side only).
 * @param name Cookie name
 * @returns True if the cookie exists, otherwise false
 * @throws {Error} Throws if the cookie name is invalid
 */
export async function hasCookieServer(name: string): Promise<boolean> {
  try {
    return (await cookies()).has(name);
  }
  catch (error) {
    console.error('Error checking cookie existence:', error);
    throw error;
  }
}
