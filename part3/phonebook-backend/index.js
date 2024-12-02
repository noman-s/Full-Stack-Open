const express = require("express");
const morgan = require("morgan");

morgan.token("body", (request, response) => {
  return JSON.stringify(request.body);
});

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan((tokens, request, response) => {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      tokens.body(request, response),
    ].join(" ");
  }),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const info = `<p>persons has info for ${persons.length} people</p>
    <p>${new Date()}</p>`;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const phoneNumber = persons.find((number) => number.id === id);
  if (phoneNumber) {
    response.json(phoneNumber);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((number) => number.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  }

  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random() * 1000000)),
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`App listening on port ${PORT}`);
