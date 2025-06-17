# VOICEVOXのキャラクターが何か喋るのアプリ

## 動作環境
* Appleシリコン搭載のMac
  * IntelのMacやWindowsはDocker起動時に失敗するかもしれない(未検証)
* Dockerをインストールしていること

## 環境構築手順
1. `git clone https://github.com/itanimura-wwwave/Nuxt-Training.git`
1. `cd Nuxt-Training`
1. `docker compose build && docker compose up`
1. ブラウザ上で http://localhost:3000 にアクセス
