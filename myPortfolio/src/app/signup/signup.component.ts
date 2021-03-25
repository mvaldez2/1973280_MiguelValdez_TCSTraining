import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRef=new FormGroup({
    fname:new FormControl(),
    lname:new FormControl(),
    user:new FormControl(),
    pass:new FormControl()
  });

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  loginPage(){
    this.router.navigate(["login"])
  } 

  signup(){
    sessionStorage.setItem("fname", this.signupRef.get("fname")?.value);
    sessionStorage.setItem("lname", this.signupRef.get("lname")?.value);
    sessionStorage.setItem("username", this.signupRef.get("user")?.value);
    sessionStorage.setItem("password", this.signupRef.get("pass")?.value);
    this.router.navigate(["login"])
  }

}
