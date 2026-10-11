// npm/agents/tui.js
import { fileURLToPath } from "node:url";

// npm/output/Control.Apply/foreign.js
var arrayApply = function(fs) {
  return function(xs) {
    var l = fs.length;
    var k = xs.length;
    var result = new Array(l * k);
    var n = 0;
    for (var i = 0;i < l; i++) {
      var f = fs[i];
      for (var j = 0;j < k; j++) {
        result[n++] = f(xs[j]);
      }
    }
    return result;
  };
};

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
var applyArray = {
  apply: arrayApply,
  Functor0: function() {
    return functorArray;
  }
};
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
var applicativeArray = {
  pure: function(x) {
    return [x];
  },
  Apply0: function() {
    return applyArray;
  }
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
var map5 = /* @__PURE__ */ map(functorEither);
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
      return mapExceptT(map1(map5(f)));
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
    return function(map6) {
      return function(pure3) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure3([]);
                case 1:
                  return map6(array1)(f(array[bot]));
                case 2:
                  return apply2(map6(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply2(apply2(map6(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply2(map6(concat2)(go(bot, pivot)))(go(pivot, top2));
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
    var map6 = map(dictApplicative.Apply0().Functor0());
    return function(v) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return pure3(Nothing.value);
        }
        if (v1 instanceof Just) {
          return map6(Just.create)(v(v1.value0));
        }
        throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  },
  sequence: function(dictApplicative) {
    var pure3 = pure(dictApplicative);
    var map6 = map(dictApplicative.Apply0().Functor0());
    return function(v) {
      if (v instanceof Nothing) {
        return pure3(Nothing.value);
      }
      if (v instanceof Just) {
        return map6(Just.create)(v.value0);
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
var $runtime_lazy2 = function(name2, moduleName, init) {
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
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
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
  function Cons(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  var emptyList = {};
  function curryCons(head) {
    return function(tail) {
      return new Cons(head, tail);
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
  return function(foldr2, xs) {
    return listToArray(foldr2(curryCons)(emptyList)(xs));
  };
}();
var length = function(xs) {
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
// npm/output/Data.Array/index.js
var foldMap1 = /* @__PURE__ */ foldMap(foldableArray);
var range2 = /* @__PURE__ */ runFn2(rangeImpl);
var index = /* @__PURE__ */ function() {
  return runFn4(indexImpl)(Just.create)(Nothing.value);
}();
var fromFoldable = function(dictFoldable) {
  return runFn2(fromFoldableImpl)(foldr(dictFoldable));
};
var foldMap2 = function(dictMonoid) {
  return foldMap1(dictMonoid);
};
var findMap = /* @__PURE__ */ function() {
  return runFn4(findMapImpl)(Nothing.value)(isJust);
}();

// npm/output/Markgraf.Animation.Render.Theme/index.js
var Light = /* @__PURE__ */ function() {
  function Light2() {}
  Light2.value = new Light2;
  return Light2;
}();
var Dark = /* @__PURE__ */ function() {
  function Dark2() {}
  Dark2.value = new Dark2;
  return Dark2;
}();
var Blueprint = /* @__PURE__ */ function() {
  function Blueprint2() {}
  Blueprint2.value = new Blueprint2;
  return Blueprint2;
}();
var Whiteboard = /* @__PURE__ */ function() {
  function Whiteboard2() {}
  Whiteboard2.value = new Whiteboard2;
  return Whiteboard2;
}();
var Isometric = /* @__PURE__ */ function() {
  function Isometric2() {}
  Isometric2.value = new Isometric2;
  return Isometric2;
}();
var PaintBackground = /* @__PURE__ */ function() {
  function PaintBackground2() {}
  PaintBackground2.value = new PaintBackground2;
  return PaintBackground2;
}();
var TransparentBackground = /* @__PURE__ */ function() {
  function TransparentBackground2() {}
  TransparentBackground2.value = new TransparentBackground2;
  return TransparentBackground2;
}();
var showTheme = {
  show: function(v) {
    if (v instanceof Light) {
      return "light";
    }
    if (v instanceof Dark) {
      return "dark";
    }
    if (v instanceof Blueprint) {
      return "blueprint";
    }
    if (v instanceof Whiteboard) {
      return "whiteboard";
    }
    if (v instanceof Isometric) {
      return "isometric";
    }
    throw new Error("Failed pattern match at Markgraf.Animation.Render.Theme (line 28, column 1 - line 33, column 31): " + [v.constructor.name]);
  }
};
var eqBackgroundTransparency = {
  eq: function(x) {
    return function(y) {
      if (x instanceof PaintBackground && y instanceof PaintBackground) {
        return true;
      }
      if (x instanceof TransparentBackground && y instanceof TransparentBackground) {
        return true;
      }
      return false;
    };
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

// npm/output/Data.String.CodeUnits/foreign.js
var fromCharArray = function(a) {
  return a.join("");
};
var toCharArray = function(s) {
  return s.split("");
};
var singleton2 = function(c) {
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

// npm/output/Data.Number.Format/foreign.js
function wrap2(method) {
  return function(d) {
    return function(num) {
      return method.apply(num, [d]);
    };
  };
}
var toPrecisionNative = wrap2(Number.prototype.toPrecision);
var toFixedNative = wrap2(Number.prototype.toFixed);
var toExponentialNative = wrap2(Number.prototype.toExponential);

// npm/output/Data.Number.Format/index.js
var clamp2 = /* @__PURE__ */ clamp(ordInt);
var Precision = /* @__PURE__ */ function() {
  function Precision2(value0) {
    this.value0 = value0;
  }
  Precision2.create = function(value0) {
    return new Precision2(value0);
  };
  return Precision2;
}();
var Fixed = /* @__PURE__ */ function() {
  function Fixed2(value0) {
    this.value0 = value0;
  }
  Fixed2.create = function(value0) {
    return new Fixed2(value0);
  };
  return Fixed2;
}();
var Exponential = /* @__PURE__ */ function() {
  function Exponential2(value0) {
    this.value0 = value0;
  }
  Exponential2.create = function(value0) {
    return new Exponential2(value0);
  };
  return Exponential2;
}();
var toStringWith = function(v) {
  if (v instanceof Precision) {
    return toPrecisionNative(v.value0);
  }
  if (v instanceof Fixed) {
    return toFixedNative(v.value0);
  }
  if (v instanceof Exponential) {
    return toExponentialNative(v.value0);
  }
  throw new Error("Failed pattern match at Data.Number.Format (line 59, column 1 - line 59, column 43): " + [v.constructor.name]);
};
var fixed = /* @__PURE__ */ function() {
  var $9 = clamp2(0)(20);
  return function($10) {
    return Fixed.create($9($10));
  };
}();

// npm/output/Data.String.Common/foreign.js
var split = function(sep) {
  return function(s) {
    return s.split(sep);
  };
};
var trim = function(s) {
  return s.trim();
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
var singleton3 = function(dictPlus) {
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
var map6 = /* @__PURE__ */ map(functorList);
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
      return "(" + (intercalate2(" : ")(map6(show2)(v)) + " : Nil)");
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
        return append1(map6(v.value0)(v1))(apply(applyList)(v.value1)(v1));
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
    var $315 = singleton3(plusList);
    return function($316) {
      return NonEmptyList($315($316));
    };
  }(),
  Apply0: function() {
    return applyNonEmptyList;
  }
};

// npm/output/Data.Map.Internal/index.js
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
var singleton4 = function(k) {
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
        return singleton4(k)(v);
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
var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
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
          return singleton4(k)(v);
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
      var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
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
      var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
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
var isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};
// npm/output/Data.List.NonEmpty/index.js
var singleton5 = /* @__PURE__ */ function() {
  var $200 = singleton3(plusList);
  return function($201) {
    return NonEmptyList($200($201));
  };
}();

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
    return $153(singleton5($154));
  };
};
var readArray = function(dictMonad) {
  var pure1 = pure(applicativeExceptT(dictMonad));
  var fail1 = fail(dictMonad);
  return function(value) {
    if (isArray(value)) {
      return pure1(unsafeFromForeign(value));
    }
    if (otherwise) {
      return fail1(new TypeMismatch("array", tagOf(value)));
    }
    throw new Error("Failed pattern match at Foreign (line 164, column 1 - line 164, column 99): " + [value.constructor.name]);
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
    var error2 = new Left(singleton5(new TypeMismatch("Int", tagOf(value))));
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
// npm/output/Control.Monad.Except/index.js
var unwrap2 = /* @__PURE__ */ unwrap();
var withExcept = /* @__PURE__ */ withExceptT(functorIdentity);
var runExcept = function($3) {
  return unwrap2(runExceptT($3));
};

// npm/output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head2, tail) {
    this.head = head2;
    this.tail = tail;
  };
  function finalCell(head2) {
    return new ConsCell(head2, emptyList);
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
  return function(apply3, map7, f) {
    var buildFrom = function(x, ys) {
      return apply3(map7(consList)(f(x)))(ys);
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
      var acc = map7(finalCell)(f(array[array.length - 1]));
      var result = go(acc, array.length - 1, array);
      while (result instanceof Cont) {
        result = result.fn();
      }
      return map7(listToArray)(result);
    };
  };
}();
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
var newImpl = function() {
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
  var fromFoldable1 = fromFoldable(dictFoldable);
  return function(l) {
    return runST(function __do() {
      var s = newImpl();
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
var insert4 = function() {
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
var readString2 = /* @__PURE__ */ readString(monadIdentity);
var readNumber2 = /* @__PURE__ */ readNumber(monadIdentity);
var bindExceptT2 = /* @__PURE__ */ bindExceptT(monadIdentity);
var pure4 = /* @__PURE__ */ pure(applicativeNonEmptyList);
var except2 = /* @__PURE__ */ except(applicativeIdentity);
var readInt2 = /* @__PURE__ */ readInt(monadIdentity);
var applicativeExceptT2 = /* @__PURE__ */ applicativeExceptT(monadIdentity);
var pure1 = /* @__PURE__ */ pure(applicativeExceptT2);
var map7 = /* @__PURE__ */ map(functorArray);
var compose1 = /* @__PURE__ */ compose(semigroupoidBuilder);
var insert6 = /* @__PURE__ */ insert4()();
var append2 = /* @__PURE__ */ append(semigroupNonEmptyList);
var functorExceptT2 = /* @__PURE__ */ functorExceptT(functorIdentity);
var map1 = /* @__PURE__ */ map(functorExceptT2);
var map22 = /* @__PURE__ */ map(functorNonEmptyList);
var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindExceptT2);
var map32 = /* @__PURE__ */ map(functorFn);
var traverse2 = /* @__PURE__ */ traverse(traversableMaybe)(applicativeExceptT2);
var readNull2 = /* @__PURE__ */ readNull(monadIdentity);
var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindExceptT2);
var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
var mapWithIndex4 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
var readArray2 = /* @__PURE__ */ readArray(monadIdentity);
var writeForeignString = {
  writeImpl: unsafeToForeign
};
var writeForeignNumber = {
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
  readImpl: readString2
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
      return unsafeToForeign(map7(writeImpl5)(xs));
    }
  };
};
var writeForeignFieldsCons = function(dictIsSymbol) {
  var get3 = get2(dictIsSymbol)();
  var insert42 = insert6(dictIsSymbol);
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
var sequenceCombining = function(dictMonoid) {
  var append22 = append(dictMonoid.Semigroup0());
  var mempty2 = mempty(dictMonoid);
  return function(dictFoldable) {
    var foldl3 = foldl(dictFoldable);
    return function(dictApplicative) {
      var pure23 = pure(dictApplicative);
      var fn = function(acc) {
        return function(elem3) {
          var v = runExcept(elem3);
          if (acc instanceof Left && v instanceof Left) {
            return new Left(append2(acc.value0)(v.value0));
          }
          if (acc instanceof Left && v instanceof Right) {
            return new Left(acc.value0);
          }
          if (acc instanceof Right && v instanceof Right) {
            return new Right(append22(acc.value0)(pure23(v.value0)));
          }
          if (acc instanceof Right && v instanceof Left) {
            return new Left(v.value0);
          }
          throw new Error("Failed pattern match at Yoga.JSON (line 662, column 5 - line 666, column 37): " + [acc.constructor.name, v.constructor.name]);
        };
      };
      var $517 = foldl3(fn)(new Right(mempty2));
      return function($518) {
        return except2($517($518));
      };
    };
  };
};
var sequenceCombining1 = /* @__PURE__ */ sequenceCombining(monoidArray)(foldableArray)(applicativeArray);
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
      return withExcept(map22(reformat))(bindFlipped3(map32(map1(toNullable))(traverse2(readImpl5)))(readNull2(o)));
    }
  };
};
var readAtIdx = function(dictReadForeign) {
  var readImpl5 = readImpl(dictReadForeign);
  return function(i) {
    return function(f) {
      return withExcept(map22(ErrorAtIndex.create(i)))(readImpl5(f));
    };
  };
};
var readForeignArray = function(dictReadForeign) {
  return {
    readImpl: composeKleisliFlipped2(function() {
      var $554 = mapWithIndex4(readAtIdx(dictReadForeign));
      return function($555) {
        return sequenceCombining1($554($555));
      };
    }())(readArray2)
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
  var insert42 = insert6(dictIsSymbol);
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
                var first = map1(insert42($$Proxy.value))(value);
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
        return map1(flip(build)({}))(getFields1($$Proxy.value)(o));
      }
    };
  };
};
// npm/output/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";
var _unsafeCodePointAt0 = function(fallback) {
  return hasCodePointAt ? function(str) {
    return str.codePointAt(0);
  } : fallback;
};
var _singleton = function(fallback) {
  return hasFromCodePoint ? String.fromCodePoint : fallback;
};
var _take = function(fallback) {
  return function(n) {
    if (hasStringIterator) {
      return function(str) {
        var accum = "";
        var iter = str[Symbol.iterator]();
        for (var i = 0;i < n; ++i) {
          var o = iter.next();
          if (o.done)
            return accum;
          accum += o.value;
        }
        return accum;
      };
    }
    return fallback(n);
  };
};
var _toCodePointArray = function(fallback) {
  return function(unsafeCodePointAt0) {
    if (hasArrayFrom) {
      return function(str) {
        return Array.from(str, unsafeCodePointAt0);
      };
    }
    return fallback;
  };
};
// npm/output/Data.String.CodePoints/index.js
var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
var map8 = /* @__PURE__ */ map(functorMaybe);
var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
var div2 = /* @__PURE__ */ div(euclideanRingInt);
var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
var unsurrogate = function(lead) {
  return function(trail) {
    return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
  };
};
var isTrail = function(cu) {
  return 56320 <= cu && cu <= 57343;
};
var isLead = function(cu) {
  return 55296 <= cu && cu <= 56319;
};
var uncons6 = function(s) {
  var v = length2(s);
  if (v === 0) {
    return Nothing.value;
  }
  if (v === 1) {
    return new Just({
      head: fromEnum2(charAt(0)(s)),
      tail: ""
    });
  }
  var cu1 = fromEnum2(charAt(1)(s));
  var cu0 = fromEnum2(charAt(0)(s));
  var $43 = isLead(cu0) && isTrail(cu1);
  if ($43) {
    return new Just({
      head: unsurrogate(cu0)(cu1),
      tail: drop(2)(s)
    });
  }
  return new Just({
    head: cu0,
    tail: drop(1)(s)
  });
};
var unconsButWithTuple = function(s) {
  return map8(function(v) {
    return new Tuple(v.head, v.tail);
  })(uncons6(s));
};
var toCodePointArrayFallback = function(s) {
  return unfoldr2(unconsButWithTuple)(s);
};
var unsafeCodePointAt0Fallback = function(s) {
  var cu0 = fromEnum2(charAt(0)(s));
  var $47 = isLead(cu0) && length2(s) > 1;
  if ($47) {
    var cu1 = fromEnum2(charAt(1)(s));
    var $48 = isTrail(cu1);
    if ($48) {
      return unsurrogate(cu0)(cu1);
    }
    return cu0;
  }
  return cu0;
};
var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
var length5 = function($74) {
  return length(toCodePointArray($74));
};
var indexOf2 = function(p) {
  return function(s) {
    return map8(function(i) {
      return length5(take(i)(s));
    })(indexOf(p)(s));
  };
};
var fromCharCode2 = /* @__PURE__ */ function() {
  var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
  return function($76) {
    return singleton2($75($76));
  };
}();
var singletonFallback = function(v) {
  if (v <= 65535) {
    return fromCharCode2(v);
  }
  var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
  var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
  return fromCharCode2(lead) + fromCharCode2(trail);
};
var singleton8 = /* @__PURE__ */ _singleton(singletonFallback);
var takeFallback = function(v) {
  return function(v1) {
    if (v < 1) {
      return "";
    }
    var v2 = uncons6(v1);
    if (v2 instanceof Just) {
      return singleton8(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
    }
    return v1;
  };
};
var take4 = /* @__PURE__ */ _take(takeFallback);
var drop4 = function(n) {
  return function(s) {
    return drop(length2(take4(n)(s)))(s);
  };
};
// npm/output/Yoga.WebProletarian.Runtime/foreign.js
var monotonicNowMilliseconds = () => globalThis.performance.now();
// npm/output/Markgraf.Animation.Player.Playback/index.js
var map9 = /* @__PURE__ */ map(functorEffect);
var monotonicNowSec = /* @__PURE__ */ map9(function($186) {
  return Seconds(function(v) {
    return v / 1000;
  }($186));
})(monotonicNowMilliseconds);

// npm/output/Data.Op/index.js
var Op = function(x) {
  return x;
};

// npm/output/Data.Options/index.js
var fromFoldable6 = /* @__PURE__ */ fromFoldable3(foldableArray);
var semigroupOptions = semigroupArray;
var options = function(v) {
  return unsafeToForeign(fromFoldable6(v));
};
var monoidOptions = monoidArray;
var defaultToOptions = function(k) {
  return function(v) {
    return [new Tuple(k, unsafeToForeign(v))];
  };
};
var opt = function($8) {
  return Op(defaultToOptions($8));
};
var assoc = /* @__PURE__ */ unwrap();

// npm/output/Node.ChildProcess.Types/foreign.js
var fromKillSignalImpl = (fromInt2, fromStr, sig) => {
  const ty = typeof sig;
  if (ty === "number")
    return fromInt2(sig | 0);
  if (ty === "string")
    return fromStr(sig);
  throw new Error("Impossible. Got kill signal that was neither int nor string: " + sig);
};

// npm/output/Node.ChildProcess.Types/index.js
var show3 = /* @__PURE__ */ show(showInt);
var show12 = /* @__PURE__ */ show(showString);
var Normally = /* @__PURE__ */ function() {
  function Normally2(value0) {
    this.value0 = value0;
  }
  Normally2.create = function(value0) {
    return new Normally2(value0);
  };
  return Normally2;
}();
var BySignal = /* @__PURE__ */ function() {
  function BySignal2(value0) {
    this.value0 = value0;
  }
  BySignal2.create = function(value0) {
    return new BySignal2(value0);
  };
  return BySignal2;
}();
var fromKillSignal$prime = function(fromInt2) {
  return function(fromStr) {
    return function(sig) {
      return fromKillSignalImpl(fromInt2, fromStr, sig);
    };
  };
};
var fromKillSignal = function(sig) {
  return fromKillSignal$prime(Left.create)(Right.create)(sig);
};
var showExit = {
  show: function(v) {
    if (v instanceof Normally) {
      return "Normally " + show3(v.value0);
    }
    if (v instanceof BySignal) {
      return "BySignal " + either(show3)(show12)(fromKillSignal(v.value0));
    }
    throw new Error("Failed pattern match at Node.ChildProcess.Types (line 149, column 1 - line 151, column 79): " + [v.constructor.name]);
  }
};

// npm/output/Node.EventEmitter/foreign.js
var unsafeOn = (emitter, eventName, cb) => emitter.on(eventName, cb);
// npm/output/Node.EventEmitter/index.js
var EventHandle = /* @__PURE__ */ function() {
  function EventHandle2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  EventHandle2.create = function(value0) {
    return function(value1) {
      return new EventHandle2(value0, value1);
    };
  };
  return EventHandle2;
}();
var on_ = function(v) {
  return function(psCb) {
    return function(eventEmitter) {
      return function() {
        return unsafeOn(eventEmitter, v.value0, v.value1(psCb));
      };
    };
  };
};
// npm/output/Node.UnsafeChildProcess.Safe/index.js
var show4 = /* @__PURE__ */ show(/* @__PURE__ */ showNullable(showInt));
var errorH = /* @__PURE__ */ function() {
  return new EventHandle("error", mkEffectFn1);
}();
var closeH = /* @__PURE__ */ function() {
  return new EventHandle("close", function(cb) {
    return function(code, signal) {
      var v = toMaybe(signal);
      var v1 = toMaybe(code);
      if (v1 instanceof Just) {
        return cb(new Normally(v1.value0))();
      }
      if (v instanceof Just) {
        return cb(new BySignal(v.value0))();
      }
      return unsafeCrashWith("Impossible. 'close' event did not get an exit code or kill signal: " + (show4(code) + ("; " + signal)))();
    };
  });
}();

// npm/output/Node.UnsafeChildProcess.Unsafe/foreign.js
import {
  exec,
  exec as exec2,
  exec as exec3,
  exec as exec4,
  execFile,
  execFile as execFile2,
  execFile as execFile3,
  execFile as execFile4,
  spawn,
  spawn as spawn2,
  execSync,
  execSync as execSync2,
  execFileSync,
  execFileSync as execFileSync2,
  spawnSync,
  spawnSync as spawnSync2,
  fork,
  fork as fork2
} from "node:child_process";
var unsafeStdin = (cp) => cp.stdin;
var unsafeStdout = (cp) => cp.stdout;
var unsafeStderr = (cp) => cp.stderr;
// npm/output/Node.UnsafeChildProcess.Unsafe/index.js
var spawn3 = function(command) {
  return function(args) {
    return function() {
      return spawn(command, args);
    };
  };
};

// npm/output/Node.ChildProcess/index.js
var coerce3 = /* @__PURE__ */ coerce();
var unsafeFromNull = unsafeCoerce2;
var toUnsafeChildProcess = function(v) {
  return v;
};
var stdout = function($30) {
  return unsafeFromNull(unsafeStdout(toUnsafeChildProcess($30)));
};
var stdin = function($31) {
  return unsafeFromNull(unsafeStdin(toUnsafeChildProcess($31)));
};
var stderr = function($32) {
  return unsafeFromNull(unsafeStderr(toUnsafeChildProcess($32)));
};
var spawn4 = function(cmd) {
  return function(args) {
    return coerce3(spawn3(cmd)(args));
  };
};
var errorH2 = errorH;
var closeH2 = closeH;

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

// npm/output/Node.Errors.SystemError/foreign.js
var getField = (field, err) => err[field];
// npm/output/Node.Errors.SystemError/index.js
var message2 = /* @__PURE__ */ runFn2(getField)("message");
var code = /* @__PURE__ */ runFn2(getField)("code");

// npm/output/Node.ReadLine/foreign.js
import readline from "node:readline";
var createInterfaceImpl = (options2) => readline.createInterface({
  input: options2.input,
  output: options2.output,
  completer: options2.completer && ((line) => {
    const res = options2.completer(line)();
    return [res.completions, res.matched];
  }),
  terminal: options2.terminal,
  history: options2.history,
  historySize: options2.historySize,
  removeHistoryDuplicates: options2.removeHistoryDuplicates,
  prompt: options2.prompt,
  crlfDelay: options2.crlfDelay,
  escapeCodeTimeout: options2.escapeCodeTimeout,
  tabSize: options2.tabSize,
  signal: options2.signal
});
var closeImpl = (rl) => rl.close();

// npm/output/Node.Process/foreign.js
import process from "process";
var abortImpl = process.abort ? () => process.abort() : null;
var channelRefImpl = process.channel && process.channel.ref ? () => process.channel.ref() : null;
var channelUnrefImpl = process.channel && process.channel.unref ? () => process.channel.unref() : null;
var debugPort = process.debugPort;
var disconnectImpl2 = process.disconnect ? () => process.disconnect() : null;
var unsafeGetEnv = () => process.env;
var pid2 = process.pid;
var platformStr = process.platform;
var ppid = process.ppid;
var stdin2 = process.stdin;
var stdout2 = process.stdout;
var stderr2 = process.stderr;
var stdinIsTTY = process.stdinIsTTY;
var stdoutIsTTY = process.stdoutIsTTY;
var stderrIsTTY = process.stderrIsTTY;
var version = process.version;
// npm/output/Node.Process/index.js
var map10 = /* @__PURE__ */ map(functorEffect);
var lookupEnv = function(k) {
  return map10(lookup3(k))(unsafeGetEnv);
};

// npm/output/Node.ReadLine/index.js
var append3 = /* @__PURE__ */ append(semigroupOptions);
var lineH = /* @__PURE__ */ function() {
  return new EventHandle("line", mkEffectFn1);
}();
var createInterface = function(input) {
  return function(opts) {
    return function() {
      return createInterfaceImpl(options(append3(opts)(assoc(opt("input"))(input))));
    };
  };
};
var close = function(iface) {
  return function() {
    return closeImpl(iface);
  };
};

// npm/output/Node.Stream/foreign.js
var writeStringImpl = (w, str, enc) => w.write(str, enc);
var endImpl = (w) => w.end();

// npm/output/Node.Buffer.Immutable/foreign.js
import { Buffer as Buffer2 } from "node:buffer";
var fromStringImpl3 = (str, encoding) => Buffer2.from(str, encoding);
var toStringImpl = (enc, buff) => buff.toString(enc);
// npm/output/Node.Buffer.Immutable/index.js
var toString4 = function(enc) {
  return function(buf) {
    return toStringImpl(encodingToNode(enc), buf);
  };
};
var fromString5 = function(str) {
  return function(enc) {
    return fromStringImpl3(str, encodingToNode(enc));
  };
};
// npm/output/Node.Buffer/index.js
var pure5 = /* @__PURE__ */ pure(applicativeEffect);
var map11 = /* @__PURE__ */ map(functorEffect);
var unsafeThaw2 = function($7) {
  return pure5($7);
};
var usingToImmutable = function(f) {
  return function(x) {
    return unsafeThaw2(f(x));
  };
};
var unsafeFreeze2 = function($8) {
  return pure5($8);
};
var usingFromImmutable = function(f) {
  return function(buf) {
    return map11(f)(unsafeFreeze2(buf));
  };
};
var toString5 = function(enc) {
  return usingFromImmutable(toString4(enc));
};
var fromString6 = function(s) {
  return usingToImmutable(fromString5(s));
};
// npm/output/Node.Stream/index.js
var writeString = function(w) {
  return function(enc) {
    return function(str) {
      return function() {
        return writeStringImpl(w, str, encodingToNode(enc));
      };
    };
  };
};
var errorH3 = /* @__PURE__ */ function() {
  return new EventHandle("error", mkEffectFn1);
}();
var end = function(w) {
  return function() {
    return endImpl(w);
  };
};

// npm/output/Markgraf.Terminal.Native/index.js
var bind2 = /* @__PURE__ */ bind(bindEither);
var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
var show5 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
var readJSON2 = /* @__PURE__ */ readJSON(readForeignForeign);
var readForeignRecord2 = /* @__PURE__ */ readForeignRecord();
var read5 = /* @__PURE__ */ read3(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "event";
  }
})(readForeignString)(readForeignFieldsNilRowRo)()()));
var map12 = /* @__PURE__ */ map(functorEither);
var readForeignArray2 = /* @__PURE__ */ readForeignArray(readForeignInt);
var read1 = /* @__PURE__ */ read3(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "duration";
  }
})(readForeignNumber)(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "fps";
  }
})(readForeignInt)(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "keyframeFrames";
  }
})(readForeignArray2)(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "sceneFrames";
  }
})(readForeignArray2)(readForeignFieldsNilRowRo)()())()())()())()()));
var heightIsSymbol = {
  reflectSymbol: function() {
    return "height";
  }
};
var idIsSymbol = {
  reflectSymbol: function() {
    return "id";
  }
};
var readForeignFieldsCons2 = /* @__PURE__ */ readForeignFieldsCons(idIsSymbol)(readForeignInt);
var indexIsSymbol = {
  reflectSymbol: function() {
    return "index";
  }
};
var widthIsSymbol = {
  reflectSymbol: function() {
    return "width";
  }
};
var read22 = /* @__PURE__ */ read3(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "byteLength";
  }
})(readForeignInt)(/* @__PURE__ */ readForeignFieldsCons(heightIsSymbol)(readForeignInt)(/* @__PURE__ */ readForeignFieldsCons2(/* @__PURE__ */ readForeignFieldsCons(indexIsSymbol)(readForeignInt)(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "name";
  }
})(readForeignString)(/* @__PURE__ */ readForeignFieldsCons(widthIsSymbol)(readForeignInt)(readForeignFieldsNilRowRo)()())()())()())()())()())()()));
var read32 = /* @__PURE__ */ read3(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons2(readForeignFieldsNilRowRo)()()));
var pure6 = /* @__PURE__ */ pure(applicativeEither);
var read42 = /* @__PURE__ */ read3(/* @__PURE__ */ readForeignRecord2(/* @__PURE__ */ readForeignFieldsCons({
  reflectSymbol: function() {
    return "message";
  }
})(readForeignString)(readForeignFieldsNilRowRo)()()));
var append12 = /* @__PURE__ */ append(semigroupArray);
var show13 = /* @__PURE__ */ show(showTheme);
var eq3 = /* @__PURE__ */ eq(eqBackgroundTransparency);
var mempty2 = /* @__PURE__ */ mempty(monoidOptions);
var unless2 = /* @__PURE__ */ unless(applicativeEffect);
var $$void5 = /* @__PURE__ */ $$void(functorEffect);
var show22 = /* @__PURE__ */ show(showExit);
var writeForeignRecord2 = /* @__PURE__ */ writeForeignRecord();
var writeForeignFieldsCons2 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "op";
  }
})(writeForeignString);
var writeJSON2 = /* @__PURE__ */ writeJSON(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons(heightIsSymbol)(writeForeignInt)(/* @__PURE__ */ writeForeignFieldsCons(indexIsSymbol)(writeForeignInt)(/* @__PURE__ */ writeForeignFieldsCons2(/* @__PURE__ */ writeForeignFieldsCons(widthIsSymbol)(writeForeignInt)(writeForeignFieldsNilRowR)()()())()()())()()())()()()));
var writeJSON1 = /* @__PURE__ */ writeJSON(/* @__PURE__ */ writeForeignRecord2(/* @__PURE__ */ writeForeignFieldsCons(idIsSymbol)(writeForeignInt)(/* @__PURE__ */ writeForeignFieldsCons2(writeForeignFieldsNilRowR)()()())()()()));
var Ready = /* @__PURE__ */ function() {
  function Ready2(value0) {
    this.value0 = value0;
  }
  Ready2.create = function(value0) {
    return new Ready2(value0);
  };
  return Ready2;
}();
var Rendered = /* @__PURE__ */ function() {
  function Rendered2(value0) {
    this.value0 = value0;
  }
  Rendered2.create = function(value0) {
    return new Rendered2(value0);
  };
  return Rendered2;
}();
var Consumed = /* @__PURE__ */ function() {
  function Consumed2(value0) {
    this.value0 = value0;
  }
  Consumed2.create = function(value0) {
    return new Consumed2(value0);
  };
  return Consumed2;
}();
var Failed = /* @__PURE__ */ function() {
  function Failed2(value0) {
    this.value0 = value0;
  }
  Failed2.create = function(value0) {
    return new Failed2(value0);
  };
  return Failed2;
}();
var decode = function(line) {
  return bind2(lmap3(show5)(readJSON2(line)))(function(value) {
    return bind2(lmap3(show5)(read5(value)))(function(tag) {
      if (tag.event === "ready") {
        return map12(Ready.create)(lmap3(show5)(read1(value)));
      }
      if (tag.event === "frame") {
        return map12(Rendered.create)(lmap3(show5)(read22(value)));
      }
      if (tag.event === "consumed") {
        return bind2(lmap3(show5)(read32(value)))(function(consumed) {
          return pure6(new Consumed(consumed.id));
        });
      }
      if (tag.event === "error") {
        return bind2(lmap3(show5)(read42(value)))(function(failure) {
          return pure6(new Failed(failure.message));
        });
      }
      return new Left("Unknown event: " + tag.event);
    });
  });
};
var launch = function(executable) {
  return function(path) {
    return function(theme) {
      return function(transparency) {
        return function(receive) {
          return function(failed) {
            return function __do() {
              var child = spawn4(executable)(append12([path, "--frame-server", "--theme", show13(theme), "--max-width", "1440", "--max-height", "720"])(function() {
                var $150 = eq3(transparency)(PaintBackground.value);
                if ($150) {
                  return ["--background"];
                }
                return [];
              }()))();
              var closing = $$new(false)();
              var exited = $$new(false)();
              var diagnostic = $$new(Nothing.value)();
              var output = createInterface(stdout(child))(mempty2)();
              var errors = createInterface(stderr(child))(mempty2)();
              var send = function(value) {
                return function __do() {
                  var stopped = read(closing)();
                  return unless2(stopped)($$void5(writeString(stdin(child))(UTF8.value)(value + `
`)))();
                };
              };
              var report = function(reason) {
                return function __do() {
                  var stopped = read(closing)();
                  return unless2(stopped)(failed(reason))();
                };
              };
              var close2 = function __do() {
                var stopped = read(closing)();
                return unless2(stopped)(function __do() {
                  write(true)(closing)();
                  var finished = read(exited)();
                  return unless2(finished)(end(stdin(child)))();
                })();
              };
              on_(errorH2)(function(err) {
                return report(message2(err) + function() {
                  var $151 = code(err) === "ENOENT";
                  if ($151) {
                    return `
The packaged native renderer is missing. Reinstall or rebuild the Markgraf agent integration package.`;
                  }
                  return "";
                }());
              })(child)();
              on_(errorH3)(function($155) {
                return report(message($155));
              })(stdin(child))();
              on_(errorH3)(function($156) {
                return report(message($156));
              })(stdout(child))();
              on_(errorH3)(function($157) {
                return report(message($157));
              })(stderr(child))();
              on_(lineH)(function(line) {
                return write(new Just(line))(diagnostic);
              })(errors)();
              on_(lineH)(function(line) {
                var v = decode(line);
                if (v instanceof Left) {
                  return report("Invalid native frame response: " + v.value0);
                }
                if (v instanceof Right) {
                  return receive(v.value0);
                }
                throw new Error("Failed pattern match at Markgraf.Terminal.Native (line 79, column 16 - line 81, column 37): " + [v.constructor.name]);
              })(output)();
              on_(closeH2)(function(status) {
                return function __do() {
                  write(true)(exited)();
                  close(output)();
                  close(errors)();
                  var detail = read(diagnostic)();
                  return report(fromMaybe("Native Markgraf exited: " + show22(status))(detail))();
                };
              })(child)();
              return {
                frame: function(index3) {
                  return function(width) {
                    return function(height) {
                      return send(writeJSON2({
                        op: "frame",
                        index: index3,
                        width,
                        height
                      }));
                    };
                  };
                },
                consume: function(id) {
                  return send(writeJSON1({
                    op: "consume",
                    id
                  }));
                },
                release: function(id) {
                  return send(writeJSON1({
                    op: "release",
                    id
                  }));
                },
                close: close2
              };
            };
          };
        };
      };
    };
  };
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
  uptime as uptime2,
  userInfo,
  version as version2
} from "node:os";
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
function concat3(segments) {
  return path.join.apply(this, segments);
}
function resolve(from3) {
  return (to2) => () => path.resolve.apply(this, from3.concat([to2]));
}
var basename = path.basename;
var extname = path.extname;
var sep = path.sep;
var delimiter = path.delimiter;
var parse2 = path.parse;
var isAbsolute = path.isAbsolute;
// npm/output/Markgraf.Terminal.Player/index.js
var $runtime_lazy4 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var discard2 = /* @__PURE__ */ discard(discardUnit);
var discard1 = /* @__PURE__ */ discard2(bindAff);
var unless3 = /* @__PURE__ */ unless(applicativeAff);
var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
var when2 = /* @__PURE__ */ when(applicativeAff);
var bind3 = /* @__PURE__ */ bind(bindAff);
var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
var pure7 = /* @__PURE__ */ pure(applicativeAff);
var div3 = /* @__PURE__ */ div(euclideanRingInt);
var min3 = /* @__PURE__ */ min(ordNumber);
var max3 = /* @__PURE__ */ max(ordNumber);
var max1 = /* @__PURE__ */ max(ordInt);
var min1 = /* @__PURE__ */ min(ordInt);
var bind1 = /* @__PURE__ */ bind(bindEffect);
var pure12 = /* @__PURE__ */ pure(applicativeEffect);
var when1 = /* @__PURE__ */ when(applicativeEffect);
var notEq2 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqRec()(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(eqRowNil)()({
  reflectSymbol: function() {
    return "width";
  }
})(eqInt))()({
  reflectSymbol: function() {
    return "rows";
  }
})(eqInt))()({
  reflectSymbol: function() {
    return "height";
  }
})(eqInt))()({
  reflectSymbol: function() {
    return "columns";
  }
})(eqInt)));
var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
var unless1 = /* @__PURE__ */ unless(applicativeEffect);
var identity7 = /* @__PURE__ */ identity(categoryFn);
var applySecond2 = /* @__PURE__ */ applySecond(applyEffect);
var Idle = /* @__PURE__ */ function() {
  function Idle2() {}
  Idle2.value = new Idle2;
  return Idle2;
}();
var Rendering = /* @__PURE__ */ function() {
  function Rendering2(value0) {
    this.value0 = value0;
  }
  Rendering2.create = function(value0) {
    return new Rendering2(value0);
  };
  return Rendering2;
}();
var AwaitingAcknowledgement = /* @__PURE__ */ function() {
  function AwaitingAcknowledgement2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  AwaitingAcknowledgement2.create = function(value0) {
    return function(value1) {
      return new AwaitingAcknowledgement2(value0, value1);
    };
  };
  return AwaitingAcknowledgement2;
}();
var AwaitingConsumption = /* @__PURE__ */ function() {
  function AwaitingConsumption2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  AwaitingConsumption2.create = function(value0) {
    return function(value1) {
      return new AwaitingConsumption2(value0, value1);
    };
  };
  return AwaitingConsumption2;
}();
var Close = /* @__PURE__ */ function() {
  function Close2() {}
  Close2.value = new Close2;
  return Close2;
}();
var TogglePlayback = /* @__PURE__ */ function() {
  function TogglePlayback2() {}
  TogglePlayback2.value = new TogglePlayback2;
  return TogglePlayback2;
}();
var Restart = /* @__PURE__ */ function() {
  function Restart2() {}
  Restart2.value = new Restart2;
  return Restart2;
}();
var Step = /* @__PURE__ */ function() {
  function Step2(value0) {
    this.value0 = value0;
  }
  Step2.create = function(value0) {
    return new Step2(value0);
  };
  return Step2;
}();
var PreviousKeyframe = /* @__PURE__ */ function() {
  function PreviousKeyframe2() {}
  PreviousKeyframe2.value = new PreviousKeyframe2;
  return PreviousKeyframe2;
}();
var NextKeyframe = /* @__PURE__ */ function() {
  function NextKeyframe2() {}
  NextKeyframe2.value = new NextKeyframe2;
  return NextKeyframe2;
}();
var PreviousScene = /* @__PURE__ */ function() {
  function PreviousScene2() {}
  PreviousScene2.value = new PreviousScene2;
  return PreviousScene2;
}();
var NextScene = /* @__PURE__ */ function() {
  function NextScene2() {}
  NextScene2.value = new NextScene2;
  return NextScene2;
}();
var Accepted = /* @__PURE__ */ function() {
  function Accepted2() {}
  Accepted2.value = new Accepted2;
  return Accepted2;
}();
var Consumed2 = /* @__PURE__ */ function() {
  function Consumed3() {}
  Consumed3.value = new Consumed3;
  return Consumed3;
}();
var Discarded = /* @__PURE__ */ function() {
  function Discarded2() {}
  Discarded2.value = new Discarded2;
  return Discarded2;
}();
var Rejected = /* @__PURE__ */ function() {
  function Rejected2(value0) {
    this.value0 = value0;
  }
  Rejected2.create = function(value0) {
    return new Rejected2(value0);
  };
  return Rejected2;
}();
var seconds = /* @__PURE__ */ toStringWith(/* @__PURE__ */ fixed(2));
var resolve2 = function(root) {
  return function(cwd2) {
    return function(options2) {
      return discard1(unless3(platformStr === "darwin")(throwError2(error("Native inline playback requires macOS Metal."))))(function() {
        var path2 = trim(options2.path);
        return discard1(when2(path2 === "")(throwError2(error("Usage: /markgraf [--background] path/to/animation.markgraf"))))(function() {
          return bind3(liftEffect3(arch2))(function(architecture) {
            return discard1(function() {
              if (architecture instanceof Arm64) {
                return pure7(unit);
              }
              return throwError2(error("Native inline playback requires Apple Silicon macOS."));
            }())(function() {
              return bind3(liftEffect3(resolve([cwd2])(path2)))(function(absolute) {
                return pure7({
                  executable: concat3([root, "native", "Markgraf Editor.app", "Contents", "MacOS", "markgraf"]),
                  path: absolute,
                  transparency: options2.transparency,
                  position: {
                    time: 0,
                    playing: true
                  }
                });
              });
            });
          });
        });
      });
    };
  };
};
var protocolAcknowledgement = function(response) {
  var $92 = response === "OK";
  if ($92) {
    return Consumed2.value;
  }
  return new Rejected("Kitty shared-memory transfer failed: " + response);
};
var previousStopAt = function($copy_frames) {
  return function($copy_current) {
    return function($copy_lower) {
      return function($copy_upper) {
        return function($copy_result) {
          var $tco_var_frames = $copy_frames;
          var $tco_var_current = $copy_current;
          var $tco_var_lower = $copy_lower;
          var $tco_var_upper = $copy_upper;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(frames, current, lower, upper, result) {
            if (lower > upper) {
              $tco_done = true;
              return result;
            }
            if (otherwise) {
              var middle = div3(lower + upper | 0)(2);
              var v = index(frames)(middle);
              if (v instanceof Just) {
                if (v.value0 < current) {
                  $tco_var_frames = frames;
                  $tco_var_current = current;
                  $tco_var_lower = middle + 1 | 0;
                  $tco_var_upper = upper;
                  $copy_result = v.value0;
                  return;
                }
                if (otherwise) {
                  $tco_var_frames = frames;
                  $tco_var_current = current;
                  $tco_var_lower = lower;
                  $tco_var_upper = middle - 1 | 0;
                  $copy_result = result;
                  return;
                }
              }
              if (v instanceof Nothing) {
                $tco_done = true;
                return result;
              }
              throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 410, column 9 - line 414, column 28): " + [v.constructor.name]);
            }
            throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 403, column 1 - line 403, column 63): " + [frames.constructor.name, current.constructor.name, lower.constructor.name, upper.constructor.name, result.constructor.name]);
          }
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_frames, $tco_var_current, $tco_var_lower, $tco_var_upper, $copy_result);
          }
          return $tco_result;
        };
      };
    };
  };
};
var previousStop = function(frames) {
  return function(current) {
    return previousStopAt(frames)(current)(0)(length(frames) - 1 | 0)(0);
  };
};
var playhead = function(state2) {
  return function(now2) {
    return min3(state2.duration)(max3(0)(state2.baseTime + function() {
      if (state2.playing) {
        return now2 - state2.epoch;
      }
      return 0;
    }()));
  };
};
var nextStopAt = function($copy_frames) {
  return function($copy_current) {
    return function($copy_lower) {
      return function($copy_upper) {
        return function($copy_result) {
          var $tco_var_frames = $copy_frames;
          var $tco_var_current = $copy_current;
          var $tco_var_lower = $copy_lower;
          var $tco_var_upper = $copy_upper;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(frames, current, lower, upper, result) {
            if (lower > upper) {
              $tco_done = true;
              return result;
            }
            if (otherwise) {
              var middle = div3(lower + upper | 0)(2);
              var v = index(frames)(middle);
              if (v instanceof Just) {
                if (v.value0 > current) {
                  $tco_var_frames = frames;
                  $tco_var_current = current;
                  $tco_var_lower = lower;
                  $tco_var_upper = middle - 1 | 0;
                  $copy_result = v.value0;
                  return;
                }
                if (otherwise) {
                  $tco_var_frames = frames;
                  $tco_var_current = current;
                  $tco_var_lower = middle + 1 | 0;
                  $tco_var_upper = upper;
                  $copy_result = result;
                  return;
                }
              }
              if (v instanceof Nothing) {
                $tco_done = true;
                return result;
              }
              throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 426, column 9 - line 430, column 28): " + [v.constructor.name]);
            }
            throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 419, column 1 - line 419, column 59): " + [frames.constructor.name, current.constructor.name, lower.constructor.name, upper.constructor.name, result.constructor.name]);
          }
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_frames, $tco_var_current, $tco_var_lower, $tco_var_upper, $copy_result);
          }
          return $tco_result;
        };
      };
    };
  };
};
var nextStop = function(frames) {
  return function(current) {
    return nextStopAt(frames)(current)(0)(length(frames) - 1 | 0)(current);
  };
};
var fitViewport = function(size4) {
  var rows = max1(1)(min1(floor2(720 / size4.cellHeight))(min1(18)(div3(size4.rows - 6 | 0)(2))));
  var columns = max1(1)(min1(floor2(1440 / size4.cellWidth))(min1(297)(size4.columns - 2 | 0)));
  return {
    width: max1(1)(min1(1440)(floor2(toNumber(columns) * size4.cellWidth))),
    height: max1(1)(min1(720)(floor2(toNumber(rows) * size4.cellHeight))),
    columns,
    rows
  };
};
var create = function(options2) {
  return function(surface) {
    return function __do() {
      var initial = surface.viewport();
      var stateRef = $$new({
        ready: false,
        duration: 0,
        fps: 120,
        sceneFrames: [],
        keyframeFrames: [],
        playing: options2.position.playing,
        baseTime: options2.position.time,
        epoch: 0,
        revision: 0,
        shownRevision: -1 | 0,
        shownIndex: -1 | 0,
        pipeline: Idle.value,
        size: initial,
        visible: false,
        alt: false,
        disposed: false
      })();
      var processRef = $$new(Nothing.value)();
      var tickRef = $$new(Nothing.value)();
      var acknowledgementRef = $$new(Nothing.value)();
      var unsubscribeInputRef = $$new(Nothing.value)();
      var unsubscribePaintRef = $$new(Nothing.value)();
      var snapshot = function __do() {
        var state2 = read(stateRef)();
        var v = monotonicNowSec();
        return {
          time: function() {
            if (state2.ready) {
              return playhead(state2)(v);
            }
            return max3(0)(state2.baseTime);
          }(),
          playing: state2.playing,
          idle: function() {
            if (state2.pipeline instanceof Idle) {
              return true;
            }
            return false;
          }()
        };
      };
      var shownMoment = function __do() {
        var state2 = read(stateRef)();
        var $111 = state2.ready && (state2.visible && (!state2.disposed && state2.shownIndex >= 0));
        if ($111) {
          return new Just({
            time: min3(state2.duration)(toNumber(state2.shownIndex) / toNumber(state2.fps)),
            frame: state2.shownIndex,
            fps: state2.fps
          });
        }
        return Nothing.value;
      };
      var render = function __do() {
        var current = surface.viewport();
        var previous = read(stateRef)();
        when1(notEq2(current)(previous.size))(modify_(function(s) {
          return {
            alt: s.alt,
            baseTime: s.baseTime,
            disposed: s.disposed,
            duration: s.duration,
            epoch: s.epoch,
            fps: s.fps,
            keyframeFrames: s.keyframeFrames,
            pipeline: s.pipeline,
            playing: s.playing,
            ready: s.ready,
            sceneFrames: s.sceneFrames,
            shownIndex: s.shownIndex,
            shownRevision: s.shownRevision,
            size: current,
            visible: false,
            revision: s.revision + 1 | 0
          };
        })(stateRef))();
        var state2 = read(stateRef)();
        var allowed = surface.observeImage();
        var time = max3(0)(min3(state2.duration)(toNumber(state2.shownIndex) / toNumber(state2.fps)));
        var status = basename(options2.path) + (" · " + function() {
          var $112 = !state2.ready;
          if ($112) {
            return "Starting native Metal renderer...";
          }
          return seconds(time) + ("/" + (seconds(state2.duration) + ("s · " + function() {
            if (state2.playing) {
              return "playing";
            }
            return "paused";
          }())));
        }());
        return {
          status,
          ready: state2.ready,
          footer: "space play/pause · ←/→ keyframe · ↑/↓ scene · [/] frame · home · q/esc",
          size: state2.size,
          imageVisible: allowed
        };
      };
      var cancelTimer = function(ref2) {
        return function __do() {
          bind1(read(ref2))(traverse_2(clearTimeout2))();
          return write(Nothing.value)(ref2)();
        };
      };
      var $lazy_pump = $runtime_lazy4("pump", "Markgraf.Terminal.Player", function() {
        return function __do() {
          cancelTimer(tickRef)();
          var state2 = read(stateRef)();
          var active = surface.active();
          return when1(state2.ready && (state2.visible && (active && !state2.disposed)))(function() {
            if (state2.pipeline instanceof Idle) {
              return function __do() {
                var v = monotonicNowSec();
                var time = playhead(state2)(v);
                var index3 = function() {
                  var $116 = time >= state2.duration;
                  if ($116) {
                    return ceil2(state2.duration * toNumber(state2.fps));
                  }
                  if (state2.playing) {
                    return floor2(time * toNumber(state2.fps));
                  }
                  return round2(time * toNumber(state2.fps));
                }();
                var $118 = index3 !== state2.shownIndex || state2.revision !== state2.shownRevision;
                if ($118) {
                  var request = {
                    revision: state2.revision,
                    index: index3,
                    size: state2.size
                  };
                  modify_(function(v1) {
                    return {
                      alt: v1.alt,
                      baseTime: v1.baseTime,
                      disposed: v1.disposed,
                      duration: v1.duration,
                      epoch: v1.epoch,
                      fps: v1.fps,
                      keyframeFrames: v1.keyframeFrames,
                      playing: v1.playing,
                      ready: v1.ready,
                      revision: v1.revision,
                      sceneFrames: v1.sceneFrames,
                      shownIndex: v1.shownIndex,
                      shownRevision: v1.shownRevision,
                      size: v1.size,
                      visible: v1.visible,
                      pipeline: new Rendering(request)
                    };
                  })(stateRef)();
                  return bind1(read(processRef))(traverse_2(function($$native) {
                    return $$native.frame(index3)(state2.size.width)(state2.size.height);
                  }))();
                }
                return when1(state2.playing && time < state2.duration)(function() {
                  var deadline = state2.epoch + (toNumber(index3 + 1 | 0) / toNumber(state2.fps) - state2.baseTime);
                  return function __do() {
                    var timer = setTimeout2(max1(1)(ceil2((deadline - v) * 1000)))($lazy_pump(224))();
                    return write(new Just(timer))(tickRef)();
                  };
                }())();
              };
            }
            return pure12(unit);
          }())();
        };
      });
      var pump = $lazy_pump(203);
      var painted = function(paint) {
        return function __do() {
          var state2 = read(stateRef)();
          return unless1(state2.disposed)(function() {
            var refreshed = paint.reset || (paint.alt !== state2.alt || paint.visible && !state2.visible);
            return function __do() {
              modify_(function(s) {
                return {
                  baseTime: s.baseTime,
                  disposed: s.disposed,
                  duration: s.duration,
                  epoch: s.epoch,
                  fps: s.fps,
                  keyframeFrames: s.keyframeFrames,
                  pipeline: s.pipeline,
                  playing: s.playing,
                  ready: s.ready,
                  sceneFrames: s.sceneFrames,
                  shownIndex: s.shownIndex,
                  shownRevision: s.shownRevision,
                  size: s.size,
                  visible: paint.visible,
                  alt: paint.alt,
                  revision: function() {
                    if (refreshed) {
                      return s.revision + 1 | 0;
                    }
                    return s.revision;
                  }()
                };
              })(stateRef)();
              return pump();
            };
          }())();
        };
      };
      var seek = function(index3) {
        return function(playing) {
          return function __do() {
            var v = monotonicNowSec();
            modify_(function(s) {
              return {
                duration: s.duration,
                fps: s.fps,
                alt: s.alt,
                disposed: s.disposed,
                keyframeFrames: s.keyframeFrames,
                pipeline: s.pipeline,
                ready: s.ready,
                sceneFrames: s.sceneFrames,
                shownIndex: s.shownIndex,
                shownRevision: s.shownRevision,
                size: s.size,
                visible: s.visible,
                baseTime: max3(0)(min3(s.duration)(toNumber(index3) / toNumber(s.fps))),
                epoch: v,
                playing,
                revision: s.revision + 1 | 0
              };
            })(stateRef)();
            surface.requestRender();
            return pump();
          };
        };
      };
      var stopTransport = function __do() {
        cancelTimer(acknowledgementRef)();
        bind1(read(unsubscribeInputRef))(traverse_2(identity7))();
        write(Nothing.value)(unsubscribeInputRef)();
        return bind1(read(processRef))(traverse_2(function(v) {
          return v.close;
        }))();
      };
      var cleanup = function __do() {
        var state2 = read(stateRef)();
        return unless1(state2.disposed)(function __do() {
          modify_(function(v) {
            return {
              alt: v.alt,
              baseTime: v.baseTime,
              duration: v.duration,
              epoch: v.epoch,
              fps: v.fps,
              keyframeFrames: v.keyframeFrames,
              pipeline: v.pipeline,
              playing: v.playing,
              ready: v.ready,
              revision: v.revision,
              sceneFrames: v.sceneFrames,
              shownIndex: v.shownIndex,
              shownRevision: v.shownRevision,
              size: v.size,
              disposed: true,
              visible: false
            };
          })(stateRef)();
          cancelTimer(tickRef)();
          bind1(read(unsubscribePaintRef))(traverse_2(identity7))();
          write(Nothing.value)(unsubscribePaintRef)();
          surface.releaseImage();
          surface.requestRender();
          if (state2.pipeline instanceof AwaitingAcknowledgement) {
            modify_(function(v) {
              return {
                alt: v.alt,
                baseTime: v.baseTime,
                disposed: v.disposed,
                duration: v.duration,
                epoch: v.epoch,
                fps: v.fps,
                keyframeFrames: v.keyframeFrames,
                playing: v.playing,
                ready: v.ready,
                revision: v.revision,
                sceneFrames: v.sceneFrames,
                shownIndex: v.shownIndex,
                shownRevision: v.shownRevision,
                size: v.size,
                visible: v.visible,
                pipeline: new AwaitingConsumption(state2.pipeline.value0, state2.pipeline.value1)
              };
            })(stateRef)();
            return bind1(read(processRef))(traverse_2(function($$native) {
              return $$native.consume(state2.pipeline.value1);
            }))();
          }
          if (state2.pipeline instanceof AwaitingConsumption) {
            return unit;
          }
          return stopTransport();
        })();
      };
      var finish = function(result) {
        return function __do() {
          var state2 = read(stateRef)();
          return unless1(state2.disposed)(function __do() {
            cleanup();
            return surface.done(result)();
          })();
        };
      };
      var failPlayback = function(reason) {
        return finish(new Left(reason));
      };
      var input = function(action) {
        return function __do() {
          var state2 = read(stateRef)();
          var v = monotonicNowSec();
          var time = playhead(state2)(v);
          var index3 = function() {
            var $127 = time >= state2.duration;
            if ($127) {
              return ceil2(state2.duration * toNumber(state2.fps));
            }
            if (state2.playing) {
              return floor2(time * toNumber(state2.fps));
            }
            return round2(time * toNumber(state2.fps));
          }();
          if (action instanceof Close) {
            return finish(new Right(unit))();
          }
          if (action instanceof TogglePlayback) {
            return when1(state2.ready)(seek(function() {
              var $130 = !state2.playing && time >= state2.duration;
              if ($130) {
                return 0;
              }
              return index3;
            }())(!state2.playing))();
          }
          if (action instanceof Restart) {
            return when1(state2.ready)(seek(0)(state2.playing))();
          }
          if (action instanceof Step) {
            return when1(state2.ready)(seek(index3 + action.value0 | 0)(false))();
          }
          if (action instanceof PreviousKeyframe) {
            return when1(state2.ready)(seek(previousStop(state2.keyframeFrames)(index3))(false))();
          }
          if (action instanceof NextKeyframe) {
            return when1(state2.ready)(seek(nextStop(state2.keyframeFrames)(index3))(false))();
          }
          if (action instanceof PreviousScene) {
            return when1(state2.ready)(seek(previousStop(state2.sceneFrames)(index3))(false))();
          }
          if (action instanceof NextScene) {
            return when1(state2.ready)(seek(nextStop(state2.sceneFrames)(index3))(false))();
          }
          throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 337, column 7 - line 345, column 86): " + [action.constructor.name]);
        };
      };
      var completeTransfer = function(request) {
        return function __do() {
          cancelTimer(acknowledgementRef)();
          var state2 = read(stateRef)();
          var reachedEnd = request.revision === state2.revision && request.index >= ceil2(state2.duration * toNumber(state2.fps));
          var previous = max3(0)(toNumber(state2.shownIndex) / toNumber(state2.fps));
          var looping = reachedEnd && (state2.playing && state2.duration > 0);
          var current = min3(state2.duration)(toNumber(request.index) / toNumber(state2.fps));
          modify_(function(s) {
            return {
              duration: s.duration,
              alt: s.alt,
              disposed: s.disposed,
              fps: s.fps,
              keyframeFrames: s.keyframeFrames,
              ready: s.ready,
              revision: s.revision,
              sceneFrames: s.sceneFrames,
              size: s.size,
              visible: s.visible,
              pipeline: Idle.value,
              shownIndex: request.index,
              shownRevision: request.revision,
              playing: s.playing && (!reachedEnd || looping),
              baseTime: function() {
                if (looping) {
                  return 0;
                }
                if (reachedEnd) {
                  return s.duration;
                }
                return s.baseTime;
              }(),
              epoch: function() {
                if (looping) {
                  return s.epoch + s.duration - s.baseTime;
                }
                return s.epoch;
              }()
            };
          })(stateRef)();
          if (state2.disposed) {
            return stopTransport();
          }
          when1(request.revision !== state2.shownRevision || (reachedEnd || floor2(current * 4) !== floor2(previous * 4)))(surface.requestRender)();
          return pump();
        };
      };
      var receive = function(event) {
        return function __do() {
          var state2 = read(stateRef)();
          if (event instanceof Ready && !state2.disposed) {
            var v = monotonicNowSec();
            modify_(function(v1) {
              return {
                alt: v1.alt,
                disposed: v1.disposed,
                pipeline: v1.pipeline,
                playing: v1.playing,
                revision: v1.revision,
                shownIndex: v1.shownIndex,
                shownRevision: v1.shownRevision,
                size: v1.size,
                visible: v1.visible,
                ready: true,
                duration: event.value0.duration,
                fps: event.value0.fps,
                sceneFrames: event.value0.sceneFrames,
                keyframeFrames: event.value0.keyframeFrames,
                epoch: v,
                baseTime: max3(0)(min3(event.value0.duration)(state2.baseTime))
              };
            })(stateRef)();
            surface.requestRender();
            return pump();
          }
          if (event instanceof Rendered) {
            if (state2.pipeline instanceof Rendering) {
              var active = surface.active();
              var $140 = state2.disposed || (!state2.visible || (!active || state2.pipeline.value0.revision !== state2.revision));
              if ($140) {
                bind1(read(processRef))(traverse_2(function($$native) {
                  return $$native.release(event.value0.id);
                }))();
                modify_(function(v2) {
                  return {
                    alt: v2.alt,
                    baseTime: v2.baseTime,
                    disposed: v2.disposed,
                    duration: v2.duration,
                    epoch: v2.epoch,
                    fps: v2.fps,
                    keyframeFrames: v2.keyframeFrames,
                    playing: v2.playing,
                    ready: v2.ready,
                    revision: v2.revision,
                    sceneFrames: v2.sceneFrames,
                    shownIndex: v2.shownIndex,
                    shownRevision: v2.shownRevision,
                    size: v2.size,
                    visible: v2.visible,
                    pipeline: Idle.value
                  };
                })(stateRef)();
                return unless1(state2.disposed)(pump)();
              }
              modify_(function(v2) {
                return {
                  alt: v2.alt,
                  baseTime: v2.baseTime,
                  disposed: v2.disposed,
                  duration: v2.duration,
                  epoch: v2.epoch,
                  fps: v2.fps,
                  keyframeFrames: v2.keyframeFrames,
                  playing: v2.playing,
                  ready: v2.ready,
                  revision: v2.revision,
                  sceneFrames: v2.sceneFrames,
                  shownIndex: v2.shownIndex,
                  shownRevision: v2.shownRevision,
                  size: v2.size,
                  visible: v2.visible,
                  pipeline: new AwaitingAcknowledgement(state2.pipeline.value0, event.value0.id)
                };
              })(stateRef)();
              var timer = setTimeout2(5000)(function __do() {
                var expired = modify(function(v2) {
                  return {
                    alt: v2.alt,
                    baseTime: v2.baseTime,
                    disposed: v2.disposed,
                    duration: v2.duration,
                    epoch: v2.epoch,
                    fps: v2.fps,
                    keyframeFrames: v2.keyframeFrames,
                    playing: v2.playing,
                    ready: v2.ready,
                    revision: v2.revision,
                    sceneFrames: v2.sceneFrames,
                    shownIndex: v2.shownIndex,
                    shownRevision: v2.shownRevision,
                    size: v2.size,
                    visible: v2.visible,
                    pipeline: Idle.value
                  };
                })(stateRef)();
                if (expired.disposed) {
                  return stopTransport();
                }
                return failPlayback("Kitty did not acknowledge the shared-memory frame. Inline playback requires a local terminal.")();
              })();
              write(new Just(timer))(acknowledgementRef)();
              var sent = $$try(surface.transmit(state2.pipeline.value0.size.columns)(state2.pipeline.value0.size.rows)(event.value0))();
              if (sent instanceof Left) {
                modify_(function(v2) {
                  return {
                    alt: v2.alt,
                    baseTime: v2.baseTime,
                    disposed: v2.disposed,
                    duration: v2.duration,
                    epoch: v2.epoch,
                    fps: v2.fps,
                    keyframeFrames: v2.keyframeFrames,
                    playing: v2.playing,
                    ready: v2.ready,
                    revision: v2.revision,
                    sceneFrames: v2.sceneFrames,
                    shownIndex: v2.shownIndex,
                    shownRevision: v2.shownRevision,
                    size: v2.size,
                    visible: v2.visible,
                    pipeline: Idle.value
                  };
                })(stateRef)();
                return failPlayback(message(sent.value0))();
              }
              if (sent instanceof Right) {
                return unit;
              }
              throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 297, column 15 - line 301, column 37): " + [sent.constructor.name]);
            }
            return unless1(state2.disposed)(failPlayback("Native renderer sent an unsolicited frame."))();
          }
          if (event instanceof Consumed) {
            if (state2.pipeline instanceof AwaitingConsumption && event.value0 === state2.pipeline.value1) {
              return completeTransfer(state2.pipeline.value0)();
            }
            return unless1(state2.disposed)(failPlayback("Native renderer consumed an unexpected frame."))();
          }
          if (event instanceof Failed) {
            return failPlayback(event.value0)();
          }
          return unit;
        };
      };
      var acknowledge = function(response) {
        return function __do() {
          var state2 = read(stateRef)();
          if (state2.pipeline instanceof AwaitingAcknowledgement) {
            if (response instanceof Accepted) {
              modify_(function(v) {
                return {
                  alt: v.alt,
                  baseTime: v.baseTime,
                  disposed: v.disposed,
                  duration: v.duration,
                  epoch: v.epoch,
                  fps: v.fps,
                  keyframeFrames: v.keyframeFrames,
                  playing: v.playing,
                  ready: v.ready,
                  revision: v.revision,
                  sceneFrames: v.sceneFrames,
                  shownIndex: v.shownIndex,
                  shownRevision: v.shownRevision,
                  size: v.size,
                  visible: v.visible,
                  pipeline: new AwaitingConsumption(state2.pipeline.value0, state2.pipeline.value1)
                };
              })(stateRef)();
              return bind1(read(processRef))(traverse_2(function($$native) {
                return $$native.consume(state2.pipeline.value1);
              }))();
            }
            if (response instanceof Consumed2) {
              bind1(read(processRef))(traverse_2(function($$native) {
                return $$native.release(state2.pipeline.value1);
              }))();
              return completeTransfer(state2.pipeline.value0)();
            }
            if (response instanceof Discarded) {
              cancelTimer(acknowledgementRef)();
              bind1(read(processRef))(traverse_2(function($$native) {
                return $$native.release(state2.pipeline.value1);
              }))();
              modify_(function(v) {
                return {
                  alt: v.alt,
                  baseTime: v.baseTime,
                  disposed: v.disposed,
                  duration: v.duration,
                  epoch: v.epoch,
                  fps: v.fps,
                  keyframeFrames: v.keyframeFrames,
                  playing: v.playing,
                  ready: v.ready,
                  revision: v.revision,
                  sceneFrames: v.sceneFrames,
                  shownIndex: v.shownIndex,
                  shownRevision: v.shownRevision,
                  size: v.size,
                  visible: v.visible,
                  pipeline: Idle.value
                };
              })(stateRef)();
              if (state2.disposed) {
                return stopTransport();
              }
              return pump();
            }
            if (response instanceof Rejected) {
              cancelTimer(acknowledgementRef)();
              bind1(read(processRef))(traverse_2(function($$native) {
                return $$native.release(state2.pipeline.value1);
              }))();
              modify_(function(v) {
                return {
                  alt: v.alt,
                  baseTime: v.baseTime,
                  disposed: v.disposed,
                  duration: v.duration,
                  epoch: v.epoch,
                  fps: v.fps,
                  keyframeFrames: v.keyframeFrames,
                  playing: v.playing,
                  ready: v.ready,
                  revision: v.revision,
                  sceneFrames: v.sceneFrames,
                  shownIndex: v.shownIndex,
                  shownRevision: v.shownRevision,
                  size: v.size,
                  visible: v.visible,
                  pipeline: Idle.value
                };
              })(stateRef)();
              if (state2.disposed) {
                return stopTransport();
              }
              return failPlayback(response.value0)();
            }
            throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 254, column 47 - line 270, column 74): " + [response.constructor.name]);
          }
          return unit;
        };
      };
      var unsubscribeInput = surface.onAcknowledgement(acknowledge)();
      write(new Just(unsubscribeInput))(unsubscribeInputRef)();
      var unsubscribePaint = surface.onPaint(painted)();
      write(new Just(unsubscribePaint))(unsubscribePaintRef)();
      var launched = $$try(launch(options2.executable)(options2.path)(surface.theme)(options2.transparency)(receive)(failPlayback))();
      if (launched instanceof Left) {
        return applySecond2(cleanup)(throwException(launched.value0))();
      }
      if (launched instanceof Right) {
        write(new Just(launched.value0))(processRef)();
        return {
          render,
          input,
          snapshot,
          shownMoment,
          dispose: cleanup
        };
      }
      throw new Error("Failed pattern match at Markgraf.Terminal.Player (line 391, column 3 - line 395, column 70): " + [launched.constructor.name]);
    };
  };
};
var commandOptions = function(requested) {
  var path2 = trim(requested);
  var v = stripPrefix("--background")(path2);
  if (v instanceof Just && (v.value0 === "" || trim(v.value0) !== v.value0)) {
    return {
      path: trim(v.value0),
      transparency: PaintBackground.value
    };
  }
  return {
    path: path2,
    transparency: TransparentBackground.value
  };
};

