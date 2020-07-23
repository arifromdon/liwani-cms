export function toRp(value, prefix, suffix) {
  const rev = parseInt(value, 10)
    .toString()
    .split('')
    .reverse()
    .join('');
  let rev2 = '';
  for (let i = 0; i < rev.length; i += 1) {
    rev2 += rev[i];
    if ((i + 1) % 3 === 0 && i !== rev.length - 1) {
      rev2 += '.';
    }
  }
  return `${prefix || ''}${rev2
    .split('')
    .reverse()
    .join('')}${suffix || ''}`;
};