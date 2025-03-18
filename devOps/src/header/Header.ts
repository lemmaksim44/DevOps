// @ts-ignore
import './Header.css';


export class Header {
  private headerContainer: HTMLElement;

  constructor() {
    this.headerContainer = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.classList.add('header__container');
    header.textContent = 'Aurum Vet';
    return header;
  }

  public getHeaderElement(): HTMLElement {
    return this.headerContainer;
  }
}