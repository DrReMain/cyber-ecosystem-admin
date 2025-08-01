/* eslint-disable unused-imports/no-unused-vars */
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { faker } from '@faker-js/faker';

import type {
  AdminSystemUserPut200,
  AdminSystemUserPutMutationRequest,
  AdminSystemUserPutMutationResponse,
  AdminSystemUserPutPathParams,
} from '../../models/AdminSystemUserPut';

import { createCommonResFaker } from '../createCommonResFaker';

export function createAdminSystemUserPutPathParamsFaker(data?: Partial<AdminSystemUserPutPathParams>): AdminSystemUserPutPathParams {
  faker.seed([2021]);
  return {
    ...{ id: faker.string.numeric(20) },
    ...(data || {}),
  };
}

/**
 * @description 非查询返回
 */
export function createAdminSystemUserPut200Faker(data?: Partial<AdminSystemUserPut200>): AdminSystemUserPut200 {
  faker.seed([2021]);
  return Object.assign({}, createCommonResFaker(), { result: faker.string.alpha() });
}

export function createAdminSystemUserPutMutationRequestFaker(data?: Partial<AdminSystemUserPutMutationRequest>): AdminSystemUserPutMutationRequest {
  faker.seed([2021]);
  return {
    ...{
      status: faker.helpers.arrayElement<NonNullable<AdminSystemUserPutMutationRequest>['status']>([1, 2]),
      password: faker.string.alpha({ length: 6 }),
      confirm: faker.string.alpha({ length: 6 }),
      email: faker.internet.email(),
      name: faker.string.alpha({ length: 255 }),
      nickname: faker.string.alpha({ length: 255 }),
      phone: '18688886666',
      avatar: faker.image.avatar(),
      remark: faker.string.alpha({ length: 255 }),
      department_id: faker.string.alpha({ length: { min: 20, max: 20 } }),
      position_ids: faker.helpers.multiple(() => faker.string.alpha()),
      role_ids: faker.helpers.multiple(() => faker.string.alpha()),
    },
    ...(data || {}),
  };
}

export function createAdminSystemUserPutMutationResponseFaker(data?: Partial<AdminSystemUserPutMutationResponse>): AdminSystemUserPutMutationResponse {
  faker.seed([2021]);
  return data || faker.helpers.arrayElement<any>([createAdminSystemUserPut200Faker()]);
}
