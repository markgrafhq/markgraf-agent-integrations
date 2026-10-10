// output-es/runtime.js
function binding(init) {
  let state = 0;
  let value;
  return () => {
    if (state === 2) {
      return value;
    }
    if (state === 1) {
      throw new Error("Binding demanded before initialized");
    }
    state = 1;
    value = init();
    state = 2;
    return value;
  };
}
function fail() {
  throw new Error("Failed pattern match");
}
function intDiv(x, y) {
  if (y > 0)
    return Math.floor(x / y);
  if (y < 0)
    return -Math.floor(x / -y);
  return 0;
}

// output-es/Type.Proxy/index.js
var $$$Proxy = () => ({ tag: "Proxy" });
var $$Proxy = /* @__PURE__ */ $$$Proxy();

// output-es/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0;i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};
// output-es/Control.Apply/index.js
var identity = (x) => x;

// output-es/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
// output-es/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showStringImpl = function(s) {
  var l = s.length;
  return '"' + s.replace(/[\0-\x1F\x7F"\\]/g, function(c, i) {
    switch (c) {
      case '"':
      case "\\":
        return "\\" + c;
      case "\x07":
        return "\\a";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case `
`:
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      case "\v":
        return "\\v";
    }
    var k = i + 1;
    var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
    return "\\" + c.charCodeAt(0).toString(10) + empty;
  }) + '"';
};
// output-es/Data.Show/index.js
var showInt = { show: showIntImpl };

// output-es/Data.Ordering/index.js
var $Ordering = (tag) => tag;
var LT = /* @__PURE__ */ $Ordering("LT");
var GT = /* @__PURE__ */ $Ordering("GT");
var EQ = /* @__PURE__ */ $Ordering("EQ");

// output-es/Data.Maybe/index.js
var $Maybe = (tag, _1) => ({ tag, _1 });
var Nothing = /* @__PURE__ */ $Maybe("Nothing");
var Just = (value0) => $Maybe("Just", value0);
var isNothing = (v2) => {
  if (v2.tag === "Nothing") {
    return true;
  }
  if (v2.tag === "Just") {
    return false;
  }
  fail();
};
var isJust = (v2) => {
  if (v2.tag === "Nothing") {
    return false;
  }
  if (v2.tag === "Just") {
    return true;
  }
  fail();
};
var functorMaybe = {
  map: (v) => (v1) => {
    if (v1.tag === "Just") {
      return $Maybe("Just", v(v1._1));
    }
    return Nothing;
  }
};

// output-es/Data.Either/index.js
var $Either = (tag, _1) => ({ tag, _1 });
var Left = (value0) => $Either("Left", value0);
var Right = (value0) => $Either("Right", value0);

// output-es/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
// output-es/Effect/index.js
var applyEffect = {
  apply: (f) => (a) => () => {
    const f$p = f();
    const a$p = a();
    return applicativeEffect.pure(f$p(a$p))();
  },
  Functor0: () => functorEffect
};
var applicativeEffect = { pure: pureE, Apply0: () => applyEffect };
var functorEffect = {
  map: (f) => (a) => () => {
    const a$p = a();
    return f(a$p);
  }
};

// output-es/Effect.Exception/foreign.js
function error(msg) {
  return new Error(msg);
}
function message(e) {
  return e.message;
}
function throwException(e) {
  return function() {
    throw e;
  };
}
function catchException(c) {
  return function(t) {
    return function() {
      try {
        return t();
      } catch (e) {
        if (e instanceof Error || Object.prototype.toString.call(e) === "[object Error]") {
          return c(e)();
        } else {
          return c(new Error(e.toString()))();
        }
      }
    };
  };
}
// output-es/Control.Monad.Error.Class/index.js
var $$try = (dictMonadError) => {
  const Monad0 = dictMonadError.MonadThrow0().Monad0();
  return (a) => dictMonadError.catchError(Monad0.Bind1().Apply0().Functor0().map(Right)(a))((x) => Monad0.Applicative0().pure($Either("Left", x)));
};

// output-es/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init) {
    return function(xs) {
      var acc = init;
      var len = xs.length;
      for (var i = len - 1;i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init) {
    return function(xs) {
      var acc = init;
      var len = xs.length;
      for (var i = 0;i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};
// output-es/Data.Foldable/index.js
var traverse_ = (dictApplicative) => {
  const $0 = dictApplicative.Apply0();
  return (dictFoldable) => (f) => dictFoldable.foldr((x) => {
    const $1 = f(x);
    return (b) => $0.apply($0.Functor0().map((v) => identity)($1))(b);
  })(dictApplicative.pure());
};
var for_ = (dictApplicative) => {
  const traverse_1 = traverse_(dictApplicative);
  return (dictFoldable) => {
    const $0 = traverse_1(dictFoldable);
    return (b) => (a) => $0(a)(b);
  };
};
var foldableMaybe = {
  foldr: (v) => (v1) => (v2) => {
    if (v2.tag === "Nothing") {
      return v1;
    }
    if (v2.tag === "Just") {
      return v(v2._1)(v1);
    }
    fail();
  },
  foldl: (v) => (v1) => (v2) => {
    if (v2.tag === "Nothing") {
      return v1;
    }
    if (v2.tag === "Just") {
      return v(v1)(v2._1);
    }
    fail();
  },
  foldMap: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    return (v) => (v1) => {
      if (v1.tag === "Nothing") {
        return mempty;
      }
      if (v1.tag === "Just") {
        return v(v1._1);
      }
      fail();
    };
  }
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    return (f) => foldableArray.foldr((x) => (acc) => dictMonoid.Semigroup0().append(f(x))(acc))(mempty);
  }
};

// output-es/Data.NonEmpty/index.js
var $NonEmpty = (_1, _2) => ({ tag: "NonEmpty", _1, _2 });

// output-es/Data.Tuple/index.js
var $Tuple = (_1, _2) => ({ tag: "Tuple", _1, _2 });
var Tuple = (value0) => (value1) => $Tuple(value0, value1);
var snd = (v) => v._2;
var fst = (v) => v._1;

// output-es/Data.List.Types/index.js
var $List = (tag, _1, _2) => ({ tag, _1, _2 });
var Nil = /* @__PURE__ */ $List("Nil");
var Cons = (value0) => (value1) => $List("Cons", value0, value1);
var listMap = (f) => {
  const chunkedRevMap = (chunkedRevMap$a0$copy) => (chunkedRevMap$a1$copy) => {
    let chunkedRevMap$a0 = chunkedRevMap$a0$copy, chunkedRevMap$a1 = chunkedRevMap$a1$copy, chunkedRevMap$c = true, chunkedRevMap$r;
    while (chunkedRevMap$c) {
      const v = chunkedRevMap$a0, v1 = chunkedRevMap$a1;
      if (v1.tag === "Cons" && v1._2.tag === "Cons" && v1._2._2.tag === "Cons") {
        chunkedRevMap$a0 = $List("Cons", v1, v);
        chunkedRevMap$a1 = v1._2._2._2;
        continue;
      }
      const reverseUnrolledMap = (reverseUnrolledMap$a0$copy) => (reverseUnrolledMap$a1$copy) => {
        let reverseUnrolledMap$a0 = reverseUnrolledMap$a0$copy, reverseUnrolledMap$a1 = reverseUnrolledMap$a1$copy, reverseUnrolledMap$c = true, reverseUnrolledMap$r;
        while (reverseUnrolledMap$c) {
          const v2 = reverseUnrolledMap$a0, v3 = reverseUnrolledMap$a1;
          if (v2.tag === "Cons" && v2._1.tag === "Cons" && v2._1._2.tag === "Cons" && v2._1._2._2.tag === "Cons") {
            reverseUnrolledMap$a0 = v2._2;
            reverseUnrolledMap$a1 = $List("Cons", f(v2._1._1), $List("Cons", f(v2._1._2._1), $List("Cons", f(v2._1._2._2._1), v3)));
            continue;
          }
          reverseUnrolledMap$c = false;
          reverseUnrolledMap$r = v3;
        }
        return reverseUnrolledMap$r;
      };
      chunkedRevMap$c = false;
      chunkedRevMap$r = reverseUnrolledMap(v)((() => {
        if (v1.tag === "Cons") {
          if (v1._2.tag === "Cons") {
            if (v1._2._2.tag === "Nil") {
              return $List("Cons", f(v1._1), $List("Cons", f(v1._2._1), Nil));
            }
            return Nil;
          }
          if (v1._2.tag === "Nil") {
            return $List("Cons", f(v1._1), Nil);
          }
        }
        return Nil;
      })());
    }
    return chunkedRevMap$r;
  };
  return chunkedRevMap(Nil);
};
var functorNonEmptyList = { map: (f) => (m) => $NonEmpty(f(m._1), listMap(f)(m._2)) };
var foldableList = {
  foldr: (f) => (b) => {
    const $0 = foldableList.foldl((b$1) => (a) => f(a)(b$1))(b);
    const go = (go$a0$copy) => (go$a1$copy) => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const v = go$a0, v1 = go$a1;
        if (v1.tag === "Nil") {
          go$c = false;
          go$r = v;
          continue;
        }
        if (v1.tag === "Cons") {
          go$a0 = $List("Cons", v1._1, v);
          go$a1 = v1._2;
          continue;
        }
        fail();
      }
      return go$r;
    };
    const $1 = go(Nil);
    return (x) => $0($1(x));
  },
  foldl: (f) => {
    const go = (go$a0$copy) => (go$a1$copy) => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const b = go$a0, v = go$a1;
        if (v.tag === "Nil") {
          go$c = false;
          go$r = b;
          continue;
        }
        if (v.tag === "Cons") {
          go$a0 = f(b)(v._1);
          go$a1 = v._2;
          continue;
        }
        fail();
      }
      return go$r;
    };
    return go;
  },
  foldMap: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    return (f) => foldableList.foldl((acc) => {
      const $0 = dictMonoid.Semigroup0().append(acc);
      return (x) => $0(f(x));
    })(mempty);
  }
};
var semigroupNonEmptyList = { append: (v) => (as$p) => $NonEmpty(v._1, foldableList.foldr(Cons)($List("Cons", as$p._1, as$p._2))(v._2)) };
var showList = (dictShow) => {
  const show = dictShow.show;
  return {
    show: (v) => {
      if (v.tag === "Nil") {
        return "Nil";
      }
      const go = (go$a0$copy) => (go$a1$copy) => {
        let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
        while (go$c) {
          const b = go$a0, v$1 = go$a1;
          if (v$1.tag === "Nil") {
            go$c = false;
            go$r = b;
            continue;
          }
          if (v$1.tag === "Cons") {
            go$a0 = b.init ? { init: false, acc: v$1._1 } : { init: false, acc: b.acc + " : " + v$1._1 };
            go$a1 = v$1._2;
            continue;
          }
          fail();
        }
        return go$r;
      };
      return "(" + go({ init: true, acc: "" })(listMap(show)(v)).acc + " : Nil)";
    }
  };
};
var showNonEmptyList = (dictShow) => {
  const $0 = showList(dictShow);
  return { show: (v) => "(NonEmptyList (NonEmpty " + dictShow.show(v._1) + " " + $0.show(v._2) + "))" };
};

