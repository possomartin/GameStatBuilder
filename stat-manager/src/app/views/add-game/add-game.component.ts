import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  imageData!: string;
  FileToUpload!: File;

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  addGame(name: string, description: string) 
  {
    console.log(this.FileToUpload);

    if (this.FileToUpload) {
      this.admin.addGame(name, description, this.FileToUpload).subscribe((game: any) => {
        console.log(game);
        this.router.navigate(['/admin/games']);
      });
    }
  }

  onFileSelect(event: any) {
    const file = (event.target as HTMLInputElement).files;
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (file && allowedMimeTypes.includes(file[0].type)) {

      this.FileToUpload = file[0];

      var reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file[0]);
      console.log(this.FileToUpload);
    }


  }



}
