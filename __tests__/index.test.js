import {
  wkn
} from '../src/';

describe('Test of wkn', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000')
    await page.addScriptTag({
      content: wkn.toString()
    });
  })

  it('wkn work fine!', async () => {
    const func = (e) => {
      postMessage(e.data + '!');
    };
    const arg = 'hoge';
    const data = await page.evaluate(`(async() => wkn(${func.toString()}, '${arg}'))()`);
    expect(data).toBe('hoge!')
  })
})