# Answers Preparation 4

## B1

No, although fields can refer to other fields in other documents (like a foreign key in relational databases).
However, joining on this reference must be done by you in application code.

## B2

Yes. Starting in version 3.6, MongoDB supports JSON Schema validation.
See: <https://www.mongodb.com/docs/manual/core/schema-validation/>

~~No. Sometimes you read about flexible schema or implicit schema. However you want to call it, MongoDB itself doesn't know anything about schema's.
Having a explicit schema can be nice and it is possible to enforce a fixed schema, but this must me done in application code.
Next week we will use the Mongoose library to enforce schema's.~~

## B3

Embed a document or refer to it.

What to choose? Match the data access patterns (from the MongoDB university).

The big advantage of embedding is you can keep your operations (read/write) atomic.
Also querying in subdocuments is supported very well, as we will see in this session.
