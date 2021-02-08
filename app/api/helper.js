export default class Timer {
  constructor(func) {
    this.timer = null;
    this.func = func;
  }

  start() {
    if (!this.timer) {
      this.timer = setInterval(this.func, 1000);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
