import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Router } from './Router';

describe('Router', () => {
  let router: Router;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    router = new Router(container);
  });

  it('should add a route and call the correct callback', () => {
    const callback = () => {};
    router.addRouter('/', callback);

    const renderSpy = vi.spyOn(router, 'renderPage');
    router.renderPage('/');

    expect(renderSpy).toHaveBeenCalledWith('/');
  });

  it('should navigate correctly with navigateTo', () => {
    const renderSpy = vi.spyOn(router, 'renderPage');
    const pushStateSpy = vi.spyOn(window.history, 'pushState');
    const mainCallback = () => {};

    router.addRouter('/main', mainCallback);
    router.navigateTo('/main');

    expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/main');
    expect(renderSpy).toHaveBeenCalledWith('/main');
  });
});
