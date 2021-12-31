import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-boost',
  templateUrl: './edit-boost.component.html',
  styleUrls: ['./edit-boost.component.scss']
})
export class EditBoostComponent implements OnInit {

  selectedBoost!: any;
  boostID!: string;

  items!: any[];
  stats!: any[];

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.boostID = params.id;
      }
    );    

    this.getAllItems();
    this.getAllStats();
    this.getBoostByID();    
  }

  getBoostByID()
  {
    this.admin.getBoostByID(this.boostID).subscribe((boost: any) => this.selectedBoost = boost);
  }

  getAllItems()
  {
    this.admin.getAllItems().subscribe((items: any) => this.items = items);
  }

  getAllStats()
  {
    this.admin.getAllStats().subscribe((stats: any) => this.stats = stats);
  }  

  updateBoost(_itemID: string, _statID: string, value: string)
  {
    this.admin.updateBoost(this.boostID, _itemID, _statID, +value).subscribe((boost: any) => {
      console.log(boost);
      this.router.navigate(['/admin/boosts']);      
    });
  }

}
