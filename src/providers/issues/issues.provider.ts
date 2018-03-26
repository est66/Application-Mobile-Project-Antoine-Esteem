import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Issue } from '../../models/issue';
import { config } from '../../app/config';

import { CommentRequest } from '../../models/comment-request';
import { issueType } from '../../models/issueType';
import { IssueRequest } from '../../models/issue-request';


/*
  Generated class for the IssuesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssuesProvider {
  url: string = 'https://comem-appmob-2018d.herokuapp.com/api';
  issue: Issue;
  issuetype : issueType;
  
  constructor(public httpClient: HttpClient) {
    console.log('Hello IssuesProvider Provider');
  }

  private headers = new Headers(
    {
        'Content-Type': 'application/json'
    });

  getIssues(page): Observable<Issue[]> {
    return this.httpClient
      .get<Issue[]>(this.url+'/issues?include=creator&include=issueType&page='+page+'&pageSize=20').pipe();
  } 

  getIssueTypes() : Observable<issueType[]> {
    return this.httpClient
    .get<issueType[]>(this.url+'/issueTypes').pipe();
  }

  getIssue(id:string): Observable<Issue> {
    return this.httpClient
    .get<Issue>(this.url+'/issues/'+id).pipe();
  }

  postNewIssue(issuerequest:IssueRequest) : Observable<Issue> {
    console.log("posting...."+issuerequest);
    return this.httpClient.post<Issue>(this.url+'/issues', issuerequest).pipe();
  }

  getIssueComment(idIssue:string) : Observable<Comment[]> {
    return this.httpClient
    .get<Comment[]>(this.url+'/issues/'+idIssue+'/comments?include=author').pipe();
  }

  postIssueComment(commentRequest : CommentRequest, idIssue : string): Observable<Comment> {
    return this.httpClient
    .post<Comment>(this.url+'/issues/'+idIssue+'/comments', commentRequest).pipe();
  }
}
