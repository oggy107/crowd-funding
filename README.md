# Crowd Surge

## A minimalistic crowd funding web app

<br>

![image](./images/home.png)

## Features

- Create new campaigns
- Support existing campaigns by funding ether (ETH)
- Minimalistic UI
- Mobile responsive

## Tech Stack

- Frontend
  - <img src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-1174965.png?f=avif&w=128" width="20"> Typescript
  - <img src="https://cdn.iconscout.com/icon/free/png-256/free-logo-1889531-1597591.png?f=avif&w=128" width="20"> React
  - <img src="https://vitejs.dev/logo.svg" width="20"> Vite
  - <img src="https://tailwindcss.com/favicons/favicon-32x32.png?v=3" width="20"> Tailwind
  - <img src="https://seeklogo.com/images/E/ethers-logo-D5B86204D8-seeklogo.com.png" width="20"> Ethers.js

- Backend
  - <img src="https://cdn.iconscout.com/icon/free/png-256/free-ethereum-1-283135.png?f=avif&w=128" width="20"> Ethereum
  - <img src="https://hardhat.org/favicon.ico" width="20"> Hardhat

<br>

***Note*:** Currently only deployed on sepolia and goerli ethereum test networks

---

## Running Locally

<br>

* Clone the repository

  ```
  $ git clone https://github.com/oggy107/crowd-surge.git
  ```

* Install Dependencies

  ```
  $ cd crowd-surge
  $ cd client
  $ yarn
  ```

* Run the development server

  ```
  $ yarn dev
  ```

* If you need to develop smart contract install dependencies in `web3` subfolder

    ```
    $ cd web3
    $ yarn
    ```