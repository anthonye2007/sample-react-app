#!/usr/bin/env bash -e

case "$1" in
        build_image)
            docker build -t puppet .
            ;;
        container)
            docker run -t --name puppeteer-chrome -v $PWD:/home/puppetuser/ puppet node scripts/run_ci_docker.js
            ;;
        rm_container)
            docker rm $2 puppeteer-chrome
            ;;
        rm_image)
            docker rmi $2 puppet
            ;;
        *)
            echo $"Usage: $0 {build_image|container|rm_container|rm_image}"
            exit 1
esac