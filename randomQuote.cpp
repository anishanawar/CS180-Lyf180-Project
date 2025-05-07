#include "RandomQuote.h"

#include <fstream>
#include <vector>
#include <random>
#include <ctime>
#include <stdexcept>

using namespace std;

static string strip_quotes(const string& s)
{
    if (s.size() >= 2 && s.front() == '"' && s.back() == '"')
        return s.substr(1, s.size() - 2);
    return s;
}

string getRandomQuote(const string& csvPath)
{
    ifstream file(csvPath);
    if (!file)
        throw runtime_error("Cannot open \"" + csvPath + '"');

    string line;
    getline(file, line); // skip header row

    struct Quote { string author, text; };
    vector<Quote> quotes;

    while (getline(file, line))
    {
        size_t split = line.find("\",\"");
        if (split == string::npos) continue;

        string author = strip_quotes(line.substr(0, split + 1));
        string text   = strip_quotes(line.substr(split + 2));

        quotes.push_back({author, text});
    }

    if (quotes.empty())
        throw runtime_error("No quotes parsed from \"" + csvPath + '"');

    mt19937 rng(static_cast<unsigned>(time(nullptr)));
    uniform_int_distribution<size_t> dist(0, quotes.size() - 1);
    const Quote& q = quotes[dist(rng)];

    return '"' + q.text + "\"\n  -- " + q.author;
}

/*
example usage:

    try {
        std::cout << '\n' << getRandomQuote() << '\n';
    }
    catch (const std::exception& ex) {
        std::cerr << "Error: " << ex.what() << '\n';
        return 1;
    }
*/