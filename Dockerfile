FROM node:16.13.2

ENV DEBIAN_FRONTEND=noninteractive

COPY . /work
WORKDIR /work

RUN apt-get update -y && \
    yarn install && \
    cd resources && mkdir bin && cd bin && \
    curl -OL https://github.com/My-MC/FFu-core/releases/download/v0.1.7/FFu-core-v0.1.7-linux.zip && \
    unzip FFu-core-v0.1.7-linux.zip && mv ./FFu-core-v0.1.7-linux/** ./ && \
    rm -rf FFu-core-v0.1.7-linux.zip FFu-core-v0.1.7-linux