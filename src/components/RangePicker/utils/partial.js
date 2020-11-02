export const partial = (fn, ...a) => (...b) => fn.apply(this, [...a, ...b]);
