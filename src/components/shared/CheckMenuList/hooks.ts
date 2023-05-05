import { useEffect, useRef, useState } from 'react';

export function useSelect<T extends HTMLElement>() {
  const labelRef = useRef<T>(null);
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    const handleSelect = (e: MouseEvent) => {
      if (!e.target) return;

      if (!labelRef.current?.contains(e.target as HTMLElement)) {
        setClicked(false);
      }
    };
    document.addEventListener('click', handleSelect);
    return () => document.removeEventListener('click', handleSelect);
  }, [labelRef]);
  return { isClicked, setClicked, labelRef };
}
