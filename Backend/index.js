const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
// const morganLog = morgan('tiny');

const morganLog = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
});

app.use(express.json());
app.use(morganLog);
app.use(cors());
app.use(express.static("dist"));

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const max = 5000;
  return (Math.random() * max) | 0;
};

app.get("/", (request, response) => {
  const count = phoneBook.length;
  const now = Date(new Date().toUTCString());

  response.send(`<div>Phonebook has info for ${count} people</div>
  ${now}`);
});

app.get("/api/persons/", (request, response) => {
  response.json(phoneBook);
});

app.get("/api/persons/:id/", (request, response) => {
  const id = Number(request.params.id);
  const person = phoneBook.find((p) => p.id === id);
  if (!person) {
    response.status(404).end();
  } else {
    response.json(person);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phoneBook = phoneBook.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }
  if (phoneBook.find((p) => p.name === body.name)) {
    return response.status(400).json({ error: "name already exists" });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  phoneBook = phoneBook.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