// output-es/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe = snd2(tuple);
              if (isNothing2(maybe))
                return result;
              value = fromJust(maybe);
            }
          };
        };
      };
    };
  };
};

// output-es/Data.Unfoldable1/index.js
var fromJust = (v) => {
  if (v.tag === "Just") {
    return v._1;
  }
  fail();
};
var unfoldable1Array = { unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust)(fst)(snd) };

// output-es/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust2) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe = f(value);
              if (isNothing2(maybe))
                return result;
              var tuple = fromJust2(maybe);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output-es/Data.Unfoldable/index.js
var fromJust2 = (v) => {
  if (v.tag === "Just") {
    return v._1;
  }
  fail();
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust2)(fst)(snd),
  Unfoldable10: () => unfoldable1Array
};

// output-es/Data.Map.Internal/index.js
var $$$Map = (tag, _1, _2, _3, _4, _5, _6) => ({ tag, _1, _2, _3, _4, _5, _6 });
var $SplitLast = (_1, _2, _3) => ({ tag: "SplitLast", _1, _2, _3 });
var Leaf = /* @__PURE__ */ $$$Map("Leaf");
var unsafeNode = (k, v, l, r) => {
  if (l.tag === "Leaf") {
    if (r.tag === "Leaf") {
      return $$$Map("Node", 1, 1, k, v, l, r);
    }
    if (r.tag === "Node") {
      return $$$Map("Node", 1 + r._1 | 0, 1 + r._2 | 0, k, v, l, r);
    }
    fail();
  }
  if (l.tag === "Node") {
    if (r.tag === "Leaf") {
      return $$$Map("Node", 1 + l._1 | 0, 1 + l._2 | 0, k, v, l, r);
    }
    if (r.tag === "Node") {
      return $$$Map("Node", l._1 > r._1 ? 1 + l._1 | 0 : 1 + r._1 | 0, (1 + l._2 | 0) + r._2 | 0, k, v, l, r);
    }
  }
  fail();
};
var unsafeBalancedNode = (k, v, l, r) => {
  if (l.tag === "Leaf") {
    if (r.tag === "Leaf") {
      return $$$Map("Node", 1, 1, k, v, Leaf, Leaf);
    }
    if (r.tag === "Node" && r._1 > 1) {
      if (r._5.tag === "Node" && (() => {
        if (r._6.tag === "Leaf") {
          return r._5._1 > 0;
        }
        if (r._6.tag === "Node") {
          return r._5._1 > r._6._1;
        }
        fail();
      })()) {
        return unsafeNode(r._5._3, r._5._4, unsafeNode(k, v, l, r._5._5), unsafeNode(r._3, r._4, r._5._6, r._6));
      }
      return unsafeNode(r._3, r._4, unsafeNode(k, v, l, r._5), r._6);
    }
    return unsafeNode(k, v, l, r);
  }
  if (l.tag === "Node") {
    if (r.tag === "Node") {
      if (r._1 > (l._1 + 1 | 0)) {
        if (r._5.tag === "Node" && (() => {
          if (r._6.tag === "Leaf") {
            return r._5._1 > 0;
          }
          if (r._6.tag === "Node") {
            return r._5._1 > r._6._1;
          }
          fail();
        })()) {
          return unsafeNode(r._5._3, r._5._4, unsafeNode(k, v, l, r._5._5), unsafeNode(r._3, r._4, r._5._6, r._6));
        }
        return unsafeNode(r._3, r._4, unsafeNode(k, v, l, r._5), r._6);
      }
      if (l._1 > (r._1 + 1 | 0)) {
        if (l._6.tag === "Node" && (() => {
          if (l._5.tag === "Leaf") {
            return 0 <= l._6._1;
          }
          if (l._5.tag === "Node") {
            return l._5._1 <= l._6._1;
          }
          fail();
        })()) {
          return unsafeNode(l._6._3, l._6._4, unsafeNode(l._3, l._4, l._5, l._6._5), unsafeNode(k, v, l._6._6, r));
        }
        return unsafeNode(l._3, l._4, l._5, unsafeNode(k, v, l._6, r));
      }
      return unsafeNode(k, v, l, r);
    }
    if (r.tag === "Leaf" && l._1 > 1) {
      if (l._6.tag === "Node" && (() => {
        if (l._5.tag === "Leaf") {
          return 0 <= l._6._1;
        }
        if (l._5.tag === "Node") {
          return l._5._1 <= l._6._1;
        }
        fail();
      })()) {
        return unsafeNode(l._6._3, l._6._4, unsafeNode(l._3, l._4, l._5, l._6._5), unsafeNode(k, v, l._6._6, r));
      }
      return unsafeNode(l._3, l._4, l._5, unsafeNode(k, v, l._6, r));
    }
    return unsafeNode(k, v, l, r);
  }
  fail();
};
var unsafeSplitLast = (k, v, l, r) => {
  if (r.tag === "Leaf") {
    return $SplitLast(k, v, l);
  }
  if (r.tag === "Node") {
    const v1 = unsafeSplitLast(r._3, r._4, r._5, r._6);
    return $SplitLast(v1._1, v1._2, unsafeBalancedNode(k, v, l, v1._3));
  }
  fail();
};
var unsafeJoinNodes = (v, v1) => {
  if (v.tag === "Leaf") {
    return v1;
  }
  if (v.tag === "Node") {
    const v2 = unsafeSplitLast(v._3, v._4, v._5, v._6);
    return unsafeBalancedNode(v2._1, v2._2, v2._3, v1);
  }
  fail();
};
var insert = (dictOrd) => (k) => (v) => {
  const go = (v1) => {
    if (v1.tag === "Leaf") {
      return $$$Map("Node", 1, 1, k, v, Leaf, Leaf);
    }
    if (v1.tag === "Node") {
      const v2 = dictOrd.compare(k)(v1._3);
      if (v2 === "LT") {
        return unsafeBalancedNode(v1._3, v1._4, go(v1._5), v1._6);
      }
      if (v2 === "GT") {
        return unsafeBalancedNode(v1._3, v1._4, v1._5, go(v1._6));
      }
      if (v2 === "EQ") {
        return $$$Map("Node", v1._1, v1._2, k, v, v1._5, v1._6);
      }
    }
    fail();
  };
  return go;
};
var foldableMap = {
  foldr: (f) => (z) => {
    const go = (m$p, z$p) => {
      if (m$p.tag === "Leaf") {
        return z$p;
      }
      if (m$p.tag === "Node") {
        return go(m$p._5, f(m$p._4)(go(m$p._6, z$p)));
      }
      fail();
    };
    return (m) => go(m, z);
  },
  foldl: (f) => (z) => {
    const go = (z$p, m$p) => {
      if (m$p.tag === "Leaf") {
        return z$p;
      }
      if (m$p.tag === "Node") {
        return go(f(go(z$p, m$p._5))(m$p._4), m$p._6);
      }
      fail();
    };
    return (m) => go(z, m);
  },
  foldMap: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    const $0 = dictMonoid.Semigroup0();
    return (f) => {
      const go = (v) => {
        if (v.tag === "Leaf") {
          return mempty;
        }
        if (v.tag === "Node") {
          return $0.append(go(v._5))($0.append(f(v._4))(go(v._6)));
        }
        fail();
      };
      return go;
    };
  }
};
var $$delete = (dictOrd) => (k) => {
  const go = (v) => {
    if (v.tag === "Leaf") {
      return Leaf;
    }
    if (v.tag === "Node") {
      const v1 = dictOrd.compare(k)(v._3);
      if (v1 === "LT") {
        return unsafeBalancedNode(v._3, v._4, go(v._5), v._6);
      }
      if (v1 === "GT") {
        return unsafeBalancedNode(v._3, v._4, v._5, go(v._6));
      }
      if (v1 === "EQ") {
        return unsafeJoinNodes(v._5, v._6);
      }
    }
    fail();
  };
  return go;
};

// output-es/Data.Nullable/foreign.js
var nullImpl = null;
function nullable(a, r, f) {
  return a == null ? r : f(a);
}
function notNull(x) {
  return x;
}
// output-es/Data.Nullable/index.js
var showNullable = (dictShow) => ({
  show: (x) => {
    const $0 = nullable(x, Nothing, Just);
    if ($0.tag === "Nothing") {
      return "null";
    }
    if ($0.tag === "Just") {
      return dictShow.show($0._1);
    }
    fail();
  }
});

// output-es/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqIntImpl = refEq;
var eqNumberImpl = refEq;
var eqStringImpl = refEq;
// output-es/Data.Eq/index.js
var eqString = { eq: eqStringImpl };
var eqNumber = { eq: eqNumberImpl };
var eqInt = { eq: eqIntImpl };

// output-es/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordNumberImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;
// output-es/Data.Ord/index.js
var ordString = { compare: /* @__PURE__ */ ordStringImpl(LT)(EQ)(GT), Eq0: () => eqString };
var ordNumber = { compare: /* @__PURE__ */ ordNumberImpl(LT)(EQ)(GT), Eq0: () => eqNumber };
var ordInt = { compare: /* @__PURE__ */ ordIntImpl(LT)(EQ)(GT), Eq0: () => eqInt };

