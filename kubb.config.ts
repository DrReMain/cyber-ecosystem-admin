import 'dotenv/config';
import { defineConfig } from '@kubb/core';
import { pluginClient } from '@kubb/plugin-client';
import { pluginFaker } from '@kubb/plugin-faker';
import { pluginMsw } from '@kubb/plugin-msw';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginZod } from '@kubb/plugin-zod';

import { mapper } from './openapi/faker.mapper';

export default defineConfig({
  name: process.env.NEXT_KUBB_OASFILE,
  root: '.',
  input: { path: `./openapi/${process.env.NEXT_KUBB_OASFILE}.yaml` },
  output: {
    path: './src/services',
    clean: true,
    barrelType: 'named',
    extension: { '.ts': '' },
  },
  hooks: { done: ['eslint --fix ./src/services'] },
  plugins: [
    pluginOas({ validate: true, discriminator: 'strict' }),
    pluginTs({
      output: { path: 'models' },
      enumType: 'asConst',
      enumSuffix: 'Enum',
      dateType: 'string',
    }),
    pluginZod({
      output: { path: 'zod' },
      group: { type: 'tag' },
      typed: false,
      inferred: true,
      dateType: false,
      unknownType: 'any',
      coercion: false,
      operations: false,
      version: '4',
    }),
    pluginClient({
      output: { path: 'clients', barrelType: false }, // barrelType: false -> Prevent the fakers from being bundled into the client side.
      parser: 'zod',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Service`,
      },
      importPath: '@/request/restful/client',
      operations: true,
      dataReturnType: 'full',
      paramsType: 'object',
      pathParamsType: 'object',
      urlType: 'export',
      override: [
        {
          type: 'contentType',
          pattern: 'multipart/form-data',
          options: {
            parser: 'client',
          },
        },
      ],
    }),
    pluginFaker({
      output: {
        banner: (_oas) => {
          return '/* eslint-disable unused-imports/no-unused-vars */';
        },
        path: 'mocks',
      },
      group: { type: 'tag' },
      seed: [2021],
      dateType: 'string',
      transformers: {
        name: (name, _type) => `${name}Faker`,
      },
      mapper,
    }),
    pluginMsw({
      output: { path: 'msw' },
      group: { type: 'tag' },
      handlers: true,
      parser: 'faker',
    }),
  ],
});
