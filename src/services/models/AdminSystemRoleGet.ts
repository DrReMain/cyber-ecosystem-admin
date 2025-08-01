/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { CommonRes } from './CommonRes';
import type { RoleRes } from './RoleRes';

export interface AdminSystemRoleGetPathParams {
  /**
   * @minLength 20
   * @maxLength 20
   * @type string
   */
  id: string;
}

/**
 * @description success
 */
export type AdminSystemRoleGet200 = CommonRes & {
  /**
   * @type object
   */
  result: RoleRes;
};

export type AdminSystemRoleGetQueryResponse = AdminSystemRoleGet200;

export interface AdminSystemRoleGetQuery {
  Response: AdminSystemRoleGet200;
  PathParams: AdminSystemRoleGetPathParams;
  Errors: any;
}
