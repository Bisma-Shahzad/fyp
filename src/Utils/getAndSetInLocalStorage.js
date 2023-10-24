// Function to get data from local storage
export const getDataFromLocalStorage = (Key) => {
  try {
    const value = localStorage.getItem(Key);
    console.log('this response is in get data Function', value);
    return value;
  } catch (e) {
    console.log(e);
  }
};


// Function to set data to local storage
export const setDataToLocalStorage = (Key, val) => {
  try {
    localStorage.setItem(Key, val);
    console.log(`Data with key '${Key}' set to local storage:`, val);
  } catch (e) {
    console.log(e);
  }
};

// Function to remove data from local storage
export const removeDataFromLocalStorage = (Key) => {
  try {
    localStorage.removeItem(Key);
    console.log(`Data with key '${Key}' removed from local storage.`);
  } catch (e) {
    console.log(e);
  }
};