export const timeAgo = (input) => {
  const seconds = Math.floor((Date.now() - input) / 1000);
  let amount, unit;

  if (seconds / 31536000 >= 1) {
    amount = Math.floor(seconds / 31536000);
    unit = 'year';
  } else if (seconds / 2592000 >= 1) {
    amount = Math.floor(seconds / 2592000);
    unit = 'month';
  } else if (seconds / 86400 >= 1) {
    amount = Math.floor(seconds / 86400);
    unit = 'day';
  } else if (seconds / 3600 >= 1) {
    amount = Math.floor(seconds / 3600);
    unit = 'hour';
  } else if (seconds / 60 >= 1) {
    amount = Math.floor(seconds / 60);
    unit = 'minute';
  } else {
    amount = Math.floor(seconds);
    unit = 'second';
  }
  return amount + `  ${unit}${amount === 1 ? '' : 's'} ago`;
};
