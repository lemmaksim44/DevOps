import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Crud } from './Crud';

// Заглушка DOM API
const mockDiv = {
  classList: {
    add: vi.fn(),
  },
  append: vi.fn(),
} as unknown as HTMLDivElement;

const mockFormElement = {} as HTMLElement;

vi.stubGlobal('document', {
  createElement: vi.fn((tag: string) => {
    if (tag === 'div') return mockDiv;
    return mockFormElement;
  }),
});

// Мок для CrudItem
vi.mock('./crudItem/CrudItem', () => {
  return {
    CrudItem: vi.fn().mockImplementation(() => ({
      getElement: vi.fn().mockReturnValue(mockFormElement),
    })),
  };
});

describe('Crud class', () => {
  let crud: Crud;

  beforeEach(() => {
    vi.clearAllMocks();
    crud = new Crud();
  });

  it('should create crudContainer element', () => {
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(mockDiv.classList.add).toHaveBeenCalledWith('crud__container');
    expect(mockDiv.append).toHaveBeenCalledWith(mockFormElement);
    expect(crud.getCrudElement()).toBe(mockDiv);
  });
});
