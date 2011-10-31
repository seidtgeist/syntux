# syntux

Code with style!

syntux automatically beautifies your entire JS code based on a configuration
file in the project root.

## Install

You probably want to install syntux as a globally available npm package:

    sudo npm install -g syntux

## syntax.json

TBD
 
## Usage

TBD

## DONE

- Quotes
- Trim whitespace
- Insert semicolons

## TODO

Coding style elements which should be configurable & supported at some point:

- Indentation
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
