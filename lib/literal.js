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

  literal.raw = raw;

  if (raw.length === 0)
    literal.noQuotes = "''";

  else
    literal.noQuotes = escapeForNoQuotes(raw.toString());

  literal.singleQuotes = "'" + raw + "'";

  literal.doubleQuotes
    = '"' + escapeForDoubleQuotes(raw.toString()) + '"';

  return literal;
};

const escapeForNoQuotes = function(s) {
  return s.replace(/[ \\]/, "\\$&");
};

const escapeForDoubleQuotes = function(s) {
  return s.replace(/\\/, "\\$&");
};
