CREATE DATABASE shutterswipe;

--BASED OF DATABASE SCHEMA

--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--User Table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), --create UUID OSSP if not installed
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL
)

--Picture table
CREATE TABLE pics (
  pic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL
)

--TESTING

--Insert Fake User & Pics For Debugging Purposes
INSERT INTO users (user_id, user_name, user_email, user_password) VALUES
(DEFAULT, 'test_name', 'test@gmail.com', 'test_password');

--Create 2 New Pictures
INSERT INTO pics (pic_id,user_id) VALUES
(DEFAULT, 'dcf7cee5-2f02-4cec-9090-618309c3714a' ); --your uuid (user_id) will be different
INSERT INTO pics (pic_id,user_id) VALUES
(DEFAULT, 'dcf7cee5-2f02-4cec-9090-618309c3714a' ); --SELECT user_id FROM users WHERE user_email = 'test@gmail.com' to see value

--Check proper relation
SELECT * FROM users LEFT JOIN pics ON users.user_id = pics.user_id; --use left join since all pics must belong to a user