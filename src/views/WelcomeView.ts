class WelcomeView {
  #container = document.querySelector<HTMLParagraphElement>('.welcome')!;

  constructor() {}

  render(data: string) {
    this.#container.textContent = data;
  }
}

export default new WelcomeView();
