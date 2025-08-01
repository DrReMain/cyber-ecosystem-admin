/* eslint-disable unused-imports/no-unused-vars */
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { faker } from '@faker-js/faker';

import type {
  AdminSystemDepartmentDelete200,
  AdminSystemDepartmentDeleteMutationResponse,
  AdminSystemDepartmentDeletePathParams,
} from '../../models/AdminSystemDepartmentDelete';

import { createCommonResFaker } from '../createCommonResFaker';
import { createEmptyResFaker } from '../createEmptyResFaker';

export function createAdminSystemDepartmentDeletePathParamsFaker(data?: Partial<AdminSystemDepartmentDeletePathParams>): AdminSystemDepartmentDeletePathParams {
  faker.seed([2021]);
  return {
    ...{ id: faker.string.numeric(20) },
    ...(data || {}),
  };
}

/**
 * @description 非查询返回
 */
export function createAdminSystemDepartmentDelete200Faker(data?: Partial<AdminSystemDepartmentDelete200>): AdminSystemDepartmentDelete200 {
  faker.seed([2021]);
  return Object.assign({}, createCommonResFaker(), { result: faker.string.alpha() });
}

export function createAdminSystemDepartmentDeleteMutationRequestFaker() {
  faker.seed([2021]);
  return createEmptyResFaker();
}

export function createAdminSystemDepartmentDeleteMutationResponseFaker(
  data?: Partial<AdminSystemDepartmentDeleteMutationResponse>,
): AdminSystemDepartmentDeleteMutationResponse {
  faker.seed([2021]);
  return data || faker.helpers.arrayElement<any>([createAdminSystemDepartmentDelete200Faker()]);
}
