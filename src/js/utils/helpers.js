export function getRequestActionTypes(action) {
  return [
    `${action}_REQUEST`,
    `${action}_SUCCESS`,
    `${action}_FAILURE`
  ];
}
