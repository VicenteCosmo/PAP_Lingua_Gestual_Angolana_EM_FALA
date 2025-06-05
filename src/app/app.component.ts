import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../_components/navbar/navbar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent, NgxSkeletonLoaderModule, NgxSpinnerModule, MatProgressSpinnerModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client';
}