// output-es/Data.String.Common/foreign.js
var split = function(sep) {
  return function(s) {
    return s.split(sep);
  };
};
var trim = function(s) {
  return s.trim();
};
// output-es/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};
// output-es/Unsafe.Coerce/foreign.js
var unsafeCoerce = function(x) {
  return x;
};
// output-es/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler(error2) {
    return new Aff2(PURE, undefined);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error2) {
      setTimeout(function() {
        throw error2;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error2) {
      return left(error2);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error2) {
      k(left(error2))();
      return nonCanceler;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size !== 0) {
        size--;
        thunk = queue[ix];
        queue[ix] = undefined;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size) % limit] = cb;
        size++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function() {
                    throw util.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error2) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util, supervisor, aff) {
    var runTick = 0;
    var status = SUSPENDED;
    var step = aff;
    var fail2 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status) {
          case STEP_BIND:
            status = CONTINUE;
            try {
              step = bhead(step);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail2 = util.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step)) {
              status = RETURN;
              fail2 = step;
              step = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step = util.fromRight(step);
            }
            break;
          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step._2;
                status = CONTINUE;
                step = step._1;
                break;
              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step = util.right(step._1);
                } else {
                  status = STEP_BIND;
                  step = step._1;
                }
                break;
              case SYNC:
                status = STEP_RESULT;
                step = runSync(util.left, util.right, step._1);
                break;
              case ASYNC:
                status = PENDING;
                step = runAsync(util.left, step._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status = STEP_RESULT;
                      step = result2;
                      run(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status = RETURN;
                fail2 = util.left(step._1);
                step = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util, supervisor, step._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step._1) {
                  tmp.run();
                }
                step = util.right(tmp);
                break;
              case SEQ:
                status = CONTINUE;
                step = sequential(util, supervisor, step._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status = COMPLETED;
              step = interrupt || fail2 || step;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail2) {
                    status = CONTINUE;
                    step = attempt._2(util.fromLeft(fail2));
                    fail2 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step = util.fromRight(step);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail2 === null) {
                    result = util.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail2) {
                    step = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                  } else {
                    step = attempt._1.completed(util.fromRight(step))(attempt._2);
                  }
                  fail2 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail2 = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }
            joins = null;
            if (interrupt && fail2) {
              setTimeout(function() {
                throw util.fromLeft(fail2);
              }, 0);
            } else if (util.isLeft(step) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util.fromLeft(step);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join2) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join2.rethrow;
          join2.handler(step)();
          return function() {};
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join2;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill(error2, cb) {
      return function() {
        if (status === COMPLETED) {
          cb(util.right(undefined))();
          return function() {};
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util.right(undefined));
          }
        })();
        switch (status) {
          case SUSPENDED:
            interrupt = util.left(error2);
            status = COMPLETED;
            step = interrupt;
            run(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error2);
            }
            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error2)), attempts, interrupt);
              }
              status = RETURN;
              step = null;
              fail2 = null;
              run(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util.left(error2);
            }
            if (bracketCount === 0) {
              status = RETURN;
              step = null;
              fail2 = null;
            }
        }
        return canceler;
      };
    }
    function join(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status === SUSPENDED) {
          run(runTick);
        }
        return canceler;
      };
    }
    return {
      kill,
      join,
      onComplete,
      isSuspended: function() {
        return status === SUSPENDED;
      },
      run: function() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run(runTick);
            });
          } else {
            run(runTick);
          }
        }
      }
    };
  }
  function runPar(util, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill(error2, par2, cb2) {
      var step = par2;
      var head = null;
      var tail = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error2, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head === null) {
                break loop;
              }
              step = head._2;
              if (tail === null) {
                head = null;
              } else {
                head = tail._1;
                tail = tail._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head) {
                tail = new Aff2(CONS, head, tail);
              }
              head = step;
              step = step._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util.right(undefined))();
      } else {
        kid = 0;
        tmp = count;
        for (;kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join(result, head, tail) {
      var fail2, step, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail2 = result;
        step = null;
      } else {
        step = result;
        fail2 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head === null) {
            cb(fail2 || step)();
            return;
          }
          if (head._3 !== EMPTY) {
            return;
          }
          switch (head.tag) {
            case MAP:
              if (fail2 === null) {
                head._3 = util.right(head._1(util.fromRight(step)));
                step = head._3;
              } else {
                head._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head._1._3;
              rhs = head._2._3;
              if (fail2) {
                head._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail2 === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join(fail2, null, null);
                    } else {
                      join(fail2, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head._3 = step;
              }
              break;
            case ALT:
              lhs = head._1._3;
              rhs = head._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail2 = step === lhs ? rhs : lhs;
                step = null;
                head._3 = fail2;
              } else {
                head._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join(step, null, null);
                    } else {
                      join(step, tail._1, tail._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail === null) {
            head = null;
          } else {
            head = tail._1;
            tail = tail._2;
          }
        }
    }
    function resolve(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run() {
      var status = CONTINUE;
      var step = par;
      var head = null;
      var tail = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head) {
                    tail = new Aff2(CONS, head, tail);
                  }
                  head = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head === null) {
                break loop;
              }
              if (head._1 === EMPTY) {
                head._1 = step;
                status = CONTINUE;
                step = head._2;
                head._2 = EMPTY;
              } else {
                head._2 = step;
                step = head;
                if (tail === null) {
                  head = null;
                } else {
                  head = tail._1;
                  tail = tail._2;
                }
              }
          }
        }
      root = step;
      for (fid = 0;fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error2, cb2) {
      interrupt = util.left(error2);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill(error2, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler;
          };
        });
      };
    }
    run();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential(util, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _catchError(aff) {
  return function(k) {
    return Aff.Catch(aff, k);
  };
}
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value) {
        return Aff.Pure(f(value));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
var _liftEffect = Aff.Sync;
function _parAffAlt(aff1) {
  return function(aff2) {
    return Aff.ParAlt(aff1, aff2);
  };
}
var makeAff = Aff.Async;
function generalBracket(acquire) {
  return function(options) {
    return function(k) {
      return Aff.Bracket(acquire, options, k);
    };
  };
}
function _makeFiber(util, aff) {
  return function() {
    return Aff.Fiber(util, null, aff);
  };
}
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right()));
        return function() {
          return Aff.Sync(function() {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;
// output-es/Effect.Aff/index.js
var functorAff = { map: _map };
var ffiUtil = {
  isLeft: (v) => {
    if (v.tag === "Left") {
      return true;
    }
    if (v.tag === "Right") {
      return false;
    }
    fail();
  },
  fromLeft: (v) => {
    if (v.tag === "Left") {
      return v._1;
    }
    if (v.tag === "Right") {
      return _crashWith("unsafeFromLeft: Right");
    }
    fail();
  },
  fromRight: (v) => {
    if (v.tag === "Right") {
      return v._1;
    }
    if (v.tag === "Left") {
      return _crashWith("unsafeFromRight: Left");
    }
    fail();
  },
  left: Left,
  right: Right
};
var monadAff = { Applicative0: () => applicativeAff, Bind1: () => bindAff };
var bindAff = { bind: _bind, Apply0: () => applyAff };
var applyAff = { apply: (f) => (a) => _bind(f)((f$p) => _bind(a)((a$p) => applicativeAff.pure(f$p(a$p)))), Functor0: () => functorAff };
var applicativeAff = { pure: _pure, Apply0: () => applyAff };
var $$finally = (fin) => (a) => generalBracket(_pure())({ killed: (v) => (v$1) => fin, failed: (v) => (v$1) => fin, completed: (v) => (v$1) => fin })((v) => a);
var monadThrowAff = { throwError: _throwError, Monad0: () => monadAff };
var monadErrorAff = { catchError: _catchError, MonadThrow0: () => monadThrowAff };
var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
var runAff = (k) => (aff) => {
  const $0 = _makeFiber(ffiUtil, _bind($$try2(aff))((x) => _liftEffect(k(x))));
  return () => {
    const fiber = $0();
    fiber.run();
    return fiber;
  };
};
var nonCanceler = /* @__PURE__ */ (() => {
  const $0 = _pure();
  return (v) => $0;
})();

// output-es/Data.Number/foreign.js
var isFiniteImpl = isFinite;
var ceil = Math.ceil;
var floor = Math.floor;
var round = Math.round;
// output-es/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};
var toNumber = function(n) {
  return n;
};
var fromStringAsImpl = function(just) {
  return function(nothing) {
    return function(radix) {
      var digits;
      if (radix < 11) {
        digits = "[0-" + (radix - 1).toString() + "]";
      } else if (radix === 11) {
        digits = "[0-9a]";
      } else {
        digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
      }
      var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
      return function(s) {
        if (pattern.test(s)) {
          var i = parseInt(s, radix);
          return (i | 0) === i ? just(i) : nothing;
        } else {
          return nothing;
        }
      };
    };
  };
};
// output-es/Data.Int/index.js
var fromStringAs = /* @__PURE__ */ fromStringAsImpl(Just)(Nothing);
var fromString = /* @__PURE__ */ fromStringAs(10);
var fromNumber = /* @__PURE__ */ fromNumberImpl(Just)(Nothing);
var unsafeClamp = (x) => {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  if (x >= toNumber(2147483647)) {
    return 2147483647;
  }
  if (x <= toNumber(-2147483648)) {
    return -2147483648;
  }
  const $0 = fromNumber(x);
  if ($0.tag === "Nothing") {
    return 0;
  }
  if ($0.tag === "Just") {
    return $0._1;
  }
  fail();
};

// output-es/Effect.Random/foreign.js
var random = Math.random;
// output-es/Effect.Random/index.js
var randomInt = (low) => (high) => () => {
  const n = random();
  return unsafeClamp(floor((toNumber(high) - toNumber(low) + 1) * n + toNumber(low)));
};

// output-es/Effect.Ref/foreign.js
var modifyImpl = function(f) {
  return function(ref) {
    return function() {
      var t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};
// output-es/Effect.Timer/foreign.js
function setTimeoutImpl(ms) {
  return function(fn) {
    return function() {
      return setTimeout(fn, ms);
    };
  };
}
function clearTimeoutImpl(id) {
  return function() {
    clearTimeout(id);
  };
}
function setIntervalImpl(ms) {
  return function(fn) {
    return function() {
      return setInterval(fn, ms);
    };
  };
}
function clearIntervalImpl(id) {
  return function() {
    clearInterval(id);
  };
}
// output-es/Control.Bind/foreign.js
var arrayBind = typeof Array.prototype.flatMap === "function" ? function(arr) {
  return function(f) {
    return arr.flatMap(f);
  };
} : function(arr) {
  return function(f) {
    var result = [];
    var l = arr.length;
    for (var i = 0;i < l; i++) {
      var xs = f(arr[i]);
      var k = xs.length;
      for (var j = 0;j < k; j++) {
        result.push(xs[j]);
      }
    }
    return result;
  };
};
// output-es/Data.Identity/index.js
var Identity = (x) => x;
var functorIdentity = { map: (f) => (m) => f(m) };
var applyIdentity = { apply: (v) => (v1) => v(v1), Functor0: () => functorIdentity };
var bindIdentity = { bind: (v) => (f) => f(v), Apply0: () => applyIdentity };
var applicativeIdentity = { pure: Identity, Apply0: () => applyIdentity };
var monadIdentity = { Applicative0: () => applicativeIdentity, Bind1: () => bindIdentity };

// output-es/Control.Monad.Except.Trans/index.js
var bindExceptT = (dictMonad) => ({
  bind: (v) => (k) => dictMonad.Bind1().bind(v)((v2) => {
    if (v2.tag === "Left") {
      return dictMonad.Applicative0().pure($Either("Left", v2._1));
    }
    if (v2.tag === "Right") {
      return k(v2._1);
    }
    fail();
  }),
  Apply0: () => applyExceptT(dictMonad)
});
var applyExceptT = (dictMonad) => {
  const $0 = dictMonad.Bind1().Apply0().Functor0();
  const functorExceptT1 = {
    map: (f) => $0.map((m) => {
      if (m.tag === "Left") {
        return $Either("Left", m._1);
      }
      if (m.tag === "Right") {
        return $Either("Right", f(m._1));
      }
      fail();
    })
  };
  return {
    apply: (() => {
      const $1 = bindExceptT(dictMonad);
      return (f) => (a) => $1.bind(f)((f$p) => $1.bind(a)((a$p) => applicativeExceptT(dictMonad).pure(f$p(a$p))));
    })(),
    Functor0: () => functorExceptT1
  };
};
var applicativeExceptT = (dictMonad) => ({ pure: (x) => dictMonad.Applicative0().pure($Either("Right", x)), Apply0: () => applyExceptT(dictMonad) });
var monadThrowExceptT = (dictMonad) => {
  const monadExceptT1 = { Applicative0: () => applicativeExceptT(dictMonad), Bind1: () => bindExceptT(dictMonad) };
  return { throwError: (x) => dictMonad.Applicative0().pure($Either("Left", x)), Monad0: () => monadExceptT1 };
};

// output-es/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};
// output-es/Data.String.CodeUnits/foreign.js
var fromCharArray = function(a) {
  return a.join("");
};
var toCharArray = function(s) {
  return s.split("");
};
var singleton = function(c) {
  return c;
};
var length = function(s) {
  return s.length;
};
var _indexOf = function(just) {
  return function(nothing) {
    return function(x) {
      return function(s) {
        var i = s.indexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};
var take = function(n) {
  return function(s) {
    return s.substr(0, n);
  };
};
var drop = function(n) {
  return function(s) {
    return s.substring(n);
  };
};
var splitAt = function(i) {
  return function(s) {
    return { before: s.substring(0, i), after: s.substring(i) };
  };
};
// output-es/Data.String.CodeUnits/index.js
var stripSuffix = (v) => (str) => {
  const v1 = splitAt(length(str) - length(v) | 0)(str);
  if (v1.after === v) {
    return $Maybe("Just", v1.before);
  }
  return Nothing;
};
var stripPrefix = (v) => (str) => {
  const v1 = splitAt(length(v))(str);
  if (v1.before === v) {
    return $Maybe("Just", v1.after);
  }
  return Nothing;
};
var indexOf = /* @__PURE__ */ _indexOf(Just)(Nothing);
var contains = (pat) => {
  const $0 = indexOf(pat);
  return (x) => {
    const $1 = $0(x);
    if ($1.tag === "Nothing") {
      return false;
    }
    if ($1.tag === "Just") {
      return true;
    }
    fail();
  };
};

// output-es/Foreign/foreign.js
function typeOf(value) {
  return typeof value;
}
function tagOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isNull(value) {
  return value === null;
}

// output-es/Foreign/index.js
var $ForeignError = (tag, _1, _2) => ({ tag, _1, _2 });
var ErrorAtProperty = (value0) => (value1) => $ForeignError("ErrorAtProperty", value0, value1);
var showForeignError = {
  show: (v) => {
    if (v.tag === "ForeignError") {
      return "(ForeignError " + showStringImpl(v._1) + ")";
    }
    if (v.tag === "ErrorAtIndex") {
      return "(ErrorAtIndex " + showIntImpl(v._1) + " " + showForeignError.show(v._2) + ")";
    }
    if (v.tag === "ErrorAtProperty") {
      return "(ErrorAtProperty " + showStringImpl(v._1) + " " + showForeignError.show(v._2) + ")";
    }
    if (v.tag === "TypeMismatch") {
      return "(TypeMismatch " + showStringImpl(v._1) + " " + showStringImpl(v._2) + ")";
    }
    fail();
  }
};
var readNull = (dictMonad) => {
  const $0 = applicativeExceptT(dictMonad);
  return (value) => {
    if (isNull(value)) {
      return $0.pure(Nothing);
    }
    return $0.pure($Maybe("Just", value));
  };
};
var unsafeReadTagged = (dictMonad) => (tag) => (value) => {
  if (tagOf(value) === tag) {
    return applicativeExceptT(dictMonad).pure(value);
  }
  return monadThrowExceptT(dictMonad).throwError($NonEmpty($ForeignError("TypeMismatch", tag, tagOf(value)), Nil));
};
var readBoolean = (dictMonad) => unsafeReadTagged(dictMonad)("Boolean");
var readNumber = (dictMonad) => unsafeReadTagged(dictMonad)("Number");
var readInt = (dictMonad) => (value) => {
  const error2 = $Either("Left", $NonEmpty($ForeignError("TypeMismatch", "Int", tagOf(value)), Nil));
  return dictMonad.Bind1().Apply0().Functor0().map((v2) => {
    if (v2.tag === "Left") {
      return error2;
    }
    if (v2.tag === "Right") {
      const $0 = fromNumber(v2._1);
      if ($0.tag === "Nothing") {
        return error2;
      }
      if ($0.tag === "Just") {
        return $Either("Right", $0._1);
      }
    }
    fail();
  })(unsafeReadTagged(dictMonad)("Number")(value));
};
var readString = (dictMonad) => unsafeReadTagged(dictMonad)("String");

// output-es/Effect.Uncurried/foreign.js
var runEffectFn1 = function runEffectFn12(fn) {
  return function(a) {
    return function() {
      return fn(a);
    };
  };
};
// output-es/Promise.Internal/foreign.js
var newImpl = function(k) {
  return new Promise(k);
};
function thenOrCatch(k, c, p) {
  return p.then(k, c);
}
function resolve(a) {
  return Promise.resolve(a);
}
// output-es/Promise.Rejection/foreign.js
function fromError(a) {
  return a;
}
function _toError(just, nothing, ref) {
  if (ref instanceof Error) {
    return just(ref);
  }
  return nothing;
}
// output-es/Promise.Aff/index.js
var toAff$p = (customCoerce) => (p) => makeAff((cb) => () => {
  thenOrCatch(($0) => {
    const $1 = cb($Either("Right", $0));
    const a$p = $1();
    return resolve(a$p);
  }, ($0) => {
    const $1 = cb($Either("Left", customCoerce($0)));
    const a$p = $1();
    return resolve(a$p);
  }, p);
  return nonCanceler;
});
var fromAff = () => (aff) => () => newImpl((onResolve, onReject) => {
  const $0 = runEffectFn1(onResolve);
  const $1 = runEffectFn1(onReject);
  const $2 = runAff((v2) => {
    if (v2.tag === "Left") {
      return $1(fromError(v2._1));
    }
    if (v2.tag === "Right") {
      return $0(v2._1);
    }
    fail();
  })(aff);
  $2();
});
var coerce = (rej) => {
  const $0 = _toError(Just, Nothing, rej);
  const $1 = unsafeReadTagged(monadIdentity)("String")(rej);
  const $2 = (() => {
    const $22 = (() => {
      if ($1.tag === "Left") {
        return Nothing;
      }
      if ($1.tag === "Right") {
        return $Maybe("Just", error($1._1));
      }
      fail();
    })();
    if ($0.tag === "Nothing") {
      return $22;
    }
    return $0;
  })();
  if ($2.tag === "Nothing") {
    return error("Promise failed, couldn't extract JS Error or String");
  }
  if ($2.tag === "Just") {
    return $2._1;
  }
  fail();
};

// output-es/OpenCode.RPC/foreign.js
import { Rpc } from "@opencode/plugin";
var define = (definition) => Rpc.define({
  id: definition.id,
  methods: Object.fromEntries(definition.methods.map((method) => [
    method.name,
    { input: method.inputSchema, output: method.outputSchema }
  ])),
  events: Object.fromEntries(definition.events.map((event) => [event.name, { schema: event.schema }]))
});
var client = (context) => (contract) => () => ({
  rpc: context.client.rpc(contract),
  location: context.location ?? context.data.location.default()
});
var register = (context) => (contract) => (handlers) => () => context.rpc.register(contract, Object.fromEntries(handlers.map((handler) => [
  handler.name,
  (input, context2) => handler.handler(input)(context2)()
])));
var emit = (registration) => (name2) => (data) => () => registration.events.emit(name2, data);
var dispose = (registration) => () => registration.dispose();
var callImpl = (client2) => (name2) => (input) => () => {
  const controller = new AbortController;
  return {
    promise: client2.rpc[name2](input, {
      location: client2.location,
      signal: controller.signal
    }),
    cancel: () => controller.abort()
  };
};
var listen = (rpc) => (name2) => (handler) => () => rpc.rpc.events.on(name2, (event) => handler(event.data)());

// output-es/OpenCode.RPC/index.js
var call = (connection) => (name2) => (input) => generalBracket(_liftEffect(callImpl(connection)(name2)(input)))({
  killed: (v) => (x) => _liftEffect(x.cancel),
  failed: (v) => (x) => _liftEffect(x.cancel),
  completed: (v) => (x) => _liftEffect(x.cancel)
})((x) => toAff$p(coerce)(x.promise));
// output-es/Data.Array.ST/foreign.js
var sortByImpl = function() {
  function mergeFromTo(compare, fromOrdering, xs1, xs2, from, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from + (to - from >> 1);
    if (mid - from > 1)
      mergeFromTo(compare, fromOrdering, xs2, xs1, from, mid);
    if (to - mid > 1)
      mergeFromTo(compare, fromOrdering, xs2, xs1, mid, to);
    i = from;
    j = mid;
    k = from;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare, fromOrdering, xs) {
    if (xs.length < 2)
      return xs;
    mergeFromTo(compare, fromOrdering, xs, xs.slice(0), 0, xs.length);
    return xs;
  };
}();
// output-es/Data.FunctorWithIndex/foreign.js
var mapWithIndexArray = function(f) {
  return function(xs) {
    var l = xs.length;
    var result = Array(l);
    for (var i = 0;i < l; i++) {
      result[i] = f(i)(xs[i]);
    }
    return result;
  };
};
// output-es/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply) {
    return function(map) {
      return function(pure) {
        return function(f) {
          return function(array) {
            function go(bot, top) {
              switch (top - bot) {
                case 0:
                  return pure([]);
                case 1:
                  return map(array1)(f(array[bot]));
                case 2:
                  return apply(map(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply(apply(map(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top - bot) / 4) * 2;
                  return apply(map(concat2)(go(bot, pivot)))(go(pivot, top));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();
// output-es/Data.Traversable/index.js
var traversableMaybe = {
  traverse: (dictApplicative) => (v) => (v1) => {
    if (v1.tag === "Nothing") {
      return dictApplicative.pure(Nothing);
    }
    if (v1.tag === "Just") {
      return dictApplicative.Apply0().Functor0().map(Just)(v(v1._1));
    }
    fail();
  },
  sequence: (dictApplicative) => (v) => {
    if (v.tag === "Nothing") {
      return dictApplicative.pure(Nothing);
    }
    if (v.tag === "Just") {
      return dictApplicative.Apply0().Functor0().map(Just)(v._1);
    }
    fail();
  },
  Functor0: () => functorMaybe,
  Foldable1: () => foldableMaybe
};

// output-es/Data.Array/foreign.js
var rangeImpl = function(start, end) {
  var step = start > end ? -1 : 1;
  var result = new Array(step * (end - start) + 1);
  var i = start, n = 0;
  while (i !== end) {
    result[n++] = i;
    i += step;
  }
  result[n] = i;
  return result;
};
var replicateFill = function(count, value) {
  if (count < 1) {
    return [];
  }
  var result = new Array(count);
  return result.fill(value);
};
var replicatePolyfill = function(count, value) {
  var result = [];
  var n = 0;
  for (var i = 0;i < count; i++) {
    result[n++] = value;
  }
  return result;
};
var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons2(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  var emptyList = {};
  function curryCons(head) {
    return function(tail) {
      return new Cons2(head, tail);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr, xs) {
    return listToArray(foldr(curryCons)(emptyList)(xs));
  };
}();
var findMapImpl = function(nothing, isJust2, f, xs) {
  for (var i = 0;i < xs.length; i++) {
    var result = f(xs[i]);
    if (isJust2(result))
      return result;
  }
  return nothing;
};
var sortByImpl2 = function() {
  function mergeFromTo(compare, fromOrdering, xs1, xs2, from, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from + (to - from >> 1);
    if (mid - from > 1)
      mergeFromTo(compare, fromOrdering, xs2, xs1, from, mid);
    if (to - mid > 1)
      mergeFromTo(compare, fromOrdering, xs2, xs1, mid, to);
    i = from;
    j = mid;
    k = from;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare, fromOrdering, xs) {
    var out;
    if (xs.length < 2)
      return xs;
    out = xs.slice(0);
    mergeFromTo(compare, fromOrdering, out, xs.slice(0), 0, xs.length);
    return out;
  };
}();
// output-es/Data.Array/index.js
var findMap = ($0) => ($1) => findMapImpl(Nothing, isJust, $0, $1);
// output-es/Data.EuclideanRing/foreign.js
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};
// output-es/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
// output-es/Data.Semigroup/index.js
var semigroupString = { append: concatString };

// output-es/Data.Monoid/index.js
var monoidString = { mempty: "", Semigroup0: () => semigroupString };

// output-es/Foreign.Index/foreign.js
function unsafeReadPropImpl(f, s, key, value) {
  return value == null ? f : s(value[key]);
}

// output-es/Foreign.Index/index.js
var unsafeReadProp = (dictMonad) => {
  const pure = applicativeExceptT(dictMonad).pure;
  return (k) => (value) => unsafeReadPropImpl(monadThrowExceptT(dictMonad).throwError($NonEmpty($ForeignError("TypeMismatch", "object", typeOf(value)), Nil)), pure, k, value);
};

// output-es/Data.FoldableWithIndex/index.js
var traverseWithIndex_ = (dictApplicative) => {
  const $0 = dictApplicative.Apply0();
  return (dictFoldableWithIndex) => (f) => dictFoldableWithIndex.foldrWithIndex((i) => {
    const $1 = f(i);
    return (x) => {
      const $2 = $1(x);
      return (b) => $0.apply($0.Functor0().map((v) => identity)($2))(b);
    };
  })(dictApplicative.pure());
};
var foldableWithIndexArray = {
  foldrWithIndex: (f) => (z) => {
    const $0 = foldrArray((v) => {
      const $02 = v._1;
      const $12 = v._2;
      return (y) => f($02)($12)(y);
    })(z);
    const $1 = mapWithIndexArray(Tuple);
    return (x) => $0($1(x));
  },
  foldlWithIndex: (f) => (z) => {
    const $0 = foldlArray((y) => (v) => f(v._1)(y)(v._2))(z);
    const $1 = mapWithIndexArray(Tuple);
    return (x) => $0($1(x));
  },
  foldMapWithIndex: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    return (f) => foldableWithIndexArray.foldrWithIndex((i) => (x) => (acc) => dictMonoid.Semigroup0().append(f(i)(x))(acc))(mempty);
  },
  Foldable0: () => foldableArray
};

// output-es/Foreign.Object/foreign.js
function _lookup(no, yes, k, m) {
  return k in m ? yes(m[k]) : no;
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});
// output-es/Foreign.Object/index.js
var fromFoldable = (dictFoldable) => {
  const $0 = dictFoldable.foldr;
  return (l) => {
    const s = {};
    for (const v of fromFoldableImpl($0, l)) {
      s[v._1] = v._2;
    }
    return s;
  };
};
// output-es/Record.Builder/foreign.js
function unsafeInsert(l) {
  return function(a) {
    return function(rec) {
      rec[l] = a;
      return rec;
    };
  };
}
// output-es/Record.Builder/index.js
var insert2 = () => () => (dictIsSymbol) => (l) => (a) => (r1) => unsafeInsert(dictIsSymbol.reflectSymbol(l))(a)(r1);

// output-es/Yoga.JSON/foreign.js
function reviver(key, value) {
  if (key === "big") {
    return BigInt(value);
  }
  return value;
}
var _parseJSON = (payload) => JSON.parse(payload, reviver);
function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}
var _unsafeStringify = (data) => JSON.stringify(data, replacer);

// output-es/Yoga.JSON/index.js
var identity5 = (x) => x;
var bindExceptT2 = /* @__PURE__ */ bindExceptT(monadIdentity);
var applicativeExceptT2 = /* @__PURE__ */ applicativeExceptT(monadIdentity);
var readNull2 = /* @__PURE__ */ readNull(monadIdentity);
var readProp = /* @__PURE__ */ unsafeReadProp(monadIdentity);
var writeForeignString = { writeImpl: unsafeCoerce };
var writeForeignInt = { writeImpl: unsafeCoerce };
var writeForeignForeign = { writeImpl: (x) => x };
var writeForeignFieldsNilRowR = { writeImplFields: (v) => (v1) => identity5 };
var writeForeignBoolean = { writeImpl: unsafeCoerce };
var readForeignString = { readImpl: /* @__PURE__ */ readString(monadIdentity) };
var readForeignNumber = { readImpl: /* @__PURE__ */ readNumber(monadIdentity) };
var readForeignInt = { readImpl: /* @__PURE__ */ readInt(monadIdentity) };
var readForeignFieldsNilRowRo = { getFields: (v) => (v1) => applicativeExceptT2.pure(identity5) };
var readForeignBoolean = { readImpl: /* @__PURE__ */ readBoolean(monadIdentity) };
var writeJSON = (dictWriteForeign) => (x) => _unsafeStringify(dictWriteForeign.writeImpl(x));
var writeForeignFieldsCons = (dictIsSymbol) => (dictWriteForeign) => (dictWriteForeignFields) => () => () => () => ({
  writeImplFields: (v) => (rec) => {
    const $0 = insert2()()(dictIsSymbol)($$Proxy)(dictWriteForeign.writeImpl(unsafeGet(dictIsSymbol.reflectSymbol($$Proxy))(rec)));
    const $1 = dictWriteForeignFields.writeImplFields($$Proxy)(rec);
    return (x) => $0($1(x));
  }
});
var writeForeignNullable = (dictWriteForeign) => ({
  writeImpl: (x) => {
    const $0 = nullable(x, Nothing, Just);
    if ($0.tag === "Nothing") {
      return nullImpl;
    }
    if ($0.tag === "Just") {
      return dictWriteForeign.writeImpl($0._1);
    }
    fail();
  }
});
var readForeignNullable = (dictReadForeign) => {
  const readImpl5 = dictReadForeign.readImpl;
  return {
    readImpl: (o) => {
      const $0 = functorNonEmptyList.map((error2) => {
        if (error2.tag === "TypeMismatch") {
          return $ForeignError("TypeMismatch", "Nullable " + error2._1, error2._2);
        }
        return error2;
      });
      const $1 = bindExceptT2.bind(readNull2(o))((x) => {
        const $12 = traversableMaybe.traverse(applicativeExceptT2)(readImpl5)(x);
        if ($12.tag === "Left") {
          return $Either("Left", $12._1);
        }
        if ($12.tag === "Right") {
          return $Either("Right", (() => {
            if ($12._1.tag === "Nothing") {
              return nullImpl;
            }
            if ($12._1.tag === "Just") {
              return notNull($12._1._1);
            }
            fail();
          })());
        }
        fail();
      });
      if ($1.tag === "Right") {
        return $Either("Right", $1._1);
      }
      if ($1.tag === "Left") {
        return $Either("Left", $0($1._1));
      }
      fail();
    }
  };
};
var parseJSON = /* @__PURE__ */ (() => {
  const $0 = runEffectFn1(_parseJSON);
  return (x) => {
    const $1 = (() => {
      const $12 = $0(x);
      return catchException((x$1) => () => $Either("Left", x$1))(() => {
        const a$p = $12();
        return $Either("Right", a$p);
      });
    })()();
    if ($1.tag === "Left") {
      return $Either("Left", $NonEmpty($ForeignError("ForeignError", message($1._1)), Nil));
    }
    if ($1.tag === "Right") {
      return $Either("Right", $1._1);
    }
    fail();
  };
})();
var readForeignFieldsCons = (dictIsSymbol) => (dictReadForeign) => {
  const readImpl5 = dictReadForeign.readImpl;
  return (dictReadForeignFields) => () => () => ({
    getFields: (v) => (obj) => {
      const name2 = dictIsSymbol.reflectSymbol($$Proxy);
      const $0 = dictReadForeignFields.getFields($$Proxy)(obj);
      const $1 = bindExceptT2.bind(readProp(name2)(obj))(readImpl5);
      if ($1.tag === "Right") {
        if ($0.tag === "Right") {
          return $Either("Right", (x) => unsafeInsert(dictIsSymbol.reflectSymbol($$Proxy))($1._1)($0._1(x)));
        }
        if ($0.tag === "Left") {
          return $Either("Left", $0._1);
        }
        fail();
      }
      if ($1.tag === "Left") {
        if ($0.tag === "Left") {
          return $Either("Left", semigroupNonEmptyList.append((() => {
            const $2 = ErrorAtProperty(name2);
            return $NonEmpty($2($1._1._1), listMap($2)($1._1._2));
          })())($0._1));
        }
        if ($0.tag === "Right") {
          return $Either("Left", (() => {
            const $2 = ErrorAtProperty(name2);
            return $NonEmpty($2($1._1._1), listMap($2)($1._1._2));
          })());
        }
      }
      fail();
    }
  });
};

// output-es/Markgraf.OpenCode.Protocol/index.js
var writeForeignFieldsCons1 = /* @__PURE__ */ writeForeignFieldsCons({ reflectSymbol: () => "type" })(writeForeignString)(writeForeignFieldsNilRowR)()()();
var writeForeignRecord1 = { writeImpl: (rec) => writeForeignFieldsCons1.writeImplFields($$Proxy)(rec)({}) };
var backgroundIsSymbol = { reflectSymbol: () => "background" };
var idIsSymbol = { reflectSymbol: () => "id" };
var pathIsSymbol = { reflectSymbol: () => "path" };
var writeForeignArray = { writeImpl: (xs) => arrayMap(unsafeCoerce)(xs) };
var writeForeignFieldsCons4 = /* @__PURE__ */ writeForeignFieldsCons({ reflectSymbol: () => "required" })(writeForeignArray)(writeForeignFieldsCons1)()()();
var writeForeignFieldsCons8 = /* @__PURE__ */ writeForeignFieldsCons({ reflectSymbol: () => "requestId" })(writeForeignRecord1)(writeForeignFieldsNilRowR)()()();
var show = /* @__PURE__ */ (() => showNonEmptyList(showForeignError).show)();
var sessionIdIsSymbol = { reflectSymbol: () => "sessionId" };
var writeForeignFieldsCons12 = /* @__PURE__ */ writeForeignFieldsCons(sessionIdIsSymbol)(writeForeignRecord1)(writeForeignFieldsNilRowR)()()();
var write1 = /* @__PURE__ */ (() => {
  const $0 = writeForeignFieldsCons({ reflectSymbol: () => "clientId" })(writeForeignString)(writeForeignFieldsCons({ reflectSymbol: () => "hostname" })(writeForeignString)(writeForeignFieldsCons(sessionIdIsSymbol)(writeForeignString)(writeForeignFieldsNilRowR)()()())()()())()()();
  return (rec) => $0.writeImplFields($$Proxy)(rec)({});
})();
var writeForeignFieldsCons14 = /* @__PURE__ */ writeForeignFieldsCons({ reflectSymbol: () => "requestId" })(writeForeignString)(writeForeignFieldsNilRowR)()()();
var write22 = /* @__PURE__ */ (() => {
  const $0 = writeForeignFieldsCons({ reflectSymbol: () => "clientId" })(writeForeignString)(writeForeignFieldsCons({ reflectSymbol: () => "error" })(writeForeignNullable(writeForeignString))(writeForeignFieldsCons14)()()())()()();
  return (rec) => $0.writeImplFields($$Proxy)(rec)({});
})();
var write3 = /* @__PURE__ */ (() => {
  const $0 = writeForeignFieldsCons({ reflectSymbol: () => "clientId" })(writeForeignString)(writeForeignFieldsCons14)()()();
  return (rec) => $0.writeImplFields($$Proxy)(rec)({});
})();
var nullableRequestSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "anyOf" })({
  writeImpl: (xs) => arrayMap(writeForeignForeign.writeImpl)(xs)
})(writeForeignFieldsNilRowR)()()().writeImplFields($$Proxy)({
  anyOf: [
    writeForeignFieldsCons1.writeImplFields($$Proxy)({ type: "null" })({}),
    writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
      reflectSymbol: () => "properties"
    })((() => {
      const $0 = writeForeignFieldsCons(backgroundIsSymbol)(writeForeignRecord1)(writeForeignFieldsCons(idIsSymbol)(writeForeignRecord1)(writeForeignFieldsCons(pathIsSymbol)(writeForeignRecord1)(writeForeignFieldsNilRowR)()()())()()())()()();
      return { writeImpl: (rec) => $0.writeImplFields($$Proxy)(rec)({}) };
    })())(writeForeignFieldsCons4)()()())()()().writeImplFields($$Proxy)({
      type: "object",
      properties: { id: { type: "string" }, path: { type: "string" }, background: { type: "boolean" } },
      required: ["id", "path", "background"],
      additionalProperties: false
    })({})
  ]
})({}))();
var heartbeatSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
  reflectSymbol: () => "properties"
})((() => {
  const $0 = writeForeignFieldsCons({ reflectSymbol: () => "clientId" })(writeForeignRecord1)(writeForeignFieldsCons8)()()();
  return { writeImpl: (rec) => $0.writeImplFields($$Proxy)(rec)({}) };
})())(writeForeignFieldsCons4)()()())()()().writeImplFields($$Proxy)({
  type: "object",
  properties: { requestId: { type: "string" }, clientId: { type: "string" } },
  required: ["requestId", "clientId"],
  additionalProperties: false
})({}))();
var emptyObjectSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
  reflectSymbol: () => "properties"
})({ writeImpl: (rec) => ({}) })(writeForeignFieldsCons1)()()())()()().writeImplFields($$Proxy)({ type: "object", properties: {}, additionalProperties: false })({}))();
var decodeEffect = (dictReadForeign) => (value) => {
  const v = dictReadForeign.readImpl(value);
  if (v.tag === "Left") {
    return throwException(error(show(v._1)));
  }
  if (v.tag === "Right") {
    const $0 = v._1;
    return () => $0;
  }
  fail();
};
var decodeEffect1 = /* @__PURE__ */ decodeEffect(/* @__PURE__ */ (() => {
  const $0 = readForeignFieldsCons(sessionIdIsSymbol)(readForeignString)(readForeignFieldsNilRowRo)()();
  return {
    readImpl: (o) => {
      const $1 = $0.getFields($$Proxy)(o);
      if ($1.tag === "Left") {
        return $Either("Left", $1._1);
      }
      if ($1.tag === "Right") {
        return $Either("Right", $1._1({}));
      }
      fail();
    }
  };
})());
var listen2 = (client2) => (announce) => listen(client2)("announce")((payload) => {
  const $0 = decodeEffect1(payload);
  return () => {
    const decoded = $0();
    return announce(decoded.sessionId)();
  };
});
var decode = (dictReadForeign) => (value) => {
  const v = dictReadForeign.readImpl(value);
  if (v.tag === "Left") {
    return _throwError(error(show(v._1)));
  }
  if (v.tag === "Right") {
    return _pure(v._1);
  }
  fail();
};
var decode1 = /* @__PURE__ */ decode(/* @__PURE__ */ readForeignNullable(/* @__PURE__ */ (() => {
  const $0 = readForeignFieldsCons(backgroundIsSymbol)(readForeignBoolean)(readForeignFieldsCons(idIsSymbol)(readForeignString)(readForeignFieldsCons(pathIsSymbol)(readForeignString)(readForeignFieldsNilRowRo)()())()())()();
  return {
    readImpl: (o) => {
      const $1 = $0.getFields($$Proxy)(o);
      if ($1.tag === "Left") {
        return $Either("Left", $1._1);
      }
      if ($1.tag === "Right") {
        return $Either("Right", $1._1({}));
      }
      fail();
    }
  };
})()));
var completeSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
  reflectSymbol: () => "properties"
})((() => {
  const $0 = writeForeignFieldsCons({ reflectSymbol: () => "clientId" })(writeForeignRecord1)(writeForeignFieldsCons({ reflectSymbol: () => "error" })((() => {
    const $02 = writeForeignFieldsCons({ reflectSymbol: () => "type" })(writeForeignArray)(writeForeignFieldsNilRowR)()()();
    return { writeImpl: (rec) => $02.writeImplFields($$Proxy)(rec)({}) };
  })())(writeForeignFieldsCons8)()()())()()();
  return { writeImpl: (rec) => $0.writeImplFields($$Proxy)(rec)({}) };
})())(writeForeignFieldsCons4)()()())()()().writeImplFields($$Proxy)({
  type: "object",
  properties: { requestId: { type: "string" }, clientId: { type: "string" }, error: { type: ["string", "null"] } },
  required: ["requestId", "clientId", "error"],
  additionalProperties: false
})({}))();
var claimSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
  reflectSymbol: () => "properties"
})((() => {
  const $0 = writeForeignFieldsCons({ reflectSymbol: () => "clientId" })(writeForeignRecord1)(writeForeignFieldsCons({ reflectSymbol: () => "hostname" })(writeForeignRecord1)(writeForeignFieldsCons12)()()())()()();
  return { writeImpl: (rec) => $0.writeImplFields($$Proxy)(rec)({}) };
})())(writeForeignFieldsCons4)()()())()()().writeImplFields($$Proxy)({
  type: "object",
  properties: { clientId: { type: "string" }, sessionId: { type: "string" }, hostname: { type: "string" } },
  required: ["clientId", "sessionId", "hostname"],
  additionalProperties: false
})({}))();
var call2 = (client2) => (method) => (input) => _bind(_sequential(_parAffAlt($$try2(call(client2)(method)(input)))((() => {
  const $0 = $Either("Left", error("OpenCode playback RPC timed out: " + method));
  return _map((v) => $0)(_delay(Right, 5000));
})())))((result) => {
  if (result.tag === "Left") {
    return _throwError(result._1);
  }
  if (result.tag === "Right") {
    return _pure(result._1);
  }
  fail();
});
var claim = (client2) => (request) => _bind(call2(client2)("claim")(write1(request)))((response) => _bind(decode1(response))((decoded) => _pure(nullable(decoded, Nothing, Just))));
var complete = (client2) => (requestId) => (clientId) => (failure) => _map((v) => {})(call2(client2)("complete")(write22({ requestId, clientId, error: failure })));
var heartbeat = (client2) => (requestId) => (clientId) => _bind(call2(client2)("heartbeat")(write3({ requestId, clientId })))((response) => decode(readForeignBoolean)(response));
var booleanSchema = /* @__PURE__ */ (() => writeForeignFieldsCons1.writeImplFields($$Proxy)({ type: "boolean" })({}))();
var announcementSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
  reflectSymbol: () => "properties"
})({ writeImpl: (rec) => writeForeignFieldsCons12.writeImplFields($$Proxy)(rec)({}) })(writeForeignFieldsCons4)()()())()()().writeImplFields($$Proxy)({
  type: "object",
  properties: { sessionId: { type: "string" } },
  required: ["sessionId"],
  additionalProperties: false
})({}))();
var contract = /* @__PURE__ */ define({
  id: "markgraf.playback",
  methods: [
    { name: "claim", inputSchema: claimSchema, outputSchema: nullableRequestSchema },
    { name: "heartbeat", inputSchema: heartbeatSchema, outputSchema: booleanSchema },
    { name: "complete", inputSchema: completeSchema, outputSchema: emptyObjectSchema }
  ],
  events: [{ name: "announce", schema: announcementSchema }]
});

