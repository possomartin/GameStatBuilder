import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-boost',
  templateUrl: './add-boost.component.html',
  styleUrls: ['./add-boost.component.scss']
})
export class AddBoostComponent implements OnInit {
  items!: any[];
  stats!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllItems();
    this.getAllStats();
  }

  getAllItems()
  {
    this.admin.getAllItems().subscribe((items: any) => this.items = items);
  }

  getAllStats()
  {
    this.admin.getAllStats().subscribe((stats: any) => this.stats = stats);
  }  

  addBoost(_itemID: string, _statID: string, value: string)
  {
    this.admin.addBoost(_itemID, _statID, +value).subscribe((boost: any) => {
      console.log(boost);
      this.router.navigate(['/admin/boosts']);      
    });
  }
}
