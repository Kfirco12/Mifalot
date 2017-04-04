import { MifalotAppPage } from './app.po';

describe('mifalot-app App', function() {
  let page: MifalotAppPage;

  beforeEach(() => {
    page = new MifalotAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
