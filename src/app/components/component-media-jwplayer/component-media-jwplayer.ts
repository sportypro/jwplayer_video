import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DimenModel } from '../../model/dime.model';
import { VideoSourceModel } from '../../model/video-source.model';
import { JWPlayerProps, Jwplayer } from '../../model/jwplayer.model';
import { DomController } from '@ionic/angular';

declare var jwplayer: any;

/**
 * Generated class for the ComponentMediaJwplayerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-jwplayer',
  templateUrl: 'component-media-jwplayer.html'
})
export class ComponentMediaJwplayerComponent {
  @ViewChild('jwContainer', {static: true}) jwContainer: ElementRef;

  @Input () muteMandatory: boolean = false;
  @Input ('height') set setHeight(height: number) {
    if (height) {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.jwContainer.nativeElement, 'height', `${height}px`);
      });
    }
  };
  @Input ('dimens') set setDimens(dimes: DimenModel) {
    if (dimes && dimes.width) {
      this._config = {...this._config, ...dimes};

      if (this.exist()) {
        this.pluginPlayer().resize(dimes.width, dimes.height);
      }
    }
  };
  @Input ('source') set setSource({source, poster}: VideoSourceModel) {
    if (source) {
      this._config = {...this._config, source, poster};
      this.loadPlayer();
    }
  };

  @Output() onReady: EventEmitter<ComponentMediaJwplayerComponent> = new EventEmitter(true);
  @Output() onPlay: EventEmitter<void> = new EventEmitter(true);
  @Output() onPause: EventEmitter<void> = new EventEmitter(true);
  @Output() onError: EventEmitter<any> = new EventEmitter(true);
  @Output() onErrorPlay: EventEmitter<any> = new EventEmitter(true);
  @Output() onTimeUpdate: EventEmitter<{duration:number, currentTime:number}> = new EventEmitter(true);
  @Output() onLoadedData: EventEmitter<void> = new EventEmitter(true);
  @Output() onMutedStore: EventEmitter<boolean> = new EventEmitter(true);

  public _config: JWPlayerProps = {
    player: null,
    source: '',
    poster: '',
    height: 0,
    width: 0,
  };

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }

  private loadPlayer(): void {
    if (!this.exist()) {
      var options = {
        file: this._config.source,
        image: this._config.poster,

        width: this._config.width,
        height: this._config.height,
        controls: false,
        displaytitle: false,
        mute: !this.muteMandatory,
        repeat: true,
        logo: {
          hide: true,
        },
        floating: {
          mode: 'never',
        },
      };
      const player = jwplayer(this.jwContainer.nativeElement).setup(options);
      this._config.player = player;
      this.videoEvents();

    } else {
      this.pluginPlayer().load({
        file: this._config.source,
        image: this._config.poster,
      });
      this.load();
    }
  }

  public load(): void {
    this.play();
  }

  public play(): void {
    if (this.exist() && this._config.source) {
      this.pluginPlayer().play();
    }
  }

  public pause(): void {
    if (this.exist()) {
      this.pluginPlayer().pause();
    }
  }

  public handlerMuted(mute: boolean): void {
    this.pluginPlayer().setMute(mute);
  }

  public setCurrentTime(time: number): void {
    this.pluginPlayer().seek(time);
  }

  public getVideoDimens(): Promise<DimenModel> {
    const width = this.pluginPlayer().getWidth();
    const height = this.pluginPlayer().getHeight();
    return Promise.resolve({width, height});
  }

  public getDuration(): number {
    return this.pluginPlayer().getDuration();
  }

  public getCurrentTime(): number {
    return this.pluginPlayer().getPosition();
  }

  public player(): Promise<any> {
    return Promise.resolve(this.jwContainer.nativeElement);
  }

  public exist(): boolean {
    return !!this._config.player;
  }

  /* @see https://developer.jwplayer.com/jwplayer/docs/jw8-reference */
  private videoEvents(): void {
    this.pluginPlayer().on('ready', this.ready.bind(this));
    this.pluginPlayer().on('meta', this.onloadeddata.bind(this));
    this.pluginPlayer().on('error', this.onerror.bind(this));
    this.pluginPlayer().on('time', this.onTimeupdate.bind(this));
    this.pluginPlayer().on('play', this.onplay.bind(this));
    this.pluginPlayer().on('pause', this.onpause.bind(this));
  }

  private ready() {
    this.onReady.emit(this);
  }

  private onloadeddata() {
    this.load();
    this.onLoadedData.emit();
  }

  private onerror({code, message, type}) {
    this.onError.emit({message, code, type});
  }

  private onTimeupdate({position, duration}) {
    this.onTimeUpdate.emit({duration, currentTime: position});
  }

  private onplay({oldstate, viewable, playReason}) {
    this.onPlay.emit();
  }

  private onpause({oldstate, viewable, pauseReason}) {
    this.onPause.emit();
  }

  private pluginPlayer(): Jwplayer {
    return this._config.player;
  }
}
