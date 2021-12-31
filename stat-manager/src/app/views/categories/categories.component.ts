import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  /* Get All Categories */
  getAllCategories()
  {
    this.admin.getAllCategories().subscribe((categories: any) =>
    {
      console.log(categories);
      this.categories = categories;
    });
  }

  /* Get Category by ID */
  getCategoryByID(id: string)
  {
    let name = "";
    this.admin.getCategoryByID(id).subscribe((category: any) => name = category.name);

    return name;
  }

  /* Delete User */
  deleteCategory(id: string)
  {
    this.admin.deleteCategory(id).subscribe((category: any) => {
      this.router.navigate(['/admin/categories']).then(() => window.location.reload());
      console.log(category);
    });
  }  

}
