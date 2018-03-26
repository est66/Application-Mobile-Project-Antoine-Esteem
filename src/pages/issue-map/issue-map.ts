import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { latLng, Map, MapOptions, marker, Marker, tileLayer } from 'leaflet';

import { IssuesProvider } from '../../providers/issues/issues.provider';
import { Issue } from '../../models/issue';

import { DetailsPage } from '../details/details';
/**
 * Generated class for the IssueMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-map',
  templateUrl: 'issue-map.html',
})
export class IssueMapPage {
  issues: Issue[];
  countIssues : number = 0;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map; 

  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 7;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private geolocation: Geolocation,
    private issueProvider: IssuesProvider
  ) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = { maxZoom: 18 };
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
    this.mapMarkers = [
      marker([ 46.778186, 6.641524 ]).bindTooltip('Hello')
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueMapPage');
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      let latitude = coords.latitude;
      let longitude = coords.longitude;
      
      this.map.setView(latLng(latitude, longitude), 13);
      this.mapMarkers.push(marker([latitude, longitude]));

      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });

    // add marker issues 
    for(let i=1; i<this.totalPage-1; i++) {
      this.issueProvider.getIssues(i).subscribe((issues) =>  {
        this.issues = issues;
        this.fillMarkerArray(this.issues);
      })
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map.on('moveend', () => {
      const center = this.map.getCenter();
    });
  }

  fillMarkerArray(issues: Issue[]) {
    console.log(issues);
    for(let issue of issues) {
        this.countIssues++;
        let long = issue.location.coordinates[0];
        let lat = issue.location.coordinates[1];
        this.mapMarkers.push(marker([lat, long]).bindPopup(issue.description));
      }
      console.log(this.countIssues+' issues found')
  } 

  goToDetails(issue:Issue) {
    console.log("go to details")
    console.log(issue);
    this.navCtrl.push(DetailsPage, issue);
  }

  


}
