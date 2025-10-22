# String Analyzer API

A RESTful API built with Express.js and MongoDB Atlas that analyzes strings and stores computed properties.

## Features
- Computes length, word count, unique characters, and SHA256 hash
- Detects palindromes
- Returns character frequency map
- Supports advanced filtering and natural language queries

## Setup Instructions
1. Clone this repository
2. Run:
```bash
npm install
```
3. Create a `.env` file using `.env.example` as a guide
4. Start the server:
```bash
node index.js
```
5. The API runs at `http://localhost:4000`

## Endpoints
- `POST /strings` — Analyze and store string
- `GET /strings` — Get all strings (with filters)
- `GET /strings/:value` — Get a specific string
- `DELETE /strings/:value` — Delete a string
- `GET /strings/filter-by-natural-language?query=` — Natural language filtering

Example query: `all single word palindromic strings`
