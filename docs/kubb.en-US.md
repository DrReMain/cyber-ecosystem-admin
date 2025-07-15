# 📦 kubb + OpenAPI Code Generation Guide

This project uses **kubb** to generate RESTful API code from an OpenAPI specification:

- Plugins used: `ts`, `zod`, `faker`, `msw`, `client`
    - Automatically generates: TypeScript types for request & response, Zod schemas, base Faker data, and MSW handlers built on Faker.
- Config file: `kubb.config.ts` at project root
- OpenAPI specs & custom Faker rules: located in `openapi/`, including `faker.mapper.ts`
    - ⚠️ Beware: self-referencing structures can cause infinite recursion in Faker — custom rules are required to prevent this.
- Mock server command: `pnpm run mock`
- HTTP client: built on `ky`, with Zod-based validation for request parameters and responses — strict adherence to interface definitions.
- Generated code directory: `src/services/` — do not move unless necessary.

