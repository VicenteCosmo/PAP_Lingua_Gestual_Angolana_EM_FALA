import { Injectable } from '@angular/core';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

@Injectable({
  providedIn: 'root'
})
export class HandGestureService {
 
}