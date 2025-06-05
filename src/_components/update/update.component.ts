import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SignService } from '../../Service/sign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-update',
  imports: [FormsModule, MatIconModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, MatSnackBarModule, NgIf
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  
  ngOnInit(): void {
  }

  form : FormGroup
  // @ViewChild(MatSnackBar) snack !: MatSnackBar
  private snack = inject(MatSnackBar)

  constructor( private service : SignService, private route : ActivatedRoute, private router : Router){
    this.form = this.formControl()
  }

  formControl() : FormGroup{
    return new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(4)]),
      email : new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)])
    })
  }

  update() : void{
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.service.updateData(id, this.form.value).subscribe((data)=>{
      console.log(data)
      this.snack.open('Atualizado com sucesso', 'ok')
      this.router.navigate(['/list/', id])
    })
  }
}
