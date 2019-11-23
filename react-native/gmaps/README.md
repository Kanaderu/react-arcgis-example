# Android Setup

Currently only setup for Android devices. Set the `ANDROID_HOME` environment variable to point to the Android SDK (ex. `export ANDROID_HOME=$HOME/Android/Sdk`).

An Android device needs either be physically connected or an emulator must be running to deploy the app for development. Setup tested with Android 9.0 (Pie) and with Google Play Service (required to be installed to use Google Maps).

Run the following commands to install packages and run on an Android Emulator.

```
yarn
yarn android
```

# Google Maps API Key

Use of the Google Maps API requires a key which can be entered at `android/app/src/main/AndroidManifest.xml`
