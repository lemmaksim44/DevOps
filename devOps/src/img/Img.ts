// @ts-ignore
import './Img.css';

export class Img {
  // private imgContainer: HTMLElement;
  private imgElement: HTMLImageElement;

  constructor(src: string, alt: string) {
    // this.imgContainer = document.createElement('div');
    this.imgElement = document.createElement('img');

    // this.imgContainer.classList.add('image-container');
    this.imgElement.classList.add('form-image');

    this.imgElement.src = src;
    this.imgElement.alt = alt;

    // this.imgContainer.appendChild(this.imgElement);
  }

  public getImageElement(): HTMLElement {
    return this.imgElement;
  }
}