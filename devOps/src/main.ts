import { Header } from "./header/Header";
import { Form } from "./form/Form";
import { Img } from "./img/Img";
import { Router } from "./router/Router";

// @ts-ignore
import './style.css';


export class App {
  private header: Header;
  private form: Form;
  private img: Img
  private router: Router;

  constructor(private container: HTMLElement) {
    this.header = new Header();
    this.form = new Form(() => this.router.navigateTo("/main"));
    this.router = new Router(this.container);
    this.img = new Img(
      '/./main-dog.png',
      'Logo'
    );
    this.registerRoutes();
    this.router.renderPage(location.pathname);
  }

  private registerRoutes(): void {
    this.router.addRouter("/", () => this.renderLoginPage());
    this.router.addRouter("/main", () => this.renderMainPage());
  }

  private renderLoginPage(): void {
    this.container.innerHTML = "";
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

  private renderMainPage(): void {
    this.container.innerHTML = "";

    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-page');

    const headerElement = this.header.getHeaderElement();
    this.container.append(headerElement);
  }

}