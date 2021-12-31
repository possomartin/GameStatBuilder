import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-boosts',
  templateUrl: './boosts.component.html',
  styleUrls: ['./boosts.component.scss']
})
export class BoostsComponent implements OnInit {

  boosts!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBoosts();
  }


  /* Get All Boosts */

  getAllBoosts()
  {
    this.admin.getAllBoost().subscribe((boosts: any) => {
      this.boosts = boosts;
      this.IdToName();
      console.log(boosts);
    });
  }

  /* Id To Name */

  IdToName()
  {
    this.boosts.map(boost => {
      this.admin.getItemByID(boost._itemID).subscribe((item: any) => boost.itemname = item.name);
      this.admin.getStatByID(boost._statID).subscribe((stat: any) => boost.statname = stat.name);
    })
  }

  /* Delete Boost */

  deleteBoost(id: string)
  {
    this.admin.deleteBoost(id).subscribe((boost: any) => {
      this.router.navigate(['/admin/boosts']).then(() => window.location.reload());
      console.log(boost);        
    });
  }

}
