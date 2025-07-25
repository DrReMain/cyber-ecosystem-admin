/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { CommonRes } from './CommonRes';
import type { Resource } from './Resource';

/**
 * @description 非查询返回
 */
export type AdminSystemMenuPost200 = CommonRes & {
  /**
   * @type string
   */
  result: string;
};

export const adminSystemMenuPostMutationRequestMenuTypeEnum = {
  page: 'page',
  button: 'button',
} as const;

export type AdminSystemMenuPostMutationRequestMenuTypeEnum
  = (typeof adminSystemMenuPostMutationRequestMenuTypeEnum)[keyof typeof adminSystemMenuPostMutationRequestMenuTypeEnum];

export interface AdminSystemMenuPostMutationRequest {
  /**
   * @minLength 0
   * @type integer | undefined, int32
   */
  sort?: number;
  /**
   * @maxLength 255
   * @type string
   */
  title: string;
  /**
   * @maxLength 512
   * @type string | undefined
   */
  icon?: string;
  /**
   * @maxLength 255
   * @type string
   */
  code: string;
  /**
   * @minLength 20
   * @maxLength 20
   * @type string | undefined
   */
  parent_id?: string;
  /**
   * @type string
   */
  menu_type: AdminSystemMenuPostMutationRequestMenuTypeEnum;
  /**
   * @maxLength 255
   * @type string | undefined
   */
  menu_path?: string;
  /**
   * @maxLength 2048
   * @type string | undefined
   */
  properties?: string;
  /**
   * @type array | undefined
   */
  resources?: Resource[];
}

export type AdminSystemMenuPostMutationResponse = AdminSystemMenuPost200;

export interface AdminSystemMenuPostMutation {
  Response: AdminSystemMenuPost200;
  Request: AdminSystemMenuPostMutationRequest;
  Errors: any;
}
