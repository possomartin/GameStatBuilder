import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-stat',
  templateUrl: './edit-stat.component.html',
  styleUrls: ['./edit-stat.component.scss']
})
export class EditStatComponent implements OnInit {

  statID!: string;

  selectedStat!: any;
  
  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.statID = params.id;
      }
    );

    this.getStatByID();
  }

  getStatByID()
  {
    this.admin.getStatByID(this.statID).subscribe((stat: any) => this.selectedStat = stat);
  }

  updateStat(name: string)
  {
    this.admin.updateStat(this.statID, name).subscribe((stat: any) => {
      console.log(stat)
      this.router.navigate(['/admin/stats']);
    });
  }



}
