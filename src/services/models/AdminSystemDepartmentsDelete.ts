/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { CommonRes } from './CommonRes';
import type { IdsReq } from './IdsReq';

/**
 * @description 非查询返回
 */
export type AdminSystemDepartmentsDelete200 = CommonRes & {
  /**
   * @type string
   */
  result: string;
};

export type AdminSystemDepartmentsDeleteMutationRequest = IdsReq;

export type AdminSystemDepartmentsDeleteMutationResponse = AdminSystemDepartmentsDelete200;

export interface AdminSystemDepartmentsDeleteMutation {
  Response: AdminSystemDepartmentsDelete200;
  Request: AdminSystemDepartmentsDeleteMutationRequest;
  Errors: any;
}
