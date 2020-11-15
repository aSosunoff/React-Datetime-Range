export const getBounding = (target, source) => {
  if (!target || !source) {
    return { top: 0, left: 0 };
  }

  const boundingTarget = target.getBoundingClientRect();
  const boundingSource = source.getBoundingClientRect();

  const centerTarget = boundingTarget.left + boundingTarget.width / 2;
  let top = boundingTarget.top + boundingTarget.height + 5;
  let left = centerTarget - boundingSource.width / 2;

  if (top + boundingSource.height > document.documentElement.clientHeight) {
    top = boundingTarget.top - boundingSource.height - 5;
  }

  if (left < 0) {
    left = 5;
  } else if (
    left + boundingSource.width >
    document.documentElement.clientWidth
  ) {
    left = document.documentElement.clientWidth - boundingSource.width - 5;
  }

  return {
    top,
    left,
  };
};
