var define, require;
! function(e) {
	function r(e, r) {
		q(e);
		var t = tr.waitSeconds;
		return j(e) && t && (z && clearTimeout(z), z = setTimeout(n, 1e3 * t)), C(e, r)
	}

	function n() {
		var e, r = [],
			n = [],
			t = {};
		for (var i in F) f(i) || (e = 1, r.push(i)), A(F[i].depMs || [], function(r) {
			var i = r.absId;
			F[i] || t[i] || (e = 1, n.push(i), t[i] = 1)
		});
		if (e) throw new Error("[MODULE_TIMEOUT]Hang( " + (r.join(", ") || "none") + " ) Miss( " + (n.join(", ") || "none") + " )")
	}

	function t() {
		var e = arguments.length;
		if (e) {
			for (var r, n, t = arguments[--e]; e--;) {
				var i = arguments[e];
				"string" == typeof i ? r = i : j(i) && (n = i)
			}
			var u = window.opera;
			if (!r && document.attachEvent && (!u || "[object Opera]" !== u.toString())) {
				var s = R();
				r = s && s.getAttribute("data-require-id")
			}
			r ? (a(r, n, t), H && clearTimeout(H), H = setTimeout(o, 1)) : rr.push({
				deps: n,
				factory: t
			})
		}
	}

	function i() {
		var e = tr.config[this.id];
		return e && "object" == typeof e ? e : {}
	}

	function a(e, r, n) {
		if (!F[e]) {
			var t = {
				id: e,
				deps: r || ["require", "exports", "module"],
				factoryDeps: [],
				factory: n,
				exports: {},
				config: i,
				state: P,
				require: k(e),
				depMs: [],
				depMsIndex: {},
				depRs: [],
				depPMs: {}
			};
			F[e] = t, _.push(t)
		}
	}

	function o() {
		function e(e) {
			F[e] || n[e] || (r.push(e), n[e] = 1)
		}
		var r = [],
			n = {};
		A(_, function(r) {
			if (!(r.state > P)) {
				var n = r.deps.slice(0),
					t = n.length,
					i = 0,
					a = r.factory;
				"function" == typeof a && (i = Math.min(a.length, t), a.toString().replace(G, "").replace(Q, function(e, r, t) {
					n.push(t)
				})), A(n, function(n, a) {
					var o, u, s = U(n),
						c = E(s.module, r.id);
					c && !er[c] ? (s.resource && (u = {
						id: n,
						module: c,
						resource: s.resource
					}, r.depPMs[c] = 1, r.depRs.push(u)), o = r.depMsIndex[c], o || (o = {
						id: s.module,
						absId: c,
						hard: i > a,
						circular: W
					}, r.depMs.push(o), r.depMsIndex[c] = o, e(c))) : o = {
						absId: c
					}, t > a && r.factoryDeps.push(u || o)
				}), r.state = B, A(r.depMs, function(e) {
					u(r.id, e.absId)
				}), s(r)
			}
		}), b(r)
	}

	function u(e, r) {
		function n() {
			p(e)
		}
		g(r, function() {
			var t = F[e];
			t.depPMs[r] && A(t.depRs, function(t) {
				t.absId || t.module !== r || (t.absId = E(t.id, e), g(t.absId, n), b([t.absId], null, e))
			}), n()
		})
	}

	function s(r) {
		function n() {
			var e = V;
			return A(r.depRs, function(r) {
				return r.absId && f(r.absId) ? void 0 : (e = J, !1)
			}), e !== V ? e : (A(r.depMs, function(r) {
				if (!f(r.absId)) switch (r.circular === W && (r.circular = l(a, r.absId)), r.circular) {
					case Y:
						r.hard && (e = K);
						break;
					case X:
						e = K;
						break;
					case W:
						return e = J, !1
				}
			}), e)
		}

		function t() {
			if (!(r.state >= L)) {
				var t = n();
				if (t >= K && i(), !(V > t)) {
					var o = [];
					A(r.factoryDeps, function(e) {
						o.push(e.absId)
					});
					var u = v(o, {
						require: r.require,
						exports: r.exports,
						module: r
					});
					try {
						var s = r.factory,
							c = "function" == typeof s ? s.apply(e, u) : s;
						null != c && (r.exports = c)
					} catch (f) {
						if (/^\[MODULE_MISS\]"([^"]+)/.test(f.message)) {
							var d = r.depMsIndex[RegExp.$1];
							return d && (d.hard = 1), void 0
						}
						throw f
					}
					r.state = L, r.invokeFactory = null, h(a)
				}
			}
		}

		function i() {
			o || (o = 1, A(r.depMs, function(e) {
				e.circular === Y && p(e.absId)
			}))
		}
		var a = r.id;
		r.invokeFactory = t, t();
		var o
	}

	function c(e) {
		return F[e] && F[e].state >= B
	}

	function f(e) {
		return F[e] && F[e].state >= L
	}

	function d(e, r) {
		var n = F[e];
		if (r = r || {}, r[e] = 1, !n || n.state < L) return !1;
		if (n.state === N) return !0;
		for (var t = n.depMs, i = t.length; i--;) {
			var a = t[i].absId;
			if (!r[a] && !d(a, r)) return !1
		}
		return n.state = N, !0
	}

	function v(e, r) {
		var n = [];
		return A(e, function(e) {
			n.push(r[e] || m(e))
		}), n
	}

	function l(e, r, n) {
		if (!c(r)) return W;
		n = n || {}, n[r] = 1;
		var t = F[r];
		if (r === e) return Y;
		var i = t && t.depMs;
		if (i)
			for (var a = i.length; a--;) {
				var o = i[a].absId;
				if (!n[o]) {
					var u = l(e, o, n);
					switch (u) {
						case Y:
						case W:
							return u
					}
				}
			}
		return X
	}

	function p(e) {
		var r = F[e];
		r && r.invokeFactory && r.invokeFactory()
	}

	function h(e) {
		for (var r = Z[e] || [], n = r.length; n--;) {
			var t = r[n];
			t && t()
		}
		r.length = 0, delete Z[e]
	}

	function g(e, r, n) {
		if (f(e)) return r(e), void 0;
		var t = Z[e];
		t || (t = Z[e] = []), n ? t.unshift(r) : t.push(r)
	}

	function m(e) {
		return f(e) ? F[e].exports : null
	}

	function y(e) {
		var r = rr.slice(0);
		rr.length = 0, rr = [], A(r, function(r) {
			a(r.id || e, r.deps, r.factory)
		}), o()
	}

	function b(r, n, t) {
		function i() {
			if (!a) {
				var t = 1;
				A(r, function(e) {
					return er[e] ? void 0 : t = d(e)
				}), t && (a = 1, "function" == typeof n && n.apply(e, v(r, er)))
			}
		}
		if ("string" == typeof r) {
			if (!f(r)) throw new Error('[MODULE_MISS]"' + r + '" is not exists!');
			return m(r)
		}
		var a = 0;
		j(r) && (i(), !a && A(r, function(e) {
			er[e] || (g(e, i, 1), (e.indexOf("!") > 0 ? M : I)(e, t))
		}))
	}

	function I(e) {
		function r() {
			var r = n.readyState;
			("undefined" == typeof r || /^(loaded|complete)$/.test(r)) && (n.onload = n.onreadystatechange = null, n = null, y(e))
		}
		if (!nr[e] && !F[e]) {
			nr[e] = 1;
			var n = document.createElement("script");
			n.setAttribute("data-require-id", e), n.src = w(e + ".js"), n.async = !0, n.readyState ? n.onreadystatechange = r : n.onload = r, T(n)
		}
	}

	function M(e, r) {
		function n(r) {
			o.state = N, o.exports = r || !0, h(e)
		}

		function t(t) {
			var o = r ? F[r].require : C;
			t.load(a.resource, o, n, i.call({
				id: e
			}))
		}
		if (!F[e]) {
			var a = U(e),
				o = {
					id: e,
					state: B
				};
			F[e] = o, n.fromText = function(e, r) {
				new Function(r)(), y(e)
			}, b([a.module], t)
		}
	}

	function x() {
		tr.baseUrl = tr.baseUrl.replace(/\/$/, "") + "/";
		var e = D();
		ir = O(tr.paths), ir.sort(e), or = O(tr.map), or.sort(e), A(or, function(r) {
			var n = r.k;
			r.v = O(r.v), r.v.sort(e), r.reg = "*" === n ? /^/ : $(n)
		}), ar = [], A(tr.packages, function(e) {
			var r = e;
			"string" == typeof e && (r = {
				name: e.split("/")[0],
				location: e,
				main: "main"
			}), r.location = r.location || r.name, r.main = (r.main || "main").replace(/\.js$/i, ""), ar.push(r)
		}), ar.sort(D("name")), sr = O(tr.urlArgs), sr.sort(e)
	}

	function w(e) {
		function r(e) {
			c || (s += (s.indexOf("?") > 0 ? "&" : "?") + e, c = 1)
		}
		var n = /(\.[a-z0-9]+)$/i,
			t = /(\?[^#]*)$/,
			i = "",
			a = e,
			o = "";
		t.test(e) && (o = RegExp.$1, e = e.replace(t, "")), n.test(e) && (i = RegExp.$1, a = e.replace(n, ""));
		var u, s = a;
		A(ir, function(e) {
			var r = e.k;
			return $(r).test(a) ? (s = s.replace(r, e.v), u = 1, !1) : void 0
		}), u || A(ar, function(e) {
			var r = e.name;
			return $(r).test(a) ? (s = s.replace(r, e.location), !1) : void 0
		}), /^([a-z]{2,10}:\/)?\//i.test(s) || (s = tr.baseUrl + s), s += i + o;
		var c;
		return A(sr, function(e) {
			return $(e.k).test(a) ? (r(e.v), !1) : void 0
		}), ur && r(ur), s
	}

	function k(e) {
		function r(r, t) {
			if ("string" == typeof r) {
				var i = n[r];
				return i || (i = n[r] = b(E(r, e))), i
			}
			if (j(r)) {
				var a = [];
				A(r, function(r) {
					var n = U(r);
					n.resource && a.push(E(n.module, e))
				}), b(a, function() {
					var n = [];
					A(r, function(r) {
						n.push(E(r, e))
					}), b(n, t, e)
				}, e)
			}
		}
		var n = {};
		return r.toUrl = function(r) {
			return w(E(r, e))
		}, r
	}

	function E(e, r) {
		if (!e) return "";
		r = r || "";
		var n = U(e);
		if (!n) return e;
		var t = n.resource,
			i = S(n.module, r);
		if (A(ar, function(e) {
			var r = e.name;
			return r === i ? (i = r + "/" + e.main, !1) : void 0
		}), A(or, function(e) {
			return e.reg.test(r) ? (A(e.v, function(e) {
				var r = e.k,
					n = $(r);
				return n.test(i) ? (i = i.replace(r, e.v), !1) : void 0
			}), !1) : void 0
		}), t) {
			var a = m(i);
			t = a.normalize ? a.normalize(t, function(e) {
				return E(e, r)
			}) : E(t, r), i += "!" + t
		}
		return i
	}

	function S(e, r) {
		if (0 === e.indexOf(".")) {
			var n = r.split("/"),
				t = e.split("/"),
				i = n.length - 1,
				a = t.length,
				o = 0,
				u = 0;
			e: for (var s = 0; a > s; s++) {
				var c = t[s];
				switch (c) {
					case "..":
						if (!(i > o)) break e;
						o++, u++;
						break;
					case ".":
						u++;
						break;
					default:
						break e
				}
			}
			return n.length = i - o, t = t.slice(u), n.concat(t).join("/")
		}
		return e
	}

	function q(e) {
		function r(e) {
			0 === e.indexOf(".") && n.push(e)
		}
		var n = [];
		if ("string" == typeof e ? r(e) : A(e, function(e) {
			r(e)
		}), n.length > 0) throw new Error("[REQUIRE_FATAL]Relative ID is not allowed in global require: " + n.join(", "))
	}

	function U(e) {
		var r = e.split("!");
		return dr.test(r[0]) ? {
			module: r[0],
			resource: r[1]
		} : null
	}

	function O(e) {
		var r = [];
		for (var n in e) e.hasOwnProperty(n) && r.push({
			k: n,
			v: e[n]
		});
		return r
	}

	function R() {
		if (cr) return cr;
		if (fr && "interactive" === fr.readyState) return fr;
		for (var e = document.getElementsByTagName("script"), r = e.length; r--;) {
			var n = e[r];
			if ("interactive" === n.readyState) return fr = n, n
		}
	}

	function T(e) {
		cr = e, lr ? vr.insertBefore(e, lr) : vr.appendChild(e), cr = null
	}

	function $(e) {
		return new RegExp("^" + e + "(/|$)")
	}

	function j(e) {
		return e instanceof Array
	}

	function A(e, r) {
		if (j(e))
			for (var n = 0, t = e.length; t > n && r(e[n], n) !== !1; n++);
	}

	function D(e) {
		return e = e || "k",
			function(r, n) {
				var t = r[e],
					i = n[e];
				return "*" === i ? -1 : "*" === t ? 1 : i.length - t.length
			}
	}
	var z, F = {},
		_ = [],
		P = 1,
		B = 2,
		L = 3,
		N = 4,
		C = k();
	r.toUrl = C.toUrl;
	var H;
	t.amd = {};
	var Q = /require\(\s*(['"'])([^'"]+)\1\s*\)/g,
		G = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
		J = 0,
		K = 1,
		V = 2,
		W = 0,
		X = 1,
		Y = 2,
		Z = {},
		er = {
			require: r,
			exports: 1,
			module: 1
		},
		rr = [],
		nr = {},
		tr = {
			baseUrl: "./",
			paths: {},
			config: {},
			map: {},
			packages: [],
			waitSeconds: 0,
			urlArgs: {}
		};
	r.config = function(e) {
		for (var r in tr)
			if (e.hasOwnProperty(r)) {
				var n = e[r],
					t = tr[r];
				if ("urlArgs" === r && "string" == typeof n) ur = n;
				else {
					var i = typeof t;
					if ("string" === i || "number" === i) tr[r] = n;
					else if (j(t)) A(n, function(e) {
						t.push(e)
					});
					else
						for (var r in n) t[r] = n[r]
				}
			}
		x()
	}, x();
	var ir, ar, or, ur, sr, cr, fr, dr = /^[-_a-z0-9\.]+(\/[-_a-z0-9\.]+)*$/i,
		vr = document.getElementsByTagName("head")[0],
		lr = document.getElementsByTagName("base")[0];
	lr && (vr = lr.parentNode), e.define = t, e.require = r
}(this);