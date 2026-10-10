// npm/output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};
var compose = function(dict) {
  return dict.compose;
};

// npm/output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// npm/output/Data.Boolean/index.js
var otherwise = true;
// npm/output/Data.Function/index.js
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// npm/output/Data.Functor/foreign.js
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

// npm/output/Data.Unit/foreign.js
var unit = undefined;
// npm/output/Type.Proxy/index.js
var $$Proxy = /* @__PURE__ */ function() {
  function $$Proxy2() {}
  $$Proxy2.value = new $$Proxy2;
  return $$Proxy2;
}();

// npm/output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return function(fa) {
    return function(f) {
      return map1(f)(fa);
    };
  };
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var voidLeft = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return function(f) {
    return function(x) {
      return map1($$const(x))(f);
    };
  };
};
var voidRight = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return function(x) {
    return map1($$const(x));
  };
};
var functorFn = {
  map: /* @__PURE__ */ compose(semigroupoidFn)
};
var functorArray = {
  map: arrayMap
};

// npm/output/Control.Apply/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var apply = function(dict) {
  return dict.apply;
};
var applySecond = function(dictApply) {
  var apply1 = apply(dictApply);
  var map2 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map2($$const(identity2))(a))(b);
    };
  };
};

// npm/output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var unless = function(dictApplicative) {
  var pure1 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (!v) {
        return v1;
      }
      if (v) {
        return pure1(unit);
      }
      throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var when = function(dictApplicative) {
  var pure1 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (v) {
        return v1;
      }
      if (!v) {
        return pure1(unit);
      }
      throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var liftA1 = function(dictApplicative) {
  var apply2 = apply(dictApplicative.Apply0());
  var pure1 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply2(pure1(f))(a);
    };
  };
};

// npm/output/Control.Bind/foreign.js
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
// npm/output/Control.Bind/index.js
var discard = function(dict) {
  return dict.discard;
};
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var composeKleisliFlipped = function(dictBind) {
  var bindFlipped1 = bindFlipped(dictBind);
  return function(f) {
    return function(g) {
      return function(a) {
        return bindFlipped1(f)(g(a));
      };
    };
  };
};
var discardUnit = {
  discard: function(dictBind) {
    return bind(dictBind);
  }
};

// npm/output/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
var concatArray = function(xs) {
  return function(ys) {
    if (xs.length === 0)
      return ys;
    if (ys.length === 0)
      return xs;
    return xs.concat(ys);
  };
};

// npm/output/Data.Symbol/index.js
var reflectSymbol = function(dict) {
  return dict.reflectSymbol;
};

// npm/output/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
// npm/output/Data.Semigroup/index.js
var semigroupString = {
  append: concatString
};
var semigroupArray = {
  append: concatArray
};
var append = function(dict) {
  return dict.append;
};
// npm/output/Control.Alt/index.js
var alt = function(dict) {
  return dict.alt;
};

// npm/output/Data.Bounded/foreign.js
var topInt = 2147483647;
var bottomInt = -2147483648;
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// npm/output/Data.Ord/foreign.js
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
var ordCharImpl = unsafeCompareImpl;

// npm/output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqBooleanImpl = refEq;
var eqIntImpl = refEq;
var eqNumberImpl = refEq;
var eqCharImpl = refEq;
var eqStringImpl = refEq;

// npm/output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqRowNil = {
  eqRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return true;
      };
    };
  }
};
var eqRecord = function(dict) {
  return dict.eqRecord;
};
var eqRec = function() {
  return function(dictEqRecord) {
    return {
      eq: eqRecord(dictEqRecord)($$Proxy.value)
    };
  };
};
var eqNumber = {
  eq: eqNumberImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eqChar = {
  eq: eqCharImpl
};
var eqBoolean = {
  eq: eqBooleanImpl
};
var eq = function(dict) {
  return dict.eq;
};
var eq2 = /* @__PURE__ */ eq(eqBoolean);
var eqRowCons = function(dictEqRecord) {
  var eqRecord1 = eqRecord(dictEqRecord);
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictEq) {
        var eq3 = eq(dictEq);
        return {
          eqRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail = eqRecord1($$Proxy.value)(ra)(rb);
                var key = reflectSymbol2($$Proxy.value);
                var get = unsafeGet(key);
                return eq3(get(ra))(get(rb)) && tail;
              };
            };
          }
        };
      };
    };
  };
};
var notEq = function(dictEq) {
  var eq3 = eq(dictEq);
  return function(x) {
    return function(y) {
      return eq2(eq3(x)(y))(false);
    };
  };
};

// npm/output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {}
  LT2.value = new LT2;
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {}
  GT2.value = new GT2;
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {}
  EQ2.value = new EQ2;
  return EQ2;
}();

// npm/output/Data.Ring/foreign.js
var intSub = function(x) {
  return function(y) {
    return x - y | 0;
  };
};

// npm/output/Data.Semiring/foreign.js
var intAdd = function(x) {
  return function(y) {
    return x + y | 0;
  };
};
var intMul = function(x) {
  return function(y) {
    return x * y | 0;
  };
};

// npm/output/Data.Semiring/index.js
var semiringInt = {
  add: intAdd,
  zero: 0,
  mul: intMul,
  one: 1
};
// npm/output/Data.Ring/index.js
var ringInt = {
  sub: intSub,
  Semiring0: function() {
    return semiringInt;
  }
};
// npm/output/Data.Ord/index.js
var ordString = /* @__PURE__ */ function() {
  return {
    compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqString;
    }
  };
}();
var ordNumber = /* @__PURE__ */ function() {
  return {
    compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqNumber;
    }
  };
}();
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var ordChar = /* @__PURE__ */ function() {
  return {
    compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqChar;
    }
  };
}();
var compare = function(dict) {
  return dict.compare;
};
var max = function(dictOrd) {
  var compare3 = compare(dictOrd);
  return function(x) {
    return function(y) {
      var v = compare3(x)(y);
      if (v instanceof LT) {
        return y;
      }
      if (v instanceof EQ) {
        return x;
      }
      if (v instanceof GT) {
        return x;
      }
      throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
    };
  };
};
var min = function(dictOrd) {
  var compare3 = compare(dictOrd);
  return function(x) {
    return function(y) {
      var v = compare3(x)(y);
      if (v instanceof LT) {
        return x;
      }
      if (v instanceof EQ) {
        return x;
      }
      if (v instanceof GT) {
        return y;
      }
      throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
    };
  };
};
var clamp = function(dictOrd) {
  var min1 = min(dictOrd);
  var max1 = max(dictOrd);
  return function(low) {
    return function(hi) {
      return function(x) {
        return min1(hi)(max1(low)(x));
      };
    };
  };
};
// npm/output/Data.Bounded/index.js
var top = function(dict) {
  return dict.top;
};
var boundedInt = {
  top: topInt,
  bottom: bottomInt,
  Ord0: function() {
    return ordInt;
  }
};
var boundedChar = {
  top: topChar,
  bottom: bottomChar,
  Ord0: function() {
    return ordChar;
  }
};
var bottom = function(dict) {
  return dict.bottom;
};

// npm/output/Data.Show/foreign.js
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

// npm/output/Data.Show/index.js
var showString = {
  show: showStringImpl
};
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};

// npm/output/Data.Maybe/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {}
  Nothing2.value = new Nothing2;
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe$prime = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v(unit);
      }
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      throw new Error("Failed pattern match at Data.Maybe (line 250, column 1 - line 250, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      return Nothing.value;
    };
  }
};
var map2 = /* @__PURE__ */ map(functorMaybe);
var fromMaybe$prime = function(a) {
  return maybe$prime(a)(identity3);
};
var fromMaybe = function(a) {
  return maybe(a)(identity3);
};
var fromJust = function() {
  return function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
  };
};
var eqMaybe = function(dictEq) {
  var eq3 = eq(dictEq);
  return {
    eq: function(x) {
      return function(y) {
        if (x instanceof Nothing && y instanceof Nothing) {
          return true;
        }
        if (x instanceof Just && y instanceof Just) {
          return eq3(x.value0)(y.value0);
        }
        return false;
      };
    }
  };
};
var applyMaybe = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return map2(v.value0)(v1);
      }
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};
var bindMaybe = {
  bind: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Apply0: function() {
    return applyMaybe;
  }
};
var applicativeMaybe = /* @__PURE__ */ function() {
  return {
    pure: Just.create,
    Apply0: function() {
      return applyMaybe;
    }
  };
}();
var altMaybe = {
  alt: function(v) {
    return function(v1) {
      if (v instanceof Nothing) {
        return v1;
      }
      return v;
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};

// npm/output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var map3 = /* @__PURE__ */ map(functorEither);
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var hush = /* @__PURE__ */ function() {
  return either($$const(Nothing.value))(Just.create);
}();
var applyEither = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      if (v instanceof Right) {
        return map3(v.value0)(v1);
      }
      throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorEither;
  }
};
var bindEither = {
  bind: /* @__PURE__ */ either(function(e) {
    return function(v) {
      return new Left(e);
    };
  })(function(a) {
    return function(f) {
      return f(a);
    };
  }),
  Apply0: function() {
    return applyEither;
  }
};
var applicativeEither = /* @__PURE__ */ function() {
  return {
    pure: Right.create,
    Apply0: function() {
      return applyEither;
    }
  };
}();

// npm/output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};
// npm/output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind2 = bind(dictMonad.Bind1());
  var pure2 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind2(f)(function(f$prime) {
        return bind2(a)(function(a$prime) {
          return pure2(f$prime(a$prime));
        });
      });
    };
  };
};

// npm/output/Data.EuclideanRing/foreign.js
var intDegree = function(x) {
  return Math.min(Math.abs(x), 2147483647);
};
var intDiv = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
  };
};
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};
// npm/output/Data.CommutativeRing/index.js
var commutativeRingInt = {
  Ring0: function() {
    return ringInt;
  }
};

// npm/output/Data.EuclideanRing/index.js
var mod = function(dict) {
  return dict.mod;
};
var euclideanRingInt = {
  degree: intDegree,
  div: intDiv,
  mod: intMod,
  CommutativeRing0: function() {
    return commutativeRingInt;
  }
};
var div = function(dict) {
  return dict.div;
};

// npm/output/Data.Monoid/index.js
var monoidString = {
  mempty: "",
  Semigroup0: function() {
    return semigroupString;
  }
};
var monoidArray = {
  mempty: [],
  Semigroup0: function() {
    return semigroupArray;
  }
};
var mempty = function(dict) {
  return dict.mempty;
};

// npm/output/Effect/index.js
var $runtime_lazy = function(name, moduleName, init) {
  var state = 0;
  var val;
  return function(lineNumber) {
    if (state === 2)
      return val;
    if (state === 1)
      throw new ReferenceError(name + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state = 1;
    val = init();
    state = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

// npm/output/Effect.Exception/foreign.js
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

// npm/output/Effect.Exception/index.js
var pure2 = /* @__PURE__ */ pure(applicativeEffect);
var map4 = /* @__PURE__ */ map(functorEffect);
var $$try = function(action) {
  return catchException(function($3) {
    return pure2(Left.create($3));
  })(map4(Right.create)(action));
};
var $$throw = function($4) {
  return throwException(error($4));
};

// npm/output/Control.Monad.Error.Class/index.js
var throwError = function(dict) {
  return dict.throwError;
};
var catchError = function(dict) {
  return dict.catchError;
};
var $$try2 = function(dictMonadError) {
  var catchError1 = catchError(dictMonadError);
  var Monad0 = dictMonadError.MonadThrow0().Monad0();
  var map5 = map(Monad0.Bind1().Apply0().Functor0());
  var pure3 = pure(Monad0.Applicative0());
  return function(a) {
    return catchError1(map5(Right.create)(a))(function($52) {
      return pure3(Left.create($52));
    });
  };
};

// npm/output/Data.Foldable/foreign.js
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
// npm/output/Control.Plus/index.js
var empty = function(dict) {
  return dict.empty;
};
// npm/output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var snd = function(v) {
  return v.value1;
};
var fst = function(v) {
  return v.value0;
};

// npm/output/Data.Bifunctor/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var bimap = function(dict) {
  return dict.bimap;
};
var lmap = function(dictBifunctor) {
  var bimap1 = bimap(dictBifunctor);
  return function(f) {
    return bimap1(f)(identity4);
  };
};
var bifunctorEither = {
  bimap: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return new Left(v(v2.value0));
        }
        if (v2 instanceof Right) {
          return new Right(v1(v2.value0));
        }
        throw new Error("Failed pattern match at Data.Bifunctor (line 38, column 1 - line 40, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  }
};

// npm/output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};
// npm/output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// npm/output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var unwrap = function() {
  return coerce2;
};

