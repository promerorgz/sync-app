import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  venue: any;
  shift: any;
  availability: any;

  constructor(private http: Http, public jwtHelper: JwtHelper) { }

  //CREATE

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
         return this.http.post('users/register', user, {headers: headers})

      .map(res => res.json());
  }


  addVenue(venue){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/venues/addVenue', venue, {headers: headers})
       return this.http.post('venues/addVenue', venue, {headers: headers})

      .map(res => res.json());
  }

  addShift(shift){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/shifts/createshift', shift, {headers: headers})
       return this.http.post('shifts/createshift', shift, {headers: headers})

      .map(res => res.json());
  }

  //READ

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    // return this.http.get('http://localhost:3000/users/profile', {headers: headers})
       return this.http.get('users/profile', {headers: headers})

      .map(res => res.json());
  }

  getUsers(){
    // return this.http.get('http://localhost:3000/users/usersList')
    return this.http.get('users/usersList')

      .map(res => res.json());
  }

  getDJ(){
    // return this.http.get('http://localhost:3000/users/djs')
    return this.http.get('users/djs')

      .map(res => res.json());
  }

  getShifts(){
    // return this.http.get('http://localhost:3000/shifts/shifts')
    return this.http.get('shifts/shifts')

      .map(res => res.json());
  }

  //UPDATE

  updateUser(id, body){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.put('http://localhost:3000/users/update/'+id,body,{headers:headers})
    return this.http.put('users/update/'+id,body,{headers:headers})
      .map(res => res.json());
}
  updateVenue(id, body){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.put('http://localhost:3000/venues/update/'+id,body,{headers:headers})
         return this.http.put('venues/update/'+id,body,{headers:headers})

      .map(res => res.json());
  }

  updateShift(id, body){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.put('http://localhost:3000/shifts/update/'+id,body,{headers:headers})
       return this.http.put('venues/update/'+id,body,{headers:headers})

      .map(res => res.json());
  }

  // dropShift(id, body){
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.put('http://localhost:3000/shifts/update/'+id,body,{headers:headers})
  //   // return this.http.put('shifts/update/'+id,body,{headers:headers})
  //     .map(res => res.json());
  //
  // }

  //DELETE

  deleteVenue(id){
    // return this.http.delete('http://localhost:3000/venues/venue/'+id)
      return this.http.delete('venues/venue/'+id)
      .map(res => res.json());
  }

  deleteUser(id){
    // return this.http.delete('http://localhost:3000/users/user/'+id)
    return this.http.delete('users/user/'+id)
      .map(res => res.json());
  }

  deleteShift(id){
    // return this.http.delete('http://localhost:3000/shifts/delete/'+id)
    return this.http.delete('shifts/delete/'+id)

      .map(res => res.json());
  }

  //AUTH

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
         return this.http.post('users/authenticate', user, {headers: headers})

      .map(res => res.json());
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
