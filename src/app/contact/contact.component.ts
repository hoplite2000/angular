import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedback: Feedback;
  feedbackForm: FormGroup;
  contactType = ContactType;
  formErrors = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };
  validationmessages = {
    'firstname':{
      'required':'Required',
      'minlength':'Maximum of 3 characters required',
      'maxlength':'Maximum of 15 characters allowed'
    },
    'lastname':{
      'required':'Required',
      'minlength':'Maximum of 3 characters required',
      'maxlength':'Maximum of 15 characters allowed'
    },
    'telnum':{
      'required':'Required',
      'pattern':'Only numbers allowed'
    },
    email:{
      'required':'Required',
      'email':'Invalid Email ID'
    }
  };

  @ViewChild('fform')
  feedbackFormDirective;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      telnum: ['',[Validators.required, Validators.pattern]],
      email: ['',[Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe((data) => this.valuechanges(data));

    this.valuechanges();
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  valuechanges(data?: any){
    if(!this.feedbackForm){
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const message = this.validationmessages[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

}