// npm/output/Data.Foldable/index.js
var foldr = function(dict) {
  return dict.foldr;
};
var traverse_ = function(dictApplicative) {
  var applySecond2 = applySecond(dictApplicative.Apply0());
  var pure3 = pure(dictApplicative);
  return function(dictFoldable) {
    var foldr2 = foldr(dictFoldable);
    return function(f) {
      return foldr2(function($454) {
        return applySecond2(f($454));
      })(pure3(unit));
    };
  };
};
var for_ = function(dictApplicative) {
  var traverse_1 = traverse_(dictApplicative);
  return function(dictFoldable) {
    return flip(traverse_1(dictFoldable));
  };
};
var foldl = function(dict) {
  return dict.foldl;
};
var intercalate = function(dictFoldable) {
  var foldl2 = foldl(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(sep) {
      return function(xs) {
        var go = function(v) {
          return function(v1) {
            if (v.init) {
              return {
                init: false,
                acc: v1
              };
            }
            return {
              init: false,
              acc: append2(v.acc)(append2(sep)(v1))
            };
          };
        };
        return foldl2(go)({
          init: true,
          acc: mempty2
        })(xs).acc;
      };
    };
  };
};
var foldableMaybe = {
  foldr: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v1;
        }
        if (v2 instanceof Just) {
          return v(v2.value0)(v1);
        }
        throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  },
  foldl: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v1;
        }
        if (v2 instanceof Just) {
          return v(v1)(v2.value0);
        }
        throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  },
  foldMap: function(dictMonoid) {
    var mempty2 = mempty(dictMonoid);
    return function(v) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return mempty2;
        }
        if (v1 instanceof Just) {
          return v(v1.value0);
        }
        throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  }
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr2 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(f) {
      return foldr2(function(x) {
        return function(acc) {
          return append2(f(x))(acc);
        };
      })(mempty2);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};
var foldMap = function(dict) {
  return dict.foldMap;
};

// npm/output/Data.FunctorWithIndex/foreign.js
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

// npm/output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var bindIdentity = {
  bind: function(v) {
    return function(f) {
      return f(v);
    };
  },
  Apply0: function() {
    return applyIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};
var monadIdentity = {
  Applicative0: function() {
    return applicativeIdentity;
  },
  Bind1: function() {
    return bindIdentity;
  }
};

// npm/output/Data.FunctorWithIndex/index.js
var mapWithIndex = function(dict) {
  return dict.mapWithIndex;
};
var functorWithIndexArray = {
  mapWithIndex: mapWithIndexArray,
  Functor0: function() {
    return functorArray;
  }
};

// npm/output/Data.FoldableWithIndex/index.js
var foldr8 = /* @__PURE__ */ foldr(foldableArray);
var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
var foldl8 = /* @__PURE__ */ foldl(foldableArray);
var foldrWithIndex = function(dict) {
  return dict.foldrWithIndex;
};
var traverseWithIndex_ = function(dictApplicative) {
  var applySecond2 = applySecond(dictApplicative.Apply0());
  var pure3 = pure(dictApplicative);
  return function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(f) {
      return foldrWithIndex1(function(i) {
        var $289 = f(i);
        return function($290) {
          return applySecond2($289($290));
        };
      })(pure3(unit));
    };
  };
};
var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
  var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(f) {
      return foldrWithIndex1(function(i) {
        return function(x) {
          return function(acc) {
            return append2(f(i)(x))(acc);
          };
        };
      })(mempty2);
    };
  };
};
var foldableWithIndexArray = {
  foldrWithIndex: function(f) {
    return function(z) {
      var $291 = foldr8(function(v) {
        return function(y) {
          return f(v.value0)(v.value1)(y);
        };
      })(z);
      var $292 = mapWithIndex2(Tuple.create);
      return function($293) {
        return $291($292($293));
      };
    };
  },
  foldlWithIndex: function(f) {
    return function(z) {
      var $294 = foldl8(function(y) {
        return function(v) {
          return f(v.value0)(y)(v.value1);
        };
      })(z);
      var $295 = mapWithIndex2(Tuple.create);
      return function($296) {
        return $294($295($296));
      };
    };
  },
  foldMapWithIndex: function(dictMonoid) {
    return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
  },
  Foldable0: function() {
    return foldableArray;
  }
};

// npm/output/Data.Traversable/foreign.js
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
  return function(apply2) {
    return function(map5) {
      return function(pure3) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure3([]);
                case 1:
                  return map5(array1)(f(array[bot]));
                case 2:
                  return apply2(map5(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply2(apply2(map5(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply2(map5(concat2)(go(bot, pivot)))(go(pivot, top2));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();
// npm/output/Data.Traversable/index.js
var traverse = function(dict) {
  return dict.traverse;
};
var traversableMaybe = {
  traverse: function(dictApplicative) {
    var pure3 = pure(dictApplicative);
    var map5 = map(dictApplicative.Apply0().Functor0());
    return function(v) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return pure3(Nothing.value);
        }
        if (v1 instanceof Just) {
          return map5(Just.create)(v(v1.value0));
        }
        throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  },
  sequence: function(dictApplicative) {
    var pure3 = pure(dictApplicative);
    var map5 = map(dictApplicative.Apply0().Functor0());
    return function(v) {
      if (v instanceof Nothing) {
        return pure3(Nothing.value);
      }
      if (v instanceof Just) {
        return map5(Just.create)(v.value0);
      }
      throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name]);
    };
  },
  Functor0: function() {
    return functorMaybe;
  },
  Foldable1: function() {
    return foldableMaybe;
  }
};

// npm/output/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust2) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe2 = f(value);
              if (isNothing2(maybe2))
                return result;
              var tuple = fromJust2(maybe2);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// npm/output/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust2) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe2 = snd2(tuple);
              if (isNothing2(maybe2))
                return result;
              value = fromJust2(maybe2);
            }
          };
        };
      };
    };
  };
};

// npm/output/Data.Unfoldable1/index.js
var fromJust2 = /* @__PURE__ */ fromJust();
var unfoldable1Array = {
  unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
};
// npm/output/Data.Unfoldable/index.js
var fromJust3 = /* @__PURE__ */ fromJust();
var unfoldr = function(dict) {
  return dict.unfoldr;
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
  Unfoldable10: function() {
    return unfoldable1Array;
  }
};

// npm/output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var singleton2 = function(dictPlus) {
  var empty2 = empty(dictPlus);
  return function(a) {
    return new NonEmpty(a, empty2);
  };
};
var showNonEmpty = function(dictShow) {
  var show2 = show(dictShow);
  return function(dictShow1) {
    var show1 = show(dictShow1);
    return {
      show: function(v) {
        return "(NonEmpty " + (show2(v.value0) + (" " + (show1(v.value1) + ")")));
      }
    };
  };
};
var functorNonEmpty = function(dictFunctor) {
  var map22 = map(dictFunctor);
  return {
    map: function(f) {
      return function(m) {
        return new NonEmpty(f(m.value0), map22(f)(m.value1));
      };
    }
  };
};

// npm/output/Data.List.Types/index.js
var Nil = /* @__PURE__ */ function() {
  function Nil2() {}
  Nil2.value = new Nil2;
  return Nil2;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  Cons2.create = function(value0) {
    return function(value1) {
      return new Cons2(value0, value1);
    };
  };
  return Cons2;
}();
var NonEmptyList = function(x) {
  return x;
};
var toList = function(v) {
  return new Cons(v.value0, v.value1);
};
var listMap = function(f) {
  var chunkedRevMap = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v, v1) {
        if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
          $tco_var_v = new Cons(v1, v);
          $copy_v1 = v1.value1.value1.value1;
          return;
        }
        var unrolledMap = function(v2) {
          if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
            return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
          }
          if (v2 instanceof Cons && v2.value1 instanceof Nil) {
            return new Cons(f(v2.value0), Nil.value);
          }
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v2) {
          return function($copy_v3) {
            var $tco_var_v2 = $copy_v2;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v2, v3) {
              if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                $tco_var_v2 = v2.value1;
                $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                return;
              }
              $tco_done1 = true;
              return v3;
            }
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
            }
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(v)(unrolledMap(v1));
      }
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var map5 = /* @__PURE__ */ map(functorList);
var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return v;
              }
              if (v1 instanceof Cons) {
                $tco_var_v = new Cons(v1.value0, v);
                $copy_v1 = v1.value1;
                return;
              }
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
            }
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $284 = foldl(foldableList)(flip(f))(b);
      return function($285) {
        return $284(rev($285));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $286 = append2(acc);
        return function($287) {
          return $286(f($287));
        };
      })(mempty2);
    };
  }
};
var foldr2 = /* @__PURE__ */ foldr(foldableList);
var intercalate2 = /* @__PURE__ */ intercalate(foldableList)(monoidString);
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr2(Cons.create)(ys)(xs);
    };
  }
};
var append1 = /* @__PURE__ */ append(semigroupList);
var semigroupNonEmptyList = {
  append: function(v) {
    return function(as$prime) {
      return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
    };
  }
};
var showList = function(dictShow) {
  var show2 = show(dictShow);
  return {
    show: function(v) {
      if (v instanceof Nil) {
        return "Nil";
      }
      return "(" + (intercalate2(" : ")(map5(show2)(v)) + " : Nil)");
    }
  };
};
var showNonEmptyList = function(dictShow) {
  var show2 = show(showNonEmpty(dictShow)(showList(dictShow)));
  return {
    show: function(v) {
      return "(NonEmptyList " + (show2(v) + ")");
    }
  };
};
var applyList = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Nil) {
        return Nil.value;
      }
      if (v instanceof Cons) {
        return append1(map5(v.value0)(v1))(apply(applyList)(v.value1)(v1));
      }
      throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorList;
  }
};
var apply2 = /* @__PURE__ */ apply(applyList);
var applyNonEmptyList = {
  apply: function(v) {
    return function(v1) {
      return new NonEmpty(v.value0(v1.value0), append1(apply2(v.value1)(new Cons(v1.value0, Nil.value)))(apply2(new Cons(v.value0, v.value1))(v1.value1)));
    };
  },
  Functor0: function() {
    return functorNonEmptyList;
  }
};
var altList = {
  alt: append1,
  Functor0: function() {
    return functorList;
  }
};
var plusList = /* @__PURE__ */ function() {
  return {
    empty: Nil.value,
    Alt0: function() {
      return altList;
    }
  };
}();
var applicativeNonEmptyList = {
  pure: /* @__PURE__ */ function() {
    var $315 = singleton2(plusList);
    return function($316) {
      return NonEmptyList($315($316));
    };
  }(),
  Apply0: function() {
    return applyNonEmptyList;
  }
};

