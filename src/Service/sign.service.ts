import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, first, Observable } from 'rxjs';
import { Datas } from '../datas';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  http : HttpClient = inject(HttpClient)
  url = "http://localhost:4000"
  headerOptions : { headers : HttpHeaders } = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  } 
  constructor(  ) { }

  getWifi() : Promise<any[]>{
    return this.http.get<any>(`${this.url}/scan`).toPromise()
  }

  postWifi( ssid : string, password : string ) : Promise<any>{
    return this.http.post<any>(`${this.url}/connect/${ssid}`, {password}).toPromise()
  }

  getUdpData() : Promise<any[]>{
    return this.http.get<any>(`${this.url}/getUdpData`).toPromise()
  }

  readFile() : Promise<any>{
    return this.http.get<any>(`${this.url}/readFile`).toPromise()
  }

  postUdpData( data: any ) : Promise<any[]>{
    const payload = typeof data === 'string' ? { message: data } : data;
    return this.http.post<any>(`${this.url}/postData`, payload, this.headerOptions).toPromise()
  }



  getItem( id : number ) : Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }

  postData( data : Datas ) : Observable<Datas>{
    return this.http.post<Datas>(this.url, data, this.headerOptions)
      // first()
    
  }

  deleteData( id : number ) : Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }

  Login( data : Datas ) : Observable<Datas>{
    return this.http.post<Datas>(`${this.url}1`, this.headerOptions)
  }

  updateData(id : number ,data : Datas) : Observable<Datas>{
    return this.http.put<Datas>(`${this.url}/${id}`, data)
  }

}
