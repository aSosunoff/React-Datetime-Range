export const compose = (...fn) => (x) =>
  fn.reduceRight(
    (res, f) => (Array.isArray(f) ? f.map((x) => x(res)) : f(res)),
    x
  );
