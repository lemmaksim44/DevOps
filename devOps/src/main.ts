import { Header } from "./header/Header";

export class App {
  private header: Header;

  constructor(private container: HTMLElement) {
    this.header = new Header();
    this.init();
  }

  private init(): void {
    const headerElement = this.header.getHeaderElement();
    this.container.appendChild(headerElement);
  }

}