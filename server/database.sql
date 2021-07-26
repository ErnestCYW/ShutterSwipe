CREATE DATABASE shutterswipe;

--BASED OF DATABASE SCHEMA

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--User table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL
);

--User username table
CREATE TABLE user_username ( 
  username VARCHAR(100) PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL
);

--User Description table
CREATE TABLE user_description (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  user_description TEXT
);

--Profile picture table
CREATE TABLE profile_pics (
  pic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL
);

--Picture table
CREATE TABLE pics (
  pic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL,
  pic_score INT DEFAULT 0,
  created_date TIMESTAMP NOT NULL
);


--User Traits table
CREATE TABLE traits (
  trait_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(user_id) NOT NULL,
  trait_name VARCHAR(100) NOT NULL
);

--Picture labels table
CREATE TABLE labels (
  label_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pic_id UUID REFERENCES pics(pic_id) NOT NULL,
  label_name VARCHAR(100) NOT NULL
);
-- NEW -- 

CREATE TABLE likes (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  pic_id UUID REFERENCES pics(pic_id) NOT NULL
);

CREATE TABLE dislikes (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  pic_id UUID REFERENCES pics(pic_id) NOT NULL
);

-- Written in this way so that groups can have the same group name identified by UUID--

CREATE TABLE groups (
  group_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_name VARCHAR(100) NOT NULL
);

CREATE TABLE group_relations (
  group_id UUID REFERENCES groups(group_id) NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL
);

CREATE TABLE group_traits (
  group_id UUID REFERENCES groups(group_id) NOT NULL,
  trait_name VARCHAR(100) NOT NULL
);

CREATE TABLE group_chat_history (
  group_id UUID REFERENCES groups(group_id) NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  message_contents TEXT NOT NULL,
  date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


