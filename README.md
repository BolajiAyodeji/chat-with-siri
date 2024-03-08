<div align="center">

![](./public/logo.svg)

A text-to-speech chatbot demo built using Nextjs, OpenAI's GPT-3 Chat Completions API, and ElevenLabs' Text-to-Speech API.

---

![](./public/demo.png)

</div>

> [!TIP]
>
> Kindly read [this comprehensive tutorial]() to learn how this was built and how you can build yours (TBA).

---

## Table of Contents

* [Features](#features)
* [Important Files and Folders](#important-files-and-folders)
* [Getting Started](#getting-started)
* [Deployment](#deployment)
* [API Keys Guide](#api-keys-guide)
* [Repo Stats Summary](#repo-stats-summary)
* [Contributors Guide](#contributors-guide)
* [License](#license)

---

## Features

* [x] A responsive, user-friendly, and performant UI built with TypeScript, Reactjs, Nextjs App Router, Tailwind CSS, and ElevenLabs TypeScript SDK.
* [x] PWA support for installation on mobile devices and offline usage.
* [x] Users can ask a question by text and get a text response.
* [x] Users can ask a question by text and get an audio response.
* [x] Users can change the voice of the audio response (40+ options).
* [x] Users can replay the last audio response.
* [x] Users can start a new chat session.
* [x] Chat history and voice settings are saved to local storage.
* [x] Public live demo for users to explore with their API keys.
* [x] One-click deployment configuration to Vercel and Netlify.
* [ ] Stream the text response from OpenAI.
* [ ] Allow process termination when the response is streaming (refactor the current loading indicator to a stop button).
* [ ] Pass the stream chunks from OpenAI directly to ElevenLabs.
* [ ] Stream the audio response from ElevenLabs to the UI.
* [ ] Increase the response tokens and characters.
* [ ] Add an option to choose the language translation of the audio response (using the `eleven _multilingual_v2` model).
* [ ] Theme toggle for light mode.

<div align="center">

![](./public/flow-dark.png#gh-dark-mode-only)
![](./public/flow-light.png#gh-light-mode-only)

</div>

## Important Files and Folders

| **Path**                           | **Description**                                 |
| ---------------------------------- | ----------------------------------------------- |
| `.env.example`                     | Example file with all the required environment variables.                           |  
| `/app/chat/route.ts`               | API route handler for communicating with OpenAI.                              |
| `/app/speech/route.ts`             | API route handler for communicating with ElevenLabs.                          |
| `/app/components/storeApiKeys.tsx` | React component for the user API keys section of the UI.                                  |
| `/app/components/chatVoice.tsx`    | React component for the voice selection section of the UI.                                  |
| `/app/components/chatMessages.tsx` | React component for the chat messages section of the UI.                                  |
| `/app/components/chatControls.tsx` | React component for the user controls section of the UI.                                  |
| `/app/components/chatInput.tsx`    | React component for the user input section of the UI.                                  |
| `/hooks/useLocalStorage.ts`        | React hooks to save and fetch data from localStorage. |
| `/app/layout.tsx`                  | Shared UI for fonts and metadata configuration.                       |
| `/app/page.tsx`                    | Home page (`/`).                                 |
| `/app/chat/page.tsx`               | Chat page (`/chat`).                             |
| `/utils/getVoices.ts`              | Utility file to fetch voices from ElevenLabs.    |
| `/utils/notifyUser.ts`             | Utility file for toast notifications.            |
| `/types/chat.ts`                   | Types for the entire project.                    |

## Getting Started

To run this application locally, kindly follow the steps below:

1. Rename the `.env.example` file to `.env.local` and fill in the required environment variables.
    * `APP_MODE` - `development` or `production`.
    * `OPENAI_API_KEY` - OpenAI API key ([sign up and get one here](https://platform.openai.com/api-keys)).
    * `ELEVENLABS_API_KEY` - ElevenLabs API key ([sign up and get one here](http://elevenlabs.io/?from=bolajiayodeji2995)).

2. Install all required dependencies with the `npm install` command (or use `yarn` / `pnpm`).

3. Run the development server with the command `npm run dev`.

4. Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

5. All good! You can start modifying any page and the app will auto-update.

## Deployment

You can fork and deploy anywhere you want or use the one-click buttons below to deploy to Vercel or Netlify. All you need is to ensure you add the environment variables mentioned in the [Getting Started](#getting-started) section.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBolajiAyodeji%2Fchat-with-siri&env=APP_MODE,OPENAI_API_KEY,ELEVENLABS_API_KEY&envDescription=API%20keys%20needed%20for%20the%20application) [![Deploy to Netlify](https://netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bolajiayodeji/chat-with-siri#APP_MODE=production)

## API Keys Guide

To enable anyone to test the application in production if they want to, I've added a form where they can enter their API keys for both OpenAI and ElevenLabs (so I don't have to cover the costs and deal with request overload since this is a basic demo for now). This is a good way for anyone to test the application without having to clone and run it locally. To create both API keys (if you don't have one already), **kindly read this section of [the tutorial]() (TBA)**. Once you have the keys, click on the settings icon at the top section of the page, and enter them in the form provided. You can repeat the same process to update the keys.

> [!WARNING]
>
> **Both API keys are stored on your local computer and are not saved to any database or sent to any server/third-party service (they're stored in [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) and you can [read the code](./app/components/storeApiKeys.tsx) yourself)**. The keys are only used to make API requests on your behalf each time you want to use the app. This is safe and secure for anyone to use **if you guarantee that no one else has access to your computer or browser**. You can use the "Delete" button in the form to remove the API keys from your local storage at any time.

Enjoy chatting with Siri!

## Repo Stats Summary

![GitHub Repository Statistics](https://repobeats.axiom.co/api/embed/1657554edd83178251445508d38da1b9f03832a6.svg "Repobeats analytics image")

## Contributors Guide

1. Fork [this repository](https://github.com/BolajiAyodeji/chat-with-siri) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/chat-with-siri.git && cd chat-with-siri
```

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. I'll attend to your pull request soon and provide some feedback.

## License

This repository is published under the [MIT](LICENSE) license.

---

<div align="center">
<a href="https://bolajiayodeji.com" target="_blank" rel="noopener noreferrer"><img src="https://bolajiayodeji.com/favicon.png" width="30" /></a>
</div>
