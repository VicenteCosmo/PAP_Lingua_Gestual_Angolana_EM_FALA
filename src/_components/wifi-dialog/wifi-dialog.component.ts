import { Component, inject, OnInit } from '@angular/core';
import { SignService } from '../../Service/sign.service';
import { Datas } from '../../datas';
import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { NgModel , NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs'

import { delay, finalize, first, startWith } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table'
import { MatListModule } from '@angular/material/list';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogModule } from '@angular/cdk/dialog';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-wifi-dialog',
  imports: [
    CommonModule, NgFor, NgxSkeletonLoaderModule, NgIf, NgxSpinnerModule, MatListModule, 
    MatButtonModule, MatProgressSpinnerModule, MatTableModule, RouterLink, MatIconModule, FormsModule, 
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, 
  ],
  templateUrl: './wifi-dialog.component.html',
  styleUrl: './wifi-dialog.component.css'
})
export class WifiDialogComponent implements OnInit {

  ngOnInit(): void {
    
  }

  form : FormGroup

  spinner : NgxSpinnerService = inject(NgxSpinnerService)

  controlDialog : boolean = true

  constructor( public Service : SignService, public dialog : MatDialog ){
    this.form = this.formAll()
  }

  formAll() : FormGroup{
    return new FormGroup({
      ssid: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  async connetToWifi(){

    this.controlDialog = false

    this.spinner.show()

    setTimeout(() => {
      this.spinner.hide()
    }, 2500)

    setTimeout(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alguma coisa deu errado!",
        footer: 'Tente novamente'
      });
    }, 2700)

    const response = await this.Service.postWifi(this.form.value.ssid, this.form.value.password)
    const res = JSON.parse(JSON.stringify(response))

    console.log('Response:', res.success)

    if(res.success === true){
      
      setTimeout(() => {
        Swal.fire({
          title: "Requisição Wifi feita com sucesso!",
          icon: "success",
          draggable: true
        });
      }, 2700)

    }
    // else{
      
    // }


  }


}
