# Use Alpine as the base image
FROM alpine:3.20

RUN apk update && \
    apk add --no-cache \
    postgresql \
    postgresql-contrib \
    su-exec \
    tzdata && \
    mkdir -p /var/lib/pgsql/16/data /run/postgresql && \
    chown -R postgres:postgres /var/lib/pgsql /run/postgresql

# Set the data directory environment variable
ENV PGDATA /var/lib/pgsql/16/data

# Expose PostgreSQL port
EXPOSE 5432

# Copy the entrypoint script
COPY scripts/docker-entrypoint.sh /usr/local/bin/

# Set the entrypoint script to be executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Run the entrypoint script by default
ENTRYPOINT ["docker-entrypoint.sh"]

# Start PostgreSQL server
CMD ["postgres"]
