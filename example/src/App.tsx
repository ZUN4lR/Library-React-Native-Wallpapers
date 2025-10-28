import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Alert,
  Platform,
  ActivityIndicator 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import WallpaperManager from 'react-native-wallpapers';

const App = () => {
  const [loading, setLoading] = useState(false);

  const checkSupport = async () => {
    try {
      const supported = await WallpaperManager.isSupported();
      Alert.alert(
        'Support Check', 
        `Wallpaper functionality is ${supported ? 'available' : 'not available'} on this device`
      );
    } catch (error) {
      Alert.alert('Error', `Failed to check support: ${error}`);
    }
  };

  const pickImageAndSetWallpaper = () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Info', 'Wallpaper feature is only available on Android');
      return;
    }

    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      maxWidth: 2048,
      maxHeight: 2048,
      quality: 0.9,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', `Image picker error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setLoading(true);

        try {
          let result: string;
          
          // Try base64 first (more reliable)
          if (asset.base64) {
            result = await WallpaperManager.setWallpaperFromBase64(asset.base64);
          } 
          // Fallback to file path
          else if (asset.uri) {
            result = await WallpaperManager.setWallpaperFromPath(asset.uri);
          } else {
            throw new Error('No image data available');
          }
          
          Alert.alert('Success', result);
        } catch (error: any) {
          Alert.alert('Error', error?.message || 'Failed to set wallpaper');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const setWallpaperFromUrl = async () => {
    // Example of how developers might use the library with their own image loading
    Alert.alert('Info', 'Developers can use any image library to get base64 or file path, then call our functions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallpaper Manager</Text>
        <Text style={styles.subtitle}>Functional API Example</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Button 
            title="Check Support" 
            onPress={checkSupport}
            color="#007AFF"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title={loading ? "Setting Wallpaper..." : "Pick Image & Set Wallpaper"} 
            onPress={pickImageAndSetWallpaper}
            disabled={loading}
            color="#34C759"
          />
          {loading && <ActivityIndicator style={styles.loader} />}
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Usage Examples" 
            onPress={setWallpaperFromUrl}
            color="#FF9500"
          />
        </View>

        <View style={styles.codeExample}>
          <Text style={styles.codeTitle}>Usage Example:</Text>
          <Text style={styles.code}>
            {`import WallpaperManager from 'react-native-wallpapers';\n\n// Set from base64\nawait WallpaperManager.setWallpaperFromBase64(base64String);\n\n// Set from file path\nawait WallpaperManager.setWallpaperFromPath(filePath);\n\n// Check support\nconst supported = await WallpaperManager.isSupported();`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 8,
  },
  codeExample: {
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  codeTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  code: {
    color: '#64D2FF',
    fontSize: 12,
    fontFamily: 'Courier',
  },
});

export default App;