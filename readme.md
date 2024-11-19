# Zoom Cobrowse SDK Quickstart

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/video-sdk-terms/).

## Prerequisites:

- Node LTS & NPM
- A Zoom SDK Universal Credit account
- A [Zoom Cobrowse token server](https://github.com/zoom/cobrowsesdk-auth-endpoint-sample)

## Installation

To get started, clone the repo:

`git clone https://github.com/zoom/videosdk-web-helloworld.git`

## Setup

1. Install the dependencies: `npm install`
1. Deploy a token server to get the JWT. You can find a sample token server [here](https://github.com/zoom/cobrowsesdk-auth-endpoint-sample). You can deploy it to a server of your choice or run it locally.
1. Create a `.env` file in the root directory of the project, you can do this by copying the `example.env` file (`cp example.env .env`) and replacing the values with your own. The `.env` file should look like this:

```
VITE_ZOOM_SDK_KEY=123xxxxxxx
VITE_TOKEN_URL=http://localhost:4000/ # or https://your-token-server.com/
```

Add your Zoom SDK key and Token URL. Note: This is different from the Zoom API credentials.

4. Run the app:

   `npm run dev`

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Usage

1. Navigate to http://localhost:5173

2. Make sure your token server is running and you have the correct Zoom SDK key and Token URL in your `.env` file.

3. Click the customer and agent buttons to open two different tabs.

4. Click the "Cobrowse" button on the customer tab to start a cobrowse session.

5. Enter the generated pin from the customer tab on the agent tab.
