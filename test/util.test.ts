import { getName, validatePickPositions } from '../src/util/util';

test('returns-correct-name', () => {
  const name = getName();
  expect(name).toEqual('name');
});

describe('util-order', () => {
  it('should-detect-duplicate-positons-in-round', () => {
    const unique = [
      { round: 2, selectNum: 0 },
      { round: 2, selectNum: 1 },
      { round: 1, selectNum: 0 },
      { round: 1, selectNum: 1 },
      { round: 1, selectNum: 2 },
    ];

    const duplicate = [
      { round: 1, selectNum: 0 },
      { round: 1, selectNum: 1 },
      { round: 1, selectNum: 1 },
    ];

    expect(validatePickPositions(unique)).toBe(true);
    expect(validatePickPositions(duplicate)).toBe(false);
  });
});