import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { config } from '../../app/config';
import { Geolocation } from '@ionic-native/geolocation';
import { IssuesProvider } from '../../providers/issues/issues.provider';
import { Issue } from '../../models/issue';

import { NgForm } from '@angular/forms';
import { issueType } from '../../models/issueType';
import { IssueRequest } from '../../models/issue-request';

import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';
import { onErrorResumeNext } from 'rxjs/observable/onErrorResumeNext';

import { ToastController } from 'ionic-angular';
import { IssueListPage } from '../issue-list/issue-list';

/**
 * Generated class for the CreateIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-issue',
  templateUrl: 'create-issue.html',
})
export class CreateIssuePage {
  pictureData: string;
  issue:Issue;
  issues:Issue[];
  issuetypes : issueType[];
  issuerequest : IssueRequest;
  picture: QimgImage;

  constructor(
    private auth: AuthProvider,
    private httpClient: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private camera: Camera,
    private issueProvider: IssuesProvider,
    private pictureService: PictureProvider,
    public toastCtrl: ToastController
  ) {
    this.issue = new Issue();
    this.issuerequest = new IssueRequest();
    this.issuerequest.location = {
      coordinates : [0,0],
      type : 'Point'
    }
    this.issuerequest.state = "new";
    this.issuerequest.imageUrl = "";
  }

  @ViewChild(NgForm)
  form: NgForm;

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateIssuePage');

    this.loadIssuetypes();
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.issuerequest.imageUrl =  this.picture.url;
      this.showToastpicture('top', this.issuerequest.imageUrl);
    }, err => {
      console.warn('Could not take picture', err);
      this.showToastpicture('top', err);
    });
  }
    
  logOut() {
    this.auth.logOut();
  }

  loadIssuetypes() {
      this.issueProvider.getIssueTypes().subscribe((issuetypes) =>  {
      this.issuetypes = issuetypes;
      console.log(issuetypes);
    })
  }
  createIssue($event) {

    $event.preventDefault();

    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      let latitude = coords.latitude;
      let longitude = coords.longitude;

      this.issuerequest.location.coordinates = [longitude, latitude];

    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message} , ...setting coordinates to [0,0]`);
    });

    console.log(this.issuerequest);

    this.issueProvider.postNewIssue(this.issuerequest).subscribe(undefined => {
      console.log("issue posted !! ");
      this.showToast('top');
      this.form.reset();
      this.navCtrl.push(IssueListPage);
    });
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Issue added !',
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  showToastpicture(position: string, urlpicture : string) {
    let toast = this.toastCtrl.create({
      message: 'picture added !'+ urlpicture,
      duration: 10000,
      position: position
    });
    toast.present(toast);
  }


}
