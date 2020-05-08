import { getName } from '../util'

test('returns-correct-name', () => {
  const name = getName()
  expect(name).toEqual('bob');
});
