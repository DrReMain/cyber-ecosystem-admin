'use client';

import { Button, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useShortcuts } from '@/lib/hooks/use-shortcuts';
import { atom_global } from '@/store/global/store';

export default function LockScreen() {
  const t = useTranslations('setting.lock');
  const [global, setGlobal] = useAtom(atom_global);
  const { logout } = useShortcuts();

  const [form1] = Form.useForm();
  const onFinish1 = ({ pw }: { pw: string }) => {
    setGlobal((g) => {
      g.lockPW = pw;
      g.openLock = false;
    });
  };

  const [form2] = Form.useForm();
  const onFinish2 = ({ pw }: { pw: string }) => {
    if (global.lockPW !== pw)
      return toast.error(t('unlock-error'));
    setGlobal((g) => {
      g.lockPW = '';
    });
  };

  const [time, setTime] = useState<dayjs.Dayjs>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Modal
        destroyOnHidden
        footer={null}
        title={t('modal-title')}
        open={global.openLock}
        onCancel={() => setGlobal((g) => { g.openLock = false; })}
        afterClose={form1.resetFields}
      >
        <Form form={form1} onFinish={onFinish1}>
          <Form.Item
            name="pw"
            rules={[{ required: true, message: t('info') }]}
          >
            <Input.Password size="large" placeholder={t('info')} />
          </Form.Item>
          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              {t('lock-btn')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        destroyOnHidden
        footer={null}
        closable={false}
        centered={false}
        open={!!global.lockPW}
        afterClose={form2.resetFields}
        wrapClassName="w-screen h-screen bg-white dark:bg-black"
        width="100%"
        modalRender={modal => (
          <div className="flex flex-col items-center justify-center px-4 sm:px-6">
            {modal}
          </div>
        )}
      >
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block relative">
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-mono font-light text-gray-900 dark:text-gray-100 tracking-wider sm:tracking-widest">
              {time?.format('HH:mm:ss')}
            </div>
            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent" />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-10 space-y-2 sm:space-y-3">
            <div className="text-lg sm:text-xl lg:text-2xl font-normal text-gray-700 dark:text-gray-300 tracking-wide">
              {time?.format('YYYY-MM-DD')}
            </div>
            <div className="text-base sm:text-lg text-gray-500 dark:text-gray-500 font-light">
              {time?.format('dddd')}
            </div>
          </div>
        </div>

        <Form form={form2} onFinish={onFinish2}>
          <div className="flex flex-col sm:flex-row gap-2">
            <Form.Item name="pw" noStyle>
              <Input.Password
                placeholder={t('info')}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button
                type="primary"
                htmlType="submit"
              >
                {t('unlock-btn')}
              </Button>
            </Form.Item>
            <Form.Item noStyle>
              <Button
                onClick={() => logout.cb(true)}
              >
                {t('logout')}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
