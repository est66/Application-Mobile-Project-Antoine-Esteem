import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { User } from '../../models/user';
import { Issue } from '../../models/issue';

import { IssuesProvider } from '../issues/issues.provider';


/*
  Generated class for the IssuesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  user: User;
  url: string = 'https://comem-appmob-2018d.herokuapp.com/api/users';
  
  constructor(public httpClient: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.url).pipe();
  }

  getUserfromIssue(issue: Issue): Observable<User> {
    return this.httpClient
    .get<User>('https://comem-appmob-2018d.herokuapp.com'+issue.creatorHref).pipe();
  }
}