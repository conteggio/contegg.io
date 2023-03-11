#!/bin/bash

set -e
PUID=${PUID=0}
PGID=${PGID=0}

set_ownership () {
    chown -hRc "$PUID":"$PGID" /app/data
}

echo "==> Performing startup jobs and maintenance tasks"
set_ownership

echo "==> Starting application with user $PUID group $PGID"

exec setpriv --reuid "$PUID" --regid "$PGID" --clear-groups "$@"