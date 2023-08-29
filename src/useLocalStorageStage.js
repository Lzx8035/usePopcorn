import { useState, useEffect } from "react";

export default function useLocalStorageStage(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)); //WOW
  }, [value, key]);

  return [value, setValue];
}
