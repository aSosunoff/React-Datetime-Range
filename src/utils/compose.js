export const compose = (...fn) => (x) =>
  fn.reduceRight(
    (res, f) => (Array.isArray(f) ? f.map((fnx) => fnx(res)) : f(res)),
    x
  );
