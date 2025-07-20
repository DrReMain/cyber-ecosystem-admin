# 🧠 Global State Management — Jotai (SSR with Cookie Hydration)

This project uses Jotai for global state management, supporting SSR with Cookie-based persistence and hydration.

Core mechanism:
- Uses a custom store — **do not** use getDefaultStore().
- Store is created via createMainStore() in src/store/createStore.ts.
- Passed down through JotaiProvider in src/providers/jotai.provider.tsx.

Usage example:

```typescript jsx
import type { PropsWithChildren } from 'react';
import JotaiProvider from '@/providers/jotai.provider';
import settingFromCookie from '@/store/setting/from-cookie';
import userFromCookie from '@/store/user/from-cookie';

export default async function Layout({ children }: PropsWithChildren) {
  const [setting, user] = await Promise.all([
    settingFromCookie(),
    userFromCookie(),
  ]);
  return (
    <JotaiProvider initialData={{ setting, user }}>
      {children}
    </JotaiProvider>
  );
}
```

## Adding new state or fields:

1. Edit or add namespace under src/store/.
2. Add atom, selector, and hydrate logic following examples.
3. Extend initialization and subscription logic in createStore.ts.
4. When using JotaiProvider, invoke hydrate functions and pass initialData.
