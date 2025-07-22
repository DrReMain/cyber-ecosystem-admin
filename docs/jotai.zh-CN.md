# 🧠 全局状态管理 — Jotai（支持 SSR + Cookie 水合）

本项目采用 Jotai 作为全局状态管理器，支持 SSR 场景下使用 Cookie 进行持久化存储并水合状态。

基本机制：
- 使用自定义 store，**不能**使用 getDefaultStore。
- store 由 src/store/createStore.ts 中的 createMainStore() 创建。
- 在 src/providers/jotai.provider.tsx 中，通过 JotaiProvider 传递 store。

使用示例：

```typescript jsx
import type { PropsWithChildren } from 'react';
import JotaiProvider from '@/providers/jotai.provider';
import settingFromCookie from '@/store/setting/from-cookie';
import tokenFromCookie from '@/store/token/from-cookie';

export default async function Layout({ children }: PropsWithChildren) {
  const [setting, token] = await Promise.all([
    settingFromCookie(),
    tokenFromCookie(),
  ]);
  return (
    <JotaiProvider initialData={{ setting, token }}>
      {children}
    </JotaiProvider>
  );
}
```

## 新增状态或字段：

1. 在 src/store/ 下编辑已有 namespace 或新增 namespace。
2. 按示例添加 atom/selector/hydrate 逻辑。
3. 在 createStore.ts 中增加初始化及订阅逻辑。
4. 使用 JotaiProvider 时，调用 hydrate 方法并传入 initialData。
