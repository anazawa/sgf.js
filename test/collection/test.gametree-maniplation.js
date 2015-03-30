var test = require("tape");
var SGF = require("../../sgfgrove.js");

require("../../sgfgrove/collection.js");

test("SGFGrove.collection.gameTree: #insertChildAt", function (t) {
  var c1_1 = SGF.collection("(;FF[4])");
      c1_1[0].insertChildAt( 0, { C: "a" } );

  t.equal(
    c1_1.toString(),
    "(;FF[4];C[a])",
    "#insertChildAt can insert a node object"
  );

  var c1_2 = SGF.collection("(;FF[4])");

  c1_2[0].insertChildAt(0, [
    [{ C: "a" }, { C: "b" }],
    [
      [[{ C: "c" }], []],
      [[{ C: "d" }], []]
    ]
  ]);

  t.equal(
    c1_2.toString(),
    "(;FF[4];C[a];C[b](;C[c])(;C[d]))",
    "#insertChildAt can insert a game tree array"
  );

  var c1_3 = SGF.collection("(;FF[4])");

  c1_3[0].insertChildAt(0, SGF.collection.gameTree([
    [{ C: "a" }, { C: "b" }],
    [
      [[{ C: "c" }], []],
      [[{ C: "d" }], []]
    ]
  ]));

  t.equal(
    c1_3.toString(),
    "(;FF[4];C[a];C[b](;C[c])(;C[d]))",
    "#insertChildAt can insert a gameTree object"
  );

  var c1_4 = SGF.collection("(;FF[4])");

  t.throws(
    function () {
      c1_4[0].insertChildAt( 1, { C: "a" } );
    },
    Error,
    "#insertChildAt should throw an exception " +
    "if the given index is out of bounds"
  );

  var c2_1 = SGF.collection("(;FF[4](;C[a])(;C[b]))");
      c2_1[0].insertChildAt( 0, { C: "c" } );

  t.equal( ""+c2_1, "(;FF[4](;C[c])(;C[a])(;C[b]))" );

  var c2_2 = SGF.collection("(;FF[4](;C[a])(;C[b]))");
      c2_2[0].insertChildAt( c2_2[0].getChildren()[0], { C: "c" } );

  t.equal( ""+c2_2, "(;FF[4](;C[c])(;C[a])(;C[b]))" );

  var c2_3 = SGF.collection("(;FF[4](;C[a])(;C[b]))");
      c2_3[0].insertChildAt( 1, { C: "c" } );

  t.equal( ""+c2_3, "(;FF[4](;C[a])(;C[c])(;C[b]))" );

  var c2_4 = SGF.collection("(;FF[4](;C[a])(;C[b]))");
      c2_4[0].insertChildAt( c2_4[0].getChildren()[1], { C: "c" } );

  t.equal( ""+c2_4, "(;FF[4](;C[a])(;C[c])(;C[b]))" );

  var c2_5 = SGF.collection("(;FF[4](;C[a])(;C[b]))");
      c2_5[0].insertChildAt( 2, { C: "c" } );

  t.equal( ""+c2_5, "(;FF[4](;C[a])(;C[b])(;C[c]))" );

  var c2_6 = SGF.collection("(;FF[4](;C[a])(;C[b]))");

  t.throws(
    function () {
      c2_6[0].insertChildAt( { C: "not a child" }, { C: "c" } );
    },
    Error
  );

  var c3_1 = SGF.collection("(;FF[4];C[a])");
      c3_1[0].insertChildAt( 0, { C: "b" } );

  t.equal( ""+c3_1, "(;FF[4](;C[b])(;C[a]))" );

  var c4_1 = SGF.collection("(;FF[4];C[a](;C[b])(;C[c]))");
      c4_1[0].insertChildAt( 0, { C: "d" } );

  t.equal( ""+c4_1, "(;FF[4](;C[d])(;C[a](;C[b])(;C[c])))" );

  t.end();
});

