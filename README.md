# syntux

Code with style!

syntux automatically beautifies your entire JS code based on a configuration
file in the project root. Here's a description of what it does:

1. Find all files ending with .js
2. For each file: read, beautify, write
3. Done!

## Install

You probably want to install syntux as a globally available npm package:

    sudo npm install -g syntux

## syntax.json

Currently the following options are configurable:

~~~ json
{
  "automaticallyTranslateIntoJapaneseAndBack": "@jedschmidt"
}
~~~

## Usage

    syntux <path>

Beautify the entire code base

    syntux .

Beautify a specific directory or file

    syntux test/

## DONE

- Quotes
- Trailing whitespace

## TODO

Coding style elements which should be configurable & supported at some point:

- Indentation
- Semicolons
- Braces
- Newline at EOF
- Var statements
- Line length
- Object & array literals

Not sure what to do about these:

- Comments
- Class & Function naming (warn?)
- Constant naming (warn?)
- File naming (warn?)

Features:

- Convenient git integration via `syntux --install-git-hook`
- Intead of recursively looking for all .js files, check `git status` output
