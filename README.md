# FFu

![Logo](imgs/logo.png)

[日本語 README](./README.md) • [English README](docs/README.en.md)

FFu は[FFmpeg](http://ffmpeg.org)を GUI 上でコンソール操作ができない方でも使えるようにするということをコンセプトに開発をしているユーティリティソフトウェアです。

## 問題や提案

GitHub の issues や discussions、PullRequest にログを添えて送ってください

## Project setup

```bash
yarn install
```

### Electron 向けの開発用コンパイルとホットリロード

```bash
yarn electron:serve
```

### Electron 向けの製品用コンパイルとミニライズ

```bash
yarn electron:build
```

### ユニットテストの実行

```bash
yarn test:unit
```

### リントとフィックスファイル

```bash
yarn lint
```

### 設定のカスタマイズ

[コンフィギュレーションリファレンス](https://cli.vuejs.org/config/)を見てください。

## 参考文献

Node.js で正しく子プロセスを殺す
<https://zenn.dev/erukiti/articles/nodejs-kill-childprocess>

## Docker

> **_WARN:_** クロスプラットフォームでの実行は現段階ではできません。今後対応する予定です。

```bash
docker build --progress=plain -t ffu .
docker create --name ffu -it ffu
docker start ffu
docker exec -it ffu bash
```
