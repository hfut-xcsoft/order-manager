#!/bin/bash

MONGODB_NAME="order-mongodb"
EXPRESS_NAME="order-express"

for container in $MONGODB_NAME $EXPRESS_NAME
do
    docker rm -f ${container} > /dev/null
    echo "Stoped and removed ${container}"
done
