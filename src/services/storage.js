export function getStateFromStorage() {
  try {
    return JSON.parse(sessionStorage.getItem('my_saved_state'));
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setStateToStorage(state) {
  sessionStorage.setItem('my_saved_state', JSON.stringify(state));
}
