import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [savedValue, setSavedValue] = useState(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setSavedValue(JSON.parse(item));
  }, [key]);

  const updateValue = (value: T) => {
    setSavedValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [savedValue, updateValue];
}
