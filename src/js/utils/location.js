class Location {
  constructor() {
    this.geocoder = new google.maps.Geocoder();

    this.getLocation();
  }

  ready(cb) {
    if (this.city) cb(this.getCity());
    else this.readyCb = cb;
  }

  getLocationSuccess(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.getLocationDetails();

  }
  getLocationError() {
    console.log('Geolocation failed.');
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => this.getLocationSuccess(position), this.getLocationError);
    } else {
      console.log('Geolocation is not available.');
    }
  }

  getCity() {
    return this.district.long_name + ' ' + this.city.long_name;
  }

  getLocationDetails() {
    const latlng = new google.maps.LatLng(this.lat, this.lng);

    this.geocoder.geocode({'latLng': latlng}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        // console.log(results);
        if (results[0]) {
          // // formatted address
          // console.log(results[0].formatted_address);
          // find country name
          for (var i = 0; i < results[0].address_components.length; i++) {
            for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
              if (results[0].address_components[i].types[b] == 'administrative_area_level_1') {
                //this is the object you are looking for
                this.city = results[0].address_components[i];
                break;
              }
              if (results[0].address_components[i].types[b] == 'administrative_area_level_2') {
                //this is the object you are looking for
                this.district = results[0].address_components[i];
                break;
              }
            }
          }
          if (this.readyCb) {
            this.readyCb(this.getCity());
          }
          // console.log(this.district.long_name + ' ' + this.city.long_name);
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
  }
}

export default Location;
