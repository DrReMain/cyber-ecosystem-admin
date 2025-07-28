import { useEffect, useState } from 'react';

type OS = 'macos' | 'windows' | 'linux' | 'android' | 'ios' | 'unknown';

function detectPlatform(): OS {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return 'unknown';
  }

  const ua = navigator.userAgent.toLowerCase();
  const uaPlatform = (navigator as any).userAgentData?.platform?.toLowerCase?.() || '';

  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
    return 'ios';
  }
  if (ua.includes('android')) {
    return 'android';
  }
  if (uaPlatform.includes('mac') || ua.includes('mac')) {
    return 'macos';
  }
  if (uaPlatform.includes('win') || ua.includes('win')) {
    return 'windows';
  }
  if (uaPlatform.includes('linux') || ua.includes('linux')) {
    return 'linux';
  }
  return 'unknown';
}

export default function useOS(): OS {
  const [os, setOS] = useState<OS>('unknown');

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setOS(detectPlatform());
  }, []);

  return os;
}
