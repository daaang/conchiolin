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

/* eslint-env mocha */
const expect = require("chai").expect;
const Literal = require("../../lib/literal");

const describeLiteral = function(raw,
                                 noQuotes,
                                 singleQuotes,
                                 doubleQuotes) {
  describe("Literal(" + JSON.stringify(raw) + ")", function() {
    beforeEach(function() {
      literal = Literal(raw);
    });

    it("=== Literal(" + JSON.stringify(raw) + ")", function() {
      expect(literal).to.equal(Literal(raw));
    });

    it("=== Literal(itself)", function() {
      expect(literal).to.equal(Literal(literal));
    });

    it("has a raw value of " + JSON.stringify(raw), function() {
      expect(literal.raw).to.equal(raw);
    });

    it("has a noQuotes value of "
       + JSON.stringify(noQuotes), function() {
      expect(literal.noQuotes).to.equal(noQuotes);
    });

    it("has a singleQuotes value of "
       + JSON.stringify(singleQuotes), function() {
      expect(literal.singleQuotes).to.equal(singleQuotes);
    });

    it("has a doubleQuotes value of "
       + JSON.stringify(doubleQuotes), function() {
      expect(literal.doubleQuotes).to.equal(doubleQuotes);
    });
  });
};

let literal;

describe("Literal()", () => {
  it("=== Literal('')", () => {
    expect(Literal()).to.equal(Literal(""));
  });
});

describeLiteral("", "''", "''", '""');
describeLiteral("hi", "hi", "'hi'", '"hi"');
describeLiteral("with spaces",
                "with\\ spaces",
                "'with spaces'",
                '"with spaces"');
describeLiteral(4, "4", "'4'", '"4"');
describeLiteral("\\", "\\\\", "'\\'", '"\\\\"');
describeLiteral("'", "\\'", "\\'", '"\'"');
describeLiteral("''", "\\'\\'", "\\'\\'", '"\'\'"');
describeLiteral("'hi", "\\'hi", "\\''hi'", '"\'hi"');
describeLiteral("'a''b", "\\'a\\'\\'b", "\\''a'\\'\\''b'", "\"'a''b\"");
describeLiteral("a''", "a\\'\\'", "'a'\\'\\'", '"a\'\'"');
describeLiteral('"', '\\"', "'\"'", '"\\""');
describeLiteral("$", "\\$", "'$'", '"\\$"');
describeLiteral(" !\"#$%&'()*+,-./"
                + "0123456789:;<=>?"
                + "@ABCDEFGHIJKLMNO"
                + "PQRSTUVWXYZ[\\]^_"
                + "`abcdefghijklmno"
                + "pqrstuvwxyz{|}~",
                "\\ \\!\\\"\\#\\$%\\&\\'\\(\\)\\*+\\,-./"
                + "0123456789\\:\\;\\<=\\>\\?"
                + "@ABCDEFGHIJKLMNO"
                + "PQRSTUVWXYZ\\[\\\\\\]\\^_"
                + "\\`abcdefghijklmno"
                + "pqrstuvwxyz\\{\\|\\}\\~",
                "' !\"#$%&'\\''()*+,-./"
                + "0123456789:;<=>?"
                + "@ABCDEFGHIJKLMNO"
                + "PQRSTUVWXYZ[\\]^_"
                + "`abcdefghijklmno"
                + "pqrstuvwxyz{|}~'",
                "\" !\\\"#\\$%&'()*+,-./"
                + "0123456789:;<=>?"
                + "@ABCDEFGHIJKLMNO"
                + "PQRSTUVWXYZ[\\\\]^_"
                + "`abcdefghijklmno"
                + "pqrstuvwxyz{|}~\"");

describe("Literal", function() {
  describe("#asValue", function() {
    [
      ["hello", "'hello'"],
      [1, "1"],
      [12345678, "12345678"]
    ].forEach(duple => {
      it("converts " + JSON.stringify(duple[0])
         + " into " + JSON.stringify(duple[1]), () => {
        expect(Literal(duple[0]).asValue()).to.equal(duple[1]);
      });
    });
  });
});
