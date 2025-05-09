#include "crow.h"
#include "randomQuote.h"   // declares: std::string getRandomQuote();
#include <fstream>
#include <sstream>
#include <string>
#include <exception>

using namespace std;

// C++17 helper to test file‐extension suffixes
static bool has_suffix(const string& s, const string& suffix) {
    return s.size() >= suffix.size()
        && s.compare(s.size() - suffix.size(), suffix.size(), suffix) == 0;
}

int main() {
    crow::SimpleApp app;

    //
    // 1) JSON API must be registered first
    //
    CROW_ROUTE(app, "/api/quote")
    ([]() {
        crow::json::wvalue out;
        try {
            out["quote"] = getRandomQuote();
        }
        catch (const exception& ex) {
            out["error"] = ex.what();
        }
        return out;
    });

    //
    // 2) Serve “/” as index.html
    //
    CROW_ROUTE(app, "/")
    ([] {
        crow::response res;
        ifstream in("index.html");
        if (!in) {
            res.code = 404;
            res.body = "index.html not found";
            return res;
        }
        ostringstream ss;
        ss << in.rdbuf();
        res.set_header("Content-Type", "text/html");
        res.body = ss.str();
        return res;
    });

    //
    // 3) Catch-all for any other single-segment path (JS/CSS/other HTML)
    //
    CROW_ROUTE(app, "/<path>")
    ([](const string& path){
        crow::response res;
        ifstream in(path);
        if (!in) {
            res.code = 404;
            res.body = "Not found: " + path;
            return res;
        }
        ostringstream ss;
        ss << in.rdbuf();
        res.body = ss.str();

        if      (has_suffix(path, ".js"))  res.set_header("Content-Type", "application/javascript");
        else if (has_suffix(path, ".css")) res.set_header("Content-Type", "text/css");
        else                                res.set_header("Content-Type", "text/html");

        return res;
    });

    //
    // 4) Launch
    //
    app.port(8080)
       .multithreaded()
       .run();

    return 0;
}
