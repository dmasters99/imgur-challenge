#! /bin/bash

echo Waiting for drivers to start

sleep 10s

npm test -- --env $TEST_ENV