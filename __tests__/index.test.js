import wkn from '../src';

describe('Test of wkn', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4444')
    await page.addScriptTag({
      content: wkn.toString()
    })
  });
  it('wkn get resolve when good function1', async () => {
    await expect(page.evaluate(`(async () => wkn((arg) => arg + 100, 10))()`)).resolves.toBe(110);
  });
  it('wkn get resolve when good function2', async () => {
    await expect(page.evaluate(`(async () => wkn((arg) => arg + "!", "hoge"))()`)).resolves.toBe('hoge!');
  });
  it('wkn get resolve when some args function1', async () => {
    await expect(page.evaluate(`(async () => wkn((arg1, arg2) => arg1 + arg2, 10, 100))()`)).resolves.toBe(110);
  });
  it('wkn get resolve when some args function2', async () => {
    await expect(page.evaluate(`(async () => wkn((arg1, arg2) => arg1 + "!" + arg2 + "!", "hoge", "foo"))()`)).resolves.toBe('hoge!foo!');
  });
  it('wkn get resolve with importScripts', async () => {
    await expect(page.evaluate(`(async () => 
      wkn(
        (arg1) => {
          importScripts('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js');
          const m = moment(new Date(2011, 2, 12, 5, 0, 0));
          return m.hours()
        }, "hoge")
    )()`)).resolves.toBe(5);
  });
  it('wkn get rejects when bat function', async () => {
    await expect(page.evaluate(`(async () => wkn((arg) => arg.map( _ =>  _ + '!'), {}))()`)).rejects.toThrowError('arg.map is not a function');
  });
})