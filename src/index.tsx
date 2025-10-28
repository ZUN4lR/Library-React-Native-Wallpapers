import { NativeModules, Platform } from 'react-native';

const { WallpapersModule } = NativeModules;

interface WallpaperManagerType {
  setWallpaperFromBase64(base64String: string): Promise<string>;
  setWallpaperFromPath(filePath: string): Promise<string>;
  isSupported(): Promise<boolean>;
}

const WallpaperManager: WallpaperManagerType = {
  /**
   * Set wallpaper from base64 encoded image string
   * @param base64String - Base64 encoded image data (can include data URI prefix)
   * @returns Promise that resolves with success message or rejects with error
   */
  setWallpaperFromBase64: (base64String: string): Promise<string> => {
    if (Platform.OS !== 'android') {
      return Promise.reject('Wallpaper feature is only available on Android');
    }
    return WallpapersModule.setWallpaperFromBase64(base64String);
  },
  
  /**
   * Set wallpaper from local file path
   * @param filePath - Local file path to the image (can include file:// prefix)
   * @returns Promise that resolves with success message or rejects with error
   */
  setWallpaperFromPath: (filePath: string): Promise<string> => {
    if (Platform.OS !== 'android') {
      return Promise.reject('Wallpaper feature is only available on Android');
    }
    return WallpapersModule.setWallpaperFromPath(filePath);
  },
  
  /**
   * Check if wallpaper functionality is supported on the current device
   * @returns Promise that resolves with boolean indicating support
   */
  isSupported: (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(false);
    }
    return WallpapersModule.isSupported();
  },
};

export default WallpaperManager;