import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-stat',
  templateUrl: './add-stat.component.html',
  styleUrls: ['./add-stat.component.scss']
})
export class AddStatComponent implements OnInit {

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  addStat(name: string)
  {
    this.admin.addStat(name).subscribe((stat: any) => {
      console.log(stat);
      this.router.navigate(['/admin/stats']);
    });    
  }

}
