import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames()
  {
    this.admin.getAllGames().subscribe((games: any) => this.games = games);
  }

  deleteGame(id: string)
  {
    this.admin.deleteGame(id).subscribe((game:any) => {
      this.router.navigate(['/admin/games']).then(() => window.location.reload());
      console.log(game);      
    });
  }
}
