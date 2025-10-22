const StringModel = require("../models/StringModel");
const analyzeString = require("../utils/stringAnalyzer");
const nlParser = require("../utils/nlParser");

exports.createString = async (req, res, next) => {
  try {
    const { value } = req.body;
    if (!value) return res.status(400).json({ error: "Missing 'value' field" });
    if (typeof value !== "string") return res.status(422).json({ error: "'value' must be a string" });

    const properties = analyzeString(value);
    const existing = await StringModel.findOne({ id: properties.sha256_hash });
    if (existing) return res.status(409).json({ error: "String already exists" });

    const newString = await StringModel.create({
      id: properties.sha256_hash,
      value,
      properties,
    });

    res.status(201).json(newString);
  } catch (err) {
    next(err);
  }
};

exports.getString = async (req, res, next) => {
  try {
    const record = await StringModel.findOne({ value: req.params.value });
    if (!record) return res.status(404).json({ error: "String not found" });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.getAllStrings = async (req, res, next) => {
  try {
    const filters = {};
    const { is_palindrome, min_length, max_length, word_count, contains_character } = req.query;

    if (is_palindrome) filters["properties.is_palindrome"] = is_palindrome === "true";
    if (min_length) filters["properties.length"] = { $gte: parseInt(min_length) };
    if (max_length) filters["properties.length"] = { ...filters["properties.length"], $lte: parseInt(max_length) };
    if (word_count) filters["properties.word_count"] = parseInt(word_count);
    if (contains_character) filters["value"] = { $regex: contains_character };

    const data = await StringModel.find(filters);
    res.json({ data, count: data.length, filters_applied: req.query });
  } catch (err) {
    next(err);
  }
};

exports.filterByNaturalLanguage = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Missing query parameter" });

    const parsedFilters = nlParser(query);
    if (!parsedFilters) return res.status(400).json({ error: "Unable to parse natural language query" });

    const data = await StringModel.find(parsedFilters);
    res.json({
      data,
      count: data.length,
      interpreted_query: {
        original: query,
        parsed_filters: parsedFilters,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteString = async (req, res, next) => {
  try {
    const deleted = await StringModel.findOneAndDelete({ value: req.params.value });
    if (!deleted) return res.status(404).json({ error: "String not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
