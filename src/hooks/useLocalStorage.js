const useLocalStorage = () => {
  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key) || "null");

  const saveToLocal = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const removeFromLocal = (key) => localStorage.removeItem(key);

  const removeAllLocal = () => localStorage.clear();

  return { getFromLocal, saveToLocal, removeFromLocal, removeAllLocal };
};

export default useLocalStorage;
