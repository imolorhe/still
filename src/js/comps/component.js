import $ from 'jquery';

class Component {
  constructor(compKey = null) {
    this.$ = $;
    this.key = compKey;
    if (this.key) {
      this.$root = $(`[data-component="${this.key}"]`);
    } else {
      this.$root = $(`[data-component]`);
    }
  }
}

export default Component;
