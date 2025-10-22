function nlParser(query) {
  const q = query.toLowerCase();
  const filters = {};

  if (q.includes("palindromic")) filters["properties.is_palindrome"] = true;
  if (q.includes("single word")) filters["properties.word_count"] = 1;
  if (q.includes("longer than")) {
    const match = q.match(/longer than (\d+)/);
    if (match) filters["properties.length"] = { $gte: parseInt(match[1]) + 1 };
  }
  if (q.includes("containing the letter")) {
    const match = q.match(/containing the letter (\w)/);
    if (match) filters["value"] = { $regex: match[1] };
  }

  return Object.keys(filters).length ? filters : null;
}

module.exports = nlParser;
