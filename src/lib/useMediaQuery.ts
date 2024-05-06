import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const updateMatches = () => {
      setMatches(window.matchMedia(query).matches);
    };

    updateMatches();

    window.matchMedia(query).addEventListener('change', updateMatches);

    return () => {
      window.matchMedia(query).removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
