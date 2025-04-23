// motivational-quotes.cpp
//
// Build:
//   g++ -std=c++17 motivational_quotes.cpp -o quotes
//
// Run:
//   ./quotes
//
// CSV must be in the same directory and look like:
// "Author","Quote"

#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <random>
#include <ctime>

using namespace std;

// Trim the outermost double-quotes in a CSV field
string strip_quotes(const string& s)
{
    if (s.size() >= 2 && s.front() == '"' && s.back() == '"')
        return s.substr(1, s.size() - 2);
    return s;
}

int main()
{
    const string filename = "quotes.csv";   // adjust path/name if needed
    ifstream file(filename);
    if (!file)
    {
        cerr << "🛑  Couldn’t open \"" << filename << "\"\n";
        return 1;
    }

    string line;
    getline(file, line);          // skip header row

    struct Quote { string author, text; };
    vector<Quote> quotes;

    while (getline(file, line))
    {
        // Parse rows of the form: "Author","Quote"
        size_t split = line.find("\",\"");
        if (split == string::npos) continue;   // malformed row

        string author = strip_quotes(line.substr(0, split + 1));
        string text   = strip_quotes(line.substr(split + 2));

        quotes.push_back({author, text});
    }

    if (quotes.empty())
    {
        cerr << "No quotes parsed—check the file format.\n";
        return 1;
    }

    // Pick a random quote
    mt19937 rng(static_cast<unsigned>(time(nullptr)));
    uniform_int_distribution<size_t> dist(0, quotes.size() - 1);
    const Quote& q = quotes[dist(rng)];

    cout << '\n' << '"' << q.text << "\"\n  -- " << q.author << '\n';

    return 0;
}
