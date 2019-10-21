import { useEffect, useRef } from 'react';

export function useLifeCycle({
  didMount,
  willUnmount,
  didUpdate,
  didMountAndWillUnmount = [],
} = {}) {
  const initRef = useRef(true);

  const didMountFn = useRef(didMount);
  const willUnmountFn = useRef(willUnmount);
  const didMountAndWillUnmountConfig = useRef(didMountAndWillUnmount);

  useEffect(() => {
    if (didMountFn.current) didMountFn.current.call();
    didMountAndWillUnmountConfig.current.forEach(
      item => item.didMount && item.didMount.call(),
    );

    return () => {
      if (willUnmountFn.current) willUnmountFn.current.call();
      didMountAndWillUnmountConfig.current.forEach(
        item => item.willUnmount && item.willUnmount.call(),
      );
    };
  }, []);

  useEffect(() => {
    if (initRef.current) initRef.current = false;
    else if (didUpdate && !initRef.current) didUpdate.call();
  });
}
