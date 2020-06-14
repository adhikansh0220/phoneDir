import { Component, ViewChild } from '@angular/core';
import { PersonDetails } from './person-details';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phone-dir';
  public search: any
  public personDetailsList = new Array<PersonDetails>();
  public personDetailsListCopy = new Array<PersonDetails>();

  displayedColumns: string[] = ['name', 'phoneNumber'];
  dataSource = new MatTableDataSource(this.personDetailsList);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public personDetails: PersonDetails;
  public isClosed = false;
  constructor() { }


  ngOnInit(): void {
    this.personDetailsList.push(new PersonDetails(1, 'Adi', 9658318989, 27, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(2, 'Aashish', 7508620523, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(3, 'Ritesh', 9658318988, 26, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(4, 'Mayur', 9658318986, 30, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(5, 'Debby', 96583189877, 29, 'New Delhi'));
    this.personDetailsList.push(new PersonDetails(6, 'Amit', 9658318970, 28, 'New Delhi'));
    this.personDetailsListCopy = this.personDetailsList;
    this.dataSource.sort = this.sort;
  }

  public doSearch() {

    this.personDetailsList = this.personDetailsListCopy.filter((personDetails) => {
      return personDetails.name.toLowerCase().includes(this.search.toString().toLowerCase()) || personDetails.phoneNumber.toString().includes(this.search.toString());
    });
    this.dataSource = new MatTableDataSource(this.personDetailsList);
    this.dataSource.sort = this.sort;
  }

  public showPersonDetails(personDetails: PersonDetails) {
    if (localStorage.getItem(personDetails.id.toString()) && localStorage.getItem(personDetails.id.toString()) !== null) {
      this.personDetails = JSON.parse(localStorage.getItem(personDetails.id.toString()));
    } else {
      this.personDetails = personDetails;
      localStorage.setItem(personDetails.id.toString(), JSON.stringify(personDetails));
    }
    this.isClosed = false;
  }

  public doClose() {
    this.isClosed = true;
  }
}
