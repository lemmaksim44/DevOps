import { Header } from "./header/Header";
import { Form } from "./form/Form";
import { Img } from "./img/Img";

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
    const headerElement = this.header.getHeaderElement();
    this.container.append(headerElement);

    const formElement = this.form.getFormElement();
    this.container.append(formElement);

    const imgContainer = this.img.getImageElement();
    this.container.append(imgContainer);
  }

}