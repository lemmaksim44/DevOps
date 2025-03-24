// @ts-ignore
import './Header.css';


export class Header {
  private headerContainer: HTMLElement;

  constructor() {
    this.headerContainer = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('header');

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header__container');
    headerContainer.textContent = 'Aurum Vet';

    header.append(headerContainer);
    return header;
  }

  public getHeaderElement(): HTMLElement {
    return this.headerContainer;
  }
}