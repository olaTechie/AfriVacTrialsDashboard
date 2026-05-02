import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | AfriVac Trials` : 'AfriVac Trials';
  }, [title]);
}
