#!/bin/sh
if [ -e .welcome-message-shown ]; then exit 0; fi
date > .welcome-message-shown
npm run kubo
