import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from './services/data.service';

// City model to store city detail
export interface City {
  value: string;
  viewValue: string;
}

// UserData model to store user detail
export interface UserData {
  fullname:string;
  dob: Date;
  city: string;
  email: string;
  phoneNumber: string;
  profilePic:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  data = new MatTableDataSource();
  displayedColumns: string[] = ['profilePic', 'fullname', 'dob', 'city', 'email', 'phoneNumber'];
  @ViewChild(MatSort)
  sort: MatSort | null = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  showme: boolean = false;
  keyword: string='';
   cities: City[] = []
  constructor(private dataService:DataService){
  }
  ngOnInit(){
    // Subscribe getdata to fetch user data
    this.dataService.getData().subscribe((res:any)=>{
      let data : any[]=[];
        // Manipulate respose to create user data and cities aray
        res.results.forEach((ele:any)=>{
          let user: UserData = {
            fullname: `${ele.name.title} ${ele.name.first} ${ele.name.last}` ,
            dob: new Date(ele.dob.date),
            email:ele.email,
            city:ele.location.city,
            phoneNumber:ele.phone,
            profilePic:ele.picture.thumbnail
          };
          data.push(user);
          let city:City = {
            value:ele.location.city,
            viewValue:ele.location.city
          }
          // Add cities to cities array for dropdown
          this.cities.push(city)
        })

        // Update data with userdata
        this.data=new MatTableDataSource(data)
        // Set sorting to table
        this.data.sort = this.sort;
        // set paginator
        this.data.paginator = this.paginator;
      })
  }  

  showMenu(event:any){
    this.showme = !this.showme;
    if(!this.showme){
      this.keyword = '';
      this.applyFilter();
    }
    return false;
  }

  // Filter data based on keyword search - city
  applyFilter() {
    let filterValue = this.keyword.trim();
    this.data.filter = filterValue;
  }
}
