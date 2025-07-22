import { useCallback, useEffect, useState } from 'react';

export default function useFull() {
  const [isFull, setIsFull] = useState(false);

  const getFullscreenElement = () =>
    document.fullscreenElement
    || (document as any).webkitFullscreenElement
    || (document as any).mozFullScreenElement
    || (document as any).msFullscreenElement;

  const enter = useCallback((element?: Element) => {
    const el = element || document.documentElement;

    const request
        = el.requestFullscreen
          || (document as any).webkitRequestFullscreen
          || (document as any).mozRequestFullScreen
          || (document as any).msRequestFullscreen;
    if (request) {
      request.call(el);
    }
  }, []);

  const exit = useCallback(() => {
    const exitFn
          = document.exitFullscreen
            || (document as any).webkitExitFullscreen
            || (document as any).mozCancelFullScreen
            || (document as any).msExitFullscreen;
    if (exitFn) {
      exitFn.call(document);
    }
  }, []);

  const toggle = useCallback((element?: Element) => {
    if (getFullscreenElement()) {
      exit();
    }
    else {
      enter(element);
    }
  }, [enter, exit]);

  useEffect(() => {
    const handler = () => {
      setIsFull(!!getFullscreenElement());
    };

    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    document.addEventListener('mozfullscreenchange', handler);
    document.addEventListener('MSFullscreenChange', handler);

    return () => {
      document.removeEventListener('fullscreenchange', handler);
      document.removeEventListener('webkitfullscreenchange', handler);
      document.removeEventListener('mozfullscreenchange', handler);
      document.removeEventListener('MSFullscreenChange', handler);
    };
  }, []);

  return {
    isFull,
    enter,
    exit,
    toggle,
  };
}
