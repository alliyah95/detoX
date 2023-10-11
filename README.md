<div align="center">
  <img width="200" alt="detoX Logo" src="https://github.com/alliyah95/detoX/assets/74038500/cbad609a-f536-4831-919e-e6d143ed3c58">

# detoX

</div>

The [**detoX Browser Extension**](https://chrome.google.com/webstore/detail/detox/efibkphbodijlgbhflloachnigfmgfdi) is a tool designed to enhance one's online experience on the Twitter platform by promoting a safer and more respectful digital environment. Specifically tailored for the context of Philippine politics, this extension is engineered to detect and address hate speech in election-related and politics-related content on Twitter.

It makes use of a [fine-tuned BERT model](https://huggingface.co/mapsoriano/roberta-tagalog-base-philippine-elections-2016-2022-hate-speech), particularly the [RoBERTA Tagalog Base](https://huggingface.co/jcblaise/roberta-tagalog-base) variant, which was trained using a [dataset](https://huggingface.co/datasets/mapsoriano/2016_2022_hate_speech_filipino) containing tweets from the 2016 and 2022 Philippine elections.

You can install the live extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/detox/efibkphbodijlgbhflloachnigfmgfdi)!
![](assets/detoX-Preview.gif)

## 📄 Contents

-   [🌐 Relevant Links](#🌐-relevant-links)
    1. [🗂️ Datasets Used](#🗂️-datasets-used)
    2. [🤖 Models](#🤖-models)
    3. [🧰 Browser Extension](#🧰-browser-extension)
-   [💻 Local Setup and Installation](#💻-local-setup-and-installation)
-   [🛠️ Built With](#🛠️-built-with)
-   [💙 Acknowledgements](#💙-acknowledgements)
-   [🧠 Authors](#🧠-authors)

## 🌐 Relevant Links

### 🗂️ Datasets Used

-   **Hate Speech Filipino:** [hate_speech_filipino](https://huggingface.co/datasets/hate_speech_filipino)
-   **Combined Dataset:** [mapsoriano/2016_2022_hate_speech_filipino](https://huggingface.co/datasets/mapsoriano/2016_2022_hate_speech_filipino)

### 🤖 Models

-   **RoBERTA Tagalog Base Model:** [jcblaise/roberta-tagalog-base](https://huggingface.co/jcblaise/roberta-tagalog-base)
-   **Fine-tuned Model:** [mapsoriano/roberta-tagalog-base-philippine-elections-2016-2022-hate-speech](https://huggingface.co/mapsoriano/roberta-tagalog-base-philippine-elections-2016-2022-hate-speech)

### 🧰 Browser Extension

-   **Chrome Web Store:** [detoX](https://chrome.google.com/webstore/detail/detox/efibkphbodijlgbhflloachnigfmgfdi)

## 💻 Local Setup and Installation

1. Install the dependencies by running the command `npm install`.
2. Generate a production build using the command `npm run build`. This will create a `dist` folder containing the necessary files.
3. Open Google Chrome or any Chromium-based browser, and access the extensions page. In Google Chrome, this can be done by navigating to `chrome://extensions/`.
4. Enable `Developer mode` from the top right corner of the browser window.
5. Click on `Load unpacked`.
6. Select the generated `dist` folder.
7. Ensure that the [detoX server](https://github.com/alliyah95/detoX-api) is up and running.
8. You can now start using the detoX Browser Extension for Twitter.

## 🛠️ Built With

<img src="https://skillicons.dev/icons?i=ts,react,webpack" alt="Tools used for building the detoX browser extension">

## 💙 Acknowledgements

| Name                           | Contribution                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------- |
| 🌟 Dr. Mary Jane Rabena        | Our thesis adviser                                                               |
| 🌟 Dr. Arlan Dela Cruz         | For sharing his expertise in research                                            |
| 🌟 Ms. Abijah Louise Dela Cruz | For validating our 2022 dataset                                                  |
| 🌟 Dr. Ocirne Jun-Jun Liwanag  | For evaluating our browser extension                                             |
| 🌟 Mr. Arvin del Rosario       | For evaluating our browser extension                                             |
| 🌟 Mr. John Montes             | For evaluating our browser extension                                             |
| 🌟 Mr. Nelson Dizon            | For evaluating our browser extension                                             |
| 🌟 Mr. Alberto Castro Jr.      | For evaluating our browser extension                                             |
| 🌟 Mr. Blaise Cruz             | Publisher of the RoBERTa Tagalog Base model and the Hate Speech Filipino Dataset |

## 🧠 Authors

-   👧 Danica L. Castro
-   👧 Lenina Jemima V. Dizon
-   👧 Alliyah Joyce M. Sarip
-   👦 Mark Aaron P. Soriano
