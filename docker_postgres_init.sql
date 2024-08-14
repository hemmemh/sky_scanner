CREATE USER sky_scanner WITH PASSWORD 'sky_scanner' CREATEDB;
CREATE DATABASE sky_scanner
    WITH
    OWNER = sky_scanner
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;