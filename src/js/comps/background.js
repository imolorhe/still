import Component from './component';

class Background extends Component {
  constructor() {
    super('bg');
    this.$root.hide(); // Hide the background component first
    // Show the background component when the image has fully loaded
    this.$(window).on('load', () => this.$root.fadeIn(1000));
  }
}

export default Background;
