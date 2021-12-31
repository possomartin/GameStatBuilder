import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-gamestats',
  templateUrl: './gamestats.component.html',
  styleUrls: ['./gamestats.component.scss']
})
export class GamestatsComponent implements OnInit {

  gamestats!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGameStats();
  }

  getAllGameStats()
  {
    this.admin.getAllGameStats().subscribe((gamestats: any) => {
      this.gamestats = gamestats;
      this.IdToName();
    });
  }

  IdToName()
  {
    this.gamestats.map(gamestat => {
      this.admin.getGameByID(gamestat._gameID).subscribe((game: any) => gamestat.gamename = game.name);
      this.admin.getBoostByID(gamestat._boostID).subscribe((boost: any) => {
        this.admin.getItemByID(boost._itemID).subscribe((item: any) => gamestat.itemname = item.name);
        this.admin.getStatByID(boost._statID).subscribe((stat: any) => gamestat.statname = stat.name);
        gamestat.value = boost.value;
      });     
    });
  }

  deleteGameStat(id: string)
  {
    this.admin.deleteGameStat(id).subscribe((gamestat:any) => {
      this.router.navigate(['/admin/gamestats']).then(() => window.location.reload());
      console.log(gamestat);      
    });
  }

}
