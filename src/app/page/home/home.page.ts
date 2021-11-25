import { Component, ViewChild, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VideoModel, VideoProps } from 'src/app/model/video-manager.model';
import { ComponentMediaManagerVideoComponent } from 'src/app/components/component-media-manager-video/component-media-manager-video';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(ComponentMediaManagerVideoComponent, { static: true }) managerVideo: ComponentMediaManagerVideoComponent;
  @ViewChild(IonSlides, { static: true }) carrosel: IonSlides;

  public videoOptions: Partial<VideoProps> = {
    onReady: this.handlerVideoReady.bind(this),
  };
  public slideOptions = {
    slidesPerView: 1,
    preloadImages: false,
    lazy: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }
  };

  private inTouching = false;

  constructor(
    private data: DataService,
    private renderer: Renderer2,
  ) { }

  public getPlaylist(): Array<VideoModel> {
    return this.data.getPlaylist();
  }

  public handlerOnLoad(e) {
    this.changeVideoSource(0);
  }

  public handlerVideoReady() {
    console.log('handlerVideoReady')
  }

  private changeVideoSource(index: number) {
    const videoData = this.data.getVideoByIndex(index);
    this.managerVideo.changeVideo(videoData);
    this.displayVideo(false);
  }

  public ionSlideDidChange(event: any) {
    this.carrosel.getActiveIndex().then((index: number) => {
      this.changeVideoSource(index);
    });
  }

  public ionSlideTouchEnd(event: any) {
    this.inTouching = false;
    this.displayVideo(false);
  }

  public ionSlideTouchStart(e: any) {
    if (!this.inTouching) {
      this.inTouching = true;
      this.displayVideo(true);
    }
  }

  private displayVideo(opacity: boolean) {
    const videoEl = document.getElementById('slide-principal');
    if (!videoEl) { return; }

    const slideActive = videoEl.getElementsByClassName(`swiper-slide-active`);
    if (!slideActive || slideActive.length === 0) {
      setTimeout(() => { this.displayVideo(opacity); }, 300);
      return;
    }

    const activeSlide = slideActive[0].getElementsByClassName('item-slider-img');
    if (activeSlide && activeSlide.length) {
      this.renderer.setStyle(activeSlide[0], 'opacity', opacity ? 1 : 0);
    }

    const videoContainer = document.getElementsByClassName('video-slide-principal');
    if (videoContainer.length) {
      this.renderer.setStyle(videoContainer[0], 'opacity', !opacity ? 1 : 0);
    }
  }

}
