package com.wallpapers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.app.WallpaperManager
import android.graphics.BitmapFactory
import android.util.Base64
import java.io.IOException

class WallpapersModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WallpapersModule"
    }

    @ReactMethod
    fun setWallpaperFromBase64(base64String: String, promise: Promise) {
        try {
            // Remove data URL prefix if present
            val cleanBase64 = base64String.replace("data:image/[^;]+;base64,", "")
            
            val decodedBytes = Base64.decode(cleanBase64, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
            
            if (bitmap == null) {
                promise.reject("DECODE_ERROR", "Failed to decode base64 image")
                return
            }
            
            val wallpaperManager = WallpaperManager.getInstance(reactApplicationContext)
            wallpaperManager.setBitmap(bitmap)
            promise.resolve("Wallpaper set successfully!")
            
        } catch (e: IOException) {
            promise.reject("WALLPAPER_ERROR", "Failed to set wallpaper: ${e.message}")
        } catch (e: Exception) {
            promise.reject("UNKNOWN_ERROR", "Unexpected error: ${e.message}")
        }
    }

    @ReactMethod
    fun setWallpaperFromPath(filePath: String, promise: Promise) {
        try {
            val cleanPath = filePath.replace("file://", "")
            val bitmap = BitmapFactory.decodeFile(cleanPath)
            
            if (bitmap == null) {
                promise.reject("DECODE_ERROR", "Failed to decode image file")
                return
            }
            
            val wallpaperManager = WallpaperManager.getInstance(reactApplicationContext)
            wallpaperManager.setBitmap(bitmap)
            promise.resolve("Wallpaper set successfully from file!")
            
        } catch (e: IOException) {
            promise.reject("WALLPAPER_ERROR", "Failed to set wallpaper: ${e.message}")
        } catch (e: Exception) {
            promise.reject("UNKNOWN_ERROR", "Unexpected error: ${e.message}")
        }
    }

    @ReactMethod
    fun isSupported(promise: Promise) {
        try {
            // Check if wallpaper manager is available
            WallpaperManager.getInstance(reactApplicationContext)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.resolve(false)
        }
    }
}