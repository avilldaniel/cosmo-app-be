CREATE DATABASE cosmo;

CREATE TABLE todos (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  todo VARCHAR(50) NOT NULL,
  created_on TIMESTAMPTZ NOT NULL,
  complete boolean NOT NULL,
);

SET timezone = 'America/Los_Angeles';