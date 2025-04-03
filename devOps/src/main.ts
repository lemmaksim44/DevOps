import { Header } from "./header/Header";
import { Form } from "./form/Form";
import { Img } from "./img/Img";
import { Router } from "./router/Router";
import { PetsContainer } from "./pets/Pets";
// import { Crud } from "./crud/Crud";

// @ts-ignore
import './style.css';


export class App {
  private header: Header;
  private form: Form;
  private img: Img
  private router: Router;
  private pets: PetsContainer;
  // private crud: Crud;

  constructor(private container: HTMLElement) {
    this.header = new Header();
    this.form = new Form(() => this.router.navigateTo("/main"));
    this.router = new Router(this.container);
    this.img = new Img(
      '/./main-dog.png',
      'Logo'
    );
    this.pets = new PetsContainer();
    // this.crud = new Crud();
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
    this.header.updateHeaderStyle('/');
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
    this.header.updateHeaderStyle('/main');
    this.container.append(headerElement);

    const petsElemnt = this.pets.getPetsElement();

    // const crudContainer = this.crud.getPetsElement();
    // petsElemnt.append(crudContainer);
    mainContainer.append(petsElemnt);
    this.container.append(mainContainer)

    this.pets.addPet(
      "Иван Иванов",
      "Барсик",
      "Кот",
      "03/04/2025",
      "10:30",
      "Проведен осмотр, вакцинация.",
      "/./pencil.png",
      "./bin.png"
    );

  }

}