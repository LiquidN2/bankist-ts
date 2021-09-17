class LoginLogoutView {
  #loginForm = document.querySelector<HTMLFormElement>('.login');
  #username = document.querySelector<HTMLInputElement>('.login__input--user');
  #pin = document.querySelector<HTMLInputElement>('.login__input--pin');
  #logoutBtn = document.querySelector<HTMLButtonElement>('.btn--logout');

  constructor() {}

  clearLoginInput() {
    if (!this.#username || !this.#pin) return;
    this.#username.value = this.#pin.value = '';
  }

  addLogoutHandler(handler: Function) {
    this.#logoutBtn?.addEventListener('click', () => {
      this.#logoutBtn?.classList.add('btn--hidden');
      this.#loginForm?.classList.remove('login--hidden');
      handler();
    });
  }

  addSubmitEventHandler(handler: (username: string, pin: number) => void) {
    this.#loginForm?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      if (!this.#username || !this.#pin) return;
      handler(this.#username.value, this.#pin.valueAsNumber);
      this.#logoutBtn?.classList.remove('btn--hidden');
      this.#loginForm?.classList.add('login--hidden');
      this.clearLoginInput();
    });
  }
}

export default new LoginLogoutView();
