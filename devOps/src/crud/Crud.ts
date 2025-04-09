// @ts-ignore
import './Crud.css';
import { CrudItem } from './crudItem/CrudItem';

export class Crud {
  crudContainer: HTMLElement;
  private items: CrudItem;

  constructor(onPetAdded?: () => void) {
    this.items = new CrudItem(onPetAdded);
    this.crudContainer = this.createCrudContainer();
  }

  private createCrudContainer(): HTMLElement {
    const crudContainer = document.createElement('div');
    crudContainer.classList.add('crud__container');

    const crudForm = this.items.getElement();
    crudContainer.append(crudForm);


    return crudContainer;
  }


  public getCrudElement(): HTMLElement {
    return this.crudContainer;
  }
}
