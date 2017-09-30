import $ from 'jquery';
import Location from '../utils/location';

class WallLocation {
  constructor() {
    this.$root = $('[data-wl]');

    this.location = new Location();
    this.location.ready(city => this.$root.text(city));
  }
}

export default WallLocation;
