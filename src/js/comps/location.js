import $ from 'jquery';

class WallLocation {
  constructor() {
    this.$root = $('[data-wl');
    // $.getScript('http://www.geoplugin.net/javascript.gp', () => {
    //   var country = geoplugin_countryName();
    //   var zone = geoplugin_region();
    //   var district = geoplugin_city();
    //   console.log("Your location is: " + country + ", " + zone + ", " + district);
    // });
  }
}

export default WallLocation;
