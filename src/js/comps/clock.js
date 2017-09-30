import $ from 'jquery';

class WallClock {
  constructor() {
    this.$root = $('[data-wc]');
    this.$h = this.$root.find('.wc-hour');
    this.$m = this.$root.find('.wc-minute');

    this.updateTime();
    this.startClock();

    console.log('Wall clock init.', this.$root);
  }

  updateTime() {
    const now = new Date();
    this.$h.text(now.getHours().toString().padStart(2, '0'));
    this.$m.text(now.getMinutes().toString().padStart(2, '0'));
  }

  startClock() {
    this.clockInterval = setInterval(() => this.updateTime(), 1000);
  }
}

export default WallClock;