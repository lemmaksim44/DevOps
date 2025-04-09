// @ts-ignore
import './CrudItem.css'
import { ApiClient } from '../../request/Request';


export class CrudItem {
  private crudElement: HTMLElement;
  private petTypes = ['Собака', 'Кошка', 'Хомяк', 'Крыса', 'Морская свинка', 'Кролик', 'Попугай', 'Ёж'];
  private apiClient: ApiClient;
  private onPetAdded: () => void;

  constructor(onPetAdded?: () => void) {
    this.apiClient = new ApiClient();
    this.onPetAdded = onPetAdded || (() => {});
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

  private createTimeField(label: string): HTMLElement {
    const field = document.createElement('div');
    field.classList.add('crud__field');

    const input = document.createElement('input');
    input.classList.add('crud-input');
    input.type = 'time';
    input.placeholder = label;

    field.append(input);
    return field;
  }

  private createDateField(label: string): HTMLElement {
    const field = document.createElement('div');
    field.classList.add('crud__field');

    const input = document.createElement('input');
    input.classList.add('crud-input');
    input.type = 'date';
    input.placeholder = label;

    field.append(input);
    return field;
  }

  private createSelectField(label: string, options: string[]): HTMLElement {
    const field = document.createElement('div');
    field.classList.add('crud__field');

    const select = document.createElement('select');
    select.classList.add('crud-input');
    select.required = true;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `Выберите ${label.toLowerCase()}`;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    options.forEach(option => {
      const optElement = document.createElement('option');
      optElement.value = option;
      optElement.textContent = option;
      select.appendChild(optElement);
    });

    field.append(select);
    return field;
  }

  private createCrudElement(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'crud-container';

    const fields = [
      this.createDateField('Дата:'),
      this.createTimeField('Время:'),
      this.createField('ФИО владельца:'),
      this.createField('Кличка питомца:'),
      this.createSelectField('Питомец:', this.petTypes)
    ];

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'crud-submit';
    submitBtn.textContent = 'Добавить запись';

    container.append(...fields, submitBtn);
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleSubmit(fields);
    });
    return container;
  }

  private async handleSubmit(fields: HTMLElement[]): Promise<void> {
    const owner = (fields[2] as HTMLDivElement).querySelector('input')?.value;
    const petName = (fields[3] as HTMLDivElement).querySelector('input')?.value;
    const species = (fields[4] as HTMLDivElement).querySelector('select')?.value;
    const date = (fields[0] as HTMLDivElement).querySelector('input')?.value;
    const time = (fields[1] as HTMLDivElement).querySelector('input')?.value;

    if (!owner || !petName || !species || !date || !time) {
      return;
    }

    const newPetData = {
      owner,
      pet_name: petName,
      pet: species,
      date,
      time
    };

    try {
      await this.apiClient.createPet(newPetData);
      this.onPetAdded();
    } catch (error) {
      console.error('Error pet add:', error);
    }
  }

  public getElement(): HTMLElement {
    return this.crudElement;
  }
}