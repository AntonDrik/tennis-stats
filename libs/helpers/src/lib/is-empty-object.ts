function isEmptyObject(obj: object | undefined) {
  if (!obj) {
    return false;
  }

  return Object.keys(obj).length === 0;
}

export default isEmptyObject;
