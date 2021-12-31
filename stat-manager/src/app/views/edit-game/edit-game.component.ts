import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

  selectedGame!: any;
  gameID!: string;

  imageData!: string;
  FileToUpload!: File;  

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.gameID = params.id;
      }
    );

    this.getGameByID();
  }

  getGameByID()
  {
    this.admin.getGameByID(this.gameID).subscribe((game: any) => this.selectedGame = game);
  }

  updateGame(name: string, description: string)
  {
    this.admin.updateGame(this.gameID, name, description, this.FileToUpload).subscribe((game: any) => {
      console.log(game)
      this.router.navigate(['/admin/games']);
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