// npm/output/Data.Map.Internal/index.js
var $runtime_lazy2 = function(name2, moduleName, init) {
  var state = 0;
  var val;
  return function(lineNumber) {
    if (state === 2)
      return val;
    if (state === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state = 1;
    val = init();
    state = 2;
    return val;
  };
};
var Leaf = /* @__PURE__ */ function() {
  function Leaf2() {}
  Leaf2.value = new Leaf2;
  return Leaf2;
}();
var Node = /* @__PURE__ */ function() {
  function Node2(value0, value1, value2, value3, value4, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }
  Node2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return function(value3) {
          return function(value4) {
            return function(value5) {
              return new Node2(value0, value1, value2, value3, value4, value5);
            };
          };
        };
      };
    };
  };
  return Node2;
}();
var SplitLast = /* @__PURE__ */ function() {
  function SplitLast2(value0, value1, value2) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }
  SplitLast2.create = function(value0) {
    return function(value1) {
      return function(value2) {
        return new SplitLast2(value0, value1, value2);
      };
    };
  };
  return SplitLast2;
}();
var unsafeNode = function(k, v, l, r) {
  if (l instanceof Leaf) {
    if (r instanceof Leaf) {
      return new Node(1, 1, k, v, l, r);
    }
    if (r instanceof Node) {
      return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
    }
    throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
  }
  if (l instanceof Node) {
    if (r instanceof Leaf) {
      return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
    }
    if (r instanceof Node) {
      return new Node(1 + function() {
        var $280 = l.value0 > r.value0;
        if ($280) {
          return l.value0;
        }
        return r.value0;
      }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
    }
    throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
  }
  throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
};
var singleton3 = function(k) {
  return function(v) {
    return new Node(1, 1, k, v, Leaf.value, Leaf.value);
  };
};
var unsafeBalancedNode = /* @__PURE__ */ function() {
  var height = function(v) {
    if (v instanceof Leaf) {
      return 0;
    }
    if (v instanceof Node) {
      return v.value0;
    }
    throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
  };
  var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
    if (rl instanceof Node && rl.value0 > height(rr)) {
      return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
    }
    return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
  };
  var rotateRight = function(k, v, lk, lv, ll, lr, r) {
    if (lr instanceof Node && height(ll) <= lr.value0) {
      return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
    }
    return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
  };
  return function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return singleton3(k)(v);
      }
      if (r instanceof Node && r.value0 > 1) {
        return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
      }
      return unsafeNode(k, v, l, r);
    }
    if (l instanceof Node) {
      if (r instanceof Node) {
        if (r.value0 > (l.value0 + 1 | 0)) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        if (l.value0 > (r.value0 + 1 | 0)) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
      }
      if (r instanceof Leaf && l.value0 > 1) {
        return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
      }
      return unsafeNode(k, v, l, r);
    }
    throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
  };
}();
var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy2("unsafeSplitLast", "Data.Map.Internal", function() {
  return function(k, v, l, r) {
    if (r instanceof Leaf) {
      return new SplitLast(k, v, l);
    }
    if (r instanceof Node) {
      var v1 = $lazy_unsafeSplitLast(779)(r.value2, r.value3, r.value4, r.value5);
      return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
    }
    throw new Error("Failed pattern match at Data.Map.Internal (line 776, column 37 - line 780, column 57): " + [r.constructor.name]);
  };
});
var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(775);
var unsafeJoinNodes = function(v, v1) {
  if (v instanceof Leaf) {
    return v1;
  }
  if (v instanceof Node) {
    var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
    return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
  }
  throw new Error("Failed pattern match at Data.Map.Internal (line 764, column 25 - line 768, column 38): " + [v.constructor.name, v1.constructor.name]);
};
var lookup = function(dictOrd) {
  var compare2 = compare(dictOrd);
  return function(k) {
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Leaf) {
          $tco_done = true;
          return Nothing.value;
        }
        if (v instanceof Node) {
          var v1 = compare2(k)(v.value2);
          if (v1 instanceof LT) {
            $copy_v = v.value4;
            return;
          }
          if (v1 instanceof GT) {
            $copy_v = v.value5;
            return;
          }
          if (v1 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value3);
          }
          throw new Error("Failed pattern match at Data.Map.Internal (line 283, column 7 - line 286, column 22): " + [v1.constructor.name]);
        }
        throw new Error("Failed pattern match at Data.Map.Internal (line 280, column 8 - line 286, column 22): " + [v.constructor.name]);
      }
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      return $tco_result;
    };
    return go;
  };
};
var insert = function(dictOrd) {
  var compare2 = compare(dictOrd);
  return function(k) {
    return function(v) {
      var go = function(v1) {
        if (v1 instanceof Leaf) {
          return singleton3(k)(v);
        }
        if (v1 instanceof Node) {
          var v2 = compare2(k)(v1.value2);
          if (v2 instanceof LT) {
            return unsafeBalancedNode(v1.value2, v1.value3, go(v1.value4), v1.value5);
          }
          if (v2 instanceof GT) {
            return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go(v1.value5));
          }
          if (v2 instanceof EQ) {
            return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
          }
          throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
        }
        throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
      };
      return go;
    };
  };
};
var foldableMap = {
  foldr: function(f) {
    return function(z) {
      var $lazy_go = $runtime_lazy2("go", "Data.Map.Internal", function() {
        return function(m$prime, z$prime) {
          if (m$prime instanceof Leaf) {
            return z$prime;
          }
          if (m$prime instanceof Node) {
            return $lazy_go(172)(m$prime.value4, f(m$prime.value3)($lazy_go(172)(m$prime.value5, z$prime)));
          }
          throw new Error("Failed pattern match at Data.Map.Internal (line 169, column 26 - line 172, column 43): " + [m$prime.constructor.name]);
        };
      });
      var go = $lazy_go(169);
      return function(m) {
        return go(m, z);
      };
    };
  },
  foldl: function(f) {
    return function(z) {
      var $lazy_go = $runtime_lazy2("go", "Data.Map.Internal", function() {
        return function(z$prime, m$prime) {
          if (m$prime instanceof Leaf) {
            return z$prime;
          }
          if (m$prime instanceof Node) {
            return $lazy_go(178)(f($lazy_go(178)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
          }
          throw new Error("Failed pattern match at Data.Map.Internal (line 175, column 26 - line 178, column 43): " + [m$prime.constructor.name]);
        };
      });
      var go = $lazy_go(175);
      return function(m) {
        return go(z, m);
      };
    };
  },
  foldMap: function(dictMonoid) {
    var mempty2 = mempty(dictMonoid);
    var append12 = append(dictMonoid.Semigroup0());
    return function(f) {
      var go = function(v) {
        if (v instanceof Leaf) {
          return mempty2;
        }
        if (v instanceof Node) {
          return append12(go(v.value4))(append12(f(v.value3))(go(v.value5)));
        }
        throw new Error("Failed pattern match at Data.Map.Internal (line 181, column 10 - line 184, column 28): " + [v.constructor.name]);
      };
      return go;
    };
  }
};
var empty2 = /* @__PURE__ */ function() {
  return Leaf.value;
}();
var $$delete = function(dictOrd) {
  var compare2 = compare(dictOrd);
  return function(k) {
    var go = function(v) {
      if (v instanceof Leaf) {
        return Leaf.value;
      }
      if (v instanceof Node) {
        var v1 = compare2(k)(v.value2);
        if (v1 instanceof LT) {
          return unsafeBalancedNode(v.value2, v.value3, go(v.value4), v.value5);
        }
        if (v1 instanceof GT) {
          return unsafeBalancedNode(v.value2, v.value3, v.value4, go(v.value5));
        }
        if (v1 instanceof EQ) {
          return unsafeJoinNodes(v.value4, v.value5);
        }
        throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 7 - line 501, column 43): " + [v1.constructor.name]);
      }
      throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 8 - line 501, column 43): " + [v.constructor.name]);
    };
    return go;
  };
};

// npm/output/Data.Nullable/foreign.js
var nullImpl = null;
function nullable(a, r, f) {
  return a == null ? r : f(a);
}
function notNull(x) {
  return x;
}

// npm/output/Data.Nullable/index.js
var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
var toMaybe = function(n) {
  return nullable(n, Nothing.value, Just.create);
};
var showNullable = function(dictShow) {
  return {
    show: function() {
      var $17 = maybe("null")(show(dictShow));
      return function($18) {
        return $17(toMaybe($18));
      };
    }()
  };
};

// npm/output/Data.String.Common/foreign.js
var split = function(sep) {
  return function(s) {
    return s.split(sep);
  };
};
var trim = function(s) {
  return s.trim();
};
// npm/output/Effect.Aff/foreign.js
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
    var fail = null;
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
              fail = util.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step)) {
              status = RETURN;
              fail = step;
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
                fail = util.left(step._1);
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
              step = interrupt || fail || step;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail) {
                    status = CONTINUE;
                    step = attempt._2(util.fromLeft(fail));
                    fail = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
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
                  if (fail === null) {
                    result = util.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail) {
                    step = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                  } else {
                    step = attempt._1.completed(util.fromRight(step))(attempt._2);
                  }
                  fail = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail = attempt._2;
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
            if (interrupt && fail) {
              setTimeout(function() {
                throw util.fromLeft(fail);
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
    function onComplete(join3) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join3.rethrow;
          join3.handler(step)();
          return function() {};
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join3;
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
              fail = null;
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
              fail = null;
            }
        }
        return canceler;
      };
    }
    function join2(cb) {
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
      join: join2,
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
    function join2(result, head, tail) {
      var fail, step, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail = result;
        step = null;
      } else {
        step = result;
        fail = null;
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
            cb(fail || step)();
            return;
          }
          if (head._3 !== EMPTY) {
            return;
          }
          switch (head.tag) {
            case MAP:
              if (fail === null) {
                head._3 = util.right(head._1(util.fromRight(step)));
                step = head._3;
              } else {
                head._3 = fail;
              }
              break;
            case APPLY:
              lhs = head._1._3;
              rhs = head._2._3;
              if (fail) {
                head._3 = fail;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail === lhs ? head._2 : head._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail === null) {
                      join2(fail, null, null);
                    } else {
                      join2(fail, tail._1, tail._2);
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
                fail = step === lhs ? rhs : lhs;
                step = null;
                head._3 = fail;
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
                      join2(step, null, null);
                    } else {
                      join2(step, tail._1, tail._2);
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
          join2(result, fiber._2._1, fiber._2._2);
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
function _parAffMap(f) {
  return function(aff) {
    return Aff.ParMap(f, aff);
  };
}
function _parAffApply(aff1) {
  return function(aff2) {
    return Aff.ParApply(aff1, aff2);
  };
}
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

// npm/output/Effect.Ref/foreign.js
var _new = function(val) {
  return function() {
    return { value: val };
  };
};
var read = function(ref) {
  return function() {
    return ref.value;
  };
};
var modifyImpl = function(f) {
  return function(ref) {
    return function() {
      var t = f(ref.value);
      ref.value = t.state;
      return t.value;
    };
  };
};
var write = function(val) {
  return function(ref) {
    return function() {
      ref.value = val;
    };
  };
};

// npm/output/Effect.Ref/index.js
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var $$new = _new;
var modify$prime = modifyImpl;
var modify = function(f) {
  return modify$prime(function(s) {
    var s$prime = f(s);
    return {
      state: s$prime,
      value: s$prime
    };
  });
};
var modify_ = function(f) {
  return function(s) {
    return $$void2(modify(f)(s));
  };
};

// npm/output/Control.Monad.ST.Internal/foreign.js
var map_ = function(f) {
  return function(a) {
    return function() {
      return f(a());
    };
  };
};
var foreach = function(as) {
  return function(f) {
    return function() {
      for (var i = 0, l = as.length;i < l; i++) {
        f(as[i])();
      }
    };
  };
};
// npm/output/Control.Monad.ST.Internal/index.js
var functorST = {
  map: map_
};

// npm/output/Effect.Class/index.js
var liftEffect = function(dict) {
  return dict.liftEffect;
};
// npm/output/Control.Monad.Except.Trans/index.js
var map6 = /* @__PURE__ */ map(functorEither);
var ExceptT = function(x) {
  return x;
};
var withExceptT = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return function(f) {
    return function(v) {
      var mapLeft = function(v1) {
        return function(v2) {
          if (v2 instanceof Right) {
            return new Right(v2.value0);
          }
          if (v2 instanceof Left) {
            return new Left(v1(v2.value0));
          }
          throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 43, column 3 - line 43, column 32): " + [v1.constructor.name, v2.constructor.name]);
        };
      };
      return map1(mapLeft(f))(v);
    };
  };
};
var runExceptT = function(v) {
  return v;
};
var mapExceptT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorExceptT = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return {
    map: function(f) {
      return mapExceptT(map1(map6(f)));
    }
  };
};
var except = function(dictApplicative) {
  var $191 = pure(dictApplicative);
  return function($192) {
    return ExceptT($191($192));
  };
};
var monadExceptT = function(dictMonad) {
  return {
    Applicative0: function() {
      return applicativeExceptT(dictMonad);
    },
    Bind1: function() {
      return bindExceptT(dictMonad);
    }
  };
};
var bindExceptT = function(dictMonad) {
  var bind2 = bind(dictMonad.Bind1());
  var pure3 = pure(dictMonad.Applicative0());
  return {
    bind: function(v) {
      return function(k) {
        return bind2(v)(either(function($193) {
          return pure3(Left.create($193));
        })(function(a) {
          var v1 = k(a);
          return v1;
        }));
      };
    },
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var applyExceptT = function(dictMonad) {
  var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: ap(monadExceptT(dictMonad)),
    Functor0: function() {
      return functorExceptT1;
    }
  };
};
var applicativeExceptT = function(dictMonad) {
  return {
    pure: function() {
      var $194 = pure(dictMonad.Applicative0());
      return function($195) {
        return ExceptT($194(Right.create($195)));
      };
    }(),
    Apply0: function() {
      return applyExceptT(dictMonad);
    }
  };
};
var monadThrowExceptT = function(dictMonad) {
  var monadExceptT1 = monadExceptT(dictMonad);
  return {
    throwError: function() {
      var $204 = pure(dictMonad.Applicative0());
      return function($205) {
        return ExceptT($204(Left.create($205)));
      };
    }(),
    Monad0: function() {
      return monadExceptT1;
    }
  };
};
// npm/output/Control.Parallel.Class/index.js
var sequential = function(dict) {
  return dict.sequential;
};
var parallel = function(dict) {
  return dict.parallel;
};

// npm/output/Control.Parallel/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var parTraverse_ = function(dictParallel) {
  var sequential2 = sequential(dictParallel);
  var parallel2 = parallel(dictParallel);
  return function(dictApplicative) {
    var traverse_2 = traverse_(dictApplicative);
    return function(dictFoldable) {
      var traverse_1 = traverse_2(dictFoldable);
      return function(f) {
        var $51 = traverse_1(function($53) {
          return parallel2(f($53));
        });
        return function($52) {
          return sequential2($51($52));
        };
      };
    };
  };
};
var parSequence_ = function(dictParallel) {
  var parTraverse_1 = parTraverse_(dictParallel);
  return function(dictApplicative) {
    var parTraverse_2 = parTraverse_1(dictApplicative);
    return function(dictFoldable) {
      return parTraverse_2(dictFoldable)(identity5);
    };
  };
};

