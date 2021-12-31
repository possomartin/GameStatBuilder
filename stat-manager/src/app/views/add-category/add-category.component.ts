import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  addCategory(name: string)
  {
    this.admin.addCategory(name).subscribe((category: any) => {
      console.log(category);
      this.router.navigate(['/admin/categories']);
    });
  }
}
