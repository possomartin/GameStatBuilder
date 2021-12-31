import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Games!: any[];
  Items!: any[];
  Categories!: any[];
  tempList!: any[];
  Results!: any[];

  SelectedGameId!: string;
  SelectedItemId!: string;
  SelectedCategoryId!: string;

  SelectedGameName!: string;
  SelectedItemName!: string;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.getAllGames();
    this.getAllCategories();
    this.route.params.subscribe((params: Params) => {
      if(params.id || params.item)
      {
        this.SelectedGameId = params.id;
        this.SelectedItemId = params.item;
        this.adminService.getItemByGame(params.id).subscribe((items: any) => {
          this.Items = items;
          this.tempList = items;
        });
      }
      else
      {
        this.Items = [];
      }
    });
  }


  getItemsByGame()
  {
    this.adminService.getItemByGame(this.SelectedGameId).subscribe((items: any) => {
      this.Items = items;
    });    
  }

  getAllGames()
  {
    this.adminService.getAllGamesPublic().subscribe((games: any) => {
      this.Games = games;
    });
  }

  getAllCategories()
  {
    this.adminService.getAllCategoriesPublic().subscribe((categories: any) => {
      this.Categories = categories;
    });
  }

  ChangedOption(categoryID: string)
  {
    this.tempList = [];

    this.SelectedCategoryId = categoryID;
    this.Items.forEach(element => {
      if(element._categoryID === categoryID)
      {
        this.tempList.push(element);
      }
    });
  }

  getItemByID(id: string)
  {
    var Item;
    this.adminService.getItemByID(id).subscribe((item: any) => {
      this.SelectedItemName = item.name;
      Item = item;
    });

    return Item;
  }

  getGameByID()
  {
    this.adminService.getGameByID(this.SelectedGameId).subscribe((game: any) => {
      this.SelectedGameName = game.name;
    });
  }

  GetResultItems(option: any)
  {
    this.Results = [];
    for(var i = 0; i < option.BestOption.length; i++)
    {
      this.Items.forEach(element => {
        if(option.BestOption[i][1] === element.name)
        {
          this.Results.push(element);
        }
      });
    }

    console.log(this.Results);
  }

  CalculateBestOption()
  {
    this.route.params.subscribe((params: Params) => {
      if(params.item) {this.SelectedItemId = params.item;}
    });

    this.getItemByID(this.SelectedItemId);
    this.getGameByID();

    this.adminService.CalculateBestOption(this.SelectedGameName, this.SelectedItemName).subscribe((option: any) => {
      console.log(option, this.SelectedGameName, this.SelectedItemName);
      this.GetResultItems(option);
    });
  }


}
