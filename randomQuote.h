#ifndef RANDOM_QUOTE_H
#define RANDOM_QUOTE_H

#include <string>

/*
 * Reads the CSV at csvPath (default "quotes.csv"),
 * selects a random entry, and returns it in printable form:
 */
std::string getRandomQuote(const std::string& csvPath = "quotes.csv");

#endif