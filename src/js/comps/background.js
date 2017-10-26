import Component from './component';

class Background extends Component {
  constructor() {
    super('bg');
    // Show the background component when the image has fully loaded
    this.$(window).on('load', () => this.$root.addClass('show-bg'));
  }
}

export default Background;
