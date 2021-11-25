import { Injectable } from '@angular/core';
import { VideoModel } from '../model/video-manager.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private playlist: Array<VideoModel> = [{
    source: 'https://storage.googleapis.com/challer-multimedia-bucket/Videos/PlantillaReto/video91020211109130100383.mp4',
    image: 'https://storage.googleapis.com/challer-multimedia-bucket/Imagenes/PlantillaReto/image91020211109130100892.png',
  }, {
    source: 'https://storage.googleapis.com/challer-multimedia-bucket/Videos/PlantillaReto/file79420211108221355062.MOV',
    image: 'https://storage.googleapis.com/challer-multimedia-bucket/Imagenes/PlantillaReto/image79420211108221355743.png',
  }, {
    source: 'https://storage.googleapis.com/challer-multimedia-bucket/Videos/Usuarios/file119220211124143624664.MOV',
    image: 'https://storage.googleapis.com/challer-multimedia-bucket/Imagenes/Usuarios/image119220211124143625226.png',
  }, {
    source: 'https://storage.googleapis.com/challer-multimedia-bucket/Videos/Usuarios/video3320210123153209033_opt.mp4',
    image: 'https://storage.googleapis.com/challer-multimedia-bucket/Imagenes/Usuarios/image3320210123153210339.png',
  }, {
    source: 'https://storage.googleapis.com/challer-multimedia-bucket/Videos/Usuarios/video8820210201021029243_opt.mp4',
    image: 'https://storage.googleapis.com/challer-multimedia-bucket/Imagenes/PlantillaReto/image8820210201021031698.png',
  }];

  constructor() { }

  public getPlaylist(): Array<VideoModel> {
    return this.playlist;
  }

  public getVideoByIndex(index: number): VideoModel {
    return this.playlist[index];
  }
}
