 #!/bin/sh
 cd demos
 workshop=$(node ../packages/learn.kubo $1)
 npm run kubo demos/${workshop}