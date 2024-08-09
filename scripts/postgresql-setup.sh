#!/bin/bash

echo "Updating package list and installing PostgreSQL..."
sudo apt-get update -y
sudo apt-get install -y postgresql postgresql-contrib

# Path to the pg_hba.conf file
PG_HBA_CONF="/etc/postgresql/14/main/pg_hba.conf"

# Temporarily set 'trust' authentication method for postgres user
echo "Temporarily setting pg_hba.conf to trust for postgres user..."
sudo sed -i "s/^local\s*all\s*postgres\s*md5/local all postgres trust/" $PG_HBA_CONF

echo "Restarting PostgreSQL service to apply changes..."
sudo systemctl restart postgresql

echo "Setting password for the postgres user..."
sudo -u postgres bash -c "cd ~postgres && psql -c \"ALTER USER postgres WITH PASSWORD '$DB_PASSWORD';\""

# Create the inventory database and user
echo "Creating PostgreSQL user and database..."
sudo -u postgres bash -c "cd ~postgres && psql <<EOF
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE $DB_NAME;
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
ALTER USER $DB_USER WITH SUPERUSER;
EOF"

# Backup the original pg_hba.conf file
echo "Backing up the original pg_hba.conf file..."
sudo cp $PG_HBA_CONF ${PG_HBA_CONF}.bak

# Add configuration for the user in pg_hba.conf
echo "Adding configuration for $DB_USER in pg_hba.conf..."
sudo bash -c "echo 'local   all             $DB_USER                                   md5' >> $PG_HBA_CONF"
sudo bash -c "echo 'host    all             $DB_USER            127.0.0.1/32           md5' >> $PG_HBA_CONF"
sudo bash -c "echo 'host    all             $DB_USER            ::1/128                md5' >> $PG_HBA_CONF"

# Restart PostgreSQL service to apply changes
echo "Restarting PostgreSQL service..."
sudo systemctl restart postgresql


# Update pg_hba.conf to change "peer" to "md5" for the postgres user
echo "Updating pg_hba.conf to change 'peer' to 'md5' for the postgres user..."
sudo sed -i "s/^local\s*all\s*postgres\s*peer/local all postgres md5/" $PG_HBA_CONF

echo "Restarting PostgreSQL service..."
sudo systemctl restart postgresql
