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
    const data = await page.evaluate(`(async() => {
      return wkn((e) => {
        postMessage(e.data + '!');
      }, 'hoge')
    })()`);
    expect(data).toBe('hoge!')
  })
})