// npm/output/Data.Time.Duration/index.js
var Seconds = function(x) {
  return x;
};

// npm/output/Effect.Unsafe/foreign.js
var unsafePerformEffect = function(f) {
  return f();
};
// npm/output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// npm/output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// npm/output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// npm/output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// npm/output/Effect.Aff/index.js
var $runtime_lazy3 = function(name2, moduleName, init) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init();
    state2 = 2;
    return val;
  };
};
var $$void3 = /* @__PURE__ */ $$void(functorEffect);
var functorParAff = {
  map: _parAffMap
};
var functorAff = {
  map: _map
};
var ffiUtil = /* @__PURE__ */ function() {
  var unsafeFromRight = function(v) {
    if (v instanceof Right) {
      return v.value0;
    }
    if (v instanceof Left) {
      return unsafeCrashWith("unsafeFromRight: Left");
    }
    throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
  };
  var unsafeFromLeft = function(v) {
    if (v instanceof Left) {
      return v.value0;
    }
    if (v instanceof Right) {
      return unsafeCrashWith("unsafeFromLeft: Right");
    }
    throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
  };
  var isLeft = function(v) {
    if (v instanceof Left) {
      return true;
    }
    if (v instanceof Right) {
      return false;
    }
    throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
  };
  return {
    isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Left.create,
    right: Right.create
  };
}();
var makeFiber = function(aff) {
  return _makeFiber(ffiUtil, aff);
};
var launchAff = function(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};
var launchAff_ = function($75) {
  return $$void3(launchAff($75));
};
var delay = function(v) {
  return _delay(Right.create, v);
};
var bracket = function(acquire) {
  return function(completed) {
    return generalBracket(acquire)({
      killed: $$const(completed),
      failed: $$const(completed),
      completed: $$const(completed)
    });
  };
};
var applyParAff = {
  apply: _parAffApply,
  Functor0: function() {
    return functorParAff;
  }
};
var monadAff = {
  Applicative0: function() {
    return applicativeAff;
  },
  Bind1: function() {
    return bindAff;
  }
};
var bindAff = {
  bind: _bind,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var applicativeAff = {
  pure: _pure,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy3("applyAff", "Effect.Aff", function() {
  return {
    apply: ap(monadAff),
    Functor0: function() {
      return functorAff;
    }
  };
});
var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
var pure22 = /* @__PURE__ */ pure(applicativeAff);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindAff);
var $$finally = function(fin) {
  return function(a) {
    return bracket(pure22(unit))($$const(fin))($$const(a));
  };
};
var parallelAff = {
  parallel: unsafeCoerce2,
  sequential: _sequential,
  Apply0: function() {
    return applyAff;
  },
  Apply1: function() {
    return applyParAff;
  }
};
var parallel2 = /* @__PURE__ */ parallel(parallelAff);
var applicativeParAff = {
  pure: function($76) {
    return parallel2(pure22($76));
  },
  Apply0: function() {
    return applyParAff;
  }
};
var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableArray);
var semigroupCanceler = {
  append: function(v) {
    return function(v1) {
      return function(err) {
        return parSequence_2([v(err), v1(err)]);
      };
    };
  }
};
var monadEffectAff = {
  liftEffect: _liftEffect,
  Monad0: function() {
    return monadAff;
  }
};
var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
var monadThrowAff = {
  throwError: _throwError,
  Monad0: function() {
    return monadAff;
  }
};
var monadErrorAff = {
  catchError: _catchError,
  MonadThrow0: function() {
    return monadThrowAff;
  }
};
var $$try3 = /* @__PURE__ */ $$try2(monadErrorAff);
var attempt = $$try3;
var runAff = function(k) {
  return function(aff) {
    return launchAff(bindFlipped2(function($83) {
      return liftEffect2(k($83));
    })($$try3(aff)));
  };
};
var runAff_ = function(k) {
  return function(aff) {
    return $$void3(runAff(k)(aff));
  };
};
var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
var monoidCanceler = {
  mempty: nonCanceler,
  Semigroup0: function() {
    return semigroupCanceler;
  }
};
var altParAff = {
  alt: _parAffAlt,
  Functor0: function() {
    return functorParAff;
  }
};

// npm/output/Effect.Random/foreign.js
var random = Math.random;

// npm/output/Data.Int/foreign.js
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

// npm/output/Data.Number/foreign.js
var isFiniteImpl = isFinite;
var ceil = Math.ceil;
var floor = Math.floor;
var round = Math.round;
// npm/output/Data.Int/index.js
var top2 = /* @__PURE__ */ top(boundedInt);
var bottom2 = /* @__PURE__ */ bottom(boundedInt);
var fromStringAs = /* @__PURE__ */ function() {
  return fromStringAsImpl(Just.create)(Nothing.value);
}();
var fromString = /* @__PURE__ */ fromStringAs(10);
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();
var unsafeClamp = function(x) {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  if (x >= toNumber(top2)) {
    return top2;
  }
  if (x <= toNumber(bottom2)) {
    return bottom2;
  }
  if (otherwise) {
    return fromMaybe(0)(fromNumber(x));
  }
  throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
};
var round2 = function($37) {
  return unsafeClamp(round($37));
};
var floor2 = function($39) {
  return unsafeClamp(floor($39));
};
var ceil2 = function($40) {
  return unsafeClamp(ceil($40));
};
// npm/output/Effect.Random/index.js
var randomInt = function(low) {
  return function(high) {
    return function __do() {
      var n = random();
      var asNumber = (toNumber(high) - toNumber(low) + 1) * n + toNumber(low);
      return floor2(asNumber);
    };
  };
};

// npm/output/Effect.Timer/foreign.js
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

// npm/output/Effect.Timer/index.js
var setTimeout2 = setTimeoutImpl;
var setInterval2 = setIntervalImpl;
var clearTimeout2 = clearTimeoutImpl;
var clearInterval2 = clearIntervalImpl;

// npm/output/Foreign/foreign.js
function typeOf(value) {
  return typeof value;
}
function tagOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isNull(value) {
  return value === null;
}
// npm/output/Data.List.NonEmpty/index.js
var singleton4 = /* @__PURE__ */ function() {
  var $200 = singleton2(plusList);
  return function($201) {
    return NonEmptyList($200($201));
  };
}();

// npm/output/Data.String.CodeUnits/foreign.js
var fromCharArray = function(a) {
  return a.join("");
};
var toCharArray = function(s) {
  return s.split("");
};
var singleton5 = function(c) {
  return c;
};
var length2 = function(s) {
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
var take2 = function(n) {
  return function(s) {
    return s.substr(0, n);
  };
};
var drop2 = function(n) {
  return function(s) {
    return s.substring(n);
  };
};
var splitAt = function(i) {
  return function(s) {
    return { before: s.substring(0, i), after: s.substring(i) };
  };
};

// npm/output/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};
// npm/output/Data.String.CodeUnits/index.js
var stripSuffix = function(v) {
  return function(str) {
    var v1 = splitAt(length2(str) - length2(v) | 0)(str);
    var $14 = v1.after === v;
    if ($14) {
      return new Just(v1.before);
    }
    return Nothing.value;
  };
};
var stripPrefix = function(v) {
  return function(str) {
    var v1 = splitAt(length2(v))(str);
    var $20 = v1.before === v;
    if ($20) {
      return new Just(v1.after);
    }
    return Nothing.value;
  };
};
var indexOf = /* @__PURE__ */ function() {
  return _indexOf(Just.create)(Nothing.value);
}();
var contains = function(pat) {
  var $23 = indexOf(pat);
  return function($24) {
    return isJust($23($24));
  };
};

// npm/output/Foreign/index.js
var show2 = /* @__PURE__ */ show(showString);
var show1 = /* @__PURE__ */ show(showInt);
var pure3 = /* @__PURE__ */ pure(applicativeEither);
var ForeignError = /* @__PURE__ */ function() {
  function ForeignError2(value0) {
    this.value0 = value0;
  }
  ForeignError2.create = function(value0) {
    return new ForeignError2(value0);
  };
  return ForeignError2;
}();
var TypeMismatch = /* @__PURE__ */ function() {
  function TypeMismatch2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  TypeMismatch2.create = function(value0) {
    return function(value1) {
      return new TypeMismatch2(value0, value1);
    };
  };
  return TypeMismatch2;
}();
var ErrorAtIndex = /* @__PURE__ */ function() {
  function ErrorAtIndex2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ErrorAtIndex2.create = function(value0) {
    return function(value1) {
      return new ErrorAtIndex2(value0, value1);
    };
  };
  return ErrorAtIndex2;
}();
var ErrorAtProperty = /* @__PURE__ */ function() {
  function ErrorAtProperty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ErrorAtProperty2.create = function(value0) {
    return function(value1) {
      return new ErrorAtProperty2(value0, value1);
    };
  };
  return ErrorAtProperty2;
}();
var unsafeToForeign = unsafeCoerce2;
var unsafeFromForeign = unsafeCoerce2;
var showForeignError = {
  show: function(v) {
    if (v instanceof ForeignError) {
      return "(ForeignError " + (show2(v.value0) + ")");
    }
    if (v instanceof ErrorAtIndex) {
      return "(ErrorAtIndex " + (show1(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
    }
    if (v instanceof ErrorAtProperty) {
      return "(ErrorAtProperty " + (show2(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
    }
    if (v instanceof TypeMismatch) {
      return "(TypeMismatch " + (show2(v.value0) + (" " + (show2(v.value1) + ")")));
    }
    throw new Error("Failed pattern match at Foreign (line 69, column 1 - line 73, column 89): " + [v.constructor.name]);
  }
};
var readNull = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  return function(value) {
    if (isNull(value)) {
      return pure1(Nothing.value);
    }
    if (otherwise) {
      return pure1(new Just(value));
    }
    throw new Error("Failed pattern match at Foreign (line 169, column 1 - line 169, column 98): " + [value.constructor.name]);
  };
};
var fail = function(dictMonad) {
  var $153 = throwError(monadThrowExceptT(dictMonad));
  return function($154) {
    return $153(singleton4($154));
  };
};
var unsafeReadTagged = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(tag) {
    return function(value) {
      if (tagOf(value) === tag) {
        return pure1(unsafeFromForeign(value));
      }
      if (otherwise) {
        return fail1(new TypeMismatch(tag, tagOf(value)));
      }
      throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value.constructor.name]);
    };
  };
};
var readBoolean = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("Boolean");
};
var readNumber = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("Number");
};
var readInt = function(dictMonad) {
  var map7 = map(dictMonad.Bind1().Apply0().Functor0());
  var readNumber1 = readNumber(dictMonad);
  return function(value) {
    var error2 = new Left(singleton4(new TypeMismatch("Int", tagOf(value))));
    var fromNumber2 = function() {
      var $155 = maybe(error2)(pure3);
      return function($156) {
        return $155(fromNumber($156));
      };
    }();
    return mapExceptT(map7(either($$const(error2))(fromNumber2)))(readNumber1(value));
  };
};
var readString = function(dictMonad) {
  return unsafeReadTagged(dictMonad)("String");
};

// npm/output/OpenCode.RPC/foreign.js
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
var listen2 = (rpc) => (name2) => (handler) => () => rpc.rpc.events.on(name2, (event) => handler(event.data)());

// npm/output/Control.Monad.Except/index.js
var unwrap2 = /* @__PURE__ */ unwrap();
var withExcept = /* @__PURE__ */ withExceptT(functorIdentity);
var runExcept = function($3) {
  return unwrap2(runExceptT($3));
};

// npm/output/Effect.Uncurried/foreign.js
var mkEffectFn1 = function mkEffectFn12(fn) {
  return function(x) {
    return fn(x)();
  };
};
var runEffectFn1 = function runEffectFn12(fn) {
  return function(a) {
    return function() {
      return fn(a);
    };
  };
};
// npm/output/Promise.Internal/foreign.js
var newImpl = function(k) {
  return new Promise(k);
};
function thenOrCatch(k, c, p) {
  return p.then(k, c);
}
function resolve(a) {
  return Promise.resolve(a);
}
// npm/output/Promise.Rejection/foreign.js
function fromError(a) {
  return a;
}
function _toError(just, nothing, ref) {
  if (ref instanceof Error) {
    return just(ref);
  }
  return nothing;
}

