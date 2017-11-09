## Get Started

### System Requirements

* Globally install [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)

* Install [Yarn](https://yarnpkg.com/lang/en/docs/install/): `brew install yarn`


### Installation

On the command prompt run the following commands

```sh
git clone -b master https://github.com/clearsummit/react-native-starter-project.git

cd react-native-starter-project/

yarn
```

### Run on iOS

*	Run `react-native run-ios` or `yarn ios` in your terminal

### Run on Android

*	Run `react-native run-android` or `yarn android` in your terminal

### Renaming the App

* Run `./support/rename.sh NewAppName`

* Run `yarn clean-android` to clean Android's build artifacts.

* In `ios` folder, delete `ReactNativeSeed.xcodeproj` file and `build` folder (if any) to clean iOS's build artifacts.

### Integrate with [CodePush](https://github.com/Microsoft/react-native-code-push)

* Create an app on [ClearSummit's Mobile Center](https://mobile.azure.com/apps) to get deployment keys. We should have a separate app for iOS and Android.

* Generate deployment keys: `code-push deployment add <app_name> "Staging or Production"`

* View deployment keys: `code-push deployment ls <app_name> -k`

* iOS: [muti-deployment testing doc](https://github.com/Microsoft/react-native-code-push/blob/master/docs/multi-deployment-testing-ios.md) Do step 9.

* Android: [muti-deployment testing doc](https://github.com/Microsoft/react-native-code-push/blob/master/docs/multi-deployment-testing-android.md) Do step 2.

### Integrate to [ClearSummit's Sentry](https://sentry.io/auth/login/ClearSummit/)

* Create a new project in Sentry

* Go to Project Settings -> Client Keys -> Copy and paste the DNS url to `SentryUtil.configure('')` in App.js

### Support multiple environments

* Change `API_URL` string in `.env`, `.env.staging`, `.env.production`

* Android: problems with Proguard? Check this [link](https://github.com/luggit/react-native-config#problems-with-proguard) out.
