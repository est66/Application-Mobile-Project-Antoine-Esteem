import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Issue } from '../../models/issue';
import { IssuesProvider } from '../../providers/issues/issues.provider';

import { CommentRequest } from '../../models/comment-request';
import { IssueListPage } from '../issue-list/issue-list';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  issue: Issue;
  show: boolean = false;
  showform: boolean = true;
  comments: Comment[];
  commentRequest: CommentRequest;
  commentNumber:number;
  idIssue: string;
  loginError: boolean;

  @ViewChild(NgForm)
  form: NgForm;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams,
    private issueProvider: IssuesProvider,
  ) {
      this.issue = this.navParams.data;
      this.commentRequest = new CommentRequest();
      console.log(navCtrl);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad DetailsPage');
    this.loadComments(this.issue.id);
  }

  createComment(id:string, $event) {

    // Prevent default HTML form behavior.
    $event.preventDefault();

    // Do not do anything if the form is invalid.
    if (this.form.invalid) {
      return;
    }

    this.issueProvider.postIssueComment(this.commentRequest, id).subscribe(comment => {
      this.comments.push(comment);
      this.showToast('top');
      this.goToDetails();
    });
    
  }

  showComments(id:string) {
    if (this.show == false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  showCommentfrom() {
    this.showform = true;
  }

  loadComments(id:string) {
    this.issueProvider.getIssueComment(id).subscribe((comments) =>  {
    this.comments = comments;
    this.commentNumber = comments.length;
    })
  } 

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Comment added !',
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }

  goToDetails() {
    console.log("go to Issueslist");
    this.navCtrl.push(DetailsPage, this.issue);
  }

}
