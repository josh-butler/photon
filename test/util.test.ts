import { getName } from '../src/functions/util/util';

test('returns-correct-name', () => {
  const name = getName();
  expect(name).toEqual('name');
});
