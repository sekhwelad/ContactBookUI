import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Profile } from '../profiles/profile.model';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatIconModule ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent implements OnInit{

 @Input() profile!: Profile;
 hovering = false;

 ngOnInit(): void {
 }

 onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.profile.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
}

getInitials(firstName: string, lastName: string): string {
  
   const l = lastName?.[0] || '';
   const f = firstName?.[0] || '';
  return (l+f).toUpperCase();
}


}
