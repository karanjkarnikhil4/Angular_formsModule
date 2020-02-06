import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  forbiddenUserNames = ['Nikhil','Preetam','Kushal'];
  signupForm:FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userdata: new FormGroup({
        'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email':new FormControl(null,[Validators.required,Validators.email]),
      }),
      'gender':new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit()
  {
    console.log(this.signupForm);
  }

  onAddHobby()
  {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls()
  {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(formControl:FormControl):{[key:string]:boolean}
  {
      if(this.forbiddenUserNames.indexOf(formControl.value) !==-1)
      {
        return {'nameIsForbidden':true};
      }
      return null;
  }

}
