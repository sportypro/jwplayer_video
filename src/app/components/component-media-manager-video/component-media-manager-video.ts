import { Component, OnInit, ViewChild, ElementRef, Input, Renderer2, SimpleChange } from '@angular/core';
import { DimenModel } from '../../model/dime.model';
import { VideoProps } from '../../model/video-manager.model';
import { ComponentMediaJwplayerComponent } from '../component-media-jwplayer/component-media-jwplayer';
import { CONFIG } from '../../config/config';
import { DomController } from '@ionic/angular';
import { DimenService } from 'src/app/services/dimen.service';
import { ClickEvent } from 'src/app/model/event/click.event';

/**
 * Generated class for the ComponentMediaManagerVideoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'manager-video',
  templateUrl: 'component-media-manager-video.html',
  styleUrls: ['./component-media-manager-video.scss'],
})
export class ComponentMediaManagerVideoComponent implements OnInit {
  @ViewChild('imgPoster', { static: true }) imgPoster: ElementRef;

  @Input() options: Partial<VideoProps> = { };
  public maxHeight = 500;
  public dimnes: DimenModel;
  public _config: VideoProps = {
    player: null,
    source: '',
    video: { source: '', image: '' },
    showVolumen: true,
    isPlaying: false,
    maxHeight: 0,
    _poster: CONFIG.VIDEOS.POSTER,
    muted: true,
    onReady: () => {},
    onPlaying: () => {},
    onError: () => {},
    onUpdateTime: () => {},
    onErrorPlay: () => {},
  };
  private firstLoad: boolean = true;

  constructor(
    private dimen: DimenService,
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  ngOnInit() {
    this.loadDimensions();
    this.setSources();
    this._config.onReady(this);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const propName = Object.keys(changes);
    if (propName.includes('options')) {
      this._config = {
        ...this._config,
        ...this.options,
      };
    }
  }

  private loadDimensions() {
    const dimnes = this.dimen.getDimens();
    this.maxHeight = this._config.height || dimnes.height;
    if (this._config.maxHeight) {
      this.maxHeight = this._config.maxHeight;
      this.domCtrl.write(this.setVideoMaxHeight.bind(this))
    }
    this.dimnes = {
      width: this._config.width || dimnes.width,
      height: this.maxHeight,
    };
  }

  private setVideoMaxHeight() {
    this.renderer.setStyle(this.imgPoster.nativeElement, 'height', `${this.maxHeight}px`);
    this.renderer.setStyle(this.imgPoster.nativeElement, 'object-fit', 'contain');
  }

  private setSources() {
    const { video: { source, image } } = this._config;
    if (source) {
      this.firstLoad = true;
      this.renderer.setStyle(this.imgPoster.nativeElement, 'opacity', 1);

      this._config = {
        ...this._config,
        source: source,
        _poster: this.extractPoster(),
      };
    }
  }

  public getVideo(): Promise<any> {
    return this._config.player.player();
  }

  public getDimens(): Promise<DimenModel> {
    return this._config.player.getVideoDimens();
  }

  private extractPoster(): string {
    const { video: { image } } = this._config;
    if (image) {
      return image;
    }
    return CONFIG.VIDEOS.POSTER;
  }

  public changeVideo({ source, image }) {
    this._config = {
      ...this._config,
      video: {
        ...this._config.video,
        source,
        image,
      },
    };
    this.setSources();
  }

  public load() {
    this._config.player && this._config.player.load();
  }

  public pause() {
    this._config.player && this._config.player.pause();
  }

  public play() {
    this._config.player && this._config.player.play();
  }

  public isPlaying(): boolean {
    return this._config.isPlaying;
  }

  public exist(): boolean {
    return !!this._config.player._config.player;
  }

  public setCurrentTime(time: number) {
    this._config.player.setCurrentTime(time);
  }

  public handlerOnReady(elVideo: ComponentMediaJwplayerComponent) {
    this._config.player = elVideo;
  }

  public handlerOnPlay() {
    this._config.isPlaying = true;
    this._config.onPlaying();
  }

  public handlerOnPause() {
    this._config.isPlaying = false;
  }

  public handlerOnError(error: any) {
    this._config.onError(error);
  }

  public handlerOnErrorPlay(error: any) {
    this._config.onErrorPlay(error);
  }

  public async handlerOnTimeUpdate({duration, currentTime}) {
    if (!isNaN(duration)) {
      if (this.firstLoad) {
        this.firstLoad = false;
        const video = await this.getVideo();
        this.renderer.setStyle(video, 'opacity', 1);
        this.renderer.setStyle(this.imgPoster.nativeElement, 'opacity', 0);
      }
      this._config.onUpdateTime({ currentTime, duration });
    }
  }

  public handlerOnLoadedData() {
    this.firstLoad = true;
  }

  public handlerMuted(event: ClickEvent) {
    event.stopPropagation();
    this._config = {
      ...this._config,
      muted: !this._config.muted,
    };
    this._config.player.handlerMuted(this._config.muted);
  }

}