// npm/output/OpenCode.TUI/foreign.js
import { Plugin } from "@opencode/plugin/tui";
import { jsx } from "@opentui/solid/jsx-runtime";
import { createEffect, createRoot } from "solid-js";
var define = (definition) => Plugin.define({
  id: definition.id,
  setup: (context) => definition.setup(context)()
});
var renderer = (context) => context.renderer;
var cwd2 = (context) => () => (context.location ?? context.data.location.default()).directory;
var themeMode = (context) => () => context.themeMode;
var mutedColor = (context) => () => context.theme.text.muted;
var route = (context) => () => {
  const current = context.ui.router.current();
  return {
    kind: current.type,
    sessionID: current.type === "session" ? current.sessionID : null
  };
};
var observeRoute = (context) => (callback) => () => createRoot((dispose) => {
  createEffect(() => {
    context.ui.router.current();
    callback();
  });
  return dispose;
});
var registerCommand = (context) => (command) => (run3) => () => {
  context.keymap.layer(() => ({
    mode: "global",
    commands: [
      {
        id: command.id,
        title: command.title,
        description: command.description,
        group: command.group,
        palette: true,
        slash: { name: command.name, arguments: true },
        run: (input) => run3(input ?? null)()
      }
    ]
  }));
};
var mountSlot = (context) => (path2) => (factory) => () => context.ui.slot({
  append: path2,
  render: (input) => jsx(() => factory(input.sessionID ?? null)())
});
var pushMode = (context) => (mode) => () => context.keymap.mode.push(mode);
var registerKeys = (context) => (renderable) => (mode) => (commands) => () => {
  context.keymap.layer(() => ({
    mode,
    target: () => renderable,
    priority: 100,
    commands: commands.map((command) => ({
      id: command.id,
      bind: command.bind,
      run: (_input, event) => {
        event?.preventDefault();
        event?.stopPropagation();
        command.run();
      }
    }))
  }));
};
var notifyError = (context) => (message3) => () => {
  context.ui.toast.show({ message: message3, variant: "error" });
};
// npm/output/OpenTUI/foreign.js
import { BoxRenderable, RGBA, resolveRenderLib } from "@opentui/core";
var nativeRenderLibrary;
var textEncoder = new TextEncoder;
var renderLibrary = () => {
  nativeRenderLibrary ??= resolveRenderLib();
  return nativeRenderLibrary;
};
var subscribe = (target, event, callback) => () => {
  const listener = () => callback();
  target.on(event, listener);
  return () => target.off(event, listener);
};
var createBox = (renderer2) => (options2) => (renderAfter) => () => {
  const renderable = new BoxRenderable(renderer2, {
    width: options2.width,
    height: options2.height,
    flexShrink: options2.flexShrink,
    backgroundColor: options2.backgroundColor,
    renderAfter(buffer) {
      renderAfter(this)(buffer)();
    }
  });
  renderable.focusable = options2.focusable;
  return renderable;
};
var metrics = (renderer2) => () => {
  const resolution = renderer2.resolution;
  return {
    columns: renderer2.terminalWidth,
    rows: renderer2.terminalHeight,
    width: renderer2.width,
    height: renderer2.height,
    resolution: resolution === null ? null : {
      width: resolution.width,
      height: resolution.height
    }
  };
};
var bounds = (renderable) => () => ({
  x: renderable.screenX,
  y: renderable.screenY,
  width: renderable.width,
  height: renderable.height,
  visible: renderable.visible,
  destroyed: renderable.isDestroyed,
  focused: renderable.focused
});
var capabilities = (renderer2) => () => {
  const terminalCapabilities = renderer2.capabilities;
  return terminalCapabilities === null ? null : {
    kittyGraphics: terminalCapabilities.kitty_graphics,
    rgb: terminalCapabilities.rgb,
    remote: terminalCapabilities.remote,
    multiplexer: terminalCapabilities.multiplexer !== "none"
  };
};
var controlState = (renderer2) => () => renderer2.controlState;
var isDestroyed = (renderer2) => () => renderer2.isDestroyed;
var focused = (renderer2) => () => renderer2.currentFocusedRenderable;
var focus = (renderable) => () => {
  renderable.focus();
};
var setHeight = (renderable) => (height) => () => {
  renderable.height = height;
};
var requestRender = (renderer2) => () => {
  renderer2.requestRender();
};
var writeControl = (renderer2) => (control) => () => {
  renderLibrary().writeOut(renderer2.rendererPtr, textEncoder.encode(control));
};
var prependInputHandler = (renderer2) => (callback) => () => {
  const handler = (sequence2) => callback(sequence2)();
  renderer2.prependInputHandler(handler);
  return () => renderer2.removeInputHandler(handler);
};
var onFrame = (renderer2) => (callback) => subscribe(renderer2, "frame", callback);
var onRendererDestroy = (renderer2) => (callback) => subscribe(renderer2, "destroy", callback);
var onDestroyed = (renderable) => (callback) => subscribe(renderable, "destroyed", callback);
var rgba = (red) => (green) => (blue) => (alpha) => RGBA.fromInts(red, green, blue, alpha);
var drawText = (buffer) => (text) => (x) => (y) => (foreground) => (background) => () => {
  buffer.drawText(text, x, y, foreground, background, 0);
};
var pushScissor = (buffer) => (rect) => () => {
  buffer.pushScissorRect(rect.x, rect.y, rect.width, rect.height);
};
var popScissor = (buffer) => () => {
  buffer.popScissorRect();
};
// npm/output/OpenTUI.Kitty/index.js
var map13 = /* @__PURE__ */ map(functorArray);
var min4 = /* @__PURE__ */ min(ordInt);
var div4 = /* @__PURE__ */ div(euclideanRingInt);
var foldMap3 = /* @__PURE__ */ foldMap2(monoidString);
var bind4 = /* @__PURE__ */ bind(bindMaybe);
var map14 = /* @__PURE__ */ map(functorMaybe);
var pure8 = /* @__PURE__ */ pure(applicativeMaybe);
var show6 = /* @__PURE__ */ show(showInt);
var validSharedImage = function(image) {
  return image.width > 0 && (image.height > 0 && image.byteLength > 0);
};
var positiveInt = function(value) {
  var v = fromString(value);
  if (v instanceof Just && v.value0 > 0) {
    return new Just(v.value0);
  }
  return Nothing.value;
};
var placeholderCharacter = "\uDBFB\uDEEE";
var maximumImageId = 2147483647;
var validImageId = function(imageId) {
  return imageId > 0 && imageId <= maximumImageId;
};
var maximumGeometry = 297;
var highByteDivisor = 16777216;
var diacritics = /* @__PURE__ */ map13(singleton8)(/* @__PURE__ */ toCodePointArray("̅̍̎̐̒̽̾̿͆͊͋͌͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ҃҄҅҆҇֒֓֔֕֗֘֙֜֝֞֟֠֡֨֩֫֬֯ׄؐؑؒؓؔؕؖؗٗ٘ٙٚٛٝٞۖۗۘۙۚۛۜ۟۠ۡۢۤۧۨ۫۬ܰܲܳܵܶܺܽܿ݀݁݃݅݇݉݊߫߬߭߮߯߰߱߳ࠖࠗ࠘࠙ࠛࠜࠝࠞࠟࠠࠡࠢࠣࠥࠦࠧࠩࠪࠫࠬ࠭॑॓॔ྂྃ྆྇፝፞፟៝᤺ᨗ᩵᩶᩷᩸᩹᩺᩻᩼᭫᭭᭮᭯᭰᭱᭲᭳᳐᳑᳒᳚᳛᳠᷀᷁᷃᷄᷅᷆᷇᷈᷉᷋᷌᷑᷒ᷓᷔᷕᷖᷗᷘᷙᷚᷛᷜᷝᷞᷟᷠᷡᷢᷣᷤᷥᷦ᷾⃐⃑⃔⃕⃖⃗⃛⃜⃡⃧⃩⃰⳯⳰⳱ⷠⷡⷢⷣⷤⷥⷦⷧⷨⷩⷪⷫⷬⷭⷮⷯⷰⷱⷲⷳⷴⷵⷶⷷⷸⷹⷺⷻⷼⷽⷾⷿ꙯꙼꙽꛰꛱꣠꣡꣢꣣꣤꣥꣦꣧꣨꣩꣪꣫꣬꣭꣮꣯꣰꣱ꪰꪲꪳꪷꪸꪾ꪿꫁︠︡︢︣︤︥︦\uD802\uDE0F\uD802\uDE38\uD834\uDD85\uD834\uDD86\uD834\uDD87\uD834\uDD88\uD834\uDD89\uD834\uDDAA\uD834\uDDAB\uD834\uDDAC\uD834\uDDAD\uD834\uDE42\uD834\uDE43\uD834\uDE44"));
var diacritic = function(index3) {
  var v = index(diacritics)(index3);
  if (v instanceof Just) {
    return v.value0;
  }
  if (v instanceof Nothing) {
    return "";
  }
  throw new Error("Failed pattern match at OpenTUI.Kitty (line 113, column 19 - line 115, column 16): " + [v.constructor.name]);
};
var placeholderCell = function(row) {
  return function(column) {
    return function(highByte) {
      return placeholderCharacter + (diacritic(row) + (diacritic(column) + diacritic(highByte)));
    };
  };
};
var controlValue = function(key) {
  var $38 = findMap(stripPrefix(key + "="));
  var $39 = split(",");
  return function($40) {
    return $38($39($40));
  };
};
var cappedGeometry = function(count) {
  return min4(maximumGeometry)(count);
};
var placeholderRows = function(imageId) {
  return function(columns) {
    return function(rows) {
      if (!validImageId(imageId)) {
        return [];
      }
      if (columns <= 0 || rows <= 0) {
        return [];
      }
      if (otherwise) {
        var rowCount = cappedGeometry(rows);
        var highByte = div4(imageId)(highByteDivisor);
        var columnCount = cappedGeometry(columns);
        var rowString = function(row) {
          return foldMap3(function(column) {
            return placeholderCell(row)(column)(highByte);
          })(range2(0)(columnCount - 1 | 0));
        };
        return map13(rowString)(range2(0)(rowCount - 1 | 0));
      }
      throw new Error("Failed pattern match at OpenTUI.Kitty (line 124, column 1 - line 124, column 53): " + [imageId.constructor.name, columns.constructor.name, rows.constructor.name]);
    };
  };
};
var apcSuffix = "\x1B\\";
var apcPrefix = "\x1B_G";
var reply = function(input) {
  return bind4(stripPrefix(apcPrefix)(input))(function(withoutPrefix) {
    return bind4(stripSuffix(apcSuffix)(withoutPrefix))(function(body) {
      var $27 = contains(apcPrefix)(body) || contains(apcSuffix)(body);
      if ($27) {
        return Nothing.value;
      }
      return bind4(indexOf2(";")(body))(function(separator) {
        var controlData = take4(separator)(body);
        var message3 = drop4(separator + 1 | 0)(body);
        return bind4(bind4(controlValue("i")(controlData))(positiveInt))(function(imageId) {
          return bind4(function() {
            var v = controlValue("p")(controlData);
            if (v instanceof Nothing) {
              return new Just(Nothing.value);
            }
            if (v instanceof Just) {
              return map14(Just.create)(fromString(v.value0));
            }
            throw new Error("Failed pattern match at OpenTUI.Kitty (line 157, column 20 - line 159, column 50): " + [v.constructor.name]);
          }())(function(placementId) {
            return pure8({
              imageId,
              placementId,
              message: message3
            });
          });
        });
      });
    });
  });
};
var apc = function(controlData) {
  return function(payload) {
    return apcPrefix + (controlData + (";" + (payload + apcSuffix)));
  };
};
var deleteImage = function(imageId) {
  if (validImageId(imageId)) {
    return apc("a=d,d=I,i=" + (show6(imageId) + ",q=2"))("");
  }
  if (otherwise) {
    return "";
  }
  throw new Error("Failed pattern match at OpenTUI.Kitty (line 107, column 1 - line 107, column 29): " + [imageId.constructor.name]);
};
var placement = function(imageId) {
  return function(columns) {
    return function(rows) {
      if (validImageId(imageId) && (columns > 0 && rows > 0)) {
        return apc("a=p,U=1,q=0,i=" + (show6(imageId) + (",p=1,c=" + (show6(cappedGeometry(columns)) + (",r=" + show6(cappedGeometry(rows)))))))("");
      }
      if (otherwise) {
        return "";
      }
      throw new Error("Failed pattern match at OpenTUI.Kitty (line 94, column 1 - line 94, column 41): " + [imageId.constructor.name, columns.constructor.name, rows.constructor.name]);
    };
  };
};
var transmit = function(imageId) {
  return function(columns) {
    return function(rows) {
      return function(image) {
        if (validImageId(imageId) && (columns > 0 && (rows > 0 && validSharedImage(image)))) {
          return apc("a=t,f=32,t=s,q=0,i=" + (show6(imageId) + (",s=" + (show6(image.width) + (",v=" + (show6(image.height) + (",S=" + show6(image.byteLength))))))))(image.encodedName) + apc("a=p,U=1,q=2,i=" + (show6(imageId) + (",p=1,c=" + (show6(cappedGeometry(columns)) + (",r=" + show6(cappedGeometry(rows)))))))("");
        }
        if (otherwise) {
          return "";
        }
        throw new Error("Failed pattern match at OpenTUI.Kitty (line 71, column 1 - line 71, column 55): " + [imageId.constructor.name, columns.constructor.name, rows.constructor.name, image.constructor.name]);
      };
    };
  };
};

