import { useState, ChangeEvent, SetStateAction } from 'react';

export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setValue = (name: keyof T, value: SetStateAction<string>) => {
    if (typeof value === 'function') {
      setForm((prev) => ({
        ...prev,
        [name]: (value as (prevState: string) => string)(prev[name as string])
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return { form, handleChange, setValue };
}
