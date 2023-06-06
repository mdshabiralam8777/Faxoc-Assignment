import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private service : ServicesService
    ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      currentCompany: ['', Validators.required],
      designation: ['', Validators.required],
      ctc: ['', Validators.required],
      ectc: ['', Validators.required]
    });
  }

  buttonDisble:boolean = true;
  get formControls() {
    if(this.userForm.valid && ( this.service.newInput?.length > 0 || this.service.inputItem?.length > 0)) {
      this.buttonDisble = false;
    }
    else this.buttonDisble = true;
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const newCompany = {
      name: this.service.newInput,
      domain: this.service.newInput?.concat(".com")
    };
    if(this.service.newInput?.length > 0) {
      this.service.addNewCompany(newCompany).subscribe(res => {
        alert("Data Submitted successfully !")
      })
    }
    else {
      alert("No New company added to the DB")
    }


    console.log(this.userForm.value);
    // Add code to send form data to backend or perform any other operations
  }
}