// npm/output/Markgraf.OpenCode.Player/index.js
var bind5 = /* @__PURE__ */ bind(bindEffect);
var eqMaybe2 = /* @__PURE__ */ eqMaybe(eqString);
var eq5 = /* @__PURE__ */ eq(eqMaybe2);
var pure9 = /* @__PURE__ */ pure(applicativeEffect);
var unless4 = /* @__PURE__ */ unless(applicativeEffect);
var traverse_3 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
var identity8 = /* @__PURE__ */ identity(categoryFn);
var applySecond3 = /* @__PURE__ */ applySecond(applyEffect);
var notEq3 = /* @__PURE__ */ notEq(eqMaybe2);
var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
var div1 = /* @__PURE__ */ div(euclideanRingInt);
var when3 = /* @__PURE__ */ when(applicativeEffect);
var traverseWithIndex_2 = /* @__PURE__ */ traverseWithIndex_(applicativeEffect)(foldableWithIndexArray);
var map15 = /* @__PURE__ */ map(functorEffect);
var supported = function(context) {
  var renderer2 = renderer(context);
  return function __do() {
    var capabilities2 = capabilities(renderer2)();
    var term = lookupEnv("TERM")();
    var program = lookupEnv("TERM_PROGRAM")();
    var kittyWindow = lookupEnv("KITTY_WINDOW_ID")();
    var placeholders = eq5(program)(new Just("ghostty")) || (eq5(term)(new Just("xterm-ghostty")) || (eq5(term)(new Just("xterm-kitty")) || isJust(kittyWindow)));
    (function() {
      var v2 = toMaybe(capabilities2);
      if (v2 instanceof Just && (v2.value0.kittyGraphics && (v2.value0.rgb && (!v2.value0.remote && (!v2.value0.multiplexer && placeholders))))) {
        return unit;
      }
      return $$throw("Inline Markgraf playback requires a local Ghostty or Kitty terminal with true color, Unicode placeholders and shared memory; multiplexers are not supported.")();
    })();
    var metrics2 = metrics(renderer2)();
    var v = toMaybe(metrics2.resolution);
    if (v instanceof Just && (v.value0.width > 0 && (v.value0.height > 0 && (metrics2.columns > 0 && metrics2.rows > 0)))) {
      return unit;
    }
    return $$throw("The terminal has not reported its pixel dimensions yet. Try /markgraf after terminal startup.")();
  };
};
var safeLine = /* @__PURE__ */ function() {
  var clean = function(character) {
    if (character < " " || character >= "" && character <= "") {
      return " ";
    }
    if (otherwise) {
      return character;
    }
    throw new Error("Failed pattern match at Markgraf.OpenCode.Player (line 252, column 3 - line 254, column 28): " + [character.constructor.name]);
  };
  var $66 = map(functorArray)(clean);
  return function($67) {
    return fromCharArray($66(toCharArray($67)));
  };
}();
var open = function(context) {
  return function(request) {
    return function(finished) {
      var renderer2 = renderer(context);
      return function __do() {
        var route2 = route(context)();
        unless4(route2.kind === "home" || route2.kind === "session")($$throw("Open a conversation or the OpenCode home screen before playing Markgraf."))();
        var metrics2 = metrics(renderer2)();
        var cells = function() {
          var v = toMaybe(metrics2.resolution);
          if (v instanceof Just) {
            return {
              width: v.value0.width / toNumber(metrics2.columns),
              height: v.value0.height / toNumber(metrics2.rows)
            };
          }
          if (v instanceof Nothing) {
            return $$throw("The terminal has not reported its pixel dimensions.")();
          }
          throw new Error("Failed pattern match at Markgraf.OpenCode.Player (line 52, column 12 - line 57, column 75): " + [v.constructor.name]);
        }();
        var cellsRef = $$new(cells)();
        var closedRef = $$new(false)();
        var slotRef = $$new(Nothing.value)();
        var playerRef = $$new(Nothing.value)();
        var nodeRef = $$new(Nothing.value)();
        var uiCleanupRef = $$new(pure9(unit))();
        var finish = function(result) {
          return function __do() {
            var closed2 = read(closedRef)();
            return unless4(closed2)(function __do() {
              write(true)(closedRef)();
              bind5(read(playerRef))(traverse_3(function(v) {
                return v.dispose;
              }))();
              bind5(read(uiCleanupRef))(identity8)();
              bind5(read(slotRef))(traverse_3(identity8))();
              write(Nothing.value)(slotRef)();
              return finished(result)();
            })();
          };
        };
        var mount = function(sessionId) {
          return catchException(function(err) {
            return applySecond3(finish(new Left(message(err))))(pure9(toNullable(Nothing.value)));
          })(function __do() {
            var closed2 = read(closedRef)();
            var mounted = read(nodeRef)();
            var $50 = closed2 || (isJust(mounted) || notEq3(toMaybe(sessionId))(toMaybe(route2.sessionID)));
            if ($50) {
              return toNullable(Nothing.value);
            }
            var imageId = randomInt(1e5)(2147483646)();
            var transparent = rgba(0)(0)(0)(0);
            var foreground = rgba(mod3(div1(imageId)(65536))(256))(mod3(div1(imageId)(256))(256))(mod3(imageId)(256))(255);
            var rowsRef = $$new({
              columns: 0,
              rows: 0,
              lines: []
            })();
            var drawnRef = $$new(false)();
            var sentRef = $$new(false)();
            var probeRef = $$new(false)();
            var paintRef = $$new(Nothing.value)();
            var previousFocus = focused(renderer2)();
            var focusPendingRef = $$new(true)();
            var render = function(node2) {
              return function(buffer) {
                return function __do() {
                  var player2 = read(playerRef)();
                  if (player2 instanceof Nothing) {
                    return unit;
                  }
                  if (player2 instanceof Just) {
                    var view = player2.value0.render();
                    var bounds2 = bounds(node2)();
                    when3(bounds2.height !== (view.size.rows + 2 | 0))(setHeight(node2)(view.size.rows + 2 | 0))();
                    var previous = read(rowsRef)();
                    var rows = function() {
                      var $52 = previous.columns === view.size.columns && previous.rows === view.size.rows;
                      if ($52) {
                        return previous.lines;
                      }
                      var lines = placeholderRows(imageId)(view.size.columns)(view.size.rows);
                      write({
                        columns: view.size.columns,
                        rows: view.size.rows,
                        lines
                      })(rowsRef)();
                      return lines;
                    }();
                    var muted = mutedColor(context)();
                    pushScissor(buffer)({
                      x: bounds2.x,
                      y: bounds2.y,
                      width: bounds2.width,
                      height: bounds2.height
                    })();
                    catchException(function(err) {
                      return applySecond3(popScissor(buffer))(throwException(err));
                    })(function __do() {
                      drawText(buffer)(safeLine(view.status))(bounds2.x)(bounds2.y)(muted)(transparent)();
                      when3(view.imageVisible)(traverseWithIndex_2(function(index3) {
                        return function(line) {
                          return drawText(buffer)(line)(bounds2.x)((bounds2.y + index3 | 0) + 1 | 0)(foreground)(transparent);
                        };
                      })(rows))();
                      return drawText(buffer)(view.footer)(bounds2.x)((bounds2.y + view.size.rows | 0) + 1 | 0)(muted)(transparent)();
                    })();
                    popScissor(buffer)();
                    var currentMetrics = metrics(renderer2)();
                    return write(bounds2.visible && (!bounds2.destroyed && (bounds2.height >= (view.size.rows + 2 | 0) && (bounds2.x < currentMetrics.width && (bounds2.y < currentMetrics.height && ((bounds2.x + bounds2.width | 0) > 0 && (bounds2.y + bounds2.height | 0) > 0))))))(drawnRef)();
                  }
                  throw new Error("Failed pattern match at Markgraf.OpenCode.Player (line 115, column 13 - line 146, column 27): " + [player2.constructor.name]);
                };
              };
            };
            var dimensions = function(node2) {
              return function __do() {
                var current = metrics(renderer2)();
                var bounds2 = bounds(node2)();
                (function() {
                  var v = toMaybe(current.resolution);
                  if (v instanceof Just && (current.columns > 0 && current.rows > 0)) {
                    return write({
                      width: v.value0.width / toNumber(current.columns),
                      height: v.value0.height / toNumber(current.rows)
                    })(cellsRef)();
                  }
                  return unit;
                })();
                var cell = read(cellsRef)();
                return {
                  columns: function() {
                    var $56 = bounds2.width > 0;
                    if ($56) {
                      return bounds2.width;
                    }
                    return current.width;
                  }(),
                  rows: current.rows,
                  cellWidth: cell.width,
                  cellHeight: cell.height
                };
              };
            };
            var active = function __do() {
              var closedNow = read(closedRef)();
              var destroyed = isDestroyed(renderer2)();
              var control = controlState(renderer2)();
              return !closedNow && (!destroyed && (control === "idle" || (control === "auto_started" || control === "explicit_started")));
            };
            var node = createBox(renderer2)({
              width: "100%",
              height: 1,
              flexShrink: 0,
              backgroundColor: "transparent",
              focusable: true
            })(render)();
            write(new Just(node))(nodeRef)();
            var appearance = themeMode(context)();
            var player = create(request)({
              viewport: map15(fitViewport)(dimensions(node)),
              active,
              observeImage: pure9(true),
              transmit: function(columns) {
                return function(rows) {
                  return function(frame) {
                    return function __do() {
                      var name2 = bind5(fromString6(frame.name)(UTF8.value))(toString5(Base64.value))();
                      writeControl(renderer2)(transmit(imageId)(columns)(rows)({
                        width: frame.width,
                        height: frame.height,
                        byteLength: frame.byteLength,
                        encodedName: name2
                      }))();
                      return write(true)(sentRef)();
                    };
                  };
                };
              },
              onAcknowledgement: function(acknowledge) {
                return prependInputHandler(renderer2)(function(sequence2) {
                  var v = reply(sequence2);
                  if (v instanceof Just && v.value0.imageId === imageId) {
                    return function __do() {
                      (function() {
                        if (v.value0.placementId instanceof Nothing) {
                          return acknowledge(protocolAcknowledgement(v.value0.message))();
                        }
                        if (v.value0.placementId instanceof Just && v.value0.placementId.value0 === 1) {
                          write(false)(probeRef)();
                          var closedNow = read(closedRef)();
                          return unless4(closedNow)(function() {
                            var $59 = v.value0.message === "OK";
                            if ($59) {
                              return pure9(unit);
                            }
                            var $60 = isJust(stripPrefix("ENOENT")(v.value0.message));
                            if ($60) {
                              return bind5(read(paintRef))(traverse_3(function(paint) {
                                return paint({
                                  visible: true,
                                  alt: true,
                                  reset: true
                                });
                              }));
                            }
                            return finish(new Left("Kitty virtual placement failed: " + v.value0.message));
                          }())();
                        }
                        if (v.value0.placementId instanceof Just) {
                          return unit;
                        }
                        throw new Error("Failed pattern match at Markgraf.OpenCode.Player (line 165, column 17 - line 175, column 38): " + [v.value0.placementId.constructor.name]);
                      })();
                      return true;
                    };
                  }
                  return pure9(false);
                });
              },
              onPaint: function(paint) {
                return function __do() {
                  write(new Just(paint))(paintRef)();
                  var stop = onFrame(renderer2)(function __do() {
                    var visible = read(drawnRef)();
                    write(false)(drawnRef)();
                    var running = active();
                    paint({
                      visible: visible && running,
                      alt: true,
                      reset: false
                    })();
                    var sent = read(sentRef)();
                    var pending = read(probeRef)();
                    return when3(visible && (running && (sent && !pending)))(function __do() {
                      var size4 = read(rowsRef)();
                      write(true)(probeRef)();
                      return writeControl(renderer2)(placement(imageId)(size4.columns)(size4.rows))();
                    })();
                  })();
                  return applySecond3(write(Nothing.value)(paintRef))(stop);
                };
              },
              releaseImage: function __do() {
                var destroyed = isDestroyed(renderer2)();
                return unless4(destroyed)(writeControl(renderer2)(deleteImage(imageId)))();
              },
              requestRender: function __do() {
                var destroyed = isDestroyed(renderer2)();
                return unless4(destroyed)(requestRender(renderer2))();
              },
              done: finish,
              theme: function() {
                var $64 = appearance === "light";
                if ($64) {
                  return Light.value;
                }
                return Dark.value;
              }()
            })();
            write(new Just(player))(playerRef)();
            var popMode = pushMode(context)("markgraf.playback")();
            write(popMode)(uiCleanupRef)();
            registerKeys(context)(node)("markgraf.playback")([{
              id: "markgraf.close",
              bind: "q",
              run: player.input(Close.value)
            }, {
              id: "markgraf.escape",
              bind: "escape",
              run: player.input(Close.value)
            }, {
              id: "markgraf.cancel",
              bind: "ctrl+c",
              run: player.input(Close.value)
            }, {
              id: "markgraf.pause",
              bind: "space",
              run: player.input(TogglePlayback.value)
            }, {
              id: "markgraf.restart",
              bind: "home",
              run: player.input(Restart.value)
            }, {
              id: "markgraf.previous-keyframe",
              bind: "left",
              run: player.input(PreviousKeyframe.value)
            }, {
              id: "markgraf.next-keyframe",
              bind: "right",
              run: player.input(NextKeyframe.value)
            }, {
              id: "markgraf.previous-frame",
              bind: "[",
              run: player.input(new Step(-1 | 0))
            }, {
              id: "markgraf.next-frame",
              bind: "]",
              run: player.input(new Step(1))
            }, {
              id: "markgraf.previous-scene",
              bind: "up",
              run: player.input(PreviousScene.value)
            }, {
              id: "markgraf.next-scene",
              bind: "down",
              run: player.input(NextScene.value)
            }])();
            var stopFocus = onFrame(renderer2)(function __do() {
              var pending = read(focusPendingRef)();
              return when3(pending)(function __do() {
                write(false)(focusPendingRef)();
                return focus(node)();
              })();
            })();
            write(applySecond3(stopFocus)(popMode))(uiCleanupRef)();
            var stopDestroyed = onDestroyed(node)(finish(new Right(unit)))();
            write(function __do() {
              stopFocus();
              stopDestroyed();
              popMode();
              var bounds2 = bounds(node)();
              return when3(bounds2.focused)(traverse_3(function(previous) {
                return function __do() {
                  var previousBounds = bounds(previous)();
                  return unless4(previousBounds.destroyed)(focus(previous))();
                };
              })(toMaybe(previousFocus)))();
            })(uiCleanupRef)();
            return toNullable(new Just(node));
          });
        };
        var unmount = mountSlot(context)(function() {
          var $65 = route2.kind === "home";
          if ($65) {
            return "home.footer";
          }
          return "session.composer.top";
        }())(mount)();
        write(new Just(unmount))(slotRef)();
        var closed = read(closedRef)();
        when3(closed)(applySecond3(unmount)(write(Nothing.value)(slotRef)))();
        return finish;
      };
    };
  };
};

