import btoa from "btoa";

export function generateId() {
  let buf = Math.random([0, 999999999]);
  let b64 = btoa(buf);
  return b64.toString();
}