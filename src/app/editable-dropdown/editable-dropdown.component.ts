import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from '../services.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-editable-dropdown',
  templateUrl: './editable-dropdown.component.html',
  styleUrls: ['./editable-dropdown.component.scss']
})
export class EditableDropdownComponent implements OnInit {
  @Input() list!: any[];
  // two way binding for input text
  inputItem! : any;
  newInput! : string;
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;
  modifiedInput! : string;

  // the list to be shown after filtering
  filteredList: any;

  constructor(
    private service : ServicesService
  ) {}

  ngOnInit() {
    this.filteredList = this.list;
    console.log("filteredList",this.filteredList)
  }

  // modifies the filtered list as per input
  getFilteredList() {

    this.listHidden = false;
    // this.selectedIndex = 0;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter(item  => item.name.toLowerCase().startsWith(this.inputItem.toLowerCase()));
      this.service.inputItem = this.inputItem;
      if(this.filteredList.length == 0) {
          console.log("New input in setTimeOut",this.inputItem);
          this.newInput = this.inputItem;
          this.service.newInput = this.newInput;
      }
    }
  }
  addNewData(newInput : string) {
    console.log("New Company",newInput);
    const newCompany = {
      name: newInput,
      domain: newInput.concat(".com")
    };
    console.log("new json",newCompany)
    this.service.addNewCompany(newCompany).subscribe(res => {
      alert("Data added successfully !")
    })
  }
  ModifyInput(str : string) {
    this.filteredList[this.selectedIndex].name = str;
    this.filteredList[this.selectedIndex].domain = str.concat(".com");
    const newCompany = {
      name: str,
      domain: str.concat(".com")
    };
    this.service.addNewCompany(newCompany).subscribe(res => {
      alert("Data Modified successfully !")
    })
  }
  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(idx:any) {

    this.inputItem = this.filteredList[idx]?.name;
    this.listHidden = true;
    this.selectedIndex = idx;
  }

  // navigate through the list of items
  onKeyPress(event:any) {

    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {

        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {

          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.list.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.list;
        } else {
          this.showError = false;
        }
      }, 500);
    }

  }
}
