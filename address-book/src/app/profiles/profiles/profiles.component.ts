import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Profile } from './profile.model';
import { ProfileService } from '../profile.service';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProfileCardComponent } from "../profile-card/profile-card.component";
import { ImageUpload } from './upload-image.model';
import { AddProfileDialogComponent } from '../add-profile-dialog/add-profile-dialog.component';
import { elementAt } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule,MatCardModule, ProfileCardComponent,MatButtonModule],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent {
  profiles: Profile[] = [];
  currentPage = 1;
  pageSize = 2;
  totalPages = 0;
  loading = false;
  currentIndex = 0;
  @Input() file! :File;

  private readonly domain = environment.domain;
  

  get profile(): Profile {
    return this.profiles[this.currentIndex];
  }

constructor(private dialog: MatDialog, private profileService: ProfileService) {}

ngOnInit(): void {
 this.loadProfiles();
}

loadProfiles(): void {
  if (this.loading || (this.totalPages && this.currentPage > this.totalPages)) return;

  this.loading = true;

  this.profileService.getProfiles(this.pageSize, this.currentPage).subscribe(response => {
    this.profiles = [...this.profiles, ...response.items];
    this.totalPages = response.totalPages;
    this.currentPage++;
    this.loading = false;
    console.log("Current page ",this.currentPage)
  });
}


  next() {
    if (this.currentIndex < this.profiles.length - 1) this.currentIndex++;
    else this.loadProfiles();
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
          imageUrl: `${this.domain}${response.imageUrl}`
        }
      }
    }
   })

}

openAddDialog(): void {
  const dialogRef = this.dialog.open(AddProfileDialogComponent, {
  });

  dialogRef.afterClosed().subscribe((result: Profile | undefined) => {
    if (result) {
      this.profileService.createProfile(result).subscribe(() => {
       alert('Profile Created');
        this.loadProfiles();
          this.profiles.unshift(result); 
      });
    }
  });
}

}
