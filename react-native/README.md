# Simple React-Native Projects for Proof of Concept

The projects are initially generated with `expo init` and stripped away excess components from there. Current projects are mainly configured for Android and the iOS setup is unconfigured straight from the box. Compilation onto iOS requires the use of XCode and other tools on Mac which are not readily avaliable for my machine. Will look into iOS support later.

# Quick Start

Each folder is a separate small project to introduce some code. It may also require running a backend to communicate and work properly depending on the project.

Node needs to be installed. Run the following commands to get started in any project.

```
yarn         # install local packages in node_modules/ for the project
yarn android # run android project configuration locally, will load to physically connected device or to an existing running Android Emulator
```

# Console Debugging

Android views `console.log` and other log messages can be found running:

```
adb logcat | grep ReactNativeJS
```
