/* eslint-disable unused-imports/no-unused-vars */
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { faker } from '@faker-js/faker';

import type { AdminSystemRoleGet200, AdminSystemRoleGetPathParams, AdminSystemRoleGetQueryResponse } from '../../models/AdminSystemRoleGet';

import { createCommonResFaker } from '../createCommonResFaker';
import { createRoleResFaker } from '../createRoleResFaker';

export function createAdminSystemRoleGetPathParamsFaker(data?: Partial<AdminSystemRoleGetPathParams>): AdminSystemRoleGetPathParams {
  faker.seed([2021]);
  return {
    ...{ id: faker.string.numeric(20) },
    ...(data || {}),
  };
}

/**
 * @description success
 */
export function createAdminSystemRoleGet200Faker(data?: Partial<AdminSystemRoleGet200>): AdminSystemRoleGet200 {
  faker.seed([2021]);
  return Object.assign({}, createCommonResFaker(), { result: createRoleResFaker() });
}

export function createAdminSystemRoleGetQueryResponseFaker(data?: Partial<AdminSystemRoleGetQueryResponse>): AdminSystemRoleGetQueryResponse {
  faker.seed([2021]);
  return data || faker.helpers.arrayElement<any>([createAdminSystemRoleGet200Faker()]);
}
