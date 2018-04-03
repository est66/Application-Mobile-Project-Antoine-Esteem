import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

//models
import { User } from '../../models/user';
import { SignInRequest } from '../../models/signin-request';

//providers
import { AuthProvider } from '../../providers/auth/auth';
import { UsersProvider } from '../../providers/users/users.provider';

import { config } from '../../app/config';
import { NgForm } from '@angular/forms';






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
  signInRequest: SignInRequest;
  users: User[];

  constructor(
    private auth: AuthProvider,
    public navCtrl: NavController,
    private userProvider: UsersProvider,
    public navParams: NavParams,
    public toastCtrl: ToastController, ) {
    this.signInRequest = new SignInRequest();
    this.signInRequest.roles = ['citizen'];
  }

  @ViewChild(NgForm)
  form: NgForm;

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  createUser($event) {

    $event.preventDefault();

    console.log(this.signInRequest);
    $event.preventDefault();

    this.auth.postNewUser(this.signInRequest).subscribe(user => {
      let userRequest = {
        name: user.name,
        password: this.signInRequest.password
      }
      console.log(userRequest)
      this.auth.logIn(userRequest).subscribe(user => {
        console.log(user);
      }, err => {
        console.log(err);
        alert(err.message)

      });
      this.showToast('top');
    });

  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Welcome to the app !',
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}