// output-es/Node.Encoding/index.js
var $Encoding = (tag) => tag;
var UTF8 = /* @__PURE__ */ $Encoding("UTF8");
var Base64 = /* @__PURE__ */ $Encoding("Base64");

// output-es/Node.OS/foreign.js
import {
  EOL,
  arch,
  constants,
  cpus,
  devNull,
  endianness,
  freemem,
  getPriority,
  homedir,
  hostname,
  loadavg,
  machine,
  networkInterfaces,
  release,
  setPriority,
  tmpdir,
  totalmem,
  type,
  uptime,
  userInfo,
  version
} from "node:os";

// output-es/Node.OS/index.js
var $Arch = (tag, _1) => ({ tag, _1 });
var Arm = /* @__PURE__ */ $Arch("Arm");
var Arm64 = /* @__PURE__ */ $Arch("Arm64");
var Ia32 = /* @__PURE__ */ $Arch("Ia32");
var MIPS = /* @__PURE__ */ $Arch("MIPS");
var MIPSEL = /* @__PURE__ */ $Arch("MIPSEL");
var PPC = /* @__PURE__ */ $Arch("PPC");
var PPC64 = /* @__PURE__ */ $Arch("PPC64");
var S390 = /* @__PURE__ */ $Arch("S390");
var S390X = /* @__PURE__ */ $Arch("S390X");
var X32 = /* @__PURE__ */ $Arch("X32");
var X64 = /* @__PURE__ */ $Arch("X64");
var arch2 = () => {
  const a$p = arch();
  if (a$p === "arm") {
    return Arm;
  }
  if (a$p === "arm64") {
    return Arm64;
  }
  if (a$p === "ia32") {
    return Ia32;
  }
  if (a$p === "mips") {
    return MIPS;
  }
  if (a$p === "mipsel") {
    return MIPSEL;
  }
  if (a$p === "ppc") {
    return PPC;
  }
  if (a$p === "ppc64") {
    return PPC64;
  }
  if (a$p === "s390") {
    return S390;
  }
  if (a$p === "s390x") {
    return S390X;
  }
  if (a$p === "x32") {
    return X32;
  }
  if (a$p === "x64") {
    return X64;
  }
  return $Arch("UnknownArch", a$p);
};

