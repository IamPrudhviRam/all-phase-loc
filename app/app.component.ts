import { Component } from '@angular/core';
import { LatLngBounds } from '@agm/core';
import { blueLatLngs } from '../constants/blue-lat-lngs';
import { yellowLatLngs } from '../constants/yellow-lat-lngs';
import { orangeLatLngs } from '../constants/orange-lat-lngs';
declare var google: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  zoom: number = 8;

  // initial center position for the map
  latti: number = 22.872264;
  longi: number = 76.13776;

  distanceInMeters: number = 5000;

  blueLatLngs: any = blueLatLngs;
  yellowLatLngs: any = yellowLatLngs;
  orangeLatLngs: any = orangeLatLngs;

  circleWhite = '#e6e6e6';
  circleOrange = '#8cff66';
  circleBlue = '#4da6ff'; // light #b3daff

  strokeGrey = '#bfbfbf';

  strokeYellow = '#e6e600';
  strokeOrange = '#66ff33';
  strokeBlue = '#b3daff';

  strokeWeight = 1;
  fillOpacity = 0.1;

  hideTen: boolean = false;
  showId: boolean = true;
  icon: any = {
    // url: 'https://img.icons8.com/color/24/null/map-pin.png',
    // url: 'https://img.icons8.com/fluency/24/null/map-pin.png',
    // url: 'https://img.icons8.com/fluency/' + 24 + '/000000/map-pin.png',
    url: 'https://img.icons8.com/material-sharp/' + 24 + '/D12020/marker.png',

    // url: 'https://img.icons8.com/color/' + 24 + '/000000/marker--v1.png',
    // url: '',
    scaledSize: {
      width: 24,
      height: 24,
    },
  };

  mapReady(map: any) {
    const bonds: LatLngBounds = new google.maps.LatLngBounds();

    this.blueLatLngs.map((item: any) => {
      bonds.extend(new google.maps.LatLng(item[0], item[1]));
    });
    this.yellowLatLngs.map((item: any) => {
      bonds.extend(new google.maps.LatLng(item[0], item[1]));
    });
    this.orangeLatLngs.map((item: any) => {
      bonds.extend(new google.maps.LatLng(item[0], item[1]));
    });

    map.fitBounds(bonds);
  }

  zoomChange(zoom: any) {
    console.log('zoom change:', zoom);

    let number = 24;
    if (zoom <= 8) {
      number = 36 - zoom;
    } else {
      number = 10 + 2 * zoom;
    }

    this.icon = {
      // url: 'https://img.icons8.com/color/' + number + '/null/map-pin.png',
      // url: 'https://img.icons8.com/fluency/' + number + '/null/map-pin.png',
      // url: 'https://img.icons8.com/fluency/' + number + '/000000/map-pin.png',
      // url: 'https://img.icons8.com/color/' + number + '/000000/marker--v1.png',
      url:
        'https://img.icons8.com/material-sharp/' +
        number +
        '/D12020/marker.png',

      // url: '',
      scaledSize: {
        width: number,
        height: number,
      },
    };
  }

  circleClicked(event: any) {
    console.log('clicked', event);
  }
  mouseOver(event: any) {
    console.log('mouse over', event);
  }
  mouseOut(event: any) {
    console.log('mouse over', event);
  }

  hideTenKms(event: any) {
    this.hideTen = !this.hideTen;
  }

  showIds(event: any) {
    this.showId = !this.showId;
  }
}
