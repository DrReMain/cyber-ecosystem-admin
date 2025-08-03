import { useMutation } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai/index';

import useOS from '@/lib/hooks/use-os';
import useRequest from '@/lib/hooks/use-request';
import { accountLogout } from '@/services/clients/accountService/accountLogout';
import { atom_global } from '@/store/global/store';
import { atom_setting } from '@/store/setting/store';
import { atom_token } from '@/store/token/store';

export function useShortcuts() {
  const os = useOS();

  const [, setGlobal] = useAtom(atom_global);

  const setting = useAtomValue(atom_setting);
  const [, setToken] = useAtom(atom_token);
  const { mutateHOF } = useRequest();
  const mutateLogout = useMutation({
    mutationKey: [accountLogout.name],
    mutationFn: mutateHOF(accountLogout, {
      toast: {
        loading: true,
        error: true,
      },
    })(),
    onSettled: () => {
      setToken({});
    },
  });

  return {
    lock: {
      keyFilter: ['alt.l'],
      text: os === 'macos' ? '⌥ + l' : 'Alt + l',
      cb: (skip: boolean) => {
        if (!skip && (!setting.shortcuts.enable || !setting.shortcuts.lock))
          return;
        setGlobal((g) => {
          g.openLock = true;
        });
      },
    },
    logout: {
      keyFilter: ['alt.q'],
      text: os === 'macos' ? '⌥ + q' : 'Alt + q',
      cb: (skip: boolean) => {
        if (!skip && (!setting.shortcuts.enable || !setting.shortcuts.logout))
          return;
        mutateLogout.mutate({ data: {} });
      },
    },
  };
}
