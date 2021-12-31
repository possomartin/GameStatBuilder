import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-gamestat',
  templateUrl: './add-gamestat.component.html',
  styleUrls: ['./add-gamestat.component.scss']
})
export class AddGamestatComponent implements OnInit {

  boosts!: any[];
  games!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBoosts();
    this.getAllGames();
  }

  getAllGames() {
    this.admin.getAllGames().subscribe((games: any) => this.games = games);
  }

  getAllBoosts() {
    this.admin.getAllBoost().subscribe((boosts: any) => {
      this.boosts = boosts;
      this.IdToName();
    });
  }

  IdToName() {
    this.boosts.map(boost => {
      this.admin.getItemByID(boost._itemID).subscribe((item: any) => boost.itemname = item.name);
      this.admin.getStatByID(boost._statID).subscribe((stat: any) => boost.statname = stat.name);
    });
  }
  addGameStat(_gameID: string, _boostID: string) {
    this.admin.addGameStat(_gameID, _boostID).subscribe((gamestat: any) => {
      console.log(gamestat);
      this.router.navigate(['/admin/gamestats']);
    });
  }
}
