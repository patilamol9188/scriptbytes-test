import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // API request to fetch userdata
   getData (){
      return this.http.get('https://randomuser.me/api/?results=200');
   }
}
