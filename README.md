# Lisp Run Button Extension

This extension adds a "Run" button (play icon) to the editor title bar for Lisp files (`.lisp`, `.cl`). Clicking the button will execute the current Lisp file using `sbcl --script <filepath>` in a new VS Code terminal.

## Features

*   Adds a run button to the editor title bar for Lisp files.
*   Saves the file before running.
*   Opens a new terminal for each run.

## Requirements

*   [SBCL (Steel Bank Common Lisp)](http://www.sbcl.org/) must be installed and in your system's PATH.

## Development

1.  Clone this repository (or open the folder if created by an assistant).
2.  Open the folder in VS Code.
3.  Run `npm install` in the terminal to install dependencies.
4.  Run `npm run compile` to compile the TypeScript to JavaScript (or `npm run watch` for automatic compilation on changes).
5.  Press `F5` to open a new Extension Development Host window.
6.  Open a Lisp file (e.g., `test.lisp`) in the Extension Development Host window.
7.  You should see a play icon in the editor's title bar. Click it to run the script.

## Known Issues

*   Currently hardcoded to use `sbcl`.

## Release Notes

### 0.0.1

Initial release.
