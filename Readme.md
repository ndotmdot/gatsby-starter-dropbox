

## Installation

### 1. Setup Gatsby Site on Netlify

**1. Clone this Repo and Push to Git**
**2. Deploy your Repo to Netlify**
**3. Add new Build Hook**
Go to your Netlify project to settings/deploys#build-hooks and add a new hook.
**3. Add Environment Variable**
Add the following variables to netlify at settings/deploys#environment-variables and in your local .env file.

```
NETLIFY_BUILD_HOOK=Your-Hook-You-Just-Added
```

### 2. Setup Dropbox App

**1. Create Dropbox App**
Go to [Dropbox App Console](https://www.dropbox.com/developers/apps/create) and create a new app. Only folder permission is recommended

**2. Create Token**
Got to you app and scroll got "OAuth 2" and click "Generate Token"

**3. Save Token**
Save this token in your .env file

```
NETLIFY_BUILD_HOOK=Your-Hook-You-Just-Added
DROPBOX_TOKEN=Your-Dropbox-Token
```


TODO:
1. 3. ist falsh
