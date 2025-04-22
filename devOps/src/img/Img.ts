// @ts-ignore
import './Img.css';

export class Img {
  private imgElement: HTMLImageElement;

  constructor(src: string, alt: string) {
    this.imgElement = document.createElement('img');
    this.imgElement.classList.add('form-image');

    this.imgElement.src = src;
    this.imgElement.alt = alt;
  }

  public getImageElement(): HTMLElement {
    return this.imgElement;
  }
}