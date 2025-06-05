import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpRequest, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from '../_components/home/home.component';
import { ngxLoadingAnimationTypes, NgxLoadingComponent, NgxLoadingModule } from 'ngx-loading';
import { InterceptorService } from '../Service/interceptor.service';
import { MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    MatSnackBarModule, MatSnackBarConfig, 
    importProvidersFrom(NgxSkeletonLoaderModule.forRoot({
      theme: {
        extendsFromRoot: true,
        'background-color':'#cddaec',
        backgroudColor: '#'
      }
    })),
    provideRouter(routes), provideHttpClient(),
  provideAnimations(), HomeComponent, provideAnimationsAsync(), 
{
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
}
]
};
