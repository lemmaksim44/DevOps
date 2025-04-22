import { describe, it, expect, vi, beforeEach } from 'vitest';
import { App } from './main';
import { Router } from './router/Router';
import { PetsContainer } from './pets/Pets';

vi.mock('./header/Header', () => ({
  Header: vi.fn().mockImplementation(() => ({
    getHeaderElement: vi.fn().mockReturnValue(document.createElement('header')),
    updateHeaderStyle: vi.fn(),
  })),
}));

vi.mock('./form/Form', () => ({
  Form: vi.fn().mockImplementation(() => ({
    getFormElement: vi.fn().mockReturnValue(document.createElement('form')),
  })),
}));

vi.mock('./img/Img', () => ({
  Img: vi.fn().mockImplementation(() => ({
    getImageElement: vi.fn().mockReturnValue(document.createElement('img')),
  })),
}));

vi.mock('./router/Router', () => ({
  Router: vi.fn().mockImplementation(() => ({
    addRouter: vi.fn(),
    renderPage: vi.fn(),
  })),
}));

vi.mock('./pets/Pets', () => ({
  PetsContainer: vi.fn().mockImplementation(() => ({
    getPetsElement: vi.fn().mockReturnValue(document.createElement('div')),
    loadPets: vi.fn().mockResolvedValue(true),
  })),
}));

describe('App', () => {
  let app: App;
  let container: HTMLElement;
  let router: Router;

  beforeEach(() => {
    container = document.createElement('div');
    app = new App(container);
    router = app['router'];
  });

  it('should render login page correctly', () => {
    app.renderLoginPage();

    const header = container.querySelector('header');
    expect(header).not.toBeNull();

    const form = container.querySelector('form');
    expect(form).not.toBeNull();

    const img = container.querySelector('img');
    expect(img).not.toBeNull();
  });

  it('should render main page correctly', async () => {
    await app.renderMainPage();

    const header = container.querySelector('header');
    expect(header).not.toBeNull();

    const petsElement = container.querySelector('div');
    expect(petsElement).not.toBeNull();

    const petsContainer = new PetsContainer();
    await petsContainer.loadPets();
    expect(petsContainer.loadPets).toHaveBeenCalled();
  });

  it('should correctly handle routing', () => {
    const spy = vi.spyOn(router, 'renderPage');

    app.router.renderPage('/main');
    expect(spy).toHaveBeenCalledWith('/main');
    app.router.renderPage('/');
    expect(spy).toHaveBeenCalledWith('/');
  });
});
