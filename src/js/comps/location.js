import Component from './component';
import Location from '../utils/location';
import Storage from '../utils/storage';

class WallLocation extends Component {
  constructor() {
    super('wl');
    this.storage = new Storage('wl');

    const city = this.storage.get('city');
    if (city) {
      this.$root.text(city);
    }

    this.location = new Location();
    this.location.ready(city => {
      this.$root.text(city);
      this.storage.set('city', city);
    });
  }
}

export default WallLocation;
