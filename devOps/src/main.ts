import { Header } from "./header/Header";
import { Form } from "./form/Form";
import { Img } from "./img/Img";

// @ts-ignore
import './style.css';


export class App {
  private header: Header;
  private form: Form;
  private img: Img

  constructor(private container: HTMLElement) {
    this.header = new Header();
    this.form = new Form();
    this.img = new Img(
      '/./main-dog.png',
      'Logo'
    );
    this.init();
  }

  private init(): void {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');

    const headerElement = this.header.getHeaderElement();
    this.container.append(headerElement);

    const formElement = this.form.getFormElement();
    mainContainer.append(formElement);

    const imgContainer = this.img.getImageElement();
    mainContainer.append(imgContainer);

    this.container.append(mainContainer);
  }

}