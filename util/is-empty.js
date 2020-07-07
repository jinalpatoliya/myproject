export default (obj) =>
  obj == null ||
  typeof obj == "undefined" ||
  (typeof obj == "string" && obj.trim().length == 0) ||
  (typeof obj == "object" && Object.keys(obj).length == 0);
