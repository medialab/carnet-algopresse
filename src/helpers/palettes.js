import iwanthue from 'iwanthue';

const DEFAULT_COLOR_SPACE = {
  cmin: 25.59,
  cmax: 55.59,
  lmin: 60.94,
  lmax: 90.94
};

const SINGLE_COLOR_PALETTE = ['#999'];

export function generatePalette(name, count) {
  if (count === 1 || !count) return SINGLE_COLOR_PALETTE;
  else if (count === 2) {
    return ['red', 'blue']
  }

  return iwanthue(count, {
    colorSpace: DEFAULT_COLOR_SPACE,
    seed: name,
    clustering: 'force-vector'
  });
}