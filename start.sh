#!/bin/bash
docker run -it --rm -v ${PWD}:/app -w /app -p 9229:9229 -p 8080:8080 node /bin/bash
