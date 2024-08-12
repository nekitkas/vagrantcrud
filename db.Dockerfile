# Use Alpine as the base image
FROM alpine:3.20

RUN apk update && \
    apk add --no-cache \
    postgresql14 \
    postgresql14-contrib \
    su-exec \
    tzdata && \
    mkdir -p /var/lib/postgresql/data /run/postgresql && \
    chown -R postgres:postgres /var/lib/postgresql /run/postgresql

# Set the data directory environment variable
ENV PGDATA /var/lib/postgresql/data

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
