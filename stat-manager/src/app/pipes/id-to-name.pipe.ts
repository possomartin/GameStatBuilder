import { Pipe, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Pipe({
  name: 'idToName',
  pure: false
})
export class IdToNamePipe implements PipeTransform {

  roles!: any[];
  items!: any[];
  categories!: any[];
  stats!: any[];
  games!: any[];

  object!: any;

  constructor(private admin: AdminService){}

  transform(value: string, table = 1): any
  {
    let object = "";

    if(table == 1)
    {
      this.admin.getRoleByID(value).subscribe((role: any) => this.object = role);
      return this.object.name;
    }
    else if(table == 2)
    {
      this.admin.getCategoryByID(value).subscribe((category: any) => this.object = category);
      return this.object.name;
    }
    else
    {
      this.admin.getItemByID(value).subscribe((item: any) => this.object = item);
      return this.object.name;
    }
  }

}
