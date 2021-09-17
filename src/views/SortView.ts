class SortView {
  #container = document.querySelector<HTMLButtonElement>('.btn--sort')!;
  constructor() {}

  toggleArrowIcon(currentState: string) {
    switch (currentState) {
      case 'ASC':
        this.#container.innerHTML = '&uparrow; SORT';
        break;

      case 'DESC':
        this.#container.innerHTML = '&downarrow; SORT';
        break;
    }
  }

  addClickHandler(handler: Function) {
    this.#container.addEventListener('click', () => {
      handler();
    });
  }
}

export default new SortView();
