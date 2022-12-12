import { Component, OnInit, ViewChild } from '@angular/core';
import { LatLngBounds } from '@agm/core';
import { blueLatLngs } from '../constants/blue-lat-lngs';
import { phase1LatLngs } from '../constants/blue-lat-lngs';
import { phase2LatLngs } from '../constants/blue-lat-lngs';
import { phase3LatLngs } from '../constants/blue-lat-lngs';
import { yellowLatLngs } from '../constants/yellow-lat-lngs';
import { orangeLatLngs } from '../constants/orange-lat-lngs';
import { AgmMap } from '@agm/core';
import { purpleLatLngs } from '../constants/purple-lat-lngs';
declare var google: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('agmMap', { static: false }) agmMap: AgmMap;
  zoom: number = 8;

  // initial center position for the map
  latti: number = 22.872264;
  longi: number = 76.13776;

  distanceInMeters: number = 5000;

  blueLatLngs: any[] = blueLatLngs;
  yellowLatLngs: any[] = yellowLatLngs;
  orangeLatLngs: any[] = orangeLatLngs;
  purpleLatLngs: any[] = purpleLatLngs;

  phase1Checked: boolean = true;
  phase2Checked: boolean = true;
  phase3Checked: boolean = true;

  circleWhite = '#e6e6e6';
  circleOrange = '#8cff66';
  circleBlue = '#4da6ff';

  strokeGrey = '#bfbfbf';

  strokeYellow = '#e6e600';
  strokePurple = '#8a0fd7';
  strokeOrange = '#FF0000';
  strokeBlue = '#b3daff';

  strokeWeight = 1;
  fillOpacity = 0.1;

  hideTen: boolean = false;
  showId: boolean = true;
  icon: any = this.makeMarker(24, 'D12020');
  redIcon: any = this.makeMarker(24, 'D12020');
  purpleIcon: any = this.makeMarker(24, '8a0fd7');
  blueIcon: any = this.makeMarker(24, '0000e6');
  yellowIcon: any = this.makeMarker(24, 'cccc00');

  checkboxesList = [
    {
      id: 'phase1',
      label: 'Phase 1',
      isChecked: true,
    },
    {
      id: 'phase2',
      label: 'Phase 2',
      isChecked: true,
    },
    {
      id: 'phase3',
      label: 'Phase 3',
      isChecked: true,
    },
  ];
  selectedItemsList: any = [];
  checkedIDs: any = [];

  ngOnInit() {
    this.fetchSelectedItems();

    const phase1Count = this.yellowLatLngs.length + phase1LatLngs.length;
    const phase2Count = this.purpleLatLngs.length + phase2LatLngs.length;
    const phase3Count = this.orangeLatLngs.length + phase3LatLngs.length;

    console.log('phase 1: ', phase1Count);
    console.log('phase 2: ', phase2Count);
    console.log('phase 3: ', phase3Count);
    console.log('Total: ', phase1Count + phase2Count + phase3Count);
  }

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
    // console.log('zoom change:', zoom);

    let number = 24;
    if (zoom <= 8) {
      number = 36 - zoom;
    } else {
      number = 10 + 2 * zoom;
    }

    this.icon = this.makeMarker(number, 'D12020');
    this.redIcon = this.makeMarker(number, 'D12020');
    this.purpleIcon = this.makeMarker(number, '8a0fd7');
    this.blueIcon = this.makeMarker(number, '3333ff');
    this.yellowIcon = this.makeMarker(number, 'cccc00');
  }

  makeMarker(number, color) {
    return {
      url:
        'https://img.icons8.com/material-sharp/' +
        number +
        '/' +
        color +
        '/marker.png',
      scaledSize: {
        width: number,
        height: number,
      },
    };
  }

  changeSelection() {
    this.fetchSelectedItems();
  }

  // Selected item
  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesList.filter((value, index) => {
      return value.isChecked;
    });
    this.modifyBlueLatLngs();
  }

  // IDs of selected item
  fetchCheckedIDs() {
    this.checkedIDs = [];
    this.checkboxesList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  modifyBlueLatLngs() {
    this.blueLatLngs = [];
    if (this.checkboxesList[0].isChecked) {
      this.blueLatLngs = this.blueLatLngs.concat(phase1LatLngs);
    }
    if (this.checkboxesList[1].isChecked) {
      this.blueLatLngs = this.blueLatLngs.concat(phase2LatLngs);
    }
    if (this.checkboxesList[2].isChecked) {
      this.blueLatLngs = this.blueLatLngs.concat(phase3LatLngs);
    }
    // console.log('modify blue::', this.blueLatLngs);
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

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
