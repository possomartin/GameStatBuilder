import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  categories!: any[];
  games!: any[];

  imageData!: string;
  FileToUpload!: File;

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGames();
    this.getAllCategories();
  }

  getAllCategories()
  {
    this.admin.getAllCategories().subscribe((categories: any) => this.categories = categories);
  }

  getAllGames()
  {
    this.admin.getAllGames().subscribe((games: any) => this.games = games);
  }  

  addItem(_categoryID: string, _gameID: string, name: string)
  {
    this.admin.addItem(_categoryID, _gameID, name, this.FileToUpload).subscribe((item: any) => {
      console.log(item);
      this.router.navigate(['/admin/items']);      
    });
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
