export const base64 = {
  encode,
  decode,
};

function encode(value: string | number | boolean) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decode(value: string) {
  return decodeURIComponent(escape(atob(value)));
}