// npm/output/Data.Function.Uncurried/foreign.js
var runFn2 = function(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
};
var runFn3 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return fn(a, b, c);
      };
    };
  };
};
var runFn4 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};
// npm/output/Promise.Rejection/index.js
var toError = /* @__PURE__ */ function() {
  return runFn3(_toError)(Just.create)(Nothing.value);
}();
// npm/output/Promise/index.js
var thenOrCatch2 = function() {
  return function(k) {
    return function(c) {
      return function(p) {
        return function() {
          return thenOrCatch(mkEffectFn1(k), mkEffectFn1(c), p);
        };
      };
    };
  };
};
var resolve2 = function() {
  return resolve;
};
var $$new2 = function() {
  return function(k) {
    return function() {
      return newImpl(function(onResolve, onReject) {
        return k(runEffectFn1(onResolve))(runEffectFn1(onReject))();
      });
    };
  };
};

// npm/output/Promise.Aff/index.js
var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
var thenOrCatch3 = /* @__PURE__ */ thenOrCatch2();
var map7 = /* @__PURE__ */ map(functorEffect);
var resolve3 = /* @__PURE__ */ resolve2();
var $$new3 = /* @__PURE__ */ $$new2();
var alt2 = /* @__PURE__ */ alt(altMaybe);
var map1 = /* @__PURE__ */ map(functorMaybe);
var readString2 = /* @__PURE__ */ readString(monadIdentity);
var bind2 = /* @__PURE__ */ bind(bindAff);
var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
var toAff$prime = function(customCoerce) {
  return function(p) {
    return makeAff(function(cb) {
      return voidRight2(mempty2)(thenOrCatch3(function(a) {
        return map7(resolve3)(cb(new Right(a)));
      })(function(e) {
        return map7(resolve3)(cb(new Left(customCoerce(e))));
      })(p));
    });
  };
};
var fromAff = function() {
  return function(aff) {
    return $$new3(function(succ) {
      return function(err) {
        return runAff_(either(function($13) {
          return err(fromError($13));
        })(succ))(aff);
      };
    });
  };
};
var coerce3 = function(rej) {
  return fromMaybe$prime(function(v) {
    return error("Promise failed, couldn't extract JS Error or String");
  })(alt2(toError(rej))(map1(error)(hush(runExcept(readString2(unsafeToForeign(rej)))))));
};
var toAff = /* @__PURE__ */ toAff$prime(coerce3);
var toAffE = function(f) {
  return bind2(liftEffect3(f))(toAff);
};

// npm/output/OpenCode.RPC/index.js
var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
var call = function(connection) {
  return function(name2) {
    return function(input) {
      return bracket(liftEffect4(callImpl(connection)(name2)(input)))(function($4) {
        return liftEffect4(function(v) {
          return v.cancel;
        }($4));
      })(function($5) {
        return toAff(function(v) {
          return v.promise;
        }($5));
      });
    };
  };
};

// npm/output/Yoga.JSON/foreign.js
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
// npm/output/Data.Array/foreign.js
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
  return function(foldr3, xs) {
    return listToArray(foldr3(curryCons)(emptyList)(xs));
  };
}();
var length4 = function(xs) {
  return xs.length;
};
var indexImpl = function(just, nothing, xs, i) {
  return i < 0 || i >= xs.length ? nothing : just(xs[i]);
};
var findMapImpl = function(nothing, isJust2, f, xs) {
  for (var i = 0;i < xs.length; i++) {
    var result = f(xs[i]);
    if (isJust2(result))
      return result;
  }
  return nothing;
};
var sortByImpl = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from2 + (to - from2 >> 1);
    if (mid - from2 > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
    if (to - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
    i = from2;
    j = mid;
    k = from2;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
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
  return function(compare2, fromOrdering, xs) {
    var out;
    if (xs.length < 2)
      return xs;
    out = xs.slice(0);
    mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
    return out;
  };
}();

// npm/output/Data.Array.ST/foreign.js
var sortByImpl2 = function() {
  function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from2 + (to - from2 >> 1);
    if (mid - from2 > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
    if (to - mid > 1)
      mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
    i = from2;
    j = mid;
    k = from2;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare2(x)(y));
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
  return function(compare2, fromOrdering, xs) {
    if (xs.length < 2)
      return xs;
    mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
    return xs;
  };
}();
// npm/output/Data.Array/index.js
var foldMap12 = /* @__PURE__ */ foldMap(foldableArray);
var range2 = /* @__PURE__ */ runFn2(rangeImpl);
var index2 = /* @__PURE__ */ function() {
  return runFn4(indexImpl)(Just.create)(Nothing.value);
}();
var fromFoldable2 = function(dictFoldable) {
  return runFn2(fromFoldableImpl)(foldr(dictFoldable));
};
var foldMap2 = function(dictMonoid) {
  return foldMap12(dictMonoid);
};
var findMap2 = /* @__PURE__ */ function() {
  return runFn4(findMapImpl)(Nothing.value)(isJust);
}();

// npm/output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head, tail) {
    this.head = head;
    this.tail = tail;
  };
  function finalCell(head) {
    return new ConsCell(head, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply3, map8, f) {
    var buildFrom = function(x, ys) {
      return apply3(map8(consList)(f(x)))(ys);
    };
    var go = function(acc, currentLen, xs) {
      if (currentLen === 0) {
        return acc;
      } else {
        var last2 = xs[currentLen - 1];
        return new Cont(function() {
          var built = go(buildFrom(last2, acc), currentLen - 1, xs);
          return built;
        });
      }
    };
    return function(array) {
      var acc = map8(finalCell)(f(array[array.length - 1]));
      var result = go(acc, array.length - 1, array);
      while (result instanceof Cont) {
        result = result.fn();
      }
      return map8(listToArray)(result);
    };
  };
}();

// npm/output/Data.Enum/foreign.js
function toCharCode(c) {
  return c.charCodeAt(0);
}
function fromCharCode(c) {
  return String.fromCharCode(c);
}
// npm/output/Data.Enum/index.js
var bottom1 = /* @__PURE__ */ bottom(boundedChar);
var top1 = /* @__PURE__ */ top(boundedChar);
var toEnum = function(dict) {
  return dict.toEnum;
};
var fromEnum = function(dict) {
  return dict.fromEnum;
};
var toEnumWithDefaults = function(dictBoundedEnum) {
  var toEnum1 = toEnum(dictBoundedEnum);
  var fromEnum1 = fromEnum(dictBoundedEnum);
  var bottom22 = bottom(dictBoundedEnum.Bounded0());
  return function(low) {
    return function(high) {
      return function(x) {
        var v = toEnum1(x);
        if (v instanceof Just) {
          return v.value0;
        }
        if (v instanceof Nothing) {
          var $140 = x < fromEnum1(bottom22);
          if ($140) {
            return low;
          }
          return high;
        }
        throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
      };
    };
  };
};
var defaultSucc = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) + 1 | 0);
    };
  };
};
var defaultPred = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) - 1 | 0);
    };
  };
};
var charToEnum = function(v) {
  if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
    return new Just(fromCharCode(v));
  }
  return Nothing.value;
};
var enumChar = {
  succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
  pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
  Ord0: function() {
    return ordChar;
  }
};
var boundedEnumChar = /* @__PURE__ */ function() {
  return {
    cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
    toEnum: charToEnum,
    fromEnum: toCharCode,
    Bounded0: function() {
      return boundedChar;
    },
    Enum1: function() {
      return enumChar;
    }
  };
}();
// npm/output/Foreign.Index/foreign.js
function unsafeReadPropImpl(f, s, key, value) {
  return value == null ? f : s(value[key]);
}

// npm/output/Foreign.Index/index.js
var unsafeReadProp = function(dictMonad) {
  var fail2 = fail(dictMonad);
  var pure4 = pure(applicativeExceptT(dictMonad));
  return function(k) {
    return function(value) {
      return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value))), pure4, k, value);
    };
  };
};
var readProp = function(dictMonad) {
  return unsafeReadProp(dictMonad);
};

// npm/output/Foreign.Object/foreign.js
function runST(f) {
  return f();
}
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
var keys2 = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// npm/output/Foreign.Object.ST/foreign.js
var newImpl2 = function() {
  return {};
};
function poke2(k) {
  return function(v) {
    return function(m) {
      return function() {
        m[k] = v;
        return m;
      };
    };
  };
}
// npm/output/Foreign.Object/index.js
var $$void4 = /* @__PURE__ */ $$void(functorST);
var lookup3 = /* @__PURE__ */ function() {
  return runFn4(_lookup)(Nothing.value)(Just.create);
}();
var fromFoldable3 = function(dictFoldable) {
  var fromFoldable1 = fromFoldable2(dictFoldable);
  return function(l) {
    return runST(function __do() {
      var s = newImpl2();
      foreach(fromFoldable1(l))(function(v) {
        return $$void4(poke2(v.value0)(v.value1)(s));
      })();
      return s;
    });
  };
};
// npm/output/Record/index.js
var get2 = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function(l) {
      return function(r) {
        return unsafeGet(reflectSymbol2(l))(r);
      };
    };
  };
};

// npm/output/Record.Builder/foreign.js
function copyRecord(rec) {
  var copy = {};
  for (var key in rec) {
    if ({}.hasOwnProperty.call(rec, key)) {
      copy[key] = rec[key];
    }
  }
  return copy;
}
function unsafeInsert(l) {
  return function(a) {
    return function(rec) {
      rec[l] = a;
      return rec;
    };
  };
}

// npm/output/Record.Builder/index.js
var semigroupoidBuilder = semigroupoidFn;
var insert3 = function() {
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(l) {
        return function(a) {
          return function(r1) {
            return unsafeInsert(reflectSymbol2(l))(a)(r1);
          };
        };
      };
    };
  };
};
var categoryBuilder = categoryFn;
var build = function(v) {
  return function(r1) {
    return v(copyRecord(r1));
  };
};

