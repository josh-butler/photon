import { getName } from '../src/util/util';

test('returns-correct-name', () => {
  const name = getName();
  expect(name).toEqual('name');
});
