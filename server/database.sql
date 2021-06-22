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

--User Traits table
CREATE TABLE traits (
  trait_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL,
  trait_name VARCHAR(100) NOT NULL
)

CREATE TABLE labels (
  label_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pic_id UUID REFERENCES pics(pic_id) NOT NULL,
  label_name VARCHAR(100) NOT NULL
)
-- NEW -- 

CREATE TABLE likes (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  pic_id UUID REFERENCES pics(pic_id) NOT NULL
)

CREATE TABLE dislikes (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  pic_id UUID REFERENCES pics(pic_id) NOT NULL
)

CREATE TABLE pic_score (
  
)

--TESTING

--Check proper relation
--SELECT * FROM users LEFT JOIN pics ON users.user_id = pics.user_id; --use left join since all pics must belong to a user
--SELECT * FROM pics LEFT JOIN users ON pics.user_id = users.user_id;
--SELECT * FROM users JOIN traits ON users.user_id = traits.user_id;

-- TEST LIKES 
--curr user = e8b98a3c-b30f-4ef5-b98d-5ec621f0dda5 (tim)
--query pics table for pics that are not mine, and pics I have not liked. 

-- LEFT OUTER JOIN 
-- SELECT DISTINCT * FROM pics LEFT JOIN likes ON pics.pic_id = likes.pic_id LEFT JOIN dislikes ON pics.pic_id = dislikes.pic_id WHERE likes.user_id IS NULL AND dislikes.user_id IS NULL and pics.user_id != 'e8b98a3c-b30f-4ef5-b98d-5ec621f0dda5' LIMIT 1;

-- INSERT INTO likes (user_id, pic_id) VALUES ('e8b98a3c-b30f-4ef5-b98d-5ec621f0dda5', 'ff7cc3b5-20dd-4e2e-99b2-2390e2efad94');
