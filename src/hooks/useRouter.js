import { useState, useEffect, useCallback } from "react";

export function useRouter() {
  const getHash = () => window.location.hash.slice(1) || "/";
  const [route, setRoute] = useState(getHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}
