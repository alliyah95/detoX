<div align="center">
  <img width="96" alt="detoX Logo" src="https://github.com/alliyah95/detoX/assets/74038500/cbad609a-f536-4831-919e-e6d143ed3c58">

# detoX

</div>

The **detoX Browser Extension** is a tool designed to enhance your online experience on the Twitter platform by promoting a safer and more respectful digital environment. Specifically tailored for the context of Philippine politics, this extension is engineered to detect and address hate speech in election-related and politics-related content on Twitter.

It makes use of a [fine-tuned BERT model](https://huggingface.co/mapsoriano/roberta-tagalog-base-philippine-elections-2016-2022-hate-speech), particularly the [RoBERTA Tagalog Base](https://huggingface.co/jcblaise/roberta-tagalog-base) variant, which was trained using a [dataset](https://huggingface.co/datasets/mapsoriano/2016_2022_hate_speech_filipino) containing tweets from the 2016 and 2022 Philippine elections.

![](assets/detoX-Preview.gif)

## ⚙ Local Setup and Installation

1. Install the dependencies by running the command `npm install`.
2. Generate a production build using the command `npm run build`. This will create a `dist` folder containing the necessary files.
3. Open Google Chrome or any Chromium-based browser, and navigate to `chrome://extensions/`.
4. Enable `Developer mode` from the top right corner of the browser window.
5. Click on `Load unpacked`.
6. Select the generated `dist` folder.
7. Ensure that the [detoX server](https://github.com/alliyah95/detoX-api) is up and running.
8. You can now start using the detoX Browser Extension for Twitter.

## 🚧 Built With

<img src="https://skillicons.dev/icons?i=ts,react,webpack" alt="Tools used for building the detoX browser extension">

## 🧠 Authors

-   Danica L. Castro
-   Lenina Jemima V. Dizon
-   Alliyah Joyce M. Sarip
-   Mark Aaron P. Soriano
