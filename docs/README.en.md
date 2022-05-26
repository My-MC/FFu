# FFu

![Logo](../imgs/logo.png)

[日本語 README](../README.md) • [English README](./README.en.md)

FFu is a utility software developed with the concept of making [FFmpeg](http://ffmpeg.org) usable even by those who cannot operate the console on the GUI.

## Problems and suggestions

Please send them to GitHub issues, discussions, and PullRequests with logs!

## Project setup

``` bash
yarn install
```

### Development compile and hot reload for Electron

``` bash
yarn electron:serve
```

### Compile and minilize for Electron for your products

``` bash
yarn electron:build
```

### Running Unit Tests

``` bash
yarn test:unit
```

### Lint and fix files

``` bash
yarn lint
```

### Customize Settings

See [Configuration Reference](https://cli.vuejs.org/config/).

## References

Node.jsで正しく子プロセスを殺す
<https://zenn.dev/erukiti/articles/nodejs-kill-childprocess>

## Docker

> **_WARN:_**  Cross-platform execution is not possible at this stage. It will be supported in the future.

``` bash
docker build --progress=plain -t ffu .
docker create --name ffu -it ffu
docker start ffu
docker exec -it ffu bash
```
