FROM ubuntu:16.04

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq

ADD package.json package-lock.json /app/
WORKDIR /app
RUN npm install

ADD . /app

RUN useradd nightwatch

USER nightwatch

CMD ["/app/bin/run_tests.sh"]
