require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});

const requestLogger = function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens.body(req, res),
  ].join(" ");
};

app.use(morgan(requestLogger));

//Routes

app.get("/api/people", (req, res) => {
  Person.find({}).then((returnedPeople) => res.json(returnedPeople));
});

app.get("/api/people/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((returnedPerson) => {
      if (returnedPerson) res.json(returnedPerson);
      else res.status(404).end();
    })
    .catch((error) => next(error));
});

app.put("/api/people/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((personToUpdate) => {
      if (personToUpdate) {
        personToUpdate.id = req.params.id;
        personToUpdate.number = req.body.number;

        personToUpdate
          .save()
          .then((updatedPerson) => {
            return res.json(updatedPerson);
          })
          .catch((error) => next(error));
      } else
        res
          .status(404)
          .send({ error: "person already deleted/ does not exist" });
    })
    .catch((error) => next(error));
});

app.delete("/api/people/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/people", (req, res, next) => {
  const body = req.body;

  let newPerson = new Person({
    ...body,
  });
  newPerson
    .save()
    .then((returnedPerson) => res.send(returnedPerson))
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  console.log(req);
  Person.find({}).then((returnedPeople) =>
    res.send(`<p>Phonebook has info for ${returnedPeople.length} people</p>
    ${new Date()}`)
  );
});

// Footer

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
