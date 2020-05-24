# gatsby-starter-dropbox-workflow

Manage your sites content directly form your local Dropbox. Simply drag-and-drop to deploy new content to your site, without leaving your local filesystem. Gatsby-Starter-Dropbox-Workflow works great for small to medium sites. It saves developers time and provides an easy workflow for editors.

## How it Works

At its core this starter uses [Gatsby](https://www.gatsbyjs.org/) as the frontend and [Netlify](https://www.netlify.com/) as the build system and could hosting provider. The Dropbox integration is done with the plugin [gatsby-source-dropbox](https://www.npmjs.com/package/gatsby-source-dropbox) and the package [dropbox-tirgger-netlify](https://www.npmjs.com/package/dropbox-trigger-netlify). The later one is used in a Netlify cloud function within the site's repo and handles automatic deploys and cleanup via webhook calls from your Dropbox App and your Netlify Project.

## Installation

### 1. Clone this Gatsby Site
```bash
git clone https://github.com/niklas-may/gatsby-starter-dropbox.git
```

### 2. Create Dropbox App
Go to [Dropbox App Console](https://www.dropbox.com/developers/apps/create) and create a new app, choose your account type, only folder permission (recommended), choose a name and hit create.

### 3. Generate and Save Dropbox Token
Scroll on app page to "OAuth 2" and click "Generate Token". Copy and save token to `.env` file in your projects root directory.
```
DROPBOX_TOKEN=Your-Dropbox-Token
```

### 4. Add folders to Dropbox App
Go to your Dropbox app folder  at `./Apps/[your-dropbox-app-name]` and add the following folders.

```markdown
.
+-- _Update
+-- Content
|   +--Whatever Files you need.md
|   +--Whatever Folders you need
```

Alternatively you can [download the demo content](#) to make the starter works like in this demo.

### 5. Deploy Site to Netlify

### 6. Create a new Netlify Build Hook
Go to your Netlify project to settings/deploys#build-hooks and add a new hook

### 7. Save Build Hook to `.env` file
```
DROPBOX_TOKEN=Your-Dropbox-Token
NETLIFY_BUILD_HOOK=Your-Hook-You-Just-Added
```

### 8. Create Netlify Deploy Notifications
Got to your Netlify project to settings/deploys#deploy-notifications and add an outgoing webhook for succeeded and failed builds pointing to `[you-site-url]/.netlify/functions/syncDropbox`

### 9. Add Environment Variables to Netlify
Add the environment variables from your `.env` file to netlify at settings/deploys#environment-variables

### 10. Add Webhook to Dropbox App
Go to [Dropbox App Console](https://www.dropbox.com/developers/apps) to you app and add a webhook pointing to you `NETLIFY_BUILD_HOOK`