// npm/output/Yoga.JSON/index.js
var identity6 = /* @__PURE__ */ identity(categoryBuilder);
var readString3 = /* @__PURE__ */ readString(monadIdentity);
var readNumber2 = /* @__PURE__ */ readNumber(monadIdentity);
var bindExceptT2 = /* @__PURE__ */ bindExceptT(monadIdentity);
var pure4 = /* @__PURE__ */ pure(applicativeNonEmptyList);
var except2 = /* @__PURE__ */ except(applicativeIdentity);
var readInt2 = /* @__PURE__ */ readInt(monadIdentity);
var applicativeExceptT2 = /* @__PURE__ */ applicativeExceptT(monadIdentity);
var pure1 = /* @__PURE__ */ pure(applicativeExceptT2);
var map8 = /* @__PURE__ */ map(functorArray);
var compose1 = /* @__PURE__ */ compose(semigroupoidBuilder);
var insert5 = /* @__PURE__ */ insert3()();
var append2 = /* @__PURE__ */ append(semigroupNonEmptyList);
var functorExceptT2 = /* @__PURE__ */ functorExceptT(functorIdentity);
var map12 = /* @__PURE__ */ map(functorExceptT2);
var map22 = /* @__PURE__ */ map(functorNonEmptyList);
var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindExceptT2);
var map32 = /* @__PURE__ */ map(functorFn);
var traverse2 = /* @__PURE__ */ traverse(traversableMaybe)(applicativeExceptT2);
var readNull2 = /* @__PURE__ */ readNull(monadIdentity);
var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindExceptT2);
var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
var writeForeignString = {
  writeImpl: unsafeToForeign
};
var writeForeignInt = {
  writeImpl: unsafeToForeign
};
var writeForeignForeign = {
  writeImpl: /* @__PURE__ */ identity(categoryFn)
};
var writeForeignFieldsNilRowR = {
  writeImplFields: function(v) {
    return function(v1) {
      return identity6;
    };
  }
};
var writeForeignBoolean = {
  writeImpl: unsafeToForeign
};
var readForeignString = {
  readImpl: readString3
};
var readForeignNumber = {
  readImpl: readNumber2
};
var readForeignInt = {
  readImpl: readInt2
};
var readForeignForeign = {
  readImpl: pure1
};
var readForeignFieldsNilRowRo = {
  getFields: function(v) {
    return function(v1) {
      return pure1(identity6);
    };
  }
};
var readForeignBoolean = {
  readImpl: /* @__PURE__ */ readBoolean(monadIdentity)
};
var writeImplFields = function(dict) {
  return dict.writeImplFields;
};
var writeForeignRecord = function() {
  return function(dictWriteForeignFields) {
    var writeImplFields1 = writeImplFields(dictWriteForeignFields);
    return {
      writeImpl: function(rec) {
        var steps = writeImplFields1($$Proxy.value)(rec);
        return unsafeToForeign(build(steps)({}));
      }
    };
  };
};
var writeImpl = function(dict) {
  return dict.writeImpl;
};
var writeJSON = function(dictWriteForeign) {
  var $481 = writeImpl(dictWriteForeign);
  return function($482) {
    return _unsafeStringify($481($482));
  };
};
var writeForeignArray = function(dictWriteForeign) {
  var writeImpl5 = writeImpl(dictWriteForeign);
  return {
    writeImpl: function(xs) {
      return unsafeToForeign(map8(writeImpl5)(xs));
    }
  };
};
var writeForeignFieldsCons = function(dictIsSymbol) {
  var get3 = get2(dictIsSymbol)();
  var insert42 = insert5(dictIsSymbol);
  return function(dictWriteForeign) {
    var writeImpl5 = writeImpl(dictWriteForeign);
    return function(dictWriteForeignFields) {
      var writeImplFields1 = writeImplFields(dictWriteForeignFields);
      return function() {
        return function() {
          return function() {
            return {
              writeImplFields: function(v) {
                return function(rec) {
                  var rest = writeImplFields1($$Proxy.value)(rec);
                  var value = writeImpl5(get3($$Proxy.value)(rec));
                  var result = compose1(insert42($$Proxy.value)(value))(rest);
                  return result;
                };
              }
            };
          };
        };
      };
    };
  };
};
var writeForeignNullable = function(dictWriteForeign) {
  return {
    writeImpl: function() {
      var $497 = maybe(unsafeToForeign(toNullable(Nothing.value)))(writeImpl(dictWriteForeign));
      return function($498) {
        return $497(toMaybe($498));
      };
    }()
  };
};
var write3 = function(dictWriteForeign) {
  return writeImpl(dictWriteForeign);
};
var readImpl = function(dict) {
  return dict.readImpl;
};
var readForeignNullable = function(dictReadForeign) {
  var readImpl5 = readImpl(dictReadForeign);
  return {
    readImpl: function(o) {
      var reformat = function(error2) {
        if (error2 instanceof TypeMismatch) {
          return new TypeMismatch("Nullable " + error2.value0, error2.value1);
        }
        return error2;
      };
      return withExcept(map22(reformat))(bindFlipped3(map32(map12(toNullable))(traverse2(readImpl5)))(readNull2(o)));
    }
  };
};
var read3 = function(dictReadForeign) {
  var $556 = readImpl(dictReadForeign);
  return function($557) {
    return runExcept($556($557));
  };
};
var parseJSON = /* @__PURE__ */ function() {
  var $560 = lmap2(function($563) {
    return pure4(ForeignError.create(message($563)));
  });
  var $561 = runEffectFn1(_parseJSON);
  return function($562) {
    return ExceptT(Identity($560(unsafePerformEffect($$try($561($562))))));
  };
}();
var readJSON = function(dictReadForeign) {
  var $564 = composeKleisliFlipped2(readImpl(dictReadForeign))(parseJSON);
  return function($565) {
    return runExcept($564($565));
  };
};
var getFields = function(dict) {
  return dict.getFields;
};
var readForeignFieldsCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  var insert42 = insert5(dictIsSymbol);
  return function(dictReadForeign) {
    var readImpl5 = readImpl(dictReadForeign);
    return function(dictReadForeignFields) {
      var getFields1 = getFields(dictReadForeignFields);
      return function() {
        return function() {
          return {
            getFields: function(v) {
              return function(obj) {
                var rest = getFields1($$Proxy.value)(obj);
                var name2 = reflectSymbol2($$Proxy.value);
                var enrichErrorWithPropName = withExcept(map22(ErrorAtProperty.create(name2)));
                var value = enrichErrorWithPropName(bindFlipped3(readImpl5)(readProp2(name2)(obj)));
                var first = map12(insert42($$Proxy.value))(value);
                return except2(function() {
                  var v1 = runExcept(rest);
                  var v2 = runExcept(first);
                  if (v2 instanceof Right && v1 instanceof Right) {
                    return new Right(compose1(v2.value0)(v1.value0));
                  }
                  if (v2 instanceof Left && v1 instanceof Left) {
                    return new Left(append2(v2.value0)(v1.value0));
                  }
                  if (v2 instanceof Right && v1 instanceof Left) {
                    return new Left(v1.value0);
                  }
                  if (v2 instanceof Left && v1 instanceof Right) {
                    return new Left(v2.value0);
                  }
                  throw new Error("Failed pattern match at Yoga.JSON (line 362, column 5 - line 366, column 33): " + [v2.constructor.name, v1.constructor.name]);
                }());
              };
            }
          };
        };
      };
    };
  };
};
var readForeignRecord = function() {
  return function(dictReadForeignFields) {
    var getFields1 = getFields(dictReadForeignFields);
    return {
      readImpl: function(o) {
        return map12(flip(build)({}))(getFields1($$Proxy.value)(o));
      }
    };
  };
};

// npm/output/Markgraf.OpenCode.Protocol/index.js
var writeForeignRecord2 = /* @__PURE__ */ writeForeignRecord();
var writeForeignFieldsCons2 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "type";
  }
});
var writeForeignFieldsCons1 = /* @__PURE__ */ writeForeignFieldsCons2(writeForeignString)(writeForeignFieldsNilRowR)()()();
var writeForeignRecord1 = /* @__PURE__ */ writeForeignRecord2(writeForeignFieldsCons1);
var write4 = /* @__PURE__ */ write3(writeForeignRecord1);
var writeForeignFieldsCons22 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "additionalProperties";
  }
})(writeForeignBoolean);
var writeForeignFieldsCons3 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "properties";
  }
});
var backgroundIsSymbol = {
  reflectSymbol: function() {
    return "background";
  }
};
var idIsSymbol = {
  reflectSymbol: function() {
    return "id";
  }
};
var pathIsSymbol = {
  reflectSymbol: function() {
    return "path";
  }
};
var writeForeignArray2 = /* @__PURE__ */ writeForeignArray(writeForeignString);
var writeForeignFieldsCons4 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "required";
  }
})(writeForeignArray2)(writeForeignFieldsCons1)()()();
var writeForeignFieldsCons5 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "clientId";
  }
});
var writeForeignFieldsCons6 = /* @__PURE__ */ writeForeignFieldsCons5(writeForeignRecord1);
var writeForeignFieldsCons7 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "requestId";
  }
});
var writeForeignFieldsCons8 = /* @__PURE__ */ writeForeignFieldsCons7(writeForeignRecord1)(writeForeignFieldsNilRowR)()()();
var show3 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
var pure5 = /* @__PURE__ */ pure(applicativeEffect);
var readForeignRecord2 = /* @__PURE__ */ readForeignRecord();
var sessionIdIsSymbol = {
  reflectSymbol: function() {
    return "sessionId";
  }
};
var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
var pure12 = /* @__PURE__ */ pure(applicativeAff);
var writeForeignFieldsCons9 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "error";
  }
});
var writeForeignFieldsCons10 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "hostname";
  }
});
var writeForeignFieldsCons11 = /* @__PURE__ */ writeForeignFieldsCons(sessionIdIsSymbol);
var writeForeignFieldsCons12 = /* @__PURE__ */ writeForeignFieldsCons11(writeForeignRecord1)(writeForeignFieldsNilRowR)()()();
var bind1 = /* @__PURE__ */ bind(bindAff);
var sequential2 = /* @__PURE__ */ sequential(parallelAff);
var alt3 = /* @__PURE__ */ alt(altParAff);
var parallel3 = /* @__PURE__ */ parallel(parallelAff);
var voidLeft2 = /* @__PURE__ */ voidLeft(functorAff);
var writeForeignFieldsCons13 = /* @__PURE__ */ writeForeignFieldsCons5(writeForeignString);
var write1 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons13(/* @__PURE__ */ writeForeignFieldsCons10(writeForeignString)(/* @__PURE__ */ writeForeignFieldsCons11(writeForeignString)(writeForeignFieldsNilRowR)()()())()()())()()()));
var $$void5 = /* @__PURE__ */ $$void(functorAff);
var writeForeignFieldsCons14 = /* @__PURE__ */ writeForeignFieldsCons7(writeForeignString)(writeForeignFieldsNilRowR)()()();
var write22 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons13(/* @__PURE__ */ writeForeignFieldsCons9(/* @__PURE__ */ writeForeignNullable(writeForeignString))(writeForeignFieldsCons14)()()())()()()));
var write32 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons13(writeForeignFieldsCons14)()()()));
var nullableRequestSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "anyOf";
  }
})(/* @__PURE__ */ writeForeignArray(writeForeignForeign))(writeForeignFieldsNilRowR)()()()))({
  anyOf: [/* @__PURE__ */ write4({
    type: "null"
  }), /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons(backgroundIsSymbol)(writeForeignRecord1)(/* @__PURE__ */ writeForeignFieldsCons(idIsSymbol)(writeForeignRecord1)(/* @__PURE__ */ writeForeignFieldsCons(pathIsSymbol)(writeForeignRecord1)(writeForeignFieldsNilRowR)()()())()()())()()()))(writeForeignFieldsCons4)()()())()()()))({
    type: "object",
    properties: {
      id: {
        type: "string"
      },
      path: {
        type: "string"
      },
      background: {
        type: "boolean"
      }
    },
    required: ["id", "path", "background"],
    additionalProperties: false
  })]
});
var leaseMilliseconds = 5000;
var heartbeatSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons6(writeForeignFieldsCons8)()()()))(writeForeignFieldsCons4)()()())()()()))({
  type: "object",
  properties: {
    requestId: {
      type: "string"
    },
    clientId: {
      type: "string"
    }
  },
  required: ["requestId", "clientId"],
  additionalProperties: false
});
var emptyObjectSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons3(/* @__PURE__ */ writeForeignRecord2(writeForeignFieldsNilRowR))(writeForeignFieldsCons1)()()())()()()))({
  type: "object",
  properties: {},
  additionalProperties: false
});
var decodeEffect = function(dictReadForeign) {
  var read4 = read3(dictReadForeign);
  return function(value) {
    var v = read4(value);
    if (v instanceof Left) {
      return throwException(error(show3(v.value0)));
    }
    if (v instanceof Right) {
      return pure5(v.value0);
    }
    throw new Error("Failed pattern match at Markgraf.OpenCode.Protocol (line 107, column 22 - line 109, column 32): " + [v.constructor.name]);
  };
};
var decodeEffect1 = /* @__PURE__ */ decodeEffect(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons(sessionIdIsSymbol)(readForeignString)(readForeignFieldsNilRowRo)()()));
var listen3 = function(client2) {
  return function(announce) {
    return listen2(client2)("announce")(function(payload) {
      return function __do() {
        var decoded = decodeEffect1(payload)();
        return announce(decoded.sessionId)();
      };
    });
  };
};
var decode = function(dictReadForeign) {
  var read4 = read3(dictReadForeign);
  return function(value) {
    var v = read4(value);
    if (v instanceof Left) {
      return throwError2(error(show3(v.value0)));
    }
    if (v instanceof Right) {
      return pure12(v.value0);
    }
    throw new Error("Failed pattern match at Markgraf.OpenCode.Protocol (line 102, column 16 - line 104, column 32): " + [v.constructor.name]);
  };
};
var decode1 = /* @__PURE__ */ decode(/* @__PURE__ */ readForeignNullable(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons(backgroundIsSymbol)(readForeignBoolean)(/* @__PURE__ */ readForeignFieldsCons(idIsSymbol)(readForeignString)(/* @__PURE__ */ readForeignFieldsCons(pathIsSymbol)(readForeignString)(readForeignFieldsNilRowRo)()())()())()())));
var decode2 = /* @__PURE__ */ decode(readForeignBoolean);
var completeSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons6(/* @__PURE__ */ writeForeignFieldsCons9(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons2(writeForeignArray2)(writeForeignFieldsNilRowR)()()()))(writeForeignFieldsCons8)()()())()()()))(writeForeignFieldsCons4)()()())()()()))({
  type: "object",
  properties: {
    requestId: {
      type: "string"
    },
    clientId: {
      type: "string"
    },
    error: {
      type: ["string", "null"]
    }
  },
  required: ["requestId", "clientId", "error"],
  additionalProperties: false
});
var claimSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons6(/* @__PURE__ */ writeForeignFieldsCons10(writeForeignRecord1)(writeForeignFieldsCons12)()()())()()()))(writeForeignFieldsCons4)()()())()()()))({
  type: "object",
  properties: {
    clientId: {
      type: "string"
    },
    sessionId: {
      type: "string"
    },
    hostname: {
      type: "string"
    }
  },
  required: ["clientId", "sessionId", "hostname"],
  additionalProperties: false
});
var call2 = function(client2) {
  return function(method) {
    return function(input) {
      return bind1(sequential2(alt3(parallel3(attempt(call(client2)(method)(input))))(parallel3(voidLeft2(delay(leaseMilliseconds))(new Left(error("OpenCode playback RPC timed out: " + method)))))))(function(result) {
        if (result instanceof Left) {
          return throwError2(result.value0);
        }
        if (result instanceof Right) {
          return pure12(result.value0);
        }
        throw new Error("Failed pattern match at Markgraf.OpenCode.Protocol (line 52, column 3 - line 54, column 30): " + [result.constructor.name]);
      });
    };
  };
};
var claim = function(client2) {
  return function(request) {
    return bind1(call2(client2)("claim")(write1(request)))(function(response) {
      return bind1(decode1(response))(function(decoded) {
        return pure12(toMaybe(decoded));
      });
    });
  };
};
var complete = function(client2) {
  return function(requestId) {
    return function(clientId) {
      return function(failure) {
        return $$void5(call2(client2)("complete")(write22({
          requestId,
          clientId,
          error: failure
        })));
      };
    };
  };
};
var heartbeat = function(client2) {
  return function(requestId) {
    return function(clientId) {
      return bind1(call2(client2)("heartbeat")(write32({
        requestId,
        clientId
      })))(function(response) {
        return decode2(response);
      });
    };
  };
};
var booleanSchema = /* @__PURE__ */ write4({
  type: "boolean"
});
var announcementSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons3(/* @__PURE__ */ writeForeignRecord2(writeForeignFieldsCons12))(writeForeignFieldsCons4)()()())()()()))({
  type: "object",
  properties: {
    sessionId: {
      type: "string"
    }
  },
  required: ["sessionId"],
  additionalProperties: false
});
var contract = /* @__PURE__ */ define({
  id: "markgraf.playback",
  methods: [{
    name: "claim",
    inputSchema: claimSchema,
    outputSchema: nullableRequestSchema
  }, {
    name: "heartbeat",
    inputSchema: heartbeatSchema,
    outputSchema: booleanSchema
  }, {
    name: "complete",
    inputSchema: completeSchema,
    outputSchema: emptyObjectSchema
  }],
  events: [{
    name: "announce",
    schema: announcementSchema
  }]
});
var connect = function(context) {
  return client(context)(contract);
};

