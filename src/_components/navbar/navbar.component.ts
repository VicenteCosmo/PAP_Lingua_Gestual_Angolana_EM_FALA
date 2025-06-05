import { Component, computed, inject, NgModule, OnInit, signal, ViewChild } from '@angular/core';
import { routes } from '../../app/app.routes';
import { ActivatedRoute, NavigationCancel, NavigationEnd,
NavigationError, NavigationStart, Route, Router, RouterLink, RouterLinkActive, ɵafterNextNavigation } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgFor, NgIf } from '@angular/common';
import { NgxLoadingComponent, NgxLoadingModule } from 'ngx-loading'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BreakpointObserver } from '@angular/cdk/layout'
import { RouterOutlet } from '@angular/router'
//Components
import { HomeComponent } from '../../_components/home/home.component'
import { SignupComponent } from '../../_components/signup/signup.component'

export type MenuItem = {
  icon : string,
  label : string,
  route : string
}

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, NgxSpinnerModule, NgxLoadingModule, MatProgressBarModule, NgIf,
     MatButtonModule, MatDividerModule, MatToolbarModule,
    MatSidenavModule, MatInputModule, MatIconModule, MatSidenav, MatListModule, HomeComponent, 
    SignupComponent, RouterOutlet, MatListModule, NgFor, RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  // @ViewChild(HomeComponent) importFromHome !: HomeComponent

  ngOnInit(): void {
    console.log(this.collapsed())
  }

  spinner : NgxSpinnerService = inject(NgxSpinnerService)
  loading = false
  progress = 0 

  menuItems : MenuItem[] = [{
    icon: 'home',
    label: 'Home',
    route: 'home'
  },
  {
    icon: 'person',
    label: 'Profile',
    route: 'signup'
  },
  {
    icon: 'info',
    label: 'About',
    route: 'login'
  },
  {
    icon: 'help',
    label: 'Help',
    route: 'help'
  }]

  //Treating Navbar

  @ViewChild(MatSidenav) sidenav !: MatSidenav
  
  collapsed = signal(true) 
  sidenavWidth = computed(()=> this.collapsed() ? '65px' : '200px')



  // menu = 'menu'
  // sideNavState = false 

  //Coding MatSideNav

  sidenav1State = true
  
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav1State = false
        this.sidenav.mode = 'over'
        this.sidenav.open()
      }

      else{
        this.sidenav.mode = 'side'
        this.sidenav.open()
      }
      if(!this.sidenav.opened){
        // this.menu = 'menu'
      }
      else{
        // this.menu = 'menu'
      }

    })
  }

  //Coding MatSideNav
  constructor( route : Router, private observer : BreakpointObserver ){
    
    route.events.subscribe((ev)=>{
      if(ev instanceof NavigationStart){
        this.spinner.show()
        this.loading = true
        this.progress = 0
        this.wathProgress()
      }
      if(ev instanceof NavigationEnd || ev instanceof NavigationError){
        console.log('ev1:', ev)
        setTimeout(()=>{
          this.spinner.hide()
          this.loading = false
          // console.log('ev2:', ev)
        }, 3000)
      }
    })
  }

  wathProgress(){
    setInterval(()=>{
      if(this.progress < 100 ){
        this.progress += 7
      }
    }, 300)
  }

  //SearchInput
  appearSerchInput = false
  @ViewChild(MatIcon) icon !: MatIcon

  AppearSerchInput(){
    if(this.appearSerchInput == false){
      this.appearSerchInput = true
    }
    else if(this.appearSerchInput == true){
      this.appearSerchInput = false
    }
  }

}
