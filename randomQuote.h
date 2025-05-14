#ifndef RANDOM_QUOTE_H
#define RANDOM_QUOTE_H

#include <string>

// Reads the CSV at csvPath (default "quotes.csv"),
// picks a random line, and returns it as:
//   "Quote text" -- Author
std::string getRandomQuote(const std::string& csvPath = "quotes.csv");

#endif // RANDOM_QUOTE_H
