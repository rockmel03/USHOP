import useLocalStorage from "./useLocalStorage";

export default function useToggle(keyName, initialValue) {
  const [value, setValue] = useLocalStorage(keyName, initialValue);

  const toggle = (toggleValue) => {
    setValue((prev) => {
      if (typeof toggleValue === "boolean") return toggleValue;
      return !prev;
    });
  };

  return [value, toggle];
}
