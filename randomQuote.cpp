#include "randomQuote.h"
#include <fstream>
#include <sstream>
#include <vector>
#include <random>
#include <stdexcept>

struct Quote {
    std::string author;
    std::string text;
};

// Load all quotes once
static std::vector<Quote> loadQuotes(const std::string& csvPath) {
    std::ifstream file(csvPath);
    if (!file) {
        throw std::runtime_error("Couldn’t open " + csvPath);
    }

    std::vector<Quote> quotes;
    std::string line;

    // Skip header row
    if (!std::getline(file, line)) {
        throw std::runtime_error("CSV is empty");
    }

    // Parse lines of the form: "Author","Quote text"
    while (std::getline(file, line)) {
        // find the quote separator
        auto sep = line.find("\",\"");
        if (sep == std::string::npos || line.size() < sep + 4) continue;
        // author: between first " and sep
        std::string author = line.substr(1, sep - 1);
        // text: between sep+3 and last "
        std::string text = line.substr(sep + 3, line.size() - (sep + 4));
        quotes.push_back({author, text});
    }

    if (quotes.empty()) {
        throw std::runtime_error("No quotes found in " + csvPath);
    }
    return quotes;
}

std::string getRandomQuote(const std::string& csvPath) {
    // Static so we only load once
    static const auto quotes = loadQuotes(csvPath);
    static std::mt19937_64 rng{std::random_device{}()};
    std::uniform_int_distribution<size_t> dist(0, quotes.size() - 1);

    const auto& q = quotes[dist(rng)];
    // Format with quotes + author
    return "\"" + q.text + "\" -- " + q.author;
}
