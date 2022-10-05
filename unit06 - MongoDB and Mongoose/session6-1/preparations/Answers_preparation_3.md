# Answers Preparation 3

## B1

Cursor

## B2

That it is not directly executed, but only executed when the data is needed.

So, performance wise it's generally better to use few large queries than many small ones. That means no looping unless strictly necessary (teachers don't like that :))

**Note:** This is also relevant when interfacing to a relational database with application code. Many libraries for building SQL-queries (those are called ORM's, but don't worry about the name) also support some sort of lazy-execution mechanism.

## B3

Projection
