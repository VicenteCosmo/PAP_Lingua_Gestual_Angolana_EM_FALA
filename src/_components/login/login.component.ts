import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { validateLocaleAndSetLanguage } from 'typescript';
import { SignService } from '../../Service/sign.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule,
    MatButtonModule, MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form : FormGroup

  constructor( private service : SignService ){
    this.form = this.formAll()
  }

  formAll() : FormGroup{
    return new FormGroup({
      name : new FormControl('', [Validators.minLength(4), Validators.required]),
      email : new FormControl('', [Validators.email, Validators.minLength(4), Validators.required])
    })
  }

  login(){
    this.service.Login(this.form.value).subscribe((data)=>{
      console.log(data)
    })
  }

}
