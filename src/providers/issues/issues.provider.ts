import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Issue } from '../../models/issue';
import { config } from '../../app/config';

import { CommentRequest } from '../../models/comment-request';


/*
  Generated class for the IssuesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssuesProvider {
  url: string = 'https://comem-appmob-2018d.herokuapp.com/api/issues';
  issue: Issue;
  
  constructor(public httpClient: HttpClient) {
    console.log('Hello IssuesProvider Provider');
  }

  private headers = new Headers(
    {
        'Content-Type': 'application/json'
    });

  getIssues(page): Observable<Issue[]> {
    return this.httpClient
      .get<Issue[]>(this.url+'?include=creator&include=issueType&page='+page+'&pageSize=20').pipe();
  }

  getIssue(id:string): Observable<Issue> {
    return this.httpClient
    .get<Issue>(this.url+'/'+id).pipe();
  }

  getIssueComment(idIssue:string) : Observable<Comment[]> {
    return this.httpClient
    .get<Comment[]>(this.url+'/'+idIssue+'/comments?include=author').pipe();
  }

  postIssueComment(commentRequest : CommentRequest, idIssue : string): Observable<Comment> {
    return this.httpClient
    .post<Comment>(this.url+'/'+idIssue+'/comments', commentRequest).pipe();
  }

  addIssue(issue:Issue) {
    const issuesUrl = `${config.apiUrl}/issues/`;
    return this.httpClient.post<Issue>(issuesUrl, issue).pipe();
  }

  
}
