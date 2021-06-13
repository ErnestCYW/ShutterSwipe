CREATE DATABASE shutterswipe;

--BASED OF DATABASE SCHEMA

--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--User Table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL
)

--Picture table
CREATE TABLE pics (
  pic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL
)

CREATE TABLE traits (
  trait_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL,
  trait_name VARCHAR(100) NOT NULL
)

--TESTING

--Check proper relation
--SELECT * FROM users LEFT JOIN pics ON users.user_id = pics.user_id; --use left join since all pics must belong to a user
--SELECT * FROM pics LEFT JOIN users ON pics.user_id = users.user_id;
--SELECT * FROM users JOIN traits ON users.user_id = traits.user_id;