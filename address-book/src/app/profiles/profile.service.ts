import { inject, Injectable } from '@angular/core';
import { Profile } from './profiles/profile.model';
import { map, Observable, of } from 'rxjs';
import { PagedResult } from './profiles/paged-results.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly domain = environment.domain;


getProfiles(pageSize: number = 3, pageNumber: number = 1): Observable<PagedResult<Profile>> {
  return this.http.get<PagedResult<Profile>>(`${this.baseUrl}/profiles`, {
    params: {
      PageSize: pageSize.toString(),
      PageNumber: pageNumber.toString()
    }
  }).pipe(
    map(response => {
      response.items = response.items.map(profile => ({
        ...profile,
        imageUrl: profile.imageUrl ? `${this.domain}${profile.imageUrl}` : null
      }));
      return response;
    })
  );
}

  uploadImage(file:File, email:string) : Observable<Profile>{
    const formData= new FormData();
    formData.append('file', file) 
    formData.append('email', email)
    
    return this.http.post<Profile>(`${this.baseUrl}/profiles/upload`, formData);
  }

  createProfile(profile: Profile): Observable<any> {
  return this.http.post(`${this.baseUrl}/profiles/create`, profile);
}

}
