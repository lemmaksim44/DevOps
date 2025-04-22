import { Header } from "./header/Header";
import { Form } from "./form/Form";
import { Img } from "./img/Img";
import { Router } from "./router/Router";
import { PetsContainer } from "./pets/Pets";

// @ts-ignore
import './style.css';


export class App {
  private header: Header;
  private form: Form;
  private img: Img
  router: Router;
  private pets: PetsContainer;

  constructor(private container: HTMLElement) {
    this.header = new Header();
    this.router = new Router(this.container);
    this.form = new Form(this.router);
    this.img = new Img(
      '/./main-dog.png',
      'Logo'
    );
    this.pets = new PetsContainer();
    this.registerRoutes();
    this.router.renderPage(location.pathname);
  }

  registerRoutes(): void {
    this.router.addRouter("/", () => this.renderLoginPage());
    this.router.addRouter("/main", () => this.renderMainPage());
    this.router.addRouter("*", () => this.renderLoginPage());
  }

  public renderLoginPage(): void {
    this.container.innerHTML = "";
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');

    const headerElement = this.header.getHeaderElement();
    this.header.updateHeaderStyle('/');
    this.container.append(headerElement);

    const formElement = this.form.getFormElement();
    mainContainer.append(formElement);

    const imgContainer = this.img.getImageElement();
    mainContainer.append(imgContainer);

    const mainScrollContainer = document.createElement('div');
    mainScrollContainer.classList.add('main__scroll-container');

    mainScrollContainer.append(headerElement, mainContainer);
    this.container.append(mainScrollContainer);
  }

  public async renderMainPage(): Promise<void> {
    this.container.innerHTML = "";

    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-page');

    const headerElement = this.header.getHeaderElement();
    this.header.updateHeaderStyle('/main');
    this.container.append(headerElement);

    const petsElemnt = this.pets.getPetsElement();
    mainContainer.append(petsElemnt);


    await this.pets.loadPets();
    this.container.append(mainContainer)

  }

}