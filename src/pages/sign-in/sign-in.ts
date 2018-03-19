import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

//models
import { User } from '../../models/user';
import { SignInRequest } from '../../models/signin-request';

//providers
import { AuthProvider } from '../../providers/auth/auth';


import { config } from '../../app/config';




/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  SignInRequest: SignInRequest;
  users : User[];
  constructor(
    private auth: AuthProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController, ) {
    this.SignInRequest = new SignInRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  createUser() {
    this.auth.postNewUser(this.SignInRequest).subscribe(user => {
      this.users.push(user);
    });
    this.showToast('top');
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Comment added !',
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

}
