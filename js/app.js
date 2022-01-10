/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var __webpack_modules__ = {
      86: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (e =
                Object.assign ||
                function (e) {
                  for (var t, i = 1, n = arguments.length; i < n; i++)
                    for (var s in (t = arguments[i]))
                      Object.prototype.hasOwnProperty.call(t, s) &&
                        (e[s] = t[s]);
                  return e;
                }).apply(this, arguments);
            },
            t = {
              scale: 1,
              zoom: !0,
              actualSize: !0,
              showZoomInOutIcons: !1,
              actualSizeIcons: { zoomIn: "lg-zoom-in", zoomOut: "lg-zoom-out" },
              enableZoomAfter: 300,
            },
            i = "lgContainerResize",
            n = "lgBeforeOpen",
            s = "lgAfterOpen",
            o = "lgSlideItemLoad",
            r = "lgAfterSlide",
            a = "lgRotateLeft",
            l = "lgRotateRight",
            c = "lgFlipHorizontal",
            d = "lgFlipVertical";
          return (function () {
            function u(i, n) {
              return (
                (this.core = i),
                (this.$LG = n),
                (this.settings = e(e({}, t), this.core.settings)),
                this
              );
            }
            return (
              (u.prototype.buildTemplates = function () {
                var e = this.settings.showZoomInOutIcons
                  ? '<button id="' +
                    this.core.getIdName("lg-zoom-in") +
                    '" type="button" aria-label="Zoom in" class="lg-zoom-in lg-icon"></button><button id="' +
                    this.core.getIdName("lg-zoom-out") +
                    '" type="button" aria-label="Zoom out" class="lg-zoom-out lg-icon"></button>'
                  : "";
                this.settings.actualSize &&
                  (e +=
                    '<button id="' +
                    this.core.getIdName("lg-actual-size") +
                    '" type="button" aria-label="View actual size" class="' +
                    this.settings.actualSizeIcons.zoomIn +
                    ' lg-icon"></button>'),
                  this.core.outer.addClass("lg-use-transition-for-zoom"),
                  this.core.$toolbar.first().append(e);
              }),
              (u.prototype.enableZoom = function (e) {
                var t = this,
                  i = this.settings.enableZoomAfter + e.detail.delay;
                this.$LG("body").first().hasClass("lg-from-hash") &&
                e.detail.delay
                  ? (i = 0)
                  : this.$LG("body").first().removeClass("lg-from-hash"),
                  (this.zoomableTimeout = setTimeout(function () {
                    t.isImageSlide() &&
                      (t.core
                        .getSlideItem(e.detail.index)
                        .addClass("lg-zoomable"),
                      e.detail.index === t.core.index && t.setZoomEssentials());
                  }, i + 30));
              }),
              (u.prototype.enableZoomOnSlideItemLoad = function () {
                this.core.LGel.on(o + ".zoom", this.enableZoom.bind(this));
              }),
              (u.prototype.getModifier = function (e, t, i) {
                var n = e;
                e = Math.abs(e);
                var s = this.getCurrentTransform(i);
                if (!s) return 1;
                var o = 1;
                if ("X" === t) {
                  var r = Math.sign(parseFloat(s[0]));
                  0 === e || 180 === e
                    ? (o = 1)
                    : 90 === e &&
                      (o =
                        (-90 === n && 1 === r) || (90 === n && -1 === r)
                          ? -1
                          : 1),
                    (o *= r);
                } else {
                  var a = Math.sign(parseFloat(s[3]));
                  if (0 === e || 180 === e) o = 1;
                  else if (90 === e) {
                    var l = parseFloat(s[1]),
                      c = parseFloat(s[2]);
                    o = Math.sign(l * c * n * a);
                  }
                  o *= a;
                }
                return o;
              }),
              (u.prototype.getImageSize = function (e, t, i) {
                return (
                  90 === Math.abs(t) && (i = "x" === i ? "y" : "x"),
                  e[{ y: "offsetHeight", x: "offsetWidth" }[i]]
                );
              }),
              (u.prototype.getDragCords = function (e, t) {
                return 90 === t
                  ? { x: e.pageY, y: e.pageX }
                  : { x: e.pageX, y: e.pageY };
              }),
              (u.prototype.getSwipeCords = function (e, t) {
                var i = e.targetTouches[0].pageX,
                  n = e.targetTouches[0].pageY;
                return 90 === t ? { x: n, y: i } : { x: i, y: n };
              }),
              (u.prototype.getDragAllowedAxises = function (e, t) {
                t = t || this.scale || 1;
                var i = this.imageYSize * t > this.containerRect.height,
                  n = this.imageXSize * t > this.containerRect.width;
                return 90 === e
                  ? { allowX: i, allowY: n }
                  : { allowX: n, allowY: i };
              }),
              (u.prototype.getCurrentTransform = function (e) {
                if (e) {
                  var t = window.getComputedStyle(e, null),
                    i =
                      t.getPropertyValue("-webkit-transform") ||
                      t.getPropertyValue("-moz-transform") ||
                      t.getPropertyValue("-ms-transform") ||
                      t.getPropertyValue("-o-transform") ||
                      t.getPropertyValue("transform") ||
                      "none";
                  return "none" !== i
                    ? i.split("(")[1].split(")")[0].split(",")
                    : void 0;
                }
              }),
              (u.prototype.getCurrentRotation = function (e) {
                if (!e) return 0;
                var t = this.getCurrentTransform(e);
                return t
                  ? Math.round(
                      Math.atan2(parseFloat(t[1]), parseFloat(t[0])) *
                        (180 / Math.PI)
                    )
                  : 0;
              }),
              (u.prototype.setZoomEssentials = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first(),
                  t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-rotate")
                    .first()
                    .get();
                (this.rotateValue = this.getCurrentRotation(t)),
                  (this.imageYSize = this.getImageSize(
                    e.get(),
                    this.rotateValue,
                    "y"
                  )),
                  (this.imageXSize = this.getImageSize(
                    e.get(),
                    this.rotateValue,
                    "x"
                  )),
                  (this.containerRect = this.core.outer
                    .get()
                    .getBoundingClientRect()),
                  (this.modifierX = this.getModifier(this.rotateValue, "X", t)),
                  (this.modifierY = this.getModifier(this.rotateValue, "Y", t));
              }),
              (u.prototype.zoomImage = function (e) {
                var t,
                  i,
                  n =
                    (this.containerRect.width - this.imageXSize) / 2 +
                    this.containerRect.left,
                  s = this.core.mediaContainerPosition,
                  o = s.top,
                  r = s.bottom,
                  a = Math.abs(o - r) / 2,
                  l =
                    (this.containerRect.height -
                      this.imageYSize -
                      a * this.modifierX) /
                      2 +
                    this.scrollTop +
                    this.containerRect.top;
                1 === e && (this.positionChanged = !1);
                var c = this.getDragAllowedAxises(
                    Math.abs(this.rotateValue),
                    e
                  ),
                  d = c.allowY,
                  u = c.allowX;
                this.positionChanged &&
                  ((t = this.left / (this.scale - 1)),
                  (i = this.top / (this.scale - 1)),
                  (this.pageX = Math.abs(t) + n),
                  (this.pageY = Math.abs(i) + l),
                  (this.positionChanged = !1));
                var p = this.getPossibleSwipeDragCords(this.rotateValue, e),
                  h = (e - 1) * (n - this.pageX),
                  g = (e - 1) * (l - this.pageY);
                u
                  ? this.isBeyondPossibleLeft(h, p.minX)
                    ? (h = p.minX)
                    : this.isBeyondPossibleRight(h, p.maxX) && (h = p.maxX)
                  : e > 1 &&
                    (h < p.minX ? (h = p.minX) : h > p.maxX && (h = p.maxX)),
                  d
                    ? this.isBeyondPossibleTop(g, p.minY)
                      ? (g = p.minY)
                      : this.isBeyondPossibleBottom(g, p.maxY) && (g = p.maxY)
                    : e > 1 &&
                      (g < p.minY ? (g = p.minY) : g > p.maxY && (g = p.maxY)),
                  this.setZoomStyles({ x: h, y: g, scale: e });
              }),
              (u.prototype.setZoomStyles = function (e) {
                var t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first(),
                  i = this.core.outer.find(".lg-current .lg-dummy-img").first(),
                  n = t.parent();
                (this.scale = e.scale),
                  t.css(
                    "transform",
                    "scale3d(" + e.scale + ", " + e.scale + ", 1)"
                  ),
                  i.css(
                    "transform",
                    "scale3d(" + e.scale + ", " + e.scale + ", 1)"
                  );
                var s = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
                n.css("transform", s), (this.left = e.x), (this.top = e.y);
              }),
              (u.prototype.setActualSize = function (e, t) {
                var i = this;
                if (
                  this.isImageSlide() &&
                  !this.core.outer.hasClass("lg-first-slide-loading")
                ) {
                  var n = this.getCurrentImageActualSizeScale();
                  this.core.outer.hasClass("lg-zoomed")
                    ? (this.scale = 1)
                    : (this.scale = this.getScale(n)),
                    this.setPageCords(t),
                    this.beginZoom(this.scale),
                    this.zoomImage(this.scale),
                    setTimeout(function () {
                      i.core.outer
                        .removeClass("lg-grabbing")
                        .addClass("lg-grab");
                    }, 10);
                }
              }),
              (u.prototype.getNaturalWidth = function (e) {
                var t = this.core.getSlideItem(e).find(".lg-image").first(),
                  i = this.core.galleryItems[e].width;
                return i ? parseFloat(i) : t.get().naturalWidth;
              }),
              (u.prototype.getActualSizeScale = function (e, t) {
                return e > t ? e / t || 2 : 1;
              }),
              (u.prototype.getCurrentImageActualSizeScale = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first()
                    .get().offsetWidth,
                  t = this.getNaturalWidth(this.core.index) || e;
                return this.getActualSizeScale(t, e);
              }),
              (u.prototype.getPageCords = function (e) {
                var t = {};
                if (e)
                  (t.x = e.pageX || e.targetTouches[0].pageX),
                    (t.y = e.pageY || e.targetTouches[0].pageY);
                else {
                  var i = this.core.outer.get().getBoundingClientRect();
                  (t.x = i.width / 2 + i.left),
                    (t.y = i.height / 2 + this.scrollTop + i.top);
                }
                return t;
              }),
              (u.prototype.setPageCords = function (e) {
                var t = this.getPageCords(e);
                (this.pageX = t.x), (this.pageY = t.y);
              }),
              (u.prototype.beginZoom = function (e) {
                return (
                  this.core.outer.removeClass(
                    "lg-zoom-drag-transition lg-zoom-dragging"
                  ),
                  e > 1
                    ? (this.core.outer.addClass("lg-zoomed"),
                      this.core
                        .getElementById("lg-actual-size")
                        .removeClass(this.settings.actualSizeIcons.zoomIn)
                        .addClass(this.settings.actualSizeIcons.zoomOut))
                    : this.resetZoom(),
                  e > 1
                );
              }),
              (u.prototype.getScale = function (e) {
                var t = this.getCurrentImageActualSizeScale();
                return e < 1 ? (e = 1) : e > t && (e = t), e;
              }),
              (u.prototype.init = function () {
                var e = this;
                if (this.settings.zoom) {
                  this.buildTemplates(), this.enableZoomOnSlideItemLoad();
                  var t = null;
                  this.core.outer.on("dblclick.lg", function (t) {
                    e.$LG(t.target).hasClass("lg-image") &&
                      e.setActualSize(e.core.index, t);
                  }),
                    this.core.outer.on("touchstart.lg", function (i) {
                      var n = e.$LG(i.target);
                      1 === i.targetTouches.length &&
                        n.hasClass("lg-image") &&
                        (t
                          ? (clearTimeout(t),
                            (t = null),
                            i.preventDefault(),
                            e.setActualSize(e.core.index, i))
                          : (t = setTimeout(function () {
                              t = null;
                            }, 300)));
                    }),
                    this.core.LGel.on(
                      i +
                        ".zoom " +
                        l +
                        ".zoom " +
                        a +
                        ".zoom " +
                        c +
                        ".zoom " +
                        d +
                        ".zoom",
                      function () {
                        e.core.lgOpened &&
                          e.isImageSlide() &&
                          (e.setPageCords(),
                          e.setZoomEssentials(),
                          e.zoomImage(e.scale));
                      }
                    ),
                    this.$LG(window).on(
                      "scroll.lg.zoom.global" + this.core.lgId,
                      function () {
                        e.core.lgOpened &&
                          (e.scrollTop = e.$LG(window).scrollTop());
                      }
                    ),
                    this.core
                      .getElementById("lg-zoom-out")
                      .on("click.lg", function () {
                        e.core.outer.find(".lg-current .lg-image").get() &&
                          ((e.scale -= e.settings.scale),
                          (e.scale = e.getScale(e.scale)),
                          e.beginZoom(e.scale),
                          e.zoomImage(e.scale));
                      }),
                    this.core
                      .getElementById("lg-zoom-in")
                      .on("click.lg", function () {
                        e.zoomIn();
                      }),
                    this.core
                      .getElementById("lg-actual-size")
                      .on("click.lg", function () {
                        e.setActualSize(e.core.index);
                      }),
                    this.core.LGel.on(n + ".zoom", function () {
                      e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                    }),
                    this.core.LGel.on(s + ".zoom", function () {
                      (e.scrollTop = e.$LG(window).scrollTop()),
                        (e.pageX = e.core.outer.width() / 2),
                        (e.pageY = e.core.outer.height() / 2 + e.scrollTop),
                        (e.scale = 1);
                    }),
                    this.core.LGel.on(r + ".zoom", function (t) {
                      var i = t.detail.prevIndex;
                      (e.scale = 1),
                        (e.positionChanged = !1),
                        e.resetZoom(i),
                        e.isImageSlide() && e.setZoomEssentials();
                    }),
                    this.zoomDrag(),
                    this.pinchZoom(),
                    this.zoomSwipe(),
                    (this.zoomableTimeout = !1),
                    (this.positionChanged = !1);
                }
              }),
              (u.prototype.zoomIn = function (e) {
                this.isImageSlide() &&
                  (e ? (this.scale = e) : (this.scale += this.settings.scale),
                  (this.scale = this.getScale(this.scale)),
                  this.beginZoom(this.scale),
                  this.zoomImage(this.scale));
              }),
              (u.prototype.resetZoom = function (e) {
                this.core.outer.removeClass(
                  "lg-zoomed lg-zoom-drag-transition"
                );
                var t = this.core.getElementById("lg-actual-size"),
                  i = this.core.getSlideItem(
                    void 0 !== e ? e : this.core.index
                  );
                t
                  .removeClass(this.settings.actualSizeIcons.zoomOut)
                  .addClass(this.settings.actualSizeIcons.zoomIn),
                  i.find(".lg-img-wrap").first().removeAttr("style"),
                  i.find(".lg-image").first().removeAttr("style"),
                  (this.scale = 1),
                  (this.left = 0),
                  (this.top = 0),
                  this.setPageCords();
              }),
              (u.prototype.getTouchDistance = function (e) {
                return Math.sqrt(
                  (e.targetTouches[0].pageX - e.targetTouches[1].pageX) *
                    (e.targetTouches[0].pageX - e.targetTouches[1].pageX) +
                    (e.targetTouches[0].pageY - e.targetTouches[1].pageY) *
                      (e.targetTouches[0].pageY - e.targetTouches[1].pageY)
                );
              }),
              (u.prototype.pinchZoom = function () {
                var e = this,
                  t = 0,
                  i = !1,
                  n = 1,
                  s = this.core.getSlideItem(this.core.index);
                this.core.$inner.on("touchstart.lg", function (i) {
                  (s = e.core.getSlideItem(e.core.index)),
                    e.isImageSlide() &&
                      (2 !== i.targetTouches.length ||
                        e.core.outer.hasClass("lg-first-slide-loading") ||
                        (!e.$LG(i.target).hasClass("lg-item") &&
                          !s.get().contains(i.target)) ||
                        ((n = e.scale || 1),
                        e.core.outer.removeClass(
                          "lg-zoom-drag-transition lg-zoom-dragging"
                        ),
                        (e.core.touchAction = "pinch"),
                        (t = e.getTouchDistance(i))));
                }),
                  this.core.$inner.on("touchmove.lg", function (o) {
                    if (
                      2 === o.targetTouches.length &&
                      "pinch" === e.core.touchAction &&
                      (e.$LG(o.target).hasClass("lg-item") ||
                        s.get().contains(o.target))
                    ) {
                      o.preventDefault();
                      var r = e.getTouchDistance(o),
                        a = t - r;
                      !i && Math.abs(a) > 5 && (i = !0),
                        i &&
                          ((e.scale = Math.max(1, n + 0.008 * -a)),
                          e.zoomImage(e.scale));
                    }
                  }),
                  this.core.$inner.on("touchend.lg", function (n) {
                    "pinch" === e.core.touchAction &&
                      (e.$LG(n.target).hasClass("lg-item") ||
                        s.get().contains(n.target)) &&
                      ((i = !1),
                      (t = 0),
                      e.scale <= 1
                        ? e.resetZoom()
                        : ((e.scale = e.getScale(e.scale)),
                          e.zoomImage(e.scale),
                          e.core.outer.addClass("lg-zoomed")),
                      (e.core.touchAction = void 0));
                  });
              }),
              (u.prototype.touchendZoom = function (e, t, i, n, s, o) {
                var r = t.x - e.x,
                  a = t.y - e.y,
                  l = Math.abs(r) / s + 1,
                  c = Math.abs(a) / s + 1;
                l > 2 && (l += 1), c > 2 && (c += 1), (r *= l), (a *= c);
                var d = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-wrap")
                    .first(),
                  u = {};
                (u.x = this.left + r * this.modifierX),
                  (u.y = this.top + a * this.modifierY);
                var p = this.getPossibleSwipeDragCords(o);
                (Math.abs(r) > 15 || Math.abs(a) > 15) &&
                  (n &&
                    (this.isBeyondPossibleTop(u.y, p.minY)
                      ? (u.y = p.minY)
                      : this.isBeyondPossibleBottom(u.y, p.maxY) &&
                        (u.y = p.maxY)),
                  i &&
                    (this.isBeyondPossibleLeft(u.x, p.minX)
                      ? (u.x = p.minX)
                      : this.isBeyondPossibleRight(u.x, p.maxX) &&
                        (u.x = p.maxX)),
                  n ? (this.top = u.y) : (u.y = this.top),
                  i ? (this.left = u.x) : (u.x = this.left),
                  this.setZoomSwipeStyles(d, u),
                  (this.positionChanged = !0));
              }),
              (u.prototype.getZoomSwipeCords = function (e, t, i, n, s) {
                var o = {};
                if (n) {
                  if (
                    ((o.y = this.top + (t.y - e.y) * this.modifierY),
                    this.isBeyondPossibleTop(o.y, s.minY))
                  ) {
                    var r = s.minY - o.y;
                    o.y = s.minY - r / 6;
                  } else if (this.isBeyondPossibleBottom(o.y, s.maxY)) {
                    var a = o.y - s.maxY;
                    o.y = s.maxY + a / 6;
                  }
                } else o.y = this.top;
                if (i) {
                  if (
                    ((o.x = this.left + (t.x - e.x) * this.modifierX),
                    this.isBeyondPossibleLeft(o.x, s.minX))
                  ) {
                    var l = s.minX - o.x;
                    o.x = s.minX - l / 6;
                  } else if (this.isBeyondPossibleRight(o.x, s.maxX)) {
                    var c = o.x - s.maxX;
                    o.x = s.maxX + c / 6;
                  }
                } else o.x = this.left;
                return o;
              }),
              (u.prototype.isBeyondPossibleLeft = function (e, t) {
                return e >= t;
              }),
              (u.prototype.isBeyondPossibleRight = function (e, t) {
                return e <= t;
              }),
              (u.prototype.isBeyondPossibleTop = function (e, t) {
                return e >= t;
              }),
              (u.prototype.isBeyondPossibleBottom = function (e, t) {
                return e <= t;
              }),
              (u.prototype.isImageSlide = function () {
                var e = this.core.galleryItems[this.core.index];
                return "image" === this.core.getSlideType(e);
              }),
              (u.prototype.getPossibleSwipeDragCords = function (e, t) {
                var i = t || this.scale || 1,
                  n = Math.abs(i),
                  s = this.core.mediaContainerPosition,
                  o = s.top,
                  r = s.bottom,
                  a = Math.abs(o - r) / 2,
                  l =
                    (this.imageYSize - this.containerRect.height) / 2 +
                    a * this.modifierX,
                  c = this.containerRect.height - this.imageYSize * n + l,
                  d = (this.imageXSize - this.containerRect.width) / 2,
                  u = this.containerRect.width - this.imageXSize * n + d,
                  p = { minY: l, maxY: c, minX: d, maxX: u };
                return (
                  90 === Math.abs(e) &&
                    (p = { minY: d, maxY: u, minX: l, maxX: c }),
                  p
                );
              }),
              (u.prototype.setZoomSwipeStyles = function (e, t) {
                e.css(
                  "transform",
                  "translate3d(" + t.x + "px, " + t.y + "px, 0)"
                );
              }),
              (u.prototype.zoomSwipe = function () {
                var e,
                  t,
                  i = this,
                  n = {},
                  s = {},
                  o = !1,
                  r = !1,
                  a = !1,
                  l = new Date(),
                  c = (new Date(), this.core.getSlideItem(this.core.index));
                this.core.$inner.on("touchstart.lg", function (s) {
                  if (
                    i.isImageSlide() &&
                    ((c = i.core.getSlideItem(i.core.index)),
                    (i.$LG(s.target).hasClass("lg-item") ||
                      c.get().contains(s.target)) &&
                      1 === s.targetTouches.length &&
                      i.core.outer.hasClass("lg-zoomed"))
                  ) {
                    s.preventDefault(),
                      (l = new Date()),
                      (i.core.touchAction = "zoomSwipe"),
                      (t = i.core
                        .getSlideItem(i.core.index)
                        .find(".lg-img-wrap")
                        .first());
                    var o = i.getDragAllowedAxises(Math.abs(i.rotateValue));
                    (a = o.allowY),
                      ((r = o.allowX) || a) &&
                        (n = i.getSwipeCords(s, Math.abs(i.rotateValue))),
                      (e = i.getPossibleSwipeDragCords(i.rotateValue)),
                      i.core.outer.addClass(
                        "lg-zoom-dragging lg-zoom-drag-transition"
                      );
                  }
                }),
                  this.core.$inner.on("touchmove.lg", function (l) {
                    if (
                      1 === l.targetTouches.length &&
                      "zoomSwipe" === i.core.touchAction &&
                      (i.$LG(l.target).hasClass("lg-item") ||
                        c.get().contains(l.target))
                    ) {
                      l.preventDefault(),
                        (i.core.touchAction = "zoomSwipe"),
                        (s = i.getSwipeCords(l, Math.abs(i.rotateValue)));
                      var d = i.getZoomSwipeCords(n, s, r, a, e);
                      (Math.abs(s.x - n.x) > 15 || Math.abs(s.y - n.y) > 15) &&
                        ((o = !0), i.setZoomSwipeStyles(t, d));
                    }
                  }),
                  this.core.$inner.on("touchend.lg", function (e) {
                    if (
                      "zoomSwipe" === i.core.touchAction &&
                      (i.$LG(e.target).hasClass("lg-item") ||
                        c.get().contains(e.target))
                    ) {
                      if (
                        ((i.core.touchAction = void 0),
                        i.core.outer.removeClass("lg-zoom-dragging"),
                        !o)
                      )
                        return;
                      o = !1;
                      var t = new Date().valueOf() - l.valueOf();
                      i.touchendZoom(n, s, r, a, t, i.rotateValue);
                    }
                  });
              }),
              (u.prototype.zoomDrag = function () {
                var e,
                  t,
                  i,
                  n,
                  s = this,
                  o = {},
                  r = {},
                  a = !1,
                  l = !1,
                  c = !1,
                  d = !1;
                this.core.outer.on("mousedown.lg.zoom", function (t) {
                  if (s.isImageSlide()) {
                    var r = s.core.getSlideItem(s.core.index);
                    if (
                      s.$LG(t.target).hasClass("lg-item") ||
                      r.get().contains(t.target)
                    ) {
                      (e = new Date()),
                        (n = s.core
                          .getSlideItem(s.core.index)
                          .find(".lg-img-wrap")
                          .first());
                      var l = s.getDragAllowedAxises(Math.abs(s.rotateValue));
                      (d = l.allowY),
                        (c = l.allowX),
                        s.core.outer.hasClass("lg-zoomed") &&
                          s.$LG(t.target).hasClass("lg-object") &&
                          (c || d) &&
                          (t.preventDefault(),
                          (o = s.getDragCords(t, Math.abs(s.rotateValue))),
                          (i = s.getPossibleSwipeDragCords(s.rotateValue)),
                          (a = !0),
                          (s.core.outer.get().scrollLeft += 1),
                          (s.core.outer.get().scrollLeft -= 1),
                          s.core.outer
                            .removeClass("lg-grab")
                            .addClass(
                              "lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"
                            ));
                    }
                  }
                }),
                  this.$LG(window).on(
                    "mousemove.lg.zoom.global" + this.core.lgId,
                    function (e) {
                      if (a) {
                        (l = !0),
                          (r = s.getDragCords(e, Math.abs(s.rotateValue)));
                        var t = s.getZoomSwipeCords(o, r, c, d, i);
                        s.setZoomSwipeStyles(n, t);
                      }
                    }
                  ),
                  this.$LG(window).on(
                    "mouseup.lg.zoom.global" + this.core.lgId,
                    function (i) {
                      if (a) {
                        if (
                          ((t = new Date()),
                          (a = !1),
                          s.core.outer.removeClass("lg-zoom-dragging"),
                          l && (o.x !== r.x || o.y !== r.y))
                        ) {
                          r = s.getDragCords(i, Math.abs(s.rotateValue));
                          var n = t.valueOf() - e.valueOf();
                          s.touchendZoom(o, r, c, d, n, s.rotateValue);
                        }
                        l = !1;
                      }
                      s.core.outer
                        .removeClass("lg-grabbing")
                        .addClass("lg-grab");
                    }
                  );
              }),
              (u.prototype.closeGallery = function () {
                this.resetZoom();
              }),
              (u.prototype.destroy = function () {
                this.$LG(window).off(".lg.zoom.global" + this.core.lgId),
                  this.core.LGel.off(".lg.zoom"),
                  this.core.LGel.off(".zoom"),
                  clearTimeout(this.zoomableTimeout),
                  (this.zoomableTimeout = !1);
              }),
              u
            );
          })();
        })();
      },
      151: () => {
        "use strict";
        !(function (e, t) {
          if ("object" == typeof exports && "object" == typeof module)
            module.exports = t();
          else if ("function" == typeof define && define.amd) define([], t);
          else {
            var i = t();
            for (var n in i)
              ("object" == typeof exports ? exports : e)[n] = i[n];
          }
        })(window, function () {
          return (
            (modules = [
              function (e) {
                e.exports = JSON.parse(
                  '{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17}'
                );
              },
              function (e, t, i) {
                function n(e) {
                  return (
                    (n =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (e) {
                            return typeof e;
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                          }),
                    n(e)
                  );
                }
                var s = i(3),
                  o = i(2),
                  r = o.document,
                  a = i(4).generateMaskSet,
                  l = i(4).analyseMask,
                  c = i(8);
                function d(e, t, i) {
                  if (!(this instanceof d)) return new d(e, t, i);
                  (this.el = void 0),
                    (this.events = {}),
                    (this.maskset = void 0),
                    !0 !== i &&
                      (s.isPlainObject(e)
                        ? (t = e)
                        : ((t = t || {}), e && (t.alias = e)),
                      (this.opts = s.extend(!0, {}, this.defaults, t)),
                      (this.noMasksCache = t && void 0 !== t.definitions),
                      (this.userOptions = t || {}),
                      u(this.opts.alias, t, this.opts),
                      (this.isRTL = this.opts.numericInput)),
                    (this.refreshValue = !1),
                    (this.undoValue = void 0),
                    (this.$el = void 0),
                    (this.skipKeyPressEvent = !1),
                    (this.skipInputEvent = !1),
                    (this.validationEvent = !1),
                    (this.ignorable = !1),
                    this.maxLength,
                    (this.mouseEnter = !1),
                    (this.originalPlaceholder = void 0);
                }
                function u(e, t, i) {
                  var n = d.prototype.aliases[e];
                  return n
                    ? (n.alias && u(n.alias, void 0, i),
                      s.extend(!0, i, n),
                      s.extend(!0, i, t),
                      !0)
                    : (null === i.mask && (i.mask = e), !1);
                }
                (d.prototype = {
                  dataAttribute: "data-inputmask",
                  defaults: {
                    _maxTestPos: 500,
                    placeholder: "_",
                    optionalmarker: ["[", "]"],
                    quantifiermarker: ["{", "}"],
                    groupmarker: ["(", ")"],
                    alternatormarker: "|",
                    escapeChar: "\\",
                    mask: null,
                    regex: null,
                    oncomplete: s.noop,
                    onincomplete: s.noop,
                    oncleared: s.noop,
                    repeat: 0,
                    greedy: !1,
                    autoUnmask: !1,
                    removeMaskOnSubmit: !1,
                    clearMaskOnLostFocus: !0,
                    insertMode: !0,
                    insertModeVisual: !0,
                    clearIncomplete: !1,
                    alias: null,
                    onKeyDown: s.noop,
                    onBeforeMask: null,
                    onBeforePaste: function (e, t) {
                      return s.isFunction(t.onBeforeMask)
                        ? t.onBeforeMask.call(this, e, t)
                        : e;
                    },
                    onBeforeWrite: null,
                    onUnMask: null,
                    showMaskOnFocus: !0,
                    showMaskOnHover: !0,
                    onKeyValidation: s.noop,
                    skipOptionalPartCharacter: " ",
                    numericInput: !1,
                    rightAlign: !1,
                    undoOnEscape: !0,
                    radixPoint: "",
                    _radixDance: !1,
                    groupSeparator: "",
                    keepStatic: null,
                    positionCaretOnTab: !0,
                    tabThrough: !1,
                    supportsInputType: [
                      "text",
                      "tel",
                      "url",
                      "password",
                      "search",
                    ],
                    ignorables: [
                      8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93,
                      112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
                      123, 0, 229,
                    ],
                    isComplete: null,
                    preValidation: null,
                    postValidation: null,
                    staticDefinitionSymbol: void 0,
                    jitMasking: !1,
                    nullable: !0,
                    inputEventOnly: !1,
                    noValuePatching: !1,
                    positionCaretOnClick: "lvp",
                    casing: null,
                    inputmode: "text",
                    importDataAttributes: !0,
                    shiftPositions: !0,
                  },
                  definitions: {
                    9: { validator: "[0-9０-９]", definitionSymbol: "*" },
                    a: {
                      validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                      definitionSymbol: "*",
                    },
                    "*": { validator: "[0-9０-９A-Za-zА-яЁёÀ-ÿµ]" },
                  },
                  aliases: {},
                  masksCache: {},
                  mask: function (e) {
                    var t = this;
                    return (
                      "string" == typeof e &&
                        (e = r.getElementById(e) || r.querySelectorAll(e)),
                      (e = e.nodeName ? [e] : e),
                      s.each(e, function (e, i) {
                        var n = s.extend(!0, {}, t.opts);
                        if (
                          (function (e, t, i, n) {
                            function r(t, s) {
                              var r = "" === n ? t : n + "-" + t;
                              null !==
                                (s = void 0 !== s ? s : e.getAttribute(r)) &&
                                ("string" == typeof s &&
                                  (0 === t.indexOf("on")
                                    ? (s = o[s])
                                    : "false" === s
                                    ? (s = !1)
                                    : "true" === s && (s = !0)),
                                (i[t] = s));
                            }
                            if (!0 === t.importDataAttributes) {
                              var a,
                                l,
                                c,
                                d,
                                p = e.getAttribute(n);
                              if (
                                (p &&
                                  "" !== p &&
                                  ((p = p.replace(/'/g, '"')),
                                  (l = JSON.parse("{" + p + "}"))),
                                l)
                              )
                                for (d in ((c = void 0), l))
                                  if ("alias" === d.toLowerCase()) {
                                    c = l[d];
                                    break;
                                  }
                              for (a in (r("alias", c),
                              i.alias && u(i.alias, i, t),
                              t)) {
                                if (l)
                                  for (d in ((c = void 0), l))
                                    if (d.toLowerCase() === a.toLowerCase()) {
                                      c = l[d];
                                      break;
                                    }
                                r(a, c);
                              }
                            }
                            return (
                              s.extend(!0, t, i),
                              ("rtl" !== e.dir && !t.rightAlign) ||
                                (e.style.textAlign = "right"),
                              ("rtl" !== e.dir && !t.numericInput) ||
                                ((e.dir = "ltr"),
                                e.removeAttribute("dir"),
                                (t.isRTL = !0)),
                              Object.keys(i).length
                            );
                          })(
                            i,
                            n,
                            s.extend(!0, {}, t.userOptions),
                            t.dataAttribute
                          )
                        ) {
                          var r = a(n, t.noMasksCache);
                          void 0 !== r &&
                            (void 0 !== i.inputmask &&
                              ((i.inputmask.opts.autoUnmask = !0),
                              i.inputmask.remove()),
                            (i.inputmask = new d(void 0, void 0, !0)),
                            (i.inputmask.opts = n),
                            (i.inputmask.noMasksCache = t.noMasksCache),
                            (i.inputmask.userOptions = s.extend(
                              !0,
                              {},
                              t.userOptions
                            )),
                            (i.inputmask.isRTL = n.isRTL || n.numericInput),
                            (i.inputmask.el = i),
                            (i.inputmask.$el = s(i)),
                            (i.inputmask.maskset = r),
                            s.data(i, "_inputmask_opts", t.userOptions),
                            c.call(i.inputmask, { action: "mask" }));
                        }
                      }),
                      (e && e[0] && e[0].inputmask) || this
                    );
                  },
                  option: function (e, t) {
                    return "string" == typeof e
                      ? this.opts[e]
                      : "object" === n(e)
                      ? (s.extend(this.userOptions, e),
                        this.el && !0 !== t && this.mask(this.el),
                        this)
                      : void 0;
                  },
                  unmaskedvalue: function (e) {
                    return (
                      (this.maskset =
                        this.maskset || a(this.opts, this.noMasksCache)),
                      c.call(this, { action: "unmaskedvalue", value: e })
                    );
                  },
                  remove: function () {
                    return c.call(this, { action: "remove" });
                  },
                  getemptymask: function () {
                    return (
                      (this.maskset =
                        this.maskset || a(this.opts, this.noMasksCache)),
                      c.call(this, { action: "getemptymask" })
                    );
                  },
                  hasMaskedValue: function () {
                    return !this.opts.autoUnmask;
                  },
                  isComplete: function () {
                    return (
                      (this.maskset =
                        this.maskset || a(this.opts, this.noMasksCache)),
                      c.call(this, { action: "isComplete" })
                    );
                  },
                  getmetadata: function () {
                    return (
                      (this.maskset =
                        this.maskset || a(this.opts, this.noMasksCache)),
                      c.call(this, { action: "getmetadata" })
                    );
                  },
                  isValid: function (e) {
                    return (
                      (this.maskset =
                        this.maskset || a(this.opts, this.noMasksCache)),
                      c.call(this, { action: "isValid", value: e })
                    );
                  },
                  format: function (e, t) {
                    return (
                      (this.maskset =
                        this.maskset || a(this.opts, this.noMasksCache)),
                      c.call(this, { action: "format", value: e, metadata: t })
                    );
                  },
                  setValue: function (e) {
                    this.el && s(this.el).trigger("setvalue", [e]);
                  },
                  analyseMask: l,
                }),
                  (d.extendDefaults = function (e) {
                    s.extend(!0, d.prototype.defaults, e);
                  }),
                  (d.extendDefinitions = function (e) {
                    s.extend(!0, d.prototype.definitions, e);
                  }),
                  (d.extendAliases = function (e) {
                    s.extend(!0, d.prototype.aliases, e);
                  }),
                  (d.format = function (e, t, i) {
                    return d(t).format(e, i);
                  }),
                  (d.unmask = function (e, t) {
                    return d(t).unmaskedvalue(e);
                  }),
                  (d.isValid = function (e, t) {
                    return d(t).isValid(e);
                  }),
                  (d.remove = function (e) {
                    "string" == typeof e &&
                      (e = r.getElementById(e) || r.querySelectorAll(e)),
                      (e = e.nodeName ? [e] : e),
                      s.each(e, function (e, t) {
                        t.inputmask && t.inputmask.remove();
                      });
                  }),
                  (d.setValue = function (e, t) {
                    "string" == typeof e &&
                      (e = r.getElementById(e) || r.querySelectorAll(e)),
                      (e = e.nodeName ? [e] : e),
                      s.each(e, function (e, i) {
                        i.inputmask
                          ? i.inputmask.setValue(t)
                          : s(i).trigger("setvalue", [t]);
                      });
                  }),
                  (d.dependencyLib = s),
                  (o.Inputmask = d),
                  (e.exports = d);
              },
              function (module, exports, __nested_webpack_require_8806__) {
                var __WEBPACK_AMD_DEFINE_RESULT__;
                function _typeof(e) {
                  return (
                    (_typeof =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (e) {
                            return typeof e;
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                          }),
                    _typeof(e)
                  );
                }
                (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                  return "undefined" != typeof window
                    ? window
                    : new (eval("require('jsdom').JSDOM"))("").window;
                }.call(
                  exports,
                  __nested_webpack_require_8806__,
                  exports,
                  module
                )),
                  void 0 === __WEBPACK_AMD_DEFINE_RESULT__ ||
                    (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
              },
              function (e, t, i) {
                function n(e) {
                  return (
                    (n =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (e) {
                            return typeof e;
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                          }),
                    n(e)
                  );
                }
                var s = i(2),
                  o = s.document;
                function r(e) {
                  return null != e && e === e.window;
                }
                function a(e) {
                  return e instanceof Element;
                }
                function l(e) {
                  return e instanceof l
                    ? e
                    : this instanceof l
                    ? void (
                        null != e &&
                        e !== s &&
                        ((this[0] = e.nodeName
                          ? e
                          : void 0 !== e[0] && e[0].nodeName
                          ? e[0]
                          : o.querySelector(e)),
                        void 0 !== this[0] &&
                          null !== this[0] &&
                          (this[0].eventRegistry = this[0].eventRegistry || {}))
                      )
                    : new l(e);
                }
                (l.prototype = {
                  on: function (e, t) {
                    function i(e, i) {
                      s.addEventListener
                        ? s.addEventListener(e, t, !1)
                        : s.attachEvent && s.attachEvent("on" + e, t),
                        (n[e] = n[e] || {}),
                        (n[e][i] = n[e][i] || []),
                        n[e][i].push(t);
                    }
                    if (a(this[0]))
                      for (
                        var n = this[0].eventRegistry,
                          s = this[0],
                          o = e.split(" "),
                          r = 0;
                        r < o.length;
                        r++
                      ) {
                        var l = o[r].split(".");
                        i(l[0], l[1] || "global");
                      }
                    return this;
                  },
                  off: function (e, t) {
                    var i, n;
                    function s(e, t, s) {
                      if (e in i == 1)
                        if (
                          (n.removeEventListener
                            ? n.removeEventListener(e, s, !1)
                            : n.detachEvent && n.detachEvent("on" + e, s),
                          "global" === t)
                        )
                          for (var o in i[e])
                            i[e][o].splice(i[e][o].indexOf(s), 1);
                        else i[e][t].splice(i[e][t].indexOf(s), 1);
                    }
                    function o(e, n) {
                      var s,
                        o,
                        r = [];
                      if (0 < e.length)
                        if (void 0 === t)
                          for (s = 0, o = i[e][n].length; s < o; s++)
                            r.push({
                              ev: e,
                              namespace: n && 0 < n.length ? n : "global",
                              handler: i[e][n][s],
                            });
                        else
                          r.push({
                            ev: e,
                            namespace: n && 0 < n.length ? n : "global",
                            handler: t,
                          });
                      else if (0 < n.length)
                        for (var a in i)
                          for (var l in i[a])
                            if (l === n)
                              if (void 0 === t)
                                for (s = 0, o = i[a][l].length; s < o; s++)
                                  r.push({
                                    ev: a,
                                    namespace: l,
                                    handler: i[a][l][s],
                                  });
                              else r.push({ ev: a, namespace: l, handler: t });
                      return r;
                    }
                    if (a(this[0])) {
                      (i = this[0].eventRegistry), (n = this[0]);
                      for (var r = e.split(" "), l = 0; l < r.length; l++)
                        for (
                          var c = r[l].split("."),
                            d = o(c[0], c[1]),
                            u = 0,
                            p = d.length;
                          u < p;
                          u++
                        )
                          s(d[u].ev, d[u].namespace, d[u].handler);
                    }
                    return this;
                  },
                  trigger: function (e, t) {
                    if (a(this[0]))
                      for (
                        var i = this[0].eventRegistry,
                          n = this[0],
                          s = "string" == typeof e ? e.split(" ") : [e.type],
                          r = 0;
                        r < s.length;
                        r++
                      ) {
                        var c = s[r].split("."),
                          d = c[0],
                          u = c[1] || "global";
                        if (void 0 !== o && "global" === u) {
                          var p,
                            h,
                            g = { bubbles: !0, cancelable: !0, detail: t };
                          if (o.createEvent) {
                            try {
                              p = new CustomEvent(d, g);
                            } catch (e) {
                              (p =
                                o.createEvent("CustomEvent")).initCustomEvent(
                                d,
                                g.bubbles,
                                g.cancelable,
                                g.detail
                              );
                            }
                            e.type && l.extend(p, e), n.dispatchEvent(p);
                          } else
                            ((p = o.createEventObject()).eventType = d),
                              (p.detail = t),
                              e.type && l.extend(p, e),
                              n.fireEvent("on" + p.eventType, p);
                        } else if (void 0 !== i[d])
                          if (
                            (((e = e.type ? e : l.Event(e)).detail =
                              arguments.slice(1)),
                            "global" === u)
                          )
                            for (var m in i[d])
                              for (h = 0; h < i[d][m].length; h++)
                                i[d][m][h].apply(n, arguments);
                          else
                            for (h = 0; h < i[d][u].length; h++)
                              i[d][u][h].apply(n, arguments);
                      }
                    return this;
                  },
                }),
                  (l.isFunction = function (e) {
                    return "function" == typeof e;
                  }),
                  (l.noop = function () {}),
                  (l.isArray = Array.isArray),
                  (l.inArray = function (e, t, i) {
                    return null == t
                      ? -1
                      : (function (e, t) {
                          for (var i = 0, n = e.length; i < n; i++)
                            if (e[i] === t) return i;
                          return -1;
                        })(t, e);
                  }),
                  (l.valHooks = void 0),
                  (l.isPlainObject = function (e) {
                    return !(
                      "object" !== n(e) ||
                      e.nodeType ||
                      r(e) ||
                      (e.constructor &&
                        !Object.hasOwnProperty.call(
                          e.constructor.prototype,
                          "isPrototypeOf"
                        ))
                    );
                  }),
                  (l.extend = function () {
                    var e,
                      t,
                      i,
                      s,
                      o,
                      r,
                      a = arguments[0] || {},
                      c = 1,
                      d = arguments.length,
                      u = !1;
                    for (
                      "boolean" == typeof a &&
                        ((u = a), (a = arguments[c] || {}), c++),
                        "object" === n(a) || l.isFunction(a) || (a = {}),
                        c === d && ((a = this), c--);
                      c < d;
                      c++
                    )
                      if (null != (e = arguments[c]))
                        for (t in e)
                          (i = a[t]),
                            a !== (s = e[t]) &&
                              (u &&
                              s &&
                              (l.isPlainObject(s) || (o = l.isArray(s)))
                                ? ((r = o
                                    ? ((o = !1), i && l.isArray(i) ? i : [])
                                    : i && l.isPlainObject(i)
                                    ? i
                                    : {}),
                                  (a[t] = l.extend(u, r, s)))
                                : void 0 !== s && (a[t] = s));
                    return a;
                  }),
                  (l.each = function (e, t) {
                    var i = 0;
                    if (
                      (function (e) {
                        var t = "length" in e && e.length,
                          i = n(e);
                        return (
                          "function" !== i &&
                          !r(e) &&
                          (!(1 !== e.nodeType || !t) ||
                            "array" === i ||
                            0 === t ||
                            ("number" == typeof t && 0 < t && t - 1 in e))
                        );
                      })(e)
                    )
                      for (
                        var s = e.length;
                        i < s && !1 !== t.call(e[i], i, e[i]);
                        i++
                      );
                    else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
                    return e;
                  }),
                  (l.data = function (e, t, i) {
                    if (void 0 === i) return e.__data ? e.__data[t] : null;
                    (e.__data = e.__data || {}), (e.__data[t] = i);
                  }),
                  "function" == typeof s.CustomEvent
                    ? (l.Event = s.CustomEvent)
                    : ((l.Event = function (e, t) {
                        t = t || {
                          bubbles: !1,
                          cancelable: !1,
                          detail: void 0,
                        };
                        var i = o.createEvent("CustomEvent");
                        return (
                          i.initCustomEvent(
                            e,
                            t.bubbles,
                            t.cancelable,
                            t.detail
                          ),
                          i
                        );
                      }),
                      (l.Event.prototype = s.Event.prototype)),
                  (e.exports = l);
              },
              function (e, t, i) {
                var n = i(3);
                e.exports = {
                  generateMaskSet: function (e, t) {
                    function i(e, i, s) {
                      var o,
                        r,
                        a = !1;
                      if (
                        ((null !== e && "" !== e) ||
                          (e = (a = null !== s.regex)
                            ? (e = s.regex).replace(/^(\^)(.*)(\$)$/, "$2")
                            : ((a = !0), ".*")),
                        1 === e.length &&
                          !1 === s.greedy &&
                          0 !== s.repeat &&
                          (s.placeholder = ""),
                        0 < s.repeat || "*" === s.repeat || "+" === s.repeat)
                      ) {
                        var l =
                          "*" === s.repeat
                            ? 0
                            : "+" === s.repeat
                            ? 1
                            : s.repeat;
                        e =
                          s.groupmarker[0] +
                          e +
                          s.groupmarker[1] +
                          s.quantifiermarker[0] +
                          l +
                          "," +
                          s.repeat +
                          s.quantifiermarker[1];
                      }
                      return (
                        (r = a
                          ? "regex_" + s.regex
                          : s.numericInput
                          ? e.split("").reverse().join("")
                          : e),
                        !1 !== s.keepStatic && (r = "ks_" + r),
                        void 0 === Inputmask.prototype.masksCache[r] || !0 === t
                          ? ((o = {
                              mask: e,
                              maskToken: Inputmask.prototype.analyseMask(
                                e,
                                a,
                                s
                              ),
                              validPositions: {},
                              _buffer: void 0,
                              buffer: void 0,
                              tests: {},
                              excludes: {},
                              metadata: i,
                              maskLength: void 0,
                              jitOffset: {},
                            }),
                            !0 !== t &&
                              ((Inputmask.prototype.masksCache[r] = o),
                              (o = n.extend(
                                !0,
                                {},
                                Inputmask.prototype.masksCache[r]
                              ))))
                          : (o = n.extend(
                              !0,
                              {},
                              Inputmask.prototype.masksCache[r]
                            )),
                        o
                      );
                    }
                    if (
                      (n.isFunction(e.mask) && (e.mask = e.mask(e)),
                      n.isArray(e.mask))
                    ) {
                      if (1 < e.mask.length) {
                        null === e.keepStatic && (e.keepStatic = !0);
                        var s = e.groupmarker[0];
                        return (
                          n.each(
                            e.isRTL ? e.mask.reverse() : e.mask,
                            function (t, i) {
                              1 < s.length &&
                                (s +=
                                  e.groupmarker[1] +
                                  e.alternatormarker +
                                  e.groupmarker[0]),
                                void 0 === i.mask || n.isFunction(i.mask)
                                  ? (s += i)
                                  : (s += i.mask);
                            }
                          ),
                          i((s += e.groupmarker[1]), e.mask, e)
                        );
                      }
                      e.mask = e.mask.pop();
                    }
                    return (
                      null === e.keepStatic && (e.keepStatic = !1),
                      e.mask &&
                      void 0 !== e.mask.mask &&
                      !n.isFunction(e.mask.mask)
                        ? i(e.mask.mask, e.mask, e)
                        : i(e.mask, e.mask, e)
                    );
                  },
                  analyseMask: function (e, t, i) {
                    var s,
                      o,
                      r,
                      a,
                      l,
                      c,
                      d =
                        /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                      u =
                        /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                      p = !1,
                      h = new v(),
                      g = [],
                      m = [],
                      f = !1;
                    function v(e, t, i, n) {
                      (this.matches = []),
                        (this.openGroup = e || !1),
                        (this.alternatorGroup = !1),
                        (this.isGroup = e || !1),
                        (this.isOptional = t || !1),
                        (this.isQuantifier = i || !1),
                        (this.isAlternator = n || !1),
                        (this.quantifier = { min: 1, max: 1 });
                    }
                    function y(e, s, o) {
                      o = void 0 !== o ? o : e.matches.length;
                      var r = e.matches[o - 1];
                      if (t)
                        0 === s.indexOf("[") ||
                        (p && /\\d|\\s|\\w]/i.test(s)) ||
                        "." === s
                          ? e.matches.splice(o++, 0, {
                              fn: new RegExp(s, i.casing ? "i" : ""),
                              static: !1,
                              optionality: !1,
                              newBlockMarker:
                                void 0 === r ? "master" : r.def !== s,
                              casing: null,
                              def: s,
                              placeholder: void 0,
                              nativeDef: s,
                            })
                          : (p && (s = s[s.length - 1]),
                            n.each(s.split(""), function (t, n) {
                              (r = e.matches[o - 1]),
                                e.matches.splice(o++, 0, {
                                  fn: /[a-z]/i.test(
                                    i.staticDefinitionSymbol || n
                                  )
                                    ? new RegExp(
                                        "[" +
                                          (i.staticDefinitionSymbol || n) +
                                          "]",
                                        i.casing ? "i" : ""
                                      )
                                    : null,
                                  static: !0,
                                  optionality: !1,
                                  newBlockMarker:
                                    void 0 === r
                                      ? "master"
                                      : r.def !== n && !0 !== r.static,
                                  casing: null,
                                  def: i.staticDefinitionSymbol || n,
                                  placeholder:
                                    void 0 !== i.staticDefinitionSymbol
                                      ? n
                                      : void 0,
                                  nativeDef: (p ? "'" : "") + n,
                                });
                            })),
                          (p = !1);
                      else {
                        var a =
                          (i.definitions ? i.definitions[s] : void 0) ||
                          Inputmask.prototype.definitions[s];
                        a && !p
                          ? e.matches.splice(o++, 0, {
                              fn: a.validator
                                ? "string" == typeof a.validator
                                  ? new RegExp(a.validator, i.casing ? "i" : "")
                                  : new (function () {
                                      this.test = a.validator;
                                    })()
                                : new RegExp("."),
                              static: a.static || !1,
                              optionality: !1,
                              newBlockMarker:
                                void 0 === r
                                  ? "master"
                                  : r.def !== (a.definitionSymbol || s),
                              casing: a.casing,
                              def: a.definitionSymbol || s,
                              placeholder: a.placeholder,
                              nativeDef: s,
                              generated: a.generated,
                            })
                          : (e.matches.splice(o++, 0, {
                              fn: /[a-z]/i.test(i.staticDefinitionSymbol || s)
                                ? new RegExp(
                                    "[" + (i.staticDefinitionSymbol || s) + "]",
                                    i.casing ? "i" : ""
                                  )
                                : null,
                              static: !0,
                              optionality: !1,
                              newBlockMarker:
                                void 0 === r
                                  ? "master"
                                  : r.def !== s && !0 !== r.static,
                              casing: null,
                              def: i.staticDefinitionSymbol || s,
                              placeholder:
                                void 0 !== i.staticDefinitionSymbol
                                  ? s
                                  : void 0,
                              nativeDef: (p ? "'" : "") + s,
                            }),
                            (p = !1));
                      }
                    }
                    function b() {
                      if (0 < g.length) {
                        if ((y((a = g[g.length - 1]), o), a.isAlternator)) {
                          l = g.pop();
                          for (var e = 0; e < l.matches.length; e++)
                            l.matches[e].isGroup && (l.matches[e].isGroup = !1);
                          0 < g.length
                            ? (a = g[g.length - 1]).matches.push(l)
                            : h.matches.push(l);
                        }
                      } else y(h, o);
                    }
                    function w(e) {
                      var t = new v(!0);
                      return (t.openGroup = !1), (t.matches = e), t;
                    }
                    function x() {
                      if ((((r = g.pop()).openGroup = !1), void 0 !== r))
                        if (0 < g.length) {
                          if (
                            ((a = g[g.length - 1]).matches.push(r),
                            a.isAlternator)
                          ) {
                            l = g.pop();
                            for (var e = 0; e < l.matches.length; e++)
                              (l.matches[e].isGroup = !1),
                                (l.matches[e].alternatorGroup = !1);
                            0 < g.length
                              ? (a = g[g.length - 1]).matches.push(l)
                              : h.matches.push(l);
                          }
                        } else h.matches.push(r);
                      else b();
                    }
                    function S(e) {
                      var t = e.pop();
                      return t.isQuantifier && (t = w([e.pop(), t])), t;
                    }
                    for (
                      t &&
                      ((i.optionalmarker[0] = void 0),
                      (i.optionalmarker[1] = void 0));
                      (s = t ? u.exec(e) : d.exec(e));

                    ) {
                      if (((o = s[0]), t))
                        switch (o.charAt(0)) {
                          case "?":
                            o = "{0,1}";
                            break;
                          case "+":
                          case "*":
                            o = "{" + o + "}";
                            break;
                          case "|":
                            if (0 === g.length) {
                              var k = w(h.matches);
                              (k.openGroup = !0),
                                g.push(k),
                                (h.matches = []),
                                (f = !0);
                            }
                        }
                      if (p) b();
                      else
                        switch (o.charAt(0)) {
                          case "(?=":
                          case "(?!":
                          case "(?<=":
                          case "(?<!":
                            break;
                          case i.escapeChar:
                            (p = !0), t && b();
                            break;
                          case i.optionalmarker[1]:
                          case i.groupmarker[1]:
                            x();
                            break;
                          case i.optionalmarker[0]:
                            g.push(new v(!1, !0));
                            break;
                          case i.groupmarker[0]:
                            g.push(new v(!0));
                            break;
                          case i.quantifiermarker[0]:
                            var C = new v(!1, !1, !0),
                              E = (o = o.replace(/[{}]/g, "")).split("|"),
                              T = E[0].split(","),
                              _ = isNaN(T[0]) ? T[0] : parseInt(T[0]),
                              P =
                                1 === T.length
                                  ? _
                                  : isNaN(T[1])
                                  ? T[1]
                                  : parseInt(T[1]);
                            ("*" !== _ && "+" !== _) || (_ = "*" === P ? 0 : 1),
                              (C.quantifier = { min: _, max: P, jit: E[1] });
                            var O =
                              0 < g.length
                                ? g[g.length - 1].matches
                                : h.matches;
                            if ((s = O.pop()).isAlternator) {
                              O.push(s), (O = s.matches);
                              var I = new v(!0),
                                M = O.pop();
                              O.push(I), (O = I.matches), (s = M);
                            }
                            s.isGroup || (s = w([s])), O.push(s), O.push(C);
                            break;
                          case i.alternatormarker:
                            if (0 < g.length) {
                              var L = (a = g[g.length - 1]).matches[
                                a.matches.length - 1
                              ];
                              c =
                                a.openGroup &&
                                (void 0 === L.matches ||
                                  (!1 === L.isGroup && !1 === L.isAlternator))
                                  ? g.pop()
                                  : S(a.matches);
                            } else c = S(h.matches);
                            if (c.isAlternator) g.push(c);
                            else if (
                              (c.alternatorGroup
                                ? ((l = g.pop()), (c.alternatorGroup = !1))
                                : (l = new v(!1, !1, !1, !0)),
                              l.matches.push(c),
                              g.push(l),
                              c.openGroup)
                            ) {
                              c.openGroup = !1;
                              var A = new v(!0);
                              (A.alternatorGroup = !0), g.push(A);
                            }
                            break;
                          default:
                            b();
                        }
                    }
                    for (f && x(); 0 < g.length; )
                      (r = g.pop()), h.matches.push(r);
                    return (
                      0 < h.matches.length &&
                        ((function e(s) {
                          s &&
                            s.matches &&
                            n.each(s.matches, function (n, o) {
                              var r = s.matches[n + 1];
                              (void 0 === r ||
                                void 0 === r.matches ||
                                !1 === r.isQuantifier) &&
                                o &&
                                o.isGroup &&
                                ((o.isGroup = !1),
                                t ||
                                  (y(o, i.groupmarker[0], 0),
                                  !0 !== o.openGroup &&
                                    y(o, i.groupmarker[1]))),
                                e(o);
                            });
                        })(h),
                        m.push(h)),
                      (i.numericInput || i.isRTL) &&
                        (function e(t) {
                          for (var n in ((t.matches = t.matches.reverse()),
                          t.matches))
                            if (
                              Object.prototype.hasOwnProperty.call(t.matches, n)
                            ) {
                              var s = parseInt(n);
                              if (
                                t.matches[n].isQuantifier &&
                                t.matches[s + 1] &&
                                t.matches[s + 1].isGroup
                              ) {
                                var o = t.matches[n];
                                t.matches.splice(n, 1),
                                  t.matches.splice(s + 1, 0, o);
                              }
                              void 0 !== t.matches[n].matches
                                ? (t.matches[n] = e(t.matches[n]))
                                : (t.matches[n] =
                                    ((r = t.matches[n]) === i.optionalmarker[0]
                                      ? (r = i.optionalmarker[1])
                                      : r === i.optionalmarker[1]
                                      ? (r = i.optionalmarker[0])
                                      : r === i.groupmarker[0]
                                      ? (r = i.groupmarker[1])
                                      : r === i.groupmarker[1] &&
                                        (r = i.groupmarker[0]),
                                    r));
                            }
                          var r;
                          return t;
                        })(m[0]),
                      m
                    );
                  },
                };
              },
              function (e, t, i) {
                Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.default = function (e) {
                    return e.replace(n, "\\$1");
                  });
                var n = new RegExp(
                  "(\\" +
                    [
                      "/",
                      ".",
                      "*",
                      "+",
                      "?",
                      "|",
                      "(",
                      ")",
                      "[",
                      "]",
                      "{",
                      "}",
                      "\\",
                      "$",
                      "^",
                    ].join("|\\") +
                    ")",
                  "gim"
                );
              },
              function (e, t, i) {
                i(7), i(10), i(11), i(12), (e.exports = i(1));
              },
              function (e, t, i) {
                var n = i(1);
                n.extendDefinitions({
                  A: { validator: "[A-Za-zА-яЁёÀ-ÿµ]", casing: "upper" },
                  "&": { validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]", casing: "upper" },
                  "#": { validator: "[0-9A-Fa-f]", casing: "upper" },
                });
                var s = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
                function o(e, t, i, n, o) {
                  return (
                    (e =
                      -1 < i - 1 && "." !== t.buffer[i - 1]
                        ? ((e = t.buffer[i - 1] + e),
                          -1 < i - 2 && "." !== t.buffer[i - 2]
                            ? t.buffer[i - 2] + e
                            : "0" + e)
                        : "00" + e),
                    s.test(e)
                  );
                }
                n.extendAliases({
                  cssunit: {
                    regex:
                      "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)",
                  },
                  url: { regex: "(https?|ftp)//.*", autoUnmask: !1 },
                  ip: {
                    mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
                    definitions: {
                      i: { validator: o },
                      j: { validator: o },
                      k: { validator: o },
                      l: { validator: o },
                    },
                    onUnMask: function (e, t, i) {
                      return e;
                    },
                    inputmode: "numeric",
                  },
                  email: {
                    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                    greedy: !1,
                    casing: "lower",
                    onBeforePaste: function (e, t) {
                      return (e = e.toLowerCase()).replace("mailto:", "");
                    },
                    definitions: {
                      "*": {
                        validator:
                          "[0-9１-９A-Za-zА-яЁёÀ-ÿµ!#$%&'*+/=?^_`{|}~-]",
                      },
                      "-": { validator: "[0-9A-Za-z-]" },
                    },
                    onUnMask: function (e, t, i) {
                      return e;
                    },
                    inputmode: "email",
                  },
                  mac: { mask: "##:##:##:##:##:##" },
                  vin: {
                    mask: "V{13}9{4}",
                    definitions: {
                      V: {
                        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                        casing: "upper",
                      },
                    },
                    clearIncomplete: !0,
                    autoUnmask: !0,
                  },
                  ssn: {
                    mask: "999-99-9999",
                    postValidation: function (e, t, i, n, s, o, r) {
                      return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(
                        e.join("")
                      );
                    },
                  },
                }),
                  (e.exports = n);
              },
              function (e, t, i) {
                i(9);
                var n = i(3),
                  s = i(2),
                  o = s.document,
                  r = (s.navigator && s.navigator.userAgent) || "",
                  a = 0 < r.indexOf("MSIE ") || 0 < r.indexOf("Trident/"),
                  l = "ontouchstart" in s,
                  c = /iemobile/i.test(r),
                  d = /iphone/i.test(r) && !c,
                  u = i(0);
                e.exports = function e(t) {
                  var i = this,
                    r = i.maskset,
                    p = i.opts,
                    h = i.el,
                    g = i.isRTL || (i.isRTL = p.numericInput);
                  function m(e, t, n, s, o) {
                    var a = p.greedy;
                    o && (p.greedy = !1), (t = t || 0);
                    var l,
                      c,
                      d,
                      u,
                      h = [],
                      g = 0;
                    do {
                      if (!0 === e && r.validPositions[g])
                        (c = (d =
                          o &&
                          !0 === r.validPositions[g].match.optionality &&
                          void 0 === r.validPositions[g + 1] &&
                          (!0 === r.validPositions[g].generatedInput ||
                            (r.validPositions[g].input ==
                              p.skipOptionalPartCharacter &&
                              0 < g))
                            ? w(g, C(g, l, g - 1))
                            : r.validPositions[g]).match),
                          (l = d.locator.slice()),
                          h.push(
                            !0 === n
                              ? d.input
                              : !1 === n
                              ? c.nativeDef
                              : G(g, c)
                          );
                      else {
                        (c = (d = x(g, l, g - 1)).match),
                          (l = d.locator.slice());
                        var m =
                          !0 !== s &&
                          (!1 !== p.jitMasking ? p.jitMasking : c.jit);
                        (u =
                          (u &&
                            c.static &&
                            c.def !== p.groupSeparator &&
                            null === c.fn) ||
                          (r.validPositions[g - 1] &&
                            c.static &&
                            c.def !== p.groupSeparator &&
                            null === c.fn)) ||
                        !1 === m ||
                        void 0 === m ||
                        ("number" == typeof m && isFinite(m) && g < m)
                          ? h.push(!1 === n ? c.nativeDef : G(g, c))
                          : (u = !1);
                      }
                      g++;
                    } while (
                      ((void 0 === i.maxLength || g < i.maxLength) &&
                        (!0 !== c.static || "" !== c.def)) ||
                      g < t
                    );
                    return (
                      "" === h[h.length - 1] && h.pop(),
                      (!1 === n && void 0 !== r.maskLength) ||
                        (r.maskLength = g - 1),
                      (p.greedy = a),
                      h
                    );
                  }
                  function f(e) {
                    (r.buffer = void 0),
                      !0 !== e && ((r.validPositions = {}), (r.p = 0));
                  }
                  function v(e, t, i) {
                    var n = -1,
                      s = -1,
                      o = i || r.validPositions;
                    for (var a in (void 0 === e && (e = -1), o)) {
                      var l = parseInt(a);
                      o[l] &&
                        (t || !0 !== o[l].generatedInput) &&
                        (l <= e && (n = l), e <= l && (s = l));
                    }
                    return -1 === n || n == e
                      ? s
                      : -1 == s || e - n < s - e
                      ? n
                      : s;
                  }
                  function y(e) {
                    var t = e.locator[e.alternation];
                    return (
                      "string" == typeof t &&
                        0 < t.length &&
                        (t = t.split(",")[0]),
                      void 0 !== t ? t.toString() : ""
                    );
                  }
                  function b(e, t) {
                    var i = (
                      null != e.alternation ? e.mloc[y(e)] : e.locator
                    ).join("");
                    if ("" !== i) for (; i.length < t; ) i += "0";
                    return i;
                  }
                  function w(e, t) {
                    for (
                      var i, n, s, o = b(S((e = 0 < e ? e - 1 : 0))), r = 0;
                      r < t.length;
                      r++
                    ) {
                      var a = t[r];
                      i = b(a, o.length);
                      var l = Math.abs(i - o);
                      (void 0 === n ||
                        ("" !== i && l < n) ||
                        (s &&
                          !p.greedy &&
                          s.match.optionality &&
                          "master" === s.match.newBlockMarker &&
                          (!a.match.optionality || !a.match.newBlockMarker)) ||
                        (s &&
                          s.match.optionalQuantifier &&
                          !a.match.optionalQuantifier)) &&
                        ((n = l), (s = a));
                    }
                    return s;
                  }
                  function x(e, t, i) {
                    return (
                      r.validPositions[e] || w(e, C(e, t ? t.slice() : t, i))
                    );
                  }
                  function S(e, t) {
                    return r.validPositions[e]
                      ? r.validPositions[e]
                      : (t || C(e))[0];
                  }
                  function k(e, t, i) {
                    for (var n = !1, s = C(e), o = 0; o < s.length; o++) {
                      if (
                        s[o].match &&
                        (!(
                          s[o].match.nativeDef !==
                            t.match[i.shiftPositions ? "def" : "nativeDef"] ||
                          (i.shiftPositions && t.match.static)
                        ) ||
                          s[o].match.nativeDef === t.match.nativeDef)
                      ) {
                        n = !0;
                        break;
                      }
                      if (s[o].match && s[o].match.def === t.match.nativeDef) {
                        n = void 0;
                        break;
                      }
                    }
                    return (
                      !1 === n &&
                        void 0 !== r.jitOffset[e] &&
                        (n = k(e + r.jitOffset[e], t, i)),
                      n
                    );
                  }
                  function C(e, t, s) {
                    var o,
                      a = r.maskToken,
                      l = t ? s : 0,
                      c = t ? t.slice() : [0],
                      d = [],
                      u = !1,
                      g = t ? t.join("") : "";
                    function m(t, i, s, a) {
                      function c(s, a, f) {
                        function v(e, t) {
                          var i = 0 === n.inArray(e, t.matches);
                          return (
                            i ||
                              n.each(t.matches, function (n, s) {
                                if (
                                  (!0 === s.isQuantifier
                                    ? (i = v(e, t.matches[n - 1]))
                                    : Object.prototype.hasOwnProperty.call(
                                        s,
                                        "matches"
                                      ) && (i = v(e, s)),
                                  i)
                                )
                                  return !1;
                              }),
                            i
                          );
                        }
                        function y(e, t, i) {
                          var s, o;
                          if (
                            ((r.tests[e] || r.validPositions[e]) &&
                              n.each(
                                r.tests[e] || [r.validPositions[e]],
                                function (e, n) {
                                  if (n.mloc[t]) return (s = n), !1;
                                  var r = void 0 !== i ? i : n.alternation,
                                    a =
                                      void 0 !== n.locator[r]
                                        ? n.locator[r].toString().indexOf(t)
                                        : -1;
                                  (void 0 === o || a < o) &&
                                    -1 !== a &&
                                    ((s = n), (o = a));
                                }
                              ),
                            s)
                          ) {
                            var a = s.locator[s.alternation];
                            return (s.mloc[t] || s.mloc[a] || s.locator).slice(
                              (void 0 !== i ? i : s.alternation) + 1
                            );
                          }
                          return void 0 !== i ? y(e, t) : void 0;
                        }
                        function b(e, t) {
                          function i(e) {
                            for (
                              var t, i = [], n = -1, s = 0, o = e.length;
                              s < o;
                              s++
                            )
                              if ("-" === e.charAt(s))
                                for (t = e.charCodeAt(s + 1); ++n < t; )
                                  i.push(String.fromCharCode(n));
                              else (n = e.charCodeAt(s)), i.push(e.charAt(s));
                            return i.join("");
                          }
                          return (
                            e.match.def === t.match.nativeDef ||
                            (!(
                              !(
                                p.regex ||
                                (e.match.fn instanceof RegExp &&
                                  t.match.fn instanceof RegExp)
                              ) ||
                              !0 === e.match.static ||
                              !0 === t.match.static
                            ) &&
                              -1 !==
                                i(
                                  t.match.fn.toString().replace(/[[\]/]/g, "")
                                ).indexOf(
                                  i(
                                    e.match.fn.toString().replace(/[[\]/]/g, "")
                                  )
                                ))
                          );
                        }
                        function w(e, t) {
                          var i = e.alternation,
                            n =
                              void 0 === t ||
                              (i === t.alternation &&
                                -1 ===
                                  e.locator[i]
                                    .toString()
                                    .indexOf(t.locator[i]));
                          if (!n && i > t.alternation)
                            for (var s = t.alternation; s < i; s++)
                              if (e.locator[s] !== t.locator[s]) {
                                (i = s), (n = !0);
                                break;
                              }
                          if (n) {
                            e.mloc = e.mloc || {};
                            var o = e.locator[i];
                            if (void 0 !== o) {
                              if (
                                ("string" == typeof o && (o = o.split(",")[0]),
                                void 0 === e.mloc[o] &&
                                  (e.mloc[o] = e.locator.slice()),
                                void 0 !== t)
                              ) {
                                for (var r in t.mloc)
                                  "string" == typeof r && (r = r.split(",")[0]),
                                    void 0 === e.mloc[r] &&
                                      (e.mloc[r] = t.mloc[r]);
                                e.locator[i] = Object.keys(e.mloc).join(",");
                              }
                              return !0;
                            }
                            e.alternation = void 0;
                          }
                          return !1;
                        }
                        function x(e, t) {
                          if (e.locator.length !== t.locator.length) return !1;
                          for (
                            var i = e.alternation + 1;
                            i < e.locator.length;
                            i++
                          )
                            if (e.locator[i] !== t.locator[i]) return !1;
                          return !0;
                        }
                        if (l > e + p._maxTestPos)
                          throw (
                            "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " +
                            r.mask
                          );
                        if (l === e && void 0 === s.matches)
                          return (
                            d.push({
                              match: s,
                              locator: a.reverse(),
                              cd: g,
                              mloc: {},
                            }),
                            !0
                          );
                        if (void 0 !== s.matches) {
                          if (s.isGroup && f !== s) {
                            if (
                              (s = c(
                                t.matches[n.inArray(s, t.matches) + 1],
                                a,
                                f
                              ))
                            )
                              return !0;
                          } else if (s.isOptional) {
                            var S = s,
                              k = d.length;
                            if ((s = m(s, i, a, f))) {
                              if (
                                (n.each(d, function (e, t) {
                                  k <= e && (t.match.optionality = !0);
                                }),
                                (o = d[d.length - 1].match),
                                void 0 !== f || !v(o, S))
                              )
                                return !0;
                              (u = !0), (l = e);
                            }
                          } else if (s.isAlternator) {
                            var C,
                              E = s,
                              T = [],
                              _ = d.slice(),
                              P = a.length,
                              O = 0 < i.length ? i.shift() : -1;
                            if (-1 === O || "string" == typeof O) {
                              var I,
                                M = l,
                                L = i.slice(),
                                A = [];
                              if ("string" == typeof O) A = O.split(",");
                              else
                                for (I = 0; I < E.matches.length; I++)
                                  A.push(I.toString());
                              if (void 0 !== r.excludes[e]) {
                                for (
                                  var D = A.slice(),
                                    z = 0,
                                    $ = r.excludes[e].length;
                                  z < $;
                                  z++
                                ) {
                                  var B = r.excludes[e][z]
                                    .toString()
                                    .split(":");
                                  a.length == B[1] &&
                                    A.splice(A.indexOf(B[0]), 1);
                                }
                                0 === A.length &&
                                  (delete r.excludes[e], (A = D));
                              }
                              (!0 === p.keepStatic ||
                                (isFinite(parseInt(p.keepStatic)) &&
                                  M >= p.keepStatic)) &&
                                (A = A.slice(0, 1));
                              for (var G = !1, F = 0; F < A.length; F++) {
                                (I = parseInt(A[F])),
                                  (d = []),
                                  (i =
                                    ("string" == typeof O && y(l, I, P)) ||
                                    L.slice()),
                                  E.matches[I] &&
                                  c(E.matches[I], [I].concat(a), f)
                                    ? (s = !0)
                                    : 0 === F && (G = !0),
                                  (C = d.slice()),
                                  (l = M),
                                  (d = []);
                                for (var j = 0; j < C.length; j++) {
                                  var N = C[j],
                                    R = !1;
                                  (N.match.jit = N.match.jit || G),
                                    (N.alternation = N.alternation || P),
                                    w(N);
                                  for (var H = 0; H < T.length; H++) {
                                    var V = T[H];
                                    if (
                                      "string" != typeof O ||
                                      (void 0 !== N.alternation &&
                                        -1 !==
                                          n.inArray(
                                            N.locator[N.alternation].toString(),
                                            A
                                          ))
                                    ) {
                                      if (
                                        N.match.nativeDef === V.match.nativeDef
                                      ) {
                                        (R = !0), w(V, N);
                                        break;
                                      }
                                      if (b(N, V)) {
                                        w(N, V) &&
                                          ((R = !0),
                                          T.splice(T.indexOf(V), 0, N));
                                        break;
                                      }
                                      if (b(V, N)) {
                                        w(V, N);
                                        break;
                                      }
                                      if (
                                        ((U = V),
                                        !0 === (X = N).match.static &&
                                          !0 !== U.match.static &&
                                          U.match.fn.test(
                                            X.match.def,
                                            r,
                                            e,
                                            !1,
                                            p,
                                            !1
                                          ))
                                      ) {
                                        x(N, V) ||
                                        void 0 !==
                                          h.inputmask.userOptions.keepStatic
                                          ? w(N, V) &&
                                            ((R = !0),
                                            T.splice(T.indexOf(V), 0, N))
                                          : (p.keepStatic = !0);
                                        break;
                                      }
                                    }
                                  }
                                  R || T.push(N);
                                }
                              }
                              (d = _.concat(T)),
                                (l = e),
                                (u = 0 < d.length),
                                (s = 0 < T.length),
                                (i = L.slice());
                            } else
                              s = c(
                                E.matches[O] || t.matches[O],
                                [O].concat(a),
                                f
                              );
                            if (s) return !0;
                          } else if (
                            s.isQuantifier &&
                            f !== t.matches[n.inArray(s, t.matches) - 1]
                          )
                            for (
                              var q = s, W = 0 < i.length ? i.shift() : 0;
                              W <
                                (isNaN(q.quantifier.max)
                                  ? W + 1
                                  : q.quantifier.max) && l <= e;
                              W++
                            ) {
                              var Y = t.matches[n.inArray(q, t.matches) - 1];
                              if ((s = c(Y, [W].concat(a), Y))) {
                                if (
                                  (((o =
                                    d[d.length - 1].match).optionalQuantifier =
                                    W >= q.quantifier.min),
                                  (o.jit =
                                    (W || 1) * Y.matches.indexOf(o) >=
                                    q.quantifier.jit),
                                  o.optionalQuantifier && v(o, Y))
                                ) {
                                  (u = !0), (l = e);
                                  break;
                                }
                                return (
                                  o.jit &&
                                    (r.jitOffset[e] =
                                      Y.matches.length - Y.matches.indexOf(o)),
                                  !0
                                );
                              }
                            }
                          else if ((s = m(s, i, a, f))) return !0;
                        } else l++;
                        var X, U;
                      }
                      for (
                        var f = 0 < i.length ? i.shift() : 0;
                        f < t.matches.length;
                        f++
                      )
                        if (!0 !== t.matches[f].isQuantifier) {
                          var v = c(t.matches[f], [f].concat(s), a);
                          if (v && l === e) return v;
                          if (e < l) break;
                        }
                    }
                    if (-1 < e && (void 0 === i.maxLength || e < i.maxLength)) {
                      if (void 0 === t) {
                        for (
                          var f, v = e - 1;
                          void 0 === (f = r.validPositions[v] || r.tests[v]) &&
                          -1 < v;

                        )
                          v--;
                        void 0 !== f &&
                          -1 < v &&
                          ((c = (function (e, t) {
                            var i = [];
                            return (
                              n.isArray(t) || (t = [t]),
                              0 < t.length &&
                                (void 0 === t[0].alternation ||
                                !0 === p.keepStatic
                                  ? 0 ===
                                      (i = w(e, t.slice()).locator.slice())
                                        .length && (i = t[0].locator.slice())
                                  : n.each(t, function (e, t) {
                                      if ("" !== t.def)
                                        if (0 === i.length)
                                          i = t.locator.slice();
                                        else
                                          for (var n = 0; n < i.length; n++)
                                            t.locator[n] &&
                                              -1 ===
                                                i[n]
                                                  .toString()
                                                  .indexOf(t.locator[n]) &&
                                              (i[n] += "," + t.locator[n]);
                                    })),
                              i
                            );
                          })(v, f)),
                          (g = c.join("")),
                          (l = v));
                      }
                      if (r.tests[e] && r.tests[e][0].cd === g)
                        return r.tests[e];
                      for (var y = c.shift(); y < a.length; y++) {
                        if ((m(a[y], c, [y]) && l === e) || e < l) break;
                      }
                    }
                    return (
                      (0 !== d.length && !u) ||
                        d.push({
                          match: {
                            fn: null,
                            static: !0,
                            optionality: !1,
                            casing: null,
                            def: "",
                            placeholder: "",
                          },
                          locator: [],
                          mloc: {},
                          cd: g,
                        }),
                      void 0 !== t && r.tests[e]
                        ? n.extend(!0, [], d)
                        : ((r.tests[e] = n.extend(!0, [], d)), r.tests[e])
                    );
                  }
                  function E() {
                    return (
                      void 0 === r._buffer &&
                        ((r._buffer = m(!1, 1)),
                        void 0 === r.buffer && (r.buffer = r._buffer.slice())),
                      r._buffer
                    );
                  }
                  function T(e) {
                    return (
                      (void 0 !== r.buffer && !0 !== e) ||
                        ((r.buffer = m(!0, v(), !0)),
                        void 0 === r._buffer && (r._buffer = r.buffer.slice())),
                      r.buffer
                    );
                  }
                  function _(e, t, s) {
                    var o,
                      a,
                      l = p.skipOptionalPartCharacter,
                      c = g ? s.slice().reverse() : s;
                    if (((p.skipOptionalPartCharacter = ""), !0 === e))
                      f(),
                        (r.tests = {}),
                        (e = 0),
                        (t = s.length),
                        (a = j({ begin: 0, end: 0 }, !1).begin);
                    else {
                      for (o = e; o < t; o++) delete r.validPositions[o];
                      a = e;
                    }
                    var d = new n.Event("keypress");
                    for (o = e; o < t; o++) {
                      (d.which = c[o].toString().charCodeAt(0)),
                        (i.ignorable = !1);
                      var u = V.keypressEvent.call(h, d, !0, !1, !1, a);
                      !1 !== u && (a = u.forwardPosition);
                    }
                    p.skipOptionalPartCharacter = l;
                  }
                  function P(e, t, i) {
                    switch (p.casing || t.casing) {
                      case "upper":
                        e = e.toUpperCase();
                        break;
                      case "lower":
                        e = e.toLowerCase();
                        break;
                      case "title":
                        var s = r.validPositions[i - 1];
                        e =
                          0 === i ||
                          (s && s.input === String.fromCharCode(u.SPACE))
                            ? e.toUpperCase()
                            : e.toLowerCase();
                        break;
                      default:
                        if (n.isFunction(p.casing)) {
                          var o = Array.prototype.slice.call(arguments);
                          o.push(r.validPositions),
                            (e = p.casing.apply(this, o));
                        }
                    }
                    return e;
                  }
                  function O(e, t, i) {
                    for (
                      var s,
                        o = p.greedy ? t : t.slice(0, 1),
                        r = !1,
                        a = void 0 !== i ? i.split(",") : [],
                        l = 0;
                      l < a.length;
                      l++
                    )
                      -1 !== (s = e.indexOf(a[l])) && e.splice(s, 1);
                    for (var c = 0; c < e.length; c++)
                      if (-1 !== n.inArray(e[c], o)) {
                        r = !0;
                        break;
                      }
                    return r;
                  }
                  function I(e, t, i, s, o, a) {
                    var l,
                      c,
                      d,
                      u,
                      h,
                      g,
                      m,
                      b,
                      w,
                      x = n.extend(!0, {}, r.validPositions),
                      k = n.extend(!0, {}, r.tests),
                      C = !1,
                      E = !1,
                      T = void 0 !== o ? o : v();
                    if (
                      (a &&
                        ((b = a.begin),
                        (w = a.end),
                        a.begin > a.end && ((b = a.end), (w = a.begin))),
                      -1 === T && void 0 === o)
                    )
                      c = (u = S((l = 0))).alternation;
                    else
                      for (; 0 <= T; T--)
                        if (
                          (d = r.validPositions[T]) &&
                          void 0 !== d.alternation
                        ) {
                          if (
                            u &&
                            u.locator[d.alternation] !==
                              d.locator[d.alternation]
                          )
                            break;
                          (l = T),
                            (c = r.validPositions[l].alternation),
                            (u = d);
                        }
                    if (void 0 !== c) {
                      (m = parseInt(l)),
                        (r.excludes[m] = r.excludes[m] || []),
                        !0 !== e &&
                          r.excludes[m].push(y(u) + ":" + u.alternation);
                      var _ = [],
                        P = -1;
                      for (h = m; h < v(void 0, !0) + 1; h++)
                        -1 === P &&
                          e <= h &&
                          void 0 !== t &&
                          (_.push(t), (P = _.length - 1)),
                          (g = r.validPositions[h]) &&
                            !0 !== g.generatedInput &&
                            (void 0 === a || h < b || w <= h) &&
                            _.push(g.input),
                          delete r.validPositions[h];
                      for (
                        -1 === P &&
                        void 0 !== t &&
                        (_.push(t), (P = _.length - 1));
                        void 0 !== r.excludes[m] && r.excludes[m].length < 10;

                      ) {
                        for (
                          r.tests = {}, f(!0), C = !0, h = 0;
                          h < _.length &&
                          (C = M(
                            C.caret || v(void 0, !0) + 1,
                            _[h],
                            !1,
                            s,
                            !0
                          ));
                          h++
                        )
                          h === P && (E = C),
                            1 == e && C && (E = { caretPos: h });
                        if (C) break;
                        if (
                          (f(),
                          (u = S(m)),
                          (r.validPositions = n.extend(!0, {}, x)),
                          (r.tests = n.extend(!0, {}, k)),
                          !r.excludes[m])
                        ) {
                          E = I(e, t, i, s, m - 1, a);
                          break;
                        }
                        var O = y(u);
                        if (
                          -1 !== r.excludes[m].indexOf(O + ":" + u.alternation)
                        ) {
                          E = I(e, t, i, s, m - 1, a);
                          break;
                        }
                        for (
                          r.excludes[m].push(O + ":" + u.alternation), h = m;
                          h < v(void 0, !0) + 1;
                          h++
                        )
                          delete r.validPositions[h];
                      }
                    }
                    return (
                      (E && !1 === p.keepStatic) || delete r.excludes[m], E
                    );
                  }
                  function M(e, t, s, o, a, l, c) {
                    function d(e) {
                      return g
                        ? 1 < e.begin - e.end || e.begin - e.end == 1
                        : 1 < e.end - e.begin || e.end - e.begin == 1;
                    }
                    s = !0 === s;
                    var u = e;
                    function m(e) {
                      if (void 0 !== e) {
                        if (
                          (void 0 !== e.remove &&
                            (n.isArray(e.remove) || (e.remove = [e.remove]),
                            n.each(
                              e.remove.sort(function (e, t) {
                                return t.pos - e.pos;
                              }),
                              function (e, t) {
                                A({ begin: t, end: t + 1 });
                              }
                            ),
                            (e.remove = void 0)),
                          void 0 !== e.insert &&
                            (n.isArray(e.insert) || (e.insert = [e.insert]),
                            n.each(
                              e.insert.sort(function (e, t) {
                                return e.pos - t.pos;
                              }),
                              function (e, t) {
                                "" !== t.c &&
                                  M(
                                    t.pos,
                                    t.c,
                                    void 0 === t.strict || t.strict,
                                    void 0 !== t.fromIsValid ? t.fromIsValid : o
                                  );
                              }
                            ),
                            (e.insert = void 0)),
                          e.refreshFromBuffer && e.buffer)
                        ) {
                          var t = e.refreshFromBuffer;
                          _(!0 === t ? t : t.start, t.end, e.buffer),
                            (e.refreshFromBuffer = void 0);
                        }
                        void 0 !== e.rewritePosition &&
                          ((u = e.rewritePosition), (e = !0));
                      }
                      return e;
                    }
                    function v(t, i, s) {
                      var a = !1;
                      return (
                        n.each(C(t), function (l, c) {
                          var u = c.match;
                          if (
                            (T(!0),
                            !1 !==
                              (a =
                                null != u.fn
                                  ? u.fn.test(i, r, t, s, p, d(e))
                                  : (i === u.def ||
                                      i === p.skipOptionalPartCharacter) &&
                                    "" !== u.def && {
                                      c: G(t, u, !0) || u.def,
                                      pos: t,
                                    }))
                          ) {
                            var h = void 0 !== a.c ? a.c : i,
                              g = t;
                            return (
                              (h =
                                h === p.skipOptionalPartCharacter &&
                                !0 === u.static
                                  ? G(t, u, !0) || u.def
                                  : h),
                              !0 !== (a = m(a)) &&
                                void 0 !== a.pos &&
                                a.pos !== t &&
                                (g = a.pos),
                              (!0 !== a &&
                                void 0 === a.pos &&
                                void 0 === a.c) ||
                                (!1 ===
                                  A(
                                    e,
                                    n.extend({}, c, { input: P(h, u, g) }),
                                    o,
                                    g
                                  ) &&
                                  (a = !1)),
                              !1
                            );
                          }
                        }),
                        a
                      );
                    }
                    void 0 !== e.begin && (u = g ? e.end : e.begin);
                    var y = !0,
                      b = n.extend(!0, {}, r.validPositions);
                    if (
                      !1 === p.keepStatic &&
                      void 0 !== r.excludes[u] &&
                      !0 !== a &&
                      !0 !== o
                    )
                      for (var w = u; w < (g ? e.begin : e.end); w++)
                        void 0 !== r.excludes[w] &&
                          ((r.excludes[w] = void 0), delete r.tests[w]);
                    if (
                      (n.isFunction(p.preValidation) &&
                        !0 !== o &&
                        !0 !== l &&
                        (y = m(
                          (y = p.preValidation.call(
                            h,
                            T(),
                            u,
                            t,
                            d(e),
                            p,
                            r,
                            e,
                            s || a
                          ))
                        )),
                      !0 === y)
                    ) {
                      if (void 0 === i.maxLength || u < i.maxLength) {
                        if (
                          ((y = v(u, t, s)),
                          (!s || !0 === o) && !1 === y && !0 !== l)
                        ) {
                          var x = r.validPositions[u];
                          if (
                            !x ||
                            !0 !== x.match.static ||
                            (x.match.def !== t &&
                              t !== p.skipOptionalPartCharacter)
                          ) {
                            if (
                              p.insertMode ||
                              void 0 === r.validPositions[z(u)] ||
                              e.end > u
                            ) {
                              var S = !1;
                              if (
                                (r.jitOffset[u] &&
                                  void 0 === r.validPositions[z(u)] &&
                                  !1 !== (y = M(u + r.jitOffset[u], t, !0)) &&
                                  (!0 !== a && (y.caret = u), (S = !0)),
                                e.end > u && (r.validPositions[u] = void 0),
                                !S && !D(u, p.keepStatic))
                              )
                                for (var k = u + 1, E = z(u); k <= E; k++)
                                  if (!1 !== (y = v(k, t, s))) {
                                    (y =
                                      L(u, void 0 !== y.pos ? y.pos : k) || y),
                                      (u = k);
                                    break;
                                  }
                            }
                          } else y = { caret: z(u) };
                        }
                      } else y = !1;
                      !1 !== y ||
                      !p.keepStatic ||
                      (!Z(T()) && 0 !== u) ||
                      s ||
                      !0 === a
                        ? d(e) &&
                          r.tests[u] &&
                          1 < r.tests[u].length &&
                          p.keepStatic &&
                          !s &&
                          !0 !== a &&
                          (y = I(!0))
                        : (y = I(u, t, s, o, void 0, e)),
                        !0 === y && (y = { pos: u });
                    }
                    if (
                      n.isFunction(p.postValidation) &&
                      !0 !== o &&
                      !0 !== l
                    ) {
                      var O = p.postValidation.call(
                        h,
                        T(!0),
                        void 0 !== e.begin ? (g ? e.end : e.begin) : e,
                        t,
                        y,
                        p,
                        r,
                        s,
                        c
                      );
                      void 0 !== O && (y = !0 === O ? y : O);
                    }
                    return (
                      y && void 0 === y.pos && (y.pos = u),
                      !1 === y || !0 === l
                        ? (f(!0), (r.validPositions = n.extend(!0, {}, b)))
                        : L(void 0, u, !0),
                      m(y)
                    );
                  }
                  function L(e, t, i) {
                    if (void 0 === e)
                      for (e = t - 1; 0 < e && !r.validPositions[e]; e--);
                    for (var s = e; s < t; s++)
                      if (void 0 === r.validPositions[s] && !D(s, !0)) {
                        if (0 == s ? S(s) : r.validPositions[s - 1]) {
                          var o = C(s).slice();
                          "" === o[o.length - 1].match.def && o.pop();
                          var a,
                            l = w(s, o);
                          if (
                            l &&
                            (!0 !== l.match.jit ||
                              ("master" === l.match.newBlockMarker &&
                                (a = r.validPositions[s + 1]) &&
                                !0 === a.match.optionalQuantifier)) &&
                            (((l = n.extend({}, l, {
                              input: G(s, l.match, !0) || l.match.def,
                            })).generatedInput = !0),
                            A(s, l, !0),
                            !0 !== i)
                          ) {
                            var c = r.validPositions[t].input;
                            return (
                              (r.validPositions[t] = void 0), M(t, c, !0, !0)
                            );
                          }
                        }
                      }
                  }
                  function A(e, t, i, s) {
                    function o(e, t, i) {
                      var n = t[e];
                      if (
                        void 0 === n ||
                        !0 !== n.match.static ||
                        !0 === n.match.optionality ||
                        (void 0 !== t[0] && void 0 !== t[0].alternation)
                      )
                        return !1;
                      var s =
                          i.begin <= e - 1
                            ? t[e - 1] &&
                              !0 === t[e - 1].match.static &&
                              t[e - 1]
                            : t[e - 1],
                        o =
                          i.end > e + 1
                            ? t[e + 1] &&
                              !0 === t[e + 1].match.static &&
                              t[e + 1]
                            : t[e + 1];
                      return s && o;
                    }
                    var a = 0,
                      l = void 0 !== e.begin ? e.begin : e,
                      c = void 0 !== e.end ? e.end : e;
                    if (
                      (e.begin > e.end && ((l = e.end), (c = e.begin)),
                      (s = void 0 !== s ? s : l),
                      l !== c ||
                        (p.insertMode &&
                          void 0 !== r.validPositions[s] &&
                          void 0 === i) ||
                        void 0 === t)
                    ) {
                      var d,
                        u = n.extend(!0, {}, r.validPositions),
                        h = v(void 0, !0);
                      for (r.p = l, d = h; l <= d; d--)
                        delete r.validPositions[d],
                          void 0 === t && delete r.tests[d + 1];
                      var g,
                        m,
                        y = !0,
                        b = s,
                        w = b;
                      for (
                        t &&
                          ((r.validPositions[s] = n.extend(!0, {}, t)),
                          w++,
                          b++),
                          d = t ? c : c - 1;
                        d <= h;
                        d++
                      ) {
                        if (
                          void 0 !== (g = u[d]) &&
                          !0 !== g.generatedInput &&
                          (c <= d || (l <= d && o(d, u, { begin: l, end: c })))
                        ) {
                          for (; "" !== S(w).match.def; ) {
                            if (
                              !1 !== (m = k(w, g, p)) ||
                              "+" === g.match.def
                            ) {
                              "+" === g.match.def && T(!0);
                              var x = M(
                                w,
                                g.input,
                                "+" !== g.match.def,
                                "+" !== g.match.def
                              );
                              if (
                                ((y = !1 !== x),
                                (b = (x.pos || w) + 1),
                                !y && m)
                              )
                                break;
                            } else y = !1;
                            if (y) {
                              void 0 === t &&
                                g.match.static &&
                                d === e.begin &&
                                a++;
                              break;
                            }
                            if (!y && w > r.maskLength) break;
                            w++;
                          }
                          "" == S(w).match.def && (y = !1), (w = b);
                        }
                        if (!y) break;
                      }
                      if (!y)
                        return (
                          (r.validPositions = n.extend(!0, {}, u)), f(!0), !1
                        );
                    } else
                      t &&
                        S(s).match.cd === t.match.cd &&
                        (r.validPositions[s] = n.extend(!0, {}, t));
                    return f(!0), a;
                  }
                  function D(e, t, i) {
                    var n = x(e).match;
                    if (("" === n.def && (n = S(e).match), !0 !== n.static))
                      return n.fn;
                    if (
                      !0 === i &&
                      void 0 !== r.validPositions[e] &&
                      !0 !== r.validPositions[e].generatedInput
                    )
                      return !0;
                    if (!0 !== t && -1 < e) {
                      if (i) {
                        var s = C(e);
                        return (
                          s.length >
                          1 + ("" === s[s.length - 1].match.def ? 1 : 0)
                        );
                      }
                      var o = w(e, C(e)),
                        a = G(e, o.match);
                      return o.match.def !== a;
                    }
                    return !1;
                  }
                  function z(e, t, i) {
                    void 0 === i && (i = !0);
                    for (
                      var n = e + 1;
                      "" !== S(n).match.def &&
                      ((!0 === t &&
                        (!0 !== S(n).match.newBlockMarker ||
                          !D(n, void 0, !0))) ||
                        (!0 !== t && !D(n, void 0, i)));

                    )
                      n++;
                    return n;
                  }
                  function $(e, t) {
                    var i,
                      n = e;
                    if (n <= 0) return 0;
                    for (
                      ;
                      0 < --n &&
                      ((!0 === t && !0 !== S(n).match.newBlockMarker) ||
                        (!0 !== t &&
                          !D(n, void 0, !0) &&
                          ((i = C(n)).length < 2 ||
                            (2 === i.length && "" === i[1].match.def))));

                    );
                    return n;
                  }
                  function B(e, t, s, o, r) {
                    if (o && n.isFunction(p.onBeforeWrite)) {
                      var a = p.onBeforeWrite.call(i, o, t, s, p);
                      if (a) {
                        if (a.refreshFromBuffer) {
                          var l = a.refreshFromBuffer;
                          _(!0 === l ? l : l.start, l.end, a.buffer || t),
                            (t = T(!0));
                        }
                        void 0 !== s && (s = void 0 !== a.caret ? a.caret : s);
                      }
                    }
                    if (
                      void 0 !== e &&
                      (e.inputmask._valueSet(t.join("")),
                      void 0 === s ||
                        (void 0 !== o && "blur" === o.type) ||
                        X(
                          e,
                          s,
                          void 0,
                          void 0,
                          void 0 !== o &&
                            "keydown" === o.type &&
                            (o.keyCode === u.DELETE ||
                              o.keyCode === u.BACKSPACE)
                        ),
                      !0 === r)
                    ) {
                      var c = n(e),
                        d = e.inputmask._valueGet();
                      (e.inputmask.skipInputEvent = !0),
                        c.trigger("input"),
                        setTimeout(function () {
                          d === E().join("")
                            ? c.trigger("cleared")
                            : !0 === Z(t) && c.trigger("complete");
                        }, 0);
                    }
                  }
                  function G(e, t, i) {
                    if (
                      void 0 !== (t = t || S(e).match).placeholder ||
                      !0 === i
                    )
                      return n.isFunction(t.placeholder)
                        ? t.placeholder(p)
                        : t.placeholder;
                    if (!0 !== t.static)
                      return p.placeholder.charAt(e % p.placeholder.length);
                    if (-1 < e && void 0 === r.validPositions[e]) {
                      var s,
                        o = C(e),
                        a = [];
                      if (
                        o.length >
                        1 + ("" === o[o.length - 1].match.def ? 1 : 0)
                      )
                        for (var l = 0; l < o.length; l++)
                          if (
                            "" !== o[l].match.def &&
                            !0 !== o[l].match.optionality &&
                            !0 !== o[l].match.optionalQuantifier &&
                            (!0 === o[l].match.static ||
                              void 0 === s ||
                              !1 !==
                                o[l].match.fn.test(s.match.def, r, e, !0, p)) &&
                            (a.push(o[l]),
                            !0 === o[l].match.static && (s = o[l]),
                            1 < a.length && /[0-9a-bA-Z]/.test(a[0].match.def))
                          )
                            return p.placeholder.charAt(
                              e % p.placeholder.length
                            );
                    }
                    return t.def;
                  }
                  function F(e, t) {
                    if (a) {
                      if (
                        e.inputmask._valueGet() !== t &&
                        (e.placeholder !== t || "" === e.placeholder)
                      ) {
                        var i = T().slice(),
                          n = e.inputmask._valueGet();
                        if (n !== t) {
                          var s = v();
                          -1 === s && n === E().join("")
                            ? (i = [])
                            : -1 !== s && K(i),
                            B(e, i);
                        }
                      }
                    } else
                      e.placeholder !== t &&
                        ((e.placeholder = t),
                        "" === e.placeholder &&
                          e.removeAttribute("placeholder"));
                  }
                  function j(e, t) {
                    if (
                      (t && (g ? (e.end = e.begin) : (e.begin = e.end)),
                      e.begin === e.end)
                    ) {
                      switch (p.positionCaretOnClick) {
                        case "none":
                          break;
                        case "select":
                          e = { begin: 0, end: T().length };
                          break;
                        case "ignore":
                          e.end = e.begin = z(v());
                          break;
                        case "radixFocus":
                          if (
                            (function (e) {
                              if ("" !== p.radixPoint && 0 !== p.digits) {
                                var t = r.validPositions;
                                if (void 0 === t[e] || t[e].input === G(e)) {
                                  if (e < z(-1)) return !0;
                                  var i = n.inArray(p.radixPoint, T());
                                  if (-1 !== i) {
                                    for (var s in t)
                                      if (t[s] && i < s && t[s].input !== G(s))
                                        return !1;
                                    return !0;
                                  }
                                }
                              }
                              return !1;
                            })(e.begin)
                          ) {
                            var i = T().join("").indexOf(p.radixPoint);
                            e.end = e.begin = p.numericInput ? z(i) : i;
                            break;
                          }
                        default:
                          var s = e.begin,
                            o = v(s, !0),
                            a = z(-1 !== o || D(0) ? o : 0);
                          if (s < a)
                            e.end = e.begin =
                              D(s, !0) || D(s - 1, !0) ? s : z(s);
                          else {
                            var l = r.validPositions[o],
                              c = x(a, l ? l.match.locator : void 0, l),
                              d = G(a, c.match);
                            if (
                              ("" !== d &&
                                T()[a] !== d &&
                                !0 !== c.match.optionalQuantifier &&
                                !0 !== c.match.newBlockMarker) ||
                              (!D(a, p.keepStatic) && c.match.def === d)
                            ) {
                              var u = z(a);
                              (u <= s || s === a) && (a = u);
                            }
                            e.end = e.begin = a;
                          }
                      }
                      return e;
                    }
                  }
                  var N,
                    R = function (e, t, i) {
                      var s = function (t) {
                        t.originalEvent &&
                          ((t = t.originalEvent || t), (arguments[0] = t));
                        var s,
                          o = this,
                          r = o.inputmask;
                        if (void 0 === r && "FORM" !== this.nodeName) {
                          var a = n.data(o, "_inputmask_opts");
                          n(o).off(), a && new Inputmask(a).mask(o);
                        } else {
                          if (
                            "setvalue" === t.type ||
                            "FORM" === this.nodeName ||
                            !(
                              o.disabled ||
                              (o.readOnly &&
                                !(
                                  ("keydown" === t.type &&
                                    t.ctrlKey &&
                                    67 === t.keyCode) ||
                                  (!1 === p.tabThrough && t.keyCode === u.TAB)
                                ))
                            )
                          ) {
                            switch (t.type) {
                              case "input":
                                if (
                                  !0 === r.skipInputEvent ||
                                  (t.inputType &&
                                    "insertCompositionText" === t.inputType)
                                )
                                  return (
                                    (r.skipInputEvent = !1), t.preventDefault()
                                  );
                                break;
                              case "keydown":
                                (r.skipKeyPressEvent = !1),
                                  (r.skipInputEvent = !1);
                                break;
                              case "keypress":
                                if (!0 === r.skipKeyPressEvent)
                                  return t.preventDefault();
                                r.skipKeyPressEvent = !0;
                                break;
                              case "click":
                              case "focus":
                                return (
                                  r.validationEvent
                                    ? ((r.validationEvent = !1),
                                      e.blur(),
                                      F(
                                        e,
                                        (g ? E().slice().reverse() : E()).join(
                                          ""
                                        )
                                      ),
                                      setTimeout(function () {
                                        e.focus();
                                      }, 3e3))
                                    : ((s = arguments),
                                      setTimeout(function () {
                                        e.inputmask && i.apply(o, s);
                                      }, 0)),
                                  !1
                                );
                            }
                            var l = i.apply(o, arguments);
                            return (
                              !1 === l &&
                                (t.preventDefault(), t.stopPropagation()),
                              l
                            );
                          }
                          t.preventDefault();
                        }
                      };
                      (e.inputmask.events[t] = e.inputmask.events[t] || []),
                        e.inputmask.events[t].push(s),
                        -1 !== n.inArray(t, ["submit", "reset"])
                          ? null !== e.form && n(e.form).on(t, s)
                          : n(e).on(t, s);
                    },
                    H = function (e, t) {
                      var i;
                      e.inputmask &&
                        e.inputmask.events &&
                        (t
                          ? ((i = [])[t] = e.inputmask.events[t])
                          : (i = e.inputmask.events),
                        n.each(i, function (t, i) {
                          for (; 0 < i.length; ) {
                            var s = i.pop();
                            -1 !== n.inArray(t, ["submit", "reset"])
                              ? null !== e.form && n(e.form).off(t, s)
                              : n(e).off(t, s);
                          }
                          delete e.inputmask.events[t];
                        }));
                    },
                    V = {
                      keydownEvent: function (e) {
                        var t = this,
                          s = n(t),
                          o = e.keyCode,
                          a = X(t),
                          l = p.onKeyDown.call(this, e, T(), a, p);
                        if (void 0 !== l) return l;
                        if (
                          o === u.BACKSPACE ||
                          o === u.DELETE ||
                          (d && o === u.BACKSPACE_SAFARI) ||
                          (e.ctrlKey && o === u.X && !("oncut" in t))
                        )
                          e.preventDefault(),
                            Q(t, o, a),
                            B(
                              t,
                              T(!0),
                              r.p,
                              e,
                              t.inputmask._valueGet() !== T().join("")
                            );
                        else if (o === u.END || o === u.PAGE_DOWN) {
                          e.preventDefault();
                          var c = z(v());
                          X(t, e.shiftKey ? a.begin : c, c, !0);
                        } else
                          (o === u.HOME && !e.shiftKey) || o === u.PAGE_UP
                            ? (e.preventDefault(),
                              X(t, 0, e.shiftKey ? a.begin : 0, !0))
                            : ((p.undoOnEscape && o === u.ESCAPE) ||
                                (90 === o && e.ctrlKey)) &&
                              !0 !== e.altKey
                            ? (q(t, !0, !1, i.undoValue.split("")),
                              s.trigger("click"))
                            : !0 === p.tabThrough && o === u.TAB
                            ? (!0 === e.shiftKey
                                ? (!0 === S(a.begin).match.static &&
                                    (a.begin = z(a.begin)),
                                  (a.end = $(a.begin, !0)),
                                  (a.begin = $(a.end, !0)))
                                : ((a.begin = z(a.begin, !0)),
                                  (a.end = z(a.begin, !0)),
                                  a.end < r.maskLength && a.end--),
                              a.begin < r.maskLength &&
                                (e.preventDefault(), X(t, a.begin, a.end)))
                            : e.shiftKey ||
                              (p.insertModeVisual &&
                                !1 === p.insertMode &&
                                (o === u.RIGHT
                                  ? setTimeout(function () {
                                      var e = X(t);
                                      X(t, e.begin);
                                    }, 0)
                                  : o === u.LEFT &&
                                    setTimeout(function () {
                                      var e = Y(t.inputmask.caretPos.begin);
                                      Y(t.inputmask.caretPos.end);
                                      X(
                                        t,
                                        g
                                          ? e + (e === r.maskLength ? 0 : 1)
                                          : e - (0 === e ? 0 : 1)
                                      );
                                    }, 0)));
                        i.ignorable = -1 !== n.inArray(o, p.ignorables);
                      },
                      keypressEvent: function (e, t, s, o, a) {
                        var l = this,
                          c = n(l),
                          d = e.which || e.charCode || e.keyCode;
                        if (
                          !(!0 === t || (e.ctrlKey && e.altKey)) &&
                          (e.ctrlKey || e.metaKey || i.ignorable)
                        )
                          return (
                            d === u.ENTER &&
                              i.undoValue !== T().join("") &&
                              ((i.undoValue = T().join("")),
                              setTimeout(function () {
                                c.trigger("change");
                              }, 0)),
                            (i.skipInputEvent = !0),
                            !0
                          );
                        if (d) {
                          (44 !== d && 46 !== d) ||
                            3 !== e.location ||
                            "" === p.radixPoint ||
                            (d = p.radixPoint.charCodeAt(0));
                          var h,
                            g = t ? { begin: a, end: a } : X(l),
                            m = String.fromCharCode(d);
                          r.writeOutBuffer = !0;
                          var v = M(g, m, o, void 0, void 0, void 0, t);
                          if (
                            (!1 !== v &&
                              (f(!0),
                              (h =
                                void 0 !== v.caret
                                  ? v.caret
                                  : z(v.pos.begin ? v.pos.begin : v.pos)),
                              (r.p = h)),
                            (h =
                              p.numericInput && void 0 === v.caret ? $(h) : h),
                            !1 !== s &&
                              (setTimeout(function () {
                                p.onKeyValidation.call(l, d, v);
                              }, 0),
                              r.writeOutBuffer && !1 !== v))
                          ) {
                            var y = T();
                            B(l, y, h, e, !0 !== t);
                          }
                          if ((e.preventDefault(), t))
                            return !1 !== v && (v.forwardPosition = h), v;
                        }
                      },
                      pasteEvent: function (e) {
                        var t,
                          o = this.inputmask._valueGet(!0),
                          r = X(this);
                        g && ((t = r.end), (r.end = r.begin), (r.begin = t));
                        var a = o.substr(0, r.begin),
                          l = o.substr(r.end, o.length);
                        if (
                          (a ==
                            (g ? E().slice().reverse() : E())
                              .slice(0, r.begin)
                              .join("") && (a = ""),
                          l ==
                            (g ? E().slice().reverse() : E())
                              .slice(r.end)
                              .join("") && (l = ""),
                          s.clipboardData && s.clipboardData.getData)
                        )
                          o = a + s.clipboardData.getData("Text") + l;
                        else {
                          if (!e.clipboardData || !e.clipboardData.getData)
                            return !0;
                          o = a + e.clipboardData.getData("text/plain") + l;
                        }
                        var c = o;
                        if (n.isFunction(p.onBeforePaste)) {
                          if (!1 === (c = p.onBeforePaste.call(i, o, p)))
                            return e.preventDefault();
                          c = c || o;
                        }
                        return (
                          q(this, !0, !1, c.toString().split(""), e),
                          e.preventDefault()
                        );
                      },
                      inputFallBackEvent: function (e) {
                        var t = this,
                          s = t.inputmask._valueGet(!0),
                          r = (g ? T().slice().reverse() : T()).join(""),
                          a = X(t, void 0, void 0, !0);
                        if (r !== s) {
                          s = (function (e, t, i) {
                            if (c) {
                              var n = t.replace(T().join(""), "");
                              if (1 === n.length) {
                                var s = t.split("");
                                s.splice(i.begin, 0, n), (t = s.join(""));
                              }
                            }
                            return t;
                          })(0, s, a);
                          var l = (function (e, t, i) {
                            for (
                              var n,
                                s,
                                o,
                                r = e.substr(0, i.begin).split(""),
                                a = e.substr(i.begin).split(""),
                                l = t.substr(0, i.begin).split(""),
                                c = t.substr(i.begin).split(""),
                                d = r.length >= l.length ? r.length : l.length,
                                u = a.length >= c.length ? a.length : c.length,
                                h = "",
                                g = [];
                              r.length < d;

                            )
                              r.push("~");
                            for (; l.length < d; ) l.push("~");
                            for (; a.length < u; ) a.unshift("~");
                            for (; c.length < u; ) c.unshift("~");
                            var m = r.concat(a),
                              f = l.concat(c);
                            for (s = 0, n = m.length; s < n; s++)
                              switch (((o = G(Y(s))), h)) {
                                case "insertText":
                                  f[s - 1] === m[s] &&
                                    i.begin == m.length - 1 &&
                                    g.push(m[s]),
                                    (s = n);
                                  break;
                                case "insertReplacementText":
                                case "deleteContentBackward":
                                  "~" === m[s] ? i.end++ : (s = n);
                                  break;
                                default:
                                  m[s] !== f[s] &&
                                    (("~" !== m[s + 1] &&
                                      m[s + 1] !== o &&
                                      void 0 !== m[s + 1]) ||
                                    ((f[s] !== o || "~" !== f[s + 1]) &&
                                      "~" !== f[s])
                                      ? "~" === f[s + 1] && f[s] === m[s + 1]
                                        ? ((h = "insertText"),
                                          g.push(m[s]),
                                          i.begin--,
                                          i.end--)
                                        : m[s] !== o &&
                                          "~" !== m[s] &&
                                          ("~" === m[s + 1] ||
                                            (f[s] !== m[s] &&
                                              f[s + 1] === m[s + 1]))
                                        ? ((h = "insertReplacementText"),
                                          g.push(m[s]),
                                          i.begin--)
                                        : "~" === m[s]
                                        ? ((h = "deleteContentBackward"),
                                          (!D(Y(s), !0) &&
                                            f[s] !== p.radixPoint) ||
                                            i.end++)
                                        : (s = n)
                                      : ((h = "insertText"),
                                        g.push(m[s]),
                                        i.begin--,
                                        i.end--));
                              }
                            return { action: h, data: g, caret: i };
                          })(s, r, a);
                          switch (
                            ((t.inputmask.shadowRoot || o).activeElement !==
                              t && t.focus(),
                            B(t, T()),
                            X(t, a.begin, a.end, !0),
                            l.action)
                          ) {
                            case "insertText":
                            case "insertReplacementText":
                              n.each(l.data, function (e, s) {
                                var o = new n.Event("keypress");
                                (o.which = s.charCodeAt(0)),
                                  (i.ignorable = !1),
                                  V.keypressEvent.call(t, o);
                              }),
                                setTimeout(function () {
                                  i.$el.trigger("keyup");
                                }, 0);
                              break;
                            case "deleteContentBackward":
                              var d = new n.Event("keydown");
                              (d.keyCode = u.BACKSPACE),
                                V.keydownEvent.call(t, d);
                              break;
                            default:
                              J(t, s);
                          }
                          e.preventDefault();
                        }
                      },
                      compositionendEvent: function (e) {
                        i.$el.trigger("input");
                      },
                      setValueEvent: function (e, t, i) {
                        var n = e && e.detail ? e.detail[0] : t;
                        void 0 === n && (n = this.inputmask._valueGet(!0)),
                          J(this, n),
                          ((e.detail && void 0 !== e.detail[1]) ||
                            void 0 !== i) &&
                            X(this, e.detail ? e.detail[1] : i);
                      },
                      focusEvent: function (e) {
                        var t = this.inputmask._valueGet();
                        p.showMaskOnFocus &&
                          t !== T().join("") &&
                          B(this, T(), z(v())),
                          !0 !== p.positionCaretOnTab ||
                            !1 !== i.mouseEnter ||
                            (Z(T()) && -1 !== v()) ||
                            V.clickEvent.apply(this, [e, !0]),
                          (i.undoValue = T().join(""));
                      },
                      invalidEvent: function (e) {
                        i.validationEvent = !0;
                      },
                      mouseleaveEvent: function () {
                        (i.mouseEnter = !1),
                          p.clearMaskOnLostFocus &&
                            (this.inputmask.shadowRoot || o).activeElement !==
                              this &&
                            F(this, i.originalPlaceholder);
                      },
                      clickEvent: function (e, t) {
                        if (
                          (this.inputmask.shadowRoot || o).activeElement ===
                          this
                        ) {
                          var i = j(X(this), t);
                          void 0 !== i && X(this, i);
                        }
                      },
                      cutEvent: function (e) {
                        var t = X(this),
                          n = s.clipboardData || e.clipboardData,
                          a = g
                            ? T().slice(t.end, t.begin)
                            : T().slice(t.begin, t.end);
                        n.setData(
                          "text",
                          g ? a.reverse().join("") : a.join("")
                        ),
                          o.execCommand && o.execCommand("copy"),
                          Q(this, u.DELETE, t),
                          B(this, T(), r.p, e, i.undoValue !== T().join(""));
                      },
                      blurEvent: function (e) {
                        var t = n(this);
                        if (this.inputmask) {
                          F(this, i.originalPlaceholder);
                          var s = this.inputmask._valueGet(),
                            o = T().slice();
                          "" !== s &&
                            (p.clearMaskOnLostFocus &&
                              (-1 === v() && s === E().join("")
                                ? (o = [])
                                : K(o)),
                            !1 === Z(o) &&
                              (setTimeout(function () {
                                t.trigger("incomplete");
                              }, 0),
                              p.clearIncomplete &&
                                (f(),
                                (o = p.clearMaskOnLostFocus
                                  ? []
                                  : E().slice()))),
                            B(this, o, void 0, e)),
                            i.undoValue !== T().join("") &&
                              ((i.undoValue = T().join("")),
                              t.trigger("change"));
                        }
                      },
                      mouseenterEvent: function () {
                        (i.mouseEnter = !0),
                          (this.inputmask.shadowRoot || o).activeElement !==
                            this &&
                            (null == i.originalPlaceholder &&
                              this.placeholder !== i.originalPlaceholder &&
                              (i.originalPlaceholder = this.placeholder),
                            p.showMaskOnHover &&
                              F(
                                this,
                                (g ? E().slice().reverse() : E()).join("")
                              ));
                      },
                      submitEvent: function () {
                        i.undoValue !== T().join("") && i.$el.trigger("change"),
                          p.clearMaskOnLostFocus &&
                            -1 === v() &&
                            h.inputmask._valueGet &&
                            h.inputmask._valueGet() === E().join("") &&
                            h.inputmask._valueSet(""),
                          p.clearIncomplete &&
                            !1 === Z(T()) &&
                            h.inputmask._valueSet(""),
                          p.removeMaskOnSubmit &&
                            (h.inputmask._valueSet(
                              h.inputmask.unmaskedvalue(),
                              !0
                            ),
                            setTimeout(function () {
                              B(h, T());
                            }, 0));
                      },
                      resetEvent: function () {
                        (h.inputmask.refreshValue = !0),
                          setTimeout(function () {
                            J(h, h.inputmask._valueGet(!0));
                          }, 0);
                      },
                    };
                  function q(e, t, i, s, o) {
                    var a = this || e.inputmask,
                      l = s.slice(),
                      c = "",
                      d = -1,
                      u = void 0;
                    f(),
                      (r.tests = {}),
                      (d = p.radixPoint ? j({ begin: 0, end: 0 }).begin : 0),
                      (r.p = d),
                      (a.caretPos = { begin: d });
                    var h = [],
                      y = a.caretPos;
                    if (
                      (n.each(l, function (t, s) {
                        if (void 0 !== s)
                          if (
                            void 0 === r.validPositions[t] &&
                            l[t] === G(t) &&
                            D(t, !0) &&
                            !1 === M(t, l[t], !0, void 0, void 0, !0)
                          )
                            r.p++;
                          else {
                            var o = new n.Event("_checkval");
                            (o.which = s.toString().charCodeAt(0)), (c += s);
                            var p = v(void 0, !0);
                            !(function (e, t) {
                              for (
                                var i = m(!0, 0)
                                    .slice(e, z(e))
                                    .join("")
                                    .replace(/'/g, ""),
                                  n = i.indexOf(t);
                                0 < n && " " === i[n - 1];

                              )
                                n--;
                              var s =
                                0 === n &&
                                !D(e) &&
                                (S(e).match.nativeDef === t.charAt(0) ||
                                  (!0 === S(e).match.static &&
                                    S(e).match.nativeDef ===
                                      "'" + t.charAt(0)) ||
                                  (" " === S(e).match.nativeDef &&
                                    (S(e + 1).match.nativeDef === t.charAt(0) ||
                                      (!0 === S(e + 1).match.static &&
                                        S(e + 1).match.nativeDef ===
                                          "'" + t.charAt(0)))));
                              if (!s && 0 < n && !D(e, !1, !0)) {
                                var o = z(e);
                                a.caretPos.begin < o &&
                                  (a.caretPos = { begin: o });
                              }
                              return s;
                            })(d, c)
                              ? (u = V.keypressEvent.call(
                                  e,
                                  o,
                                  !0,
                                  !1,
                                  i,
                                  a.caretPos.begin
                                )) && ((d = a.caretPos.begin + 1), (c = ""))
                              : (u = V.keypressEvent.call(
                                  e,
                                  o,
                                  !0,
                                  !1,
                                  i,
                                  p + 1
                                )),
                              u
                                ? (void 0 !== u.pos &&
                                    r.validPositions[u.pos] &&
                                    !0 ===
                                      r.validPositions[u.pos].match.static &&
                                    void 0 ===
                                      r.validPositions[u.pos].alternation &&
                                    (h.push(u.pos),
                                    g || (u.forwardPosition = u.pos + 1)),
                                  B(void 0, T(), u.forwardPosition, o, !1),
                                  (a.caretPos = {
                                    begin: u.forwardPosition,
                                    end: u.forwardPosition,
                                  }),
                                  (y = a.caretPos))
                                : (a.caretPos = y);
                          }
                      }),
                      0 < h.length)
                    ) {
                      var b,
                        w,
                        x = z(-1, void 0, !1);
                      if (
                        (!Z(T()) && h.length <= x) ||
                        (Z(T()) && 0 < h.length && h.length !== x && 0 === h[0])
                      )
                        for (var k = x; void 0 !== (b = h.shift()); ) {
                          var C = new n.Event("_checkval");
                          if (
                            (((w = r.validPositions[b]).generatedInput = !0),
                            (C.which = w.input.charCodeAt(0)),
                            (u = V.keypressEvent.call(e, C, !0, !1, i, k)) &&
                              void 0 !== u.pos &&
                              u.pos !== b &&
                              r.validPositions[u.pos] &&
                              !0 === r.validPositions[u.pos].match.static)
                          )
                            h.push(u.pos);
                          else if (!u) break;
                          k++;
                        }
                    }
                    t &&
                      B(
                        e,
                        T(),
                        u ? u.forwardPosition : a.caretPos.begin,
                        o || new n.Event("checkval"),
                        o && "input" === o.type && a.undoValue !== T().join("")
                      );
                  }
                  function W(e) {
                    if (e) {
                      if (void 0 === e.inputmask) return e.value;
                      e.inputmask &&
                        e.inputmask.refreshValue &&
                        J(e, e.inputmask._valueGet(!0));
                    }
                    var t = [],
                      s = r.validPositions;
                    for (var o in s)
                      s[o] &&
                        s[o].match &&
                        (1 != s[o].match.static ||
                          !0 !== s[o].generatedInput) &&
                        t.push(s[o].input);
                    var a =
                      0 === t.length ? "" : (g ? t.reverse() : t).join("");
                    if (n.isFunction(p.onUnMask)) {
                      var l = (g ? T().slice().reverse() : T()).join("");
                      a = p.onUnMask.call(i, l, a, p);
                    }
                    return a;
                  }
                  function Y(e) {
                    return (
                      !g ||
                        "number" != typeof e ||
                        (p.greedy && "" === p.placeholder) ||
                        !h ||
                        (e = h.inputmask._valueGet().length - e),
                      e
                    );
                  }
                  function X(e, t, i, r, a) {
                    var l;
                    if (void 0 === t)
                      return (
                        "selectionStart" in e && "selectionEnd" in e
                          ? ((t = e.selectionStart), (i = e.selectionEnd))
                          : s.getSelection
                          ? ((l = s.getSelection().getRangeAt(0))
                              .commonAncestorContainer.parentNode !== e &&
                              l.commonAncestorContainer !== e) ||
                            ((t = l.startOffset), (i = l.endOffset))
                          : o.selection &&
                            o.selection.createRange &&
                            (i =
                              (t =
                                0 -
                                (l = o.selection.createRange())
                                  .duplicate()
                                  .moveStart(
                                    "character",
                                    -e.inputmask._valueGet().length
                                  )) + l.text.length),
                        { begin: r ? t : Y(t), end: r ? i : Y(i) }
                      );
                    if (
                      (n.isArray(t) &&
                        ((i = g ? t[0] : t[1]), (t = g ? t[1] : t[0])),
                      void 0 !== t.begin &&
                        ((i = g ? t.begin : t.end), (t = g ? t.end : t.begin)),
                      "number" == typeof t)
                    ) {
                      (t = r ? t : Y(t)),
                        (i = "number" == typeof (i = r ? i : Y(i)) ? i : t);
                      var c =
                        parseInt(
                          ((e.ownerDocument.defaultView || s).getComputedStyle
                            ? (
                                e.ownerDocument.defaultView || s
                              ).getComputedStyle(e, null)
                            : e.currentStyle
                          ).fontSize
                        ) * i;
                      if (
                        ((e.scrollLeft = c > e.scrollWidth ? c : 0),
                        (e.inputmask.caretPos = { begin: t, end: i }),
                        p.insertModeVisual &&
                          !1 === p.insertMode &&
                          t === i &&
                          (a || i++),
                        e === (e.inputmask.shadowRoot || o).activeElement)
                      )
                        if ("setSelectionRange" in e) e.setSelectionRange(t, i);
                        else if (s.getSelection) {
                          if (
                            ((l = o.createRange()),
                            void 0 === e.firstChild || null === e.firstChild)
                          ) {
                            var d = o.createTextNode("");
                            e.appendChild(d);
                          }
                          l.setStart(
                            e.firstChild,
                            t < e.inputmask._valueGet().length
                              ? t
                              : e.inputmask._valueGet().length
                          ),
                            l.setEnd(
                              e.firstChild,
                              i < e.inputmask._valueGet().length
                                ? i
                                : e.inputmask._valueGet().length
                            ),
                            l.collapse(!0);
                          var u = s.getSelection();
                          u.removeAllRanges(), u.addRange(l);
                        } else
                          e.createTextRange &&
                            ((l = e.createTextRange()).collapse(!0),
                            l.moveEnd("character", i),
                            l.moveStart("character", t),
                            l.select());
                    }
                  }
                  function U(e) {
                    var t,
                      i,
                      s = m(!0, v(), !0, !0),
                      o = s.length,
                      a = v(),
                      l = {},
                      c = r.validPositions[a],
                      d = void 0 !== c ? c.locator.slice() : void 0;
                    for (t = a + 1; t < s.length; t++)
                      (d = (i = x(t, d, t - 1)).locator.slice()),
                        (l[t] = n.extend(!0, {}, i));
                    var u =
                      c && void 0 !== c.alternation
                        ? c.locator[c.alternation]
                        : void 0;
                    for (
                      t = o - 1;
                      a < t &&
                      ((i = l[t]).match.optionality ||
                        (i.match.optionalQuantifier &&
                          i.match.newBlockMarker) ||
                        (u &&
                          ((u !== l[t].locator[c.alternation] &&
                            1 != i.match.static) ||
                            (!0 === i.match.static &&
                              i.locator[c.alternation] &&
                              O(
                                i.locator[c.alternation].toString().split(","),
                                u.toString().split(",")
                              ) &&
                              "" !== C(t)[0].def)))) &&
                      s[t] === G(t, i.match);
                      t--
                    )
                      o--;
                    return e ? { l: o, def: l[o] ? l[o].match : void 0 } : o;
                  }
                  function K(e) {
                    e.length = 0;
                    for (
                      var t, i = m(!0, 0, !0, void 0, !0);
                      void 0 !== (t = i.shift());

                    )
                      e.push(t);
                    return e;
                  }
                  function Z(e) {
                    if (n.isFunction(p.isComplete)) return p.isComplete(e, p);
                    if ("*" !== p.repeat) {
                      var t = !1,
                        i = U(!0),
                        s = $(i.l);
                      if (
                        void 0 === i.def ||
                        i.def.newBlockMarker ||
                        i.def.optionality ||
                        i.def.optionalQuantifier
                      ) {
                        t = !0;
                        for (var o = 0; o <= s; o++) {
                          var a = x(o).match;
                          if (
                            (!0 !== a.static &&
                              void 0 === r.validPositions[o] &&
                              !0 !== a.optionality &&
                              !0 !== a.optionalQuantifier) ||
                            (!0 === a.static && e[o] !== G(o, a))
                          ) {
                            t = !1;
                            break;
                          }
                        }
                      }
                      return t;
                    }
                  }
                  function Q(e, t, i, n, s) {
                    if (
                      (p.numericInput || g) &&
                      (t === u.BACKSPACE
                        ? (t = u.DELETE)
                        : t === u.DELETE && (t = u.BACKSPACE),
                      g)
                    ) {
                      var o = i.end;
                      (i.end = i.begin), (i.begin = o);
                    }
                    var a,
                      l = v(void 0, !0);
                    if (
                      (i.end >= T().length && l >= i.end && (i.end = l + 1),
                      t === u.BACKSPACE
                        ? i.end - i.begin < 1 && (i.begin = $(i.begin))
                        : t === u.DELETE &&
                          i.begin === i.end &&
                          (i.end = D(i.end, !0, !0) ? i.end + 1 : z(i.end) + 1),
                      !1 !== (a = A(i)))
                    ) {
                      if (
                        (!0 !== n && !1 !== p.keepStatic) ||
                        (null !== p.regex &&
                          -1 !== S(i.begin).match.def.indexOf("|"))
                      ) {
                        var c = I(!0);
                        if (c) {
                          var d =
                            void 0 !== c.caret
                              ? c.caret
                              : c.pos
                              ? z(c.pos.begin ? c.pos.begin : c.pos)
                              : v(-1, !0);
                          (t !== u.DELETE || i.begin > d) && i.begin;
                        }
                      }
                      !0 !== n &&
                        (r.p = t === u.DELETE ? i.begin + a : i.begin);
                    }
                  }
                  function J(e, t) {
                    (e.inputmask.refreshValue = !1),
                      n.isFunction(p.onBeforeMask) &&
                        (t = p.onBeforeMask.call(i, t, p) || t),
                      q(e, !0, !1, (t = t.toString().split(""))),
                      (i.undoValue = T().join("")),
                      (p.clearMaskOnLostFocus || p.clearIncomplete) &&
                        e.inputmask._valueGet() === E().join("") &&
                        -1 === v() &&
                        e.inputmask._valueSet("");
                  }
                  if (void 0 !== t)
                    switch (t.action) {
                      case "isComplete":
                        return (h = t.el), Z(T());
                      case "unmaskedvalue":
                        return (
                          (void 0 !== h && void 0 === t.value) ||
                            ((N = t.value),
                            (N = (
                              (n.isFunction(p.onBeforeMask) &&
                                p.onBeforeMask.call(i, N, p)) ||
                              N
                            ).split("")),
                            q.call(this, void 0, !1, !1, N),
                            n.isFunction(p.onBeforeWrite) &&
                              p.onBeforeWrite.call(i, void 0, T(), 0, p)),
                          W(h)
                        );
                      case "mask":
                        !(function () {
                          H(h);
                          var e = (function (e, t) {
                            "textarea" !== e.tagName.toLowerCase() &&
                              t.ignorables.push(u.ENTER);
                            var i = e.getAttribute("type"),
                              s =
                                ("input" === e.tagName.toLowerCase() &&
                                  -1 !== n.inArray(i, t.supportsInputType)) ||
                                e.isContentEditable ||
                                "textarea" === e.tagName.toLowerCase();
                            if (!s)
                              if ("input" === e.tagName.toLowerCase()) {
                                var r = o.createElement("input");
                                r.setAttribute("type", i),
                                  (s = "text" === r.type),
                                  (r = null);
                              } else s = "partial";
                            return (
                              !1 !== s
                                ? (function (e) {
                                    var i, s;
                                    function r() {
                                      return this.inputmask
                                        ? this.inputmask.opts.autoUnmask
                                          ? this.inputmask.unmaskedvalue()
                                          : -1 !== v() || !0 !== t.nullable
                                          ? (this.inputmask.shadowRoot ||
                                              o.activeElement) === this &&
                                            t.clearMaskOnLostFocus
                                            ? (g
                                                ? K(T().slice()).reverse()
                                                : K(T().slice())
                                              ).join("")
                                            : i.call(this)
                                          : ""
                                        : i.call(this);
                                    }
                                    function a(e) {
                                      s.call(this, e),
                                        this.inputmask && J(this, e);
                                    }
                                    if (!e.inputmask.__valueGet) {
                                      if (!0 !== t.noValuePatching) {
                                        if (Object.getOwnPropertyDescriptor) {
                                          var l = Object.getPrototypeOf
                                            ? Object.getOwnPropertyDescriptor(
                                                Object.getPrototypeOf(e),
                                                "value"
                                              )
                                            : void 0;
                                          l && l.get && l.set
                                            ? ((i = l.get),
                                              (s = l.set),
                                              Object.defineProperty(
                                                e,
                                                "value",
                                                {
                                                  get: r,
                                                  set: a,
                                                  configurable: !0,
                                                }
                                              ))
                                            : "input" !==
                                                e.tagName.toLowerCase() &&
                                              ((i = function () {
                                                return this.textContent;
                                              }),
                                              (s = function (e) {
                                                this.textContent = e;
                                              }),
                                              Object.defineProperty(
                                                e,
                                                "value",
                                                {
                                                  get: r,
                                                  set: a,
                                                  configurable: !0,
                                                }
                                              ));
                                        } else
                                          o.__lookupGetter__ &&
                                            e.__lookupGetter__("value") &&
                                            ((i = e.__lookupGetter__("value")),
                                            (s = e.__lookupSetter__("value")),
                                            e.__defineGetter__("value", r),
                                            e.__defineSetter__("value", a));
                                        (e.inputmask.__valueGet = i),
                                          (e.inputmask.__valueSet = s);
                                      }
                                      (e.inputmask._valueGet = function (e) {
                                        return g && !0 !== e
                                          ? i
                                              .call(this.el)
                                              .split("")
                                              .reverse()
                                              .join("")
                                          : i.call(this.el);
                                      }),
                                        (e.inputmask._valueSet = function (
                                          e,
                                          t
                                        ) {
                                          s.call(
                                            this.el,
                                            null == e
                                              ? ""
                                              : !0 !== t && g
                                              ? e.split("").reverse().join("")
                                              : e
                                          );
                                        }),
                                        void 0 === i &&
                                          ((i = function () {
                                            return this.value;
                                          }),
                                          (s = function (e) {
                                            this.value = e;
                                          }),
                                          (function (e) {
                                            if (
                                              n.valHooks &&
                                              (void 0 === n.valHooks[e] ||
                                                !0 !==
                                                  n.valHooks[e].inputmaskpatch)
                                            ) {
                                              var i =
                                                  n.valHooks[e] &&
                                                  n.valHooks[e].get
                                                    ? n.valHooks[e].get
                                                    : function (e) {
                                                        return e.value;
                                                      },
                                                s =
                                                  n.valHooks[e] &&
                                                  n.valHooks[e].set
                                                    ? n.valHooks[e].set
                                                    : function (e, t) {
                                                        return (e.value = t), e;
                                                      };
                                              n.valHooks[e] = {
                                                get: function (e) {
                                                  if (e.inputmask) {
                                                    if (
                                                      e.inputmask.opts
                                                        .autoUnmask
                                                    )
                                                      return e.inputmask.unmaskedvalue();
                                                    var n = i(e);
                                                    return -1 !==
                                                      v(
                                                        void 0,
                                                        void 0,
                                                        e.inputmask.maskset
                                                          .validPositions
                                                      ) || !0 !== t.nullable
                                                      ? n
                                                      : "";
                                                  }
                                                  return i(e);
                                                },
                                                set: function (e, t) {
                                                  var i = s(e, t);
                                                  return (
                                                    e.inputmask && J(e, t), i
                                                  );
                                                },
                                                inputmaskpatch: !0,
                                              };
                                            }
                                          })(e.type),
                                          (function (e) {
                                            R(e, "mouseenter", function () {
                                              var e = this.inputmask._valueGet(
                                                !0
                                              );
                                              e !==
                                                (g ? T().reverse() : T()).join(
                                                  ""
                                                ) && J(this, e);
                                            });
                                          })(e));
                                    }
                                  })(e)
                                : (e.inputmask = void 0),
                              s
                            );
                          })(h, p);
                          if (!1 !== e) {
                            (i.originalPlaceholder = h.placeholder),
                              (i.maxLength =
                                void 0 !== h ? h.maxLength : void 0),
                              -1 === i.maxLength && (i.maxLength = void 0),
                              "inputMode" in h &&
                                null === h.getAttribute("inputmode") &&
                                ((h.inputMode = p.inputmode),
                                h.setAttribute("inputmode", p.inputmode)),
                              !0 === e &&
                                ((p.showMaskOnFocus =
                                  p.showMaskOnFocus &&
                                  -1 ===
                                    ["cc-number", "cc-exp"].indexOf(
                                      h.autocomplete
                                    )),
                                d && (p.insertModeVisual = !1),
                                R(h, "submit", V.submitEvent),
                                R(h, "reset", V.resetEvent),
                                R(h, "blur", V.blurEvent),
                                R(h, "focus", V.focusEvent),
                                R(h, "invalid", V.invalidEvent),
                                R(h, "click", V.clickEvent),
                                R(h, "mouseleave", V.mouseleaveEvent),
                                R(h, "mouseenter", V.mouseenterEvent),
                                R(h, "paste", V.pasteEvent),
                                R(h, "cut", V.cutEvent),
                                R(h, "complete", p.oncomplete),
                                R(h, "incomplete", p.onincomplete),
                                R(h, "cleared", p.oncleared),
                                l || !0 === p.inputEventOnly
                                  ? h.removeAttribute("maxLength")
                                  : (R(h, "keydown", V.keydownEvent),
                                    R(h, "keypress", V.keypressEvent)),
                                R(h, "input", V.inputFallBackEvent),
                                R(h, "compositionend", V.compositionendEvent)),
                              R(h, "setvalue", V.setValueEvent),
                              (i.undoValue = E().join(""));
                            var t = (h.inputmask.shadowRoot || o).activeElement;
                            if (
                              "" !== h.inputmask._valueGet(!0) ||
                              !1 === p.clearMaskOnLostFocus ||
                              t === h
                            ) {
                              J(h, h.inputmask._valueGet(!0));
                              var s = T().slice();
                              !1 === Z(s) && p.clearIncomplete && f(),
                                p.clearMaskOnLostFocus &&
                                  t !== h &&
                                  (-1 === v() ? (s = []) : K(s)),
                                (!1 === p.clearMaskOnLostFocus ||
                                  (p.showMaskOnFocus && t === h) ||
                                  "" !== h.inputmask._valueGet(!0)) &&
                                  B(h, s),
                                t === h && X(h, z(v()));
                            }
                          }
                        })();
                        break;
                      case "format":
                        return (
                          (N = (
                            (n.isFunction(p.onBeforeMask) &&
                              p.onBeforeMask.call(i, t.value, p)) ||
                            t.value
                          ).split("")),
                          q.call(this, void 0, !0, !1, N),
                          t.metadata
                            ? {
                                value: g
                                  ? T().slice().reverse().join("")
                                  : T().join(""),
                                metadata: e.call(
                                  this,
                                  { action: "getmetadata" },
                                  r,
                                  p
                                ),
                              }
                            : g
                            ? T().slice().reverse().join("")
                            : T().join("")
                        );
                      case "isValid":
                        t.value
                          ? ((N = (
                              (n.isFunction(p.onBeforeMask) &&
                                p.onBeforeMask.call(i, t.value, p)) ||
                              t.value
                            ).split("")),
                            q.call(this, void 0, !0, !1, N))
                          : (t.value = g
                              ? T().slice().reverse().join("")
                              : T().join(""));
                        for (
                          var ee = T(), te = U(), ie = ee.length - 1;
                          te < ie && !D(ie);
                          ie--
                        );
                        return (
                          ee.splice(te, ie + 1 - te),
                          Z(ee) &&
                            t.value ===
                              (g
                                ? T().slice().reverse().join("")
                                : T().join(""))
                        );
                      case "getemptymask":
                        return E().join("");
                      case "remove":
                        if (h && h.inputmask) {
                          n.data(h, "_inputmask_opts", null);
                          var ne = p.autoUnmask
                            ? W(h)
                            : h.inputmask._valueGet(p.autoUnmask);
                          ne !== E().join("")
                            ? h.inputmask._valueSet(ne, p.autoUnmask)
                            : h.inputmask._valueSet(""),
                            H(h),
                            Object.getOwnPropertyDescriptor &&
                            Object.getPrototypeOf
                              ? Object.getOwnPropertyDescriptor(
                                  Object.getPrototypeOf(h),
                                  "value"
                                ) &&
                                h.inputmask.__valueGet &&
                                Object.defineProperty(h, "value", {
                                  get: h.inputmask.__valueGet,
                                  set: h.inputmask.__valueSet,
                                  configurable: !0,
                                })
                              : o.__lookupGetter__ &&
                                h.__lookupGetter__("value") &&
                                h.inputmask.__valueGet &&
                                (h.__defineGetter__(
                                  "value",
                                  h.inputmask.__valueGet
                                ),
                                h.__defineSetter__(
                                  "value",
                                  h.inputmask.__valueSet
                                )),
                            (h.inputmask = void 0);
                        }
                        return h;
                      case "getmetadata":
                        if (n.isArray(r.metadata)) {
                          var se = m(!0, 0, !1).join("");
                          return (
                            n.each(r.metadata, function (e, t) {
                              if (t.mask === se) return (se = t), !1;
                            }),
                            se
                          );
                        }
                        return r.metadata;
                    }
                };
              },
              function (e, t, i) {
                function n(e) {
                  return (
                    (n =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (e) {
                            return typeof e;
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                          }),
                    n(e)
                  );
                }
                "function" != typeof Object.getPrototypeOf &&
                  (Object.getPrototypeOf =
                    "object" === n("test".__proto__)
                      ? function (e) {
                          return e.__proto__;
                        }
                      : function (e) {
                          return e.constructor.prototype;
                        });
              },
              function (e, t, i) {
                function n(e) {
                  return (
                    (n =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (e) {
                            return typeof e;
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                          }),
                    n(e)
                  );
                }
                var s = i(1),
                  o = s.dependencyLib,
                  r = i(0),
                  a = new Date().getFullYear(),
                  l = i(5).default,
                  c = {
                    d: [
                      "[1-9]|[12][0-9]|3[01]",
                      Date.prototype.setDate,
                      "day",
                      Date.prototype.getDate,
                    ],
                    dd: [
                      "0[1-9]|[12][0-9]|3[01]",
                      Date.prototype.setDate,
                      "day",
                      function () {
                        return g(Date.prototype.getDate.call(this), 2);
                      },
                    ],
                    ddd: [""],
                    dddd: [""],
                    m: [
                      "[1-9]|1[012]",
                      Date.prototype.setMonth,
                      "month",
                      function () {
                        return Date.prototype.getMonth.call(this) + 1;
                      },
                    ],
                    mm: [
                      "0[1-9]|1[012]",
                      Date.prototype.setMonth,
                      "month",
                      function () {
                        return g(Date.prototype.getMonth.call(this) + 1, 2);
                      },
                    ],
                    mmm: [""],
                    mmmm: [""],
                    yy: [
                      "[0-9]{2}",
                      Date.prototype.setFullYear,
                      "year",
                      function () {
                        return g(Date.prototype.getFullYear.call(this), 2);
                      },
                    ],
                    yyyy: [
                      "[0-9]{4}",
                      Date.prototype.setFullYear,
                      "year",
                      function () {
                        return g(Date.prototype.getFullYear.call(this), 4);
                      },
                    ],
                    h: [
                      "[1-9]|1[0-2]",
                      Date.prototype.setHours,
                      "hours",
                      Date.prototype.getHours,
                    ],
                    hh: [
                      "0[1-9]|1[0-2]",
                      Date.prototype.setHours,
                      "hours",
                      function () {
                        return g(Date.prototype.getHours.call(this), 2);
                      },
                    ],
                    hx: [
                      function (e) {
                        return "[0-9]{".concat(e, "}");
                      },
                      Date.prototype.setHours,
                      "hours",
                      function (e) {
                        return Date.prototype.getHours;
                      },
                    ],
                    H: [
                      "1?[0-9]|2[0-3]",
                      Date.prototype.setHours,
                      "hours",
                      Date.prototype.getHours,
                    ],
                    HH: [
                      "0[0-9]|1[0-9]|2[0-3]",
                      Date.prototype.setHours,
                      "hours",
                      function () {
                        return g(Date.prototype.getHours.call(this), 2);
                      },
                    ],
                    Hx: [
                      function (e) {
                        return "[0-9]{".concat(e, "}");
                      },
                      Date.prototype.setHours,
                      "hours",
                      function (e) {
                        return function () {
                          return g(Date.prototype.getHours.call(this), e);
                        };
                      },
                    ],
                    M: [
                      "[1-5]?[0-9]",
                      Date.prototype.setMinutes,
                      "minutes",
                      Date.prototype.getMinutes,
                    ],
                    MM: [
                      "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                      Date.prototype.setMinutes,
                      "minutes",
                      function () {
                        return g(Date.prototype.getMinutes.call(this), 2);
                      },
                    ],
                    s: [
                      "[1-5]?[0-9]",
                      Date.prototype.setSeconds,
                      "seconds",
                      Date.prototype.getSeconds,
                    ],
                    ss: [
                      "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                      Date.prototype.setSeconds,
                      "seconds",
                      function () {
                        return g(Date.prototype.getSeconds.call(this), 2);
                      },
                    ],
                    l: [
                      "[0-9]{3}",
                      Date.prototype.setMilliseconds,
                      "milliseconds",
                      function () {
                        return g(Date.prototype.getMilliseconds.call(this), 3);
                      },
                    ],
                    L: [
                      "[0-9]{2}",
                      Date.prototype.setMilliseconds,
                      "milliseconds",
                      function () {
                        return g(Date.prototype.getMilliseconds.call(this), 2);
                      },
                    ],
                    t: ["[ap]"],
                    tt: ["[ap]m"],
                    T: ["[AP]"],
                    TT: ["[AP]M"],
                    Z: [""],
                    o: [""],
                    S: [""],
                  },
                  d = {
                    isoDate: "yyyy-mm-dd",
                    isoTime: "HH:MM:ss",
                    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                  };
                function u(e) {
                  var t = new RegExp("\\d+$").exec(e[0]);
                  if (t && void 0 !== t[0]) {
                    var i = c[e[0][0] + "x"].slice("");
                    return (i[0] = i[0](t[0])), (i[3] = i[3](t[0])), i;
                  }
                  if (c[e[0]]) return c[e[0]];
                }
                function p(e) {
                  if (!e.tokenizer) {
                    var t = [],
                      i = [];
                    for (var n in c)
                      if (/\.*x$/.test(n)) {
                        var s = n[0] + "\\d+";
                        -1 === i.indexOf(s) && i.push(s);
                      } else -1 === t.indexOf(n[0]) && t.push(n[0]);
                    (e.tokenizer =
                      "(" +
                      (0 < i.length ? i.join("|") + "|" : "") +
                      t.join("+|") +
                      ")+?|."),
                      (e.tokenizer = new RegExp(e.tokenizer, "g"));
                  }
                  return e.tokenizer;
                }
                function h(e, t, i, n) {
                  var s,
                    o,
                    r = "";
                  for (p(i).lastIndex = 0; (s = p(i).exec(e)); )
                    if (void 0 === t)
                      if ((o = u(s))) r += "(" + o[0] + ")";
                      else
                        switch (s[0]) {
                          case "[":
                            r += "(";
                            break;
                          case "]":
                            r += ")?";
                            break;
                          default:
                            r += l(s[0]);
                        }
                    else if ((o = u(s)))
                      if (!0 !== n && o[3]) {
                        r += o[3].call(t.date);
                      } else o[2] ? (r += t["raw" + o[2]]) : (r += s[0]);
                    else r += s[0];
                  return r;
                }
                function g(e, t) {
                  for (e = String(e), t = t || 2; e.length < t; ) e = "0" + e;
                  return e;
                }
                function m(e, t, i) {
                  var s,
                    o,
                    r,
                    a = { date: new Date(1, 0, 1) },
                    l = e;
                  function d(e, t, i) {
                    (e[s] = t.replace(/[^0-9]/g, "0")),
                      (e["raw" + s] = t),
                      void 0 !== r &&
                        r.call(
                          e.date,
                          "month" == s ? parseInt(e[s]) - 1 : e[s]
                        );
                  }
                  if ("string" == typeof l) {
                    for (p(i).lastIndex = 0; (o = p(i).exec(t)); ) {
                      var u = new RegExp("\\d+$").exec(o[0]),
                        h = u ? o[0][0] + "x" : o[0],
                        g = void 0;
                      if (u) {
                        var m = p(i).lastIndex,
                          f = v(o.index, i);
                        (p(i).lastIndex = m),
                          (g = l.slice(0, l.indexOf(f.nextMatch[0])));
                      } else g = l.slice(0, h.length);
                      Object.prototype.hasOwnProperty.call(c, h) &&
                        ((s = c[h][2]), (r = c[h][1]), d(a, g)),
                        (l = l.slice(g.length));
                    }
                    return a;
                  }
                  if (
                    l &&
                    "object" === n(l) &&
                    Object.prototype.hasOwnProperty.call(l, "date")
                  )
                    return l;
                }
                function f(e, t) {
                  return h(t.inputFormat, { date: e }, t);
                }
                function v(e, t) {
                  var i,
                    n,
                    s = 0,
                    o = 0;
                  for (p(t).lastIndex = 0; (n = p(t).exec(t.inputFormat)); ) {
                    var r = new RegExp("\\d+$").exec(n[0]);
                    if (e <= (s += o = r ? parseInt(r[0]) : n[0].length)) {
                      (i = n), (n = p(t).exec(t.inputFormat));
                      break;
                    }
                  }
                  return {
                    targetMatchIndex: s - o,
                    nextMatch: n,
                    targetMatch: i,
                  };
                }
                s.extendAliases({
                  datetime: {
                    mask: function (e) {
                      return (
                        (e.numericInput = !1),
                        (c.S = e.i18n.ordinalSuffix.join("|")),
                        (e.inputFormat = d[e.inputFormat] || e.inputFormat),
                        (e.displayFormat =
                          d[e.displayFormat] ||
                          e.displayFormat ||
                          e.inputFormat),
                        (e.outputFormat =
                          d[e.outputFormat] || e.outputFormat || e.inputFormat),
                        (e.placeholder =
                          "" !== e.placeholder
                            ? e.placeholder
                            : e.inputFormat.replace(/[[\]]/, "")),
                        (e.regex = h(e.inputFormat, void 0, e)),
                        (e.min = m(e.min, e.inputFormat, e)),
                        (e.max = m(e.max, e.inputFormat, e)),
                        null
                      );
                    },
                    placeholder: "",
                    inputFormat: "isoDateTime",
                    displayFormat: void 0,
                    outputFormat: void 0,
                    min: null,
                    max: null,
                    skipOptionalPartCharacter: "",
                    i18n: {
                      dayNames: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ],
                      monthNames: [
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
                        "Dec",
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
                        "December",
                      ],
                      ordinalSuffix: ["st", "nd", "rd", "th"],
                    },
                    preValidation: function (e, t, i, n, s, o, r, a) {
                      if (a) return !0;
                      if (isNaN(i) && e[t] !== i) {
                        var l = v(t, s);
                        if (
                          l.nextMatch &&
                          l.nextMatch[0] === i &&
                          1 < l.targetMatch[0].length
                        ) {
                          var d = c[l.targetMatch[0]][0];
                          if (new RegExp(d).test("0" + e[t - 1]))
                            return (
                              (e[t] = e[t - 1]),
                              (e[t - 1] = "0"),
                              {
                                fuzzy: !0,
                                buffer: e,
                                refreshFromBuffer: { start: t - 1, end: t + 1 },
                                pos: t + 1,
                              }
                            );
                        }
                      }
                      return !0;
                    },
                    postValidation: function (e, t, i, n, s, o, r, l) {
                      if (r) return !0;
                      var d, u;
                      if (!1 === n)
                        return (d = v(t + 1, s)).targetMatch &&
                          d.targetMatchIndex === t &&
                          1 < d.targetMatch[0].length &&
                          void 0 !== c[d.targetMatch[0]] &&
                          ((u = c[d.targetMatch[0]][0]),
                          new RegExp(u).test("0" + i))
                          ? {
                              insert: [
                                { pos: t, c: "0" },
                                { pos: t + 1, c: i },
                              ],
                              pos: t + 1,
                            }
                          : n;
                      if (
                        (n.fuzzy && ((e = n.buffer), (t = n.pos)),
                        (d = v(t, s)).targetMatch &&
                          d.targetMatch[0] &&
                          void 0 !== c[d.targetMatch[0]])
                      ) {
                        u = c[d.targetMatch[0]][0];
                        var p = e.slice(
                          d.targetMatchIndex,
                          d.targetMatchIndex + d.targetMatch[0].length
                        );
                        !1 === new RegExp(u).test(p.join("")) &&
                          2 === d.targetMatch[0].length &&
                          o.validPositions[d.targetMatchIndex] &&
                          o.validPositions[d.targetMatchIndex + 1] &&
                          (o.validPositions[d.targetMatchIndex + 1].input =
                            "0");
                      }
                      var g = n,
                        f = m(e.join(""), s.inputFormat, s);
                      return (
                        g &&
                          f.date.getTime() == f.date.getTime() &&
                          ((g = (function (e, t, i) {
                            if (e.year !== e.rawyear) {
                              var n = a.toString(),
                                s = e.rawyear.replace(/[^0-9]/g, ""),
                                o = n.slice(0, s.length),
                                r = n.slice(s.length);
                              if (2 === s.length && s === o) {
                                var l = new Date(a, e.month - 1, e.day);
                                e.day === l.getDay() &&
                                  (!i.max ||
                                    i.max.date.getTime() >= l.getTime()) &&
                                  (e.date.setFullYear(a),
                                  (e.year = n),
                                  (t.insert = [
                                    { pos: t.pos + 1, c: r[0] },
                                    { pos: t.pos + 2, c: r[1] },
                                  ]));
                              }
                            }
                            return t;
                          })(f, g, s)),
                          (g = (function (e, t, i) {
                            if (
                              !isFinite(e.rawday) ||
                              ("29" == e.day && !isFinite(e.rawyear)) ||
                              new Date(
                                e.date.getFullYear(),
                                isFinite(e.rawmonth)
                                  ? e.month
                                  : e.date.getMonth() + 1,
                                0
                              ).getDate() >= e.day
                            )
                              return t;
                            if ("29" == e.day) {
                              var n = v(t.pos, i);
                              if (
                                "yyyy" === n.targetMatch[0] &&
                                t.pos - n.targetMatchIndex == 2
                              )
                                return (t.remove = t.pos + 1), t;
                            }
                            return !1;
                          })(f, g, s)),
                          (g = (function (e, t, i, n, s) {
                            if (!t) return t;
                            if (i.min) {
                              if (e.rawyear) {
                                var o,
                                  r = e.rawyear.replace(/[^0-9]/g, ""),
                                  a = i.min.year.substr(0, r.length);
                                if (r < a) {
                                  var l = v(t.pos, i);
                                  if (
                                    ((r = e.rawyear.substr(
                                      0,
                                      t.pos - l.targetMatchIndex + 1
                                    )),
                                    (a = i.min.year.substr(0, r.length)) <= r)
                                  )
                                    return (
                                      (t.remove =
                                        l.targetMatchIndex + r.length),
                                      t
                                    );
                                  if (
                                    ((r =
                                      "yyyy" === l.targetMatch[0]
                                        ? e.rawyear.substr(1, 1)
                                        : e.rawyear.substr(0, 1)),
                                    (a = i.min.year.substr(2, 1)),
                                    (o = i.max ? i.max.year.substr(2, 1) : r),
                                    1 === r.length && a <= r <= o && !0 !== s)
                                  )
                                    return (
                                      "yyyy" === l.targetMatch[0]
                                        ? ((t.insert = [
                                            {
                                              pos: t.pos + 1,
                                              c: r,
                                              strict: !0,
                                            },
                                          ]),
                                          (t.caret = t.pos + 2),
                                          (n.validPositions[t.pos].input =
                                            i.min.year[1]))
                                        : ((t.insert = [
                                            {
                                              pos: t.pos + 1,
                                              c: i.min.year[1],
                                              strict: !0,
                                            },
                                            {
                                              pos: t.pos + 2,
                                              c: r,
                                              strict: !0,
                                            },
                                          ]),
                                          (t.caret = t.pos + 3),
                                          (n.validPositions[t.pos].input =
                                            i.min.year[0])),
                                      t
                                    );
                                  t = !1;
                                }
                              }
                              t &&
                                e.year &&
                                e.year === e.rawyear &&
                                i.min.date.getTime() == i.min.date.getTime() &&
                                (t = i.min.date.getTime() <= e.date.getTime());
                            }
                            return (
                              t &&
                                i.max &&
                                i.max.date.getTime() == i.max.date.getTime() &&
                                (t = i.max.date.getTime() >= e.date.getTime()),
                              t
                            );
                          })(f, g, s, o, l))),
                        t && g && n.pos !== t
                          ? {
                              buffer: h(s.inputFormat, f, s).split(""),
                              refreshFromBuffer: { start: t, end: n.pos },
                            }
                          : g
                      );
                    },
                    onKeyDown: function (e, t, i, n) {
                      e.ctrlKey &&
                        e.keyCode === r.RIGHT &&
                        (this.inputmask._valueSet(f(new Date(), n)),
                        o(this).trigger("setvalue"));
                    },
                    onUnMask: function (e, t, i) {
                      return t
                        ? h(i.outputFormat, m(e, i.inputFormat, i), i, !0)
                        : t;
                    },
                    casing: function (e, t, i, n) {
                      return 0 == t.nativeDef.indexOf("[ap]")
                        ? e.toLowerCase()
                        : 0 == t.nativeDef.indexOf("[AP]")
                        ? e.toUpperCase()
                        : e;
                    },
                    onBeforeMask: function (e, t) {
                      return (
                        "[object Date]" === Object.prototype.toString.call(e) &&
                          (e = f(e, t)),
                        e
                      );
                    },
                    insertMode: !1,
                    shiftPositions: !1,
                    keepStatic: !1,
                    inputmode: "numeric",
                  },
                }),
                  (e.exports = s);
              },
              function (e, t, i) {
                var n = i(1),
                  s = n.dependencyLib,
                  o = i(0),
                  r = i(5).default;
                function a(e, t) {
                  for (var i = "", s = 0; s < e.length; s++)
                    n.prototype.definitions[e.charAt(s)] ||
                    t.definitions[e.charAt(s)] ||
                    t.optionalmarker[0] === e.charAt(s) ||
                    t.optionalmarker[1] === e.charAt(s) ||
                    t.quantifiermarker[0] === e.charAt(s) ||
                    t.quantifiermarker[1] === e.charAt(s) ||
                    t.groupmarker[0] === e.charAt(s) ||
                    t.groupmarker[1] === e.charAt(s) ||
                    t.alternatormarker === e.charAt(s)
                      ? (i += "\\" + e.charAt(s))
                      : (i += e.charAt(s));
                  return i;
                }
                function l(e, t, i, n) {
                  if (0 < e.length && 0 < t && (!i.digitsOptional || n)) {
                    var o = s.inArray(i.radixPoint, e);
                    -1 === o && (e.push(i.radixPoint), (o = e.length - 1));
                    for (var r = 1; r <= t; r++)
                      isFinite(e[o + r]) || (e[o + r] = "0");
                  }
                  return e;
                }
                function c(e, t) {
                  var i = 0;
                  if ("+" === e) {
                    for (i in t.validPositions);
                    i = parseInt(i);
                  }
                  for (var n in t.tests)
                    if (i <= (n = parseInt(n)))
                      for (var s = 0, o = t.tests[n].length; s < o; s++)
                        if (
                          (void 0 === t.validPositions[n] || "-" === e) &&
                          t.tests[n][s].match.def === e
                        )
                          return (
                            n +
                            (void 0 !== t.validPositions[n] && "-" !== e
                              ? 1
                              : 0)
                          );
                  return i;
                }
                function d(e, t) {
                  var i = -1;
                  return (
                    s.each(t.validPositions, function (t, n) {
                      if (n && n.match.def === e) return (i = parseInt(t)), !1;
                    }),
                    i
                  );
                }
                function u(e, t, i, n, s) {
                  var o = t.buffer ? t.buffer.indexOf(s.radixPoint) : -1,
                    r = -1 !== o && new RegExp("[0-9１-９]").test(e);
                  return s._radixDance && r && null == t.validPositions[o]
                    ? {
                        insert: { pos: o === i ? o + 1 : o, c: s.radixPoint },
                        pos: i,
                      }
                    : r;
                }
                n.extendAliases({
                  numeric: {
                    mask: function (e) {
                      (e.repeat = 0),
                        e.groupSeparator === e.radixPoint &&
                          e.digits &&
                          "0" !== e.digits &&
                          ("." === e.radixPoint
                            ? (e.groupSeparator = ",")
                            : "," === e.radixPoint
                            ? (e.groupSeparator = ".")
                            : (e.groupSeparator = "")),
                        " " === e.groupSeparator &&
                          (e.skipOptionalPartCharacter = void 0),
                        1 < e.placeholder.length &&
                          (e.placeholder = e.placeholder.charAt(0)),
                        "radixFocus" === e.positionCaretOnClick &&
                          "" === e.placeholder &&
                          (e.positionCaretOnClick = "lvp");
                      var t = "0",
                        i = e.radixPoint;
                      !0 === e.numericInput && void 0 === e.__financeInput
                        ? ((t = "1"),
                          (e.positionCaretOnClick =
                            "radixFocus" === e.positionCaretOnClick
                              ? "lvp"
                              : e.positionCaretOnClick),
                          (e.digitsOptional = !1),
                          isNaN(e.digits) && (e.digits = 2),
                          (e._radixDance = !1),
                          (i = "," === e.radixPoint ? "?" : "!"),
                          "" !== e.radixPoint &&
                            void 0 === e.definitions[i] &&
                            ((e.definitions[i] = {}),
                            (e.definitions[i].validator =
                              "[" + e.radixPoint + "]"),
                            (e.definitions[i].placeholder = e.radixPoint),
                            (e.definitions[i].static = !0),
                            (e.definitions[i].generated = !0)))
                        : ((e.__financeInput = !1), (e.numericInput = !0));
                      var n,
                        s = "[+]";
                      if (
                        ((s += a(e.prefix, e)),
                        "" !== e.groupSeparator
                          ? (void 0 === e.definitions[e.groupSeparator] &&
                              ((e.definitions[e.groupSeparator] = {}),
                              (e.definitions[e.groupSeparator].validator =
                                "[" + e.groupSeparator + "]"),
                              (e.definitions[e.groupSeparator].placeholder =
                                e.groupSeparator),
                              (e.definitions[e.groupSeparator].static = !0),
                              (e.definitions[e.groupSeparator].generated = !0)),
                            (s += e._mask(e)))
                          : (s += "9{+}"),
                        void 0 !== e.digits && 0 !== e.digits)
                      ) {
                        var o = e.digits.toString().split(",");
                        isFinite(o[0]) && o[1] && isFinite(o[1])
                          ? (s += i + t + "{" + e.digits + "}")
                          : (isNaN(e.digits) || 0 < parseInt(e.digits)) &&
                            (e.digitsOptional
                              ? ((n = s + i + t + "{0," + e.digits + "}"),
                                (e.keepStatic = !0))
                              : (s += i + t + "{" + e.digits + "}"));
                      }
                      return (
                        (s += a(e.suffix, e)),
                        (s += "[-]"),
                        n && (s = [n + a(e.suffix, e) + "[-]", s]),
                        (e.greedy = !1),
                        (function (e) {
                          void 0 === e.parseMinMaxOptions &&
                            (null !== e.min &&
                              ((e.min = e.min
                                .toString()
                                .replace(
                                  new RegExp(r(e.groupSeparator), "g"),
                                  ""
                                )),
                              "," === e.radixPoint &&
                                (e.min = e.min.replace(e.radixPoint, ".")),
                              (e.min = isFinite(e.min)
                                ? parseFloat(e.min)
                                : NaN),
                              isNaN(e.min) && (e.min = Number.MIN_VALUE)),
                            null !== e.max &&
                              ((e.max = e.max
                                .toString()
                                .replace(
                                  new RegExp(r(e.groupSeparator), "g"),
                                  ""
                                )),
                              "," === e.radixPoint &&
                                (e.max = e.max.replace(e.radixPoint, ".")),
                              (e.max = isFinite(e.max)
                                ? parseFloat(e.max)
                                : NaN),
                              isNaN(e.max) && (e.max = Number.MAX_VALUE)),
                            (e.parseMinMaxOptions = "done"));
                        })(e),
                        s
                      );
                    },
                    _mask: function (e) {
                      return "(" + e.groupSeparator + "999){+|1}";
                    },
                    digits: "*",
                    digitsOptional: !0,
                    enforceDigitsOnBlur: !1,
                    radixPoint: ".",
                    positionCaretOnClick: "radixFocus",
                    _radixDance: !0,
                    groupSeparator: "",
                    allowMinus: !0,
                    negationSymbol: { front: "-", back: "" },
                    prefix: "",
                    suffix: "",
                    min: null,
                    max: null,
                    SetMaxOnOverflow: !1,
                    step: 1,
                    inputType: "text",
                    unmaskAsNumber: !1,
                    roundingFN: Math.round,
                    inputmode: "numeric",
                    shortcuts: { k: "000", m: "000000" },
                    placeholder: "0",
                    greedy: !1,
                    rightAlign: !0,
                    insertMode: !0,
                    autoUnmask: !1,
                    skipOptionalPartCharacter: "",
                    definitions: {
                      0: { validator: u },
                      1: { validator: u, definitionSymbol: "9" },
                      "+": {
                        validator: function (e, t, i, n, s) {
                          return (
                            s.allowMinus &&
                            ("-" === e || e === s.negationSymbol.front)
                          );
                        },
                      },
                      "-": {
                        validator: function (e, t, i, n, s) {
                          return s.allowMinus && e === s.negationSymbol.back;
                        },
                      },
                    },
                    preValidation: function (e, t, i, n, o, r, a, l) {
                      if (!1 !== o.__financeInput && i === o.radixPoint)
                        return !1;
                      var u;
                      if ((u = o.shortcuts && o.shortcuts[i])) {
                        if (1 < u.length)
                          for (var p = [], h = 0; h < u.length; h++)
                            p.push({ pos: t + h, c: u[h], strict: !1 });
                        return { insert: p };
                      }
                      var g = s.inArray(o.radixPoint, e),
                        m = t;
                      if (
                        ((t = (function (e, t, i, n, s) {
                          return (
                            s._radixDance &&
                              s.numericInput &&
                              t !== s.negationSymbol.back &&
                              e <= i &&
                              (0 < i || t == s.radixPoint) &&
                              (void 0 === n.validPositions[e - 1] ||
                                n.validPositions[e - 1].input !==
                                  s.negationSymbol.back) &&
                              (e -= 1),
                            e
                          );
                        })(t, i, g, r, o)),
                        "-" === i || i === o.negationSymbol.front)
                      ) {
                        if (!0 !== o.allowMinus) return !1;
                        var f = !1,
                          v = d("+", r),
                          y = d("-", r);
                        return (
                          -1 !== v && (f = [v, y]),
                          !1 !== f
                            ? { remove: f, caret: m }
                            : {
                                insert: [
                                  {
                                    pos: c("+", r),
                                    c: o.negationSymbol.front,
                                    fromIsValid: !0,
                                  },
                                  {
                                    pos: c("-", r),
                                    c: o.negationSymbol.back,
                                    fromIsValid: void 0,
                                  },
                                ],
                                caret: m + o.negationSymbol.back.length,
                              }
                        );
                      }
                      if (l) return !0;
                      if (
                        -1 !== g &&
                        !0 === o._radixDance &&
                        !1 === n &&
                        i === o.radixPoint &&
                        void 0 !== o.digits &&
                        (isNaN(o.digits) || 0 < parseInt(o.digits)) &&
                        g !== t
                      )
                        return {
                          caret: o._radixDance && t === g - 1 ? g + 1 : g,
                        };
                      if (!1 === o.__financeInput)
                        if (n) {
                          if (o.digitsOptional)
                            return { rewritePosition: a.end };
                          if (!o.digitsOptional) {
                            if (a.begin > g && a.end <= g)
                              return i === o.radixPoint
                                ? {
                                    insert: {
                                      pos: g + 1,
                                      c: "0",
                                      fromIsValid: !0,
                                    },
                                    rewritePosition: g,
                                  }
                                : { rewritePosition: g + 1 };
                            if (a.begin < g)
                              return { rewritePosition: a.begin - 1 };
                          }
                        } else if (
                          !o.showMaskOnHover &&
                          !o.showMaskOnFocus &&
                          !o.digitsOptional &&
                          0 < o.digits &&
                          "" === this.inputmask.__valueGet.call(this)
                        )
                          return { rewritePosition: g };
                      return { rewritePosition: t };
                    },
                    postValidation: function (e, t, i, n, o, r, a) {
                      if (!1 === n) return n;
                      if (a) return !0;
                      if (null !== o.min || null !== o.max) {
                        var c = o.onUnMask(
                          e.slice().reverse().join(""),
                          void 0,
                          s.extend({}, o, { unmaskAsNumber: !0 })
                        );
                        if (
                          null !== o.min &&
                          c < o.min &&
                          (c.toString().length > o.min.toString().length ||
                            c < 0)
                        )
                          return !1;
                        if (null !== o.max && c > o.max)
                          return (
                            !!o.SetMaxOnOverflow && {
                              refreshFromBuffer: !0,
                              buffer: l(
                                o.max
                                  .toString()
                                  .replace(".", o.radixPoint)
                                  .split(""),
                                o.digits,
                                o
                              ).reverse(),
                            }
                          );
                      }
                      return n;
                    },
                    onUnMask: function (e, t, i) {
                      if ("" === t && !0 === i.nullable) return t;
                      var n = e.replace(i.prefix, "");
                      return (
                        (n = (n = n.replace(i.suffix, "")).replace(
                          new RegExp(r(i.groupSeparator), "g"),
                          ""
                        )),
                        "" !== i.placeholder.charAt(0) &&
                          (n = n.replace(
                            new RegExp(i.placeholder.charAt(0), "g"),
                            "0"
                          )),
                        i.unmaskAsNumber
                          ? ("" !== i.radixPoint &&
                              -1 !== n.indexOf(i.radixPoint) &&
                              (n = n.replace(r.call(this, i.radixPoint), ".")),
                            (n = (n = n.replace(
                              new RegExp("^" + r(i.negationSymbol.front)),
                              "-"
                            )).replace(
                              new RegExp(r(i.negationSymbol.back) + "$"),
                              ""
                            )),
                            Number(n))
                          : n
                      );
                    },
                    isComplete: function (e, t) {
                      var i = (t.numericInput ? e.slice().reverse() : e).join(
                        ""
                      );
                      return (
                        (i = (i = (i = (i = (i = i.replace(
                          new RegExp("^" + r(t.negationSymbol.front)),
                          "-"
                        )).replace(
                          new RegExp(r(t.negationSymbol.back) + "$"),
                          ""
                        )).replace(t.prefix, "")).replace(
                          t.suffix,
                          ""
                        )).replace(
                          new RegExp(r(t.groupSeparator) + "([0-9]{3})", "g"),
                          "$1"
                        )),
                        "," === t.radixPoint &&
                          (i = i.replace(r(t.radixPoint), ".")),
                        isFinite(i)
                      );
                    },
                    onBeforeMask: function (e, t) {
                      var i = t.radixPoint || ",";
                      isFinite(t.digits) && (t.digits = parseInt(t.digits)),
                        ("number" != typeof e && "number" !== t.inputType) ||
                          "" === i ||
                          (e = e.toString().replace(".", i));
                      var n = e.split(i),
                        s = n[0].replace(/[^\-0-9]/g, ""),
                        o = 1 < n.length ? n[1].replace(/[^0-9]/g, "") : "",
                        a = 1 < n.length;
                      e = s + ("" !== o ? i + o : o);
                      var c = 0;
                      if (
                        "" !== i &&
                        ((c = t.digitsOptional
                          ? t.digits < o.length
                            ? t.digits
                            : o.length
                          : t.digits),
                        "" !== o || !t.digitsOptional)
                      ) {
                        var d = Math.pow(10, c || 1);
                        (e = e.replace(r(i), ".")),
                          isNaN(parseFloat(e)) ||
                            (e = (t.roundingFN(parseFloat(e) * d) / d).toFixed(
                              c
                            )),
                          (e = e.toString().replace(".", i));
                      }
                      if (
                        (0 === t.digits &&
                          -1 !== e.indexOf(i) &&
                          (e = e.substring(0, e.indexOf(i))),
                        null !== t.min || null !== t.max)
                      ) {
                        var u = e.toString().replace(i, ".");
                        null !== t.min && u < t.min
                          ? (e = t.min.toString().replace(".", i))
                          : null !== t.max &&
                            u > t.max &&
                            (e = t.max.toString().replace(".", i));
                      }
                      return l(e.toString().split(""), c, t, a).join("");
                    },
                    onBeforeWrite: function (e, t, i, n) {
                      function o(e, t) {
                        if (!1 !== n.__financeInput || t) {
                          var i = s.inArray(n.radixPoint, e);
                          -1 !== i && e.splice(i, 1);
                        }
                        if ("" !== n.groupSeparator)
                          for (; -1 !== (i = e.indexOf(n.groupSeparator)); )
                            e.splice(i, 1);
                        return e;
                      }
                      var a,
                        c = (function (e, t) {
                          var i = new RegExp(
                              "(^" +
                                ("" !== t.negationSymbol.front
                                  ? r(t.negationSymbol.front) + "?"
                                  : "") +
                                r(t.prefix) +
                                ")(.*)(" +
                                r(t.suffix) +
                                ("" != t.negationSymbol.back
                                  ? r(t.negationSymbol.back) + "?"
                                  : "") +
                                "$)"
                            ).exec(e.slice().reverse().join("")),
                            n = i ? i[2] : "",
                            s = !1;
                          return (
                            n &&
                              ((n = n.split(t.radixPoint.charAt(0))[0]),
                              (s = new RegExp(
                                "^[0" + t.groupSeparator + "]*"
                              ).exec(n))),
                            !(
                              !s ||
                              !(
                                1 < s[0].length ||
                                (0 < s[0].length && s[0].length < n.length)
                              )
                            ) && s
                          );
                        })(t, n);
                      if (c)
                        for (
                          var d =
                              t
                                .join("")
                                .lastIndexOf(
                                  c[0].split("").reverse().join("")
                                ) - (c[0] == c.input ? 0 : 1),
                            u = c[0] == c.input ? 1 : 0,
                            p = c[0].length - u;
                          0 < p;
                          p--
                        )
                          delete this.maskset.validPositions[d + p],
                            delete t[d + p];
                      if (e)
                        switch (e.type) {
                          case "blur":
                          case "checkval":
                            if (null !== n.min) {
                              var h = n.onUnMask(
                                t.slice().reverse().join(""),
                                void 0,
                                s.extend({}, n, { unmaskAsNumber: !0 })
                              );
                              if (null !== n.min && h < n.min)
                                return {
                                  refreshFromBuffer: !0,
                                  buffer: l(
                                    n.min
                                      .toString()
                                      .replace(".", n.radixPoint)
                                      .split(""),
                                    n.digits,
                                    n
                                  ).reverse(),
                                };
                            }
                            if (t[t.length - 1] === n.negationSymbol.front) {
                              var g = new RegExp(
                                "(^" +
                                  ("" != n.negationSymbol.front
                                    ? r(n.negationSymbol.front) + "?"
                                    : "") +
                                  r(n.prefix) +
                                  ")(.*)(" +
                                  r(n.suffix) +
                                  ("" != n.negationSymbol.back
                                    ? r(n.negationSymbol.back) + "?"
                                    : "") +
                                  "$)"
                              ).exec(o(t.slice(), !0).reverse().join(""));
                              0 == (g ? g[2] : "") &&
                                (a = { refreshFromBuffer: !0, buffer: [0] });
                            } else
                              "" !== n.radixPoint &&
                                t[0] === n.radixPoint &&
                                (a && a.buffer
                                  ? a.buffer.shift()
                                  : (t.shift(),
                                    (a = {
                                      refreshFromBuffer: !0,
                                      buffer: o(t),
                                    })));
                            if (n.enforceDigitsOnBlur) {
                              var m =
                                ((a = a || {}) && a.buffer) ||
                                t.slice().reverse();
                              (a.refreshFromBuffer = !0),
                                (a.buffer = l(m, n.digits, n, !0).reverse());
                            }
                        }
                      return a;
                    },
                    onKeyDown: function (e, t, i, n) {
                      var r,
                        a = s(this);
                      if (e.ctrlKey)
                        switch (e.keyCode) {
                          case o.UP:
                            return (
                              this.inputmask.__valueSet.call(
                                this,
                                parseFloat(this.inputmask.unmaskedvalue()) +
                                  parseInt(n.step)
                              ),
                              a.trigger("setvalue"),
                              !1
                            );
                          case o.DOWN:
                            return (
                              this.inputmask.__valueSet.call(
                                this,
                                parseFloat(this.inputmask.unmaskedvalue()) -
                                  parseInt(n.step)
                              ),
                              a.trigger("setvalue"),
                              !1
                            );
                        }
                      if (
                        !e.shiftKey &&
                        (e.keyCode === o.DELETE ||
                          e.keyCode === o.BACKSPACE ||
                          e.keyCode === o.BACKSPACE_SAFARI) &&
                        i.begin !== t.length
                      ) {
                        if (
                          t[e.keyCode === o.DELETE ? i.begin - 1 : i.end] ===
                          n.negationSymbol.front
                        )
                          return (
                            (r = t.slice().reverse()),
                            "" !== n.negationSymbol.front && r.shift(),
                            "" !== n.negationSymbol.back && r.pop(),
                            a.trigger("setvalue", [r.join(""), i.begin]),
                            !1
                          );
                        if (!0 === n._radixDance) {
                          var c = s.inArray(n.radixPoint, t);
                          if (n.digitsOptional) {
                            if (0 === c)
                              return (
                                (r = t.slice().reverse()).pop(),
                                a.trigger("setvalue", [
                                  r.join(""),
                                  i.begin >= r.length ? r.length : i.begin,
                                ]),
                                !1
                              );
                          } else if (
                            -1 !== c &&
                            (i.begin < c ||
                              i.end < c ||
                              (e.keyCode === o.DELETE && i.begin === c))
                          )
                            return (
                              i.begin !== i.end ||
                                (e.keyCode !== o.BACKSPACE &&
                                  e.keyCode !== o.BACKSPACE_SAFARI) ||
                                i.begin++,
                              (r = t.slice().reverse()).splice(
                                r.length - i.begin,
                                i.begin - i.end + 1
                              ),
                              (r = l(r, n.digits, n).join("")),
                              a.trigger("setvalue", [
                                r,
                                i.begin >= r.length ? c + 1 : i.begin,
                              ]),
                              !1
                            );
                        }
                      }
                    },
                  },
                  currency: {
                    prefix: "",
                    groupSeparator: ",",
                    alias: "numeric",
                    digits: 2,
                    digitsOptional: !1,
                  },
                  decimal: { alias: "numeric" },
                  integer: { alias: "numeric", digits: 0 },
                  percentage: {
                    alias: "numeric",
                    min: 0,
                    max: 100,
                    suffix: " %",
                    digits: 0,
                    allowMinus: !1,
                  },
                  indianns: {
                    alias: "numeric",
                    _mask: function (e) {
                      return (
                        "(" +
                        e.groupSeparator +
                        "99){*|1}(" +
                        e.groupSeparator +
                        "999){1|1}"
                      );
                    },
                    groupSeparator: ",",
                    radixPoint: ".",
                    placeholder: "0",
                    digits: 2,
                    digitsOptional: !1,
                  },
                }),
                  (e.exports = n);
              },
              function (e, t, i) {
                var n = p(i(2)),
                  s = p(i(1));
                function o(e) {
                  return (
                    (o =
                      "function" == typeof Symbol &&
                      "symbol" == typeof Symbol.iterator
                        ? function (e) {
                            return typeof e;
                          }
                        : function (e) {
                            return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e;
                          }),
                    o(e)
                  );
                }
                function r(e, t) {
                  return !t || ("object" !== o(t) && "function" != typeof t)
                    ? (function (e) {
                        if (void 0 === e)
                          throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                          );
                        return e;
                      })(e)
                    : t;
                }
                function a(e) {
                  var t = "function" == typeof Map ? new Map() : void 0;
                  return (
                    (a = function (e) {
                      if (
                        null === e ||
                        ((i = e),
                        -1 ===
                          Function.toString.call(i).indexOf("[native code]"))
                      )
                        return e;
                      var i;
                      if ("function" != typeof e)
                        throw new TypeError(
                          "Super expression must either be null or a function"
                        );
                      if (void 0 !== t) {
                        if (t.has(e)) return t.get(e);
                        t.set(e, n);
                      }
                      function n() {
                        return c(e, arguments, u(this).constructor);
                      }
                      return (
                        (n.prototype = Object.create(e.prototype, {
                          constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                          },
                        })),
                        d(n, e)
                      );
                    }),
                    a(e)
                  );
                }
                function l() {
                  if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                    return (
                      Date.prototype.toString.call(
                        Reflect.construct(Date, [], function () {})
                      ),
                      !0
                    );
                  } catch (e) {
                    return !1;
                  }
                }
                function c(e, t, i) {
                  return (
                    (c = l()
                      ? Reflect.construct
                      : function (e, t, i) {
                          var n = [null];
                          n.push.apply(n, t);
                          var s = new (Function.bind.apply(e, n))();
                          return i && d(s, i.prototype), s;
                        }),
                    c.apply(null, arguments)
                  );
                }
                function d(e, t) {
                  return (
                    (d =
                      Object.setPrototypeOf ||
                      function (e, t) {
                        return (e.__proto__ = t), e;
                      }),
                    d(e, t)
                  );
                }
                function u(e) {
                  return (
                    (u = Object.setPrototypeOf
                      ? Object.getPrototypeOf
                      : function (e) {
                          return e.__proto__ || Object.getPrototypeOf(e);
                        }),
                    u(e)
                  );
                }
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                var h = n.default.document;
                if (
                  h &&
                  h.head &&
                  h.head.attachShadow &&
                  void 0 === customElements.get("input-mask")
                ) {
                  var g = (function (e) {
                    function t() {
                      var e;
                      !(function (e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this, t);
                      var i = (e = r(
                          this,
                          u(t).call(this)
                        )).getAttributeNames(),
                        n = e.attachShadow({ mode: "closed" }),
                        o = h.createElement("input");
                      for (var a in ((o.type = "text"), n.appendChild(o), i))
                        Object.prototype.hasOwnProperty.call(i, a) &&
                          o.setAttribute(i[a], e.getAttribute(i[a]));
                      var l = new s.default();
                      return (
                        (l.dataAttribute = ""),
                        l.mask(o),
                        (o.inputmask.shadowRoot = n),
                        e
                      );
                    }
                    return (
                      (function (e, t) {
                        if ("function" != typeof t && null !== t)
                          throw new TypeError(
                            "Super expression must either be null or a function"
                          );
                        (e.prototype = Object.create(t && t.prototype, {
                          constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0,
                          },
                        })),
                          t && d(e, t);
                      })(t, e),
                      t
                    );
                  })(a(HTMLElement));
                  customElements.define("input-mask", g);
                }
              },
            ]),
            (installedModules = {}),
            (__nested_webpack_require_126921__.m = modules),
            (__nested_webpack_require_126921__.c = installedModules),
            (__nested_webpack_require_126921__.d = function (e, t, i) {
              __nested_webpack_require_126921__.o(e, t) ||
                Object.defineProperty(e, t, { enumerable: !0, get: i });
            }),
            (__nested_webpack_require_126921__.r = function (e) {
              "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: "Module",
                }),
                Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (__nested_webpack_require_126921__.t = function (e, t) {
              if ((1 & t && (e = __nested_webpack_require_126921__(e)), 8 & t))
                return e;
              if (4 & t && "object" == typeof e && e && e.__esModule) return e;
              var i = Object.create(null);
              if (
                (__nested_webpack_require_126921__.r(i),
                Object.defineProperty(i, "default", {
                  enumerable: !0,
                  value: e,
                }),
                2 & t && "string" != typeof e)
              )
                for (var n in e)
                  __nested_webpack_require_126921__.d(
                    i,
                    n,
                    function (t) {
                      return e[t];
                    }.bind(null, n)
                  );
              return i;
            }),
            (__nested_webpack_require_126921__.n = function (e) {
              var t =
                e && e.__esModule
                  ? function () {
                      return e.default;
                    }
                  : function () {
                      return e;
                    };
              return __nested_webpack_require_126921__.d(t, "a", t), t;
            }),
            (__nested_webpack_require_126921__.o = function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (__nested_webpack_require_126921__.p = ""),
            __nested_webpack_require_126921__(
              (__nested_webpack_require_126921__.s = 6)
            )
          );
          function __nested_webpack_require_126921__(e) {
            if (installedModules[e]) return installedModules[e].exports;
            var t = (installedModules[e] = { i: e, l: !1, exports: {} });
            return (
              modules[e].call(
                t.exports,
                t,
                t.exports,
                __nested_webpack_require_126921__
              ),
              (t.l = !0),
              t.exports
            );
          }
          var modules, installedModules;
        });
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e];
    if (void 0 !== t) return t.exports;
    var i = (__webpack_module_cache__[e] = { exports: {} });
    return (
      __webpack_modules__[e].call(i.exports, i, i.exports, __webpack_require__),
      i.exports
    );
  }
  var __webpack_exports__ = {};
  (() => {
    "use strict";
    function e(e) {
      this.type = e;
    }
    (e.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          i = t.dataset.da.trim().split(","),
          n = {};
        (n.element = t),
          (n.parent = t.parentNode),
          (n.destination = document.querySelector(i[0].trim())),
          (n.breakpoint = i[1] ? i[1].trim() : "767"),
          (n.place = i[2] ? i[2].trim() : "last"),
          (n.index = this.indexInParent(n.parent, n.element)),
          this.оbjects.push(n);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, i) {
            return Array.prototype.indexOf.call(i, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const i = this.mediaQueries[t],
          n = String.prototype.split.call(i, ","),
          s = window.matchMedia(n[0]),
          o = n[1],
          r = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === o;
          });
        s.addListener(function () {
          e.mediaHandler(s, r);
        }),
          this.mediaHandler(s, r);
      }
    }),
      (e.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const i = t[e];
            (i.index = this.indexInParent(i.parent, i.element)),
              this.moveTo(i.place, i.element, i.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const i = t[e];
            i.element.classList.contains(this.daClassname) &&
              this.moveBack(i.parent, i.element, i.index);
          }
      }),
      (e.prototype.moveTo = function (e, t, i) {
        t.classList.add(this.daClassname),
          "last" === e || e >= i.children.length
            ? i.insertAdjacentElement("beforeend", t)
            : "first" !== e
            ? i.children[e].insertAdjacentElement("beforebegin", t)
            : i.insertAdjacentElement("afterbegin", t);
      }),
      (e.prototype.moveBack = function (e, t, i) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[i]
            ? e.children[i].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (e.prototype.indexInParent = function (e, t) {
        const i = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(i, t);
      }),
      (e.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    new e("max").init();
    class t {
      constructor(e) {
        let t = {
          logging: !0,
          init: !0,
          attributeOpenButton: "data-popup",
          attributeCloseButton: "data-close",
          fixElementSelector: "[data-lp]",
          youtubeAttribute: "data-youtube",
          youtubePlaceAttribute: "data-youtube-place",
          setAutoplayYoutube: !0,
          classes: {
            popup: "popup",
            popupContent: "popup__content",
            popupError: "popup__form-error",
            popupActive: "popup_show",
            bodyActive: "popup-show",
          },
          focusCatch: !0,
          closeEsc: !0,
          bodyLock: !0,
          bodyLockDelay: 500,
          hashSettings: { location: !0, goHash: !0 },
          on: {
            beforeOpen: function () {},
            afterOpen: function () {},
            beforeClose: function () {},
            afterClose: function () {},
          },
        };
        (this.isOpen = !1),
          (this.targetOpen = { selector: !1, element: !1 }),
          (this.previousOpen = { selector: !1, element: !1 }),
          (this.lastClosed = { selector: !1, element: !1 }),
          (this._dataValue = !1),
          (this.hash = !1),
          (this._reopen = !1),
          (this._selectorOpen = !1),
          (this.lastFocusEl = !1),
          (this._focusEl = [
            "a[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "button:not([disabled]):not([aria-hidden])",
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "area[href]",
            "iframe",
            "object",
            "embed",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ]),
          (this.options = {
            ...t,
            ...e,
            classes: { ...t.classes, ...e?.classes },
            hashSettings: { ...t.hashSettings, ...e?.hashSettings },
            on: { ...t.on, ...e?.on },
          }),
          this.options.init && this.initPopups();
      }
      initPopups() {
        this.popupLogging("Проснулся"), this.eventsPopup();
      }
      eventsPopup() {
        document.addEventListener(
          "click",
          function (e) {
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (t)
              return (
                e.preventDefault(),
                (this._dataValue = t.getAttribute(
                  this.options.attributeOpenButton
                )
                  ? t.getAttribute(this.options.attributeOpenButton)
                  : "error"),
                "error" !== this._dataValue
                  ? (this.isOpen || (this.lastFocusEl = t),
                    (this.targetOpen.selector = `${this._dataValue}`),
                    (this._selectorOpen = !0),
                    void this.open())
                  : void this.popupLogging(
                      `Ой ой, не заполнен атрибут у ${t.classList}`
                    )
              );
            return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
              (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                !e.target.closest(`.${this.options.classes.popupError}`) &&
                this.isOpen)
              ? (e.preventDefault(), void this.close())
              : void 0;
          }.bind(this)
        ),
          document.addEventListener(
            "keydown",
            function (e) {
              if (
                this.options.closeEsc &&
                27 == e.which &&
                "Escape" === e.code &&
                this.isOpen
              )
                return e.preventDefault(), void this.close();
              this.options.focusCatch &&
                9 == e.which &&
                this.isOpen &&
                this._focusCatch(e);
            }.bind(this)
          ),
          document.querySelector("form[data-ajax],form[data-dev]") &&
            document.addEventListener(
              "formSent",
              function (e) {
                const t = e.detail.form.dataset.popupMessage;
                t && this.open(t);
              }.bind(this)
            ),
          this.options.hashSettings.goHash &&
            (window.addEventListener(
              "hashchange",
              function () {
                window.location.hash
                  ? this._openToHash()
                  : this.close(this.targetOpen.selector);
              }.bind(this)
            ),
            window.addEventListener(
              "load",
              function () {
                window.location.hash && this._openToHash();
              }.bind(this)
            ));
      }
      open(e) {
        if (
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
          ) {
            const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                this.options.youtubeAttribute
              )}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
            t.setAttribute("allow", `${i}; encrypted-media`),
              t.setAttribute("src", e),
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ) &&
                this.targetOpen.element
                  .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                  .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive
            ),
            document.body.classList.add(this.options.classes.bodyActive),
            this._reopen ? (this._reopen = !1) : o(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } })
            ),
            this.popupLogging("Открыл попап");
        } else
          this.popupLogging(
            "Ой ой, такого попапа нет. Проверьте корректность ввода. "
          );
      }
      close(e) {
        e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          (this.previousOpen.selector = e),
          this.isOpen &&
            s &&
            (this.options.on.beforeClose(this),
            this.targetOpen.element.hasAttribute(
              this.options.youtubeAttribute
            ) &&
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ) &&
              (this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ).innerHTML = ""),
            this.previousOpen.element.classList.remove(
              this.options.classes.popupActive
            ),
            this.previousOpen.element.setAttribute("aria-hidden", "true"),
            this._reopen ||
              (document.body.classList.remove(this.options.classes.bodyActive),
              o(),
              (this.isOpen = !1)),
            this._removeHash(),
            this._selectorOpen &&
              ((this.lastClosed.selector = this.previousOpen.selector),
              (this.lastClosed.element = this.previousOpen.element)),
            this.options.on.afterClose(this),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.popupLogging("Закрыл попап"));
      }
      _getHash() {
        this.options.hashSettings.location &&
          (this.hash = this.targetOpen.selector.includes("#")
            ? this.targetOpen.selector
            : this.targetOpen.selector.replace(".", "#"));
      }
      _openToHash() {
        let e = document.querySelector(
          `.${window.location.hash.replace("#", "")}`
        )
          ? `.${window.location.hash.replace("#", "")}`
          : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
        document.querySelector(
          `[${this.options.attributeOpenButton}="${e}"]`
        ) &&
          e &&
          this.open(e);
      }
      _setHash() {
        history.pushState("", "", this.hash);
      }
      _removeHash() {
        history.pushState("", "", window.location.href.split("#")[0]);
      }
      _focusCatch(e) {
        const t = this.targetOpen.element.querySelectorAll(this._focusEl),
          i = Array.prototype.slice.call(t),
          n = i.indexOf(document.activeElement);
        e.shiftKey && 0 === n && (i[i.length - 1].focus(), e.preventDefault()),
          e.shiftKey ||
            n !== i.length - 1 ||
            (i[0].focus(), e.preventDefault());
      }
      _focusTrap() {
        const e = this.previousOpen.element.querySelectorAll(this._focusEl);
        !this.isOpen && this.lastFocusEl
          ? this.lastFocusEl.focus()
          : e[0].focus();
      }
      popupLogging(e) {
        this.options.logging && l(`[Попапос]: ${e}`);
      }
    }
    let i = (e, t = 500, i = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !i),
              !i && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !i && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t));
      },
      n = (e, t = 500, i = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            i && e.style.removeProperty("height");
          let n = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = i ? `${i}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = n + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t);
        }
      },
      s = !0,
      o = (e = 500) => {
        document.documentElement.classList.contains("lock") ? r(e) : a(e);
      },
      r = (e = 500) => {
        let t = document.querySelector("body");
        if (s) {
          let i = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < i.length; e++) {
              i[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (s = !1),
            setTimeout(function () {
              s = !0;
            }, e);
        }
      },
      a = (e = 500) => {
        let t = document.querySelector("body");
        if (s) {
          let i = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (s = !1),
            setTimeout(function () {
              s = !0;
            }, e);
        }
      };
    function l(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function c(e) {
      return e.filter(function (e, t, i) {
        return i.indexOf(e) === t;
      });
    }
    function d(e, t) {
      const i = Array.from(e).filter(function (e, i, n) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (i.length) {
        const e = [];
        i.forEach((i) => {
          const n = {},
            s = i.dataset[t].split(",");
          (n.value = s[0]),
            (n.type = s[1] ? s[1].trim() : "max"),
            (n.item = i),
            e.push(n);
        });
        let n = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        n = c(n);
        const s = [];
        if (n.length)
          return (
            n.forEach((t) => {
              const i = t.split(","),
                n = i[1],
                o = i[2],
                r = window.matchMedia(i[0]),
                a = e.filter(function (e) {
                  if (e.value === n && e.type === o) return !0;
                });
              s.push({ itemsArray: a, matchMedia: r });
            }),
            s
          );
      }
    }
    let u = (e, t = !1, i = 500, n = 0) => {
      const s = document.querySelector(e);
      if (s) {
        let o = "",
          a = 0;
        t &&
          ((o = "header.header"), (a = document.querySelector(o).offsetHeight));
        let c = {
          speedAsDuration: !0,
          speed: i,
          header: o,
          offset: n,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (r(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(s, "", c);
        else {
          let e = s.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
        }
        l(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    const p = { selectModule: null };
    let h = {
      getErrors(e) {
        let t = 0,
          i = e.querySelectorAll("*[data-required]");
        return (
          i.length &&
            i.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : "checkbox" !== e.type || e.checked
            ? e.value
              ? this.removeError(e)
              : (this.addError(e),
                setTimeout(() => {
                  e.parentElement.querySelector(".form__error") &&
                    e.parentElement.removeChild(
                      e.parentElement.querySelector(".form__error")
                    );
                }, 1e4),
                t++)
            : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.parentElement.classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error")
            );
      },
      formClean(e) {
        e.reset(),
          setTimeout(() => {
            let t = e.querySelectorAll("input,textarea");
            for (let e = 0; e < t.length; e++) {
              const i = t[e];
              i.parentElement.classList.remove("_form-focus"),
                i.classList.remove("_form-focus"),
                h.removeError(i),
                (i.value = i.dataset.placeholder);
            }
            let i = e.querySelectorAll(".checkbox__input");
            if (i.length > 0)
              for (let e = 0; e < i.length; e++) {
                i[e].checked = !1;
              }
            if (p.selectModule) {
              let t = e.querySelectorAll(".select");
              if (t.length)
                for (let e = 0; e < t.length; e++) {
                  const i = t[e].querySelector("select");
                  p.selectModule.selectBuild(i);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function g(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function m(e = {}, t = {}) {
      Object.keys(t).forEach((i) => {
        void 0 === e[i]
          ? (e[i] = t[i])
          : g(t[i]) && g(e[i]) && Object.keys(t[i]).length > 0 && m(e[i], t[i]);
      });
    }
    const f = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function v() {
      const e = "undefined" != typeof document ? document : {};
      return m(e, f), e;
    }
    const y = {
      document: f,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function b() {
      const e = "undefined" != typeof window ? window : {};
      return m(e, y), e;
    }
    class w extends Array {
      constructor(e) {
        super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this);
      }
    }
    function x(e = []) {
      const t = [];
      return (
        e.forEach((e) => {
          Array.isArray(e) ? t.push(...x(e)) : t.push(e);
        }),
        t
      );
    }
    function S(e, t) {
      return Array.prototype.filter.call(e, t);
    }
    function k(e, t) {
      const i = b(),
        n = v();
      let s = [];
      if (!t && e instanceof w) return e;
      if (!e) return new w(s);
      if ("string" == typeof e) {
        const i = e.trim();
        if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
          let e = "div";
          0 === i.indexOf("<li") && (e = "ul"),
            0 === i.indexOf("<tr") && (e = "tbody"),
            (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
            0 === i.indexOf("<tbody") && (e = "table"),
            0 === i.indexOf("<option") && (e = "select");
          const t = n.createElement(e);
          t.innerHTML = i;
          for (let e = 0; e < t.childNodes.length; e += 1)
            s.push(t.childNodes[e]);
        } else
          s = (function (e, t) {
            if ("string" != typeof e) return [e];
            const i = [],
              n = t.querySelectorAll(e);
            for (let e = 0; e < n.length; e += 1) i.push(n[e]);
            return i;
          })(e.trim(), t || n);
      } else if (e.nodeType || e === i || e === n) s.push(e);
      else if (Array.isArray(e)) {
        if (e instanceof w) return e;
        s = e;
      }
      return new w(
        (function (e) {
          const t = [];
          for (let i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
          return t;
        })(s)
      );
    }
    k.fn = w.prototype;
    const C = "resize scroll".split(" ");
    function E(e) {
      return function (...t) {
        if (void 0 === t[0]) {
          for (let t = 0; t < this.length; t += 1)
            C.indexOf(e) < 0 &&
              (e in this[t] ? this[t][e]() : k(this[t]).trigger(e));
          return this;
        }
        return this.on(e, ...t);
      };
    }
    E("click"),
      E("blur"),
      E("focus"),
      E("focusin"),
      E("focusout"),
      E("keyup"),
      E("keydown"),
      E("keypress"),
      E("submit"),
      E("change"),
      E("mousedown"),
      E("mousemove"),
      E("mouseup"),
      E("mouseenter"),
      E("mouseleave"),
      E("mouseout"),
      E("mouseover"),
      E("touchstart"),
      E("touchend"),
      E("touchmove"),
      E("resize"),
      E("scroll");
    const T = {
      addClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.add(...t);
          }),
          this
        );
      },
      removeClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.remove(...t);
          }),
          this
        );
      },
      hasClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        return (
          S(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
            .length > 0
        );
      },
      toggleClass: function (...e) {
        const t = x(e.map((e) => e.split(" ")));
        this.forEach((e) => {
          t.forEach((t) => {
            e.classList.toggle(t);
          });
        });
      },
      attr: function (e, t) {
        if (1 === arguments.length && "string" == typeof e)
          return this[0] ? this[0].getAttribute(e) : void 0;
        for (let i = 0; i < this.length; i += 1)
          if (2 === arguments.length) this[i].setAttribute(e, t);
          else
            for (const t in e)
              (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
        return this;
      },
      removeAttr: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
        return this;
      },
      transform: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
        return this;
      },
      transition: function (e) {
        for (let t = 0; t < this.length; t += 1)
          this[t].style.transitionDuration =
            "string" != typeof e ? `${e}ms` : e;
        return this;
      },
      on: function (...e) {
        let [t, i, n, s] = e;
        function o(e) {
          const t = e.target;
          if (!t) return;
          const s = e.target.dom7EventData || [];
          if ((s.indexOf(e) < 0 && s.unshift(e), k(t).is(i))) n.apply(t, s);
          else {
            const e = k(t).parents();
            for (let t = 0; t < e.length; t += 1)
              k(e[t]).is(i) && n.apply(e[t], s);
          }
        }
        function r(e) {
          const t = (e && e.target && e.target.dom7EventData) || [];
          t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
        }
        "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
          s || (s = !1);
        const a = t.split(" ");
        let l;
        for (let e = 0; e < this.length; e += 1) {
          const t = this[e];
          if (i)
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                t.dom7LiveListeners[e].push({ listener: n, proxyListener: o }),
                t.addEventListener(e, o, s);
            }
          else
            for (l = 0; l < a.length; l += 1) {
              const e = a[l];
              t.dom7Listeners || (t.dom7Listeners = {}),
                t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                t.dom7Listeners[e].push({ listener: n, proxyListener: r }),
                t.addEventListener(e, r, s);
            }
        }
        return this;
      },
      off: function (...e) {
        let [t, i, n, s] = e;
        "function" == typeof e[1] && (([t, n, s] = e), (i = void 0)),
          s || (s = !1);
        const o = t.split(" ");
        for (let e = 0; e < o.length; e += 1) {
          const t = o[e];
          for (let e = 0; e < this.length; e += 1) {
            const o = this[e];
            let r;
            if (
              (!i && o.dom7Listeners
                ? (r = o.dom7Listeners[t])
                : i && o.dom7LiveListeners && (r = o.dom7LiveListeners[t]),
              r && r.length)
            )
              for (let e = r.length - 1; e >= 0; e -= 1) {
                const i = r[e];
                (n && i.listener === n) ||
                (n &&
                  i.listener &&
                  i.listener.dom7proxy &&
                  i.listener.dom7proxy === n)
                  ? (o.removeEventListener(t, i.proxyListener, s),
                    r.splice(e, 1))
                  : n ||
                    (o.removeEventListener(t, i.proxyListener, s),
                    r.splice(e, 1));
              }
          }
        }
        return this;
      },
      trigger: function (...e) {
        const t = b(),
          i = e[0].split(" "),
          n = e[1];
        for (let s = 0; s < i.length; s += 1) {
          const o = i[s];
          for (let i = 0; i < this.length; i += 1) {
            const s = this[i];
            if (t.CustomEvent) {
              const i = new t.CustomEvent(o, {
                detail: n,
                bubbles: !0,
                cancelable: !0,
              });
              (s.dom7EventData = e.filter((e, t) => t > 0)),
                s.dispatchEvent(i),
                (s.dom7EventData = []),
                delete s.dom7EventData;
            }
          }
        }
        return this;
      },
      transitionEnd: function (e) {
        const t = this;
        return (
          e &&
            t.on("transitionend", function i(n) {
              n.target === this && (e.call(this, n), t.off("transitionend", i));
            }),
          this
        );
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue("margin-right")) +
              parseFloat(e.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue("margin-top")) +
              parseFloat(e.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      styles: function () {
        const e = b();
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
      offset: function () {
        if (this.length > 0) {
          const e = b(),
            t = v(),
            i = this[0],
            n = i.getBoundingClientRect(),
            s = t.body,
            o = i.clientTop || s.clientTop || 0,
            r = i.clientLeft || s.clientLeft || 0,
            a = i === e ? e.scrollY : i.scrollTop,
            l = i === e ? e.scrollX : i.scrollLeft;
          return { top: n.top + a - o, left: n.left + l - r };
        }
        return null;
      },
      css: function (e, t) {
        const i = b();
        let n;
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (n = 0; n < this.length; n += 1)
              for (const t in e) this[n].style[t] = e[t];
            return this;
          }
          if (this[0])
            return i.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        return e
          ? (this.forEach((t, i) => {
              e.apply(t, [t, i]);
            }),
            this)
          : this;
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null;
        for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
        return this;
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
        return this;
      },
      is: function (e) {
        const t = b(),
          i = v(),
          n = this[0];
        let s, o;
        if (!n || void 0 === e) return !1;
        if ("string" == typeof e) {
          if (n.matches) return n.matches(e);
          if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
          if (n.msMatchesSelector) return n.msMatchesSelector(e);
          for (s = k(e), o = 0; o < s.length; o += 1) if (s[o] === n) return !0;
          return !1;
        }
        if (e === i) return n === i;
        if (e === t) return n === t;
        if (e.nodeType || e instanceof w) {
          for (s = e.nodeType ? [e] : e, o = 0; o < s.length; o += 1)
            if (s[o] === n) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        let e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        const t = this.length;
        if (e > t - 1) return k([]);
        if (e < 0) {
          const i = t + e;
          return k(i < 0 ? [] : [this[i]]);
        }
        return k([this[e]]);
      },
      append: function (...e) {
        let t;
        const i = v();
        for (let n = 0; n < e.length; n += 1) {
          t = e[n];
          for (let e = 0; e < this.length; e += 1)
            if ("string" == typeof t) {
              const n = i.createElement("div");
              for (n.innerHTML = t; n.firstChild; )
                this[e].appendChild(n.firstChild);
            } else if (t instanceof w)
              for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
            else this[e].appendChild(t);
        }
        return this;
      },
      prepend: function (e) {
        const t = v();
        let i, n;
        for (i = 0; i < this.length; i += 1)
          if ("string" == typeof e) {
            const s = t.createElement("div");
            for (s.innerHTML = e, n = s.childNodes.length - 1; n >= 0; n -= 1)
              this[i].insertBefore(s.childNodes[n], this[i].childNodes[0]);
          } else if (e instanceof w)
            for (n = 0; n < e.length; n += 1)
              this[i].insertBefore(e[n], this[i].childNodes[0]);
          else this[i].insertBefore(e, this[i].childNodes[0]);
        return this;
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && k(this[0].nextElementSibling).is(e)
              ? k([this[0].nextElementSibling])
              : k([])
            : this[0].nextElementSibling
            ? k([this[0].nextElementSibling])
            : k([])
          : k([]);
      },
      nextAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return k([]);
        for (; i.nextElementSibling; ) {
          const n = i.nextElementSibling;
          e ? k(n).is(e) && t.push(n) : t.push(n), (i = n);
        }
        return k(t);
      },
      prev: function (e) {
        if (this.length > 0) {
          const t = this[0];
          return e
            ? t.previousElementSibling && k(t.previousElementSibling).is(e)
              ? k([t.previousElementSibling])
              : k([])
            : t.previousElementSibling
            ? k([t.previousElementSibling])
            : k([]);
        }
        return k([]);
      },
      prevAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return k([]);
        for (; i.previousElementSibling; ) {
          const n = i.previousElementSibling;
          e ? k(n).is(e) && t.push(n) : t.push(n), (i = n);
        }
        return k(t);
      },
      parent: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1)
          null !== this[i].parentNode &&
            (e
              ? k(this[i].parentNode).is(e) && t.push(this[i].parentNode)
              : t.push(this[i].parentNode));
        return k(t);
      },
      parents: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          let n = this[i].parentNode;
          for (; n; )
            e ? k(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
        }
        return k(t);
      },
      closest: function (e) {
        let t = this;
        return void 0 === e ? k([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const n = this[i].querySelectorAll(e);
          for (let e = 0; e < n.length; e += 1) t.push(n[e]);
        }
        return k(t);
      },
      children: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const n = this[i].children;
          for (let i = 0; i < n.length; i += 1)
            (e && !k(n[i]).is(e)) || t.push(n[i]);
        }
        return k(t);
      },
      filter: function (e) {
        return k(S(this, e));
      },
      remove: function () {
        for (let e = 0; e < this.length; e += 1)
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      },
    };
    Object.keys(T).forEach((e) => {
      Object.defineProperty(k.fn, e, { value: T[e], writable: !0 });
    });
    const _ = k;
    function P(e, t = 0) {
      return setTimeout(e, t);
    }
    function O() {
      return Date.now();
    }
    function I(e, t = "x") {
      const i = b();
      let n, s, o;
      const r = (function (e) {
        const t = b();
        let i;
        return (
          t.getComputedStyle && (i = t.getComputedStyle(e, null)),
          !i && e.currentStyle && (i = e.currentStyle),
          i || (i = e.style),
          i
        );
      })(e);
      return (
        i.WebKitCSSMatrix
          ? ((s = r.transform || r.webkitTransform),
            s.split(",").length > 6 &&
              (s = s
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (o = new i.WebKitCSSMatrix("none" === s ? "" : s)))
          : ((o =
              r.MozTransform ||
              r.OTransform ||
              r.MsTransform ||
              r.msTransform ||
              r.transform ||
              r
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (n = o.toString().split(","))),
        "x" === t &&
          (s = i.WebKitCSSMatrix
            ? o.m41
            : 16 === n.length
            ? parseFloat(n[12])
            : parseFloat(n[4])),
        "y" === t &&
          (s = i.WebKitCSSMatrix
            ? o.m42
            : 16 === n.length
            ? parseFloat(n[13])
            : parseFloat(n[5])),
        s || 0
      );
    }
    function M(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function L(...e) {
      const t = Object(e[0]),
        i = ["__proto__", "constructor", "prototype"];
      for (let s = 1; s < e.length; s += 1) {
        const o = e[s];
        if (
          null != o &&
          ((n = o),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? n instanceof HTMLElement
            : n && (1 === n.nodeType || 11 === n.nodeType)))
        ) {
          const e = Object.keys(Object(o)).filter((e) => i.indexOf(e) < 0);
          for (let i = 0, n = e.length; i < n; i += 1) {
            const n = e[i],
              s = Object.getOwnPropertyDescriptor(o, n);
            void 0 !== s &&
              s.enumerable &&
              (M(t[n]) && M(o[n])
                ? o[n].__swiper__
                  ? (t[n] = o[n])
                  : L(t[n], o[n])
                : !M(t[n]) && M(o[n])
                ? ((t[n] = {}), o[n].__swiper__ ? (t[n] = o[n]) : L(t[n], o[n]))
                : (t[n] = o[n]));
          }
        }
      }
      var n;
      return t;
    }
    function A(e, t, i) {
      e.style.setProperty(t, i);
    }
    function D({ swiper: e, targetPosition: t, side: i }) {
      const n = b(),
        s = -e.translate;
      let o,
        r = null;
      const a = e.params.speed;
      (e.wrapperEl.style.scrollSnapType = "none"),
        n.cancelAnimationFrame(e.cssModeFrameID);
      const l = t > s ? "next" : "prev",
        c = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
        d = () => {
          (o = new Date().getTime()), null === r && (r = o);
          const l = Math.max(Math.min((o - r) / a, 1), 0),
            u = 0.5 - Math.cos(l * Math.PI) / 2;
          let p = s + u * (t - s);
          if ((c(p, t) && (p = t), e.wrapperEl.scrollTo({ [i]: p }), c(p, t)))
            return (
              (e.wrapperEl.style.overflow = "hidden"),
              (e.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (e.wrapperEl.style.overflow = ""),
                  e.wrapperEl.scrollTo({ [i]: p });
              }),
              void n.cancelAnimationFrame(e.cssModeFrameID)
            );
          e.cssModeFrameID = n.requestAnimationFrame(d);
        };
      d();
    }
    let z, $, B;
    function G() {
      return (
        z ||
          (z = (function () {
            const e = b(),
              t = v();
            return {
              smoothScroll:
                t.documentElement &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
              passiveListener: (function () {
                let t = !1;
                try {
                  const i = Object.defineProperty({}, "passive", {
                    get() {
                      t = !0;
                    },
                  });
                  e.addEventListener("testPassiveListener", null, i);
                } catch (e) {}
                return t;
              })(),
              gestures: "ongesturestart" in e,
            };
          })()),
        z
      );
    }
    function F(e = {}) {
      return (
        $ ||
          ($ = (function ({ userAgent: e } = {}) {
            const t = G(),
              i = b(),
              n = i.navigator.platform,
              s = e || i.navigator.userAgent,
              o = { ios: !1, android: !1 },
              r = i.screen.width,
              a = i.screen.height,
              l = s.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = s.match(/(iPad).*OS\s([\d_]+)/);
            const d = s.match(/(iPod)(.*OS\s([\d_]+))?/),
              u = !c && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              p = "Win32" === n;
            let h = "MacIntel" === n;
            return (
              !c &&
                h &&
                t.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${r}x${a}`) >= 0 &&
                ((c = s.match(/(Version)\/([\d.]+)/)),
                c || (c = [0, 1, "13_0_0"]),
                (h = !1)),
              l && !p && ((o.os = "android"), (o.android = !0)),
              (c || u || d) && ((o.os = "ios"), (o.ios = !0)),
              o
            );
          })(e)),
        $
      );
    }
    function j() {
      return (
        B ||
          (B = (function () {
            const e = b();
            return {
              isSafari: (function () {
                const t = e.navigator.userAgent.toLowerCase();
                return (
                  t.indexOf("safari") >= 0 &&
                  t.indexOf("chrome") < 0 &&
                  t.indexOf("android") < 0
                );
              })(),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
            };
          })()),
        B
      );
    }
    const N = {
      on(e, t, i) {
        const n = this;
        if ("function" != typeof t) return n;
        const s = i ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            n.eventsListeners[e] || (n.eventsListeners[e] = []),
              n.eventsListeners[e][s](t);
          }),
          n
        );
      },
      once(e, t, i) {
        const n = this;
        if ("function" != typeof t) return n;
        function s(...i) {
          n.off(e, s),
            s.__emitterProxy && delete s.__emitterProxy,
            t.apply(n, i);
        }
        return (s.__emitterProxy = t), n.on(e, s, i);
      },
      onAny(e, t) {
        const i = this;
        if ("function" != typeof e) return i;
        const n = t ? "unshift" : "push";
        return (
          i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsAnyListeners) return t;
        const i = t.eventsAnyListeners.indexOf(e);
        return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
      },
      off(e, t) {
        const i = this;
        return i.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (i.eventsListeners[e] = [])
                : i.eventsListeners[e] &&
                  i.eventsListeners[e].forEach((n, s) => {
                    (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                      i.eventsListeners[e].splice(s, 1);
                  });
            }),
            i)
          : i;
      },
      emit(...e) {
        const t = this;
        if (!t.eventsListeners) return t;
        let i, n, s;
        "string" == typeof e[0] || Array.isArray(e[0])
          ? ((i = e[0]), (n = e.slice(1, e.length)), (s = t))
          : ((i = e[0].events), (n = e[0].data), (s = e[0].context || t)),
          n.unshift(s);
        return (
          (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
            t.eventsAnyListeners &&
              t.eventsAnyListeners.length &&
              t.eventsAnyListeners.forEach((t) => {
                t.apply(s, [e, ...n]);
              }),
              t.eventsListeners &&
                t.eventsListeners[e] &&
                t.eventsListeners[e].forEach((e) => {
                  e.apply(s, n);
                });
          }),
          t
        );
      },
    };
    const R = {
      updateSize: function () {
        const e = this;
        let t, i;
        const n = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : n[0].clientWidth),
          (i =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : n[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === i && e.isVertical()) ||
            ((t =
              t -
              parseInt(n.css("padding-left") || 0, 10) -
              parseInt(n.css("padding-right") || 0, 10)),
            (i =
              i -
              parseInt(n.css("padding-top") || 0, 10) -
              parseInt(n.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(i) && (i = 0),
            Object.assign(e, {
              width: t,
              height: i,
              size: e.isHorizontal() ? t : i,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function i(e, i) {
          return parseFloat(e.getPropertyValue(t(i)) || 0);
        }
        const n = e.params,
          { $wrapperEl: s, size: o, rtlTranslate: r, wrongRTL: a } = e,
          l = e.virtual && n.virtual.enabled,
          c = l ? e.virtual.slides.length : e.slides.length,
          d = s.children(`.${e.params.slideClass}`),
          u = l ? e.virtual.slides.length : d.length;
        let p = [];
        const h = [],
          g = [];
        let m = n.slidesOffsetBefore;
        "function" == typeof m && (m = n.slidesOffsetBefore.call(e));
        let f = n.slidesOffsetAfter;
        "function" == typeof f && (f = n.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length,
          y = e.slidesGrid.length;
        let b = n.spaceBetween,
          w = -m,
          x = 0,
          S = 0;
        if (void 0 === o) return;
        "string" == typeof b &&
          b.indexOf("%") >= 0 &&
          (b = (parseFloat(b.replace("%", "")) / 100) * o),
          (e.virtualSize = -b),
          r
            ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          n.centeredSlides &&
            n.cssMode &&
            (A(e.wrapperEl, "--swiper-centered-offset-before", ""),
            A(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const k = n.grid && n.grid.rows > 1 && e.grid;
        let C;
        k && e.grid.initSlides(u);
        const E =
          "auto" === n.slidesPerView &&
          n.breakpoints &&
          Object.keys(n.breakpoints).filter(
            (e) => void 0 !== n.breakpoints[e].slidesPerView
          ).length > 0;
        for (let s = 0; s < u; s += 1) {
          C = 0;
          const r = d.eq(s);
          if (
            (k && e.grid.updateSlide(s, r, u, t), "none" !== r.css("display"))
          ) {
            if ("auto" === n.slidesPerView) {
              E && (d[s].style[t("width")] = "");
              const o = getComputedStyle(r[0]),
                a = r[0].style.transform,
                l = r[0].style.webkitTransform;
              if (
                (a && (r[0].style.transform = "none"),
                l && (r[0].style.webkitTransform = "none"),
                n.roundLengths)
              )
                C = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
              else {
                const e = i(o, "width"),
                  t = i(o, "padding-left"),
                  n = i(o, "padding-right"),
                  s = i(o, "margin-left"),
                  a = i(o, "margin-right"),
                  l = o.getPropertyValue("box-sizing");
                if (l && "border-box" === l) C = e + s + a;
                else {
                  const { clientWidth: i, offsetWidth: o } = r[0];
                  C = e + t + n + s + a + (o - i);
                }
              }
              a && (r[0].style.transform = a),
                l && (r[0].style.webkitTransform = l),
                n.roundLengths && (C = Math.floor(C));
            } else
              (C = (o - (n.slidesPerView - 1) * b) / n.slidesPerView),
                n.roundLengths && (C = Math.floor(C)),
                d[s] && (d[s].style[t("width")] = `${C}px`);
            d[s] && (d[s].swiperSlideSize = C),
              g.push(C),
              n.centeredSlides
                ? ((w = w + C / 2 + x / 2 + b),
                  0 === x && 0 !== s && (w = w - o / 2 - b),
                  0 === s && (w = w - o / 2 - b),
                  Math.abs(w) < 0.001 && (w = 0),
                  n.roundLengths && (w = Math.floor(w)),
                  S % n.slidesPerGroup == 0 && p.push(w),
                  h.push(w))
                : (n.roundLengths && (w = Math.floor(w)),
                  (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                    e.params.slidesPerGroup ==
                    0 && p.push(w),
                  h.push(w),
                  (w = w + C + b)),
              (e.virtualSize += C + b),
              (x = C),
              (S += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, o) + f),
          r &&
            a &&
            ("slide" === n.effect || "coverflow" === n.effect) &&
            s.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
          n.setWrapperSize &&
            s.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
          k && e.grid.updateWrapperSize(C, p, t),
          !n.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < p.length; i += 1) {
            let s = p[i];
            n.roundLengths && (s = Math.floor(s)),
              p[i] <= e.virtualSize - o && t.push(s);
          }
          (p = t),
            Math.floor(e.virtualSize - o) - Math.floor(p[p.length - 1]) > 1 &&
              p.push(e.virtualSize - o);
        }
        if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
          const i = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
          d.filter((e, t) => !n.cssMode || t !== d.length - 1).css({
            [i]: `${b}px`,
          });
        }
        if (n.centeredSlides && n.centeredSlidesBounds) {
          let e = 0;
          g.forEach((t) => {
            e += t + (n.spaceBetween ? n.spaceBetween : 0);
          }),
            (e -= n.spaceBetween);
          const t = e - o;
          p = p.map((e) => (e < 0 ? -m : e > t ? t + f : e));
        }
        if (n.centerInsufficientSlides) {
          let e = 0;
          if (
            (g.forEach((t) => {
              e += t + (n.spaceBetween ? n.spaceBetween : 0);
            }),
            (e -= n.spaceBetween),
            e < o)
          ) {
            const t = (o - e) / 2;
            p.forEach((e, i) => {
              p[i] = e - t;
            }),
              h.forEach((e, i) => {
                h[i] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: d,
            snapGrid: p,
            slidesGrid: h,
            slidesSizesGrid: g,
          }),
          n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
        ) {
          A(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
            A(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - g[g.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            i = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + i));
        }
        u !== c && e.emit("slidesLengthChange"),
          p.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          h.length !== y && e.emit("slidesGridLengthChange"),
          n.watchSlidesProgress && e.updateSlidesOffset();
      },
      updateAutoHeight: function (e) {
        const t = this,
          i = [],
          n = t.virtual && t.params.virtual.enabled;
        let s,
          o = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const r = (e) =>
          n
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            t.visibleSlides.each((e) => {
              i.push(e);
            });
          else
            for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
              const e = t.activeIndex + s;
              if (e > t.slides.length && !n) break;
              i.push(r(e));
            }
        else i.push(r(t.activeIndex));
        for (s = 0; s < i.length; s += 1)
          if (void 0 !== i[s]) {
            const e = i[s].offsetHeight;
            o = e > o ? e : o;
          }
        (o || 0 === o) && t.$wrapperEl.css("height", `${o}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset = e.isHorizontal()
            ? t[i].offsetLeft
            : t[i].offsetTop;
      },
      updateSlidesProgress: function (e = (this && this.translate) || 0) {
        const t = this,
          i = t.params,
          { slides: n, rtlTranslate: s, snapGrid: o } = t;
        if (0 === n.length) return;
        void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
        let r = -e;
        s && (r = e),
          n.removeClass(i.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let e = 0; e < n.length; e += 1) {
          const a = n[e];
          let l = a.swiperSlideOffset;
          i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
          const c =
              (r + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + i.spaceBetween),
            d =
              (r - o[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (a.swiperSlideSize + i.spaceBetween),
            u = -(r - l),
            p = u + t.slidesSizesGrid[e];
          ((u >= 0 && u < t.size - 1) ||
            (p > 1 && p <= t.size) ||
            (u <= 0 && p >= t.size)) &&
            (t.visibleSlides.push(a),
            t.visibleSlidesIndexes.push(e),
            n.eq(e).addClass(i.slideVisibleClass)),
            (a.progress = s ? -c : c),
            (a.originalProgress = s ? -d : d);
        }
        t.visibleSlides = _(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const i = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * i) || 0;
        }
        const i = t.params,
          n = t.maxTranslate() - t.minTranslate();
        let { progress: s, isBeginning: o, isEnd: r } = t;
        const a = o,
          l = r;
        0 === n
          ? ((s = 0), (o = !0), (r = !0))
          : ((s = (e - t.minTranslate()) / n), (o = s <= 0), (r = s >= 1)),
          Object.assign(t, { progress: s, isBeginning: o, isEnd: r }),
          (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
            t.updateSlidesProgress(e),
          o && !a && t.emit("reachBeginning toEdge"),
          r && !l && t.emit("reachEnd toEdge"),
          ((a && !o) || (l && !r)) && t.emit("fromEdge"),
          t.emit("progress", s);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: i,
            $wrapperEl: n,
            activeIndex: s,
            realIndex: o,
          } = e,
          r = e.virtual && i.virtual.enabled;
        let a;
        t.removeClass(
          `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
        ),
          (a = r
            ? e.$wrapperEl.find(
                `.${i.slideClass}[data-swiper-slide-index="${s}"]`
              )
            : t.eq(s)),
          a.addClass(i.slideActiveClass),
          i.loop &&
            (a.hasClass(i.slideDuplicateClass)
              ? n
                  .children(
                    `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${o}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass)
              : n
                  .children(
                    `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${o}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass));
        let l = a.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
        i.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(i.slideNextClass));
        let c = a.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
        i.loop &&
          0 === c.length &&
          ((c = t.eq(-1)), c.addClass(i.slidePrevClass)),
          i.loop &&
            (l.hasClass(i.slideDuplicateClass)
              ? n
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass)
              : n
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass),
            c.hasClass(i.slideDuplicateClass)
              ? n
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${c.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)
              : n
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${c.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          i = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: n,
            snapGrid: s,
            params: o,
            activeIndex: r,
            realIndex: a,
            snapIndex: l,
          } = t;
        let c,
          d = e;
        if (void 0 === d) {
          for (let e = 0; e < n.length; e += 1)
            void 0 !== n[e + 1]
              ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2
                ? (d = e)
                : i >= n[e] && i < n[e + 1] && (d = e + 1)
              : i >= n[e] && (d = e);
          o.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
        }
        if (s.indexOf(i) >= 0) c = s.indexOf(i);
        else {
          const e = Math.min(o.slidesPerGroupSkip, d);
          c = e + Math.floor((d - e) / o.slidesPerGroup);
        }
        if ((c >= s.length && (c = s.length - 1), d === r))
          return void (
            c !== l && ((t.snapIndex = c), t.emit("snapIndexChange"))
          );
        const u = parseInt(
          t.slides.eq(d).attr("data-swiper-slide-index") || d,
          10
        );
        Object.assign(t, {
          snapIndex: c,
          realIndex: u,
          previousIndex: r,
          activeIndex: d,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          a !== u && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          i = t.params,
          n = _(e).closest(`.${i.slideClass}`)[0];
        let s,
          o = !1;
        if (n)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === n) {
              (o = !0), (s = e);
              break;
            }
        if (!n || !o)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = n),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                _(n).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = s),
          i.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    };
    const H = {
      getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
        const {
          params: t,
          rtlTranslate: i,
          translate: n,
          $wrapperEl: s,
        } = this;
        if (t.virtualTranslate) return i ? -n : n;
        if (t.cssMode) return n;
        let o = I(s[0], e);
        return i && (o = -o), o || 0;
      },
      setTranslate: function (e, t) {
        const i = this,
          {
            rtlTranslate: n,
            params: s,
            $wrapperEl: o,
            wrapperEl: r,
            progress: a,
          } = i;
        let l,
          c = 0,
          d = 0;
        i.isHorizontal() ? (c = n ? -e : e) : (d = e),
          s.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
          s.cssMode
            ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                i.isHorizontal() ? -c : -d)
            : s.virtualTranslate ||
              o.transform(`translate3d(${c}px, ${d}px, 0px)`),
          (i.previousTranslate = i.translate),
          (i.translate = i.isHorizontal() ? c : d);
        const u = i.maxTranslate() - i.minTranslate();
        (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
          l !== a && i.updateProgress(e),
          i.emit("setTranslate", i.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e = 0, t = this.params.speed, i = !0, n = !0, s) {
        const o = this,
          { params: r, wrapperEl: a } = o;
        if (o.animating && r.preventInteractionOnTransition) return !1;
        const l = o.minTranslate(),
          c = o.maxTranslate();
        let d;
        if (
          ((d = n && e > l ? l : n && e < c ? c : e),
          o.updateProgress(d),
          r.cssMode)
        ) {
          const e = o.isHorizontal();
          if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
          else {
            if (!o.support.smoothScroll)
              return (
                D({ swiper: o, targetPosition: -d, side: e ? "left" : "top" }),
                !0
              );
            a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (o.setTransition(0),
              o.setTranslate(d),
              i &&
                (o.emit("beforeTransitionStart", t, s),
                o.emit("transitionEnd")))
            : (o.setTransition(t),
              o.setTranslate(d),
              i &&
                (o.emit("beforeTransitionStart", t, s),
                o.emit("transitionStart")),
              o.animating ||
                ((o.animating = !0),
                o.onTranslateToWrapperTransitionEnd ||
                  (o.onTranslateToWrapperTransitionEnd = function (e) {
                    o &&
                      !o.destroyed &&
                      e.target === this &&
                      (o.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        o.onTranslateToWrapperTransitionEnd
                      ),
                      o.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        o.onTranslateToWrapperTransitionEnd
                      ),
                      (o.onTranslateToWrapperTransitionEnd = null),
                      delete o.onTranslateToWrapperTransitionEnd,
                      i && o.emit("transitionEnd"));
                  }),
                o.$wrapperEl[0].addEventListener(
                  "transitionend",
                  o.onTranslateToWrapperTransitionEnd
                ),
                o.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  o.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function V({ swiper: e, runCallbacks: t, direction: i, step: n }) {
      const { activeIndex: s, previousIndex: o } = e;
      let r = i;
      if (
        (r || (r = s > o ? "next" : s < o ? "prev" : "reset"),
        e.emit(`transition${n}`),
        t && s !== o)
      ) {
        if ("reset" === r) return void e.emit(`slideResetTransition${n}`);
        e.emit(`slideChangeTransition${n}`),
          "next" === r
            ? e.emit(`slideNextTransition${n}`)
            : e.emit(`slidePrevTransition${n}`);
      }
    }
    const q = {
      slideTo: function (e = 0, t = this.params.speed, i = !0, n, s) {
        if ("number" != typeof e && "string" != typeof e)
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const o = this;
        let r = e;
        r < 0 && (r = 0);
        const {
          params: a,
          snapGrid: l,
          slidesGrid: c,
          previousIndex: d,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: h,
          enabled: g,
        } = o;
        if (
          (o.animating && a.preventInteractionOnTransition) ||
          (!g && !n && !s)
        )
          return !1;
        const m = Math.min(o.params.slidesPerGroupSkip, r);
        let f = m + Math.floor((r - m) / o.params.slidesPerGroup);
        f >= l.length && (f = l.length - 1),
          (u || a.initialSlide || 0) === (d || 0) &&
            i &&
            o.emit("beforeSlideChangeStart");
        const v = -l[f];
        if ((o.updateProgress(v), a.normalizeSlideIndex))
          for (let e = 0; e < c.length; e += 1) {
            const t = -Math.floor(100 * v),
              i = Math.floor(100 * c[e]),
              n = Math.floor(100 * c[e + 1]);
            void 0 !== c[e + 1]
              ? t >= i && t < n - (n - i) / 2
                ? (r = e)
                : t >= i && t < n && (r = e + 1)
              : t >= i && (r = e);
          }
        if (o.initialized && r !== u) {
          if (!o.allowSlideNext && v < o.translate && v < o.minTranslate())
            return !1;
          if (
            !o.allowSlidePrev &&
            v > o.translate &&
            v > o.maxTranslate() &&
            (u || 0) !== r
          )
            return !1;
        }
        let y;
        if (
          ((y = r > u ? "next" : r < u ? "prev" : "reset"),
          (p && -v === o.translate) || (!p && v === o.translate))
        )
          return (
            o.updateActiveIndex(r),
            a.autoHeight && o.updateAutoHeight(),
            o.updateSlidesClasses(),
            "slide" !== a.effect && o.setTranslate(v),
            "reset" !== y && (o.transitionStart(i, y), o.transitionEnd(i, y)),
            !1
          );
        if (a.cssMode) {
          const e = o.isHorizontal(),
            i = p ? v : -v;
          if (0 === t) {
            const t = o.virtual && o.params.virtual.enabled;
            t &&
              ((o.wrapperEl.style.scrollSnapType = "none"),
              (o._immediateVirtual = !0)),
              (h[e ? "scrollLeft" : "scrollTop"] = i),
              t &&
                requestAnimationFrame(() => {
                  (o.wrapperEl.style.scrollSnapType = ""),
                    (o._swiperImmediateVirtual = !1);
                });
          } else {
            if (!o.support.smoothScroll)
              return (
                D({ swiper: o, targetPosition: i, side: e ? "left" : "top" }),
                !0
              );
            h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
          }
          return !0;
        }
        return (
          o.setTransition(t),
          o.setTranslate(v),
          o.updateActiveIndex(r),
          o.updateSlidesClasses(),
          o.emit("beforeTransitionStart", t, n),
          o.transitionStart(i, y),
          0 === t
            ? o.transitionEnd(i, y)
            : o.animating ||
              ((o.animating = !0),
              o.onSlideToWrapperTransitionEnd ||
                (o.onSlideToWrapperTransitionEnd = function (e) {
                  o &&
                    !o.destroyed &&
                    e.target === this &&
                    (o.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      o.onSlideToWrapperTransitionEnd
                    ),
                    o.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      o.onSlideToWrapperTransitionEnd
                    ),
                    (o.onSlideToWrapperTransitionEnd = null),
                    delete o.onSlideToWrapperTransitionEnd,
                    o.transitionEnd(i, y));
                }),
              o.$wrapperEl[0].addEventListener(
                "transitionend",
                o.onSlideToWrapperTransitionEnd
              ),
              o.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                o.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e = 0, t = this.params.speed, i = !0, n) {
        const s = this;
        let o = e;
        return s.params.loop && (o += s.loopedSlides), s.slideTo(o, t, i, n);
      },
      slideNext: function (e = this.params.speed, t = !0, i) {
        const n = this,
          { animating: s, enabled: o, params: r } = n;
        if (!o) return n;
        let a = r.slidesPerGroup;
        "auto" === r.slidesPerView &&
          1 === r.slidesPerGroup &&
          r.slidesPerGroupAuto &&
          (a = Math.max(n.slidesPerViewDynamic("current", !0), 1));
        const l = n.activeIndex < r.slidesPerGroupSkip ? 1 : a;
        if (r.loop) {
          if (s && r.loopPreventsSlide) return !1;
          n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
        }
        return r.rewind && n.isEnd
          ? n.slideTo(0, e, t, i)
          : n.slideTo(n.activeIndex + l, e, t, i);
      },
      slidePrev: function (e = this.params.speed, t = !0, i) {
        const n = this,
          {
            params: s,
            animating: o,
            snapGrid: r,
            slidesGrid: a,
            rtlTranslate: l,
            enabled: c,
          } = n;
        if (!c) return n;
        if (s.loop) {
          if (o && s.loopPreventsSlide) return !1;
          n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
        }
        function d(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = d(l ? n.translate : -n.translate),
          p = r.map((e) => d(e));
        let h = r[p.indexOf(u) - 1];
        if (void 0 === h && s.cssMode) {
          let e;
          r.forEach((t, i) => {
            u >= t && (e = i);
          }),
            void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
        }
        let g = 0;
        return (
          void 0 !== h &&
            ((g = a.indexOf(h)),
            g < 0 && (g = n.activeIndex - 1),
            "auto" === s.slidesPerView &&
              1 === s.slidesPerGroup &&
              s.slidesPerGroupAuto &&
              ((g = g - n.slidesPerViewDynamic("previous", !0) + 1),
              (g = Math.max(g, 0)))),
          s.rewind && n.isBeginning
            ? n.slideTo(n.slides.length - 1, e, t, i)
            : n.slideTo(g, e, t, i)
        );
      },
      slideReset: function (e = this.params.speed, t = !0, i) {
        return this.slideTo(this.activeIndex, e, t, i);
      },
      slideToClosest: function (e = this.params.speed, t = !0, i, n = 0.5) {
        const s = this;
        let o = s.activeIndex;
        const r = Math.min(s.params.slidesPerGroupSkip, o),
          a = r + Math.floor((o - r) / s.params.slidesPerGroup),
          l = s.rtlTranslate ? s.translate : -s.translate;
        if (l >= s.snapGrid[a]) {
          const e = s.snapGrid[a];
          l - e > (s.snapGrid[a + 1] - e) * n && (o += s.params.slidesPerGroup);
        } else {
          const e = s.snapGrid[a - 1];
          l - e <= (s.snapGrid[a] - e) * n && (o -= s.params.slidesPerGroup);
        }
        return (
          (o = Math.max(o, 0)),
          (o = Math.min(o, s.slidesGrid.length - 1)),
          s.slideTo(o, e, t, i)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: i } = e,
          n =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let s,
          o = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (s = parseInt(_(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? o < e.loopedSlides - n / 2 ||
                o > e.slides.length - e.loopedSlides + n / 2
                ? (e.loopFix(),
                  (o = i
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  P(() => {
                    e.slideTo(o);
                  }))
                : e.slideTo(o)
              : o > e.slides.length - n
              ? (e.loopFix(),
                (o = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                P(() => {
                  e.slideTo(o);
                }))
              : e.slideTo(o);
        } else e.slideTo(o);
      },
    };
    const W = {
      loopCreate: function () {
        const e = this,
          t = v(),
          { params: i, $wrapperEl: n } = e,
          s = n.children().length > 0 ? _(n.children()[0].parentNode) : n;
        s.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
        let o = s.children(`.${i.slideClass}`);
        if (i.loopFillGroupWithBlank) {
          const e = i.slidesPerGroup - (o.length % i.slidesPerGroup);
          if (e !== i.slidesPerGroup) {
            for (let n = 0; n < e; n += 1) {
              const e = _(t.createElement("div")).addClass(
                `${i.slideClass} ${i.slideBlankClass}`
              );
              s.append(e);
            }
            o = s.children(`.${i.slideClass}`);
          }
        }
        "auto" !== i.slidesPerView ||
          i.loopedSlides ||
          (i.loopedSlides = o.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(i.loopedSlides || i.slidesPerView, 10)
          )),
          (e.loopedSlides += i.loopAdditionalSlides),
          e.loopedSlides > o.length && (e.loopedSlides = o.length);
        const r = [],
          a = [];
        o.each((t, i) => {
          const n = _(t);
          i < e.loopedSlides && a.push(t),
            i < o.length && i >= o.length - e.loopedSlides && r.push(t),
            n.attr("data-swiper-slide-index", i);
        });
        for (let e = 0; e < a.length; e += 1)
          s.append(_(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
        for (let e = r.length - 1; e >= 0; e -= 1)
          s.prepend(_(r[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: i,
          loopedSlides: n,
          allowSlidePrev: s,
          allowSlideNext: o,
          snapGrid: r,
          rtlTranslate: a,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const c = -r[t] - e.getTranslate();
        if (t < n) {
          (l = i.length - 3 * n + t), (l += n);
          e.slideTo(l, 0, !1, !0) &&
            0 !== c &&
            e.setTranslate((a ? -e.translate : e.translate) - c);
        } else if (t >= i.length - n) {
          (l = -i.length + t + n), (l += n);
          e.slideTo(l, 0, !1, !0) &&
            0 !== c &&
            e.setTranslate((a ? -e.translate : e.translate) - c);
        }
        (e.allowSlidePrev = s), (e.allowSlideNext = o), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: i } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          i.removeAttr("data-swiper-slide-index");
      },
    };
    function Y(e) {
      const t = this,
        i = v(),
        n = b(),
        s = t.touchEventsData,
        { params: o, touches: r, enabled: a } = t;
      if (!a) return;
      if (t.animating && o.preventInteractionOnTransition) return;
      !t.animating && o.cssMode && o.loop && t.loopFix();
      let l = e;
      l.originalEvent && (l = l.originalEvent);
      let c = _(l.target);
      if ("wrapper" === o.touchEventsTarget && !c.closest(t.wrapperEl).length)
        return;
      if (
        ((s.isTouchEvent = "touchstart" === l.type),
        !s.isTouchEvent && "which" in l && 3 === l.which)
      )
        return;
      if (!s.isTouchEvent && "button" in l && l.button > 0) return;
      if (s.isTouched && s.isMoved) return;
      !!o.noSwipingClass &&
        "" !== o.noSwipingClass &&
        l.target &&
        l.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (c = _(e.path[0]));
      const d = o.noSwipingSelector
          ? o.noSwipingSelector
          : `.${o.noSwipingClass}`,
        u = !(!l.target || !l.target.shadowRoot);
      if (
        o.noSwiping &&
        (u
          ? (function (e, t = this) {
              return (function t(i) {
                return i && i !== v() && i !== b()
                  ? (i.assignedSlot && (i = i.assignedSlot),
                    i.closest(e) || t(i.getRootNode().host))
                  : null;
              })(t);
            })(d, l.target)
          : c.closest(d)[0])
      )
        return void (t.allowClick = !0);
      if (o.swipeHandler && !c.closest(o.swipeHandler)[0]) return;
      (r.currentX =
        "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
        (r.currentY =
          "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
      const p = r.currentX,
        h = r.currentY,
        g = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
        m = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
      if (g && (p <= m || p >= n.innerWidth - m)) {
        if ("prevent" !== g) return;
        e.preventDefault();
      }
      if (
        (Object.assign(s, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
        (r.startX = p),
        (r.startY = h),
        (s.touchStartTime = O()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        o.threshold > 0 && (s.allowThresholdMove = !1),
        "touchstart" !== l.type)
      ) {
        let e = !0;
        c.is(s.focusableElements) && (e = !1),
          i.activeElement &&
            _(i.activeElement).is(s.focusableElements) &&
            i.activeElement !== c[0] &&
            i.activeElement.blur();
        const n = e && t.allowTouchMove && o.touchStartPreventDefault;
        (!o.touchStartForcePreventDefault && !n) ||
          c[0].isContentEditable ||
          l.preventDefault();
      }
      t.emit("touchStart", l);
    }
    function X(e) {
      const t = v(),
        i = this,
        n = i.touchEventsData,
        { params: s, touches: o, rtlTranslate: r, enabled: a } = i;
      if (!a) return;
      let l = e;
      if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
        return void (
          n.startMoving &&
          n.isScrolling &&
          i.emit("touchMoveOpposite", l)
        );
      if (n.isTouchEvent && "touchmove" !== l.type) return;
      const c =
          "touchmove" === l.type &&
          l.targetTouches &&
          (l.targetTouches[0] || l.changedTouches[0]),
        d = "touchmove" === l.type ? c.pageX : l.pageX,
        u = "touchmove" === l.type ? c.pageY : l.pageY;
      if (l.preventedByNestedSwiper) return (o.startX = d), void (o.startY = u);
      if (!i.allowTouchMove)
        return (
          (i.allowClick = !1),
          void (
            n.isTouched &&
            (Object.assign(o, {
              startX: d,
              startY: u,
              currentX: d,
              currentY: u,
            }),
            (n.touchStartTime = O()))
          )
        );
      if (n.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
        if (i.isVertical()) {
          if (
            (u < o.startY && i.translate <= i.maxTranslate()) ||
            (u > o.startY && i.translate >= i.minTranslate())
          )
            return (n.isTouched = !1), void (n.isMoved = !1);
        } else if (
          (d < o.startX && i.translate <= i.maxTranslate()) ||
          (d > o.startX && i.translate >= i.minTranslate())
        )
          return;
      if (
        n.isTouchEvent &&
        t.activeElement &&
        l.target === t.activeElement &&
        _(l.target).is(n.focusableElements)
      )
        return (n.isMoved = !0), void (i.allowClick = !1);
      if (
        (n.allowTouchCallbacks && i.emit("touchMove", l),
        l.targetTouches && l.targetTouches.length > 1)
      )
        return;
      (o.currentX = d), (o.currentY = u);
      const p = o.currentX - o.startX,
        h = o.currentY - o.startY;
      if (i.params.threshold && Math.sqrt(p ** 2 + h ** 2) < i.params.threshold)
        return;
      if (void 0 === n.isScrolling) {
        let e;
        (i.isHorizontal() && o.currentY === o.startY) ||
        (i.isVertical() && o.currentX === o.startX)
          ? (n.isScrolling = !1)
          : p * p + h * h >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
            (n.isScrolling = i.isHorizontal()
              ? e > s.touchAngle
              : 90 - e > s.touchAngle));
      }
      if (
        (n.isScrolling && i.emit("touchMoveOpposite", l),
        void 0 === n.startMoving &&
          ((o.currentX === o.startX && o.currentY === o.startY) ||
            (n.startMoving = !0)),
        n.isScrolling)
      )
        return void (n.isTouched = !1);
      if (!n.startMoving) return;
      (i.allowClick = !1),
        !s.cssMode && l.cancelable && l.preventDefault(),
        s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
        n.isMoved ||
          (s.loop && !s.cssMode && i.loopFix(),
          (n.startTranslate = i.getTranslate()),
          i.setTransition(0),
          i.animating &&
            i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
          (n.allowMomentumBounce = !1),
          !s.grabCursor ||
            (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
            i.setGrabCursor(!0),
          i.emit("sliderFirstMove", l)),
        i.emit("sliderMove", l),
        (n.isMoved = !0);
      let g = i.isHorizontal() ? p : h;
      (o.diff = g),
        (g *= s.touchRatio),
        r && (g = -g),
        (i.swipeDirection = g > 0 ? "prev" : "next"),
        (n.currentTranslate = g + n.startTranslate);
      let m = !0,
        f = s.resistanceRatio;
      if (
        (s.touchReleaseOnEdges && (f = 0),
        g > 0 && n.currentTranslate > i.minTranslate()
          ? ((m = !1),
            s.resistance &&
              (n.currentTranslate =
                i.minTranslate() -
                1 +
                (-i.minTranslate() + n.startTranslate + g) ** f))
          : g < 0 &&
            n.currentTranslate < i.maxTranslate() &&
            ((m = !1),
            s.resistance &&
              (n.currentTranslate =
                i.maxTranslate() +
                1 -
                (i.maxTranslate() - n.startTranslate - g) ** f)),
        m && (l.preventedByNestedSwiper = !0),
        !i.allowSlideNext &&
          "next" === i.swipeDirection &&
          n.currentTranslate < n.startTranslate &&
          (n.currentTranslate = n.startTranslate),
        !i.allowSlidePrev &&
          "prev" === i.swipeDirection &&
          n.currentTranslate > n.startTranslate &&
          (n.currentTranslate = n.startTranslate),
        i.allowSlidePrev ||
          i.allowSlideNext ||
          (n.currentTranslate = n.startTranslate),
        s.threshold > 0)
      ) {
        if (!(Math.abs(g) > s.threshold || n.allowThresholdMove))
          return void (n.currentTranslate = n.startTranslate);
        if (!n.allowThresholdMove)
          return (
            (n.allowThresholdMove = !0),
            (o.startX = o.currentX),
            (o.startY = o.currentY),
            (n.currentTranslate = n.startTranslate),
            void (o.diff = i.isHorizontal()
              ? o.currentX - o.startX
              : o.currentY - o.startY)
          );
      }
      s.followFinger &&
        !s.cssMode &&
        (((s.freeMode && s.freeMode.enabled && i.freeMode) ||
          s.watchSlidesProgress) &&
          (i.updateActiveIndex(), i.updateSlidesClasses()),
        i.params.freeMode &&
          s.freeMode.enabled &&
          i.freeMode &&
          i.freeMode.onTouchMove(),
        i.updateProgress(n.currentTranslate),
        i.setTranslate(n.currentTranslate));
    }
    function U(e) {
      const t = this,
        i = t.touchEventsData,
        {
          params: n,
          touches: s,
          rtlTranslate: o,
          slidesGrid: r,
          enabled: a,
        } = t;
      if (!a) return;
      let l = e;
      if (
        (l.originalEvent && (l = l.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", l),
        (i.allowTouchCallbacks = !1),
        !i.isTouched)
      )
        return (
          i.isMoved && n.grabCursor && t.setGrabCursor(!1),
          (i.isMoved = !1),
          void (i.startMoving = !1)
        );
      n.grabCursor &&
        i.isMoved &&
        i.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const c = O(),
        d = c - i.touchStartTime;
      if (t.allowClick) {
        const e = l.path || (l.composedPath && l.composedPath());
        t.updateClickedSlide((e && e[0]) || l.target),
          t.emit("tap click", l),
          d < 300 &&
            c - i.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", l);
      }
      if (
        ((i.lastClickTime = O()),
        P(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !i.isTouched ||
          !i.isMoved ||
          !t.swipeDirection ||
          0 === s.diff ||
          i.currentTranslate === i.startTranslate)
      )
        return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
      let u;
      if (
        ((i.isTouched = !1),
        (i.isMoved = !1),
        (i.startMoving = !1),
        (u = n.followFinger
          ? o
            ? t.translate
            : -t.translate
          : -i.currentTranslate),
        n.cssMode)
      )
        return;
      if (t.params.freeMode && n.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: u });
      let p = 0,
        h = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < r.length;
        e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
      ) {
        const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== r[e + t]
          ? u >= r[e] && u < r[e + t] && ((p = e), (h = r[e + t] - r[e]))
          : u >= r[e] && ((p = e), (h = r[r.length - 1] - r[r.length - 2]));
      }
      const g = (u - r[p]) / h,
        m = p < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      if (d > n.longSwipesMs) {
        if (!n.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (g >= n.longSwipesRatio ? t.slideTo(p + m) : t.slideTo(p)),
          "prev" === t.swipeDirection &&
            (g > 1 - n.longSwipesRatio ? t.slideTo(p + m) : t.slideTo(p));
      } else {
        if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
          ? l.target === t.navigation.nextEl
            ? t.slideTo(p + m)
            : t.slideTo(p)
          : ("next" === t.swipeDirection && t.slideTo(p + m),
            "prev" === t.swipeDirection && t.slideTo(p));
      }
    }
    function K() {
      const e = this,
        { params: t, el: i } = e;
      if (i && 0 === i.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: n, allowSlidePrev: s, snapGrid: o } = e;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
        e.isEnd &&
        !e.isBeginning &&
        !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.run(),
        (e.allowSlidePrev = s),
        (e.allowSlideNext = n),
        e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
    }
    function Z(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function Q() {
      const e = this,
        { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
      if (!n) return;
      let s;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const o = e.maxTranslate() - e.minTranslate();
      (s = 0 === o ? 0 : (e.translate - e.minTranslate()) / o),
        s !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    let J = !1;
    function ee() {}
    const te = (e, t) => {
      const i = v(),
        {
          params: n,
          touchEvents: s,
          el: o,
          wrapperEl: r,
          device: a,
          support: l,
        } = e,
        c = !!n.nested,
        d = "on" === t ? "addEventListener" : "removeEventListener",
        u = t;
      if (l.touch) {
        const t = !(
          "touchstart" !== s.start ||
          !l.passiveListener ||
          !n.passiveListeners
        ) && { passive: !0, capture: !1 };
        o[d](s.start, e.onTouchStart, t),
          o[d](
            s.move,
            e.onTouchMove,
            l.passiveListener ? { passive: !1, capture: c } : c
          ),
          o[d](s.end, e.onTouchEnd, t),
          s.cancel && o[d](s.cancel, e.onTouchEnd, t);
      } else
        o[d](s.start, e.onTouchStart, !1),
          i[d](s.move, e.onTouchMove, c),
          i[d](s.end, e.onTouchEnd, !1);
      (n.preventClicks || n.preventClicksPropagation) &&
        o[d]("click", e.onClick, !0),
        n.cssMode && r[d]("scroll", e.onScroll),
        n.updateOnWindowResize
          ? e[u](
              a.ios || a.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              K,
              !0
            )
          : e[u]("observerUpdate", K, !0);
    };
    const ie = {
        attachEvents: function () {
          const e = this,
            t = v(),
            { params: i, support: n } = e;
          (e.onTouchStart = Y.bind(e)),
            (e.onTouchMove = X.bind(e)),
            (e.onTouchEnd = U.bind(e)),
            i.cssMode && (e.onScroll = Q.bind(e)),
            (e.onClick = Z.bind(e)),
            n.touch && !J && (t.addEventListener("touchstart", ee), (J = !0)),
            te(e, "on");
        },
        detachEvents: function () {
          te(this, "off");
        },
      },
      ne = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const se = {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: i,
            loopedSlides: n = 0,
            params: s,
            $el: o,
          } = e,
          r = s.breakpoints;
        if (!r || (r && 0 === Object.keys(r).length)) return;
        const a = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
        if (!a || e.currentBreakpoint === a) return;
        const l = (a in r ? r[a] : void 0) || e.originalParams,
          c = ne(e, s),
          d = ne(e, l),
          u = s.enabled;
        c && !d
          ? (o.removeClass(
              `${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !c &&
            d &&
            (o.addClass(`${s.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === s.grid.fill)) &&
              o.addClass(`${s.containerModifierClass}grid-column`),
            e.emitContainerClasses());
        const p = l.direction && l.direction !== s.direction,
          h = s.loop && (l.slidesPerView !== s.slidesPerView || p);
        p && i && e.changeDirection(), L(e.params, l);
        const g = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          u && !g ? e.disable() : !u && g && e.enable(),
          (e.currentBreakpoint = a),
          e.emit("_beforeBreakpoint", l),
          h &&
            i &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - n + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t = "window", i) {
        if (!e || ("container" === t && !i)) return;
        let n = !1;
        const s = b(),
          o = "window" === t ? s.innerHeight : i.clientHeight,
          r = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: o * t, point: e };
            }
            return { value: e, point: e };
          });
        r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let e = 0; e < r.length; e += 1) {
          const { point: o, value: a } = r[e];
          "window" === t
            ? s.matchMedia(`(min-width: ${a}px)`).matches && (n = o)
            : a <= i.clientWidth && (n = o);
        }
        return n || "max";
      },
    };
    const oe = {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: i,
            rtl: n,
            $el: s,
            device: o,
            support: r,
          } = e,
          a = (function (e, t) {
            const i = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((n) => {
                      e[n] && i.push(t + n);
                    })
                  : "string" == typeof e && i.push(t + e);
              }),
              i
            );
          })(
            [
              "initialized",
              i.direction,
              { "pointer-events": !r.touch },
              { "free-mode": e.params.freeMode && i.freeMode.enabled },
              { autoheight: i.autoHeight },
              { rtl: n },
              { grid: i.grid && i.grid.rows > 1 },
              {
                "grid-column":
                  i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
              },
              { android: o.android },
              { ios: o.ios },
              { "css-mode": i.cssMode },
              { centered: i.cssMode && i.centeredSlides },
            ],
            i.containerModifierClass
          );
        t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    };
    const re = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function ae(e, t) {
      return function (i = {}) {
        const n = Object.keys(i)[0],
          s = i[n];
        "object" == typeof s && null !== s
          ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
              !0 === e[n] &&
              (e[n] = { auto: !0 }),
            n in e && "enabled" in s
              ? (!0 === e[n] && (e[n] = { enabled: !0 }),
                "object" != typeof e[n] ||
                  "enabled" in e[n] ||
                  (e[n].enabled = !0),
                e[n] || (e[n] = { enabled: !1 }),
                L(t, i))
              : L(t, i))
          : L(t, i);
      };
    }
    const le = {
        eventsEmitter: N,
        update: R,
        translate: H,
        transition: {
          setTransition: function (e, t) {
            const i = this;
            i.params.cssMode || i.$wrapperEl.transition(e),
              i.emit("setTransition", e, t);
          },
          transitionStart: function (e = !0, t) {
            const i = this,
              { params: n } = i;
            n.cssMode ||
              (n.autoHeight && i.updateAutoHeight(),
              V({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e = !0, t) {
            const i = this,
              { params: n } = i;
            (i.animating = !1),
              n.cssMode ||
                (i.setTransition(0),
                V({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: q,
        loop: W,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const i =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            (i.style.cursor = "move"),
              (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
              (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (i.style.cursor = e ? "grabbing" : "grab");
          },
          unsetGrabCursor: function () {
            const e = this;
            e.support.touch ||
              (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = "");
          },
        },
        events: ie,
        breakpoints: se,
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: i } = e,
              { slidesOffsetBefore: n } = i;
            if (n) {
              const t = e.slides.length - 1,
                i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
              e.isLocked = e.size > i;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: oe,
        images: {
          loadImage: function (e, t, i, n, s, o) {
            const r = b();
            let a;
            function l() {
              o && o();
            }
            _(e).parent("picture")[0] || (e.complete && s)
              ? l()
              : t
              ? ((a = new r.Image()),
                (a.onload = l),
                (a.onerror = l),
                n && (a.sizes = n),
                i && (a.srcset = i),
                t && (a.src = t))
              : l();
          },
          preloadImages: function () {
            const e = this;
            function t() {
              null != e &&
                e &&
                !e.destroyed &&
                (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                e.imagesLoaded === e.imagesToLoad.length &&
                  (e.params.updateOnImagesReady && e.update(),
                  e.emit("imagesReady")));
            }
            e.imagesToLoad = e.$el.find("img");
            for (let i = 0; i < e.imagesToLoad.length; i += 1) {
              const n = e.imagesToLoad[i];
              e.loadImage(
                n,
                n.currentSrc || n.getAttribute("src"),
                n.srcset || n.getAttribute("srcset"),
                n.sizes || n.getAttribute("sizes"),
                !0,
                t
              );
            }
          },
        },
      },
      ce = {};
    class de {
      constructor(...e) {
        let t, i;
        if (
          (1 === e.length &&
          e[0].constructor &&
          "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
            ? (i = e[0])
            : ([t, i] = e),
          i || (i = {}),
          (i = L({}, i)),
          t && !i.el && (i.el = t),
          i.el && _(i.el).length > 1)
        ) {
          const e = [];
          return (
            _(i.el).each((t) => {
              const n = L({}, i, { el: t });
              e.push(new de(n));
            }),
            e
          );
        }
        const n = this;
        (n.__swiper__ = !0),
          (n.support = G()),
          (n.device = F({ userAgent: i.userAgent })),
          (n.browser = j()),
          (n.eventsListeners = {}),
          (n.eventsAnyListeners = []),
          (n.modules = [...n.__modules__]),
          i.modules && Array.isArray(i.modules) && n.modules.push(...i.modules);
        const s = {};
        n.modules.forEach((e) => {
          e({
            swiper: n,
            extendParams: ae(i, s),
            on: n.on.bind(n),
            once: n.once.bind(n),
            off: n.off.bind(n),
            emit: n.emit.bind(n),
          });
        });
        const o = L({}, re, s);
        return (
          (n.params = L({}, o, ce, i)),
          (n.originalParams = L({}, n.params)),
          (n.passedParams = L({}, i)),
          n.params &&
            n.params.on &&
            Object.keys(n.params.on).forEach((e) => {
              n.on(e, n.params.on[e]);
            }),
          n.params && n.params.onAny && n.onAny(n.params.onAny),
          (n.$ = _),
          Object.assign(n, {
            enabled: n.params.enabled,
            el: t,
            classNames: [],
            slides: _(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === n.params.direction,
            isVertical: () => "vertical" === n.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: n.params.allowSlideNext,
            allowSlidePrev: n.params.allowSlidePrev,
            touchEvents: (function () {
              const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                t = ["pointerdown", "pointermove", "pointerup"];
              return (
                (n.touchEventsTouch = {
                  start: e[0],
                  move: e[1],
                  end: e[2],
                  cancel: e[3],
                }),
                (n.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                n.support.touch || !n.params.simulateTouch
                  ? n.touchEventsTouch
                  : n.touchEventsDesktop
              );
            })(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: n.params.focusableElements,
              lastClickTime: O(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: n.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          n.emit("_swiper"),
          n.params.init && n.init(),
          n
        );
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const n = i.minTranslate(),
          s = (i.maxTranslate() - n) * e + n;
        i.translateTo(s, void 0 === t ? 0 : t),
          i.updateActiveIndex(),
          i.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.each((i) => {
          const n = e.getSlideClasses(i);
          t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e = "current", t = !1) {
        const {
          params: i,
          slides: n,
          slidesGrid: s,
          slidesSizesGrid: o,
          size: r,
          activeIndex: a,
        } = this;
        let l = 1;
        if (i.centeredSlides) {
          let e,
            t = n[a].swiperSlideSize;
          for (let i = a + 1; i < n.length; i += 1)
            n[i] &&
              !e &&
              ((t += n[i].swiperSlideSize), (l += 1), t > r && (e = !0));
          for (let i = a - 1; i >= 0; i -= 1)
            n[i] &&
              !e &&
              ((t += n[i].swiperSlideSize), (l += 1), t > r && (e = !0));
        } else if ("current" === e)
          for (let e = a + 1; e < n.length; e += 1) {
            (t ? s[e] + o[e] - s[a] < r : s[e] - s[a] < r) && (l += 1);
          }
        else
          for (let e = a - 1; e >= 0; e -= 1) {
            s[a] - s[e] < r && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: i } = e;
        function n() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let s;
        i.breakpoints && e.setBreakpoint(),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (n(), e.params.autoHeight && e.updateAutoHeight())
            : ((s =
                ("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              s || n()),
          i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t = !0) {
        const i = this,
          n = i.params.direction;
        return (
          e || (e = "horizontal" === n ? "vertical" : "horizontal"),
          e === n ||
            ("horizontal" !== e && "vertical" !== e) ||
            (i.$el
              .removeClass(`${i.params.containerModifierClass}${n}`)
              .addClass(`${i.params.containerModifierClass}${e}`),
            i.emitContainerClasses(),
            (i.params.direction = e),
            i.slides.each((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            i.emit("changeDirection"),
            t && i.update()),
          i
        );
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        const i = _(e || t.params.el);
        if (!(e = i[0])) return !1;
        e.swiper = t;
        const n = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let s = (() => {
          if (e && e.shadowRoot && e.shadowRoot.querySelector) {
            const t = _(e.shadowRoot.querySelector(n()));
            return (t.children = (e) => i.children(e)), t;
          }
          return i.children(n());
        })();
        if (0 === s.length && t.params.createElements) {
          const e = v().createElement("div");
          (s = _(e)),
            (e.className = t.params.wrapperClass),
            i.append(e),
            i.children(`.${t.params.slideClass}`).each((e) => {
              s.append(e);
            });
        }
        return (
          Object.assign(t, {
            $el: i,
            el: e,
            $wrapperEl: s,
            wrapperEl: s[0],
            mounted: !0,
            rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
            wrongRTL: "-webkit-box" === s.css("display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
          !1 === t.mount(e) ||
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop
              ? t.slideTo(
                  t.params.initialSlide + t.loopedSlides,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                ),
            t.attachEvents(),
            (t.initialized = !0),
            t.emit("init"),
            t.emit("afterInit")),
          t
        );
      }
      destroy(e = !0, t = !0) {
        const i = this,
          { params: n, $el: s, $wrapperEl: o, slides: r } = i;
        return (
          void 0 === i.params ||
            i.destroyed ||
            (i.emit("beforeDestroy"),
            (i.initialized = !1),
            i.detachEvents(),
            n.loop && i.loopDestroy(),
            t &&
              (i.removeClasses(),
              s.removeAttr("style"),
              o.removeAttr("style"),
              r &&
                r.length &&
                r
                  .removeClass(
                    [
                      n.slideVisibleClass,
                      n.slideActiveClass,
                      n.slideNextClass,
                      n.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((e) => {
              i.off(e);
            }),
            !1 !== e &&
              ((i.$el[0].swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(i)),
            (i.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        L(ce, e);
      }
      static get extendedDefaults() {
        return ce;
      }
      static get defaults() {
        return re;
      }
      static installModule(e) {
        de.prototype.__modules__ || (de.prototype.__modules__ = []);
        const t = de.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => de.installModule(e)), de)
          : (de.installModule(e), de);
      }
    }
    Object.keys(le).forEach((e) => {
      Object.keys(le[e]).forEach((t) => {
        de.prototype[t] = le[e][t];
      });
    }),
      de.use([
        function ({ swiper: e, on: t, emit: i }) {
          const n = b();
          let s = null;
          const o = () => {
              e &&
                !e.destroyed &&
                e.initialized &&
                (i("beforeResize"), i("resize"));
            },
            r = () => {
              e && !e.destroyed && e.initialized && i("orientationchange");
            };
          t("init", () => {
            e.params.resizeObserver && void 0 !== n.ResizeObserver
              ? e &&
                !e.destroyed &&
                e.initialized &&
                ((s = new ResizeObserver((t) => {
                  const { width: i, height: n } = e;
                  let s = i,
                    r = n;
                  t.forEach(
                    ({ contentBoxSize: t, contentRect: i, target: n }) => {
                      (n && n !== e.el) ||
                        ((s = i ? i.width : (t[0] || t).inlineSize),
                        (r = i ? i.height : (t[0] || t).blockSize));
                    }
                  ),
                    (s === i && r === n) || o();
                })),
                s.observe(e.el))
              : (n.addEventListener("resize", o),
                n.addEventListener("orientationchange", r));
          }),
            t("destroy", () => {
              s && s.unobserve && e.el && (s.unobserve(e.el), (s = null)),
                n.removeEventListener("resize", o),
                n.removeEventListener("orientationchange", r);
            });
        },
        function ({ swiper: e, extendParams: t, on: i, emit: n }) {
          const s = [],
            o = b(),
            r = (e, t = {}) => {
              const i = new (o.MutationObserver || o.WebkitMutationObserver)(
                (e) => {
                  if (1 === e.length) return void n("observerUpdate", e[0]);
                  const t = function () {
                    n("observerUpdate", e[0]);
                  };
                  o.requestAnimationFrame
                    ? o.requestAnimationFrame(t)
                    : o.setTimeout(t, 0);
                }
              );
              i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
              }),
                s.push(i);
            };
          t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            i("init", () => {
              if (e.params.observer) {
                if (e.params.observeParents) {
                  const t = e.$el.parents();
                  for (let e = 0; e < t.length; e += 1) r(t[e]);
                }
                r(e.$el[0], { childList: e.params.observeSlideChildren }),
                  r(e.$wrapperEl[0], { attributes: !1 });
              }
            }),
            i("destroy", () => {
              s.forEach((e) => {
                e.disconnect();
              }),
                s.splice(0, s.length);
            });
        },
      ]);
    const ue = de;
    function pe(e, t, i, n) {
      const s = v();
      return (
        e.params.createElements &&
          Object.keys(n).forEach((o) => {
            if (!i[o] && !0 === i.auto) {
              let r = e.$el.children(`.${n[o]}`)[0];
              r ||
                ((r = s.createElement("div")),
                (r.className = n[o]),
                e.$el.append(r)),
                (i[o] = r),
                (t[o] = r);
            }
          }),
        i
      );
    }
    function he({ swiper: e, extendParams: t, on: i, emit: n }) {
      function s(t) {
        let i;
        return (
          t &&
            ((i = _(t)),
            e.params.uniqueNavElements &&
              "string" == typeof t &&
              i.length > 1 &&
              1 === e.$el.find(t).length &&
              (i = e.$el.find(t))),
          i
        );
      }
      function o(t, i) {
        const n = e.params.navigation;
        t &&
          t.length > 0 &&
          (t[i ? "addClass" : "removeClass"](n.disabledClass),
          t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = i),
          e.params.watchOverflow &&
            e.enabled &&
            t[e.isLocked ? "addClass" : "removeClass"](n.lockClass));
      }
      function r() {
        if (e.params.loop) return;
        const { $nextEl: t, $prevEl: i } = e.navigation;
        o(i, e.isBeginning && !e.params.rewind),
          o(t, e.isEnd && !e.params.rewind);
      }
      function a(t) {
        t.preventDefault(),
          (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
      }
      function l(t) {
        t.preventDefault(),
          (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
      }
      function c() {
        const t = e.params.navigation;
        if (
          ((e.params.navigation = pe(
            e,
            e.originalParams.navigation,
            e.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !t.nextEl && !t.prevEl)
        )
          return;
        const i = s(t.nextEl),
          n = s(t.prevEl);
        i && i.length > 0 && i.on("click", l),
          n && n.length > 0 && n.on("click", a),
          Object.assign(e.navigation, {
            $nextEl: i,
            nextEl: i && i[0],
            $prevEl: n,
            prevEl: n && n[0],
          }),
          e.enabled ||
            (i && i.addClass(t.lockClass), n && n.addClass(t.lockClass));
      }
      function d() {
        const { $nextEl: t, $prevEl: i } = e.navigation;
        t &&
          t.length &&
          (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", a),
            i.removeClass(e.params.navigation.disabledClass));
      }
      t({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
        },
      }),
        (e.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        i("init", () => {
          c(), r();
        }),
        i("toEdge fromEdge lock unlock", () => {
          r();
        }),
        i("destroy", () => {
          d();
        }),
        i("enable disable", () => {
          const { $nextEl: t, $prevEl: i } = e.navigation;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            ),
            i &&
              i[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              );
        }),
        i("click", (t, i) => {
          const { $nextEl: s, $prevEl: o } = e.navigation,
            r = i.target;
          if (e.params.navigation.hideOnClick && !_(r).is(o) && !_(r).is(s)) {
            if (
              e.pagination &&
              e.params.pagination &&
              e.params.pagination.clickable &&
              (e.pagination.el === r || e.pagination.el.contains(r))
            )
              return;
            let t;
            s
              ? (t = s.hasClass(e.params.navigation.hiddenClass))
              : o && (t = o.hasClass(e.params.navigation.hiddenClass)),
              n(!0 === t ? "navigationShow" : "navigationHide"),
              s && s.toggleClass(e.params.navigation.hiddenClass),
              o && o.toggleClass(e.params.navigation.hiddenClass);
          }
        }),
        Object.assign(e.navigation, { update: r, init: c, destroy: d });
    }
    function ge(e = "") {
      return `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`;
    }
    function me({ swiper: e, extendParams: t, on: i, emit: n }) {
      const s = "swiper-pagination";
      let o;
      t({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${s}-bullet`,
          bulletActiveClass: `${s}-bullet-active`,
          modifierClass: `${s}-`,
          currentClass: `${s}-current`,
          totalClass: `${s}-total`,
          hiddenClass: `${s}-hidden`,
          progressbarFillClass: `${s}-progressbar-fill`,
          progressbarOppositeClass: `${s}-progressbar-opposite`,
          clickableClass: `${s}-clickable`,
          lockClass: `${s}-lock`,
          horizontalClass: `${s}-horizontal`,
          verticalClass: `${s}-vertical`,
        },
      }),
        (e.pagination = { el: null, $el: null, bullets: [] });
      let r = 0;
      function a() {
        return (
          !e.params.pagination.el ||
          !e.pagination.el ||
          !e.pagination.$el ||
          0 === e.pagination.$el.length
        );
      }
      function l(t, i) {
        const { bulletActiveClass: n } = e.params.pagination;
        t[i]().addClass(`${n}-${i}`)[i]().addClass(`${n}-${i}-${i}`);
      }
      function c() {
        const t = e.rtl,
          i = e.params.pagination;
        if (a()) return;
        const s =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          c = e.pagination.$el;
        let d;
        const u = e.params.loop
          ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        if (
          (e.params.loop
            ? ((d = Math.ceil(
                (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
              )),
              d > s - 1 - 2 * e.loopedSlides && (d -= s - 2 * e.loopedSlides),
              d > u - 1 && (d -= u),
              d < 0 && "bullets" !== e.params.paginationType && (d = u + d))
            : (d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
          "bullets" === i.type &&
            e.pagination.bullets &&
            e.pagination.bullets.length > 0)
        ) {
          const n = e.pagination.bullets;
          let s, a, u;
          if (
            (i.dynamicBullets &&
              ((o = n
                .eq(0)
                [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              c.css(
                e.isHorizontal() ? "width" : "height",
                o * (i.dynamicMainBullets + 4) + "px"
              ),
              i.dynamicMainBullets > 1 &&
                void 0 !== e.previousIndex &&
                ((r += d - (e.previousIndex - e.loopedSlides || 0)),
                r > i.dynamicMainBullets - 1
                  ? (r = i.dynamicMainBullets - 1)
                  : r < 0 && (r = 0)),
              (s = Math.max(d - r, 0)),
              (a = s + (Math.min(n.length, i.dynamicMainBullets) - 1)),
              (u = (a + s) / 2)),
            n.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${i.bulletActiveClass}${e}`)
                .join(" ")
            ),
            c.length > 1)
          )
            n.each((e) => {
              const t = _(e),
                n = t.index();
              n === d && t.addClass(i.bulletActiveClass),
                i.dynamicBullets &&
                  (n >= s &&
                    n <= a &&
                    t.addClass(`${i.bulletActiveClass}-main`),
                  n === s && l(t, "prev"),
                  n === a && l(t, "next"));
            });
          else {
            const t = n.eq(d),
              o = t.index();
            if ((t.addClass(i.bulletActiveClass), i.dynamicBullets)) {
              const t = n.eq(s),
                r = n.eq(a);
              for (let e = s; e <= a; e += 1)
                n.eq(e).addClass(`${i.bulletActiveClass}-main`);
              if (e.params.loop)
                if (o >= n.length) {
                  for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                    n.eq(n.length - e).addClass(`${i.bulletActiveClass}-main`);
                  n.eq(n.length - i.dynamicMainBullets - 1).addClass(
                    `${i.bulletActiveClass}-prev`
                  );
                } else l(t, "prev"), l(r, "next");
              else l(t, "prev"), l(r, "next");
            }
          }
          if (i.dynamicBullets) {
            const s = Math.min(n.length, i.dynamicMainBullets + 4),
              r = (o * s - o) / 2 - u * o,
              a = t ? "right" : "left";
            n.css(e.isHorizontal() ? a : "top", `${r}px`);
          }
        }
        if (
          ("fraction" === i.type &&
            (c.find(ge(i.currentClass)).text(i.formatFractionCurrent(d + 1)),
            c.find(ge(i.totalClass)).text(i.formatFractionTotal(u))),
          "progressbar" === i.type)
        ) {
          let t;
          t = i.progressbarOpposite
            ? e.isHorizontal()
              ? "vertical"
              : "horizontal"
            : e.isHorizontal()
            ? "horizontal"
            : "vertical";
          const n = (d + 1) / u;
          let s = 1,
            o = 1;
          "horizontal" === t ? (s = n) : (o = n),
            c
              .find(ge(i.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${o})`)
              .transition(e.params.speed);
        }
        "custom" === i.type && i.renderCustom
          ? (c.html(i.renderCustom(e, d + 1, u)), n("paginationRender", c[0]))
          : n("paginationUpdate", c[0]),
          e.params.watchOverflow &&
            e.enabled &&
            c[e.isLocked ? "addClass" : "removeClass"](i.lockClass);
      }
      function d() {
        const t = e.params.pagination;
        if (a()) return;
        const i =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          s = e.pagination.$el;
        let o = "";
        if ("bullets" === t.type) {
          let n = e.params.loop
            ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
            : e.snapGrid.length;
          e.params.freeMode &&
            e.params.freeMode.enabled &&
            !e.params.loop &&
            n > i &&
            (n = i);
          for (let i = 0; i < n; i += 1)
            t.renderBullet
              ? (o += t.renderBullet.call(e, i, t.bulletClass))
              : (o += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
          s.html(o), (e.pagination.bullets = s.find(ge(t.bulletClass)));
        }
        "fraction" === t.type &&
          ((o = t.renderFraction
            ? t.renderFraction.call(e, t.currentClass, t.totalClass)
            : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
          s.html(o)),
          "progressbar" === t.type &&
            ((o = t.renderProgressbar
              ? t.renderProgressbar.call(e, t.progressbarFillClass)
              : `<span class="${t.progressbarFillClass}"></span>`),
            s.html(o)),
          "custom" !== t.type && n("paginationRender", e.pagination.$el[0]);
      }
      function u() {
        e.params.pagination = pe(
          e,
          e.originalParams.pagination,
          e.params.pagination,
          { el: "swiper-pagination" }
        );
        const t = e.params.pagination;
        if (!t.el) return;
        let i = _(t.el);
        0 !== i.length &&
          (e.params.uniqueNavElements &&
            "string" == typeof t.el &&
            i.length > 1 &&
            ((i = e.$el.find(t.el)),
            i.length > 1 &&
              (i = i.filter((t) => _(t).parents(".swiper")[0] === e.el))),
          "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
          i.addClass(t.modifierClass + t.type),
          i.addClass(t.modifierClass + e.params.direction),
          "bullets" === t.type &&
            t.dynamicBullets &&
            (i.addClass(`${t.modifierClass}${t.type}-dynamic`),
            (r = 0),
            t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
          "progressbar" === t.type &&
            t.progressbarOpposite &&
            i.addClass(t.progressbarOppositeClass),
          t.clickable &&
            i.on("click", ge(t.bulletClass), function (t) {
              t.preventDefault();
              let i = _(this).index() * e.params.slidesPerGroup;
              e.params.loop && (i += e.loopedSlides), e.slideTo(i);
            }),
          Object.assign(e.pagination, { $el: i, el: i[0] }),
          e.enabled || i.addClass(t.lockClass));
      }
      function p() {
        const t = e.params.pagination;
        if (a()) return;
        const i = e.pagination.$el;
        i.removeClass(t.hiddenClass),
          i.removeClass(t.modifierClass + t.type),
          i.removeClass(t.modifierClass + e.params.direction),
          e.pagination.bullets &&
            e.pagination.bullets.removeClass &&
            e.pagination.bullets.removeClass(t.bulletActiveClass),
          t.clickable && i.off("click", ge(t.bulletClass));
      }
      i("init", () => {
        u(), d(), c();
      }),
        i("activeIndexChange", () => {
          (e.params.loop || void 0 === e.snapIndex) && c();
        }),
        i("snapIndexChange", () => {
          e.params.loop || c();
        }),
        i("slidesLengthChange", () => {
          e.params.loop && (d(), c());
        }),
        i("snapGridLengthChange", () => {
          e.params.loop || (d(), c());
        }),
        i("destroy", () => {
          p();
        }),
        i("enable disable", () => {
          const { $el: t } = e.pagination;
          t &&
            t[e.enabled ? "removeClass" : "addClass"](
              e.params.pagination.lockClass
            );
        }),
        i("lock unlock", () => {
          c();
        }),
        i("click", (t, i) => {
          const s = i.target,
            { $el: o } = e.pagination;
          if (
            e.params.pagination.el &&
            e.params.pagination.hideOnClick &&
            o.length > 0 &&
            !_(s).hasClass(e.params.pagination.bulletClass)
          ) {
            if (
              e.navigation &&
              ((e.navigation.nextEl && s === e.navigation.nextEl) ||
                (e.navigation.prevEl && s === e.navigation.prevEl))
            )
              return;
            const t = o.hasClass(e.params.pagination.hiddenClass);
            n(!0 === t ? "paginationShow" : "paginationHide"),
              o.toggleClass(e.params.pagination.hiddenClass);
          }
        }),
        Object.assign(e.pagination, {
          render: d,
          update: c,
          init: u,
          destroy: p,
        });
    }
    function fe({ swiper: e, extendParams: t, on: i, emit: n }) {
      let s;
      function o() {
        const t = e.slides.eq(e.activeIndex);
        let i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          clearTimeout(s),
          (s = P(() => {
            let t;
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  (t = e.slidePrev(e.params.speed, !0, !0)),
                  n("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? a()
                  : ((t = e.slideTo(
                      e.slides.length - 1,
                      e.params.speed,
                      !0,
                      !0
                    )),
                    n("autoplay"))
                : ((t = e.slidePrev(e.params.speed, !0, !0)), n("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                (t = e.slideNext(e.params.speed, !0, !0)),
                n("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? a()
                : ((t = e.slideTo(0, e.params.speed, !0, !0)), n("autoplay"))
              : ((t = e.slideNext(e.params.speed, !0, !0)), n("autoplay")),
              ((e.params.cssMode && e.autoplay.running) || !1 === t) && o();
          }, i));
      }
      function r() {
        return (
          void 0 === s &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0), n("autoplayStart"), o(), !0)
        );
      }
      function a() {
        return (
          !!e.autoplay.running &&
          void 0 !== s &&
          (s && (clearTimeout(s), (s = void 0)),
          (e.autoplay.running = !1),
          n("autoplayStop"),
          !0)
        );
      }
      function l(t) {
        e.autoplay.running &&
          (e.autoplay.paused ||
            (s && clearTimeout(s),
            (e.autoplay.paused = !0),
            0 !== t && e.params.autoplay.waitForTransition
              ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                  e.$wrapperEl[0].addEventListener(t, d);
                })
              : ((e.autoplay.paused = !1), o())));
      }
      function c() {
        const t = v();
        "hidden" === t.visibilityState && e.autoplay.running && l(),
          "visible" === t.visibilityState &&
            e.autoplay.paused &&
            (o(), (e.autoplay.paused = !1));
      }
      function d(t) {
        e &&
          !e.destroyed &&
          e.$wrapperEl &&
          t.target === e.$wrapperEl[0] &&
          (["transitionend", "webkitTransitionEnd"].forEach((t) => {
            e.$wrapperEl[0].removeEventListener(t, d);
          }),
          (e.autoplay.paused = !1),
          e.autoplay.running ? o() : a());
      }
      function u() {
        e.params.autoplay.disableOnInteraction ? a() : l(),
          ["transitionend", "webkitTransitionEnd"].forEach((t) => {
            e.$wrapperEl[0].removeEventListener(t, d);
          });
      }
      function p() {
        e.params.autoplay.disableOnInteraction ||
          ((e.autoplay.paused = !1), o());
      }
      (e.autoplay = { running: !1, paused: !1 }),
        t({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }),
        i("init", () => {
          if (e.params.autoplay.enabled) {
            r();
            v().addEventListener("visibilitychange", c),
              e.params.autoplay.pauseOnMouseEnter &&
                (e.$el.on("mouseenter", u), e.$el.on("mouseleave", p));
          }
        }),
        i("beforeTransitionStart", (t, i, n) => {
          e.autoplay.running &&
            (n || !e.params.autoplay.disableOnInteraction
              ? e.autoplay.pause(i)
              : a());
        }),
        i("sliderFirstMove", () => {
          e.autoplay.running &&
            (e.params.autoplay.disableOnInteraction ? a() : l());
        }),
        i("touchEnd", () => {
          e.params.cssMode &&
            e.autoplay.paused &&
            !e.params.autoplay.disableOnInteraction &&
            o();
        }),
        i("destroy", () => {
          e.$el.off("mouseenter", u),
            e.$el.off("mouseleave", p),
            e.autoplay.running && a();
          v().removeEventListener("visibilitychange", c);
        }),
        Object.assign(e.autoplay, { pause: l, run: o, start: r, stop: a });
    }
    function ve() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)'
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    window.addEventListener("load", function (e) {
      ve(),
        document.querySelector(".mainscreen-slider__slider") &&
          new ue(".mainscreen-slider__slider", {
            modules: [he, me, fe],
            autoplay: {
              delay: 3e3,
              disableOnInteraction: !1,
              pauseOnMouseEnter: !0,
            },
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            simulateTouch: !1,
            loop: !0,
            pagination: { el: ".mainscreen-slider__pagination", clickable: !0 },
            navigation: {
              nextEl: ".mainscreen-slider__arrow_next",
              prevEl: ".mainscreen-slider__arrow_prev",
            },
            on: {},
          }),
        document.querySelector(".image-block__slider") &&
          new ue(".image-block__slider", {
            modules: [fe],
            autoplay: {
              delay: 3e3,
              disableOnInteraction: !1,
              pauseOnMouseEnter: !0,
            },
            observer: !0,
            observeParents: !0,
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 600,
            simulateTouch: !1,
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 0, autoHeight: !0 },
              639.98: { slidesPerView: 2, spaceBetween: 20 },
              959.98: { slidesPerView: 3, spaceBetween: 20 },
              1268: { slidesPerView: 3, spaceBetween: 20 },
            },
            on: {},
          });
    });
    class ye {
      constructor(e) {
        (this.config = Object.assign({ logging: !0 }, e)),
          this.observer,
          !document.documentElement.classList.contains("watcher") &&
            this.scrollWatcherRun();
      }
      scrollWatcherUpdate() {
        this.scrollWatcherRun();
      }
      scrollWatcherRun() {
        document.documentElement.classList.add("watcher"),
          this.scrollWatcherConstructor(
            document.querySelectorAll("[data-watch]")
          );
      }
      scrollWatcherConstructor(e) {
        if (e.length) {
          this.scrollWatcherLogging(
            `Проснулся, слежу за объектами (${e.length})...`
          ),
            c(
              Array.from(e).map(function (e) {
                return `${
                  e.dataset.watchRoot ? e.dataset.watchRoot : null
                }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
              })
            ).forEach((t) => {
              let i = t.split("|"),
                n = { root: i[0], margin: i[1], threshold: i[2] },
                s = Array.from(e).filter(function (e) {
                  let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                    i = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                    s = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                  if (
                    String(t) === n.root &&
                    String(i) === n.margin &&
                    String(s) === n.threshold
                  )
                    return e;
                }),
                o = this.getScrollWatcherConfig(n);
              this.scrollWatcherInit(s, o);
            });
        } else
          this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
      }
      getScrollWatcherConfig(e) {
        let t = {};
        if (
          (document.querySelector(e.root)
            ? (t.root = document.querySelector(e.root))
            : "null" !== e.root &&
              this.scrollWatcherLogging(
                `Эмм... родительского объекта ${e.root} нет на странице`
              ),
          (t.rootMargin = e.margin),
          !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
        ) {
          if ("prx" === e.threshold) {
            e.threshold = [];
            for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
          } else e.threshold = e.threshold.split(",");
          return (t.threshold = e.threshold), t;
        }
        this.scrollWatcherLogging(
          "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
        );
      }
      scrollWatcherCreate(e) {
        this.observer = new IntersectionObserver((e, t) => {
          e.forEach((e) => {
            this.scrollWatcherCallback(e, t);
          });
        }, e);
      }
      scrollWatcherInit(e, t) {
        this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
      }
      scrollWatcherIntersecting(e, t) {
        e.isIntersecting
          ? (!t.classList.contains("_watcher-view") &&
              t.classList.add("_watcher-view"),
            this.scrollWatcherLogging(
              `Я вижу ${t.classList}, добавил класс _watcher-view`
            ))
          : (t.classList.contains("_watcher-view") &&
              t.classList.remove("_watcher-view"),
            this.scrollWatcherLogging(
              `Я не вижу ${t.classList}, убрал класс _watcher-view`
            ));
      }
      scrollWatcherOff(e, t) {
        t.unobserve(e),
          this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
      }
      scrollWatcherLogging(e) {
        this.config.logging && l(`[Наблюдатель]: ${e}`);
      }
      scrollWatcherCallback(e, t) {
        const i = e.target;
        this.scrollWatcherIntersecting(e, i),
          i.hasAttribute("data-watch-once") &&
            e.isIntersecting &&
            this.scrollWatcherOff(i, t),
          document.dispatchEvent(
            new CustomEvent("watcherCallback", { detail: { entry: e } })
          );
      }
    }
    let be = !1;
    setTimeout(() => {
      if (be) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    var we = function () {
      return (
        (we =
          Object.assign ||
          function (e) {
            for (var t, i = 1, n = arguments.length; i < n; i++)
              for (var s in (t = arguments[i]))
                Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
            return e;
          }),
        we.apply(this, arguments)
      );
    };
    var xe = (function () {
      function e(e) {
        return (
          (this.cssVenderPrefixes = [
            "TransitionDuration",
            "TransitionTimingFunction",
            "Transform",
            "Transition",
          ]),
          (this.selector = this._getSelector(e)),
          (this.firstElement = this._getFirstEl()),
          this
        );
      }
      return (
        (e.generateUUID = function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" == e ? t : (3 & t) | 8).toString(16);
            }
          );
        }),
        (e.prototype._getSelector = function (e, t) {
          return (
            void 0 === t && (t = document),
            "string" != typeof e
              ? e
              : ((t = t || document),
                "#" === e.substring(0, 1)
                  ? t.querySelector(e)
                  : t.querySelectorAll(e))
          );
        }),
        (e.prototype._each = function (e) {
          return this.selector
            ? (void 0 !== this.selector.length
                ? [].forEach.call(this.selector, e)
                : e(this.selector, 0),
              this)
            : this;
        }),
        (e.prototype._setCssVendorPrefix = function (e, t, i) {
          var n = t.replace(/-([a-z])/gi, function (e, t) {
            return t.toUpperCase();
          });
          -1 !== this.cssVenderPrefixes.indexOf(n)
            ? ((e.style[n.charAt(0).toLowerCase() + n.slice(1)] = i),
              (e.style["webkit" + n] = i),
              (e.style["moz" + n] = i),
              (e.style["ms" + n] = i),
              (e.style["o" + n] = i))
            : (e.style[n] = i);
        }),
        (e.prototype._getFirstEl = function () {
          return this.selector && void 0 !== this.selector.length
            ? this.selector[0]
            : this.selector;
        }),
        (e.prototype.isEventMatched = function (e, t) {
          var i = t.split(".");
          return e
            .split(".")
            .filter(function (e) {
              return e;
            })
            .every(function (e) {
              return -1 !== i.indexOf(e);
            });
        }),
        (e.prototype.attr = function (e, t) {
          return void 0 === t
            ? this.firstElement
              ? this.firstElement.getAttribute(e)
              : ""
            : (this._each(function (i) {
                i.setAttribute(e, t);
              }),
              this);
        }),
        (e.prototype.find = function (e) {
          return Se(this._getSelector(e, this.selector));
        }),
        (e.prototype.first = function () {
          return this.selector && void 0 !== this.selector.length
            ? Se(this.selector[0])
            : Se(this.selector);
        }),
        (e.prototype.eq = function (e) {
          return Se(this.selector[e]);
        }),
        (e.prototype.parent = function () {
          return Se(this.selector.parentElement);
        }),
        (e.prototype.get = function () {
          return this._getFirstEl();
        }),
        (e.prototype.removeAttr = function (e) {
          var t = e.split(" ");
          return (
            this._each(function (e) {
              t.forEach(function (t) {
                return e.removeAttribute(t);
              });
            }),
            this
          );
        }),
        (e.prototype.wrap = function (e) {
          if (!this.firstElement) return this;
          var t = document.createElement("div");
          return (
            (t.className = e),
            this.firstElement.parentNode.insertBefore(t, this.firstElement),
            this.firstElement.parentNode.removeChild(this.firstElement),
            t.appendChild(this.firstElement),
            this
          );
        }),
        (e.prototype.addClass = function (e) {
          return (
            void 0 === e && (e = ""),
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.add(e);
              });
            }),
            this
          );
        }),
        (e.prototype.removeClass = function (e) {
          return (
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.remove(e);
              });
            }),
            this
          );
        }),
        (e.prototype.hasClass = function (e) {
          return !!this.firstElement && this.firstElement.classList.contains(e);
        }),
        (e.prototype.hasAttribute = function (e) {
          return !!this.firstElement && this.firstElement.hasAttribute(e);
        }),
        (e.prototype.toggleClass = function (e) {
          return this.firstElement
            ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
            : this;
        }),
        (e.prototype.css = function (e, t) {
          var i = this;
          return (
            this._each(function (n) {
              i._setCssVendorPrefix(n, e, t);
            }),
            this
          );
        }),
        (e.prototype.on = function (t, i) {
          var n = this;
          return this.selector
            ? (t.split(" ").forEach(function (t) {
                Array.isArray(e.eventListeners[t]) ||
                  (e.eventListeners[t] = []),
                  e.eventListeners[t].push(i),
                  n.selector.addEventListener(t.split(".")[0], i);
              }),
              this)
            : this;
        }),
        (e.prototype.once = function (e, t) {
          var i = this;
          return (
            this.on(e, function () {
              i.off(e), t(e);
            }),
            this
          );
        }),
        (e.prototype.off = function (t) {
          var i = this;
          return this.selector
            ? (Object.keys(e.eventListeners).forEach(function (n) {
                i.isEventMatched(t, n) &&
                  (e.eventListeners[n].forEach(function (e) {
                    i.selector.removeEventListener(n.split(".")[0], e);
                  }),
                  (e.eventListeners[n] = []));
              }),
              this)
            : this;
        }),
        (e.prototype.trigger = function (e, t) {
          if (!this.firstElement) return this;
          var i = new CustomEvent(e.split(".")[0], { detail: t || null });
          return this.firstElement.dispatchEvent(i), this;
        }),
        (e.prototype.load = function (e) {
          var t = this;
          return (
            fetch(e).then(function (e) {
              t.selector.innerHTML = e;
            }),
            this
          );
        }),
        (e.prototype.html = function (e) {
          return void 0 === e
            ? this.firstElement
              ? this.firstElement.innerHTML
              : ""
            : (this._each(function (t) {
                t.innerHTML = e;
              }),
              this);
        }),
        (e.prototype.append = function (e) {
          return (
            this._each(function (t) {
              "string" == typeof e
                ? t.insertAdjacentHTML("beforeend", e)
                : t.appendChild(e);
            }),
            this
          );
        }),
        (e.prototype.prepend = function (e) {
          return (
            this._each(function (t) {
              t.insertAdjacentHTML("afterbegin", e);
            }),
            this
          );
        }),
        (e.prototype.remove = function () {
          return (
            this._each(function (e) {
              e.parentNode.removeChild(e);
            }),
            this
          );
        }),
        (e.prototype.empty = function () {
          return (
            this._each(function (e) {
              e.innerHTML = "";
            }),
            this
          );
        }),
        (e.prototype.scrollTop = function (e) {
          return void 0 !== e
            ? ((document.body.scrollTop = e),
              (document.documentElement.scrollTop = e),
              this)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }),
        (e.prototype.scrollLeft = function (e) {
          return void 0 !== e
            ? ((document.body.scrollLeft = e),
              (document.documentElement.scrollLeft = e),
              this)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }),
        (e.prototype.offset = function () {
          if (!this.firstElement) return { left: 0, top: 0 };
          var e = this.firstElement.getBoundingClientRect(),
            t = Se("body").style().marginLeft;
          return {
            left: e.left - parseFloat(t) + this.scrollLeft(),
            top: e.top + this.scrollTop(),
          };
        }),
        (e.prototype.style = function () {
          return this.firstElement
            ? this.firstElement.currentStyle ||
                window.getComputedStyle(this.firstElement)
            : {};
        }),
        (e.prototype.width = function () {
          var e = this.style();
          return (
            this.firstElement.clientWidth -
            parseFloat(e.paddingLeft) -
            parseFloat(e.paddingRight)
          );
        }),
        (e.prototype.height = function () {
          var e = this.style();
          return (
            this.firstElement.clientHeight -
            parseFloat(e.paddingTop) -
            parseFloat(e.paddingBottom)
          );
        }),
        (e.eventListeners = {}),
        e
      );
    })();
    function Se(e) {
      return (
        (function () {
          if ("function" == typeof window.CustomEvent) return !1;
          window.CustomEvent = function (e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: null };
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
          };
        })(),
        Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
        new xe(e)
      );
    }
    var ke = [
      "src",
      "sources",
      "subHtml",
      "subHtmlUrl",
      "html",
      "video",
      "poster",
      "slideName",
      "responsive",
      "srcset",
      "sizes",
      "iframe",
      "downloadUrl",
      "download",
      "width",
      "facebookShareUrl",
      "tweetText",
      "iframeTitle",
      "twitterShareUrl",
      "pinterestShareUrl",
      "pinterestText",
      "fbHtml",
      "disqusIdentifier",
      "disqusUrl",
    ];
    function Ce(e) {
      return "href" === e
        ? "src"
        : (e = (e =
            (e = e.replace("data-", "")).charAt(0).toLowerCase() +
            e.slice(1)).replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          }));
    }
    var Ee = function (e, t, i, n) {
        void 0 === i && (i = 0);
        var s = Se(e).attr("data-lg-size") || n;
        if (s) {
          var o = s.split(",");
          if (o[1])
            for (var r = window.innerWidth, a = 0; a < o.length; a++) {
              var l = o[a];
              if (parseInt(l.split("-")[2], 10) > r) {
                s = l;
                break;
              }
              a === o.length - 1 && (s = l);
            }
          var c = s.split("-"),
            d = parseInt(c[0], 10),
            u = parseInt(c[1], 10),
            p = t.width(),
            h = t.height() - i,
            g = Math.min(p, d),
            m = Math.min(h, u),
            f = Math.min(g / d, m / u);
          return { width: d * f, height: u * f };
        }
      },
      Te = function (e, t, i, n, s) {
        if (s) {
          var o = Se(e).find("img").first();
          if (o.get()) {
            var r = t.get().getBoundingClientRect(),
              a = r.width,
              l = t.height() - (i + n),
              c = o.width(),
              d = o.height(),
              u = o.style(),
              p =
                (a - c) / 2 -
                o.offset().left +
                (parseFloat(u.paddingLeft) || 0) +
                (parseFloat(u.borderLeft) || 0) +
                Se(window).scrollLeft() +
                r.left,
              h =
                (l - d) / 2 -
                o.offset().top +
                (parseFloat(u.paddingTop) || 0) +
                (parseFloat(u.borderTop) || 0) +
                Se(window).scrollTop() +
                i;
            return (
              "translate3d(" +
              (p *= -1) +
              "px, " +
              (h *= -1) +
              "px, 0) scale3d(" +
              c / s.width +
              ", " +
              d / s.height +
              ", 1)"
            );
          }
        }
      },
      _e = function (e, t, i, n, s, o) {
        return (
          '<div class="lg-video-cont lg-has-iframe" style="width:' +
          e +
          "; max-width:" +
          i +
          "; height: " +
          t +
          "; max-height:" +
          n +
          '">\n                    <iframe class="lg-object" frameborder="0" ' +
          (o ? 'title="' + o + '"' : "") +
          ' src="' +
          s +
          '"  allowfullscreen="true"></iframe>\n                </div>'
        );
      },
      Pe = function (e, t, i, n, s, o) {
        var r =
            "<img " +
            i +
            " " +
            (n ? 'srcset="' + n + '"' : "") +
            "  " +
            (s ? 'sizes="' + s + '"' : "") +
            ' class="lg-object lg-image" data-index="' +
            e +
            '" src="' +
            t +
            '" />',
          a = "";
        o &&
          (a = ("string" == typeof o ? JSON.parse(o) : o).map(function (e) {
            var t = "";
            return (
              Object.keys(e).forEach(function (i) {
                t += " " + i + '="' + e[i] + '"';
              }),
              "<source " + t + "></source>"
            );
          }));
        return "" + a + r;
      },
      Oe = function (e) {
        for (var t = [], i = [], n = "", s = 0; s < e.length; s++) {
          var o = e[s].split(" ");
          "" === o[0] && o.splice(0, 1), i.push(o[0]), t.push(o[1]);
        }
        for (var r = window.innerWidth, a = 0; a < t.length; a++)
          if (parseInt(t[a], 10) > r) {
            n = i[a];
            break;
          }
        return n;
      },
      Ie = function (e) {
        return !!e && !!e.complete && 0 !== e.naturalWidth;
      },
      Me = function (e, t, i, n) {
        return (
          '<div class="lg-video-cont ' +
          (n && n.youtube
            ? "lg-has-youtube"
            : n && n.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
          '" style="' +
          i +
          '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
          (t || "") +
          '\n            <img class="lg-object lg-video-poster" src="' +
          e +
          '" />\n        </div>'
        );
      },
      Le = function (e, t, i, n) {
        var s = [],
          o = (function () {
            for (var e = 0, t = 0, i = arguments.length; t < i; t++)
              e += arguments[t].length;
            var n = Array(e),
              s = 0;
            for (t = 0; t < i; t++)
              for (var o = arguments[t], r = 0, a = o.length; r < a; r++, s++)
                n[s] = o[r];
            return n;
          })(ke, t);
        return (
          [].forEach.call(e, function (e) {
            for (var t = {}, r = 0; r < e.attributes.length; r++) {
              var a = e.attributes[r];
              if (a.specified) {
                var l = Ce(a.name),
                  c = "";
                o.indexOf(l) > -1 && (c = l), c && (t[c] = a.value);
              }
            }
            var d = Se(e),
              u = d.find("img").first().attr("alt"),
              p = d.attr("title"),
              h = n ? d.attr(n) : d.find("img").first().attr("src");
            (t.thumb = h),
              i && !t.subHtml && (t.subHtml = p || u || ""),
              (t.alt = u || p || ""),
              s.push(t);
          }),
          s
        );
      },
      Ae = function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      },
      De = function (e, t, i) {
        if (!e)
          return t
            ? { html5: !0 }
            : void console.error(
                "lightGallery :- data-src is not provided on slide item " +
                  (i + 1) +
                  ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
              );
        var n = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
          ),
          s = e.match(
            /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
          ),
          o = e.match(
            /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
          );
        return n
          ? { youtube: n }
          : s
          ? { vimeo: s }
          : o
          ? { wistia: o }
          : void 0;
      },
      ze = {
        mode: "lg-slide",
        easing: "ease",
        speed: 400,
        licenseKey: "0000-0000-000-0000",
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 300,
        container: "",
        startAnimationDuration: 400,
        zoomFromOrigin: !0,
        hideBarsDelay: 0,
        showBarsAfter: 1e4,
        slideDelay: 0,
        supportLegacyBrowser: !0,
        allowMediaOverlap: !1,
        videoMaxSize: "1280-720",
        loadYouTubePoster: !0,
        defaultCaptionHeight: 0,
        ariaLabelledby: "",
        ariaDescribedby: "",
        closable: !0,
        swipeToClose: !0,
        closeOnTap: !0,
        showCloseIcon: !0,
        showMaximizeIcon: !1,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        controls: !0,
        slideEndAnimation: !0,
        hideControlOnEnd: !1,
        mousewheel: !1,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 2,
        numberOfSlideItemsInDom: 10,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: 0,
        iframeWidth: "100%",
        iframeHeight: "100%",
        iframeMaxWidth: "100%",
        iframeMaxHeight: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: "",
        isMobile: void 0,
        mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
        plugins: [],
      },
      $e = "lgAfterAppendSlide",
      Be = "lgInit",
      Ge = "lgHasVideo",
      Fe = "lgContainerResize",
      je = "lgUpdateSlides",
      Ne = "lgAfterAppendSubHtml",
      Re = "lgBeforeOpen",
      He = "lgAfterOpen",
      Ve = "lgSlideItemLoad",
      qe = "lgBeforeSlide",
      We = "lgAfterSlide",
      Ye = "lgPosterClick",
      Xe = "lgDragStart",
      Ue = "lgDragMove",
      Ke = "lgDragEnd",
      Ze = "lgBeforeNextSlide",
      Qe = "lgBeforePrevSlide",
      Je = "lgBeforeClose",
      et = "lgAfterClose",
      tt = 0,
      it = (function () {
        function e(e, t) {
          if (
            ((this.lgOpened = !1),
            (this.index = 0),
            (this.plugins = []),
            (this.lGalleryOn = !1),
            (this.lgBusy = !1),
            (this.currentItemsInDom = []),
            (this.prevScrollTop = 0),
            (this.isDummyImageRemoved = !1),
            (this.dragOrSwipeEnabled = !1),
            (this.mediaContainerPosition = { top: 0, bottom: 0 }),
            !e)
          )
            return this;
          if (
            (tt++,
            (this.lgId = tt),
            (this.el = e),
            (this.LGel = Se(e)),
            this.generateSettings(t),
            this.buildModules(),
            this.settings.dynamic &&
              void 0 !== this.settings.dynamicEl &&
              !Array.isArray(this.settings.dynamicEl))
          )
            throw "When using dynamic mode, you must also define dynamicEl as an Array.";
          return (
            (this.galleryItems = this.getItems()),
            this.normalizeSettings(),
            this.init(),
            this.validateLicense(),
            this
          );
        }
        return (
          (e.prototype.generateSettings = function (e) {
            if (
              ((this.settings = we(we({}, ze), e)),
              this.settings.isMobile &&
              "function" == typeof this.settings.isMobile
                ? this.settings.isMobile()
                : Ae())
            ) {
              var t = we(
                we({}, this.settings.mobileSettings),
                this.settings.mobileSettings
              );
              this.settings = we(we({}, this.settings), t);
            }
          }),
          (e.prototype.normalizeSettings = function () {
            this.settings.slideEndAnimation &&
              (this.settings.hideControlOnEnd = !1),
              this.settings.closable || (this.settings.swipeToClose = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              this.settings.dynamic && (this.zoomFromOrigin = !1),
              this.settings.container ||
                (this.settings.container = document.body),
              (this.settings.preload = Math.min(
                this.settings.preload,
                this.galleryItems.length
              ));
          }),
          (e.prototype.init = function () {
            var e = this;
            this.addSlideVideoInfo(this.galleryItems),
              this.buildStructure(),
              this.LGel.trigger(Be, { instance: this }),
              this.settings.keyPress && this.keyPress(),
              setTimeout(function () {
                e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
              }, 50),
              this.arrow(),
              this.settings.mousewheel && this.mousewheel(),
              this.settings.dynamic || this.openGalleryOnItemClick();
          }),
          (e.prototype.openGalleryOnItemClick = function () {
            for (
              var e = this,
                t = function (t) {
                  var n = i.items[t],
                    s = Se(n),
                    o = xe.generateUUID();
                  s.attr("data-lg-id", o).on(
                    "click.lgcustom-item-" + o,
                    function (i) {
                      i.preventDefault();
                      var s = e.settings.index || t;
                      e.openGallery(s, n);
                    }
                  );
                },
                i = this,
                n = 0;
              n < this.items.length;
              n++
            )
              t(n);
          }),
          (e.prototype.buildModules = function () {
            var e = this;
            this.settings.plugins.forEach(function (t) {
              e.plugins.push(new t(e, Se));
            });
          }),
          (e.prototype.validateLicense = function () {
            this.settings.licenseKey
              ? "0000-0000-000-0000" === this.settings.licenseKey &&
                console.warn(
                  "lightGallery: " +
                    this.settings.licenseKey +
                    " license key is not valid for production use"
                )
              : console.error("Please provide a valid license key");
          }),
          (e.prototype.getSlideItem = function (e) {
            return Se(this.getSlideItemId(e));
          }),
          (e.prototype.getSlideItemId = function (e) {
            return "#lg-item-" + this.lgId + "-" + e;
          }),
          (e.prototype.getIdName = function (e) {
            return e + "-" + this.lgId;
          }),
          (e.prototype.getElementById = function (e) {
            return Se("#" + this.getIdName(e));
          }),
          (e.prototype.manageSingleSlideClassName = function () {
            this.galleryItems.length < 2
              ? this.outer.addClass("lg-single-item")
              : this.outer.removeClass("lg-single-item");
          }),
          (e.prototype.buildStructure = function () {
            var e = this;
            if (!(this.$container && this.$container.get())) {
              var t = "",
                i = "";
              this.settings.controls &&
                (t =
                  '<button type="button" id="' +
                  this.getIdName("lg-prev") +
                  '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                  this.settings.prevHtml +
                  ' </button>\n                <button type="button" id="' +
                  this.getIdName("lg-next") +
                  '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                  this.settings.nextHtml +
                  " </button>"),
                ".lg-item" !== this.settings.appendSubHtmlTo &&
                  (i =
                    '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
              var n = "";
              this.settings.allowMediaOverlap && (n += "lg-media-overlap ");
              var s = this.settings.ariaLabelledby
                  ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                  : "",
                o = this.settings.ariaDescribedby
                  ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                  : "",
                r =
                  "lg-container " +
                  this.settings.addClass +
                  " " +
                  (document.body !== this.settings.container
                    ? "lg-inline"
                    : ""),
                a =
                  this.settings.closable && this.settings.showCloseIcon
                    ? '<button type="button" aria-label="Close gallery" id="' +
                      this.getIdName("lg-close") +
                      '" class="lg-close lg-icon"></button>'
                    : "",
                l = this.settings.showMaximizeIcon
                  ? '<button type="button" aria-label="Toggle maximize" id="' +
                    this.getIdName("lg-maximize") +
                    '" class="lg-maximize lg-icon"></button>'
                  : "",
                c =
                  '\n        <div class="' +
                  r +
                  '" id="' +
                  this.getIdName("lg-container") +
                  '" tabindex="-1" aria-modal="true" ' +
                  s +
                  " " +
                  o +
                  ' role="dialog"\n        >\n            <div id="' +
                  this.getIdName("lg-backdrop") +
                  '" class="lg-backdrop"></div>\n\n            <div id="' +
                  this.getIdName("lg-outer") +
                  '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                  n +
                  ' ">\n\n              <div id="' +
                  this.getIdName("lg-content") +
                  '" class="lg-content">\n                <div id="' +
                  this.getIdName("lg-inner") +
                  '" class="lg-inner">\n                </div>\n                ' +
                  t +
                  '\n              </div>\n                <div id="' +
                  this.getIdName("lg-toolbar") +
                  '" class="lg-toolbar lg-group">\n                    ' +
                  l +
                  "\n                    " +
                  a +
                  "\n                    </div>\n                    " +
                  (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                  '\n                <div id="' +
                  this.getIdName("lg-components") +
                  '" class="lg-components">\n                    ' +
                  (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                  "\n                </div>\n            </div>\n        </div>\n        ";
              Se(this.settings.container).css("position", "relative").append(c),
                (this.outer = this.getElementById("lg-outer")),
                (this.$lgComponents = this.getElementById("lg-components")),
                (this.$backdrop = this.getElementById("lg-backdrop")),
                (this.$container = this.getElementById("lg-container")),
                (this.$inner = this.getElementById("lg-inner")),
                (this.$content = this.getElementById("lg-content")),
                (this.$toolbar = this.getElementById("lg-toolbar")),
                this.$backdrop.css(
                  "transition-duration",
                  this.settings.backdropDuration + "ms"
                );
              var d = this.settings.mode + " ";
              this.manageSingleSlideClassName(),
                this.settings.enableDrag && (d += "lg-grab "),
                this.outer.addClass(d),
                this.$inner.css(
                  "transition-timing-function",
                  this.settings.easing
                ),
                this.$inner.css(
                  "transition-duration",
                  this.settings.speed + "ms"
                ),
                this.settings.download &&
                  this.$toolbar.append(
                    '<a id="' +
                      this.getIdName("lg-download") +
                      '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                  ),
                this.counter(),
                Se(window).on(
                  "resize.lg.global" +
                    this.lgId +
                    " orientationchange.lg.global" +
                    this.lgId,
                  function () {
                    e.refreshOnResize();
                  }
                ),
                this.hideBars(),
                this.manageCloseGallery(),
                this.toggleMaximize(),
                this.initModules();
            }
          }),
          (e.prototype.refreshOnResize = function () {
            if (this.lgOpened) {
              var e = this.galleryItems[this.index].__slideVideoInfo;
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var t = this.mediaContainerPosition,
                i = t.top,
                n = t.bottom;
              if (
                ((this.currentImageSize = Ee(
                  this.items[this.index],
                  this.outer,
                  i + n,
                  e && this.settings.videoMaxSize
                )),
                e && this.resizeVideoSlide(this.index, this.currentImageSize),
                this.zoomFromOrigin && !this.isDummyImageRemoved)
              ) {
                var s = this.getDummyImgStyles(this.currentImageSize);
                this.outer
                  .find(".lg-current .lg-dummy-img")
                  .first()
                  .attr("style", s);
              }
              this.LGel.trigger(Fe);
            }
          }),
          (e.prototype.resizeVideoSlide = function (e, t) {
            var i = this.getVideoContStyle(t);
            this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
          }),
          (e.prototype.updateSlides = function (e, t) {
            if (
              (this.index > e.length - 1 && (this.index = e.length - 1),
              1 === e.length && (this.index = 0),
              e.length)
            ) {
              var i = this.galleryItems[t].src;
              (this.galleryItems = e),
                this.updateControls(),
                this.$inner.empty(),
                (this.currentItemsInDom = []);
              var n = 0;
              this.galleryItems.some(function (e, t) {
                return e.src === i && ((n = t), !0);
              }),
                (this.currentItemsInDom = this.organizeSlideItems(n, -1)),
                this.loadContent(n, !0),
                this.getSlideItem(n).addClass("lg-current"),
                (this.index = n),
                this.updateCurrentCounter(n),
                this.LGel.trigger(je);
            } else this.closeGallery();
          }),
          (e.prototype.getItems = function () {
            if (((this.items = []), this.settings.dynamic))
              return this.settings.dynamicEl || [];
            if ("this" === this.settings.selector) this.items.push(this.el);
            else if (this.settings.selector)
              if ("string" == typeof this.settings.selector)
                if (this.settings.selectWithin) {
                  var e = Se(this.settings.selectWithin);
                  this.items = e.find(this.settings.selector).get();
                } else
                  this.items = this.el.querySelectorAll(this.settings.selector);
              else this.items = this.settings.selector;
            else this.items = this.el.children;
            return Le(
              this.items,
              this.settings.extraProps,
              this.settings.getCaptionFromTitleOrAlt,
              this.settings.exThumbImage
            );
          }),
          (e.prototype.openGallery = function (e, t) {
            var i = this;
            if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
              (this.lgOpened = !0),
                this.outer.get().focus(),
                this.outer.removeClass("lg-hide-items"),
                this.$container.addClass("lg-show");
              var n = this.getItemsToBeInsertedToDom(e, e);
              this.currentItemsInDom = n;
              var s = "";
              n.forEach(function (e) {
                s = s + '<div id="' + e + '" class="lg-item"></div>';
              }),
                this.$inner.append(s),
                this.addHtml(e);
              var o = "";
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var r = this.mediaContainerPosition,
                a = r.top,
                l = r.bottom;
              this.settings.allowMediaOverlap ||
                this.setMediaContainerPosition(a, l);
              var c = this.galleryItems[e].__slideVideoInfo;
              this.zoomFromOrigin &&
                t &&
                ((this.currentImageSize = Ee(
                  t,
                  this.outer,
                  a + l,
                  c && this.settings.videoMaxSize
                )),
                (o = Te(t, this.outer, a, l, this.currentImageSize))),
                (this.zoomFromOrigin && o) ||
                  (this.outer.addClass(this.settings.startClass),
                  this.getSlideItem(e).removeClass("lg-complete"));
              var d = this.settings.zoomFromOrigin
                ? 100
                : this.settings.backdropDuration;
              setTimeout(function () {
                i.outer.addClass("lg-components-open");
              }, d),
                (this.index = e),
                this.LGel.trigger(Re),
                this.getSlideItem(e).addClass("lg-current"),
                (this.lGalleryOn = !1),
                (this.prevScrollTop = Se(window).scrollTop()),
                setTimeout(function () {
                  if (i.zoomFromOrigin && o) {
                    var t = i.getSlideItem(e);
                    t.css("transform", o),
                      setTimeout(function () {
                        t
                          .addClass("lg-start-progress lg-start-end-progress")
                          .css(
                            "transition-duration",
                            i.settings.startAnimationDuration + "ms"
                          ),
                          i.outer.addClass("lg-zoom-from-image");
                      }),
                      setTimeout(function () {
                        t.css("transform", "translate3d(0, 0, 0)");
                      }, 100);
                  }
                  setTimeout(function () {
                    i.$backdrop.addClass("in"),
                      i.$container.addClass("lg-show-in");
                  }, 10),
                    (i.zoomFromOrigin && o) ||
                      setTimeout(function () {
                        i.outer.addClass("lg-visible");
                      }, i.settings.backdropDuration),
                    i.slide(e, !1, !1, !1),
                    i.LGel.trigger(He);
                }),
                document.body === this.settings.container &&
                  Se("html").addClass("lg-on");
            }
          }),
          (e.prototype.getMediaContainerPosition = function () {
            if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
            var e = this.$toolbar.get().clientHeight || 0,
              t = this.outer.find(".lg-components .lg-sub-html").get(),
              i =
                this.settings.defaultCaptionHeight ||
                (t && t.clientHeight) ||
                0,
              n = this.outer.find(".lg-thumb-outer").get();
            return { top: e, bottom: (n ? n.clientHeight : 0) + i };
          }),
          (e.prototype.setMediaContainerPosition = function (e, t) {
            void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              this.$content.css("top", e + "px").css("bottom", t + "px");
          }),
          (e.prototype.hideBars = function () {
            var e = this;
            setTimeout(function () {
              e.outer.removeClass("lg-hide-items"),
                e.settings.hideBarsDelay > 0 &&
                  (e.outer.on(
                    "mousemove.lg click.lg touchstart.lg",
                    function () {
                      e.outer.removeClass("lg-hide-items"),
                        clearTimeout(e.hideBarTimeout),
                        (e.hideBarTimeout = setTimeout(function () {
                          e.outer.addClass("lg-hide-items");
                        }, e.settings.hideBarsDelay));
                    }
                  ),
                  e.outer.trigger("mousemove.lg"));
            }, this.settings.showBarsAfter);
          }),
          (e.prototype.initPictureFill = function (e) {
            if (this.settings.supportLegacyBrowser)
              try {
                picturefill({ elements: [e.get()] });
              } catch (e) {
                console.warn(
                  "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                );
              }
          }),
          (e.prototype.counter = function () {
            if (this.settings.counter) {
              var e =
                '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                this.getIdName("lg-counter-current") +
                '" class="lg-counter-current">' +
                (this.index + 1) +
                ' </span> /\n                <span id="' +
                this.getIdName("lg-counter-all") +
                '" class="lg-counter-all">' +
                this.galleryItems.length +
                " </span></div>";
              this.outer.find(this.settings.appendCounterTo).append(e);
            }
          }),
          (e.prototype.addHtml = function (e) {
            var t, i;
            if (
              (this.galleryItems[e].subHtmlUrl
                ? (i = this.galleryItems[e].subHtmlUrl)
                : (t = this.galleryItems[e].subHtml),
              !i)
            )
              if (t) {
                var n = t.substring(0, 1);
                ("." !== n && "#" !== n) ||
                  (t =
                    this.settings.subHtmlSelectorRelative &&
                    !this.settings.dynamic
                      ? Se(this.items).eq(e).find(t).first().html()
                      : Se(t).first().html());
              } else t = "";
            if (".lg-item" !== this.settings.appendSubHtmlTo)
              i
                ? this.outer.find(".lg-sub-html").load(i)
                : this.outer.find(".lg-sub-html").html(t);
            else {
              var s = Se(this.getSlideItemId(e));
              i
                ? s.load(i)
                : s.append('<div class="lg-sub-html">' + t + "</div>");
            }
            null != t &&
              ("" === t
                ? this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .addClass("lg-empty-html")
                : this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .removeClass("lg-empty-html")),
              this.LGel.trigger(Ne, { index: e });
          }),
          (e.prototype.preload = function (e) {
            for (
              var t = 1;
              t <= this.settings.preload &&
              !(t >= this.galleryItems.length - e);
              t++
            )
              this.loadContent(e + t, !1);
            for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
              this.loadContent(e - i, !1);
          }),
          (e.prototype.getDummyImgStyles = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                margin-left: -" +
                  e.width / 2 +
                  "px;\n                margin-top: -" +
                  e.height / 2 +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getVideoContStyle = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getDummyImageContent = function (e, t, i) {
            var n;
            if ((this.settings.dynamic || (n = Se(this.items).eq(t)), n)) {
              var s = void 0;
              if (
                !(s = this.settings.exThumbImage
                  ? n.attr(this.settings.exThumbImage)
                  : n.find("img").first().attr("src"))
              )
                return "";
              var o =
                "<img " +
                i +
                ' style="' +
                this.getDummyImgStyles(this.currentImageSize) +
                '" class="lg-dummy-img" src="' +
                s +
                '" />';
              return (
                e.addClass("lg-first-slide"),
                this.outer.addClass("lg-first-slide-loading"),
                o
              );
            }
            return "";
          }),
          (e.prototype.setImgMarkup = function (e, t, i) {
            var n = this.galleryItems[i],
              s = n.alt,
              o = n.srcset,
              r = n.sizes,
              a = n.sources,
              l = s ? 'alt="' + s + '"' : "",
              c =
                '<picture class="lg-img-wrap"> ' +
                (this.isFirstSlideWithZoomAnimation()
                  ? this.getDummyImageContent(t, i, l)
                  : Pe(i, e, l, o, r, a)) +
                "</picture>";
            t.prepend(c);
          }),
          (e.prototype.onSlideObjectLoad = function (e, t, i, n) {
            var s = e.find(".lg-object").first();
            Ie(s.get()) || t
              ? i()
              : (s.on("load.lg error.lg", function () {
                  i && i();
                }),
                s.on("error.lg", function () {
                  n && n();
                }));
          }),
          (e.prototype.onLgObjectLoad = function (e, t, i, n, s, o) {
            var r = this;
            this.onSlideObjectLoad(
              e,
              o,
              function () {
                r.triggerSlideItemLoad(e, t, i, n, s);
              },
              function () {
                e.addClass("lg-complete lg-complete_"),
                  e.html(
                    '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                  );
              }
            );
          }),
          (e.prototype.triggerSlideItemLoad = function (e, t, i, n, s) {
            var o = this,
              r = this.galleryItems[t],
              a = s && "video" === this.getSlideType(r) && !r.poster ? n : 0;
            setTimeout(function () {
              e.addClass("lg-complete lg-complete_"),
                o.LGel.trigger(Ve, {
                  index: t,
                  delay: i || 0,
                  isFirstSlide: s,
                });
            }, a);
          }),
          (e.prototype.isFirstSlideWithZoomAnimation = function () {
            return !(
              this.lGalleryOn ||
              !this.zoomFromOrigin ||
              !this.currentImageSize
            );
          }),
          (e.prototype.addSlideVideoInfo = function (e) {
            var t = this;
            e.forEach(function (e, i) {
              (e.__slideVideoInfo = De(e.src, !!e.video, i)),
                e.__slideVideoInfo &&
                  t.settings.loadYouTubePoster &&
                  !e.poster &&
                  e.__slideVideoInfo.youtube &&
                  (e.poster =
                    "//img.youtube.com/vi/" +
                    e.__slideVideoInfo.youtube[1] +
                    "/maxresdefault.jpg");
            });
          }),
          (e.prototype.loadContent = function (e, t) {
            var i = this,
              n = this.galleryItems[e],
              s = Se(this.getSlideItemId(e)),
              o = n.poster,
              r = n.srcset,
              a = n.sizes,
              l = n.sources,
              c = n.src,
              d = n.video,
              u = d && "string" == typeof d ? JSON.parse(d) : d;
            if (n.responsive) {
              var p = n.responsive.split(",");
              c = Oe(p) || c;
            }
            var h = n.__slideVideoInfo,
              g = "",
              m = !!n.iframe,
              f = !this.lGalleryOn,
              v = 0;
            if (
              (f &&
                (v =
                  this.zoomFromOrigin && this.currentImageSize
                    ? this.settings.startAnimationDuration + 10
                    : this.settings.backdropDuration + 10),
              !s.hasClass("lg-loaded"))
            ) {
              if (h) {
                var y = this.mediaContainerPosition,
                  b = y.top,
                  w = y.bottom,
                  x = Ee(
                    this.items[e],
                    this.outer,
                    b + w,
                    h && this.settings.videoMaxSize
                  );
                g = this.getVideoContStyle(x);
              }
              if (m) {
                var S = _e(
                  this.settings.iframeWidth,
                  this.settings.iframeHeight,
                  this.settings.iframeMaxWidth,
                  this.settings.iframeMaxHeight,
                  c,
                  n.iframeTitle
                );
                s.prepend(S);
              } else if (o) {
                var k = "";
                f &&
                  this.zoomFromOrigin &&
                  this.currentImageSize &&
                  (k = this.getDummyImageContent(s, e, ""));
                S = Me(o, k || "", g, h);
                s.prepend(S);
              } else if (h) {
                S = '<div class="lg-video-cont " style="' + g + '"></div>';
                s.prepend(S);
              } else if ((this.setImgMarkup(c, s, e), r || l)) {
                var C = s.find(".lg-object");
                this.initPictureFill(C);
              }
              (o || h) &&
                this.LGel.trigger(Ge, {
                  index: e,
                  src: c,
                  html5Video: u,
                  hasPoster: !!o,
                }),
                this.LGel.trigger($e, { index: e }),
                this.lGalleryOn &&
                  ".lg-item" === this.settings.appendSubHtmlTo &&
                  this.addHtml(e);
            }
            var E = 0;
            v && !Se(document.body).hasClass("lg-from-hash") && (E = v),
              this.isFirstSlideWithZoomAnimation() &&
                (setTimeout(function () {
                  s.removeClass(
                    "lg-start-end-progress lg-start-progress"
                  ).removeAttr("style");
                }, this.settings.startAnimationDuration + 100),
                s.hasClass("lg-loaded") ||
                  setTimeout(function () {
                    if (
                      "image" === i.getSlideType(n) &&
                      (s
                        .find(".lg-img-wrap")
                        .append(Pe(e, c, "", r, a, n.sources)),
                      r || l)
                    ) {
                      var t = s.find(".lg-object");
                      i.initPictureFill(t);
                    }
                    ("image" === i.getSlideType(n) ||
                      ("video" === i.getSlideType(n) && o)) &&
                      (i.onLgObjectLoad(s, e, v, E, !0, !1),
                      i.onSlideObjectLoad(
                        s,
                        !(!h || !h.html5 || o),
                        function () {
                          i.loadContentOnFirstSlideLoad(e, s, E);
                        },
                        function () {
                          i.loadContentOnFirstSlideLoad(e, s, E);
                        }
                      ));
                  }, this.settings.startAnimationDuration + 100)),
              s.addClass("lg-loaded"),
              (this.isFirstSlideWithZoomAnimation() &&
                ("video" !== this.getSlideType(n) || o)) ||
                this.onLgObjectLoad(s, e, v, E, f, !(!h || !h.html5 || o)),
              (this.zoomFromOrigin && this.currentImageSize) ||
                !s.hasClass("lg-complete_") ||
                this.lGalleryOn ||
                setTimeout(function () {
                  s.addClass("lg-complete");
                }, this.settings.backdropDuration),
              (this.lGalleryOn = !0),
              !0 === t &&
                (s.hasClass("lg-complete_")
                  ? this.preload(e)
                  : s
                      .find(".lg-object")
                      .first()
                      .on("load.lg error.lg", function () {
                        i.preload(e);
                      }));
          }),
          (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
            var n = this;
            setTimeout(function () {
              t.find(".lg-dummy-img").remove(),
                t.removeClass("lg-first-slide"),
                n.outer.removeClass("lg-first-slide-loading"),
                (n.isDummyImageRemoved = !0),
                n.preload(e);
            }, i + 300);
          }),
          (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
            var n = this;
            void 0 === i && (i = 0);
            var s = [],
              o = Math.max(i, 3);
            o = Math.min(o, this.galleryItems.length);
            var r = "lg-item-" + this.lgId + "-" + t;
            if (this.galleryItems.length <= 3)
              return (
                this.galleryItems.forEach(function (e, t) {
                  s.push("lg-item-" + n.lgId + "-" + t);
                }),
                s
              );
            if (e < (this.galleryItems.length - 1) / 2) {
              for (var a = e; a > e - o / 2 && a >= 0; a--)
                s.push("lg-item-" + this.lgId + "-" + a);
              var l = s.length;
              for (a = 0; a < o - l; a++)
                s.push("lg-item-" + this.lgId + "-" + (e + a + 1));
            } else {
              for (
                a = e;
                a <= this.galleryItems.length - 1 && a < e + o / 2;
                a++
              )
                s.push("lg-item-" + this.lgId + "-" + a);
              for (l = s.length, a = 0; a < o - l; a++)
                s.push("lg-item-" + this.lgId + "-" + (e - a - 1));
            }
            return (
              this.settings.loop &&
                (e === this.galleryItems.length - 1
                  ? s.push("lg-item-" + this.lgId + "-0")
                  : 0 === e &&
                    s.push(
                      "lg-item-" +
                        this.lgId +
                        "-" +
                        (this.galleryItems.length - 1)
                    )),
              -1 === s.indexOf(r) && s.push("lg-item-" + this.lgId + "-" + t),
              s
            );
          }),
          (e.prototype.organizeSlideItems = function (e, t) {
            var i = this,
              n = this.getItemsToBeInsertedToDom(
                e,
                t,
                this.settings.numberOfSlideItemsInDom
              );
            return (
              n.forEach(function (e) {
                -1 === i.currentItemsInDom.indexOf(e) &&
                  i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
              }),
              this.currentItemsInDom.forEach(function (e) {
                -1 === n.indexOf(e) && Se("#" + e).remove();
              }),
              n
            );
          }),
          (e.prototype.getPreviousSlideIndex = function () {
            var e = 0;
            try {
              var t = this.outer.find(".lg-current").first().attr("id");
              e = parseInt(t.split("-")[3]) || 0;
            } catch (t) {
              e = 0;
            }
            return e;
          }),
          (e.prototype.setDownloadValue = function (e) {
            if (this.settings.download) {
              var t = this.galleryItems[e];
              if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                this.outer.addClass("lg-hide-download");
              else {
                var i = this.getElementById("lg-download");
                this.outer.removeClass("lg-hide-download"),
                  i.attr("href", t.downloadUrl || t.src),
                  t.download && i.attr("download", t.download);
              }
            }
          }),
          (e.prototype.makeSlideAnimation = function (e, t, i) {
            var n = this;
            this.lGalleryOn && i.addClass("lg-slide-progress"),
              setTimeout(
                function () {
                  n.outer.addClass("lg-no-trans"),
                    n.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-next-slide"),
                    "prev" === e
                      ? (t.addClass("lg-prev-slide"),
                        i.addClass("lg-next-slide"))
                      : (t.addClass("lg-next-slide"),
                        i.addClass("lg-prev-slide")),
                    setTimeout(function () {
                      n.outer.find(".lg-item").removeClass("lg-current"),
                        t.addClass("lg-current"),
                        n.outer.removeClass("lg-no-trans");
                    }, 50);
                },
                this.lGalleryOn ? this.settings.slideDelay : 0
              );
          }),
          (e.prototype.slide = function (e, t, i, n) {
            var s = this,
              o = this.getPreviousSlideIndex();
            if (
              ((this.currentItemsInDom = this.organizeSlideItems(e, o)),
              !this.lGalleryOn || o !== e)
            ) {
              var r = this.galleryItems.length;
              if (!this.lgBusy) {
                this.settings.counter && this.updateCurrentCounter(e);
                var a = this.getSlideItem(e),
                  l = this.getSlideItem(o),
                  c = this.galleryItems[e],
                  d = c.__slideVideoInfo;
                if (
                  (this.outer.attr("data-lg-slide-type", this.getSlideType(c)),
                  this.setDownloadValue(e),
                  d)
                ) {
                  var u = this.mediaContainerPosition,
                    p = u.top,
                    h = u.bottom,
                    g = Ee(
                      this.items[e],
                      this.outer,
                      p + h,
                      d && this.settings.videoMaxSize
                    );
                  this.resizeVideoSlide(e, g);
                }
                if (
                  (this.LGel.trigger(qe, {
                    prevIndex: o,
                    index: e,
                    fromTouch: !!t,
                    fromThumb: !!i,
                  }),
                  (this.lgBusy = !0),
                  clearTimeout(this.hideBarTimeout),
                  this.arrowDisable(e),
                  n || (e < o ? (n = "prev") : e > o && (n = "next")),
                  t)
                ) {
                  this.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-current lg-next-slide");
                  var m = void 0,
                    f = void 0;
                  r > 2
                    ? ((m = e - 1),
                      (f = e + 1),
                      ((0 === e && o === r - 1) || (e === r - 1 && 0 === o)) &&
                        ((f = 0), (m = r - 1)))
                    : ((m = 0), (f = 1)),
                    "prev" === n
                      ? this.getSlideItem(f).addClass("lg-next-slide")
                      : this.getSlideItem(m).addClass("lg-prev-slide"),
                    a.addClass("lg-current");
                } else this.makeSlideAnimation(n, a, l);
                this.lGalleryOn
                  ? setTimeout(function () {
                      s.loadContent(e, !0),
                        ".lg-item" !== s.settings.appendSubHtmlTo &&
                          s.addHtml(e);
                    }, this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay))
                  : this.loadContent(e, !0),
                  setTimeout(function () {
                    (s.lgBusy = !1),
                      l.removeClass("lg-slide-progress"),
                      s.LGel.trigger(We, {
                        prevIndex: o,
                        index: e,
                        fromTouch: t,
                        fromThumb: i,
                      });
                  }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                    (t ? 0 : this.settings.slideDelay));
              }
              this.index = e;
            }
          }),
          (e.prototype.updateCurrentCounter = function (e) {
            this.getElementById("lg-counter-current").html(e + 1 + "");
          }),
          (e.prototype.updateCounterTotal = function () {
            this.getElementById("lg-counter-all").html(
              this.galleryItems.length + ""
            );
          }),
          (e.prototype.getSlideType = function (e) {
            return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
          }),
          (e.prototype.touchMove = function (e, t, i) {
            var n = t.pageX - e.pageX,
              s = t.pageY - e.pageY,
              o = !1;
            if (
              (this.swipeDirection
                ? (o = !0)
                : Math.abs(n) > 15
                ? ((this.swipeDirection = "horizontal"), (o = !0))
                : Math.abs(s) > 15 &&
                  ((this.swipeDirection = "vertical"), (o = !0)),
              o)
            ) {
              var r = this.getSlideItem(this.index);
              if ("horizontal" === this.swipeDirection) {
                null == i || i.preventDefault(),
                  this.outer.addClass("lg-dragging"),
                  this.setTranslate(r, n, 0);
                var a = r.get().offsetWidth,
                  l = (15 * a) / 100 - Math.abs((10 * n) / 100);
                this.setTranslate(
                  this.outer.find(".lg-prev-slide").first(),
                  -a + n - l,
                  0
                ),
                  this.setTranslate(
                    this.outer.find(".lg-next-slide").first(),
                    a + n + l,
                    0
                  );
              } else if (
                "vertical" === this.swipeDirection &&
                this.settings.swipeToClose
              ) {
                null == i || i.preventDefault(),
                  this.$container.addClass("lg-dragging-vertical");
                var c = 1 - Math.abs(s) / window.innerHeight;
                this.$backdrop.css("opacity", c);
                var d = 1 - Math.abs(s) / (2 * window.innerWidth);
                this.setTranslate(r, 0, s, d, d),
                  Math.abs(s) > 100 &&
                    this.outer
                      .addClass("lg-hide-items")
                      .removeClass("lg-components-open");
              }
            }
          }),
          (e.prototype.touchEnd = function (e, t, i) {
            var n,
              s = this;
            "lg-slide" !== this.settings.mode &&
              this.outer.addClass("lg-slide"),
              setTimeout(function () {
                s.$container.removeClass("lg-dragging-vertical"),
                  s.outer
                    .removeClass("lg-dragging lg-hide-items")
                    .addClass("lg-components-open");
                var o = !0;
                if ("horizontal" === s.swipeDirection) {
                  n = e.pageX - t.pageX;
                  var r = Math.abs(e.pageX - t.pageX);
                  n < 0 && r > s.settings.swipeThreshold
                    ? (s.goToNextSlide(!0), (o = !1))
                    : n > 0 &&
                      r > s.settings.swipeThreshold &&
                      (s.goToPrevSlide(!0), (o = !1));
                } else if ("vertical" === s.swipeDirection) {
                  if (
                    ((n = Math.abs(e.pageY - t.pageY)),
                    s.settings.closable && s.settings.swipeToClose && n > 100)
                  )
                    return void s.closeGallery();
                  s.$backdrop.css("opacity", 1);
                }
                if (
                  (s.outer.find(".lg-item").removeAttr("style"),
                  o && Math.abs(e.pageX - t.pageX) < 5)
                ) {
                  var a = Se(i.target);
                  s.isPosterElement(a) && s.LGel.trigger(Ye);
                }
                s.swipeDirection = void 0;
              }),
              setTimeout(function () {
                s.outer.hasClass("lg-dragging") ||
                  "lg-slide" === s.settings.mode ||
                  s.outer.removeClass("lg-slide");
              }, this.settings.speed + 100);
          }),
          (e.prototype.enableSwipe = function () {
            var e = this,
              t = {},
              i = {},
              n = !1,
              s = !1;
            this.settings.enableSwipe &&
              (this.$inner.on("touchstart.lg", function (i) {
                e.dragOrSwipeEnabled = !0;
                var n = e.getSlideItem(e.index);
                (!Se(i.target).hasClass("lg-item") &&
                  !n.get().contains(i.target)) ||
                  e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  1 !== i.targetTouches.length ||
                  ((s = !0),
                  (e.touchAction = "swipe"),
                  e.manageSwipeClass(),
                  (t = {
                    pageX: i.targetTouches[0].pageX,
                    pageY: i.targetTouches[0].pageY,
                  }));
              }),
              this.$inner.on("touchmove.lg", function (o) {
                s &&
                  "swipe" === e.touchAction &&
                  1 === o.targetTouches.length &&
                  ((i = {
                    pageX: o.targetTouches[0].pageX,
                    pageY: o.targetTouches[0].pageY,
                  }),
                  e.touchMove(t, i, o),
                  (n = !0));
              }),
              this.$inner.on("touchend.lg", function (o) {
                if ("swipe" === e.touchAction) {
                  if (n) (n = !1), e.touchEnd(i, t, o);
                  else if (s) {
                    var r = Se(o.target);
                    e.isPosterElement(r) && e.LGel.trigger(Ye);
                  }
                  (e.touchAction = void 0), (s = !1);
                }
              }));
          }),
          (e.prototype.enableDrag = function () {
            var e = this,
              t = {},
              i = {},
              n = !1,
              s = !1;
            this.settings.enableDrag &&
              (this.outer.on("mousedown.lg", function (i) {
                e.dragOrSwipeEnabled = !0;
                var s = e.getSlideItem(e.index);
                (Se(i.target).hasClass("lg-item") ||
                  s.get().contains(i.target)) &&
                  (e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    (i.preventDefault(),
                    e.lgBusy ||
                      (e.manageSwipeClass(),
                      (t = { pageX: i.pageX, pageY: i.pageY }),
                      (n = !0),
                      (e.outer.get().scrollLeft += 1),
                      (e.outer.get().scrollLeft -= 1),
                      e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                      e.LGel.trigger(Xe))));
              }),
              Se(window).on("mousemove.lg.global" + this.lgId, function (o) {
                n &&
                  e.lgOpened &&
                  ((s = !0),
                  (i = { pageX: o.pageX, pageY: o.pageY }),
                  e.touchMove(t, i),
                  e.LGel.trigger(Ue));
              }),
              Se(window).on("mouseup.lg.global" + this.lgId, function (o) {
                if (e.lgOpened) {
                  var r = Se(o.target);
                  s
                    ? ((s = !1), e.touchEnd(i, t, o), e.LGel.trigger(Ke))
                    : e.isPosterElement(r) && e.LGel.trigger(Ye),
                    n &&
                      ((n = !1),
                      e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                }
              }));
          }),
          (e.prototype.triggerPosterClick = function () {
            var e = this;
            this.$inner.on("click.lg", function (t) {
              !e.dragOrSwipeEnabled &&
                e.isPosterElement(Se(t.target)) &&
                e.LGel.trigger(Ye);
            });
          }),
          (e.prototype.manageSwipeClass = function () {
            var e = this.index + 1,
              t = this.index - 1;
            this.settings.loop &&
              this.galleryItems.length > 2 &&
              (0 === this.index
                ? (t = this.galleryItems.length - 1)
                : this.index === this.galleryItems.length - 1 && (e = 0)),
              this.outer
                .find(".lg-item")
                .removeClass("lg-next-slide lg-prev-slide"),
              t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
              this.getSlideItem(e).addClass("lg-next-slide");
          }),
          (e.prototype.goToNextSlide = function (e) {
            var t = this,
              i = this.settings.loop;
            e && this.galleryItems.length < 3 && (i = !1),
              this.lgBusy ||
                (this.index + 1 < this.galleryItems.length
                  ? (this.index++,
                    this.LGel.trigger(Ze, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : i
                  ? ((this.index = 0),
                    this.LGel.trigger(Ze, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-right-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-right-end");
                    }, 400)));
          }),
          (e.prototype.goToPrevSlide = function (e) {
            var t = this,
              i = this.settings.loop;
            e && this.galleryItems.length < 3 && (i = !1),
              this.lgBusy ||
                (this.index > 0
                  ? (this.index--,
                    this.LGel.trigger(Qe, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : i
                  ? ((this.index = this.galleryItems.length - 1),
                    this.LGel.trigger(Qe, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-left-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-left-end");
                    }, 400)));
          }),
          (e.prototype.keyPress = function () {
            var e = this;
            Se(window).on("keydown.lg.global" + this.lgId, function (t) {
              e.lgOpened &&
                !0 === e.settings.escKey &&
                27 === t.keyCode &&
                (t.preventDefault(),
                e.settings.allowMediaOverlap &&
                e.outer.hasClass("lg-can-toggle") &&
                e.outer.hasClass("lg-components-open")
                  ? e.outer.removeClass("lg-components-open")
                  : e.closeGallery()),
                e.lgOpened &&
                  e.galleryItems.length > 1 &&
                  (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                  39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
            });
          }),
          (e.prototype.arrow = function () {
            var e = this;
            this.getElementById("lg-prev").on("click.lg", function () {
              e.goToPrevSlide();
            }),
              this.getElementById("lg-next").on("click.lg", function () {
                e.goToNextSlide();
              });
          }),
          (e.prototype.arrowDisable = function (e) {
            if (!this.settings.loop && this.settings.hideControlOnEnd) {
              var t = this.getElementById("lg-prev"),
                i = this.getElementById("lg-next");
              e + 1 === this.galleryItems.length
                ? i.attr("disabled", "disabled").addClass("disabled")
                : i.removeAttr("disabled").removeClass("disabled"),
                0 === e
                  ? t.attr("disabled", "disabled").addClass("disabled")
                  : t.removeAttr("disabled").removeClass("disabled");
            }
          }),
          (e.prototype.setTranslate = function (e, t, i, n, s) {
            void 0 === n && (n = 1),
              void 0 === s && (s = 1),
              e.css(
                "transform",
                "translate3d(" +
                  t +
                  "px, " +
                  i +
                  "px, 0px) scale3d(" +
                  n +
                  ", " +
                  s +
                  ", 1)"
              );
          }),
          (e.prototype.mousewheel = function () {
            var e = this,
              t = 0;
            this.outer.on("wheel.lg", function (i) {
              if (i.deltaY && !(e.galleryItems.length < 2)) {
                i.preventDefault();
                var n = new Date().getTime();
                n - t < 1e3 ||
                  ((t = n),
                  i.deltaY > 0
                    ? e.goToNextSlide()
                    : i.deltaY < 0 && e.goToPrevSlide());
              }
            });
          }),
          (e.prototype.isSlideElement = function (e) {
            return (
              e.hasClass("lg-outer") ||
              e.hasClass("lg-item") ||
              e.hasClass("lg-img-wrap")
            );
          }),
          (e.prototype.isPosterElement = function (e) {
            var t = this.getSlideItem(this.index)
              .find(".lg-video-play-button")
              .get();
            return (
              e.hasClass("lg-video-poster") ||
              e.hasClass("lg-video-play-button") ||
              (t && t.contains(e.get()))
            );
          }),
          (e.prototype.toggleMaximize = function () {
            var e = this;
            this.getElementById("lg-maximize").on("click.lg", function () {
              e.$container.toggleClass("lg-inline"), e.refreshOnResize();
            });
          }),
          (e.prototype.invalidateItems = function () {
            for (var e = 0; e < this.items.length; e++) {
              var t = Se(this.items[e]);
              t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
            }
          }),
          (e.prototype.manageCloseGallery = function () {
            var e = this;
            if (this.settings.closable) {
              var t = !1;
              this.getElementById("lg-close").on("click.lg", function () {
                e.closeGallery();
              }),
                this.settings.closeOnTap &&
                  (this.outer.on("mousedown.lg", function (i) {
                    var n = Se(i.target);
                    t = !!e.isSlideElement(n);
                  }),
                  this.outer.on("mousemove.lg", function () {
                    t = !1;
                  }),
                  this.outer.on("mouseup.lg", function (i) {
                    var n = Se(i.target);
                    e.isSlideElement(n) &&
                      t &&
                      (e.outer.hasClass("lg-dragging") || e.closeGallery());
                  }));
            }
          }),
          (e.prototype.closeGallery = function (e) {
            var t = this;
            if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
            this.LGel.trigger(Je), Se(window).scrollTop(this.prevScrollTop);
            var i,
              n = this.items[this.index];
            if (this.zoomFromOrigin && n) {
              var s = this.mediaContainerPosition,
                o = s.top,
                r = s.bottom,
                a = this.galleryItems[this.index],
                l = a.__slideVideoInfo,
                c = a.poster,
                d = Ee(
                  n,
                  this.outer,
                  o + r,
                  l && c && this.settings.videoMaxSize
                );
              i = Te(n, this.outer, o, r, d);
            }
            this.zoomFromOrigin && i
              ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                this.getSlideItem(this.index)
                  .addClass("lg-start-end-progress")
                  .css(
                    "transition-duration",
                    this.settings.startAnimationDuration + "ms"
                  )
                  .css("transform", i))
              : (this.outer.addClass("lg-hide-items"),
                this.outer.removeClass("lg-zoom-from-image")),
              this.destroyModules(),
              (this.lGalleryOn = !1),
              (this.isDummyImageRemoved = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              clearTimeout(this.hideBarTimeout),
              (this.hideBarTimeout = !1),
              Se("html").removeClass("lg-on"),
              this.outer.removeClass("lg-visible lg-components-open"),
              this.$backdrop.removeClass("in").css("opacity", 0);
            var u =
              this.zoomFromOrigin && i
                ? Math.max(
                    this.settings.startAnimationDuration,
                    this.settings.backdropDuration
                  )
                : this.settings.backdropDuration;
            return (
              this.$container.removeClass("lg-show-in"),
              setTimeout(function () {
                t.zoomFromOrigin &&
                  i &&
                  t.outer.removeClass("lg-zoom-from-image"),
                  t.$container.removeClass("lg-show"),
                  t.$backdrop
                    .removeAttr("style")
                    .css(
                      "transition-duration",
                      t.settings.backdropDuration + "ms"
                    ),
                  t.outer.removeClass("lg-closing " + t.settings.startClass),
                  t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                  t.$inner.empty(),
                  t.lgOpened && t.LGel.trigger(et, { instance: t }),
                  t.outer.get() && t.outer.get().blur(),
                  (t.lgOpened = !1);
              }, u + 100),
              u + 100
            );
          }),
          (e.prototype.initModules = function () {
            this.plugins.forEach(function (e) {
              try {
                e.init();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly initiated"
                );
              }
            });
          }),
          (e.prototype.destroyModules = function (e) {
            this.plugins.forEach(function (t) {
              try {
                e ? t.destroy() : t.closeGallery && t.closeGallery();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly destroyed"
                );
              }
            });
          }),
          (e.prototype.refresh = function (e) {
            this.settings.dynamic || this.invalidateItems(),
              (this.galleryItems = e || this.getItems()),
              this.updateControls(),
              this.openGalleryOnItemClick(),
              this.LGel.trigger(je);
          }),
          (e.prototype.updateControls = function () {
            this.addSlideVideoInfo(this.galleryItems),
              this.updateCounterTotal(),
              this.manageSingleSlideClassName();
          }),
          (e.prototype.destroy = function () {
            var e = this,
              t = this.closeGallery(!0);
            return (
              setTimeout(function () {
                e.destroyModules(!0),
                  e.settings.dynamic || e.invalidateItems(),
                  Se(window).off(".lg.global" + e.lgId),
                  e.LGel.off(".lg"),
                  e.$container.remove();
              }, t),
              t
            );
          }),
          e
        );
      })();
    const nt = function (e, t) {
      return new it(e, t);
    };
    var st = __webpack_require__(86);
    const ot = document.querySelectorAll("[data-gallery]");
    ot.length &&
      ot.forEach((e) => {
        nt(e, {
          plugins: [st],
          licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
          speed: 500,
        });
      });
    const rt = document.querySelectorAll(".bottom-header-main__item"),
      at = document.querySelector(".scroll-body-header"),
      lt = document.querySelector(".header__input"),
      ct = document.querySelector(".header__form-button-clear"),
      dt = document.querySelectorAll(".cards-principles__hide-content"),
      ut = document.body;
    let pt, ht;
    rt.length &&
      rt.forEach((e) => {
        e.addEventListener("mouseenter", function (t) {
          e.classList.add("_hover");
        }),
          e.addEventListener("mouseleave", function (t) {
            setTimeout(() => {
              e.classList.remove("_hover");
            }, 300);
          });
      }),
      lt &&
        (lt.oninput = function () {
          "" == !lt.value
            ? ct.classList.remove("_hidden")
            : ct.classList.add("_hidden");
        }),
      (window.onload = function () {
        if (
          (document
            .querySelector(".wrapper")
            .classList.contains("wrapper_dark-header") ||
            document.querySelector("header").setAttribute("data-lp", ""),
          document.querySelector("#player"))
        ) {
          var e;
          (e = new YT.Player("player", {})),
            window.addEventListener("scroll", function (t) {
              document
                .querySelector(".video")
                .classList.contains("_watcher-view")
                ? e.playVideo()
                : e.pauseVideo();
            });
        }
        dt.length &&
          dt.forEach((e) => {
            setTimeout(() => {
              let t = e.offsetHeight,
                i = e.closest(".cards-principles__body");
              (e.closest(
                ".cards-principles__content"
              ).style.cssText = `transform: translate(0px,  ${t}px)`),
                i.addEventListener("mouseenter", function (e) {
                  i.classList.add("_hover");
                }),
                i.addEventListener("mouseleave", function (e) {
                  i.classList.remove("_hover");
                });
            }, 25);
          }),
          document.addEventListener("click", function (e) {
            const t = e.target,
              i = document.querySelector(".header__form-search");
            t.classList.contains("top-header-main__loupe") &&
              i.classList.add("_open");
            t.classList.contains("header__button-cloce") &&
              i.classList.remove("_open");
            t.classList.contains("header__form-button-clear") &&
              ((lt.value = ""), t.classList.add("_hidden"));
            t.classList.contains("menu__body") ||
              t.classList.contains("icon-menu") ||
              t.classList.contains("menu__item") ||
              t.classList.contains("menu__list") ||
              t.classList.contains("menu__link") ||
              (document.documentElement.classList.contains("menu-open") &&
                (r(), document.documentElement.classList.remove("menu-open")));
            t.classList.contains("popup__form-error-close") &&
              t.parentElement.classList.add("popup__form-error_hide");
          });
      }),
      window.addEventListener("scroll", function () {
        let e = (pt = pageYOffset);
        e <= 0 &&
          ut.classList.contains("_scroll-up") &&
          ut.classList.remove("_scroll-up");
        e > ht &&
          !ut.classList.contains("_scroll-down") &&
          (ut.classList.remove("_scroll-up"), ut.classList.add("_scroll-down"));
        e < ht &&
          ut.classList.contains("_scroll-down") &&
          (ut.classList.add("_scroll-up"), ut.classList.remove("_scroll-down"));
        at &&
          (e > 400
            ? at.classList.add("show")
            : e < 400 && at.classList.remove("show"));
        ht = e;
      });
    __webpack_require__(151);
    (window.FLS = !1),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      (function () {
        let e = document.querySelectorAll(".icon-menu");
        e.length &&
          e.forEach((e) => {
            e.addEventListener("click", function (e) {
              s &&
                (o(), document.documentElement.classList.toggle("menu-open"));
            });
          });
      })(),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const t = Array.from(e).filter(function (e, t, i) {
            return !e.dataset.spollers.split(",")[0];
          });
          t.length && o(t);
          let s = d(e, "spollers");
          function o(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    r(e),
                    e.addEventListener("click", a))
                  : (e.classList.remove("_spoller-init"),
                    r(e, !1),
                    e.removeEventListener("click", a));
            });
          }
          function r(e, t = !0) {
            const i = e.querySelectorAll("[data-spoller]");
            i.length > 0 &&
              i.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              });
          }
          function a(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const s = t.closest("[data-spoller]"),
                o = s.closest("[data-spollers]"),
                r = !!o.hasAttribute("data-one-spoller");
              o.querySelectorAll("._slide").length ||
                (r && !s.classList.contains("_spoller-active") && l(o),
                s.classList.toggle("_spoller-active"),
                ((e, t = 500) => {
                  e.hidden ? n(e, t) : i(e, t);
                })(s.nextElementSibling, 500)),
                e.preventDefault();
            }
          }
          function l(e) {
            const t = e.querySelector("[data-spoller]._spoller-active");
            t &&
              (t.classList.remove("_spoller-active"),
              i(t.nextElementSibling, 500));
          }
          s &&
            s.length &&
            s.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                o(e.itemsArray, e.matchMedia);
              }),
                o(e.itemsArray, e.matchMedia);
            });
        }
      })(),
      (function () {
        const e = document.querySelectorAll("[data-showmore]");
        let t, s;
        function o(e) {
          e.forEach((e) => {
            r(e.itemsArray, e.matchMedia);
          });
        }
        function r(e, t) {
          e.forEach((e) => {
            !(function (e, t = !1) {
              const s = (e = t ? e.item : e).querySelector(
                  "[data-showmore-content]"
                ),
                o = e.querySelector("[data-showmore-button]"),
                r = a(e, s);
              (t.matches || !t) &&
              r <
                (function (e) {
                  let t = e.offsetHeight;
                  e.style.removeProperty("height");
                  let i = e.offsetHeight;
                  return (e.style.height = `${t}px`), i;
                })(s)
                ? (i(s, 0, r), (o.hidden = !1))
                : (n(s, 0, r), (o.hidden = !0));
            })(e, t);
          });
        }
        function a(e, t) {
          let i = 0;
          if ("items" === (e.dataset.showmore ? e.dataset.showmore : "size")) {
            const e = t.dataset.showmoreContent ? t.dataset.showmoreContent : 3,
              n = t.children;
            for (let t = 1; t < n.length; t++) {
              if (((i += n[t - 1].offsetHeight), t === e)) break;
            }
          } else {
            i = t.dataset.showmoreContent ? t.dataset.showmoreContent : 150;
          }
          return i;
        }
        function l(e) {
          const l = e.target,
            c = e.type;
          if ("click" === c) {
            if (l.closest("[data-showmore-button]")) {
              const e = l
                  .closest("[data-showmore-button]")
                  .closest("[data-showmore]"),
                t = e.querySelector("[data-showmore-content]"),
                s = e.dataset.showmoreButton ? e.dataset.showmoreButton : "500",
                o = a(e, t);
              t.classList.contains("_slide") ||
                (e.classList.contains("_showmore-active")
                  ? i(t, s, o)
                  : n(t, s, o),
                e.classList.toggle("_showmore-active"));
            }
          } else "resize" === c && (t.length && r(t), s.length && o(s));
        }
        e.length &&
          ((t = Array.from(e).filter(function (e, t, i) {
            return !e.dataset.showmoreMedia;
          })),
          t.length && r(t),
          document.addEventListener("click", l),
          window.addEventListener("resize", l),
          (s = d(e, "showmoreMedia")),
          s &&
            s.length &&
            (s.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                r(e.itemsArray, e.matchMedia);
              });
            }),
            o(s)));
      })(),
      new t({}),
      (function () {
        const e = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]"
        );
        e.length &&
          e.forEach((e) => {
            e.dataset.placeholder = e.placeholder;
          }),
          document.body.addEventListener("focusin", function (e) {
            const t = e.target;
            if ("INPUT" === t.tagName || "TEXTAREA" === t.tagName) {
              t.dataset.placeholder,
                t.classList.add("_form-focus"),
                t.parentElement.classList.add("_form-focus"),
                h.removeError(t);
              const e = document.querySelectorAll(
                ".input[placeholder],textarea[placeholder]"
              );
              for (let n = 0; n < e.length; n++) {
                const s = e[n].getAttribute("data-value");
                "phone" === t.dataset.mask &&
                  (t.classList.add("_mask"),
                  Inputmask("+7(999)9999999", {
                    clearIncomplete: !0,
                    clearMaskOnLostFocus: !0,
                    onincomplete: function () {
                      i(t, s);
                    },
                  }).mask(t));
              }
              function i(e, t) {
                e.inputmask.remove(), (e.value = t);
              }
            }
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && h.validateInput(t));
          });
      })(),
      (function (e) {
        const t = document.forms;
        if (t.length)
          for (const e of t)
            e.addEventListener("submit", function (e) {
              i(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                h.formClean(t);
              });
        async function i(t, i) {
          if (0 === (e ? h.getErrors(t) : 0)) {
            if (t.hasAttribute("data-ajax")) {
              i.preventDefault();
              const e = t.getAttribute("action")
                  ? t.getAttribute("action").trim()
                  : "#",
                s = t.getAttribute("method")
                  ? t.getAttribute("method").trim()
                  : "GET",
                o = new FormData(t);
              t.classList.add("_sending");
              const r = await fetch(e, { method: s, body: o });
              if (r.ok) {
                await r.json();
                t.classList.remove("_sending"), n(t);
              } else alert("Ошибка"), t.classList.remove("_sending");
            } else t.hasAttribute("data-dev") && (i.preventDefault(), n(t));
          } else {
            i.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && u(e, !0, 1e3);
          }
        }
        function n(e) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } })
          ),
            h.formClean(e),
            l(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0),
      new ye({}),
      (function () {
        function e(e) {
          if ("click" === e.type) {
            const t = e.target;
            if (t.closest("[data-goto]")) {
              const i = t.closest("[data-goto]"),
                n = i.dataset.goto ? i.dataset.goto : "",
                s = !!i.hasAttribute("data-goto-header"),
                o = i.dataset.gotoSpeed ? i.dataset.gotoSpeed : "500";
              u(n, s, o), e.preventDefault();
            }
          } else if ("watcherCallback" === e.type && e.detail) {
            const t = e.detail.entry,
              i = t.target;
            if ("navigator" === i.dataset.watch) {
              const e = i.id,
                n =
                  (document.querySelector("[data-goto]._navigator-active"),
                  document.querySelector(`[data-goto="${e}"]`));
              t.isIntersecting
                ? n && n.classList.add("_navigator-active")
                : n && n.classList.remove("_navigator-active");
            }
          }
        }
        document.addEventListener("click", e),
          document.addEventListener("watcherCallback", e);
      })();
  })();
})();