// npm/output/Node.OS/foreign.js
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

// npm/output/Node.Encoding/index.js
var ASCII = /* @__PURE__ */ function() {
  function ASCII2() {}
  ASCII2.value = new ASCII2;
  return ASCII2;
}();
var UTF8 = /* @__PURE__ */ function() {
  function UTF82() {}
  UTF82.value = new UTF82;
  return UTF82;
}();
var UTF16LE = /* @__PURE__ */ function() {
  function UTF16LE2() {}
  UTF16LE2.value = new UTF16LE2;
  return UTF16LE2;
}();
var UCS2 = /* @__PURE__ */ function() {
  function UCS22() {}
  UCS22.value = new UCS22;
  return UCS22;
}();
var Base64 = /* @__PURE__ */ function() {
  function Base642() {}
  Base642.value = new Base642;
  return Base642;
}();
var Base64Url = /* @__PURE__ */ function() {
  function Base64Url2() {}
  Base64Url2.value = new Base64Url2;
  return Base64Url2;
}();
var Latin1 = /* @__PURE__ */ function() {
  function Latin12() {}
  Latin12.value = new Latin12;
  return Latin12;
}();
var Binary = /* @__PURE__ */ function() {
  function Binary2() {}
  Binary2.value = new Binary2;
  return Binary2;
}();
var Hex = /* @__PURE__ */ function() {
  function Hex2() {}
  Hex2.value = new Hex2;
  return Hex2;
}();
var encodingToNode = function(v) {
  if (v instanceof ASCII) {
    return "ascii";
  }
  if (v instanceof UTF8) {
    return "utf8";
  }
  if (v instanceof UTF16LE) {
    return "utf16le";
  }
  if (v instanceof UCS2) {
    return "ucs2";
  }
  if (v instanceof Base64) {
    return "base64";
  }
  if (v instanceof Base64Url) {
    return "base64url";
  }
  if (v instanceof Latin1) {
    return "latin1";
  }
  if (v instanceof Binary) {
    return "binary";
  }
  if (v instanceof Hex) {
    return "hex";
  }
  throw new Error("Failed pattern match at Node.Encoding (line 35, column 1 - line 35, column 37): " + [v.constructor.name]);
};
// npm/output/Node.OS/index.js
var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
var Arm = /* @__PURE__ */ function() {
  function Arm2() {}
  Arm2.value = new Arm2;
  return Arm2;
}();
var Arm64 = /* @__PURE__ */ function() {
  function Arm642() {}
  Arm642.value = new Arm642;
  return Arm642;
}();
var Ia32 = /* @__PURE__ */ function() {
  function Ia322() {}
  Ia322.value = new Ia322;
  return Ia322;
}();
var MIPS = /* @__PURE__ */ function() {
  function MIPS2() {}
  MIPS2.value = new MIPS2;
  return MIPS2;
}();
var MIPSEL = /* @__PURE__ */ function() {
  function MIPSEL2() {}
  MIPSEL2.value = new MIPSEL2;
  return MIPSEL2;
}();
var PPC = /* @__PURE__ */ function() {
  function PPC2() {}
  PPC2.value = new PPC2;
  return PPC2;
}();
var PPC64 = /* @__PURE__ */ function() {
  function PPC642() {}
  PPC642.value = new PPC642;
  return PPC642;
}();
var S390 = /* @__PURE__ */ function() {
  function S3902() {}
  S3902.value = new S3902;
  return S3902;
}();
var S390X = /* @__PURE__ */ function() {
  function S390X2() {}
  S390X2.value = new S390X2;
  return S390X2;
}();
var X32 = /* @__PURE__ */ function() {
  function X322() {}
  X322.value = new X322;
  return X322;
}();
var X64 = /* @__PURE__ */ function() {
  function X642() {}
  X642.value = new X642;
  return X642;
}();
var UnknownArch = /* @__PURE__ */ function() {
  function UnknownArch2(value0) {
    this.value0 = value0;
  }
  UnknownArch2.create = function(value0) {
    return new UnknownArch2(value0);
  };
  return UnknownArch2;
}();
var arch2 = /* @__PURE__ */ mapFlipped2(arch)(function(v) {
  if (v === "arm") {
    return Arm.value;
  }
  if (v === "arm64") {
    return Arm64.value;
  }
  if (v === "ia32") {
    return Ia32.value;
  }
  if (v === "mips") {
    return MIPS.value;
  }
  if (v === "mipsel") {
    return MIPSEL.value;
  }
  if (v === "ppc") {
    return PPC.value;
  }
  if (v === "ppc64") {
    return PPC64.value;
  }
  if (v === "s390") {
    return S390.value;
  }
  if (v === "s390x") {
    return S390X.value;
  }
  if (v === "x32") {
    return X32.value;
  }
  if (v === "x64") {
    return X64.value;
  }
  return new UnknownArch(v);
});

