CREATE DATABASE shutterswipe;

--Base off database schema. 
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), --create UUID OSSP if not installed
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL
)

--insert fake user
INSERT INTO users (user_name, user_email, user_password) VALUES
('henry', 'henry123@gmail.com', 'password1');