// npm/output/OpenCode.RPC/foreign.js
import { Rpc } from "@opencode/plugin";
var define2 = (definition) => Rpc.define({
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

// npm/output/Promise.Internal/foreign.js
var newImpl3 = function(k) {
  return new Promise(k);
};
function thenOrCatch(k, c, p) {
  return p.then(k, c);
}
function resolve3(a) {
  return Promise.resolve(a);
}
// npm/output/Promise.Rejection/foreign.js
function fromError(a) {
  return a;
}
function _toError(just, nothing, ref2) {
  if (ref2 instanceof Error) {
    return just(ref2);
  }
  return nothing;
}

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
var resolve4 = function() {
  return resolve3;
};
var $$new2 = function() {
  return function(k) {
    return function() {
      return newImpl3(function(onResolve, onReject) {
        return k(runEffectFn1(onResolve))(runEffectFn1(onReject))();
      });
    };
  };
};

// npm/output/Promise.Aff/index.js
var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
var mempty3 = /* @__PURE__ */ mempty(monoidCanceler);
var thenOrCatch3 = /* @__PURE__ */ thenOrCatch2();
var map17 = /* @__PURE__ */ map(functorEffect);
var resolve5 = /* @__PURE__ */ resolve4();
var $$new3 = /* @__PURE__ */ $$new2();
var alt2 = /* @__PURE__ */ alt(altMaybe);
var map16 = /* @__PURE__ */ map(functorMaybe);
var readString4 = /* @__PURE__ */ readString(monadIdentity);
var bind6 = /* @__PURE__ */ bind(bindAff);
var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
var toAff$prime = function(customCoerce) {
  return function(p) {
    return makeAff(function(cb) {
      return voidRight2(mempty3)(thenOrCatch3(function(a) {
        return map17(resolve5)(cb(new Right(a)));
      })(function(e) {
        return map17(resolve5)(cb(new Left(customCoerce(e))));
      })(p));
    });
  };
};
var fromAff = function() {
  return function(aff) {
    return $$new3(function(succ2) {
      return function(err) {
        return runAff_(either(function($13) {
          return err(fromError($13));
        })(succ2))(aff);
      };
    });
  };
};
var coerce4 = function(rej) {
  return fromMaybe$prime(function(v) {
    return error("Promise failed, couldn't extract JS Error or String");
  })(alt2(toError(rej))(map16(error)(hush(runExcept(readString4(unsafeToForeign(rej)))))));
};
var toAff = /* @__PURE__ */ toAff$prime(coerce4);
var toAffE = function(f) {
  return bind6(liftEffect4(f))(toAff);
};

// npm/output/OpenCode.RPC/index.js
var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
var call = function(connection) {
  return function(name2) {
    return function(input) {
      return bracket(liftEffect5(callImpl(connection)(name2)(input)))(function($4) {
        return liftEffect5(function(v) {
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

// npm/output/Markgraf.OpenCode.Protocol/index.js
var writeForeignRecord3 = /* @__PURE__ */ writeForeignRecord();
var writeForeignFieldsCons3 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "type";
  }
});
var writeForeignFieldsCons1 = /* @__PURE__ */ writeForeignFieldsCons3(writeForeignString)(writeForeignFieldsNilRowR)()()();
var writeForeignRecord1 = /* @__PURE__ */ writeForeignRecord3(writeForeignFieldsCons1);
var write4 = /* @__PURE__ */ write3(writeForeignRecord1);
var writeForeignFieldsCons22 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "additionalProperties";
  }
})(writeForeignBoolean);
var writeForeignFieldsCons32 = /* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "properties";
  }
});
var backgroundIsSymbol = {
  reflectSymbol: function() {
    return "background";
  }
};
var idIsSymbol2 = {
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
var show7 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
var pure10 = /* @__PURE__ */ pure(applicativeEffect);
var readForeignRecord3 = /* @__PURE__ */ readForeignRecord();
var sessionIdIsSymbol = {
  reflectSymbol: function() {
    return "sessionId";
  }
};
var throwError3 = /* @__PURE__ */ throwError(monadThrowAff);
var pure13 = /* @__PURE__ */ pure(applicativeAff);
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
var bind12 = /* @__PURE__ */ bind(bindAff);
var sequential2 = /* @__PURE__ */ sequential(parallelAff);
var alt3 = /* @__PURE__ */ alt(altParAff);
var parallel3 = /* @__PURE__ */ parallel(parallelAff);
var voidLeft2 = /* @__PURE__ */ voidLeft(functorAff);
var writeForeignFieldsCons13 = /* @__PURE__ */ writeForeignFieldsCons5(writeForeignString);
var write1 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons13(/* @__PURE__ */ writeForeignFieldsCons10(writeForeignString)(/* @__PURE__ */ writeForeignFieldsCons11(writeForeignString)(writeForeignFieldsNilRowR)()()())()()())()()()));
var $$void6 = /* @__PURE__ */ $$void(functorAff);
var writeForeignFieldsCons14 = /* @__PURE__ */ writeForeignFieldsCons7(writeForeignString)(writeForeignFieldsNilRowR)()()();
var write22 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons13(/* @__PURE__ */ writeForeignFieldsCons9(/* @__PURE__ */ writeForeignNullable(writeForeignString))(writeForeignFieldsCons14)()()())()()()));
var write32 = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons13(writeForeignFieldsCons14)()()()));
var nullableRequestSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons({
  reflectSymbol: function() {
    return "anyOf";
  }
})(/* @__PURE__ */ writeForeignArray(writeForeignForeign))(writeForeignFieldsNilRowR)()()()))({
  anyOf: [/* @__PURE__ */ write4({
    type: "null"
  }), /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons32(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons(backgroundIsSymbol)(writeForeignRecord1)(/* @__PURE__ */ writeForeignFieldsCons(idIsSymbol2)(writeForeignRecord1)(/* @__PURE__ */ writeForeignFieldsCons(pathIsSymbol)(writeForeignRecord1)(writeForeignFieldsNilRowR)()()())()()())()()()))(writeForeignFieldsCons4)()()())()()()))({
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
var heartbeatSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons32(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons6(writeForeignFieldsCons8)()()()))(writeForeignFieldsCons4)()()())()()()))({
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
var emptyObjectSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons32(/* @__PURE__ */ writeForeignRecord3(writeForeignFieldsNilRowR))(writeForeignFieldsCons1)()()())()()()))({
  type: "object",
  properties: {},
  additionalProperties: false
});
var decodeEffect = function(dictReadForeign) {
  var read6 = read3(dictReadForeign);
  return function(value) {
    var v = read6(value);
    if (v instanceof Left) {
      return throwException(error(show7(v.value0)));
    }
    if (v instanceof Right) {
      return pure10(v.value0);
    }
    throw new Error("Failed pattern match at Markgraf.OpenCode.Protocol (line 107, column 22 - line 109, column 32): " + [v.constructor.name]);
  };
};
var decodeEffect1 = /* @__PURE__ */ decodeEffect(/* @__PURE__ */ readForeignRecord3(/* @__PURE__ */ readForeignFieldsCons(sessionIdIsSymbol)(readForeignString)(readForeignFieldsNilRowRo)()()));
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
var decode2 = function(dictReadForeign) {
  var read6 = read3(dictReadForeign);
  return function(value) {
    var v = read6(value);
    if (v instanceof Left) {
      return throwError3(error(show7(v.value0)));
    }
    if (v instanceof Right) {
      return pure13(v.value0);
    }
    throw new Error("Failed pattern match at Markgraf.OpenCode.Protocol (line 102, column 16 - line 104, column 32): " + [v.constructor.name]);
  };
};
var decode1 = /* @__PURE__ */ decode2(/* @__PURE__ */ readForeignNullable(/* @__PURE__ */ readForeignRecord3(/* @__PURE__ */ readForeignFieldsCons(backgroundIsSymbol)(readForeignBoolean)(/* @__PURE__ */ readForeignFieldsCons(idIsSymbol2)(readForeignString)(/* @__PURE__ */ readForeignFieldsCons(pathIsSymbol)(readForeignString)(readForeignFieldsNilRowRo)()())()())()())));
var decode22 = /* @__PURE__ */ decode2(readForeignBoolean);
var completeSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons32(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons6(/* @__PURE__ */ writeForeignFieldsCons9(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons3(writeForeignArray2)(writeForeignFieldsNilRowR)()()()))(writeForeignFieldsCons8)()()())()()()))(writeForeignFieldsCons4)()()())()()()))({
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
var claimSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons32(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons6(/* @__PURE__ */ writeForeignFieldsCons10(writeForeignRecord1)(writeForeignFieldsCons12)()()())()()()))(writeForeignFieldsCons4)()()())()()()))({
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
      return bind12(sequential2(alt3(parallel3(attempt(call(client2)(method)(input))))(parallel3(voidLeft2(delay(leaseMilliseconds))(new Left(error("OpenCode playback RPC timed out: " + method)))))))(function(result) {
        if (result instanceof Left) {
          return throwError3(result.value0);
        }
        if (result instanceof Right) {
          return pure13(result.value0);
        }
        throw new Error("Failed pattern match at Markgraf.OpenCode.Protocol (line 52, column 3 - line 54, column 30): " + [result.constructor.name]);
      });
    };
  };
};
var claim = function(client2) {
  return function(request) {
    return bind12(call2(client2)("claim")(write1(request)))(function(response) {
      return bind12(decode1(response))(function(decoded) {
        return pure13(toMaybe(decoded));
      });
    });
  };
};
var complete = function(client2) {
  return function(requestId) {
    return function(clientId) {
      return function(failure) {
        return $$void6(call2(client2)("complete")(write22({
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
      return bind12(call2(client2)("heartbeat")(write32({
        requestId,
        clientId
      })))(function(response) {
        return decode22(response);
      });
    };
  };
};
var booleanSchema = /* @__PURE__ */ write4({
  type: "boolean"
});
var announcementSchema = /* @__PURE__ */ write3(/* @__PURE__ */ writeForeignRecord3(/* @__PURE__ */ writeForeignFieldsCons22(/* @__PURE__ */ writeForeignFieldsCons32(/* @__PURE__ */ writeForeignRecord3(writeForeignFieldsCons12))(writeForeignFieldsCons4)()()())()()()))({
  type: "object",
  properties: {
    sessionId: {
      type: "string"
    }
  },
  required: ["sessionId"],
  additionalProperties: false
});
var contract = /* @__PURE__ */ define2({
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

// npm/output/Markgraf.OpenCode/index.js
var $runtime_lazy5 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var bind7 = /* @__PURE__ */ bind(bindEffect);
var show8 = /* @__PURE__ */ show(showInt);
var unless5 = /* @__PURE__ */ unless(applicativeEffect);
var pure11 = /* @__PURE__ */ pure(applicativeEffect);
var bind13 = /* @__PURE__ */ bind(bindAff);
var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
var discard3 = /* @__PURE__ */ discard(discardUnit);
var discard12 = /* @__PURE__ */ discard3(bindAff);
var when4 = /* @__PURE__ */ when(applicativeAff);
var throwError4 = /* @__PURE__ */ throwError(monadThrowAff);
var applySecond4 = /* @__PURE__ */ applySecond(applyEffect);
var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
var catchError2 = /* @__PURE__ */ catchError(monadErrorAff);
var when12 = /* @__PURE__ */ when(applicativeEffect);
var $$try5 = /* @__PURE__ */ $$try2(monadErrorAff);
var map18 = /* @__PURE__ */ map(functorEffect);
var pure14 = /* @__PURE__ */ pure(applicativeAff);
var eqMaybe3 = /* @__PURE__ */ eqMaybe(eqString);
var notEq4 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqRec()(/* @__PURE__ */ eqRowCons(/* @__PURE__ */ eqRowCons(eqRowNil)()({
  reflectSymbol: function() {
    return "sessionId";
  }
})(eqMaybe3))()({
  reflectSymbol: function() {
    return "kind";
  }
})(eqString)));
var eq12 = /* @__PURE__ */ eq(eqMaybe3);
var fromAff2 = /* @__PURE__ */ fromAff();
var setup = function(root) {
  return function(context) {
    return function __do() {
      var events = connect(context)();
      var hostname2 = hostname();
      var nonce = randomInt(1e5)(2147483646)();
      var secondNonce = randomInt(1e5)(2147483646)();
      var clientId = "markgraf-" + (show8(nonce) + ("-" + show8(secondNonce)));
      var disposedRef = $$new(false)();
      var generationRef = $$new(0)();
      var claimingRef = $$new(false)();
      var claimDirtyRef = $$new(false)();
      var openingRef = $$new(false)();
      var activeRef = $$new(Nothing.value)();
      var report = function(reason) {
        return function __do() {
          var disposed = read(disposedRef)();
          return unless5(disposed)(notifyError(context)(reason))();
        };
      };
      var currentRoute = function __do() {
        var route2 = route(context)();
        return {
          kind: route2.kind,
          sessionId: toMaybe(route2.sessionID)
        };
      };
      var complete2 = function(owned) {
        return function(result) {
          return complete(owned.client)(owned.request.id)(clientId)(toNullable(function() {
            if (result instanceof Left) {
              return new Just(result.value0);
            }
            if (result instanceof Right) {
              return Nothing.value;
            }
            throw new Error("Failed pattern match at Markgraf.OpenCode (line 67, column 20 - line 69, column 29): " + [result.constructor.name]);
          }()));
        };
      };
      var start = function(options2) {
        return function(toolRequest) {
          return bind13(liftEffect6(read(disposedRef)))(function(disposed) {
            return bind13(liftEffect6(read(activeRef)))(function(current) {
              return bind13(liftEffect6(read(openingRef)))(function(opening) {
                return bind13(liftEffect6(read(claimingRef)))(function(claiming) {
                  return discard12(when4(disposed)(throwError4(error("The Markgraf OpenCode plugin has closed."))))(function() {
                    return discard12(when4(isJust(current))(throwError4(error("A Markgraf animation is already open. Close it with q or Escape first."))))(function() {
                      return discard12(when4(opening || isNothing(toolRequest) && claiming)(throwError4(error("Markgraf is already opening a playback request."))))(function() {
                        return discard12(liftEffect6(write(true)(openingRef)))(function() {
                          return $$finally(liftEffect6(applySecond4(write(false)(openingRef))($lazy_drainClaims(80))))(discard12(liftEffect6(supported(context)))(function() {
                            return bind13(liftEffect6(cwd2(context)))(function(cwd3) {
                              return bind13(resolve2(root)(cwd3)(options2))(function(request) {
                                return bind13(liftEffect6(currentRoute))(function(route2) {
                                  return bind13(liftEffect6(read(disposedRef)))(function(closed) {
                                    return discard12(when4(closed)(throwError4(error("The Markgraf OpenCode plugin has closed."))))(function() {
                                      return bind13(liftEffect6(monotonicNowMilliseconds))(function(now2) {
                                        var deadline = function() {
                                          if (toolRequest instanceof Nothing) {
                                            return 0;
                                          }
                                          if (toolRequest instanceof Just) {
                                            return toolRequest.value0.claimedAt + leaseMilliseconds;
                                          }
                                          throw new Error("Failed pattern match at Markgraf.OpenCode (line 89, column 22 - line 91, column 71): " + [toolRequest.constructor.name]);
                                        }();
                                        return discard12(when4(isJust(toolRequest) && now2 >= deadline)(throwError4(error("OpenCode playback lease expired before the player opened."))))(function() {
                                          return bind13(liftEffect6(modify(function(v) {
                                            return v + 1 | 0;
                                          })(generationRef)))(function(generation) {
                                            return bind13(liftEffect6($$new(false)))(function(endedRef) {
                                              return bind13(liftEffect6($$new(false)))(function(heartbeatBusyRef) {
                                                return bind13(liftEffect6($$new(deadline)))(function(deadlineRef) {
                                                  return bind13(liftEffect6($$new(0)))(function(nextHeartbeatRef) {
                                                    return bind13(liftEffect6(open(context)(request)(function(result) {
                                                      return function __do() {
                                                        write(true)(endedRef)();
                                                        var latest = read(activeRef)();
                                                        (function() {
                                                          if (latest instanceof Just && latest.value0.generation === generation) {
                                                            traverse_4(clearInterval2)(latest.value0.timer)();
                                                            return write(Nothing.value)(activeRef)();
                                                          }
                                                          return unit;
                                                        })();
                                                        (function() {
                                                          if (result instanceof Left) {
                                                            return report(result.value0)();
                                                          }
                                                          if (result instanceof Right) {
                                                            return unit;
                                                          }
                                                          throw new Error("Failed pattern match at Markgraf.OpenCode (line 107, column 15 - line 109, column 37): " + [result.constructor.name]);
                                                        })();
                                                        traverse_4(function(owned) {
                                                          return launchAff_(catchError2(complete2(owned)(result))(function($78) {
                                                            return liftEffect6(report(message($78)));
                                                          }));
                                                        })(toolRequest)();
                                                        return $lazy_claimPending(113)();
                                                      };
                                                    })))(function(close2) {
                                                      var heartbeat2 = function() {
                                                        if (toolRequest instanceof Nothing) {
                                                          return pure11(unit);
                                                        }
                                                        if (toolRequest instanceof Just) {
                                                          return function __do() {
                                                            var latest = read(activeRef)();
                                                            if (latest instanceof Just && latest.value0.generation === generation) {
                                                              var time = monotonicNowMilliseconds();
                                                              var expires = read(deadlineRef)();
                                                              var $58 = time >= expires;
                                                              if ($58) {
                                                                return close2(new Left("OpenCode playback lease expired; the local player has closed."))();
                                                              }
                                                              var busy = read(heartbeatBusyRef)();
                                                              var next = read(nextHeartbeatRef)();
                                                              return when12(!busy && time >= next)(function __do() {
                                                                write(true)(heartbeatBusyRef)();
                                                                write(time + 1000)(nextHeartbeatRef)();
                                                                return launchAff_(bind13($$try5(heartbeat(toolRequest.value0.client)(toolRequest.value0.request.id)(clientId)))(function(result) {
                                                                  return liftEffect6(function __do() {
                                                                    write(false)(heartbeatBusyRef)();
                                                                    var currentOwner = read(activeRef)();
                                                                    if (currentOwner instanceof Just && currentOwner.value0.generation === generation) {
                                                                      var received = monotonicNowMilliseconds();
                                                                      var previousDeadline = read(deadlineRef)();
                                                                      var $60 = received >= previousDeadline;
                                                                      if ($60) {
                                                                        return close2(new Left("OpenCode playback lease expired; the local player has closed."))();
                                                                      }
                                                                      if (result instanceof Right && result.value0) {
                                                                        return write(time + leaseMilliseconds)(deadlineRef)();
                                                                      }
                                                                      if (result instanceof Right && !result.value0) {
                                                                        return close2(new Right(unit))();
                                                                      }
                                                                      if (result instanceof Left) {
                                                                        return close2(new Left("OpenCode playback connection lost: " + message(result.value0)))();
                                                                      }
                                                                      throw new Error("Failed pattern match at Markgraf.OpenCode (line 141, column 36 - line 144, column 112): " + [result.constructor.name]);
                                                                    }
                                                                    return unit;
                                                                  });
                                                                }))();
                                                              })();
                                                            }
                                                            return unit;
                                                          };
                                                        }
                                                        throw new Error("Failed pattern match at Markgraf.OpenCode (line 116, column 23 - line 146, column 31): " + [toolRequest.constructor.name]);
                                                      }();
                                                      return liftEffect6(function __do() {
                                                        var ended = read(endedRef)();
                                                        return unless5(ended)(function __do() {
                                                          var timer = function() {
                                                            if (toolRequest instanceof Nothing) {
                                                              return Nothing.value;
                                                            }
                                                            if (toolRequest instanceof Just) {
                                                              return map18(Just.create)(setInterval2(250)(heartbeat2))();
                                                            }
                                                            throw new Error("Failed pattern match at Markgraf.OpenCode (line 150, column 22 - line 152, column 65): " + [toolRequest.constructor.name]);
                                                          }();
                                                          return write(new Just({
                                                            generation,
                                                            route: route2,
                                                            close: close2,
                                                            heartbeat: heartbeat2,
                                                            timer
                                                          }))(activeRef)();
                                                        })();
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
                              });
                            });
                          }));
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        };
      };
      var $lazy_claimPending = $runtime_lazy5("claimPending", "Markgraf.OpenCode", function() {
        return function __do() {
          write(true)(claimDirtyRef)();
          return $lazy_drainClaims(156)();
        };
      });
      var $lazy_drainClaims = $runtime_lazy5("drainClaims", "Markgraf.OpenCode", function() {
        return function __do() {
          var disposed = read(disposedRef)();
          var claiming = read(claimingRef)();
          var opening = read(openingRef)();
          var current = read(activeRef)();
          var dirty = read(claimDirtyRef)();
          var route2 = currentRoute();
          if (route2.sessionId instanceof Just && (dirty && (!disposed && (!claiming && (!opening && isNothing(current)))))) {
            write(true)(claimingRef)();
            write(false)(claimDirtyRef)();
            var client2 = connect(context)();
            var claimedAt = monotonicNowMilliseconds();
            return launchAff_($$finally(liftEffect6(applySecond4(write(false)(claimingRef))($lazy_drainClaims(170))))(bind13($$try5(claim(client2)({
              clientId,
              sessionId: route2.sessionId.value0,
              hostname: hostname2
            })))(function(result) {
              return bind13(liftEffect6(currentRoute))(function(latestRoute) {
                return bind13(liftEffect6(read(disposedRef)))(function(closed) {
                  if (result instanceof Left) {
                    return liftEffect6(report(message(result.value0)));
                  }
                  if (result instanceof Right && result.value0 instanceof Nothing) {
                    return pure14(unit);
                  }
                  if (result instanceof Right && result.value0 instanceof Just) {
                    var owned = {
                      client: client2,
                      request: result.value0.value0,
                      claimedAt
                    };
                    var play = discard12(when4(closed || notEq4(latestRoute)(route2))(throwError4(error("The requesting OpenCode conversation is no longer active."))))(function() {
                      return start({
                        path: result.value0.value0.path,
                        transparency: function() {
                          if (result.value0.value0.background) {
                            return PaintBackground.value;
                          }
                          return TransparentBackground.value;
                        }()
                      })(new Just(owned));
                    });
                    return catchError2(play)(function(err) {
                      return discard12(liftEffect6(report(message(err))))(function() {
                        return catchError2(complete2(owned)(new Left(message(err))))(function($79) {
                          return liftEffect6(report(message($79)));
                        });
                      });
                    });
                  }
                  throw new Error("Failed pattern match at Markgraf.OpenCode (line 174, column 13 - line 189, column 103): " + [result.constructor.name]);
                });
              });
            })))();
          }
          return unit;
        };
      });
      var claimPending = $lazy_claimPending(154);
      var drainClaims = $lazy_drainClaims(157);
      var routeChanged = function __do() {
        var route2 = currentRoute();
        var current = read(activeRef)();
        traverse_4(function(owner) {
          return when12(notEq4(owner.route)(route2))(owner.close(new Right(unit)));
        })(current)();
        return claimPending();
      };
      var announced = function(sessionId) {
        return function __do() {
          var route2 = currentRoute();
          return when12(eq12(route2.sessionId)(new Just(sessionId)))(function __do() {
            bind7(read(activeRef))(traverse_4(function(v) {
              return v.heartbeat;
            }))();
            return claimPending();
          })();
        };
      };
      registerCommand(context)({
        id: "markgraf.play",
        title: "Play Markgraf animation",
        description: "Play inline; --background opts into theme paper",
        group: "Markgraf",
        name: "markgraf"
      })(function(input) {
        return fromAff2(catchError2(start(commandOptions(fromMaybe("")(toMaybe(input))))(Nothing.value))(function($80) {
          return liftEffect6(report(message($80)));
        }));
      })();
      var stopEvents = listen3(events)(announced)();
      var stopRoute = observeRoute(context)(routeChanged)();
      var dispose2 = function __do() {
        var disposed = read(disposedRef)();
        return unless5(disposed)(function __do() {
          write(true)(disposedRef)();
          stopEvents();
          stopRoute();
          return bind7(read(activeRef))(traverse_4(function(owner) {
            return owner.close(new Right(unit));
          }))();
        })();
      };
      var stopDestroy = onRendererDestroy(renderer(context))(dispose2)();
      return applySecond4(dispose2)(stopDestroy);
    };
  };
};
var plugin = function(root) {
  return define({
    id: "markgraf.tui",
    setup: setup(root)
  });
};

// npm/agents/tui.js
var tui_default = plugin(fileURLToPath(new URL("./", import.meta.url)));
export {
  tui_default as default
};
