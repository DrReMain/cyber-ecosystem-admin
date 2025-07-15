# 📦 kubb + OpenAPI 代码生成说明

本项目使用 kubb 根据 OpenAPI Spec 自动生成 RESTful API 相关代码：

- 使用插件：`ts`, `zod`, `faker`, `msw`, `client`
    - 自动生成：接口参数 & 返回值的 TypeScript 类型、Zod 模型、基本 Faker 数据，以及基于 Faker 的 MSW handler。
- 配置文件：根目录下 `kubb.config.ts`
- OpenAPI 规范及自定义 Faker 逻辑：存放于 `openapi/` 目录，包括 `faker.mapper.ts`
    - 注意：自引用结构可能导致 Faker 递归无限循环，需要自定义规则避免该问题。
- Mock 服务启动：执行 `pnpm run mock`
- 请求客户端：基于 `ky`，集成 Zod 驱动参数和值校验，接口定义严格。
- 生成文件位置：`src/services/`，建议不随意移动。
