import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Issue } from '../../models/issue';
import { App, MenuController } from 'ionic-angular';
import { IssuesProvider } from '../../providers/issues/issues.provider';
import { FormControl } from '@angular/forms';

import { DetailsPage } from '../details/details';
import 'rxjs/add/operator/debounceTime';


/**
 * Generated class for the IssueListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-list',
  templateUrl: 'issue-list.html',
})
export class IssueListPage {
  issues: Issue[];
  filteredIssues: Issue[];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 1000;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private issueProvider: IssuesProvider) {
      
      this.searchControl = new FormControl();
  }
  //initial load
  loadIssues() {
      this.issueProvider.getIssues(this.page).subscribe((issues) =>  {
      this.issues = issues;
      this.filteredIssues = issues;
    })
  }

  //on page loading
  ionViewWillEnter() {
    this.loadIssues();
    this.setFilteredIssues();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredIssues();
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredIssues() {
    this.filteredIssues = this.filterIssues(this.searchTerm);
  }

  filterIssues(searchTerm){
    console.log(searchTerm);
    if (searchTerm != '') {
      return this.issues.filter((issue) => {
        return issue.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    } else {
      return this.issues;
    }
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.issueProvider.getIssues(this.page).subscribe((newissues) =>  {
        for(let i=0; i<newissues.length; i++) {
          this.filteredIssues.push(newissues[i]);
        }
      });
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  goToDetails(issue:Issue) {
    console.log("go to details")
    console.log(issue);
    this.navCtrl.push(DetailsPage, issue);
  }
}
