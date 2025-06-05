import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Datas } from '../../datas';
import { SignService } from '../../Service/sign.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common'

import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-individual',
  imports: [CommonModule, MatTableModule, RouterLink, MatButtonModule],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent implements OnInit {
  datas : Datas[] | any = [] 
  dataSrc : any = []

  displayedColumn : string[] = ['id', 'name', 'email']

  constructor(private service : SignService, private route : ActivatedRoute, private router : Router){
    // this
  }

  ngOnInit(): void {
    this.getServiveId()
  }


  //SnackBar

  snack = inject(MatSnackBar)

  deteleRow(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.service.deleteData(id).subscribe((ev)=>{
      console.log(ev)
      this.snack.open('Deleteted successfully!', 'ok')

      this.router.navigate(['/'])
      
    })
  }

  getServiveId() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.service.getItem(id).subscribe((data)=>{
      this.datas = data
      this.dataSrc = this.datas
      console.log(this.datas)
    })
  }
}
