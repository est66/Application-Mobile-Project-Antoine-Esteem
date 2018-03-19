import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { User } from '../../models/user';
import { IssuesProvider } from '../issues/issues.provider';
import { Issue } from '../../models/issue';

/*
  Generated class for the IssuesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  
  constructor(public httpClient: HttpClient) {
    console.log('Hello IssuesProvider Provider');
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>('https://comem-appmob-2018d.herokuapp.com/api/users').pipe();
  }

  getUserfromIssue(issue: Issue): Observable<User> {
    return this.httpClient
    .get<User>('https://comem-appmob-2018d.herokuapp.com'+issue.creatorHref).pipe();
  }
}