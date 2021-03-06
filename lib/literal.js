// conchiolin: Dynamically create static /bin/sh scripts
// Copyright 2017 Matthew Alexander LaChance
//
// This file is part of conchiolin.
//
// conchiolin is free software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at
// your option) any later version.
//
// conchiolin is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with conchiolin. If not, see <http://www.gnu.org/licenses/>.

module.exports = function(raw = "") {
  if (memoization.has(raw.raw))
    return memoization.get(raw.raw);

  if (!memoization.has(raw))
    memoization.set(raw, Literal(raw));

  return memoization.get(raw);
};

const memoization = new Map();

const Literal = function(raw) {
  const literal = {};
  const rawString = raw.toString();

  literal.raw = raw;
  literal.noQuotes = convertToNoQuotes(rawString);
  literal.singleQuotes = convertToSingleQuotes(rawString);

  literal.doubleQuotes
    = '"' + escapeForDoubleQuotes(rawString) + '"';

  literal.asCommand = function() {
    if (!literal.noQuotes.includes("\\"))
      return literal.noQuotes;

    else if (!rawString.includes("'"))
      return literal.singleQuotes;

    else
      return literal.doubleQuotes;
  };

  literal.asValue = function() {
    if (literal.noQuotes.match(/^[0-9]+$/))
      return literal.noQuotes;

    else if (literal.noQuotes.match(/'/))
      return literal.doubleQuotes;

    else
      return literal.singleQuotes;
  };

  literal.format = function() {
    return literal.doubleQuotes.replace(/%%/g, "%");
  };

  return literal;
};

const convertToNoQuotes = function(s) {
  if (s.length === 0)
    return "''";

  else
    return escapeForNoQuotes(s);
};

const escapeForNoQuotes = function(s) {
  return s
    .replace(/[^-+%./=@_0-9A-Za-z\n]/g, "\\$&")
    .replace(/\n+/g, "'$&'");
};

const convertToSingleQuotes = function(s) {
  const head = s.match(/^'*/)[0];
  const rest = "'" + s.slice(head.length).replace(/'/g, "'\\''") + "'";

  return (escapeForNoQuotes(head) + rest).replace(/\\'''/g, "\\'");
};

const escapeForDoubleQuotes = function(s) {
  return s.replace(/["$\\]/g, "\\$&");
};
