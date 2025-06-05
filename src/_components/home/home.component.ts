import { Component, inject, OnInit } from '@angular/core';
import { SignService } from '../../Service/sign.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import { WifiDialogComponent } from '../wifi-dialog/wifi-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly signService = inject(SignService);
  private readonly dialog = inject(MatDialog);

  wifiList: string[] = [];
  controller = false;
  udpDatas: any[] = [];
  controlSkeleton = false;
  form: FormGroup;

  readonly videoUrl = 'http://localhost:5000/video_feed';
  readonly videoActiveUrl = 'http://localhost:5000/video_active';

  private statusMessage: HTMLElement | null = document.getElementById('status-message');

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.initializeTensorFlow();
    console.log('Video URL:', this.videoUrl);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      ssid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  private async initializeTensorFlow(): Promise<void> {
    await tf.setBackend('webgl');
    await tf.ready();
  }

  startBtn(param: number): void {
    fetch(`${this.videoActiveUrl}${param}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'action=start'
    }).then(() => {
      this.controller = true;
      this.updateStatusMessage('Vídeo ativo - mostrando feed');
    });
  }

  stopBtn(param: number): void {
    fetch(`${this.videoActiveUrl}${param}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'action=stop'
    }).then(() => {
      this.updateStatusMessage('Vídeo desativado');
    });
  }

  private updateStatusMessage(message: string): void {
    if (this.statusMessage) {
      this.statusMessage.textContent = message;
    }
  }

  async scanWifi(): Promise<void> {
    this.wifiList = [];
    this.controlSkeleton = true;

    const wifiList = await this.signService.getWifi();
    wifiList.forEach((a) => {
      setTimeout(() => {
        this.controlSkeleton = false;
        this.wifiList.push(a.ssid);
      }, 2500);
    });
  }

  async getUDP(): Promise<void> {
    const newUdpData = await this.signService.getUdpData();
    newUdpData.splice(0, newUdpData.length - 1);
    this.udpDatas = newUdpData;
  }

  showConnectModal(): void {
    this.dialog.open(WifiDialogComponent);
  }
}