import { wkn } from '../src';

describe('Test of wkn', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444')
    await page.addScriptTag({
      content: wkn.toString()
    })
  });
  it('wkn get resolve when good function', async () => {
    const func = (e) => {
      postMessage(e.data + '!');
    }
    const arg = 'hoge';
    await expect(page.evaluate(`(async() => wkn(${func.toString()}, '${arg}'))()`)).resolves.toBe('hoge!');
  });
  it('wkn get rejects when bat function', async () => {
    const func = `(e) => {
      postMessage(a + '!');
    }`
    const arg = 'hoge';
    await expect(page.evaluate(`(async() => wkn(${func}, '${arg}'))()`)).rejects.toThrow();
  });
})