// output-es/Node.Path/foreign.js
import path from "node:path";
var normalize = path.normalize;
function concat2(segments) {
  return path.join.apply(this, segments);
}
function resolve2(from) {
  return (to) => () => path.resolve.apply(this, from.concat([to]));
}
var basename = path.basename;
var extname = path.extname;
var sep = path.sep;
var delimiter = path.delimiter;
var parse2 = path.parse;
var isAbsolute = path.isAbsolute;
// output-es/OpenCode.Server/foreign.js
import { Plugin } from "@opencode/plugin";
var define2 = (definition) => Plugin.define({
  id: definition.id,
  setup: (context) => definition.setup(context)().then((cleanup) => async () => {
    await cleanup();
  })
});
var locationDirectory = (context) => () => context.location.directory;
var registerTool = (context) => (tool) => () => context.tool.transform((editor) => {
  editor.add({
    name: tool.name,
    description: tool.description,
    input: tool.inputSchema,
    execute: (input, execution) => tool.execute(input)(execution)()
  });
}).then((registration) => async () => {
  await registration.dispose();
});
var sessionId = (context) => context.sessionID;
var onAbort = (context) => (callback) => () => {
  const signal = context.signal;
  let removed = false;
  const remove = () => {
    if (!removed) {
      removed = true;
      signal.removeEventListener("abort", listener);
    }
  };
  const listener = () => {
    remove();
    callback();
  };
  if (signal.aborted)
    listener();
  else
    signal.addEventListener("abort", listener, { once: true });
  return remove;
};
var success = (message2) => ({ content: message2 });
// output-es/Yoga.WebProletarian.Runtime/foreign.js
var monotonicNowMilliseconds = () => globalThis.performance.now();
// output-es/Markgraf.OpenCode.Server/index.js
var backgroundIsSymbol2 = { reflectSymbol: () => "background" };
var writeForeignFieldsCons13 = /* @__PURE__ */ writeForeignFieldsCons({ reflectSymbol: () => "type" })(writeForeignString)(writeForeignFieldsNilRowR)()()();
var writeForeignRecord12 = { writeImpl: (rec) => writeForeignFieldsCons13.writeImplFields($$Proxy)(rec)({}) };
var pathIsSymbol2 = { reflectSymbol: () => "path" };
var lookup = (k) => {
  const go = (go$a0$copy) => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "Leaf") {
        go$c = false;
        go$r = Nothing;
        continue;
      }
      if (v.tag === "Node") {
        const v1 = ordString.compare(k)(v._3);
        if (v1 === "LT") {
          go$a0 = v._5;
          continue;
        }
        if (v1 === "GT") {
          go$a0 = v._6;
          continue;
        }
        if (v1 === "EQ") {
          go$c = false;
          go$r = $Maybe("Just", v._4);
          continue;
        }
      }
      fail();
    }
    return go$r;
  };
  return go;
};
var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMap);
var show2 = /* @__PURE__ */ (() => showNonEmptyList(showForeignError).show)();
var traverse_2 = /* @__PURE__ */ traverse_(applicativeAff)(foldableMaybe);
var readForeignFieldsCons2 = /* @__PURE__ */ readForeignFieldsCons({ reflectSymbol: () => "clientId" })(readForeignString);
var sessionIdIsSymbol2 = { reflectSymbol: () => "sessionId" };
var write4 = /* @__PURE__ */ (() => writeForeignNullable((() => {
  const $0 = writeForeignFieldsCons(backgroundIsSymbol2)(writeForeignBoolean)(writeForeignFieldsCons({ reflectSymbol: () => "id" })(writeForeignString)(writeForeignFieldsCons(pathIsSymbol2)(writeForeignString)(writeForeignFieldsNilRowR)()()())()()())()()();
  return { writeImpl: (rec) => $0.writeImplFields($$Proxy)(rec)({}) };
})()).writeImpl)();
var readForeignFieldsCons1 = /* @__PURE__ */ readForeignFieldsCons({ reflectSymbol: () => "requestId" })(readForeignString)(readForeignFieldsNilRowRo)()();
var for_1 = /* @__PURE__ */ for_(applicativeAff);
var for_22 = /* @__PURE__ */ for_1(foldableMaybe);
var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
var write32 = /* @__PURE__ */ (() => {
  const $0 = writeForeignFieldsCons(sessionIdIsSymbol2)(writeForeignString)(writeForeignFieldsNilRowR)()()();
  return (rec) => $0.writeImplFields($$Proxy)(rec)({});
})();
var for_3 = /* @__PURE__ */ for_1(foldableMap);
var toolInputSchema = /* @__PURE__ */ (() => writeForeignFieldsCons({ reflectSymbol: () => "additionalProperties" })(writeForeignBoolean)(writeForeignFieldsCons({
  reflectSymbol: () => "properties"
})((() => {
  const $0 = writeForeignFieldsCons(backgroundIsSymbol2)(writeForeignRecord12)(writeForeignFieldsCons(pathIsSymbol2)(writeForeignRecord12)(writeForeignFieldsNilRowR)()()())()()();
  return { writeImpl: (rec) => $0.writeImplFields($$Proxy)(rec)({}) };
})())(writeForeignFieldsCons({ reflectSymbol: () => "required" })({ writeImpl: (xs) => arrayMap(unsafeCoerce)(xs) })(writeForeignFieldsCons13)()()())()()())()()().writeImplFields($$Proxy)({
  type: "object",
  properties: { path: { type: "string" }, background: { type: "boolean" } },
  required: ["path"],
  additionalProperties: false
})({}))();
var takeRequest = (state) => (requestId) => modifyImpl((requests) => ({ state: $$delete(ordString)(requestId)(requests), value: lookup(requestId)(requests) }))(state.requests);
var heartbeatRequest = (state) => (requestId) => (clientId) => _bind(_liftEffect(monotonicNowMilliseconds))((now2) => _liftEffect(modifyImpl((requests) => {
  const v = lookup(requestId)(requests);
  if (v.tag === "Just" && (v._1.owner.tag === "Nothing" ? false : v._1.owner.tag === "Just" && v._1.owner._1 === clientId) && v._1.leaseUntil > now2) {
    return { state: insert(ordString)(requestId)({ ...v._1, leaseUntil: now2 + 5000 })(requests), value: true };
  }
  return { state: requests, value: false };
})(state.requests)));
var failAll = (state) => (reason) => {
  const $0 = modifyImpl((current) => ({ state: Leaf, value: current }))(state.requests);
  return () => {
    const requests = $0();
    return for_2(requests)((entry) => entry.finish($Maybe("Just", reason)))();
  };
};
var decode2 = (dictReadForeign) => (value) => {
  const v = dictReadForeign.readImpl(value);
  if (v.tag === "Left") {
    return _throwError(error(show2(v._1)));
  }
  if (v.tag === "Right") {
    return _pure(v._1);
  }
  fail();
};
var decode12 = /* @__PURE__ */ decode2(/* @__PURE__ */ (() => {
  const $0 = readForeignFieldsCons2(readForeignFieldsCons({ reflectSymbol: () => "hostname" })(readForeignString)(readForeignFieldsCons(sessionIdIsSymbol2)(readForeignString)(readForeignFieldsNilRowRo)()())()())()();
  return {
    readImpl: (o) => {
      const $1 = $0.getFields($$Proxy)(o);
      if ($1.tag === "Left") {
        return $Either("Left", $1._1);
      }
      if ($1.tag === "Right") {
        return $Either("Right", $1._1({}));
      }
      fail();
    }
  };
})());
var decode22 = /* @__PURE__ */ decode2(/* @__PURE__ */ (() => {
  const $0 = readForeignFieldsCons2(readForeignFieldsCons1)()();
  return {
    readImpl: (o) => {
      const $1 = $0.getFields($$Proxy)(o);
      if ($1.tag === "Left") {
        return $Either("Left", $1._1);
      }
      if ($1.tag === "Right") {
        return $Either("Right", $1._1({}));
      }
      fail();
    }
  };
})());
var decode3 = /* @__PURE__ */ decode2(/* @__PURE__ */ (() => {
  const $0 = readForeignFieldsCons2(readForeignFieldsCons({ reflectSymbol: () => "error" })(readForeignNullable(readForeignString))(readForeignFieldsCons1)()())()();
  return {
    readImpl: (o) => {
      const $1 = $0.getFields($$Proxy)(o);
      if ($1.tag === "Left") {
        return $Either("Left", $1._1);
      }
      if ($1.tag === "Right") {
        return $Either("Right", $1._1({}));
      }
      fail();
    }
  };
})());
var decode4 = /* @__PURE__ */ decode2(/* @__PURE__ */ (() => {
  const $0 = readForeignFieldsCons(backgroundIsSymbol2)(readForeignNullable(readForeignBoolean))(readForeignFieldsCons(pathIsSymbol2)(readForeignString)(readForeignFieldsNilRowRo)()())()();
  return {
    readImpl: (o) => {
      const $1 = $0.getFields($$Proxy)(o);
      if ($1.tag === "Left") {
        return $Either("Left", $1._1);
      }
      if ($1.tag === "Right") {
        return $Either("Right", $1._1({}));
      }
      fail();
    }
  };
})());
var completeRequest = (state) => (requestId) => (clientId) => (result) => _bind(_liftEffect(monotonicNowMilliseconds))((now2) => _bind(_liftEffect(modifyImpl((requests) => {
  const v = lookup(requestId)(requests);
  if (v.tag === "Just" && (v._1.owner.tag === "Nothing" ? false : v._1.owner.tag === "Just" && v._1.owner._1 === clientId)) {
    return { state: $$delete(ordString)(requestId)(requests), value: $Maybe("Just", v._1) };
  }
  return { state: requests, value: Nothing };
})(state.requests)))((entry) => traverse_2((current) => _liftEffect(current.finish(current.leaseUntil <= now2 ? $Maybe("Just", (() => {
  if (current.owner.tag === "Nothing") {
    return "No active local Markgraf TUI claimed this request within 5 seconds.";
  }
  if (current.owner.tag === "Just") {
    return "The local Markgraf TUI stopped heartbeating before playback closed.";
  }
  fail();
})()) : result)))(entry)));
var claimMatching = (now2) => (claimant) => (requests) => {
  const go = (z$p, m$p) => {
    if (m$p.tag === "Leaf") {
      return z$p;
    }
    if (m$p.tag === "Node") {
      return go((() => {
        const $0 = go(z$p, m$p._5);
        if ($0.tag === "Just") {
          return $0;
        }
        if ($0.tag === "Nothing") {
          if (m$p._4.owner.tag === "Nothing" && m$p._4.leaseUntil > now2 && m$p._4.request.sessionId === claimant.sessionId) {
            return $Maybe("Just", m$p._4);
          }
          return Nothing;
        }
        fail();
      })(), m$p._6);
    }
    fail();
  };
  const v = go(Nothing, requests);
  if (v.tag === "Nothing") {
    return { state: requests, value: Nothing };
  }
  if (v.tag === "Just") {
    const request = { id: v._1.request.id, path: v._1.request.path, background: v._1.request.background };
    return {
      state: insert(ordString)(request.id)({ ...v._1, owner: $Maybe("Just", claimant.clientId), leaseUntil: now2 + 5000 })(requests),
      value: $Maybe("Just", request)
    };
  }
  fail();
};
var claimRequest = (state) => (claimant) => _bind((() => {
  const $0 = claimant.hostname === state.hostname;
  const $1 = _throwError(error("markgraf_play cannot send a server path to a TUI on another host."));
  if (!$0) {
    return $1;
  }
  if ($0) {
    return _pure();
  }
  fail();
})())(() => _bind(_liftEffect(monotonicNowMilliseconds))((now2) => _liftEffect(modifyImpl(claimMatching(now2)(claimant))(state.requests))));
var handlers = (state) => [
  {
    name: "claim",
    handler: (input) => (v) => fromAff()(_bind(decode12(input))((request) => _bind(claimRequest(state)(request))((claimed) => _pure(write4((() => {
      if (claimed.tag === "Nothing") {
        return nullImpl;
      }
      if (claimed.tag === "Just") {
        return notNull(claimed._1);
      }
      fail();
    })())))))
  },
  {
    name: "heartbeat",
    handler: (input) => (v) => fromAff()(_bind(decode22(input))((request) => _bind(heartbeatRequest(state)(request.requestId)(request.clientId))((active) => _pure(active))))
  },
  {
    name: "complete",
    handler: (input) => (v) => fromAff()(_bind(decode3(input))((request) => _bind(completeRequest(state)(request.requestId)(request.clientId)(nullable(request.error, Nothing, Just)))(() => _pure({}))))
  }
];
var announce = (state) => (sessionId2) => _bind(_liftEffect((() => {
  const $0 = state.registration;
  return () => $0.value;
})()))((registration) => for_22(registration)((current) => _bind($$try3(_bind(_liftEffect(emit(current)("announce")(write32({ sessionId: sessionId2 }))))(toAff$p(coerce))))((sent) => {
  if (sent.tag === "Right") {
    return _pure();
  }
  if (sent.tag === "Left") {
    return _liftEffect(failAll(state)("Cannot notify the local Markgraf TUI: " + message(sent._1)));
  }
  fail();
})));
var cancelRequest = (state) => (requestId) => (sessionId2) => (reason) => _bind(_liftEffect(takeRequest(state)(requestId)))((entry) => _bind(traverse_2((current) => _liftEffect(current.finish($Maybe("Just", reason))))(entry))(() => {
  const $0 = announce(state)(sessionId2);
  if ((() => {
    if (entry.tag === "Nothing") {
      return false;
    }
    if (entry.tag === "Just") {
      return true;
    }
    fail();
  })()) {
    return $0;
  }
  return _pure();
}));
var expire = (state) => _bind(_liftEffect(monotonicNowMilliseconds))((now2) => _bind(_liftEffect((() => {
  const $0 = state.requests;
  return () => $0.value;
})()))((snapshot) => for_3(snapshot)((candidate) => _bind(_liftEffect(modifyImpl((requests) => {
  const v = lookup(candidate.request.id)(requests);
  if (v.tag === "Just" && v._1.leaseUntil <= now2) {
    return { state: $$delete(ordString)(candidate.request.id)(requests), value: $Maybe("Just", v._1) };
  }
  return { state: requests, value: Nothing };
})(state.requests)))((expired) => for_22(expired)((entry) => _bind(_liftEffect(entry.finish($Maybe("Just", (() => {
  if (entry.owner.tag === "Nothing") {
    return "No active local Markgraf TUI claimed this request within 5 seconds.";
  }
  if (entry.owner.tag === "Just") {
    return "The local Markgraf TUI stopped heartbeating before playback closed.";
  }
  fail();
})()))))(() => announce(state)(entry.request.sessionId)))))));
var waitForPlayback = (state) => (execution) => (request) => makeAff((resolve3) => {
  const $0 = state.closed;
  return () => {
    const closed = $0.value;
    if (closed) {
      resolve3($Either("Left", error("The Markgraf playback server has closed.")))();
      return nonCanceler;
    }
    let finished = false;
    let removeAbortRef = () => {};
    const now2 = monotonicNowMilliseconds();
    const $1 = state.requests.value;
    state.requests.value = insert(ordString)(request.id)({
      request,
      leaseUntil: now2 + 5000,
      owner: Nothing,
      finish: (reason) => () => {
        const alreadyFinished = finished;
        if (!alreadyFinished) {
          finished = true;
          const $2 = removeAbortRef;
          $2();
          return resolve3((() => {
            if (reason.tag === "Nothing") {
              return $Either("Right", undefined);
            }
            if (reason.tag === "Just") {
              return $Either("Left", error(reason._1));
            }
            fail();
          })())();
        }
        if (alreadyFinished) {
          return;
        }
        fail();
      }
    })($1);
    const removeAbort = onAbort(execution)((() => {
      const $2 = _makeFiber(ffiUtil, cancelRequest(state)(request.id)(request.sessionId)("markgraf_play was cancelled before local playback closed."));
      return () => {
        const fiber2 = $2();
        fiber2.run();
      };
    })())();
    removeAbortRef = removeAbort;
    const fiber = _makeFiber(ffiUtil, announce(state)(request.sessionId))();
    fiber.run();
    return (v) => applyAff.apply(_map((v$1) => identity)(_liftEffect(removeAbort)))(cancelRequest(state)(request.id)(request.sessionId)("markgraf_play wait was cancelled."));
  };
});
var tool = (state) => (context) => ({
  name: "markgraf_play",
  description: "Play a Markgraf animation inline in the active local OpenCode TUI and wait for it to close.",
  inputSchema: toolInputSchema,
  execute: (input) => (execution) => fromAff()(_bind(decode4(input))((request) => {
    const requestedPath = trim(request.path);
    return _bind((() => {
      const $0 = _throwError(error("markgraf_play requires a non-empty animation path."));
      if (requestedPath === "") {
        return $0;
      }
      return _pure();
    })())(() => _bind(_liftEffect(locationDirectory(context)))((cwd) => _bind(_liftEffect(resolve2([cwd])(requestedPath)))((absolutePath) => _bind(_liftEffect((() => {
      const $0 = state.nextId;
      return () => {
        const $1 = $0.value;
        return $0.value = $1 + 1 | 0;
      };
    })()))((serial) => _bind(waitForPlayback(state)(execution)({
      id: "markgraf-playback-" + state.nonce + "-" + showIntImpl(serial),
      path: absolutePath,
      background: (() => {
        const $0 = nullable(request.background, Nothing, Just);
        if ($0.tag === "Nothing") {
          return false;
        }
        if ($0.tag === "Just") {
          return $0._1;
        }
        fail();
      })(),
      sessionId: sessionId(execution)
    }))(() => _pure(success("Closed inline Markgraf playback: " + absolutePath)))))));
  }))
});
var setup = (context) => fromAff()(_bind(_liftEffect(hostname))((hostname2) => _bind(_liftEffect(randomInt(1e5)(2147483646)))((firstNonce) => _bind(_liftEffect(randomInt(1e5)(2147483646)))((secondNonce) => {
  const nonce = showIntImpl(firstNonce) + "-" + showIntImpl(secondNonce);
  return _bind(_liftEffect(() => ({ value: Leaf })))((requests) => _bind(_liftEffect(() => ({ value: false })))((closed) => _bind(_liftEffect(() => ({ value: 0 })))((nextId) => _bind(_liftEffect(() => ({ value: Nothing })))((registrationRef) => {
    const state = { requests, closed, nextId, nonce, hostname: hostname2, registration: registrationRef };
    return _bind(_bind(_liftEffect(register(context)(contract)(handlers(state))))(toAff$p(coerce)))((registration) => _bind(_liftEffect(() => registrationRef.value = $Maybe("Just", registration)))(() => _bind($$try3(_bind(_liftEffect(registerTool(context)(tool(state)(context))))(toAff$p(coerce))))((toolCleanupResult) => _bind((() => {
      if (toolCleanupResult.tag === "Left") {
        const $0 = toolCleanupResult._1;
        return _bind(_map((v) => {})($$try3(_bind(_liftEffect(dispose(registration)))(toAff$p(coerce)))))(() => _throwError($0));
      }
      if (toolCleanupResult.tag === "Right") {
        return _pure(toolCleanupResult._1);
      }
      fail();
    })())((toolCleanup) => _bind(_liftEffect(setIntervalImpl(250)((() => {
      const $0 = _makeFiber(ffiUtil, expire(state));
      return () => {
        const fiber = $0();
        fiber.run();
      };
    })())))((timer) => _pure((() => {
      const $0 = clearIntervalImpl(timer);
      return () => {
        $0();
        closed.value = true;
        registrationRef.value = Nothing;
        return fromAff()(_bind(_liftEffect(failAll(state)("Markgraf playback server reloaded before playback completed.")))(() => _bind($$try3(_bind(_liftEffect(toolCleanup))(toAff$p(coerce))))((toolResult) => _bind($$try3(_bind(_liftEffect(dispose(registration)))(toAff$p(coerce))))((registrationResult) => {
          if (toolResult.tag === "Left") {
            return _throwError(toolResult._1);
          }
          if (toolResult.tag === "Right") {
            if (registrationResult.tag === "Left") {
              return _throwError(registrationResult._1);
            }
            if (registrationResult.tag === "Right") {
              return _pure();
            }
          }
          fail();
        }))))();
      };
    })()))))));
  }))));
}))));
var plugin = /* @__PURE__ */ define2({ id: "markgraf.playback", setup });

// agents/index.js
var agents_default = plugin;
export {
  agents_default as default
};
