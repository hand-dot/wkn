import {
  wkn
} from '../src';

describe('Test of wkn', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444')
    await page.addScriptTag({
      content: wkn.toString()
    })
  });
  it('wkn get resolve when good function', async () => {
    await expect(page.evaluate(`(async () => wkn((arg) => arg + "!", "hoge"))()`)).resolves.toBe('hoge!');
  });
  it('wkn get rejects when bat function', async () => {
    await expect(page.evaluate(`(wkn((arg) => arg.map( _ =>  _ + '!'), {}))()`)).rejects.toThrow();
  });
})