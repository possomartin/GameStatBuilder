import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-gamestat',
  templateUrl: './edit-gamestat.component.html',
  styleUrls: ['./edit-gamestat.component.scss']
})
export class EditGamestatComponent implements OnInit {

  boosts!: any[];
  games!: any[];

  gameStatID!: string;

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.gameStatID = params.id;
      }
    );
    
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
  
  updateGameStat(_gameID: string, _boostID: string) {
    this.admin.updateGameStat(this.gameStatID, _gameID, _boostID).subscribe((gamestat: any) => {
      console.log(gamestat);
      this.router.navigate(['/admin/gamestats']);
    });
  } 
}
