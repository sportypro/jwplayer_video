interface JWPlayerProps {
    source: string;
    width: number;
    height: number;
    player: Jwplayer;
    poster: string;
};

interface Jwplayer {
    load(options: object): void;
    play(): void;
    pause(): void;
    setMute(state: boolean): void;
    seek(seconds: number): void;
    getWidth(): number;
    getHeight(): number;
    on(event: string, callback: Function): void;
    resize(width:number|string, height:number|string): void;
    getDuration(): number;
    getPosition(): number;
};

export {
    JWPlayerProps,
    Jwplayer,
}