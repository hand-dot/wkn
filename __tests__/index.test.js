import {
  wkn
} from '../src/';

describe('Test of wkn', () => {
  let page
  jest.setTimeout(300000);
  beforeAll(async () => {
    await page.goto('http://localhost:3000')
    await page.addScriptTag({
      content: wkn.toString()
    });
  })

  it('wkn work fine!', async () => {
    const data = await page.evaluate(`(async() => {
      return wkn(arg => arg + '!', 'hoge')
    })()`);
    console.log(data); // shows the result
    // but not working
  })
})