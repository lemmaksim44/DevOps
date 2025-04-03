// @ts-ignore
import './Crud.css';
import { CrudItem } from './crudItem/CrudItem';

export class Crud {
  crudContainer: HTMLElement;
  private items: CrudItem;

  constructor() {
    this.items = new CrudItem();
    this.crudContainer = this.createCrudContainer();
  }

  private createCrudContainer(): HTMLElement {
    const crudContainer = document.createElement('div');
    crudContainer.classList.add('crud__container');

    const crudForm = this.items.getElement();
    crudContainer.append(crudForm);


    return crudContainer;
  }


  public getPetsElement(): HTMLElement {
    return this.crudContainer;
  }
}