// npm/output/Node.Path/foreign.js
import path from "node:path";
var normalize = path.normalize;
function concat2(segments) {
  return path.join.apply(this, segments);
}
function resolve4(from2) {
  return (to) => () => path.resolve.apply(this, from2.concat([to]));
}
var basename = path.basename;
var extname = path.extname;
var sep = path.sep;
var delimiter = path.delimiter;
var parse2 = path.parse;
var isAbsolute = path.isAbsolute;
// npm/output/OpenCode.Server/foreign.js
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
// npm/output/Yoga.WebProletarian.Runtime/foreign.js
var monotonicNowMilliseconds = () => globalThis.performance.now();
// npm/output/Markgraf.OpenCode.Server/index.js
var writeForeignRecord3 = /* @__PURE__ */ writeForeignRecord();
var backgroundIsSymbol2 = {
  reflectSymbol: function() {
    return "background";
  }
};
var writeForeignFieldsCons15 = /* @__PURE__ */ writeForeignFieldsCons(backgroundIsSymbol2);
var writeForeignFieldsCons16 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "type";
  }
})(writeForeignString)(writeForeignFieldsNilRowR)()()();
var writeForeignRecord12 = /* @__PURE__ */ writeForeignRecord3(writeForeignFieldsCons16);
var pathIsSymbol2 = {
  reflectSymbol: function() {
    return "path";
  }
};
var writeForeignFieldsCons23 = /* @__PURE__ */ writeForeignFieldsCons(pathIsSymbol2);
var $$delete3 = /* @__PURE__ */ $$delete(ordString);
var lookup4 = /* @__PURE__ */ lookup(ordString);
var bind3 = /* @__PURE__ */ bind(bindAff);
var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
var eq3 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqString));
var insert6 = /* @__PURE__ */ insert(ordString);
var bind12 = /* @__PURE__ */ bind(bindEffect);
var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMap);
var throwError3 = /* @__PURE__ */ throwError(monadThrowAff);
var show4 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
var pure6 = /* @__PURE__ */ pure(applicativeAff);
var traverse_2 = /* @__PURE__ */ traverse_(applicativeAff)(foldableMaybe);
var foldl3 = /* @__PURE__ */ foldl(foldableMap);
var discard2 = /* @__PURE__ */ discard(discardUnit);
var discard1 = /* @__PURE__ */ discard2(bindAff);
var unless2 = /* @__PURE__ */ unless(applicativeAff);
var fromAff2 = /* @__PURE__ */ fromAff();
var readForeignRecord3 = /* @__PURE__ */ readForeignRecord();
var readForeignFieldsCons2 = /* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "clientId";
  }
})(readForeignString);
var sessionIdIsSymbol2 = {
  reflectSymbol: function() {
    return "sessionId";
  }
};
var write5 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignNullable(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons15(writeForeignBoolean)(/* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "id";
  }
})(writeForeignString)(/* @__PURE__ */ writeForeignFieldsCons23(writeForeignString)(writeForeignFieldsNilRowR)()()())()()())()()())));
var readForeignFieldsCons1 = /* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "requestId";
  }
})(readForeignString)(readForeignFieldsNilRowRo)()();
var write12 = /* @__PURE__ */ write3(writeForeignBoolean);
var write23 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(writeForeignFieldsNilRowR));
var for_1 = /* @__PURE__ */ for_(applicativeAff);
var for_22 = /* @__PURE__ */ for_1(foldableMaybe);
var $$try4 = /* @__PURE__ */ $$try2(monadErrorAff);
var write33 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons(sessionIdIsSymbol2)(writeForeignString)(writeForeignFieldsNilRowR)()()()));
var when2 = /* @__PURE__ */ when(applicativeAff);
var for_3 = /* @__PURE__ */ for_1(foldableMap);
var pure13 = /* @__PURE__ */ pure(applicativeEffect);
var mempty3 = /* @__PURE__ */ mempty(monoidCanceler);
var unless1 = /* @__PURE__ */ unless(applicativeEffect);
var identity7 = /* @__PURE__ */ identity(categoryFn);
var applySecond2 = /* @__PURE__ */ applySecond(applyAff);
var show12 = /* @__PURE__ */ show(showInt);
var $$void6 = /* @__PURE__ */ $$void(functorAff);
var toolInputSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "additionalProperties";
  }
})(writeForeignBoolean)(/* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "properties";
  }
})(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons15(writeForeignRecord12)(/* @__PURE__ */ writeForeignFieldsCons23(writeForeignRecord12)(writeForeignFieldsNilRowR)()()())()()()))(/* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "required";
  }
})(/* @__PURE__ */ writeForeignArray(writeForeignString))(writeForeignFieldsCons16)()()())()()())()()()))({
  type: "object",
  properties: {
    path: {
      type: "string"
    },
    background: {
      type: "boolean"
    }
  },
  required: ["path"],
  additionalProperties: false
});
var takeRequest = function(state2) {
  return function(requestId) {
    return modify$prime(function(requests) {
      return {
        state: $$delete3(requestId)(requests),
        value: lookup4(requestId)(requests)
      };
    })(state2.requests);
  };
};
var heartbeatRequest = function(state2) {
  return function(requestId) {
    return function(clientId) {
      return bind3(liftEffect5(monotonicNowMilliseconds))(function(now2) {
        return liftEffect5(modify$prime(function(requests) {
          var v = lookup4(requestId)(requests);
          if (v instanceof Just && (eq3(v.value0.owner)(new Just(clientId)) && v.value0.leaseUntil > now2)) {
            return {
              state: insert6(requestId)({
                owner: v.value0.owner,
                finish: v.value0.finish,
                request: v.value0.request,
                leaseUntil: now2 + leaseMilliseconds
              })(requests),
              value: true
            };
          }
          return {
            state: requests,
            value: false
          };
        })(state2.requests));
      });
    };
  };
};
var failAll = function(state2) {
  return function(reason) {
    return function __do() {
      var requests = modify$prime(function(current) {
        return {
          state: empty2,
          value: current
        };
      })(state2.requests)();
      return for_2(requests)(function(entry) {
        return entry.finish(new Just(reason));
      })();
    };
  };
};
var expiryMessage = function(entry) {
  if (entry.owner instanceof Nothing) {
    return "No active local Markgraf TUI claimed this request within 5 seconds.";
  }
  if (entry.owner instanceof Just) {
    return "The local Markgraf TUI stopped heartbeating before playback closed.";
  }
  throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 240, column 23 - line 242, column 82): " + [entry.owner.constructor.name]);
};
var decode3 = function(dictReadForeign) {
  var read4 = read3(dictReadForeign);
  return function(value) {
    var v = read4(value);
    if (v instanceof Left) {
      return throwError3(error(show4(v.value0)));
    }
    if (v instanceof Right) {
      return pure6(v.value0);
    }
    throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 259, column 16 - line 261, column 30): " + [v.constructor.name]);
  };
};
var decode12 = /* @__PURE__ */ decode3(/* @__PURE__ */ readForeignRecord3(/* @__PURE__ */ readForeignFieldsCons2(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "hostname";
  }
})(readForeignString)(/* @__PURE__ */ readForeignFieldsCons(sessionIdIsSymbol2)(readForeignString)(readForeignFieldsNilRowRo)()())()())()()));
var decode22 = /* @__PURE__ */ decode3(/* @__PURE__ */ readForeignRecord3(/* @__PURE__ */ readForeignFieldsCons2(readForeignFieldsCons1)()()));
var decode32 = /* @__PURE__ */ decode3(/* @__PURE__ */ readForeignRecord3(/* @__PURE__ */ readForeignFieldsCons2(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "error";
  }
})(/* @__PURE__ */ readForeignNullable(readForeignString))(readForeignFieldsCons1)()())()()));
var decode4 = /* @__PURE__ */ decode3(/* @__PURE__ */ readForeignRecord3(/* @__PURE__ */ readForeignFieldsCons(backgroundIsSymbol2)(/* @__PURE__ */ readForeignNullable(readForeignBoolean))(/* @__PURE__ */ readForeignFieldsCons(pathIsSymbol2)(readForeignString)(readForeignFieldsNilRowRo)()())()()));
var completeRequest = function(state2) {
  return function(requestId) {
    return function(clientId) {
      return function(result) {
        return bind3(liftEffect5(monotonicNowMilliseconds))(function(now2) {
          return bind3(liftEffect5(modify$prime(function(requests) {
            var v = lookup4(requestId)(requests);
            if (v instanceof Just && eq3(v.value0.owner)(new Just(clientId))) {
              return {
                state: $$delete3(requestId)(requests),
                value: new Just(v.value0)
              };
            }
            return {
              state: requests,
              value: Nothing.value
            };
          })(state2.requests)))(function(entry) {
            return traverse_2(function(current) {
              return liftEffect5(current.finish(function() {
                var $200 = current.leaseUntil <= now2;
                if ($200) {
                  return new Just(expiryMessage(current));
                }
                return result;
              }()));
            })(entry);
          });
        });
      };
    };
  };
};
var claimMatching = function(now2) {
  return function(claimant) {
    return function(requests) {
      var choose = function(found) {
        return function(entry) {
          if (found instanceof Just) {
            return found;
          }
          if (found instanceof Nothing) {
            if (eq3(entry.owner)(Nothing.value) && (entry.leaseUntil > now2 && entry.request.sessionId === claimant.sessionId)) {
              return new Just(entry);
            }
            if (otherwise) {
              return Nothing.value;
            }
          }
          throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 183, column 24 - line 187, column 29): " + [found.constructor.name]);
        };
      };
      var v = foldl3(choose)(Nothing.value)(requests);
      if (v instanceof Nothing) {
        return {
          state: requests,
          value: Nothing.value
        };
      }
      if (v instanceof Just) {
        var updated = {
          finish: v.value0.finish,
          request: v.value0.request,
          owner: new Just(claimant.clientId),
          leaseUntil: now2 + leaseMilliseconds
        };
        var request = {
          id: v.value0.request.id,
          path: v.value0.request.path,
          background: v.value0.request.background
        };
        return {
          state: insert6(request.id)(updated)(requests),
          value: new Just(request)
        };
      }
      throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 174, column 3 - line 181, column 79): " + [v.constructor.name]);
    };
  };
};
var claimRequest = function(state2) {
  return function(claimant) {
    return discard1(unless2(claimant.hostname === state2.hostname)(throwError3(error("markgraf_play cannot send a server path to a TUI on another host."))))(function() {
      return bind3(liftEffect5(monotonicNowMilliseconds))(function(now2) {
        return liftEffect5(modify$prime(claimMatching(now2)(claimant))(state2.requests));
      });
    });
  };
};
var handlers = function(state2) {
  return [{
    name: "claim",
    handler: function(input) {
      return function(v) {
        return fromAff2(bind3(decode12(input))(function(request) {
          return bind3(claimRequest(state2)(request))(function(claimed) {
            return pure6(write5(toNullable(claimed)));
          });
        }));
      };
    }
  }, {
    name: "heartbeat",
    handler: function(input) {
      return function(v) {
        return fromAff2(bind3(decode22(input))(function(request) {
          return bind3(heartbeatRequest(state2)(request.requestId)(request.clientId))(function(active) {
            return pure6(write12(active));
          });
        }));
      };
    }
  }, {
    name: "complete",
    handler: function(input) {
      return function(v) {
        return fromAff2(bind3(decode32(input))(function(request) {
          return discard1(completeRequest(state2)(request.requestId)(request.clientId)(toMaybe(request.error)))(function() {
            return pure6(write23({}));
          });
        }));
      };
    }
  }];
};
var announce = function(state2) {
  return function(sessionId2) {
    return bind3(liftEffect5(read(state2.registration)))(function(registration) {
      return for_22(registration)(function(current) {
        return bind3($$try4(toAffE(emit(current)("announce")(write33({
          sessionId: sessionId2
        })))))(function(sent) {
          if (sent instanceof Right) {
            return pure6(unit);
          }
          if (sent instanceof Left) {
            return liftEffect5(failAll(state2)("Cannot notify the local Markgraf TUI: " + message(sent.value0)));
          }
          throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 254, column 5 - line 256, column 111): " + [sent.constructor.name]);
        });
      });
    });
  };
};
var cancelRequest = function(state2) {
  return function(requestId) {
    return function(sessionId2) {
      return function(reason) {
        return bind3(liftEffect5(takeRequest(state2)(requestId)))(function(entry) {
          return discard1(traverse_2(function(current) {
            return liftEffect5(current.finish(new Just(reason)));
          })(entry))(function() {
            return when2(isJust(entry))(announce(state2)(sessionId2));
          });
        });
      };
    };
  };
};
var expire = function(state2) {
  return bind3(liftEffect5(monotonicNowMilliseconds))(function(now2) {
    return bind3(liftEffect5(read(state2.requests)))(function(snapshot) {
      return for_3(snapshot)(function(candidate) {
        return bind3(liftEffect5(modify$prime(function(requests) {
          var v = lookup4(candidate.request.id)(requests);
          if (v instanceof Just && v.value0.leaseUntil <= now2) {
            return {
              state: $$delete3(candidate.request.id)(requests),
              value: new Just(v.value0)
            };
          }
          return {
            state: requests,
            value: Nothing.value
          };
        })(state2.requests)))(function(expired) {
          return for_22(expired)(function(entry) {
            return discard1(liftEffect5(entry.finish(new Just(expiryMessage(entry)))))(function() {
              return announce(state2)(entry.request.sessionId);
            });
          });
        });
      });
    });
  });
};
var waitForPlayback = function(state2) {
  return function(execution) {
    return function(request) {
      return makeAff(function(resolve5) {
        return function __do() {
          var closed = read(state2.closed)();
          if (closed) {
            resolve5(new Left(error("The Markgraf playback server has closed.")))();
            return mempty3;
          }
          var finished = $$new(false)();
          var removeAbortRef = $$new(pure13(unit))();
          var now2 = monotonicNowMilliseconds();
          var finish = function(reason) {
            return function __do() {
              var alreadyFinished = read(finished)();
              return unless1(alreadyFinished)(function __do() {
                write(true)(finished)();
                bind12(read(removeAbortRef))(identity7)();
                return resolve5(function() {
                  if (reason instanceof Nothing) {
                    return new Right(unit);
                  }
                  if (reason instanceof Just) {
                    return new Left(error(reason.value0));
                  }
                  throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 150, column 19 - line 152, column 55): " + [reason.constructor.name]);
                }())();
              })();
            };
          };
          var entry = {
            request,
            leaseUntil: now2 + leaseMilliseconds,
            owner: Nothing.value,
            finish
          };
          modify_(insert6(request.id)(entry))(state2.requests)();
          var removeAbort = onAbort(execution)(launchAff_(cancelRequest(state2)(request.id)(request.sessionId)("markgraf_play was cancelled before local playback closed.")))();
          write(removeAbort)(removeAbortRef)();
          launchAff_(announce(state2)(request.sessionId))();
          return function(v) {
            return applySecond2(liftEffect5(removeAbort))(cancelRequest(state2)(request.id)(request.sessionId)("markgraf_play wait was cancelled."));
          };
        };
      });
    };
  };
};
var tool = function(state2) {
  return function(context) {
    return {
      name: "markgraf_play",
      description: "Play a Markgraf animation inline in the active local OpenCode TUI and wait for it to close.",
      inputSchema: toolInputSchema,
      execute: function(input) {
        return function(execution) {
          return fromAff2(bind3(decode4(input))(function(request) {
            var requestedPath = trim(request.path);
            return discard1(when2(requestedPath === "")(throwError3(error("markgraf_play requires a non-empty animation path."))))(function() {
              return bind3(liftEffect5(locationDirectory(context)))(function(cwd) {
                return bind3(liftEffect5(resolve4([cwd])(requestedPath)))(function(absolutePath) {
                  return bind3(liftEffect5(modify(function(v) {
                    return v + 1 | 0;
                  })(state2.nextId)))(function(serial) {
                    var playback = {
                      id: "markgraf-playback-" + (state2.nonce + ("-" + show12(serial))),
                      path: absolutePath,
                      background: fromMaybe(false)(toMaybe(request.background)),
                      sessionId: sessionId(execution)
                    };
                    return discard1(waitForPlayback(state2)(execution)(playback))(function() {
                      return pure6(success("Closed inline Markgraf playback: " + absolutePath));
                    });
                  });
                });
              });
            });
          }));
        };
      }
    };
  };
};
var setup = function(context) {
  return fromAff2(bind3(liftEffect5(hostname))(function(hostname2) {
    return bind3(liftEffect5(randomInt(1e5)(2147483646)))(function(firstNonce) {
      return bind3(liftEffect5(randomInt(1e5)(2147483646)))(function(secondNonce) {
        var nonce = show12(firstNonce) + ("-" + show12(secondNonce));
        return bind3(liftEffect5($$new(empty2)))(function(requests) {
          return bind3(liftEffect5($$new(false)))(function(closed) {
            return bind3(liftEffect5($$new(0)))(function(nextId) {
              return bind3(liftEffect5($$new(Nothing.value)))(function(registrationRef) {
                var state2 = {
                  requests,
                  closed,
                  nextId,
                  nonce,
                  hostname: hostname2,
                  registration: registrationRef
                };
                return bind3(toAffE(register(context)(contract)(handlers(state2))))(function(registration) {
                  return discard1(liftEffect5(write(new Just(registration))(registrationRef)))(function() {
                    return bind3($$try4(toAffE(registerTool(context)(tool(state2)(context)))))(function(toolCleanupResult) {
                      return bind3(function() {
                        if (toolCleanupResult instanceof Left) {
                          return discard1($$void6($$try4(toAffE(dispose(registration)))))(function() {
                            return throwError3(toolCleanupResult.value0);
                          });
                        }
                        if (toolCleanupResult instanceof Right) {
                          return pure6(toolCleanupResult.value0);
                        }
                        throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 69, column 18 - line 73, column 34): " + [toolCleanupResult.constructor.name]);
                      }())(function(toolCleanup) {
                        return bind3(liftEffect5(setInterval2(250)(launchAff_(expire(state2)))))(function(timer) {
                          return pure6(function __do() {
                            clearInterval2(timer)();
                            write(true)(closed)();
                            write(Nothing.value)(registrationRef)();
                            return fromAff2(discard1(liftEffect5(failAll(state2)("Markgraf playback server reloaded before playback completed.")))(function() {
                              return bind3($$try4(toAffE(toolCleanup)))(function(toolResult) {
                                return bind3($$try4(toAffE(dispose(registration))))(function(registrationResult) {
                                  if (toolResult instanceof Left) {
                                    return throwError3(toolResult.value0);
                                  }
                                  if (toolResult instanceof Right) {
                                    if (registrationResult instanceof Left) {
                                      return throwError3(registrationResult.value0);
                                    }
                                    if (registrationResult instanceof Right) {
                                      return pure6(unit);
                                    }
                                    throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 85, column 20 - line 87, column 31): " + [registrationResult.constructor.name]);
                                  }
                                  throw new Error("Failed pattern match at Markgraf.OpenCode.Server (line 83, column 7 - line 87, column 31): " + [toolResult.constructor.name]);
                                });
                              });
                            }))();
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }));
};
var plugin = /* @__PURE__ */ define2({
  id: "markgraf.playback",
  setup
});

// npm/agents/index.js
var agents_default = plugin;
export {
  agents_default as default
};
