/* eslint-disable unused-imports/no-unused-vars */
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { faker } from '@faker-js/faker';

import type {
  AdminSystemRolePut200,
  AdminSystemRolePutMutationRequest,
  AdminSystemRolePutMutationResponse,
  AdminSystemRolePutPathParams,
} from '../../models/AdminSystemRolePut';

import { createCommonResFaker } from '../createCommonResFaker';

export function createAdminSystemRolePutPathParamsFaker(data?: Partial<AdminSystemRolePutPathParams>): AdminSystemRolePutPathParams {
  faker.seed([2021]);
  return {
    ...{ id: faker.string.numeric(20) },
    ...(data || {}),
  };
}

/**
 * @description 非查询返回
 */
export function createAdminSystemRolePut200Faker(data?: Partial<AdminSystemRolePut200>): AdminSystemRolePut200 {
  faker.seed([2021]);
  return Object.assign({}, createCommonResFaker(), { result: faker.string.alpha() });
}

export function createAdminSystemRolePutMutationRequestFaker(data?: Partial<AdminSystemRolePutMutationRequest>): AdminSystemRolePutMutationRequest {
  faker.seed([2021]);
  return {
    ...{
      sort: faker.number.int({ min: 0 }),
      role_name: faker.string.alpha({ length: 255 }),
      code: '000000',
      remark: faker.string.alpha({ length: 255 }),
      menu_ids: faker.helpers.multiple(() => faker.string.alpha()),
    },
    ...(data || {}),
  };
}

export function createAdminSystemRolePutMutationResponseFaker(data?: Partial<AdminSystemRolePutMutationResponse>): AdminSystemRolePutMutationResponse {
  faker.seed([2021]);
  return data || faker.helpers.arrayElement<any>([createAdminSystemRolePut200Faker()]);
}
