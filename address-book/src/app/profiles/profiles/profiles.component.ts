import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Profile } from './profile.model';
import { ProfileService } from '../profile.service';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProfileCardComponent } from "../profile-card/profile-card.component";
import { ImageUpload } from './upload-image.model';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule,MatCardModule, ProfileCardComponent,MatButtonModule],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent {
  profiles: Profile[] = [];
  currentIndex = 0;
  @Input() file! :File;

  get profile(): Profile {
    return this.profiles[this.currentIndex];
  }

  constructor(private profileService: ProfileService) {}

ngOnInit(): void {
  this.profileService.getProfiles(3, 1).subscribe({
    next: response => {
      console.log('Profiles:', response.items);
      this.profiles = response.items; 
    },
    error: err => console.error('Error:', err)
  });
}


  next() {
    if (this.currentIndex < this.profiles.length - 1) this.currentIndex++;
  }

  prev() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  first() {
    this.currentIndex = 0;
  }

  last() {
    this.currentIndex = this.profiles.length - 1;
  }

  onImageImageChange(upload:ImageUpload): void {
   const index = this.profiles.findIndex(p => p.email === upload.email);

   this.profileService.uploadImage(upload.file,upload.email).subscribe({
    next: response =>{
      if(index !== -1){
        this.profiles[index] ={
          ...this.profiles[index],
          imageUrl: `https://localhost:5000${response.imageUrl}`
        }
      }
    }
   })

}

}
