import { useState, useEffect } from "react";

export default function useLocalCrud<T>(key: string) {
  const [data, setData] = useState<T[]>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  const create = (item: T) => setData([...data, item]);

  const update = (index: number, item: T) => {
    const copy = [...data];
    copy[index] = item;
    setData(copy);
  };

  const remove = (index: number) => {
    setData(data.filter((_: T, i: number) => i !== index));
  };

  return { data, create, update, remove };
}
