import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SignService } from '../../Service/sign.service';
import { Datas } from '../../datas';
import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { delay, finalize, first, interval, startWith, endWith } from 'rxjs';

import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { merge } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { InterceptorService } from '../../Service/interceptor.service';
import { MatLoadingService } from '../../Service/mat-loading.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule, NgxSpinnerModule, NgIf
   ],
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  
  service : SignService = inject(SignService)

  datas : Datas = {
    id: 1,
    name : 'Oi',
    email: 'Oi1'
  }

  loadingSpinner = true

  @ViewChild(MatProgressSpinner) matSpinner !: MatProgressSpinner

  formAll : FormGroup

  constructor( route : Router ){
    this.formAll = this.formAllFunction()

    //Router
    route.events.subscribe((ev)=>{
      if(ev instanceof NavigationEnd){
        console.log('nav start')
        setTimeout(()=>{
          this.loadingSpinner = true
          console.log('nav end')
        }, 3000)
      }
    })
  }

  formAllFunction() : FormGroup{
    return new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(4)])
    })
  }

  //Post

  interceptor = false
  private snackbar = inject(MatSnackBar) //Snackbar

  spinner1 : NgxSpinnerService = inject(NgxSpinnerService)

  submitForm() : void{
    this.service.postData(this.formAll.value).pipe(
      startWith(this.spinner1.show())
      // delay(1000)
    ).subscribe((event : any)=>{
      
        setTimeout(()=>{
          this.interceptor = false
          this.spinner1.hide()
          this.snackbar.open('Resgistrado com sucesso', 'ok')
        }, 3000)
        console.log('datas posted:', JSON.stringify(event))
      // }, 1000)  
    })
  }

  ngOnInit(): void {
    // this.getService()
  }

  //Treating Form

  //
  

}
