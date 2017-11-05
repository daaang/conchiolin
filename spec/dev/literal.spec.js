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

let literal;

describe("Literal()", () => {
  beforeEach(() => {
    literal = Literal();
  });

  it("has raw output of ''", () => {
    expect(literal.raw).to.equal("");
  });

  it("has toString output of two single quotes", () => {
    expect(literal.toString()).to.equal("''");
  });
});

describe("Literal('hi')", () => {
  beforeEach(() => {
    literal = Literal("hi");
  });

  it("has raw output of 'hi'", () => {
    expect(literal.raw).to.equal("hi");
  });
});
