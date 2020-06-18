import { groupBy, range, isEqual } from 'lodash';
// import { randomBytes } from 'crypto';
// .range(1, 5);

const validRounds = rounds => {
  const numbers = Object.keys(rounds).map(n => parseInt(n, 10));
  return isEqual(numbers, range(1, numbers.length + 1));
};

const validPositions = rounds => {
  const results = Object.entries(rounds).map(rnd => {
    const positions: any = rnd[1];
    const pos = positions.map(r => r.selectNum);
    return isEqual(pos, range(pos.length));
  });
  return results.every(i => i);
};

const validatePickPositions = (picks: any[]) => {
  const rounds = groupBy(picks, 'round');
  return validRounds(rounds) && validPositions(rounds);
};

const getName = () => 'name';

export { getName, validatePickPositions };
