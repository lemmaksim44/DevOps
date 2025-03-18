import { Header } from "./header/Header";
import { Form } from "./form/Form";

export class App {
  private header: Header;
  private form: Form;

  constructor(private container: HTMLElement) {
    this.header = new Header();
    this.form = new Form();
    this.init();
  }

  private init(): void {
    const headerElement = this.header.getHeaderElement();
    this.container.append(headerElement);

    const formElement = this.form.getFormElement();
    this.container.append(formElement);
  }

}