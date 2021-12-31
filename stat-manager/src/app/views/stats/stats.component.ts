import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  stats!: any;

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStats();
  }

  /* Get All Stats */

  getAllStats()
  {
    this.admin.getAllStats().subscribe((stats: any) => {
      this.stats = stats;
    });
  }

  /* Delete Stat */
  deleteStat(id: string)
  {
    this.admin.deleteStat(id).subscribe((stat: any) => {
      this.router.navigate(['/admin/stats']).then(() => window.location.reload());
      console.log(stat);
    })
  }
}
