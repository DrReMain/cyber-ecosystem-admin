/* eslint-disable unused-imports/no-unused-vars */
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { faker } from '@faker-js/faker';

import type {
  AdminSystemDepartmentPost200,
  AdminSystemDepartmentPostMutationRequest,
  AdminSystemDepartmentPostMutationResponse,
} from '../../models/AdminSystemDepartmentPost';

import { createCommonResFaker } from '../createCommonResFaker';

/**
 * @description 非查询返回
 */
export function createAdminSystemDepartmentPost200Faker(data?: Partial<AdminSystemDepartmentPost200>): AdminSystemDepartmentPost200 {
  faker.seed([2021]);
  return Object.assign({}, createCommonResFaker(), { result: faker.string.alpha() });
}

export function createAdminSystemDepartmentPostMutationRequestFaker(
  data?: Partial<AdminSystemDepartmentPostMutationRequest>,
): AdminSystemDepartmentPostMutationRequest {
  faker.seed([2021]);
  return {
    ...{
      sort: faker.number.int({ min: 0 }),
      department_name: faker.string.alpha({ length: 255 }),
      remark: faker.string.alpha({ length: 255 }),
      parent_id: faker.string.alpha({ length: { min: 20, max: 20 } }),
    },
    ...(data || {}),
  };
}

export function createAdminSystemDepartmentPostMutationResponseFaker(
  data?: Partial<AdminSystemDepartmentPostMutationResponse>,
): AdminSystemDepartmentPostMutationResponse {
  faker.seed([2021]);
  return data || faker.helpers.arrayElement<any>([createAdminSystemDepartmentPost200Faker()]);
}
