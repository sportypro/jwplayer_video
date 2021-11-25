import { ComponentMediaJwplayerComponent } from "../components/component-media-jwplayer/component-media-jwplayer";

interface VideoProps {
    width?: number,
    height?: number,
    loop?: boolean,
    muted?: boolean,
    poster?: string,
    language?: string,

    player?: ComponentMediaJwplayerComponent,
    video?: VideoModel,
    showVolumen?: boolean,
    maxHeight?: number,
    source?: string,
    isPlaying?: boolean,
    _poster?: string,
    onReady?: Function | null,
    onPlaying?: Function | null,
    onError?: Function | null,
    onUpdateTime?: Function | null,
    onErrorPlay?: Function | null,
};

interface VideoModel {
    source: string,
    image: string,
};

export {
    VideoProps,
    VideoModel,
}