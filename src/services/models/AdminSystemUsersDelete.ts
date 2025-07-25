/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { CommonRes } from './CommonRes';
import type { IdsReq } from './IdsReq';

/**
 * @description 非查询返回
 */
export type AdminSystemUsersDelete200 = CommonRes & {
  /**
   * @type string
   */
  result: string;
};

export type AdminSystemUsersDeleteMutationRequest = IdsReq;

export type AdminSystemUsersDeleteMutationResponse = AdminSystemUsersDelete200;

export interface AdminSystemUsersDeleteMutation {
  Response: AdminSystemUsersDelete200;
  Request: AdminSystemUsersDeleteMutationRequest;
  Errors: any;
}
