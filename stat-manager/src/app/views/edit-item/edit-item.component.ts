import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  selectedItem!: any;
  itemID!: string;

  categories!: any[];
  games!: any[];

  imageData!: string;
  FileToUpload!: File;

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {
    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.itemID = params.id;
      }
    );
    
    this.getItemByID();
    this.getAllGames();
    this.getAllCategories();

    console.log(this.itemID, this.selectedItem);
  }

  getItemByID() 
  {
    this.admin.getItemByID(this.itemID).subscribe((item: any) => {this.selectedItem = item; console.log(this.selectedItem);});
  }

  getAllCategories() 
  {
    this.admin.getAllCategories().subscribe((categories: any) => this.categories = categories);
  }

  getAllGames()
  {
    this.admin.getAllGames().subscribe((games: any) => this.games = games);
  }

  updateItem(_categoryID: string, _gameID: string, name: string) 
  {
    this.admin.updateItem(this.itemID, _categoryID, _gameID, name, this.FileToUpload).subscribe((item: any) => {
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
