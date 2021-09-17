class AppView {
  #container = document.querySelector<HTMLElement>('.app')!;

  constructor() {}

  hide() {
    this.#container.style.opacity = '0';
  }

  reveal() {
    this.#container.style.opacity = '1';
  }
}

export default new AppView();
