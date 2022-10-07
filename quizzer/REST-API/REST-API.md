# REST API • Documentatie

> Note: this is just an example of how to _describe_ your REST API documentation. Don't assume the API is suitable for your implementation.

- [Questions](#questions)
- [Teams](#teams)

## Questions

---

> **`GET`** `/api/v1/question`

Get a list of all questions.

_parameters_

none

_returns_

```json
{
  "questions": [
    {
      "id": Number,
      "question": String,
      "answer": String,
      "category": String
    }
  ]
}
```

---

> **`GET`** `/api/v1/question/:questionId`

Get detailed information about a question.

_parameters_

`questionId` - the id of the questions to get information about

_returns_

```json
{
  "id": Number,
  "question": String,
  "answer": String,
  "category": String
}
```

---

> **`POST`** `/api/v1/question`

Insert a new question.

_parameters_

none

_body_

```json
{
  "question": String,
  "answer": String,
  "category": String
}
```

_returns_

```json
{
  "id": Number
}
```

## Teams

---

> **`GET`** `/api/v1/team`

Get a list of all teams.

_parameters_

none

_returns_

```json
{
  "teams": [
    {
      "id": Number,
      "name": String
    }
  ]
}
```
