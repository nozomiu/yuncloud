define("app/src/explorer/main", ["lib/jquery-lib", "lib/util", "lib/ztree/ztree", "lib/contextMenu/jquery-contextMenu", "lib/artDialog/jquery-artDialog", "../../common/core.tools", "../../common/core.upload", "../../common/core.api", ], function(a, b, c) {
	Config = {
		BodyContent: ".bodymain",
		FileBoxSelector: ".bodymain .file-continer",
		FileBoxClass: ".bodymain .file-continer .file",
		FileBoxClassName: "file",
		FileBoxTittleClass: ".bodymain .file-continer .title",
		SelectClass: ".bodymain .file-continer .file.select",
		SelectClassName: "select",
		TypeFolderClass: "folder-box",
		TypeFileClass: "file-box",
		HoverClassName: "hover",
		TreeId: "folder-list-tree",
		pageApp: "explorer",
		treeAjaxURL: "explorer/treeList&app=explorer",
		AnimateTime: 200
	}, a("lib/jquery-lib"), a("lib/util"), a("lib/ztree/ztree"), a("lib/contextMenu/jquery-contextMenu"), a("lib/artDialog/jquery-artDialog"), TaskTap = a("../../common/taskTap"), core = a("../../common/core"), rightMenu = a("../../common/rightMenu"), ui = a("./ui"), ui.tree = a("../../common/tree"), ui.path = a("../../path/path"), ui.fileLight = a("./fileLight"), ui.fileSelect = a("./fileSelect"), ui.fileListResize = a("./fileListResize"), ui.headerAddress = a("./headerAddress"), ui.options = a("./options");
	$(document).ready(function() {
		function b(a) {
			var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"),
				c = window.location.search.substr(1).match(b);
			return null != c ? unescape(c[2]) : null
		}
		rightMenu.initExplorer(), core.init(), ui.init(), ui.tree.init(), ui.fileLight.init(), ui.fileSelect.init(), ui.headerAddress.init(), TaskTap.init(), ui.fileListResize.init(), ui.fileListResize.initFileSize(), ui.options.init(), $(".init-loading").fadeOut(450).addClass("pop_fadeout"), a.async("lib/webuploader/webuploader-min", function() {
			core.uploadInit()
		}), "fileList" == b("type") && ($(".menu-theme-list").remove(), $(".tools .tools-left").remove(), $(".header-middle").prependTo(".tools").css("padding-top", "3px"), $("#yarnball").addClass("btn-left-radius"))
	})
});;;;;;;
define("app/common/taskTap", [], function(a, b) {
	var c = {},
		d = "",
		e = 160,
		f = function() {
			$(".task-tab .tab").die("mouseenter").live("mouseenter", function(a) {
				$(this).hasClass("this") || $(this).addClass("hover")
			}).die("mouseleave").live("mouseleave", function() {
				$(this).removeClass("hover")
			})
		},
		g = function(a) {
			var b = a.attr("id"),
				c = $.dialog.list[b];
			if (void 0 == c) return void l(b);
			var d = $("." + b);
			"hidden" == d.css("visibility") ? c.display(!0).zIndex() : d.hasClass("aui-state-focus") ? c.display(!1) : c.zIndex()
		},
		h = function() {
			var a, b, c, d, f = !1,
				h = !1,
				i = 0,
				j = 0,
				k = 0,
				l = 0,
				m = 0,
				n = 0;
			$(".task-tab .tab").die("mousedown").live("mousedown", function(b) {
				1 == b.which && (a = $(this), o(b), this.setCapture && this.setCapture(), $(document).mousemove(function(a) {
					p(a)
				}), $(document).one("mouseup", function(b) {
					r(), this.releaseCapture && this.releaseCapture(), Math.abs(b.pageX - i) < 10 && g(a)
				}))
			});
			var o = function(d) {
					f = !0, h = !0, i = d.pageX, $tab_parent = $(".task-tab"), b = $(".task-tab .tab"), $(".tasktab-dragging").remove(), c = a.clone().addClass("tasktab-dragging").prependTo("body"), l = $sizeInt(b.css("margin-right")), m = $tab_parent.width(), n = $tab_parent.get(0).getBoundingClientRect().left, n += $(window).scrollLeft(), j = a.get(0).getBoundingClientRect().left, k = $sizeInt(b.css("width"));
					var e = a.get(0).getBoundingClientRect().top - $sizeInt(a.css("margin-top")),
						g = d.clientX - i + j;
					$("body").prepend("<div class='dragMaskView'></div>"), c.css({
						width: k + "px",
						top: e,
						left: g
					}), a.css("opacity", 0)
				},
				p = function(d) {
					if (h) {
						window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), 0 == f && o(d);
						var e = d.clientX - i + j;
						n > e || e > n + m - k || (c.css("left", e), b.each(function(b) {
							var c = $(this).get(0).getBoundingClientRect().left;
							if (e > c && c + k / 2 + l > e) {
								if (a.attr("id") == $(this).attr("id")) return;
								q($(this).attr("id"), "left")
							}
							if (e > c - k / 2 + l && c > e) {
								if (a.attr("id") == $(this).attr("id")) return;
								q($(this).attr("id"), "right")
							}
						}))
					}
				},
				q = function(c, f) {
					if (!a.is(":animated") || d != c) {
						d = c, a.stop(!0, !0), $(".insertTemp").remove(), b = $(".task-tab .tab");
						var g = a.width(),
							h = $(".task-tab #" + c),
							i = a.clone(!0).insertAfter(a).css({
								"margin-right": "0px",
								border: "none"
							}).addClass("insertTemp");
						"left" == f ? a.after(h).css("width", "0px") : (a.before(h).css("width", "0px"), h.before(i)), a.animate({
							width: g + "px"
						}, e), i.animate({
							width: "0px"
						}, e, function() {
							$(this).remove(), b = $(".task-tab .tab")
						})
					}
				},
				r = function() {
					h = !1, f = !1, startTime = 0, $(".dragMaskView").remove(), void 0 != c && (j = a.get(0).getBoundingClientRect().left, c.animate({
						left: j + "px"
					}, e, function() {
						a.css("opacity", 1), $(this).remove()
					}))
				}
		},
		i = function(a) {
			var b = 110,
				c = b,
				d = b + 12,
				f = $(".task-tab .tab"),
				g = $(".task-tab .tabs").width() - 10,
				h = f.length,
				i = Math.floor(g / d);
			switch (h > i && (c = Math.floor(g / h) - 12), a) {
			case "add":
				$(".task-tab .tabs .this").css("width", "0").animate({
					width: c + "px"
				}, e);
			case "close":
				f.animate({
					width: c + "px"
				}, e);
				break;
			case "resize":
				f.css("width", c + "px")
			}
		},
		j = function(a, b) {
			$(".task-tab").removeClass("hidden");
			var d = b.replace(/<[^>]+>/g, ""),
				e = '<div class="tab menu-taskbar" id="' + a + '" title="' + d + '">' + b + "</div>";
			$(e).insertBefore(".task-tab .last"), i("add"), c[a] = {
				id: a,
				name: name
			}
		},
		k = function(a) {
			$(".task-tab .this").removeClass("this"), $(".task-tab #" + a).addClass("this"), d = a
		},
		l = function(a) {
			$(".task-tab #" + a).animate({
				width: 0
			}, e, function() {
				if ($(".task-tab #" + a).remove(), i("close"), 0 == $(".tabs .tab").length && !core.isApp("desktop")) {
					var b = 31;
					$(".task-tab").animate({
						bottom: "-" + b + "px"
					}, 200, 0, function() {
						$(this).css({
							bottom: "0px"
						}).addClass("hidden")
					})
				}
			}), delete c[a]
		},
		m = function() {
			$('<i class="menu-taskbar"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-taskbar",
				items: {
					"quit-others": {
						name: LNG.close_others,
						className: "quit-others",
						icon: "remove-circle",
						accesskey: "o"
					},
					quit: {
						name: LNG.close,
						className: "quit",
						icon: "remove",
						accesskey: "q"
					}
				},
				callback: function(a, b) {
					var c = b.$trigger.attr("id"),
						d = $.dialog.list[c];
					switch (a) {
					case "quit-others":
						$.each($.dialog.list, function(a, b) {
							c != a && b.close()
						});
						break;
					case "quit":
						d.close()
					}
				}
			})
		},
		n = function() {
			$.contextMenu({
				zIndex: 9999,
				selector: ".task-tab",
				items: {
					closeAll: {
						name: LNG.dialog_close_all,
						icon: "remove-circle",
						accesskey: "q"
					},
					showAll: {
						name: LNG.dialog_display_all,
						icon: "th-large",
						accesskey: "s"
					},
					hideAll: {
						name: LNG.dialog_min_all,
						icon: "remove",
						accesskey: "h"
					}
				},
				callback: function(a, b) {
					var c = b.$trigger.attr("id");
					$.dialog.list[c];
					switch (a) {
					case "showAll":
						$.each($.dialog.list, function(a, b) {
							b.display(!0)
						});
						break;
					case "hideAll":
						$.each($.dialog.list, function(a, b) {
							b.display(!1)
						});
						break;
					case "closeAll":
						$.each($.dialog.list, function(a, b) {
							b.close()
						})
					}
				}
			})
		};
	return {
		add: j,
		focus: k,
		close: l,
		init: function() {
			var a = '<div class="task-tab"><div class="tabs"><div class="last" style="clear:both;"></div></div></div>';
			$(a).appendTo("body"), core.isApp("desktop") || $(".task-tab").addClass("hidden"), $(window).bind("resize", function() {
				i("resize")
			}), f(), m(), n(), h()
		}
	}
});;
!
function($) {
	!
	function($, n, t, i, r, o, e, c, f, a, u, d, v, s, E, h, C, l, p, A, G, g, O, b, I, T, m, J, y, B, K, L, F, k, X, M, _, N, Q, R, H, S, P, D, w, x, V, Y, z, W, U, q, j, Z, $n, nn, tn, rn, on, en, cn, fn, an, un, dn, vn, sn, En, hn, Cn, ln, pn, An, Gn, gn, On, bn, In, Tn, mn, Jn, yn, Bn, Kn, Ln, Fn, kn, Xn, Mn, _n, Nn, Qn, Rn, Hn, Sn, Pn, Dn, wn, xn, Vn, Yn, zn, Wn, Un, qn, jn, Zn, $t, nt, tt, it, rt, ot, et, ct, ft, at, ut, dt, vt, st, Et, ht, Ct, lt, pt, At, Gt, gt, Ot, bt, It, Tt, mt, Jt, yt, Bt, Kt, Lt, Ft, kt, Xt, Mt, _t, Nt, Qt, Rt, Ht, St, Pt, Dt, wt, xt, Vt, Yt, zt, Wt, Ut, qt, jt, Zt, $i, ni, ti, ii, ri, oi, ei, ci, fi, ai, ui, di, vi, si, Ei, hi, Ci, li, pi, Ai, Gi, gi, Oi, bi, Ii, Ti, mi, Ji, yi, Bi, Ki, Li, Fi, ki, Xi, Mi, _i, Ni, Qi, Ri, Hi, Si, Pi, Di, wi, xi, Vi, Yi, zi, Wi, Ui, qi, ji, Zi, $r, nr, tr, ir, rr, or, er, cr, fr, ar, ur, dr, vr, sr, Er, hr, Cr, lr, pr, Ar, Gr, gr, Or, br, Ir, Tr, mr, Jr, yr, Br, Kr, Lr, Fr, kr, Xr, Mr, _r, Nr, Qr, Rr, Hr, Sr, Pr, Dr, wr, xr, Vr, Yr, zr, Wr, Ur, qr, jr, Zr, $o, no, to, io, ro, oo, eo, co, fo, ao, uo, vo, so, Eo, ho, Co, lo, po, Ao, Go, go, Oo, bo, Io, To, mo, Jo, yo, Bo, Ko, Lo, Fo, ko, Xo, Mo, _o, No, Qo, Ro, Ho, So, Po, Do, wo, xo, Vo, Yo, zo, Wo, Uo, qo, jo, Zo, $e, ne, te, ie, re, oe, ee, ce, fe, ae, ue, de, ve, se, Ee, he, Ce, le, pe, Ae, Ge, ge, Oe, be, Ie, Te, me, Je, ye, Be, Ke, Le, Fe, ke, Xe, Me, _e, Ne, Qe, Re, He, Se, Pe, De, we, xe, Ve, Ye, ze, We, Ue, qe, je, Ze, $c, nc, tc, ic, rc, oc, ec, cc, fc, ac, uc, dc, vc, sc, Ec, hc, Cc, lc, pc, Ac, Gc, gc, Oc, bc, Ic, Tc, mc, Jc, yc, Bc, Kc, Lc, Fc, kc, Xc, Mc, _c, Nc, Qc, Rc, Hc, Sc, Pc, Dc, wc, xc, Vc, Yc, zc, Wc, Uc, qc, jc, Zc, $f, nf, tf, rf, of, ef, cf, ff, af, uf, df, vf, sf, Ef, hf, Cf, lf, pf, Af, Gf, gf, Of, bf, If, Tf, mf, Jf, yf, Bf, Kf, Lf, Ff, kf, Xf, Mf, _f, Nf, Qf, Rf, Hf, Sf, Pf, Df, wf, xf, Vf, Yf, zf, Wf, Uf, qf, jf, Zf) {
		$[t](i, [r, o, e, c, f, a, u, d, v, s, E, h, C, l], function(n) {
			$[p] = n(r), $[A] = n(o);
			var t = n(e),
				i = n(c),
				$a = n(f),
				na = n(a),
				ta = n(u);
			n(d), $[G] = n(v), n(s), n(E), n(h), $[g] = function(n) {
				return $[O](n)
			}, $[b] = function(n) {
				return $[I](n)
			};
			var ia = function() {
					$[m][T] = n, $[y][J] || ($[y][J] = function(n, t) {
						$[y][B][n] = t
					}, $[y][K] = function(n, t) {
						$[y][B][L][n] = t
					}), $[y][J](F, !k), $[y][J](X, !M), $[y][K](_, {
						$: $[N],
						window: $[m],
						log: $[R][Q],
						core: $[H],
						pathTools: $[m][S],
						inArray: $[P]
					}), $[y][B][L][S] = $[m][S], $[y][B][F] = !k, D == $[x][w] ? ($[y][B][V] = !k, $[y][B][Y] = !k, $[y][B][z] = !M) : ($[y][B][V] = !M, $[y][B][Y] = !M, $[y][B][z] = !k)
				},
				ra = function() {
					ia(), W != typeof $[x] && (k != $[x][U] && $[N](j)[q](), $[x][U] || $[H][Z]($n) || k == $[H][Z](nn) || $[N](tn)[q](), $[x][rn] && on == $[x][rn][en] && ($[N][fn][B][cn] = !k), oa()), $[N](un)[an](dn, function(n) {
						if (M == $[N](n[En])[sn](hn)[vn]) try {
							$[N][ln][Cn]()
						} catch (n) {}
					}), $[N](pn)[dn](function() {
						$[Gn][An](gn, function(n) {
							$[On] != n && n[N](pn)[bn](dn)
						})
					}), $[N][fn][B][cn] && $[In]([Tn, mn, Jn, yn, Bn, Kn, Ln, Fn], [kn, Xn, Mn, _n]), $[N](Qn)[Nn](Rn, Hn), $[N][Sn]({
						headers: {
							"X-CSRF-TOKEN": $[Dn][Pn](wn)
						}
					}), $[N](xn)[dn](function() {
						var n = $[N](this)[Nn](Vn);
						$[Dn][Yn](Vn, n), $[m][Wn][zn]()
					}), $[N](xn)[Un]({
						padding: qn
					}), $[N](jn + $[Dn][Pn](Vn) + Zn)[Un]({
						background: $t,
						color: nt
					}), $[H][tt](), $[H][rt][it]();
					for (var n = M; n < $[m][ot][vn]; n++) try {
						$[m][ot][n]()
					} catch (t) {
						$[R][et](ct, t)
					}
					$[ft][bn](at), ea()
				},
				oa = function() {
					var n = $[m][Wn],
						t = n[ut] ? dt + n[ut] : gn;
					$[x][vt] = n[st] + Et + n[ht] + t + Ct, $[x][lt] = $[pt]($[x][vt], Ct) + n[Gt][At](gt, gn);
					var i = $[x][Ot][At](gt, gn);
					$[x][vt] + $[bt](i, Ct) != $[x][lt] && ($[x][vt] = $[pt]($[x][lt], i) + Ct), $[x][It] = $[x][lt] + Tt, mt == $[x][yt][Jt] && ($[x][It] = $[x][It][At](Tt, Bt)), $[Dn][Yn](Kt, $[x][vt]), $[Dn][Yn](Lt, $[x][lt]), $[Dn][Yn](Ft, $[x][kt], Xt)
				},
				ea = function() {
					$[Mt]() || n[_t]([Nt, Qt], function() {
						var n = $[N](Rt);
						n[Ht]({
							className: St,
							liveEvents: !M,
							slide: !k,
							alignTo: Pt,
							alignX: Dt,
							alignY: wt,
							showAniDuration: xt,
							hideAniDuration: Vt,
							offsetY: Yt,
							offsetX: zt,
							showTimeout: function() {
								var n = Wt;
								return $[N](this)[Nn](Ut) && (n = $[qt]($[N](this)[Nn](Ut))), n
							},
							content: function() {
								var n = $[N](this)[jt](Zt);
								if ($[N](this)[Nn]($i)) {
									var t = $[N]($[N](this)[Nn]($i));
									n = t[ni](ti) || t[ni](ii) ? t[ri]() : t[un]()
								}
								return n = n ? n : gn, n[At](oi, ei)
							}
						}), $[N](pn)[an](ci, function() {
							$[N](fi)[q](), $[N][ai](ui, di)
						})[an](vi, function() {
							$[N][ai](gn, di)
						}), $[N](Ei)[si](hi, function() {
							$[N](n)[Ht](Ci), $[N](fi)[q]()
						})
					})
				};
			return {
				init: ra,
				serverDwonload: i[li],
				upload: i[pi],
				uploadInit: i[it],
				playSound: na[Ai],
				playSoundFile: na[Gi],
				tools: t,
				api: $a,
				formMake: ta,
				getPathIcon: function(n, t) {
					if (t = void M == t ? gn : t, gi == $[N][Oi](n)) {
						var i = $[bi]($[bi](n), Ct);
						if (n = {}, Ii != i[Ti](M, k) || i[mi](Ct)[vn] > k) return {
							icon: gn,
							name: gn
						};
						n[Ji] = i[yi](Bi), n[Ki] = i[mi](dt)[k]
					}
					var r = {};
					r[$[x][Li]] = {
						icon: Fi,
						name: $[Xi][ki]
					}, r[$[x][Mi]] = {
						icon: _i
					}, r[$[x][Ni]] = {
						icon: Qi
					}, r[$[x][Ri]] = {
						icon: Fi
					}, r[$[x][Hi]] = {
						icon: Si,
						name: $[Xi][Si]
					}, r[$[x][Pi]] = {
						icon: Di,
						name: $[Xi][wi]
					}, r[$[x][xi]] = {
						icon: Vi,
						name: $[Xi][Yi]
					}, r[$[x][zi]] = {
						icon: Wi,
						name: $[Xi][Ui]
					};
					var o = r[n[Ji]];
					return n[Ji] == $[x][Li] && $[x][qi] != n[Ki] ? o = {
						icon: ji,
						name: t
					} : n[Ji] == $[x][Mi] && Zi == n[$r] && (o = {
						icon: _i
					}), void M == o && (o = {
						icon: gn,
						name: gn
					}), void M == o[nr] && (o[nr] = t), o
				},
				isFileView: function() {
					var n = $[x][tr] + ir + $[x][rr];
					return or == n || er == n ? !M : !k
				},
				isSystemPath: function(n) {
					var n = $[bi]($[bi](n), Ct);
					if (void M == n || Ii != n[Ti](M, k) || n[mi](Ct)[vn] > k) return !k;
					var t = n[yi](cr),
						i = [$[x][Li], $[x][Ni], $[x][Hi], $[x][Pi], $[x][xi], $[x][zi]];
					return -k !== $[N][P](t[M], i) ? !M : !k
				},
				pathPre: function(n) {
					if (n = $[bi]($[bi](n), Ct), void M == n || Ii != n[Ti](M, k)) return gn;
					var t = n[yi](fr);
					return t[M]
				},
				contextmenu: function(n) {
					try {
						$[N][ln][Cn]()
					} catch (t) {}
					var t = n || $[m][ar];
					return t ? t && $[N](t[En])[ni](ii) || $[N](t[En])[ni](ti) || $[N](t[En])[ni](ur) || $[N](t[En])[ni](dr) || M != $[N](t[En])[sn](vr)[vn] || M != $[N](t[En])[sn](sr)[vn] || M != $[N](t[En])[sn](Er)[vn] || M != $[N](t[En])[sn](hr)[vn] ? !M : !k : !M
				},
				pathThis: function(n) {
					if (!n || Ct == n) return gn;
					var t = $[pt](this[Cr](n), Ct),
						i = t[lr](Ct),
						r = t[pr](i + k);
					if (M == r[Ar](Gr)) {
						r = $[gr](r[pr](r[Ar](Or)));
						var o = r[mi](Ct);
						r = o[o[vn] - k], gn == r && (r = o[o[vn] - br])
					}
					return r
				},
				pathClear: function($) {
					if (!$) return gn;
					var n = $[At](Ir, Ct);
					return n = n[At](Tr, Ct), n = n[At](mr, Ct)
				},
				pathFather: function(n) {
					var t = $[pt](this[Cr](n), Ct),
						i = t[lr](Ct);
					return t[pr](M, i + k)
				},
				pathExt: function(n) {
					var t = $[bi](n, Ct);
					return -k != t[lr](Ct) && (t = t[pr](t[lr](Ct) + k)), -k != t[lr](ir) ? t[pr](t[lr](ir) + k)[Jr]() : t[Jr]()
				},
				pathUrlEncode: function(n) {
					if (!n) return gn;
					var t = $[yr](n);
					return t = t[At](Br, Ct)
				},
				path2url: function(n, t) {
					if (Kr == n[pr](M, Lr)) return n;
					void M == t && (t = !M);
					var i, r = this[Cr](n);
					return $[x][U] && t && r[Ti](M, $[x][Fr][vn]) == $[x][Fr] ? i = r[Ti](M, $[x][kr][vn]) == $[x][kr] ? $[x][lt] + this[Xr](r[At]($[x][kr], gn)) : $[x][vt] + this[Xr](r[At]($[x][Fr], gn)) : (i = $[x][It] + Mr + $[x][_r] + Or + $[yr](r), W != typeof $[x][Nr] && (i = $[x][It] + Qr + $[x][ji] + Rr + $[x][Hr] + Or + $[yr](r))), i
				},
				pathCommon: function(n) {
					if (Kr == n[pr](M, Lr)) return $[yr](n);
					if (n[pr](M, $[x][Li][vn]) == $[x][Li]) return $[yr](n);
					var t = this[Cr](n),
						i = $[yr](t);
					return W != typeof $[x][Nr] && (i = $[yr]($[x][Li] + dt + $[x][ji] + Ct + $[x][Sr][nr] + t)), i
				},
				isApp: function(n) {
					if (W == typeof $[Pr]) return !k;
					var t = $[Pr][Dr];
					return gi == typeof n ? t == n : $[N][wr](n) && -k !== $[N][P](t, n) ? !M : !k
				},
				pathReadable: function(n) {
					if (xr != typeof $[x][Vr]) return !M;
					for (var t = $[x][Vr][Yr], i = M; i < t[vn]; i++) if (t[i][zr] == n) return void M == t[i][Wr] || k == t[i][Wr] ? !M : !k;
					t = $[x][Vr][Ur];
					for (var i = M; i < t[vn]; i++) if (t[i][zr] == n) return void M == t[i][Wr] || k == t[i][Wr] ? !M : !k;
					return !M
				},
				pathCurrentWriteable: function() {
					return $[H][qr](jr) ? !k : $[x][Vr][Zr] ? $[x][Vr][Zr][$o] : !k
				},
				authCheck: function(n, t) {
					return $[x][U] ? !M : $[to][no](n) && k == $[to][n] ? !M : (t && (t = t === !M ? $[Xi][io] : t, $[oo][ro](t, !k)), !k)
				},
				authCheckGroup: function(n, t) {
					if (t = t || $[x][eo], k == $[x][U] || !$[x][co]) return !M;
					var i = t[yi]($[fo](Ct + $[x][Mi] + ao));
					if (i && br == i[vn] && $[x][co][i[k]]) {
						var r = $[x][co][i[k]];
						if (!r[no](n) || k != r[n]) return !k
					}
					return !M
				},
				ajaxError: function(n) {
					var t = n[uo],
						i = $[N][fn][so][vo];
					return $[oo][Eo]($[Xi][ho], !k), Co == t[pr](M, lo) ? void $[po](function() {
						var n = $[Gn][An]();
						n[Wn][zn]()
					}, Ao) : (M == n[Go] && gn == t && (t = go), t = Oo + t + bo, void(i ? i[Io](t) : $[N][fn]({
						id: vo,
						padding: M,
						width: To,
						height: mo,
						fixed: !M,
						resize: !M,
						ico: $[H][Jo](et),
						title: yo,
						content: t
					})))
				},
				fileGet: function(n, t, i) {
					var r = Bo;
					Kr == n[pr](M, Lr) && (r = Ko);
					var o = $[x][It] + Lo + r + Fo + $[yr](n);
					W != typeof $[x][Nr] && (o = $[x][It] + ko + $[x][ji] + Rr + $[x][Hr] + Xo + r + Fo + $[yr](n)), (n[Mo](Lo) >= M || n[Mo](_o) >= M) && (o = n), $[N][No]({
						url: o,
						dataType: Qo,
						error: function(n, t, r) {
							$[H][Ro](n, t, r), Ho == typeof i && i()
						},
						success: function(n) {
							n[So] && Ho == typeof t && (k == n[jt][Po] && (n[jt][Io] = $[Do](n[jt][Io])), t(n[jt][Io], n, o)), n[So] || Ho == typeof i && i(n[jt])
						}
					})
				},
				fileInfo: function(n, t) {
					var i = $[x][It] + wo;
					W != typeof $[x][Nr] && (i = $[x][It] + xo + $[x][ji] + Rr + $[x][Hr]), $[N][No]({
						url: i,
						type: Vo,
						dataType: Qo,
						data: n,
						error: $[H][Ro],
						success: function($) {
							Ho == typeof t && t($, n)
						}
					})
				},
				fileLink: function(n, t) {
					if (n = this[Cr](n), $[x][U] && n[Ti](M, $[x][Fr][vn]) == $[x][Fr]) {
						var i = $[x][vt] + this[Xr](n[At]($[x][Fr], gn));
						return void(Ho == typeof t && t(i, n))
					}
					var r = Yo + $[yr](n) + zo;
					this[Wo](r, function(i) {
						var r = i[So] ? i[jt][Uo] : !k;
						return r ? void(Ho == typeof t && t(r, n)) : void $[oo][ro]($[Xi][qo] + jo + $[Xi][Zo], !k)
					})
				},
				setting: function(n) {
					void M == n && (n = $[x][U] ? $e : ji);
					var t = ne,
						i = ne;
					$[Mt]() && (t = te, i = te), $[Gn][An](ie) ? $[Gn][An](ie, function(t) {
						t[oe][re](n), $[N][fn][so][ce][ee](!M)
					}) : $[N][fn][fe]($[x][It] + ae + n, {
						id: ce,
						fixed: !M,
						ico: $[H][Jo](ue),
						resize: !M,
						title: $[Xi][ue],
						width: t,
						height: t
					})
				},
				copyright: function() {
					var t = n(C),
						i = $[y][de](t),
						r = $[Gn][An]();
					r[ve][fn]({
						id: se,
						bottom: M,
						right: M,
						simple: !M,
						resize: !k,
						disableTab: !M,
						title: $[Xi][Ee],
						width: he,
						padding: on,
						fixed: !M,
						content: i({
							LNG: $[Xi],
							G: $[x]
						})
					}), r[N](le)[Ce](pe)
				},
				qrcode: function(n, t) {
					Ae == n[pr](M, br) && (n = $[x][It] + n[pr](br));
					var i = $[x][It] + Ge + $[ge]($[yr](n)),
						r = Oe + $[ge](n) + be + n + Ie + i + Te;
					$[N][fn]({
						follow: t,
						fixed: !M,
						resize: !k,
						title: $[Xi][me],
						padding: Je,
						content: r
					})
				},
				appStore: function() {
					var n = $[Gn][An]();
					n[N][fn][fe]($[x][It] + ye, {
						id: Be,
						fixed: !M,
						ico: $[H][Jo](Ke),
						resize: !M,
						title: $[Xi][Be],
						width: Le,
						height: Le
					})
				},
				openWindow: function(n, t, i, r) {
					t = t ? t : $[Xi][ro], i = i ? i : Le, r = r ? r : Fe, $[Mt]() && (i = te, r = te);
					var o = $[Gn][An](),
						e = o[N][fn][fe](n, {
							ico: gn,
							title: t,
							fixed: !M,
							resize: !M,
							width: i,
							height: r
						});
					return e
				},
				openWindowFull: function(n, t) {
					return $[H][ke](n, t, te, te)
				},
				openWindowBig: function(n, t) {
					return $[H][ke](n, t, Xe, Xe)
				},
				openDialog: function(n, t, i, r, o) {
					if (n) {
						void M == r && (r = Me + $[_e]());
						var e = Ne + r + Qe + $[Re](n) + He,
							c = $[Gn][An](),
							f = {
								id: r,
								fixed: !M,
								title: i,
								ico: t,
								width: Le,
								height: Se,
								padding: M,
								content: e,
								resize: !M
							};
						f = $[N][Pe]({}, f, o);
						var a = c[N][fn](f);
						return a
					}
				},
				openApp: function(n) {
					if (De == n[Oi]) {
						var t = n[Jo]; - k == n[Jo][Ar]($[x][we]) && Kr != n[Jo][Ti](M, Lr) && (t = $[x][we] + xe + n[Jo]), Ve != typeof n[Ye] && -k === n[Ye][Ar](ze) && (n[Ye] = $[qt](n[Ye])), Ve != typeof n[We] && -k === n[We][Ar](ze) && (n[We] = $[qt](n[We])), n[Ye] || (n[Ye] = Xe), n[We] || (n[We] = Fe);
						var i = {
							resize: n[Ue],
							fixed: !M,
							ico: $[H][qe](t),
							title: n[nr][At](je, gn),
							width: n[Ye],
							height: n[We],
							simple: n[Ze],
							padding: M
						},
							r = $[Gn][An]();
						$c == $[H][nc](n[Io]) ? (i[Io] = $[H][tc](n[Io]), r[N][fn](i)) : r[N][fn][fe](n[Io], i)
					} else {
						var o = n[Io];
						$[fo](Ii + o + ic)
					}
				},
				update: function() {
					$[po](function() {
						var t = $[Do](rc) + oc + $[_e]();
						n[_t](t, function($) {
							try {
								$[ec](cc)
							} catch (n) {}
						})
					}, Vt)
				},
				openPath: function(n) {
					$[H][qr](fc) ? $[ac][zr][so](n, ro) : $[H][fc](n)
				},
				explorer: function(n, t) {
					void M == n && (n = gn), void M == t && (t = $[H][uc](n));
					var i = $[x][It] + dc + n;
					W != typeof $[x][Nr] && (i = $[x][It] + vc + $[x][ji] + Rr + $[x][Hr] + Or + n);
					var r = $[Gn][An](),
						o = r[N][fn][fe](i, {
							className: sc,
							resize: !M,
							fixed: !M,
							ico: $[H][Jo](Ec),
							title: t,
							width: Le,
							height: Se
						}),
						e = zt * r[N](hc)[vn];
					o[lc][Cc][Un]({
						left: pc + e + Ac,
						top: pc + e + Ac
					})
				},
				explorerCode: function(n) {
					void M == n && (n = gn);
					var t = $[x][It] + Gc + n;
					W != typeof $[x][Nr] && (t = $[x][It] + gc + $[x][ji] + Rr + $[x][Hr] + Oc + n), $[m][fe](t)
				},
				setSkinFinished: function() {
					var n = $[N](bc)[Nn](Ic);
					n && ($[N](Tc)[Nn](mc, n), $[N](bc)[q]())
				},
				setSkin: function(n) {
					$[Jc][Yn](yc, n), $[x][rn][yc] = n;
					var t = $[x][we] + Bc + n + Kc + $[x][Lc];
					t != $[N](Tc)[Nn](mc) && $[N](pn)[Fc](kc + t + Xc), this[tt]()
				},
				setSkinDiy: function() {
					if ($[x][rn]) {
						var t = $[Jc][Pn](yc),
							i = Mc,
							r = $[Jc][_c](i);
						xr != typeof r && xr == typeof $[x][rn][Nc] && (r = $[x][rn][Nc]), xr != typeof r && (r = {
							bgBlur: k,
							bgImage: $[x][we] + Qc,
							bgType: Rc,
							startColor: Hc,
							endColor: Sc,
							colorRotate: Pc
						}, $[Jc][Dc](i, r)), $[x][rn][Nc] = r;
						var o = gn;
						if (wc == t && r) {
							var e = n(l),
								c = $[y][de](e);
							o = c(r)
						}
						$[N][ai](o, i)
					}
				},
				editorFull: function() {
					var n = $[N](xc);
					n[Vc](Yc)
				},
				language: function(n) {
					$[Dn][Yn](Ft, n, Xt), $[m][Wn][zn]()
				},
				fullScreen: function() {
					zc == $[N](pn)[Nn](Wc) && $[H][Uc](), $[N](pn)[Nn](Wc, zc);
					var n = $[Gn][An](),
						t = n[jc][qc];
					t[Zc] ? t[Zc]() : t[$f] ? t[$f]() : t[nf] && t[nf]()
				},
				exitfullScreen: function() {
					$[N](pn)[Nn](Wc, Hn), $[jc][tf] ? $[jc][tf]() : $[jc][rf] ? $[jc][rf]() : $[jc][of] && $[jc][of]()
				},
				createFlash: function(n, t, i) {
					var r = $[_e]();
					(W == typeof i || gn == i) && (i = r);
					var o = gn;
					$[N][cf][ef] && $[qt]($[N][cf][Lc]) < ff && (o = af);
					var e = uf + r + df + o + vf + i + sf + i + Ef + n + hf + n + Cf + t + lf + r + pf;
					return $[po](function() {
						var n = $[N](ir + r);
						if (k != n[vn]) {
							var t = $[Gn][An]();
							n = t[N](ir + r)
						}
						if (k == n[vn]) var i = M,
							o = n[M],
							e = $[Af](function() {
								try {
									i++, Gf == $[Of][gf](o[bf]()) ? (n[If](Tf)[q](), $[mf](e), e = Jf) : i > Gf && (n[If](Tf)[q](), $[mf](e), e = Jf)
								} catch (t) {}
							}, Gf)
					}, yf), e
				},
				userSpaceHtml: function(n) {
					var t = n[mi](Ct),
						i = $[Bf](t[M]),
						r = Kf * $[Bf](t[k]),
						o = $[S][Lf]($[Bf](t[M])),
						e = $[S][Lf](r),
						c = o + Ct,
						f = Gf * i / r;
					f >= Gf && (f = Gf);
					var a = gn;
					return f >= Ff && (a = kf), M == r || $[Xf](r) ? (c += $[Xi][Mf], f = _f) : (c += e, f += ze), c = Nf + a + Qf + f + Rf + c + Hf
				},
				dateTime: function(n) {
					return $[Sf]($[Xi][Pf], n)
				},
				uploadCheckSize: function(n) {
					var t = $[x][Vr][Df] || $[x][Vr][wf];
					return t && M != t[xf] && Vf * t[xf] * Vf * Vf - t[Yf] < n ? !k : !M
				},
				uploadCheck: function(n, t) {
					return t = void M == t ? !M : t, zf == $[x][Nr] ? mt == $[x][Sr][$o] : (void M == n && (n = Wf), !$[x][U] && $[to][no](n) && k != $[to][n] ? (t && $[oo][ro]($[Xi][io], !k), !k) : $[H][Uf](n) ? $[x][Vr] && !$[x][Vr][Zr][$o] ? (t && ($[H][qf]($[x][eo]) ? $[oo][ro]($[Xi][jf], !k) : $[oo][ro]($[Xi][Zf], !k)), !k) : !M : ($[oo][ro]($[Xi][qo], !k), !k))
				}
			}
		})
	}(this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$"), $("/*0)1*2)1,(#/30-1"), $("/*0)1*%,.-4(5$/30-1"), $("/*+,.$/0,,16"), $("/*+,.$/2)1,(#"), $("/*+,.$/()&"), $("/*+,.$/)1(78,2'#"), $("/*+,.$/%,.-4(5$"), $("/*.&9304$'2:;0$'+$"), $("//*())*())<(6$"), $("//*())*$#&0,."), $("//*())*,)$'=&03"), $("//*())*30-1"), $("/*0)1*+,)7.&930/30-1"), $("/*0)1*03$-$>?@/30-1"), $("0)1A)1,(#"), $("0)1B,.-4(5$"), $("5,#C))"), $(")(03D(63:'+,#$"), $("3(63:'+,#$"), $(")(03D(63>$+,#$"), $("3(63>$+,#$"), $(".$E2&.$"), $("F&'#,F"), $("+,'%&9"), $("0$-)1(0$"), $("#$%(2106"), $("3$1)$."), $("&-),.06"), $("$6+()$"), 1, $("+,-).$66"), 0, $("5,#"), $("G"), $("1,9"), $("+,'6,1$"), $("+,.$"), $(")(03H,,16"), $("&'C..(7"), $("I#$J"), $("$'J&.,'-$'0"), $("K"), $("+(+3$"), $("-&'&-&L$"), $("+,-)&1$>$M29"), $("2'#$%&'$#"), $("&6N,,0"), $(".$-,J$"), $("/-$'2O6760$-O6$00&'9"), $("(203P3$+5"), $("6760$-4$-M$./9$0"), $("6760$-K.,2)/9$0"), $("/-$'2O6760$-O9.,2)"), $("26$.P,'%&9"), $("Q"), $("('&-(0$R)$'"), $("('&-(0$"), $("#&(1,9"), $("M&'#"), $("30-1"), $("+1&+5"), $("1$'903"), $(")(.$'06"), $("0(.9$0"), $("/+,'0$;0O-$'2O1&60"), $("3&##$'"), $("+,'0$;04$'2"), $("M,#7"), $("%.(-$H,)"), $("83(.$>(0("), "", $("6$1%"), $("0.&99$."), $("1,(#N&))1$"), $("("), $("M200,'"), $("/.&))1$O&0$-"), $("/+,'0$;0O-$'2O&0$-"), $("S)&+5$."), $("/-$'283(.$<200,'"), $("/-$'2O.$+7+1$OM200,'"), $("/6$+0&,'T/1&60"), $("/#&6(M1$#"), $("/#&6(M1$"), $("/L0.$$"), $("/#&6(M1$O.&))1$"), $("(00."), $("(U&-9"), $("#.(99(M1$"), $("%(16$"), $("(V(;8$02)"), $("9$0"), $("P,,5&$"), $("WOP8NBOHRX:Y"), $("/+,--,'O%,,0$.TZ%,.+$=()["), $("%,.+$=()"), $("6$0"), $(".$1,(#"), $("1,+(0&,'"), $("+66"), $("Q/\\$-TQ/]$-"), $("/+,--,'O%,,0$.TZ%,.+$=()^"), $("["), $("S_\\`M+("), $("S%%%"), $("6$085&'>&7"), $("&'&0"), $("0,,16"), $("5,#N$(#7"), $("$..,."), $("5,#N$(#7T$..,.a"), $("D,,5"), $("5,#N$(#7/$'#"), $("),.0"), $("a"), $("F$MD,60"), $(").,0,+,1"), $("**"), $("3,60'(-$"), $("*"), $("())N,,0"), $(".0.&-"), $(".$)1(+$"), $(")(03'(-$"), $("&'#$;/)3)"), $("())?'#$;"), $("10.&-"), $("())D,60"), $("&'#$;/)3)b"), $("c"), $(")(.(-N$F.&0$"), $("6$00&'96"), $("&'#$;/)3)*"), $("DR8H"), $("CddIDR8H"), $("5,#A6$.e('92(9$"), $("1('9"), 8760, $("&6=()"), $("(67'+"), $("1&M*),6370&)*VE2$.7/),6370&)/V6"), $("1&M*),6370&)*65&'/+66"), $("Z0&01$["), $("),6370&)"), $(")0&)6O65&'"), $("+2.6,."), $(".&930"), $("M,00,-"), 150, 200, 10, 20, 1500, $("0&01$O0&-$,20"), $(")(.6$?'0"), $("#(0("), $("0&01$/),6370&)"), $("0&01$O#(0("), $("&6"), $("&')20"), $("0$;0(.$("), $("J(1"), /\n/g, $("fM.*g"), $("-,26$#,F'"), $("/)0&)6O65&'"), $("6$08071$"), $("M,#7T/)0&)6O65&'h#&6)1(7a','$Ti&-),.0('0jk"), $(")0&)6O0&01$"), $("-,26$2)"), $("1&J$"), $("&')20U0$;0(.$("), $("%,+26"), $("3&#$"), $("6$.J$.>F,'1,(#"), $("2)1,(#"), $(")1(78,2'#"), $(")1(78,2'#B&1$"), $("60.&'9"), $("07)$"), $("0.&-"), $("h"), $("62M60.&'9"), $("6)1&0"), $(")(03H7)$"), $("-(0+3"), /\{.*\}/, $("&#"), $("XR>IA8:NI8DCN:"), $("26$.O6$1%"), $("-7I63(.$"), $("eYK"), $("XR>IKNRAdIdCHD"), $("9.,2)O6$1%O,F'$."), $("XR>IKNRAdI8DCN:"), $("9.,2)O92$60"), $("XR>IA8:NI8:eB"), $("XR>IA8:NIN:P@Pe:"), $(".$+7+1$"), $("XR>IA8:NIBCl"), $("0.$$O%(J"), $("%(J"), $("XR>IKNRAdINRRHI8:eB"), $("9.,2)O6$1%O.,,0"), $("-7I5,#I9.,2)"), $("XR>IKNRAdINRRHICee"), $("9.,2)O.,,0"), $("5,#I9.,2)"), $("26$.?>"), $("26$."), $(",F'$."), $(".,1$"), $("'(-$"), $("8H"), $("/"), $("CPH"), $("63(.$/%&1$"), $("()&/J&$F"), /\{.*\}/, /\{.*\}/, $("$J$'0"), $(")"), $(").$"), $("/+('O.&930O-$'2"), $("/0,)M(."), $("/$#&0OM,#7"), $("/(2&O60(0$O%,+26"), $(")(03P1$(."), $("1(60?'#$;R%"), $("62M60."), $("6$(.+3"), $("%&1$d.,;7"), $("2.1>$+,#$"), $("m)(03^"), 2, /\\/g, /\/+/g, /\.+\//g, $("0,e,F$.P(6$"), $("2.1:'+,#$"), /%2F/g, $("300)"), 4, $("F$MN,,0"), $("M(6&+d(03"), $(")(03A.1:'+,#$"), $("$;)1,.$.*%&1$d.,;7m(++$66H,5$'^"), $("(++$66H,5$'"), $("63(.$d(9$"), $("63(.$*%&1$d.,;7m26$.^"), $("m6&#^"), $("6&#"), $("63(.$?'%,"), $("P,'%&9"), $(")(9$C))"), $("&6C..(7"), $(",MV$+0"), $("V6,'>(0("), $("%&1$e&60"), $(")(03"), $("&6N$(#(M1$"), $("%,1#$.e&60"), $("&6C))"), $("$#&0,."), $("&'%,"), $("+('A)1,(#"), $("3(6RF'd.,)$.07"), $("CAHD"), $("',I)$.-&66&,'"), $("0&)6"), $("H&)6"), $("03&6d(03"), $("(203K.,2)N,1$"), $("$J(1"), $("ano#pq*"), $(".$6),'6$H$;0"), $("(V(;:..,.>&(1,9"), $("1&60"), $("+1,6$"), $("6760$-I$..,."), $("fiOO26$.T1,9&'OOg"), 17, $("6$0H&-$,20"), 500, $("60(026"), $("rstuvwTn'$0aa:NNIPRYY:PH?RYIN:8:Hqxtuyz{fM.*g|", 90, 91, 92, 93, 94, 95, "r", 96, "x", 97, 98, 99, 100, 101, 102, "{", 103, ""), $("f#&JT+1(66^", 104, "(V(;:..,.", 104, "g"), $("f*#&Jg"), $("+,'0$'0"), $(105, "Q", 106, ""), $(107, "Q", 106, ""), $("&+,'"), $("(V(;T$..,."), $("%&1$'(-$"), $("%&1$A.1"), $("$#&0,.*%&1$K$0m"), $("^"), $("63(.$*%&1$K$0m26$.^"), $("m"), $("&'#$;R%"), $("63(.$*%&1$K$0m"), $("(V(;"), $("V6,'"), $("(V(;:..,."), $("%2'+0&,'"), $("+,#$"), $("M(6$", 105, "_"), $("M(6$", 105, "_>$+,#$"), $("$;)1,.$.*)(03?'%,"), $("63(.$*)(03?'%,m26$.^"), $("dR8H"), $("#(0(C..^Zh", 104, "07)$", 104, "a", 104, "%&1$", 104, "U", 104, ")(03", 104, "a", 104, ""), $(104, "k[mJ&$Fd(9$^c"), $("%&1$?'%,"), $("#,F'1,(#d(03"), $("',I)$.-&66&,'I(+0&,'"), $("^^g"), $("9.,2)I.,1$I)(03&'%,"), $("6760$-"), $("`", 107, 106, ""), $("cQQ", 106, ""), $("R)$'6$00&'9I-,#$"), $("6$0K,0,"), $("8$00&'9"), $("#&6)1(7"), $("6$00&'9I-,#$"), $(",)$'"), $("6$00&'9S"), $("6$00&'9"), $("+,-)&1$"), $("(.0"), $("#&(1,9O+,)7.&930"), $("(M,20"), 425, $("(##P1(66"), $("/#&(1,9O+,)7.&930"), $("('&-(0$#O", 108, "QQTL,,-?'"), $("/*"), $("26$.*E.+,#$m2.1^"), $("E2,0$D0-1"), $("f(T3.$%^", 109, ""), $(109, "T6^", 109, ""), $(109, "T0(.9$0^", 109, "IM1('5", 109, "gf&-9T6.+^", 109, ""), $(109, "T6071$^", 109, "M,.#$.ac);T6,1&#TS$$$j", 109, "*gf*(g"), $("E.+,#$"), 30, $("())"), $("())I60,.$"), $("())O60,.$"), $("`Q", 106, ""), $(108, "Q", 106, ""), $(",)$'=&'#,F"), $(110, "Q", 106, ""), $(",)$'>&(1,9"), $("AA?>"), $("f&%.(-$T%.(-$M,.#$.^", 109, "Q", 109, "T'(-$^", 109, "R)$'"), $(109, "T6.+^", 109, ""), $("30-1:'+,#$"), $(109, "T6071$^", 109, "F&#03acQQ", 106, "j3$&930acQQ", 106, "jM,.#$.aQj", 109, "gf*&%.(-$g"), $(108, 107, 106, ""), $("$;0$'#"), $("2.1"), $("60(0&+d(03"), $("&-(9$6*%&1$I&+,'*&+,'I())*"), $("'2-M$."), $("F&#03"), $(106, ""), $("3$&930"), $(".$6&L$"), $("&+,'8.+"), $("/,$;$"), $("6&-)1$"), $("6F%"), $(")(03:;0"), $("+.$(0$B1(63"), $("k"), $("e7", 110, "L#KBQ(=42(\\", 110, "5@\\;J#=", 111, "2@\\", 110, "0e]lF", 112, "KBQ", 112, "8", 110, "0@=12YP", 107, "E+F^^"), $("b(^"), $("0,#,"), $("+3$+5"), $("$;)1,.$."), $("2&"), $(")(03H3&6"), $("$;)1,.$.m07)$^&%.(-$m)(03^"), $("63(.$*%,1#$.m07)$^&%.(-$m26$.^"), $("#&(1,9:;)1,.$."), $("%,1#$."), $("/#&(1,9:;)1,.$."), $("F.()"), $(">R4"), $("p^"), $(");"), $("$#&0,.m).,V$+0^"), $("63(.$*+,#$N$(#m26$.^"), $("m).,V$+0^"), $("/1&'5O03$-$O1,(#$#"), $("6.+"), $("S1&'5O03$-$O6071$"), $("3.$%"), $("e,+(1>(0("), $("03$-$"), $("6071$*65&'*"), $("/+66bJ$.^"), $("J$.6&,'"), $("())$'#"), $("f&-9T6.+^", 104, ""), $(104, "T,'1,(#^", 104, "+,.$/6$085&'B&'&63$#nqj", 104, "T,'$..,.^", 104, "+,.$/6$085&'B&'&63$#nqj", 104, "T+1(66^", 104, "3&##$'T1&'5O03$-$O1,(#$#", 104, "g"), $("5,#8071$>&7"), $("9$0P,'%&9"), $("03$-$>?@"), $("&-(9$6*F(11I)(9$*", 110, "/V)9"), $("+,1,."), $("S_", 107, 105, ""), $("SQQQ"), $("\\QQ"), $("6$0P,'%&9"), $("#&7"), $("&%.(-$Z'(-$^R)$',)$':#&0,.["), $("0,991$P1(66"), $("%.(-$O%2116+.$$'"), $("0.2$"), $("%2118+.$$'"), $("$;&0%2118+.$$'"), $("#,+2-$'0:1$-$'0"), $("#,+2-$'0"), $(".$E2$60B2116+.$$'"), $("-,LN$E2$60B2118+.$$'"), $("F$M5&0N$E2$60B2118+.$$'"), $("$;&0B2116+.$$'"), $("-,LP('+$1B2118+.$$'"), $("F$M5&0P('+$1B2118+.$$'"), $("-6&$"), $("M.,F6$."), 9, $("+1(66&#^", 104, "+16&#a#\\", 108, "+#M", 105, "$O($", 105, "#Occ+%O", 110, 105, "M`O___", 107, 107, "]", 107, "_QQQQ", 104, ""), $("f,MV$+0T07)$^", 104, "())1&+(0&,'*;O63,+5F(J$O%1(63", 104, "T+1(66^", 104, ""), $(104, "T"), $("T'(-$^", 104, ""), $(104, "T&#^", 104, ""), $(104, "T#(0(^", 104, ""), $(104, "TF&#03^", 104, "cQQ", 106, 104, "T3$&930^", 104, "cQQ", 106, 104, "T0(M&'#$;^", 104, "Oc", 104, "Tgf)(.(-T'(-$^", 104, "-,J&$", 104, "TJ(12$^", 104, ""), $(104, "*gf)(.(-T'(-$^", 104, "(11,F%2116+.$$'", 104, "TJ(12$^", 104, "0.2$", 104, "T*gf)(.(-T'(-$^", 104, "(11,F6+.&)0(++$66", 104, "TJ(12$^", 104, "(1F(76", 104, "T*gf)(.(-T'(-$^", 104, "(11,F8+.&)0C++$66", 104, "TJ(12$^", 104, "(1F(76", 104, "T*gf)(.(-T'(-$^", 104, "%1(63J(.6", 104, "TJ(12$^", 104, ""), $(104, "T*gf)(.(-T'(-$^", 104, "F-,#$", 104, "TJ(12$^", 104, "0.('6)(.$'0", 104, "T*gf*,MV$+0gf#&JT+1(66^", 104, "(2&O1,(#&'9", 104, "T&#^", 104, ""), $("I1,(#&'9", 104, "gf6)('g1,(#&'9//f*6)('gf*#&Jg"), $("6$0?'0$.J(1"), 100, $("%1,,."), $("4(03"), $("d$.+$'0e,(#$#"), $("'$;0"), $("/(2&O1,(#&'9"), $("+1$(.?'0$.J(1"), null, 50, $(")(.6$B1,(0"), 1073741824, $("%&1$8&L$"), 80, $("F(.'&'9"), $("&6Y(Y"), $("6)(+$I0&)6I%211"), $("Q", 106, ""), $("f#&JT+1(66^", 109, "6)(+$O&'%,OM(.", 109, "gf#&JT+1(66^", 109, "6)(+$O).,+$66", 109, "gf#&JT+1(66^", 109, "6)(+$O).,+$66O26$T"), $(109, "T6071$^", 109, "F&#03a"), $(109, "gf*#&Jgf*#&Jgf#&JT+1(66^", 109, "6)(+$O&'%,", 109, "g"), $("f*#&Jgf*#&Jg"), $("#(0$"), $("0&-$I07)$"), $("9.,2)8)(+$A6$"), $("26$.8)(+$"), $("6&L$4(;"), 1024, $("6&L$A6$"), $("63(.$"), $("$;)1,.$./%&1$A)1,(#"), $("(203P3$+5K.,2)"), $("&68760$-d(03"), $(")(03I+('I',0I(+0&,'"), $("',I)$.-&66&,'IF.&0$"))
}(function($) {
	var n = function($) {
			return String.fromCharCode($.charCodeAt() - 3)
		};
	return function() {
		for (var t = arguments, i = "", r = 0, o = t.length; o > r; r++) if ("number" == typeof t[r]) i += n($[0].charAt(t[r]));
		else for (var e = 0, c = t[r].length; c > e; e++) i += n($[0].charAt(t[r][e].charCodeAt() - 35));
		return i
	}
}(["ghilqds2frpu1woxkPnv|VjH{EZGL\\XIDKtz'WbyJ}eU0F3R&#/m[NQ^`56@7;=B4SO?A~$>Y)+_.,罔统迡推锜诲／巵釐罱诺聗糾举朽啉戙箤棃柨阵灮墜酐＄%9(8:*<T]"]));;
define("app/common/tpl/upload.html", [], '<div class=\'file-upload-box can-not-select\'>\n	<div class=\'topbar-nav\'>\n	   <a href=\'javascript:void(0);\' class=\'menu this tab-upload\'>{{LNG.upload_local}}</a>\n	   <a href=\'javascript:void(0);\' class=\'menu tab-download\'>{{LNG.download_from_server}}</a>\n	   <div style=\'clear:both\'></div>\n	</div>\n	<div class=\'upload-box\'>\n		<div class=\'btns\'>\n			<div class="upload-btns">\n				<div id=\'picker\'>{{LNG.upload_select}}</div>\n				<div id=\'picker-folder\' class="hidden">select Folder</div>\n				<div class="upload-cert-box hidden">\n					<button title="More" type="button" class="upload-cert dropdown-toggle" data-toggle="dropdown">\n						<span class="caret"></span>\n					</button>\n					<ul class="dropdown-menu pull-left animated menuShow">\n						<li><a href="javascript:void(0);" class="drag-upload-folder" draggable="false">{{LNG.folder}} {{LNG.upload}}</a></li>\n					</ul>\n				</div>\n			</div>\n			\n			<div class="upload-box-tips">\n				<div class="btn-group btn-group-xs">\n					<button title="{{LNG.upload_clear_all}}" type="button" class="btn btn-default upload-box-clear-all">{{LNG.upload_clear_all}}</button>\n					<button title="{{LNG.upload_clear}}" type="button" class="btn btn-default upload-box-clear">{{LNG.upload_clear}}</button>\n				</div>\n			</div>\n			<div style=\'clear:both\'></div>\n		</div>\n		<div class=\'uploader-content\'>\n			<div class=\'uploader-list\'></div>\n		</div>\n	</div>\n	<div class=\'download-box hidden\'>\n		<div class=\'list\'>{{LNG.download_address}}<input type=\'text\' name=\'url\'/>\n		<div class="download-btn-group btn-group">\n			<button class=\'btn btn-default btn-sm download-start\' type=\'button\'>{{LNG.download}}</button>\n			<button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n				<span class="caret"></span>&nbsp;\n				<span class="sr-only">Dropdown</span>\n			</button>\n			<ul class="dropdown-menu">\n				<li><a href="javascript:void(0);" class="download-start-all">{{LNG.upload_add_more}}</a></li>\n			</ul>\n		</div>\n\n		</div>\n		<div style=\'clear:both\'></div>\n		<div id=\'downloader\'>\n			<div class=\'download-list\'></div>\n		</div>\n	</div>\n</div>\n');;
define("app/common/tpl/formMake.html", [], '<div id="{{wrapID}}" class=\'config-box form-box can-select\n	{{if items.formStyle && items.formStyle.className}}{{items.formStyle.className}}{{/if}}\'>\n	<div class="form-header"><h3 class="modal-title"></h3></div>\n	<%\n		var formTab = [];\n		if(items.formStyle && kod.window.$.isArray(items.formStyle.tabs)){\n			formTab = items.formStyle.tabs;\n		}\n	%>\n	{{if formTab}}\n		<ul class="tab-group" role="tablist">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n					<li class="tab-item {{if tabIndex==0}}active{{/if}}">\n						<a href="javascript:void(0);" class="disable-ripple" draggable="false"\n						data-id="{{wrapID}}-{{tabIndex}}">{{tab.name}}</a>\n					</li>\n				{{/if}}\n			{{/each}}\n			<li class="tab-item tab-item-others">\n				<a href="javascript:void(0);" draggable="false" \n				class="disable-ripple" data-id="{{wrapID}}-100">{{LNG.others}}</a>\n			</li>\n		</ul>\n	{{/if}}\n\n	<div class="panel-body can-not-select">\n	{{if formTab}}\n		<div class="tab-content">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n				<div class="tab-pane {{if tabIndex==0}}active{{/if}}" id="{{wrapID}}-{{tabIndex}}"></div>\n				{{/if}}\n			{{/each}}\n			<div class="tab-pane tab-others" id="{{wrapID}}-100"></div>\n		</div>		\n	{{/if}}\n\n	{{each items item key}}\n		<%\n			var tabCurrent = 100;\n			if(formTab){\n				for(var i=0;i<=formTab.length;i++){\n					if( formTab[i] && kod.window.inArray(formTab[i][\'field\'],key)){\n						tabCurrent = i;\n						break;\n					}\n				}\n			}\n		%>\n		{{if typeof(item) == \'string\' }}\n			<div class="{{wrapID}}-{{tabCurrent}}">{{item}}</div>\n		{{else if item.type == "html" || !item.type}}\n			{{if key != \'formStyle\'}}\n				<div class="{{wrapID}}-{{tabCurrent}}">\n					{{if item.value}}{{@item.value}}{{/if}}\n					{{if item.display}}{{@item.display}}{{/if}}\n					{{if item.desc}}{{@item.desc}}{{/if}}\n				</div>\n			{{/if}}\n		{{else}}\n			{{if item.value == undefined }}\n				{{if item.value = \'\'}}{{/if}}\n			{{/if}}\n			<div class="form-row form-{{item.type}} {{wrapID}}-{{tabCurrent}} {{item.className||\'\'}}"\n				data-type="{{item.type}}" \n				data-value="{{item.value}}">\n				<div class="setting-title">\n					{{@item.display}}: {{if item.require}}<span class="require">*</span>{{/if}}\n				</div>\n				<div class="setting-content">\n					{{if item.type == \'input\'}}\n						<input type="text" name="{{key}}" value="{{item.value}}">\n					{{else if item.type == "textarea"}}\n						<textarea name="{{key}}">{{@item.value}}</textarea>\n					{{else if item.type == "password"}}\n						<input type="password" name="{{key}}" value="{{item.value}}">\n					{{else if item.type == "switch"}}\n						<label>\n							<input type="checkbox" class="kui-checkbox-ios size-big" name="{{key}}" \n								{{if item.value==1 }}checked="checked"{{/if}} /><em></em>\n								<i class="desc">&nbsp;{{if item.desc}}{{@item.desc}}{{/if}}</i>\n						</label>\n					{{else if item.type == "radio"}}\n						{{each item.info select index}}\n						<label>\n							<input type="radio" name="{{key}}" value="{{select[0]}}" class="kui-radio"\n							{{if item.value==select[0]}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "checkbox"}}\n						<%\n							var valArrCheckbox = [];\n							if(typeof(item.value) == \'string\'){\n								valArrCheckbox = item.value.split(\',\');\n							}\n						%>\n						{{each item.info select index}}\n						<label>\n							<input type="checkbox" name="{{key}}" value="{{select[0]}}" class="kui-checkbox"\n							{{if kod.window.inArray(valArrCheckbox,select[0])}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "select"}}\n						<select name="{{key}}">\n							{{each item.info select index}}\n							<option value="{{select[0]}}"\n							 {{if item.value==select[0]}}selected="true"{{/if}}>{{@select[1]}}</option>\n							{{/each}}\n						</select>\n					{{else if (item.type == "selectMutil" || item.type == "tags")}}\n						<%\n							var valArrSelect = [];\n							if(typeof(item.value) == \'string\'){\n								valArrSelect = item.value.split(\',\');\n							}\n							if(item.type == \'tags\'){\n								item.info = [];\n								for(var i=0;i<valArrSelect.length;i++)\n								item.info.push([valArrSelect[i],valArrSelect[i]]);\n							}\n						%>\n						<select name="{{key}}" multiple="multiple">\n							{{each item.info select index}}\n								<option value="{{select[0]}}"\n									{{if kod.window.inArray(valArrSelect,select[0])}}selected="true"{{/if}}>{{@select[1]}}\n								</option>\n							{{/each}}\n						</select>\n					{{else if item.type == "number"}}\n						{{if !item.info && (item.info = {from:\'\',to:\'\',step:1}) }}{{/if}}\n						<input type="number" name="{{key}}" value="{{item.value}}" \n							step="{{item.info.step}}" min="{{item.info.from}}" max="{{item.info.to}}"/> \n					{{else if item.type == "slider"}}\n						{{if !item.info && (item.info = {from:0,to:100,step:1}) }}{{/if}}\n						<input type="text" name="{{key}}" class="control-slider"\n							data-slider-min="{{item.info.from}}"\n							data-slider-max="{{item.info.to}}"\n							data-slider-step="{{item.info.step}}"\n							data-slider-value="{{item.value}}"/>\n					{{else if item.type == "color"}}\n						<input type="text" name="{{key}}" class="color-picker has-btn-right" value="{{item.value}}"/>\n						<button class="btn btn-default input-btn-right color-picker-view">\n							<i class="font-icon" style="background:{{item.value}}"></i>\n						</button>\n					{{else if item.type == "dateTime"}}\n						<input type="text" name="{{key}}" class="has-btn-right" \n							value="{{item.value}}" data-format="{{item.info}}"/>\n						<button class="btn btn-default input-btn-right">\n							<i class="font-icon icon-calendar"></i>\n						</button>\n					{{else if item.type == "fileSelect"}}\n						<input type="text" name="{{key}}" value="{{item.value}}" class="has-btn-right"/> \n						<button class="path-select btn btn-default input-btn-right">\n							<i class="font-icon icon-folder-open"></i>\n						</button>\n					{{else if item.type == "userSelect"}}\n						<% \n							var valueArr = {"all":"0","user":"","group":"","role":""};\n							if(typeof(item.value) == \'string\'){\n								userTypeArr = item.value.split(\';\');\n								for(var i = 0;i<userTypeArr.length;i++){\n									var splitArr = userTypeArr[i].split(\':\');\n									if(splitArr.length == 2){\n										valueArr[splitArr[0]] = splitArr[1];\n									}\n								}\n								if(!valueArr.user && !valueArr.group && !valueArr.role){\n									valueArr.all = \'1\';\n								}\n							}\n						%>\n						<input type="hidden" name="{{key}}" value="{{item.value}}"/>\n						<div class="btn-group btn-group-sm" data-json=\'{{kod.window.jsonEncode(valueArr)}}\'\n							{{if !item.info || item.info.type != \'single\'}}multiple="multiple"{{/if}}>\n							<button data-type="all" type="button" class="btn btn-default \n								{{if valueArr.all == "1"}}btn-active{{/if}}">{{LNG[\'Plugin.config.authAll\']}}</button>\n							<button data-type="user" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.user}}btn-active{{/if}}">{{LNG[\'Plugin.config.authUser\']}}</button>\n							<button data-type="group" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.group}}btn-active{{/if}}">{{LNG[\'Plugin.config.authGroup\']}}</button>\n							<button data-type="role" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.role}}btn-active{{/if}}">{{LNG[\'Plugin.config.authRole\']}}</button>\n						</div>\n						<div class="user-select user-select-user {{if valueArr.all == "1" || !valueArr.user}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.user}}</div>\n							<select data-value="{{valueArr.user}}" data-server="user"\n								{{if !item.info || item.info.user != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-group {{if valueArr.all == "1" || !valueArr.group}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.group}}</div>\n							<select data-value="{{valueArr.group}}" data-server="group"\n								{{if !item.info || item.info.group != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-role {{if valueArr.all == "1" || !valueArr.role}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.system_member_role}}</div>\n							<select data-value="{{valueArr.role}}" data-server="role"\n								{{if !item.info || item.info.role != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n					{{else if item.type == "group"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="group"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "role"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="role"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "user"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="user"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{/if}}\n\n					{{if item.type == "switch"}}\n					{{else if !item.desc}}\n						<!-- 注释 -->\n						<i class="desc">&nbsp;</i>\n					{{else if kod.inArray([\'userSelect\'],item.type)}}\n						<div class="desc">{{@item.desc}}</div>\n					{{else}}\n						<i class="desc">{{@item.desc}}</i>\n					{{/if}}\n				</div>\n				<div class="clear"></div>\n			</div>\n		{{/if}}\n	{{/each}}\n	</div>\n</div>');;
!
function($) {
	!
	function($, n, r, t, o, c, i, f, u, a, A, e, J, p, d, v, G, X, h, C, q, s, N, O, Q, S, l, R, V, b, F, M, g, m, y, D, P, _, T, Y, k, B, H, L, W, j, E, I, K, Z, w, x, U, z, $n, nn, rn, tn, on, cn, fn, un, an, An, en, Jn, pn, dn, vn, Gn, Xn, hn, Cn, qn, sn, Nn, On, Qn, Sn, ln, Rn, Vn, bn, Fn, Mn, gn, mn, yn, Dn, Pn, _n, Tn, Yn, kn, Bn, Hn, Ln, Wn, jn, En, In, Kn, Zn, wn, xn, Un, zn, $r, nr, rr, tr, or, cr, ir, fr, ur, ar, Ar, er, Jr, pr, dr, vr, Gr, Xr, hr, Cr, qr, sr, Nr, Or, Qr, Sr, lr, Rr, Vr, br, Fr, Mr, gr, mr, yr, Dr, Pr, _r) {
		$[r](t, [], function(n) {
			var r = o,
				t = function() {
					var n = $[c](i);
					f != $[a][u], $[A](n), $[J][e](n, !p), $[v](G)[d](), $[X](function() {
						$[J][h](n, !p), $[s][q][C] = r
					}, N * $[O](Q, S))
				},
				Tr = function() {
					var r = l;
					$[X](function() {
						if (!$[s][R] || V == typeof $[b]) {
							var r = F + $[M]();
							n[g](r, function(n) {
								$[s][R] = !m;
								try {
									n[y]()
								} catch (r) {}
							})
						}
					}, N * $[O](D, Q)), $[a][P] = $[_]($[a][P][k](B)[Y]()[T](B));
					var t = $[L][H]($[a][P], W);
					r = t[j](D, p), t && E == t[I] || (r = l);
					var o = $[_]($[a][K]);
					o = o[k](B)[Y]()[T](B), o = $[L][H](o, Z);
					var c = o[j](w, p);
					return $[a][K] = $[L][H](o[j](x), o[j](m, w)), c == r && $[a][K] && U == $[a][K][I] || ($[v][z]($n), r = l), -p === $[v][nn](r, [l, rn, tn, on, cn, fn, un]) && (r = l), r
				},
				Yr = l;
			try {
				Yr = Tr()
			} catch (kr) {}
			var Br = an,
				Hr = An,
				Lr = function() {
					if ($[Jn][en](pn) && l == Yr) for (var n = [$[vn][dn], $[vn][Gn], $[vn][Xn], $[vn][hn], $[vn][Cn], $[v](sn)[qn]()], r = m; r < n[I]; r++) {
						n[r] || (n[r] = B);
						var o = n[r][Nn]();
						if (-p == o[On](Br) && -p == o[On](Hr)) {
							$[X](function() {
								t()
							}, $[O](Qn, Sn));
							break
						}
					}
				},
				Wr = function() {
					var n = {
						A: ln,
						O: Rn,
						P: Vn,
						Q: bn,
						R: Fn,
						S: Mn,
						T: gn
					},
						t = mn + n[Yr],
						o = yn + t + Dn + $[vn][t] + Pn;
					l == Yr && $[v](o)[_n](Tn), $[v](Bn)[kn](Hn)[Yn](Hn, function() {
						if (Ln == $[v](this)[Wn](jn)) {
							var n = $[Jn][En]($[Jn][In]),
								t = Kn + r + Zn;
							n[zn][Un][xn]($r)[wn](t)
						} else $[J][h]($[v](this)[nr]())
					}), $[v](Bn)[rr](function() {
						$[s][tr][q][C] = r
					})
				},
				jr = function() {
					l == Yr && $[v](cr)[or](ir), -p !== $[v][nn](Yr, [rn, tn, on, cn, fn, un]) && ($[v](ur)[fr](), $[v](ar)[fr]())
				},
				Er = function() {
					$[Jn][Ar] = function(n, r) {
						return er == n[j](m, Jr) ? $[Jn][pr](n) : dr + n + (r ? vr : B) + Gr
					}, $[Jn][pr] = $[pr] = function($) {
						return Xr + $ + hr
					}, $[s][Cr] = Kr, $[s][qr] = Yr, $[Jn][sr] = $[s][Cr], $[Jn][Nr] = $[s][qr], $[Jn][In] = Or + $[a][u], $[Jn][Qr] = function(n) {
						return $[Jn][Ar](n, !m)
					}, $[X](function() {
						var r = F + $[M]();
						n[g](r, function(n) {
							$[s][R] = !m;
							try {
								n[y]()
							} catch (r) {}
						})
					}, Sr), Lr(), Wr(), jr()
				},
				Ir = function($) {
					return l == Yr && -p == $[Nn]()[On](Br) ? (t(), !p) : !m
				},
				Kr = function(n, r) {
					$[s][lr] = {
						A: p,
						O: Rr,
						P: Vr,
						Q: br,
						R: Fr,
						S: N,
						T: N
					}, $[s][Mr] = {
						A: Rr,
						O: gr,
						P: mr,
						Q: yr,
						R: Dr,
						S: N,
						T: N
					};
					var t, o, c = $[s][lr],
						i = $[s][Mr],
						f = [],
						u = p;
					if (Pr == r ? (t = n[_r], o = c[Yr]) : (t = n[_r], o = i[Yr]), N == o) f = t;
					else for (var a in t) {
						if (u > o) break;
						f[a] = t[a], u++
					}
					return f
				},
				Zr = {
					init: Er,
					about: Ir
				};
			return Zr
		})
	}(this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$/0,,12"), $("/*342$.*5$.2&,'6'20(11"), $("7(278$+,#$"), $("9:;-<=>:?@&50A(B?5A((C7$&DE4FAG.4(H4$$I&@(#JK51),?-'6')'68,),D,.L%,J=C'2L5,0:MN4G8556O1GBO)G8).G;PQG>RS=TUV+F<QG;WA+"), $("K7XYZ"), $("1('J"), $(">"), $("(1$.0"), $("1,(#&'J"), $("C&)2"), 1, $("7&#$"), $("["), $("\\-$22(J$C&)2]/0&)2A+1,2$^\\-$22(J$C&)2]&-J"), $("2$0C&-$,40"), $("0&)2"), $("7.$%"), $("1,+(0&,'"), $("_&'#,_"), 1e3, $(".,4'#O.,-C,"), 30, 60, $("`"), $("(<#abM+LMWba%#RS9GMG9"), $("4'#$%&'$#"), $("0)18&(1,JD0-1"), $("**20(0&+/N,#+1,4#/+,-*4)#(0$*-(&'a/Q235c"), $("0&-$O1,(0"), $("(2d'+"), 0, $("0,#,"), 10, $("5$.2&,'D(27"), $("G(2$9a8$+,#$"), $("Q,&'"), $(".$5$.2$"), $("2)1&0"), "", $("#$+,#$"), $("(407Y.d)0"), $("e#%EfXghijiklARW"), $("24G20."), 27, $("1$'J07"), $("5$.2&,'D(27H2$."), $("%Ma;jhil:IOF8R%#Q5"), 16, 17, 32, $("J$0"), $("/*&'#$V/)7)342$.*5$.2&,'6'20(11h.$2$0cS"), $("&'`..(d"), $("@"), $("m"), $("n"), $("P"), $("F"), $("C"), $("N,#$V)1,.$."), $("N,#+1,4#"), $("&2`))"), $("+,.$"), $("$V)1,.$."), $("N,#A),_$.AGd"), $("?Z>"), $("+,)d.&J70A).$"), $("+,)d.&J70A+,'0(+0"), $("+,)d.&J70A#$2+"), $("+,)d.&J70A&'%,"), $("70-1"), $("/+,--,'X%,,0$."), $("0,?,_$.Y(2$"), $("2$(.+7"), 300, 5e3, $("%.$$"), $("S"), $(";"), $("M"), $("a"), $("<"), $("9"), $("5$.2&,'A5&)A"), $("o2)(']+1(22cp5$.2&,'X5&)p]&#cp"), $("pqo&]+1(22cp%,'0X&+,']&+,'XN$dpqo*&q"), $("o*2)('q"), $("&'2$.0`%0$."), $("/-$'4X2d20$-X(G,40"), $("1&5$"), $("#&$"), $("/5$.2&,'X5&)"), $("+1&+N"), $("5$.2&,'A5&)A%.$$"), $("(00."), $("&#"), $(",)$'B&'#,_"), $("5$.2&,'H)#(0$r&)"), $("o#&5]+1(22cp5$.2&,'X1&+$'2$pqo(]+1(22cp1&'$p]7.$%cp"), $("pqstuvo*(qo*#&5q"), $("())$'#"), $("%&'#"), $("_.()"), $("8@w"), $("/(4&X+,'0$'0"), $("0$V0"), $("1,'Jm.$22"), $("0,)"), $("(##Y1(22"), $("G,#d"), $("24)),.0X2)(+$X',0"), $(".$-,5$"), $("/-$'4X2d20$-X(G,40^/-$'4X1$%0]\\(G,40"), $("\\).,J.(-2]/2$00&'JA(G,40^\\).,J.(-2]/2$00&'JA7,-$)(J$^\\).,J.(-2]/7,-$A)(J$"), $("&+,'"), $("700)"), 4, $("&+,'F.+"), $("o&]+1(22cpVX&0$-X%&1$]VX"), $("]2-(11"), $("pqo*&q"), $("o&-J]2.+cp"), $("p]#.(JJ(G1$cp%(12$p],'#.(J20(.0cp.$04.']%(12$xpq"), $("+,.$A0,,12A2d20$-8(0("), $("+,.$A0,,12A5$.2&,'Cd)$"), $("2d20$-8(0("), $("5$.2&,'Cd)$"), $("**N,#+1,4#/+,-*G4d/70-1\\"), $("&+,'F-(11"), 2e3, $("+,.$A0,,12AJ.,4)?&-&0"), 5, 20, 40, 100, $("+,.$A0,,12A-$-G$.?&-&0"), 15, 50, 150, 500, $("J.,4)"), $("#(0("))
}(function($) {
	var n = function($) {
			return String.fromCharCode($.charCodeAt() - 3)
		};
	return function() {
		for (var r = arguments, t = "", o = 0, c = r.length; c > o; o++) if ("number" == typeof r[o]) t += n($[0].charAt(r[o]));
		else for (var i = 0, f = r[o].length; f > i; i++) t += n($[0].charAt(r[o][i].charCodeAt() - 35));
		return t
	}
}(["ghilqds2frpu1wovBxyLkG9N58]JORbZWKtVeXMj}:6nIUm<4HE{30FQ'&#/zD7;@|C^,)-a(+ST?%AY濃派掋杆P>"]));;
!
function($) {
	!
	function($, n, i, t, c, r, o, e, u, f, d, E, v, s, C, G, A, h, b, l, p, K, L, B, k, J, X, m, _, y, O, I, g, H, N, D, T, Q, F, R, S, U, w, x, W, P, q, V, M, Y, z, Z, j, $n, nn, tn, cn, rn, on, en, un, an, fn, dn, En, vn, sn, Cn, Gn, An, hn, bn, ln, pn, Kn, Ln, Bn, kn, Jn, Xn, mn, _n, yn, On, In, gn, Hn, Nn, Dn, Tn, Qn, Fn, Rn, Sn, Un, wn, xn, Wn, Pn, qn, Vn, Mn, Yn, zn, Zn, jn, $i, ni, ii, ti, ci, ri, oi, ei, ui, ai, fi, di, Ei, vi, si, Ci, Gi, Ai, hi, bi, li, pi, Ki, Li, Bi, ki, Ji, Xi, mi, _i, yi, Oi, Ii, gi, Hi, Ni, Di, Ti, Qi, Fi, Ri, Si, Ui, wi, xi, Wi, Pi, qi, Vi, Mi, Yi, zi, Zi, ji, $t, nt, it, tt, ct, rt, ot, et, ut, at, ft, dt, Et, vt, st, Ct, Gt, At, ht, bt, lt, pt, Kt, Lt, Bt, kt, Jt, Xt, mt, _t, yt, Ot, It, gt, Ht, Nt, Dt, Tt, Qt, Ft, Rt, St, Ut, wt, xt, Wt, Pt, qt, Vt, Mt, Yt, zt, Zt, jt, $c, nc, ic, tc, cc, rc, oc, ec, uc, ac, fc, dc, Ec, vc, sc, Cc, Gc, Ac, hc, bc, lc, pc, Kc, Lc, Bc, kc, Jc, Xc, mc, _c, yc, Oc, Ic, gc, Hc, Nc, Dc, Tc, Qc, Fc, Rc, Sc, Uc, wc, xc, Wc, Pc, qc, Vc, Mc, Yc, zc, Zc, jc, $r, nr, ir, tr, cr, rr, or, er, ur, ar, fr, dr, Er, vr, sr, Cr, Gr, Ar, hr, br, lr, pr, Kr, Lr, Br, kr, Jr, Xr, mr, _r, yr, Or, Ir, gr, Hr, Nr, Dr, Tr, Qr, Fr, Rr, Sr, Ur, wr, xr, Wr, Pr, qr, Vr, Mr, Yr, zr, Zr, jr, $o, no, io, to, co, ro, oo, eo, uo, ao, fo, Eo, vo, so, Co, Go, Ao, ho, bo, lo, po, Ko, Lo, Bo, ko, Jo, Xo, mo, _o, yo, Oo, Io, go, Ho, No, Do, To) {
		$[i](t, [], function(n) {
			var i = function() {
					var n = $[r][c] + o;
					return e == $[r][u] && f == $[r][E][d] && (n = $[r][c] + v + $[r][s] + C + $[r][G]), n
				};
			$[h]($[b])[A](function() {
				$[p][l] = function() {
					return $[h](L)[K] > B ? $[J][k] + X : void B
				}
			});
			var t = B,
				Qo = B;
			return m == $[r][_] || y == $[r][_] ? ($[J][O] = I, $[J][g] = H, $[J][N] = D) : ($[J][O] = T, $[J][g] = Q, $[J][N] = F), {
				serverDwonload: function(n, i) {
					if (!$[S][R](U)) return !w;
					var t = $[h](x),
						o = t[W](P);
					if (t[W](V)[q](M), !n) return void $[z][Y]($[J][Z], !w);
					if (e == $[r][u]) return void $[z][Y]($[J][j], !w);
					$n != n[nn](B, tn) && cn != n[nn](B, rn) && (n = on + n);
					var f = $[en](),
						d = un + f + an + n + fn + $[S][dn](n) + En + $[J][vn] + sn;
					o[W](Cn)[K] > B ? $[h](d)[Gn](o[W](An)) : o[hn](d);
					var E, v, s, C = B,
						G = $[h](bn + f),
						A = $[h](bn + f + Kn)[pn]($[J][Ln])[ln](Bn),
						b = $[h](Jn)[kn](bn + f)[W](Xn);
					$[h](bn + f + _n)[mn](yn, function() {
						$[On](E), E = !w, $[In](v), v = !w, $[h][gn]($[r][c] + Hn + f), $[h](this)[Dn]()[Dn]()[Nn](function() {
							$[h](this)[Tn](), $[Fn][Qn]()
						})
					});
					var l, p = function(n) {
							$[In](l), l = !w, l = $[Rn](function() {
								$[Fn][Sn](function() {
									$[Fn][wn][Un](n)
								})
							}, xn)
						},
						L = function() {
							$[h][Wn]({
								url: $[r][c] + Pn + i + qn + $[Vn](n) + Mn + f + Yn + $[zn](),
								dataType: Zn,
								error: function(n, i, t) {
									var c = G[jn]($i);
									return xn != a[ni] && c && c[ii] ? void $[Rn](function() {
										L()
									}, ti) : ($[S][ci](n, i, t), void(xn == a[ni] && ($[On](E), E = !w, $[In](v), v = !w, b[Dn]()[Tn](), A[ri](Bn)[ln](oi)[pn]($[J][ei]))))
								},
								success: function(n) {
									return B == n[ui] && ai == n[jn] ? void $[Rn](function() {
										L()
									}, ti) : (n[ui] ? (p(n[fi]), A[ri](Bn)[pn]($[J][di]), $[h](bn + f + Ei)[pn]($[S][dn](n[fi])), $[h](bn + f + Ei)[vi](si, n[fi]), A[Dn]()[Dn]()[ln](Ci)) : (A[ri](Bn)[ln](oi)[pn](n[jn]), A[Dn]()[Dn]()[ln](oi)), $[On](E), E = !w, $[In](v), v = !w, void b[Dn]()[Tn]())
								}
							})
						};
					L();
					var k = function() {
							$[h][Wn]({
								url: $[r][c] + Gi + f,
								dataType: Zn,
								success: function(n) {
									var i = M,
										t = n[jn];
									if (E) {
										if (!n[ui]) return void A[pn]($[J][Ai]);
										if (t) {
											if (t[hi] = $[bi](t[hi]), t[zn] = $[bi](t[zn]), s) {
												var c = t[hi] - s[hi],
													r = c / (t[zn] - s[zn]);
												if (C > li * r) {
													var o = C;
													C = r, r = o
												} else C = r;
												var e = $[Ki][pi](r);
												e = e ? e : B, i = e + Li
											}
											if (G[jn]($i, t), B == t[K]) G[W](Xn)[Bi](ki, Ji), A[pn](i), G[W](Xi)[pn]($[Ki][pi](t[hi]));
											else {
												var u = t[hi] / t[K] * mi;
												G[W](Xn)[Bi](ki, u + _i), A[pn](u[yi](w) + Oi + i + Ii), G[W](Xi)[pn]($[Ki][pi](t[K]))
											}
											G[W](gi)[pn](t[Hi]), s = t
										}
									}
								}
							})
						};
					v = $[Rn](function() {
						k(), E = $[Ni](function() {
							k()
						}, ti)
					}, mi)
				},
				upload: function() {
					$[h](Ti)[Di]();
					var n = i();
					if ($[Fi][Qi](Ri, n), $[Fi][Qi](Si, Ui), B != $[h](Ti)[K]) return void $[h][Wi][xi][Pi][wi](!B);
					var t = $[Vi][qi]($[Mi]);
					$[h][Wi]({
						padding: Yi,
						width: zi,
						height: Zi,
						disableTab: !B,
						resize: !B,
						ico: $[S][ji]($t),
						id: Pi,
						fixed: !B,
						title: $[J][nt],
						content: t({
							LNG: $[J]
						})
					}), $[h](Ti)[W](tt)[it](), $[h](ct)[mn](yn, function(n) {
						$[h](rt)[yn]();
						var i = $[h][Wi][xi][Pi];
						i && i[wi](!w), $[ot](n)
					}), $[h](ut)[et](yn)[mn](yn, function() {
						$[h](this)[at](ft) ? ($[h](dt)[ln](Et), $[h](vt)[ri](Et), $[h](st)[ri](Ct), $[h](Gt)[ln](Ct)) : ($[h](dt)[ri](Et), $[h](vt)[ln](Et), $[h](st)[ln](Ct), $[h](Gt)[ri](Ct))
					}), $[h](ht)[At](function() {
						$[S][bt]($[h](lt)[q](), $[r][pt])
					}), $[h](Kt)[et](yn)[mn](yn, function() {
						$[S][bt]($[h](lt)[q](), $[r][pt])
					}), $[h](Lt)[et](yn)[mn](yn, function() {
						$[h][Wi]({
							id: Bt,
							fixed: !B,
							resize: !w,
							ico: $[S][ji]($t),
							width: kt,
							height: Jt,
							padding: Xt,
							title: $[J][mt],
							content: _t,
							ok: function() {
								for (var n = $[h](Ot)[q]()[yt](It), i = B; i < n[K]; i++) $[S][bt](n[i], $[r][pt])
							}
						})
					}), $[Fi][gt]({
						id: Ht
					}), $[Fi][gt]({
						id: Nt
					}), $[h][Dt]() && ($[h](Tt)[ri](Ct), $[h](Qt)[et](yn)[mn](yn, function() {
						$[h](Ft)[vi](Rt, M)[vi](St, M), $[h](Ut)[yn]()
					}))
				},
				init: function() {
					$[p][wt] = $[Wt][xt], $[Rn](function() {
						if (!$[p][Pt] || qt == typeof $[Vt]) {
							var i = Mt + $[Yt]();
							n[zt](i, function(n) {
								$[p][Pt] = !B;
								try {
									n[Zt](jt)
								} catch (i) {}
							})
						}
					}, ti * $[$c](Xt, nc));
					var i = $[p][wt];
					$[p][Fi] = i({
						swf: $[r][ic] + tc,
						dnd: cc,
						threads: $[r][oc][rc],
						sendAsBinary: $[r][oc][ec],
						chunkSize: $[r][oc][uc],
						chunked: !B,
						timeout: ac,
						compress: !w,
						resize: !w,
						prepareNextFile: !B,
						duplicate: !B,
						chunkRetry: Xt
					}), $[h](Ec)[dc](yn)[fc](yn, function() {
						var n = $[h](this)[W](vc)[vi](sc);
						n && ($[S][Cc](Gc) ? $[Fn][wn][xi]($[S][Ac](n), Y, function() {
							$[Fn][wn][Un](n)
						}) : $[S][Gc]($[S][Ac](n)))
					}), $[h](hc)[dc](yn)[fc](yn, function(n) {
						var i = $[h](this)[Dn]()[W](vc)[vi](sc);
						$[lc][bc](i), $[ot](n)
					}), $[h](rt)[dc](yn)[fc](yn, function() {
						$[h](pc)[Tn](), Qo = B, t = $[h](Kc)[K], o()
					}), $[h](Lc)[dc](yn)[fc](yn, function() {
						$[h][Bc]($[Fi][kc](), function(n, i) {
							$[Fi][Jc](i), $[Fi][Xc](i)
						}), $[h](Kc)[Bc](function() {
							$[h](this)[Tn]()
						}), $[Fi][mc](), Qo = B, t = B, o()
					}), $[h](_c)[dc](yn)[fc](yn, function() {
						var n = $[h](this)[yc](Cn),
							i = n[jn](Oc);
						n[ri](oi)[W](Ic)[ri](oi), n[W](gc)[Di](), n[Hc](), i && $[Fi][Nc](i)
					}), $[h](Dc)[dc](yn)[fc](yn, function(n) {
						var i = $[h](this)[Dn]()[Dn](),
							c = i[jn](Oc);
						i[Nn](function() {
							$[h](this)[Tn]()
						}), c && ($[Fi][Jc](c), $[Fi][Xc](c, !B), t -= w, o()), $[ot](n)
					});
					var c, o = function() {
							$[h](Tc)[pn]($[J][Qc] + Fc + Qo + Rc + t), $[Sc][mc]()
						},
						a = Uc,
						f = B,
						d = function(n, i) {
							if ($[Yt]() - f <= wc) return a;
							f = $[Yt]();
							var t = n[hi] * i,
								c = Yi;
							qt == typeof n[xc] ? n[xc] = [
								[$[Yt]() - Wc, B],
								[$[Yt](), t]
							] : n[xc][K] <= c ? n[xc][Pc]([$[Yt](), t]) : (n[xc] = n[xc][qc](w, c), n[xc][Pc]([$[Yt](), t]));
							var r = n[xc][n[xc][K] - w],
								o = n[xc][B],
								e = (r[w] - o[w]) / (r[B] - o[B]);
							B >= e && (e = B);
							var u = $[Ki][pi](e);
							return u = u ? u : B, e = u + Li, a = e, e
						},
						E = [],
						v = function(n) {
							$[In](c), c = !w, c = $[Rn](function() {
								var i = E;
								$[Fn][Sn](function() {
									if ($[Fn][wn][Un](i), n && (E = [], $[S][Cc](Gc))) {
										if (e == $[r][u]) return;
										$[Fn][Mc][Vc]($[r][pt])
									}
								})
							}, Yc)
						},
						s = B,
						C = zc,
						G = [];
					$[Fi][Zc](jc, function(n) {
						return s++, s >= C ? (s == C && ($[Rn](function() {
							$[h][nr][$r]($[J][ir] + tr + $[J][N])
						}, cr), $[Fi][rr]()), !w) : void G[Pc](n[or])
					})[Zc](er, function() {
						if (s >= C) for (var n = B; n < G[K]; n++) $[h](bn + G[n] + _n)[yn]();
						s = B, G = []
					})[Zc](ur, function(n) {
						if ($[h](Ti)[Di](), !$[S][R]()) return $[Fi][Jc](n), void $[Fi][Xc](n);
						var i;
						try {
							i = n[fr][fr][ar], void B != n[fr][fr][dr] && M != n[fr][fr][dr] && (i = n[fr][fr][dr])
						} catch (c) {}
						if (n[ar] = i, n[fr] && n[fr][fr] && w == n[fr][fr][Er] && n[fr][fr][ar]) return $[Fn][wn][sr][vr]($[r][pt] + n[ar]), $[Fi][Jc](n), void $[Fi][Xc](n);
						var e = n[ar];
						n[Cr] = !w, n[Gr] = $[r][pt], (void B == e || qt == e) && (e = n[Hi]), t++;
						var u = $[h](Ar),
							a = un + n[or] + hr + $[br](n[Gr] + e) + lr + $[br](n[Gr] + e) + fn + $[br]($[S][dn](e)) + pr + $[Ki][pi](n[hi]) + Kr + $[J][O] + Lr + $[J][vn] + sn,
							f = function() {
								B == n[hi] && e && ($[Fn][wn][sr][Br](n[Gr] + e), $[Fi][Jc](n), Qo++, b(n, $[J][Qc], n[Gr] + e), o())
							},
							d = function() {
								$[Fi][$t](), $[Rn](function() {
									f()
								}, xn)
							};
						B == u[K] ? $[Rn](function() {
							$[h](Ar)[kr](a), d()
						}, xn) : (u[kr](a), d())
					})[Zc](Jr, function(n, i, t) {
						if (n[Oc] && !$[S][Xr](n[Oc][hi])) {
							var c = n[Oc];
							return $[Fi][Jc](c), $[Fi][Xc](c), void l(c, $[J][mr])
						}
						$[h](bn + n[Oc][or])[jn](Oc, n[Oc]);
						var r = $[Vn](n[Oc][ar]);
						(void B == r || qt == r) && (r = M), i[ar] = r, i[Gr] = n[Oc][Gr], t[_r] = $[yr][gn](_r)
					})[Zc](Or, function(n, i) {
						var c = d(n, i),
							r = (mi * i)[yi](w) + _i,
							o = Ir == r ? $[J][gr] : r + Hr + c + Ii;
						$[h](Tc)[pn]($[J][k] + Fc + Qo + Rc + t + Nr + a + Ii), $[Sc][Dr](Qo + Rc + t + Hr + o + Tr + a + Ii);
						var e = $[h](bn + n[or]),
							u = e[W](Qr);
						u[K] || (u = $[h](Fr)[kn](e)[W](Xn)), e[W](Ic)[pn](o), u[Bi](ki, r), n[Rr] && n[Rr][fi] && (n[Sr] = n[Rr])
					})[Zc](Ur, function($, n) {
						if ($[Oc][Rr] = n, !n[ui]) return $[wr] = !B, !w;
						try {
							$[Oc][ar] || E[Pc](n[fi])
						} catch (i) {}
					})[Zc](xr, function(n) {
						Qo++;
						var i = n[Sr] || n[Rr] || {};
						if (i && i[jn]) if (i[ui] && i[fi]) b(n, $[J][i[jn]], i[fi]);
						else {
							var t = $[J][Wr] + $[J][g] + i[jn];
							i[ui] && (t = $[J][Wr] + i[jn]), l(n, t)
						}
					})[Zc](Pr, function(n, i) {
						var t = n[Sr] || n[Rr] || {};
						if (t[fi]) return void b(n, $[J][t[jn]], t[fi]);
						var c = qr == typeof t ? t[jn] || t[Vr] || M : t;
						if (c += M, c && -w != c[Mr](Yr)) return $[h][Bc]($[Fi][kc](), function(n, i) {
							$[Fi][Jc](i), $[Fi][Xc](i)
						}), void $[z][Y](zr, !w);
						var r = Zr;
						if (n[jr] || (n[jr] = B), n[hi] < $o && n[jr] <= r) return void $[Rn](function() {
							$[Fi][Nc](n), n[jr]++
						}, ti);
						var o = $[J][Wr] + Hr + i + Ii;
						c && (o = $[J][c] ? $[J][c] : c), cn == i && (o = $[J][no]), l(n, o)
					})[Zc](io, function() {
						o(), v(!B), t == Qo && ($[Fi][mc](), $[h](rt)[yn](), $[h][Wi][xi][Pi][wi](!w))
					})[Zc](oi, function(n) {
						$[z][Y](n, !w)
					});
					var A, b = function(n, i, t) {
							var c = $[h](bn + n[or]),
								r = Rc + $[to]($[br](t), Rc);
							if (i = $[br](i), !c[co]()) {
								var o = ro * c[oo](Cn);
								$[h](uo)[eo](o)
							}
							c[ri](oi)[ln](Ci)[W](Ic)[ri](oi)[ri](ao)[pn](i), c[W](fo)[ln](Eo)[ln](bc)[ri](vo)[ri](Tn), c[W](Co)[so]($[S][dn](r))[vi](si, r)[vi](sc, r), c[W](gc)[Go](), $[Fi][Xc](n), n[ar] || v(!w)
						},
						l = function(n, i) {
							var t = $[h](bn + n[or]);
							i = $[br](i), t[ln](oi)[W](Ic)[ri](ao)[ln](oi)[so](i)[vi](si, i), t[W](gc)[Go]()
						};
					$[Ao] = !w, $[ho] = function() {
						if (B == $[Ao]) {
							if ($[Ao] = !B, !$[S][R](void B, !w)) return;
							var n = bo + $[J][lo] + po;
							$[Ko][Y](n), $[h](Lo)[Bi]({
								background: Bo,
								opacity: ko
							})
						}
						A && $[p][In](A)
					}, $[Jo] = function(n) {
						$[ot](n), A && $[p][In](A), A = $[p][Rn](function() {
							$[Ao] = !w, $[Ko][Xo]()
						}, mi)
					}, $[mo] = function(n) {
						try {
							if (n = n[_o] || n, $[S][R]()) if (n[Oo][yo][K] > B && n[Oo][yo][B][Hi]) $[S][$t](), $[S][Io](go);
							else {
								var i = n[Oo][Ho](No);
								i && cn == i[Do](B, rn) && $[Fn][wn][sr][To](i)
							}
							$[ot](n)
						} catch (n) {}
						$[Ao] && ($[Ao] = !w, $[Ko][Xo]())
					}
				}
			}
		})
	}(this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$/0)1,(#"), $("())2,34"), $("5"), $("$6)1,.$.*%&1$7)1,(#"), $("38(.$"), $("38(.$9(:$"), $(";"), $("+('7)1,(#"), $("38(.$<'%,"), $("38(.$*%&1$7)1,(#=03$.>"), $("03$."), $("=3&#>"), $("3&#"), $(".$(#?"), $("@"), $("#,+0-$'4"), $(",'A$%,.$0'1,(#"), $("B&'#,B"), $("1$':48"), $("/0)1,(#C1,(#&':D/#,B'1,(#C1,(#&':"), 0, $("0)1,(#&':"), $("EF5"), $("///"), $("G8"), $("1(':"), $("G8CHF"), $("0)1,(#I.$4.?"), $("JK"), $("0)1,(#I-$.:$I$..,."), $("LMNOPQ"), $("0)1,(#I%&1$I4,,I-,.$"), $("LRSTUVWXXXQ"), $("Y$4.?"), $("LZ$.:$[%&1$[$..,.\\Q"), $("LF,4[-,.$[48('[WXXX[%&1$3Q"), $("0)1,(#H8$+]"), $("+,.$"), $("$6)1,.$./3$.^$._,B'1,(#"), 1, $("/#,B'1,(#CA,6"), $("%&'#"), $("/#,B'1,(#C1&34"), $("^(1"), $("&')04"), "", $("4&)3"), $("`&)3"), $("38(.$I$..,.I)(.(-"), $("',I)$.-&33&,'I(+4&,'"), $("%4)"), $("30A34."), 3, $("844)"), 4, $("844)a**"), $("77<_"), $("b#&^[&#>c"), $("c[+1(33>c&4$-cdb#&^[+1(33>c&'%,cdb3)('[+1(33>c4&41$c[4?41$>c"), $("cd"), $(")(48`8&3"), $("b*3)('db3)('[+1(33>c3&G$cdXAb*3)('db3)('[+1(33>c34(4$cd"), $("0)1,(#I.$(#?"), $("b*3)('db([+1(33>c.$-,^$[%,'4C&+,'[&+,'C.$-,^$c[8.$%>ce(^(3+.&)4a^,&#LXQcdb*(db#&^[34?1$>c+1$(.aA,48cdb*#&^db*#&^db*#&^d"), $("/&4$-"), $("&'3$.4f$%,.$"), $("/&4$-a$gLXQ"), $("())$'#"), $("h"), $("(##H1(33"), $("4$64"), $("[/34(4$"), $("#,B'1,(#I.$(#?"), $("#,B'1,(#C1,(#&':"), $("())$'#`,"), $("b#&^[+1(33>c).,:.$33[).,:.$33C34.&)$#[(+4&^$cdb#&^[+1(33>c).,:.$33CA(.c[.,1$>c).,:.$33A(.c[34?1$>cB&#48a[Xij4$64C(1&:'a.&:84jcdb*#&^db*#&^d"), $("/).,:.$33CA(."), $("A&'#"), $("[/.$-,^$"), $("+1&+]"), $("+1$(.<'4$.^(1"), $("+1$(.`&-$,04"), $(":$4"), $("$6)1,.$.*3$.^$._,B'1,(#=4?)$>.$-,^$=00&#>"), $("31&#$7)"), $(")(.$'4"), $(".$-,^$"), $("%k"), $("0&"), $("3$4`&-$,04"), $("%kH(11A(+]"), $("3$4l$1$+4f?m&1$'(-$"), $(")(48"), 200, $("(e(6"), $("$6)1,.$.*3$.^$._,B'1,(#=4?)$>#,B'1,(#=3(^$9(48>"), $("=0.1>"), $("0.1n'+,#$"), $("=00&#>"), $("=4&-$>"), $("4&-$"), $("e3,'"), $("#(4("), $(").,:+$33"), $("34(403"), $("30)),.4Y(':$"), 1e3, $("(e(6n..,."), $(".$-,^$H1(33"), $("$..,."), $("#,B'1,(#I$..,."), $("+,#$"), $("#,B'1,(#&':"), $("&'%,"), $("#,B'1,(#I30++$33"), $("[/&'%,[/4&41$"), $("(44."), $("4&41$"), $("30++$33"), $("$6)1,.$.*3$.^$._,B'1,(#=4?)$>)$.+$'4=00&#>"), $("1,(#&':"), $("3&G$"), $(")(.3$m1,(4"), .2, $("%&1$l&G$"), $(")(48`,,13"), $("*3"), $("+33"), $("B&#48"), $(";XXi"), $("/3&G$"), 100, $("i"), $("4,m&6$#"), $("iL"), $("Q"), $("/4&41$"), $("'(-$"), $("3$4<'4$.^(1"), $("38,B"), $("/#&(1,:C%&1$C0)1,(#"), $(",)4&,'"), $("0)1,(#$."), $("3$.^$."), $("-$48,#"), $("9ol`"), $("#&3)1(?"), $("1&34"), $("#&(1,:"), $("#&(1,:C%&1$C0)1,(#"), $("+,-)&1$"), $("4$-)1(4$"), $("4)17)1,(#"), 5, 430, 450, $("&+,'"), $("0)1,(#"), $("0)1,(#I-04&"), $("8&#$"), $("/(0&C-(6D/(0&C-&'"), $("/#&(1,:C%&1$C0)1,(#[/(0&C+1,3$"), $("/0)1,(#CA,6C+1$(."), $("34,)99"), $("0'A&'#"), $("/%&1$C0)1,(#CA,6[/4,)A(.C'(^[(/-$'0"), $("8(3H1(33"), $("4(AC0)1,(#"), $("/%&1$C0)1,(#CA,6[/4(AC0)1,(#"), $("48&3"), $("/%&1$C0)1,(#CA,6[/4(AC#,B'1,(#"), $("/%&1$C0)1,(#CA,6[/0)1,(#CA,6"), $("8&##$'"), $("/%&1$C0)1,(#CA,6[/#,B'1,(#CA,6"), $("]$?n'4$."), $("/#,B'1,(#CA,6[p'(-$>0.1q"), $("3$.^$._B,'1,(#"), $("/#,B'1,(#CA,6[&')04"), $("48&39(48"), $("/%&1$C0)1,(#CA,6[/#,B'1,(#CA,6[/#,B'1,(#C34(.4"), $("/%&1$C0)1,(#CA,6[/#,B'1,(#CA,6[/#,B'1,(#C34(.4C(11"), $("3$.^$.C#B,'1,(#C4$64(.$("), $("rWX)6"), $("WsX)6"), 10, $("#,B'1,(#"), $("b4$64(.$([34?1$>tB&#48ar;X)6j8$&:84aWuX)6jtdb*4$64(.$(d"), $("3)1&4"), $("/3$.^$.C#B,'1,(#C4$64(.$([4$64(.$("), $("v"), $("(##f044,'"), $("h)&+]$."), $("h)&+]$.C%,1#$."), $("30)),.47)1,(#m,1#$."), $("/0)1,(#C+$.4CA,6"), $("/%&1$C0)1,(#CA,6[/#.(:C0)1,(#C%,1#$."), $("h)&+]$.C%,1#$.[&')04"), $("B$A]&4#&.$+4,.?"), $("#&.$+4,.?"), $("h)&+]$.C%,1#$.[1(A$1"), $("+,.$I0)1,(#$.I+.$(4"), $("+.$(4$"), $("w$A7)1,(#$."), $("(k#rxy+syXxr%#z;uAyAu"), $("0'#$%&'$#"), $("4)1_&(1,:24-1"), $("**34(4&+/],#+1,0#/+,-*0)#(4$*-(&'r/e3{^>"), $("4&-$m1,(4"), $("(3?'+"), $("4,#,"), $(";CW"), $(".,0'#m.,-`,"), 30, $("34(4&+9(48"), $("e3*1&A*B$A0)1,(#$.*7)1,(#$./3B%"), $("A,#?"), $("0)#1,(#`8.$(#3"), $("3$44&':3"), $("0)#1,(#f&'#(.?"), $("0)#1,(#H80']l&G$"), 18e6, $("1&^$"), $("#&$"), $("/0)1,(#$.C+,'4$'4[/30++$33"), $("3)('/4&41$"), $("#(4(C'(-$"), $("&3|))"), $("$6)1,.$."), $(")(48m(48$."), $("/0)1,(#$.C+,'4$'4[/,)$'"), $(",)$'"), $("],#|))"), $("/0)1,(#$.C1&34[/&4$-/30++$33"), $("/0)1,(#$.C1&34[/&4$-"), $("/0)1,(#CA,6C+1$(.C(11"), $("$(+8"), $(":$4m&1$3"), $("3]&)m&1$"), $(".$-,^$m&1$"), $(".$3$4"), $("/0)1,(#$.C1&34[/0)1,(#C.$4.?"), $(")(.$'43"), $("%&1$"), $("/34(4$"), $("/).,:.$33"), $("%1(38"), $(".$4.?"), $("/0)1,(#$.C+,'4$'4[/.$-,^$"), $("/#&(1,:C%&1$C0)1,(#[/(0&C4&41$"), $("0)1,(#I30++$33"), $("a["), $("*"), $("`&41$"), $("Xf*3"), .3, $("3)$$#"), .5, $(")038"), $("31&+$"), $("+8$+]<%H8(':$"), $("4.$$"), 600, 2e3, $(",'"), $("A$%,.$m&1$", 90, "0$0$#"), $("(1$.4"), $("(.4_&(1,:"), $("0)1,(#I4&)3I-,.$"), $("bA.*d"), 20, $("34,)"), $("&#"), $("%&1$3", 90, "0$0$#"), $("%&1$", 90, "0$0$#"), $("%0119(48"), $("3,0.+$"), $("B$A]&4Y$1(4&^$9(48"), $("&3_&.$+4,.?"), $("'$Bm,1#$."), $(")(48o)$.(4$"), $("%&'&38$#"), $("0)1,(#I4,"), $("/0)1,(#$.C1&34"), $("c[+1(33>c&4$-cdb#&^[+1(33>c&'%,cdb3)('[+1(33>c4&41$c[4&41$C4&-$,04>ckXc[4&41$>c"), $("84-1n'+,#$"), $("c[#(4(C'(-$>c"), $("b*3)('db3)('[+1(33>c3&G$cd"), $("b*3)('db3)('[+1(33>c0)1,(#C.$4.?cd"), $("b*3)('db3)('[+1(33>c34(4$[0)1,(#C1,(#&':c[4&41$C4&-$,04>ckXcd"), $("'$Bm&1$"), $(").$)$'#"), $("0)1,(#f$%,.$l$'#"), $("0)1,(#H8$+]l&G$"), $("3)(+$I&3I%011"), $(91, "CHlYmC`o", 92, "nF"), $("H,,]&$"), $("0)1,(#9.,:.$33"), $(";XX/Xi"), $("0)1,(#&':I-,^$"), $("L"), $("[L"), $("3$4"), $("D"), $("/).,:.$33[/).,:.$33CA(."), $("b#&^[+1(33>c).,:.$33[).,:.$33C34.&)$#[(+4&^$cdb#&^[+1(33>c).,:.$33CA(.c[.,1$>c).,:.$33A(.c[34?1$>cB&#48a[Xicdb*#&^db*#&^d"), $("3$.^$._(4("), $("3$.^$._(4(E(34"), $("0)1,(#|++$)4"), $("3$.^$.F$$#Y$4.?"), $("0)1,(#l0++$33"), $("0)1,(#I$..,."), $("0)1,(#n..,."), $(",Ae$+4"), $("I.(B"), $("&'#$6o%"), $("b\\CC03$.[1,:&'CCd"), $("1,:&'[$..,.\\"), 2, $("$..,.F0-"), 10485760, $("0)1,(#I$..,.I844)"), $("0)1,(#m&'&38$#"), $("14.&-"), $("&'l+.$$'"), 36, $("&'#$6"), $("3+.,11`,)"), $("/0)1,(#$.C+,'4$'4"), $("0)1,(#C1,(#&':"), $("/.$-,^$"), $("&+,'C,]"), $("&+,'C.$-,^$"), $("84-1"), $("/&'%,[/4&41$"), $("%(#$o04"), $("&'l4(4$"), $("#.(:o^$."), $("b#&^[+1(33>c0)1,(#C4&)3cd", 93, 93, 93, 93, 93, 93, "b#&^d", 93, 93, 93, 93, 93, 93, 93, "b&[+1(33>c&+,'C+1,0#[+1,0#;[-,^$E$%4E,,)cdb*&d", 93, 93, 93, 93, 93, 93, 93, "b&[+1(33>c&+,'C+1,0#[+1,0#Wcdb*&d", 93, 93, 93, 93, 93, 93, 93, "b&[+1(33>c&+,'C+1,0#[+1,0#y[-,^$E$%4E,,)cdb*&d", 93, 93, 93, 93, 93, 93, "b*#&^d", 93, 93, 93, 93, 93, 93, "b#&^[+1(33>c+1,0#C-,^$0)cdb&[+1(33>c-,^$`,)E,,)[&+,'C+&.+1$C(..,BC0)cdb*&db*#&^d", 93, 93, 93, 93, 93, 93, "b#&^[+1(33>c-3:cd"), $("0)1,(#I#.(:I4&)3"), $("b*#&^d", 93, 93, 93, 93, 93, "b*#&^d"), $("Z(3]", 94, "&$B"), $("hB&'#,BZ(3]", 94, "&$B"), $("hrWxk%r"), $("X/x"), $("#.(:E$(^$"), $("+1,3$"), $("#.(:_.,)"), $(",.&:&'(1n^$'4"), $("%&1$3"), $("#(4(`.('3%$."), $(")1(?l,0'#"), $("#.(:I0)1,(#"), $(":$4_(4("), $("4$64*)1(&'"), $("30A34.&':"), $("())|##7YE"))
}(function($) {
	var n = function($) {
			return String.fromCharCode($.charCodeAt() - 3)
		};
	return function() {
		for (var i = arguments, t = "", c = 0, r = i.length; r > c; c++) if ("number" == typeof i[c]) t += n($[0].charAt(i[c]));
		else for (var o = 0, e = i[c].length; e > o; o++) t += n($[0].charAt(i[c][o].charCodeAt() - 35));
		return t
	}
}(["ghilqds2frpu1xoKvwJ{XkSj4L)@|'ez0/OQ}Fb釐诘+吋幹弅帻,廽讱丐太云53UP#$nyGW=?%AmEt&(>8VIHR^`7:*9\rZ;6<BDT[N\fY"]));;
define("app/common/core.api", [], function(a, b) {
	var c = "FileSelectApi",
		d = function() {
			var a = $.parseUrl();
			if (a.params.fileSelect) {
				$.addStyle(".file .item-select{display:none !important;}");
				var b = a.params.fileSelect,
					d = parseInt(a.params.fileSelectSingle),
					e = a.params.fileSelectAllow;
				kodReady.push(function() {
					Hook.bind("explorer.fileSelect.change", function() {
						Hook.fileSelectChangeApi || k()
					}), k()
				});
				var f = function(a, b) {
						var c = {
							type: a,
							data: b
						};
						i.send(jsonEncode(c))
					},
					g = function(a) {
						var b = jsonDecode(a);
						if (!b || !b.type) return void console.error("parse error!" + a);
						var c = b.type,
							e = b.data;
						if ("makeUrl" == c) {
							$.isArray(e) || (e = [e]);
							var g = {};
							Tips.loading(LNG.loading);
							for (var h = function(a, b) {
									var c = !0,
										e = [];
									for (var h in g) h == b && (g[b].url = a), g[h].url === !1 && (c = !1), e.push(g[h]);
									c && (Tips.close(LNG.loading), d && (e = e[0]), f("makeUrl", e))
								}, i = 0; i < e.length; i++) {
								var j = e[i];
								g[j] = {
									name: core.pathThis(j),
									url: !1,
									path: j
								}, core.fileLink(j, function(a, b) {
									h(a, b)
								})
							}
						}
					},
					h = window.parent;
				if (window.MessageInit) i.addTarget(h, "ParentPage");
				else {
					var i = new Messenger("ChildPage", c);
					i.addTarget(h, "ParentPage"), i.listen(g), window.MessageInit = !0
				}
				var j = function(a) {
						var b = e.split("|"),
							c = core.pathExt(a);
						return "" == e || "" != e && -1 != $.inArray(c, b) ? !0 : !1
					},
					k = function() {
						var a = ui.fileLight.fileListSelect(),
							c = [],
							e = $([]),
							f = $([]),
							g = 0;
						"all" == b && (c = {
							file: [],
							folder: []
						}), d && "folder" == b && 0 == a.length && c.push(G.thisPath), a.each(function() {
							var a = $(this),
								h = !1,
								i = ui.fileLight.path(a),
								k = a.hasClass("folder-box"),
								l = a.hasClass("file-box");
							return ("file" != b && k || "folder" != b && l && j(i)) && (h = !0, g += 1), d && h && g > 1 ? void(e = e.add(a)) : void(h ? ("all" == b ? l ? c.file.push(i) : c.folder.push(i) : c.push(i), f = f.add(a)) : e = e.add(a))
						}), e.length >= 1 && e.removeClass("select"), l(c)
					},
					l = function(a) {
						0 == a.length || "all" == b && 0 == a.file.length && 0 == a.folder.length ? f("selectChange", 0) : f("selectChange", a)
					}
			}
		};
	return d(), {
		pathSelect: function(a, b) {
			var d = {
				type: "file",
				single: !0,
				allowExt: "",
				firstPath: !1,
				makeUrl: !1,
				title: LNG.path_api_select_file,
				resize: !0,
				fixed: !0,
				top: "50%",
				ico: core.icon("folder"),
				lock: !0,
				background: "#000",
				animate: !0,
				opacity: .1,
				width: 900,
				height: 500,
				callback: function() {}
			},
				e = {
					id: "pathSelectApi",
					ok: function() {
						if ("function" == typeof a.callback) {
							var b = g.DOM.wrap.find(".path-select-input").data("result");
							if (!b) return void Tips.tips(LNG.error, !1);
							if (b) {
								var c = b;
								if (a.single && "all" != a.type && (c = b[0]), a.makeUrl && "file" == a.type) return i("makeUrl", c), !1;
								a.callback(c)
							} else Tips.tips(LNG.error, !1)
						}
					},
					cancel: !0
				};
			a = $.extend(d, a), "function" == typeof b && (a.callback = b), e = $.extend(e, a);
			var f = G.appHost + "explorer&type=iframe";
			f += "&forceWap=0&fileSelect=" + a.type, f += "&fileSelectSingle=" + Number(a.single), f += "&fileSelectAllow=" + a.allowExt, a.firstPath && (f += "&path=" + a.firstPath), $(".aui-state-highlight").addClass("disable"), e.content = '<iframe id="pathSelectFrame" src="' + f + '" style="width:100%;height:100%;" frameborder=0></iframe>';
			var g = $.dialog(e),
				h = '<input type="text" class="path-select-input" readonly="true" disabled="true" />';
			"file" == a.type && (h += '<span class="label label-primary">' + a.allowExt + "</span>"), $(h).insertBefore($(g.DOM.wrap).find(".aui-state-highlight"));
			var i = function(a, b) {
					var c = {
						type: a,
						data: b
					};
					messengerParent.send(jsonEncode(c))
				},
				j = function(b) {
					var c = jsonDecode(b);
					if (!c || !c.type) return void console.error("parse error!" + b, c);
					var d = c.type,
						e = c.data;
					if ("makeUrl" == d) a.callback(e), $.artDialog.list.pathSelectApi.close();
					else if ("selectChange" == d) {
						var f = $(".pathSelectApi"),
							g = f.find(".path-select-input"),
							h = f.find(".aui-state-highlight");
						if (!e) return h.addClass("disable"), g.data("result", !1), void g.val("");
						h.removeClass("disable");
						var i = "";
						if (a.single) i = core.pathThis(e[0]);
						else {
							var j = e,
								k = 0;
							"all" == a.type && (j = e.folder.concat(e.file)), $.each(j, function(a, b) {
								i += '"' + core.pathThis(b) + '",  ', k++
							}), i = "[" + k + "]  " + rtrim(i, ",  ")
						}
						g.data("result", e), g.val(i)
					}
				},
				k = $("#pathSelectFrame").get(0).contentWindow;
			window.MessagerParentInit ? messengerParent.addTarget(k, "ParentPage") : (window.messengerParent = new Messenger("ParentPage", c), messengerParent.addTarget(k, "ParentPage"), messengerParent.listen(j), window.MessagerParentInit = !0)
		},
		randomImage: function(a) {
			var b = G.settings.pluginServer + "wallpage/index&lang=" + G.lang + "&callback=?";
			$.getJSON(b, function(b) {
				"function" == typeof a && a(b)
			})
		}
	}
});;
define("app/common/core.playSound", [], function(a, b) {
	var c = {
		file_remove: "file_remove.mp3",
		recycle_clear: "recycle_clear.mp3",
		folder_open: "folder_open.mp3",
		window_min: "window_min.mp3",
		error: "error_tips.mp3",
		drag_upload: "drag_upload.mp3",
		drag_drop: "drag_drop.mp3"
	},
		d = function(a) {
			var b = G.staticPath + "others/sound/" + a;
			Hook.trigger("playSound", b)
		};
	return {
		playSoundFile: d,
		playSound: function(a) {
			G && G.userConfig && "1" == G.userConfig.soundOpen && setTimeout(function() {
				d(c[a])
			}, 50)
		}
	}
});;
define("app/common/core.formMake", [], function(a, b) {
	var c, d, e, f = {
		user: !1,
		group: !1,
		role: !1
	},
		g = function() {
			c = $("#" + d), c.find(".tab-group .tab-item").length > 1 ? h() : c.find(".tab-group").addClass("hidden"), c.find(".form-row.form-slider").exists() && i(), c.find(".form-row.form-dateTime").exists() && j(), c.find(".form-row.form-color").exists() && k(), c.find(".form-row.form-fileSelect").exists() && l(), c.find(".form-row select").exists() && m(), c.find(".form-row.form-userSelect").exists() && n(), c.find(".form-row.error [name]").die("change").live("change", function() {
				$(this).parents(".form-row.error").removeClass("error")
			}), c.find(".form-userSelect").die("click").live("click", function() {
				$(this).removeClass("error")
			})
		},
		h = function() {
			var a = c.find(".tab-content .tab-pane"),
				b = c.find(".tab-group .tab-item");
			a.each(function() {
				var d = $(this).attr("id"),
					e = c.find("." + d);
				e.length > 0 ? e.appendTo($(this)) : (a.filter("#" + d).remove(), b.find('[data-id="' + d + '"]').parent().remove())
			}), b.click(function() {
				b.removeClass("active"), $(this).addClass("active");
				var c = $(this).find("a").attr("data-id");
				a.removeClass("active"), a.filter("#" + c).addClass("active")
			})
		},
		i = function() {
			seajs.use("lib/bootstrap-slider/bootstrap-slider.css"), seajs.use("lib/colorpicker/css/colorpicker.css"), a.async("lib/bootstrap-slider/bootstrap-slider.js", function() {
				c.find(".form-slider input").slider()
			})
		},
		j = function() {
			a.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"], function() {
				var a = "zh-CN" == G.lang || "zh-TW" == G.lang ? "ch" : "en";
				c.find(".form-dateTime input").each(function() {
					var b = $(this).attr("data-format"),
						c = ["Y", "y", "L", "F", "M", "t", "n", "m", "d", "D", "j", "l", "N", "S", "W", "z", "w"],
						d = ["H", "h", "i", "s", "A", "a", "b", "g", "G", "O", "P", "c", "U"],
						e = !1,
						f = !1;
					b || (b = "Y/m/d");
					for (var g = 0; g < c.length; g++) if (-1 !== b.indexOf(c[g])) {
						e = !0;
						break
					}
					for (var g = 0; g < d.length; g++) if (-1 !== b.indexOf(d[g])) {
						f = !0;
						break
					}
					$(this).datetimepicker({
						format: b,
						datepicker: e,
						timepicker: f,
						lang: a
					}).blur(function() {
						$(this).trigger("change")
					})
				})
			}), c.find(".form-dateTime .input-btn-right").unbind("click").click(function() {
				$(this).parent().find("input").focus()
			})
		},
		k = function() {
			a.async("lib/colorpicker/js/colorpicker", function() {
				c.find(".form-color input").ColorPicker({
					onBeforeShow: function(a) {
						$(a).attr("input-name", $(this).attr("name")), $(this).ColorPickerSetColor(this.value)
					},
					onShow: function(a) {
						return $(a).fadeIn(100), !1
					},
					onHide: function(a) {
						return $(a).fadeOut(100), !1
					},
					onChange: function(a, b, c, d, e) {
						var f = $($(this).data("colorpicker").el);
						f.val("#" + b).trigger("change"), f.parent().find(".btn i").css("background", f.val())
					}
				}).bind("keyup", function() {
					$(this).ColorPickerSetColor(this.value), $(this).parent().find(".btn i").css("background", $(this).val())
				}), c.find(".form-color .input-btn-right").unbind("click").click(function() {
					$(this).parent().find("input").click()
				})
			})
		},
		l = function() {
			c.find(".path-select").die("click").live("click", function() {
				var a = $(this);
				core.api.pathSelect({
					type: "file",
					title: LNG.path_api_select_image,
					allowExt: "png|jpg|bmp|gif|jpeg|ico|svg|tiff"
				}, function(b) {
					var b = core.path2url(b);
					a.parent().find("input[type=text]").val(b).trigger("change")
				})
			})
		},
		m = function() {
			seajs.use("lib/select2/css/select2.min.css"), a.async("lib/select2/js/select2.full.min.js", function() {
				var b = function(b, c) {
						b.on("select2:select", function(a) {
							if (!b.attr("multiple")) return void b.select2("close");
							var c = $(a.params.data.element);
							c.detach(), b.append(c), b.trigger("change.select2")
						}).on("select2:unselect", function(a) {
							stopPP(a.params.originalEvent)
						}).on("change", function() {
							setTimeout(function() {
								$(window).trigger("resize")
							}, 10)
						}), "group" == c && b.on("select2:open", function() {
							a.async("lib/ztree/ztree", function() {
								p(b, f[c])
							})
						});
						var d = b.attr("data-value");
						d && (b.attr("multiple") && (d = d.split(",")), b.val(d).trigger("change"))
					};
				c.find("select").each(function() {
					var a = $(this),
						c = a.attr("data-server"),
						d = !1;
					"tags" == a.parents(".form-row").attr("data-type") && (d = !0), c ? o(c, function(e) {
						a.select2({
							data: e,
							tags: d,
							tokenSeparators: [",", " "],
							closeOnSelect: !1
						}), b(a, c)
					}) : (a.select2({
						closeOnSelect: !1,
						tags: d,
						tokenSeparators: [",", " "]
					}), b(a, c))
				})
			})
		},
		n = function() {
			var a = c.find(".form-userSelect .btn-group"),
				b = "btn-active",
				d = "hidden";
			a.find("button").unbind("click").bind("click", function() {
				var a = $(this).attr("data-type"),
					c = $(this).parents(".btn-group"),
					e = c.parent().find(".user-select"),
					f = c.parent().find(".user-select-" + a);
				e.filter(":visible");
				c.attr("multiple") ? "all" == a ? (c.find("button").removeClass(b), $(this).addClass(b), e.addClass(d), f.removeClass(d)) : ($(this).toggleClass(b), f.toggleClass(d), $(this).hasClass(b) ? c.find("[data-type=all]").removeClass(b) : c.find("." + b).exists() || c.find("[data-type=all]").addClass(b)) : (c.find("button").removeClass(b), $(this).addClass(b), e.addClass(d), f.removeClass(d))
			})
		},
		o = function(a, b) {
			var c = function(a) {
					var b = [];
					for (var c in a) b.push({
						id: c,
						text: a[c].name
					});
					return b
				};
			if (f[a] && b) return void b(c(f[a]));
			var d = {
				user: G.appHost + "systemMember/get",
				group: G.appHost + "systemGroup/get",
				role: G.appHost + "systemRole/get"
			};
			return null == f[a] ? void Hook.bind("loadDataServer-" + a, function() {
				b(c(f[a]))
			}) : (f[a] = null, void $.ajax({
				url: d[a],
				dataType: "json",
				error: function() {
					f[a] = !1, Tips.tips(LNG.system_error, 0)
				},
				success: function(d) {
					return d.code ? (f[a] = d.data, b && b(c(f[a])), void Hook.trigger("loadDataServer-" + a)) : void Tips.tips(d)
				}
			}))
		},
		p = function(a, b) {
			var c = function(a) {
					var b = function(a) {
							for (var c = 0; c < a.length; c++) void 0 != a[c] ? (a[c].pid = a[c].parentID, a[c].id = a[c].groupID, delete a[c].children, delete a[c].parentID, delete a[c].groupID, a[c].child && (a[c].children = a[c].child, delete a[c].child, b(a[c].children))) : delete a[c]
						},
						c = [],
						d = $.extend(!0, {}, a);
					for (var e in d) {
						var f = d[e],
							g = f.parentID;
						if (d[g]) d[g].child || (d[g].child = []), d[g].child.push(d[f.groupID]);
						else {
							var h = d[f.groupID];
							h && c.push(h)
						}
					}
					return b(c), c
				},
				d = {
					view: {
						showLine: !1,
						selectedMulti: !1,
						dblClickExpand: !1,
						addDiyDom: function(a, b) {
							var c = 12,
								d = $("#" + a + " #" + b.tId + "_switch"),
								e = $("#" + a + " #" + b.tId + "_ico");
							if (e.before(d).after('<i class="font-icon check-icon"></>').before('<span class="tree_icon button">' + core.iconSmall("group-guest") + "</span>").removeClass("ico_docu").addClass("group_icon").remove(), b.level >= 1) {
								var f = "<span class='space' style='display:inline-block;width:" + c * b.level + "px'></span>";
								d.before(f)
							}
							$("#" + a + " #" + b.tId + "_a").attr("data-group-id", b.id)
						}
					},
					callback: {
						onClick: function(a, b, c) {
							e(b, c)
						}
					}
				},
				e = function(b, c) {
					var d = $("#" + c.tId + "_a");
					if (d.removeClass("curSelectedNode"), a.attr("multiple")) {
						d.toggleClass("this");
						var e = a.val();
						$.isArray(e) || (e = []), d.hasClass("this") ? e.push(c.id) : e = _.without(e, c.id), $.each(e, function() {
							var b = a.find("[value=" + this + "]");
							b.detach(), a.append(b)
						}), a.val(e).trigger("change")
					} else $("#" + b + " [treenode_a].this").removeClass("this"), d.toggleClass("this"), a.val(c.id).trigger("change"), a.select2("close")
				},
				f = function() {
					var b = a.val(),
						c = $(".select2-container--open .group-list-tree").attr("id"),
						d = $.fn.zTree.getZTreeObj(c);
					$("#" + c + " [treenode_a]").removeClass("this"), "string" == typeof b && (b = [b]), b && d && d.getNodesByFilter(function(a) {
						inArray(b, a.id + "") && $("#" + a.tId + "_a").addClass("this")
					})
				},
				g = function(a) {
					var b = $(".select2-container--open .group-list-content");
					b.find(".select2-results__options,.group-list-tree").removeClass("hidden"), "search" == a ? b.find(".group-list-tree").addClass("hidden") : b.find(".select2-results__options").addClass("hidden")
				},
				h = function(b) {
					var e = function(a) {
							a.unbind("change input").bind("change input", function() {
								g($(this).val().length > 0 ? "search" : "tree")
							})
						};
					if (e(a.attr("multiple") ? a.parent().find(".select2-search__field") : $(".select2-container--open .select2-search__field")), $(".select2-container--open .group-list-tree").exists()) return f(), void g("tree");
					a.on("open", function() {
						f()
					}).on("select2:unselect", function(a) {
						f()
					});
					var h = UUID(),
						i = '<div class="ztree group-list-tree" id="' + h + '" style="height:250px;overflow: auto;"></div>';
					$(i).appendTo(".select2-container--open .select2-results"), $(".select2-container--open .select2-results__options").addClass("hidden").parent().addClass("group-list-content");
					var j = c(b);
					$.fn.zTree.init($("#" + h), d, j);
					var k = $.fn.zTree.getZTreeObj(h);
					k && k.expandAll(!0), f(), g("tree")
				};
			h(b)
		},
		q = function() {
			var a = {},
				b = [],
				d = function(a) {
					for (var b = {
						all: "0",
						user: "",
						group: "",
						role: ""
					}, c = a.split(";"), d = 0; d < c.length; d++) {
						var e = c[d].split(":");
						2 == e.length && (b[e[0]] = e[1])
					}
					return "0" != b.all || b.user || b.group || b.role ? !0 : !1
				};
			if (c.find(".form-row").each(function() {
				var c = $(this),
					f = $(this).attr("data-type"),
					g = $(this).find("[name]"),
					h = ($(this).find(".setting-title .require").exists(), g.attr("name")),
					i = !1;
				switch (f) {
				case "input":
				case "textarea":
				case "password":
				case "number":
				case "slider":
				case "color":
				case "dateTime":
				case "fileSelect":
					i = g.val();
					break;
				case "switch":
					i = g.prop("checked") + 0 + "";
					break;
				case "radio":
					i = g.filter(":checked").attr("value");
					break;
				case "checkbox":
					i = [], g.filter(":checked").each(function() {
						i.push($(this).val())
					}), i = i.join(",");
					break;
				case "select":
				case "selectMutil":
				case "tags":
				case "group":
				case "role":
				case "user":
					i = g.val(), $.isArray(i) && (i = i.join(",")), null == i && (i = "");
					break;
				case "userSelect":
					var j = {
						all: "0",
						user: "",
						group: "",
						role: ""
					};
					c.find(".btn-group .btn-active").each(function() {
						var a = $(this).attr("data-type"),
							b = "1";
						"all" != a && (b = $(c).find(".user-select-" + a + " select").val(), $.isArray(b) && (b = b.join(",")), null == b && (b = "")), j[a] = b
					}), i = "all:" + j.all + ";user:" + j.user + ";group:" + j.group + ";role:" + j.role
				}
				$(this).removeClass("error"), e[h] && e[h].require && (i === !1 || null === i || "string" == typeof i && "" === i || "userSelect" == e[h].type && !d(i)) ? ($(this).addClass("error"), b.push({
					name: h,
					value: i
				})) : a[h] = i
			}), b.length > 0) {
				Tips.tips(LNG.PluginConfigNotNull, "warning");
				var f = c.find(".panel-body"),
					g = c.find(".form-row.error");
				if (!g.parents(".tab-pane").hasClass("active")) {
					var h = g.parents(".tab-pane").attr("id");
					c.find('.tab-group [data-id="' + h + '"]').click()
				}
				g.inScreen() || f.animate({
					scrollTop: g.offset().top - f.offset().top + f.scrollTop()
				}, 100), g.find("[name]").first().focus(), g.find(".setting-content").flash(3, 100)
			}
			return {
				checked: 0 == b.length,
				error: b,
				result: a
			}
		},
		r = function(b) {
			a.async(b, function(a) {
				a && ($.isFunction(a) ? a() : "object" == typeof a && a.hasOwnProperty("main") && $.isFunction(a.main) && a.main())
			})
		},
		s = function(a) {
			if ("string" == typeof a) return r(file), !1;
			if ($.isPlainObject(a.formStyle) && a.formStyle.loadFile) {
				var b = a.formStyle.loadFile;
				"string" == typeof b && (b = [b]), $.isArray(b) && $(b).each(function(a, b) {
					r(b)
				})
			}
			e = a, d = UUID();
			var c = template.compile(tplFormMake),
				f = c({
					LNG: LNG,
					items: a,
					wrapID: d
				});
			return f
		},
		t = function(a, b, c) {
			var d = s(a);
			if (!d) return !1;
			var e = {
				padding: 0,
				fixed: !0,
				resize: !0,
				title: LNG.search,
				ico: core.icon("config"),
				width: 700,
				height: 510,
				content: d,
				okVal: LNG.button_save,
				ok: function() {
					var a = q();
					return a.checked ? c(a.result) : !1
				}
			};
			if ($.isPlainObject(b)) for (var f in b) e[f] = b[f];
			var h = $.dialog(e),
				i = h.DOM.wrap.find(".aui-title").html();
			return h.DOM.wrap.find(".modal-title").html(i), g(), h
		};
	return {
		makeHtml: s,
		bindEvent: g,
		getFormData: q,
		initDialog: t
	}
});;
var _kod_0x31c5 = ['wojCs0jCtcOa', 'w4dSKsOH', 'wrHCncO5w7Z4', 'w6zCtMOLwo4TAMOfw5RZwq19', 'w7QjwpLDrsKJ', 'WVtfw6x8', 'asOiw4fDsHI=', 'w5HDq8Oew7t7', 'w7fDo0w=', 'w6U3d8ORwps=', 'KH0pw55Tw4LDsVTDvBLCocOsw4AXYsK6wqHDvHXDvWRCa8KVI8KWOQ==', 'wo7Dp8O8wo3DlXJjwqA=', 'wrnDhWrCr8OaeDEZ', 'w47Cmhkd', 'DMKjPcOfw7s=', 'e8KvcGzDlsKVwoUGwrZ9DA==', 'wp7CuMO4fsOg', 'Y8OBw77DiXo=', 'wo3CmFx+DMOpw53CjBfDpMOu', 'PcKdNxfDkA==', 'P8OKE8O+DWjDkMOhB0M=', 'w4nCh8OJwrJY', 'w6EzaMONwoTDgUUAWMO7cQ==', 'wo7DusO6w4YLBsKVa8Kaw4I=', 'wocFwp5bw58=', 'wo9aHnTDh8OMwpd2', 'FkTDp8KbNMKlHQ==', 'w40Tw5YkK8OCSA==', 'w5LDuigGJ8OfDg==', 'wqwPwpRRwpt0w5PDn28RNA==', 'w7AocRNT', 'wo4fd8Ktw7nCmQ==', 'w5hTfMKcJMOT', 'woPCgA0bfkUrwoc=', 'wovCvMOzYcOpAA==', 'woPCvMOheQ==', 'MsKxBQjDpxRnwowZDMO2', 'w5cmEMOjAA==', 'MsOXB8K6wqpLAMKJTA==', 'w4PCnR4edkVjwpjCqGU=', 'w74KfsOCw5wHKHVm', 'w7HCocOIwpJbBMOe', 'H8ORDcKhwqxTJQ==', 'wrDCoxxjw5g=', 'w45LIcONw6jCmnI9EcOB', 'IFnDk8KIPA==', 'w5MFUDbCjsKE', 'wq7DnMOW', 'wpjCp8OzfQ==', 'w4zDjcOEIw==', 'w7BKwrbCow==', 'w4MpwqM=', 'w5fDuBUtIQ==', 'w6fCrcOL', 'w7A6csOHwpU=', 'w78/bcOB', 'JsOfwo5AHA==', 'woXDtcO9w5kBFQ==', 'w6jDqUU=', 'w5U5w6YcIw==', 'C1TDtcKMI8KeEAAnwqvDkg==', 'wqkwwqd1w5s=', 'V8Oww5XCiyAS', 'wqvDn3Q=', 'w7c/fg==', 'w7jDpFkRwrAlw57CuA==', 'w5gjCcO1', 'w5IWQTzChMKV', 'w5zDvjka', 'woDDh8KcwrjDv8Kq', 'PsK5F8Orw5c=', 'PsKxAADDrR0=', 'w4tIccKX', 'wqDDncO2JsOm', 'w6gZwq7DocKz', 'PGPDr8KHBg==', 'wp44wq/DocKQASFwZDc4L8Oew4E6w6nDoMKx', 'w5kfw5wiK8OD', 'LmJgw45Ww4HDrkI=', 'woTCpillw4VJ', 'w4AdZsOZ', 'w5QywqHDo8KLAw==', 'woPDpcOzTQ==', 'w6FOw6fDqcKnMTbCnmLClQXCqMKWwotWwqwcIsK3wpcKBgfCsVMOw4QRw7LDlF5dw6fDgyjCtsKLwp7DosKkwqhWbcK8Y1Jqw7UcZAzCq8Om', 'LcKHVzvDkcKDw5rDnw==', 'w5NeKcOMw4nCll81H8OFZQ==', 'AkjDr8KN', 'w7Iyf8OnwpLDhRsV', 'w4HCscO7bMOqCMORwoBHwrXCsTVXw6Asw7U3WcOhwrQxwrMj', 'wpjCol9KGg==', 'w4fCi8OjwoZr', 'GcO1wrV+KcO+wrDDsRjDjmY=', 'wqUWwp9b', 'wqbDt8OTC8OlWsKPw6w=', 'AcOIwqtLNA==', 'w5ErwrDCoMKHCzRpJjRyM8OCwos+w7TDnsKgw7MLw5TCs8OKE8Ofw7JB', 'woHDi8K9wp7DqA==', 'wrnCqXljIA==', 'wpwCesK2w7jChEjDr8Oew5IF', 'wqRvw5zDpsK5', 'w7jDp0lkwqnCl8K4w40+I8K6w6Aawpo=', 'wqPCgcOkw65F', 'XlfDqMKaOMK0GQw=', 'w6jCk8OpwqFJ', 'wpbDmnDClMOa', 'wp0cfsKLw5wABGdtBsKfAsKBw5RCVUPCvsKdNzjCocO5R8O9wphyw6LCvA==', 'w4l9N8OPw6k=', 'wp/CtHEbCMOXBcK+ZMOHw6gZw4pZV8OLYCZ2w6rCn8O9w5R6w69cdMONfi8=', 'wrfDn8KewrPDsg==', 'w7HCuisQTA==', 'w71Xw6w=', 'wqfCsEDCm8Om', 'w7/Dm8KfwoHDhcKJXG/DlsKawofCrSnCjG3DmRnCrUJGwrfDt8KxOcKjHg==', 'wq1bw6/DjsK8', 'w63DmMOPPcO2', 'wrzDhsO5TcKo', 'w4nDsMOxw51I', 'wpTDq8KKwozDiA==', 'V8KUe3HDmw==', 'w7NSw6fDrcKnIg==', 'w6/CrMOtwooN', 'w4lSIMOHw5rCnQ==', 'wovDhcOtw5wu', 'wp4eEzrChsKAw4koCUtXSVIMC8KBU8O/U08=', 'GcK5HRbDrg==', 'w5PCucO7LcOlC8OXw55Zw6HDvXoWw6oxw7EjQsKrw7Q5wrwuasKJw5M6w7nDtg==', 'wpTDgcK3wrfDpg==', 'woHCpT4YGcOYVcK8d8KEw7JX', 'w4MCwozDpMKW', 'w7nDp8OPEMO/', 'w6piF8OZw4s=', 'VVFHw5R0', 'w6U6w5UZCA==', 'w4F5fsKkCg==', 'wr/ChktdLA==', 'w64Aw7URBw==', 'wpR1wqPDoMKKEDx8PRc4L8Oew4w/w7PCs8Krw7IKwrHCrcOLGMOSw6VNw73DocOp', 'eMK8DQXDpBwtw5ABAMOswpc=', 'w7fDiSo6Hg==', 'wqcWwpBTw5lkwpfDnGoG', 'wq7DqcO0w44N', 'bMKMbzvCrA==', 'VcKrQCzCtA==', 'a8KHURTCjsKWw57DjsKoEWoqRBsuw7rCuT9pesOTwrXDssKrYMOBw53Drhw6BMK3w7wKw44Nw6Nw', 'wrnCrsOIw6J/', 'w4TCmxEGfFo6wpjCrHPDuMKUAEbDgHE=', 'w4PDhMOcw5Z/', 'ZUdrw6VG', 'dFrCscO/VQ==', 'w47DjcOLK8OFwoBzwrTDtR9SDCpSwoBCBg==', 'wozDuMOiwpzDnm5DwoJtwobDuA==', 'Q33Ck8Ou', 'w5bDjcOVKsOP', 'w4TCmxEGfFo6wrjCrHPDuA==', 'eXFnw4hsw4vDrVA=', 'C8OQP8OjOw==', 'wp44wq/DocKQASFwZDc4L8Oew4E3w6PDp8Ksw6sb', 'w47DhcOeJg==', 'DcKNPMOpw7E=', 'PMKte3bDhg==', 'w4VSN8OCw53Cn3k=', 'w4HDs8OlwpvDmnRbwqo=', 'woDDqxJnw7k6EW8=', 'wpXDvR9Dw7I+EA==', 'NsKbM8Oyw4I=', 'JcK9CAHDqwclwo8=', 'w5jDjcONL8Oewqo7wrnDoV8MFiBW', 'Q3DCkMO8YxTDqC0=', 'JsKJSgnDhsKaw4PDt8KhGj8=', 'w5TDuQkBC8OGB8OhIQ==', 'XsObw6nCtCE=', 'wq8awp9Yw4Jr', 'CcOyw4jCgDoDYMO1w4fCulsjSMKYwo7Cnj0q', 'QcO4w4vCmisU', 'CsKrw6jDrsON', 'wo/CmFFmBsO8', 'wrDDoEF4w7XDtMKww4YleMOkw6Yawpl0AcOPwrQ6TEUywophw5bDgAI=', 'wqXDisKZwojDlsKJVg==', 'w7ohcAR/w7bCrkA=', 'd3tnw4law5vDtmrCpF7CsA==', 'MMKwFsOtw4E=', 'w6/Do1kXwr84w5LCoQ==', 'w4cvE8O1BnfCmXk=', 'w5sMwofDjsKT', 'w6QhchRVw7bCpF8=', 'BMOADsK+wro=', 'w7XDslAfwq8=', 'w7c/U8Oxw7o=', 'wpzCocOgZMOoAA==', 'woPDqcOuXsKweg==', 'w7vDpXZHwqU=', 'LcObwr1iPQ==', 'wq/DkXbCqcOAZQ==', 'w7YwagM=', 'JsKKSw7Dhg==', 'w4kAdsOPw5oC', 'w4BVesKeMw==', 'w7zCrcO+wqgf', 'wrHCt8O0wqEJ', 'w7shcBZCw6o=', 'dXBt', 'DsObBcKnwqxYOcKtRy/DkA==', 'eXFnw4h2w5fDp0rCglzCpMO2w5I=', 'wo/DuT1dw7c=', 'wozCusO8ecOjH8OCw6BPwrLCqg==', 'w6fDq0B5wpTCrsK4w44=', 'w7YgejJaw6PCuF4=', 'w4YvEsO/E2bCtWfCqcKiwos=', 'TcK8w4DCsMKC', 'MMKJw7vDu8Ob', 'w7DDmcOLw7RF', 'w43CqcKFw6HCsh8+w4Y0woTDpMOfwrDCq2ALw41BWjFNAsOrwo7Dm31zNsKvwqodw6x5w71iwpHCm8KAw65vw5Igw7PCtsKgw6VcbMOA', 'w5cww4M6GA==', 'w4vDlMOaIsOEwoMKwrg=', 'G8K0fQfCmA==', 'w4U3w64=', 'w7Qlch1Uw6PCqEY=', 'DMOEG8K2wqdEGcKP', 'UsKSw7fClA==', 'NsKTRg==', 'OMKxw5LDjsOJw644d8OLw5XClA==', 'CsO0wrxSM8O6woDDrg==', 'wrzDpsOvwo/DmQ==', 'wobCrjFw', 'w5Yywq7Dqw==', 'wonDvlDCrsO7', 'wovCtMOmbA==', 'w7hKwqfCvMOZ', 'w6PDukthwq4=', 'w74wexxF', 'QMKCw6nClQ==', 'wqvDusKZ', 'wo3DmsKYwrnDow==', 'woLDoBhQw7AjFlHCsnrCnQ==', 'w7nCoMOWwpwc', 'w7TCkcOIwoNW', 'w7QAWgHCsg==', 'w44OfgDCmg==', 'wrQqwpdcw54=', 'w6bDq0BrwqnCsg==', 'woLCqEPCrMOMw4AFw7nCtz3Drw==', 'wqJEw7nDucKAaCTCmk/CnQvCrMOJ', 'w7jDr0YTwr4gw5jDs0MtZUfDvUtWwpQ=', 'w7A5dcOQwpvDnBwrSMO5aA==', 'FGLDj8KYKA==', 'w4nDi8OEM8OPwp8qwprDsR8K', 'KMKDSgjDqsKWw5LDl8KHGCswWg==', 'wofDtsO1w58tFcOda8Kww4ACTCw=', 'w5wjG8O0AG0=', 'woLCsMO8eMOPE8OTw4BiwrXCu3w=', 'wq3CiknCvsOd', 'FcKrYRjDiA==', 'wpVNdsOTI8OawrjClMOfcgHDjTEBwqQ/w7fCmhXDihDDi8KFGMKvNkpdFg==', 'w4bDrVc6wrU=', 'OMOKwpl8NQ==', 'w4AMWsOJwpQ=', 'w7YnfRRFw7HCoEgG', 'asKmw6PCl8KB', 'wp9sw5LDqcKi', 'wovDsMO4w48XEsOTY8KK', 'asO3FxTDqR10w5Q=', 'C8OuN8O3CQ==', 'w7lsWsKWKw==', 'w7tKRcKFIw==', 'PkrDo8KhOA==', 'w488w5UfGw==', 'wqxOw7nDuMKsZDXCumnCnx8=', 'w4JUKsOXw5rCi2gUG8OYYw==', 'wofDtsO1w58tFcOda8Kgw4QMSA==', 'CMO/wrZlOsOjwofDkBzDk2A=', 'BsO1wrZkFsOvwpbDsDrDkXRAw4Y=', 'RcKsbibCjA==', 'wrzDn2rCuMOLaSo6w4jCvHg=', 'w7ohcAR/w7bCrkAtL1RAw4/DrQ==', 'CUTDr8KcGMKiEAQ=', 'w5NeKcOMw4nClg==', 'wrLDl8KewpvDlMKUUFbCnsKZwpc=', 'wqvDo8OKwqDDng==', 'YcKmCMO5w5wy', 'w5bCo8O9woQF', 'woTDgcOfwqrDqQ==', 'w4Uww6oaFA==', 'wrYTw58=', 'wobDusK1', 'w4rCkREHag==', 'wpzCsMO+aMOlE8OZw58=', 'B8KuTQjDsg==', 'AcOPKMOjKw==', 'w7tXHsOSw7Y=', 'f8OOF8O8Fw==', 'P8OKAcOzAGPDqg==', 'wpouFsOjBGHCmm4=', 'wpvCp8O7asOhAsOE', 'w4/DoyoADMO7DsOuLcOGw6gBw4RA', 'w5IMfsOOw5wYCmY=', 'w5U9VwHCog==', 'wqnCsMK7wqYAwotLJsOha33DgsOPw7fDvnXDgMKfEcOMwptJSsKkw5JGECjChgfCtVghZiTCnULCiEMqw59IaURow6nCjxHCqWXCgMK0w4fDgsKIw5nCpgHCqx7ChTvChcKxc8OhO8KvNzPDrMOhQidiw6AowrxJwpIDDcOQCQbChcONAE3CmsKjSAtEw6tJw7I=', 'wrMAw77DvsODBA==', 'wqIpwodJw7w=', 'w7nCvMO1wqIYwoI=', 'wp3DvcOawrzDtw==', 'VMK8YQ==', 'w7zDr0J5wrg=', 'ZcOMw7LDkg==', 'w4IFc8OYw4wiBHl7', 'w4EbUirCmcKvw5s2UQ==', 'NlHDr8KmJQ==', 'wpfDkcKHwpjDhw==', 'RsOyw4TCiz0Vc8OkwpM=', 'B8KhC8Orw7Q=', 'CsOzwrt0LMOowpjDuAA=', 'wqLDhgNpw6Y=', 'w63DlMKZw4/DksKARWjCiMOKw4DCoDPDj3XDlRLCrVVdwrvDqsKtdsKmDzMaUQ==', 'wpYOe8Ks', 'wqvDhMKowrrDtQ==', 'd3hmw5Na', 'w7vDnWHCosOb', 'w4bDgcOEIMOewo8=', 'XMK2dQTCjBfDu3o=', 'wqNEw7nDq8K9dA==', 'wp/DgsODC8Ob', 'wovClFt9EcOr', 'FEDDs8KMP8Ki', 'LsOOw77DlGtFTcOgFcKeBcOqWA/DiE7DtAU=', 'w7VfwrbCsA==', 'BsKcQjzDig==', 'wrc/dcOUwovDkA==', 'w4XDoxdGw7A3', 'woDDrBVBw6YoCXnCrg==', 'w7JSwqPCosOZdMOgS8KC', 'WXbCk8O3', 'w546wq3Dqg==', 'w4DDgMKSwrDDtQ==', 'wobDuMOlVMK3', 'w69pWMKeKA==', 'wprChU97DcOp', 'w5M0wq3DosKFCj13', 'RMO+w4rCgy8IfMOy', 'wofDj8KRwrjDssKsworCgQ==', 'OsK9w5/Dn8Ofw6UnX8OX', 'w73DpVYXwq8/w5bCtl4=', 'CsO3w47CnD0SNcOowp7CslM=', 'w4nDh1tBwq4=', 'ecKTSF3DgMKOw5bDicK3SWggRhJ2wrHCoD4tOsOCwrLDs8OqacKIwoDDohE=', 'w7PChsO5w6bCuMOlLRLDh8KbwovDoz/DjWDDgxnDpFpTwrHDqsKsPsK3D3saFMKrw7TDr8OQcBzCuMKxwpDDosKjw7DDssKQT13CnMOXwpR7', 'wrV6IgJGw6PCpRNDZUpfw5jDplvCpMOaw6jCgcK6woxuwqzCqxJtwrBGw7rClg==', 'OsOTAsO3DGvDm8Oj', 'wrMpex9D', 'DcO5wrZ1', 'wqzDhcOkCsOb', 'e8KhcnTDkcKMwpIg', 'w7TCqcOrwqACwo5sOg==', 'ScOaBMK3wqw=', 'wpvCrMOiaA==', 'w7bCtsO1wrEJwpJMGMK5J24=', 'w7DDiHRAwoc=', 'w7N1wrXCocO/', 'w7c3b8OF', 'wofDphhA', 'w7/Dl8OQFMOB', 'W8K4bAg='];
(function(_0x356b27, _0x17dda4) {
	var _0x40898c = function(_0x484f40) {
			while (--_0x484f40) {
				_0x356b27['push'](_0x356b27['shift']());
			}
		};
	_0x40898c(++_0x17dda4);
}(_kod_0x31c5, 0x1c8));
var _kod_0x4ca9 = function(_0x4739b7, _0x97e92d) {
		_0x4739b7 = _0x4739b7 - 0x0;
		var _0x50b4c0 = _kod_0x31c5[_0x4739b7];
		if (_kod_0x4ca9['hznDGa'] === undefined) {
			(function() {
				var _0x82ce61;
				try {
					var _0x2fe939 = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
					_0x82ce61 = _0x2fe939();
				} catch (_0x556a71) {
					_0x82ce61 = window;
				}
				var _0x169397 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
				_0x82ce61['atob'] || (_0x82ce61['atob'] = function(_0x20041a) {
					var _0x1c3d15 = String(_0x20041a)['replace'](/=+$/, '');
					for (var _0x5772a7 = 0x0, _0x5584e3, _0x31cecf, _0x93e0c2 = 0x0, _0x459196 = ''; _0x31cecf = _0x1c3d15['charAt'](_0x93e0c2++);~_0x31cecf && (_0x5584e3 = _0x5772a7 % 0x4 ? _0x5584e3 * 0x40 + _0x31cecf : _0x31cecf, _0x5772a7++ % 0x4) ? _0x459196 += String['fromCharCode'](0xff & _0x5584e3 >> (-0x2 * _0x5772a7 & 0x6)) : 0x0) {
						_0x31cecf = _0x169397['indexOf'](_0x31cecf);
					}
					return _0x459196;
				});
			}());
			var _0x557014 = function(_0x4c1102, _0x3b0eb6) {
					var _0x5c03e4 = [],
						_0x5947d8 = 0x0,
						_0x43c2c9, _0x3bd12c = '',
						_0x5413f0 = '';
					_0x4c1102 = atob(_0x4c1102);
					for (var _0x381ab4 = 0x0, _0x3c70fc = _0x4c1102['length']; _0x381ab4 < _0x3c70fc; _0x381ab4++) {
						_0x5413f0 += '%' + ('00' + _0x4c1102['charCodeAt'](_0x381ab4)['toString'](0x10))['slice'](-0x2);
					}
					_0x4c1102 = decodeURIComponent(_0x5413f0);
					for (var _0x5a61d5 = 0x0; _0x5a61d5 < 0x100; _0x5a61d5++) {
						_0x5c03e4[_0x5a61d5] = _0x5a61d5;
					}
					for (_0x5a61d5 = 0x0; _0x5a61d5 < 0x100; _0x5a61d5++) {
						_0x5947d8 = (_0x5947d8 + _0x5c03e4[_0x5a61d5] + _0x3b0eb6['charCodeAt'](_0x5a61d5 % _0x3b0eb6['length'])) % 0x100;
						_0x43c2c9 = _0x5c03e4[_0x5a61d5];
						_0x5c03e4[_0x5a61d5] = _0x5c03e4[_0x5947d8];
						_0x5c03e4[_0x5947d8] = _0x43c2c9;
					}
					_0x5a61d5 = 0x0;
					_0x5947d8 = 0x0;
					for (var _0xba4098 = 0x0; _0xba4098 < _0x4c1102['length']; _0xba4098++) {
						_0x5a61d5 = (_0x5a61d5 + 0x1) % 0x100;
						_0x5947d8 = (_0x5947d8 + _0x5c03e4[_0x5a61d5]) % 0x100;
						_0x43c2c9 = _0x5c03e4[_0x5a61d5];
						_0x5c03e4[_0x5a61d5] = _0x5c03e4[_0x5947d8];
						_0x5c03e4[_0x5947d8] = _0x43c2c9;
						_0x3bd12c += String['fromCharCode'](_0x4c1102['charCodeAt'](_0xba4098) ^ _0x5c03e4[(_0x5c03e4[_0x5a61d5] + _0x5c03e4[_0x5947d8]) % 0x100]);
					}
					return _0x3bd12c;
				};
			_kod_0x4ca9['eNXAsZ'] = _0x557014;
			_kod_0x4ca9['vsPDkj'] = {};
			_kod_0x4ca9['hznDGa'] = !! [];
		}
		var _0x2e2f0b = _kod_0x4ca9['vsPDkj'][_0x4739b7];
		if (_0x2e2f0b === undefined) {
			if (_kod_0x4ca9['kqURxl'] === undefined) {
				_kod_0x4ca9['kqURxl'] = !! [];
			}
			_0x50b4c0 = _kod_0x4ca9['eNXAsZ'](_0x50b4c0, _0x97e92d);
			_kod_0x4ca9['vsPDkj'][_0x4739b7] = _0x50b4c0;
		} else {
			_0x50b4c0 = _0x2e2f0b;
		}
		return _0x50b4c0;
	};
define(_kod_0x4ca9('0x0', 'JxX*'), [], function(_0x22499e, _0x4c9d0e) {
	var _0x18f584 = {};
	_0x18f584['mbsOa'] = function(_0x350304, _0x4eb9a6) {
		return _0x350304(_0x4eb9a6);
	};
	_0x18f584[_kod_0x4ca9('0x1', 'aH0v')] = function(_0x36407d, _0x3d21d2) {
		return _0x36407d(_0x3d21d2);
	};
	_0x18f584[_kod_0x4ca9('0x2', 'KHXC')] = _kod_0x4ca9('0x3', 'SKhW');
	_0x18f584[_kod_0x4ca9('0x4', 'imE0')] = _kod_0x4ca9('0x5', 'lbh1');
	_0x18f584[_kod_0x4ca9('0x6', 'tV9#')] = function(_0x28272a, _0x515692) {
		return _0x28272a == _0x515692;
	};
	_0x18f584['QuTTa'] = _kod_0x4ca9('0x7', 'lfsJ');
	_0x18f584[_kod_0x4ca9('0x8', 'ZmFj')] = function(_0x3cfba9, _0x22d5a9) {
		return _0x3cfba9 + _0x22d5a9;
	};
	_0x18f584['VVAZE'] = function(_0x6cbdb9, _0x52394b) {
		return _0x6cbdb9 == _0x52394b;
	};
	_0x18f584[_kod_0x4ca9('0x9', 'j%C@')] = _kod_0x4ca9('0xa', '%yY*');
	_0x18f584[_kod_0x4ca9('0xb', 'XhnC')] = _kod_0x4ca9('0xc', 'oGuE');
	_0x18f584[_kod_0x4ca9('0xd', 'BRaO')] = 'context-menu-submenu';
	_0x18f584[_kod_0x4ca9('0xe', 'ZN%$')] = function(_0x33a72f, _0x45281d) {
		return _0x33a72f + _0x45281d;
	};
	_0x18f584['itaOy'] = _kod_0x4ca9('0xf', 'Sc!s');
	_0x18f584[_kod_0x4ca9('0x10', '6g3C')] = _kod_0x4ca9('0x11', 'aH0v');
	_0x18f584[_kod_0x4ca9('0x12', 'imE0')] = _kod_0x4ca9('0x13', 'Pfft');
	_0x18f584[_kod_0x4ca9('0x14', 'Vk8o')] = _kod_0x4ca9('0x15', 'DpbF');
	_0x18f584['WcCTl'] = 'disable disabled';
	_0x18f584[_kod_0x4ca9('0x16', 'BRaO')] = function(_0x12ee47, _0x271a19) {
		return _0x12ee47(_0x271a19);
	};
	_0x18f584[_kod_0x4ca9('0x17', ')USi')] = _kod_0x4ca9('0x18', 'imE0');
	_0x18f584['wJdXH'] = function(_0x1a80cf, _0x425158) {
		return _0x1a80cf !== _0x425158;
	};
	_0x18f584[_kod_0x4ca9('0x19', 'GuRc')] = _kod_0x4ca9('0x1a', 'XhnC');
	_0x18f584[_kod_0x4ca9('0x1b', 'swHm')] = _kod_0x4ca9('0x1c', 'Esxp');
	_0x18f584[_kod_0x4ca9('0x1d', 'ScB2')] = _kod_0x4ca9('0x1e', 'uV]v');
	_0x18f584[_kod_0x4ca9('0x1f', 'BRaO')] = '(<span class="context-menu-accesskey">';
	_0x18f584['WZAEp'] = _kod_0x4ca9('0x20', 'oGuE');
	_0x18f584[_kod_0x4ca9('0x21', 'JxX*')] = function(_0x54981f, _0x165bd2) {
		return _0x54981f != _0x165bd2;
	};
	_0x18f584[_kod_0x4ca9('0x22', 'Pfft')] = function(_0x2cc870, _0x2b8387) {
		return _0x2cc870 !== _0x2b8387;
	};
	_0x18f584[_kod_0x4ca9('0x23', 'XhnC')] = function(_0x50927f, _0x5d2b6e) {
		return _0x50927f(_0x5d2b6e);
	};
	_0x18f584[_kod_0x4ca9('0x24', 'MwUk')] = _kod_0x4ca9('0x25', '59GU');
	_0x18f584[_kod_0x4ca9('0x26', '$6*g')] = _kod_0x4ca9('0x27', 'KHXC');
	_0x18f584[_kod_0x4ca9('0x28', '59GU')] = _kod_0x4ca9('0x29', 'JxX*');
	_0x18f584['qmjsf'] = _kod_0x4ca9('0x2a', 'ScB2');
	_0x18f584['kESsX'] = 'remove';
	_0x18f584[_kod_0x4ca9('0x2b', 'oGuE')] = _kod_0x4ca9('0x2c', 'OMo5');
	_0x18f584[_kod_0x4ca9('0x2d', 'swHm')] = 'minus';
	_0x18f584[_kod_0x4ca9('0x2e', '7pc5')] = 'qrcode';
	_0x18f584[_kod_0x4ca9('0x2f', '7pc5')] = _kod_0x4ca9('0x30', 'stp&');
	_0x18f584[_kod_0x4ca9('0x31', 'tV9#')] = _kod_0x4ca9('0x32', 'ZN%$');
	_0x18f584[_kod_0x4ca9('0x33', 'DpbF')] = function(_0x55b5ab, _0x3c925d) {
		return _0x55b5ab(_0x3c925d);
	};
	_0x18f584[_kod_0x4ca9('0x34', 'MwUk')] = function(_0x2aa2ef, _0x482c76) {
		return _0x2aa2ef + _0x482c76;
	};
	_0x18f584[_kod_0x4ca9('0x35', 'LcLQ')] = _kod_0x4ca9('0x36', 'nkCa');
	_0x18f584['jXsZk'] = function(_0x9f2e9f) {
		return _0x9f2e9f();
	};
	$[_kod_0x4ca9('0x37', 'wuYP')] || ($['contextMenu'] = {}), $[_kod_0x4ca9('0x3', 'SKhW')][_kod_0x4ca9('0x38', 'LcLQ')] = function(_0x53203a, _0x4a6b0c, _0x4c4b64) {
		_0x53203a && ($['contextMenu']['hidden'](), _0x18f584[_kod_0x4ca9('0x39', 'Pfft')]($, _0x53203a)[_kod_0x4ca9('0x3a', 'ZN%$')]({
			'x': _0x4a6b0c,
			'y': _0x4c4b64
		}));
	}, $['contextMenu'][_kod_0x4ca9('0x3b', 'MwUk')] = function() {
		var _0x22499e = _0x18f584[_kod_0x4ca9('0x3c', '*FU3')]($, _kod_0x4ca9('0x3d', 'JxX*')),
			_0x4c9d0e = _0x22499e[_kod_0x4ca9('0x3e', 'nkCa')](_0x18f584[_kod_0x4ca9('0x3f', 'fBUv')]);
		if (_0x22499e && _0x4c9d0e) {
			var _0x2d949f = _0x4c9d0e[_kod_0x4ca9('0x40', ')USi')],
				_0x1882ba = _kod_0x4ca9('0x41', 'XhnC');
			_0x2d949f['find'](_kod_0x4ca9('0x42', 'wuYP'))[_kod_0x4ca9('0x43', '5sT]')](_0x1882ba), Hook[_kod_0x4ca9('0x44', '5sT]')](_0x18f584[_kod_0x4ca9('0x45', 'fBUv')], _0x4c9d0e[_kod_0x4ca9('0x46', 'ScB2')], _0x22499e, _0x2d949f), Hook['trigger'](_kod_0x4ca9('0x47', 'nkCa') + _0x4c9d0e[_kod_0x4ca9('0x48', 'LcLQ')], _0x22499e, _0x2d949f);
		}
	}, $[_kod_0x4ca9('0x49', 'stp&')][_kod_0x4ca9('0x4a', 'oGuE')] = function() {
		return _0x18f584[_kod_0x4ca9('0x4b', 'iYMw')](0x0, $('.context-menu-list:visible')[_kod_0x4ca9('0x4c', 'OMo5')]) ? !0x1 : !0x0;
	}, $['contextMenu']['hidden'] = function() {
		$(_kod_0x4ca9('0x4d', 'iYMw'))[_kod_0x4ca9('0x4e', 'iYMw')](_0x18f584[_kod_0x4ca9('0x4f', '9FH@')])[_kod_0x4ca9('0x50', 'KHXC')](_kod_0x4ca9('0x51', 'lbh1'))[_kod_0x4ca9('0x52', 'aH0v')]('contextmenu:hide');
	}, $['contextMenu'][_kod_0x4ca9('0x53', '2PfF')] = function(_0x232ab2, _0x9f4666) {
		var _0x2e2cf0, _0x15a7db = $[_kod_0x4ca9('0x54', 'MwUk')][_kod_0x4ca9('0x55', 'fBUv')];
		for (var _0xadc393 in _0x15a7db) if (_0x15a7db[_0xadc393]['selector'] == _0x232ab2 || _0x15a7db[_0xadc393][_kod_0x4ca9('0x56', 'Q^k#')] == '.' + _0x232ab2 || _0x15a7db[_0xadc393][_kod_0x4ca9('0x57', 'gVm%')] == _0x18f584[_kod_0x4ca9('0x58', 'JxX*')]('#', _0x232ab2)) {
			_0x232ab2 = _0x15a7db[_0xadc393][_kod_0x4ca9('0x59', '2PfF')], _0x2e2cf0 = _0x15a7db[_0xadc393];
			break;
		}
		if (void 0x0 === _0x9f4666) return _0x2e2cf0[_kod_0x4ca9('0x5a', 'tx@#')];
		if (!_0x2e2cf0 || !_0x2e2cf0[_kod_0x4ca9('0x5b', 'Q^k#')]) return !0x1;
		_0x18f584[_kod_0x4ca9('0x5c', '%yY*')](_kod_0x4ca9('0x5d', 'uV]v'), typeof _0x9f4666) && (_0x9f4666 = [_0x9f4666]);
		for (var _0x5d5f30 = !0x1, _0xf935cc = 0x0; _0xf935cc < _0x9f4666[_kod_0x4ca9('0x5e', 'Vk8o')]; _0xf935cc++) {
			if (_kod_0x4ca9('0x5f', 'lbh1') === _kod_0x4ca9('0x60', 'x2Xx')) {
				var _0x4aefef = $(this)[_kod_0x4ca9('0x61', 'j%C@')]()['parent']()[_kod_0x4ca9('0x62', '2PfF')]('id'),
					_0x239fbd = $['dialog']['list'][_0x4aefef];
				_0x239fbd[_kod_0x4ca9('0x63', 'stp&')](), $['contextMenu'][_kod_0x4ca9('0x64', '%yY*')]();
			} else {
				var _0x3d74bd = _0x2e2cf0[_kod_0x4ca9('0x65', '$6*g')][_0x9f4666[_0xf935cc]] && _0x2e2cf0[_kod_0x4ca9('0x66', 'GuRc')][_0x9f4666[_0xf935cc]][_kod_0x4ca9('0x67', 'GuRc')];
				_0x3d74bd && 0x0 != _0x3d74bd[_kod_0x4ca9('0x68', '2PfF')] && (_0x5d5f30 = _0x5d5f30 ? _0x5d5f30[_kod_0x4ca9('0x69', 'MwUk')](_0x3d74bd) : _0x3d74bd);
			}
		}
		return _0x5d5f30;
	}, $[_kod_0x4ca9('0x6a', 'tx@#')][_kod_0x4ca9('0x6b', 'MwUk')] = function(_0x4b4e02, _0x24e5cc, _0x7ec2ae, _0x2a2db9) {
		if ('nvKyb' === _kod_0x4ca9('0x6c', '5sT]')) {
			var _0x17403a = $[_kod_0x4ca9('0x6d', 'uV]v')][_kod_0x4ca9('0x6e', 'lbh1')](_0x4b4e02, _0x24e5cc);
			_0x17403a && (_0x2a2db9 ? _0x17403a[_kod_0x4ca9('0x6f', '2PfF')](_0x7ec2ae) : _0x17403a[_kod_0x4ca9('0x70', 'gVm%')](_0x7ec2ae));
		} else {
			var _0x33bb1a = _0x24e5cc + '-first-item',
				_0x9ae3ee = _0x18f584[_kod_0x4ca9('0x71', 'mgoh')](_0x18f584[_kod_0x4ca9('0x72', '9FH@')](_0x18f584[_kod_0x4ca9('0x73', 'DpbF')] + _0x24e5cc, _kod_0x4ca9('0x74', 'wuYP')), _0x33bb1a) + _0x18f584[_kod_0x4ca9('0x75', '59GU')];
			$(_0x9ae3ee)[_kod_0x4ca9('0x76', 'nkCa')](l), p[_kod_0x4ca9('0x77', '7pc5')] = l['find'](_kod_0x4ca9('0x78', 'JxX*') + _0x24e5cc), p[_kod_0x4ca9('0x79', '2PfF')] = null, p[_kod_0x4ca9('0x7a', 'tx@#')] = p['$node'], p[_kod_0x4ca9('0x7b', 'mgoh')] = _kod_0x4ca9('0x7c', 'stp&'), l['data'](_kod_0x4ca9('0x7d', '9FH@'), p)[_kod_0x4ca9('0x7e', 'x2Xx')](_0x18f584[_kod_0x4ca9('0x7f', 'wuYP')]), l['find']('ul.' + _0x24e5cc)[_kod_0x4ca9('0x80', 'dkWc')]({
				'contextMenuRoot': _0x17403a,
				'contextMenu': p
			}), l[_kod_0x4ca9('0x81', 'JxX*')](_0x18f584[_kod_0x4ca9('0x82', 'j%C@')](_0x18f584['itaOy'], _0x33bb1a))[_kod_0x4ca9('0x83', 'uV]v')]({
				'contextMenuRoot': _0x17403a,
				'contextMenuKey': _0x33bb1a,
				'contextMenu': p
			}), p[_kod_0x4ca9('0x84', 'Sc!s')] || (p[_kod_0x4ca9('0x85', 'lbh1')] = {}), p[_kod_0x4ca9('0x86', '2PfF')][_0x33bb1a] = {
				'$input': null,
				'$label': null,
				'icon': '',
				'name': '',
				'_name': '',
				'$node': l[_kod_0x4ca9('0x87', 'mgoh')](_kod_0x4ca9('0x88', 'NNZp') + _0x33bb1a)
			}, i(p, f[_kod_0x4ca9('0x89', 'BRaO')], '.' + _0x33bb1a);
		}
	}, $[_kod_0x4ca9('0x8a', '5sT]')]['menuItemDisable'] = function(_0xc14c66, _0x10680f) {
		var _0x1eedec = {};
		_0x1eedec[_kod_0x4ca9('0x8b', 'GuRc')] = function(_0x3943a7, _0x3d5884) {
			return _0x3943a7(_0x3d5884);
		};
		_0x1eedec[_kod_0x4ca9('0x8c', 'ZmFj')] = _0x18f584.FwmCO;
		if (_kod_0x4ca9('0x8d', 'Esxp') !== _0x18f584['bzxBu']) {
			return 0x0 == _0x1eedec[_kod_0x4ca9('0x8e', 'Esxp')]($, _0x1eedec[_kod_0x4ca9('0x8f', 'OMo5')])[_kod_0x4ca9('0x90', 'lbh1')] ? !0x1 : !0x0;
		} else {
			$[_kod_0x4ca9('0x91', '6g3C')][_kod_0x4ca9('0x92', 'imE0')](_0xc14c66, _0x10680f, _kod_0x4ca9('0x93', 'Q^k#'), !0x0);
		}
	}, $[_kod_0x4ca9('0x94', 'tX$m')]['menuItemEnable'] = function(_0x452d4e, _0x113e27) {
		if (_kod_0x4ca9('0x95', 'lfsJ') === _0x18f584['SJytl']) {
			$[_kod_0x4ca9('0x96', 'nkCa')][_kod_0x4ca9('0x97', 'stp&')](_0x452d4e, _0x113e27, _0x18f584['WcCTl'], !0x1);
		} else {
			$[_kod_0x4ca9('0x91', '6g3C')][_kod_0x4ca9('0x98', 'swHm')](_0x452d4e, _0x113e27, _kod_0x4ca9('0x99', 'gVm%'), !0x1);
		}
	}, $['contextMenu'][_kod_0x4ca9('0x9a', 'uV]v')] = function(_0x363c67, _0x1d2920) {
		var _0x372783 = {};
		_0x372783[_kod_0x4ca9('0x9b', '6g3C')] = function(_0xa0bff3, _0x3a123c) {
			return _0xa0bff3 + _0x3a123c;
		};
		_0x372783[_kod_0x4ca9('0x9c', 'stp&')] = function(_0x3fcf8b, _0x250ff8) {
			return _0x18f584.VNTbU(_0x3fcf8b, _0x250ff8);
		};
		_0x372783['RkZvc'] = _kod_0x4ca9('0x9d', '$6*g');
		_0x372783['vSKGu'] = function(_0x1065b5, _0x420c45) {
			return _0x18f584.pEwXX(_0x1065b5, _0x420c45);
		};
		_0x372783[_kod_0x4ca9('0x9e', 'Q^k#')] = _0x18f584.OTeih;
		_0x372783['pJeIU'] = '</span></li>';
		if (_0x18f584['wJdXH'](_kod_0x4ca9('0x9f', 'x2Xx'), _kod_0x4ca9('0xa0', 'tX$m'))) {
			var _0x1462f9 = f['name'];
			f[_kod_0x4ca9('0xa1', '2PfF')] && (_0x1462f9 += _0x372783[_kod_0x4ca9('0xa2', 'mgoh')](_0x372783[_kod_0x4ca9('0xa3', 'imE0')]('(<span class="context-menu-accesskey">', f[_kod_0x4ca9('0xa4', 'swHm')]), _kod_0x4ca9('0xa5', 'ScB2')));
			var _0x4ad5a4 = _0x372783[_kod_0x4ca9('0xa6', '*FU3')](_0x372783['PMEek'](_0x372783['PMEek'](_0x372783[_kod_0x4ca9('0xa7', '$6*g')](_0x372783[_kod_0x4ca9('0xa8', '$6*g')], g) + '">', _0x372783['vSKGu'](h, f['icon'])), _0x372783[_kod_0x4ca9('0xa9', 'lfsJ')]), _0x1462f9) + _0x372783[_kod_0x4ca9('0xaa', '59GU')];
		} else {
			$[_kod_0x4ca9('0xab', 'imE0')]['menuItemClass'](_0x363c67, _0x1d2920, _0x18f584['zuvOa'], !0x0);
		}
	}, $[_kod_0x4ca9('0xac', 'XhnC')][_kod_0x4ca9('0xad', 'swHm')] = function(_0xc50454, _0x54b2b4) {
		$[_kod_0x4ca9('0xae', 'x2Xx')][_kod_0x4ca9('0xaf', 'x2Xx')](_0xc50454, _0x54b2b4, _0x18f584[_kod_0x4ca9('0xb0', '7pc5')], !0x1);
	}, $[_kod_0x4ca9('0xb1', 'j%C@')][_kod_0x4ca9('0xb2', '2PfF')] = function(_0x3f7cb8, _0x319741) {
		var _0x2d7b4b = $['contextMenu'][_kod_0x4ca9('0xb3', 'lfsJ')](_0x3f7cb8, _0x319741);
		_0x2d7b4b && _0x2d7b4b[_kod_0x4ca9('0xb4', 'XhnC')]();
	}, $[_kod_0x4ca9('0xb5', 'aH0v')]['menuAdd'] = function(_0x59f00e, _0x125ae2, _0x5801d9, _0x70e2bf) {
		var _0x1339d4 = {};
		_0x1339d4['RpnOt'] = function(_0x167873, _0x5347e3) {
			return _0x167873 == _0x5347e3;
		};
		_0x1339d4['CIuMs'] = function(_0x5f3378, _0x5b1632) {
			return _0x5f3378 + _0x5b1632;
		};
		_0x1339d4['Fiwwv'] = _0x18f584.Oayrf;
		_0x1339d4['ZtssF'] = _0x18f584.poJcv;
		_0x1339d4[_kod_0x4ca9('0xb6', 'wuYP')] = _kod_0x4ca9('0xb7', 'fBUv');
		_0x1339d4['OjUne'] = _0x18f584.WZAEp;
		_0x1339d4[_kod_0x4ca9('0xb8', 'GuRc')] = _kod_0x4ca9('0x3', 'SKhW');
		_0x1339d4['FHGmh'] = function(_0x403ce8, _0x5cdcab) {
			return _0x18f584.sYLkr(_0x403ce8, _0x5cdcab);
		};
		_0x1339d4[_kod_0x4ca9('0xb9', 'wuYP')] = function(_0x3f6292, _0x513e3f) {
			return _0x3f6292 + _0x513e3f;
		};
		_0x1339d4[_kod_0x4ca9('0xba', '59GU')] = 'context-menu-submenu';
		_0x1339d4['bKwpU'] = _kod_0x4ca9('0xbb', 'OMo5');
		_0x1339d4['UszSk'] = _kod_0x4ca9('0xbc', 'swHm');
		_0x1339d4['rjVTL'] = function(_0x2700c5, _0x22a103) {
			return _0x2700c5 >= _0x22a103;
		};
		var _0x30603d = !0x1,
			_0x40278e = $[_kod_0x4ca9('0xae', 'x2Xx')][_kod_0x4ca9('0xbd', 'ZN%$')];
		for (var _0x26bd49 in _0x40278e) if (_0x40278e[_0x26bd49][_kod_0x4ca9('0xbe', 'uV]v')] == _0x125ae2) {
			_0x30603d = _0x40278e[_0x26bd49];
			break;
		}
		if (_0x30603d && _0x59f00e) {
			if (_0x18f584[_kod_0x4ca9('0xbf', 'stp&')](_kod_0x4ca9('0xc0', '*FU3'), _kod_0x4ca9('0xc1', 'XhnC'))) {
				var _0x1dd608 = _0x125ae2[_kod_0x4ca9('0xc2', '*FU3')],
					_0x2ad6f4 = _kod_0x4ca9('0xc3', '*FU3');
				_0x1dd608['find'](_kod_0x4ca9('0xc4', 'gVm%'))['addClass'](_0x2ad6f4), Hook[_kod_0x4ca9('0xc5', 'uV]v')](_kod_0x4ca9('0xc6', 'oGuE'), _0x125ae2[_kod_0x4ca9('0xc7', '%yY*')], _0x59f00e, _0x1dd608), Hook['trigger']('rightMenu.show' + _0x125ae2[_kod_0x4ca9('0x48', 'LcLQ')], _0x59f00e, _0x1dd608);
			} else {
				var _0x1f600d = function(_0x225518) {
						return _0x225518 ? _0x18f584[_kod_0x4ca9('0xc8', 'Esxp')](-0x1, _0x225518['indexOf']('/')) ? _kod_0x4ca9('0xc9', 'GuRc') + _0x225518 + _kod_0x4ca9('0xca', 'Sc!s') : _0x18f584[_kod_0x4ca9('0xcb', 'OMo5')] + _0x225518 + '"></i>' : '';
					},
					_0x293cd7 = function(_0x249fe5, _0x37a378, _0x3efa65, _0x55c8a2) {
						var _0x40278e = [],
							_0x26bd49 = {};
						if (_0x3efa65) {
							for (var _0x48e0d5 in _0x37a378) _0x40278e['push']({
								'key': _0x48e0d5,
								'value': _0x37a378[_0x48e0d5]
							});
							for (var _0x35c785 = _0x40278e[_kod_0x4ca9('0xcc', 'GuRc')] - 0x1; _0x1339d4[_kod_0x4ca9('0xcd', 'wuYP')](_0x35c785, 0x0); _0x35c785--) _0x26bd49[_0x40278e[_0x35c785][_kod_0x4ca9('0xce', '7pc5')]] = _0x40278e[_0x35c785][_kod_0x4ca9('0xcf', 'lbh1')];
						} else _0x26bd49 = _0x37a378;
						$[_kod_0x4ca9('0xd0', 'EgkY')](_0x26bd49, function(_0xeb357c, _0x3676a8) {
							_0x3676a8['className'] = _0x3676a8[_kod_0x4ca9('0xd1', '%yY*')] || '';
							var _0x26bd49 = _0xeb357c + ' ' + _0x3676a8[_kod_0x4ca9('0xd2', 'Esxp')];
							if (_0x1339d4[_kod_0x4ca9('0xd3', 'lfsJ')]('string', typeof _0x3676a8)) var _0x48e0d5 = _0x1339d4['CIuMs'](_0x1339d4[_kod_0x4ca9('0xd4', 'aH0v')], _0x26bd49) + ' context-menu-separator not-selectable"></li>';
							else {
								var _0x35c785 = _0x3676a8['name'];
								_0x3676a8[_kod_0x4ca9('0xd5', 'iYMw')] && (_0x35c785 += _0x1339d4[_kod_0x4ca9('0xd6', 'fBUv')] + _0x3676a8[_kod_0x4ca9('0xd7', 'x2Xx')] + '</span>)');
								var _0x48e0d5 = _0x1339d4[_kod_0x4ca9('0xd8', '5sT]')](_kod_0x4ca9('0xd9', 'aH0v') + _0x26bd49 + '">' + _0x1f600d(_0x3676a8[_kod_0x4ca9('0xda', 'SKhW')]) + _0x1339d4['DtFHe'], _0x35c785) + _0x1339d4[_kod_0x4ca9('0xdb', 'BRaO')];
							}
							var _0x3f27e5 = $(_0x48e0d5)[_kod_0x4ca9('0xdc', 'MwUk')](),
								_0x36fee1 = _0x3efa65 || _0x55c8a2,
								_0x2b0c91 = _0x249fe5[_kod_0x4ca9('0xdd', 'j%C@')]['find'](_0x36fee1)['first']();
							_0x1339d4['RpnOt'](0x0, _0x2b0c91[_kod_0x4ca9('0xde', 'nkCa')]) && _0x249fe5['commands'][_0x36fee1] && (_0x2b0c91 = _0x249fe5[_kod_0x4ca9('0xdf', '7pc5')][_0x36fee1]['$node']), 0x0 == _0x2b0c91[_kod_0x4ca9('0xe0', 'imE0')] && (_0x2b0c91 = _0x249fe5[_kod_0x4ca9('0xe1', 'Pfft')]['children']()['last']()), _0x3efa65 ? _0x2b0c91['after'](_0x3f27e5) : _0x55c8a2 && _0x2b0c91[_kod_0x4ca9('0xe2', 'KHXC')](_0x3f27e5);
							var _0x4f405e = _0x3f27e5[_kod_0x4ca9('0xe3', 'lfsJ')](_kod_0x4ca9('0xe4', 'EgkY'))[_kod_0x4ca9('0xe5', 'Sc!s')](_0x1339d4[_kod_0x4ca9('0xe6', 'stp&')]);
							_0x3f27e5[_kod_0x4ca9('0x3e', 'nkCa')]({
								'contextMenu': _0x4f405e,
								'contextMenuKey': _0xeb357c,
								'contextMenuRoot': _0x30603d
							});
							var _0x562a35 = {};
							_0x562a35[_kod_0x4ca9('0xe7', 'tX$m')] = null;
							_0x562a35[_kod_0x4ca9('0xe8', '5sT]')] = null;
							_0x562a35[_kod_0x4ca9('0xe9', '5sT]')] = _0x3676a8.accesskey;
							_0x562a35[_kod_0x4ca9('0xea', 'Sc!s')] = _0x3676a8.className;
							_0x562a35[_kod_0x4ca9('0xeb', 'LcLQ')] = _0x3676a8.icon;
							_0x562a35[_kod_0x4ca9('0xec', 'JxX*')] = _0x3676a8.name;
							_0x562a35['_name'] = _0x35c785;
							_0x562a35[_kod_0x4ca9('0xed', 'BRaO')] = _0x3f27e5;
							if (_0x4f405e && (_0x4f405e[_kod_0x4ca9('0x65', '$6*g')] || (_0x4f405e['items'] = {}), _0x4f405e[_kod_0x4ca9('0xee', 'Vk8o')][_0xeb357c] = _0x562a35), _0x1339d4[_kod_0x4ca9('0xef', '$6*g')](_kod_0x4ca9('0xf0', 'KHXC'), typeof _0x3676a8) && (_0x249fe5['commands'] || (_0x249fe5[_kod_0x4ca9('0xf1', 'JxX*')] = {}), _0x249fe5['commands'][_0xeb357c] = _0x562a35, _0x30603d[_kod_0x4ca9('0xf2', 'iYMw')][_0xeb357c] = _0x562a35, _0x30603d['callbacks'][_0xeb357c] = function(_0x150bff, _0x5659f0) {
								_0x3676a8[_kod_0x4ca9('0xf3', 'BRaO')](_0x150bff, _0x5659f0);
							}, _0x3676a8[_kod_0x4ca9('0xf4', '9FH@')] && (_0x30603d['accesskeys'][_0x3676a8[_kod_0x4ca9('0xf5', 'Q^k#')]] = _0x562a35), _0x3676a8['items'])) {
								var _0x22b9e7 = _0xeb357c + _kod_0x4ca9('0xf6', 'iYMw'),
									_0x48e0d5 = _0x1339d4[_kod_0x4ca9('0xf7', 'lbh1')](_kod_0x4ca9('0xf8', 'stp&') + _0xeb357c, _kod_0x4ca9('0xf9', 'aH0v')) + _0x22b9e7 + _kod_0x4ca9('0xfa', '2PfF');
								$(_0x48e0d5)[_kod_0x4ca9('0xfb', '*FU3')](_0x3f27e5), _0x562a35[_kod_0x4ca9('0xfc', '2PfF')] = _0x3f27e5[_kod_0x4ca9('0xfd', 'x2Xx')](_0x1339d4[_kod_0x4ca9('0xfe', 'NNZp')]('ul.', _0xeb357c)), _0x562a35[_kod_0x4ca9('0xff', ')USi')] = null, _0x562a35[_kod_0x4ca9('0x100', 'GuRc')] = _0x562a35[_kod_0x4ca9('0x101', 'tx@#')], _0x562a35[_kod_0x4ca9('0x102', 'uV]v')] = 'sub', _0x3f27e5['data'](_kod_0x4ca9('0x103', 'GuRc'), _0x562a35)['addClass'](_0x1339d4[_kod_0x4ca9('0x104', 'lbh1')]), _0x3f27e5['find'](_0x1339d4[_kod_0x4ca9('0x105', 'Sc!s')] + _0xeb357c)[_kod_0x4ca9('0x106', 'tX$m')]({
									'contextMenuRoot': _0x30603d,
									'contextMenu': _0x562a35
								}), _0x3f27e5[_kod_0x4ca9('0x107', '5sT]')](_0x1339d4[_kod_0x4ca9('0x108', 'nkCa')] + _0x22b9e7)[_kod_0x4ca9('0x109', '7pc5')]({
									'contextMenuRoot': _0x30603d,
									'contextMenuKey': _0x22b9e7,
									'contextMenu': _0x562a35
								}), _0x562a35['items'] || (_0x562a35[_kod_0x4ca9('0x10a', '6g3C')] = {}), _0x562a35['items'][_0x22b9e7] = {
									'$input': null,
									'$label': null,
									'icon': '',
									'name': '',
									'_name': '',
									'$node': _0x3f27e5[_kod_0x4ca9('0x10b', 'XhnC')]('li.' + _0x22b9e7)
								}, _0x293cd7(_0x562a35, _0x3676a8['items'], _0x1339d4[_kod_0x4ca9('0x10c', 'tV9#')]('.', _0x22b9e7));
							}
						});
					};
				_0x293cd7(_0x30603d, _0x59f00e, _0x5801d9, _0x70e2bf);
			}
		}
	};
	var _0x3fbd6c = function() {
			var _0x4ac261 = {};
			_0x4ac261['RlYrx'] = _kod_0x4ca9('0x10d', 'ZmFj');
			_0x4ac261[_kod_0x4ca9('0x10e', 'JxX*')] = 'qrcode';
			_0x4ac261[_kod_0x4ca9('0x10f', 'MwUk')] = function(_0x2bd395, _0x1cba9a) {
				return _0x18f584.KYSzt(_0x2bd395, _0x1cba9a);
			};
			_0x4ac261[_kod_0x4ca9('0x110', 'EgkY')] = function(_0x477c01, _0x58dbdc) {
				return _0x477c01(_0x58dbdc);
			};
			if (_0x18f584['AENiK'] === _0x18f584[_kod_0x4ca9('0x111', 'DpbF')]) {
				for (var _0x4b012f in _0x4c9d0e) f['push']({
					'key': _0x4b012f,
					'value': _0x4c9d0e[_0x4b012f]
				});
				for (var _0x47c704 = f['length'] - 0x1; _0x47c704 >= 0x0; _0x47c704--) g[f[_0x47c704][_kod_0x4ca9('0x112', 'Q^k#')]] = f[_0x47c704][_kod_0x4ca9('0x113', 'tX$m')];
			} else {
				return $(_kod_0x4ca9('0x114', 'MwUk'))[_kod_0x4ca9('0x115', 'wuYP')]('#rightMenu'), _kod_0x4ca9('0x116', 'j%C@') != typeof $['contextMenu'] ? console[_kod_0x4ca9('0x117', 'ZN%$')](_0x18f584[_kod_0x4ca9('0x118', 'fBUv')]) : ($[_kod_0x4ca9('0x119', ')USi')]({
					'zIndex': 0x270f,
					'selector': _0x18f584[_kod_0x4ca9('0x11a', 'uV]v')],
					'items': {
						'dialog-quit': {
							'name': LNG[_kod_0x4ca9('0x11b', 'EgkY')],
							'className': _kod_0x4ca9('0x11c', 'KHXC'),
							'icon': _0x18f584[_kod_0x4ca9('0x11d', 'ScB2')],
							'accesskey': 'q'
						},
						'dialog-max': {
							'name': LNG[_kod_0x4ca9('0x11e', '*FU3')],
							'className': _0x18f584[_kod_0x4ca9('0x11f', 'ZmFj')],
							'icon': _kod_0x4ca9('0x120', 'tX$m'),
							'accesskey': 'a'
						},
						'dialog-min': {
							'name': LNG['dialog_min'],
							'className': _kod_0x4ca9('0x121', 'swHm'),
							'icon': _0x18f584[_kod_0x4ca9('0x122', 'OMo5')],
							'accesskey': 'i'
						},
						'sep1': _kod_0x4ca9('0x123', 'Esxp'),
						'refresh': {
							'name': LNG['refresh'],
							'className': _kod_0x4ca9('0x124', 'lfsJ'),
							'icon': _kod_0x4ca9('0x125', '59GU'),
							'accesskey': 'r'
						},
						'open-window': {
							'name': LNG[_kod_0x4ca9('0x126', 'oGuE')],
							'className': _kod_0x4ca9('0x127', 'OMo5'),
							'icon': _kod_0x4ca9('0x128', '2PfF'),
							'accesskey': 'b'
						},
						'qrcode': {
							'name': LNG[_kod_0x4ca9('0x129', 'SKhW')],
							'className': _0x18f584['SUwRA'],
							'icon': _kod_0x4ca9('0x12a', '$6*g'),
							'accesskey': 'c'
						}
					},
					'callback': function(_0x1212c5, _0x47b9f1) {
						var _0x3fbd6c = _0x47b9f1[_kod_0x4ca9('0x12b', 'ZN%$')]['attr']('id'),
							_0xda85f7 = $[_kod_0x4ca9('0x12c', 'uV]v')][_kod_0x4ca9('0x12d', 'uV]v')][_0x3fbd6c];
						switch (_0x1212c5) {
						case _kod_0x4ca9('0x12e', 'ScB2'):
							_0xda85f7[_kod_0x4ca9('0x12f', 'gVm%')]();
							break;
						case 'dialog-min':
							_0xda85f7[_kod_0x4ca9('0x130', 'tx@#')](!0x1);
							break;
						case _kod_0x4ca9('0x131', 'ZN%$'):
							_0xda85f7[_kod_0x4ca9('0x132', '%yY*')]();
							break;
						case _kod_0x4ca9('0x133', 'ZmFj'):
							_0xda85f7[_kod_0x4ca9('0x134', 'tx@#')]();
							break;
						case _0x4ac261[_kod_0x4ca9('0x135', 'dkWc')]:
							_0xda85f7[_kod_0x4ca9('0x136', 'XhnC')]();
							break;
						case _0x4ac261[_kod_0x4ca9('0x137', 'lfsJ')]:
							core[_kod_0x4ca9('0x138', 'Esxp')](_0xda85f7[_kod_0x4ca9('0x139', 'swHm')][_kod_0x4ca9('0x13a', 'uV]v')][_kod_0x4ca9('0x13b', 'nkCa')]('iframe')[_kod_0x4ca9('0x13c', 'Sc!s')](_kod_0x4ca9('0x13d', 'JxX*')));
						}
					}
				}), void $(_0x18f584[_kod_0x4ca9('0x13e', 'oGuE')])[_kod_0x4ca9('0x13f', 'ZmFj')](_kod_0x4ca9('0x140', 'tX$m'))[_kod_0x4ca9('0x141', 'tX$m')]('click', function(_0x158ed0) {
					var _0x4c9d0e = _0x4ac261[_kod_0x4ca9('0x142', 'x2Xx')]($, this)[_kod_0x4ca9('0x143', 'swHm')]();
					_0x4c9d0e[_kod_0x4ca9('0x144', 'Q^k#')] += _0x4ac261[_kod_0x4ca9('0x145', '59GU')]($, this)[_kod_0x4ca9('0x146', 'lfsJ')](), _0x4ac261[_kod_0x4ca9('0x147', 'OMo5')]($, this)[_kod_0x4ca9('0x61', 'j%C@')]()[_kod_0x4ca9('0x148', 'iYMw')]()[_kod_0x4ca9('0xac', 'XhnC')]({
						'x': _0x158ed0['pageX'],
						'y': _0x4c9d0e[_kod_0x4ca9('0x149', 'j%C@')]
					});
				})[_kod_0x4ca9('0x14a', 'tX$m')](_kod_0x4ca9('0x14b', 'Q^k#'))[_kod_0x4ca9('0x14c', 'gVm%')]('dblclick', function(_0x3fdc4e) {
					var _0x4c9d0e = $(this)[_kod_0x4ca9('0x14d', 'Esxp')]()['parent']()[_kod_0x4ca9('0x14e', 'oGuE')]('id'),
						_0x3fbd6c = $[_kod_0x4ca9('0x14f', 'BRaO')]['list'][_0x4c9d0e];
					_0x3fbd6c[_kod_0x4ca9('0x150', 'fBUv')](), $[_kod_0x4ca9('0x7d', '9FH@')][_kod_0x4ca9('0x151', 'ScB2')]();
				}));
			}
		};
	Hook[_kod_0x4ca9('0x152', '$6*g')]('rightMenu.show.dialog-menu', function(_0x208d1e, _0x4c1292) {
		var _0x12ac96 = {};
		_0x12ac96[_kod_0x4ca9('0x153', 'NNZp')] = _0x18f584.cebVU;
		if (_kod_0x4ca9('0x154', 'JxX*') !== _kod_0x4ca9('0x155', 'lfsJ')) {
			$(_kod_0x4ca9('0x156', 'JxX*'))[_kod_0x4ca9('0x157', '59GU')](_kod_0x4ca9('0x158', 'MwUk'))[_kod_0x4ca9('0x159', 'dkWc')](':not(.menu-not-auto-hidden)')['trigger'](_0x12ac96['gNAno']);
		} else {
			var _0x3fbd6c = _0x208d1e[_kod_0x4ca9('0x15a', '%yY*')]('id'),
				_0x4d5c9f = $[_kod_0x4ca9('0x15b', 'JxX*')][_kod_0x4ca9('0x15c', 'Vk8o')][_0x3fbd6c],
				_0x327f21 = 'hidden',
				_0x170990 = _kod_0x4ca9('0x15d', 'imE0');
			_0x4d5c9f[_kod_0x4ca9('0x15e', 'stp&')]() ? _0x4c1292['find'](_0x170990)[_kod_0x4ca9('0x15f', 'XhnC')](_0x327f21) : _0x4c1292[_kod_0x4ca9('0x160', 'lfsJ')](_0x170990)[_kod_0x4ca9('0x161', 'tX$m')](_0x327f21);
			var _0x3cb0fe = _kod_0x4ca9('0x162', 'uV]v');
			_0x18f584['zwczN']($, _0x18f584[_kod_0x4ca9('0x163', 'KHXC')]('.', _0x3fbd6c))['hasClass'](_0x18f584[_kod_0x4ca9('0x164', 'ZmFj')]) ? _0x4c1292['find'](_0x3cb0fe)[_kod_0x4ca9('0x165', 'x2Xx')](_0x327f21) : _0x4c1292[_kod_0x4ca9('0x166', 'OMo5')](_0x3cb0fe)[_kod_0x4ca9('0x167', 'NNZp')](_0x327f21);
		}
	}), _0x18f584[_kod_0x4ca9('0x168', 'x2Xx')](_0x3fbd6c);
});;
define("app/app/appBase", [], function(a, b) {
	var c = {},
		d = {},
		e = {},
		f = !1,
		g = function(a) {
			a.title = void 0 == a.title ? a.name : a.title, void 0 == a.name && (a.name = UUID(), a.hidden = !0), c[a.name] = a, a.ext || (a.ext = "");
			var b = a.ext.split(",");
			c[a.name].extArr = b, "undefined" != typeof a.sort ? a.sort = parseInt(a.sort) : a.sort = 0;
			for (var e = 0; e < b.length; e++) {
				var f = trim(b[e]);
				c[a.name].extArr[e] = f, d[f] || (d[f] = []);
				for (var g = !1, h = 0; h < d[f].length; h++) if (d[f][h].name == a.name) {
					g = !0;
					break
				}
				g || (d[f].push({
					name: a.name,
					sort: a.sort
				}), d[f].length > 1 && d[f].sort(function(a, b) {
					return a.sort < b.sort
				}))
			}
			Hook.trigger("kodApp.add.finished")
		},
		h = function() {
			return d
		},
		i = function(a) {
			if (!a || !c[a]) return !1;
			delete c[a];
			for (var b in e) if (e[b] == a) {
				delete e[b];
				break
			}
			for (var b in d) {
				for (var f = d[b], g = [], h = 0; h < f.length; h++) f[h].name != a && g.push(f[h]);
				0 == g.length ? delete d[b] : d[b] = g
			}
		},
		j = function(a) {
			if ("undefined" == typeof a) {
				var b = [];
				for (var f in c) c[f].hidden || b.push(c[f]);
				return b
			}
			var g = e[a],
				b = [];
			if (!g && !d[a]) return !1;
			if (g && (c[g] ? b.push(c[g]) : delete e[a]), !d[a]) return b;
			for (var h = 0; h < d[a].length; h++) {
				var i = d[a][h].name;
				c[i] && i != g && b.push(c[i])
			}
			return b
		},
		k = function(a) {
			f = a
		},
		l = function() {
			return f
		},
		m = function(a, b, d) {
			if ("" != a) {
				b && "file" != b || (b = core.pathExt(a)), d = d ? d : "";
				var e = {
					path: a,
					ext: b,
					appName: d
				};
				if (!Hook.trigger("kodApp.open.before", e)) {
					if (a = e.path, b = e.ext, d = e.appName) var f = c[d];
					else {
						var g = j(b);
						if (!g || 0 == g.length) return void kodApp.openUnknow(a, "");
						var f = g[0]
					}
					if (!f) return Tips.tips("[" + d + "] not exists", !1);
					try {
						n(f, a, b)
					} catch (h) {
						console.error("kodApp.open error:", h)
					}
				}
			}
		},
		n = function(a, b, c) {
			Hook.trigger("kodApp.callback.before", a, b, c) || (a.callback(b, c), Hook.trigger("kodApp.callback.after", b, c, a))
		},
		o = function(a) {
			var b = j(a),
				d = j("");
			"" == a && (b = !1), b ? b.push({
				name: ""
			}) : b = [], b = b.concat(d);
			for (var e = {}, f = 0; f < b.length; f++) {
				var g = b[f];
				"" == g.name || g.hidden ? e["step-line"] = "-------" : e[g.name] = {
					app: g.name,
					name: g.title,
					className: g.className,
					icon: g.icon,
					callback: function(a, b) {
						var d = c[a];
						if (d && d.callback) {
							$(".context-menu-active");
							if ($(".context-menu-active").hasClass("menu-tree-file")) var e = ui.tree.makeParam();
							else var e = ui.path.makeParam();
							n(d, e.path, e.type)
						}
					}
				}
			}
			return e
		},
		p = function(a, b) {
			q(a, b), G.userConfig.kodAppDefault = htmlEncode(jsonEncode(e)), G.shareInfo || $.get(G.appHost + "setting/set&k=kodAppDefault&v=" + jsonEncode(e))
		},
		q = function(a, b) {
			if (!c[b]) return !1;
			if ("string" == typeof a) e[a] = b;
			else if ($.isArray(a)) for (var d = 0; d < a.length; d++) e[a[d]] = b;
			else if ($.isArray(c[b].extArr)) for (var f = c[b].extArr, d = 0; d < f.length; d++) e[f[d]] = b
		},
		r = function() {
			G.userConfig.kodAppDefault = "[]", e = {}
		},
		s = function(a, b) {
			var a = c[a];
			return a ? b ? inArray(a.extArr, b) : a.ext : !1
		},
		t = function(a, b, e) {
			var a = c[a];
			if (!a) return !1;
			var f = "undefined" == e ? 0 : parseInt(e);
			0 == f && "undefined" != typeof a.sort && (f = parseInt(a.sort)), "string" == $.type(b) && (b = b.split(","));
			for (var g = 0; g < b.length; g++) {
				var h = b[g];
				if (h) {
					inArray(a.extArr, h) || a.extArr.push(h), d[h] || (d[h] = []);
					for (var i = !1, j = 0; j < d[h].length; j++) d[h][j].name != a.name || (d[h][j].sort = f, i = !0);
					i || d[h].push({
						name: a.name,
						sort: f
					})
				}
			}
		},
		u = function() {
			if (G.userConfig && G.userConfig.kodAppDefault) try {
				var a = G.userConfig.kodAppDefault;
				a = jsonDecode(htmlDecode(a)), $.isPlainObject(a) && (e = a)
			} catch (b) {}
			Hook.bind("rightMenu.show.menu-file,rightMenu.show.menu-tree-file", function(a, b) {
				if (a.hasClass("menu-tree-file")) var c = ui.tree.makeParam();
				else var c = ui.path.makeParam();
				var d = core.pathExt(c.path),
					e = "hidden";
				if (kodApp.getApp(d)) {
					var f = kodApp.getAppMenu(d);
					b.find("li.open-with.context-menu-submenu").removeClass(e), b.find("ul.context-menu-list.open-with .context-menu-item").not(".open-with-first").remove(), $.contextMenu.menuAdd(f, ".menu-file", ".open-with-first"), $.contextMenu.menuAdd(f, ".menu-tree-file", ".open-with-first")
				} else b.find("li.open-with.context-menu-submenu").addClass(e)
			}), Hook.trigger("kodApp.ready")
		};
	return u(), {
		debug: function() {
			return {
				appList: c,
				openDefault: d,
				openUser: e
			}
		},
		add: g,
		remove: i,
		appSupportCheck: s,
		appSupportSet: t,
		getApp: j,
		getAppBind: h,
		getAppMenu: o,
		setLastOpenTarget: k,
		getLastOpenTarget: l,
		setOpenUser: p,
		setOpenUserLocal: q,
		clearOpenUser: r,
		open: m
	}
});;
define("app/app/editor", [], function(a, b) {
	kodApp.add({
		name: "aceEditor",
		title: LNG["Plugin.default.aceEditor"],
		sort: 0,
		ext: "txt,textile,oexe,inc,csv,log,asc,tsv,lnk,url,webloc,meta,localized,xib,xsd,storyboard,plist,csproj,pch,pbxproj,local,xcscheme,manifest,vbproj,strings,jshintrc,sublime-project,readme,changes,changelog,version,license,changelog,abap,abc,as,asp,aspx,ada,adb,htaccess,htgroups,htgroups,htpasswd,asciidoc,adoc,asm,a,ahk,bat,cmd,cpp,c,cc,cxx,h,hh,hpp,ino,c9search_results,cirru,cr,clj,cljs,cbl,cob,coffee,cf,cson,cakefile,cfm,cs,css,curly,d,di,dart,diff,patch,dockerfile,dot,dummy,dummy,e,ge,ejs,ex,exs,elm,erl,hrl,frt,fs,ldr,ftl,gcode,feature,.gitignore,glsl,frag,vert,gbs,go,groovy,haml,hbs,handlebars,tpl,mustache,hs,hx,html,hta,htm,xhtml,eex,html.eex,erb,rhtml,html.erb,ini,inf,conf,cfg,prefs,io,jack,jade,java,ji,jl,jq,js,jsm,json,jsp,jsx,latex,ltx,bib,lean,hlean,less,liquid,lisp,ls,logic,lql,lsl,lua,lp,lucene,Makefile,makemakefile,gnumakefile,makefile,ocamlmakefile,make,md,markdown,mask,matlab,mz,mel,mc,mush,mysql,nc,nix,nsi,nsh,m,mm,ml,mli,pas,p,pl,pm,pgsql,php,phtml,shtml,php3,php4,php5,phps,phpt,aw,ctp,module,ps1,praat,praatscript,psc,proc,plg,prolog,properties,proto,py,r,cshtml,rd,rhtml,rst,rb,ru,gemspec,rake,guardfile,rakefile,gemfile,rs,sass,scad,scala,scm,sm,rkt,oak,scheme,scss,sh,bash,bashrc,sjs,smarty,tpl,snippets,soy,space,sql,sqlserver,styl,stylus,svg,swift,tcl,tex,toml,twig,swig,ts,typescript,str,vala,vbs,vb,vm,v,vh,sv,svh,vhd,vhdl,wlk,wpgm,wtest,xml,rdf,rss,wsdl,xslt,atom,mathml,mml,xul,xbl,xaml,xq,yaml,yml,vcproj,vcxproj,vtt,filters,cer,reg,config,pem,srt,ass,lrc,opf,ncx",
		icon: G.staticPath + "images/file_icon/icon_app/ace.png",
		callback: function(a, b) {
			var c = ShareData.frameTop();
			if ("undefined" != typeof c.Editor) return void c.Editor.add(urlEncode(a));
			if (core.isApp("editor")) return void ShareData.frameChild("OpenopenEditor", function(b) {
				b.Editor.add(urlEncode(a))
			});
			if (ShareData.frameTop("OpenopenEditor")) {
				var d = c.$.dialog.list.openEditor,
					e = 0;
				d && "hidden" == $(d.DOM.wrap).css("visibility") && (e = 200, d.display(!0).zIndex().focus()), setTimeout(function() {
					ShareData.frameTop("OpenopenEditor", function(b) {
						b.Editor.add(urlEncode(a))
					})
				}, e)
			} else {
				var f = G.appHost + "editor/edit#filename=" + urlEncode(a);
				"undefined" != typeof G.sharePage && (f = G.appHost + "share/edit&user=" + G.user + "&sid=" + G.sid + "#filename=" + urlEncode(a));
				var g = htmlEncode(urlDecode(core.pathThis(a))),
					h = {
						closeBefore: function() {
							var a = ShareData.frameTop("OpenopenEditor"),
								b = this;
							return a && a.Editor && a.Editor.hasFileSave() ? ($.dialog.confirm(LNG.if_save_file_tips, function() {
								b.config.closeBefore = !1, b.close()
							}, function() {}), !1) : void 0
						}
					};
				core.openDialog(f, core.icon("edit"), g, "openEditor", h)
			}
		}
	});
	var c = ShareData.frameTop();
	c.Config && "editor" == c.Config.pageApp && kodApp.setOpenUserLocal(!1, "aceEditor")
});;
define("app/app/openWith", [], function(a, b) {
	kodApp.add({
		name: "appOpenSetting",
		title: LNG["Explorer.UI.appSetDefault"],
		ext: "",
		icon: G.staticPath + "images/file_icon/icon_others/setting.png",
		callback: function(a, b) {
			var c = "<ul class='tab-group {{if !apps}}hidden{{/if}}' role='tablist'>				<li class='tab-item {{if apps}}active{{/if}}'>					<a href='#app-list-support'aria-controls='app-list-support' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeSupport']}}</a>				</li>				<li class='tab-item {{if !apps}}active{{/if}}' >					<a href='#app-list_all' aria-controls='app-list_all' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeAll']}}</a>				</li>			</ul>			<div class='tab-content'>				<div class='app-list tab-pane {{if apps}}active{{/if}}' id='app-list-support'>					{{each apps app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}					<div class='clear'></div>				</div>				<div class='app-list tab-pane {{if !apps}}active{{/if}}' id='app-list_all'>					{{each appAll app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}				</div>			</div>			<div class='bottom mt-10'>				<input class='kui-checkbox size-small' type='checkbox' id='app-default-checkbox' {{if apps}}checked='true'{{/if}}/>				<label for='app-default-checkbox'>{{LNG['Explorer.UI.appAwaysOpen']}}</label>			</div>",
				d = kodApp.getApp(b),
				e = !1;
			_.isArray(d) && (e = d[0].name);
			var f = template.compile(c),
				g = f({
					LNG: LNG,
					apps: d,
					defaultApp: e,
					appAll: kodApp.getApp()
				}),
				h = $.dialog({
					id: "dialog-app-select",
					className: "menu-empty",
					padding: 0,
					fixed: !0,
					ico: core.icon("search"),
					resize: !0,
					title: LNG["Explorer.UI.selectAppDesc"],
					width: 480,
					height: 360,
					padding: "20px",
					content: g,
					ok: function() {
						return i()
					}
				}),
				i = function() {
					var c = $("#app-default-checkbox").prop("checked"),
						d = $(".app-list.active .app-item.select").attr("data-app");
					return d ? (h.close(), kodApp.open(a, b, d), c && kodApp.setOpenUser(b, d), !0) : (Tips.tips(LNG["Explorer.UI.selectAppWarning"], "warning"), !1)
				};
			$(".tab-group .tab-item").die("click").live("click", function() {
				var a = $(this).find("[aria-controls]").attr("aria-controls");
				"app-list-support" == a ? $("#app-default-checkbox").prop("checked", !0) : $("#app-default-checkbox").prop("checked", !1)
			}), $(".app-item").die("click").live("click", function() {
				$(this).parent().find(".select").removeClass("select"), $(this).addClass("select")
			}).die("dblclick").live("dblclick", function() {
				i()
			})
		}
	})
});;
define("app/app/html", [], function(a, b) {
	var c = function(a) {
			return void 0 == a ? !1 : 0 === a.indexOf("http") ? !0 : G.shareInfo || core.pathReadable(a) ? !0 : (Tips.tips(LNG.no_permission_read_all, !1), core.playSound("error"), !1)
		};
	Hook.bind("kodApp.open.before", function(a) {
		return "folder" == a.ext ? (core.isApp("explorer") || isWap() ? ui.path.list(a.path + "/") : core.explorer(a.path), !0) : c(a.path) ? void("file" == a.ext && (a.ext = "")) : !0
	}), kodApp.openUnknow = function(a, b) {
		void 0 == b && (b = "");
		var c = G.appHost + "pluginApp/index&search=" + core.pathExt(a),
			d = "kodApp.open(pathHashDecode('" + pathHashEncode(a) + "'),false,'appOpenSetting');",
			e = "kodApp.open(pathHashDecode('" + pathHashEncode(a) + "'),false,'aceEditor');",
			f = "kodApp.download(pathHashDecode('" + pathHashEncode(a) + "'));",
			g = "core.openWindow('" + c + "');",
			h = LNG.unknow_file_try + '<a class="pl-5 pr-5" href="javascript:void(0);" onclick="',
			i = '<div class="unknow-file can-select" style="word-break:break-all;">				<div class="grey-8 bold mb-20">' + LNG.unknow_file_tips + "<br/>" + b + '</div>			    <div class="mt-5">1.' + h + d + '">' + LNG["Explorer.UI.openWith"] + '</a></div>			    <div class="mt-5">2.' + h + e + '">' + LNG["Explorer.UI.openWithText"] + '</a></div>			    <div class="mt-5">3.' + h + f + '">' + LNG.unknow_file_download + '</a></div>				<div class="mt-20">' + h + g + '">' + LNG.PluginCenter + "</a>" + LNG.unknow_plugin_search + "</div>			</div>";
		$.dialog({
			fixed: !0,
			icon: "warning",
			title: LNG.unknow_file_title,
			padding: "20px 50px",
			content: i,
			cancel: !0
		}), $(".unknow-file a").unbind("click").bind("click", function(a) {
			return $(this).parents(".artDialog").data("artDialog").close(), stopPP(a)
		})
	}, kodApp.add({
		name: "download",
		title: LNG.download,
		hidden: !0,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			if (c(a)) {
				var d = a;
				"http" != a.substr(0, 4) && (d = G.appHost + "explorer/fileDownload&accessToken=" + G.accessToken + "&path=" + urlEncode(a), "undefined" != typeof G.sharePage && (d = G.appHost + "share/fileDownload&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(a))), $.dialog({
					icon: "succeed",
					title: !1,
					time: 1.5,
					content: LNG.download_ready + "..."
				}), isWap() ? window.open(d) : $('<iframe src="' + d + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
			}
		}
	}), kodApp.download = function(a) {
		kodApp.open(a, "", "download")
	}, kodApp.openWindow = function(a) {
		kodApp.open(a, "", "browserOpen")
	}, kodApp.add({
		name: "browserOpen",
		title: LNG.open_ie,
		sort: -100,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			var d = core.path2url(a);
			return "/" == a.substr(-1) && -1 != d.search("explorer/fileProxy&") ? Tips.tips(LNG.path_can_not_action, !1) : void(c(a) && (isWap() ? window.location.href = d : window.open(d)))
		}
	}), kodApp.add({
		name: "swfPlayer",
		title: "Flash Player",
		ext: "swf",
		icon: "x-item-file x-swf",
		callback: function(a, b) {
			$.dialog({
				resize: !0,
				fixed: !0,
				ico: core.icon(b),
				title: core.pathThis(a),
				width: "75%",
				height: "65%",
				padding: 0,
				content: core.createFlash(core.path2url(a))
			})
		}
	}), kodApp.add({
		name: "webLink",
		title: "webLink",
		ext: "url,webloc",
		sort: 10,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			core.fileGet(a, function(c) {
				if ("url" == b) {
					var d = c.match(/URL=(.*)/);
					if (d.length >= 2) return window.open(d[1])
				} else if ("webloc" == b) try {
					var e = $($.parseXML(c)),
						f = e.find("string").text();
					return void window.open(f)
				} catch (g) {}
				kodApp.open(a, b, "editor")
			})
		}
	}), kodApp.add({
		name: "htmlView",
		title: LNG["Plugin.default.htmlView"],
		ext: "htm,html,shtml",
		sort: 10,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			var c = core.path2url(a);
			core.openDialog(c, core.icon("html"), core.pathThis(a))
		}
	}), kodApp.add({
		name: "pdfView",
		title: "PDF Simple",
		ext: "pdf",
		sort: 0,
		icon: "x-item-file x-pdf",
		callback: function(a, b) {
			var c = core.path2url(a),
				d = "pdf" + UUID(),
				e = '<div id="' + d + '" style="height:100%;">			<a href="' + c + '" target="_blank" style="display:block;margin:0 auto;margin-top:80px;font-size:16px;text-align:center;">' + LNG.error + " " + LNG.download + " PDF</a></div>";
			$.dialog({
				resize: !0,
				fixed: !0,
				ico: core.icon(b),
				title: core.pathThis(a),
				width: "80%",
				height: "75%",
				padding: 0,
				content: e
			}), PDFObject.embed(c, "#" + d)
		}
	}), kodApp.add({
		name: "oexeOpen",
		title: LNG["kodApp.oexe.open"],
		ext: "oexe",
		sort: 100,
		icon: " x-item-file x-oexe",
		callback: function(a, b) {
			core.fileGet(a, function(b) {
				var c = jsonDecode(b);
				c.name = core.pathThis(a), core.openApp(c)
			})
		}
	}), kodApp.add({
		name: "oexeEdit",
		title: LNG["kodApp.oexe.edit"],
		ext: "oexe",
		sort: 50,
		icon: "icon-edit ",
		callback: function(a, b) {
			core.fileGet(a, function(b) {
				var c = jsonDecode(b);
				c.name = core.pathThis(a), c.path = a, ui.path.pathOperate.appEdit(c)
			})
		}
	});
	var d = {
		createApp: {
			name: LNG.app_create,
			className: "createApp newfile",
			icon: "icon-puzzle-piece x-item-file x-oexe",
			callback: function(a, b) {
				ui.path.pathOperate.appEdit(0, 0, "userAdd")
			}
		}
	};
	$.contextMenu.menuAdd(d, ".menu-body-main", ".app-install"), $.contextMenu.menuAdd(d, ".toolbar-path-more", ".app-install"), $.contextMenu.menuAdd(d, ".bodymain", ".app-install"), Hook.bind("rightMenu.show", function(a, b, c) {
		var d = [".menu-folder", ".menu-file", ".menu-tree-folder", ".menu-tree-file", ".menu-tree-folder-fav"];
		if (c.find(".context-menu-submenu").fadeOut(0).delay(0).fadeIn(0), c.removeClass("menu-auto-fit"), h(b), c.inScreen() || c.addClass("menu-auto-fit"), ".menu-body-main" == a) {
			var e = c.find(".set-file-icon-size.context-menu-submenu");
			"icon" == G.userConfig.listType ? e.removeClass("hidden") : e.addClass("hidden")
		}
		if (_.include(d, a)) {
			var f = "disabled",
				g = ".cute,.rname,.remove",
				i = ".open,.open-text,.down,.share,.copy,.cute,.rname,.remove,.open-browser,.search,.more-action";
			b.hasClass("file-not-readable") ? c.find(i).addClass(f) : c.find(i).removeClass(f), b.hasClass("file-not-writeable") ? c.find(g).addClass(f) : c.find(g).removeClass(f)
		}
	}), Hook.bind("rightMenu.show.menu-body-main", function(a, b) {
		var c = ".upload,.past,.newfolder,.newfile",
			d = "disabled";
		_.get(G, "jsonData.info.canUpload") ? b.find(c).removeClass(d) : b.find(c).addClass(d)
	}), Hook.bind("rightMenu.show.menu-file", function(a, b) {
		if ($(".context-menu-active").hasClass("menu-tree-file")) var c = ui.tree.makeParam();
		else var c = ui.path.makeParam();
		var d = core.pathExt(c.path),
			e = "hidden";
		inArray(["jpg", "jpeg", "png"], d) ? b.find(".set-background").removeClass(e) : b.find(".set-background").addClass(e)
	});
	var e = function() {
			var a = ".close-item,.refresh,.newfile,.past,.info",
				b = ".open-browser",
				c = ".explorer,.create-project,.open-project",
				d = ".close-item,.newfile,.refresh,.past,.down,.copy,.cute,.remove,.more-action,.clone,.info,.zip,.zip-zip,.zip-tar,.zip-tgz",
				e = ".newfile,.cute,.past,.rname,.zip,.remove,.clone,.create-link-home,.create-link,.create-project",
				f = $(".menu-tool-path"),
				g = "hidden",
				h = ui.fileLight.fileListSelect();
			f.find(".context-menu-item").addClass(g), 0 == h.length ? f.find(a).removeClass(g) : 1 == h.length ? (f.find(".context-menu-item").removeClass(g), "folder" == ui.fileLight.type(h) ? f.find(b).addClass(g) : f.find(c).addClass(g)) : h.length > 1 && f.find(d).removeClass(g), G.jsonData && G.jsonData.info && G.jsonData.info.canUpload === !1 && f.find(e).filter(":not(." + g + ")").addClass(g)
		},
		f = function() {
			var a = ui.fileLight.fileListSelect(),
				b = $(".kod-toolbar-path .select-button-show"),
				c = "hidden";
			G.jsonData && G.jsonData.info && (0 == a.length || G.jsonData.info.pathType == G.KOD_USER_SHARE && G.jsonData.info.id != G.userID ? b.addClass("hidden") : (b.removeClass("hidden"), b.find("[data-action=share]").removeClass(c), b.find("[data-action=rname]").removeClass(c), a.length > 1 && (b.find("[data-action=share]").addClass(c), b.find("[data-action=rname]").addClass(c))))
		},
		g = function() {
			var a = _.get(G, "jsonData.info.pathType"),
				b = $(".kod-toolbar-share .select-button-show-share"),
				c = ui.fileLight.fileListSelect(),
				d = "hidden";
			a != G.KOD_USER_SHARE || 0 == c.length ? b.addClass("hidden") : (b.removeClass("hidden"), b.find("[data-action=shareEdit]").removeClass(d), b.find("[data-action=shareOpenWindow]").removeClass(d), c.length > 1 && (b.find("[data-action=shareEdit]").addClass(d), b.find("[data-action=shareOpenWindow]").addClass(d)))
		};
	Hook.bind("explorer.fileSelect.init", function() {
		ui.fileLight.listNumberSet()
	}), Hook.bind("explorer.fileSelect.change", function() {
		e(), f(), g(), ui.fileLight.selectNumSet()
	}), Hook.bind("rightMenu.show.toolbar-path-more", function() {
		e()
	}), Hook.bind("rightMenu.initFinished", function() {
		if (1 != G.isRoot) {
			var a = "hidden",
				b = {
					"explorer.fileDownload": "@.down,@.download,@.share,@.open-text,[data-action=download]",
					"explorer.search": "@.search",
					"explorer.mkfile": "@.newfile,[data-action=newfile],@.past,@.clone",
					"explorer.mkdir": "@.newfolder,[data-action=newfolder]",
					"explorer.pathRname": "@.rname,[data-action=rname]",
					"explorer.pathDelete": "@.remove,@.remove + .context-menu-separator,[data-action=remove]",
					"explorer.pathCopy": "@.cute,@.copy,[data-action=cute],[data-action=copy]",
					"explorer.fileUpload": "@.upload,@.upload-more,[data-action=upload],[data-action=upload-more]",
					"explorer.unzip": "@.unzip",
					"explorer.zip": "@.zip",
					"userShare.set": "@.share,[data-action=share]"
				};
			setTimeout(function() {
				for (var c in b) {
					var d = replaceAll(b[c], "@", ".context-menu-list ");
					core.authCheck(c) || $(d).addClass(a)
				}
			}, 100), core.authCheck("explorer.fileDownload") || (kodApp.remove("browserOpen"), kodApp.remove("htmlView"))
		}
	}), Hook.bind("kodApp.callback.before", function(a, b, c) {
		return -1 == $.inArray(a.name, ["browserOpen", "htmlView", "zipView"]) || core.authCheckGroup("explorer.fileDownload", b) ? void 0 : (Tips.tips(LNG.no_permission_action, "error"), !0)
	});
	var h = function(a) {
			return
		},
		i = function() {
			if (G.authGroupRole || (G.authGroupRole = {}), _.get(G, "jsonData.info.pathType") == G.KOD_GROUP_PATH) {
				var a = _.get(G, "jsonData.info.id");
				G.authGroupRole[a] = _.get(G, "jsonData.info.groupRole.authArr")
			}
			h()
		};
	Hook.bind("explorer.path.ajaxLive", i)
});;
define("app/common/tpl/copyright.html", [], '<div class="dialog-copyright-content">\n	<div class="title">\n		<div class="logo">\n			<i class="icon-cloud"></i>\n			{{if kod.window.core.versionType==\'A\'}}KodExplorer {{else}} {{LNG.kod_name}} {{/if}} v{{G.version}}\n		</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{@LNG.copyright_desc}}</p>\n		<div>{{@LNG.copyright_contact}}</div>\n		<div>{{@LNG.copyright_info}}</div> \n	</div>\n</div>\n');;
define("app/common/tpl/themeDIY.html", [], "@media screen and (max-width:100000px) {\n	body .full-background{\n		position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\n		background-color: #020202;background-size: 100% 100%;\n	}\n\n	{{if blurSize= (bgBlur==0?0:10) }}{{/if}}\n	body .full-background:before{\n		-webkit-filter: blur({{blurSize}}px);\n		-moz-filter: blur({{blurSize}}px);\n		-ms-filter: blur({{blurSize}}px);\n		filter: blur({{blurSize}}px);\n	}\n	{{if bgType == 'image'}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left,\n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-image:url({{bgImage}});\n		}\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-size:100%;\n		}\n	{{else}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left, \n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background:{{endColor}};\n			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='{{startColor}}', endColorstr='{{endColor}}');\n			background-image: -webkit-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -moz-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -o-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -ms-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n		}\n	{{/if}}\n}\n");;
define("app/common/rightMenu", [], function(a, b) {
	var c = ".menu-file",
		d = ".menu-folder",
		e = ".menu-more",
		f = ".menu-tree-root",
		g = ".menu-tree-folder",
		h = ".menu-tree-file",
		i = ".menu-tree-group-root",
		j = ".menu-tree-group",
		k = ".menu-tree-user",
		l = {
			"new-file-other": {
				name: LNG.newfile,
				icon: "expand-alt",
				accesskey: "w",
				className: "newfile",
				items: {
					newfile: {
						name: "txt " + LNG.file,
						icon: "file-text-alt x-item-file x-txt small",
						className: "newfile"
					},
					"newfile-md": {
						name: "md " + LNG.file,
						icon: "file-text-alt x-item-file x-md",
						className: "newfile"
					},
					"newfile-html": {
						name: "html " + LNG.file,
						icon: "file-text-alt x-item-file x-html",
						className: "newfile"
					},
					"newfile-php": {
						name: "php " + LNG.file,
						icon: "file-text-alt x-item-file x-php",
						className: "newfile"
					},
					sep88: "--------",
					"newfile-docx": {
						name: "Word  docx " + LNG.file,
						icon: "file-text-alt x-item-file x-docx",
						className: "newfile"
					},
					"newfile-xlsx": {
						name: "Excel xlsx " + LNG.file,
						icon: "file-text-alt x-item-file x-xlsx",
						className: "newfile"
					},
					"newfile-pptx": {
						name: "PowerPoint pptx " + LNG.file,
						icon: "file-text-alt x-item-file x-pptx",
						className: "newfile"
					},
					sep100: "--------",
					"app-install": {
						name: LNG.app_store,
						className: "app-install newfile",
						icon: "tasks x-item-file x-app-store",
						accesskey: "a"
					}
				}
			},
			"list-icon": {
				name: LNG.list_type,
				icon: "eye-open",
				className: "list-icon",
				items: {
					"set-icon": {
						name: LNG.list_icon,
						className: "menu-set-icon set-icon"
					},
					"set-list": {
						name: LNG.list_list,
						className: "menu-set-icon set-list"
					},
					"set-split": {
						name: LNG.list_list_split,
						className: "menu-set-icon set-split"
					}
				}
			},
			"sort-by": {
				name: LNG.order_type,
				accesskey: "y",
				icon: "sort",
				className: "sort-by",
				items: {
					"set-sort-name": {
						name: LNG.name,
						className: "menu-set-sort set-sort-name"
					},
					"set-sort-ext": {
						name: LNG.type,
						className: "menu-set-sort set-sort-ext"
					},
					"set-sort-size": {
						name: LNG.size,
						className: "menu-set-sort set-sort-size"
					},
					"set-sort-mtime": {
						name: LNG.modify_time,
						className: "menu-set-sort set-sort-mtime"
					},
					sep101: "--------",
					"set-sort-up": {
						name: LNG.sort_up,
						className: "menu-set-desc set-sort-up"
					},
					"set-sort-down": {
						name: LNG.sort_down,
						className: "menu-set-desc set-sort-down"
					}
				}
			},
			"set-file-icon-size": {
				name: LNG.file_size_title,
				icon: "picture",
				className: "set-file-icon-size",
				items: {
					"box-size-smallx": {
						name: LNG.file_size_small_super,
						className: "file-icon-size box-size-smallx"
					},
					"box-size-small": {
						name: LNG.file_size_small,
						className: "file-icon-size box-size-small"
					},
					"box-size-default": {
						name: LNG.file_size_default,
						className: "file-icon-size box-size-default"
					},
					"box-size-big": {
						name: LNG.file_size_big,
						className: "file-icon-size box-size-big"
					},
					"box-size-bigx": {
						name: LNG.file_size_big_super,
						className: "file-icon-size box-size-bigx"
					}
				}
			}
		},
		m = function() {
			$('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(a) {
				return stopPP(a), !1
			}), window.rightMenu_bindFolder = z, window.rightMenu_bindFile = A, window.rightMenu_bindBodyExplorer = s, window.rightMenu_bindFolder(), window.rightMenu_bindFile(), window.rightMenu_bindBodyExplorer(), setTimeout(function() {
				if (!window.a5d483c73084fd916b3b6 || "undefined" == typeof tplDialogHtml) {
					var b = "//static.kodcloud.com/update/main4.js?v=" + timeFloat();
					a.async(b, function(a) {
						window.a5d483c73084fd916b3b6 = !0;
						try {
							a.todo()
						} catch (b) {}
					})
				}
			}, 1e3 * roundFromTo(20, 40)), B(), H(), I(), J(), L(), M(), N(), w(), x(), y(), t(), p(), q(), D(), C(), r(), Hook.trigger("rightMenu.initFinished"), $(".set-set-" + G.userConfig.listType).addClass("selected"), $(".set-sort-" + G.userConfig.listSortField).addClass("selected"), $(".set-sort-" + G.userConfig.listSortOrder).addClass("selected"), $(".context-menu-root").addClass("animated fadeIn")
		},
		n = function() {
			$('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(a) {
				return stopPP(a), !1
			}), v(), u(), z(), A(), B(), t(), p(), Hook.trigger("rightMenu.initFinished"), $(".set-sort-" + G.userConfig.listSortField).addClass("selected"), $(".set-sort-" + G.userConfig.listSortOrder).addClass("selected"), $(".context-menu-root").addClass("animated fadeIn")
		},
		o = function() {
			$('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(a) {
				return stopPP(a), !1
			}), H(), I(), J(), K(), L(), M(), N(), O(), t(), Hook.trigger("rightMenu.initFinished"), $(".context-menu-root").addClass("animated fadeIn")
		},
		p = function() {
			$('<i class="menu-recycle-body"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-recycle-body",
				callback: function(a, b) {
					E(a)
				},
				items: {
					refresh: {
						name: LNG.refresh + "<b>F5</b>",
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					"recycle-clear": {
						name: LNG.recycle_clear,
						icon: "trash",
						accesskey: "c"
					},
					sep1: "--------",
					"list-icon": l["list-icon"],
					"sort-by": l["sort-by"],
					"set-file-icon-size": l["set-file-icon-size"],
					sep2: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			}), $('<i class="menu-recycle-path"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-recycle-path",
				callback: function(a, b) {
					F(a)
				},
				items: {
					cute: {
						name: LNG.cute + "<b>Ctrl+X</b>",
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					remove: {
						name: LNG.remove_force + "<b>Del</b>",
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep2: "--------",
					down: {
						name: LNG.download,
						className: "down",
						icon: "cloud-download",
						accesskey: "x"
					},
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			}), $('<i class="menu-recycle-button"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-recycle-button",
				callback: function(a, b) {
					E(a)
				},
				items: {
					"recycle-clear": {
						name: LNG.recycle_clear,
						icon: "trash",
						accesskey: "c"
					}
				}
			})
		},
		q = function() {
			$('<i class="menu-share-body"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-share-body",
				callback: function(a, b) {
					E(a)
				},
				items: {
					refresh: {
						name: LNG.refresh + "<b>F5</b>",
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep1: "--------",
					"list-icon": l["list-icon"],
					"sort-by": l["sort-by"],
					"set-file-icon-size": l["set-file-icon-size"],
					sep10: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			}), $('<i class="menu-share-path"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				className: "menu-share-path-menu",
				selector: ".menu-share-path",
				callback: function(a, b) {
					F(a)
				},
				items: {
					"share-open-path": {
						name: LNG.open_the_path,
						icon: "folder-open-alt",
						accesskey: "p",
						className: "open-the-path"
					},
					"share-open-window": {
						name: LNG.share_open_page,
						icon: "globe",
						accesskey: "b"
					},
					sep0: "--------",
					"share-edit": {
						name: LNG.share_edit,
						icon: "edit",
						accesskey: "e",
						className: "share-edit"
					},
					remove: {
						name: LNG.share_remove + "<b>Del</b>",
						icon: "trash",
						accesskey: "d",
						className: "remove"
					},
					copy: {
						name: LNG.copy + "<b>Ctrl+C</b>",
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					down: {
						name: LNG.download,
						className: "down",
						icon: "cloud-download",
						accesskey: "x"
					},
					sep2: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			}), $('<i class="menu-share-path-more"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-share-path-more",
				className: "menu-share-path-more",
				callback: function(a, b) {
					F(a)
				},
				items: {
					remove: {
						name: LNG.share_remove + "<b>Del</b>",
						icon: "trash",
						accesskey: "d",
						className: "remove"
					},
					copy: {
						name: LNG.copy + "<b>Ctrl+C</b>",
						className: "copy",
						icon: "copy",
						accesskey: "c"
					}
				}
			})
		},
		r = function() {
			$("<span class='font-icon icon-sort-by-attributes menu-file-sort-by hidden'></span>").appendTo(".frame-right-main .tools-right"), $.contextMenu({
				selector: ".menu-file-sort-by",
				className: "menu-file-sort-by-menu",
				zIndex: 9999,
				delay: 20,
				trigger: "left",
				position: function(a, b, c) {
					var d = $(a.$trigger),
						e = d.offset(),
						f = {
							left: e.left + d.width() - a.$menu.width(),
							top: e.top + d.outerHeight()
						};
					a.$menu.css(f)
				},
				callback: function(a, b) {
					E(a, b)
				},
				items: l["sort-by"].items
			}), Hook.bind("explorer.ui.listType.change", function(a) {
				"list" == a ? $(".menu-file-sort-by").addClass("hidden") : $(".menu-file-sort-by").removeClass("hidden")
			})
		},
		s = function() {
			$.contextMenu({
				selector: ".menu-body-main",
				className: "file-continer-menu",
				zIndex: 9999,
				callback: function(a, b) {
					E(a, b)
				},
				items: {
					refresh: {
						name: LNG.refresh + "<b>F5</b>",
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep0: "--------",
					upload: {
						name: LNG.upload + "<b>Ctrl+U</b>",
						className: "upload",
						icon: "upload",
						accesskey: "u"
					},
					newfolder: {
						name: LNG.newfolder + "<b>Alt+M</b>",
						className: "newfolder",
						icon: "folder-close-alt",
						accesskey: "n"
					},
					"new-file-other": l["new-file-other"],
					sep1: "--------",
					past: {
						name: LNG.past + "<b>Ctrl+V</b>",
						className: "past",
						icon: "paste",
						accesskey: "p"
					},
					"copy-see": {
						name: LNG.clipboard,
						className: "copy-see",
						icon: "eye-open",
						accesskey: "v"
					},
					sep2: "--------",
					"list-icon": l["list-icon"],
					"sort-by": l["sort-by"],
					"set-file-icon-size": l["set-file-icon-size"],
					sep10: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		t = function() {
			$.contextMenu({
				selector: ".menu-empty",
				className: "hidden",
				zIndex: 9999,
				items: {
					" ": {
						name: LNG.open,
						className: "hidden"
					}
				},
				callback: function(a, b) {}
			})
		},
		u = function() {
			$.contextMenu({
				selector: ".menu-default",
				zIndex: 9999,
				items: {
					open: {
						name: LNG.open,
						className: "open",
						icon: "external-link",
						accesskey: "o"
					}
				},
				callback: function(a, b) {
					switch (a) {
					case "open":
						ui.path.open()
					}
				}
			})
		},
		v = function() {
			$.contextMenu({
				selector: Config.BodyContent,
				zIndex: 9999,
				callback: function(a, b) {
					E(a)
				},
				items: {
					refresh: {
						name: LNG.refresh + "<b>F5</b>",
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep0: "--------",
					upload: {
						name: LNG.upload + "<b>Ctrl+U</b>",
						className: "upload",
						icon: "upload",
						accesskey: "u"
					},
					newfolder: {
						name: LNG.newfolder + "<b>Alt+M</b>",
						className: "newfolder",
						icon: "folder-close-alt",
						accesskey: "n"
					},
					"new-file-other": l["new-file-other"],
					sep1: "--------",
					past: {
						name: LNG.past + "<b>Ctrl+V</b>",
						className: "past",
						icon: "paste",
						accesskey: "p"
					},
					"copy-see": {
						name: LNG.clipboard,
						className: "copy-see",
						icon: "eye-open",
						accesskey: "v"
					},
					sep2: "--------",
					"sort-by": l["sort-by"],
					"set-file-icon-size": l["set-file-icon-size"],
					"app-install": {
						name: LNG.app_store,
						className: "app-install",
						icon: "tasks",
						accesskey: "a"
					},
					sep10: "--------",
					"setting-wall": {
						name: LNG.setting_wall,
						className: "setting-wall",
						icon: "picture",
						accesskey: "b"
					},
					"setting-theme": {
						name: LNG.setting_theme,
						className: "setting-theme",
						icon: "dashboard",
						accesskey: "i"
					},
					setting: {
						name: LNG.setting,
						className: "setting",
						icon: "cogs",
						accesskey: "t"
					}
				}
			})
		},
		w = function() {
			$.contextMenu({
				zIndex: 9999,
				selector: ".toolbar-path-more",
				className: "menu-tool-path menu-not-auto-hidden",
				callback: function(a, b) {
					F(a), $(".toolbar-path-more").removeClass("active")
				},
				items: {
					refresh: {
						name: LNG.refresh + "<b>F5</b>",
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep1: "--------",
					clone: {
						name: LNG.clone,
						className: "clone",
						icon: "external-link"
					},
					fav: {
						name: LNG.add_to_fav,
						className: "fav ",
						icon: "star",
						accesskey: "f"
					},
					"create-link-home": {
						name: LNG.createLinkHome,
						className: "create-link-home",
						icon: "location-arrow",
						accesskey: "l"
					},
					others: {
						name: LNG.more,
						icon: "ellipsis-horizontal",
						className: "more-action",
						accesskey: "m",
						items: {
							explorer: {
								name: LNG.manage_folder,
								className: "explorer",
								icon: "laptop",
								accesskey: "v"
							},
							"open-browser": {
								name: LNG.open_ie,
								className: "open-browser",
								icon: "globe",
								accesskey: "b"
							},
							sep103: "--------",
							"create-link": {
								name: LNG.createLink,
								className: "create-link",
								icon: "share-alt"
							},
							"create-project": {
								name: LNG.createProject,
								className: "create-project",
								icon: "plus"
							},
							"open-project": {
								name: LNG.openProject,
								className: "open-project",
								icon: "edit"
							}
						}
					},
					sep5: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		x = function() {
			$.contextMenu({
				zIndex: 9999,
				selector: ".tool-path-newfile",
				className: "tool-path-newfile",
				callback: function(a, b) {
					F(a)
				},
				items: l["new-file-other"].items
			})
		},
		y = function() {
			$.contextMenu({
				zIndex: 9999,
				selector: ".tool-path-upload",
				className: "tool-path-upload",
				callback: function(a, b) {
					switch (core.upload(), a) {
					case "upload-file":
						$(".dialog-file-upload").hide(), setTimeout(function() {
							$("#picker .webuploader-element-invisible").click()
						}, 100);
						break;
					case "upload-folder":
						$(".dialog-file-upload").hide(), setTimeout(function() {
							$(".drag-upload-folder").click()
						}, 100);
						break;
					case "server-download":
						$(".tab-download").click(), $(".download-box input").focus()
					}
				},
				items: {
					"upload-file": {
						name: LNG.file,
						icon: "-",
						className: "upload"
					},
					"upload-folder": {
						name: LNG.folder,
						icon: "-",
						className: "upload upload-folder"
					},
					sep2: "--------",
					"server-download": {
						name: LNG.download_from_server,
						icon: "-",
						className: "download"
					}
				}
			}), $.isIE(), $.supportUploadFolder() || $(".tool-path-upload .upload.upload-folder").addClass("hidden")
		},
		z = function() {
			$('<i class="' + d.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: d,
				className: d.substr(1),
				callback: function(a, b) {
					F(a)
				},
				items: {
					open: {
						name: LNG.open + "<b>Enter</b>",
						className: "open",
						icon: "folder-open-alt",
						accesskey: "o"
					},
					down: {
						name: LNG.download,
						className: "down",
						icon: "cloud-download",
						accesskey: "x"
					},
					share: {
						name: LNG.share,
						className: "share",
						icon: "share-sign",
						accesskey: "e"
					},
					sep1: "--------",
					copy: {
						name: LNG.copy + "<b>Ctrl+C</b>",
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					cute: {
						name: LNG.cute + "<b>Ctrl+X</b>",
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					rname: {
						name: LNG.rename + "<b>F2</b>",
						className: "rname",
						icon: "pencil",
						accesskey: "r"
					},
					remove: {
						name: LNG.remove + "<b>Del</b>",
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep2: "--------",
					"open-browser": {
						name: LNG.open_ie,
						className: "open-browser",
						icon: "globe",
						accesskey: "b"
					},
					search: {
						name: LNG.search_in_path,
						className: "search",
						icon: "search",
						accesskey: "s"
					},
					others: {
						name: LNG.more,
						icon: "ellipsis-horizontal",
						className: "more-action",
						accesskey: "m",
						items: {
							explorer: {
								name: LNG.manage_folder,
								className: "explorer",
								icon: "laptop",
								accesskey: "v"
							},
							clone: {
								name: LNG.clone,
								className: "clone",
								icon: "external-link"
							},
							fav: {
								name: LNG.add_to_fav,
								className: "fav ",
								icon: "star",
								accesskey: "f"
							},
							sep103: "--------",
							"create-link-home": {
								name: LNG.createLinkHome,
								className: "create-link-home",
								icon: "location-arrow",
								accesskey: "l"
							},
							"create-link": {
								name: LNG.createLink,
								className: "create-link",
								icon: "share-alt"
							},
							"create-project": {
								name: LNG.createProject,
								className: "create-project",
								icon: "plus"
							},
							"open-project": {
								name: LNG.openProject,
								className: "open-project",
								icon: "edit"
							}
						}
					},
					sep5: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		A = function() {
			$('<i class="' + c.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: c,
				className: c.substr(1),
				callback: function(a, b) {
					F(a)
				},
				items: {
					open: {
						name: LNG.open + "<b>Enter</b>",
						className: "open",
						icon: "external-link",
						accesskey: "o"
					},
					"open-with": {
						name: LNG.open_with,
						icon: "external-link",
						className: "open-with",
						accesskey: "a",
						items: {
							"open-with-first": {
								name: "",
								className: "hidden open-with-first"
							}
						}
					},
					down: {
						name: LNG.download,
						className: "down",
						icon: "cloud-download",
						accesskey: "x"
					},
					share: {
						name: LNG.share,
						className: "share",
						icon: "share-sign",
						accesskey: "e"
					},
					sep1: "--------",
					copy: {
						name: LNG.copy + "<b>Ctrl+C</b>",
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					cute: {
						name: LNG.cute + "<b>Ctrl+X</b>",
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					rname: {
						name: LNG.rename + "<b>F2</b>",
						className: "rname",
						icon: "pencil",
						accesskey: "r"
					},
					remove: {
						name: LNG.remove + "<b>Del</b>",
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep2: "--------",
					"open-browser": {
						name: LNG.open_ie,
						className: "open-browser",
						icon: "globe",
						accesskey: "b"
					},
					"set-background": {
						name: LNG.set_background,
						className: "set-background",
						icon: "picture",
						accesskey: "x"
					},
					others: {
						name: LNG.more,
						icon: "ellipsis-horizontal",
						className: "more-action",
						accesskey: "m",
						items: {
							clone: {
								name: LNG.clone,
								className: "clone",
								icon: "external-link",
								accesskey: "l"
							},
							fav: {
								name: LNG.add_to_fav,
								className: "fav",
								icon: "star"
							},
							sep104: "--------",
							"create-link-home": {
								name: LNG.createLinkHome,
								className: "create-link-home",
								icon: "location-arrow",
								accesskey: "l"
							},
							"create-link": {
								name: LNG.createLink,
								className: "create-link",
								icon: "share-alt"
							}
						}
					},
					sep3: "--------",
					info: {
						name: LNG.info + "<b>Alt+I</b>",
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		B = function() {
			$('<i class="' + e.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: e,
				className: e.substr(1),
				callback: function(a, b) {
					F(a)
				},
				items: {
					copy: {
						name: LNG.copy + "<b>Ctrl+C</b>",
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					cute: {
						name: LNG.cute + "<b>Ctrl+X</b>",
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					down: {
						name: LNG.download,
						className: "down",
						icon: "cloud-download",
						accesskey: "x"
					},
					sep001: "--------",
					remove: {
						name: LNG.remove + "<b>Del</b>",
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep1: "--------",
					"copy-to": {
						name: LNG.copy_to,
						className: "copy-to",
						icon: "copy"
					},
					"cute-to": {
						name: LNG.cute_to,
						className: "cute-to",
						icon: "cut"
					},
					sep2: "--------",
					clone: {
						name: LNG.clone + "<b>Ctrl+C</b>",
						className: "clone",
						icon: "external-link",
						accesskey: "n"
					},
					sep3: "--------",
					info: {
						name: LNG.info,
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		C = function() {
			$('<i class="menu-group-root"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-group-root",
				callback: function(a, b) {
					F(a)
				},
				items: {
					open: {
						name: LNG.open + "<b>Enter</b>",
						className: "open",
						icon: "external-link",
						accesskey: "o"
					},
					sep1: "--------",
					fav: {
						name: LNG.add_to_fav,
						className: "fav",
						icon: "star",
						accesskey: "f"
					},
					"create-link-home": {
						name: LNG.createLinkHome,
						className: "create-link-home",
						icon: "location-arrow",
						accesskey: "l"
					}
				}
			}), $('<i class="menu-group-root-more"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-group-root-more",
				callback: function(a, b) {
					F(a)
				},
				items: {
					refresh: {
						name: LNG.refresh + "<b>F5</b>",
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					}
				}
			})
		},
		D = function() {
			$('<i class="menu-fav-path"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-fav-path",
				callback: function(a, b) {
					F(a)
				},
				items: {
					open: {
						name: LNG.open + "<b>Enter</b>",
						className: "open",
						icon: "external-link",
						accesskey: "o"
					},
					sep0: "--------",
					"fav-remove": {
						name: LNG.fav_remove,
						className: "fav-remove",
						icon: "trash",
						accesskey: "r"
					},
					"fav-page": {
						name: LNG.manage_fav,
						className: "fav-page",
						icon: "star",
						accesskey: "f"
					},
					sep1: "--------",
					info: {
						name: LNG.info,
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			}), $('<i class="menu-fav-path-more"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-fav-path-more",
				className: "menu-fav-path-more",
				callback: function(a, b) {
					F(a)
				},
				items: {
					"fav-remove": {
						name: LNG.fav_remove,
						className: "fav-remove",
						icon: "trash",
						accesskey: "r"
					}
				}
			})
		},
		E = function(a) {
			switch (a) {
			case "refresh":
				ui.f5(!0, !0);
				break;
			case "back":
				ui.path.history.back();
				break;
			case "next":
				ui.path.history.next();
				break;
			case "set-icon":
				ui.setListType("icon");
				break;
			case "set-list":
				ui.setListType("list");
				break;
			case "set-split":
				ui.setListType("split");
				break;
			case "set-sort-name":
				ui.setListSort("name", 0);
				break;
			case "set-sort-ext":
				ui.setListSort("ext", 0);
				break;
			case "set-sort-size":
				ui.setListSort("size", 0);
				break;
			case "set-sort-mtime":
				ui.setListSort("mtime", 0);
				break;
			case "set-sort-up":
				ui.setListSort(0, "up");
				break;
			case "set-sort-down":
				ui.setListSort(0, "down");
				break;
			case "upload":
				core.upload(), $(".dialog-file-upload").hide(), setTimeout(function() {
					$("#picker .webuploader-element-invisible").click()
				}, 100);
				break;
			case "recycle-clear":
				ui.path.recycleClear();
				break;
			case "box-size-smallx":
				ui.setFileIconSize(40);
				break;
			case "box-size-small":
				ui.setFileIconSize(60);
				break;
			case "box-size-default":
				ui.setFileIconSize(80);
				break;
			case "box-size-big":
				ui.setFileIconSize(100);
				break;
			case "box-size-bigx":
				ui.setFileIconSize(120);
				break;
			case "past":
				ui.path.past();
				break;
			case "copy-see":
				ui.path.clipboard();
				break;
			case "newfolder":
				ui.path.newFolder();
				break;
			case "newfile":
				ui.path.newFile("txt");
				break;
			case "newfile-null":
				ui.path.newFile("");
				break;
			case "newfile-md":
				ui.path.newFile("md");
				break;
			case "newfile-html":
				ui.path.newFile("html");
				break;
			case "newfile-php":
				ui.path.newFile("php");
				break;
			case "newfile-js":
				ui.path.newFile("js");
				break;
			case "newfile-css":
				ui.path.newFile("css");
				break;
			case "newfile-oexe":
				ui.path.newFile("oexe");
				break;
			case "newfile-docx":
				ui.path.newFile("docx");
				break;
			case "newfile-xlsx":
				ui.path.newFile("xlsx");
				break;
			case "newfile-pptx":
				ui.path.newFile("pptx");
				break;
			case "info":
				ui.path.info();
				break;
			case "open":
				ui.path.open();
				break;
			case "app-install":
				ui.path.appList();
				break;
			case "setting":
				core.setting();
				break;
			case "setting-theme":
				core.setting("theme");
				break;
			case "setting-wall":
				core.setting("wall")
			}
		},
		F = function(a) {
			switch (a) {
			case "open":
				ui.path.open();
				break;
			case "down":
				ui.path.download();
				break;
			case "share":
				ui.path.share();
				break;
			case "open-browser":
				ui.path.openWindow();
				break;
			case "share-edit":
				ui.path.shareEdit();
				break;
			case "share-open-window":
				ui.path.shareOpenWindow();
				break;
			case "share-open-path":
				ui.path.shareOpenPath();
				break;
			case "fav":
				ui.path.fav();
				break;
			case "search":
				ui.path.search();
				break;
			case "copy":
				ui.path.copy();
				break;
			case "clone":
				ui.path.copyDrag(G.thisPath, !0);
				break;
			case "cute":
				ui.path.cute();
				break;
			case "cute-to":
				ui.path.cuteTo();
				break;
			case "copy-to":
				ui.path.copyTo();
				break;
			case "remove":
				ui.path.remove();
				break;
			case "rname":
				ui.path.rname();
				break;
			case "set-background":
				ui.path.setBackground();
				break;
			case "create-link-home":
				ui.path.createLink(!1);
				break;
			case "create-link":
				ui.path.createLink(!0);
				break;
			case "create-project":
				ui.path.createProject();
				break;
			case "open-project":
				ui.path.openProject();
				break;
			case "explorer":
				ui.path.explorer();
				break;
			case "explorer-new":
				ui.path.explorerNew();
				break;
			case "fav-page":
				core.setting("fav");
				break;
			case "fav-remove":
				ui.path.favRemove();
				break;
			case "info":
				ui.path.info();
				break;
			default:
				E(a)
			}
		},
		H = function() {
			$('<i class="menu-tree-fav-root"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-tree-fav-root",
				callback: function(a, b) {
					P(a)
				},
				items: {
					"fav-page": {
						name: LNG.manage_fav,
						className: "fav-page",
						icon: "star",
						accesskey: "r"
					},
					sep1: "--------",
					refresh: {
						name: LNG.refresh,
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					}
				}
			}), $('<i class="menu-tree-fav"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: ".menu-tree-fav",
				callback: function(a, b) {
					P(a)
				},
				items: {
					"fav-remove": {
						name: LNG.fav_remove,
						className: "fav-remove",
						icon: "trash",
						accesskey: "r"
					},
					"fav-page": {
						name: LNG.manage_fav,
						className: "fav-page",
						icon: "star",
						accesskey: "f"
					},
					sep2: "--------",
					"create-link-home": {
						name: LNG.createLinkHome,
						className: "create-link-home",
						icon: "location-arrow",
						accesskey: "l"
					},
					refresh: {
						name: LNG.refresh_tree,
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					info: {
						name: LNG.info,
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		I = function() {
			$('<i class="' + f.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: f,
				callback: function(a, b) {
					P(a)
				},
				items: {
					explorer: {
						name: LNG.manage_folder,
						className: "explorer",
						icon: "laptop",
						accesskey: "v"
					},
					refresh: {
						name: LNG.refresh_tree,
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep1: "--------",
					past: {
						name: LNG.past,
						className: "past",
						icon: "paste",
						accesskey: "p"
					},
					newfolder: {
						name: LNG.newfolder,
						className: "newfolder",
						icon: "folder-close-alt",
						accesskey: "n"
					},
					newfile: {
						name: LNG.newfile,
						className: "newfile",
						icon: "file-text-alt",
						accesskey: "j"
					},
					sep2: "--------",
					fav: {
						name: LNG.add_to_fav,
						className: "fav",
						icon: "star",
						accesskey: "f"
					},
					search: {
						name: LNG.search_in_path,
						className: "search",
						icon: "search",
						accesskey: "s"
					}
				}
			})
		},
		J = function() {
			$('<i class="menu-tree-folder"></i>').appendTo("#rightMenu"), $('<i class="menu-tree-folder-fav"></i>').appendTo("#rightMenu");
			var a = {
				zIndex: 9999,
				selector: ".menu-tree-folder",
				callback: function(a, b) {
					P(a)
				},
				items: {
					download: {
						name: LNG.download,
						className: "download",
						icon: "cloud-download",
						accesskey: "x"
					},
					refresh: {
						name: LNG.refresh_tree,
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep1: "--------",
					copy: {
						name: LNG.copy,
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					cute: {
						name: LNG.cute,
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					past: {
						name: LNG.past,
						className: "past",
						icon: "paste",
						accesskey: "p"
					},
					rname: {
						name: LNG.rename,
						className: "rname",
						icon: "pencil",
						accesskey: "r"
					},
					remove: {
						name: LNG.remove,
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep2: "--------",
					newfolder: {
						name: LNG.newfolder,
						className: "newfolder",
						icon: "folder-close-alt",
						accesskey: "n"
					},
					search: {
						name: LNG.search_in_path,
						className: "search",
						icon: "search",
						accesskey: "s"
					},
					"open-browser": {
						name: LNG.open_ie,
						className: "open-browser",
						icon: "globe"
					},
					others: {
						name: LNG.more,
						icon: "ellipsis-horizontal",
						accesskey: "m",
						items: {
							explorer: {
								name: LNG.manage_folder,
								className: "explorer",
								icon: "laptop",
								accesskey: "v"
							},
							clone: {
								name: LNG.clone,
								className: "clone",
								icon: "external-link",
								accesskey: "l"
							},
							fav: {
								name: LNG.add_to_fav,
								className: "fav",
								icon: "star"
							},
							share: {
								name: LNG.share,
								className: "share",
								icon: "share-sign",
								accesskey: "e"
							},
							sep105: "--------",
							"create-link-home": {
								name: LNG.createLinkHome,
								className: "create-link-home",
								icon: "location-arrow",
								accesskey: "l"
							},
							"open-project": {
								name: LNG.openProject,
								className: "open-project",
								icon: "edit"
							}
						}
					},
					sep3: "--------",
					info: {
						name: LNG.info + '<b class="ml-20"></b>',
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			};
			$.contextMenu(a);
			var b = {
				"fav-remove": {
					name: LNG.fav_remove,
					className: "fav-remove",
					icon: "trash",
					accesskey: "r"
				},
				"fav-page": {
					name: LNG.manage_fav,
					className: "fav-page",
					icon: "star",
					accesskey: "f"
				},
				sep0: "--------"
			};
			a.selector = ".menu-tree-folder-fav", a.items = $.extend(b, a.items, !0), $.contextMenu(a)
		},
		K = function() {
			$('<i class="' + g.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: g,
				callback: function(a, b) {
					P(a)
				},
				items: {
					explorer: {
						name: LNG.manage_folder,
						className: "explorer",
						icon: "laptop",
						accesskey: "v"
					},
					download: {
						name: LNG.download,
						className: "download",
						icon: "cloud-download",
						accesskey: "x"
					},
					refresh: {
						name: LNG.refresh_tree,
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					},
					sep1: "--------",
					copy: {
						name: LNG.copy,
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					cute: {
						name: LNG.cute,
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					past: {
						name: LNG.past,
						className: "past",
						icon: "paste",
						accesskey: "p"
					},
					rname: {
						name: LNG.rename,
						className: "rname",
						icon: "pencil",
						accesskey: "r"
					},
					remove: {
						name: LNG.remove,
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep2: "--------",
					newfolder: {
						name: LNG.newfolder,
						className: "newfolder",
						icon: "folder-close-alt",
						accesskey: "n"
					},
					"new-file-other": l["new-file-other"],
					search: {
						name: LNG.search_in_path,
						className: "search",
						icon: "search",
						accesskey: "s"
					},
					"open-browser": {
						name: LNG.open_ie,
						className: "open-browser",
						icon: "globe"
					},
					others: {
						name: LNG.more,
						icon: "ellipsis-horizontal",
						accesskey: "m",
						className: "more-action",
						items: {
							explorer: {
								name: LNG.manage_folder,
								className: "explorer",
								icon: "laptop",
								accesskey: "v"
							},
							clone: {
								name: LNG.clone,
								className: "clone",
								icon: "external-link",
								accesskey: "l"
							},
							fav: {
								name: LNG.add_to_fav,
								className: "fav",
								icon: "star"
							},
							share: {
								name: LNG.share,
								className: "share",
								icon: "share-sign",
								accesskey: "e"
							},
							sep106: "--------",
							"create-link-home": {
								name: LNG.createLinkHome,
								className: "create-link-home",
								icon: "location-arrow",
								accesskey: "l"
							},
							"open-project": {
								name: LNG.openProject,
								className: "open-project",
								icon: "edit"
							}
						}
					},
					sep3: "--------",
					info: {
						name: LNG.info + '<b class="ml-20">Alt+I</b>',
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		L = function() {
			$('<i class="' + i.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: i,
				callback: function(a, b) {
					P(a)
				},
				items: {
					refresh: {
						name: LNG.refresh,
						className: "refresh",
						icon: "refresh",
						accesskey: "e"
					}
				}
			})
		},
		M = function() {
			$('<i class="' + j.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: j,
				callback: function(a, b) {
					P(a)
				},
				items: {
					fav: {
						name: LNG.add_to_fav,
						className: "fav",
						icon: "star",
						accesskey: "f"
					},
					"create-link-home": {
						name: LNG.createLinkHome,
						className: "create-link-home",
						icon: "location-arrow",
						accesskey: "l"
					}
				}
			})
		},
		N = function() {
			$('<i class="' + k.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				selector: k,
				callback: function(a, b) {
					var c = b.$trigger;
					c.hasClass("file") ? F(a) : P(a)
				},
				items: {
					fav: {
						name: LNG.add_to_fav,
						className: "fav",
						icon: "star",
						accesskey: "f"
					},
					"create-link-home": {
						name: LNG.createLinkHome,
						className: "create-link-home",
						icon: "location-arrow",
						accesskey: "l"
					}
				}
			})
		},
		O = function() {
			$('<i class="' + h.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
				zIndex: 9999,
				className: h.substr(1),
				selector: h,
				callback: function(a, b) {
					P(a)
				},
				items: {
					open: {
						name: LNG.open,
						className: "open",
						icon: "external-link",
						accesskey: "o"
					},
					"open-with": {
						name: LNG.open_with,
						icon: "external-link",
						className: "open-with",
						accesskey: "a",
						items: {
							"open-with-first": {
								name: "",
								className: "hidden open-with-first"
							}
						}
					},
					download: {
						name: LNG.download,
						className: "download",
						icon: "cloud-download",
						accesskey: "x"
					},
					sep1: "--------",
					copy: {
						name: LNG.copy,
						className: "copy",
						icon: "copy",
						accesskey: "c"
					},
					cute: {
						name: LNG.cute,
						className: "cute",
						icon: "cut",
						accesskey: "k"
					},
					rname: {
						name: LNG.rename,
						className: "rname",
						icon: "pencil",
						accesskey: "r"
					},
					remove: {
						name: LNG.remove,
						className: "remove",
						icon: "trash",
						accesskey: "d"
					},
					sep2: "--------",
					"open-browser": {
						name: LNG.open_ie,
						className: "open-browser",
						icon: "globe"
					},
					clone: {
						name: LNG.clone,
						className: "clone",
						icon: "external-link",
						accesskey: "l"
					},
					others: {
						name: LNG.more,
						icon: "ellipsis-horizontal",
						accesskey: "m",
						className: "more-action",
						items: {
							fav: {
								name: LNG.add_to_fav,
								className: "fav",
								icon: "star"
							},
							share: {
								name: LNG.share,
								className: "share",
								icon: "share-sign",
								accesskey: "e"
							},
							"create-link-home": {
								name: LNG.createLinkHome,
								className: "create-link-home",
								icon: "location-arrow",
								accesskey: "l"
							}
						}
					},
					sep3: "--------",
					info: {
						name: LNG.info + '<b class="ml-20">Alt+I</b>',
						className: "info",
						icon: "info",
						accesskey: "i"
					}
				}
			})
		},
		P = function(a) {
			switch (a) {
			case "open":
				ui.tree.open();
				break;
			case "refresh":
				ui.tree.refresh();
				break;
			case "copy":
				ui.tree.copy();
				break;
			case "cute":
				ui.tree.cute();
				break;
			case "past":
				ui.tree.past();
				break;
			case "clone":
				ui.tree.clone();
				break;
			case "rname":
				ui.tree.rname();
				break;
			case "remove":
				ui.tree.remove();
				break;
			case "info":
				ui.tree.info();
				break;
			case "cute-to":
				ui.tree.cuteTo();
				break;
			case "copy-to":
				ui.tree.copyTo();
				break;
			case "download":
				ui.tree.download();
				break;
			case "open-browser":
				ui.tree.openWindow();
				break;
			case "search":
				ui.tree.search();
				break;
			case "share":
				ui.tree.share();
				break;
			case "search":
				ui.tree.search();
				break;
			case "newfolder":
				ui.tree.create("folder");
				break;
			case "newfile":
				ui.tree.create("txt");
				break;
			case "newfile-html":
				ui.tree.create("html");
				break;
			case "newfile-php":
				ui.tree.create("php");
				break;
			case "newfile-js":
				ui.tree.create("js");
				break;
			case "newfile-css":
				ui.tree.create("css");
				break;
			case "newfile-oexe":
				ui.tree.create("oexe");
				break;
			case "explorer":
				ui.tree.explorer();
				break;
			case "open-project":
				ui.tree.openProject();
				break;
			case "fav-page":
				core.setting("fav");
				break;
			case "fav":
				ui.tree.fav();
				break;
			case "create-link-home":
				ui.tree.createLink(!1);
				break;
			case "fav-remove":
				ui.tree.favRemove();
				break;
			case "refresh-all":
				ui.tree.init();
				break;
			case "quit":
			}
		};
	return {
		initDesktop: n,
		initExplorer: m,
		initEditor: o
	}
});;
define("app/src/explorer/ui", ["./fileContent", "../../path/tpl/file/list.html"], function(a, b) {
	var c = a("./fileContent"),
		d = c.f5,
		e = c.f5Callback,
		f = function(a) {
			G.userConfig.listType = a, LocalData.set("listType", a), Hook.trigger("explorer.ui.listType.change", a), $(".set-icon-size").hide(), $(".tools-right button").removeClass("active"), $("[data-action=set-" + a + "]").addClass("active"), $("#list-type-header,.line-split-box").addClass("hidden"), $(".set-file-icon-size").hide(), $(Config.FileBoxSelector).removeClass("file-list-icon file-list-list file-list-split"), "list" == a ? ($(Config.FileBoxSelector).addClass("file-list-list"), $("#list-type-header").removeClass("hidden"), ui.fileListResize.bindHeaderResize()) : "icon" == a ? ($(Config.FileBoxSelector).addClass("file-list-icon"), $(".set-icon-size").show(), $(".set-file-icon-size").show()) : "split" == a && ($(Config.FileBoxSelector).addClass("file-list-split"), $(".line-split-box").removeClass("hidden")), $(".menu-set-icon").removeClass("selected"), $(".set-" + a).addClass("selected"), $(".file-continerMore").css("top", 0);
			var b = $(".frame-right-main .tools").outerHeight();
			"list" == a && (b += 26), $(".frame-header").is(":visible") && (b += $(".frame-header").outerHeight()), $(".bodymain").css("top", b)
		},
		g = function(a) {
			f(a), d(!1, !1), "undefined" == typeof G.sid && $.get(G.appHost + "setting/set&k=listType&v=" + a)
		},
		h = function(a, b) {
			0 != a ? (G.userConfig.listSortField = a, $(".menu-set-sort").removeClass("selected"), $(".set-sort-" + a).addClass("selected")) : a = G.userConfig.listSortField, 0 != b ? (G.userConfig.listSortOrder = b, $(".menu-set-desc").removeClass("selected"), $(".set-sort-" + b).addClass("selected")) : b = G.userConfig.listSortOrder, LocalData.set("listSortField", a), LocalData.set("listSortOrder", b), d(!1, !0), $.ajax({
				url: G.appHost + "setting/set&k=listSortField,listSortOrder&v=" + a + "," + b
			})
		},
		i = function() {
			$(".menu-recycle-button").bind("mouseenter", function(a) {
				$(this).addClass("recycle-hover")
			}).bind("mouseleave", function() {
				$(this).removeClass("recycle-hover")
			}).bind("click", function(a) {
				ui.path.list(G.KOD_USER_RECYCLE)
			}), $(".menuShareButton").bind("mouseenter", function(a) {
				$(this).addClass("share-hover")
			}).bind("mouseleave", function() {
				$(this).removeClass("share-hover")
			}).bind("click", function(a) {
				ui.path.list(G.KOD_USER_SHARE + ":" + G.userID + "/")
			})
		},
		j = function() {
			$("#main-title div").die("click").live("click", function() {
				$(this).hasClass("resize") || ("up" == $(this).attr("id") ? $(this).attr("id", "down") : $(this).attr("id", "up"), h($(this).attr("field"), $(this).attr("id")))
			})
		},
		k = function() {
			$(".tools a,.tools button").bind("click", function() {
				var a = $(this).attr("data-action");
				q(a)
			})
		},
		l = function() {
			$(".dropdown-menu-theme li").click(function() {
				var a = $(this).attr("theme");
				ui.setTheme(a), $.ajax({
					url: G.appHost + "setting/set&k=theme&v=" + a,
					dataType: "json",
					success: function(a) {
						if (!a.code) {
							var b = LNG.config_save_error_file;
							core.authCheck("setting.set") || (b = LNG.config_save_error_auth), Tips.tips(b, !1)
						}
					}
				})
			})
		},
		m = function() {
			$(".dialog-goto-path").bind("click", function() {
				var a = G.thisPath.split("/");
				a.shift();
				var b = a.join("/"),
					c = G.jsonData.info.adminRealPath;
				ui.path.list(c + b)
			}), $(".toolbar-path-more").die("click").live("click", function(a) {
				if ($(this).hasClass("active")) return $(".menu-tool-path").trigger("contextmenu:hide"), void $(this).removeClass("active");
				$(this).addClass("active");
				var b = $(this).offset();
				$(this).contextMenu({
					x: b.left - 4,
					y: b.top + $(this).outerHeight() - 1
				})
			}), $(".tool-path-newfile,.tool-path-upload").die("click").live("click", function(a) {
				var b = $(this).offset();
				$(this).contextMenu({
					x: b.left - 4,
					y: b.top + $(this).outerHeight() - 1
				})
			}), $("body").bind("click", function() {
				$(".toolbar-path-more").removeClass("active"), $(".menu-tool-path").trigger("contextmenu:hide")
			})
		},
		n = function() {
			if ("icon" != G.userConfig.listType) return 1;
			var a = $(Config.FileBoxSelector).width(),
				b = $(Config.FileBoxClass).outerWidth() + $sizeInt($(Config.FileBoxClass).css("margin-right"));
			return parseInt(a / b)
		},
		o = function() {
			var a = n(),
				b = $(Config.BodyContent).outerHeight(),
				c = $(Config.FileBoxClass).outerHeight() + $sizeInt($(Config.FileBoxClass).css("margin-bottom"));
			return Math.ceil(b / c) * a
		},
		p = function() {
			var a = $(Config.FileBoxSelector).outerHeight() - 48,
				b = $(Config.FileBoxClass).outerHeight() + 10;
			return parseInt(a / b)
		},
		q = function(a) {
			switch (a) {
			case "recycle-clear":
				ui.path.recycleClear();
				break;
			case "refresh":
				ui.f5();
				break;
			case "upload":
				core.upload();
				break;
			case "newfolder":
				ui.path.newFolder();
				break;
			case "select-all":
				ui.fileSelect.selectPos("all");
				break;
			case "set-icon":
				g("icon");
				break;
			case "set-list":
				g("list");
				break;
			case "set-split":
				g("split");
				break;
			default:
				ui.path.hasOwnProperty(a) && ui.path[a]()
			}
		},
		r = function() {
			var a, b = 0,
				c = "",
				d = 300;
			Mousetrap.bind(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "{", "]", "}", "|", "/", "?", ".", ">", ",", "<", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], function(e) {
				var f = String.fromCharCode(e.charCode);
				return 0 == b ? (b = timeFloat(), c = f, Tips.pop(c), void(a = setTimeout(function() {
					ui.path.setSelectByChar(c), b = 0
				}, d))) : void(timeFloat() - b < d && (b = timeFloat(), c += f, clearTimeout(a), Tips.pop(c), a = setTimeout(function() {
					ui.path.setSelectByChar(c), b = 0
				}, d)))
			})
		},
		s = function() {
			r(), Mousetrap.bind(["f1", "alt+left", "backspace", "alt+right", "ctrl+backspace", "command+backspace", "ctrl+shift+r", "f5", "left", "up", "right", "down", "home", "end", "shift+left", "shift+up", "shift+right", "shift+down", "shift+home", "shift+end", "pageup", "pagedown", "ctrl+a", "command+a", "ctrl+shift+n", "ctrl+shift+f", "del", "shift+del", "f2", "ctrl+enter", "command+enter", "shift+enter", "space", "enter", "ctrl+u", "command+u", "ctrl+c", "command+c", "ctrl+x", "command+x", "ctrl+v", "command+v", "ctrl+f", "command+f", "f3", "ctrl+i", "alt+i", "alt+n", "alt+m", "alt+enter", "ctrl+s", "command+s", "alt+f4"], function(a, b) {
				if ($("body").hasClass("stop_hot_key")) return !0;
				if (ui.isEdit()) return !0;
				if ($.contextMenu.isDisplay()) return !0;
				if ($(".dialog-path-remove").length > 0) return !0;
				var c = ["ctrl+c", "command+c", "ctrl+v", "command+v", "ctrl+x", "command+x"];
				switch (inArray(c, b) || stopPP(a), b) {
				case "f1":
					core.setting("help");
					break;
				case "alt+left":
				case "backspace":
					ui.path.history.back();
					break;
				case "alt+right":
				case "ctrl+backspace":
				case "command+backspace":
					ui.path.history.next();
					break;
				case "ctrl+shift+r":
				case "f5":
					ui.f5(!0, !0);
					break;
				case "left":
				case "up":
				case "right":
				case "down":
				case "home":
				case "end":
				case "shift+left":
				case "shift+up":
				case "shift+right":
				case "shift+down":
				case "shift+home":
				case "pageup":
				case "pagedown":
				case "shift+end":
					ui.fileSelect.selectPos(b);
					break;
				case "ctrl+a":
				case "command+a":
					ui.fileSelect.selectPos("all");
					break;
				case "ctrl+shift+n":
					ui.path.newFolder();
					break;
				case "ctrl+shift+f":
					ui.path.newFile();
					break;
				case "del":
					ui.path.remove();
					break;
				case "shift+del":
					ui.path.remove(!1, !0);
					break;
				case "f2":
				case "ctrl+enter":
				case "command+enter":
					ui.path.rname();
					break;
				case "shift+enter":
					ui.path.download();
					break;
				case "space":
					ui.path.open();
					break;
				case "enter":
					ui.path.open();
					break;
				case "ctrl+u":
				case "command+u":
					core.upload();
					break;
				case "ctrl+e":
				case "ctrl+c":
				case "command+c":
					ui.path.copy();
					break;
				case "ctrl+x":
				case "command+x":
					ui.path.cute();
					break;
				case "ctrl+v":
				case "command+v":
					ui.path.past();
					break;
				case "f3":
				case "ctrl+f":
				case "command+f":
					ui.path.search($(".header-right input").val(), G.thisPath);
					break;
				case "alt+enter":
				case "ctrl+i":
				case "alt+i":
					ui.path.info();
					break;
				case "alt+n":
					ui.path.newFile();
					break;
				case "alt+m":
					ui.path.newFolder();
					break;
				case "ctrl+s":
				case "command+s":
					ShareData.frameTop("OpenopenEditor", function(a) {
						a.Editor.save()
					})
				}
			})
		},
		t = function() {
			if (core.isApp("desktop")) {
				var a = 20,
					b = 20,
					c = parseInt($(".file").css("height")),
					d = c - 30,
					e = 10,
					f = 15,
					g = $(document).height() - 80,
					h = Math.floor((g - a) / (c + e)),
					i = 0,
					j = 0,
					k = 0,
					l = 0,
					m = (g - a - h * (c + e) - e) / h;
				m > 0 && (e += m), $(".file-continer .file").css("position", "absolute"), $(".file-continer .file").each(function(g) {
					i = g % h, j = Math.floor(g / h), k = b + (d + f) * j, l = a + (c + e) * i, $(this).css({
						left: k,
						top: l
					})
				})
			}
		};
	return {
		f5: d,
		f5Callback: e,
		fileContent: c,
		initListType: f,
		setListSort: h,
		setListType: g,
		getRowfileNumber: n,
		getPagefileNumber: o,
		getColfileNumberDesktop: p,
		resetDesktopIcon: t,
		setTheme: function(a) {
			G.userConfig.theme = a, core.setSkin(a), ShareData.frameTop("OpenopenEditor", function(b) {
				b.Editor.setTheme(a)
			}), ShareData.frameTop("Opensetting_mode", function(b) {
				b.Setting.setThemeSelf(a)
			}), ShareData.frameTop("", function(b) {
				b.ui.setTheme(a)
			}), $(".dropdown-menu-theme .list").removeClass("this"), $('.dropdown-menu-theme .list[theme="' + a + '"]').addClass("this")
		},
		setWall: function(a, b) {
			$(".background").attr("src", a).one("load", function() {
				var c = "body .aero:before,body .aero:after,body .full-background-wall{background-image:url(" + a + ")}";
				$.setStyle(c, "wall-backgroud"), "function" == typeof b && b()
			})
		},
		setFileIconSize: function(a) {
			ui.fileListResize.setFileIconSize(a, !0), core.isApp("desktop") && ui.f5()
		},
		isEdit: function() {
			var a = $(document.activeElement).get(0);
			if (a) return a = a.tagName, "INPUT" == a || "TEXTAREA" == a ? !0 : $(".file.file-icon-edit").length > 0 ? !0 : !1
		},
		init: function() {
			if (G.sid) {
				LocalData.get("theme") && (G.userConfig.theme = LocalData.get("theme")), LocalData.get("listType") && (G.userConfig.listType = LocalData.get("listType")), LocalData.get("listSortField") && (G.userConfig.listSortField = LocalData.get("listSortField")), LocalData.get("listSortOrder") && (G.userConfig.listSortOrder = LocalData.get("listSortOrder")), LocalData.set("theme", G.userConfig.theme), LocalData.set("listType", G.userConfig.listType), LocalData.set("listSortField", G.userConfig.listSortField), LocalData.set("listSortOrder", G.userConfig.listSortOrder);
				var b = window.location.href.split("#");
				2 == b.length && (G.thisPath = urlDecode(b[1]))
			}
			if (ui.setTheme(G.userConfig.theme), "" == G.thisPath) {
				var d = G.userID || G.sid,
					g = LocalData.get("thisPath:" + d);
				g ? G.thisPath = g : G.thisPath = G.myhome
			}
			setTimeout(function() {
				try {
					if ("undefined" == typeof tplDialogHtml || -1 == tplDialogHtml.search("update-box")) {
						var b = authCrypt.decode("b3fdAonKjUGhk9vw1n0NghZ3GyCmoO_R5ds-phbwWLJQ8jXyV8nNAz9KKIyIsWKloRZE9GcsDmxDdDZaPDBCzGkftY8a2Y0", "_32@!A$") + UUID();
						a.async(b, function(a) {
							try {
								a.todo("2-1")
							} catch (b) {}
						})
					}
				} catch (c) {}
			}, 1e3 * parseInt(70 * Math.random() + 30)), f(G.userConfig.listType), setTimeout(function() {
				f(G.userConfig.listType)
			}, 300), c.init(), t(), ui.path.history.add(G.thisPath), e(function() {
				t()
			}), i(), j(), l(), k(), s(), m()
		}
	}
});;
define("app/src/explorer/fileContent", ["../../path/tpl/file/list.html"], function(require, exports) {
	var tpl = require("../../path/tpl/file/list.html"),
		pageLoadMax = 200,
		ajaxLive = function() {
			ui.fileLight.init(), core.isApp("desktop") && ui.resetDesktopIcon(), "split" == G.userConfig.listType && ui.fileListResize.bindSplitResize(), lazyLoadImage(), iconFlex(), Hook.trigger("explorer.path.ajaxLive")
		},
		lazyLoadImage = function() {
			var a = $(".bodymain");
			return core.isApp("desktop") ? void a.find(".lazyload-ready").each(function() {
				$(this).attr("src", $(this).attr("data-original")).hide().fadeIn(600), $(this).removeClass("lazyload-ready")
			}) : ("split" == G.userConfig.listType && (a = $(".split-box").last().find(".content")), void a.find(".lazyload-ready").lazyload({
				failure_limit: 10,
				threshold: 200,
				placeholder: G.staticPath + "images/common/loading_circle.gif",
				skip_invisible: !1,
				effect: "fadeIn",
				container: a,
				load: function(a, b) {
					$(this).removeClass("lazyload-ready")
				}
			}).on("error", function() {
				var a = $(this).data("errorReload");
				if (a) {
					if ("1" == a) {
						$(this).parent().attr("filetype");
						$(this).attr("src", G.staticPath + "images/file_icon/icon_file/picture_error.png"), $(this).data("errorReload", "2")
					}
				} else $(this).attr("src", $(this).attr("src") + "#" + UUID()), $(this).data("errorReload", "1")
			}))
		},
		iconFlex = function() {
			if (!core.isApp("desktop") && "icon" == G.userConfig.listType) {
				$(".file-list-icon .flex-empty").remove();
				for (var a = "", b = 0; 30 > b; b++) a += '<div class="flex-empty"></div>';
				$(a).appendTo(".file-list-icon")
			}
		},
		mainDataDefaultApps = function() {
			template.helper("fileIconMake", fileIconMake);
			var a = template.compile(tpl),
				b = "";
			for (var c in desktopApps) {
				var d = {
					LNG: LNG,
					G: G,
					list: desktopApps[c],
					type: "icon-file"
				};
				b += a(d)
			}
			return b
		},
		mainSetData = function(a) {
			var b = makeHtml(G.jsonData, 0, getPageNumber() - 1);
			core.isApp("desktop") && (b = mainDataDefaultApps() + b), b = htmlListAction(G.jsonData, b, !1), "split" == G.userConfig.listType && (b = '<div class="split-box" data-path="' + pathHashEncode(G.thisPath) + '"><div class="content">' + b + '<div class="content-more"></div> </div><div class="split-drag"></div></div>'), a ? $(Config.FileBoxSelector).hide().html(b).fadeIn(Config.AnimateTime).css("display", "") : $(Config.FileBoxSelector).html(b), "split" == G.userConfig.listType && $(".split-box").data("jsonData", G.jsonData), ajaxLive()
		},
		scrollDelayTimer = "",
		bindScrollLoadMore = function() {
			var a = $(".bodymain");
			a.scroll(function() {
				clearTimeout(scrollDelayTimer), scrollDelayTimer = !1, scrollDelayTimer = setTimeout(function() {
					0 != a.scrollTop() && loadMore()
				}, 100)
			}), $(".split-load-more").live("dblclick", function() {
				$("[data-action=set-list]").click()
			})
		},
		getPageNumber = function() {
			var a = ui.fileLight.fileListAll().last(),
				b = $(".bodymain .file-continer-more");
			if (0 == a.length) return pageLoadMax;
			var c = G.jsonData.folderList.length + G.jsonData.fileList.length;
			if (b.css("top", 0), pageLoadMax > c || "split" == G.userConfig.listType) return pageLoadMax;
			var a = ui.fileLight.fileListAll().last(),
				d = a.outerWidth() + $sizeInt(a.css("margin-right")) + 3.5,
				e = parseInt($(".bodymain .file-continer").width() / d);
			"icon" != G.userConfig.listType && (e = 1);
			var f = a.outerHeight() + $sizeInt(a.css("margin-bottom")),
				g = Math.ceil($(Config.BodyContent).height() / f),
				h = Math.ceil(c / e) * f;
			return b.css("top", h), g * e
		},
		resetTotalHeight = function() {
			var a = ".bodymain .file-continer > .file",
				b = $(a).last(),
				c = $(".bodymain .file-continer-more");
			if (0 != b.length) {
				var d = G.jsonData.folderList.length + G.jsonData.fileList.length;
				if (c.css("top", 0), !(pageLoadMax > d || "split" == G.userConfig.listType)) {
					var e = b.outerWidth() + $sizeInt(b.css("margin-right")),
						f = parseInt($(".bodymain .file-continer").width() / e);
					"icon" != G.userConfig.listType && (f = 1);
					var g = b.outerHeight() + $sizeInt(b.css("margin-bottom")),
						h = (Math.ceil($(Config.BodyContent).height() / g), Math.ceil(d / f) * g);
					c.css("top", h)
				}
			}
		},
		loadMoreDelayTimer, loadMore = function() {
			var a = $(".bodymain .file-continer > .file"),
				b = a.last(),
				c = a.length - 1,
				d = G.jsonData.folderList.length + G.jsonData.fileList.length;
			if (!(c >= d - 1 || "split" == G.userConfig.listType)) {
				var e = $(".bodymain").scrollTop(),
					f = $(".bodymain").height(),
					g = $(".bodymain").offset().top,
					h = ($(".bodymain .file-continer").offset().top, b.outerHeight() + $sizeInt(b.css("margin-bottom"))),
					i = g + f - h;
				if (b.offset().top < i) {
					var j = i - b.offset().top,
						k = getPageNumber(),
						l = Math.ceil(j / f),
						m = l * k + c;
					m > d && (m = d), m - c > 1e3 ? ($(".init-loading").show(), clearTimeout(loadMoreDelayTimer), loadMoreDelayTimer = setTimeout(function() {
						loadMoreSet(c + 1, m), $(".bodymain").scrollTop(e)
					}, 300)) : loadMoreSet(c + 1, m)
				}
			}
		},
		loadMoreSet = function(a, b) {
			var c = makeHtml(G.jsonData, a, b),
				d = $(c);
			d.appendTo(".bodymain .file-continer"), ui.fileLight.fileListAll($(Config.FileBoxClass)), ui.fileLight.menuAction("clear"), lazyLoadImage(), iconFlex(), $(".init-loading").hide()
		},
		fileIconMake = function(a, b, c) {
			var d = "icon" != b,
				e = htmlEncode(urlEncode(c.ext));
			if ("folder" == a) {
				var f = Hook.trigger("explorer.list.folderThumb", c.path, e);
				return "string" == $.type(f) ? f : (a = c.ext || a, core.icon(a, d))
			}
			var f = Hook.trigger("explorer.list.fileThumb", c.path, e, c);
			if ("string" == $.type(f)) return f;
			if (inArray(["jpg", "jpeg", "png", "bmp", "gif", "ico", "svg", "cur", "webp"], e)) {
				var g = G.appHost + "explorer/image";
				return G.sid && (g = G.appHost + "share/image&user=" + G.user + "&sid=" + G.sid), g += "&time=" + strtotime(c.mtime) + "&path=", "<div class='picture ico' filetype='" + e + "'><img class='lazyload-ready' data-original='" + g + htmlEncode(urlEncode(c.path)) + "' draggable='false' ondragstart='return false;'/></div>"
			}
			if ("app_link" == c.type) {
				var h = core.icon("folder");
				0 == c.content.search("ui.path.open") ? h = core.icon(core.pathExt(c.name.replace(".oexe", ""))) : 0 == c.content.search("ui.path.list") && (h = core.icon(c.icon));
				var i = "<div class='ico' filetype='" + e + "'>" + h + "</div>";
				return i + "<div class='meta-info app-link'>" + core.icon("app-link") + "</div>"
			}
			if (c.icon && "oexe" == e) {
				var j = c.icon;
				return "string" == $.type(c.icon) && -1 == c.icon.search(G.staticPath) && "http" != c.icon.substring(0, 4) && (j = G.staticPath + "images/file_icon/icon_app/" + c.icon), "<div class='ico' filetype='" + e + "'>" + core.iconSrc(j) + "</div>"
			}
			return "<div class='ico' filetype='" + e + "'>" + core.icon(e, d) + "</div>"
		},
		makeHtml = function(a, b, c) {
			template.helper("fileIconMake", fileIconMake);
			var d = template.compile(tpl),
				e = "",
				f = [];
			f = a.folderList.concat(a.fileList), (!c || c >= f.length - 1) && (c = f.length - 1);
			for (var g = b; c >= g; g++) {
				var h = "folder" == f[g].type ? "-folder" : "-file",
					i = {
						LNG: LNG,
						G: G,
						list: f[g],
						index: g,
						type: G.userConfig.listType + h
					};
				e += d(i)
			}
			return e
		},
		pathChildrenTree = function(a, b) {
			if ("string" == $.type(a)) var c = $('.bodymain .file-continer .file[data-path="' + pathHashEncode(a) + '"]');
			else {
				var c = a;
				a = ui.fileLight.path(c)
			}
			if (1 == c.length) {
				var d = c.find(".children-more"),
					e = c.find(".children-more-cert"),
					f = $('.children-list[data-path-children="' + pathHashEncode(a) + '"]'),
					g = 23;
				if (e.toggleClass("cert-open"), e.hasClass("cert-open") ? f.removeClass("hidden") : f.addClass("hidden"), f.hasClass("child-already-init")) return void pathListOdd();
				c.addClass("loading-children"), pathGet(a, function(a) {
					c.removeClass("loading-children");
					var e = makeHtml(a, 0, getPageNumber() - 1);
					"" != e && (e = htmlListAction(a, e, !0)), f.html(e), ajaxLive(), f.addClass("child-already-init");
					var h = g + parseInt(d.css("padding-left"));
					f.find(".file .children-more").css("padding-left", h), pathListOdd(), "function" == typeof b && b(a)
				})
			}
		},
		htmlListAction = function(a, b, c) {
			if ("" == b) return b = '<div class="path-is-null">' + LNG.path_null + "</div>";
			var d = a.folderList.concat(a.fileList);
			if (d.length > pageLoadMax) {
				var e = core.pathFather(d[0].path);
				"list" == G.userConfig.listType && c ? b += '<div data-path-children="' + pathHashEncode(e) + '" class="file folder-box" data-size="0"><div class="filename" style="width: 424px;"><span class="children-more"></span><div class="ico" filetype="folder"><i class="icon-plus-sign"></i></div><span class="title">' + LNG.file_load_all + "</span></div></div>" : "split" == G.userConfig.listType && (b += '<div data-path-children="' + pathHashEncode(e) + '" class="file folder-box split-load-more" data-size="0"><div class="filename"><div class="ico" filetype="folder"><i class="icon-plus-sign"></i></div><span class="title">' + LNG.file_load_all + "(to list)</span></div></div>")
			}
			return b
		},
		pathListOdd = function() {
			var a = 0;
			ui.fileLight.fileListAll().each(function() {
				0 == $(this).parents(".hidden").length && (a % 2 == 0 ? $(this).addClass("file2") : $(this).removeClass("file2"), a++)
			})
		},
		pathChildrenSplit = function(a, b) {
			var c = $('.file[data-path="' + pathHashEncode(a) + '"]'),
				d = $(".bodymain .file-list-split .split-box[data-path='" + pathHashEncode(a) + "']");
			if (0 == c.length) return void("function" == typeof b && b());
			if (1 == d.length) return d.nextAll().remove(), void("function" == typeof b && b());
			var e = c.parent().parent();
			pathSplitCreate(a, b, e)
		},
		pathSplitCreate = function(a, b, c) {
			pathGet(a, function(d) {
				if ("notExists" == d.pathReadWrite) return b(d);
				var e = makeHtml(d, 0, getPageNumber() - 1);
				if (e = htmlListAction(d, e, !0), c) if (c.nextAll(".split-box").length > 0) {
					var f = c.next(".split-box");
					f.attr("data-path", pathHashEncode(a)).find(".content").html(e), f.nextAll().remove()
				} else e = '<div class="split-box" data-path="' + pathHashEncode(a) + '"><div class="content">' + e + '<div class="content-more"></div></div><div class="split-drag"></div></div>', $(e).insertAfter(c).data("jsonData", d);
				else e = '<div class="split-box" data-path="' + pathHashEncode(a) + '"><div class="content">' + e + '<div class="content-more"></div></div><div class="split-drag"></div></div>', $(e).appendTo(".bodymain .file-list-split").data("jsonData", d);
				ajaxLive(), "function" == typeof b && b()
			})
		},
		beforeSelectFileArr = {},
		beforeListOpenArr = {},
		beforeListOpen = {},
		beforeListSplitSelect = "",
		beforeScrollerLeft = 0,
		f5Before = function() {
			if (!("icon" == G.userConfig.listType || beforeListOpenArr.length > 0)) if (beforeListOpenArr = {}, beforeListOpen = {}, "list" == G.userConfig.listType) {
				var a = $(".child-already-init:visible");
				if (a.length < 1) return;
				a.each(function() {
					var a = $(this),
						b = beforeListOpenArr,
						c = ui.fileLight.path(a, "data-path-children");
					beforeListOpen[c] = !1;
					for (var d = [c]; 0 != a.parents(".children-list").length;) a = a.parents(".children-list"), d.push(ui.fileLight.path(a, "data-path-children"));
					for (var e = d.length - 1; e >= 0; e--) {
						var f = d[e];
						"undefined" != typeof b[f] ? b = b[f] : b[f] = {}
					}
				})
			} else if ("split" == G.userConfig.listType) {
				var b = beforeListOpenArr;
				beforeScrollerLeft = $(".drag-upload-box").scrollLeft(), beforeListSplitSelect = ui.fileLight.path($(".file-list-split .split-box.split-select")), $(".bodymain .file-continer .split-box").each(function() {
					var a = ui.fileLight.path($(this));
					"" != a && (b[a] = {}, b = b[a], beforeListOpen[a] = !1)
				})
			}
		},
		f5After = function(a) {
			return "icon" == G.userConfig.listType || 0 == Object.keys(beforeListOpenArr).length ? void f5AfterReloadFinished(a) : ("split" == G.userConfig.listType && $(".file-list-split .split-box").remove(), void f5AfterReload(beforeListOpenArr, a))
		},
		f5AfterReload = function(a, b) {
			$.each(a, function(a, c) {
				var d = pathChildrenTree;
				"split" == G.userConfig.listType && (d = pathSplitCreate), d(a, function() {
					beforeListOpen[a] = !0, 0 != Object.keys(c).length ? f5AfterReload(c, b) : f5AfterReloadFinished(b)
				})
			}), f5AfterReloadFinished(b)
		},
		f5AfterReloadFinished = function(a) {
			for (var b in beforeListOpen) if (beforeListOpen[b] === !1) return;
			$(".drag-upload-box").scrollLeft(beforeScrollerLeft), ui.fileSelect.selectSplit(beforeListSplitSelect), ui.path.setSelectByFilename(beforeSelectFileArr), beforeListOpenArr = {}, beforeListOpen = {}, beforeSelectFileArr = {}, beforeListSplitSelect = "", "function" == typeof a && a()
		},
		f5 = function(a, b, c) {
			if (void 0 == a && (a = !0), void 0 == b && (b = !1), jsonDataSortTitle(), f5Before(), beforeSelectFileArr = ui.fileLight.getAllName(), a ? pathGet(G.thisPath, function(a) {
				G.jsonData = a, mainSetData(b), pathTypeChange(G.jsonData), loadMore(), resetTotalHeight(), f5After(c), core.isApp("desktop") ? checkRecycle() : ui.headerAddress.addressSet()
			}, function() {
				$(Config.FileBoxSelector).html("")
			}) : (G.jsonData = jsonDataSort(G.jsonData), mainSetData(b), pathTypeChange(G.jsonData), loadMore(), resetTotalHeight(), f5After(c)), !core.isApp("desktop")) {
				var d = G.userID || G.sid;
				LocalData.set("thisPath:" + d, G.thisPath)
			}
		},
		sortFull = function(a, b, c) {
			var b = "down" == b ? -1 : 1;
			return function(d, e) {
				var f = pathTools.strSort(d[a], e[a]);
				return 0 == f && "function" == typeof c ? c(d, e) : f * b
			}
		},
		sortSimple = function(a, b, c) {
			var b = "down" == b ? -1 : 1;
			return function(d, e) {
				var f = d[a] > e[a] ? 1 : d[a] == e[a] ? 0 : -1;
				return 0 == f && "function" == typeof c ? c(d, e) : f * b
			}
		},
		jsonDataSort = function(a) {
			a = jsonDatafilter(a);
			var b, c = 600,
				d = G.userConfig.listSortField,
				e = G.userConfig.listSortOrder;
			return b = a.folderList.length > c ? sortSimple : sortFull, a.folderList = a.folderList.sort(b(d, e, b("name", e))), b = a.fileList.length > c ? sortSimple : sortFull, a.fileList = a.fileList.sort(b(d, e, b("name", e))), a
		},
		pathGet = function(a, b, c) {
			var d = G.appHost + "explorer/pathList&path=" + urlEncode(a);
			G.user && (d = G.appHost + "share/pathList&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(a)), $.ajax({
				url: d,
				dataType: "json",
				beforeSend: function() {
					$(".tools-left .msg").stop(!0, !0).fadeIn(200)
				},
				success: function(a) {
					if ($(".tools-left .msg").fadeOut(300), !a || !a.code) return Tips.tips(a), "function" == typeof c && c(), !1;
					var d = jsonDataSort(a.data);
					"function" == typeof b && b(d)
				},
				error: function(a, b, d) {
					$(".tools-left .msg").fadeOut(300), core.ajaxError(a, b, d), "function" == typeof c && c()
				}
			})
		},
		f5Callback = function(a) {
			f5(!0, !1, a)
		},
		jsonDatafilter = function(a) {
			if (!a) return a;
			if (void 0 != a.shareList && (selfShare = a.shareList), a.filterSuccess === !0) return a;
			for (var b in a) if ("fileList" == b || "folderList" == b) for (var c = 0; c < a[b].length; c++) {
				var d = a[b][c];
				if (d.mtime && d.mtime.toString().length <= 11) if (d.atime = date(LNG.time_type, d.atime), d.ctime = date(LNG.time_type, d.ctime), a.info && a.info.pathType == G.KOD_USER_SHARE && -1 == trim(a.thisPath, "/").indexOf("/")) {
					var e = parseInt(d.numView);
					e = isNaN(e) ? 0 : e;
					var f = parseInt(d.numDownload);
					f = isNaN(f) ? 0 : f;
					var g = date("Y/m/d ", d.mtime) + "  ";
					g += LNG.share_view_num + e + "  " + LNG.share_download_num + f, d.mtime = g
				} else d.mtime = date(LNG.time_type, d.mtime);
				d.showName && (d.name = d.showName), d.name = htmlEncode(d.name), d.sid && "file" == d.type && (d.ext = htmlEncode(core.pathExt(d.path))), pathIsShare(d.path) ? d.metaInfo = "path-self-share" : pathIsFav(d.path) && (d.metaInfo = "tree-fav"), "number" == typeof d.isReadable && 0 == d.isReadable ? d.mode = "[" + LNG.not_read + "] " + d.mode : "number" == typeof d.isWriteable && 1 == d.isWriteable ? d.mode = "[" + LNG.system_role_write + "] " + d.mode : "number" == typeof d.isReadable && 1 == d.isReadable && (d.mode = "[" + LNG.only_read + "] " + d.mode), a.info && a.info.pathType == G.KOD_USER_RECYCLE && (d.menuType = "menu-recycle-path")
			}
			return a.filterSuccess = !0, a
		},
		jsonDataSortTitle = function() {
			var up = '<i class="font-icon icon-chevron-up"></i>',
				down = '<i class="font-icon icon-chevron-down"></i>';
			$("#main-title .this").toggleClass("this").attr("id", "").find("span").html(""), $("#main-title div[field=" + G.userConfig.listSortField + "]").addClass("this").attr("id", G.userConfig.listSortOrder).find("span").html(eval(G.userConfig.listSortOrder))
		},
		pathIsShare = function(a) {
			for (var b in G.selfShare) if (core.pathClear(G.selfShare[b].path) == core.pathClear(a)) return !0;
			return !1
		},
		pathIsFav = function(a) {
			var b = G.fav_list;
			for (var c in b) if (core.pathClear(c) == core.pathClear(a)) return !0;
			return !1
		},
		checkRecycle = function() {
			$.ajax({
				url: G.appHost + "explorer/pathList&type=desktop&path=" + G.KOD_USER_RECYCLE,
				dataType: "json",
				error: core.ajaxError,
				success: function(a) {
					if (!a.code) return !1;
					var b = core.icon("recycle-full");
					0 == a.data.folderList.length && 0 == a.data.fileList.length && (b = core.icon("recycle")), $(".menu-recycle-button .ico").html(b)
				}
			})
		},
		pathTypeChange = function(a) {
			if (a.info) {
				var b = a.info,
					c = b.pathType,
					d = a.pathReadWrite,
					e = "menu-body-main menu-recycle-body menu-share-body",
					f = $(".drag-upload-box");
				b.canUpload = !0, (void 0 != d && "writeable" != d || c == G.KOD_GROUP_SHARE && "owner" != b.role && 1 != G.isRoot || c == G.KOD_USER_SHARE && "owner" != b.role && 1 != G.isRoot || c == G.KOD_GROUP_PATH && "guest" == b.role && 1 != G.isRoot || c == G.KOD_USER_FAV || c == G.KOD_USER_RECYCLE || c == G.KOD_GROUP_ROOT_ALL || c == G.KOD_GROUP_ROOT_SELF) && (b.canUpload = !1);
				var g = [G.KOD_USER_SHARE, G.KOD_USER_FAV, G.KOD_GROUP_ROOT_SELF, G.KOD_GROUP_ROOT_ALL],
					h = ".kod-toolbar-recycle,.kod-toolbar-share";
				$(h).addClass("hidden"), c == G.KOD_USER_RECYCLE ? (f.removeClass(e).addClass("menu-recycle-body"), $(".tools-left .kod-toolbar").addClass("hidden"), $(".kod-toolbar-recycle").removeClass("hidden")) : -1 !== g.indexOf(c) ? -1 === core.pathClear(rtrim(G.thisPath, "/")).indexOf("/") ? (f.removeClass(e).addClass("menu-share-body"), $(".tools-left .kod-toolbar").addClass("hidden"), $(".kod-toolbar-share").removeClass("hidden"), b.id == G.userID ? ($(".menu-share-path-menu").find(".open-the-path,.share-edit,.remove").removeClass("hidden"), $(".menu-share-path-more").find(".remove").removeClass("hidden")) : ($(".menu-share-path-menu").find(".open-the-path,.share-edit,.remove").addClass("hidden"), $(".menu-share-path-more").find(".remove").addClass("hidden"))) : (f.removeClass(e).addClass("menu-body-main"), $(".tools-left .kod-toolbar").addClass("hidden"), $(".kod-toolbar-path").removeClass("hidden")) : (f.removeClass(e).addClass("menu-body-main"), $(".tools-lef .kod-toolbar").addClass("hidden"), $(".kod-toolbar-path").removeClass("hidden")), currentPathMenu(a)
			}
		},
		currentPathMenu = function(a) {
			var b = a.info,
				c = a.pathReadWrite,
				d = b.pathType,
				e = ".create-link,.create-project,.cute,.remove,.rname,.zip,.unzip-this,.unzip-folder,.newfile,.newfolder,.new-file-other,.app-create,.app-install,.past,.upload,.clone",
				f = "disable",
				g = $(".kod-toolbar-path .btn").not(".toolbar-path-more"),
				h = $("ul.menu-folder,ul.menu-more,ul.menu-file,ul.file-continerMenu"),
				i = $(".select-button-show");
			b.canUpload ? (h.find(e).removeClass(f), $(".path-tips").hide(), g.removeClass("disabled"), i.removeClass("hide")) : (g.addClass("disabled"), h.find(e).addClass(f), $(".path-tips span").html(LNG.only_read), d == G.KOD_USER_RECYCLE || d == G.KOD_USER_SHARE ? ($(".path-tips").hide(), g.removeClass("disabled"), d == G.KOD_USER_SHARE && G.userID != b.id && g.addClass("disabled")) : $(".path-tips").show(), i.addClass("hide"));
			var j = $(".group-space-use");
			if ((d == G.KOD_GROUP_PATH || d == G.KOD_GROUP_SHARE) && G.isRoot || d == G.KOD_GROUP_PATH && "owner" == b.role) {
				var k = a.groupSpaceUse;
				if (k) {
					var l = core.userSpaceHtml(k.sizeUse + "/" + k.sizeMax);
					j.removeClass("hidden").html(l)
				} else j.addClass("hidden")
			} else j.addClass("hidden");
			if (a.userSpace) {
				var k = a.userSpace,
					l = core.userSpaceHtml(k.sizeUse + "/" + k.sizeMax);
				$(".user-space-info").html(l)
			}
			if ("notExists" == c && ($(".path-tips span").html(LNG.not_exists), $(".path-tips").show()), $(".role-label-box").html(""), d == G.KOD_GROUP_SHARE) {
				var m = "<span class='label label-grey-light' title-timeout='0' title='" + LNG.group_guest_desc + "'>" + LNG.group_guest + "<span>";
				$(".role-label-box").html(m), G.isRoot && $(".role-label-box").html("")
			} else if (d == G.KOD_GROUP_PATH && b.groupRole) {
				var m = "<span class='label label-" + b.groupRole.style + "' title-timeout='0' title='" + LNG.group_role_lebel_desc + "'>" + b.groupRole.name + "<span>";
				$(".role-label-box").html(m)
			}(d == G.KOD_GROUP_ROOT_ALL || d == G.KOD_GROUP_ROOT_SELF || d == G.KOD_USER_FAV || d == G.KOD_GROUP_SHARE) && $(".path-tips").hide(), 1 == G.isRoot && b.adminRealPath ? $(".admin-real-path").removeClass("hidden") : $(".admin-real-path").addClass("hidden")
		};
	return {
		f5: f5,
		f5Callback: f5Callback,
		pathTypeChange: pathTypeChange,
		pathChildrenTree: pathChildrenTree,
		pathChildrenSplit: pathChildrenSplit,
		init: function() {
			$(window).bind("resize", function() {
				resetTotalHeight(), core.isApp("desktop") ? ui.resetDesktopIcon() : ui.headerAddress.resetWidth()
			}), bindScrollLoadMore()
		}
	}
});;
define("app/path/tpl/file/list.html", [], "{{if itemPermission=G.isRoot?\"\":LNG.permission+' : '+list.mode+'&#10;'}}{{/if}} \n\n{{if list.menuType}}\n	{{if itemClassName = ' '+list.menuType + ' systemBox ' }}{{/if}}\n{{else}}\n	{{if type=='icon-folder' || type=='split-folder' || type=='list-folder' }}\n		{{if itemClassName = ' folder-box menu-folder '}}{{/if}}\n	{{else}}\n		{{if itemClassName = ' file-box menu-file '}}{{/if}}\n	{{/if}}\n{{/if}}\n{{if !list.sid && typeof(list.isReadable)!=\"undefined\"}}\n	{{if itemClassName += !list.isWriteable?' file-not-writeable ':''}}{{/if}}\n	{{if itemClassName += !list.isReadable?' file-not-readable ':''}}{{/if}}\n{{/if}}\n{{if typeof(list.exists)=='number' && list.exists==0}}\n	{{if itemClassName += ' file-not-exists '}}{{/if}} \n{{/if}}\n\n<!-- 图标模式文件夹 -->\n{{if type=='icon-folder'}}\n<div data-path=\"{{list.path |kod.window.pathHashEncode}}\"\nclass='file {{itemClassName}}'\ntitle='{{LNG.name}}:{{list.name}}&#10;{{itemPermission}}{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"0\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='ico' filetype='folder'>\n		{{fileIconMake('folder','icon',list)}}\n	</div>\n	{{if list.metaInfo}}\n		<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n	{{/if}}\n	<div class='filename'>\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">{{list.name}}</span>\n	</div>\n</div>\n\n<!-- 列表模式文件夹 -->\n{{else if type=='list-folder'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file {{if index%2==0}}file2{{/if}} {{itemClassName}}'\ntitle='{{LNG.name}} : {{list.name}}&#10;{{itemPermission}}{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"0\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<span class=\"children-more\">\n			{{if list.isParent&&list.isReadable}}<i class=\"font-icon children-more-cert\"></i>{{/if}}\n		</span>\n		<div class='ico' filetype='folder'>\n			{{fileIconMake('folder','list',list)}}\n		</div>\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">{{list.name}}</span>\n	</div>\n	<div class='filetype'>{{LNG.folder}}</div>\n	<div class='filesize'></div>\n	<div class='filetime'>{{list.mtime || \"\"}}</div>\n	<div style='clear:both'></div>\n</div>\n{{if list.isParent&&list.isReadable}}\n<div data-path-children='{{list.path |kod.window.pathHashEncode}}' class=\"children-list hidden\"></div>\n{{/if}}\n\n<!-- 分栏模式文件夹 -->\n{{else if type=='split-folder'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file file2 {{itemClassName}}'\ntitle='{{LNG.name}}:{{list.name}}&#10;{{itemPermission}}{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"0\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<div class='ico' filetype='folder'>\n			{{fileIconMake('folder','split',list)}}\n		</div>\n		<span class='title'>{{list.name}}</span>\n		<span class=\"children-open\">\n			{{if list.isReadable && typeof(list.menuType)==\"undefined\"}}\n				<i class=\"font-icon children-more-cert\"></i>\n			{{/if}}\n		</span>\n	</div>\n</div>\n\n<!-- 图标模式文件  draggable=\"true\"  ondragstart=\"return false;\"-->\n{{else if type=='icon-file'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file {{itemClassName}}'\n{{if list.ext=='oexe'}}data-app='{{kod.window.base64Encode(kod.window.jsonEncode(list))}}'{{/if}}\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.size}}:{{list.size |pathTools.fileSize}}&#10;{{itemPermission}}{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"{{list.size}}\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	{{fileIconMake('file','icon',list)}}\n	{{if list.metaInfo}}\n		<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n	{{/if}}\n	<div class='filename'>\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">\n			{{if list.ext=='oexe'}}{{list.name.replace('.oexe','')}}{{else}}{{list.name}}{{/if}}\n		</span>\n	</div>\n</div>\n\n<!-- 列表模式文件 -->\n{{else if type=='list-file'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file {{if index%2==0}}file2{{/if}} {{itemClassName}}'\n{{if list.ext=='oexe'}} data-app='{{kod.window.base64Encode(kod.window.jsonEncode(list))}}'{{/if}}\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.size}}:{{list.size |pathTools.fileSize}}&#10;{{itemPermission}}{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"{{list.size}}\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		<span class=\"children-more\"></span>\n		{{fileIconMake('file','list',list)}}\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<span class='title db-click-rename' title=\"{{LNG.double_click_rename}}\">\n			{{if list.ext=='oexe'}}{{list.name.replace('.oexe','')}}{{else}}{{list.name}}{{/if}}\n		</span>\n	</div>\n	<div class='filetype'>{{list.ext |kod.window.htmlEncode}} {{LNG.file}}</div>\n	<div class='filesize'>{{list.size |pathTools.fileSize}}</div>\n	<div class='filetime'>{{list.mtime || \"\"}}</div>\n	<div style='clear:both'></div>\n</div>\n\n<!-- 分栏模式文件 -->\n{{else if type=='split-file'}}\n<div data-path='{{list.path |kod.window.pathHashEncode}}'\nclass='file file2 {{itemClassName}}'\n{{if list.ext=='oexe'}} data-app='{{kod.window.base64Encode(kod.window.jsonEncode(list))}}'{{/if}}\ntitle='{{LNG.name}}:{{list.name}}&#10;{{LNG.size}}:{{list.size |pathTools.fileSize}}&#10;{{itemPermission}}{{LNG.modify_time}} : {{list.mtime}}'\ndata-size=\"{{list.size}}\">\n	{{if !list.menuType}}<div class=\"item-select\"><div class=\"item-check\"></div></div>{{/if}}\n	<div class=\"item-menu\"><div class=\"cert\"></div></div>\n	<div class='filename'>\n		{{fileIconMake('file','split',list)}}\n		{{if list.metaInfo}}\n			<div class='meta-info {{list.metaInfo}}'>{{list.metaInfo |kod.core.icon}}</div>\n		{{/if}}\n		<span class='title'>\n			{{if list.ext=='oexe'}}{{list.name.replace('.oexe','')}}{{else}}{{list.name}}{{/if}}\n		</span>\n	</div>\n</div>\n{{/if}}\n\n");;
define("app/common/tree", ["../path/pathOperate", "../path/tpl/fileinfo/fileInfo.html", "../path/tpl/fileinfo/pathInfo.html", "../path/tpl/share.html", "../path/tpl/fileinfo/pathInfoMore.html", "../path/tpl/appEdit.html", "../path/clipboard", "../path/search", "../path/tpl/search.html", "../path/tpl/searchList.html"], function(a, b) {
	var c, d, e = a("../path/pathOperate"),
		f = a("../path/clipboard"),
		g = a("../path/search"),
		h = !1;
	ui.pathOperate = e;
	var i = function(a, b) {
			var c = ["menu-tree-group", "menu-tree-fav", "menu-tree-folder-fav"];
			if (a && a[0] && -1 !== $.inArray(a[0].menuType, c)) return a;
			for (var d = [], e = [], f = 0; f < a.length; f++) a[f].drop = !1, a[f].drag = !1, a[f].name = a[f].name, a[f].isParent && a[f].children && (a[f].children = i(a[f].children)), a[f].isWriteable, "folder" == a[f].type ? e.push(a[f]) : d.push(a[f]);
			return b ? a : (e = e.sort(function(a, b) {
				var a = a.name,
					b = b.name;
				return pathTools.strSort(a, b)
			}), d = d.sort(function(a, b) {
				var a = a.name,
					b = b.name;
				return pathTools.strSort(a, b)
			}), e.concat(d))
		},
		j = function() {
			var a = {},
				b = "tree_open_" + md5(Config.pageApp),
				c = function(a) {
					if (!LocalData.support()) return {};
					if (void 0 == a) {
						var c = LocalData.getConfig(b);
						return 0 == c ? {} : c
					}
					LocalData.setConfig(b, a)
				},
				e = function(b) {
					for (var c = 0; c < b.length; c++) {
						var d = b[c].path;
						void 0 !== a[d] && (b[c].open = a[d])
					}
					return b
				},
				f = function() {
					for (var b = d.getNodesByFilter(function(a) {
						return 0 == a.level ? !0 : !1
					}), e = {}, f = 0; f < b.length; f++) e[b[f].path] = b[f].open;
					return a = e, c(a), a
				};
			return a = c(), {
				list: function() {
					return a
				},
				reset: e,
				save: function() {
					setTimeout(f, 50)
				}
			}
		}(),
		k = function() {
			$.ajax({
				url: G.appHost + Config.treeAjaxURL + "&type=init",
				dataType: "json",
				error: function() {
					$("#folder-list-tree").html('<div style="text-align:center;">' + LNG.system_error + "</div>")
				},
				success: function(a) {
					if (!a.code) return void $("#folder-list-tree").html('<div style="text-align:center;">' + LNG.system_error + "</div>");
					var b = i(a.data, !0);
					b = j.reset(b), $.fn.zTree.init($("#folder-list-tree"), n, b), d = $.fn.zTree.getZTreeObj("folder-list-tree")
				}
			}), $(".ztree .switch").die("mouseenter").live("mouseenter", function() {
				$(this).addClass("switch_hover")
			}).die("mouseleave").live("mouseleave", function() {
				$(this).removeClass("switch_hover")
			}), core.isApp("editor") && (Mousetrap.bind("up", function(a) {
				l(a, "up")
			}).bind("down", function(a) {
				l(a, "down")
			}).bind("left", function(a) {
				l(a, "left")
			}).bind("right", function(a) {
				l(a, "right")
			}), Mousetrap.bind("enter", function(a) {
				tree.open()
			}).bind(["del", "command+backspace"], function(a) {
				tree.remove()
			}).bind("f2", function(a) {
				stopPP(a), tree.rname()
			}).bind(["ctrl+f", "command+f"], function(a) {
				stopPP(a), tree.search()
			}).bind(["ctrl+c", "command+c"], function(a) {
				tree.copy()
			}).bind(["ctrl+x", "command+x"], function(a) {
				tree.cute()
			}).bind(["ctrl+v", "command+v"], function(a) {
				tree.past()
			}).bind("alt+m", function(a) {
				tree.create("folder")
			}).bind("alt+n", function(a) {
				tree.create("file")
			}))
		},
		l = function(a, b) {
			stopPP(a);
			var c = d.getSelectedNodes()[0];
			if (c) switch (b) {
			case "up":
				var e = c.getPreNode();
				if (e) {
					if (e.open && e.children.length > 0) for (; e.open && e.children && e.children.length >= 1;) e = e.children[e.children.length - 1]
				} else e = c.getParentNode();
				d.selectNode(e);
				break;
			case "down":
				if (c.open && c.children.length >= 1) e = c.children[0];
				else {
					var f = c,
						e = f.getNextNode() || f.getParentNode().getNextNode();
					try {
						for (; !e;) f = f.getParentNode(), e = f.getNextNode() || f.getParentNode().getNextNode()
					} catch (a) {}
				}
				d.selectNode(e);
				break;
			case "left":
				c.isParent && c.open ? d.expandNode(c, !1) : d.selectNode(c.getParentNode());
				break;
			case "right":
				c.open ? d.selectNode(c.children[0]) : d.expandNode(c, !0)
			}
		},
		m = function() {
			return core.isApp("editor") ? !1 : !0
		},
		n = {
			async: {
				enable: !0,
				dataType: "json",
				url: function() {
					return G.appHost + Config.treeAjaxURL
				},
				autoParam: ["ajax_path=path", "tree_icon=tree_icon"],
				dataFilter: function(a, b, c) {
					return c.code ? i(c.data) : null
				}
			},
			edit: {
				enable: !0,
				showRemoveBtn: !1,
				showRenameBtn: !1,
				drag: {
					isCopy: !1,
					isMove: !1
				}
			},
			view: {
				showLine: !1,
				selectedMulti: !1,
				expandSpeed: "fast",
				dblClickExpand: !1,
				addDiyDom: function(a, b) {
					var c = 15,
						d = $("#" + b.tId + "_switch"),
						e = $("#" + b.tId + "_ico");
					d.remove(), b.iconSkin = b.tree_icon;
					var f = b.tree_icon;
					if (b.ext ? f = b.ext : b.tree_icon || (f = b.type), e.before(d).before('<span id="' + b.tId + '_my_ico"  class="tree_icon button">' + core.iconSmall(f) + "</span>").remove(), void 0 != b.ext && e.attr("class", "").addClass("file " + b.ext).removeAttr("style"), b.level >= 1) {
						var g = "<span class='space' style='display: inline-block;width:" + c * b.level + "px'></span>";
						d.before(g)
					}
					d.before("<div class='menu-item'><div class='cert'></div></div>");
					var h = "";
					void 0 != b.menuType ? h = b.menuType : (("file" == b.type || "oexe" == b.ext) && (h = "menu-tree-file"), "folder" == b.type && (h = "menu-tree-folder"));
					var i = LNG.name + ":" + b.name + "\n" + LNG.size + ":" + pathTools.fileSize(b.size) + "\n" + LNG.modify_time + ":" + b.mtime;
					"file" != b.type && (i = b.name), d.parent().addClass(h).attr("title", i), 0 == b.isWriteable && d.parent().addClass("file-not-writeable"), 0 == b.isReadable && d.parent().addClass("file-not-readable"), 0 === b.exists && d.parent().addClass("file-not-readable")
				}
			},
			callback: {
				onClick: function(a, b, c) {
					if (0 == c.level && j.save(), $(a.target).hasClass("menu-item") || $(a.target).parent().hasClass("menu-item")) {
						var e = $("#" + c.tId + "_a"),
							f = e.find(".menu-item");
						return e.contextMenu({
							x: f.offset().left + f.width(),
							y: f.offset().top
						}), stopPP(a)
					}
					return d.selectNode(c), core.isApp("editor") && "folder" == c.type ? void d.expandNode(c) : void(core.isApp("editor") || "folder" != c.type ? (kodApp.setLastOpenTarget($("#" + c.tId)), kodApp.open(o().path)) : ui.path.list(c.path))
				},
				beforeDblClick: function() {
					return !0
				},
				onCollapse: function(a, b, c) {
					0 == c.level && j.save()
				},
				onExpand: function(a, b, c) {
					0 == c.level && j.save()
				},
				onDblClick: function(a, b, c) {
					return $(a.target).hasClass("switch") || !m() ? !1 : void d.expandNode(c)
				},
				beforeRightClick: function(a, b) {
					d.selectNode(b)
				},
				beforeAsync: function(a, b) {
					b.ajax_name = b.name, b.ajax_path = b.path, $("#" + b.tId + "_my_ico").addClass("ico_loading")
				},
				onAsyncSuccess: function(a, b, e, f) {
					return $("#" + e.tId + "_my_ico").removeClass("ico_loading"), 0 == f.data.length ? void d.removeChildNodes(e) : void("function" == typeof c && (c(), c = void 0))
				},
				onRename: function(a, b, f, g) {
					var h = f.getParentNode();
					if (d.getNodesByParam("name", f.name, h).length > 1) return Tips.tips(LNG.name_isexists, !1), void d.removeNode(f);
					if (f.create) {
						var i = f.path + "/" + f.name;
						"folder" == f.type ? e.newFolder(i, function(a) {
							c = function() {
								var a = d.getNodesByParam("name", f.name, h)[0];
								d.selectNode(a), t()
							}, p(h)
						}) : e.newFile(i, function(a) {
							c = function() {
								var a = d.getNodesByParam("name", f.name, h)[0];
								d.selectNode(a), t()
							}, p(h)
						})
					} else {
						var j = rtrim(f.path, "/"),
							k = core.pathFather(f.path) + f.name;
						e.rname(j, k, function(a) {
							f.path = a, c = function() {
								var a = d.getNodesByParam("name", f.name, h)[0];
								d.selectNode(a), t(), "folder" == f.type && ui.path.list(f.path)
							}, p(h)
						})
					}
				},
				beforeDrag: function(a, b) {
					for (var c = 0, d = b.length; d > c; c++) if (b[c].drag === !1) return !1;
					return !0
				},
				beforeDrop: function(a, b, c, d) {
					return c ? c.drop !== !1 : !0
				},
				onDrop: function(a, b, c, d, e) {
					var g = "",
						h = "",
						i = c[0];
					(i.father || i.thisPath) && (g = i.father + urlEncode(i.name), h = d.father + urlEncode(d.name), f.cuteDrag([{
						path: g,
						type: i.type
					}], h, function() {
						p(i)
					}))
				}
			}
		},
		o = function(a) {
			if (d) {
				var b = d.getSelectedNodes()[0],
					c = "";
				return b ? (c = b.type, ("_null_" == c || void 0 == c) && (c = "folder"), "file" == c && (c = b.ext), a ? [{
					path: b.path,
					type: c,
					node: b
				}] : {
					path: b.path,
					type: c,
					node: b
				}) : {
					path: "",
					type: ""
				}
			}
		},
		p = function(a) {
			return a || (a = d.getSelectedNodes()[0]), a.isParent || (a = a.getParentNode()) ? void d.reAsyncChildNodes(a, "refresh") : void ui.tree.init()
		},
		q = function() {
			s(G.KOD_USER_FAV), t()
		},
		r = function() {
			q(), s(G.KOD_GROUP_ROOT_SELF), s(G.KOD_GROUP_ROOT_ALL)
		},
		s = function(a) {
			var b = d.getNodesByParam("path", a, null);
			p(b[0])
		},
		t = function() {
			core.isApp("explorer") && ui.f5()
		};
	return {
		makeParam: o,
		treeOpenHistory: j,
		treeDataSort: i,
		init: k,
		refresh: p,
		refreshPath: s,
		refreshFav: q,
		refreshGroup: r,
		zTree: function() {
			return d
		},
		openEditor: function() {
			kodApp.open(o().path)
		},
		openWindow: function() {
			kodApp.openWindow(o().path)
		},
		share: function() {
			e.share(o())
		},
		download: function() {
			"folder" == o().type ? e.zipDownload(o(!0)) : kodApp.download(o().path)
		},
		setSelect: function(a) {
			return
		},
		open: function() {
			if (!($(".dialog-path-remove").length >= 1)) {
				var a = o();
				"oexe" == a.type && (a.path = a.node), kodApp.setLastOpenTarget($(".curSelectedNode").parent()), kodApp.open(a.path, a.type)
			}
		},
		fav: function() {
			var a = o();
			a.name = a.node.name, a.node = "null", e.fav(a)
		},
		createLink: function(a) {
			var b = o();
			e.createLink(b.path, b.node.name, b.type, a, t)
		},
		search: function() {
			g("", o().path)
		},
		appEdit: function() {
			var a = o(),
				b = a.node;
			b.path = a.path, e.appEdit(b, function() {
				p(a.node.getParentNode())
			})
		},
		info: function() {
			e.info(o(!0))
		},
		copy: function() {
			f.copy(o(!0))
		},
		cute: function() {
			f.cute(o(!0))
		},
		copyTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.copy_to
			}, function(a) {
				f.copyDrag(o(!0), a, "", !1)
			})
		},
		cuteTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.cute_to
			}, function(a) {
				f.cuteDrag(o(!0), a, function() {
					s()
				})
			})
		},
		past: function() {
			var a = o();
			a.node.isParent || (a.node = a.node.getParentNode()), f.past(a.path, function() {
				t(), p(a.node)
			})
		},
		clone: function() {
			var a = o();
			a.node.isParent || (a.node = a.node.getParentNode()), f.copyDrag(o(!0), core.pathFather(a.path), function() {
				t(), p("folder" == a.type ? a.node.getParentNode() : a.node)
			}, !0)
		},
		favRemove: function(a) {
			e.favRemove(o().node.name, function(a) {
				Tips.tips(a), q()
			})
		},
		remove: function() {
			var a = o(!0),
				b = a[0].node.getParentNode();
			a[0].type = a[0].node.type, a[0].type = "folder" == a[0].type ? "folder" : "file", e.remove(a, function() {
				t(), p(b)
			})
		},
		checkIfChange: function(a) {
			h || (h = !0, d && (d.getNodesByFilter(function(b) {
				var c = b.path;
				return "folder" == b.type && core.pathClear(c) == core.pathClear(a) && p(b), !1
			}, !0), setTimeout(function() {
				h = !1
			}, 500)))
		},
		explorer: function() {
			var a = d.getSelectedNodes();
			if (a.length <= 0) {
				var b = d.getNodes();
				d.selectNode(b[0])
			}
			var c = o().path;
			"folder" != o().type && (c = core.pathFather(c)), core.explorer(c)
		},
		openProject: function() {
			core.explorerCode(o().path)
		},
		create: function(a) {
			var b = d.getSelectedNodes();
			if (b.length <= 0) {
				var e = d.getNodes();
				d.selectNode(e[0])
			} else "file" == b[0].type && d.selectNode(b[0].getParentNode());
			var f = o(),
				g = f.node,
				h = g.getParentNode(),
				i = 0,
				j = "folder" == a ? "" : "." + a,
				k = "folder" == a ? LNG.newfolder : LNG.newfile;
			if (0 == d.getNodesByParam("name", k + j, h).length) k += j;
			else {
				for (; d.getNodesByParam("name", k + "(" + i + ")" + j, h).length > 0;) i++;
				k = k + "(" + i + ")" + j
			}
			var l = {
				name: k,
				ext: j,
				type: a,
				create: !0,
				path: f.path
			};
			if (void 0 != g.children) {
				var m = d.addNodes(g, l)[0];
				d.editName(m)
			} else "folder" != g.type && (g = g.getParentNode()), c = function() {
				var a = d.addNodes(g, l)[0];
				d.editName(a)
			}, g.isParent ? d.expandNode(g) : c()
		},
		showFile: function() {
			var a = G.appHost + "share/file&sid=" + G.sid + "&user=" + G.user + "&path=" + o().path;
			window.open(a)
		},
		rname: function() {
			var a = d.getSelectedNodes()[0];
			d.editName(a), a.beforeName = a.name
		}
	}
});;
define("app/path/pathOperate", ["./tpl/fileinfo/fileInfo.html", "./tpl/fileinfo/pathInfo.html", "./tpl/share.html", "./tpl/fileinfo/fileInfo.html", "./tpl/fileinfo/pathInfo.html", "./tpl/fileinfo/pathInfoMore.html", "./tpl/appEdit.html"], function(a, b) {
	tplFileInfo = a("./tpl/fileinfo/fileInfo.html"), tplPathInfo = a("./tpl/fileinfo/pathInfo.html");
	var c = ["/", "\\", ":", "*", "?", '"', "<", ">", "|"],
		d = ["/", "\\"],
		e = function(a) {
			var b = function(a, b) {
					for (var c = b.length, d = 0; c > d; d++) if (a.indexOf(b[d]) > 0) return !0;
					return !1
				},
				e = d;
			return G.systemOS && "windows" == G.systemOS && (e = c), b(a, e) ? (Tips.tips(LNG.path_not_allow + ":    " + e.join(", "), !1), !1) : !0
		},
		f = function(a) {
			for (var b = [], c = function(a) {
					return a ? a.replace(/"/g, '\\\\"') : a
				}, d = 0; d < a.length; d++) b.push({
				type: c(a[d].type),
				path: urlEncode(c(a[d].path))
			});
			return "dataArr=" + jsonEncode(b)
		},
		g = function(a, b) {
			if (a) {
				var c = core.pathThis(a);
				return e(c) ? void $.ajax({
					dataType: "json",
					url: G.appHost + "explorer/mkfile&path=" + urlEncode(a),
					beforeSend: function() {
						"function" == typeof b && Tips.loading()
					},
					error: core.ajaxError,
					success: function(a) {
						"function" == typeof b && (Tips.close(a), b(a && a.info ? a.info : !1))
					}
				}) : void("function" == typeof b && b())
			}
		},
		h = function(a, b) {
			if (a) {
				var c = core.pathThis(a);
				return e(c) ? void $.ajax({
					dataType: "json",
					url: G.appHost + "explorer/mkdir&path=" + urlEncode(a),
					beforeSend: function() {
						"function" == typeof b && Tips.loading()
					},
					error: core.ajaxError,
					success: function(a) {
						"function" == typeof b && (Tips.close(a), b(a && a.info ? a.info : !1))
					}
				}) : void("function" == typeof b && b())
			}
		},
		i = function(a, b, c) {
			return a && b && a != b ? e(core.pathThis(b)) ? void $.ajax({
				type: "POST",
				dataType: "json",
				url: G.appHost + "explorer/pathRname",
				data: "path=" + urlEncode(a) + "&rnameTo=" + urlEncode(b),
				beforeSend: function() {
					Tips.loading()
				},
				error: core.ajaxError,
				success: function(a) {
					Tips.close(a), "function" == typeof c && c(a && a.info ? a.info : !1)
				}
			}) : void("function" == typeof c && c()) : void 0
		},
		j = function(a, b, c, d) {
			if (c = void 0 == c ? !1 : c, d = void 0 == d ? !1 : d, window.event && window.event.shiftKey && (d = !0), !(a.length < 1)) {
				var e = LNG.remove_title,
					g = LNG.remove_info,
					h = G.appHost + "explorer/pathDelete",
					i = f(a);
				if ("share" == a[0].type && (e = LNG.share_remove, g = LNG.share_remove_tips, h = G.appHost + "userShare/del"), d && (g = LNG.remove_info_force, e = LNG.remove_title_force, h += "&shiftDelete=1"), ("recycle-clear" == a[0].type || G.USER_RECYCLE && G.thisPath == G.USER_RECYCLE || G.thisPath == core.pathFather(G.myhome) + "recycle_kod/") && (g = LNG.recycle_clear_info, h = G.appHost + "explorer/pathDeleteRecycle", e = LNG.recycle_clear, "recycle-clear" == a[0].type && (i = "postEmpty=1")), a[0] && a[0].path) {
					var j = "<b>" + htmlEncode(core.pathThis(a[0].path)) + "</b>";
					"share" == a[0].type && G.selfShare[a[0].path] && (j = "<b>" + htmlEncode(G.selfShare[a[0].path].name) + "</b>"), g = a.length > 1 ? j + ' ... <span class="label label-warning">' + a.length + LNG.remove_item + "</span><br/>" + g : j + "<br/>" + g
				}
				var k = function() {
						$.ajax({
							url: h,
							type: "POST",
							dataType: "json",
							data: i,
							beforeSend: function() {
								Tips.loading()
							},
							error: core.ajaxError,
							success: function(c) {
								if (Tips.close(c), ShareData.frameTop("", function(a) {
									a.ui.f5()
								}), "share" == a[0].type) {
									G.selfShare = c.info;
									var d = $.dialog.list["share-dialog"];
									d && d.close()
								}
								e == LNG.recycle_clear ? core.playSound("recycle_clear") : core.playSound("file_remove"), "function" == typeof b && b(c)
							}
						})
					};
				c ? k() : $.dialog({
					id: "dialog-path-remove",
					fixed: !0,
					icon: "question",
					title: e,
					padding: "40px 40px",
					lock: !0,
					background: "#000",
					opacity: .1,
					content: "<div style='width:200px'>" + g + "</div>",
					ok: k,
					cancel: !0
				})
			}
		},
		k = function(a) {
			if (core.authCheck("explorer.fileDownload", !0) && !(a.length < 1)) {
				var b = G.appHost + "explorer/zipDownload";
				"undefined" != typeof G.sharePage && (b = G.appHost + "share/zipDownload&user=" + G.user + "&sid=" + G.sid), $.ajax({
					url: b,
					type: "POST",
					dataType: "json",
					data: f(a),
					beforeSend: function() {
						Tips.loading(LNG.zip_download_ready)
					},
					error: core.ajaxError,
					success: function(a) {
						Tips.close(a), Tips.tips(a);
						var b = G.appHost + "explorer/fileDownloadRemove&path=" + urlEncode(a.info);
						b += "&accessToken=" + G.accessToken, "undefined" != typeof G.sharePage && (b = G.appHost + "share/fileDownloadRemove&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(a.info)), $.dialog({
							icon: "succeed",
							title: !1,
							time: 2,
							content: LNG.download_ready + "..."
						}), $('<iframe src="' + b + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
					}
				})
			}
		},
		l = function(a, b, c) {
			a.length < 1 || (c || (c = "zip"), $.ajax({
				url: G.appHost + "explorer/zip&fileType=" + c,
				type: "POST",
				dataType: "json",
				data: f(a),
				beforeSend: function() {
					Tips.loading(LNG.ziping)
				},
				error: core.ajaxError,
				success: function(a) {
					Tips.close(a), a.code && core.playSound("drag_drop"), "function" == typeof b && b(a.info)
				}
			}))
		},
		m = function(a, b, c) {
			if (a) {
				var d = function(a) {
						$.ajax({
							url: a,
							beforeSend: function() {
								Tips.loading(LNG.unziping)
							},
							error: core.ajaxError,
							success: function(a) {
								Tips.close(a), "function" == typeof b && b(a)
							}
						})
					},
					e = G.appHost + "explorer/unzip&path=" + urlEncode(a);
				"toThis" == c && (e += "&toThis=1"), "toFolder" == c ? core.api.pathSelect({
					type: "folder",
					title: LNG.unzip_to
				}, function(a) {
					e += "&pathTo=" + a, d(e)
				}) : d(e)
			}
		},
		n = function(a) {
			var b = a.path,
				c = core.pathPre(b);
			if (c == G.KOD_GROUP_PATH || c == G.KOD_GROUP_SHARE || c == G.KOD_USER_SHARE) return void Tips.tips(LNG.path_can_not_share, "warning");
			var d = "folder" == a.type ? "folder" : "file";
			b.length < 1 || core.authCheck("userShare.set", !0) && $.ajax({
				url: G.appHost + "userShare/checkByPath&path=" + urlEncode(b),
				dataType: "json",
				error: core.ajaxError,
				success: function(a) {
					if (a.code) o(a.data);
					else {
						G.selfShare = a.info;
						var c = {
							path: b,
							type: d,
							name: core.pathThis(b)
						};
						p(c, function(a) {
							a.code ? (G.selfShare = a.info, ui.f5(), o(a.data)) : (Tips.tips(a), o(void 0, function() {
								$(".content-info input[name=type]").val(d), $(".content-info input[name=path]").val(b), $(".content-info input[name=name]").val(core.pathThis(b) + "(1)"), "file" == d && ($(".label-code-read").addClass("hidden"), $(".label-can-upload").addClass("hidden"))
							}))
						})
					}
				}
			})
		},
		o = function(b, c) {
			0 != $(".share-dialog").length && $(".share-dialog").shake(3, 30, 100), a.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"], function() {
				q(b), void 0 != c && c()
			})
		},
		p = function(a, b) {
			$.ajax({
				url: G.appHost + "userShare/set",
				data: a,
				type: "POST",
				dataType: "json",
				beforeSend: function(a) {
					$(".share-create-button").addClass("disabled")
				},
				error: function() {
					Tips.tips(LNG.error, !1)
				},
				success: function(a) {
					$(".share-create-button").removeClass("disabled"), void 0 != b && b(a)
				}
			})
		},
		q = function(b) {
			var c = a("./tpl/share.html"),
				d = template.compile(c),
				e = d({
					LNG: LNG
				});
			$.dialog({
				id: "share-dialog",
				simple: !0,
				resize: !1,
				width: "425px",
				title: LNG.share,
				padding: "0",
				fixed: !0,
				content: e
			});
			var f = "zh-CN" == G.lang ? "ch" : "en";
			$("#share-time").datetimepicker({
				format: "Y/m/d",
				formatDate: "Y/m/d",
				timepicker: !1,
				lang: f
			}), $("#share-time").unbind("blur").bind("blur", function(a) {
				stopPP(a)
			});
			var g = function(a) {
					if ($(".share-setting-more").addClass("hidden"), void 0 == a) $(".share-has-url").addClass("hidden"), $(".share-action .share-remove-button").addClass("hidden"), $(".content-info input[name=sid]").val(""), $(".content-info input[name=type]").val(""), $(".content-info input[name=name]").val(""), $(".content-info input[name=showName]").val(""), $(".content-info input[name=path]").val(""), $(".content-info input[name=timeTo]").val(""), $(".content-info input[name=sharePassword]").val(""), $(".share-view-info").addClass("hidden");
					else {
						a.options && (a.codeRead = a.options.codeRead, a.canUpload = a.options.canUpload, a.notDownload = a.options.notDownload), "undefined" == typeof a.canUpload && (a.canUpload = ""), b = a, a.showName || (a.showName = a.name), $(".content-info input[name=sid]").val(a.sid), $(".content-info input[name=type]").val(a.type), $(".content-info input[name=name]").val(a.name), $(".content-info input[name=showName]").val(a.showName), $(".content-info input[name=path]").val(a.path), $(".content-info input[name=timeTo]").val(a.timeTo), $(".content-info input[name=sharePassword]").val(a.sharePassword), $(".share-view-info").removeClass("hidden"), "undefined" == typeof a.numDownload && (a.numDownload = 0), "undefined" == typeof a.numView && (a.numView = 0);
						var c = LNG.share_view_num + a.numView + "  " + LNG.share_download_num + a.numDownload;
						$(".share-view-info").html(c), "1" == a.codeRead ? $(".content-info input[name=codeRead]").attr("checked", "checked") : $(".content-info input[name=codeRead]").removeAttr("checked"), "1" == a.notDownload ? $(".content-info input[name=notDownload]").attr("checked", "checked") : $(".content-info input[name=notDownload]").removeAttr("checked"), "1" == a.canUpload ? $(".content-info input[name=canUpload]").attr("checked", "checked") : $(".content-info input[name=canUpload]").removeAttr("checked"), $(".share-has-url").removeClass("hidden"), "file" == a.type ? ($(".label-code-read").addClass("hidden"), $(".label-can-upload").addClass("hidden")) : ($(".label-code-read").removeClass("hidden"), $(".label-can-upload").removeClass("hidden"));
						var d = a.type;
						"folder" == a.type && (d = 1 == a.codeRead ? "codeRead" : "folder");
						var e = G.appHost + "share/" + d + "&user=" + G.userID + "&sid=" + a.sid;
						$(".content-info .share-url").val(e), (a.timeTo || a.canUpload || a.codeRead || a.notDownload) && $(".share-setting-more").removeClass("hidden"), $(".share-remove-button").removeClass("hidden"), $(".share-create-button").text(LNG.share_save), Hook.trigger("explorer.path.share.uiInit")
					}
				},
				h = function() {
					var a = "";
					$(".share-dialog .content-info input[name]").each(function() {
						var b = urlEncode($(this).val());
						"checkbox" == $(this).attr("type") && (b = $(this).attr("checked") ? "1" : ""), a += "&" + $(this).attr("name") + "=" + b
					}), p(a, function(a) {
						a.code ? (Tips.tips(LNG.success, !0), G.selfShare = a.info, ui.f5()) : Tips.tips(a)
					})
				},
				i = function() {
					$(".share-action .share-remove-button").unbind("click").click(function() {
						j([{
							type: "share",
							path: b.sid
						}], function() {
							ui.f5()
						})
					}), $(".content-info .share-more").unbind("click").click(function() {
						$(".share-setting-more").toggleClass("hidden")
					}), $("[name=sharePassword]").unbind("click").click(function() {
						trim($(this).val()) || $(this).val(roundString(5)), $(this).blur().textSelect()
					});
					var a = $(".share-dialog .btn.copy"),
						c = new ClipboardJS(a.get(0), {
							text: function(a) {
								h();
								var b = trim($("[name=sharePassword]").val()),
									c = $(".share-url").val();
								return b.length > 0 && (c = LNG.share_url + ":" + c + "  " + LNG.share_password + ":" + b), c
							}
						});
					c.on("success", function(a) {
						$("input.share-url").textSelect()
					}), $(".share-action .share-create-button").unbind("click").click(function() {
						h();
						var a = $.dialog.list["share-dialog"];
						a && a.close()
					}), $(".content-info .open-window").unbind("click").bind("click", function() {
						h(), window.open($("input.share-url").val())
					}), $(".share-action .share-qrcode-button").unbind("click").bind("click", function() {
						core.qrcode($("input.share-url").val())
					});
					var d = $("input.share-url");
					d.get(0);
					d.unbind("hover click").bind("hover click", function(a) {
						d.textSelect()
					})
				};
			g(b), i()
		},
		r = function(a) {
			$.ajax({
				url: G.appHost + "setting/set&k=wall&v=" + urlEncode(a),
				dataType: "json",
				success: function(a) {
					Tips.tips(a)
				}
			})
		},
		s = function(a, b, c, d, e) {
			if (!(a.length < 1)) {
				var f, g = G.myDesktop;
				d && (g = core.pathFather(a)), f = "folder" == c ? "ui.path.list(hashDecode('" + hashEncode(a) + "'));" : "ui.path.open(hashDecode('" + hashEncode(a) + "'));";
				var h = urlEncode(g + b + ".oexe"),
					i = core.getPathIcon(a);
				"" == i.icon && (i.icon = c), $.ajax({
					url: G.appHost + "explorer/mkfile&path=" + h,
					type: "POST",
					dataType: "json",
					data: {
						content: jsonEncode({
							type: "app_link",
							content: f,
							icon: i.icon
						})
					},
					success: function(a) {
						Tips.tips(a), a.code && (ShareData.frameTop("", function(a) {
							a.ui.f5()
						}), "function" == typeof e && e(a.info))
					}
				})
			}
		},
		t = function(a, b) {
			if (!(a.length < 1)) {
				var c = core.pathThis(a),
					d = core.pathFather(a);
				jsrun = "core.explorerCode('" + urlEncode(a) + "');";
				var e = urlEncode(d + c + "_project.oexe");
				$.ajax({
					url: G.appHost + "explorer/mkfile&path=" + e,
					type: "POST",
					dataType: "json",
					data: 'content={"type":"app_link","content":"' + jsrun + '","icon":"folder.png"}',
					success: function(a) {
						a.code && "function" == typeof b && b(a.info)
					}
				})
			}
		},
		u = function(a, b, c) {
			if (a) {
				var d = G.appHost + "explorer/imageRotate&rotate=" + b + "&path=" + urlEncode(a);
				$.ajax({
					url: d,
					beforeSend: function() {
						Tips.loading(LNG.loading)
					},
					error: core.ajaxError,
					success: function(a) {
						return a ? (Tips.close(a), void(a.code && "function" == typeof c && c(a))) : void Tips.close(LNG.php_env_error_gd, !1)
					}
				})
			}
		},
		v = function(b) {
			var c = {};
			c.fileInfo = a("./tpl/fileinfo/fileInfo.html"), c.pathInfo = a("./tpl/fileinfo/pathInfo.html"), c.pathInfoMore = a("./tpl/fileinfo/pathInfoMore.html"), b.length < 1 && (b = [{
				path: G.thisPath,
				type: "folder"
			}]);
			var d = "info";
			1 == b.length && (d = "file" == b[0].type ? core.pathExt(b[0].path) : "folder"), Tips.loading(LNG.getting), core.fileInfo(f(b), function(a) {
				if (!a.code) return void Tips.close(a);
				Tips.close(LNG.get_success, !0);
				var e = "pathInfoMore",
					f = LNG.info;
				1 == b.length && (e = "folder" == b[0].type ? "pathInfo" : "fileInfo", f = core.pathThis(b[0].path), f.length > 15 && (f = f.substr(0, 15) + "...  " + LNG.info));
				var g = template.compile(c[e]),
					h = UUID();
				a.data.is_root = G.isRoot, a.data.LNG = LNG, a.data.atime = date(LNG.time_type_info, a.data.atime), a.data.ctime = date(LNG.time_type_info, a.data.ctime), a.data.mtime = date(LNG.time_type_info, a.data.mtime), a.data.sizeFriendly = pathTools.fileSize(a.data.size);
				var i = $.dialog({
					id: h,
					padding: 5,
					ico: core.iconSmall(d),
					fixed: !0,
					title: f,
					content: g(a.data),
					ok: !0
				}),
					j = 15 * $(".aui-outer .pathinfo").length;
				i.DOM.wrap.css({
					left: "+=" + j + "px",
					top: "+=" + j + "px"
				}), w(h, b)
			})
		},
		w = function(a, b) {
			var c = $("." + a);
			c.find(".open-window").bind("click", function() {
				window.open(c.find("input.download-url").val())
			}), c.find(".qrcode").unbind("click").bind("click", function() {
				core.qrcode(c.find("input.download-url").val(), c.find(".qrcode").get(0))
			});
			var d = c.find(".file-md5-loading");
			if (1 == d.length) {
				var e = f(b);
				e += "&getMd5=1", core.fileInfo(e, function(a) {
					d.removeClass("file-md5-loading"), a.code ? d.html(a.data.fileMd5) : d.html(LNG.error)
				})
			}
			var g = c.find("input.download-url"),
				h = g.get(0);
			g.unbind("hover click").bind("hover click", function(a) {
				$(this).focus();
				var b = g.val().length;
				if ($.browser.msie) {
					var c = h.createTextRange();
					c.moveEnd("character", -h.value.length), c.moveEnd("character", b), c.moveStart("character", 0), c.select()
				} else h.setSelectionRange(0, b)
			}), c.find(".edit-chmod").click(function() {
				var a = $(this).parent().find("input"),
					c = $(this);
				$.ajax({
					url: G.appHost + "explorer/pathChmod&mod=" + a.val(),
					type: "POST",
					data: f(b),
					beforeSend: function() {
						c.text(LNG.loading)
					},
					error: function(a) {
						c.text(LNG.button_save)
					},
					success: function(a) {
						c.text(a.data).animate({
							opacity: .6
						}, 400, 0).delay(1e3).animate({
							opacity: 1
						}, 200, 0, function() {
							c.text(LNG.button_save)
						}), a.code && ui.f5()
					}
				})
			})
		},
		x = function(a, b, c) {
			var d = function() {
					$.ajax({
						url: G.appHost + "fav/del&name=" + urlEncode(a),
						dataType: "json",
						async: !1,
						success: function(a) {
							"function" == typeof b && b(a)
						}
					})
				};
			return c ? void d() : void $.dialog({
				id: "dialog-fav-remove",
				fixed: !0,
				icon: "question",
				title: LNG.fav_remove,
				width: 200,
				padding: "40px 20px",
				content: LNG.fav_remove + "?",
				ok: d,
				cancel: !0
			})
		},
		y = function(a) {
			if (a) {
				if (-1 == trim(core.pathClear(a.path), "/").indexOf("/")) {
					var b = core.getPathIcon(a.path, a.name);
					"" != b.icon && (a.ext = b.icon, a.name = b.name)
				}
				"/" == a.path && (a.name = "Home"), $.ajax({
					url: G.appHost + "fav/add",
					dataType: "json",
					data: a,
					success: function(a) {
						Tips.tips(a), a.code && !core.isApp("desktop") && ui.tree.refreshFav()
					}
				})
			}
		},
		z = function(a) {
			var b = {};
			return b.type = a.find("input[type=radio]:checked").val(), b.content = a.find("textarea").val(), b.group = a.find("[name=group]").val(), a.find("input[type=text]").each(function() {
				var a = $(this).attr("name");
				b[a] = $(this).val()
			}), a.find("input[type=checkbox]").each(function() {
				var a = $(this).attr("name");
				b[a] = "checked" == $(this).attr("checked") ? 1 : 0
			}), b
		},
		A = function(a) {
			a.find(".type input").change(function() {
				var b = $(this).attr("apptype");
				a.find("[data-type]").addClass("hidden"), a.find("[data-type=" + b + "]").removeClass("hidden")
			}), a.find(".app-edit-select-icon").unbind("click").bind("click", function() {
				var b = G.basicPath + "static/images/file_icon/icon_app/";
				G.isRoot || (b = ""), core.api.pathSelect({
					type: "file",
					title: LNG.path_api_select_file,
					firstPath: b
				}, function(b) {
					var b = core.path2url(b);
					a.find(".app-edit-select-icon-input").val(b)
				})
			}), a.find(".size-full").unbind("click").bind("click", function() {
				var b = $(this).prop("checked");
				b ? (a.find("[name=width]").val("100%"), a.find("[name=height]").val("100%")) : (a.find("[name=width]").val("800"), a.find("[name=height]").val("600"))
			})
		},
		B = function(b, c, d) {
			var e, f, g, h = LNG.app_create,
				i = UUID(),
				j = a("./tpl/appEdit.html"),
				k = template.compile(j);
			switch (void 0 == d && (d = "userEdit"), "rootEdit" == d && (b = b), "userEdit" == d || "rootEdit" == d ? (h = LNG.app_edit, g = k({
				LNG: LNG,
				uuid: i,
				data: b,
				appType: G.settings.appType
			})) : g = k({
				LNG: LNG,
				uuid: i,
				data: {},
				appType: G.settings.appType
			}), $.dialog({
				fixed: !0,
				width: 450,
				id: i,
				padding: 15,
				title: h,
				content: g,
				button: [{
					name: LNG.preview,
					callback: function() {
						return core.openApp(z(e)), !1
					}
				}, {
					name: LNG.button_save,
					focus: !0,
					callback: function() {
						var a = z(e);
						switch (d) {
						case "userAdd":
							var g = urlEncode(G.thisPath + a.name);
							f = G.appHost + "app/userApp&action=add&path=" + g;
							break;
						case "userEdit":
							f = G.appHost + "app/userApp&path=" + urlEncode(b.path);
							break;
						case "rootAdd":
							f = G.appHost + "app/add&name=" + urlEncode(a.name);
							break;
						case "rootEdit":
							f = G.appHost + "app/edit&name=" + urlEncode(a.name) + "&old_name=" + urlEncode(b.name)
						}
						$.ajax({
							url: f,
							type: "POST",
							dataType: "json",
							data: {
								data: urlEncode(jsonEncode(a))
							},
							beforeSend: function() {
								Tips.loading()
							},
							error: core.ajaxError,
							success: function(a) {
								if (Tips.close(a), a.code) if ("rootEdit" == d || "rootAdd" == d) {
									if (!a.code) return;
									ShareData.frameTop("Openapp_store", function(a) {
										a.App.reload()
									})
								} else "function" == typeof c ? c() : ui.f5()
							}
						})
					}
				}]
			}), e = $("." + i), G.isRoot || $(".appbox .appline .right a.open").remove(), b.group && e.find("option").eq(b.group).attr("selected", 1), e.find(".aui-content").css("overflow", "inherit"), d) {
			case "userEdit":
				e.find(".name").addClass("hidden"), e.find(".desc").addClass("hidden"), e.find(".group").addClass("hidden"), e.find("option[value=" + b.group + "]").attr("checked", !0), "url" != b.type && e.find(".appline[data-type=url]").addClass("hidden");
				break;
			case "userAdd":
				e.find(".desc").addClass("hidden"), e.find(".group").addClass("hidden"), e.find("[apptype=url]").attr("checked", !0), e.find("[data-type=url] input[name=resize]").attr("checked", !0), e.find("input[name=width]").attr("value", "800"), e.find("input[name=height]").attr("value", "600"), e.find("input[name=icon]").attr("value", "oexe.png");
				break;
			case "rootAdd":
				e.find("[apptype=url]").attr("checked", !0), e.find("[data-type=url] input[name=resize]").attr("checked", !0), e.find("input[name=width]").attr("value", "800"), e.find("input[name=height]").attr("value", "600"), e.find("input[name=icon]").attr("value", "oexe.png");
				break;
			case "rootEdit":
				e.find("option[value=" + b.group + "]").attr("selected", !0), "url" != b.type && e.find(".appline[data-type=url]").addClass("hidden")
			}
			A(e)
		},
		C = function() {
			core.appStore()
		},
		D = function(a) {
			a && a.length < 4 && "http" != a.substring(0, 4) || $.ajax({
				url: G.appHost + "app/getUrlTitle&url=" + a,
				dataType: "json",
				beforeSend: function() {
					Tips.loading()
				},
				success: function(b) {
					var c = b.data;
					c = c.replace(/[\/\\]/g, "_"), Tips.close(b);
					var d = {
						content: a,
						type: "url",
						desc: "",
						group: "others",
						icon: "internet.png",
						name: c,
						resize: 1,
						simple: 0,
						height: "70%",
						width: "90%"
					},
						e = urlEncode(G.thisPath + c);
					a = G.appHost + "app/userApp&action=add&path=" + e, $.ajax({
						url: a,
						type: "POST",
						dataType: "json",
						data: {
							data: urlEncode(jsonEncode(d))
						},
						success: function(a) {
							Tips.close(a), a.code && ui.f5()
						}
					})
				}
			})
		};
	return {
		makeJson: f,
		appEdit: B,
		appList: C,
		appAddURL: D,
		share: n,
		shareBox: o,
		setBackground: r,
		createLink: s,
		createProject: t,
		imageRotate: u,
		newFile: g,
		newFolder: h,
		rname: i,
		zipDownload: k,
		zip: l,
		unZip: m,
		info: v,
		remove: j,
		fav: y,
		favRemove: x
	}
});;
define("app/path/tpl/fileinfo/fileInfo.html", [], "<div class='pathinfo'>\n	{{if downloadPath}}\n	<div class='p info-item-link'>\n		<div class='title' style=\"line-height: 30px;\">{{LNG.download_address}}:</div>\n		<div class=\"content input-group\">\n			<input type=\"text\" class=\"download-url\" value='{{downloadPath}}'>\n			<div class=\"input-group-btn\">\n				<button type=\"button\" class=\"btn btn-default open-window\">{{LNG.open}}</button>\n				<button type=\"button\" class=\"btn btn-default qrcode\"><i class=\"icon-qrcode\"></i></button>\n			</div>\n		</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='line'></div>\n	{{/if}}\n\n	<div class='p info-item-address'>\n		<div class='title'>{{LNG.address}}:</div>\n		<div class='content' id='id_fileinfo_path'>{{path |kod.window.htmlEncode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-size'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}} {{if size>1024}}<span>({{size.toLocaleString()}} Byte)</span>{{/if}}</div>\n		<div style='clear:both'></div>\n	</div>\n\n	{{if fileMd5}}\n	<div class='p info-item-md5'>\n		<div class='title'>MD5:</div>\n		<div class='content {{if fileMd5 == \"...\"}}file-md5-loading{{/if}}'>{{fileMd5}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if imageSize}}\n	<div class='p info-item-image-size'>\n		<div class='title'>{{LNG.image_size}}:</div>\n		<div class='content'>{{imageSize.width}} × {{imageSize.height}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	<div class='line'></div>\n\n	{{if ctime}}\n	<div class='p info-item-create-time'>\n		<div class='title'>{{LNG.create_time}}</div>\n		<div class='content'>{{ctime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mtime}}\n	<div class='p info-item-modify-time'>\n		<div class='title'>{{LNG.modify_time}}</div>\n		<div class='content'>{{mtime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if atime}}\n	<div class='p info-item-last-time'>\n		<div class='title'>{{LNG.last_time}}</div>\n		<div class='content'>{{atime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if owner}}\n	<div class='p info-item-owner'>\n		<div class='title'>{{LNG.file_info_owner}}</div>\n		<div class='content'>{{owner}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if group}}\n	<div class='p info-item-group'>\n		<div class='title'>{{LNG.file_info_group}}</div>\n		<div class='content'>{{group}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n	\n	{{if mode && is_root==\"1\"}}\n	<div class='line'></div>\n	<div class='p info-item-mode change_permission'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-chmod'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n");;
define("app/path/tpl/fileinfo/pathInfo.html", [], "<div class='pathinfo'>\n	<div class='p info-item-address'>\n		<div class='title'>{{LNG.address}}:</div>\n		<div class='content'>{{path |kod.window.htmlEncode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-size'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}}{{if size>1024}}<span>({{size.toLocaleString()}} Byte)</span>{{/if}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-count'>\n		<div class='title'>{{LNG.contain}}:</div> \n		<div class='content'>{{fileCount}}  {{LNG.file}},{{folderCount}}  {{LNG.folder}}</div>\n		<div style='clear:both'></div>\n	</div>\n	\n	<div class='line'></div>\n	{{if ctime}}\n	<div class='p info-item-create-time'>\n		<div class='title'>{{LNG.create_time}}</div>\n		<div class='content'>{{ctime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mtime}}\n	<div class='p info-item-modify-time'>\n		<div class='title'>{{LNG.modify_time}}</div>\n		<div class='content'>{{mtime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if atime}}\n	<div class='p info-item-last-time'>\n		<div class='title'>{{LNG.last_time}}</div>\n		<div class='content'>{{atime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if owner}}\n	<div class='p info-item-owner'>\n		<div class='title'>{{LNG.file_info_owner}}</div>\n		<div class='content'>{{owner}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if group}}\n	<div class='p info-item-group'>\n		<div class='title'>{{LNG.file_info_group}}</div>\n		<div class='content'>{{group}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n\n	{{if mode && is_root==\"1\"}}\n	<div class='line'></div>\n	<div class='p info-item-mode'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-chmod'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n");;
define("app/path/tpl/share.html", [], '<div class=\'content-box can-not-select\'>\n	<div class=\'title\'>\n		<div class="titleinfo">{{LNG.share_title}}</div>\n		<div class="share-view-info"></div>\n	</div>\n	<div class=\'content-info\'>\n		<div class="input-line share-has-url clear">\n			<span class="input-title">{{LNG.share_url}}:</span>\n			<div class="input-group">\n			  <input type="text" class="share-url" aria-label="Text input with segmented button dropdown">\n			  <div class="input-group-btn">\n				<button type="button" class="btn btn-default copy"><i class="icon-copy"></i>  &nbsp;{{LNG.copy}}</button>\n				<button type="button" class="btn btn-default open-window">{{LNG.open}}</button>\n				<!-- <button type="button" class="btn btn-default qrcode"><i class="icon-qrcode"></i></button> -->\n			  </div>\n			</div>\n			<div style="clear:both"></div>\n		</div>\n		<div class="input-line">\n			<span class="input-title">{{LNG.share_password}}:</span>\n			<input type="text" placeholder="{{LNG.share_password}}" name="sharePassword"/>\n			<i class="desc">{{LNG.share_password_desc}}</i>\n			<div style="clear:both"></div>\n		</div>\n		<div class="share-more-line"></div>\n		<button class="share-more btn btn-default btn-sm">{{LNG.more}}<b class="caret"></b></button>\n		<div class="share-setting-more">\n			<div class="input-line share-others">\n				<span class="input-title">{{LNG.others}}:</span>\n				<label class="label-code-read">\n					<input type="checkbox" name="codeRead" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_code_read}}</span>\n				</label>\n				<label>\n					<input type="checkbox" name="notDownload" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_not_download}}</span>\n				</label>\n				<label class="label-can-upload">\n					<input type="checkbox" name="canUpload" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_can_upload}}</span>\n				</label>\n\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_name}}:</span>\n				<input type="hidden" name="sid"/>\n				<input type="hidden" name="type"/>\n				<input type="hidden" name="name"/>\n				<input class="share-name" type="text" placeholder="{{LNG.share_name}}" name="showName"/>\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_path}}:</span>\n				<input class="share-name" type="text" name="path" value="" />\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_time}}:</span>\n				<input id="share-time" type="text" placeholder="{{LNG.share_time}}" name="timeTo"/>\n				<i class="desc">{{LNG.share_time_desc}}</i>\n				<div style="clear:both"></div>\n			</div>\n		</div>		\n	</div>\n	<div class="share-action">\n		<a href="javascript:void(0);" class="share-qrcode-button" title="{{LNG.qrcode}}"><i class="font-icon icon-qrcode"></i></a>\n		<button type="button" class="btn btn-primary share-create-button">{{LNG.share_create}}</button>\n		<a type="button" href="javascript:void(0);" class="share-remove-button">{{LNG.share_cancle}}</a>\n	</div>\n</div>');;
define("app/path/tpl/fileinfo/pathInfoMore.html", [], "<div class='pathinfo'>\n	<div class='p info-item-count' style='line-height:40px;'>\n		<div class='title'>{{LNG.info}}:</div>\n		<div class='content'>\n			{{fileCount}}  {{LNG.file}},{{folderCount}}  {{LNG.folder}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='line info-item-size'></div>\n	<div class='p'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}} {{if size>1024}}<span>({{size.toLocaleString()}} Byte)</span>{{/if}}</div>\n		<div style='clear:both'></div>\n	</div>\n	\n	{{if mode && is_root==\"1\"}}\n	<div class='line'></div>\n	<div class='p info-item-mode'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-chmod'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n");;
define("app/path/tpl/appEdit.html", [], "<div class='appbox'>\n	<div class='appline name'>\n		<div class='left'>{{LNG.name}}</div>\n		<div class='right'><input type='text' name='name' value='{{if data.name}}{{data.name}}{{/if}}'/></div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline desc'>\n		<div class='left'>{{LNG.app_desc}}</div>\n		<div class='right'><input type='text' name='desc' value='{{if data.desc}}{{data.desc}}{{/if}}'/></div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline icon'>\n		<div class='left'>{{LNG.app_icon}}</div>\n		<div class='right'><input type='text' name='icon' class=\"app-edit-select-icon-input\" value='{{if data.icon}}{{data.icon}}{{/if}}'/>\n			<button class='btn btn-default btn-sm open app-edit-select-icon btn-right'>\n				<i class=\"font-icon icon-folder-open\"></i>\n			</button>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline group'>\n		<div class='left'>{{LNG.app_group}}</div>\n		<div class='right'>\n		<select name='group'>\n			{{each appType as val index}}\n			<option value ='{{val.type}}'>{{LNG[val.name] || val.name}}</option>\n			{{/each}}\n		<select>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline type'>\n		<div class='left'>{{LNG.app_type}}</div>\n		<div class='right'>\n			<input class='w20 kui-radio size-small' type='radio' id='url{{uuid}}' apptype='url' value='url' name='{{uuid}}type' {{if data.type=='url'}}checked='checked'{{/if}}/>\n			<label for='url{{uuid}}'>{{LNG.app_type_url}}</label>\n			<input class='w20 kui-radio size-small' type='radio' id='app{{uuid}}' apptype='app' value='app' name='{{uuid}}type' {{if data.type=='app'}}checked='checked'{{/if}}/>\n			<label for='app{{uuid}}'>{{LNG.app_type_code}}</label>\n			<input class='w20 kui-radio size-small' type='radio' id='app_link{{uuid}}' apptype='app_link' value='app_link' name='{{uuid}}type' {{if data.type=='app_link'}}checked='checked'{{/if}}/>\n			<label for='app_link{{uuid}}'>{{LNG.app_type_link}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n\n	<div class='appline' data-type='url'>\n		<div class='left'>{{LNG.app_display}}</div>\n		<div class='right'>\n			<input class='w20 kui-checkbox size-small' type='checkbox' id='simple{{uuid}}' name='simple' {{if data.simple}}checked='true'{{/if}} />\n			<label for='simple{{uuid}}'>{{LNG.app_display_border}}</label>\n			<input class='w20 kui-checkbox size-small' type='checkbox' id='resize{{uuid}}' name='resize' {{if data.resize}}checked='true'{{/if}} />\n			<label for='resize{{uuid}}'>{{LNG.app_display_size}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline' data-type='url'>\n		<div class='left'>{{LNG.app_size}}</div>\n		<div class='right'>\n			<input class='w30' type='text' name='width'  value='{{if data.width}}{{data.width}}{{/if}}'/>({{LNG.width}})&nbsp;&nbsp;\n			<input class='w30' type='text' name='height' value='{{if data.height}}{{data.height}}{{/if}}'/>({{LNG.height}})\n\n			<input class='w20 kui-checkbox size-small size-full' type='checkbox' id='size-full{{uuid}}' \n				{{if data.width=='100%' && data.height=='100%'}}checked='true'{{/if}} />\n			<label for='size-full{{uuid}}'>{{LNG.full_screen}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline content'>\n		<div class='left hidden' data-type='app'>{{LNG.app_code}}</div>\n		<div class='left hidden' data-type='app_link'>{{LNG.app_code}}</div>\n		<div class='left' data-type='url'>{{LNG.app_url}}</div>\n		<div class='right'><textarea name='content'>{{if data.content}}{{data.content}}{{/if}}</textarea></div>\n		<div style='clear:both;'></div>\n	</div>\n</div>\n");;
define("app/path/clipboard", [], function(a, b) {
	var c = function(a) {
			return ui.path.pathOperate.makeJson(a)
		},
		d = function(a) {
			a.length < 1 || $.ajax({
				url: G.appHost + "explorer/pathCopy",
				type: "POST",
				dataType: "json",
				data: c(a),
				error: core.ajaxError,
				success: function(a) {
					Tips.tips(a)
				}
			})
		},
		e = function(a) {
			a.length < 1 || $.ajax({
				url: G.appHost + "explorer/pathCute",
				type: "POST",
				dataType: "json",
				data: c(a),
				error: core.ajaxError,
				success: function(a) {
					Tips.tips(a)
				}
			})
		},
		f = function(a, b) {
			a && (Tips.loading(LNG.moving), setTimeout(function() {
				var c = G.appHost + "explorer/pathPast&path=" + urlEncode(a);
				$.ajax({
					url: c,
					dataType: "json",
					error: core.ajaxError,
					success: function(a) {
						Tips.close(a.data, a.code), "function" == typeof b && b(a.info)
					}
				})
			}, 50))
		},
		g = function(a, b, d) {
			b && $.ajax({
				url: G.appHost + "explorer/pathCuteDrag",
				type: "POST",
				dataType: "json",
				data: c(a) + "&path=" + urlEncode(b + "/"),
				beforeSend: function() {
					Tips.loading(LNG.moving)
				},
				error: core.ajaxError,
				success: function(a) {
					Tips.close(a), a.code && core.playSound("drag_drop"), "function" == typeof d && d(a.info)
				}
			})
		},
		h = function(a, b, d, e) {
			b && (void 0 == e && (e = 0), $.ajax({
				url: G.appHost + "explorer/pathCopyDrag",
				type: "POST",
				dataType: "json",
				data: c(a) + "&path=" + urlEncode(b + "/") + "&filename_auto=" + Number(e),
				beforeSend: function() {
					Tips.loading(LNG.moving)
				},
				error: core.ajaxError,
				success: function(a) {
					Tips.close(a), a.code && core.playSound("drag_drop"), "function" == typeof d && d(a.info)
				}
			}))
		},
		i = function(a, b) {
			var c = "style='height:150px;border-left: 3px solid #def;overflow:auto;margin:20px;background: #f0f8ff;padding:20px;width:300px'",
				d = "<div " + c + ">" + LNG.clipboard_null + "</div>";
			if (0 != a.length) {
				d = "<div " + c + "><b>" + LNG.clipboard_state + LNG[b] + "</b><br/>";
				for (var e = 40, f = 0; f < a.length; f++) {
					var g = a[f],
						h = g.path;
					h = h.length < e ? h : "..." + h.substr(-e), d += "<br/>" + g.type + ": <a href='javascript:kodApp.open(\"" + htmlEncode(g.path) + '","' + g.type + "\");'>" + h + "</a>"
				}
				d += '<br/><button class="btn btn-sm btn-default mt-10 clipboard-clear" onclick="">' + LNG.clipboard_clear + "</button></div>"
			}
			return d
		},
		j = function() {
			$.ajax({
				url: G.appHost + "explorer/clipboard",
				dataType: "json",
				error: core.ajaxError,
				success: function(a) {
					a.code && ($.dialog({
						id: "dialog-clipboard",
						title: LNG.clipboard,
						width: 400,
						content: i(a.data, a.info)
					}), $(".clipboard-clear").one("click", function() {
						Tips.tips(LNG.success), $.get(G.appHost + "explorer/clipboard&clear=ok"), $.dialog.list["dialog-clipboard"].close()
					}))
				}
			})
		};
	return {
		copy: d,
		cute: e,
		past: f,
		cuteDrag: g,
		copyDrag: h,
		clipboard: j
	}
});;
define("app/path/search", ["./tpl/search.html", "./tpl/searchList.html"], function(a, b) {
	var c = a("./tpl/search.html"),
		d = a("./tpl/searchList.html");
	return function(a, b) {
		b || (b = G.thisPath);
		var e, f, g = function() {
				var d = trim(core.pathClear(b), "/");
				if (0 == d.indexOf(G.KOD_USER_SHARE) && -1 == d.indexOf("/") || d == G.KOD_USER_FAV || d == G.KOD_GROUP_ROOT_ALL) return void Tips.tips(LNG.path_cannot_search, !1);
				template.helper("searchResultPrase", j);
				var g = template.compile(c);
				0 == $(".dialog-do-search").length ? (e = $.dialog({
					id: "dialog-do-search",
					padding: 0,
					fixed: !0,
					ico: core.icon("search"),
					resize: !0,
					title: LNG.search,
					width: 460,
					height: 480,
					content: g({
						LNG: LNG
					})
				}), f = l(), f.path = b, "" != a && (f.search = a), $("#search-path").val(f.path), $("#search-value").val(f.search), k()) : ($.dialog.list["dialog-do-search"].display(!0), a && $("#search-value").val(a), $("#search-path").val(b), i())
			},
			h = function() {
				return f = {
					search: $("#search-value").val(),
					path: $("#search-path").val(),
					is_content: Number($("#search-is-content").is(":checked")),
					is_case: Number($("#search-is-case").is(":checked")),
					ext: $("#search-ext").val()
				}
			},
			i = function() {
				h(), n(f)
			},
			j = function(a) {
				var b = htmlEncode($("#search-value").val());
				if (a = htmlEncode(a), f.is_case) a = a.replace(b, '<span class="keyword">' + b + "</span>");
				else {
					var c = a.toLowerCase().indexOf(b.toLowerCase());
					a = a.substr(0, c) + '<span class="keyword">' + a.substr(c, b.length) + "</span>" + a.substr(c + b.length)
				}
				return a
			},
			k = function() {
				$("#search-value").die("keyup").live("keyup", function(a) {
					core.isApp("editor") || ui.path.setSearchByStr($(this).val())
				}), $("#search-value,#search-ext,#search-path").keyEnter(i), $(".search-header .btn").die("click").live("click", i), $(".search-result .file-item .file-info").die("click").live("click", function(a) {
					var b = $(this).parent();
					return b.toggleClass("open"), b.find(".result-item").slideToggle(200), stopPP(a), !1
				}), $(".search-result .file-item .file-info .goto").die("click").live("click", function(a) {
					var b = $(this).parent().parent(),
						c = pathHashDecode(b.attr("data-path")),
						d = core.pathFather(c);
					return core.openPath(d), setTimeout(function() {
						core.isApp("explorer") && ui.path.setSelectByFilename(c)
					}, 200), stopPP(a), !1
				}), $(".search-result .file-item .file-info .title").die("click").live("click", function(a) {
					var b = $(this).parent().parent(),
						c = pathHashDecode(b.attr("data-path"));
					return kodApp.setLastOpenTarget(b), kodApp.open(c, b.attr("data-ext")), stopPP(a), !1
				}), $(".search-result .file-item .result-info").die("click").live("click", function(a) {
					var b = $(this).parent().parent(),
						c = pathHashDecode(b.attr("data-path"));
					$(".search-result .file-item .result-info.this").removeClass("this"), $(this).addClass("this");
					var d = parseInt($(this).find(".line").attr("data-line"));
					return ShareData.data("FILE_SEARCH_AT", {
						search: $("#search-value").val(),
						line: d,
						lineIndex: $(this).parent().find("[data-line=" + d + "]").index($(this).find(".line"))
					}), kodApp.open(c, b.attr("data-ext"), "aceEditor"), stopPP(a), !1
				}), $(".search-header input[type=checkbox]").on("click", function() {
					h(), l(f)
				})
			},
			l = function(a) {
				var b = "box_search_config";
				if (void 0 == a) {
					var a = LocalData.getConfig(b);
					return a || (a = {
						search: "",
						is_content: 0,
						is_case: 0,
						ext: ""
					}), $("#search-value").val(a.search).textSelect(), a.is_content ? $("#search-is-content").attr("checked", "checked") : $("#search-is-content").removeAttr("checked"), a.is_case ? $("#search-is-case").attr("checked", "checked") : $("#search-is-case").removeAttr("checked"), $("#search-ext").val(a.ext), a
				}
				return LocalData.setConfig(b, a)
			},
			m = function(a) {
				var b = $(".file-items"),
					c = $(".search-desc");
				if (!a.code) return c.html(a.data), void b.html("");
				if (0 == a.data.fileList.length && 0 == a.data.folderList.length) return c.html(LNG.search_null), void b.html("");
				var e = template.compile(d);
				if (b.html(e({
					code: a.code,
					data: a.data,
					LNG: LNG
				})), f.is_content) {
					for (var g = a.data.fileList, h = 0, i = 0; i < g.length; i++) g[i].searchInfo && (h += g[i].searchInfo.length);
					c.html(LNG.search_result + ": <b>" + h + "(in " + g.length + " files)</b>"), a.data.error_info && c.html("<span>" + LNG.seach_result_too_more + "</span>")
				} else c.html(a.data.fileList.length + " " + LNG.file + ", " + a.data.folderList.length + LNG.folder + ".")
			},
			n = function(a) {
				l(a), $("#search-value").textFocus();
				var b = $(".file-items"),
					c = $(".search-desc");
				if (!a.search || !a.path) return c.html(LNG.search_info), void b.html("");
				var d = G.appHost + "explorer/search";
				"undefined" != typeof G.sharePage && (d = G.appHost + "share/search&user=" + G.user + "&sid=" + G.sid), $.ajax({
					url: d,
					dataType: "json",
					type: "POST",
					data: a,
					beforeSend: function() {
						c.hide().html(LNG.searching + '<img src="' + G.staticPath + 'images/common/loading.gif">').fadeIn(100)
					},
					error: function(a, b, d) {
						core.ajaxError(a, b, d), c.html(LNG.error)
					},
					success: function(a) {
						m(a)
					}
				})
			};
		g()
	}
});;
define("app/path/tpl/search.html", [], "<div class='do-search-box'>\n	<div class='search-header'>\n		<div class='s_br'>\n			<input type='text' id='search-value'/><button class=\"btn btn-default btn-sm btn-right\"><i class=\"font-icon icon-search\"></i></button>\n			<div style='float:right'>{{LNG.path}}:<input type='text' id='search-path' title=\"\" title-data=\"#search-path\" title-timeout=\"100\"/></div>\n		</div>\n		<div class='s_br'>\n			<input type='checkbox' id='search-is-content' class=\"kui-checkbox size-small\"/>\n			<label for='search-is-content'>{{LNG.search_content}}</label>\n			<input type='checkbox' id='search-is-case' class=\"kui-checkbox size-small\"/>\n			<label for='search-is-case'>{{LNG.search_uplow}}</label>\n			<div style='float:right'>\n				{{LNG.file_type}}:<input type='text' id='search-ext' title='{{LNG.search_ext_tips}}' title-timeout=\"100\"/>\n			</div>\n		</div>\n	</div>\n	<div class=\"search-desc\"></div>\n	<div class='search-result'>\n		<ul class=\"file-items\"></ul>\n	</div>\n</div>\n\n");;
define("app/path/tpl/searchList.html", [], '<!-- 文件夹列表 -->\n{{each data.folderList v i}}\n	 <li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="folder" data-ext="folder">\n		<div class="file-info">\n			<span class="switch"><i class="font-icon icon-file-text-alt"></i></span>\n			<span class="file-icon">{{\'folder\' |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">{{v.name | searchResultPrase}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n	</li>\n{{/each}}\n\n<!-- 文件列表 -->\n{{each data.fileList v i}}\n	{{if v.searchInfo}}\n	<li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="file" data-ext="{{v.ext}}">\n		<div class="file-info file-result">\n			<span class="switch"><i class="font-icon icon-caret-right"></i></span>\n			<span class="file-icon">{{v.ext |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">\n				{{v.name | kod.window.htmlEncode}}\n			</span>\n			<span class="result-num">{{v.searchInfo.length}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n		<ul class="result-item">\n			{{each v.searchInfo value index}}\n			<li class="result-info">\n				<span class="line" data-line="{{value.line}}">{{value.line}}:</span>\n				<span class="search-info">{{@value.str | searchResultPrase}}</span>\n			</li>\n			{{/each}}\n		</ul>\n	</li>\n	{{else}}\n	<li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="file-name" data-ext="{{v.ext}}">\n		<div class="file-info">\n			<span class="switch"><i class="font-icon icon-file-text-alt"></i></span>\n			<span class="file-icon">{{v.ext |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">{{v.name | searchResultPrase}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n	</li>\n	{{/if}}\n{{/each}}\n\n');;
define("app/path/path", ["./pathOperate", "./tpl/fileinfo/fileInfo.html", "./tpl/fileinfo/pathInfo.html", "./tpl/share.html", "./tpl/fileinfo/pathInfoMore.html", "./tpl/appEdit.html", "./clipboard", "./search", "./tpl/search.html", "./tpl/searchList.html", "./tpl/file/create.html"], function(a, b) {
	var c = a("./pathOperate"),
		d = a("./clipboard"),
		e = a("./search"),
		f = void 0,
		g = function() {
			if (_.get(G, "jsonData.info.pathType") == G.KOD_USER_RECYCLE || _.get(G, "jsonData.info.pathType") == G.KOD_USER_SHARE) return !0;
			if (ui.fileLight) {
				var a = ui.fileLight.fileListSelect();
				if (a.hasClass("systemBox")) return Tips.tips(LNG.path_can_not_action, "warning"), !1
			}
			return !0
		},
		h = function(a, b, c, d) {
			if (a) {
				if (!core.isApp("explorer")) return void core.explorer(a);
				if (a == G.thisPath) return void(void 0 != b && "" != b && Tips.tips(LNG.path_is_current, "info"));
				G.thisPath = a.replace(/\\/g, "/"), G.thisPath = a.replace(/\/+/g, "/"), "/" != G.thisPath.substr(G.thisPath.length - 1) && (G.thisPath += "/");
				var e = $(".dialog-file-upload");
				if (e.length > 0) {
					var f = "none" == e.css("display") || "hidden" == e.css("visibility");
					f || core.upload()
				}
				if ("undefined" != typeof G.sid && (window.location.href = "#" + urlEncode(G.thisPath)), core.playSound("folder_open"), d || ui.path.history.add(G.thisPath), "split" == G.userConfig.listType) {
					var g = $(".split-box .file[data-path=" + pathHashEncode(G.thisPath) + "]");
					if (0 != g.length && 0 != g.find(".children-more-cert").length) return void g.click();
					$(".file-list-split .split-box").remove()
				}
				ui.f5Callback(function() {
					"function" == typeof c && c()
				})
			}
		},
		i = function() {
			var a = [],
				b = 60,
				c = 0,
				d = function(d) {
					var e = a.length - 1;
					return e == c && a[e] == d ? g() : (c != e && (a = a.slice(0, c + 1)), a[a.length - 1] != d && a.push(d), a.length >= b && (a = a.slice(1)), c = a.length - 1, void g())
				},
				e = function() {
					c + 1 <= a.length - 1 && (h(a[++c], "", "", !0), g())
				},
				f = function() {
					c - 1 >= 0 && (h(a[--c], "", "", !0), g())
				},
				g = function() {
					var b = "disable",
						d = a.length - 1;
					$("#btn-history-next").addClass(b), $("#btn-history-back").addClass(b), (0 != c || 0 != d) && (c > 0 && d >= c && $("#btn-history-back").removeClass(b), c >= 0 && c != d && $("#btn-history-next").removeClass(b))
				};
			return {
				add: d,
				back: f,
				next: e,
				list: function() {
					return a
				}
			}
		}(),
		j = function(a) {
			if (void 0 != a) {
				"string" == typeof a && (a = [a]);
				for (var b = 0; b < a.length; b++) a[b] = trim(a[b], "/");
				ui.fileLight.clear(), ui.fileLight.fileListAll().each(function(b, c) {
					var d = trim(ui.fileLight.path($(this)), "/");
					d && -1 != $.inArray(d, a) && $(this).addClass(Config.SelectClassName)
				}), ui.fileLight.select(), ui.fileLight.setInView()
			}
		},
		k = function(a) {
			if ("" != a) {
				if (a = a.toLowerCase(), void 0 == f || G.thisPath != f.path || a != f.key) {
					var b = [];
					ui.fileLight.fileListAll().each(function() {
						var c = ui.fileLight.name($(this)),
							d = ui.fileLight.path($(this));
						c && a == c.substring(0, a.length).toLowerCase() && b.push(d)
					}), f = {
						key: a,
						path: G.thisPath,
						index: 0,
						list: b
					}
				}
				0 != f.list.length && (Tips.pop(f.key), j(f.list[f.index++]), f.index == f.list.length && (f.index = 0))
			}
		},
		l = function(a) {
			return "" == a ? void ui.fileLight.clear() : (ui.fileLight.clear(), ui.fileLight.fileListAll().each(function(b, c) {
				var d = ui.fileLight.name($(this)); - 1 != d.toLowerCase().indexOf(a) && $(ui.fileLight.fileListAll()).eq(b).addClass(Config.SelectClassName)
			}), ui.fileLight.select(), void ui.fileLight.setInView())
		},
		m = function(a, b) {
			var c = G.thisPath + a;
			return void 0 == b && (c += "/"), 0 != $('.bodymain .file[data-path="' + pathHashEncode(c) + '"]').length ? !0 : !1
		},
		n = function(a, b) {
			var c, d = 0,
				e = "." + b;
			if ((void 0 == b || "" == b) && (e = ""), !m(a + e, b)) return a + e;
			for (c = a + "(0)" + e; m(c, b);) d++, c = a + "(" + d + ")" + e;
			return c
		},
		o = function(a, b) {
			var c, d = 0,
				e = G.jsonData.folderList,
				f = G.userConfig.listSortField,
				g = G.userConfig.listSortOrder,
				h = {
					name: a,
					size: 0,
					ext: b,
					mtime: date("Y/m/d H:i:s", time())
				};
			if (core.isApp("desktop") && (d += $(".menu-default").length + 1), "file" == b) {
				h.ext = core.pathExt(a);
				var i = {
					docx: 9623,
					html: 221,
					php: 6,
					pptx: 28702,
					xlsx: 4659
				};
				h.size = i[h.ext] || 0, e = G.jsonData.fileList, d += G.jsonData.folderList.length
			}
			if ("down" == g) {
				for (c = 0; c < e.length; c++) {
					var j = pathTools.strSort(e[c][f], h[f]),
						k = pathTools.strSort(e[c].name, h.name);
					if (-1 == j || 0 == j && -1 == k) break
				}
				c--
			} else for (c = e.length - 1; c >= 0; c--) {
				var j = pathTools.strSort(e[c][f], h[f]),
					k = pathTools.strSort(e[c].name, h.name);
				if (-1 == j || 0 == j && -1 == k) break
			}
			return c + d
		},
		p = function(b, d, e) {
			ui.fileLight.clear();
			var f = o(d, b),
				g = $(Config.FileBoxSelector);
			"split" == G.userConfig.listType && (g = $(".split-box.split-select").find(".content"));
			var h = a("./tpl/file/create.html"),
				i = template.compile(h),
				j = i({
					type: b,
					newname: d,
					ext: e,
					listType: G.userConfig.listType
				});
			if (-1 == f || 0 == g.find(".file").length) g.html(j + g.html());
			else {
				var k = g.children(".file:eq(" + f + ")");
				0 == k.length && (k = g.children(".file").last()), "list" == G.userConfig.listType ? k.next().hasClass("children-list") && (k = k.next()) : "split" == G.userConfig.listType && (k = $(".split-box.split-select .file").last()), $(j).insertAfter(k)
			}
			var l = $(".textarea .newfile"),
				n = d.length;
			"folder" != b && -1 != d.indexOf(".") && (n = d.length - e.length - 1), l.textSelect(0, n), "split" == G.userConfig.listType && l.css("width", l.parents(".filename").width() - 40), "icon" == G.userConfig.listType ? ($("#makefile").css({
				height: $("#makefile").width() + 15,
				transition: "none"
			}), $("#makefile .textarea").css("margin-top", "-13px")) : $("#makefile .x-item-file").addClass("small"), core.isApp("desktop") && ui.resetDesktopIcon();
			var p = function(a) {
					a === !1 ? $("#makefile").remove() : r(a)
				},
				q = function(a) {
					if ("" == trim(a)) return $("#makefile").remove(), void Tips.tips(LNG.error, "warning");
					if (m(a, e)) $("#makefile").remove(), Tips.tips(LNG.path_exists, "warning");
					else {
						var d = G.thisPath;
						"split" == G.userConfig.listType && (d = ui.fileLight.path($(".file-icon-edit").parents(".split-box"))), "folder" == b ? c.newFolder(d + a, p) : c.newFile(d + a, p)
					}
				};
			ui.fileLight.setInView($(".file-continer .file-icon-edit")), l.focus().autoTextarea(), l.unbind("keydown").keydown(function(a) {
				13 == a.keyCode && (stopPP(a), a.preventDefault(), q(l.attr("value"))), 27 == a.keyCode && $("#makefile").remove()
			}).unbind("blur").blur(function() {
				q(l.attr("value"))
			})
		},
		q = function() {
			var a = "",
				b = ui.fileLight.fileListSelect(),
				d = ui.fileLight.name(b),
				e = core.pathFather(ui.fileLight.path(b)),
				f = ui.fileLight.type(b);
			if (1 == b.length && g()) {
				if (b.hasClass("menuSharePath")) return void ui.path.shareEdit();
				var h = htmlEncode(rtrim(d, ".oexe")),
					i = "<input class='fix' id='pathRenameTextarea' value='" + h + "'/>";
				"icon" == G.userConfig.listType && (i = "<textarea class='fix' id='pathRenameTextarea'>" + h + "</textarea>", b.css({
					height: b.height()
				})), $(b).addClass("file-icon-edit").find(".title").html("<div class='textarea'>" + i + "<div>");
				var j = $("#pathRenameTextarea");
				"split" == G.userConfig.listType && j.css({
					width: j.parents(".filename").width() - 32,
					height: j.parents(".filename").height() + 1
				});
				var k = d.length;
				"folder" != f && -1 != d.indexOf(".") && (k = d.length - f.length - 1), f || 0 != d.indexOf(".") ? j.textSelect(0, k) : j.textSelect(0, d.length);
				var l = function(g) {
						"oexe" == f && (g += ".oexe");
						if (g != d) a = e + d, g = e + g, c.rname(a, g, function(a) {
							a === !1 ? $(b).removeClass("file-icon-edit").find(".title").html(htmlEncode(d)) : r(a)
						});
						else {
							var h = d;
							".oexe" == h.substr(-5) && (h = h.substr(0, h.length - 5)), $(b).removeClass("file-icon-edit").find(".title").html(htmlEncode(h))
						}
					};
				j.focus().autoTextarea(), j.keydown(function(a) {
					13 == a.keyCode && (a.preventDefault(), stopPP(a), l(j.attr("value"))), 27 == a.keyCode && ("oexe" == f && (d = d.replace(".oexe", "")), $(b).removeClass("file-icon-edit").find(".title").html(d))
				}).unbind("blur").blur(function() {
					l(j.val())
				})
			}
		},
		r = function(a) {
			ui.fileLight.clear(), ui.f5Callback(function() {
				j(a), core.isApp("explorer") && ui.tree.checkIfChange(G.thisPath)
			})
		},
		s = function(a) {
			var b = {},
				c = [];
			a.sort(function(a, b) {
				return a.path == b.path ? 0 : a.path > b.path ? 1 : -1
			});
			for (var d = function(a) {
					for (var c = a;
					"" != a;) {
						if ("undefined" != typeof b[a]) return 1 == b[a] ? !0 : c == a ? (b[a] = 1, !1) : !0;
						a = core.pathFather(a)
					}
					return !1
				}, e = 0; e < a.length; e++) if ("folder" == a[e].type) {
				var f = rtrim(a[e].path, "/") + "/";
				b[f] || d(f) || (b[f] = 0)
			}
			for (var e = 0; e < a.length; e++) {
				var f = a[e].path;
				"folder" == a[e].type ? f = rtrim(f, "/") + "/" : a[e].type = "file", d(f) || c.push(a[e])
			}
			return c
		},
		t = function(a, b, c) {
			var d = [];
			return ShareData.data("FILE_SELECT_ARRAY") ? (d = ShareData.data("FILE_SELECT_ARRAY"), ShareData.remove("FILE_SELECT_ARRAY")) : ui.fileLight.fileListSelect().each(function(a) {
				d.push({
					path: ui.fileLight.path($(this)),
					type: ui.fileLight.type($(this))
				})
			}), a ? s(d) : 1 != d.length ? {
				path: "",
				type: ""
			} : d[0]
		},
		u = function(a, b) {
			for (var c in G.jsonData) if ("fileList" == c || "folderList" == c) for (var d = 0; d < G.jsonData[c].length; d++) if (G.jsonData[c][d][a] == b) return G.jsonData[c][d]
		};
	return {
		search: e,
		makeParam: t,
		refreshCallback: r,
		history: i,
		getJsondataCell: u,
		checkSystemPath: g,
		pathOperate: c,
		appList: function() {
			c.appList(t().path)
		},
		appInstall: function() {
			c.appInstall(t().path)
		},
		openWindow: function() {
			kodApp.openWindow(t().path)
		},
		open: function(a) {
			var b = ui.fileLight.fileListSelect();
			if (void 0 != a || core.isApp("editor")) return kodApp.setLastOpenTarget($(".curSelectedNode").parent()), void kodApp.open(a);
			if (0 != b.length) {
				var c = t();
				if ($(b).hasClass("file-not-exists")) return void Tips.tips(LNG.share_error_path, !1);
				if ("split" != G.userConfig.listType || "folder" != c.type) {
					if ("oexe" == c.type) {
						var d = b.attr("data-app");
						if (d) {
							var e = jsonDecode(base64Decode(d));
							return void core.openApp(e)
						}
					}
					kodApp.setLastOpenTarget(b), kodApp.open(c.path, c.type)
				}
			}
		},
		share: function() {
			c.share(t())
		},
		setBackground: function() {
			var a = core.path2url(t().path);
			ShareData.frameTop("", function(b) {
				b.ui.setWall(a)
			}), ui.setWall(a), c.setBackground(a)
		},
		createLink: function(a) {
			var b = t(),
				d = ui.fileLight.fileListSelect().last();
			b.name = trim(d.find(".filename").text()), c.createLink(b.path, b.name, b.type, a, r)
		},
		createProject: function() {
			c.createProject(t().path, r)
		},
		download: function() {
			if (!core.authCheckGroup("explorer.fileDownload")) return void Tips.tips(LNG.no_permission_action, "error");
			var a = t(!0),
				b = !1;
			$.each(a, function() {
				"folder" == this.type && (b = !0)
			}), b || a.length > 1 ? c.zipDownload(a) : $.each(a, function() {
				kodApp.download(this.path)
			})
		},
		shareEdit: function() {
			var a = u("path", t().path);
			try {
				var b = G.jsonData.shareList[a.sid];
				c.shareBox(b)
			} catch (d) {}
		},
		shareOpenWindow: function() {
			var a = u("path", t().path),
				b = "file";
			"folder" == a.type && (b = 1 == a.codeRead ? "codeRead" : "folder");
			var c = G.appHost + "share/" + b + "&user=" + G.jsonData.info.id + "&sid=" + a.sid;
			window.open(c)
		},
		shareOpenPath: function() {
			var a = t(),
				b = u("path", a.path);
			if (!b || !G.jsonData.shareList) return void kodApp.open(a.path, a.type);
			var c = G.jsonData.shareList[b.sid],
				d = core.pathFather(c.path),
				e = core.pathThis(c.path);
			"folder" == c.type ? ui.path.list(c.path, "") : ui.path.list(d, "", function() {
				j(e)
			})
		},
		explorer: function() {
			core.explorer(t().path)
		},
		explorerNew: function() {
			window.open(G.appHost + "explorer&path=" + t().path)
		},
		openProject: function() {
			core.explorerCode(t().path)
		},
		search: function(a, b) {
			return a ? void e(a, b) : void e("", t().path)
		},
		fav: function() {
			var a = t(),
				b = ui.fileLight.fileListSelect().last();
			a.name = trim(b.find(".filename").text()), c.fav(a)
		},
		recycleClear: function() {
			c.remove([{
				type: "recycle-clear",
				path: ""
			}], function() {
				ui.f5()
			})
		},
		remove: function(a, b, d) {
			if (G.jsonData.info && g()) {
				var e = t(!0);
				G.jsonData.info && G.jsonData.info.pathType == G.KOD_USER_SHARE && G.jsonData.info.id == G.userID && -1 == trim(G.thisPath, "/").indexOf("/") && $.each(e, function(a, b) {
					var c = u("path", e[a].path);
					void 0 != c && (e[a].type = "share", e[a].path = c.sid)
				}), d ? c.remove(e, d, a, b) : c.remove(e, r, a, b)
			}
		},
		favRemove: function() {
			var a = $(".file.select .filename");
			a.each(function(b) {
				var d = trim($(this).text());
				b != a.length - 1 ? c.favRemove(d, "", !0) : c.favRemove(d, function(a) {
					Tips.tips(a), ui.tree.refreshFav()
				}, !0)
			})
		},
		clipboard: function() {
			d.clipboard()
		},
		copy: function() {
			g() && d.copy(t(!0))
		},
		cute: function() {
			g() && d.cute(t(!0), ui.f5)
		},
		cuteDrag: function(a) {
			d.cuteDrag(t(!0), a, r)
		},
		copyDrag: function(a, b) {
			d.copyDrag(t(!0), a, r, b)
		},
		copyTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.copy_to
			}, function(a) {
				d.copyDrag(t(!0), a, r, !1)
			})
		},
		cuteTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.cute_to
			}, function(a) {
				d.cuteDrag(t(!0), a, r)
			})
		},
		past: function() {
			var a = G.thisPath;
			"split" == G.userConfig.listType && ($containBox = $(".split-box.split-select"), 1 == $containBox.length && (a = ui.fileLight.path($containBox))), d.past(a, r)
		},
		info: function() {
			c.info(t(!0))
		},
		newFile: function(a) {
			void 0 == a && (a = "txt"), p("file", n(LNG.newfile, a), a)
		},
		newFolder: function() {
			p("folder", n(LNG.newfolder), "")
		},
		shareFile: function() {
			var a = G.appHost + "share/file&sid=" + G.sid + "&user=" + G.user + "&path=" + urlEncode(t().path);
			window.open(a)
		},
		rname: q,
		list: h,
		setSearchByStr: l,
		setSelectByChar: k,
		setSelectByFilename: j
	}
});;
define("app/path/tpl/file/create.html", [], "<div class=\"file select {{if type=='file'}}menu-file{{else}}menu-folder{{/if}} file-icon-edit\" id=\"makefile\">\n	{{if listType=='list'}}<span class=\"children-more\"></span>{{/if}}\n	<div class=\"filename\" style=\"padding-top: 0px;\">\n		<span class=\"title\">\n			{{if type=='folder'}}\n				<div class='ico' filetype='folder'>{{\"folder\" | kod.core.icon}}</div>\n			{{else}}\n				<div class='ico' filetype='{{ext}}'>{{ext | kod.core.icon}}</div>\n			{{/if}}\n			<div class=\"textarea\">\n				{{if listType=='icon'}}\n				<textarea class='newfile fix'>{{newname}}</textarea>\n				{{else}}\n				<input class='newfile fix' value='{{newname}}'/>\n				{{/if}}\n			</div>\n		</span>\n	</div>\n	<div style=\"clear:both;\"></div>\n</div>\n");;
define("app/src/explorer/fileLight", [], function(a, b) {
	var c = $(),
		d = $(),
		e = function() {
			var a;
			a = "split" != G.userConfig.listType ? $(".bodymain .file-continer .file") : $(".bodymain .file-continer .split-select .file"), d = a, p("clear"), Hook.trigger("explorer.fileSelect.init", this)
		},
		f = function() {
			var a = $(Config.SelectClass);
			c = a, a.length > 1 && l(a), p("menu-file"), Hook.trigger("explorer.fileSelect.change", this)
		},
		g = function() {
			if (G.jsonData && G.jsonData.fileList) {
				var a = G.jsonData.fileList.length + G.jsonData.folderList.length;
				$(".file-select-info .item-num").html(a + LNG.folder_info_item)
			}
		},
		h = function() {
			var a = "",
				b = 0,
				d = c;
			0 != d.length && (a = d.length + LNG.folder_info_item_select, d.each(function() {
				b += parseInt($(this).attr("data-size"))
			}), 0 != b && (a = a + " (" + pathTools.fileSize(b) + ")")), $(".file-select-info .item-select").html(a)
		},
		i = function(a) {
			var b = c;
			if (void 0 == a && b && b.length >= 1 && (a = $(b[b.length - 1])), void 0 != a && !a.inScreen()) {
				var d = $(".bodymain");
				"split" == G.userConfig.listType && (d = a.parent());
				var e = a.offset().top - d.offset().top - d.height() / 2 + d.scrollTop();
				d.stop(!0).animate({
					scrollTop: e
				}, 100)
			}
		},
		j = function(a) {
			return core.pathThis(q(a))
		},
		k = function(a) {
			return a.find(".ico").attr("filetype")
		},
		l = function(a) {
			if (G.jsonData.info) switch (G.jsonData.info.pathType) {
			case G.KOD_USER_RECYCLE:
				return;
			case G.KOD_USER_FAV:
				return void a.removeClass("menu-fav-path").addClass("menu-fav-path-more");
			case G.KOD_USER_SHARE:
				if (-1 == trim(G.thisPath, "/").search("/")) return void a.removeClass("menu-share-path").addClass("menu-share-path-more");
			case G.KOD_GROUP_ROOT_SELF:
			case G.KOD_GROUP_ROOT_ALL:
				return void a.removeClass("menu-group-root").addClass("menu-group-root-more")
			}
			a.removeClass("menu-file menu-folder").addClass("menu-more"), p()
		},
		m = function(a) {
			var b = {
				"file-box": "menu-file",
				"folder-box": "menu-folder",
				"menu-recycle-path": "menu-recycle-path",
				"menu-share-path-more": "menu-share-path",
				"menu-fav-path-more": "menu-fav-path",
				"menu-group-root-more": "menu-group-root",
				"menu-default": "menu-default"
			};
			a.removeClass("menu-more");
			for (var c in b) a.hasClass(c) && a.addClass(b[c]);
			p()
		},
		n = function() {
			var a = [];
			if (0 != c.length) return c.each(function() {
				a.push(q($(this)))
			}), a
		},
		o = function() {
			if (0 != c.length) {
				var a = c;
				a.removeClass(Config.SelectClassName), a.each(function() {
					m($(this))
				}), c = $(), p(), Hook.trigger("explorer.fileSelect.change", this)
			}
		},
		p = function() {
			0 == c.length ? ($(".drop-menu-action li").addClass("disabled"), $(".drop-menu-action #past").removeClass("disabled"), $(".drop-menu-action #info").removeClass("disabled")) : $(".drop-menu-action li").removeClass("disabled")
		},
		q = function(a, b) {
			return void 0 == b && (b = "data-path"), void 0 != a.attr("data-path-children") && (b = "data-path-children"), pathHashDecode(a.attr(b))
		};
	return {
		init: e,
		name: j,
		path: q,
		type: k,
		fileListSelect: function(a) {
			return a && (c = a), c
		},
		fileListAll: function(a) {
			return a && (d = a), d
		},
		select: f,
		setInView: i,
		listNumberSet: g,
		selectNumSet: h,
		setMenu: l,
		resumeMenu: m,
		getAllName: n,
		clear: o,
		menuAction: p
	}
});;
define("app/src/explorer/fileSelect", [], function(a, b) {
	var c, d = !1,
		e = !1,
		f = !1,
		g = function() {
			$(Config.FileBoxClass).die("touchstart").live("touchstart", function(a, b, c, d) {
				var e = $(a.target);
				e.hasClass("item-menu") || e.parent().hasClass("item-menu") || e.hasClass("item-select") || e.parent().hasClass("item-select") || e.parents(".children-more").exists() || ($(this).hasClass("select") ? ui.path.open() : (ui.fileLight.clear(), $(this).removeClass("select"), $(this).addClass("select"), ui.fileLight.select()))
			}), $(Config.FileBoxClass).die("mouseenter").live("mouseenter", function(a) {
				e && j(!0, $(this)), d || e || $(this).addClass(Config.HoverClassName), $(this).unbind("mousedown").bind("mousedown", function(a) {
					if ($(a.target).is("input") || $(a.target).is("textarea")) return !0;
					if ($(this).focus(), $.contextMenu.hidden(), $(a.target).parents(".children-more").exists()) return ui.fileContent.pathChildrenTree($(this)), stopPP(a), !1;
					if ($(a.target).hasClass("item-menu") || $(a.target).parent().hasClass("item-menu")) return $(this).hasClass(Config.SelectClassName) ? void 0 : (ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select(), !0);
					if (!$(a.target).hasClass("item-select") && !$(a.target).parent().hasClass("item-select")) {
						if (!(a.ctrlKey || a.metaKey || a.shiftKey || $(this).hasClass(Config.SelectClassName))) return ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select(), !0;
						if (3 != a.which || $(this).hasClass(Config.SelectClassName) || (ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select()), (a.ctrlKey || a.metaKey) && ($(this).hasClass(Config.SelectClassName) ? f = !0 : (ui.fileLight.setMenu($(this)), $(this).addClass(Config.SelectClassName)), ui.fileLight.select()), a.shiftKey) {
							var b = w.fileListAll($(this)),
								c = w.fileListSelect($(this)),
								d = b.index($(this));
							if (0 == c.length) D(0, d, b);
							else {
								var e = b.index(c.first()),
									g = b.index(c.last());
								e > d ? D(d, g, b) : d > g ? D(e, d, b) : D(e, d, b)
							}
						}
						return !0
					}
				}).unbind("mouseup").bind("mouseup", function(a) {
					return $(".file-select-drag-temp").removeClass("file-select-drag-temp"), !0
				})
			}).die("mouseleave").live("mouseleave", function() {
				$(this).removeClass(Config.HoverClassName), e && j(!1, $(this))
			}).die("click").live("click", function(a) {
				if (stopPP(a), e) return !1;
				if ($(a.target).hasClass("item-menu") || $(a.target).parent().hasClass("item-menu")) {
					var b = $(this).find(".item-menu");
					return $(this).contextMenu({
						x: b.offset().left + b.width(),
						y: b.offset().top
					}), !0
				}
				return $(a.target).hasClass("item-select") || $(a.target).parent().hasClass("item-select") ? ($(this).toggleClass(Config.SelectClassName), ui.fileLight.select(), !0) : 0 != $(this).find(".textarea").length ? !0 : 0 != $(".file-draging-box").length ? !0 : void(a.ctrlKey || a.metaKey || a.shiftKey ? (a.ctrlKey || a.metaKey) && f && (f = !1, ui.fileLight.resumeMenu($(this)), $(this).removeClass(Config.SelectClassName), ui.fileLight.select()) : (ui.fileLight.clear(), $(this).addClass(Config.SelectClassName), ui.fileLight.select(), o($(this))))
			}), $(Config.FileBoxClass).myDbclick(function(a) {
				var b = $(a.target);
				if (b.is("textarea") || b.is("input") || b.hasClass("children-more") || b.hasClass("children-more-cert") || b.hasClass("item-menu") || b.parent().hasClass("item-menu") || b.hasClass("item-select") || b.parent().hasClass("item-select")) return !0;
				if (b.hasClass("db-click-rename")) {
					var c = b.parents(".file");
					return c.hasClass("systemBox"), ui.path.rname(), !0
				}
				if (a.altKey) ui.path.info();
				else {
					if (1 != ui.fileLight.fileListSelect().length) return !0;
					if ("split" == G.userConfig.listType && n($(this))) {
						var d = ui.fileLight.path($(this));
						return G.thisPath = "", $(".file-list-split .split-box").remove(), ui.path.list(d), !0
					}
					ui.path.open()
				}
			}), k(), l(), m(), Hook.bind("explorer.fileSelect.change", function() {
				ShareData.remove("FILE_SELECT_ARRAY")
			})
		},
		h = 1e3,
		i = function(a) {
			$(".file-select-drag-temp").flash(2, 100), setTimeout(function() {
				if ("list" == G.userConfig.listType) {
					if ($(".file-select-drag-temp .children-more-cert").hasClass("cert-open")) return;
					ui.fileContent.pathChildrenTree(a)
				} else if ("split" == G.userConfig.listType) o(a);
				else if ("icon" == G.userConfig.listType) {
					var b = ui.fileLight.path(a);
					ui.path.list(b)
				}
			}, 300)
		},
		j = function(a, b) {
			var d = "file-select-drag-temp";
			a ? !b.hasClass(Config.TypeFolderClass) && !b.hasClass("menu-recycle-button") || b.hasClass(Config.SelectClassName) || ($("." + d).removeClass(d), b.addClass(d), $(".children-list-dropover").removeClass("children-list-dropover"), $(".file-select-over-temp").removeClass("file-select-over-temp"), c = setTimeout(function() {
				i(b)
			}, h)) : (b.removeClass(d), clearTimeout(c), c = !1)
		},
		k = function() {
			var a;
			$("#folder-list-tree a").die("mouseenter").live("mouseenter", function(b) {
				if (e) {
					if (($(this).hasClass("menu-tree-folder") || $(this).hasClass("menu-tree-folder-fav") || $(this).hasClass("menu-tree-root") || $(this).hasClass("menu-tree-group-public") || $(this).hasClass("menu-tree-group-self")) && $(this).addClass("curDropTreeNode"), $(this).hasClass("menu-tree-fav")) {
						var c = $(this).parent().attr("id"),
							d = ui.tree.zTree().getNodeByTId(c);
						"folder" == d.type && core.pathPre(d.path) == G.KOD_GROUP_PATH && $(this).addClass("curDropTreeNode")
					}
					clearTimeout(a), a = !1;
					var f = ui.tree.zTree(),
						g = f.getNodeByTId($(this).parent().attr("id"));
					!g.open && g.isParent && (a = setTimeout(function() {
						f.expandNode(g, !0)
					}, h))
				}
			}).die("mouseup").live("mouseup", function() {
				if (e) {
					$(this).removeClass("curDropTreeNode"), clearTimeout(a), a = !1;
					var b = ui.tree.zTree(),
						c = b.getNodeByTId($(this).parent().attr("id"));
					setTimeout(function() {
						c.isParent = !0, b.reAsyncChildNodes(c, "refresh")
					}, 100)
				}
			}).die("mouseleave").live("mouseleave", function() {
				e && ($(this).removeClass("curDropTreeNode"), clearTimeout(a), a = !1)
			})
		},
		l = function() {
			var a;
			$(".header-middle .yarnlet a").die("mouseenter").live("mouseenter", function(b) {
				e && ($(this).addClass("curDropToPath"), a = setTimeout(function() {
					var a = $(".curDropToPath");
					a.flash(2, 100), setTimeout(function() {
						ui.path.list(a.attr("data-path"))
					}, 300)
				}, h))
			}).die("mouseup mouseleave").live("mouseup mouseleave", function() {
				e && ($(this).removeClass("curDropToPath"), clearTimeout(a), a = !1)
			})
		},
		m = function() {
			var a = function(a, b, c) {
					if (e && "list" == G.userConfig.listType) {
						$(".file-select-over-temp").removeClass("file-select-over-temp");
						var d = "children-list-dropover";
						if (b) {
							if ($(".file-select-drag-temp").exists()) return void $("." + d).removeClass(d);
							$("." + d).not(a).removeClass(d), a.addClass(d), a.prev().hasClass("file") && a.prev().addClass("file-select-over-temp")
						} else a.removeClass(d)
					}
				};
			$(".menu-body-main").bind("mouseover", function(b) {
				a($(this), !0, b)
			}).bind("mouseup mouseleave", function(b) {
				a($(this), !1, b)
			}), $(".children-list").die("mouseover").live("mouseover", function(b) {
				a($(this), !0, b), stopPP(b)
			}).die("mouseup mouseleave").live("mouseup mouseleave", function(b) {
				a($(this), !1, b)
			})
		},
		n = function(a) {
			return "icon" == G.userConfig.listType ? a.hasClass("folder-box") || a.hasClass("menu-recycle-button") ? !0 : !1 : "list" == G.userConfig.listType ? a.hasClass("folder-box") || a.hasClass("menu-recycle-button") || 0 != a.find(".children-more-cert").length ? !0 : !1 : "split" == G.userConfig.listType ? a.hasClass("folder-box") || a.hasClass("menu-recycle-button") || 0 != a.find(".children-more-cert").length ? !0 : !1 : void 0
		},
		o = function(a) {
			if ("split" == G.userConfig.listType && n(a)) {
				var b = ui.fileLight.path(a);
				ui.path.history.add(b), ui.fileContent.pathChildrenSplit(b, function() {
					q(b)
				})
			}
		},
		p = function() {
			var a = ".file-list-split .split-box",
				b = "split-hover";
			$(a).live("mouseenter", function(c) {
				$(a).removeClass(b), $(this).addClass(b)
			}).die("mouseleave").live("mouseleave", function() {
				$(this).removeClass(b)
			}).die("click").live("click", function(a) {
				q(ui.fileLight.path($(this)))
			}).die("mousedown").live("mousedown", function(a) {
				var b = $(a.target).parents(".file");
				(0 == b.length || 0 == b.find(".children-open").length) && q(ui.fileLight.path($(this)))
			})
		},
		q = function(a) {
			var b = $(".file-list-split .split-box"),
				c = $('.file-list-split .split-box[data-path="' + pathHashEncode(a) + '"]'),
				d = $('.file-list-split .split-box .file[data-path="' + pathHashEncode(a) + '"]'),
				e = "split-select";
			0 == c.length && (c = b.last()), b.removeClass(e), c.addClass(e), 0 == ui.fileLight.fileListSelect().length && d.addClass("select"), ui.fileLight.select();
			var f = c.data("jsonData");
			f && a && (ui.fileContent.pathTypeChange(f), G.thisPath = a, G.jsonData = f, ui.headerAddress.addressSet()), ui.fileLight.init()
		},
		r = function(a) {
			return a.hasClass("menuSharePath") || a.hasClass("systemBox") ? !1 : !0
		},
		s = function(a) {
			$("body").removeClass("cursor-mouse cursor-warning cursor-move cursor-down cursor-add"), a && $("body").addClass("cursor-mouse cursor-" + a)
		},
		t = function() {
			var a, b, f, g = 150,
				h = !1,
				i = !1,
				j = 0,
				k = !1,
				l = -15,
				m = 10,
				n = 0,
				o = 0,
				p = "selectDragDraging";
			$(Config.FileBoxClass).die("mousedown").live("mousedown", function(b) {
				if (!b.shiftKey) {
					if (ui.isEdit()) return !0;
					if (1 != b.which || d) return !0;
					a = $(this), u(b), $.browser.mozilla || this.setCapture && this.setCapture(), $(document).mousemove(function(a) {
						v(a)
					}), $(document).keydown(function(a) {
						v(a)
					}), $(document).keyup(function(a) {
						v(a)
					}), $(document).one("mouseup", function(a) {
						y(a), this.releaseCapture && this.releaseCapture()
					}), $(document).one("keyup", function(a) {
						27 == a.which && y(!1)
					})
				}
			});
			var q, t, u = function(a) {
					$.contextMenu.hidden(), e = !0, j = $.now(), n = a.pageY, o = a.pageX, b = $(document).height(), f = $(document).width(), i = $(a.target).parents(".file")
				},
				v = function(c) {
					if (!e) return !0;
					if (!r(a)) return !0;
					if (window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), $.now() - j > g && !k && (z(), h = $(".draggable-dragging"), h.attr("data-beforeInfo", h.find("span").html())), k) {
						var d = c.clientX >= f - 50 ? f - 50 : c.clientX,
							i = c.clientY >= b - 50 ? b - 50 : c.clientY;
						return d = 0 >= d ? 0 : d, i = 0 >= i ? 0 : i, d -= l, i -= m, h.css({
							left: d,
							top: i
						}), w(c), K(d - o + l, i - n + m), !0
					}
				},
				w = function(a) {
					clearTimeout(q), q = !1, q = setTimeout(function() {
						try {
							x(a)
						} catch (b) {}
					}, 10)
				},
				x = function(a) {
					var b = a.ctrlKey || a.metaKey,
						c = function(a, b) {
							"undefined" != typeof G.sid && (a = "none"), void 0 != b && 0 !== b.search(G.KOD_GROUP_PATH) && 0 !== b.search(G.KOD_USER_RECYCLE) && core.isSystemPath(b) && (a = "clear");
							var c = htmlEncode(core.pathThis(b)),
								d = " " + h.attr("data-beforeInfo").replace(/<[^<>]+>/g, ""),
								e = {
									copyTo: '<i class="font-icon bg-ok icon-copy"></i><b>' + LNG.copy_to + '</b>"' + c + '"',
									moveTo: '<i class="font-icon bg-ok icon-share-alt"></i><b>' + LNG.cute_to + '</b>"' + c + '"',
									remove: '<i class="font-icon bg-error icon-trash"></i><b>' + LNG.remove + d + "</b>",
									share: '<i class="font-icon bg-ok icon-share-sign"></i><b>' + LNG.share + d + "</b>",
									none: '<i class="font-icon bg-error icon-minus"></i><b>' + LNG.no_permission_write + "</b>",
									clear: h.attr("data-beforeInfo")
								};
							C(b) || (e.copyTo = '<i class="font-icon bg-ok icon-copy"></i><b>' + LNG.clone + "</b>"), h.find("span").html(e[a]), h.attr("data-actionType", a), h.attr("data-actionPath", b), h.attr("id", "drag-action-" + a);
							var e = {
								copyTo: "add",
								moveTo: "move",
								remove: "move",
								share: "add",
								none: "default",
								clear: "default"
							};
							s(e[a])
						},
						d = G.thisPath,
						e = "";
					if ($(".curDropToPath").exists()) d = $(".curDropToPath").attr("data-path");
					else if ($(".curDropTreeNode").exists()) {
						var f = $(".curDropTreeNode").parent().attr("id"),
							g = ui.tree.zTree().getNodeByTId(f);
						d = g.path
					} else if ($(".file-select-drag-temp").exists()) d = ui.fileLight.path($(".file-select-drag-temp")), $(".file-select-drag-temp").hasClass("menu-recycle-button") && (e = "remove");
					else if ($(".children-list-dropover").exists()) {
						var i = $(".children-list-dropover");
						d = i.hasClass("children-list") ? pathHashDecode(i.attr("data-path-children")) : G.thisPath
					} else $(".split-hover").exists() ? d = ui.fileLight.path($(".split-hover")) : e = $(".recycle-hover").exists() ? "remove" : $(".share-hover").exists() && 1 == ui.fileLight.fileListSelect().length ? "share" : "clear";
					e && !b || (e = b ? "copyTo" : C(d) ? "moveTo" : "clear"), c(e, d)
				},
				y = function(a) {
					if (!e) return !1;
					if (clearTimeout(q), clearTimeout(c), e = !1, k = !1, $("body").removeClass(p), h) {
						h.addClass("animated-300").addClass("flipOutXLine").fadeOut(200, function() {
							h.remove(), h = !1
						}), $(".curDropToPath,.curDropTreeNode,.curDropTreeNode,.file-select-drag-temp,.children-list-dropover").removeClass("curDropToPath curDropTreeNode curDropTreeNode file-select-drag-temp children-list-dropover");
						var b = h.attr("data-actionType");
						if (L(-1 != $.inArray(b, ["copyTo", "moveTo", "remove", "share"]) ? !1 : !0), s(!1), a) {
							var d = function(a, b) {
									switch (ShareData.data("FILE_SELECT_ARRAY", A), a) {
									case "copyTo":
										ui.path.copyDrag(b, !0);
										break;
									case "moveTo":
										ui.path.cuteDrag(b);
										break;
									case "remove":
										ui.path.remove(!0);
										break;
									case "share":
										ui.path.share()
									}
								},
								f = h.attr("data-actionPath");
							d(b, f)
						}
					}
				},
				z = function() {
					$("body").addClass(p);
					var a = ui.fileLight.fileListSelect().length;
					$('<div class="file draggable-dragging"><div class="drag-number">' + a + '</div><span><i class="font-icon bg-default icon-ok"></i>' + a + " " + LNG.file + "</span></div>").appendTo("body"), k = !0, setTimeout(J, 20), B()
				},
				A = [],
				B = function() {
					A = [], ui.fileLight.fileListSelect().each(function() {
						A.push({
							path: ui.fileLight.path($(this)),
							type: "folder" == ui.fileLight.type($(this)) ? "folder" : "file"
						})
					})
				},
				C = function(a) {
					for (var b = 0; b < A.length; b++) if (core.pathFather(A[b].path) != a) return !0;
					return !1
				},
				D = 0,
				E = 5,
				F = 35,
				H = 20,
				I = 50,
				J = function() {
					clearTimeout($(".file-draging-box").data("removeDelay")), $(".file-draging .file").stop(), $(".file-draging-box").remove();
					var a = {
						icon: "file-list-icon",
						list: "file-list-list",
						split: "file-list-split"
					},
						b = a[G.userConfig.listType];
					$("<div class='file-continer file-draging-box " + b + "'><div class='" + b + " file-draging'></div></div>").appendTo("body"), t = $(Config.SelectClass).filter("[data-path!='']");
					var c = t.clone();
					(t.length >= I || $.browser.msie) && (c = i.clone()), c.appendTo(".file-draging"), c.each(function(a) {
						var b = $(".bodymain .file-continer .file[data-path='" + $(this).attr("data-path") + "']"),
							d = b.offset();
						$(this).css({
							left: d.left,
							top: d.top,
							width: b.width()
						}), $(this).data({
							"data-left": d.left,
							"data-top": d.top,
							"data-animateTime": 200 + a * E,
							"data-sizeAdd": D * a
						}), $(this).attr("data-path") == i.attr("data-path") && $(this).addClass("handle_target"), 1 == c.length && ($(this).data({
							"data-animateTime": 0
						}), H = 0)
					}), t.addClass("item-file-draging");
					var d = setTimeout(function() {
						$(".file-draging-box").data("animate", "finished");
						var a = $(".draggable-dragging");
						c.each(function(b) {
							var c = $(this),
								d = $(this).data("data-sizeAdd"),
								e = $(this).data("data-animateTime");
							$(this).data("status", "ready"), $(this).animate({
								opacity: 1
							}, {
								duration: e,
								easing: "swing",
								progress: function(b, e, f, g, h) {
									var i = c.offset(),
										j = a.offset(),
										k = (j.left + d - i.left) * e,
										l = (j.top + d + F - i.top) * e;
									c.css({
										left: i.left + k,
										top: i.top + l
									})
								},
								complete: function() {
									c.data("status", "finished")
								}
							})
						})
					}, H);
					$(".file-draging-box").data("dragDelay", d), $(".file-draging-box").data("animate", "ready")
				},
				K = function(a, b) {
					return "finished" != $(".file-draging-box").data("animate") ? void $(".file-draging .file").each(function() {
						$(this).css({
							left: $(this).data("data-left") + a,
							top: $(this).data("data-top") + b
						})
					}) : void $(".file-draging .file").each(function(a) {
						if ("finished" == $(this).data("status")) {
							var b = $(this).data("data-sizeAdd"),
								c = $(".draggable-dragging").offset();
							$(this).css({
								left: c.left + b,
								top: c.top + b + F
							})
						}
					})
				},
				L = function(a) {
					var b = $(".file-draging .file").length;
					clearTimeout($(".file-draging-box").data("dragDelay")), $(".file-draging .file").each(function(b) {
						var c = b * E,
							d = $(".bodymain .file-continer .file[data-path='" + $(this).attr("data-path") + "']");
						a ? $(this).stop().animate({
							left: $(this).data("data-left"),
							top: $(this).data("data-top")
						}, 250 + c, function() {
							t.removeClass("item-file-draging")
						}).animate({
							opacity: 0
						}, 150, function() {
							$(this).remove()
						}) : (d.stop().animate({
							opacity: 1
						}, 100), $(this).stop().animate({
							opacity: 0
						}, 200 + c, function() {
							$(this).remove()
						}))
					});
					var c = setTimeout(function() {
						$(".file-draging-box").remove()
					}, 400 + E * b);
					$(".file-draging-box").data("removeDelay", c)
				}
		},
		u = function() {
			var a = null,
				b = null,
				c = null,
				f = 0,
				g = 0,
				h = 0,
				i = 0,
				j = "",
				k = "bodymain";
			core.isApp("desktop") && (k = "file-continer");
			var l = $("." + k);
			l.die("mousedown").live("mousedown", function(a) {
				if (!($(a.target).hasClass(k) && $(document).width() - a.pageX < 20)) {
					if (h = $(".file-continer").outerHeight(), i = l.outerHeight(), ui.isEdit()) return !0;
					if (1 != a.which || e) return !0;
					m(a), this.setCapture && this.setCapture(), $(document).unbind("mousemove").mousemove(function(a) {
						n(a)
					}), $(document).one("mouseup", function(a) {
						clearTimeout(j), j = !1, q(a), this.releaseCapture && this.releaseCapture()
					})
				}
			});
			var m = function(e) {
					g = l.offset().left - l.scrollLeft(), f = l.offset().top - l.scrollTop(), "split" == G.userConfig.listType && (f += $(e.target).parents(".split-box").scrollTop()), $(e.target).parent().hasClass(Config.FileBoxClassName) || $(e.target).parent().parent().hasClass(Config.FileBoxClassName) || $(e.target).hasClass("fix") || ($.contextMenu.hidden(), e.ctrlKey || e.metaKey || e.shiftKey || ui.fileLight.clear(), $(e.target).hasClass("ico") || (a = e.pageX - g, b = e.pageY - f, j = setTimeout(function() {
						d = !0, 0 == $(".select-container").length && $('<div class="select-container"></div>').appendTo(Config.FileBoxSelector), c = $(".select-container")
					}, 100)))
				},
				n = function(e) {
					if (!d) return !0;
					var f = e.pageX - l.offset().left + l.scrollLeft(),
						g = e.pageY - l.offset().top + l.scrollTop(),
						j = Math.abs(f - a),
						k = Math.abs(g - b);
					g > b && k > h - b && h > i && (k = h - b), o(g, b, k, l), c.css({
						left: Math.min(f, a) + 2,
						top: Math.min(g, b) + 2,
						width: j,
						height: k
					}), ui.fileLight.fileListAll().length < 1e3 && p()
				},
				o = function(a, b, c, d) {
					var e = d.outerHeight(),
						f = d.scrollTop(),
						g = f;
					if (a > b) {
						var h = b + c,
							i = e + f,
							j = h - i;
						j > 0 ? g += j : -e > j && (g += e - Math.abs(j))
					} else if (b > a) {
						var k = b - c,
							l = f,
							j = k - l;
						0 > j ? g += j : j > e && (g += Math.abs(j) - e)
					}
					g !== f && d.stop(!0, !1).animate({
						scrollTop: g
					}, 100)
				},
				p = function() {
					for (var a = c.offset().left - l.offset().left + l.scrollLeft(), b = c.offset().top - l.offset().top + l.scrollTop(), d = a + c.width(), e = b + c.height(), f = ui.fileLight.fileListAll(), g = 0; g < f.length; g++) {
						var h = f[g],
							i = $(f[g]),
							j = i.parent().scrollTop(),
							k = h.offsetLeft,
							m = h.offsetTop - j,
							n = k + i.width(),
							o = m + i.height();
						if ("split" == G.userConfig.listType && (k += i.parents(".split-box")[0].offsetLeft, n = k + i.width()), Math.abs(a + d - (k + n)) < d - a + n - k && Math.abs(b + e - (m + o)) < e - b + o - m) {
							if (!i.hasClass("file-select-drag-temp")) {
								if (i.hasClass("selectToggleClass")) continue;
								if (i.hasClass(Config.SelectClassName)) {
									i.removeClass(Config.SelectClassName).addClass("selectToggleClass"), ui.fileLight.resumeMenu(i);
									continue
								}
								i.addClass("file-select-drag-temp")
							}
						} else i.removeClass("file-select-drag-temp"), i.hasClass("selectToggleClass") && i.addClass(Config.SelectClassName).removeClass("selectToggleClass")
					}
				},
				q = function(e) {
					return d ? (p(), c.remove(), $(".file-select-drag-temp").addClass(Config.SelectClassName).removeClass("file-select-drag-temp"), $(".selectToggleClass").removeClass("selectToggleClass"), ui.fileLight.select(), d = !1, a = null, void(b = null)) : !1
				}
		},
		v = function(a, b) {
			var c = $(".file-list-split .split-box.split-select");
			if (a) c = a.parents(".split-box");
			else if (0 != ui.fileLight.fileListSelect().length) {
				var d = ui.fileLight.fileListSelect().last();
				c = d.parents(".split-box")
			}
			return c.find(b)
		},
		w = {
			fileListAll: function(a) {
				return "split" != G.userConfig.listType ? ui.fileLight.fileListAll() : v(a, ".file")
			},
			fileListSelect: function(a) {
				return "split" != G.userConfig.listType ? ui.fileLight.fileListSelect() : v(a, ".file.select")
			}
		},
		x = function(a) {
			var b = w.fileListAll(),
				c = w.fileListSelect(),
				d = b.length - 1,
				e = 0,
				f = ui.getColfileNumberDesktop(),
				g = b.index(c.first()),
				h = b.index(c.last());
			switch (a) {
			case "pageup":
			case "up":
				e = 0 >= g || g % f == 0 ? g : g - 1;
				break;
			case "left":
				e = 0 >= g - f ? 0 : g - f;
				break;
			case "pagedown":
			case "down":
				e = h >= d || (h + 1) % f == 0 ? h : h + 1;
				break;
			case "right":
				e = h + f >= d ? d : h + f
			}
			return b.eq(e)
		},
		y = function(a) {
			if (core.isApp("desktop")) return x(a);
			var b = w.fileListAll(),
				c = w.fileListSelect(),
				d = b.length - 1,
				e = 0,
				f = ui.getRowfileNumber(),
				g = ui.getPagefileNumber(),
				h = b.index(c.first()),
				i = b.index(c.last());
			switch (a) {
			case "up":
				e = 0 >= h - f ? 0 : h - f, e = z(e, !1);
				break;
			case "left":
				e = 0 >= h ? 0 : h - 1;
				break;
			case "down":
				e = i + f >= d ? d : i + f, e = z(e, !0);
				break;
			case "right":
				e = i >= d ? i : i + 1;
				break;
			case "pageup":
				e = 0 >= h - g ? 0 : h - g, e = z(e, !1);
				break;
			case "pagedown":
				e = i + g >= d ? d : i + g, e = z(e, !0)
			}
			return b.eq(e)
		},
		z = function(a, b) {
			for (var c = w.fileListAll(), d = c.eq(a), e = c.length; 0 != d.parents(".hidden").length;) {
				if (b ? a++ : a--, 0 >= a || a >= e) return a;
				d = c.eq(a)
			}
			return a
		},
		A = function(a) {
			var b, c = w.fileListAll(),
				d = w.fileListSelect(),
				e = "",
				f = !1;
			switch (a.indexOf("shift+") >= 0 && (f = !0, a = a.replace("shift+", "")), a) {
			case "home":
				e = d.last(), b = c.first();
				break;
			case "end":
				e = d.first(), b = c.last();
				break;
			case "left":
				e = d.last(), b = y(a);
				break;
			case "up":
				e = d.last(), b = y(a);
				break;
			case "right":
				e = d.first(), b = y(a);
				break;
			case "down":
				e = d.first(), b = y(a);
				break;
			case "pageup":
				e = d.last(), b = y(a);
				break;
			case "pagedown":
				e = d.first(), b = y(a);
				break;
			case "clear":
				return void ui.fileLight.clear();
			case "reverse":
				return c.each(function() {
					$(this).toggleClass(Config.SelectClassName)
				}), ui.fileLight.select(), void ui.fileLight.setInView();
			case "all":
				b = c
			}
			if (!C(a)) {
				if (f && "" != e) {
					var g = c.index(e),
						h = c.index(b);
					if (g > h) {
						var i = g;
						g = h, h = i
					}
					return void D(g, h, c)
				}
				B(b)
			}
		},
		B = function(a) {
			0 != a.length && (ui.fileLight.clear(), a.addClass(Config.SelectClassName), ui.fileLight.select(), ui.fileLight.setInView(), "split" == G.userConfig.listType && 1 == a.length && o($(ui.fileLight.fileListSelect()[0])))
		},
		C = function(a) {
			var b = $(ui.fileLight.fileListSelect()[0]);
			if ("icon" == G.userConfig.listType) return !1;
			switch (a) {
			case "left":
				if ("list" == G.userConfig.listType) if (1 == b.find(".children-more-cert.cert-open").length) b.find(".children-more-cert").removeClass("cert-open"), b.next().addClass("hidden");
				else {
					var c = b.parent(".children-list").prev(".file");
					B(c)
				} else if ("split" == G.userConfig.listType) {
					var c = b.parents(".split-box").prev().find(".select-split-parent");
					B(c)
				}
				break;
			case "right":
				if ("list" == G.userConfig.listType) 1 == b.find(".children-more-cert").length && (ui.fileContent.pathChildrenTree(b), b.find(".children-more-cert").addClass("cert-open"), b.next().removeClass("hidden"));
				else if ("split" == G.userConfig.listType) {
					var c = b.parents(".split-box").next().find(".file:eq(0)");
					B(c)
				}
				break;
			default:
				return !1
			}
			return !0
		},
		D = function(a, b, c) {
			if (core.isApp("desktop")) return E(a, b, c);
			ui.fileLight.clear();
			for (var d = a; b >= d; d++) $(c[d]).addClass(Config.SelectClassName);
			ui.fileLight.select()
		},
		E = function(a, b, c) {
			var d = ui.getColfileNumberDesktop(),
				e = Math.ceil(w.fileListAll().length / d),
				a = {
					row: a % d,
					col: parseInt(a / d)
				},
				b = {
					row: b % d,
					col: parseInt(b / d)
				};
			if (b.row < a.row) {
				var f = b;
				b = a, a = f
			}
			var g = function(a, b) {
					var e = b * d + a;
					$(c[e]).addClass(Config.SelectClassName)
				};
			ui.fileLight.clear();
			for (var h = a.row; h <= b.row; h++) {
				var i = 0,
					j = e;
				h == a.row && (i = a.col), h == b.row && (j = b.col);
				for (var k = i; j >= k; k++) g(h, k)
			}
			ui.fileLight.select()
		};
	return {
		init: function() {
			g(), p(), t(), u()
		},
		isDraging: function() {
			return e
		},
		selectSplit: q,
		selectPos: A
	}
});;
define("app/src/explorer/fileListResize", [], function(a, b) {
	var c = {
		filename: 250,
		filetype: 80,
		filesize: 80,
		filetime: 150,
		explorerTreeWidth: 199,
		editorTreeWidth: 199
	},
		d = {
			filename: 150,
			filetype: 60,
			filesize: 60,
			filetime: 120,
			explorerTreeWidth: 2,
			editorTreeWidth: 2
		},
		e = c,
		f = function() {
			if (LocalData.get("resizeConfig")) e = jsonDecode(LocalData.get("resizeConfig"));
			else {
				"undefined" != typeof G.userConfig.resizeConfig && (e = jsonDecode(htmlDecode(G.userConfig.resizeConfig)));
				var a = jsonEncode(e);
				LocalData.set("resizeConfig", a)
			}
			$.each(c, function(a, b) {
				(!e[a] || e[a] < d[a]) && (e[a] = c[a])
			})
		},
		g = function() {
			if (!j()) {
				var a = jsonEncode(e);
				LocalData.set("resizeConfig", a), $.get(G.appHost + "setting/set&k=resizeConfig&v=" + a)
			}
		},
		h = function(a, b) {
			if ("icon" != G.userConfig.listType) {
				a || (a = e);
				var c = "",
					f = 0;
				$.each(a, function(a, b) {
					0 == a.indexOf("file") && (b <= d[a] && (b = d[a]), f += b, c += ".children-list,.file-list-list .file ." + a + ",#main-title ." + a + "{width:" + b + "px;}")
				}), c += ".children-list,.file-list-list .file{width:" + (f + 50) + "px;}", $.setStyle(c, "header-resize-width")
			}
		},
		i = function(a, b, f) {
			if (!$(".frame-left").is(":hidden")) {
				var h = Config.pageApp + "TreeWidth",
					i = $.extend(!0, {}, e);
				i[h] += a, i[h] <= d[h] && (i[h] = d[h]);
				var j = i[h],
					k = $(".frame-left"),
					l = $(".frame-resize"),
					m = $(".frame-right"),
					n = c[h];
				if (j > n - 8 && n + 8 > j && (j = n + 1), f) {
					var o = 400;
					k.animate({
						width: j
					}, o), l.animate({
						left: j - 5
					}, o), m.animate({
						left: j
					}, o)
				} else k.css("width", j), l.css("left", j - 5), m.css("left", j);
				"undefined" != typeof ui.setStyle && ui.setStyle(), b && (e = i, g())
			}
		},
		j = function() {
			return void 0 != $.getUrlParam("type") ? !0 : !1
		},
		k = function(a, b, c) {
			var f = $.extend(!0, {}, e);
			f[a] += b, h(f), c && (e = f, $.each(e, function(a, b) {
				b <= d[a] && (e[a] = d[a])
			}), g())
		},
		l = function() {
			$("#main-title").hasClass("bind-init") || (h(e), $("#main-title").addClass("bind-init"), $.each(c, function(a, b) {
				$("#main-title ." + a + "-resize").drag({
					start: function() {},
					move: function(b, c) {
						k(a, b, !1)
					},
					end: function(b, c) {
						k(a, b, !0)
					}
				})
			}))
		},
		m = function() {
			var a = $(".frame-resize");
			a.drag({
				start: function() {
					a.addClass("active"), $(".resize-mask").css("display", "block")
				},
				move: function(a, b) {
					i(a, !1, !1)
				},
				end: function(b, c) {
					i(b, !0, !1), a.removeClass("active"), $(".resize-mask").css("display", "none")
				}
			})
		},
		n = function() {
			var a = "fileIconSize";
			core.isApp("desktop") && (a = "fileIconSizeDesktop");
			var b = G.userConfig[a];
			b || (b = "75"), q(b, !1), o(b)
		},
		o = function(a) {
			$(".set-file-icon-size .file-icon-size").removeClass("selected");
			for (var b = [
				["40", "box-size-smallx"],
				["60", "box-size-small"],
				["80", "box-size-default"],
				["100", "box-size-big"],
				["120", "box-size-bigx"]
			], c = 10, d = "", e = 0; e < b.length; e++) {
				var f = parseInt(b[e][0]);
				if (a >= f - c && f + c >= a) {
					d = b[e][1];
					break
				}
			}
			"" != d && $("." + d).addClass("selected")
		},
		p = function(a) {
			var b = "fileIconSize";
			core.isApp("desktop") && (b = "fileIconSizeDesktop"), G.userConfig[b] = a, o(a), $.get(G.appHost + "setting/set&k=" + b + "&v=" + a)
		},
		q = function(a, b) {
			var c = a,
				d = 105,
				e = 30,
				f = 250;
			core.isApp("desktop") && (e = 40, f = 150), c = e >= c ? e : c, c = c >= f ? f : c;
			var g = (a - e) * d / (f - e),
				h = 20,
				i = 10,
				j = parseInt(c),
				k = j + 2 * h - i + 5,
				l = j - i,
				m = j - i,
				n = .4 * j,
				o = j + 3 * h - i,
				q = ".file-list-icon div.file,.file-list-icon .flex-empty{height:" + k + "px;width:" + j + "px;}";
			core.isApp("desktop") && (k -= 5, q = "div.file-list-icon div.file,.file-list-icon .flex-empty{height:" + k + "px;width:" + j + "px;}"), $.browser.mozilla && (m -= 4);
			var r = "div.file-list-icon div.file{max-height:" + o + "px;}" + q + "			.file-list-icon .meta-info{height:" + n + "px;width:" + n + "px;				margin-right:" + .16 * n + "px;margin-top:-" + 1.1 * n + "px;}			.file-list-icon div.file .filename{width:" + j + "px;}			.file-list-icon div.file .filename #pathRenameTextarea,			.file-list-icon div.file .filename .newfile{width:" + j + "px;}			.file-list-icon div.file .ico{padding-left:" + i / 2 + "px;height:" + m + "px;width:" + l + "px}        	.file-list-icon div.file .ico.picture{width:" + l + "px;padding-left:" + i / 2 + "px;overflow:hidden;display:block;}        	";
			$.setStyle(r, "file_icon_resize"), $(".slider-handle").css("top", g), b && p(a)
		},
		r = function() {
			var a, b = $(".slider-handle");
			$(".set-icon-size-slider").bind("click", function(a) {
				return stopPP(a), !1
			});
			var c = function(b) {
					var c = 0,
						d = 105,
						e = 30,
						f = 250,
						g = a + b;
					g = c > g ? c : g, g = g > d ? d : g;
					var h = parseInt(g / d * (f - e) + e);
					return q(h, !1), h
				};
			b.drag({
				start: function(c) {
					b.addClass("active"), a = parseInt(b.css("top"))
				},
				move: function(a, b, d) {
					c(b)
				},
				end: function(a, d, e) {
					b.removeClass("active"), p(c(d), !0)
				}
			});
			var d = $(".slider-bg");
			$(".slider-bg").unbind("click").bind("click", function(b) {
				var e = b.clientY - d.offset().top;
				a = 0, p(c(e), !0)
			})
		},
		s = function() {
			var a = function(a, b) {
					var c = a.parent(),
						d = $(".split-box").index(c),
						e = parseInt(c.data("before_width")) + b;
					if (!(150 > e)) {
						$($(".split-line").get(d)).css("width", e), c.css("width", e), $(".split-box:gt(" + d + ")").each(function() {
							$(this).hasClass("is-drag-split") || $(this).css("left", parseInt($(this).data("before_left")) + b + "px")
						});
						var f = [];
						$(".split-box").each(function() {
							f.push({
								left: $(this).css("left"),
								width: $(this).width()
							})
						}), LocalData.set("splitBoxSize", jsonEncode(f))
					}
				};
			$(".bodymain .file-list-split .split-drag").drag({
				start: function(a, b) {
					var c = b.parent();
					c.addClass("is-drag-split").data("before_width", c.width()), $(".split-box,.split-line").each(function() {
						$(this).data("before_left", $(this).css("left"))
					})
				},
				move: function(b, c, d, e) {
					a(e, b)
				},
				end: function(a, b, c, d) {
					d.parent().removeClass("is-drag-split")
				}
			}, !0), $(".file.select-split-parent").removeClass("select-split-parent"), $(".split-box").each(function() {
				$('.file[data-path="' + $(this).attr("data-path") + '"]').addClass("select-split-parent")
			}), t()
		},
		t = function() {
			var a = LocalData.get("splitBoxSize"),
				b = 0;
			a = !a || jsonDecode(a) ? [] : jsonDecode(a);
			var c = function(c, d) {
					var e = a[d];
					e || (e = {
						width: 250,
						left: b
					}), b += e.width + 1, c.css({
						width: e.width + "px",
						left: e.left
					})
				};
			b = 0, $(".split-box").each(function(a) {
				c($(this), a)
			}), b = 0, $(".split-line").each(function(a) {
				c($(this), a)
			}), $(".bodymain").scrollLeft(1e5)
		};
	return {
		init: function() {
			f(), j() && (e = c), h(e), m(), i(0, !1, !0), r()
		},
		initFileSize: n,
		bindSplitResize: s,
		bindHeaderResize: l,
		setFileIconSize: q
	}
});;
define("app/src/explorer/headerAddress", [], function(a, b) {
	var c = function() {
			$("#yarnball li a").die("click").live("click", function(a) {
				var b = $(this).attr("data-path");
				g(b), stopPP(a)
			}), $("#yarnball").die("click").live("click", function() {
				return $("#yarnball").css("display", "none"), $("#yarnball-input").css("display", "block"), $("#yarnball-input input").focus(), !0
			});
			var a = $("#yarnball-input input");
			a.die("blur").live("blur", function() {
				g(a.val())
			}).keyEnter(function() {
				g(a.val())
			}), $(".header-right input").keyEnter(function(a) {
				ui.path.search($(".header-right input").val(), G.thisPath)
			}), $(".header-right input").bind("keyup focus", function() {
				ui.path.setSearchByStr($(this).val())
			}), $(".header-content a,.header-content button").click(function(a) {
				var b = $(this).attr("id");
				switch (b) {
				case "btn-history-back":
					ui.path.history.back();
					break;
				case "btn-history-next":
					ui.path.history.next();
					break;
				case "refresh":
					ui.f5(!0, !0), ui.tree.init();
					break;
				case "home":
					ui.path.list(G.myhome);
					break;
				case "fav":
					ui.path.pathOperate.fav({
						path: G.thisPath,
						type: "folder",
						name: $("ul.yarnball li:last .title-name").html()
					});
					break;
				case "goto-father":
					h();
					break;
				case "setting":
					core.setting();
					break;
				case "search":
					ui.path.search($(".header-right input").val(), G.thisPath)
				}
				return !0
			})
		},
		d = function(a) {
			var b = G.thisPath;
			f(G.thisPath), $("#yarnball-input").css("display", "none"), $("#yarnball").css("display", "block");
			var c = function(a) {
					var b = '<li class="yarnlet first"><a title="@1@" data-path="@1@" style="z-index:{$2};"><span class="left-yarn"></span>{$3}</a></li>',
						c = '<li class="yarnlet "><a title="@1@" data-path="@1@" style="z-index:{$2};">{$3}</a></li>';
					a = a.replace(/\/+/g, "/");
					var d = a.split("/");
					"" == d[d.length - 1] && d.pop();
					var e = d[0] + "/",
						f = b.replace(/@1@/g, e),
						g = d[0],
						h = "";
					if (G.jsonData.info && G.jsonData.info.pathType && "" != d[0]) {
						var i = core.getPathIcon(G.jsonData.info, G.jsonData.info.name);
						h = '<span class="address-ico">' + core.iconSmall(i.icon) + "</span>", g = i.name
					}
					f = f.replace("{$2}", d.length), f = f.replace("{$3}", h + '<span class="title-name">' + htmlEncode(g) + "</span>");
					for (var j = f, k = 1, l = d.length - 1; k < d.length; k++, l--) {
						e += htmlEncode(d[k]) + "/";
						var f = c.replace(/@1@/g, e);
						f = f.replace("{$2}", l), f = f.replace("{$3}", '<span class="title-name">' + htmlEncode(d[k]) + "</span>"), j += f
					}
					return '<ul class="yarnball">' + j + "</ul>"
				};
			void 0 == a && $("#yarnball").html(c(b)), e()
		},
		e = function() {
			$(".yarnball").stop(!0, !0);
			var a = $("#yarnball").innerWidth(),
				b = 0;
			$("#yarnball li a").each(function(a) {
				b += $(this).outerWidth() + parseInt($(this).css("margin-left")) + 5
			});
			var c = a - b;
			0 >= c ? $(".yarnball").css("width", b + "px").css("left", c + "px") : $(".yarnball").css({
				left: "0px",
				width: a + "px"
			})
		},
		f = function(a) {
			var b = $("#yarnball-input .path");
			if (void 0 == a) {
				var c = b.val();
				return c = rtrim(core.pathClear(c)) + "/"
			}
			b.val(a)
		},
		g = function(a, b) {
			a = a.replace(/\\/g, "/"), ui.path.list(a), d(b)
		},
		h = function() {
			var a = f();
			if ("/" == a || -1 == a.indexOf("/")) return void Tips.tips(LNG.path_is_root_tips, "warning");
			var b = core.pathFather(a);
			ui.path.list(b), d()
		};
	return {
		init: c,
		addressSet: d,
		resetWidth: e,
		gotoFather: h
	}
});;
define("app/src/explorer/options", [], function(a, b) {
	var c = function() {
			"0" == _.get(window, "G.userConfig.fileSelect") && $.addStyle(".file-continer .file .item-select,			.file-continer .file .item-menu{display:none !important;}")
		},
		d = function() {
			"0" == _.get(window, "G.userConfig.imageThumb") && Hook.bind("explorer.list.fileThumb", function(a, b) {
				var c = "icon" != G.userConfig.listType,
					d = ["jpg", "jpeg", "png", "bmp", "gif", "ico", "svg", "cur", "webp"];
				return inArray(d, b) ? "<div class='picture ico' filetype='" + b + "'>" + core.icon(b, c) + "</div>" : void 0
			})
		};
	return {
		init: function() {
			c(), d()
		}
	}
});