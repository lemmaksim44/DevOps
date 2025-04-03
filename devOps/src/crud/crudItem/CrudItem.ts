// @ts-ignore
import './CrudItem.css'

export class CrudItem {
  private crudElement: HTMLElement;

  constructor() {
    this.crudElement = this.createCrudElement();
  }

  private createField(label: string): HTMLElement {
    const field = document.createElement('div');
    field.classList.add('crud__field')

    const input = document.createElement('input');
    input.classList.add('crud-input');
    input.type = 'text';
    input.placeholder = label;

    field.append(input);
    return field;
  }

  private createCrudElement(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'crud-container';

    const fields = [
      this.createField('Дата:'),
      this.createField('Время:'),
      this.createField('ФИО владельца:'),
      this.createField('Кличка питомца:'),
      this.createField('Питомец:'),
      this.createField('Манипуляция:')
    ];

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'crud-submit';
    submitBtn.textContent = 'Добавить запись';

    container.append(...fields, submitBtn);
    return container;
  }

  public getElement(): HTMLElement {
    return this.crudElement;
  }
}