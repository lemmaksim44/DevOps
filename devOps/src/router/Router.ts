export class Router {
  private routes: { [key: string]: () => void } = {};

  constructor(private container: HTMLElement) {
    window.addEventListener('popstate', () => {
      this.renderPage(location.pathname);
    });

  }

  public addRouter(path: string, renderFun: () => void): void {
    this.routes[path] = renderFun;
  }

  public navigateTo(path: string): void {
    history.pushState(null, '', path);
    this.renderPage(path);
  }

  public renderPage(path: string): void {
    this.container.innerHTML = '';
    const render = this.routes[path];

    if (render) {
      render();
    } else {
      this.container.innerHTML = '<h1>404 - Page Not Found</h1>';
    }

    }
  }
