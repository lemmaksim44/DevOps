export class Router {
  private routes: { [key: string]: Function } = {};

  constructor(private container: HTMLElement) {
    if (!container) {
      console.warn('Router: container element is required');
    }
  }

  addRouter(path: string, callback: Function): void {
    this.routes[path] = callback;
  }

  renderPage(path: string): void {
    console.log('Current container:', this.container);
    const route = this.routes[path] || this.routes['*'];
    if (route) {
      route();
    }
  }

  navigateTo(path: string): void {
    window.history.pushState({}, '', path);
    this.renderPage(path);
  }
}
