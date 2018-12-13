!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("react"),
        require("prop-types"),
        require("classnames"),
        require("react-onclickoutside"),
        require("react-popper")
      )
    : "function" == typeof define && define.amd
      ? define(
          [
            "exports",
            "react",
            "prop-types",
            "classnames",
            "react-onclickoutside",
            "react-popper"
          ],
          t
        )
      : t(
          (e.DatePicker = {}),
          e.React,
          e.PropTypes,
          e.classNames,
          e.onClickOutside,
          e.ReactPopper
        );
})(this, function(e, h, t, p, n, u) {
  "use strict";
  function m(e) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return (
      e instanceof Date ||
      ("object" == typeof e &&
        "[object Date]" === Object.prototype.toString.call(e))
    );
  }
  function S(e) {
    if (null === e || !0 === e || !1 === e) return NaN;
    var t = +e;
    return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
  }
  (h = h && h.hasOwnProperty("default") ? h.default : h),
    (t = t && t.hasOwnProperty("default") ? t.default : t),
    (p = p && p.hasOwnProperty("default") ? p.default : p),
    (n = n && n.hasOwnProperty("default") ? n.default : n);
  var a = 6e4;
  function x(e) {
    var t = new Date(e.getTime()),
      n = t.getTimezoneOffset();
    t.setSeconds(0, 0);
    var r = t.getTime() % a;
    return n * a + r;
  }
  var l = 36e5,
    d = 6e4,
    f = 2,
    g = {
      dateTimeDelimeter: /[T ]/,
      plainTime: /:/,
      timeZoneDelimeter: /[Z ]/i,
      YY: /^(\d{2})$/,
      YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/],
      YYYY: /^(\d{4})/,
      YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/],
      MM: /^-(\d{2})$/,
      DDD: /^-?(\d{3})$/,
      MMDD: /^-?(\d{2})-?(\d{2})$/,
      Www: /^-?W(\d{2})$/,
      WwwD: /^-?W(\d{2})-?(\d{1})$/,
      HH: /^(\d{2}([.,]\d*)?)$/,
      HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
      HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
      timezone: /([Z+-].*)$/,
      timezoneZ: /^(Z)$/,
      timezoneHH: /^([+-])(\d{2})$/,
      timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
    };
  function N(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    if (null === e) return new Date(NaN);
    var n = t || {},
      r = null == n.additionalDigits ? f : S(n.additionalDigits);
    if (2 !== r && 1 !== r && 0 !== r)
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    if (
      e instanceof Date ||
      ("object" == typeof e &&
        "[object Date]" === Object.prototype.toString.call(e))
    )
      return new Date(e.getTime());
    if (
      "number" == typeof e ||
      "[object Number]" === Object.prototype.toString.call(e)
    )
      return new Date(e);
    if (
      "string" != typeof e &&
      "[object String]" !== Object.prototype.toString.call(e)
    )
      return new Date(NaN);
    var a = (function(e) {
        var t,
          n = {},
          r = e.split(g.dateTimeDelimeter);
        g.plainTime.test(r[0])
          ? ((n.date = null), (t = r[0]))
          : ((n.date = r[0]),
            (t = r[1]),
            g.timeZoneDelimeter.test(n.date) &&
              ((n.date = e.split(g.timeZoneDelimeter)[0]),
              (t = e.substr(n.date.length, e.length))));
        if (t) {
          var a = g.timezone.exec(t);
          a
            ? ((n.time = t.replace(a[1], "")), (n.timezone = a[1]))
            : (n.time = t);
        }
        return n;
      })(e),
      o = (function(e, t) {
        var n,
          r = g.YYY[t],
          a = g.YYYYY[t];
        if ((n = g.YYYY.exec(e) || a.exec(e))) {
          var o = n[1];
          return { year: parseInt(o, 10), restDateString: e.slice(o.length) };
        }
        if ((n = g.YY.exec(e) || r.exec(e))) {
          var i = n[1];
          return {
            year: 100 * parseInt(i, 10),
            restDateString: e.slice(i.length)
          };
        }
        return { year: null };
      })(a.date, r),
      i = (function(e, t) {
        if (null === t) return null;
        var n, r, a, o;
        if (0 === e.length) return (r = new Date(0)).setUTCFullYear(t), r;
        if ((n = g.MM.exec(e)))
          return (
            (r = new Date(0)),
            v(t, (a = parseInt(n[1], 10) - 1))
              ? (r.setUTCFullYear(t, a), r)
              : new Date(NaN)
          );
        if ((n = g.DDD.exec(e))) {
          r = new Date(0);
          var i = parseInt(n[1], 10);
          return (function(e, t) {
            if (t < 1) return !1;
            var n = y(e);
            if (n && 366 < t) return !1;
            return !(!n && 365 < t);
          })(t, i)
            ? (r.setUTCFullYear(t, 0, i), r)
            : new Date(NaN);
        }
        if ((n = g.MMDD.exec(e))) {
          (r = new Date(0)), (a = parseInt(n[1], 10) - 1);
          var s = parseInt(n[2], 10);
          return v(t, a, s) ? (r.setUTCFullYear(t, a, s), r) : new Date(NaN);
        }
        if ((n = g.Www.exec(e)))
          return b(t, (o = parseInt(n[1], 10) - 1)) ? w(t, o) : new Date(NaN);
        if ((n = g.WwwD.exec(e))) {
          o = parseInt(n[1], 10) - 1;
          var u = parseInt(n[2], 10) - 1;
          return b(t, o, u) ? w(t, o, u) : new Date(NaN);
        }
        return null;
      })(o.restDateString, o.year);
    if (isNaN(i)) return new Date(NaN);
    if (i) {
      var s,
        u = i.getTime(),
        c = 0;
      if (
        a.time &&
        ((c = (function(e) {
          var t, n, r;
          if ((t = g.HH.exec(e)))
            return D((n = parseFloat(t[1].replace(",", "."))))
              ? (n % 24) * l
              : NaN;
          if ((t = g.HHMM.exec(e)))
            return (
              (n = parseInt(t[1], 10)),
              (r = parseFloat(t[2].replace(",", "."))),
              D(n, r) ? (n % 24) * l + r * d : NaN
            );
          if ((t = g.HHMMSS.exec(e))) {
            (n = parseInt(t[1], 10)), (r = parseInt(t[2], 10));
            var a = parseFloat(t[3].replace(",", "."));
            return D(n, r, a) ? (n % 24) * l + r * d + 1e3 * a : NaN;
          }
          return null;
        })(a.time)),
        isNaN(c))
      )
        return new Date(NaN);
      if (a.timezone) {
        if (
          ((s = (function(e) {
            var t, n, r;
            if ((t = g.timezoneZ.exec(e))) return 0;
            if ((t = g.timezoneHH.exec(e)))
              return C((r = parseInt(t[2], 10)))
                ? ((n = r * l), "+" === t[1] ? -n : n)
                : NaN;
            if ((t = g.timezoneHHMM.exec(e))) {
              r = parseInt(t[2], 10);
              var a = parseInt(t[3], 10);
              return C(r, a)
                ? ((n = r * l + a * d), "+" === t[1] ? -n : n)
                : NaN;
            }
            return 0;
          })(a.timezone)),
          isNaN(s))
        )
          return new Date(NaN);
      } else (s = x(new Date(u + c))), (s = x(new Date(u + c + s)));
      return new Date(u + c + s);
    }
    return new Date(NaN);
  }
  function w(e, t, n) {
    (t = t || 0), (n = n || 0);
    var r = new Date(0);
    r.setUTCFullYear(e, 0, 4);
    var a = 7 * t + n + 1 - (r.getUTCDay() || 7);
    return r.setUTCDate(r.getUTCDate() + a), r;
  }
  var o = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    i = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function y(e) {
    return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
  }
  function v(e, t, n) {
    if (t < 0 || 11 < t) return !1;
    if (null != n) {
      if (n < 1) return !1;
      var r = y(e);
      if (r && i[t] < n) return !1;
      if (!r && o[t] < n) return !1;
    }
    return !0;
  }
  function b(e, t, n) {
    return 0 <= t && t <= 52 && (null == n || (0 <= n && n <= 6));
  }
  function D(e, t, n) {
    return (
      (null == e || (0 <= e && e < 25)) &&
      ((null == t || (0 <= t && t < 60)) && (null == n || (0 <= n && n < 60)))
    );
  }
  function C(e, t) {
    return null == t || (0 <= t && t <= 59);
  }
  function k(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t);
    return !isNaN(n);
  }
  var s = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" }
  };
  function r(n) {
    return function(e) {
      var t = e || {};
      return (
        n.formats[t.width ? t.width + "" : n.defaultWidth] ||
        n.formats[n.defaultWidth]
      );
    };
  }
  var c = {
      date: r({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy"
        },
        defaultWidth: "full"
      }),
      time: r({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a"
        },
        defaultWidth: "full"
      }),
      dateTime: r({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}"
        },
        defaultWidth: "full"
      })
    },
    T = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    };
  function M(a) {
    return function(e, t) {
      var n = t || {},
        r = n.width ? n.width + "" : a.defaultWidth;
      return ("formatting" === (n.context ? n.context + "" : "standalone") &&
      a.formattingValues
        ? a.formattingValues[r] || a.formattingValues[a.defaultFormattingWidth]
        : a.values[r] ||
          a.values[
            a.defaultWidth
          ])[a.argumentCallback ? a.argumentCallback(e) : e];
    };
  }
  function E(c) {
    return function(e, t) {
      var n = e + "",
        r = t || {},
        a = r.width,
        o = n.match(
          (a && c.matchPatterns[a]) || c.matchPatterns[c.defaultMatchWidth]
        );
      if (!o) return null;
      var i,
        s = o[0],
        u = (a && c.parsePatterns[a]) || c.parsePatterns[c.defaultParseWidth];
      return (
        (i =
          "[object Array]" === Object.prototype.toString.call(u)
            ? u.findIndex(function(e) {
                return e.test(n);
              })
            : (function(e, t) {
                for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
              })(u, function(e) {
                return e.test(n);
              })),
        (i = c.valueCallback ? c.valueCallback(i) : i),
        {
          value: (i = r.valueCallback ? r.valueCallback(i) : i),
          rest: n.slice(s.length)
        }
      );
    };
  }
  var O,
    _ = {
      formatDistance: function(e, t, n) {
        var r;
        return (
          (n = n || {}),
          (r =
            "string" == typeof s[e]
              ? s[e]
              : 1 === t ? s[e].one : s[e].other.replace("{{count}}", t)),
          n.addSuffix ? (0 < n.comparison ? "in " + r : r + " ago") : r
        );
      },
      formatLong: c,
      formatRelative: function(e, t, n, r) {
        return T[e];
      },
      localize: {
        ordinalNumber: function(e, t) {
          var n = +e,
            r = n % 100;
          if (20 < r || r < 10)
            switch (r % 10) {
              case 1:
                return n + "st";
              case 2:
                return n + "nd";
              case 3:
                return n + "rd";
            }
          return n + "th";
        },
        era: M({
          values: {
            narrow: ["B", "A"],
            abbreviated: ["BC", "AD"],
            wide: ["Before Christ", "Anno Domini"]
          },
          defaultWidth: "wide"
        }),
        quarter: M({
          values: {
            narrow: ["1", "2", "3", "4"],
            abbreviated: ["Q1", "Q2", "Q3", "Q4"],
            wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
          },
          defaultWidth: "wide",
          argumentCallback: function(e) {
            return +e - 1;
          }
        }),
        month: M({
          values: {
            narrow: [
              "J",
              "F",
              "M",
              "A",
              "M",
              "J",
              "J",
              "A",
              "S",
              "O",
              "N",
              "D"
            ],
            abbreviated: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            wide: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ]
          },
          defaultWidth: "wide"
        }),
        day: M({
          values: {
            narrow: ["S", "M", "T", "W", "T", "F", "S"],
            short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            wide: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ]
          },
          defaultWidth: "wide"
        }),
        dayPeriod: M({
          values: {
            narrow: {
              am: "a",
              pm: "p",
              midnight: "mi",
              noon: "n",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            },
            abbreviated: {
              am: "AM",
              pm: "PM",
              midnight: "midnight",
              noon: "noon",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            },
            wide: {
              am: "a.m.",
              pm: "p.m.",
              midnight: "midnight",
              noon: "noon",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            }
          },
          defaultWidth: "wide",
          formattingValues: {
            narrow: {
              am: "a",
              pm: "p",
              midnight: "mi",
              noon: "n",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            },
            abbreviated: {
              am: "AM",
              pm: "PM",
              midnight: "midnight",
              noon: "noon",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            },
            wide: {
              am: "a.m.",
              pm: "p.m.",
              midnight: "midnight",
              noon: "noon",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            }
          },
          defaulFormattingWidth: "wide"
        })
      },
      match: {
        ordinalNumber: ((O = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function(e) {
            return parseInt(e, 10);
          }
        }),
        function(e, t) {
          var n = e + "",
            r = t || {},
            a = n.match(O.matchPattern);
          if (!a) return null;
          var o = a[0],
            i = n.match(O.parsePattern);
          if (!i) return null;
          var s = O.valueCallback ? O.valueCallback(i[0]) : i[0];
          return {
            value: (s = r.valueCallback ? r.valueCallback(s) : s),
            rest: n.slice(o.length)
          };
        }),
        era: E({
          matchPatterns: {
            narrow: /^(b|a)/i,
            abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
            wide: /^(before christ|before common era|anno domini|common era)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/^b/i, /^(a|c)/i] },
          defaultParseWidth: "any"
        }),
        quarter: E({
          matchPatterns: {
            narrow: /^[1234]/i,
            abbreviated: /^q[1234]/i,
            wide: /^[1234](th|st|nd|rd)? quarter/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
          defaultParseWidth: "any",
          valueCallback: function(e) {
            return e + 1;
          }
        }),
        month: E({
          matchPatterns: {
            narrow: /^[jfmasond]/i,
            abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
            wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            narrow: [
              /^j/i,
              /^f/i,
              /^m/i,
              /^a/i,
              /^m/i,
              /^j/i,
              /^j/i,
              /^a/i,
              /^s/i,
              /^o/i,
              /^n/i,
              /^d/i
            ],
            any: [
              /^ja/i,
              /^f/i,
              /^mar/i,
              /^ap/i,
              /^may/i,
              /^jun/i,
              /^jul/i,
              /^au/i,
              /^s/i,
              /^o/i,
              /^n/i,
              /^d/i
            ]
          },
          defaultParseWidth: "any"
        }),
        day: E({
          matchPatterns: {
            narrow: /^[smtwf]/i,
            short: /^(su|mo|tu|we|th|fr|sa)/i,
            abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
            wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
            any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
          },
          defaultParseWidth: "any"
        }),
        dayPeriod: E({
          matchPatterns: {
            narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
            any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
          },
          defaultMatchWidth: "any",
          parsePatterns: {
            any: {
              am: /^a/i,
              pm: /^p/i,
              midnight: /^mi/i,
              noon: /^no/i,
              morning: /morning/i,
              afternoon: /afternoon/i,
              evening: /evening/i,
              night: /night/i
            }
          },
          defaultParseWidth: "any"
        })
      },
      options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
    };
  function Y(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t),
      r = n.getUTCDay(),
      a = (r < 1 ? 7 : 0) + r - 1;
    return n.setUTCDate(n.getUTCDate() - a), n.setUTCHours(0, 0, 0, 0), n;
  }
  function q(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t),
      r = n.getUTCFullYear(),
      a = new Date(0);
    a.setUTCFullYear(r + 1, 0, 4), a.setUTCHours(0, 0, 0, 0);
    var o = Y(a, t),
      i = new Date(0);
    i.setUTCFullYear(r, 0, 4), i.setUTCHours(0, 0, 0, 0);
    var s = Y(i, t);
    return n.getTime() < o.getTime()
      ? n.getTime() < s.getTime() ? r - 1 : r
      : r + 1;
  }
  var P = 6048e5;
  function U(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t),
      r =
        Y(n, t).getTime() -
        (function(e, t) {
          if (arguments.length < 1)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = q(e, t),
            r = new Date(0);
          return r.setUTCFullYear(n, 0, 4), r.setUTCHours(0, 0, 0, 0), Y(r, t);
        })(n, t).getTime();
    return 1 + Math.round(r / P);
  }
  function F(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = n.locale,
      a = r && r.options && r.options.weekStartsOn,
      o = null == a ? 0 : S(a),
      i = null == n.weekStartsOn ? o : S(n.weekStartsOn);
    if (i < 0 || 6 < i)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var s = N(e, n),
      u = s.getUTCDay(),
      c = (u < i ? 7 : 0) + u - i;
    return s.setUTCDate(s.getUTCDate() - c), s.setUTCHours(0, 0, 0, 0), s;
  }
  function W(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t),
      r = n.getUTCFullYear(),
      a = t || {},
      o = a.locale,
      i = o && o.options && o.options.firstWeekContainsDate,
      s = null == i ? 1 : S(i),
      u = null == a.firstWeekContainsDate ? s : S(a.firstWeekContainsDate);
    if (u < 1 || 7 < u)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var c = new Date(0);
    c.setUTCFullYear(r + 1, 0, u), c.setUTCHours(0, 0, 0, 0);
    var l = F(c, t),
      p = new Date(0);
    p.setUTCFullYear(r, 0, u), p.setUTCHours(0, 0, 0, 0);
    var d = F(p, t);
    return n.getTime() < l.getTime()
      ? n.getTime() < d.getTime() ? r - 1 : r
      : r + 1;
  }
  var H = 6048e5;
  function I(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t),
      r =
        F(n, t).getTime() -
        (function(e, t) {
          if (arguments.length < 1)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = t || {},
            r = n.locale,
            a = r && r.options && r.options.firstWeekContainsDate,
            o = null == a ? 1 : S(a),
            i =
              null == n.firstWeekContainsDate ? o : S(n.firstWeekContainsDate),
            s = W(e, t),
            u = new Date(0);
          return u.setUTCFullYear(s, 0, i), u.setUTCHours(0, 0, 0, 0), F(u, t);
        })(n, t).getTime();
    return 1 + Math.round(r / H);
  }
  var L = "midnight",
    R = "noon",
    B = "morning",
    j = "afternoon",
    Q = "evening",
    X = "night",
    A = {
      G: function(e, t, n) {
        var r = 0 < e.getUTCFullYear() ? 1 : 0;
        switch (t) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(r, { width: "abbreviated" });
          case "GGGGG":
            return n.era(r, { width: "narrow" });
          case "GGGG":
          default:
            return n.era(r, { width: "wide" });
        }
      },
      y: function(e, t, n, r) {
        var a = e.getUTCFullYear(),
          o = 0 < a ? a : 1 - a;
        return "yy" !== t
          ? "yo" === t ? n.ordinalNumber(o, { unit: "year" }) : z(o, t.length)
          : z(o % 100, 2);
      },
      Y: function(e, t, n, r) {
        var a = W(e, r),
          o = 0 < a ? a : 1 - a;
        return "YY" !== t
          ? "Yo" === t ? n.ordinalNumber(o, { unit: "year" }) : z(o, t.length)
          : z(o % 100, 2);
      },
      R: function(e, t, n, r) {
        return z(q(e, r), t.length);
      },
      u: function(e, t, n, r) {
        return z(e.getUTCFullYear(), t.length);
      },
      Q: function(e, t, n, r) {
        var a = Math.ceil((1 + e.getUTCMonth()) / 3);
        switch (t) {
          case "Q":
            return a + "";
          case "QQ":
            return z(a, 2);
          case "Qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "QQQ":
            return n.quarter(a, {
              width: "abbreviated",
              context: "formatting"
            });
          case "QQQQQ":
            return n.quarter(a, { width: "narrow", context: "formatting" });
          case "QQQQ":
          default:
            return n.quarter(a, { width: "wide", context: "formatting" });
        }
      },
      q: function(e, t, n, r) {
        var a = Math.ceil((1 + e.getUTCMonth()) / 3);
        switch (t) {
          case "q":
            return a + "";
          case "qq":
            return z(a, 2);
          case "qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "qqq":
            return n.quarter(a, {
              width: "abbreviated",
              context: "standalone"
            });
          case "qqqqq":
            return n.quarter(a, { width: "narrow", context: "standalone" });
          case "qqqq":
          default:
            return n.quarter(a, { width: "wide", context: "standalone" });
        }
      },
      M: function(e, t, n, r) {
        var a = e.getUTCMonth();
        switch (t) {
          case "M":
            return a + 1 + "";
          case "MM":
            return z(a + 1, 2);
          case "Mo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "MMM":
            return n.month(a, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(a, { width: "narrow", context: "formatting" });
          case "MMMM":
          default:
            return n.month(a, { width: "wide", context: "formatting" });
        }
      },
      L: function(e, t, n, r) {
        var a = e.getUTCMonth();
        switch (t) {
          case "L":
            return a + 1 + "";
          case "LL":
            return z(a + 1, 2);
          case "Lo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "LLL":
            return n.month(a, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(a, { width: "narrow", context: "standalone" });
          case "LLLL":
          default:
            return n.month(a, { width: "wide", context: "standalone" });
        }
      },
      w: function(e, t, n, r) {
        var a = I(e, r);
        return "wo" === t
          ? n.ordinalNumber(a, { unit: "week" })
          : z(a, t.length);
      },
      I: function(e, t, n, r) {
        var a = U(e, r);
        return "Io" === t
          ? n.ordinalNumber(a, { unit: "week" })
          : z(a, t.length);
      },
      d: function(e, t, n, r) {
        var a = e.getUTCDate();
        return "do" === t
          ? n.ordinalNumber(a, { unit: "date" })
          : z(a, t.length);
      },
      D: function(e, t, n, r) {
        var a = (function(e, t) {
          if (arguments.length < 1)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = N(e, t),
            r = n.getTime();
          n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0);
          var a = n.getTime();
          return 1 + Math.floor((r - a) / 864e5);
        })(e, r);
        return "Do" === t
          ? n.ordinalNumber(a, { unit: "dayOfYear" })
          : z(a, t.length);
      },
      E: function(e, t, n, r) {
        var a = e.getUTCDay();
        switch (t) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(a, { width: "short", context: "formatting" });
          case "EEEE":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      e: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "e":
            return o + "";
          case "ee":
            return z(o, 2);
          case "eo":
            return n.ordinalNumber(o, { unit: "day" });
          case "eee":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(a, { width: "short", context: "formatting" });
          case "eeee":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      c: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "c":
            return o + "";
          case "cc":
            return z(o, t.length);
          case "co":
            return n.ordinalNumber(o, { unit: "day" });
          case "ccc":
            return n.day(a, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(a, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(a, { width: "short", context: "standalone" });
          case "cccc":
          default:
            return n.day(a, { width: "wide", context: "standalone" });
        }
      },
      i: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = 0 === a ? 7 : a;
        switch (t) {
          case "i":
            return o + "";
          case "ii":
            return z(o, t.length);
          case "io":
            return n.ordinalNumber(o, { unit: "day" });
          case "iii":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(a, { width: "short", context: "formatting" });
          case "iiii":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      a: function(e, t, n) {
        var r = e.getUTCHours() / 12 < 1 ? "am" : "pm";
        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "aaaaa":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "aaaa":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      b: function(e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (((r = 12 === a ? R : 0 === a ? L : a / 12 < 1 ? "am" : "pm"),
        t)) {
          case "b":
          case "bb":
          case "bbb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "bbbb":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function(e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (((r = a < 17 ? (a < 12 ? (a < 4 ? X : B) : j) : Q), t)) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "BBBB":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function(e, t, n, r) {
        var a = e.getUTCHours() % 12;
        return (
          0 === a && (a = 12),
          "ho" === t ? n.ordinalNumber(a, { unit: "hour" }) : z(a, t.length)
        );
      },
      H: function(e, t, n, r) {
        var a = e.getUTCHours();
        return "Ho" === t
          ? n.ordinalNumber(a, { unit: "hour" })
          : z(a, t.length);
      },
      K: function(e, t, n, r) {
        var a = e.getUTCHours() % 12;
        return "Ko" === t
          ? n.ordinalNumber(a, { unit: "hour" })
          : z(a, t.length);
      },
      k: function(e, t, n, r) {
        var a = e.getUTCHours();
        return (
          0 === a && (a = 24),
          "ko" === t ? n.ordinalNumber(a, { unit: "hour" }) : z(a, t.length)
        );
      },
      m: function(e, t, n, r) {
        var a = e.getUTCMinutes();
        return "mo" === t
          ? n.ordinalNumber(a, { unit: "minute" })
          : z(a, t.length);
      },
      s: function(e, t, n, r) {
        var a = e.getUTCSeconds();
        return "so" === t
          ? n.ordinalNumber(a, { unit: "second" })
          : z(a, t.length);
      },
      S: function(e, t, n, r) {
        var a = t.length,
          o = e.getUTCMilliseconds();
        return z(Math.floor(o * Math.pow(10, a - 3)), a);
      },
      X: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        if (0 === a) return "Z";
        switch (t) {
          case "X":
            return V(a);
          case "XXXX":
          case "XX":
            return G(a);
          case "XXXXX":
          case "XXX":
          default:
            return G(a, ":");
        }
      },
      x: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "x":
            return V(a);
          case "xxxx":
          case "xx":
            return G(a);
          case "xxxxx":
          case "xxx":
          default:
            return G(a, ":");
        }
      },
      O: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + K(a, ":");
          case "OOOO":
          default:
            return "GMT" + G(a, ":");
        }
      },
      z: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + K(a, ":");
          case "zzzz":
          default:
            return "GMT" + G(a, ":");
        }
      },
      t: function(e, t, n, r) {
        return z(Math.floor((r._originalDate || e).getTime() / 1e3), t.length);
      },
      T: function(e, t, n, r) {
        return z((r._originalDate || e).getTime(), t.length);
      }
    };
  function z(e, t) {
    for (var n = e < 0 ? "-" : "", r = "" + Math.abs(e); r.length < t; )
      r = "0" + r;
    return n + r;
  }
  function G(e, t) {
    var n = t || "",
      r = 0 < e ? "-" : "+",
      a = Math.abs(e);
    return r + z(Math.floor(a / 60), 2) + n + z(a % 60, 2);
  }
  function V(e, t) {
    return e % 60 != 0 ? G(e, t) : (0 < e ? "-" : "+") + z(Math.abs(e) / 60, 2);
  }
  function K(e, t) {
    var n = 0 < e ? "-" : "+",
      r = Math.abs(e),
      a = Math.floor(r / 60),
      o = r % 60;
    return 0 === o ? n + (a + "") : n + (a + "") + (t || "") + z(o, 2);
  }
  function $(e, t, n) {
    switch (e) {
      case "P":
        return t.date({ width: "short" });
      case "PP":
        return t.date({ width: "medium" });
      case "PPP":
        return t.date({ width: "long" });
      case "PPPP":
      default:
        return t.date({ width: "full" });
    }
  }
  function Z(e, t, n) {
    switch (e) {
      case "p":
        return t.time({ width: "short" });
      case "pp":
        return t.time({ width: "medium" });
      case "ppp":
        return t.time({ width: "long" });
      case "pppp":
      default:
        return t.time({ width: "full" });
    }
  }
  var J = {
    p: Z,
    P: function(e, t, n) {
      var r,
        a = e.match(/(P+)(p+)?/),
        o = a[1],
        i = a[2];
      if (!i) return $(e, t);
      switch (o) {
        case "P":
          r = t.dateTime({ width: "short" });
          break;
        case "PP":
          r = t.dateTime({ width: "medium" });
          break;
        case "PPP":
          r = t.dateTime({ width: "long" });
          break;
        case "PPPP":
        default:
          r = t.dateTime({ width: "full" });
      }
      return r.replace("{{date}}", $(o, t)).replace("{{time}}", Z(i, t));
    }
  };
  function ee(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n).getTime(),
      a = S(t);
    return new Date(r + a);
  }
  function te(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return ee(e, -S(t), n);
  }
  var ne = ["D", "DD", "YY", "YYYY"];
  function re(e) {
    return -1 != ne.indexOf(e);
  }
  function ae(e) {
    throw new RangeError(
      "`options.awareOfUnicodeTokens` must be set to `true` to use `" +
        e +
        "` token; see: https://git.io/fxCyr"
    );
  }
  var oe = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    ie = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    se = /^'(.*?)'?$/,
    ue = /''/g;
  function ce(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = t + "",
      a = n || {},
      o = a.locale || _,
      i = o.options && o.options.firstWeekContainsDate,
      s = null == i ? 1 : S(i),
      u = null == a.firstWeekContainsDate ? s : S(a.firstWeekContainsDate);
    if (u < 1 || 7 < u)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var c = o.options && o.options.weekStartsOn,
      l = null == c ? 0 : S(c),
      p = null == a.weekStartsOn ? l : S(a.weekStartsOn);
    if (p < 0 || 6 < p)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!o.localize)
      throw new RangeError("locale must contain localize property");
    if (!o.formatLong)
      throw new RangeError("locale must contain formatLong property");
    var d = N(e, a);
    if (!k(d, a)) return "Invalid Date";
    var h = te(d, x(d), a),
      f = {
        firstWeekContainsDate: u,
        weekStartsOn: p,
        locale: o,
        _originalDate: d
      };
    return r
      .match(ie)
      .map(function(e) {
        var t = e[0];
        return "p" !== t && "P" !== t ? e : (0, J[t])(e, o.formatLong, f);
      })
      .join("")
      .match(oe)
      .map(function(e) {
        if ("''" === e) return "'";
        var t = e[0];
        if ("'" === t) return e.match(se)[1].replace(ue, "'");
        var n = A[t];
        return n
          ? (!a.awareOfUnicodeTokens && re(e) && ae(e), n(h, e, o.localize, f))
          : e;
      })
      .join("");
  }
  var le = 6e4;
  function pe(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return ee(e, S(t) * le, n);
  }
  var de = 36e5;
  function he(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return ee(e, S(t) * de, n);
  }
  function fe(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = S(t);
    return r.setDate(r.getDate() + a), r;
  }
  function me(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return fe(e, 7 * S(t), n);
  }
  function ge(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t),
      r = n.getFullYear(),
      a = n.getMonth(),
      o = new Date(0);
    return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
  }
  function we(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = S(t),
      o = r.getMonth() + a,
      i = new Date(0);
    i.setFullYear(r.getFullYear(), o, 1), i.setHours(0, 0, 0, 0);
    var s = ge(i, n);
    return r.setMonth(o, Math.min(s, r.getDate())), r;
  }
  function ye(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return we(e, 12 * S(t), n);
  }
  function ve(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return we(e, -S(t), n);
  }
  function be(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return N(e, t).getMinutes();
  }
  function De(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return N(e, t).getHours();
  }
  function Ce(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return N(e, t).getDate();
  }
  function ke(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return N(e, t).getMonth();
  }
  function Te(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return N(e, t).getFullYear();
  }
  function Me(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return N(e, t).getTime();
  }
  function Se(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = S(t);
    return r.setMinutes(a), r;
  }
  function xe(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = S(t);
    return r.setHours(a), r;
  }
  function Ne(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = S(t),
      o = r.getFullYear(),
      i = r.getDate(),
      s = new Date(0);
    s.setFullYear(o, a, 15), s.setHours(0, 0, 0, 0);
    var u = ge(s, n);
    return r.setMonth(a, Math.min(i, u)), r;
  }
  function Ee(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = S(t);
    return isNaN(r) ? new Date(NaN) : (r.setFullYear(a), r);
  }
  function Oe(e, n) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var r;
    return (
      (null == e
        ? []
        : "function" == typeof e.forEach ? e : Array.prototype.slice.call(e)
      ).forEach(function(e) {
        var t = N(e, n);
        (void 0 === r || t < r || isNaN(t)) && (r = t);
      }),
      r
    );
  }
  function _e(e, n) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var r;
    return (
      (null == e
        ? []
        : "function" == typeof e.forEach ? e : Array.prototype.slice.call(e)
      ).forEach(function(e) {
        var t = N(e, n);
        (void 0 === r || r < t || isNaN(t)) && (r = t);
      }),
      r
    );
  }
  function Ye(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = N(e, t);
    return n.setHours(0, 0, 0, 0), n;
  }
  var qe = 864e5;
  function Pe(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = Ye(e, n),
      a = Ye(t, n),
      o = r.getTime() - x(r),
      i = a.getTime() - x(a);
    return Math.round((o - i) / qe);
  }
  function Ue(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = N(t, n);
    return (
      12 * (r.getFullYear() - a.getFullYear()) + (r.getMonth() - a.getMonth())
    );
  }
  function Fe(e, t) {
    if (arguments.length < 1)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = n.locale,
      a = r && r.options && r.options.weekStartsOn,
      o = null == a ? 0 : S(a),
      i = null == n.weekStartsOn ? o : S(n.weekStartsOn);
    if (i < 0 || 6 < i)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var s = N(e, n),
      u = s.getDay(),
      c = (u < i ? 7 : 0) + u - i;
    return s.setDate(s.getDate() - c), s.setHours(0, 0, 0, 0), s;
  }
  var We = 6048e5;
  function He(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = N(t, n);
    return r.getTime() == a.getTime();
  }
  function Ie(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = N(t, n);
    return r.getTime() > a.getTime();
  }
  function Le(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = N(e, n),
      a = N(t, n);
    return r.getTime() < a.getTime();
  }
  function Re(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = t || {},
      a = N(e, n).getTime(),
      o = N(r.start, n).getTime(),
      i = N(r.end, n).getTime();
    if (o > i) throw new RangeError("Invalid interval");
    return o <= a && a <= i;
  }
  function Be(e, t, n) {
    if (arguments.length < 2)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = n || {},
      a = r.locale,
      o = a && a.options && a.options.weekStartsOn,
      i = null == o ? 0 : S(o),
      s = null == r.weekStartsOn ? i : S(r.weekStartsOn);
    if (s < 0 || 6 < s)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var u = N(e, n),
      c = S(t),
      l = ((c % 7 + 7) % 7 < s ? 7 : 0) + c - u.getUTCDay();
    return u.setUTCDate(u.getUTCDate() + l), u;
  }
  var je = /^(1[0-2]|0?\d)/,
    Qe = /^(3[0-1]|[0-2]?\d)/,
    Xe = /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    Ae = /^(5[0-3]|[0-4]?\d)/,
    ze = /^(2[0-3]|[0-1]?\d)/,
    Ge = /^(2[0-4]|[0-1]?\d)/,
    Ve = /^(1[0-1]|0?\d)/,
    Ke = /^(1[0-2]|0?\d)/,
    $e = /^[0-5]?\d/,
    Ze = /^[0-5]?\d/,
    Je = /^\d/,
    et = /^\d{1,2}/,
    tt = /^\d{1,3}/,
    nt = /^\d{1,4}/,
    rt = /^-?\d+/,
    at = /^-?\d/,
    ot = /^-?\d{1,2}/,
    it = /^-?\d{1,3}/,
    st = /^-?\d{1,4}/,
    ut = /^([+-])(\d{2})(\d{2})?|Z/,
    ct = /^([+-])(\d{2})(\d{2})|Z/,
    lt = /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    pt = /^([+-])(\d{2}):(\d{2})|Z/,
    dt = /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/;
  function ht(e, t, n) {
    var r = t.match(e);
    if (!r) return null;
    var a = parseInt(r[0], 10);
    return { value: n ? n(a) : a, rest: t.slice(r[0].length) };
  }
  function ft(e, t) {
    var n = t.match(e);
    return n
      ? "Z" === n[0]
        ? { value: 0, rest: t.slice(1) }
        : {
            value:
              ("+" === n[1] ? 1 : -1) *
              (36e5 * (n[2] ? parseInt(n[2], 10) : 0) +
                6e4 * (n[3] ? parseInt(n[3], 10) : 0) +
                1e3 * (n[5] ? parseInt(n[5], 10) : 0)),
            rest: t.slice(n[0].length)
          }
      : null;
  }
  function mt(e, t) {
    return ht(rt, e, t);
  }
  function gt(e, t, n) {
    switch (e) {
      case 1:
        return ht(Je, t, n);
      case 2:
        return ht(et, t, n);
      case 3:
        return ht(tt, t, n);
      case 4:
        return ht(nt, t, n);
      default:
        return ht(RegExp("^\\d{1," + e + "}"), t, n);
    }
  }
  function wt(e, t, n) {
    switch (e) {
      case 1:
        return ht(at, t, n);
      case 2:
        return ht(ot, t, n);
      case 3:
        return ht(it, t, n);
      case 4:
        return ht(st, t, n);
      default:
        return ht(RegExp("^-?\\d{1," + e + "}"), t, n);
    }
  }
  function yt(e) {
    switch (e) {
      case "morning":
        return 4;
      case "evening":
        return 17;
      case "pm":
      case "noon":
      case "afternoon":
        return 12;
      case "am":
      case "midnight":
      case "night":
      default:
        return 0;
    }
  }
  function vt(e, t) {
    var n,
      r = 0 < t,
      a = r ? t : 1 - t;
    if (a > 50) {
      var o = a + 50;
      n = e + 100 * Math.floor(o / 100) - (o % 100 <= e ? 100 : 0);
    } else n = e || 100;
    return r ? n : 1 - n;
  }
  var bt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Dt = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function Ct(e) {
    return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
  }
  var kt = {
      G: {
        priority: 140,
        parse: function(e, t, n, r) {
          switch (t) {
            case "G":
            case "GG":
            case "GGG":
              return (
                n.era(e, { width: "abbreviated" }) ||
                n.era(e, { width: "narrow" })
              );
            case "GGGGG":
              return n.era(e, { width: "narrow" });
            case "GGGG":
            default:
              return (
                n.era(e, { width: "wide" }) ||
                n.era(e, { width: "abbreviated" }) ||
                n.era(e, { width: "narrow" })
              );
          }
        },
        set: function(e, t, n) {
          return (
            e.setUTCFullYear(1 === t ? 10 : -9, 0, 1),
            e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      y: {
        priority: 130,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return { year: e, isTwoDigitYear: "yy" === t };
          };
          switch (t) {
            case "y":
              return gt(4, e, a);
            case "yo":
              return n.ordinalNumber(e, { unit: "year", valueCallback: a });
            default:
              return gt(t.length, e, a);
          }
        },
        validate: function(e, t, n) {
          return t.isTwoDigitYear || 0 < t.year;
        },
        set: function(e, t, n) {
          var r = W(e, n);
          if (t.isTwoDigitYear) {
            var a = vt(t.year, r);
            return e.setUTCFullYear(a, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
          }
          return (
            e.setUTCFullYear(0 < r ? t.year : 1 - t.year, 0, 1),
            e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      Y: {
        priority: 130,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return { year: e, isTwoDigitYear: "YY" === t };
          };
          switch (t) {
            case "Y":
              return gt(4, e, a);
            case "Yo":
              return n.ordinalNumber(e, { unit: "year", valueCallback: a });
            default:
              return gt(t.length, e, a);
          }
        },
        validate: function(e, t, n) {
          return t.isTwoDigitYear || 0 < t.year;
        },
        set: function(e, t, n) {
          var r = e.getUTCFullYear();
          if (t.isTwoDigitYear) {
            var a = vt(t.year, r);
            return (
              e.setUTCFullYear(a, 0, n.firstWeekContainsDate),
              e.setUTCHours(0, 0, 0, 0),
              F(e, n)
            );
          }
          return (
            e.setUTCFullYear(
              0 < r ? t.year : 1 - t.year,
              0,
              n.firstWeekContainsDate
            ),
            e.setUTCHours(0, 0, 0, 0),
            F(e, n)
          );
        }
      },
      R: {
        priority: 130,
        parse: function(e, t, n, r) {
          return wt("R" === t ? 4 : t.length, e);
        },
        set: function(e, t, n) {
          var r = new Date(0);
          return r.setUTCFullYear(t, 0, 4), r.setUTCHours(0, 0, 0, 0), Y(r);
        }
      },
      u: {
        priority: 130,
        parse: function(e, t, n, r) {
          return wt("u" === t ? 4 : t.length, e);
        },
        set: function(e, t, n) {
          return e.setUTCFullYear(t, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      Q: {
        priority: 120,
        parse: function(e, t, n, r) {
          switch (t) {
            case "Q":
            case "QQ":
              return gt(t.length, e);
            case "Qo":
              return n.ordinalNumber(e, { unit: "quarter" });
            case "QQQ":
              return (
                n.quarter(e, { width: "abbreviated", context: "formatting" }) ||
                n.quarter(e, { width: "narrow", context: "formatting" })
              );
            case "QQQQQ":
              return n.quarter(e, { width: "narrow", context: "formatting" });
            case "QQQQ":
            default:
              return (
                n.quarter(e, { width: "wide", context: "formatting" }) ||
                n.quarter(e, { width: "abbreviated", context: "formatting" }) ||
                n.quarter(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 4;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(3 * (t - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      q: {
        priority: 120,
        parse: function(e, t, n, r) {
          switch (t) {
            case "q":
            case "qq":
              return gt(t.length, e);
            case "qo":
              return n.ordinalNumber(e, { unit: "quarter" });
            case "qqq":
              return (
                n.quarter(e, { width: "abbreviated", context: "standalone" }) ||
                n.quarter(e, { width: "narrow", context: "standalone" })
              );
            case "qqqqq":
              return n.quarter(e, { width: "narrow", context: "standalone" });
            case "qqqq":
            default:
              return (
                n.quarter(e, { width: "wide", context: "standalone" }) ||
                n.quarter(e, { width: "abbreviated", context: "standalone" }) ||
                n.quarter(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 4;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(3 * (t - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      M: {
        priority: 110,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return e - 1;
          };
          switch (t) {
            case "M":
              return ht(je, e, a);
            case "MM":
              return gt(2, e, a);
            case "Mo":
              return n.ordinalNumber(e, { unit: "month", valueCallback: a });
            case "MMM":
              return (
                n.month(e, { width: "abbreviated", context: "formatting" }) ||
                n.month(e, { width: "narrow", context: "formatting" })
              );
            case "MMMMM":
              return n.month(e, { width: "narrow", context: "formatting" });
            case "MMMM":
            default:
              return (
                n.month(e, { width: "wide", context: "formatting" }) ||
                n.month(e, { width: "abbreviated", context: "formatting" }) ||
                n.month(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 11;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(t, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      L: {
        priority: 110,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return e - 1;
          };
          switch (t) {
            case "L":
              return ht(je, e, a);
            case "LL":
              return gt(2, e, a);
            case "Lo":
              return n.ordinalNumber(e, { unit: "month", valueCallback: a });
            case "LLL":
              return (
                n.month(e, { width: "abbreviated", context: "standalone" }) ||
                n.month(e, { width: "narrow", context: "standalone" })
              );
            case "LLLLL":
              return n.month(e, { width: "narrow", context: "standalone" });
            case "LLLL":
            default:
              return (
                n.month(e, { width: "wide", context: "standalone" }) ||
                n.month(e, { width: "abbreviated", context: "standalone" }) ||
                n.month(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 11;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(t, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      w: {
        priority: 100,
        parse: function(e, t, n, r) {
          switch (t) {
            case "w":
              return ht(Ae, e);
            case "wo":
              return n.ordinalNumber(e, { unit: "week" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 53;
        },
        set: function(e, t, n) {
          return F(
            (function(e, t, n) {
              if (arguments.length < 2)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = N(e, n),
                a = S(t),
                o = I(r, n) - a;
              return r.setUTCDate(r.getUTCDate() - 7 * o), r;
            })(e, t, n),
            n
          );
        }
      },
      I: {
        priority: 100,
        parse: function(e, t, n, r) {
          switch (t) {
            case "I":
              return ht(Ae, e);
            case "Io":
              return n.ordinalNumber(e, { unit: "week" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 53;
        },
        set: function(e, t, n) {
          return Y(
            (function(e, t, n) {
              if (arguments.length < 2)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = N(e, n),
                a = S(t),
                o = U(r, n) - a;
              return r.setUTCDate(r.getUTCDate() - 7 * o), r;
            })(e, t, n),
            n
          );
        }
      },
      d: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "d":
              return ht(Qe, e);
            case "do":
              return n.ordinalNumber(e, { unit: "date" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          var r = Ct(e.getUTCFullYear()),
            a = e.getUTCMonth();
          return r ? 1 <= t && t <= Dt[a] : 1 <= t && t <= bt[a];
        },
        set: function(e, t, n) {
          return e.setUTCDate(t), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      D: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "D":
            case "DD":
              return ht(Xe, e);
            case "Do":
              return n.ordinalNumber(e, { unit: "date" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return Ct(e.getUTCFullYear())
            ? 1 <= t && t <= 366
            : 1 <= t && t <= 365;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(0, t), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      E: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "E":
            case "EE":
            case "EEE":
              return (
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "EEEEE":
              return n.day(e, { width: "narrow", context: "formatting" });
            case "EEEEEE":
              return (
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "EEEE":
            default:
              return (
                n.day(e, { width: "wide", context: "formatting" }) ||
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 6;
        },
        set: function(e, t, n) {
          return (e = Be(e, t, n)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      e: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return (e + r.weekStartsOn + 6) % 7 + 7 * Math.floor((e - 1) / 7);
          };
          switch (t) {
            case "e":
            case "ee":
              return gt(t.length, e, a);
            case "eo":
              return n.ordinalNumber(e, { unit: "day", valueCallback: a });
            case "eee":
              return (
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "eeeee":
              return n.day(e, { width: "narrow", context: "formatting" });
            case "eeeeee":
              return (
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "eeee":
            default:
              return (
                n.day(e, { width: "wide", context: "formatting" }) ||
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 6;
        },
        set: function(e, t, n) {
          return (e = Be(e, t, n)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      c: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return (e + r.weekStartsOn + 6) % 7 + 7 * Math.floor((e - 1) / 7);
          };
          switch (t) {
            case "c":
            case "cc":
              return gt(t.length, e, a);
            case "co":
              return n.ordinalNumber(e, { unit: "day", valueCallback: a });
            case "ccc":
              return (
                n.day(e, { width: "abbreviated", context: "standalone" }) ||
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
            case "ccccc":
              return n.day(e, { width: "narrow", context: "standalone" });
            case "cccccc":
              return (
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
            case "cccc":
            default:
              return (
                n.day(e, { width: "wide", context: "standalone" }) ||
                n.day(e, { width: "abbreviated", context: "standalone" }) ||
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 6;
        },
        set: function(e, t, n) {
          return (e = Be(e, t, n)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      i: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return 0 === e ? 7 : e;
          };
          switch (t) {
            case "i":
            case "ii":
              return gt(t.length, e);
            case "io":
              return n.ordinalNumber(e, { unit: "day" });
            case "iii":
              return (
                n.day(e, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
            case "iiiii":
              return n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: a
              });
            case "iiiiii":
              return (
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
            case "iiii":
            default:
              return (
                n.day(e, {
                  width: "wide",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 7;
        },
        set: function(e, t, n) {
          return (
            (e = (function(e, t, n) {
              if (arguments.length < 2)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = S(t);
              r % 7 == 0 && (r -= 7);
              var a = N(e, n),
                o = ((r % 7 + 7) % 7 < 1 ? 7 : 0) + r - a.getUTCDay();
              return a.setUTCDate(a.getUTCDate() + o), a;
            })(e, t, n)).setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      a: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "a":
            case "aa":
            case "aaa":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "aaaaa":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "aaaa":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n) {
          return e.setUTCHours(yt(t), 0, 0, 0), e;
        }
      },
      b: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "b":
            case "bb":
            case "bbb":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "bbbbb":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "bbbb":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n) {
          return e.setUTCHours(yt(t), 0, 0, 0), e;
        }
      },
      B: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "B":
            case "BB":
            case "BBB":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "BBBBB":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "BBBB":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n) {
          return e.setUTCHours(yt(t), 0, 0, 0), e;
        }
      },
      h: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "h":
              return ht(Ke, e);
            case "ho":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 12;
        },
        set: function(e, t, n) {
          var r = 12 <= e.getUTCHours();
          return (
            e.setUTCHours(
              r && t < 12 ? t + 12 : r || 12 !== t ? t : 0,
              0,
              0,
              0
            ),
            e
          );
        }
      },
      H: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "H":
              return ht(ze, e);
            case "Ho":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 23;
        },
        set: function(e, t, n) {
          return e.setUTCHours(t, 0, 0, 0), e;
        }
      },
      K: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "K":
              return ht(Ve, e);
            case "Ko":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 11;
        },
        set: function(e, t, n) {
          var r = 12 <= e.getUTCHours();
          return e.setUTCHours(r && t < 12 ? t + 12 : t, 0, 0, 0), e;
        }
      },
      k: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "k":
              return ht(Ge, e);
            case "ko":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 1 <= t && t <= 24;
        },
        set: function(e, t, n) {
          return e.setUTCHours(24 < t ? t : t % 24, 0, 0, 0), e;
        }
      },
      m: {
        priority: 60,
        parse: function(e, t, n, r) {
          switch (t) {
            case "m":
              return ht($e, e);
            case "mo":
              return n.ordinalNumber(e, { unit: "minute" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 59;
        },
        set: function(e, t, n) {
          return e.setUTCMinutes(t, 0, 0), e;
        }
      },
      s: {
        priority: 50,
        parse: function(e, t, n, r) {
          switch (t) {
            case "s":
              return ht(Ze, e);
            case "so":
              return n.ordinalNumber(e, { unit: "second" });
            default:
              return gt(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return 0 <= t && t <= 59;
        },
        set: function(e, t, n) {
          return e.setUTCSeconds(t, 0), e;
        }
      },
      S: {
        priority: 40,
        parse: function(e, t, n, r) {
          return gt(t.length, e, function(e) {
            return Math.floor(e * Math.pow(10, 3 - t.length));
          });
        },
        set: function(e, t, n) {
          return e.setUTCMilliseconds(t), e;
        }
      },
      X: {
        priority: 20,
        parse: function(e, t, n, r) {
          switch (t) {
            case "X":
              return ft(ut, e);
            case "XX":
              return ft(ct, e);
            case "XXXX":
              return ft(lt, e);
            case "XXXXX":
              return ft(dt, e);
            case "XXX":
            default:
              return ft(pt, e);
          }
        },
        set: function(e, t, n) {
          return new Date(e.getTime() - t);
        }
      },
      x: {
        priority: 20,
        parse: function(e, t, n, r) {
          switch (t) {
            case "x":
              return ft(ut, e);
            case "xx":
              return ft(ct, e);
            case "xxxx":
              return ft(lt, e);
            case "xxxxx":
              return ft(dt, e);
            case "xxx":
            default:
              return ft(pt, e);
          }
        },
        set: function(e, t, n) {
          return new Date(e.getTime() - t);
        }
      },
      t: {
        priority: 10,
        parse: function(e, t, n, r) {
          return mt(e);
        },
        set: function(e, t, n) {
          return new Date(1e3 * t);
        }
      },
      T: {
        priority: 10,
        parse: function(e, t, n, r) {
          return mt(e);
        },
        set: function(e, t, n) {
          return new Date(t);
        }
      }
    },
    Tt = 20,
    Mt = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    St = /^'(.*?)'?$/,
    xt = /''/g,
    Nt = /\S/;
  function Et(e, t, n, r) {
    if (arguments.length < 3)
      throw new TypeError(
        "3 arguments required, but only " + arguments.length + " present"
      );
    var a = e + "",
      o = t + "",
      i = r || {},
      s = i.locale || _;
    if (!s.match) throw new RangeError("locale must contain match property");
    var u = s.options && s.options.firstWeekContainsDate,
      c = null == u ? 1 : S(u),
      l = null == i.firstWeekContainsDate ? c : S(i.firstWeekContainsDate);
    if (l < 1 || 7 < l)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var p = s.options && s.options.weekStartsOn,
      d = null == p ? 0 : S(p),
      h = null == i.weekStartsOn ? d : S(i.weekStartsOn);
    if (h < 0 || 6 < h)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if ("" === o) return "" === a ? N(n, i) : new Date(NaN);
    var f,
      m = { firstWeekContainsDate: l, weekStartsOn: h, locale: s },
      g = [{ priority: Tt, set: Ot, index: 0 }],
      w = o.match(Mt);
    for (f = 0; f < w.length; f++) {
      var y = w[f];
      !i.awareOfUnicodeTokens && re(y) && ae(y);
      var v = y[0],
        b = kt[v];
      if (b) {
        var D = b.parse(a, y, s.match, m);
        if (!D) return new Date(NaN);
        g.push({
          priority: b.priority,
          set: b.set,
          validate: b.validate,
          value: D.value,
          index: g.length
        }),
          (a = D.rest);
      } else {
        if (
          ("''" === y
            ? (y = "'")
            : "'" === v && (y = y.match(St)[1].replace(xt, "'")),
          0 != a.indexOf(y))
        )
          return new Date(NaN);
        a = a.slice(y.length);
      }
    }
    if (0 < a.length && Nt.test(a)) return new Date(NaN);
    var C = g
        .map(function(e) {
          return e.priority;
        })
        .sort(function(e, t) {
          return t - e;
        })
        .filter(function(e, t, n) {
          return n.indexOf(e) === t;
        })
        .map(function(t) {
          return g
            .filter(function(e) {
              return e.priority === t;
            })
            .reverse();
        })
        .map(function(e) {
          return e[0];
        }),
      k = N(n, i);
    if (isNaN(k)) return new Date(NaN);
    var T = te(k, x(k));
    for (f = 0; f < C.length; f++) {
      var M = C[f];
      if (M.validate && !M.validate(T, M.value, m)) return new Date(NaN);
      T = M.set(T, M.value, m);
    }
    return T;
  }
  function Ot(e) {
    var t = new Date(0);
    return (
      t.setFullYear(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()),
      t.setHours(
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds()
      ),
      t
    );
  }
  var _t =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    Yt = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    qt = (function() {
      function r(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e;
      };
    })(),
    Pt =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
    Ut = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    Ft = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    };
  function Wt(e) {
    var t = e ? N(e) : new Date();
    return Ht(t) ? t : null;
  }
  function Ht(e) {
    return k(e) && Ie(e, new Date("1/1/1000"));
  }
  function It(e, t, n) {
    if ("en" === n) return ce(e, t, { awareOfUnicodeTokens: !0 });
    var r = Vt(n);
    return (
      n &&
        !r &&
        console.warn(
          'A locale object was not found for the provided string ["' + n + '"].'
        ),
      !r && Gt() && Vt(Gt()) && (r = Vt(Gt())),
      ce(e, t, { locale: r || null, awareOfUnicodeTokens: !0 })
    );
  }
  function Lt(e, t) {
    var n = t.hour,
      r = void 0 === n ? 0 : n,
      a = t.minute,
      o = void 0 === a ? 0 : a,
      i = t.second;
    return xe(
      Se(
        (function(e, t, n) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = N(e, n),
            a = S(t);
          return r.setSeconds(a), r;
        })(e, void 0 === i ? 0 : i),
        o
      ),
      r
    );
  }
  function Rt(e) {
    !(function(e, t, n) {
      if (arguments.length < 2)
        throw new TypeError(
          "2 arguments required, but only " + arguments.length + " present"
        );
      var r = N(e, n),
        a = S(t);
      r.setMonth(0), r.setDate(a);
    })(e, 1);
    return Qt(
      (function(e, t) {
        if (arguments.length < 1)
          throw new TypeError(
            "1 argument required, but only " + arguments.length + " present"
          );
        var n = t || {},
          r = n.locale,
          a = r && r.options && r.options.weekStartsOn,
          o = null == a ? 0 : S(a),
          i = null == n.weekStartsOn ? o : S(n.weekStartsOn);
        if (i < 0 || 6 < i)
          throw new RangeError(
            "weekStartsOn must be between 0 and 6 inclusively"
          );
        var s = N(e, n),
          u = s.getDay(),
          c = 6 + (u < i ? -7 : 0) - (u - i);
        return s.setDate(s.getDate() + c), s.setHours(23, 59, 59, 999), s;
      })(e),
      e
    )
      ? (function(e, t, n) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = Fe(e, n),
            a = Fe(t, n),
            o = r.getTime() - x(r),
            i = a.getTime() - x(a);
          return Math.round((o - i) / We);
        })(
          e,
          (function(e, t) {
            if (arguments.length < 1)
              throw new TypeError(
                "1 argument required, but only " + arguments.length + " present"
              );
            var n = N(e, t),
              r = new Date(0);
            return (
              r.setFullYear(n.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r
            );
          })(e)
        ) + 1
      : 1;
  }
  function Bt(e, t) {
    return Fe(e, { locale: Vt(t || Gt()) });
  }
  function jt(e) {
    return (function(e, t) {
      if (arguments.length < 1)
        throw new TypeError(
          "1 argument required, but only " + arguments.length + " present"
        );
      var n = N(e, t);
      return n.setDate(1), n.setHours(0, 0, 0, 0), n;
    })(e);
  }
  function Qt(e, t) {
    return e && t
      ? (function(e, t, n) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = N(e, n),
            a = N(t, n);
          return r.getFullYear() == a.getFullYear();
        })(e, t)
      : !e && !t;
  }
  function Xt(e, t) {
    return e && t
      ? (function(e, t, n) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = N(e, n),
            a = N(t, n);
          return (
            r.getFullYear() == a.getFullYear() && r.getMonth() == a.getMonth()
          );
        })(e, t)
      : !e && !t;
  }
  function At(e, t) {
    return e && t
      ? (function(e, t, n) {
          if (arguments.length < 2)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = Ye(e, n),
            a = Ye(t, n);
          return r.getTime() == a.getTime();
        })(e, t)
      : !e && !t;
  }
  function zt(e, t, n) {
    var r = void 0;
    try {
      r = Re(e, { start: t, end: n });
    } catch (e) {
      r = !1;
    }
    return r;
  }
  function Gt() {
    return window.__localeId__;
  }
  function Vt(e) {
    return window.__localeData__ ? window.__localeData__[e] : null;
  }
  function Kt(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = e.excludeDates,
      r = e.includeDates,
      a = e.filterDate;
    return (
      $t(t, { minDate: e.minDate, maxDate: e.maxDate }) ||
      (n &&
        n.some(function(e) {
          return At(t, e);
        })) ||
      (r &&
        !r.some(function(e) {
          return At(t, e);
        })) ||
      (a && !a(Wt(t))) ||
      !1
    );
  }
  function $t(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.minDate,
      r = t.maxDate;
    return (n && Pe(e, n) < 0) || (r && 0 < Pe(e, r));
  }
  function Zt(e, t) {
    for (var n = t.length, r = 0; r < n; r++)
      if (De(t[r]) === De(e) && be(t[r]) === be(e)) return !0;
    return !1;
  }
  function Jt(e, t) {
    var n = t.minTime,
      r = t.maxTime;
    if (!n || !r) throw Error("Both minTime and maxTime props required");
    var a = Wt(),
      o = xe(Se(a, be(e)), De(e)),
      i = xe(Se(a, be(n)), De(n)),
      s = xe(Se(a, be(r)), De(r)),
      u = void 0;
    try {
      u = !Re(o, { start: i, end: s });
    } catch (e) {
      u = !1;
    }
    return u;
  }
  function en(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.minDate,
      r = t.includeDates,
      a = ve(e, 1);
    return (
      (n && 0 < Ue(n, a)) ||
      (r &&
        r.every(function(e) {
          return 0 < Ue(e, a);
        })) ||
      !1
    );
  }
  function tn(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.maxDate,
      r = t.includeDates,
      a = we(e, 1);
    return (
      (n && 0 < Ue(a, n)) ||
      (r &&
        r.every(function(e) {
          return 0 < Ue(a, e);
        })) ||
      !1
    );
  }
  function nn(e) {
    var t = e.minDate,
      n = e.includeDates;
    return n && t
      ? Oe(
          n.filter(function(e) {
            return 0 <= Pe(e, t);
          })
        )
      : n ? Oe(n) : t;
  }
  function rn(e) {
    var t = e.maxDate,
      n = e.includeDates;
    return n && t
      ? _e(
          n.filter(function(e) {
            return Pe(e, t) <= 0;
          })
        )
      : n ? _e(n) : t;
  }
  function an() {
    for (
      var e =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [],
        t =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "react-datepicker__day--highlighted",
        n = new Map(),
        r = 0,
        a = e.length;
      r < a;
      r++
    ) {
      var o = e[r];
      if (m(o)) {
        var i = It(o, "MM.dd.yyyy"),
          s = n.get(i) || [];
        s.includes(t) || (s.push(t), n.set(i, s));
      } else if ("object" === (void 0 === o ? "undefined" : _t(o))) {
        var u = Object.keys(o),
          c = u[0],
          l = o[u[0]];
        if ("string" == typeof c && l.constructor === Array)
          for (var p = 0, d = l.length; p < d; p++) {
            var h = It(l[p], "MM.dd.yyyy"),
              f = n.get(h) || [];
            f.includes(c) || (f.push(c), n.set(h, f));
          }
      }
    }
    return n;
  }
  function on(e, t, n, r, a) {
    for (var o = a.length, i = [], s = 0; s < o; s++) {
      var u = pe(he(e, De(a[s])), be(a[s])),
        c = pe(e, (n + 1) * r);
      Ie(u, t) && Le(u, c) && i.push(a[s]);
    }
    return i;
  }
  var sn = (function(t) {
    function n(e) {
      Yt(this, n);
      var a = Ft(this, t.call(this, e));
      return (
        (a.renderOptions = function() {
          var t = a.props.year,
            e = a.state.yearsList.map(function(e) {
              return h.createElement(
                "div",
                {
                  className:
                    t === e
                      ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                      : "react-datepicker__year-option",
                  key: e,
                  ref: e,
                  onClick: a.onChange.bind(a, e)
                },
                t === e
                  ? h.createElement(
                      "span",
                      { className: "react-datepicker__year-option--selected" },
                      "✓"
                    )
                  : "",
                e
              );
            }),
            n = a.props.minDate ? Te(a.props.minDate) : null,
            r = a.props.maxDate ? Te(a.props.maxDate) : null;
          return (
            (r &&
              a.state.yearsList.find(function(e) {
                return e === r;
              })) ||
              e.unshift(
                h.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    ref: "upcoming",
                    key: "upcoming",
                    onClick: a.incrementYears
                  },
                  h.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
                  })
                )
              ),
            (n &&
              a.state.yearsList.find(function(e) {
                return e === n;
              })) ||
              e.push(
                h.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    ref: "previous",
                    key: "previous",
                    onClick: a.decrementYears
                  },
                  h.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"
                  })
                )
              ),
            e
          );
        }),
        (a.onChange = function(e) {
          a.props.onChange(e);
        }),
        (a.handleClickOutside = function() {
          a.props.onCancel();
        }),
        (a.shiftYears = function(t) {
          var e = a.state.yearsList.map(function(e) {
            return e + t;
          });
          a.setState({ yearsList: e });
        }),
        (a.incrementYears = function() {
          return a.shiftYears(1);
        }),
        (a.decrementYears = function() {
          return a.shiftYears(-1);
        }),
        (a.state = {
          yearsList: (function(e, t, n, r) {
            for (var a = [], o = 0; o < 2 * t + 1; o++) {
              var i = e + t - o,
                s = !0;
              n && (s = Te(n) <= i), r && s && (s = Te(r) >= i), s && a.push(i);
            }
            return a;
          })(
            a.props.year,
            e.yearDropdownItemNumber || (e.scrollableYearDropdown ? 10 : 5),
            a.props.minDate,
            a.props.maxDate
          )
        }),
        a
      );
    }
    return (
      Ut(n, t),
      (n.prototype.render = function() {
        var e = p({
          "react-datepicker__year-dropdown": !0,
          "react-datepicker__year-dropdown--scrollable": this.props
            .scrollableYearDropdown
        });
        return h.createElement("div", { className: e }, this.renderOptions());
      }),
      n
    );
  })(h.Component);
  sn.propTypes = {
    minDate: t.instanceOf(Date),
    maxDate: t.instanceOf(Date),
    onCancel: t.func.isRequired,
    onChange: t.func.isRequired,
    scrollableYearDropdown: t.bool,
    year: t.number.isRequired,
    yearDropdownItemNumber: t.number
  };
  var un = n(sn),
    cn = (function(o) {
      function i() {
        var e, a;
        Yt(this, i);
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        return (
          ((e = a = Ft(this, o.call.apply(o, [this].concat(n)))).state = {
            dropdownVisible: !1
          }),
          (a.renderSelectOptions = function() {
            for (
              var e = a.props.minDate ? Te(a.props.minDate) : 1900,
                t = a.props.maxDate ? Te(a.props.maxDate) : 2100,
                n = [],
                r = e;
              r <= t;
              r++
            )
              n.push(h.createElement("option", { key: r, value: r }, r));
            return n;
          }),
          (a.onSelectChange = function(e) {
            a.onChange(e.target.value);
          }),
          (a.renderSelectMode = function() {
            return h.createElement(
              "select",
              {
                value: a.props.year,
                className: "react-datepicker__year-select",
                onChange: a.onSelectChange
              },
              a.renderSelectOptions()
            );
          }),
          (a.renderReadView = function(e) {
            return h.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__year-read-view",
                onClick: function(e) {
                  return a.toggleDropdown(e);
                }
              },
              h.createElement("span", {
                className: "react-datepicker__year-read-view--down-arrow"
              }),
              h.createElement(
                "span",
                {
                  className: "react-datepicker__year-read-view--selected-year"
                },
                a.props.year
              )
            );
          }),
          (a.renderDropdown = function() {
            return h.createElement(un, {
              key: "dropdown",
              ref: "options",
              year: a.props.year,
              onChange: a.onChange,
              onCancel: a.toggleDropdown,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              scrollableYearDropdown: a.props.scrollableYearDropdown,
              yearDropdownItemNumber: a.props.yearDropdownItemNumber
            });
          }),
          (a.renderScrollMode = function() {
            var e = a.state.dropdownVisible,
              t = [a.renderReadView(!e)];
            return e && t.unshift(a.renderDropdown()), t;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown(), e !== a.props.year && a.props.onChange(e);
          }),
          (a.toggleDropdown = function(e) {
            a.setState(
              { dropdownVisible: !a.state.dropdownVisible },
              function() {
                a.props.adjustDateOnChange &&
                  a.handleYearChange(a.props.date, e);
              }
            );
          }),
          (a.handleYearChange = function(e, t) {
            a.onSelect(e, t), a.setOpen();
          }),
          (a.onSelect = function(e, t) {
            a.props.onSelect && a.props.onSelect(e, t);
          }),
          (a.setOpen = function() {
            a.props.setOpen && a.props.setOpen(!0);
          }),
          Ft(a, e)
        );
      }
      return (
        Ut(i, o),
        (i.prototype.render = function() {
          var e = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              e = this.renderScrollMode();
              break;
            case "select":
              e = this.renderSelectMode();
          }
          return h.createElement(
            "div",
            {
              className:
                "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--" +
                this.props.dropdownMode
            },
            e
          );
        }),
        i
      );
    })(h.Component);
  cn.propTypes = {
    adjustDateOnChange: t.bool,
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    onChange: t.func.isRequired,
    scrollableYearDropdown: t.bool,
    year: t.number.isRequired,
    yearDropdownItemNumber: t.number,
    date: t.instanceOf(Date),
    onSelect: t.func,
    setOpen: t.func
  };
  var ln = (function(o) {
    function i() {
      var e, n;
      Yt(this, i);
      for (var t = arguments.length, r = Array(t), a = 0; a < t; a++)
        r[a] = arguments[a];
      return (
        ((e = n = Ft(
          this,
          o.call.apply(o, [this].concat(r))
        )).renderOptions = function() {
          return n.props.monthNames.map(function(e, t) {
            return h.createElement(
              "div",
              {
                className:
                  n.props.month === t
                    ? "react-datepicker__month-option --selected_month"
                    : "react-datepicker__month-option",
                key: e,
                ref: e,
                onClick: n.onChange.bind(n, t)
              },
              n.props.month === t
                ? h.createElement(
                    "span",
                    { className: "react-datepicker__month-option--selected" },
                    "✓"
                  )
                : "",
              e
            );
          });
        }),
        (n.onChange = function(e) {
          return n.props.onChange(e);
        }),
        (n.handleClickOutside = function() {
          return n.props.onCancel();
        }),
        Ft(n, e)
      );
    }
    return (
      Ut(i, o),
      (i.prototype.render = function() {
        return h.createElement(
          "div",
          { className: "react-datepicker__month-dropdown" },
          this.renderOptions()
        );
      }),
      i
    );
  })(h.Component);
  ln.propTypes = {
    onCancel: t.func.isRequired,
    onChange: t.func.isRequired,
    month: t.number.isRequired,
    monthNames: t.arrayOf(t.string.isRequired).isRequired
  };
  var pn = n(ln),
    dn = (function(o) {
      function i() {
        var e, r;
        Yt(this, i);
        for (var t = arguments.length, n = Array(t), a = 0; a < t; a++)
          n[a] = arguments[a];
        return (
          ((e = r = Ft(this, o.call.apply(o, [this].concat(n)))).state = {
            dropdownVisible: !1
          }),
          (r.renderSelectOptions = function(e) {
            return e.map(function(e, t) {
              return h.createElement("option", { key: t, value: t }, e);
            });
          }),
          (r.renderSelectMode = function(e) {
            return h.createElement(
              "select",
              {
                value: r.props.month,
                className: "react-datepicker__month-select",
                onChange: function(e) {
                  return r.onChange(e.target.value);
                }
              },
              r.renderSelectOptions(e)
            );
          }),
          (r.renderReadView = function(e, t) {
            return h.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__month-read-view",
                onClick: r.toggleDropdown
              },
              h.createElement("span", {
                className: "react-datepicker__month-read-view--down-arrow"
              }),
              h.createElement(
                "span",
                {
                  className: "react-datepicker__month-read-view--selected-month"
                },
                t[r.props.month]
              )
            );
          }),
          (r.renderDropdown = function(e) {
            return h.createElement(pn, {
              key: "dropdown",
              ref: "options",
              month: r.props.month,
              monthNames: e,
              onChange: r.onChange,
              onCancel: r.toggleDropdown
            });
          }),
          (r.renderScrollMode = function(e) {
            var t = r.state.dropdownVisible,
              n = [r.renderReadView(!t, e)];
            return t && n.unshift(r.renderDropdown(e)), n;
          }),
          (r.onChange = function(e) {
            r.toggleDropdown(), e !== r.props.month && r.props.onChange(e);
          }),
          (r.toggleDropdown = function() {
            return r.setState({ dropdownVisible: !r.state.dropdownVisible });
          }),
          Ft(r, e)
        );
      }
      return (
        Ut(i, o),
        (i.prototype.render = function() {
          var r = this,
            e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
              this.props.useShortMonthInDropdown
                ? function(e) {
                    return (t = e), It(Ne(Wt(), t), "LLL", n);
                    var t, n;
                  }
                : function(e) {
                    return (
                      (t = e), (n = r.props.locale), It(Ne(Wt(), t), "LLLL", n)
                    );
                    var t, n;
                  }
            ),
            t = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              t = this.renderScrollMode(e);
              break;
            case "select":
              t = this.renderSelectMode(e);
          }
          return h.createElement(
            "div",
            {
              className:
                "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--" +
                this.props.dropdownMode
            },
            t
          );
        }),
        i
      );
    })(h.Component);
  dn.propTypes = {
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    locale: t.string,
    month: t.number.isRequired,
    onChange: t.func.isRequired,
    useShortMonthInDropdown: t.bool
  };
  var hn = (function(t) {
    function n(e) {
      Yt(this, n);
      var r = Ft(this, t.call(this, e));
      return (
        (r.renderOptions = function() {
          return r.state.monthYearsList.map(function(e) {
            var t = Me(e),
              n = Qt(r.props.date, e) && Xt(r.props.date, e);
            return h.createElement(
              "div",
              {
                className: n
                  ? "react-datepicker__month-year-option --selected_month-year"
                  : "react-datepicker__month-year-option",
                key: t,
                ref: t,
                onClick: r.onChange.bind(r, t)
              },
              n
                ? h.createElement(
                    "span",
                    {
                      className: "react-datepicker__month-year-option--selected"
                    },
                    "✓"
                  )
                : "",
              It(e, r.props.dateFormat)
            );
          });
        }),
        (r.onChange = function(e) {
          return r.props.onChange(e);
        }),
        (r.handleClickOutside = function() {
          r.props.onCancel();
        }),
        (r.state = {
          monthYearsList: (function(e, t) {
            for (var n = [], r = jt(e), a = jt(t); !Ie(r, a); )
              n.push(Wt(r)), (r = we(r, 1));
            return n;
          })(r.props.minDate, r.props.maxDate)
        }),
        r
      );
    }
    return (
      Ut(n, t),
      (n.prototype.render = function() {
        var e = p({
          "react-datepicker__month-year-dropdown": !0,
          "react-datepicker__month-year-dropdown--scrollable": this.props
            .scrollableMonthYearDropdown
        });
        return h.createElement("div", { className: e }, this.renderOptions());
      }),
      n
    );
  })(h.Component);
  hn.propTypes = {
    minDate: t.instanceOf(Date).isRequired,
    maxDate: t.instanceOf(Date).isRequired,
    onCancel: t.func.isRequired,
    onChange: t.func.isRequired,
    scrollableMonthYearDropdown: t.bool,
    date: t.instanceOf(Date).isRequired,
    dateFormat: t.string.isRequired
  };
  var fn = n(hn),
    mn = (function(o) {
      function i() {
        var e, a;
        Yt(this, i);
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
          n[r] = arguments[r];
        return (
          ((e = a = Ft(this, o.call.apply(o, [this].concat(n)))).state = {
            dropdownVisible: !1
          }),
          (a.renderSelectOptions = function() {
            for (
              var e = jt(a.props.minDate), t = jt(a.props.maxDate), n = [];
              !Ie(e, t);

            ) {
              var r = Me(e);
              n.push(
                h.createElement(
                  "option",
                  { key: r, value: r },
                  It(e, a.props.dateFormat, a.props.locale)
                )
              ),
                (e = we(e, 1));
            }
            return n;
          }),
          (a.onSelectChange = function(e) {
            a.onChange(e.target.value);
          }),
          (a.renderSelectMode = function() {
            return h.createElement(
              "select",
              {
                value: Me(jt(a.props.date)),
                className: "react-datepicker__month-year-select",
                onChange: a.onSelectChange
              },
              a.renderSelectOptions()
            );
          }),
          (a.renderReadView = function(e) {
            var t = It(a.props.date, a.props.dateFormat, a.props.locale);
            return h.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__month-year-read-view",
                onClick: function(e) {
                  return a.toggleDropdown(e);
                }
              },
              h.createElement("span", {
                className: "react-datepicker__month-year-read-view--down-arrow"
              }),
              h.createElement(
                "span",
                {
                  className:
                    "react-datepicker__month-year-read-view--selected-month-year"
                },
                t
              )
            );
          }),
          (a.renderDropdown = function() {
            return h.createElement(fn, {
              key: "dropdown",
              ref: "options",
              date: a.props.date,
              dateFormat: a.props.dateFormat,
              onChange: a.onChange,
              onCancel: a.toggleDropdown,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown
            });
          }),
          (a.renderScrollMode = function() {
            var e = a.state.dropdownVisible,
              t = [a.renderReadView(!e)];
            return e && t.unshift(a.renderDropdown()), t;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown();
            var t = Wt(parseInt(e));
            (Qt(a.props.date, t) && Xt(a.props.date, t)) || a.props.onChange(t);
          }),
          (a.toggleDropdown = function() {
            return a.setState({ dropdownVisible: !a.state.dropdownVisible });
          }),
          Ft(a, e)
        );
      }
      return (
        Ut(i, o),
        (i.prototype.render = function() {
          var e = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              e = this.renderScrollMode();
              break;
            case "select":
              e = this.renderSelectMode();
          }
          return h.createElement(
            "div",
            {
              className:
                "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--" +
                this.props.dropdownMode
            },
            e
          );
        }),
        i
      );
    })(h.Component);
  mn.propTypes = {
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    dateFormat: t.string.isRequired,
    locale: t.string,
    maxDate: t.instanceOf(Date).isRequired,
    minDate: t.instanceOf(Date).isRequired,
    date: t.instanceOf(Date).isRequired,
    onChange: t.func.isRequired,
    scrollableMonthYearDropdown: t.bool
  };
  var gn = (function(a) {
    function o() {
      var e, s;
      Yt(this, o);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = s = Ft(
          this,
          a.call.apply(a, [this].concat(n))
        )).handleClick = function(e) {
          !s.isDisabled() && s.props.onClick && s.props.onClick(e);
        }),
        (s.handleMouseEnter = function(e) {
          !s.isDisabled() && s.props.onMouseEnter && s.props.onMouseEnter(e);
        }),
        (s.isSameDay = function(e) {
          return At(s.props.day, e);
        }),
        (s.isKeyboardSelected = function() {
          return (
            !s.props.disabledKeyboardNavigation &&
            !s.props.inline &&
            !s.isSameDay(s.props.selected) &&
            s.isSameDay(s.props.preSelection)
          );
        }),
        (s.isDisabled = function() {
          return Kt(s.props.day, s.props);
        }),
        (s.getHighLightedClass = function(e) {
          var t = s.props,
            n = t.highlightDates;
          if (!n) return !1;
          var r = It(t.day, "MM.dd.yyyy");
          return n.get(r);
        }),
        (s.isInRange = function() {
          var e = s.props,
            t = e.startDate,
            n = e.endDate;
          return !(!t || !n) && zt(e.day, t, n);
        }),
        (s.isInSelectingRange = function() {
          var e = s.props,
            t = e.day,
            n = e.selectsStart,
            r = e.selectsEnd,
            a = e.selectingDate,
            o = e.startDate,
            i = e.endDate;
          return (
            !((!n && !r) || !a || s.isDisabled()) &&
            (n && i && (Le(a, i) || He(a, i))
              ? zt(t, a, i)
              : !(!r || !o || (!Ie(a, o) && !He(a, o))) && zt(t, o, a))
          );
        }),
        (s.isSelectingRangeStart = function() {
          if (!s.isInSelectingRange()) return !1;
          var e = s.props,
            t = e.day;
          return At(t, e.selectsStart ? e.selectingDate : e.startDate);
        }),
        (s.isSelectingRangeEnd = function() {
          if (!s.isInSelectingRange()) return !1;
          var e = s.props,
            t = e.day;
          return At(t, e.selectsEnd ? e.selectingDate : e.endDate);
        }),
        (s.isRangeStart = function() {
          var e = s.props,
            t = e.startDate;
          return !(!t || !e.endDate) && At(t, e.day);
        }),
        (s.isRangeEnd = function() {
          var e = s.props,
            t = e.endDate;
          return !(!e.startDate || !t) && At(t, e.day);
        }),
        (s.isWeekend = function() {
          var e = (function(e, t) {
            if (arguments.length < 1)
              throw new TypeError(
                "1 argument required, but only " + arguments.length + " present"
              );
            return N(e, t).getDay();
          })(s.props.day);
          return 0 === e || 6 === e;
        }),
        (s.isOutsideMonth = function() {
          return void 0 !== s.props.month && s.props.month !== ke(s.props.day);
        }),
        (s.getClassNames = function(e) {
          var t,
            n = s.props.dayClassName ? s.props.dayClassName(e) : void 0;
          return p(
            "react-datepicker__day",
            n,
            "react-datepicker__day--" + It(s.props.day, "ddd", t),
            {
              "react-datepicker__day--disabled": s.isDisabled(),
              "react-datepicker__day--selected": s.isSameDay(s.props.selected),
              "react-datepicker__day--keyboard-selected": s.isKeyboardSelected(),
              "react-datepicker__day--range-start": s.isRangeStart(),
              "react-datepicker__day--range-end": s.isRangeEnd(),
              "react-datepicker__day--in-range": s.isInRange(),
              "react-datepicker__day--in-selecting-range": s.isInSelectingRange(),
              "react-datepicker__day--selecting-range-start": s.isSelectingRangeStart(),
              "react-datepicker__day--selecting-range-end": s.isSelectingRangeEnd(),
              "react-datepicker__day--today": s.isSameDay(Wt()),
              "react-datepicker__day--weekend": s.isWeekend(),
              "react-datepicker__day--outside-month": s.isOutsideMonth()
            },
            s.getHighLightedClass("react-datepicker__day--highlighted")
          );
        }),
        Ft(s, e)
      );
    }
    return (
      Ut(o, a),
      (o.prototype.render = function() {
        return h.createElement(
          "div",
          {
            className: this.getClassNames(this.props.day),
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            "aria-label": "day-" + Ce(this.props.day),
            role: "option"
          },
          this.props.renderDayContents
            ? this.props.renderDayContents(Ce(this.props.day))
            : Ce(this.props.day)
        );
      }),
      o
    );
  })(h.Component);
  gn.propTypes = {
    disabledKeyboardNavigation: t.bool,
    day: t.instanceOf(Date).isRequired,
    dayClassName: t.func,
    endDate: t.instanceOf(Date),
    highlightDates: t.instanceOf(Map),
    inline: t.bool,
    month: t.number,
    onClick: t.func,
    onMouseEnter: t.func,
    preSelection: t.instanceOf(Date),
    selected: t.object,
    selectingDate: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    startDate: t.instanceOf(Date),
    renderDayContents: t.func
  };
  var wn = (function(o) {
    function i() {
      var e, t;
      Yt(this, i);
      for (var n = arguments.length, r = Array(n), a = 0; a < n; a++)
        r[a] = arguments[a];
      return (
        ((e = t = Ft(
          this,
          o.call.apply(o, [this].concat(r))
        )).handleClick = function(e) {
          t.props.onClick && t.props.onClick(e);
        }),
        Ft(t, e)
      );
    }
    return (
      Ut(i, o),
      (i.prototype.render = function() {
        return h.createElement(
          "div",
          {
            className: p({
              "react-datepicker__week-number": !0,
              "react-datepicker__week-number--clickable": !!this.props.onClick
            }),
            "aria-label": "week-" + this.props.weekNumber,
            onClick: this.handleClick
          },
          this.props.weekNumber
        );
      }),
      i
    );
  })(h.Component);
  wn.propTypes = { weekNumber: t.number.isRequired, onClick: t.func };
  var yn = (function(o) {
    function i() {
      var e, a;
      Yt(this, i);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = a = Ft(
          this,
          o.call.apply(o, [this].concat(n))
        )).handleDayClick = function(e, t) {
          a.props.onDayClick && a.props.onDayClick(e, t);
        }),
        (a.handleDayMouseEnter = function(e) {
          a.props.onDayMouseEnter && a.props.onDayMouseEnter(e);
        }),
        (a.handleWeekClick = function(e, t, n) {
          "function" == typeof a.props.onWeekSelect &&
            a.props.onWeekSelect(e, t, n),
            a.props.shouldCloseOnSelect && a.props.setOpen(!1);
        }),
        (a.formatWeekNumber = function(e) {
          return a.props.formatWeekNumber ? a.props.formatWeekNumber(e) : Rt(e);
        }),
        (a.renderDays = function() {
          var n = Bt(a.props.day, a.props.locale),
            e = [],
            t = a.formatWeekNumber(n);
          if (a.props.showWeekNumber) {
            var r = a.props.onWeekSelect
              ? a.handleWeekClick.bind(a, n, t)
              : void 0;
            e.push(
              h.createElement(wn, { key: "W", weekNumber: t, onClick: r })
            );
          }
          return e.concat(
            [0, 1, 2, 3, 4, 5, 6].map(function(e) {
              var t = fe(n, e);
              return h.createElement(gn, {
                key: e,
                day: t,
                month: a.props.month,
                onClick: a.handleDayClick.bind(a, t),
                onMouseEnter: a.handleDayMouseEnter.bind(a, t),
                minDate: a.props.minDate,
                maxDate: a.props.maxDate,
                excludeDates: a.props.excludeDates,
                includeDates: a.props.includeDates,
                inline: a.props.inline,
                highlightDates: a.props.highlightDates,
                selectingDate: a.props.selectingDate,
                filterDate: a.props.filterDate,
                preSelection: a.props.preSelection,
                selected: a.props.selected,
                selectsStart: a.props.selectsStart,
                selectsEnd: a.props.selectsEnd,
                startDate: a.props.startDate,
                endDate: a.props.endDate,
                dayClassName: a.props.dayClassName,
                renderDayContents: a.props.renderDayContents,
                disabledKeyboardNavigation: a.props.disabledKeyboardNavigation
              });
            })
          );
        }),
        Ft(a, e)
      );
    }
    return (
      Ut(i, o),
      (i.prototype.render = function() {
        return h.createElement(
          "div",
          { className: "react-datepicker__week" },
          this.renderDays()
        );
      }),
      qt(i, null, [
        {
          key: "defaultProps",
          get: function() {
            return { shouldCloseOnSelect: !0 };
          }
        }
      ]),
      i
    );
  })(h.Component);
  yn.propTypes = {
    disabledKeyboardNavigation: t.bool,
    day: t.instanceOf(Date).isRequired,
    dayClassName: t.func,
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    formatWeekNumber: t.func,
    highlightDates: t.instanceOf(Map),
    includeDates: t.array,
    inline: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    month: t.number,
    onDayClick: t.func,
    onDayMouseEnter: t.func,
    onWeekSelect: t.func,
    preSelection: t.instanceOf(Date),
    selected: t.instanceOf(Date),
    selectingDate: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showWeekNumber: t.bool,
    startDate: t.instanceOf(Date),
    setOpen: t.func,
    shouldCloseOnSelect: t.bool,
    renderDayContents: t.func
  };
  var vn = (function(a) {
    function o() {
      var e, s;
      Yt(this, o);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = s = Ft(
          this,
          a.call.apply(a, [this].concat(n))
        )).handleDayClick = function(e, t) {
          s.props.onDayClick && s.props.onDayClick(e, t);
        }),
        (s.handleDayMouseEnter = function(e) {
          s.props.onDayMouseEnter && s.props.onDayMouseEnter(e);
        }),
        (s.handleMouseLeave = function() {
          s.props.onMouseLeave && s.props.onMouseLeave();
        }),
        (s.isWeekInMonth = function(e) {
          var t = s.props.day,
            n = fe(e, 6);
          return Xt(e, t) || Xt(n, t);
        }),
        (s.renderWeeks = function() {
          for (
            var e = [],
              t = s.props.fixedHeight,
              n = Bt(jt(s.props.day), s.props.locale),
              r = 0,
              a = !1;
            e.push(
              h.createElement(yn, {
                key: r,
                day: n,
                month: ke(s.props.day),
                onDayClick: s.handleDayClick,
                onDayMouseEnter: s.handleDayMouseEnter,
                onWeekSelect: s.props.onWeekSelect,
                formatWeekNumber: s.props.formatWeekNumber,
                locale: s.props.locale,
                minDate: s.props.minDate,
                maxDate: s.props.maxDate,
                excludeDates: s.props.excludeDates,
                includeDates: s.props.includeDates,
                inline: s.props.inline,
                highlightDates: s.props.highlightDates,
                selectingDate: s.props.selectingDate,
                filterDate: s.props.filterDate,
                preSelection: s.props.preSelection,
                selected: s.props.selected,
                selectsStart: s.props.selectsStart,
                selectsEnd: s.props.selectsEnd,
                showWeekNumber: s.props.showWeekNumbers,
                startDate: s.props.startDate,
                endDate: s.props.endDate,
                dayClassName: s.props.dayClassName,
                setOpen: s.props.setOpen,
                shouldCloseOnSelect: s.props.shouldCloseOnSelect,
                disabledKeyboardNavigation: s.props.disabledKeyboardNavigation,
                renderDayContents: s.props.renderDayContents
              })
            ),
              !a;

          ) {
            r++, (n = me(n, 1));
            var o = t && 6 <= r,
              i = !t && !s.isWeekInMonth(n);
            if (o || i) {
              if (!s.props.peekNextMonth) break;
              a = !0;
            }
          }
          return e;
        }),
        (s.getClassNames = function() {
          var e = s.props;
          return p("react-datepicker__month", {
            "react-datepicker__month--selecting-range":
              e.selectingDate && (e.selectsStart || e.selectsEnd)
          });
        }),
        Ft(s, e)
      );
    }
    return (
      Ut(o, a),
      (o.prototype.render = function() {
        return h.createElement(
          "div",
          {
            className: this.getClassNames(),
            onMouseLeave: this.handleMouseLeave,
            role: "listbox",
            "aria-label": "month-" + It(this.props.day, "YYYY-MM")
          },
          this.renderWeeks()
        );
      }),
      o
    );
  })(h.Component);
  vn.propTypes = {
    disabledKeyboardNavigation: t.bool,
    day: t.instanceOf(Date).isRequired,
    dayClassName: t.func,
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    fixedHeight: t.bool,
    formatWeekNumber: t.func,
    highlightDates: t.instanceOf(Map),
    includeDates: t.array,
    inline: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    onDayClick: t.func,
    onDayMouseEnter: t.func,
    onMouseLeave: t.func,
    onWeekSelect: t.func,
    peekNextMonth: t.bool,
    preSelection: t.instanceOf(Date),
    selected: t.instanceOf(Date),
    selectingDate: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showWeekNumbers: t.bool,
    startDate: t.instanceOf(Date),
    setOpen: t.func,
    shouldCloseOnSelect: t.bool,
    renderDayContents: t.func
  };
  var bn = (function(a) {
    function o() {
      var e, d;
      Yt(this, o);
      for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return (
        ((e = d = Ft(
          this,
          a.call.apply(a, [this].concat(n))
        )).handleClick = function(e) {
          ((d.props.minTime || d.props.maxTime) && Jt(e, d.props)) ||
            (d.props.excludeTimes && Zt(e, d.props.excludeTimes)) ||
            (d.props.includeTimes && !Zt(e, d.props.includeTimes)) ||
            d.props.onChange(e);
        }),
        (d.liClasses = function(e, t, n) {
          var r = ["react-datepicker__time-list-item"];
          return (
            t === De(e) &&
              n === be(e) &&
              r.push("react-datepicker__time-list-item--selected"),
            (((d.props.minTime || d.props.maxTime) && Jt(e, d.props)) ||
              (d.props.excludeTimes && Zt(e, d.props.excludeTimes)) ||
              (d.props.includeTimes && !Zt(e, d.props.includeTimes))) &&
              r.push("react-datepicker__time-list-item--disabled"),
            d.props.injectTimes &&
              (60 * De(e) + be(e)) % d.props.intervals != 0 &&
              r.push("react-datepicker__time-list-item--injected"),
            r.join(" ")
          );
        }),
        (d.renderTimes = function() {
          for (
            var e = [],
              n = d.props.format ? d.props.format : "p",
              t = d.props.intervals,
              r = d.props.selected ? d.props.selected : Wt(),
              a = De(r),
              o = be(r),
              i = Ye(Wt()),
              s = 1440 / t,
              u =
                d.props.injectTimes &&
                d.props.injectTimes.sort(function(e, t) {
                  return e - t;
                }),
              c = 0;
            c < s;
            c++
          ) {
            var l = pe(i, c * t);
            if ((e.push(l), u)) {
              var p = on(i, l, c, t, u);
              e = e.concat(p);
            }
          }
          return e.map(function(t, e) {
            return h.createElement(
              "li",
              {
                key: e,
                onClick: d.handleClick.bind(d, t),
                className: d.liClasses(t, a, o),
                ref: function(e) {
                  ((a === De(t) && o === be(t)) ||
                    (a === De(t) && !d.centerLi)) &&
                    (d.centerLi = e);
                }
              },
              It(t, n)
            );
          });
        }),
        Ft(d, e)
      );
    }
    return (
      Ut(o, a),
      (o.prototype.componentDidMount = function() {
        this.list.scrollTop = o.calcCenterPosition(
          this.props.monthRef
            ? this.props.monthRef.clientHeight - this.header.clientHeight
            : this.list.clientHeight,
          this.centerLi
        );
      }),
      (o.prototype.render = function() {
        var t = this,
          e = null;
        return (
          this.props.monthRef &&
            this.header &&
            (e = this.props.monthRef.clientHeight - this.header.clientHeight),
          h.createElement(
            "div",
            {
              className:
                "react-datepicker__time-container " +
                (this.props.todayButton
                  ? "react-datepicker__time-container--with-today-button"
                  : "")
            },
            h.createElement(
              "div",
              {
                className:
                  "react-datepicker__header react-datepicker__header--time",
                ref: function(e) {
                  t.header = e;
                }
              },
              h.createElement(
                "div",
                { className: "react-datepicker-time__header" },
                this.props.timeCaption
              )
            ),
            h.createElement(
              "div",
              { className: "react-datepicker__time" },
              h.createElement(
                "div",
                { className: "react-datepicker__time-box" },
                h.createElement(
                  "ul",
                  {
                    className: "react-datepicker__time-list",
                    ref: function(e) {
                      t.list = e;
                    },
                    style: e ? { height: e } : {}
                  },
                  this.renderTimes.bind(this)()
                )
              )
            )
          )
        );
      }),
      qt(o, null, [
        {
          key: "defaultProps",
          get: function() {
            return {
              intervals: 30,
              onTimeChange: function() {},
              todayButton: null,
              timeCaption: "Time"
            };
          }
        }
      ]),
      o
    );
  })(h.Component);
  function Dn(e) {
    var t = e.children,
      n = e.arrowProps;
    return h.createElement(
      "div",
      { className: e.className },
      h.createElement(
        "div",
        Pt({ className: "react-datepicker__triangle" }, void 0 === n ? {} : n)
      ),
      t
    );
  }
  (bn.propTypes = {
    format: t.string,
    includeTimes: t.array,
    intervals: t.number,
    selected: t.instanceOf(Date),
    onChange: t.func,
    todayButton: t.node,
    minTime: t.instanceOf(Date),
    maxTime: t.instanceOf(Date),
    excludeTimes: t.array,
    monthRef: t.object,
    timeCaption: t.string,
    injectTimes: t.array
  }),
    (bn.calcCenterPosition = function(e, t) {
      return t.offsetTop - (e / 2 - t.clientHeight / 2);
    }),
    (Dn.propTypes = {
      className: t.string,
      children: t.node,
      arrowProps: t.object
    });
  var Cn = [
      "react-datepicker__year-select",
      "react-datepicker__month-select",
      "react-datepicker__month-year-select"
    ],
    kn = (function(t) {
      function n(e) {
        Yt(this, n);
        var u = Ft(this, t.call(this, e));
        return (
          (u.handleClickOutside = function(e) {
            u.props.onClickOutside(e);
          }),
          (u.handleDropdownFocus = function(e) {
            (function() {
              var t = (
                (0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
                ).className || ""
              ).split(/\s+/);
              return Cn.some(function(e) {
                return 0 <= t.indexOf(e);
              });
            })(e.target) && u.props.onDropdownFocus();
          }),
          (u.getDateInView = function() {
            var e = u.props,
              t = e.preSelection,
              n = e.selected,
              r = e.openToDate,
              a = nn(u.props),
              o = rn(u.props),
              i = Wt(),
              s = r || n || t;
            return s || (a && Le(i, a) ? a : o && Ie(i, o) ? o : i);
          }),
          (u.increaseMonth = function() {
            u.setState({ date: we(u.state.date, 1) }, function() {
              return u.handleMonthChange(u.state.date);
            });
          }),
          (u.decreaseMonth = function() {
            u.setState({ date: ve(u.state.date, 1) }, function() {
              return u.handleMonthChange(u.state.date);
            });
          }),
          (u.handleDayClick = function(e, t) {
            return u.props.onSelect(e, t);
          }),
          (u.handleDayMouseEnter = function(e) {
            return u.setState({ selectingDate: e });
          }),
          (u.handleMonthMouseLeave = function() {
            return u.setState({ selectingDate: null });
          }),
          (u.handleYearChange = function(e) {
            u.props.onYearChange && u.props.onYearChange(e);
          }),
          (u.handleMonthChange = function(e) {
            u.props.onMonthChange && u.props.onMonthChange(e),
              u.props.adjustDateOnChange &&
                (u.props.onSelect && u.props.onSelect(e),
                u.props.setOpen && u.props.setOpen(!0));
          }),
          (u.handleMonthYearChange = function(e) {
            u.handleYearChange(e), u.handleMonthChange(e);
          }),
          (u.changeYear = function(e) {
            u.setState({ date: Ee(u.state.date, e) }, function() {
              return u.handleYearChange(u.state.date);
            });
          }),
          (u.changeMonth = function(e) {
            u.setState({ date: Ne(u.state.date, e) }, function() {
              return u.handleMonthChange(u.state.date);
            });
          }),
          (u.changeMonthYear = function(e) {
            u.setState(
              { date: Ee(Ne(u.state.date, ke(e)), Te(e)) },
              function() {
                return u.handleMonthYearChange(u.state.date);
              }
            );
          }),
          (u.header = function() {
            var r = Bt(
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : u.state.date,
                u.props.locale
              ),
              e = [];
            return (
              u.props.showWeekNumbers &&
                e.push(
                  h.createElement(
                    "div",
                    { key: "W", className: "react-datepicker__day-name" },
                    u.props.weekLabel || "#"
                  )
                ),
              e.concat(
                [0, 1, 2, 3, 4, 5, 6].map(function(e) {
                  var t = fe(r, e),
                    n = u.formatWeekday(t, u.props.locale);
                  return h.createElement(
                    "div",
                    { key: e, className: "react-datepicker__day-name" },
                    n
                  );
                })
              )
            );
          }),
          (u.formatWeekday = function(e, t) {
            return u.props.formatWeekDay
              ? (0, u.props.formatWeekDay)(It(e, "dddd", t))
              : u.props.useWeekdaysShort ? It(e, "EEE", t) : It(e, "EEEEEE", t);
          }),
          (u.renderPreviousMonthButton = function() {
            if (!u.props.renderCustomHeader) {
              var e = en(u.state.date, u.props);
              if (
                (u.props.forceShowMonthNavigation ||
                  u.props.showDisabledMonthNavigation ||
                  !e) &&
                !u.props.showTimeSelectOnly
              ) {
                var t = [
                    "react-datepicker__navigation",
                    "react-datepicker__navigation--previous"
                  ],
                  n = u.decreaseMonth;
                return (
                  e &&
                    u.props.showDisabledMonthNavigation &&
                    (t.push("react-datepicker__navigation--previous--disabled"),
                    (n = null)),
                  h.createElement(
                    "button",
                    { type: "button", className: t.join(" "), onClick: n },
                    u.props.previousMonthButtonLabel
                  )
                );
              }
            }
          }),
          (u.renderNextMonthButton = function() {
            if (!u.props.renderCustomHeader) {
              var e = tn(u.state.date, u.props);
              if (
                (u.props.forceShowMonthNavigation ||
                  u.props.showDisabledMonthNavigation ||
                  !e) &&
                !u.props.showTimeSelectOnly
              ) {
                var t = [
                  "react-datepicker__navigation",
                  "react-datepicker__navigation--next"
                ];
                u.props.showTimeSelect &&
                  t.push("react-datepicker__navigation--next--with-time"),
                  u.props.todayButton &&
                    t.push(
                      "react-datepicker__navigation--next--with-today-button"
                    );
                var n = u.increaseMonth;
                return (
                  e &&
                    u.props.showDisabledMonthNavigation &&
                    (t.push("react-datepicker__navigation--next--disabled"),
                    (n = null)),
                  h.createElement(
                    "button",
                    { type: "button", className: t.join(" "), onClick: n },
                    u.props.nextMonthButtonLabel
                  )
                );
              }
            }
          }),
          (u.renderCurrentMonth = function() {
            var e =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : u.state.date,
              t = ["react-datepicker__current-month"];
            return (
              u.props.showYearDropdown &&
                t.push("react-datepicker__current-month--hasYearDropdown"),
              u.props.showMonthDropdown &&
                t.push("react-datepicker__current-month--hasMonthDropdown"),
              u.props.showMonthYearDropdown &&
                t.push("react-datepicker__current-month--hasMonthYearDropdown"),
              h.createElement(
                "div",
                { className: t.join(" ") },
                It(e, u.props.dateFormat, u.props.locale)
              )
            );
          }),
          (u.renderYearDropdown = function() {
            if (
              u.props.showYearDropdown &&
              !(0 < arguments.length && void 0 !== arguments[0] && arguments[0])
            )
              return h.createElement(cn, {
                adjustDateOnChange: u.props.adjustDateOnChange,
                date: u.state.date,
                onSelect: u.props.onSelect,
                setOpen: u.props.setOpen,
                dropdownMode: u.props.dropdownMode,
                onChange: u.changeYear,
                minDate: u.props.minDate,
                maxDate: u.props.maxDate,
                year: Te(u.state.date),
                scrollableYearDropdown: u.props.scrollableYearDropdown,
                yearDropdownItemNumber: u.props.yearDropdownItemNumber
              });
          }),
          (u.renderMonthDropdown = function() {
            if (
              u.props.showMonthDropdown &&
              !(0 < arguments.length && void 0 !== arguments[0] && arguments[0])
            )
              return h.createElement(dn, {
                dropdownMode: u.props.dropdownMode,
                locale: u.props.locale,
                onChange: u.changeMonth,
                month: ke(u.state.date),
                useShortMonthInDropdown: u.props.useShortMonthInDropdown
              });
          }),
          (u.renderMonthYearDropdown = function() {
            if (
              u.props.showMonthYearDropdown &&
              !(0 < arguments.length && void 0 !== arguments[0] && arguments[0])
            )
              return h.createElement(mn, {
                dropdownMode: u.props.dropdownMode,
                locale: u.props.locale,
                dateFormat: u.props.dateFormat,
                onChange: u.changeMonthYear,
                minDate: u.props.minDate,
                maxDate: u.props.maxDate,
                date: u.state.date,
                scrollableMonthYearDropdown: u.props.scrollableMonthYearDropdown
              });
          }),
          (u.renderTodayButton = function() {
            if (u.props.todayButton && !u.props.showTimeSelectOnly)
              return h.createElement(
                "div",
                {
                  className: "react-datepicker__today-button",
                  onClick: function(e) {
                    return u.props.onSelect(Ye(Wt()), e);
                  }
                },
                u.props.todayButton
              );
          }),
          (u.renderDefaultHeader = function(e) {
            var t = e.monthDate,
              n = e.i;
            return h.createElement(
              "div",
              { className: "react-datepicker__header" },
              u.renderCurrentMonth(t),
              h.createElement(
                "div",
                {
                  className:
                    "react-datepicker__header__dropdown react-datepicker__header__dropdown--" +
                    u.props.dropdownMode,
                  onFocus: u.handleDropdownFocus
                },
                u.renderMonthDropdown(0 !== n),
                u.renderMonthYearDropdown(0 !== n),
                u.renderYearDropdown(0 !== n)
              ),
              h.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                u.header(t)
              )
            );
          }),
          (u.renderCustomHeader = function(e) {
            var t = e.monthDate;
            if (0 !== e.i) return null;
            var n = en(u.state.date, u.props),
              r = tn(u.state.date, u.props);
            return h.createElement(
              "div",
              {
                className:
                  "react-datepicker__header react-datepicker__header--custom",
                onFocus: u.props.onDropdownFocus
              },
              u.props.renderCustomHeader(
                Pt({}, u.state, {
                  changeMonth: u.changeMonth,
                  changeYear: u.changeYear,
                  decreaseMonth: u.decreaseMonth,
                  increaseMonth: u.increaseMonth,
                  prevMonthButtonDisabled: n,
                  nextMonthButtonDisabled: r
                })
              ),
              h.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                u.header(t)
              )
            );
          }),
          (u.renderMonths = function() {
            if (!u.props.showTimeSelectOnly) {
              for (var e = [], t = 0; t < u.props.monthsShown; ++t) {
                var n = we(u.state.date, t);
                e.push(
                  h.createElement(
                    "div",
                    {
                      key: "month-" + t,
                      ref: function(e) {
                        u.monthContainer = e;
                      },
                      className: "react-datepicker__month-container"
                    },
                    u.props.renderCustomHeader
                      ? u.renderCustomHeader({ monthDate: n, i: t })
                      : u.renderDefaultHeader({ monthDate: n, i: t }),
                    h.createElement(vn, {
                      day: n,
                      dayClassName: u.props.dayClassName,
                      onDayClick: u.handleDayClick,
                      onDayMouseEnter: u.handleDayMouseEnter,
                      onMouseLeave: u.handleMonthMouseLeave,
                      onWeekSelect: u.props.onWeekSelect,
                      formatWeekNumber: u.props.formatWeekNumber,
                      locale: u.props.locale,
                      minDate: u.props.minDate,
                      maxDate: u.props.maxDate,
                      excludeDates: u.props.excludeDates,
                      highlightDates: u.props.highlightDates,
                      selectingDate: u.state.selectingDate,
                      includeDates: u.props.includeDates,
                      inline: u.props.inline,
                      fixedHeight: u.props.fixedHeight,
                      filterDate: u.props.filterDate,
                      preSelection: u.props.preSelection,
                      selected: u.props.selected,
                      selectsStart: u.props.selectsStart,
                      selectsEnd: u.props.selectsEnd,
                      showWeekNumbers: u.props.showWeekNumbers,
                      startDate: u.props.startDate,
                      endDate: u.props.endDate,
                      peekNextMonth: u.props.peekNextMonth,
                      setOpen: u.props.setOpen,
                      shouldCloseOnSelect: u.props.shouldCloseOnSelect,
                      renderDayContents: u.props.renderDayContents,
                      disabledKeyboardNavigation:
                        u.props.disabledKeyboardNavigation
                    })
                  )
                );
              }
              return e;
            }
          }),
          (u.renderTimeSection = function() {
            if (
              u.props.showTimeSelect &&
              (u.state.monthContainer || u.props.showTimeSelectOnly)
            )
              return h.createElement(bn, {
                selected: u.props.selected,
                onChange: u.props.onTimeChange,
                format: u.props.timeFormat,
                includeTimes: u.props.includeTimes,
                intervals: u.props.timeIntervals,
                minTime: u.props.minTime,
                maxTime: u.props.maxTime,
                excludeTimes: u.props.excludeTimes,
                timeCaption: u.props.timeCaption,
                todayButton: u.props.todayButton,
                showMonthDropdown: u.props.showMonthDropdown,
                showMonthYearDropdown: u.props.showMonthYearDropdown,
                showYearDropdown: u.props.showYearDropdown,
                withPortal: u.props.withPortal,
                monthRef: u.state.monthContainer,
                injectTimes: u.props.injectTimes
              });
          }),
          (u.state = {
            date: u.getDateInView(),
            selectingDate: null,
            monthContainer: null
          }),
          u
        );
      }
      return (
        Ut(n, t),
        qt(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                onDropdownFocus: function() {},
                monthsShown: 1,
                forceShowMonthNavigation: !1,
                timeCaption: "Time",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next Month"
              };
            }
          }
        ]),
        (n.prototype.componentDidMount = function() {
          var e = this;
          this.props.showTimeSelect &&
            (this.assignMonthContainer = void e.setState({
              monthContainer: e.monthContainer
            }));
        }),
        (n.prototype.componentDidUpdate = function(e) {
          this.props.preSelection &&
          !At(this.props.preSelection, e.preSelection)
            ? this.setState({ date: this.props.preSelection })
            : this.props.openToDate &&
              !At(this.props.openToDate, e.openToDate) &&
              this.setState({ date: this.props.openToDate });
        }),
        (n.prototype.render = function() {
          return h.createElement(
            this.props.container || Dn,
            {
              className: p("react-datepicker", this.props.className, {
                "react-datepicker--time-only": this.props.showTimeSelectOnly
              })
            },
            this.renderPreviousMonthButton(),
            this.renderNextMonthButton(),
            this.renderMonths(),
            this.renderTodayButton(),
            this.renderTimeSection(),
            this.props.children
          );
        }),
        n
      );
    })(h.Component);
  kn.propTypes = {
    adjustDateOnChange: t.bool,
    className: t.string,
    children: t.node,
    container: t.func,
    dateFormat: t.oneOfType([t.string, t.array]).isRequired,
    dayClassName: t.func,
    disabledKeyboardNavigation: t.bool,
    dropdownMode: t.oneOf(["scroll", "select"]),
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    fixedHeight: t.bool,
    formatWeekNumber: t.func,
    highlightDates: t.instanceOf(Map),
    includeDates: t.array,
    includeTimes: t.array,
    injectTimes: t.array,
    inline: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    monthsShown: t.number,
    onClickOutside: t.func.isRequired,
    onMonthChange: t.func,
    onYearChange: t.func,
    forceShowMonthNavigation: t.bool,
    onDropdownFocus: t.func,
    onSelect: t.func.isRequired,
    onWeekSelect: t.func,
    showTimeSelect: t.bool,
    showTimeSelectOnly: t.bool,
    timeFormat: t.string,
    timeIntervals: t.number,
    onTimeChange: t.func,
    minTime: t.instanceOf(Date),
    maxTime: t.instanceOf(Date),
    excludeTimes: t.array,
    timeCaption: t.string,
    openToDate: t.instanceOf(Date),
    peekNextMonth: t.bool,
    scrollableYearDropdown: t.bool,
    scrollableMonthYearDropdown: t.bool,
    preSelection: t.instanceOf(Date),
    selected: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showMonthDropdown: t.bool,
    showMonthYearDropdown: t.bool,
    showWeekNumbers: t.bool,
    showYearDropdown: t.bool,
    startDate: t.instanceOf(Date),
    todayButton: t.string,
    useWeekdaysShort: t.bool,
    formatWeekDay: t.func,
    withPortal: t.bool,
    weekLabel: t.string,
    yearDropdownItemNumber: t.number,
    setOpen: t.func,
    shouldCloseOnSelect: t.bool,
    useShortMonthInDropdown: t.bool,
    showDisabledMonthNavigation: t.bool,
    previousMonthButtonLabel: t.string,
    nextMonthButtonLabel: t.string,
    renderCustomHeader: t.func,
    renderDayContents: t.func
  };
  var Tn = u.placements,
    Mn = (function(e) {
      function t() {
        return Yt(this, t), Ft(this, e.apply(this, arguments));
      }
      return (
        Ut(t, e),
        (t.prototype.render = function() {
          var e = this.props,
            n = e.popperComponent,
            t = e.popperModifiers,
            r = e.popperPlacement,
            a = e.popperProps,
            o = e.targetComponent,
            i = void 0;
          if (!e.hidePopper) {
            var s = p("react-datepicker-popper", e.className);
            i = h.createElement(
              u.Popper,
              Pt({ modifiers: t, placement: r }, a),
              function(e) {
                var t = e.arrowProps;
                return h.createElement(
                  "div",
                  Pt(
                    { ref: e.ref, style: e.style },
                    { className: s, "data-placement": e.placement }
                  ),
                  h.cloneElement(n, { arrowProps: t })
                );
              }
            );
          }
          return (
            this.props.popperContainer &&
              (i = h.createElement(this.props.popperContainer, {}, i)),
            h.createElement(
              u.Manager,
              null,
              h.createElement(u.Reference, null, function(e) {
                return h.createElement(
                  "div",
                  { ref: e.ref, className: "react-datepicker-wrapper" },
                  o
                );
              }),
              i
            )
          );
        }),
        qt(t, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                hidePopper: !0,
                popperModifiers: {
                  preventOverflow: {
                    enabled: !0,
                    escapeWithReference: !0,
                    boundariesElement: "viewport"
                  }
                },
                popperProps: {},
                popperPlacement: "bottom-start"
              };
            }
          }
        ]),
        t
      );
    })(h.Component);
  Mn.propTypes = {
    className: t.string,
    hidePopper: t.bool,
    popperComponent: t.element,
    popperModifiers: t.object,
    popperPlacement: t.oneOf(Tn),
    popperContainer: t.func,
    popperProps: t.object,
    targetComponent: t.element
  };
  var Sn = "react-datepicker-ignore-onclickoutside",
    xn = n(kn);
  var Nn = "Date input not valid.",
    En = (function(t) {
      function n(e) {
        Yt(this, n);
        var l = Ft(this, t.call(this, e));
        return (
          (l.getPreSelection = function() {
            return l.props.openToDate
              ? l.props.openToDate
              : l.props.selectsEnd && l.props.startDate
                ? l.props.startDate
                : l.props.selectsStart && l.props.endDate
                  ? l.props.endDate
                  : Wt();
          }),
          (l.calcInitialState = function() {
            var e = l.getPreSelection(),
              t = nn(l.props),
              n = rn(l.props),
              r = t && Le(e, t) ? t : n && Ie(e, n) ? n : e;
            return {
              open: l.props.startOpen || !1,
              preventFocus: !1,
              preSelection: l.props.selected ? l.props.selected : r,
              highlightDates: an(l.props.highlightDates),
              focused: !1
            };
          }),
          (l.clearPreventFocusTimeout = function() {
            l.preventFocusTimeout && clearTimeout(l.preventFocusTimeout);
          }),
          (l.setFocus = function() {
            l.input && l.input.focus && l.input.focus();
          }),
          (l.setBlur = function() {
            l.input && l.input.blur && l.input.blur(), l.cancelFocusInput();
          }),
          (l.setOpen = function(e) {
            var t =
              1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            l.setState(
              {
                open: e,
                preSelection:
                  e && l.state.open
                    ? l.state.preSelection
                    : l.calcInitialState().preSelection,
                lastPreSelectChange: _n
              },
              function() {
                e ||
                  l.setState(
                    function(e) {
                      return { focused: !!t && e.focused };
                    },
                    function() {
                      !t && l.setBlur(), l.setState({ inputValue: null });
                    }
                  );
              }
            );
          }),
          (l.inputOk = function() {
            return m(l.state.preSelection);
          }),
          (l.isCalendarOpen = function() {
            return void 0 === l.props.open
              ? l.state.open && !l.props.disabled && !l.props.readOnly
              : l.props.open;
          }),
          (l.handleFocus = function(e) {
            l.state.preventFocus ||
              (l.props.onFocus(e),
              l.props.preventOpenOnFocus || l.props.readOnly || l.setOpen(!0)),
              l.setState({ focused: !0 });
          }),
          (l.cancelFocusInput = function() {
            clearTimeout(l.inputFocusTimeout), (l.inputFocusTimeout = null);
          }),
          (l.deferFocusInput = function() {
            l.cancelFocusInput(),
              (l.inputFocusTimeout = setTimeout(function() {
                return l.setFocus();
              }, 1));
          }),
          (l.handleDropdownFocus = function() {
            l.cancelFocusInput();
          }),
          (l.handleBlur = function(e) {
            l.state.open && !l.props.withPortal
              ? l.deferFocusInput()
              : l.props.onBlur(e),
              l.setState({ focused: !1 });
          }),
          (l.handleCalendarClickOutside = function(e) {
            l.props.inline || l.setOpen(!1),
              l.props.onClickOutside(e),
              l.props.withPortal && e.preventDefault();
          }),
          (l.handleChange = function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            var r = t[0];
            if (
              !l.props.onChangeRaw ||
              (l.props.onChangeRaw.apply(l, t),
              "function" == typeof r.isDefaultPrevented &&
                !r.isDefaultPrevented())
            ) {
              l.setState({
                inputValue: r.target.value,
                lastPreSelectChange: On
              });
              var a,
                o,
                i,
                s,
                u = ((a = r.target.value),
                (o = l.props.dateFormat),
                (i = null),
                (s = Vt(l.props.locale)),
                Array.isArray(o)
                  ? (o.forEach(function(e) {
                      var t = Et(a, e, new Date(), s);
                      Ht(t) && (i = t);
                    }),
                    i)
                  : (Ht((i = Et(a, o, new Date(), s))) || (i = new Date(a)),
                    Ht(i) ? i : null));
              (!u && r.target.value) || l.setSelected(u, r, !0);
            }
          }),
          (l.handleSelect = function(e, t) {
            l.setState({ preventFocus: !0 }, function() {
              return (
                (l.preventFocusTimeout = setTimeout(function() {
                  return l.setState({ preventFocus: !1 });
                }, 50)),
                l.preventFocusTimeout
              );
            }),
              l.setSelected(e, t),
              !l.props.shouldCloseOnSelect || l.props.showTimeSelect
                ? l.setPreSelection(e)
                : l.props.inline || l.setOpen(!1);
          }),
          (l.setSelected = function(e, t, n) {
            var r = e;
            if (null !== r && Kt(r, l.props))
              $t(r, l.props) &&
                (l.props.onChange(e, t), l.props.onSelect(r, t));
            else {
              if (!At(l.props.selected, r) || l.props.allowSameDay) {
                if (null !== r) {
                  if (l.props.selected) {
                    var a = l.props.selected;
                    n && (a = Wt(r)),
                      (r = Lt(r, {
                        hour: De(a),
                        minute: be(a),
                        second: (function(e, t) {
                          if (arguments.length < 1)
                            throw new TypeError(
                              "1 argument required, but only " +
                                arguments.length +
                                " present"
                            );
                          return N(e, t).getSeconds();
                        })(a)
                      }));
                  }
                  l.props.inline || l.setState({ preSelection: r });
                }
                l.props.onChange(r, t);
              }
              l.props.onSelect(r, t), n || l.setState({ inputValue: null });
            }
          }),
          (l.setPreSelection = function(e) {
            (!(void 0 !== l.props.minDate && void 0 !== l.props.maxDate) ||
              !e ||
              zt(e, l.props.minDate, l.props.maxDate)) &&
              l.setState({ preSelection: e });
          }),
          (l.handleTimeChange = function(e) {
            var t = Lt(
              l.props.selected ? l.props.selected : l.getPreSelection(),
              { hour: De(e), minute: be(e) }
            );
            l.setState({ preSelection: t }),
              l.props.onChange(t),
              l.props.shouldCloseOnSelect && l.setOpen(!1),
              l.setState({ inputValue: null });
          }),
          (l.onInputClick = function() {
            l.props.disabled || l.props.readOnly || l.setOpen(!0),
              l.props.onInputClick();
          }),
          (l.onInputKeyDown = function(e) {
            l.props.onKeyDown(e);
            var t = e.key;
            if (l.state.open || l.props.inline || l.props.preventOpenOnFocus) {
              var n = Wt(l.state.preSelection);
              if ("Enter" === t)
                e.preventDefault(),
                  l.inputOk() && l.state.lastPreSelectChange === _n
                    ? (l.handleSelect(n, e),
                      !l.props.shouldCloseOnSelect && l.setPreSelection(n))
                    : l.setOpen(!1);
              else if ("Escape" === t)
                e.preventDefault(),
                  l.setOpen(!1),
                  l.inputOk() || l.props.onInputError({ code: 1, msg: Nn });
              else if ("Tab" === t) l.setOpen(!1, !0);
              else if (!l.props.disabledKeyboardNavigation) {
                var r = void 0;
                switch (t) {
                  case "ArrowLeft":
                    r = (function(e, t, n) {
                      if (arguments.length < 2)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return fe(e, -S(t), n);
                    })(n, 1);
                    break;
                  case "ArrowRight":
                    r = fe(n, 1);
                    break;
                  case "ArrowUp":
                    r = (function(e, t, n) {
                      if (arguments.length < 2)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return me(e, -S(t), n);
                    })(n, 1);
                    break;
                  case "ArrowDown":
                    r = me(n, 1);
                    break;
                  case "PageUp":
                    r = ve(n, 1);
                    break;
                  case "PageDown":
                    r = we(n, 1);
                    break;
                  case "Home":
                    r = (function(e, t, n) {
                      if (arguments.length < 2)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return ye(e, -S(t), n);
                    })(n, 1);
                    break;
                  case "End":
                    r = ye(n, 1);
                }
                if (!r)
                  return void (
                    l.props.onInputError &&
                    l.props.onInputError({ code: 1, msg: Nn })
                  );
                e.preventDefault(),
                  l.setState({ lastPreSelectChange: _n }),
                  l.props.adjustDateOnChange && l.setSelected(r),
                  l.setPreSelection(r);
              }
            } else ("ArrowDown" !== t && "ArrowUp" !== t) || l.onInputClick();
          }),
          (l.onClearClick = function(e) {
            e && e.preventDefault && e.preventDefault(),
              l.props.onChange(null, e),
              l.setState({ inputValue: null });
          }),
          (l.clear = function() {
            l.onClearClick();
          }),
          (l.renderCalendar = function() {
            return l.props.inline || l.isCalendarOpen()
              ? h.createElement(
                  xn,
                  {
                    ref: function(e) {
                      l.calendar = e;
                    },
                    locale: l.props.locale,
                    adjustDateOnChange: l.props.adjustDateOnChange,
                    setOpen: l.setOpen,
                    shouldCloseOnSelect: l.props.shouldCloseOnSelect,
                    dateFormat: l.props.dateFormatCalendar,
                    useWeekdaysShort: l.props.useWeekdaysShort,
                    formatWeekDay: l.props.formatWeekDay,
                    dropdownMode: l.props.dropdownMode,
                    selected: l.props.selected,
                    preSelection: l.state.preSelection,
                    onSelect: l.handleSelect,
                    onWeekSelect: l.props.onWeekSelect,
                    openToDate: l.props.openToDate,
                    minDate: l.props.minDate,
                    maxDate: l.props.maxDate,
                    selectsStart: l.props.selectsStart,
                    selectsEnd: l.props.selectsEnd,
                    startDate: l.props.startDate,
                    endDate: l.props.endDate,
                    excludeDates: l.props.excludeDates,
                    filterDate: l.props.filterDate,
                    onClickOutside: l.handleCalendarClickOutside,
                    formatWeekNumber: l.props.formatWeekNumber,
                    highlightDates: l.state.highlightDates,
                    includeDates: l.props.includeDates,
                    includeTimes: l.props.includeTimes,
                    injectTimes: l.props.injectTimes,
                    inline: l.props.inline,
                    peekNextMonth: l.props.peekNextMonth,
                    showMonthDropdown: l.props.showMonthDropdown,
                    useShortMonthInDropdown: l.props.useShortMonthInDropdown,
                    showMonthYearDropdown: l.props.showMonthYearDropdown,
                    showWeekNumbers: l.props.showWeekNumbers,
                    showYearDropdown: l.props.showYearDropdown,
                    withPortal: l.props.withPortal,
                    forceShowMonthNavigation: l.props.forceShowMonthNavigation,
                    showDisabledMonthNavigation:
                      l.props.showDisabledMonthNavigation,
                    scrollableYearDropdown: l.props.scrollableYearDropdown,
                    scrollableMonthYearDropdown:
                      l.props.scrollableMonthYearDropdown,
                    todayButton: l.props.todayButton,
                    weekLabel: l.props.weekLabel,
                    outsideClickIgnoreClass: Sn,
                    fixedHeight: l.props.fixedHeight,
                    monthsShown: l.props.monthsShown,
                    onDropdownFocus: l.handleDropdownFocus,
                    onMonthChange: l.props.onMonthChange,
                    onYearChange: l.props.onYearChange,
                    dayClassName: l.props.dayClassName,
                    showTimeSelect: l.props.showTimeSelect,
                    showTimeSelectOnly: l.props.showTimeSelectOnly,
                    onTimeChange: l.handleTimeChange,
                    timeFormat: l.props.timeFormat,
                    timeIntervals: l.props.timeIntervals,
                    minTime: l.props.minTime,
                    maxTime: l.props.maxTime,
                    excludeTimes: l.props.excludeTimes,
                    timeCaption: l.props.timeCaption,
                    className: l.props.calendarClassName,
                    container: l.props.calendarContainer,
                    yearDropdownItemNumber: l.props.yearDropdownItemNumber,
                    previousMonthButtonLabel: l.props.previousMonthButtonLabel,
                    nextMonthButtonLabel: l.props.nextMonthButtonLabel,
                    disabledKeyboardNavigation:
                      l.props.disabledKeyboardNavigation,
                    renderCustomHeader: l.props.renderCustomHeader,
                    popperProps: l.props.popperProps,
                    renderDayContents: l.props.renderDayContents
                  },
                  l.props.children
                )
              : null;
          }),
          (l.renderDateInput = function() {
            var e,
              t,
              n,
              r,
              a,
              o,
              i = p(l.props.className, (((e = {})[Sn] = l.state.open), e)),
              s =
                l.props.customInput ||
                h.createElement("input", { type: "text" }),
              u = l.props.customInputRef || "ref",
              c =
                "string" == typeof l.props.value
                  ? l.props.value
                  : "string" == typeof l.state.inputValue
                    ? l.state.inputValue
                    : ((a = (r = l.props).dateFormat),
                      (o = r.locale),
                      ((n = l.props.selected) &&
                        It(n, Array.isArray(a) ? a[0] : a, o)) ||
                        "");
            return h.cloneElement(
              s,
              (((t = {})[u] = function(e) {
                l.input = e;
              }),
              (t.value = c),
              (t.onBlur = l.handleBlur),
              (t.onChange = l.handleChange),
              (t.onClick = l.onInputClick),
              (t.onFocus = l.handleFocus),
              (t.onKeyDown = l.onInputKeyDown),
              (t.id = l.props.id),
              (t.name = l.props.name),
              (t.autoFocus = l.props.autoFocus),
              (t.placeholder = l.props.placeholderText),
              (t.disabled = l.props.disabled),
              (t.autoComplete = l.props.autoComplete),
              (t.className = i),
              (t.title = l.props.title),
              (t.readOnly = l.props.readOnly),
              (t.required = l.props.required),
              (t.tabIndex = l.props.tabIndex),
              t)
            );
          }),
          (l.renderClearButton = function() {
            return l.props.isClearable && null != l.props.selected
              ? h.createElement("button", {
                  type: "button",
                  className: "react-datepicker__close-icon",
                  onClick: l.onClearClick,
                  title: l.props.clearButtonTitle,
                  tabIndex: -1
                })
              : null;
          }),
          (l.state = l.calcInitialState()),
          l
        );
      }
      return (
        Ut(n, t),
        qt(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                allowSameDay: !1,
                dateFormat: "MM/dd/yyyy",
                dateFormatCalendar: "LLLL yyyy",
                onChange: function() {},
                disabled: !1,
                disabledKeyboardNavigation: !1,
                dropdownMode: "scroll",
                onFocus: function() {},
                onBlur: function() {},
                onKeyDown: function() {},
                onInputClick: function() {},
                onSelect: function() {},
                onClickOutside: function() {},
                onMonthChange: function() {},
                preventOpenOnFocus: !1,
                onYearChange: function() {},
                onInputError: function() {},
                monthsShown: 1,
                readOnly: !1,
                withPortal: !1,
                shouldCloseOnSelect: !0,
                showTimeSelect: !1,
                timeIntervals: 30,
                timeCaption: "Time",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next month",
                renderDayContents: function(e) {
                  return e;
                }
              };
            }
          }
        ]),
        (n.prototype.componentDidUpdate = function(e, t) {
          var n, r, a, o;
          e.inline &&
            ((r = this.props.selected),
            (n = e.selected) && r
              ? ke(n) !== ke(r) || Te(n) !== Te(r)
              : n !== r) &&
            this.setPreSelection(this.props.selected),
            e.highlightDates !== this.props.highlightDates &&
              this.setState({ highlightDates: an(this.props.highlightDates) }),
            !t.focused &&
              ((o = this.props.selected), (a = e.selected) && o && !He(a, o)) &&
              this.setState({ inputValue: null });
        }),
        (n.prototype.componentWillUnmount = function() {
          this.clearPreventFocusTimeout();
        }),
        (n.prototype.render = function() {
          var e = this.renderCalendar();
          return this.props.inline && !this.props.withPortal
            ? e
            : this.props.withPortal
              ? h.createElement(
                  "div",
                  null,
                  this.props.inline
                    ? null
                    : h.createElement(
                        "div",
                        { className: "react-datepicker__input-container" },
                        this.renderDateInput(),
                        this.renderClearButton()
                      ),
                  this.state.open || this.props.inline
                    ? h.createElement(
                        "div",
                        { className: "react-datepicker__portal" },
                        e
                      )
                    : null
                )
              : h.createElement(Mn, {
                  className: this.props.popperClassName,
                  hidePopper: !this.isCalendarOpen(),
                  popperModifiers: this.props.popperModifiers,
                  targetComponent: h.createElement(
                    "div",
                    { className: "react-datepicker__input-container" },
                    this.renderDateInput(),
                    this.renderClearButton()
                  ),
                  popperContainer: this.props.popperContainer,
                  popperComponent: e,
                  popperPlacement: this.props.popperPlacement,
                  popperProps: this.props.popperProps
                });
        }),
        n
      );
    })(h.Component);
  En.propTypes = {
    adjustDateOnChange: t.bool,
    allowSameDay: t.bool,
    autoComplete: t.string,
    autoFocus: t.bool,
    calendarClassName: t.string,
    calendarContainer: t.func,
    children: t.node,
    className: t.string,
    customInput: t.element,
    customInputRef: t.string,
    dateFormat: t.oneOfType([t.string, t.array]),
    dateFormatCalendar: t.string,
    dayClassName: t.func,
    disabled: t.bool,
    disabledKeyboardNavigation: t.bool,
    dropdownMode: t.oneOf(["scroll", "select"]).isRequired,
    endDate: t.instanceOf(Date),
    excludeDates: t.array,
    filterDate: t.func,
    fixedHeight: t.bool,
    formatWeekNumber: t.func,
    highlightDates: t.array,
    id: t.string,
    includeDates: t.array,
    includeTimes: t.array,
    injectTimes: t.array,
    inline: t.bool,
    isClearable: t.bool,
    locale: t.string,
    maxDate: t.instanceOf(Date),
    minDate: t.instanceOf(Date),
    monthsShown: t.number,
    name: t.string,
    onBlur: t.func,
    onChange: t.func.isRequired,
    onSelect: t.func,
    onWeekSelect: t.func,
    onClickOutside: t.func,
    onChangeRaw: t.func,
    onFocus: t.func,
    onInputClick: t.func,
    onKeyDown: t.func,
    onMonthChange: t.func,
    onYearChange: t.func,
    onInputError: t.func,
    open: t.bool,
    openToDate: t.instanceOf(Date),
    peekNextMonth: t.bool,
    placeholderText: t.string,
    popperContainer: t.func,
    popperClassName: t.string,
    popperModifiers: t.object,
    popperPlacement: t.oneOf(Tn),
    popperProps: t.object,
    preventOpenOnFocus: t.bool,
    readOnly: t.bool,
    required: t.bool,
    scrollableYearDropdown: t.bool,
    scrollableMonthYearDropdown: t.bool,
    selected: t.instanceOf(Date),
    selectsEnd: t.bool,
    selectsStart: t.bool,
    showMonthDropdown: t.bool,
    showMonthYearDropdown: t.bool,
    showWeekNumbers: t.bool,
    showYearDropdown: t.bool,
    forceShowMonthNavigation: t.bool,
    showDisabledMonthNavigation: t.bool,
    startDate: t.instanceOf(Date),
    startOpen: t.bool,
    tabIndex: t.number,
    timeCaption: t.string,
    title: t.string,
    todayButton: t.node,
    useWeekdaysShort: t.bool,
    formatWeekDay: t.func,
    value: t.string,
    weekLabel: t.string,
    withPortal: t.bool,
    yearDropdownItemNumber: t.number,
    shouldCloseOnSelect: t.bool,
    showTimeSelect: t.bool,
    showTimeSelectOnly: t.bool,
    timeFormat: t.string,
    timeIntervals: t.number,
    minTime: t.instanceOf(Date),
    maxTime: t.instanceOf(Date),
    excludeTimes: t.array,
    useShortMonthInDropdown: t.bool,
    clearButtonTitle: t.string,
    previousMonthButtonLabel: t.string,
    nextMonthButtonLabel: t.string,
    renderCustomHeader: t.func,
    renderDayContents: t.func
  };
  var On = "input",
    _n = "navigate";
  (e.registerLocale = function(e, t) {
    window.__localeData__ || (window.__localeData__ = {}),
      (window.__localeData__[e] = t);
  }),
    (e.setDefaultLocale = function(e) {
      window.__localeId__ = e;
    }),
    (e.getDefaultLocale = Gt),
    (e.default = En),
    (e.CalendarContainer = Dn),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
