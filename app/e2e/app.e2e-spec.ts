import { Alltomp3Page } from './app.po';

describe('alltomp3 App', function() {
  let page: Alltomp3Page;

  beforeEach(() => {
    page = new Alltomp3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
