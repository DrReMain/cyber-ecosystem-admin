```typescript jsx
'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';

import useRequest from '@/hooks/use-request';
import { accountLoginPassword } from '@/services/clients/accountService/accountLoginPassword';
import { adminSystemDepartmentsQuery } from '@/services/clients/departmentService/adminSystemDepartmentsQuery';

export default function Page() {
    const { mutateHOF, queryHOF } = useRequest();
    const { mutate, mutateAsync, ...rest } = useMutation({
        mutationKey: [accountLoginPassword.name],
        mutationFn: mutateHOF(accountLoginPassword, { toast: true })(/* Parameters<typeof accountLoginPassword>[1] */),
    });
    const _query = useQuery({
        queryKey: [adminSystemDepartmentsQuery.name],
        queryFn: ctx => queryHOF(adminSystemDepartmentsQuery, {
            toast: { error: true },
        })(
            { params: {} }, /* Parameters<typeof adminSystemDepartmentsQuery>[0] */
            { signal: ctx.signal }, /* Parameters<typeof adminSystemDepartmentsQuery>[1] */
        ),
    });

    const handleClick = async () => {
        void mutateAsync({ data: { email: 'super@cyber-dancer.com', password: '123456' } });
    };

    return (
        <main className="w-screen h-screen flex items-center gap-2">
            <Button type="primary" onClick={handleClick}>
                login
            </Button>
            <pre className="overflow-auto">{JSON.stringify(rest, null, 2)}</pre>
        </main>
    );
}
```
