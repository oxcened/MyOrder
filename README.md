# MyOrder 🍝🍛🍲

[![medium story](https://img.shields.io/badge/Medium-Story-%23000?logo=medium)](https://medium.com/@alen.ajam/how-i-took-control-of-my-companys-lunchtime-with-an-app-f6d70c31cb89)
[![repository license](https://img.shields.io/github/license/oxcened/my-order)](https://github.com/oxcened/my-order/blob/master/LICENSE.md)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/oxcened/my-order#contribute)
[![latest release](https://img.shields.io/github/v/release/oxcened/my-order)](https://github.com/oxcened/my-order/releases)
[![website status](https://img.shields.io/website?url=https%3A%2F%2Fmyorderdemo-80b12.web.app%2F)](https://myorderdemo-80b12.web.app/)
[![tests status](https://github.com/oxcened/my-order/actions/workflows/test.yml/badge.svg)](https://github.com/oxcened/my-order/actions/workflows/test.yml)

MyOrder allows groups to track food orders and export daily summaries to Google Sheets.

Read the story behind it
on [Medium](https://medium.com/@alen.ajam/how-i-took-control-of-my-companys-lunchtime-with-an-app-f6d70c31cb89).

![screenshot 1](https://miro.medium.com/max/300/1*Vk0dtrl4eHHAKmUhKkryMw.png)
![screenshot 2](https://miro.medium.com/max/300/1*XsmPd_zjpHLbfnaIt0oROw.png)

## Table of contents

1. [Demo](#demo)
1. [How to use](#how-to-use)
2. [Tech stack](#tech-stack)
1. [Contribute](#contribute)
1. [Roadmap](#roadmap)
1. [Maintainers](#maintainers)
1. [License](#license)

## Demo

You can find a demo [here](https://myorderdemo-80b12.web.app/).

You may try out everything except for the `Submit to Google Sheets` feature located at `/summary`
because [it costs money](https://media.tenor.com/5Z-o3OKSPFIAAAAC/adult-swim-monkey.gif).

## How to use

### Preliminary

1. Clone on your machine using SSH or HTTPS.

   Using SSH (suggested):

   ```
    git@github.com:oxcened/my-order.git
    ```

   Using HTTPS:

    ```
    git clone https://github.com/oxcened/my-order
    ```

1. Enter folder:

    ```
    cd my-order
    ```

1. Use the correct node version (`18.x`). I suggest using [nvm](https://github.com/nvm-sh/nvm). If you have that you can just run:

    ```
    nvm use
    ```

1. Install dependencies:

    ```
    npm i
    ```

### Run on your machine

1. Use the correct node version (`18.x`). I suggest using [nvm](https://github.com/nvm-sh/nvm). If you have that you can just run:

    ```
    nvm use
    ```

1. Setup firebase:

    1. This app is meant to work on top of a [Firebase](https://firebase.google.com/) project, so you should create your
       own.
    1. Initialize [Firestore](https://firebase.google.com/docs/firestore/quickstart).
    1. [Obtain the project config object](https://firebase.google.com/docs/web/learn-more#config-object).
    1. Create an `.env.development` file in the root of the project.
    1. Place inside of it the config object like in `.env.example`.
    1. Create a `.firebaserc` file in the root of the project like `.firebaserc.example`.

1. Run the app:
   
    ```
    npm run dev
    ```

### Build for production

1. Use the correct node version (`18.x`). I suggest using [nvm](https://github.com/nvm-sh/nvm). If you have that you can just run:

    ```
    nvm use
    ```

1. Setup environment:

   The same as the third step of [Run on your machine](#run-on-your-machine) applies, except the app will
   use `.env.production` this time. Learn
   more [here](https://vitejs.dev/guide/env-and-mode.html).

1. Build the app:
   
    ```
    npm run build
    ```

1. Run the app:
   
    ```
    npm run preview
    ```

### Run tests

1. Use the correct node version (`18.x`). I suggest using [nvm](https://github.com/nvm-sh/nvm). If you have that you can just run:

    ```
    nvm use
    ```
    
1. Run tests:
   
    ```
    npm run test
    ```

## Tech stack

1. TypeScript v4.9
2. Vite.js v4
3. React v18
4. Redux.js & RTK Query
5. TailwindCSS
6. Jest & Testing Library

## Contribute

Contributions are most welcome!

### Bug fixing

1. Should you find a bug, please open an issue describing thoroughly what you encountered.
2. If you'd like to fix an already existing issue, please leave a comment asking to work on it, so nobody else does.
3. Once you get assigned an issue, you may work on it and then open a pull request
   titled `fix: #[number of issue] [description of issue]`.

### Feature requests

1. If you have an idea to discuss with the community, feel free to open a discussion.
1. For feature requests, you are free to open a new issue.
1. All feature requests may not fit this project and will be subject to discussion!

### Testing

I suggest making sure all tests run successfully before submitting a PR (even though they are run anyway on GitHub).

To do so, run:

```
npm run test
```

## Roadmap

- [x] Migrate from Gatsby to React + Vite.
- [ ] Improve the desktop UI/UX.
- [ ] Version control the cloud function that exports reports to Google Sheets.
- [ ] Improve the navigation UX.
- [ ] Lazy load all routes.
- [ ] Write unit tests on all components.
- [ ] Add a page to consult orders of past days.
- [ ] Add an admin panel:
  - [ ] Add a page to manage restaurants and their menu.
  - [ ] Allow to switch authentication method to one which is more secure

## Maintainers

- [oxcened](https://github.com/oxcened)

## License

MyOrder is [MIT licensed](https://github.com/oxcened/my-order/blob/master/LICENSE.md).
