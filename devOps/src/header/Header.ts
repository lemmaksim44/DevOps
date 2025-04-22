// @ts-ignore
import './Header.css';


export class Header {
  private headerContainer: HTMLElement;

  constructor() {
    this.headerContainer = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('header');

    const headerContainer = document.createElement('h1');
    headerContainer.classList.add('header__title');
    headerContainer.textContent = 'Aurum Vet';


    header.append(headerContainer);
    return header;
  }

  public getHeaderElement(): HTMLElement {
    return this.headerContainer;
  }

  public updateHeaderStyle(page: string): void {
    if (page === "/main") {
      this.headerContainer.classList.add('main-page-header');
      this.headerContainer.classList.remove('login-page-header');
    } else {
      this.headerContainer.classList.add('login-page-header');
      this.headerContainer.classList.remove('main-page-header');
    }
  }
}