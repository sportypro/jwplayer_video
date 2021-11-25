import { NgModule } from '@angular/core';
import { ComponentMediaManagerVideoComponent } from './component-media-manager-video/component-media-manager-video';
import { ComponentMediaJwplayerComponent } from './component-media-jwplayer/component-media-jwplayer';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [ComponentMediaManagerVideoComponent, ComponentMediaJwplayerComponent],
	imports: [
		CommonModule,
		IonicModule,
	],
	exports: [ComponentMediaManagerVideoComponent, ComponentMediaJwplayerComponent]
})
export class ComponentsModule {}
