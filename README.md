# React Native Wallpapers

A powerful and lightweight React Native module that allows you to set Android wallpapers using base64 images or file paths, with full TypeScript support and a Promise-based API.

# ✨ Features

<img src="https://img.icons8.com/fluency/48/wallpaper.png" width="15"/> Set wallpaper from Base64 string  

<img src="https://img.icons8.com/fluency/48/folder-invoices.png" width="15"/> Set wallpaper from local file path  

<img src="https://img.icons8.com/fluency/48/search.png" width="15"/> Check device support  

<img src="https://img.icons8.com/fluency/48/000000/lightning-bolt.png" width="15"/> Promise-based API  

<img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" width="15"/> TypeScript support  



# 📦 Installation

    npm install react-native-wallpapers
 
 or

    yarn add react-native-wallpapers

# Android Permission

#### Add this to your android/app/src/main/AndroidManifest.xml:

    <uses-permission android:name="android.permission.SET_WALLPAPER" />



# Usage
#### Basic Example :
    import WallpaperManager from 'react-native-wallpapers';

    // Check if wallpaper functionality is available
    const supported = await WallpaperManager.isSupported();

    if (supported) {
    // Set wallpaper from base64 string
    await WallpaperManager.setWallpaperFromBase64('base64-string-here');

    // Or set from file path
    await WallpaperManager.setWallpaperFromPath('/path/to/image.jpg');
    }

# Complete Example with Image Picker

#### Note: This example uses react-native-image-picker which you can install separately:

    npm install react-native-image-picker
#### or
    yarn add react-native-image-picker
####

    import React from 'react';

    import { Button, Alert } from 'react-native';

    import { launchImageLibrary } from 'react-native-image-picker';

    import WallpaperManager from 'react-native-wallpapers';

    const WallpaperExample = () => {

      const setWallpaper = async () => {

        try {
        const supported = await WallpaperManager.isSupported();
        if (!supported) {
            Alert.alert('Error', 'Wallpaper not supported on this device');
            return;
        }

          const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
          });

          if (result.assets?.[0]) {
            const asset = result.assets[0];

            if (asset.base64) {
            await WallpaperManager.setWallpaperFromBase64(asset.base64);
            } else if (asset.uri) {
              await WallpaperManager.setWallpaperFromPath(asset.uri);
            }
            Alert.alert('Success', 'Wallpaper set successfully!');
        }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
      };

          return <Button title="Set Wallpaper" onPress={setWallpaper} />;
    };

    export default WallpaperExample;

# API Reference
Method	Description	Returns

    setWallpaperFromBase64(base64String: string)

Sets wallpaper from base64 image data	Promise<string>

    setWallpaperFromPath(filePath: string)
    
Sets wallpaper from a local file path	Promise<string>
isSupported()	

    Checks if wallpaper setting is supported	Promise<boolean>
# Example Method Definitions

    setWallpaperFromBase64(base64String: string): Promise<string>

base64String: Base64 encoded image data (with or without data:image/... prefix)

✅ Resolves with success message

❌ Rejects with error

    setWallpaperFromPath(filePath: string): Promise<string>

filePath: Local file path (with or without file://)

✅ Resolves with success message

❌ Rejects with error

    isSupported(): Promise<boolean>

✅ Returns true if supported on device

❌ false for unsupported devices (like iOS)

🌐 Platform Support

Platform	Status	Notes

Android	✅ Supported	Fully functional

iOS	❌ Not Supported	Will return error if used

# 📄 License
####  MIT License

# 📢 Contributions & Issues

Feel free to open issues or PRs on GitHub to suggest features or improvements!
