# Gatsby Starter Dropbox Workflow

#### This starter is not about design. It is about a workflow for content editing. Manage your sites content directly form your local Dropbox. Create a page structure with folders. Save content in markdown and as image files. Simply drag-and-drop the "Content" folder into the "_Update" folder to deploy your site with new content. *Without leaving your local filesystem.* 

Learn more on [demo site](http://gatsby-starter-dropbox-workflow.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/91875e72-398e-488f-b45a-5b0d519a4acd/deploy-status)](https://app.netlify.com/sites/gatsby-starter-dropbox-workflow/deploys)

---

## How it Works

At its core this starter uses [Gatsby](https://www.gatsbyjs.org/) as the frontend and [Netlify](https://www.netlify.com/) as the build system and could hosting provider. The Dropbox integration is done with the plugin [gatsby-source-dropbox](https://www.npmjs.com/package/gatsby-source-dropbox) and the package [dropbox-tirgger-netlify](https://www.npmjs.com/package/dropbox-trigger-netlify). The later one is used in a Netlify cloud function within the site's repo and handles automatic deploys and cleanup via webhook calls from your Dropbox App and your Netlify Project.

---

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
To get this starter running, [download the demo content](https://www.dropbox.com/s/8iiix5jitkbresb/gatsby-starter-dropbox-workflow-demo-content.zip?dl=0) and save the unizipped content in your Dropbox app folder  at `./Apps/[your-dropbox-app-name]`.

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


