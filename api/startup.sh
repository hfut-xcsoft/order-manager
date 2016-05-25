#!/bin/bash

DOCKER_NETWORK="order-network"
EXPRESS_NAME="order-express"
MONGODB_NAME="order-mongodb"

docker -v > /dev/null
if [ $? -ne 0 ]; then
    echo "Docker is not install"
    exit 1
fi

docker info > /dev/null
if [ $? -ne 0 ]; then 
    echo "Docker mechine not startup"
    exit 1
fi

docker network inspect ${DOCKER_NETWORK} > /dev/null 2>&1
if [ "$?" -ne "0" ]; then
    docker network create ${DOCKER_NETWORK}
fi

for APP in $MONGODB_NAME $EXPRESS_NAME
do
    CONTAINER_ID=`docker ps -a | grep "\b${APP}\b" | awk '{print $1}'`
    if [ "$CONTAINER_ID" != "" ]; then
        echo "A ${APP} container existed, id: ${CONTAINER_ID}"
        exit 1
    fi
done

docker run -d -p 27017:27017 \
    --net=${DOCKER_NETWORK} \
    --name ${MONGODB_NAME} \
    -h ${MONGODB_NAME} \
    -v /data/db:/data/db \
    mongo:3.2

if [ "$?" -ne 0 ]; then
    echo "ERROR: ${MONGODB_NAME} can't start"
    exit;
fi
echo "${MONGODB_NAME} startup"

docker run --rm -it -p 5000:5000 \
    --net=${DOCKER_NETWORK} \
    --name ${EXPRESS_NAME} \
    -h ${EXPRESS_NAME} \
    -e MONGODB="mongodb://${MONGODB_NAME}/queuing" \
    -v "$PWD":/usr/src/app \
    -w /usr/src/app \
    node:6 \
    node app.js
