# Schema Information

## defins
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
word        | string    | not null
definition  | text      | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_name       | string    | not null
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## votes
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
upvote          | boolean   | not null
user_id         | integer   | not null, foreign key (references users)
defin_id        | integer   | not null, foreign key (references definitions)
