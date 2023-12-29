# FaceAI UI

This faceAI UI rendering page was developed by Ionic framework with Angular, coded by Typescript to access web-cam and send the video stream to the backend for analysis, then display the results.

## Pre-installation
---
1. Install and setup Node enviroments
- [Node.js](https://nodejs.org/en/)

    After installed sucessfully, use
    ``` 
    node -v 
    ```  
    to check the node version
2. Install Angular
- [Angular](https://angular.io/)
    ```
    npm install -g @angular/cli
    ng --version
    ```
3. Install Ionic
- [Ionic framework](https://ionicframework.com/)
    ```
    npm i -g @ionic/cli
    ionic -v
    ```

## Usage
---

### Install
- Clone this repo:
    ```
    git clone https://gitlab.ihpc.a-star.edu.sg/LIUY2/face-ai-ui.git
    cd face-ai-ui
    ```
- Install dependencies

    ```
    npm install
    ```

### Start Server
- Start a local dev server for app dev/testing

    ```
    ionic serve --external --ssl
    ```

### build production
- ionic build will perform an Ionic build, which compiles web assets and prepares them for deployment.

    ```
    ionic build --prod
    ```

