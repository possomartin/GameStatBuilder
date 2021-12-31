import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  selectedCategory!: any;
  categoryID!: string;

  constructor(private admin: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* Set Variable with Params */

    this.route.params.subscribe(
      (params: Params) => {
        this.categoryID = params.id;
      }
    );

    this.getCategoryByID();    
  }

  getCategoryByID()
  {
    this.admin.getCategoryByID(this.categoryID).subscribe((category: any) => this.selectedCategory = category);
  }

  updateCategory(name: string)
  {
    this.admin.updateCategory(this.categoryID, name).subscribe((category: any) => {
      console.log(category)
      this.router.navigate(['/admin/categories']);
    });
  }

}
