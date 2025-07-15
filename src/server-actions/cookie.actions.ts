'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface CookieOptions {
  maxAge?: number;
  expires?: number | Date | undefined;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Server action to set a cookie with the given name, value, and options.
 * @param name Cookie name
 * @param value Cookie value
 * @param options Optional cookie settings
 * @returns ActionResult indicating success or failure
 */
export async function setCookieAction(
  name: string,
  value: string,
  options: CookieOptions = {},
): Promise<ActionResult> {
  if (!name || typeof name !== 'string') {
    return {
      success: false,
      error: 'Cookie name must be a non-empty string',
    };
  }

  if (typeof value !== 'string') {
    return {
      success: false,
      error: 'Cookie value must be a string',
    };
  }

  try {
    const defaultOptions: CookieOptions = {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
      domain: process.env.NEXT_PUBLIC_APP_HOST,
      maxAge: 31536000, // One year in seconds
    };

    const cookieOptions = { ...defaultOptions, ...options };
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
      maxAge: cookieOptions.maxAge,
      expires: cookieOptions.expires,
      path: cookieOptions.path,
      domain: cookieOptions.domain,
      secure: cookieOptions.secure,
      httpOnly: cookieOptions.httpOnly,
      sameSite: cookieOptions.sameSite,
    });

    return { success: true };
  }
  catch (error) {
    console.error('Error setting cookie:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Server action to delete a cookie by name.
 * @param name Cookie name
 * @returns ActionResult indicating success or failure
 */
export async function deleteCookieAction(name: string): Promise<ActionResult> {
  if (!name || typeof name !== 'string') {
    return {
      success: false,
      error: 'Cookie name must be a non-empty string',
    };
  }

  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);

    return { success: true };
  }
  catch (error) {
    console.error('Error deleting cookie:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Server action to get a cookie value by name.
 * @param name Cookie name
 * @returns ActionResult with cookie value or error
 */
export async function getCookieAction(name: string): Promise<ActionResult<string | undefined>> {
  if (!name || typeof name !== 'string') {
    return {
      success: false,
      error: 'Cookie name must be a non-empty string',
    };
  }

  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);

    return {
      success: true,
      data: cookie?.value,
    };
  }
  catch (error) {
    console.error('Error retrieving cookie:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Server action to check if a cookie exists by name.
 * @param name Cookie name
 * @returns ActionResult with boolean indicating existence
 */
export async function checkCookieAction(name: string): Promise<ActionResult<boolean>> {
  if (!name || typeof name !== 'string') {
    return {
      success: false,
      error: 'Cookie name must be a non-empty string',
    };
  }

  try {
    const cookieStore = await cookies();
    const exists = cookieStore.has(name);

    return {
      success: true,
      data: exists,
    };
  }
  catch (error) {
    console.error('Error checking cookie existence:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Server action to clear all cookies (optional utility function).
 * @param cookieNames Array of cookie names to clear
 * @returns ActionResult indicating success or failure
 */
export async function clearCookiesAction(cookieNames: string[]): Promise<ActionResult> {
  if (!Array.isArray(cookieNames)) {
    return {
      success: false,
      error: 'Cookie names must be an array',
    };
  }

  try {
    const cookieStore = await cookies();

    for (const name of cookieNames) {
      if (name && typeof name === 'string') {
        cookieStore.delete(name);
      }
    }

    return { success: true };
  }
  catch (error) {
    console.error('Error clearing cookies:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Server action to set a cookie and redirect to a specified path.
 * Useful for authentication flows.
 * @param name Cookie name
 * @param value Cookie value
 * @param redirectPath Path to redirect to after setting cookie
 * @param options Optional cookie settings
 */
export async function setCookieAndRedirectAction(
  name: string,
  value: string,
  redirectPath: string,
  options: CookieOptions = {},
): Promise<never> {
  const result = await setCookieAction(name, value, options);

  if (!result.success) {
    // In a real application, you might want to handle this differently
    console.error('Failed to set cookie before redirect:', result.error);
  }

  redirect(redirectPath);
}

/**
 * Server action to delete a cookie and redirect to a specified path.
 * Useful for logout flows.
 * @param name Cookie name
 * @param redirectPath Path to redirect to after deleting cookie
 */
export async function deleteCookieAndRedirectAction(
  name: string,
  redirectPath: string,
): Promise<never> {
  const result = await deleteCookieAction(name);

  if (!result.success) {
    console.error('Failed to delete cookie before redirect:', result.error);
  }

  redirect(redirectPath);
}

// Helper function for form data processing (common in server server-actions)
export async function setCookieFromFormAction(formData: FormData): Promise<ActionResult> {
  const name = formData.get('name') as string;
  const value = formData.get('value') as string;
  const maxAge = formData.get('maxAge');

  const options: CookieOptions = {};
  if (maxAge) {
    options.maxAge = Number.parseInt(maxAge as string, 10);
  }

  return setCookieAction(name, value, options);
}
