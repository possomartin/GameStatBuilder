import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {


  items!: any[];

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems()
  {
    this.admin.getAllItems().subscribe((items: any) => {
      this.items = items
      this.IdToName();
    });
  }

  IdToName()
  {
    this.items.map(item => {
      this.admin.getCategoryByID(item._categoryID).subscribe((category: any) => item.categoryname = category.name);
      this.admin.getGameByID(item._gameID).subscribe((game: any) => item.gamename = game.name);
    });
  }

  deleteItem(id: string)
  {
    this.admin.deleteItem(id).subscribe((item:any) => {
      this.router.navigate(['/admin/items']).then(() => window.location.reload());
      console.log(item);      
    });
  }
}
