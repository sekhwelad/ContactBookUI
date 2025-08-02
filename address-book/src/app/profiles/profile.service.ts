import { inject, Injectable } from '@angular/core';
import { Profile } from './profiles/profile.model';
import { map, Observable, of } from 'rxjs';
import { PagedResult } from './profiles/paged-results.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:5000/api/v1/profiles';

   private profiles: Profile[] = [
    {
      id: "hhioh",
      firstName: 'Jane',
      lastName: 'Doe',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Some funny text about Jane Doe...',
      website: 'www.janedoe.co.za',
      email: 'info@janedoe.co.za',
      cellphone: '012 345 6789'
    },
  ];

getProfiles(pageSize: number = 3, pageNumber: number = 1): Observable<PagedResult<Profile>> {
  return this.http.get<PagedResult<Profile>>(this.apiUrl, {
    params: {
      PageSize: pageSize.toString(),
      PageNumber: pageNumber.toString()
    }
  }).pipe(
    map(response => {
      response.items = response.items.map(profile => ({
        ...profile,
        imageUrl: profile.imageUrl ? `https://localhost:5000${profile.imageUrl}` : null
      }));
      return response;
    })
  );
}


  getProfileById(id: string): Observable<Profile | undefined> {
    return of(this.profiles.find(p => p.id === id));
  }

  uploadImage(file:File, email:string) : Observable<Profile>{
    const formData= new FormData();
    formData.append('file', file) 
    formData.append('email', email)
    
    return this.http.post<Profile>(`${this.apiUrl}/upload`, formData);
  }
}
