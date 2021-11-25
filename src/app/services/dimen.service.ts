import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DimenModel } from '../model/dime.model';

@Injectable({
  providedIn: 'root'
})
export class DimenService {

  constructor(private platform: Platform) { }

  public getDimens(): DimenModel {
    return {
      width: this.platform.width(),
      height: this.platform.height(),
    };
  }

}
