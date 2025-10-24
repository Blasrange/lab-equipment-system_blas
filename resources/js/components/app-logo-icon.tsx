import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/apple-touch-icon.png"
            alt="App Logo Icon"
            width="10px"
            {...props}
        />
    );
}
