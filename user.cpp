#include <iostream>
using namespace std;

const string presetUsername = "LyfUser";
const string presetPassword = "pass123";

void loginUser() {
    string inputUsername, inputPassword;

    cout << " Enter your Lyf180 username: ";
    cin >> inputUsername;

    cout << " Enter your Lyf180 password: ";
    cin >> inputPassword;

    if (inputUsername == presetUsername && inputPassword == presetPassword) {
        cout << "Login successful. Welcome, " <<presetUsername << "! Let's turn your Lyf a 180° today.";
    } else {
        cout << "Invalid Lyf180 username or password." ;
    }
}

int main () {
    cout << " === Welcome to the Lyf180 Experience ===" ;
    loginUser();
    return 0;
}