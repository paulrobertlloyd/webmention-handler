const exampleUrl = 'https://localhost:8080';
const exampleHtml = '<html><head><title>example</title></head></html>';

let fetchSpy: any;
let textSpy: any;

describe('fetchHtml', () => {
  beforeAll(() => {
    textSpy = jest.fn(() => exampleHtml);
    fetchSpy = jest.fn(async (url: string) => {
      if(url === exampleUrl) return {
        text: textSpy
      }
      throw new Error('Fetch failed');
    });
    jest.mock('cross-fetch', () => fetchSpy);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('returns the html if the fetch succeeded', async () => {
    const { fetchHtml } = require("./fetch-html.function");
    await expect(fetchHtml(exampleUrl)).resolves.toEqual(exampleHtml)
    expect(fetchSpy).toHaveBeenCalledWith(exampleUrl, {});
    expect(textSpy).toHaveBeenCalled();
  });

  it('returns false if the fetch failed', async () => {
    const { fetchHtml } = require("./fetch-html.function");
    const exampleUrl = 'http://example.org';
    await expect(fetchHtml(exampleUrl)).resolves.toEqual(false)
    expect(fetchSpy).toHaveBeenCalledWith(exampleUrl, {});
  });
})