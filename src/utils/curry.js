export const curry = (fn, ...a) =>
  a.length >= fn.length
    ? fn.apply(this, a)
    : (...b) => curry.apply(this, [fn, ...a, ...b]);
