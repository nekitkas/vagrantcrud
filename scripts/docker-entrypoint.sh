#!/bin/sh
set -e

# If PGDATA directory is empty, initialize the database
if [ -z "$(ls -A "$PGDATA")" ]; then
    su-exec postgres initdb

    # Set the password for the default user
    su-exec postgres pg_ctl -D "$PGDATA" start

    # Create user and database
    su-exec postgres psql --command "CREATE USER $POSTGRES_USER WITH SUPERUSER PASSWORD '$POSTGRES_PASSWORD';"
    su-exec postgres createdb -O "$POSTGRES_USER" "$POSTGRES_DB"

    # Stop the PostgreSQL server
    su-exec postgres pg_ctl -D "$PGDATA" stop
fi

# Start PostgreSQL server
exec su-exec postgres "$@"
