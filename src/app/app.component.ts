import { Component, OnInit} from '@angular/core';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  companiesList: any;
  selectedCountry :string = "Select Company";
  isEditable : boolean = false;
  newModifiedValue : string = "";
  constructor(private companyService : ServicesService) {}
  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      response => {
        this.companiesList = response?.companies;
        console.log("companiesList",this.companiesList)
      });
    }

    EditDropDown() {
      this.isEditable = true;
    }
}
