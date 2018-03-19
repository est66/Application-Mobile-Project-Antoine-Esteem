import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Issue } from '../../models/issue';
import { IssuesProvider } from '../../providers/issues/issues.provider';
import { NgForm } from '@angular/forms';
import { CommentRequest } from '../../models/comment-request';
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

  @ViewChild(NgForm)
  form: NgForm;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams,
    private issueProvider: IssuesProvider ) {
      this.commentRequest = new CommentRequest();
      console.log(navCtrl);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.issue = this.navParams.data;
    this.loadComments(this.issue.id);
  }

  createComment(id:string) {
    this.issueProvider.postIssueComment(this.commentRequest, id).subscribe(comment => {
      this.comments.push(comment);
    });
    this.showToast('top');
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
    console.log(comments);
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

}
