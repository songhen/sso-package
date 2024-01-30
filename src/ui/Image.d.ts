import React from 'react';
import { ImageProps as RNImageProps, ImageStyle, ImageURISource, ImageRequireSource } from 'react-native';
export interface MyImageProps {
    imageWidth?: ImageStyle['width'];
    imageHeight?: ImageStyle['height'];
    imageSrc: ImageURISource | ImageRequireSource;
    fallbackImage?: ImageURISource | ImageRequireSource;
    animated?: boolean;
}
export declare const Image: React.FC<MyImageProps & Omit<RNImageProps, 'source'>>;
declare const _default: React.NamedExoticComponent<MyImageProps & Omit<RNImageProps, "source">>;
export default _default;
