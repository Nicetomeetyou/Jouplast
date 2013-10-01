(function (e) {
    var t = function (n, r, i, s, o, u) {
        var a = this;
        var f = t.prototype;
        this.n1Img = n;
        this.s1Img = r;
        this.n2Img = i;
        this.s2Img = s;
        this.firstButton_do;
        this.n1_do;
        this.s1_do;
        this.secondButton_do;
        this.n2_do;
        this.s2_do;
        this.hasTouchSupport_bl = o;
        this.currentState = 1;
        this.isDisabled_bl = false;
        this.isMaximized_bl = false;
        this.disptachMainEvent_bl = u;
        this.init = function () {
            this.setButtonMode(true);
            this.setWidth(this.n1Img.width);
            this.setHeight(this.n1Img.height);
            this.setupMainContainers();
            this.firstButton_do.setX(3e3)
        };
        this.setupMainContainers = function () {
            this.firstButton_do = new FWDDisplayObject("div");
            this.addChild(this.firstButton_do);
            this.n1_do = new FWDDisplayObject("img");
            this.n1_do.setScreen(this.n1Img);
            this.s1_do = new FWDDisplayObject("img");
            this.s1_do.setScreen(this.s1Img);
            this.firstButton_do.addChild(this.s1_do);
            this.firstButton_do.addChild(this.n1_do);
            this.firstButton_do.setWidth(this.n1Img.width);
            this.firstButton_do.setHeight(this.n1Img.height);
            this.secondButton_do = new FWDDisplayObject("div");
            this.addChild(this.secondButton_do);
            this.n2_do = new FWDDisplayObject("img");
            this.n2_do.setScreen(this.n2Img);
            this.s2_do = new FWDDisplayObject("img");
            this.s2_do.setScreen(this.s2Img);
            this.secondButton_do.addChild(this.s2_do);
            this.secondButton_do.addChild(this.n2_do);
            this.secondButton_do.setWidth(this.n2Img.width);
            this.secondButton_do.setHeight(this.n2Img.height);
            this.addChild(this.firstButton_do);
            this.addChild(this.secondButton_do);
            if (this.hasTouchSupport_bl) {
                this.screen.addEventListener("touchend", this.onClick)
            } else if (e.addEventListener) {
                this.screen.addEventListener("mouseover", this.onMouseOver);
                this.screen.addEventListener("mouseout", this.onMouseOut);
                this.screen.addEventListener("click", this.onClick)
            } else {
                this.screen.attachEvent("onmouseover", this.onMouseOver);
                this.screen.attachEvent("onmouseout", this.onMouseOut);
                this.screen.attachEvent("onclick", this.onClick)
            }
        };
        this.onMouseOver = function () {
            TweenMax.killTweensOf(a.n1_do);
            TweenMax.killTweensOf(a.n2_do);
            TweenMax.to(a.n1_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            });
            TweenMax.to(a.n2_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.onMouseOut = function () {
            var e = 0;
            if (a.isMaximized_bl) e = 1;
            TweenMax.to(a.n1_do, .8, {
                alpha: 1,
                delay: e
            });
            TweenMax.to(a.n2_do, .8, {
                alpha: 1,
                delay: e
            })
        };
        this.onClick = function (e) {
            if (a.disptachMainEvent_bl) {
                a.dispatchEvent(t.CLICK)
            } else {
                if (!a.isDisabled_bl) a.toggleButton()
            }
        };
        this.toggleButton = function () {
            if (this.currentState == 1) {
                this.firstButton_do.setX(0);
                this.secondButton_do.setX(3e3);
                this.currentState = 0;
                this.dispatchEvent(t.SECOND_BUTTON_CLICK)
            } else {
                this.firstButton_do.setX(3e3);
                this.secondButton_do.setX(0);
                this.currentState = 1;
                this.dispatchEvent(t.FIRST_BUTTON_CLICK)
            }
        };
        this.setSecondButtonState = function () {
            this.firstButton_do.setX(0);
            this.secondButton_do.setX(3e3);
            this.currentState = 0
        };
        this.destroy = function () {
            if (this.hasTouchSupport_bl) {
                this.screen.removeEventListener("touchend", this.onClick)
            } else if (e.removeEventListener) {
                this.screen.removeEventListener("mouseover", this.onMouseOver);
                this.screen.removeEventListener("mouseout", this.onMouseOut);
                this.screen.removeEventListener("click", this.onClick)
            } else {
                this.screen.detachEvent("onmouseover", this.onMouseOver);
                this.screen.detachEvent("onmouseout", this.onMouseOut);
                this.screen.detachEvent("onclick", this.onClick)
            }
            TweenMax.killTweensOf(this.n1_do);
            TweenMax.killTweensOf(this.n2_do);
            this.firstButton_do.destroy();
            this.n1_do.destroy();
            this.s1_do.destroy();
            this.secondButton_do.destroy();
            this.n2_do.destroy();
            this.s2_do.destroy();
            this.firstButton_do = null;
            this.n1_do = null;
            this.s1_do = null;
            this.secondButton_do = null;
            this.n2_do = null;
            this.s2_do = null;
            this.n1Img = null;
            this.s1Img = null;
            this.n2Img = null;
            this.s2Img = null;
            n = null;
            r = null;
            i = null;
            s = null;
            f.destroy();
            a = null;
            f = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.FIRST_BUTTON_CLICK = "onFirstClick";
    t.SECOND_BUTTON_CLICK = "secondButtonOnClick";
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDComplexButton = t
})(window);
(function (e) {
    var t = function () {
        var n = this;
        var r = t.prototype;
        this.main_do = null;
        this.init = function () {
            this.setupScreen();
            e.onerror = this.showError;
            this.screen.style.zIndex = 10000009;
            setTimeout(this.addConsoleToDom, 100);
            setInterval(this.position, 100)
        };
        this.position = function () {
            var e = FWDUtils.getScrollOffsets();
            n.setX(e.x);
            n.setY(e.y)
        };
        this.addConsoleToDom = function () {
            if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                document.getElementsByTagName("body")[0].appendChild(n.screen)
            } else {
                document.documentElement.appendChild(n.screen)
            }
        };
        this.setupScreen = function () {
            this.main_do = new FWDDisplayObject("div", "absolute");
            this.main_do.setOverflow("auto");
            this.main_do.setWidth(200);
            this.main_do.setHeight(300);
            this.setWidth(200);
            this.setHeight(300);
            this.main_do.setBkColor("#FFFFFF");
            this.addChild(this.main_do)
        };
        this.showError = function (e, t, r) {
            var i = n.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + e + " on line " + r + " for " + t;
            n.main_do.setInnerHTML(i);
            n.main_do.screen.scrollTop = n.main_do.screen.scrollHeight
        };
        this.log = function (e) {
            var t = n.main_do.getInnerHTML() + "<br>" + e;
            n.main_do.setInnerHTML(t);
            n.main_do.getScreen().scrollTop = 1e4
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div", "absolute")
    };
    t.prototype = null;
    e.FWDConsole = t
})(window);
(function () {
    var e = function (e, t) {
        var n = this;
        this.parent = e;
        this.url = "http://www.webdesign-flash.ro";
        this.showMenu = t;
        this.menu_do = null;
        this.normalMenu_do = null;
        this.selectedMenu_do = null;
        this.over_do = null;
        this.init = function () {
            if (this.parent.screen.addEventListener) {
                this.parent.screen.addEventListener("contextmenu", this.contextMenuHandler)
            } else {
                this.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler)
            }
        };
        this.contextMenuHandler = function (e) {
            if (!n.showMenu) {
                if (e.preventDefault) {
                    e.preventDefault()
                } else {
                    return false
                }
                return
            }
            if (n.url.indexOf("sh.r") == -1) return;
            n.setupMenus();
            n.parent.addChild(n.menu_do);
            n.menu_do.setVisible(true);
            n.positionButtons(e);
            if (window.addEventListener) {
                window.addEventListener("mousedown", n.contextMenuWindowOnMouseDownHandler)
            } else {
                document.documentElement.attachEvent("onclick", n.contextMenuWindowOnMouseDownHandler)
            } if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.contextMenuWindowOnMouseDownHandler = function (e) {
            var t = FWDUtils.getViewportMouseCoordinates(e);
            var r = t.screenX;
            var i = t.screenY;
            if (!FWDUtils.hitTest(n.menu_do.screen, r, i)) {
                if (window.removeEventListener) {
                    window.removeEventListener("mousedown", n.contextMenuWindowOnMouseDownHandler)
                } else {
                    document.documentElement.detachEvent("onclick", n.contextMenuWindowOnMouseDownHandler)
                }
                n.menu_do.setVisible(false)
            }
        };
        this.setupMenus = function () {
            if (this.menu_do) return;
            this.menu_do = new FWDDisplayObject("div");
            this.menu_do.getStyle().width = "100%";
            this.normalMenu_do = new FWDDisplayObject("div");
            this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
            this.normalMenu_do.getStyle().padding = "4px";
            this.normalMenu_do.getStyle().fontSize = "12px";
            this.normalMenu_do.getStyle().color = "#000000";
            this.normalMenu_do.setInnerHTML("&#0169; made by FWD");
            this.normalMenu_do.setBkColor("#FFFFFF");
            this.selectedMenu_do = new FWDDisplayObject("div");
            this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
            this.selectedMenu_do.getStyle().padding = "4px";
            this.selectedMenu_do.getStyle().fontSize = "12px";
            this.selectedMenu_do.getStyle().color = "#FFFFFF";
            this.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
            this.selectedMenu_do.setBkColor("#000000");
            this.selectedMenu_do.setAlpha(0);
            this.over_do = new FWDDisplayObject("div");
            this.over_do.setBkColor("#FF0000");
            this.over_do.setAlpha(0);
            this.menu_do.addChild(this.normalMenu_do);
            this.menu_do.addChild(this.selectedMenu_do);
            this.menu_do.addChild(this.over_do);
            this.parent.addChild(this.menu_do);
            this.over_do.setWidth(this.selectedMenu_do.getWidth());
            this.menu_do.setWidth(this.selectedMenu_do.getWidth());
            this.over_do.setHeight(this.selectedMenu_do.getHeight());
            this.menu_do.setHeight(this.selectedMenu_do.getHeight());
            this.menu_do.setVisible(false);
            this.menu_do.setButtonMode(true);
            this.menu_do.screen.onmouseover = this.mouseOverHandler;
            this.menu_do.screen.onmouseout = this.mouseOutHandler;
            this.menu_do.screen.onclick = this.onClickHandler
        };
        this.mouseOverHandler = function () {
            if (n.url.indexOf("w.we") == -1) n.menu_do.visible = false;
            TweenMax.to(n.normalMenu_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            });
            TweenMax.to(n.selectedMenu_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.mouseOutHandler = function () {
            TweenMax.to(n.normalMenu_do, .8, {
                alpha: 1,
                ease: Expo.easeOut
            });
            TweenMax.to(n.selectedMenu_do, .8, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.onClickHandler = function () {
            window.open(n.url, "_blank")
        };
        this.positionButtons = function (e) {
            var t = FWDUtils.getViewportMouseCoordinates(e);
            var r = t.screenX - n.parent.getGlobalX();
            var i = t.screenY - n.parent.getGlobalY();
            var s = r + 2;
            var o = i + 2;
            if (s > n.parent.getWidth() - n.menu_do.getWidth() - 2) {
                s = r - n.menu_do.getWidth() - 2
            }
            if (o > n.parent.getHeight() - n.menu_do.getHeight() - 2) {
                o = i - n.menu_do.getHeight() - 2
            }
            n.menu_do.setX(s);
            n.menu_do.setY(o)
        };
        this.destroy = function () {
            if (window.removeEventListener) {
                window.removeEventListener("mousedown", this.contextMenuWindowOnMouseDownHandler);
                this.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler)
            } else {
                document.documentElement.detachEvent("onclick", this.contextMenuWindowOnMouseDownHandler);
                this.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler)
            } if (this.menu_do) {
                TweenMax.killTweensOf(this.normalMenu_do);
                TweenMax.killTweensOf(this.selectedMenu_do);
                this.normalMenu_do.destroy();
                this.selectedMenu_do.destroy();
                this.over_do.destroy();
                this.menu_do.destroy()
            }
            this.parent = null;
            this.menu_do = null;
            this.normalMenu_do = null;
            this.selectedMenu_do = null;
            this.over_do = null;
            n = null
        };
        this.init()
    };
    e.prototype = null;
    window.FWDContextMenu = e
})(window);
(function (e) {
    var t = function (e) {
        var n = this;
        var r = t.prototype;
        this.mainPreloader_img = null;
        this.lightboxPreloader_img = null;
        this.slideShowPreloader_img = null;
        this.mainLightboxCloseButtonN_img = null;
        this.mainLightboxCloseButtonS_img = null;
        this.lightboxCloseButtonN_img = null;
        this.lightboxCloseButtonS_img = null;
        this.lightboxNextButtonN_img = null;
        this.lightboxNextButtonS_img = null;
        this.lightboxPrevButtonN_img = null;
        this.lightboxPrevButtonS_img = null;
        this.lightboxPlayN_img = null;
        this.lightboxPlayS_img = null;
        this.lightboxPauseN_img = null;
        this.lightboxPauseS_img = null;
        this.lightboxMaximizeN_img = null;
        this.lightboxMaximizeS_img = null;
        this.lightboxMinimizeN_img = null;
        this.lightboxMinimizeS_img = null;
        this.lightboxInfoOpenN_img = null;
        this.lightboxInfoOpenS_img = null;
        this.lightboxInfoCloseN_img = null;
        this.lightboxInfoCloseS_img = null;
        this.fullScreenNN_img = null;
        this.fullScreenNS_img = null;
        this.fullScreenFN_img = null;
        this.fullScreenFS_img = null;
        this.helpScreenAnimationPc_img = null;
        this.helpScreenAnimationMobile_img = null;
        this.helpScreenBackgound_img = null;
        this.helpScreenCloseButtonN_img = null;
        this.helpScreenCloseButtonS_img = null;
        this.props_obj = e;
        this.rootElement_el = null;
        this.graphicsPaths_ar = [];
        this.skin_ar = [];
        this.playListData_ar = [];
        this.links_ar = [];
        this.media_ar = [];
        this.backgroundColor_str;
        this.thumbnailBackgroundColor_str;
        this.thumbnailOverlayBackgroundColor_str;
        this.lightBoxInfoWindowBackgroundColor_str;
        this.lightBoxItemBorderColor_str;
        this.lightBoxItemBackgroundColor_str;
        this.grabIconPath_str;
        this.imageIconPath_str;
        this.videoIconPath_str;
        this.linkIconPath_str;
        this.dragDirection_str;
        this.mouseWheelDirection_str;
        this.thumbnailMaxWidth;
        this.thumbnailMaxHeight;
        this.horizontalSpaceBetweenThumbnails;
        this.verticalSpaceBetweenThumbnails;
        this.thumbnailOverlayOpacity;
        this.countLoadedGraphics = 0;
        this.totalGraphics;
        this.totalThumbnails;
        this.lightBoxInfoWindowBackgroundOpacity;
        this.lightBoxBackgroundOpacity;
        this.lightBoxBorderSize;
        this.lightBoxSlideShowDelay;
        this.parseDelayId_to;
        this.loadImageId_to;
        this.showLightBoxZoomButton_bl;
        this.showLightBoxInfoButton_bl;
        this.showLighBoxSlideShowButton_bl;
        this.slideShowAutoPlay_bl;
        this.addLightBoxKeyboardSupport_bl;
        this.showLighBoxNextAndPrevButtons_bl;
        this.showContextMenu_bl;
        this.hasTouchSupport_bl = FWDUtils.isMobile;
        this.showFullScreenButton_bl;
        this.showThumbnailOverlay_bl;
        this.showThumbnailIcon_bl;
        this.showHelpScreen_bl;
        this.showContextMenu_bl;
        this.addMouseWheelSupport_bl;
        this.init = function () {
            this.parseDelayId_to = setTimeout(n.parseProperties, 100)
        };
        this.parseProperties = function () {
            var e;
            var r;
            if (!n.props_obj.gridPlayListAndSkinId) {
                e = "<font color='#FFFFFF'>gridPlayListAndSkinId</font> property which represents the grid playlist id is not defined in FWDGrid constructor function!";
                n.dispatchEvent(t.LOAD_ERROR, {
                    text: e
                });
                return
            }
            n.rootElement_el = FWDUtils.getChildById(n.props_obj.gridPlayListAndSkinId);
            if (!n.rootElement_el) {
                e = "Make sure that the a div with the id - <font color='#FFFFFF'>" + n.props_obj.gridPlayListAndSkinId + "</font> exists, this represents the data playlist.";
                n.dispatchEvent(t.LOAD_ERROR, {
                    text: e
                });
                return
            }
            n.rootElement_el.style.display = "none";
            var i = FWDUtils.getChildren(n.rootElement_el);
            if (i.length < 2) {
                e = "Both grid skin and grid playlist unorderd lists (ul) must be defined, make sure that in the div with an id <font color='#FFFFFF'>" + n.props_obj.gridListDivId + "</font> you have two unorderd lists(ul), the grid skin and the grid data playlist.";
                n.dispatchEvent(t.LOAD_ERROR, {
                    text: e
                });
                return
            }
            var s = i[0];
            var o = i[1];
            if (!FWDUtils.getChildAt(o, 0)) {
                e = "The playlist dose not have any chidren <ul> element.";
                n.dispatchEvent(t.LOAD_ERROR, {
                    text: e
                });
                return
            }
            var u = FWDUtils.getChildren(o);
            n.totalThumbnails = 0;
            for (var a = 0; a < u.length; a++) {
                var f = {};
                var l = u[a];
                var c = FWDUtils.getChildren(l);
                var h;
                var p = "";
                var d = a;
                h = true;
                for (var v = 0; v < c.length; v++) {
                    p = "data-type";
                    if (FWDUtils.hasAttribute(c[v], "data-type")) {
                        h = false;
                        f.mediaType = FWDUtils.trim(FWDUtils.getAttributeValue(c[v], "data-type"));
                        break
                    }
                }
                if (h) {
                    e = "Element with attribute <font color='#FFFFFF'>" + p + "</font> is not defined at position - <font color='#FFFFFF'>" + d + "</font> in the data playlist ul element.";
                    n.dispatchEvent(t.LOAD_ERROR, {
                        text: e
                    });
                    return
                }
                h = true;
                for (var v = 0; v < c.length; v++) {
                    p = "data-url";
                    if (FWDUtils.hasAttribute(c[v], "data-url")) {
                        h = false;
                        r = c[v];
                        break
                    }
                }
                if (h) {
                    e = "Element with attribute <font color='#FFFFFF'>" + p + "</font> is not defined at position - <font color='#FFFFFF'>" + d + "</font> in the data playlist ul element.";
                    n.dispatchEvent(t.LOAD_ERROR, {
                        text: e
                    });
                    return
                }
                var m = {};
                m.url = FWDUtils.trim(FWDUtils.getAttributeValue(r, "data-url"));
                m.target = FWDUtils.getAttributeValue(r, "data-target");
                m.width = FWDUtils.getAttributeValue(r, "data-width");
                m.height = FWDUtils.getAttributeValue(r, "data-height");
                m.info = FWDUtils.getAttributeValue(r, "data-info");
                if (!m.target) m.target = "_blank";
                for (var v = 0; v < c.length; v++) {
                    if (FWDUtils.hasAttribute(c[v], "data-info")) {
                        m.infoText = c[v].innerHTML;
                        break
                    }
                }
                if (f.mediaType == "media") {
                    n.media_ar.push(m)
                } else {
                    n.links_ar.push(m)
                }
                h = true;
                for (var v = 0; v < c.length; v++) {
                    p = "data-thumbnail-path";
                    if (FWDUtils.hasAttribute(c[v], "data-thumbnail-path")) {
                        h = false;
                        f.thumbPath = FWDUtils.trim(FWDUtils.getAttributeValue(c[v], "data-thumbnail-path"));
                        break
                    }
                }
                if (h) {
                    e = "Element with attribute <font color='#FFFFFF'>" + p + "</font> is not defined at position - <font color='#FFFFFF'>" + d + "</font> in the data playlist ul element.";
                    n.dispatchEvent(t.LOAD_ERROR, {
                        text: e
                    });
                    return
                }
                n.totalThumbnails += 1;
                f.secondObj = m;
                n.playListData_ar[a] = f
            }
            if (n.totalThumbnails < 9) {
                e = "Minimum of <font color='#FFFFFF'>9</font> thumbnails is required!";
                n.dispatchEvent(t.LOAD_ERROR, {
                    text: e
                });
                return
            }
            n.thumbnailMaxWidth = n.props_obj.thumbnailMaxWidth || 280;
            if (n.thumbnailMaxWidth < 20) n.thumbnailMaxWidth = 20;
            n.thumbnailMaxHeight = n.props_obj.thumbnailMaxHeight || 240;
            if (n.thumbnailMaxHeight < 20) n.thumbnailMaxHeight = 20;
            n.horizontalSpaceBetweenThumbnails = n.props_obj.horizontalSpaceBetweenThumbnails || 1;
            n.verticalSpaceBetweenThumbnails = n.props_obj.verticalSpaceBetweenThumbnails || 1;
            n.backgroundColor_str = n.props_obj.backgroundColor || "transparent";
            n.thumbnailBackgroundColor_str = n.props_obj.thumbnailBackgroundColor || "transparent";
            n.thumbnailOverlayBackgroundColor_str = n.props_obj.thumbnailOverlayBackgroundColor || "transparent";
            n.thumbnailOverlayOpacity = n.props_obj.thumbnailOverlayOpacity || 1;
            n.lightBoxInfoWindowBackgroundColor_str = n.props_obj.lightBoxInfoWindowBackgroundColor || "transparent";
            n.lightBoxBackgroundColor_str = n.props_obj.lightBoxBackgroundColor || "transparent";
            n.lightBoxInfoWindowBackgroundOpacity = n.props_obj.lightBoxInfoWindowBackgroundOpacity || 1;
            n.lightBoxBackgroundOpacity = n.props_obj.lightBoxInfoWindowBackgroundOpacity || 1;
            n.lightBoxMainBackgroundOpacity = n.props_obj.lightBoxMainBackgroundOpacity || 1;
            n.lightBoxItemBorderColor_str = n.props_obj.lightBoxItemBorderColor || "transparent";
            n.lightBoxItemBackgroundColor_str = n.props_obj.lightBoxItemBackgroundColor || "transparent";
            n.lightBoxBorderSize = n.props_obj.lightBoxBorderSize || 0;
            n.lightBoxSlideShowDelay = n.props_obj.lightBoxSlideShowDelay * 1e3 || 3e3;
            n.mouseWheelDirection_str = n.props_obj.mouseWheelDirection || "horizontal";
            n.dragDirection_str = n.props_obj.dragDirection;
            if (!n.dragDirection_str) n.dragDirection_str = "both";
            n.addMouseWheelSupport_bl = n.props_obj.addMouseWheelSupport;
            n.addMouseWheelSupport_bl = n.addMouseWheelSupport_bl == "yes" ? true : false;
            n.showFullScreenButton_bl = n.props_obj.showFullScreenButton;
            n.showFullScreenButton_bl = n.showFullScreenButton_bl == "no" ? false : true;
            n.showThumbnailOverlay_bl = n.props_obj.showThumbnailOverlay;
            n.showThumbnailOverlay_bl = n.showThumbnailOverlay_bl == "no" ? false : true;
            if (n.hasTouchSupport_bl) n.showThumbnailOverlay_bl = false;
            n.showThumbnailIcon_bl = n.props_obj.showThumbnailIcon;
            n.showThumbnailIcon_bl = n.showThumbnailIcon_bl == "no" ? false : true;
            if (n.hasTouchSupport_bl) n.showThumbnailIcon_bl = false;
            n.showHelpScreen_bl = n.props_obj.showHelpScreen;
            n.showHelpScreen_bl = n.showHelpScreen_bl == "no" ? false : true;
            n.showContextMenu_bl = n.props_obj.showContextMenu;
            n.showContextMenu_bl = n.showContextMenu_bl == "no" ? false : true;
            n.addLightBoxKeyboardSupport_bl = n.props_obj.addLightBoxKeyboardSupport;
            n.addLightBoxKeyboardSupport_bl = n.addLightBoxKeyboardSupport_bl == "no" ? false : true;
            n.showLighBoxNextAndPrevButtons_bl = n.props_obj.showLightBoxNextAndPrevButtons;
            n.showLighBoxNextAndPrevButtons_bl = n.showLighBoxNextAndPrevButtons_bl == "no" ? false : true;
            n.showContextMenu_bl = n.props_obj.showContextMenu;
            n.showContextMenu_bl = n.showContextMenu_bl == "no" ? false : true;
            n.showLightBoxZoomButton_bl = n.props_obj.showLightBoxZoomButton;
            n.showLightBoxZoomButton_bl = n.showLightBoxZoomButton_bl == "no" ? false : true;
            n.showLightBoxInfoButton_bl = n.props_obj.showLightBoxInfoButton;
            n.showLightBoxInfoButton_bl = n.showLightBoxInfoButton_bl == "no" ? false : true;
            n.showLighBoxSlideShowButton_bl = n.props_obj.showLighBoxSlideShowButton;
            n.showLighBoxSlideShowButton_bl = n.showLighBoxSlideShowButton_bl == "no" ? false : true;
            n.slideShowAutoPlay_bl = n.props_obj.slideShowAutoPlay;
            n.slideShowAutoPlay_bl = n.slideShowAutoPlay_bl == "yes" ? true : false;
            var g = n.checkForAttribute(s, "data-preloader-path");
            if (!g) return;
            var y = n.checkForAttribute(s, "data-slideshow-preloader-path");
            if (!y) return;
            var b = n.checkForAttribute(s, "data-main-lightbox-close-button-normal-path");
            if (!b) return;
            var w = n.checkForAttribute(s, "data-main-lightbox-close-button-selected-path");
            if (!w) return;
            var E = n.checkForAttribute(s, "data-fullscreen-button-normal-normal-path");
            if (!E) return;
            var S = n.checkForAttribute(s, "data-fullscreen-button-normal-selected-path");
            if (!S) return;
            var x = n.checkForAttribute(s, "data-fullscreen-button-full-normal-path");
            if (!x) return;
            var T = n.checkForAttribute(s, "data-fullscreen-button-full-selected-path");
            if (!T) return;
            var N = n.checkForAttribute(s, "data-pc-help-screen-animation-path");
            if (!N) return;
            var C = n.checkForAttribute(s, "data-mobile-help-animation-screen-path");
            if (!C) return;
            var k = n.checkForAttribute(s, "data-help-screen-background-path");
            if (!k) return;
            var L = n.checkForAttribute(s, "data-help-screen-close-button-normal-path");
            if (!L) return;
            var A = n.checkForAttribute(s, "data-help-screen-close-button-selected-path");
            if (!A) return;
            n.grabIconPath_str = n.checkForAttribute(s, "data-grabhand-path");
            if (!n.grabIconPath_str) return;
            n.imageIconPath_str = n.checkForAttribute(s, "data-image-icon-path");
            if (!n.imageIconPath_str) return;
            n.videoIconPath_str = n.checkForAttribute(s, "data-video-icon-path");
            if (!n.videoIconPath_str) return;
            n.linkIconPath_str = n.checkForAttribute(s, "data-link-icon-path");
            if (!n.linkIconPath_str) return;
            var O = n.checkForAttribute(s, "data-lightbox-close-button-normal-path");
            if (!O) return;
            var M = n.checkForAttribute(s, "data-lightbox-close-button-selected-path");
            if (!M) return;
            var _ = n.checkForAttribute(s, "data-lightbox-next-button-normal-path");
            if (!_) return;
            var D = n.checkForAttribute(s, "data-lightbox-next-button-selected-path");
            if (!D) return;
            var P = n.checkForAttribute(s, "data-lightbox-prev-button-normal-path");
            if (!P) return;
            var H = n.checkForAttribute(s, "data-lightbox-prev-button-selected-path");
            if (!H) return;
            var B = n.checkForAttribute(s, "data-lightbox-play-button-normal-path");
            if (!B) return;
            var j = n.checkForAttribute(s, "data-lightbox-play-button-selected-path");
            if (!j) return;
            var F = n.checkForAttribute(s, "data-lightbox-pause-button-normal-path");
            if (!F) return;
            var I = n.checkForAttribute(s, "data-lightbox-pause-button-selected-path");
            if (!I) return;
            var q = n.checkForAttribute(s, "data-lightbox-maximize-button-normal-path");
            if (!q) return;
            var R = n.checkForAttribute(s, "data-lightbox-maximize-button-selected-path");
            if (!R) return;
            var U = n.checkForAttribute(s, "data-lightbox-minimize-button-normal-path");
            if (!U) return;
            var z = n.checkForAttribute(s, "data-lightbox-minimize-button-selected-path");
            if (!z) return;
            var W = n.checkForAttribute(s, "data-lightbox-info-button-open-normal-path");
            if (!W) return;
            var X = n.checkForAttribute(s, "data-lightbox-info-button-open-selected-path");
            if (!X) return;
            var V = n.checkForAttribute(s, "data-lightbox-info-button-close-normal-path");
            if (!V) return;
            var $ = n.checkForAttribute(s, "data-lightbox-info-button-close-selected-path");
            if (!$) return;
            for (var a = 0; a < n.playListData_ar.length; a++) {
                f = n.playListData_ar[a];
                if (f.mediaType == "media") {
                    var J = f.secondObj.url.indexOf(".jpg") != -1 || f.secondObj.url.indexOf(".png") != -1;
                    if (J) {
                        f.thumbIconPath = n.imageIconPath_str
                    } else {
                        f.thumbIconPath = n.videoIconPath_str
                    }
                } else {
                    f.thumbIconPath = n.linkIconPath_str
                }
            }
            n.graphicsPaths_ar.push(g);
            n.graphicsPaths_ar.push(g);
            n.graphicsPaths_ar.push(b);
            n.graphicsPaths_ar.push(w);
            n.graphicsPaths_ar.push(E);
            n.graphicsPaths_ar.push(S);
            n.graphicsPaths_ar.push(x);
            n.graphicsPaths_ar.push(T);
            n.graphicsPaths_ar.push(k);
            n.graphicsPaths_ar.push(L);
            n.graphicsPaths_ar.push(A);
            n.graphicsPaths_ar.push(N);
            n.graphicsPaths_ar.push(C);
            n.graphicsPaths_ar.push(O);
            n.graphicsPaths_ar.push(M);
            n.graphicsPaths_ar.push(_);
            n.graphicsPaths_ar.push(D);
            n.graphicsPaths_ar.push(P);
            n.graphicsPaths_ar.push(H);
            n.graphicsPaths_ar.push(B);
            n.graphicsPaths_ar.push(j);
            n.graphicsPaths_ar.push(F);
            n.graphicsPaths_ar.push(I);
            n.graphicsPaths_ar.push(q);
            n.graphicsPaths_ar.push(R);
            n.graphicsPaths_ar.push(U);
            n.graphicsPaths_ar.push(z);
            n.graphicsPaths_ar.push(W);
            n.graphicsPaths_ar.push(X);
            n.graphicsPaths_ar.push(V);
            n.graphicsPaths_ar.push($);
            n.graphicsPaths_ar.push(y);
            n.graphicsPaths_ar.push(n.imageIconPath_str);
            n.graphicsPaths_ar.push(n.videoIconPath_str);
            n.graphicsPaths_ar.push(n.linkIconPath_str);
            n.totalGraphics = n.graphicsPaths_ar.length;
            n.loadGraphics()
        };
        this.checkForAttribute = function (e, r) {
            var i = FWDUtils.getChildFromAttribute(e, r);
            i = i ? FWDUtils.trim(FWDUtils.getAttributeValue(i, r)) : undefined;
            if (!i) {
                n.dispatchEvent(t.LOAD_ERROR, {
                    text: "Element  with attribute <font color='#FFFFFF'>" + r + "</font> is not defined."
                });
                return
            }
            return i
        };
        this.stopToLoad = function () {
            clearTimeout(this.loadImageId_to);
            if (n.image_img) {
                this.image_img.onload = null;
                this.image_img.onerror = null
            }
        };
        this.loadGraphics = function () {
            if (n.image_img) {
                n.image_img.onload = null;
                n.image_img.onerror = null
            }
            var e = n.graphicsPaths_ar[n.countLoadedGraphics];
            n.image_img = new Image;
            n.image_img.onload = n.onImageLoadHandler;
            n.image_img.onerror = n.onImageLoadErrorHandler;
            n.image_img.src = e
        };
        this.onImageLoadHandler = function (e) {
            if (n.countLoadedGraphics == 0) {
                n.mainPreloader_img = n.image_img;
                n.dispatchEvent(t.PRELOADER_LOAD_DONE)
            } else if (n.countLoadedGraphics == 1) {
                n.lightboxPreloader_img = n.image_img
            } else if (n.countLoadedGraphics == 2) {
                n.mainLightboxCloseButtonN_img = n.image_img
            } else if (n.countLoadedGraphics == 3) {
                n.mainLightboxCloseButtonS_img = n.image_img;
                n.dispatchEvent(t.LIGHBOX_CLOSE_BUTTON_LOADED)
            } else if (n.countLoadedGraphics == 4) {
                n.fullScreenNN_img = n.image_img
            } else if (n.countLoadedGraphics == 5) {
                n.fullScreenNS_img = n.image_img
            } else if (n.countLoadedGraphics == 6) {
                n.fullScreenFN_img = n.image_img
            } else if (n.countLoadedGraphics == 7) {
                n.fullScreenFS_img = n.image_img
            } else if (n.countLoadedGraphics == 8) {
                n.helpScreenBackgound_img = n.image_img
            } else if (n.countLoadedGraphics == 9) {
                n.helpScreenCloseButtonN_img = n.image_img
            } else if (n.countLoadedGraphics == 10) {
                n.helpScreenCloseButtonS_img = n.image_img
            } else if (n.countLoadedGraphics == 11) {
                n.helpScreenAnimationPc_img = n.image_img
            } else if (n.countLoadedGraphics == 12) {
                n.helpScreenAnimationMobile_img = n.image_img
            } else if (n.countLoadedGraphics == 13) {
                n.lightboxCloseButtonN_img = n.image_img
            } else if (n.countLoadedGraphics == 14) {
                n.lightboxCloseButtonS_img = n.image_img
            } else if (n.countLoadedGraphics == 15) {
                n.lightboxNextButtonN_img = n.image_img
            } else if (n.countLoadedGraphics == 16) {
                n.lightboxNextButtonS_img = n.image_img
            } else if (n.countLoadedGraphics == 17) {
                n.lightboxPrevButtonN_img = n.image_img
            } else if (n.countLoadedGraphics == 18) {
                n.lightboxPrevButtonS_img = n.image_img
            } else if (n.countLoadedGraphics == 19) {
                n.lightboxPlayN_img = n.image_img
            } else if (n.countLoadedGraphics == 20) {
                n.lightboxPlayS_img = n.image_img
            } else if (n.countLoadedGraphics == 21) {
                n.lightboxPauseN_img = n.image_img
            } else if (n.countLoadedGraphics == 22) {
                n.lightboxPauseS_img = n.image_img
            } else if (n.countLoadedGraphics == 23) {
                n.lightboxMaximizeN_img = n.image_img
            } else if (n.countLoadedGraphics == 24) {
                n.lightboxMaximizeS_img = n.image_img
            } else if (n.countLoadedGraphics == 25) {
                n.lightboxMinimizeN_img = n.image_img
            } else if (n.countLoadedGraphics == 26) {
                n.lightboxMinimizeS_img = n.image_img
            } else if (n.countLoadedGraphics == 27) {
                n.lightboxInfoOpenN_img = n.image_img
            } else if (n.countLoadedGraphics == 28) {
                n.lightboxInfoOpenS_img = n.image_img
            } else if (n.countLoadedGraphics == 29) {
                n.lightboxInfoCloseN_img = n.image_img
            } else if (n.countLoadedGraphics == 30) {
                n.lightboxInfoCloseS_img = n.image_img
            } else if (n.countLoadedGraphics == 31) {
                n.slideShowPreloader_img = n.image_img
            }
            n.countLoadedGraphics++;
            if (n.countLoadedGraphics < n.totalGraphics) {
                n.loadImageId_to = setTimeout(n.loadGraphics, 16)
            } else {
                n.dispatchEvent(t.LOAD_DONE)
            }
        };
        this.onImageLoadErrorHandler = function (e) {
            var r = "The skin graphics with the label <font color='#FFFFFF'>" + n.graphicsPaths_ar[n.countLoadedGraphics] + "</font> can't be loaded, make sure that the image exists and the path is correct!";
            console.log(e);
            var i = {
                text: r
            };
            n.dispatchEvent(t.LOAD_ERROR, i)
        };
        this.destroy = function () {
            clearTimeout(this.parseDelayId_to);
            clearTimeout(this.loadImageId_to);
            if (this.image_img) {
                this.image_img.onload = null;
                this.image_img.onerror = null;
                this.image_img.src = null
            }
            if (this.mainPreloader_img) this.mainPreloader_img.src = null;
            if (this.lightboxPreloader_img) this.lightboxPreloader_img.src = null;
            if (this.mainLightboxCloseButtonN_img) this.mainLightboxCloseButtonN_img.src = null;
            if (this.mainLightboxCloseButtonS_img) this.mainLightboxCloseButtonS_img.src = null;
            if (this.fullScreenNN_img) this.fullScreenNN_img.src = null;
            if (this.fullScreenNS_img) this.fullScreenNS_img.src = null;
            if (this.fullScreenFN_img) this.fullScreenFN_img.src = null;
            if (this.fullScreenFS_img) this.fullScreenFS_img.src = null;
            if (this.helpScreenAnimationPc_img) this.helpScreenAnimationPc_img.src = null;
            if (this.helpScreenAnimationMobile_img) this.helpScreenAnimationMobile_img.src = null;
            if (this.helpScreenBackgound_img) this.helpScreenBackgound_img.src = null;
            if (this.helpScreenCloseButtonN_img) this.helpScreenCloseButtonN_img.src = null;
            if (this.helpScreenCloseButtonS_img) this.helpScreenCloseButtonS_img.src = null;
            if (this.lightboxCloseButtonN_img) this.lightboxCloseButtonN_img.src = null;
            if (this.lightboxCloseButtonS_img) this.lightboxCloseButtonS_img.src = null;
            if (this.lightboxNextButtonN_img) this.lightboxNextButtonN_img.src = null;
            if (this.lightboxNextButtonS_img) this.lightboxNextButtonS_img.src = null;
            if (this.lightboxPrevButtonN_img) this.lightboxPrevButtonN_img.src = null;
            if (this.lightboxPrevButtonS_img) this.lightboxPrevButtonS_img.src = null;
            if (this.lightboxPlayN_img) this.lightboxPlayN_img.src = null;
            if (this.lightboxPlayS_img) this.lightboxPlayS_img.src = null;
            if (this.lightboxPauseN_img) this.lightboxPauseN_img.src = null;
            if (this.lightboxPauseS_img) this.lightboxPauseS_img.src = null;
            if (this.lightboxMaximizeN_img) this.lightboxMaximizeN_img.src = null;
            if (this.lightboxMaximizeS_img) this.lightboxMaximizeS_img.src = null;
            if (this.lightboxMinimizeN_img) this.lightboxMinimizeN_img.src = null;
            if (this.lightboxMinimizeS_img) this.lightboxMinimizeS_img.src = null;
            if (this.lightboxInfoOpenN_img) this.lightboxInfoOpenN_img.src = null;
            if (this.lightboxInfoOpenS_img) this.lightboxInfoOpenS_img.src = null;
            if (this.lightboxInfoCloseN_img) this.lightboxInfoCloseN_img.src = null;
            if (this.lightboxInfoCloseS_img) this.lightboxInfoCloseS_img.src = null;
            this.mainPreloader_img = null;
            this.lightboxPreloader_img = null;
            this.mainLightboxCloseButtonN_img = null;
            this.mainLightboxCloseButtonS_img = null;
            this.fullScreenNN_img = null;
            this.fullScreenNS_img = null;
            this.fullScreenFN_img = null;
            this.fullScreenFS_img = null;
            this.helpScreenAnimationPc_img = null;
            this.helpScreenAnimationMobile_img = null;
            this.helpScreenBackgound_img = null;
            this.helpScreenCloseButtonN_img = null;
            this.helpScreenCloseButtonS_img = null;
            this.lightboxCloseButtonN_img = null;
            this.lightboxCloseButtonS_img = null;
            this.lightboxNextButtonN_img = null;
            this.lightboxNextButtonS_img = null;
            this.lightboxPrevButtonN_img = null;
            this.lightboxPrevButtonS_img = null;
            this.lightboxPlayN_img = null;
            this.lightboxPlayS_img = null;
            this.lightboxPauseN_img = null;
            this.lightboxPauseS_img = null;
            this.lightboxMaximizeN_img = null;
            this.lightboxMaximizeS_img = null;
            this.lightboxMinimizeN_img = null;
            this.lightboxMinimizeS_img = null;
            this.lightboxInfoOpenN_img = null;
            this.lightboxInfoOpenS_img = null;
            this.lightboxInfoCloseN_img = null;
            this.lightboxInfoCloseS_img = null;
            this.image_img = null;
            this.props_obj = null;
            this.rootElement_el = null;
            this.graphicsPaths_ar = null;
            this.skin_ar = null;
            this.playListData_ar = null;
            this.links_ar = null;
            this.media_ar = null;
            this.backgroundColor_str = null;
            this.thumbnailBackgroundColor_str = null;
            this.thumbnailOverlayBackgroundColor_str = null;
            this.lightBoxInfoWindowBackgroundColor_str = null;
            this.lightBoxItemBorderColor_str = null;
            this.lightBoxItemBackgroundColor_str = null;
            this.grabIconPath_str = null;
            this.imageIconPath_str = null;
            this.videoIconPath_str = null;
            this.linkIconPath_str = null;
            this.dragDirection_str = null;
            this.mouseWheelDirection_str = null;
            r.destroy();
            n = null;
            r = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDEventDispatcher
    };
    t.prototype = null;
    t.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
    t.LOAD_DONE = "onLoadDone";
    t.LOAD_ERROR = "onLoadError";
    t.LIGHBOX_CLOSE_BUTTON_LOADED = "onLightBoxCloseButtonLoadDone";
    e.FWDData = t
})(window);
(function (e) {
    var t = function (e, t, n, r) {
        this.listeners = {
            events_ar: []
        };
        var i = this;
        if (e == "div" || e == "img" || e == "canvas") {
            this.type = e
        } else {
            throw Error("Type is not valid! " + e)
        }
        this.children_ar = [];
        this.style;
        this.screen;
        this.transform;
        this.position = t || "absolute";
        this.overflow = n || "hidden";
        this.display = r || "block";
        this.visible = true;
        this.buttonMode;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.rect;
        this.alpha = 1;
        this.innerHTML = "";
        this.opacityType = "";
        this.isHtml5_bl = false;
        this.hasTransform3d_bl = FWDUtils.hasTransform3d;
        this.hasTransform2d_bl = FWDUtils.hasTransform2d;
        if (FWDUtils.isFirefox || FWDUtils.isIE) this.hasTransform3d_bl = false;
        if (FWDUtils.isFirefox || FWDUtils.isIE) this.hasTransform2d_bl = false;
        this.hasBeenSetSelectable_bl = false;
        this.init = function () {
            this.setScreen()
        };
        this.getTransform = function () {
            var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform"];
            var t;
            while (t = e.shift()) {
                if (typeof this.screen.style[t] !== "undefined") {
                    return t
                }
            }
            return false
        };
        this.getOpacityType = function () {
            var e;
            if (typeof this.screen.style.opacity != "undefined") {
                e = "opacity"
            } else {
                e = "filter"
            }
            return e
        };
        this.setScreen = function (e) {
            if (this.type == "img" && e) {
                this.screen = e;
                this.setMainProperties()
            } else {
                this.screen = document.createElement(this.type);
                this.setMainProperties()
            }
        };
        this.setMainProperties = function () {
            this.transform = this.getTransform();
            this.setPosition(this.position);
            this.setDisplay(this.display);
            this.setOverflow(this.overflow);
            this.opacityType = this.getOpacityType();
            if (this.opacityType == "opacity") this.isHtml5_bl = true;
            if (this.opacityType == "filter") this.screen.style.filter = "inherit";
            this.screen.style.left = "0px";
            this.screen.style.top = "0px";
            this.screen.style.margin = "0px";
            this.screen.style.padding = "0px";
            this.screen.style.maxWidth = "none";
            this.screen.style.maxHeight = "none";
            this.screen.style.border = "none";
            this.screen.style.lineHeight = "1";
            this.screen.style.backgroundColor = "transparent";
            this.screen.style.backfaceVisibility = "hidden";
            this.screen.style.webkitBackfaceVisibility = "hidden";
            this.screen.style.MozBackfaceVisibility = "hidden";
            this.screen.style.MozImageRendering = "optimizeSpeed";
            this.screen.style.WebkitImageRendering = "optimizeSpeed";
            if (e == "img") {
                this.setWidth(this.screen.width);
                this.setHeight(this.screen.height)
            }
        };
        this.setBackfaceVisibility = function () {
            this.screen.style.backfaceVisibility = "visible";
            this.screen.style.webkitBackfaceVisibility = "visible";
            this.screen.style.MozBackfaceVisibility = "visible"
        };
        this.setSelectable = function (e) {
            if (!e) {
                try {
                    this.screen.style.userSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.MozUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.webkitUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.khtmlUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.oUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.style.msUserSelect = "none"
                } catch (t) {}
                try {
                    this.screen.msUserSelect = "none"
                } catch (t) {}
                this.screen.ondragstart = function (e) {
                    return false
                };
                this.screen.onselectstart = function () {
                    return false
                };
                this.screen.style.webkitTouchCallout = "none";
                this.hasBeenSetSelectable_bl = true
            }
        };
        this.getScreen = function () {
            return i.screen
        };
        this.setVisible = function (e) {
            this.visible = e;
            if (this.visible == true) {
                this.screen.style.visibility = "visible"
            } else {
                this.screen.style.visibility = "hidden"
            }
        };
        this.getVisible = function () {
            return this.visible
        };
        this.setResizableSizeAfterParent = function () {
            this.screen.style.width = "100%";
            this.screen.style.height = "100%"
        };
        this.getStyle = function () {
            return this.screen.style
        };
        this.setOverflow = function (e) {
            i.overflow = e;
            i.screen.style.overflow = i.overflow
        };
        this.setPosition = function (e) {
            i.position = e;
            i.screen.style.position = i.position
        };
        this.setDisplay = function (e) {
            this.display = e;
            this.screen.style.display = this.display
        };
        this.setButtonMode = function (e) {
            this.buttonMode = e;
            if (this.buttonMode == true) {
                this.screen.style.cursor = "pointer"
            } else {
                this.screen.style.cursor = "default"
            }
        };
        this.setBkColor = function (e) {
            i.screen.style.backgroundColor = e
        };
        this.setInnerHTML = function (e) {
            i.innerHTML = e;
            i.screen.innerHTML = i.innerHTML
        };
        this.getInnerHTML = function () {
            return i.innerHTML
        };
        this.getRect = function () {
            return i.screen.getBoundingClientRect()
        };
        this.setAlpha = function (e) {
            i.alpha = e;
            if (i.opacityType == "opacity") {
                i.screen.style.opacity = i.alpha
            } else if (i.opacityType == "filter") {
                i.screen.style.filter = "alpha(opacity=" + i.alpha * 100 + ")";
                i.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(i.alpha * 100) + ")"
            }
        };
        this.getAlpha = function () {
            return i.alpha
        };
        this.getRect = function () {
            return this.screen.getBoundingClientRect()
        };
        this.getGlobalX = function () {
            return this.getRect().left
        };
        this.getGlobalY = function () {
            return this.getRect().top
        };
        this.setX = function (e) {
            i.x = e;
            if (i.hasTransform3d_bl) {
                i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)"
            } else if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)"
            } else {
                i.screen.style.left = i.x + "px"
            }
        };
        this.getX = function () {
            return i.x
        };
        this.setY = function (e) {
            i.y = e;
            if (i.hasTransform3d_bl) {
                i.screen.style[i.transform] = "translate3d(" + i.x + "px," + i.y + "px,0)"
            } else if (i.hasTransform2d_bl) {
                i.screen.style[i.transform] = "translate(" + i.x + "px," + i.y + "px)"
            } else {
                i.screen.style.top = i.y + "px"
            }
        };
        this.getY = function () {
            return i.y
        };
        this.setWidth = function (e) {
            i.w = e;
            if (i.type == "img") {
                i.screen.width = i.w
            } else {
                i.screen.style.width = i.w + "px"
            }
        };
        this.getWidth = function () {
            if (i.type == "div") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            } else if (i.type == "img") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                if (i.screen.width != 0) return i.screen.width;
                return i._w
            } else if (i.type == "canvas") {
                if (i.screen.offsetWidth != 0) return i.screen.offsetWidth;
                return i.w
            }
        };
        this.setHeight = function (e) {
            i.h = e;
            if (i.type == "img") {
                i.screen.height = i.h
            } else {
                i.screen.style.height = i.h + "px"
            }
        };
        this.getHeight = function () {
            if (i.type == "div") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            } else if (i.type == "img") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                if (i.screen.height != 0) return i.screen.height;
                return i.h
            } else if (i.type == "canvas") {
                if (i.screen.offsetHeight != 0) return i.screen.offsetHeight;
                return i.h
            }
        };
        this.addChild = function (e) {
            if (this.contains(e)) {
                this.children_ar.splice(FWDUtils.indexOfArray(this.children_ar, e), 1);
                this.children_ar.push(e);
                this.screen.appendChild(e.screen)
            } else {
                this.children_ar.push(e);
                this.screen.appendChild(e.screen)
            }
        };
        this.removeChild = function (e) {
            if (this.contains(e)) {
                this.children_ar.splice(FWDUtils.indexOfArray(this.children_ar, e), 1);
                this.screen.removeChild(e.screen)
            } else {
                throw Error("##removeChild()## Child dose't exist, it can't be removed!")
            }
        };
        this.contains = function (e) {
            if (FWDUtils.indexOfArray(this.children_ar, e) == -1) {
                return false
            } else {
                return true
            }
        };
        this.addChildAt = function (e, t) {
            if (this.getNumChildren() == 0) {
                this.children_ar.push(e);
                this.screen.appendChild(e.screen)
            } else if (t == 1) {
                this.screen.insertBefore(e.screen, this.children_ar[0].screen);
                this.screen.insertBefore(this.children_ar[0].screen, e.screen);
                if (this.contains(e)) {
                    this.children_ar.splice(FWDUtils.indexOfArray(this.children_ar, e), 1, e)
                } else {
                    this.children_ar.splice(FWDUtils.indexOfArray(this.children_ar, e), 0, e)
                }
            } else {
                if (t < 0 || t > this.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
                this.screen.insertBefore(e.screen, this.children_ar[t].screen);
                if (this.contains(e)) {
                    this.children_ar.splice(FWDUtils.indexOfArray(this.children_ar, e), 1, e)
                } else {
                    this.children_ar.splice(FWDUtils.indexOfArray(this.children_ar, e), 0, e)
                }
            }
        };
        this.getChildAt = function (e) {
            if (e < 0 || e > this.getNumChildren() - 1) throw Error("##getChildAt()## Index out of bounds!");
            if (this.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
            return this.children_ar[e]
        };
        this.removeChildAtZero = function () {
            this.screen.removeChild(this.children_ar[0].screen);
            this.children_ar.shift()
        };
        this.getNumChildren = function () {
            return i.children_ar.length
        };
        this.addListener = function (e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function (e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n]);
                    break
                }
            }
        };
        this.removeListener = function (e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        };
        this.disposeImage = function () {
            if (this.type == "img") this.screen.src = null
        };
        this.destroy = function () {
            if (this.hasBeenSetSelectable_bl) {
                this.screen.ondragstart = null;
                this.screen.onselectstart = null
            }
            this.listeners = [];
            this.listeners = null;
            this.children_ar = [];
            this.children_ar = null;
            this.style = null;
            this.screen = null;
            this.transform = null;
            this.position = null;
            this.overflow = null;
            this.display = null;
            this.visible = null;
            this.buttonMode = null;
            this.x = null;
            this.y = null;
            this.w = null;
            this.h = null;
            this.rect = null;
            this.alpha = null;
            this.innerHTML = null;
            this.opacityType = null;
            this.isHtml5_bl = null;
            this.hasTransform3d_bl = null;
            this.hasTransform2d_bl = null;
            i = null
        };
        this.init()
    };
    e.FWDDisplayObject = t
})(window);
(function () {
    var e = function () {
        this.listeners = {
            events_ar: []
        };
        this.destroy = function () {
            this.listeners = null
        };
        this.addListener = function (e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function.");
            var n = {};
            n.type = e;
            n.listener = t;
            n.target = this;
            this.listeners.events_ar.push(n)
        };
        this.dispatchEvent = function (e, t) {
            if (this.listeners == null) return;
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e) {
                    if (t) {
                        for (var i in t) {
                            this.listeners.events_ar[n][i] = t[i]
                        }
                    }
                    this.listeners.events_ar[n].listener.call(this, this.listeners.events_ar[n])
                }
            }
        };
        this.removeListener = function (e, t) {
            if (e == undefined) throw Error("type is required.");
            if (typeof e === "object") throw Error("type must be of type String.");
            if (typeof t != "function") throw Error("listener must be of type Function." + e);
            for (var n = 0, r = this.listeners.events_ar.length; n < r; n++) {
                if (this.listeners.events_ar[n].target === this && this.listeners.events_ar[n].type === e && this.listeners.events_ar[n].listener === t) {
                    this.listeners.events_ar.splice(n, 1);
                    break
                }
            }
        }
    };
    window.FWDEventDispatcher = e
})(window);
(function (e) {
    var t = function (e, n, r, i, s, o) {
        var u = this;
        var a = t.prototype;
        this.mainHolder_do = null;
        this.normalButton_do = null;
        this.fullButton_do = null;
        this.normalImageNormalState_do;
        this.normalImageSelectedState_do;
        this.fullImageNormalState_do;
        this.fullImageSelectedState_do;
        this.dysplayType_str = o;
        this.margins = s;
        this.buttonWidth = e.width;
        this.buttonHeight = e.height;
        this.isFullScreen_bl = false;
        this.isOutOfTheWay = false;
        this.hasTouch_bl = FWDUtils.isMobile;
        this.init = function () {
            this.setOverflow("visible");
            this.setWidth(this.buttonWidth);
            this.setHeight(this.buttonHeight);
            this.setupButtons();
            this.setButtonsState();
            this.hide(false)
        };
        this.setupButtons = function () {
            this.mainHolder_do = new FWDDisplayObject("div");
            this.mainHolder_do.setWidth(this.buttonWidth);
            this.mainHolder_do.setHeight(this.buttonHeight);
            this.mainHolder_do.setButtonMode(true);
            this.addChild(this.mainHolder_do);
            this.normalImageNormalState_do = new FWDDisplayObject("img");
            this.normalImageNormalState_do.setScreen(e);
            this.normalImageSelectedState_do = new FWDDisplayObject("img");
            this.normalImageSelectedState_do.setScreen(n);
            this.fullImageNormalState_do = new FWDDisplayObject("img");
            this.fullImageNormalState_do.setScreen(r);
            this.fullImageSelectedState_do = new FWDDisplayObject("img");
            this.fullImageSelectedState_do.setScreen(i);
            this.normalButton_do = new FWDDisplayObject("div");
            this.normalButton_do.setWidth(this.buttonWidth);
            this.normalButton_do.setHeight(this.buttonHeight);
            this.normalImageSelectedState_do.setAlpha(0);
            this.normalButton_do.addChild(this.normalImageNormalState_do);
            this.normalButton_do.addChild(this.normalImageSelectedState_do);
            this.mainHolder_do.addChild(this.normalButton_do);
            this.fullButton_do = new FWDDisplayObject("div");
            this.fullButton_do.setWidth(this.buttonWidth);
            this.fullButton_do.setHeight(this.buttonHeight);
            this.fullImageSelectedState_do.setAlpha(0);
            this.fullButton_do.addChild(this.fullImageNormalState_do);
            this.fullButton_do.addChild(this.fullImageSelectedState_do);
            this.mainHolder_do.addChild(this.fullButton_do);
            if (this.dysplayType_str == FWDInfiniteGrid.LIGHTBOX) this.mainHolder_do.screen.ontouchstart = this.buttonOnTouchStart;
            this.mainHolder_do.screen.onmouseover = this.buttonOnMouseOver;
            this.mainHolder_do.screen.onmouseout = this.buttonOnMouseOut;
            this.mainHolder_do.screen.onclick = this.buttonOnMouseUp
        };
        this.buttonOnMouseOver = function (e) {
            if (FWDData.hasTouchStarted_bl) return;
            TweenMax.to(u.normalImageSelectedState_do, .6, {
                alpha: 1,
                ease: Expo.easeOut
            });
            TweenMax.to(u.fullImageSelectedState_do, .6, {
                alpha: 1,
                ease: Expo.easeOut
            })
        };
        this.buttonOnMouseOut = function (e) {
            if (FWDData.hasTouchStarted_bl) return;
            TweenMax.to(u.normalImageSelectedState_do, .6, {
                alpha: 0
            });
            TweenMax.to(u.fullImageSelectedState_do, .6, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.buttonOnMouseUp = function (e) {
            if (FWDData.hasTouchStarted_bl) return;
            if (u.isFullScreen_bl) {
                u.dispatchEvent(t.GO_NORMAL_SCREEN);
                u.isFullScreen_bl = false
            } else {
                u.dispatchEvent(t.GO_FULL_SCREEN);
                u.isFullScreen_bl = true
            }
            u.setButtonsState()
        };
        this.buttonOnTouchStart = function (e) {
            if (u.isFullScreen_bl) {
                u.dispatchEvent(t.GO_NORMAL_SCREEN);
                u.isFullScreen_bl = false
            } else {
                u.dispatchEvent(t.GO_FULL_SCREEN);
                u.isFullScreen_bl = true
            }
            u.setButtonsState()
        };
        this.setButtonsState = function () {
            if (u.isFullScreen_bl) {
                u.fullButton_do.setVisible(false);
                u.normalButton_do.setVisible(true)
            } else {
                u.fullButton_do.setVisible(true);
                u.normalButton_do.setVisible(false)
            }
            u.buttonOnMouseOut()
        };
        this.show = function (e) {
            TweenMax.killTweensOf(this.mainHolder_do);
            if (e) {
                TweenMax.to(this.mainHolder_do, .8, {
                    x: 0,
                    delay: .8,
                    ease: Expo.easeInOut
                })
            } else {
                this.mainHolder_do.y = 0
            }
        };
        this.hide = function (e) {
            TweenMax.killTweensOf(this.mainHolder_do);
            if (e) {
                TweenMax.to(this.mainHolder_do, .8, {
                    x: this.getWidth() + this.margins,
                    ease: Expo.easeInOut
                })
            } else {
                this.mainHolder_do.setX(this.getHeight() + this.margins)
            }
        };
        this.destroy = function () {
            TweenMax.killTweensOf(this.mainHolder_do);
            TweenMax.killTweensOf(this.fullImageSelectedState_do);
            TweenMax.killTweensOf(this.normalImageSelectedState_do);
            this.mainHolder_do.screen.ontouchstart = null;
            this.mainHolder_do.screen.onmouseover = null;
            this.mainHolder_do.screen.onmouseout = null;
            this.mainHolder_do.screen.onclick = null;
            this.mainHolder_do.destroy();
            this.normalButton_do.destroy();
            this.fullButton_do.destroy();
            this.normalImageNormalState_do.destroy();
            this.fullImageNormalState_do.destroy();
            this.fullImageSelectedState_do.destroy();
            this.mainHolder_do = null;
            this.normalButton_do = null;
            this.fullButton_do = null;
            this.normalImageNormalState_do = null;
            this.fullImageNormalState_do = null;
            this.fullImageSelectedState_do = null;
            e = null;
            n = null;
            r = null;
            i = null;
            this.setInnerHTML("");
            a.destroy();
            u = null;
            a = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div", "absolute")
    };
    t.GO_FULL_SCREEN = "goFullScreen";
    t.GO_NORMAL_SCREEN = "goNormalScreen";
    t.prototype = null;
    e.FWDFullScreenButton = t
})(window);
(function (e) {
    var t = function (n) {
        var r = this;
        this.init = function () {
            TweenLite.ticker.useRAF(false);
            this.props_obj = n;
            this.isFullScreen_bl = false;
            this.mustHaveHolderDiv_bl = false;
            this.displayType = n.displayType.toLowerCase();
            if (!this.displayType) this.displayType = t.FULL_SCREEN;
            if (this.displayType == t.FLEXIBLE || this.displayType == t.FLUID_WIDTH) this.mustHaveHolderDiv_bl = true;
            this.isIE7_bl = navigator.userAgent.toLowerCase().indexOf("msie 7") != -1;
            this.body = document.getElementsByTagName("body")[0];
            if (!this.props_obj) {
                alert("FWDInfiniteGrid constructor properties object is not defined!");
                return
            }
            if (!this.props_obj) {
                alert("FWDInfiniteGrid constructor properties object is not defined!");
                return
            }
            if (!this.props_obj.gridHolderId) {
                if (this.mustHaveHolderDiv_bl) {
                    alert("Property gridHolderId is not defined in the FWDInfiniteGrid constructor, this property represents the div id into which the grid is added as a child!");
                    return
                }
            }
            if (this.mustHaveHolderDiv_bl && !FWDUtils.getChildById(this.props_obj.gridHolderId)) {
                alert("Grid holder div is not found, please make sure that the div exsists and the id is correct! " + this.props_obj.gridHolderId);
                return
            }
            if (this.displayType == t.FULL_SCREEN || this.displayType == t.LIGHTBOX) {
                if (this.isIE7_bl) {
                    this.stageContainer = this.body
                } else {
                    this.stageContainer = document.documentElement
                }
            } else {
                this.stageContainer = FWDUtils.getChildById(this.props_obj.gridHolderId)
            }
            this.mainLightBox_do;
            this.lightBoxBackground_do;
            this.lightBoxGridHolder_do;
            this.closeButton_do;
            this.customContextMenu;
            this.info_do;
            this.main_do;
            this.preloader_do;
            this.thumbsManager_do;
            this.helpScreen_do;
            this.lighBox_do;
            this.backgroundColor_str = this.props_obj.backgroundColor || "transparent";
            this.lightBoxBackgroundColor_str = this.props_obj.lightMainBoxBackgroundColor || "transparent";
            this.stageWidth = 0;
            this.stageHeight = 0;
            this.pageXOffset = e.pageXOffset;
            this.pageYOffset = e.pageYOffset;
            this.lastScrollY;
            this.lastScrollX;
            this.lightBoxBackgroundOpacity = this.props_obj.lightMainBoxBackgroundOpacity || 1;
            this.lightBoxWidth = this.props_obj.lightBoxWidth || 500;
            this.lightBoxHeight = this.props_obj.lightBoxHeight || 400;
            this.finalLightBoxWidth;
            this.finalLightBoxHeight;
            this.resizeHandlerIntervalId_int;
            this.lighboxAnimDoneId_to;
            this.hasTouchSupport_bl = FWDUtils.isMobile;
            if (this.displayType == t.LIGHTBOX) {
                this.setupLighBox()
            } else {
                this.setupGrid()
            }
        };
        this.setupLighBox = function () {
            var e = FWDUtils.getViewportSize();
            var t = FWDUtils.getScrollOffsets();
            this.lightBoxGridHolder_do = new FWDDisplayObject("div");
            this.lightBoxGridHolder_do.setWidth(e.w);
            this.lightBoxGridHolder_do.setHeight(e.h);
            this.lightBoxGridHolder_do.setX(t.x);
            this.lightBoxGridHolder_do.setY(t.y);
            this.lightBoxBackground_do = new FWDDisplayObject("div");
            this.lightBoxBackground_do.setResizableSizeAfterParent();
            this.lightBoxBackground_do.setBkColor(this.lightBoxBackgroundColor_str);
            this.lightBoxGridHolder_do.addChild(this.lightBoxBackground_do);
            this.mainLightBox_do = new FWDDisplayObject("div");
            this.mainLightBox_do.getStyle().boxShadow = "0px 0px 5px #000000";
            this.mainLightBox_do.setBkColor(this.backgroundColor_str);
            this.stageContainer = this.mainLightBox_do.screen;
            this.lightBoxGridHolder_do.addChild(this.mainLightBox_do);
            if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                document.getElementsByTagName("body")[0].appendChild(this.lightBoxGridHolder_do.screen)
            } else {
                document.documentElement.appendChild(this.lightBoxGridHolder_do.screen)
            }
            this.lightBoxBackground_do.setAlpha(0);
            TweenMax.to(this.lightBoxBackground_do, .8, {
                alpha: this.lightBoxBackgroundOpacity
            });
            this.mainLightBox_do.setWidth(0);
            this.mainLightBox_do.setHeight(0);
            this.mainLightBox_do.setX(parseInt(e.w / 2));
            this.mainLightBox_do.setY(parseInt(e.h / 2));
            if (this.lightBoxWidth > e.w) {
                this.finalLightBoxWidth = e.w;
                this.finalLightBoxHeight = parseInt(this.lightBoxHeight * (e.w / this.lightBoxWidth))
            } else {
                this.finalLightBoxWidth = this.lightBoxWidth;
                this.finalLightBoxHeight = this.lightBoxHeight
            }
            TweenMax.to(this.mainLightBox_do, .8, {
                w: this.finalLightBoxWidth,
                h: this.finalLightBoxHeight,
                x: parseInt((e.w - this.finalLightBoxWidth) / 2),
                y: parseInt((e.h - this.finalLightBoxHeight) / 2),
                delay: .4,
                ease: Expo.easeInOut
            });
            this.lighboxAnimDoneId_to = setTimeout(this.setupGrid, 1200)
        };
        this.setupLighBoxCloseButton = function () {
            FWDSimpleButton.setPrototype();
            this.closeButton_do = new FWDSimpleButton(this.data.mainLightboxCloseButtonN_img, this.data.mainLightboxCloseButtonS_img, this.data.hasTouchSupport_bl);
            this.closeButton_do.addListener(FWDSimpleButton.CLICK, this.closeButtonOnClickHandler);
            this.mainLightBox_do.addChild(this.closeButton_do);
            this.closeButton_do.setX(this.finalLightBoxWidth);
            this.closeButton_do.setY(1);
            TweenMax.to(this.closeButton_do, .9, {
                x: this.finalLightBoxWidth - this.closeButton_do.getWidth() - 1,
                ease: Expo.easeInOut
            });
            if (this.data.hasTouchSupport_bl) {
                e.addEventListener("touchstart", this.mouseDummyHandler);
                e.addEventListener("touchmove", this.mouseDummyHandler)
            } else {
                if (e.addEventListener) {
                    e.addEventListener("mousewheel", this.mouseDummyHandler);
                    e.addEventListener("DOMMouseScroll", this.mouseDummyHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousewheel", this.mouseDummyHandler)
                }
            }
        };
        this.mouseDummyHandler = function (e) {
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.closeButtonOnClickHandler = function (e) {
            var t = FWDUtils.getViewportSize();
            r.closeButton_do.isDisabled_bl = true;
            clearInterval(r.resizeHandlerIntervalId_int);
            if (r.data) r.data.stopToLoad();
            TweenMax.to(r.closeButton_do, .9, {
                x: r.lightBoxWidth,
                ease: Expo.easeInOut
            });
            if (r.fullScreenButton_do) TweenMax.to(r.fullScreenButton_do, .9, {
                x: r.lightBoxWidth,
                ease: Expo.easeInOut
            });
            if (r.helpScreen_do) r.helpScreen_do.hide(true);
            TweenMax.to(r.mainLightBox_do, .8, {
                w: 0,
                h: 0,
                x: parseInt(t.w / 2),
                y: parseInt(t.h / 2),
                delay: .4,
                ease: Expo.easeInOut
            });
            if (r.thumbsManager_do) {
                TweenMax.to(r.thumbsManager_do, .8, {
                    x: parseInt(-r.finalLightBoxWidth / 2),
                    y: parseInt(-r.finalLightBoxHeight / 2),
                    delay: .4,
                    ease: Expo.easeInOut
                })
            }
            TweenMax.to(r.lightBoxBackground_do, .8, {
                alpha: 0,
                delay: .8
            });
            r.lighboxAnimDoneId_to = setTimeout(r.lighboxHideAnimationDone, 1600)
        };
        r.lighboxHideAnimationDone = function () {
            r.destroy()
        };
        this.setupGrid = function () {
            r.setupMainDo();
            r.setupInfo();
            r.setupData()
        };
        this.setupMainDo = function () {
            this.main_do = new FWDDisplayObject("div", "relative");
            this.main_do.setSelectable(false);
            this.main_do.setBkColor(this.backgroundColor_str);
            if (this.displayType == t.FULL_SCREEN) {
                this.stageContainer.style.overflow = "hidden";
                this.main_do.getStyle().position = "absolute";
                if (!this.isIE7_bl) this.body.style.visibility = "hidden";
                document.documentElement.style.overflow = "hidden";
                this.stageContainer.appendChild(this.main_do.screen)
            } else if (this.displayType == t.FLUID_WIDTH) {
                this.main_do.getStyle().position = "absolute";
                if (this.isIE7_bl) {
                    this.body.appendChild(this.main_do.screen)
                } else {
                    document.documentElement.appendChild(this.main_do.screen)
                }
            } else if (this.displayType == t.LIGHTBOX) {
                this.main_do.getStyle().position = "absolute";
                this.stageContainer.appendChild(this.main_do.screen)
            } else {
                this.stageContainer.appendChild(this.main_do.screen)
            }
            this.startResizeHandler()
        };
        this.setupInfo = function () {
            FWDInfo.setPrototype();
            this.info_do = new FWDInfo
        };
        this.startResizeHandler = function () {
            this.stopResizeHandler();
            this.resizeHandler(true);
            this.resizeHandlerIntervalId_int = setInterval(this.resizeHandler, 100)
        };
        this.stopResizeHandler = function () {
            clearInterval(this.resizeHandlerIntervalId_int)
        };
        this.resizeHandler = function (e) {
            var n = FWDUtils.getScrollOffsets();
            var i = FWDUtils.getViewportSize();
            if (r.stageWidth == i.w && r.stageHeight == i.h && r.pageXOffset == n.x && r.pageYOffset == n.y && !e) return;
            r.stageWidth = i.w;
            r.stageHeight = i.h;
            r.pageXOffset = n.x;
            r.pageYOffset = n.y;
            if (r.displayType == t.LIGHTBOX && !r.isFullScreen_bl) {
                if (r.lightBoxWidth > i.w) {
                    r.finalLightBoxWidth = i.w;
                    r.finalLightBoxHeight = parseInt(r.lightBoxHeight * (i.w / r.lightBoxWidth))
                } else {
                    r.finalLightBoxWidth = r.lightBoxWidth;
                    r.finalLightBoxHeight = r.lightBoxHeight
                }
                r.lightBoxGridHolder_do.setWidth(i.w);
                r.lightBoxGridHolder_do.setHeight(i.h);
                r.lightBoxGridHolder_do.setX(n.x);
                r.lightBoxGridHolder_do.setY(n.y);
                r.mainLightBox_do.setX(parseInt((i.w - r.finalLightBoxWidth) / 2));
                r.mainLightBox_do.setY(parseInt((i.h - r.finalLightBoxHeight) / 2));
                if (r.closeButton_do) r.closeButton_do.setX(r.finalLightBoxWidth - r.closeButton_do.getWidth() - 1);
                r.main_do.setX(0);
                r.main_do.setY(0);
                r.mainLightBox_do.setWidth(r.finalLightBoxWidth);
                r.mainLightBox_do.setHeight(r.finalLightBoxHeight);
                r.main_do.setWidth(r.finalLightBoxWidth);
                r.main_do.setHeight(r.finalLightBoxHeight)
            } else if (r.displayType == t.FLUID_WIDTH && !r.isFullScreen_bl) {
                r.main_do.setWidth(r.stageWidth);
                r.main_do.setHeight(r.stageContainer.offsetHeight);
                r.main_do.setX(r.pageXOffset);
                r.main_do.setY(r.stageContainer.getBoundingClientRect().top + n.y)
            } else if (r.isFullScreen_bl || r.displayType == t.FULL_SCREEN) {
                r.main_do.setX(n.x);
                r.main_do.setY(n.y);
                r.main_do.setWidth(i.w);
                r.main_do.setHeight(i.h)
            } else {
                r.main_do.setX(0);
                r.main_do.setY(0);
                r.main_do.setWidth(r.stageContainer.offsetWidth);
                r.main_do.setHeight(r.stageContainer.offsetHeight)
            }
            r.positionFullScreenButton();
            r.positionPreloader()
        };
        this.setupContextMenu = function () {
            this.customContextMenu = new FWDContextMenu(this.main_do, this.data.showContextMenu_bl)
        };
        this.setupData = function () {
            FWDData.setPrototype();
            this.data = new FWDData(this.props_obj);
            this.data.addListener(FWDData.PRELOADER_LOAD_DONE, this.onPreloaderLoadDone);
            this.data.addListener(FWDData.LIGHBOX_CLOSE_BUTTON_LOADED, this.onLightBoxCloseButtonLoadDone);
            this.data.addListener(FWDData.LOAD_ERROR, this.dataLoadError);
            this.data.addListener(FWDData.LOAD_DONE, this.dataLoadComplete)
        };
        this.onLightBoxCloseButtonLoadDone = function () {
            if (r.displayType == t.LIGHTBOX) r.setupLighBoxCloseButton()
        };
        this.onPreloaderLoadDone = function () {
            r.setupPreloader();
            r.positionPreloader();
            if (r.displayType == t.FULL_SCREEN) {
                if (!FWDUtils.hasFullScreen) r.data.showFullScreenButton_bl = false
            }
        };
        this.dataLoadError = function (e, t) {
            r.main_do.addChild(r.info_do);
            r.info_do.showText(e.text)
        };
        this.dataLoadComplete = function (e) {
            r.preloader_do.hide(true);
            r.setupThumbsManager();
            r.main_do.addChild(r.preloader_do);
            if (!r.hasTouchSupport_bl) r.setupContextMenu();
            if (r.data.showFullScreenButton_bl) r.setupFullScreenButton();
            r.setupLightBox();
            if (r.data.showHelpScreen_bl) r.setupHelpScreen()
        };
        this.setupPreloader = function () {
            FWDPreloader.setPrototype();
            this.preloader_do = new FWDPreloader(this.data.mainPreloader_img, 30, 29, 31, 30);
            this.preloader_do.addListener(FWDPreloader.HIDE_COMPLETE, this.onPreloaderHideCompleteHandler);
            this.preloader_do.show(true);
            this.main_do.addChild(this.preloader_do)
        };
        this.positionPreloader = function () {
            if (this.preloader_do) {
                this.preloader_do.setX(parseInt((this.main_do.getWidth() - this.preloader_do.getWidth()) / 2));
                this.preloader_do.setY(parseInt((this.main_do.getHeight() - this.preloader_do.getHeight()) / 2))
            }
        };
        this.onPreloaderHideCompleteHandler = function () {
            r.main_do.removeChild(r.preloader_do)
        };
        this.setupThumbsManager = function (e) {
            FWDThumbsManager.setPrototype();
            this.thumbsManager_do = new FWDThumbsManager(this.data, this);
            this.thumbsManager_do.addListener(FWDThumbsManager.MOUSE_DONE, this.onThumbsManagerMouseDoneHandler);
            this.thumbsManager_do.addListener(FWDThumbsManager.HIDE_HELP_SCREEN, this.onThumbsManagerHideHelpScreenHandler);
            this.main_do.addChild(this.thumbsManager_do)
        };
        this.onThumbsManagerLoadError = function (e) {
            r.main_do.addChild(r.info_do);
            r.info_do.showText(e.text)
        };
        this.onThumbsManagerMouseDoneHandler = function (e) {
            if (r.closeButton_do && r.closeButton_do.isDisabled_bl) return;
            r.lighBox_do.show(e.id)
        };
        this.onThumbsManagerHideHelpScreenHandler = function () {
            if (r.closeButton_do && r.closeButton_do.isDisabled_bl) return;
            if (r.helpScreen_do) r.helpScreen_do.hide(true)
        };
        this.setupHelpScreen = function () {
            var e;
            if (this.data.hasTouchSupport_bl) {
                e = this.data.helpScreenAnimationMobile_img
            } else {
                e = this.data.helpScreenAnimationPc_img
            }
            FWDNavigationHelpScreen.setPrototype();
            this.helpScreen_do = new FWDNavigationHelpScreen(this, this.data.helpScreenBackgound_img, this.data.helpScreenCloseButtonN_img, this.data.helpScreenCloseButtonS_img, e, 250, 150, 30, 40, this.data.hasTouchSupport_bl);
            this.helpScreen_do.addListener(FWDNavigationHelpScreen.HIDE_COMPLETE, this.helpScreenHideCompleteHandler);
            this.main_do.addChild(this.helpScreen_do);
            this.helpScreen_do.show()
        };
        this.helpScreenHideCompleteHandler = function () {
            r.main_do.removeChild(r.helpScreen_do);
            r.helpScreen_do.destroy();
            r.helpScreen_do = null
        };
        this.setupLightBox = function () {
            FWDLightBox.setPrototype();
            this.lighBox_do = new FWDLightBox({
                data_ar: this.data.media_ar,
                lightboxPreloader_img: this.data.lightboxPreloader_img,
                slideShowPreloader_img: this.data.slideShowPreloader_img,
                closeN_img: this.data.lightboxCloseButtonN_img,
                closeS_img: this.data.lightboxCloseButtonS_img,
                nextN_img: this.data.lightboxNextButtonN_img,
                nextS_img: this.data.lightboxNextButtonS_img,
                prevN_img: this.data.lightboxPrevButtonN_img,
                prevS_img: this.data.lightboxPrevButtonS_img,
                maximizeN_img: this.data.lightboxMaximizeN_img,
                maximizeS_img: this.data.lightboxMaximizeS_img,
                minimizeN_img: this.data.lightboxMinimizeN_img,
                minimizeS_img: this.data.lightboxMinimizeS_img,
                infoOpenN_img: this.data.lightboxInfoOpenN_img,
                infoOpenS_img: this.data.lightboxInfoOpenS_img,
                infoCloseN_img: this.data.lightboxInfoCloseN_img,
                infoCloseS_img: this.data.lightboxInfoCloseS_img,
                playN_img: this.data.lightboxPlayN_img,
                playS_img: this.data.lightboxPlayS_img,
                pauseN_img: this.data.lightboxPauseN_img,
                pauseS_img: this.data.lightboxPauseS_img,
                showContextMenu: this.data.showContextMenu_bl,
                showContextMenu_bl: this.data.showContextMenu_bl,
                addKeyboardSupport_bl: this.data.addLightBoxKeyboardSupport_bl,
                showNextAndPrevButtons: this.data.showLighBoxNextAndPrevButtons_bl,
                showZoomButton: this.data.showLightBoxZoomButton_bl,
                showInfoButton: this.data.showLightBoxInfoButton_bl,
                showSlideshowButton: this.data.showLighBoxSlideShowButton_bl,
                slideShowAutoPlay: this.data.slideShowAutoPlay_bl,
                infoWindowBackgroundColor: r.data.lightBoxInfoWindowBackgroundColor_str,
                infoWindowBackgroundOpacity: r.data.lightBoxInfoWindowBackgroundOpacity,
                backgroundColor_str: r.data.lightBoxBackgroundColor_str,
                backgroundOpacity: r.data.lightBoxMainBackgroundOpacity,
                itemBackgroundColor_str: r.data.lightBoxItemBackgroundColor_str,
                borderColor_str: r.data.lightBoxItemBorderColor_str,
                borderSize: r.data.lightBoxBorderSize,
                slideShowDelay: r.data.lightBoxSlideShowDelay
            });
            this.lighBox_do.addListener(FWDLightBox.SHOW_START, this.lightBoxShowStartHandler);
            this.lighBox_do.addListener(FWDLightBox.HIDE_COMPLETE, this.lightBoxHideCompleteHandler);
            this.lighBox_do.addListener(FWDLightBox.MINIMIZE_START, this.lightBoxMinimizeStartHandler);
            this.lighBox_do.addListener(FWDLightBox.MAXIMIZE_COMPLETE, this.lightBoxMaximizeCompleteHandler)
        };
        this.lightBoxShowStartHandler = function () {
            r.thumbsManager_do.stopToLoop()
        };
        this.lightBoxHideCompleteHandler = function () {
            r.thumbsManager_do.startToLoop()
        };
        this.lightBoxMinimizeStartHandler = function () {
            if (!FWDUtils.isMobile || FWDUtils.isAndroid) {
                if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                    r.main_do.setVisible(true)
                } else {
                    r.body.style.visibility = "visible"
                }
            }
        };
        this.lightBoxMaximizeCompleteHandler = function () {
            if (!FWDUtils.isMobile || FWDUtils.isAndroid) {
                if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                    r.main_do.setVisible(false)
                } else {
                    r.body.style.visibility = "hidden"
                }
            }
        };
        this.setupFullScreenButton = function () {
            FWDFullScreenButton.setPrototype();
            this.fullScreenButton_do = new FWDFullScreenButton(this.data.fullScreenNN_img, this.data.fullScreenNS_img, this.data.fullScreenFN_img, this.data.fullScreenFS_img, 4, r.displayType);
            this.main_do.addChild(this.fullScreenButton_do);
            this.fullScreenButton_do.addListener(FWDFullScreenButton.GO_FULL_SCREEN, this.goFullScreenListener);
            this.fullScreenButton_do.addListener(FWDFullScreenButton.GO_NORMAL_SCREEN, this.goNormalScreenListener);
            r.positionFullScreenButton();
            this.fullScreenButton_do.show(true);
            if (document.addEventListener) {
                document.addEventListener("fullscreenchange", this.onFullScreenChange);
                document.addEventListener("mozfullscreenchange", this.onFullScreenChange);
                document.addEventListener("webkitfullscreenchange", this.onFullScreenChange)
            }
        };
        this.positionFullScreenButton = function () {
            if (!this.fullScreenButton_do) return;
            this.fullScreenButton_do.setX(this.main_do.getWidth() - this.fullScreenButton_do.buttonWidth - 1);
            this.fullScreenButton_do.setY(parseInt(this.main_do.getHeight() - this.fullScreenButton_do.buttonHeight - 1))
        };
        this.goFullScreenListener = function () {
            r.goFullScreen()
        };
        this.goNormalScreenListener = function () {
            r.goNormalScreen()
        };
        this.onFullScreenChange = function (e) {
            if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen) {
                r.fullScreenButton_do.isFullScreen_bl = true;
                r.isFullScreen_bl = true
            } else {
                r.fullScreenButton_do.isFullScreen_bl = false;
                r.isFullScreen_bl = false;
                r.addMainDoToTheOriginalParent()
            }
            r.fullScreenButton_do.setButtonsState()
        };
        this.goFullScreen = function () {
            var e = FWDUtils.getScrollOffsets();
            this.lastScrollX = e.x;
            this.lastScrollY = e.y;
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen()
            } else if (document.documentElement.msieRequestFullScreen) {
                document.documentElement.msieRequestFullScreen()
            }
            this.main_do.getStyle().position = "absolute";
            this.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            if (this.isIE7_bl) {
                this.body.appendChild(this.main_do.screen)
            } else {
                this.body.style.display = "none";
                document.documentElement.appendChild(this.main_do.screen)
            }
            this.main_do.getStyle().zIndex = 100000001;
            this.isFullScreen_bl = true;
            this.resizeHandler(true)
        };
        this.goNormalScreen = function () {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msieCancelFullScreen) {
                document.msieCancelFullScreen()
            }
            this.fullScreenButton_do.isFullScreen_bl = false;
            this.fullScreenButton_do.setButtonsState();
            this.isFullScreen_bl = false;
            this.addMainDoToTheOriginalParent();
            this.resizeHandler(true)
        };
        this.addMainDoToTheOriginalParent = function () {
            if (this.isIE7_bl && this.displayType == t.FULL_SCREEN) {
                document.documentElement.style.overflow = "auto";
                this.body.style.overflow = "auto"
            } else if (this.displayType != t.FULL_SCREEN) {
                if (this.isIE7_bl) {
                    document.documentElement.style.overflow = "auto";
                    this.body.style.overflow = "visible"
                } else {
                    document.documentElement.style.overflow = "visible";
                    this.body.style.overflow = "visible";
                    this.body.style.display = "inline"
                }
            }
            if (this.displayType == t.FULL_SCREEN) {
                if (this.isIE7_bl) {
                    this.body.appendChild(this.main_do.screen)
                } else {
                    document.documentElement.appendChild(this.main_do.screen)
                }
            } else if (this.displayType == t.FLUID_WIDTH) {
                if (this.isIE7_bl) {
                    this.body.appendChild(this.main_do.screen)
                } else {
                    document.documentElement.appendChild(this.main_do.screen)
                }
                this.resizeHandler(true)
            } else if (this.displayType == t.LIGHTBOX) {
                this.stageContainer.appendChild(this.main_do.screen);
                this.stageContainer.appendChild(this.closeButton_do.screen)
            } else {
                this.main_do.getStyle().position = "relative";
                this.stageContainer.appendChild(this.main_do.screen)
            }
            this.main_do.getStyle().zIndex = 0;
            this.resizeHandler(true);
            e.scrollTo(this.lastScrollX, this.lastScrollY)
        };
        this.cleanMainEvents = function () {
            if (document.removeEventListener) {
                document.removeEventListener("fullscreenchange", this.onFullScreenChange);
                document.removeEventListener("mozfullscreenchange", this.onFullScreenChange);
                document.removeEventListener("webkitfullscreenchange", this.onFullScreenChange)
            }
            if (this.data.hasTouchSupport_bl) {
                e.removeEventListener("touchstart", this.mouseDummyHandler);
                e.removeEventListener("touchmove", this.mouseDummyHandler)
            } else {
                if (e.removeEventListener) {
                    e.removeEventListener("mousewheel", this.mouseDummyHandler);
                    e.removeEventListener("DOMMouseScroll", this.mouseDummyHandler)
                } else if (document.attachEvent) {
                    document.detachEvent("onmousewheel", this.mouseDummyHandler)
                }
            }
            clearInterval(this.resizeHandlerIntervalId_int);
            clearTimeout(this.lighboxAnimDoneId_to)
        };
        this.destroy = function () {
            this.cleanMainEvents();
            if (this.mainLightBox_do) {
                TweenMax.killTweensOf(this.mainLightBox_do);
                TweenMax.killTweensOf(this.lightBoxBackground_do);
                TweenMax.killTweensOf(this.lightBoxGridHolder_do);
                if (this.closeButton_do) TweenMax.killTweensOf(this.closeButton_do);
                if (this.thumbsManager_do) TweenMax.killTweensOf(this.thumbsManager_do);
                if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                    document.getElementsByTagName("body")[0].removeChild(this.lightBoxGridHolder_do.screen)
                } else {
                    document.documentElement.removeChild(this.lightBoxGridHolder_do.screen)
                }
                this.mainLightBox_do.destroy();
                this.lightBoxBackground_do.destroy();
                this.lightBoxGridHolder_do.destroy();
                this.closeButton_do.destroy()
            }
            if (this.customContextMenu) this.customContextMenu.destroy();
            if (this.info_do) this.info_do.destroy();
            if (this.helpScreen_do) this.helpScreen_do.destroy();
            if (this.data) this.data.destroy();
            if (this.preloader_do) this.preloader_do.destroy();
            if (this.thumbsManager_do) this.thumbsManager_do.destroy();
            if (this.lighBox_do) this.lighBox_do.destroy();
            this.main_do.screen.parentNode.removeChild(this.main_do.screen);
            this.main_do.setInnerHTML("");
            this.main_do.destroy();
            this.data = null;
            this.mainLightBox_do = null;
            this.lightBoxBackground_do = null;
            this.lightBoxGridHolder_do = null;
            this.closeButton_do = null;
            this.customContextMenu = null;
            this.preloader_do = null;
            this.info_do = null;
            this.helpScreen_do = null;
            this.main_do = null;
            this.thumbsManager_do = null;
            this.lighBox_do = null;
            r = null
        };
        this.init()
    };
    t.FULL_SCREEN = "fullscreen";
    t.LIGHTBOX = "lightbox";
    t.FLEXIBLE = "flexible";
    t.FLUID_WIDTH = "fluidwidth";
    e.FWDInfiniteGrid = t
})(window);
(function (e) {
    var t = function () {
        var e = this;
        var n = t.prototype;
        this.init = function () {
            this.setWidth(500);
            this.setBkColor("#FF0000");
            this.getStyle().padding = "10px"
        };
        this.showText = function (e) {
            this.setInnerHTML(e)
        };
        this.destroy = function () {
            n.destroy();
            t.prototype = null;
            e = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div", "relative")
    };
    t.prototype = null;
    e.FWDInfo = t
})(window);
(function (e) {
    var t = function (n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.main_do;
        this.text_do;
        this.background_do;
        this.backgroundColor_str = r;
        this.backgroundOpacity = i;
        this.margins = n;
        this.maxWidth;
        this.maxHeight;
        this.finalWidth;
        this.finalHeight;
        this.lastPresedY;
        this.vy = 0;
        this.vy2 = 0;
        this.friction = .9;
        this.obj = {
            currentWidth: 0
        };
        this.updateMobileScrollBarIntervalId_int;
        this.isShowed_bl = false;
        this.isScrollBarActive_bl = false;
        this.hasTouchSupport_bl = s;
        this.isDragging_bl = false;
        this.isHiddenDone_bl = true;
        this.init = function () {
            this.setOverflow("visible");
            this.setBkColor("#FF0000");
            this.setX(this.margins);
            this.setY(this.margins);
            this.setupMainContainers();
            this.setVisible(false)
        };
        this.setupMainContainers = function () {
            this.main_do = new FWDDisplayObject("div");
            this.text_do = new FWDDisplayObject("div");
            this.text_do.getStyle().fontSmoothing = "antialiased";
            this.text_do.getStyle().webkitFontSmoothing = "antialiased";
            this.text_do.getStyle().textRendering = "optimizeLegibility";
            this.background_do = new FWDDisplayObject("div");
            this.background_do.setResizableSizeAfterParent();
            this.background_do.setBkColor(this.backgroundColor_str);
            this.background_do.setAlpha(this.backgroundOpacity);
            this.main_do.addChild(this.background_do);
            this.main_do.addChild(this.text_do);
            this.addChild(this.main_do)
        };
        this.setText = function (e, t, n, r) {
            this.maxWidth = t;
            this.maxHeight = n;
            this.text_do.setInnerHTML(e);
            clearTimeout(this.resieId_to);
            this.resieId_to = setTimeout(function () {
                o.resize(o.maxWidth, o.maxHeight, r);
                if (!o.isShowed_bl) {
                    if (o.isHiddenDone_bl) o.hide(false);
                    o.show(true)
                } else {
                    o.show(true)
                }
            }, 50);
            o.disableMobileScrollBar();
            o.onTweenUpdate()
        };
        this.resize = function (e, t, n) {
            o.maxWidth = e - o.margins * 2;
            o.maxHeight = t - o.margins * 2;
            o.finalWidth = o.maxWidth;
            o.setWidth(o.maxWidth);
            TweenMax.killTweensOf(o.obj);
            if (n) {
                TweenMax.to(o.obj, .8, {
                    delay: .1,
                    currentWidth: o.maxWidth,
                    onUpdate: o.onTweenUpdate,
                    ease: Expo.easeInOut
                })
            } else {
                o.obj.currentWidth = o.maxWidth
            }
            o.onTweenUpdate();
            o.text_do.setY(0)
        };
        this.onTweenUpdate = function () {
            o.main_do.setWidth(o.obj.currentWidth);
            o.finalHeight = o.text_do.getHeight() <= o.maxHeight ? o.text_do.getHeight() : o.maxHeight;
            o.main_do.setHeight(o.finalHeight);
            o.background_do.setHeight(o.finalHeight);
            if (o.text_do.getHeight() > o.maxHeight) {
                o.enableMobileScrollBar()
            } else {
                o.disableMobileScrollBar()
            }
        };
        this.enableMobileScrollBar = function () {
            if (!this.hasTouchSupport_bl) return;
            if (this.isScrollBarActive_bl) return;
            this.getScreen().addEventListener("touchstart", this.touchStartHandler);
            clearInterval(this.updateMobileScrollBar);
            this.updateMobileScrollBarIntervalId_int = setInterval(this.updateMobileScrollBar, 16);
            this.isScrollBarActive_bl = true
        };
        this.disableMobileScrollBar = function () {
            if (!this.isScrollBarActive_bl) return;
            this.getScreen().removeEventListener("touchstart", this.touchStartHandler);
            clearInterval(this.updateMobileScrollBar);
            this.isScrollBarActive_bl = false
        };
        this.touchStartHandler = function (t) {
            t.preventDefault();
            e.addEventListener("touchend", o.touchEndHandler);
            e.addEventListener("touchmove", o.scrollBarOnMoveHandler);
            o.lastPresedY = t.touches[0].pageY - e.pageYOffset
        };
        this.scrollBarOnMoveHandler = function (t) {
            t.preventDefault();
            var n = 0;
            o.isDragging_bl = true;
            n = t.touches[0].pageY - e.pageYOffset - o.lastPresedY;
            o.lastPresedY = t.touches[0].pageY - e.pageYOffset;
            o.text_do.setY(o.text_do.getY() + n);
            o.vy = n * 2
        };
        this.touchEndHandler = function (t) {
            e.removeEventListener("touchend", o.touchEndHandler);
            e.removeEventListener("touchmove", o.scrollBarOnMoveHandler);
            o.isDragging_bl = false
        };
        this.updateMobileScrollBar = function () {
            var e = o.text_do.getY();
            var t = o.text_do.getHeight();
            if (!o.isDragging_bl) {
                o.vy *= o.friction;
                e += o.vy;
                if (e > 0) {
                    o.vy2 = (0 - e) * .5;
                    o.vy *= o.friction;
                    e += o.vy2
                } else if (e <= o.maxHeight - t) {
                    o.vy2 = (o.maxHeight - t - e) * .5;
                    o.vy *= o.friction;
                    e += o.vy2
                }
                o.text_do.setY(Math.round(e))
            }
        };
        this.hide = function (e) {
            TweenMax.killTweensOf(this);
            if (e) {
                TweenMax.to(this, .6, {
                    y: -this.finalHeight,
                    ease: Expo.easeInOut,
                    onComplete: this.hideComplete
                });
                this.isHiddenDone_bl = false
            } else {
                this.setVisible(false);
                this.setY(-this.finalHeight);
                this.isShowed_bl = false;
                this.isHiddenDone_bl = true
            }
            o.isShowed_bl = false
        };
        this.hideComplete = function () {
            o.isHiddenDone_bl = true;
            o.setVisible(false)
        };
        this.show = function (e) {
            this.setVisible(true);
            TweenMax.killTweensOf(this);
            if (e) {
                TweenMax.to(this, .6, {
                    y: this.margins,
                    ease: Expo.easeInOut
                })
            } else {
                this.setVisible(false);
                this.setY(this.margins)
            }
            this.isHiddenDone_bl = false;
            this.isShowed_bl = true
        };
        this.init();
        this.destroy = function () {
            clearInterval(this.updateMobileScrollBar);
            if (this.hasTouchSupport_bl) {
                this.getScreen().removeEventListener("touchstart", this.touchStartHandler);
                e.removeEventListener("touchend", this.touchEndHandler);
                e.removeEventListener("touchmove", this.scrollBarOnMoveHandler)
            }
            TweenMax.killTweensOf(this);
            TweenMax.killTweensOf(this.obj);
            this.main_do.destroy();
            this.text_do.destroy();
            this.background_do.destroy();
            this.main_do = null;
            this.text_do = null;
            this.background_do = null;
            o.setInnerHTML("");
            u.destroy();
            o = null;
            u = null;
            t.prototype = null
        }
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.HIDE_COMPLETE = "infoWindowHideComplete";
    t.prototype = null;
    e.FWDInfoWindow = t
})(window);
(function (e) {
    function c(t, n, r) {
        function u() {
            if (s) {
                s.apply(e, arguments);
                if (!o) {
                    delete n[i];
                    s = null
                }
            }
        }
        var i, s = r[0],
            o = t === a;
        r[0] = u;
        i = t.apply(e, r);
        n[i] = {
            args: r,
            created: Date.now(),
            cb: s,
            id: i
        };
        return i
    }

    function h(t, n, r, i, s) {
        function c() {
            if (o.cb) {
                o.cb.apply(e, arguments);
                if (!u) {
                    delete r[i];
                    o.cb = null
                }
            }
        }
        var o = r[i];
        if (!o) {
            return
        }
        var u = t === a;
        n(o.id);
        if (!u) {
            var f = o.args[1];
            var l = Date.now() - o.created;
            if (l < 0) {
                l = 0
            }
            f -= l;
            if (f < 0) {
                f = 0
            }
            o.args[1] = f
        }
        o.args[0] = c;
        o.created = Date.now();
        o.id = t.apply(e, o.args)
    }
    var t = navigator.platform;
    var n = false;
    if (t == "iPad" || t == "iPhone") n = true;
    if (!n) return;
    var r = navigator.userAgent;
    var i = false;
    if (r.indexOf("6") != -1) i = true;
    if (!i) return;
    var s = {};
    var o = {};
    var u = e.setTimeout;
    var a = e.setInterval;
    var f = e.clearTimeout;
    var l = e.clearInterval;
    e.setTimeout = function () {
        return c(u, s, arguments)
    };
    e.setInterval = function () {
        return c(a, o, arguments)
    };
    e.clearTimeout = function (e) {
        var t = s[e];
        if (t) {
            delete s[e];
            f(t.id)
        }
    };
    e.clearInterval = function (e) {
        var t = o[e];
        if (t) {
            delete o[e];
            l(t.id)
        }
    };
    e.addEventListener("scroll", function () {
        var e;
        for (e in s) {
            h(u, f, s, e)
        }
        for (e in o) {
            h(a, l, o, e)
        }
    })
})(window);
(function (e) {
    var t = function (n) {
        var r = this;
        var i = t.prototype;
        this.image_img;
        this.closeN_img = n.closeN_img;
        this.closeS_img = n.closeS_img;
        this.nextN_img = n.nextN_img;
        this.nextS_img = n.nextS_img;
        this.prevN_img = n.prevN_img;
        this.prevS_img = n.prevS_img;
        this.maximizeN_img = n.maximizeN_img;
        this.maximizeS_img = n.maximizeS_img;
        this.minimizeN_img = n.minimizeN_img;
        this.minimizeS_img = n.minimizeS_img;
        this.infoOpenN_img = n.infoOpenN_img;
        this.infoOpenS_img = n.infoOpenS_img;
        this.infoCloseN_img = n.infoCloseN_img;
        this.infoCloseS_img = n.infoCloseS_img;
        this.pauseN_img = n.pauseN_img;
        this.pauseS_img = n.pauseS_img;
        this.playN_img = n.playN_img;
        this.playS_img = n.playS_img;
        this.preloaderImg = n.lightboxPreloader_img;
        this.slideShowPreloader_img = n.slideShowPreloader_img;
        this.info_do;
        this.infoWindow_do;
        this.preloader_do;
        this.slideShowPreloader_do;
        this.customContextMenu;
        this.timerManager;
        this.bk_do;
        this.mainItemsHolder_do;
        this.itemsBackground_do;
        this.itemsBorder_do;
        this.itemsHolder_do;
        this.currentItem_do;
        this.prevItem_do;
        this.closeButton_do;
        this.nextButton_do;
        this.prevButton_do;
        this.zoomButton_do;
        this.infoButton_do;
        this.slideshowButtton_do;
        this.data_ar = n.data_ar;
        this.buttons_ar;
        this.backgroundColor_str = n.backgroundColor_str;
        this.transitionDirection_str = "next";
        this.mediaType_str;
        this.backgroundOpacity = n.backgroundOpacity;
        this.infoWindowBackgroundOpacity = n.infoWindowBackgroundOpacity || 1;
        this.defaultVideoW = 460;
        this.defaultVideoH = 320;
        this.slideShowDelay = n.slideShowDelay || 3e3;
        if (this.slideShowDelay < 3e3) this.slideShowDelay = 3e3;
        this.videoW;
        this.videoH;
        this.borderSize = n.borderSize || 0;
        this.transitionTotalDuration = 1200;
        this.buttonWidth = this.closeN_img.width;
        this.buttonHeight = this.closeN_img.height;
        this.totalItems = this.data_ar.length;
        this.originalW;
        this.originalH;
        this.finalX;
        this.finalY;
        this.finalWidth;
        this.finalHeight;
        this.videoId;
        this.percentX;
        this.percentY;
        this.globalXMousePosition;
        this.globalYMousePosition;
        this.lastPressedX;
        this.lastPressedY;
        this.friction = .9;
        this.vx;
        this.vy;
        this.type_str;
        this.prevType_str;
        this.borderColor_str = n.borderColor_str || "#FFFFFF";
        this.itemBackgroundColor_str = n.itemBackgroundColor_str || "#222222";
        this.infoWindowBackgroundColor = n.infoWindowBackgroundColor || "transparent";
        this.id;
        this.scrollOffestX;
        this.scrollOffsetY;
        this.borderColor = "#FFFFFF";
        this.resizeHandlerIntervalId_int;
        this.updateImageWhenMaximized_int;
        this.transitionDoneId_to;
        this.transitionShapeDoneId_to;
        this.showVideoId_to;
        this.maximizeCompleteTimeOutId_to;
        this.minimizeCompleteTimeOutId_to;
        this.showFirstTimeWithDelayId_to;
        this.firstTimeShowed_bl = true;
        this.isTweening_bl = false;
        this.addKeyboardSupport_bl = n.addKeyboardSupport_bl == false ? false : true;
        this.showContextMenu_bl = n.showContextMenu_bl == false ? false : true;
        this.showNextAndPrevButtons_bl = n.showNextAndPrevButtons == false ? false : true;
        this.showZoomButton_bl = n.showZoomButton == false ? false : true;
        this.showInfoButton_bl = n.showInfoButton == false ? false : true;
        this.showSlideshowButton_bl = n.showSlideshowButton == false ? false : true;
        this.slideShowAutoPlay_bl = n.slideShowAutoPlay == false ? false : true;
        this.isMobile_bl = FWDUtils.isMobile;
        this.isMaximized_bl = false;
        this.isFirstItemShowed_bl = false;
        this.allowToPressKey_bl = true;
        this.isLoading_bl = false;
        this.init = function () {
            this.setupInfo();
            this.setupBackgorundAndMainItemHolder();
            this.setupPreloader();
            this.setupCloseButton();
            if (this.showNextAndPrevButtons_bl) this.setupNextAndPrevButtons();
            if (this.showZoomButton_bl) this.setupZoomButton();
            if (this.showInfoButton_bl) {
                this.setupInfoButton();
                this.setupInfoWindow()
            }
            if (this.showSlideshowButton_bl) {
                this.setupTimerManager();
                this.setupSlideShowPreloader();
                this.setupSlideshowButton()
            }
            this.setupContextMenu();
            this.buttons_ar = [];
            this.buttons_ar.push(this.closeButton_do);
            if (this.infoButton_do) this.buttons_ar.push(this.infoButton_do);
            if (this.showSlideshowButton_bl) this.buttons_ar.push(this.slideshowButtton_do);
            if (this.zoomButton_do) this.buttons_ar.push(this.zoomButton_do);
            if (this.showNextAndPrevButtons_bl) this.buttons_ar.push(this.nextButton_do)
        };
        this.resizeHandler = function (e) {
            var t = FWDUtils.getViewportSize();
            var n = FWDUtils.getScrollOffsets();
            if (r.stageWidth == t.w && r.stageHeight == t.h && r.scrollOffestX == n.x && r.scrollOffsetY == n.y && !e) return;
            r.isTweening_bl = false;
            r.stageWidth = t.w;
            r.stageHeight = t.h;
            r.scrollOffestX = n.x;
            r.scrollOffsetY = n.y;
            r.setX(n.x);
            r.setY(n.y);
            if (r.isMobile_bl) {
                r.setWidth(r.stageWidth);
                r.setHeight(r.stageHeight)
            } else {
                r.setWidth(r.stageWidth - .5);
                r.setHeight(r.stageHeight - .5)
            }
            r.positionPreloader();
            r.resizeCurrentItem();
            r.positionButtons(false);
            if (r.infoWindow_do && r.infoWindow_do.isShowed_bl) r.infoWindow_do.resize(r.finalWidth, r.finalHeight, false)
        };
        this.setupContextMenu = function () {
            this.customContextMenu = new FWDContextMenu(this, this.showContextMenu_bl)
        };
        this.disableBrowserScrollBars = function () {
            if (this.isMobile_bl) {
                e.addEventListener("touchstart", this.mouseDummyHandler);
                e.addEventListener("touchmove", this.mouseDummyHandler)
            } else {
                if (e.addEventListener) {
                    e.addEventListener("mousewheel", this.mouseDummyHandler);
                    e.addEventListener("DOMMouseScroll", this.mouseDummyHandler)
                } else if (document.attachEvent) {
                    document.attachEvent("onmousewheel", this.mouseDummyHandler)
                }
            }
        };
        this.mouseDummyHandler = function (e) {
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.setupInfo = function () {
            FWDInfo.setPrototype();
            this.info_do = new FWDInfo
        };
        this.setupBackgorundAndMainItemHolder = function () {
            this.bk_do = new FWDDisplayObject("div");
            this.bk_do.setResizableSizeAfterParent();
            this.bk_do.setBkColor(this.backgroundColor_str);
            this.addChild(this.bk_do);
            this.mainItemsHolder_do = new FWDDisplayObject("div");
            this.itemsBorder_do = new FWDDisplayObject("div");
            this.itemsBorder_do.setBkColor(this.borderColor_str);
            this.itemsBackground_do = new FWDDisplayObject("div");
            this.itemsBackground_do.setBkColor(r.itemBackgroundColor_str);
            this.itemsHolder_do = new FWDDisplayObject("div");
            this.itemsHolder_do.setOverflow("visible");
            this.mainItemsHolder_do.addChild(this.itemsBorder_do);
            this.mainItemsHolder_do.addChild(this.itemsBackground_do);
            this.mainItemsHolder_do.addChild(this.itemsHolder_do);
            this.addChild(this.mainItemsHolder_do);
            if (FWDUtils.isAndroid) {
                this.mainItemsHolder_do.setBackfaceVisibility();
                this.itemsBorder_do.setBackfaceVisibility();
                this.itemsBackground_do.setBackfaceVisibility();
                this.itemsHolder_do.setBackfaceVisibility()
            }
        };
        this.show = function (e) {
            this.getStyle().zIndex = 100000002;
            this.disableBrowserScrollBars();
            if (this.addKeyboardSupport_bl) this.addKeyboardSupport();
            this.hideButtons(false);
            if (navigator.userAgent.toLowerCase().indexOf("msie 7") != -1) {
                document.getElementsByTagName("body")[0].appendChild(this.screen)
            } else {
                document.documentElement.appendChild(this.screen)
            }
            this.id = e;
            this.resizeHandler(true);
            this.resizeHandlerIntervalId_int = setInterval(this.resizeHandler, 100);
            this.bk_do.setAlpha(0);
            TweenMax.to(this.bk_do, .8, {
                alpha: this.backgroundOpacity,
                ease: Quint.easeOut,
                onComplete: this.onShowComplete
            });
            this.showFirstTimeWithDelayId_to = setTimeout(function () {
                r.showCurrentItem()
            }, 100);
            this.dispatchEvent(t.SHOW_START)
        };
        this.onShowComplete = function () {};
        this.showCurrentItem = function () {
            if (r == null) return;
            this.type_str = this.data_ar[this.id].url;
            var e;
            if (this.type_str.toLowerCase().indexOf(".jpg") != -1) {
                this.type_str = t.IMAGE
            } else if (this.type_str.toLowerCase().indexOf("http://www.youtube") != -1 || this.type_str.toLowerCase().indexOf("http://youtube") != -1 || this.type_str.toLowerCase().indexOf("youtube.com") != -1) {
                e = FWDUtils.getUrlArgs(this.type_str);
                if (!e.v) {
                    this.addChild(this.info_do);
                    this.info_do.showText("Make sure that the youtube url is formatted correctly, probably the <font color='#FFFFFF'>v</font> variable from the url is missing, this represents the video id.");
                    return
                }
                this.videoW = this.data_ar[this.id].width || this.defaultVideoW;
                this.videoH = this.data_ar[this.id].height || this.defaultVideoH;
                this.videoId = e.v;
                this.type_str = t.YOUTUBE
            } else if (this.type_str.toLowerCase().indexOf("http://www.vimeo") != -1 || this.type_str.toLowerCase().indexOf("http://vimeo") != -1 || this.type_str.toLowerCase().indexOf("vimeo.com") != -1) {
                this.videoW = this.data_ar[this.id].width || this.defaultVideoW;
                this.videoH = this.data_ar[this.id].height || this.defaultVideoH;
                this.videoId = this.type_str.substr(this.type_str.lastIndexOf("/") + 1);
                this.type_str = t.VIMEO
            }
            this.createItem()
        };
        this.createItem = function () {
            clearTimeout(this.transitionShapeDoneId_to);
            clearTimeout(this.showVideoId_to);
            this.preloader_do.hide(true);
            if (this.showSlideshowButton_bl) this.timerManager.stop();
            if (this.contains(this.info_do)) this.removeChild(this.info_do);
            if (this.image_img) {
                this.image_img.onload = null;
                this.image_img.onerror = null;
                this.image_img = null
            }
            if (this.infoButton_do) this.infoButton_do.isDisabled_bl = true;
            if (this.type_str == t.IMAGE) {
                if (this.prevItem_do) {
                    if (this.opacityType == "filter" && this.prevItem_do.type != "img") {
                        this.prevItem_do.setVisible(false)
                    } else if (this.isMobile_bl || this.prevItem_do.type != "img") {
                        this.cleanChildren(0)
                    }
                }
                this.loadImage()
            } else if (this.type_str == t.YOUTUBE || this.type_str == t.VIMEO) {
                this.isTweening_bl = true;
                if (this.firstTimeShowed_bl) {
                    this.createVideoHolder();
                    this.resizeCurrentItem();
                    this.showItemFirstTime();
                    this.showVideoId_to = setTimeout(this.loadYoutubeOrVimeoVideo, 900);
                    this.prevItem_do = r.currentItem_do
                } else {
                    if (this.prevItem_do) {
                        if (this.opacityType == "filter" && this.prevItem_do.type != "img") {
                            this.prevItem_do.setVisible(false)
                        } else if (this.isMobile_bl || this.prevItem_do.type != "img") {
                            this.cleanChildren(0)
                        } else {
                            TweenMax.to(this.prevItem_do, .8, {
                                alpha: 0
                            })
                        }
                    }
                    this.createVideoHolder();
                    this.resizeCurrentItem(true);
                    if (this.showZoomButton_bl && (this.type_str == t.YOUTUBE || this.type_str == t.VIMEO)) {
                        var e = FWDUtils.indexOfArray(this.buttons_ar, this.zoomButton_do);
                        if (e != -1) {
                            this.buttons_ar.splice(e, 1);
                            this.removeChild(this.zoomButton_do)
                        }
                    }
                    this.positionButtons(true);
                    this.animMainDos();
                    this.showVideoId_to = setTimeout(this.loadYoutubeOrVimeoVideo, 900);
                    this.prevItem_do = r.currentItem_do
                } if (this.mainItemsHolder_do.contains(r.infoWindow_do) && this.infoWindow_do.isShowed_bl) {
                    this.infoWindow_do.setText(this.data_ar[r.id].infoText, this.finalWidth, this.finalHeight)
                }
            }
            this.prevType_str = this.type_str
        };
        this.createVideoHolder = function () {
            this.currentItem_do = new FWDDisplayObject("div");
            this.itemsHolder_do.addChild(r.currentItem_do);
            this.originalWidth = r.videoW || r.defaultVideoW;
            this.originalHeight = r.videoH || r.defaultVideoH
        };
        this.loadImage = function () {
            this.isLoading_bl = true;
            this.preloader_do.show(true);
            this.addChild(this.preloader_do);
            var e = this.data_ar[this.id].url;
            this.image_img = new Image;
            this.image_img.onload = this.imageLoadComplete;
            this.image_img.onerror = this.imageLoadError;
            this.image_img.src = e
        };
        this.imageLoadComplete = function (e) {
            if (r.prevItem_do) {
                if (!r.isMobile_bl && r.prevItem_do.type == "img") TweenMax.to(r.prevItem_do, .6, {
                    alpha: 0
                })
            }
            r.originalWidth = r.image_img.width;
            r.originalHeight = r.image_img.height;
            r.currentItem_do = new FWDDisplayObject("img");
            if (FWDUtils.isAndroid) r.currentItem_do.setBackfaceVisibility();
            r.currentItem_do.setScreen(r.image_img);
            r.itemsHolder_do.addChild(r.currentItem_do);
            if (r.firstTimeShowed_bl) {
                r.transitionTotalDuration = 800;
                r.resizeCurrentItem(false);
                r.showItemFirstTime()
            } else {
                r.transitionTotalDuration = 1400;
                r.resizeCurrentItem(true);
                r.currentItem_do.setWidth(r.finalWidth - r.borderSize * 2);
                r.currentItem_do.setHeight(r.finalHeight - r.borderSize * 2);
                r.currentItem_do.setAlpha(0);
                TweenMax.to(r.currentItem_do, .6, {
                    alpha: 1,
                    delay: .8
                });
                r.addZoomButtonBackToButtonsArray();
                r.animMainDos();
                r.positionButtons(true)
            } if (r.infoWindow_do && r.infoWindow_do.isShowed_bl) {
                r.infoWindow_do.setText(r.data_ar[r.id].infoText, r.finalWidth, r.finalHeight, true)
            }
            if (r.showSlideshowButton_bl) r.timerManager.stop();
            r.preloader_do.hide(true);
            r.prevItem_do = r.currentItem_do;
            r.isTweening_bl = true;
            r.isLoading_bl = false;
            r.transitionShapeDoneId_to = setTimeout(r.transitionShapeDoneHandler, 800);
            r.transitionDoneId_to = setTimeout(r.transitionDoneHandler, r.transitionTotalDuration)
        };
        this.transitionDoneHandler = function () {
            if (r.showSlideshowButton_bl) r.timerManager.start();
            r.isTweening_bl = false;
            r.cleanChildren(1)
        };
        this.transitionShapeDoneHandler = function () {
            if (r.infoButton_do) r.infoButton_do.isDisabled_bl = false
        };
        this.imageLoadError = function () {
            var e = "Image can't be loaded probably the path is incorrect <font color='#FFFFFF'>" + r.data_ar[r.id].url + "</font>";
            r.addChild(r.info_do);
            r.info_do.showText(e)
        };
        this.animMainDos = function () {
            TweenMax.to(this.mainItemsHolder_do, .8, {
                delay: .1,
                x: r.finalX,
                y: r.finalY,
                w: r.finalWidth,
                h: r.finalHeight,
                ease: Expo.easeInOut
            });
            TweenMax.to(this.itemsBackground_do, .8, {
                delay: .1,
                x: r.borderSize,
                y: r.borderSize,
                w: r.finalWidth - r.borderSize * 2,
                h: r.finalHeight - r.borderSize * 2,
                ease: Expo.easeInOut
            });
            TweenMax.to(this.itemsBorder_do, .8, {
                delay: .1,
                w: r.finalWidth,
                h: r.finalHeight,
                ease: Expo.easeInOut
            });
            TweenMax.to(this.itemsHolder_do, .8, {
                delay: .1,
                x: r.borderSize,
                y: r.borderSize,
                w: r.finalWidth - r.borderSize * 2,
                h: r.finalHeight - r.borderSize * 2,
                ease: Expo.easeInOut
            });
            if (!this.isMobile_bl && this.prevItem_do.type == "img") TweenMax.to(r.prevItem_do, .8, {
                delay: .1,
                x: (r.finalWidth - r.borderSize * 2 - r.prevItem_do.getWidth()) / 2,
                y: (r.finalHeight - r.borderSize * 2 - r.prevItem_do.getHeight()) / 2,
                ease: Expo.easeInOut
            })
        };
        this.loadYoutubeOrVimeoVideo = function () {
            r.isTweening_bl = false;
            if (r.showSlideshowButton_bl) r.timerManager.start();
            if (r.infoButton_do) r.infoButton_do.isDisabled_bl = false;
            r.cleanChildren(1);
            var e = document.createElement("iframe");
            e.width = "100%";
            e.height = "100%";
            e.frameBorder = 0;
            e.allowfullscreen = true;
            if (r.type_str == t.YOUTUBE) {
                e.src = "http://www.youtube.com/embed/" + r.videoId + "?wmode=transparent"
            } else {
                e.src = "http://player.vimeo.com/video/" + r.videoId
            }
            r.currentItem_do.screen.appendChild(e);
            r.resizeCurrentItem()
        };
        this.showItemFirstTime = function () {
            if (this.showZoomButton_bl && (this.type_str == t.YOUTUBE || this.type_str == t.VIMEO)) {
                var e = FWDUtils.indexOfArray(this.buttons_ar, this.zoomButton_do);
                if (e != -1) {
                    this.buttons_ar.splice(e, 1);
                    this.removeChild(this.zoomButton_do)
                }
            }
            this.showButtons();
            this.mainItemsHolder_do.setX(this.stageWidth / 2);
            this.mainItemsHolder_do.setY(this.stageHeight / 2);
            this.mainItemsHolder_do.setWidth(0);
            this.mainItemsHolder_do.setHeight(0);
            this.currentItem_do.setAlpha(0);
            this.itemsBorder_do.setAlpha(0);
            TweenMax.to(this.currentItem_do, .8, {
                alpha: 1,
                delay: .9,
                ease: Quint.easeOut
            });
            TweenMax.to(this.itemsBorder_do, .8, {
                alpha: 1,
                delay: .7,
                ease: Quint.easeOut
            });
            TweenMax.to(this.mainItemsHolder_do, .8, {
                x: this.finalX,
                y: this.finalY,
                w: this.finalWidth,
                h: this.finalHeight,
                ease: Expo.easeInOut
            });
            this.firstTimeShowed_bl = false
        };
        this.cleanChildren = function (e) {
            var t;
            var n;
            while (this.itemsHolder_do.getNumChildren() > e) {
                t = this.itemsHolder_do.getChildAt(0);
                TweenMax.killTweensOf(t);
                this.itemsHolder_do.removeChild(t);
                if (this.opacityType == "opacity" && t.type != "img") t.setInnerHTML("");
                t.destroy()
            }
            t = null
        };
        this.resizeCurrentItem = function (e) {
            if (!this.currentItem_do) return;
            var t = this.stageWidth - 10;
            var n = this.stageHeight - 10;
            var r = t / this.originalWidth;
            var i = n / this.originalHeight;
            var s = 0;
            if (r <= i) {
                s = r
            } else if (r >= i) {
                s = i
            }
            if (r >= 1 && i >= 1) s = 1;
            this.finalWidth = Math.round(this.originalWidth * s);
            this.finalHeight = Math.round(this.originalHeight * s);
            if (this.finalWidth > this.stageWidth - this.buttonWidth * 2 - 4) {
                this.finalWidth = this.stageWidth - this.buttonWidth * 2 - 4;
                this.finalHeight = Math.round(this.originalHeight * (this.finalWidth / this.originalWidth))
            }
            this.finalX = Math.floor((t - this.finalWidth) / 2) + 5;
            this.finalY = Math.floor((n - this.finalHeight) / 2) + 5;
            if (e) return;
            TweenMax.killTweensOf(this.mainItemsHolder_do);
            this.mainItemsHolder_do.setX(this.finalX);
            this.mainItemsHolder_do.setY(this.finalY);
            this.mainItemsHolder_do.setWidth(this.finalWidth);
            this.mainItemsHolder_do.setHeight(this.finalHeight);
            TweenMax.killTweensOf(this.itemsBackground_do);
            this.itemsBackground_do.setX(this.borderSize);
            this.itemsBackground_do.setY(this.borderSize);
            this.itemsBackground_do.setWidth(this.finalWidth - this.borderSize * 2);
            this.itemsBackground_do.setHeight(this.finalHeight - this.borderSize * 2);
            TweenMax.killTweensOf(this.itemsBorder_do);
            this.itemsBorder_do.setX(0);
            this.itemsBorder_do.setY(0);
            this.itemsBorder_do.setWidth(this.finalWidth);
            this.itemsBorder_do.setHeight(this.finalHeight);
            this.itemsBorder_do.setAlpha(1);
            TweenMax.killTweensOf(this.currentItem_do);
            if (this.isMaximized_bl) {
                r = this.stageWidth / this.originalWidth;
                i = this.stageHeight / this.originalHeight;
                if (r >= i) {
                    s = r
                } else if (r <= i) {
                    s = i
                }
                this.currentItem_do.setX(parseInt((this.stageWidth - this.originalWidth * s) / 2));
                this.currentItem_do.setY(parseInt((this.stageHeight - this.originalHeight * s) / 2));
                this.currentItem_do.setWidth(parseInt(this.originalWidth * s));
                this.currentItem_do.setHeight(parseInt(this.originalHeight * s))
            } else {
                this.currentItem_do.setAlpha(1);
                this.currentItem_do.setX(0);
                this.currentItem_do.setY(0);
                this.currentItem_do.setWidth(this.finalWidth - this.borderSize * 2);
                this.currentItem_do.setHeight(this.finalHeight - this.borderSize * 2)
            }
            this.itemsHolder_do.setX(this.borderSize);
            this.itemsHolder_do.setY(this.borderSize);
            this.itemsHolder_do.setWidth(this.finalWidth - this.borderSize * 2);
            this.itemsHolder_do.setHeight(this.finalHeight - this.borderSize * 2)
        };
        this.goToNextItem = function () {
            if (this.isTweening_bl) return;
            this.transitionDirection_str = "next";
            this.id++;
            if (this.id >= this.totalItems) {
                this.id = 0
            }
            this.showCurrentItem()
        };
        this.goToPrevItem = function () {
            if (this.isTweening_bl) return;
            this.transitionDirection_str = "prev";
            this.id--;
            if (this.id < 0) {
                this.id = this.totalItems - 1
            }
            this.showCurrentItem()
        };
        this.maximizeOrMinimize = function () {
            if (this.isLoading_bl) return;
            if (this.timerManager) this.timerManager.stop();
            var e;
            var n;
            var i;
            var s;
            var o;
            var u;
            var a;
            clearTimeout(this.maximizeCompleteTimeOutId_to);
            clearTimeout(this.minimizeCompleteTimeOutId_to);
            TweenMax.killTweensOf(this.currentItem_do);
            if (this.isMaximized_bl) {
                this.isMaximized_bl = false;
                this.isTweening_bl = true;
                if (this.isMobile_bl) {
                    this.removeEventsForScrollngImageOnMobile()
                } else {
                    this.removeEventsForScrollngImageOnDesktop()
                }
                this.bk_do.setAlpha(this.backgroundOpacity);
                this.mainItemsHolder_do.setVisible(true);
                this.closeButton_do.setVisible(true);
                if (r.nextButton_do) {
                    this.nextButton_do.setVisible(true);
                    this.prevButton_do.setVisible(true)
                }
                if (this.infoButton_do) this.infoButton_do.setVisible(true);
                if (this.slideshowButtton_do) {
                    this.slideshowButtton_do.setVisible(true)
                }
                this.currentItem_do.setX(this.currentItem_do.getX() - this.finalX - this.borderSize);
                this.currentItem_do.setY(this.currentItem_do.getY() - this.finalY - this.borderSize);
                this.positionButtons(true);
                if (this.slideShowPreloader_do) this.positionSlideShowPreloader(false);
                TweenMax.to(this.currentItem_do, .8, {
                    x: 0,
                    y: 0,
                    w: this.finalWidth - this.borderSize * 2,
                    h: this.finalHeight - this.borderSize * 2,
                    ease: Expo.easeInOut
                });
                this.minimizeCompleteTimeOutId_to = setTimeout(this.minimizeCompleteHandler, 800);
                this.mainItemsHolder_do.setOverflow("visible");
                this.itemsHolder_do.addChild(this.currentItem_do);
                this.addChild(this.mainItemsHolder_do);
                this.zoomButton_do.isMaximized_bl = false;
                this.addChild(this.zoomButton_do);
                this.dispatchEvent(t.MINIMIZE_START)
            } else {
                this.isMaximized_bl = true;
                this.isTweening_bl = true;
                e = this.stageWidth / this.originalWidth;
                n = this.stageHeight / this.originalHeight;
                a = 0;
                if (e >= n) {
                    a = e
                } else if (e <= n) {
                    a = n
                }
                o = parseInt(this.originalWidth * a);
                u = parseInt(this.originalHeight * a);
                i = parseInt((this.stageWidth - o) / 2);
                s = parseInt((this.stageHeight - u) / 2);
                this.currentItem_do.setAlpha(1);
                this.currentItem_do.setX(this.currentItem_do.getGlobalX());
                this.currentItem_do.setY(this.currentItem_do.getGlobalY());
                if (this.isMobile_bl) {
                    TweenMax.to(this.zoomButton_do, .8, {
                        x: this.stageWidth - this.buttonWidth,
                        y: 1,
                        ease: Expo.easeInOut
                    });
                    TweenMax.to(this.currentItem_do, .8, {
                        x: i,
                        y: s,
                        w: o,
                        h: u,
                        ease: Expo.easeInOut
                    })
                } else {
                    this.zoomButton_do.isMaximized_bl = true;
                    if (e >= n) {
                        TweenMax.to(this.currentItem_do, .8, {
                            x: i,
                            w: o,
                            h: u,
                            ease: Expo.easeInOut
                        })
                    } else if (e < n) {
                        TweenMax.to(this.currentItem_do, .8, {
                            y: s,
                            w: o,
                            h: u,
                            ease: Expo.easeInOut
                        })
                    }
                    this.addEventsForScrollngImageOnDesktop()
                } if (r.infoWindow_do)
                    if (r.infoButton_do.currentState == 0) this.infoWindow_do.hide(false);
                this.itemsHolder_do.removeChild(this.currentItem_do);
                this.addChild(this.currentItem_do);
                this.addChild(this.zoomButton_do);
                this.maximizeCompleteTimeOutId_to = setTimeout(this.maximizeCompleteHandler, 800)
            }
        };
        this.maximizeCompleteHandler = function () {
            r.bk_do.setAlpha(1);
            r.mainItemsHolder_do.setVisible(false);
            r.closeButton_do.setVisible(false);
            if (r.nextButton_do) {
                r.nextButton_do.setVisible(false);
                r.prevButton_do.setVisible(false)
            }
            if (r.infoButton_do) r.infoButton_do.setVisible(false);
            if (r.slideshowButtton_do) {
                r.slideshowButtton_do.setVisible(false);
                r.slideShowPreloader_do.setX(3e3)
            }
            r.dispatchEvent(t.MAXIMIZE_COMPLETE);
            if (r.isMobile_bl) r.addEventsForScrollngImageOnMobile()
        };
        this.minimizeCompleteHandler = function () {
            if (r.infoWindow_do)
                if (r.infoButton_do.currentState == 0) r.infoWindow_do.show(true);
            if (r.showSlideshowButton_bl) r.timerManager.start();
            r.mainItemsHolder_do.setOverflow("hidden");
            r.isTweening_bl = false
        };
        this.addEventsForScrollngImageOnDesktop = function () {
            this.updateImageWhenMaximized_int = setInterval(this.updateMaximizedImageHandler, 16);
            if (e.addEventListener) {
                e.addEventListener("mousemove", this.updateMaximizeImageOnMouseMovedHandler)
            } else {
                document.attachEvent("onmousemove", this.updateMaximizeImageOnMouseMovedHandler)
            }
        };
        this.removeEventsForScrollngImageOnDesktop = function () {
            clearInterval(this.updateImageWhenMaximized_int);
            if (e.addEventListener) {
                e.removeEventListener("mousemove", this.updateMaximizeImageOnMouseMovedHandler)
            } else {
                document.detachEvent("onmousemove", this.updateMaximizeImageOnMouseMovedHandler)
            }
        };
        this.updateMaximizeImageOnMouseMovedHandler = function (e) {
            var t = FWDUtils.getViewportMouseCoordinates(e);
            var n = FWDUtils.getScrollOffsets();
            r.globalXMousePosition = t.screenX;
            r.globalYMousePosition = t.screenY;
            TweenMax.to(r.zoomButton_do, .2, {
                x: r.globalXMousePosition - parseInt(r.buttonWidth / 2),
                y: r.globalYMousePosition - parseInt(r.buttonHeight / 2)
            })
        };
        this.updateMaximizedImageHandler = function () {
            var e;
            var t;
            r.percentX = r.globalXMousePosition / r.stageWidth;
            r.percentY = r.globalYMousePosition / r.stageHeight;
            if (r.percentX > 1) r.percentX = 1;
            if (r.percentY > 1) r.percentY = 1;
            var n = r.stageWidth / r.originalWidth;
            var i = r.stageHeight / r.originalHeight;
            if (n <= i) {
                e = Math.round((r.stageWidth - r.currentItem_do.getWidth()) * r.percentX);
                if (isNaN(e)) return;
                TweenMax.to(r.currentItem_do, .4, {
                    x: e
                })
            } else {
                t = Math.round((r.stageHeight - r.currentItem_do.getHeight()) * r.percentY);
                if (isNaN(t)) return;
                TweenMax.to(r.currentItem_do, .4, {
                    y: t
                })
            }
        };
        this.addEventsForScrollngImageOnMobile = function () {
            e.addEventListener("touchstart", this.onTouchStartScrollImage);
            e.addEventListener("touchend", this.onTouchEndScrollImage);
            clearInterval(this.updateImageWhenMaximized_int);
            this.updateImageWhenMaximized_int = setInterval(this.updateMaximizedImageMobileHandler, 16)
        };
        this.removeEventsForScrollngImageOnMobile = function () {
            clearInterval(this.updateImageWhenMaximized_int);
            e.removeEventListener("touchstart", this.onTouchStartScrollImage);
            e.removeEventListener("touchend", this.onTouchEndScrollImage);
            e.removeEventListener("touchmove", r.onTouchMoveScrollImage)
        };
        this.onTouchStartScrollImage = function (t) {
            e.addEventListener("touchmove", r.onTouchMoveScrollImage);
            r.lastPresedX = t.touches[0].pageX - e.pageXOffset;
            r.lastPresedY = t.touches[0].pageY - e.pageYOffset;
            t.preventDefault()
        };
        this.onTouchEndScrollImage = function (t) {
            e.removeEventListener("touchmove", r.onTouchMoveScrollImage);
            r.isDragging_bl = false
        };
        this.onTouchMoveScrollImage = function (t) {
            t.preventDefault();
            var n = r.stageWidth / r.originalWidth;
            var i = r.stageHeight / r.originalHeight;
            var s = 0;
            var o = 0;
            r.isDragging_bl = true;
            if (n < i) {
                s = t.touches[0].pageX - e.pageXOffset - r.lastPresedX;
                r.lastPresedX = t.touches[0].pageX - e.pageXOffset;
                r.currentItem_do.setX(r.currentItem_do.getX() + s)
            } else if (n > i) {
                o = t.touches[0].pageY - e.pageYOffset - r.lastPresedY;
                r.lastPresedY = t.touches[0].pageY - e.pageYOffset;
                r.currentItem_do.setY(r.currentItem_do.getY() + o)
            } else {
                s = t.touches[0].pageX - e.pageXOffset - r.lastPresedX;
                r.lastPresedX = t.touches[0].pageX - e.pageXOffset;
                r.currentItem_do.setX(r.currentItem_do.getX() + s);
                o = t.touches[0].pageY - e.pageYOffset - r.lastPresedY;
                r.lastPresedY = t.touches[0].pageY - e.pageYOffset;
                r.currentItem_do.setY(r.currentItem_do.getY() + o)
            }
            r.vx = s * 2;
            r.vy = o * 2
        };
        this.updateMaximizedImageMobileHandler = function () {
            var e;
            var t;
            var n;
            var i;
            var s;
            var o;
            if (!r.isDragging_bl) {
                r.vy *= r.friction;
                r.vx *= r.friction;
                n = r.currentItem_do.getX();
                i = r.currentItem_do.getY();
                e = n + r.vx;
                t = i + r.vy;
                s = r.currentItem_do.getWidth();
                o = r.currentItem_do.getHeight();
                if (isNaN(e) || isNaN(t)) return;
                r.currentItem_do.setX(e);
                r.currentItem_do.setY(t);
                if (i >= 0) {
                    r.vy2 = (0 - i) * .3;
                    r.vy *= r.friction;
                    r.currentItem_do.setY(i + r.vy2)
                } else if (i <= r.stageHeight - o) {
                    r.vy2 = (r.stageHeight - o - i) * .5;
                    r.vy *= r.friction;
                    r.currentItem_do.setY(i + r.vy2)
                }
                if (n >= 0) {
                    r.vx2 = (0 - n) * .3;
                    r.vx *= r.friction;
                    r.currentItem_do.setX(n + r.vx2)
                } else if (n <= r.stageWidth - s) {
                    r.vx2 = (r.stageWidth - s - n) * .5;
                    r.vx *= r.friction;
                    r.currentItem_do.setX(n + r.vx2)
                }
            }
        };
        this.setupCloseButton = function () {
            FWDSimpleButton.setPrototype();
            this.closeButton_do = new FWDSimpleButton(this.closeN_img, this.closeS_img, this.isMobile_bl);
            this.closeButton_do.addListener(FWDSimpleButton.CLICK, this.closeButtonOnClickHandler);
            this.addChild(this.closeButton_do)
        };
        this.closeButtonOnClickHandler = function (e) {
            r.hide()
        };
        this.setupNextAndPrevButtons = function () {
            FWDSimpleButton.setPrototype();
            this.nextButton_do = new FWDSimpleButton(this.nextN_img, this.nextS_img, this.isMobile_bl);
            this.nextButton_do.addListener(FWDSimpleButton.CLICK, this.nextButtonOnClickHandler);
            this.addChild(this.nextButton_do);
            FWDSimpleButton.setPrototype();
            this.prevButton_do = new FWDSimpleButton(this.prevN_img, this.prevS_img, this.isMobile_bl);
            this.prevButton_do.addListener(FWDSimpleButton.CLICK, this.prevButtonOnClickHandler);
            this.addChild(this.prevButton_do)
        };
        this.nextButtonOnClickHandler = function (e) {
            r.goToNextItem()
        };
        this.prevButtonOnClickHandler = function (e) {
            r.goToPrevItem()
        };
        this.setupZoomButton = function () {
            FWDComplexButton.setPrototype();
            this.zoomButton_do = new FWDComplexButton(this.minimizeN_img, this.minimizeS_img, this.maximizeN_img, this.maximizeS_img, this.isMobile_bl, true);
            this.zoomButton_do.addListener(FWDComplexButton.CLICK, this.onZoomButtonClickHandler);
            this.addChild(this.zoomButton_do)
        };
        this.onZoomButtonClickHandler = function (e) {
            if (r.isLoading_bl) return;
            r.zoomButton_do.toggleButton();
            r.maximizeOrMinimize()
        };
        this.addZoomButtonBackToButtonsArray = function () {
            if (this.showZoomButton_bl) {
                var e = FWDUtils.indexOfArray(this.buttons_ar, this.zoomButton_do);
                if (e == -1) {
                    if (this.buttons_ar.length > 1) {
                        this.zoomButton_do.setX(this.buttons_ar[this.buttons_ar.length - 2].finalX);
                        this.zoomButton_do.setY(this.buttons_ar[this.buttons_ar.length - 2].finalY + this.buttonHeight + 1);
                        this.buttons_ar.splice(this.buttons_ar.length - 1, 0, this.zoomButton_do)
                    } else {
                        this.zoomButton_do.setX(r.buttons_ar[this.buttons_ar.length - 1].finalX);
                        this.zoomButton_do.setY(r.buttons_ar[this.buttons_ar.length - 1].finalY + this.buttonHeight + 1);
                        this.buttons_ar.push(this.zoomButton_do)
                    }
                    this.addChild(this.zoomButton_do)
                }
            }
        };
        this.setupInfoButton = function () {
            FWDComplexButton.setPrototype();
            this.infoButton_do = new FWDComplexButton(this.infoCloseN_img, this.infoCloseS_img, this.infoOpenN_img, this.infoOpenS_img, this.isMobile_bl, false);
            this.infoButton_do.addListener(FWDComplexButton.FIRST_BUTTON_CLICK, this.onHideInfoButtonPressedHandler);
            this.infoButton_do.addListener(FWDComplexButton.SECOND_BUTTON_CLICK, this.onShowInfoButtonPressedHandler);
            this.addChild(this.infoButton_do)
        };
        this.onShowInfoButtonPressedHandler = function (e) {
            r.mainItemsHolder_do.addChild(r.infoWindow_do);
            r.infoWindow_do.setText(r.data_ar[r.id].infoText, r.finalWidth, r.finalHeight)
        };
        this.onHideInfoButtonPressedHandler = function (e) {
            r.infoWindow_do.hide(true)
        };
        this.setupInfoWindow = function () {
            FWDInfoWindow.setPrototype();
            this.infoWindow_do = new FWDInfoWindow(this.borderSize, this.infoWindowBackgroundColor, this.infoWindowBackgroundOpacity, this.isMobile_bl)
        };
        this.setupSlideshowButton = function () {
            FWDComplexButton.setPrototype();
            this.slideshowButtton_do = new FWDComplexButton(this.pauseN_img, this.pauseS_img, this.playN_img, this.playS_img, this.isMobile_bl, false);
            this.slideshowButtton_do.addListener(FWDComplexButton.FIRST_BUTTON_CLICK, this.onStopSlideShowHandler);
            this.slideshowButtton_do.addListener(FWDComplexButton.SECOND_BUTTON_CLICK, this.onStartSlideShowHandler);
            this.addChild(this.slideshowButtton_do);
            if (this.slideShowAutoPlay_bl) {
                this.timerManager.isStopped_bl = false;
                this.slideShowPreloader_do.show(true);
                this.slideshowButtton_do.setSecondButtonState()
            }
        };
        this.onStopSlideShowHandler = function (e) {
            r.timerManager.isStopped_bl = true;
            r.slideShowPreloader_do.hide(true);
            r.timerManager.stop()
        };
        this.onStartSlideShowHandler = function (e) {
            r.timerManager.isStopped_bl = false;
            r.slideShowPreloader_do.show(true);
            if (!r.isLoading_bl) r.timerManager.start()
        };
        this.setupTimerManager = function () {
            FWDTimerManager.setProtptype();
            this.timerManager = new FWDTimerManager(this.slideShowDelay, this.slideShowAutoPlay_bl);
            this.timerManager.addListener(FWDTimerManager.START, this.onTimerManagerStartHandler);
            this.timerManager.addListener(FWDTimerManager.STOP, this.onTimerManagerStopHandler);
            this.timerManager.addListener(FWDTimerManager.TIME, this.onTimerManagerTimeHandler)
        };
        this.onTimerManagerStartHandler = function () {
            if (!r.timerManager.isStopped_bl) r.slideShowPreloader_do.animIn()
        };
        this.onTimerManagerStopHandler = function () {
            r.slideShowPreloader_do.animOut()
        };
        this.onTimerManagerTimeHandler = function () {
            r.goToNextItem();
            r.slideShowPreloader_do.animOut()
        };
        this.setupSlideShowPreloader = function () {
            FWDSlideShowPreloader.setPrototype();
            this.slideShowPreloader_do = new FWDSlideShowPreloader(this.slideShowPreloader_img, 31, 29, 11, this.slideShowDelay);
            this.addChild(this.slideShowPreloader_do)
        };
        this.positionSlideShowPreloader = function (e) {
            if (!this.slideShowPreloader_do) return;
            this.slideShowPreloader_do.finalX = this.finalX + this.finalWidth;
            this.slideShowPreloader_do.finalY = this.finalY + this.finalHeight - this.buttonHeight;
            TweenMax.killTweensOf(this.slideShowPreloader_do);
            if (e) {
                TweenMax.to(this.slideShowPreloader_do, .8, {
                    x: this.slideShowPreloader_do.finalX,
                    y: this.slideShowPreloader_do.finalY,
                    delay: .1,
                    ease: Expo.easeInOut
                })
            } else {
                this.slideShowPreloader_do.setX(this.slideShowPreloader_do.finalX);
                this.slideShowPreloader_do.setY(this.slideShowPreloader_do.finalY)
            }
        };
        this.positionButtons = function (e) {
            var t;
            var n = this.buttons_ar.length;
            var r = 1;
            var i = this.finalX + this.finalWidth;
            var s = this.finalY;
            var o = 0;
            for (var u = 0; u < n; u++) {
                t = this.buttons_ar[u];
                TweenMax.killTweensOf(t);
                t.finalY = s + u * (this.buttonHeight + 1);
                if (t == this.nextButton_do) {
                    t.finalY = Math.round((this.stageHeight - this.buttonHeight) / 2);
                    if (t.finalY < this.buttons_ar[u - 1].finalY + this.buttonHeight + 1) t.finalY = this.buttons_ar[u - 1].finalY + this.buttonHeight + 1
                }
                t.finalX = i;
                if (isNaN(t.finalX)) return;
                if (t) {
                    if (e) {
                        TweenMax.to(t, .8, {
                            x: t.finalX,
                            y: t.finalY,
                            delay: .1,
                            ease: Expo.easeInOut
                        })
                    } else {
                        t.setX(t.finalX);
                        t.setY(t.finalY)
                    }
                }
            }
            if (this.showNextAndPrevButtons_bl) {
                TweenMax.killTweensOf(this.prevButton_do);
                if (e) {
                    TweenMax.to(this.prevButton_do, .8, {
                        x: this.finalX - this.buttonWidth,
                        y: Math.round((this.stageHeight - this.buttonHeight) / 2),
                        delay: .1,
                        ease: Expo.easeInOut
                    })
                } else {
                    this.prevButton_do.setX(this.finalX - this.buttonWidth);
                    this.prevButton_do.setY(Math.round((this.stageHeight - this.buttonHeight) / 2))
                }
            }
            if (this.isMaximized_bl && this.zoomButton_do && this.isMobile_bl) {
                TweenMax.killTweensOf(this.zoomButton_do);
                this.zoomButton_do.setX(this.stageWidth - this.buttonWidth);
                this.zoomButton_do.setY(1)
            }
            this.positionSlideShowPreloader(e)
        };
        this.setupPreloader = function () {
            FWDPreloader.setPrototype();
            this.preloader_do = new FWDPreloader(this.preloaderImg, 30, 29, 10, 50);
            this.preloader_do.addListener(FWDPreloader.HIDE_COMPLETE, this.onPreloaderHideCompleteHandler)
        };
        this.positionPreloader = function () {
            if (this.preloader_do) {
                this.preloader_do.setX(parseInt((this.stageWidth - this.preloader_do.getWidth()) / 2));
                this.preloader_do.setY(parseInt((this.stageHeight - this.preloader_do.getHeight()) / 2))
            }
        };
        this.onPreloaderHideCompleteHandler = function () {
            r.removeChild(r.preloader_do)
        };
        this.addKeyboardSupport = function () {
            if (document.addEventListener) {
                document.addEventListener("keydown", this.onKeyDownHandler);
                document.addEventListener("keyup", this.onKeyUpHandler)
            } else {
                document.attachEvent("onkeydown", this.onKeyDownHandler);
                document.attachEvent("onkeyup", this.onKeyUpHandler)
            }
        };
        this.onKeyDownHandler = function (e) {
            if (e.keyCode == 39) {
                r.goToNextItem()
            } else if (e.keyCode == 37) {
                r.goToPrevItem()
            }
            if (document.removeEventListener) {
                document.removeEventListener("keydown", r.onKeyDownHandler)
            } else {
                document.detachEvent("onkeydown", r.onKeyDownHandler)
            } if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.onKeyUpHandler = function (e) {
            if (document.addEventListener) {
                document.addEventListener("keydown", r.onKeyDownHandler)
            } else {
                document.attachEvent("onkeydown", r.onKeyDownHandler)
            } if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.hide = function () {
            if (this.isTweening_bl) return;
            if (this.image_img) {
                this.image_img.onload = null;
                this.image_img.onerror = null
            }
            this.clearMainEventsIntervalsAndTimeOuts();
            if (this.type_str == t.YOUTUBE || this.type_str == t.VIMEO) {
                if (this.opacityType == "filter") {
                    this.currentItem_do.setVisible(false)
                } else {
                    this.itemsHolder_do.removeChild(this.currentItem_do)
                }
                TweenMax.to(this.itemsBorder_do, .9, {
                    alpha: 0,
                    ease: Quint.easeOut
                });
                TweenMax.to(this.mainItemsHolder_do, .9, {
                    x: this.stageWidth / 2,
                    y: this.stageHeight / 2,
                    w: 0,
                    h: 0,
                    ease: Expo.easeInOut
                });
                TweenMax.to(this.bk_do, .9, {
                    alpha: 0,
                    delay: .9,
                    ease: Quint.easeOut,
                    onComplete: this.onHideComplete
                })
            } else if (this.type_str == t.IMAGE) {
                if (this.currentItem_do && this.currentItem_do.screen) TweenMax.to(this.currentItem_do, .7, {
                    alpha: 0,
                    ease: Quint.easeOut
                });
                TweenMax.to(this.itemsBorder_do, .9, {
                    alpha: 0,
                    delay: .1,
                    ease: Quint.easeOut
                });
                TweenMax.to(this.mainItemsHolder_do, .9, {
                    x: this.stageWidth / 2,
                    y: this.stageHeight / 2,
                    w: 0,
                    h: 0,
                    delay: .2,
                    ease: Expo.easeInOut
                });
                TweenMax.to(this.bk_do, .9, {
                    alpha: 0,
                    delay: 1.2,
                    ease: Quint.easeOut,
                    onComplete: this.onHideComplete
                })
            }
            this.preloader_do.hide(true);
            this.hideButtons(true);
            this.currentItem_do = null;
            this.prevItem_do = null;
            this.isTweening_bl = true;
            this.firstTimeShowed_bl = true
        };
        this.hideButtons = function (e) {
            if (e) {
                TweenMax.to(this.closeButton_do, .8, {
                    x: this.stageWidth,
                    ease: Expo.easeInOut
                });
                if (this.infoButton_do) TweenMax.to(this.infoButton_do, .8, {
                    x: this.stageWidth,
                    ease: Expo.easeInOut
                });
                if (this.slideshowButtton_do) TweenMax.to(this.slideshowButtton_do, .8, {
                    x: this.stageWidth,
                    ease: Expo.easeInOut
                });
                if (this.zoomButton_do) TweenMax.to(this.zoomButton_do, .8, {
                    x: this.stageWidth,
                    ease: Expo.easeInOut
                });
                if (this.nextButton_do) {
                    TweenMax.to(this.nextButton_do, .8, {
                        x: this.stageWidth,
                        ease: Expo.easeInOut
                    });
                    TweenMax.to(this.prevButton_do, .8, {
                        x: -this.buttonWidth,
                        ease: Expo.easeInOut
                    })
                }
                if (this.slideShowPreloader_do) TweenMax.to(this.slideShowPreloader_do, .8, {
                    x: this.stageWidth,
                    ease: Expo.easeInOut
                })
            } else {
                this.closeButton_do.setVisible(false);
                if (this.infoButton_do) this.infoButton_do.setVisible(false);
                if (this.zoomButton_do) this.zoomButton_do.setVisible(false);
                if (this.slideshowButtton_do) this.slideshowButtton_do.setVisible(false);
                if (this.nextButton_do) {
                    this.nextButton_do.setVisible(false);
                    this.prevButton_do.setVisible(false)
                }
                if (this.slideShowPreloader_do) this.slideShowPreloader_do.image_do.setVisible(false)
            }
        };
        this.showButtons = function () {
            this.positionButtons(false);
            this.closeButton_do.setVisible(true);
            this.closeButton_do.setX(this.stageWidth);
            if (this.infoButton_do) {
                this.infoButton_do.setVisible(true);
                this.infoButton_do.setX(this.stageWidth)
            }
            if (this.zoomButton_do && (this.type_str != t.YOUTUBE || this.type_str != t.VIMEO)) {
                this.zoomButton_do.setVisible(true);
                this.zoomButton_do.setX(this.stageWidth)
            }
            if (this.slideshowButtton_do) {
                this.slideshowButtton_do.setVisible(true);
                this.slideshowButtton_do.setX(this.stageWidth)
            }
            if (this.nextButton_do) {
                this.nextButton_do.setVisible(true);
                this.nextButton_do.setX(this.stageWidth);
                this.prevButton_do.setVisible(true);
                this.prevButton_do.setX(-this.buttonWidth)
            }
            if (this.slideShowPreloader_do) {
                this.slideShowPreloader_do.image_do.setX(0);
                this.slideShowPreloader_do.setX(this.stageWidth);
                this.slideShowPreloader_do.image_do.setVisible(true)
            }
            this.positionButtons(true)
        };
        this.onHideComplete = function () {
            r.addZoomButtonBackToButtonsArray();
            r.screen.parentNode.removeChild(r.screen);
            r.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.clearMainEventsIntervalsAndTimeOuts = function () {
            clearInterval(this.updateImageWhenMaximized_int);
            clearInterval(this.resizeHandlerIntervalId_int);
            clearTimeout(this.transitionDoneId_to);
            clearTimeout(this.transitionShapeDoneId_to);
            clearTimeout(this.showVideoId_to);
            clearTimeout(this.maximizeCompleteTimeOutId_to);
            clearTimeout(this.minimizeCompleteTimeOutId_to);
            clearTimeout(this.showFirstTimeWithDelayId_to);
            this.removeEventsForScrollngImageOnDesktop();
            if (this.timerManager) this.timerManager.stop();
            if (this.isMobile_bl) {
                e.removeEventListener("touchstart", this.mouseDummyHandler);
                e.removeEventListener("touchmove", this.mouseDummyHandler);
                e.removeEventListener("touchstart", this.onTouchStartScrollImage);
                e.removeEventListener("touchend", this.onTouchEndScrollImage);
                e.removeEventListener("touchmove", this.onTouchMoveScrollImage)
            } else {
                if (e.addEventListener) {
                    e.removeEventListener("mousewheel", this.mouseDummyHandler);
                    e.removeEventListener("DOMMouseScroll", this.mouseDummyHandler);
                    e.removeEventListener("mousemove", this.updateMaximizeImageOnMouseMovedHandler)
                } else if (document.attachEvent) {
                    document.detachEvent("onmousewheel", this.mouseDummyHandler);
                    document.detachEvent("onmousemove", this.updateMaximizeImageOnMouseMovedHandler)
                }
            } if (this.addKeyboardSupport_bl) {
                if (document.removeEventListener) {
                    document.removeEventListener("keydown", this.onKeyDownHandler);
                    document.removeEventListener("keyup", this.onKeyUpHandler)
                } else if (document.attachEvent) {
                    document.detachEvent("onkeydown", this.onKeyDownHandler);
                    document.detachEvent("onkeyup", this.onKeyUpHandler)
                }
            }
        };
        this.destroy = function () {
            if (this.image_img) {
                this.image_img.onload = null;
                this.image_img.onerror = null
            }
            if (this.slideShowPreloader_do) {
                TweenMax.killTweensOf(this.slideShowPreloader_do);
                this.slideShowPreloader_do.destroy()
            }
            this.info_do.destroy();
            if (this.infoWindow_do) this.infoWindow_do.destroy();
            if (this.timerManager) this.timerManager.destroy();
            this.preloader_do.destroy();
            if (this.customContextMenu) this.customContextMenu.destroy();
            this.clearMainEventsIntervalsAndTimeOuts();
            this.cleanChildren(0);
            if (this.nextButton_do) {
                TweenMax.killTweensOf(this.nextButton_do);
                TweenMax.killTweensOf(this.prevButton_do);
                this.nextButton_do.destroy();
                this.prevButton_do.destroy()
            }
            if (this.closeButton_do) {
                TweenMax.killTweensOf(this.closeButton_do);
                this.closeButton_do.destroy()
            }
            if (this.zoomButton_do) {
                TweenMax.killTweensOf(this.zoomButton_do);
                this.zoomButton_do.destroy()
            }
            if (this.infoButton_do) {
                TweenMax.killTweensOf(this.infoButton_do);
                this.infoButton_do.destroy()
            }
            if (this.slideshowButtton_do) {
                TweenMax.killTweensOf(this.slideshowButtton_do);
                this.slideshowButtton_do.destroy()
            }
            if (this.currentItem_do) {
                if (this.contains(this.currentItem_do)) {
                    TweenMax.killTweensOf(this.currentItem_do);
                    this.currentItem_do.destroy()
                }
            }
            TweenMax.killTweensOf(this.mainItemsHolder_do);
            TweenMax.killTweensOf(this.bk_do);
            TweenMax.killTweensOf(this.itemsBackground_do);
            TweenMax.killTweensOf(this.itemsBorder_do);
            TweenMax.killTweensOf(this.itemsHolder_do);
            this.mainItemsHolder_do.destroy();
            this.bk_do.destroy();
            this.mainItemsHolder_do.destroy();
            this.itemsBackground_do.destroy();
            this.itemsBorder_do.destroy();
            this.itemsHolder_do.destroy();
            this.image_img = null;
            this.closeN_img = null;
            this.closeS_img = null;
            this.nextN_img = null;
            this.nextS_img = null;
            this.prevN_img = null;
            this.prevS_img = null;
            this.maximizeN_img = null;
            this.maximizeS_img = null;
            this.minimizeN_img = null;
            this.minimizeS_img = null;
            this.pauseN_img = null;
            this.pauseS_img = null;
            this.playN_img = null;
            this.playS_img = null;
            this.infoOpenN_img = null;
            this.infoOpenS_img = null;
            this.infoCloseN_img = null;
            this.infoCloseS_img = null;
            this.preloaderImg = null;
            this.info_do = null;
            this.infoWindow_do = null;
            this.slideShowPreloader_do = null;
            this.timerManager = null;
            this.bk_do = null;
            this.mainItemsHolder_do = null;
            this.itemsBackground_do = null;
            this.itemsBorder_do = null;
            this.itemsHolder_do = null;
            this.currentItem_do = null;
            this.prevItem_do = null;
            this.closeButton_do = null;
            this.nextButton_do = null;
            this.prevButton_do = null;
            this.zoomButton_do = null;
            this.slideshowButtton_do = null;
            this.data_ar = null;
            n = null;
            r.setInnerHTML("");
            i.destroy();
            r = null;
            i = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.YOUTUBE = "youtube";
    t.VIMEO = "vimeo";
    t.IMAGE = "image_img";
    t.MAXIMIZE_COMPLETE = "maximizeComplete";
    t.MINIMIZE_START = "minimizeStart";
    t.SHOW_START = "showStart";
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDLightBox = t
})(window);
(window._gsQueue || (window._gsQueue = [])).push(function () {
    _gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
        var r = function (e, t, r) {
            n.call(this, e, t, r);
            this._cycle = 0;
            this._yoyo = this.vars.yoyo == true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._dirty = true
        }, i = r.prototype = n.to({}, .1, {}),
            s = [];
        i.constructor = r;
        i.kill()._gc = false;
        r.killTweensOf = r.killDelayedCallsTo = n.killTweensOf;
        r.getTweensOf = n.getTweensOf;
        r.ticker = n.ticker;
        i.invalidate = function () {
            this._yoyo = this.vars.yoyo == true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return n.prototype.invalidate.call(this)
        };
        i.updateTo = function (e, t) {
            var r = this.ratio,
                i;
            if (t)
                if (this.timeline != null)
                    if (this._startTime < this._timeline._time) {
                        this._startTime = this._timeline._time;
                        this._uncache(false);
                        if (this._gc) {
                            this._enabled(true, false)
                        } else {
                            this._timeline.insert(this, this._startTime - this._delay)
                        }
                    }
            for (i in e) {
                this.vars[i] = e[i]
            }
            if (this._initted) {
                if (t) {
                    this._initted = false
                } else {
                    if (this._notifyPluginsOfEnabled && this._firstPT) {
                        n._onPluginEvent("_onDisable", this)
                    }
                    if (this._time / this._duration > .998) {
                        var s = this._time;
                        this.render(0, true, false);
                        this._initted = false;
                        this.render(s, true, false)
                    } else if (this._time > 0) {
                        this._initted = false;
                        this._init();
                        var o = 1 / (1 - r),
                            u = this._firstPT,
                            a;
                        while (u) {
                            a = u.s + u.c;
                            u.c *= o;
                            u.s = a - u.c;
                            u = u._next
                        }
                    }
                }
            }
            return this
        };
        i.render = function (e, t, n) {
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                i = this._time,
                o = this._totalTime,
                u = this._cycle,
                a, f, l;
            if (e >= r) {
                this._totalTime = r;
                this._cycle = this._repeat;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = 0;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0
                } else {
                    this._time = this._duration;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1
                } if (!this._reversed) {
                    a = true;
                    f = "onComplete"
                }
                if (this._duration === 0) {
                    if (e === 0 || this._rawPrevTime < 0)
                        if (this._rawPrevTime !== e) {
                            n = true
                        }
                    this._rawPrevTime = e
                }
            } else if (e <= 0) {
                this._totalTime = this._time = this._cycle = 0;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                if (o !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    f = "onReverseComplete";
                    a = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0) {
                        if (this._rawPrevTime >= 0) {
                            n = true
                        }
                        this._rawPrevTime = e
                    }
                } else if (!this._initted) {
                    n = true
                }
            } else {
                this._totalTime = this._time = e;
                if (this._repeat !== 0) {
                    var c = this._duration + this._repeatDelay;
                    this._cycle = this._totalTime / c >> 0;
                    if (this._cycle !== 0)
                        if (this._cycle === this._totalTime / c) {
                            this._cycle--
                        }
                    this._time = this._totalTime - this._cycle * c;
                    if (this._yoyo)
                        if ((this._cycle & 1) !== 0) {
                            this._time = this._duration - this._time
                        }
                    if (this._time > this._duration) {
                        this._time = this._duration
                    } else if (this._time < 0) {
                        this._time = 0
                    }
                }
                if (this._easeType) {
                    var h = this._time / this._duration,
                        p = this._easeType,
                        d = this._easePower;
                    if (p === 1 || p === 3 && h >= .5) {
                        h = 1 - h
                    }
                    if (p === 3) {
                        h *= 2
                    }
                    if (d === 1) {
                        h *= h
                    } else if (d === 2) {
                        h *= h * h
                    } else if (d === 3) {
                        h *= h * h * h
                    } else if (d === 4) {
                        h *= h * h * h * h
                    }
                    if (p === 1) {
                        this.ratio = 1 - h
                    } else if (p === 2) {
                        this.ratio = h
                    } else if (this._time / this._duration < .5) {
                        this.ratio = h / 2
                    } else {
                        this.ratio = 1 - h / 2
                    }
                } else {
                    this.ratio = this._ease.getRatio(this._time / this._duration)
                }
            } if (i === this._time && !n) {
                return
            } else if (!this._initted) {
                this._init();
                if (!a && this._time) {
                    this.ratio = this._ease.getRatio(this._time / this._duration)
                }
            }
            if (!this._active)
                if (!this._paused) {
                    this._active = true
                }
            if (o == 0)
                if (this.vars.onStart)
                    if (this._totalTime !== 0 || this._duration === 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)
                        }
            l = this._firstPT;
            while (l) {
                if (l.f) {
                    l.t[l.p](l.c * this.ratio + l.s)
                } else {
                    var v = l.c * this.ratio + l.s;
                    if (l.p == "x") {
                        l.t.setX(v)
                    } else if (l.p == "y") {
                        l.t.setY(v)
                    } else if (l.p == "w") {
                        l.t.setWidth(v)
                    } else if (l.p == "h") {
                        l.t.setHeight(v)
                    } else if (l.p == "alpha") {
                        l.t.setAlpha(v)
                    } else {
                        l.t[l.p] = v
                    }
                }
                l = l._next
            }
            if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)
                }
            if (this._cycle != u)
                if (!t)
                    if (!this._gc)
                        if (this.vars.onRepeat) {
                            this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || s)
                        }
            if (f)
                if (!this._gc) {
                    if (a) {
                        if (this._timeline.autoRemoveChildren) {
                            this._enabled(false, false)
                        }
                        this._active = false
                    }
                    if (!t)
                        if (this.vars[f]) {
                            this.vars[f].apply(this.vars[f + "Scope"] || this, this.vars[f + "Params"] || s)
                        }
                }
        };
        r.to = function (e, t, n) {
            return new r(e, t, n)
        };
        r.from = function (e, t, n) {
            n.runBackwards = true;
            if (n.immediateRender != false) {
                n.immediateRender = true
            }
            return new r(e, t, n)
        };
        r.fromTo = function (e, t, n, i) {
            i.startAt = n;
            if (n.immediateRender) {
                i.immediateRender = true
            }
            return new r(e, t, i)
        };
        r.staggerTo = r.allTo = function (e, t, n, i, s, o, u) {
            i = i || 0;
            var a = [],
                f = e.length,
                l = n.delay || 0,
                c, h, p;
            for (h = 0; h < f; h++) {
                c = {};
                for (p in n) {
                    c[p] = n[p]
                }
                c.delay = l;
                if (h === f - 1)
                    if (s) {
                        c.onComplete = function () {
                            if (n.onComplete) {
                                n.onComplete.apply(n.onCompleteScope, n.onCompleteParams)
                            }
                            s.apply(u, o)
                        }
                    }
                a[h] = new r(e[h], t, c);
                l += i
            }
            return a
        };
        r.staggerFrom = r.allFrom = function (e, t, n, i, s, o, u) {
            n.runBackwards = true;
            if (n.immediateRender != false) {
                n.immediateRender = true
            }
            return r.staggerTo(e, t, n, i, s, o, u)
        };
        r.staggerFromTo = r.allFromTo = function (e, t, n, i, s, o, u, a) {
            i.startAt = n;
            if (n.immediateRender) {
                i.immediateRender = true
            }
            return r.staggerTo(e, t, i, s, o, u, a)
        };
        r.delayedCall = function (e, t, n, i, s) {
            return new r(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                onCompleteScope: i,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                onReverseCompleteScope: i,
                immediateRender: false,
                useFrames: s,
                overwrite: 0
            })
        };
        r.set = function (e, t) {
            return new r(e, 0, t)
        };
        r.isTweening = function (e) {
            var t = n.getTweensOf(e),
                r = t.length,
                i;
            while (--r > -1) {
                if ((i = t[r])._active || i._startTime === i.timeline._time && i.timeline._active) {
                    return true
                }
            }
            return false
        };
        var o = function (e, t) {
            var r = [],
                i = 0,
                s = e._first;
            while (s) {
                if (s instanceof n) {
                    r[i++] = s
                } else {
                    if (t) {
                        r[i++] = s
                    }
                    r = r.concat(o(s, t));
                    i = r.length
                }
                s = s._next
            }
            return r
        }, u = r.getAllTweens = function (t) {
                var n = o(e._rootTimeline, t);
                return n.concat(o(e._rootFramesTimeline, t))
            };
        r.killAll = function (e, n, r, i) {
            if (n == null) {
                n = true
            }
            if (r == null) {
                r = true
            }
            var s = u(i != false),
                o = s.length,
                a = n && r && i,
                f, l, c;
            for (c = 0; c < o; c++) {
                l = s[c];
                if (a || l instanceof t || (f = l.target === l.vars.onComplete) && r || n && !f) {
                    if (e) {
                        l.totalTime(l.totalDuration())
                    } else {
                        l._enabled(false, false)
                    }
                }
            }
        };
        r.killChildTweensOf = function (e, t) {
            if (e == null) {
                return
            }
            if (e.jquery) {
                e.each(function (e, n) {
                    r.killChildTweensOf(n, t)
                });
                return
            }
            var i = n._tweenLookup,
                s = [],
                o, u, a, f, l;
            for (a in i) {
                u = i[a].target.parentNode;
                while (u) {
                    if (u === e) {
                        s = s.concat(i[a].tweens)
                    }
                    u = u.parentNode
                }
            }
            l = s.length;
            for (f = 0; f < l; f++) {
                if (t) {
                    s[f].totalTime(s[f].totalDuration())
                }
                s[f]._enabled(false, false)
            }
        };
        r.pauseAll = function (e, t, n) {
            a(true, e, t, n)
        };
        r.resumeAll = function (e, t, n) {
            a(false, e, t, n)
        };
        var a = function (e, n, r, i) {
            if (n == undefined) {
                n = true
            }
            if (r == undefined) {
                r = true
            }
            var s = u(i),
                o = n && r && i,
                a = s.length,
                f, l;
            while (--a > -1) {
                l = s[a];
                if (o || l instanceof t || (f = l.target === l.vars.onComplete) && r || n && !f) {
                    l.paused(e)
                }
            }
        };
        i.progress = function (e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * e + this._cycle * this._duration, false)
        };
        i.totalProgress = function (e) {
            return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * e, false)
        };
        i.time = function (e, t) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            if (e > this._duration) {
                e = this._duration
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                e = this._duration - e + this._cycle * (this._duration + this._repeatDelay)
            } else if (this._repeat != 0) {
                e += this._cycle * (this._duration + this._repeatDelay)
            }
            return this.totalTime(e, t)
        };
        i.totalDuration = function (e) {
            if (!arguments.length) {
                if (this._dirty) {
                    this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
                    this._dirty = false
                }
                return this._totalDuration
            }
            return this._repeat == -1 ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        i.repeat = function (e) {
            if (!arguments.length) {
                return this._repeat
            }
            this._repeat = e;
            return this._uncache(true)
        };
        i.repeatDelay = function (e) {
            if (!arguments.length) {
                return this._repeatDelay
            }
            this._repeatDelay = e;
            return this._uncache(true)
        };
        i.yoyo = function (e) {
            if (!arguments.length) {
                return this._yoyo
            }
            this._yoyo = e;
            return this
        };
        return r
    }, true);
    _gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
        "use strict";
        var r = function (e) {
            t.call(this, e);
            this._labels = {};
            this.autoRemoveChildren = this.vars.autoRemoveChildren == true;
            this.smoothChildTiming = this.vars.smoothChildTiming == true;
            this._sortChildren = true;
            this._onUpdate = this.vars.onUpdate;
            var n = i.length,
                r, s;
            while (--n > -1) {
                if (s = this.vars[i[n]]) {
                    r = s.length;
                    while (--r > -1) {
                        if (s[r] === "{self}") {
                            s = this.vars[i[n]] = s.concat();
                            s[r] = this
                        }
                    }
                }
            }
            if (this.vars.tweens instanceof Array) {
                this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0)
            }
        }, i = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
            s = [],
            o = function (e) {
                var t = {}, n;
                for (n in e) {
                    t[n] = e[n]
                }
                return t
            }, u = r.prototype = new t;
        u.constructor = r;
        u.kill()._gc = false;
        u.to = function (e, t, r, i, s) {
            return this.insert(new n(e, t, r), this._parseTimeOrLabel(s) + (i || 0))
        };
        u.from = function (e, t, r, i, s) {
            return this.insert(n.from(e, t, r), this._parseTimeOrLabel(s) + (i || 0))
        };
        u.fromTo = function (e, t, r, i, s, o) {
            return this.insert(n.fromTo(e, t, r, i), this._parseTimeOrLabel(o) + (s || 0))
        };
        u.staggerTo = function (e, t, i, s, u, a, f, l, c) {
            var h = new r({
                onComplete: f,
                onCompleteParams: l,
                onCompleteScope: c
            });
            s = s || 0;
            for (var p = 0; p < e.length; p++) {
                if (i.startAt != null) {
                    i.startAt = o(i.startAt)
                }
                h.insert(new n(e[p], t, o(i)), p * s)
            }
            return this.insert(h, this._parseTimeOrLabel(a) + (u || 0))
        };
        u.staggerFrom = function (e, t, n, r, i, s, o, u, a) {
            if (n.immediateRender == null) {
                n.immediateRender = true
            }
            n.runBackwards = true;
            return this.staggerTo(e, t, n, r, i, s, o, u, a)
        };
        u.staggerFromTo = function (e, t, n, r, i, s, o, u, a, f) {
            r.startAt = n;
            if (n.immediateRender) {
                r.immediateRender = true
            }
            return this.staggerTo(e, t, r, i, s, o, u, a, f)
        };
        u.call = function (e, t, r, i, s) {
            return this.insert(n.delayedCall(0, e, t, r), this._parseTimeOrLabel(s) + (i || 0))
        };
        u.set = function (e, t, r, i) {
            t.immediateRender = false;
            return this.insert(new n(e, 0, t), this._parseTimeOrLabel(i) + (r || 0))
        };
        r.exportRoot = function (e, t) {
            e = e || {};
            if (e.smoothChildTiming == null) {
                e.smoothChildTiming = true
            }
            var i = new r(e),
                s = i._timeline;
            if (t == null) {
                t = true
            }
            s._remove(i, true);
            i._startTime = 0;
            i._rawPrevTime = i._time = i._totalTime = s._time;
            var o = s._first,
                u;
            while (o) {
                u = o._next;
                if (!t || !(o instanceof n && o.target == o.vars.onComplete)) {
                    i.insert(o, o._startTime - o._delay)
                }
                o = u
            }
            s.insert(i, 0);
            return i
        };
        u.insert = function (r, i) {
            if (r instanceof e) {} else if (r instanceof Array) {
                return this.insertMultiple(r, i)
            } else if (typeof r === "string") {
                return this.addLabel(r, this._parseTimeOrLabel(i || 0, true))
            } else if (typeof r === "function") {
                r = n.delayedCall(0, r)
            } else {
                throw "ERROR: Cannot insert() " + r + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.";
                return this
            }
            t.prototype.insert.call(this, r, this._parseTimeOrLabel(i || 0, true));
            if (this._gc)
                if (!this._paused)
                    if (this._time === this._duration)
                        if (this._time < this.duration()) {
                            var s = this;
                            while (s._gc && s._timeline) {
                                if (s._timeline.smoothChildTiming) {
                                    s.totalTime(s._totalTime, true)
                                } else {
                                    s._enabled(true, false)
                                }
                                s = s._timeline
                            }
                        }
            return this
        };
        u.remove = function (t) {
            if (t instanceof e) {
                return this._remove(t, false)
            } else if (t instanceof Array) {
                var n = t.length;
                while (--n > -1) {
                    this.remove(t[n])
                }
                return this
            } else if (typeof t === "string") {
                return this.removeLabel(t)
            }
            return this.kill(null, t)
        };
        u.append = function (e, t) {
            return this.insert(e, this.duration() + (t || 0))
        };
        u.insertMultiple = function (e, t, n, i) {
            n = n || "normal";
            i = i || 0;
            var s, o, u = this._parseTimeOrLabel(t || 0, true),
                a = e.length;
            for (s = 0; s < a; s++) {
                if ((o = e[s]) instanceof Array) {
                    o = new r({
                        tweens: o
                    })
                }
                this.insert(o, u);
                if (typeof o === "string" || typeof o === "function") {} else if (n === "sequence") {
                    u = o._startTime + o.totalDuration() / o._timeScale
                } else if (n === "start") {
                    o._startTime -= o.delay()
                }
                u += i
            }
            return this._uncache(true)
        };
        u.appendMultiple = function (e, t, n, r) {
            return this.insertMultiple(e, this.duration() + (t || 0), n, r)
        };
        u.addLabel = function (e, t) {
            this._labels[e] = t;
            return this
        };
        u.removeLabel = function (e) {
            delete this._labels[e];
            return this
        };
        u.getLabelTime = function (e) {
            return this._labels[e] != null ? this._labels[e] : -1
        };
        u._parseTimeOrLabel = function (e, t) {
            if (e == null) {
                return this.duration()
            } else if (typeof e === "string" && isNaN(e)) {
                if (this._labels[e] == null) {
                    return t ? this._labels[e] = this.duration() : 0
                }
                return this._labels[e]
            }
            return Number(e)
        };
        u.seek = function (e, t) {
            return this.totalTime(this._parseTimeOrLabel(e, false), t != false)
        };
        u.stop = function () {
            return this.paused(true)
        };
        u.gotoAndPlay = function (e, n) {
            return t.prototype.play.call(this, e, n)
        };
        u.gotoAndStop = function (e, t) {
            return this.pause(e, t)
        };
        u.render = function (e, t, n) {
            if (this._gc) {
                this._enabled(true, false)
            }
            this._active = !this._paused;
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                i = this._time,
                o = this._startTime,
                u = this._timeScale,
                a = this._paused,
                f, l, c, h;
            if (e >= r) {
                this._totalTime = this._time = r;
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        l = true;
                        h = "onComplete";
                        if (this._duration === 0)
                            if (e === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== e) {
                                    n = true
                                }
                    }
                this._rawPrevTime = e;
                e = r + 1e-6
            } else if (e <= 0) {
                this._totalTime = this._time = 0;
                if (i !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    h = "onReverseComplete";
                    l = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0)
                        if (this._rawPrevTime >= 0) {
                            n = true
                        }
                } else if (!this._initted) {
                    n = true
                }
                this._rawPrevTime = e;
                e = -1e-6
            } else {
                this._totalTime = this._time = this._rawPrevTime = e
            } if (this._time === i && !n) {
                return
            } else if (!this._initted) {
                this._initted = true
            }
            if (i === 0)
                if (this.vars.onStart)
                    if (this._time !== 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)
                        }
            if (this._time > i) {
                f = this._first;
                while (f) {
                    c = f._next;
                    if (this._paused && !a) {
                        break
                    } else if (f._active || f._startTime <= this._time && !f._paused && !f._gc) {
                        if (!f._reversed) {
                            f.render((e - f._startTime) * f._timeScale, t, false)
                        } else {
                            f.render((!f._dirty ? f._totalDuration : f.totalDuration()) - (e - f._startTime) * f._timeScale, t, false)
                        }
                    }
                    f = c
                }
            } else {
                f = this._last;
                while (f) {
                    c = f._prev;
                    if (this._paused && !a) {
                        break
                    } else if (f._active || f._startTime <= i && !f._paused && !f._gc) {
                        if (!f._reversed) {
                            f.render((e - f._startTime) * f._timeScale, t, false)
                        } else {
                            f.render((!f._dirty ? f._totalDuration : f.totalDuration()) - (e - f._startTime) * f._timeScale, t, false)
                        }
                    }
                    f = c
                }
            } if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)
                }
            if (h)
                if (!this._gc)
                    if (o === this._startTime || u != this._timeScale)
                        if (this._time === 0 || r >= this.totalDuration()) {
                            if (l) {
                                if (this._timeline.autoRemoveChildren) {
                                    this._enabled(false, false)
                                }
                                this._active = false
                            }
                            if (!t)
                                if (this.vars[h]) {
                                    this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || s)
                                }
                        }
        };
        u._hasPausedChild = function () {
            var e = this._first;
            while (e) {
                if (e._paused || e instanceof r && e._hasPausedChild()) {
                    return true
                }
                e = e._next
            }
            return false
        };
        u.getChildren = function (e, t, r, i) {
            i = i || -9999999999;
            var s = [],
                o = this._first,
                u = 0;
            while (o) {
                if (o._startTime < i) {} else if (o instanceof n) {
                    if (t != false) {
                        s[u++] = o
                    }
                } else {
                    if (r != false) {
                        s[u++] = o
                    }
                    if (e != false) {
                        s = s.concat(o.getChildren(true, t, r));
                        u = s.length
                    }
                }
                o = o._next
            }
            return s
        };
        u.getTweensOf = function (e, t) {
            var r = n.getTweensOf(e),
                i = r.length,
                s = [],
                o = 0;
            while (--i > -1) {
                if (r[i].timeline === this || t && this._contains(r[i])) {
                    s[o++] = r[i]
                }
            }
            return s
        };
        u._contains = function (e) {
            var t = e.timeline;
            while (t) {
                if (t === this) {
                    return true
                }
                t = t.timeline
            }
            return false
        };
        u.shiftChildren = function (e, t, n) {
            n = n || 0;
            var r = this._first;
            while (r) {
                if (r._startTime >= n) {
                    r._startTime += e
                }
                r = r._next
            }
            if (t) {
                for (var i in this._labels) {
                    if (this._labels[i] >= n) {
                        this._labels[i] += e
                    }
                }
            }
            return this._uncache(true)
        };
        u._kill = function (e, t) {
            if (e == null)
                if (t == null) {
                    return this._enabled(false, false)
                }
            var n = t == null ? this.getChildren(true, true, false) : this.getTweensOf(t),
                r = n.length,
                i = false;
            while (--r > -1) {
                if (n[r]._kill(e, t)) {
                    i = true
                }
            }
            return i
        };
        u.clear = function (e) {
            var t = this.getChildren(false, true, true),
                n = t.length;
            this._time = this._totalTime = 0;
            while (--n > -1) {
                t[n]._enabled(false, false)
            }
            if (e != false) {
                this._labels = {}
            }
            return this._uncache(true)
        };
        u.invalidate = function () {
            var e = this._first;
            while (e) {
                e.invalidate();
                e = e._next
            }
            return this
        };
        u._enabled = function (e, n) {
            if (e == this._gc) {
                var r = this._first;
                while (r) {
                    r._enabled(e, true);
                    r = r._next
                }
            }
            return t.prototype._enabled.call(this, e, n)
        };
        u.progress = function (e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * e, false)
        };
        u.duration = function (e) {
            if (!arguments.length) {
                if (this._dirty) {
                    this.totalDuration()
                }
                return this._duration
            }
            if (this.duration() !== 0)
                if (e !== 0) {
                    this.timeScale(this._duration / e)
                }
            return this
        };
        u.totalDuration = function (e) {
            if (!arguments.length) {
                if (this._dirty) {
                    var t = 0,
                        n = this._first,
                        r = -999999999999,
                        i, s;
                    while (n) {
                        i = n._next;
                        if (n._startTime < r && this._sortChildren) {
                            this.insert(n, n._startTime - n._delay)
                        } else {
                            r = n._startTime
                        } if (n._startTime < 0) {
                            t -= n._startTime;
                            this.shiftChildren(-n._startTime, false, -9999999999)
                        }
                        s = n._startTime + (!n._dirty ? n._totalDuration : n.totalDuration()) / n._timeScale;
                        if (s > t) {
                            t = s
                        }
                        n = i
                    }
                    this._duration = this._totalDuration = t;
                    this._dirty = false
                }
                return this._totalDuration
            }
            if (this.totalDuration() !== 0)
                if (e !== 0) {
                    this.timeScale(this._totalDuration / e)
                }
            return this
        };
        u.usesFrames = function () {
            var t = this._timeline;
            while (t._timeline) {
                t = t._timeline
            }
            return t === e._rootFramesTimeline
        };
        u.rawTime = function () {
            return this._paused || this._totalTime !== 0 && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        };
        return r
    }, true);
    _gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (e, t, n) {
        var r = function (t) {
            e.call(this, t);
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._cycle = 0;
            this._yoyo = this.vars.yoyo == true;
            this._dirty = true
        }, i = [],
            s = new n(null, null, 1, 0),
            o = function (e) {
                while (e) {
                    if (e._paused) {
                        return true
                    }
                    e = e._timeline
                }
                return false
            }, u = r.prototype = new e;
        u.constructor = r;
        u.kill()._gc = false;
        r.version = 12;
        u.invalidate = function () {
            this._yoyo = this.vars.yoyo == true;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return e.prototype.invalidate.call(this)
        };
        u.addCallback = function (e, n, r, i) {
            return this.insert(t.delayedCall(0, e, r, i), n)
        };
        u.removeCallback = function (e, t) {
            if (t == null) {
                this._kill(null, e)
            } else {
                var n = this.getTweensOf(e, false),
                    r = n.length,
                    i = this._parseTimeOrLabel(t, false);
                while (--r > -1) {
                    if (n[r]._startTime === i) {
                        n[r]._enabled(false, false)
                    }
                }
            }
            return this
        };
        u.tweenTo = function (e, n) {
            n = n || {};
            var r = {
                ease: s,
                overwrite: 2,
                useFrames: this.usesFrames(),
                immediateRender: false
            }, o, u;
            for (o in n) {
                r[o] = n[o]
            }
            r.time = this._parseTimeOrLabel(e, false);
            u = new t(this, Math.abs(Number(r.time) - this._time) / this._timeScale || .001, r);
            r.onStart = function () {
                u.target.paused(true);
                if (u.vars.time != u.target.time()) {
                    u.duration(Math.abs(u.vars.time - u.target.time()) / u.target._timeScale)
                }
                if (n.onStart) {
                    n.onStart.apply(n.onStartScope || u, n.onStartParams || i)
                }
            };
            return u
        };
        u.tweenFromTo = function (e, t, n) {
            n = n || {};
            n.startAt = {
                time: this._parseTimeOrLabel(e, false)
            };
            var r = this.tweenTo(t, n);
            return r.duration(Math.abs(r.vars.time - r.vars.startAt.time) / this._timeScale || .001)
        };
        u.render = function (e, t, n) {
            if (this._gc) {
                this._enabled(true, false)
            }
            this._active = !this._paused;
            var r = !this._dirty ? this._totalDuration : this.totalDuration(),
                s = this._time,
                o = this._totalTime,
                u = this._startTime,
                a = this._timeScale,
                f = this._rawPrevTime,
                l = this._paused,
                c = this._cycle,
                h, p, d, v, m;
            if (e >= r) {
                if (!this._locked) {
                    this._totalTime = r;
                    this._cycle = this._repeat
                }
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        p = true;
                        m = "onComplete";
                        if (this._duration === 0)
                            if (e === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== e) {
                                    n = true
                                }
                    }
                this._rawPrevTime = e;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = 0;
                    e = -1e-6
                } else {
                    this._time = this._duration;
                    e = this._duration + 1e-6
                }
            } else if (e <= 0) {
                if (!this._locked) {
                    this._totalTime = this._cycle = 0
                }
                this._time = 0;
                if (s !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                    m = "onReverseComplete";
                    p = this._reversed
                }
                if (e < 0) {
                    this._active = false;
                    if (this._duration === 0)
                        if (this._rawPrevTime >= 0) {
                            n = true
                        }
                } else if (!this._initted) {
                    n = true
                }
                this._rawPrevTime = e;
                e = -1e-6
            } else {
                this._time = this._rawPrevTime = e;
                if (!this._locked) {
                    this._totalTime = e;
                    if (this._repeat !== 0) {
                        var g = this._duration + this._repeatDelay;
                        this._cycle = this._totalTime / g >> 0;
                        if (this._cycle !== 0)
                            if (this._cycle === this._totalTime / g) {
                                this._cycle--
                            }
                        this._time = this._totalTime - this._cycle * g;
                        if (this._yoyo)
                            if ((this._cycle & 1) != 0) {
                                this._time = this._duration - this._time
                            }
                        if (this._time > this._duration) {
                            this._time = this._duration;
                            e = this._duration + 1e-6
                        } else if (this._time < 0) {
                            this._time = 0;
                            e = -1e-6
                        } else {
                            e = this._time
                        }
                    }
                }
            } if (this._cycle !== c)
                if (!this._locked) {
                    var y = this._yoyo && (c & 1) !== 0,
                        b = y === (this._yoyo && (this._cycle & 1) !== 0),
                        w = this._totalTime,
                        E = this._cycle,
                        S = this._rawPrevTime,
                        x = this._time;
                    this._totalTime = c * this._duration;
                    if (this._cycle < c) {
                        y = !y
                    } else {
                        this._totalTime += this._duration
                    }
                    this._time = s;
                    this._rawPrevTime = f;
                    this._cycle = c;
                    this._locked = true;
                    s = y ? 0 : this._duration;
                    this.render(s, t, false);
                    if (!t)
                        if (!this._gc) {
                            if (this.vars.onRepeat) {
                                this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || i)
                            }
                        }
                    if (b) {
                        s = y ? this._duration + 1e-6 : -1e-6;
                        this.render(s, true, false)
                    }
                    this._time = x;
                    this._totalTime = w;
                    this._cycle = E;
                    this._rawPrevTime = S;
                    this._locked = false
                }
            if (this._time === s && !n) {
                return
            } else if (!this._initted) {
                this._initted = true
            }
            if (o === 0)
                if (this.vars.onStart)
                    if (this._totalTime !== 0)
                        if (!t) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || i)
                        }
            if (this._time > s) {
                h = this._first;
                while (h) {
                    d = h._next;
                    if (this._paused && !l) {
                        break
                    } else if (h._active || h._startTime <= this._time && !h._paused && !h._gc) {
                        if (!h._reversed) {
                            h.render((e - h._startTime) * h._timeScale, t, false)
                        } else {
                            h.render((!h._dirty ? h._totalDuration : h.totalDuration()) - (e - h._startTime) * h._timeScale, t, false)
                        }
                    }
                    h = d
                }
            } else {
                h = this._last;
                while (h) {
                    d = h._prev;
                    if (this._paused && !l) {
                        break
                    } else if (h._active || h._startTime <= s && !h._paused && !h._gc) {
                        if (!h._reversed) {
                            h.render((e - h._startTime) * h._timeScale, t, false)
                        } else {
                            h.render((!h._dirty ? h._totalDuration : h.totalDuration()) - (e - h._startTime) * h._timeScale, t, false)
                        }
                    }
                    h = d
                }
            } if (this._onUpdate)
                if (!t) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)
                }
            if (m)
                if (!this._locked)
                    if (!this._gc)
                        if (u === this._startTime || a != this._timeScale)
                            if (this._time === 0 || r >= this.totalDuration()) {
                                if (p) {
                                    if (this._timeline.autoRemoveChildren) {
                                        this._enabled(false, false)
                                    }
                                    this._active = false
                                }
                                if (!t)
                                    if (this.vars[m]) {
                                        this.vars[m].apply(this.vars[m + "Scope"] || this, this.vars[m + "Params"] || i)
                                    }
                            }
        };
        u.getActive = function (e, t, n) {
            if (e == null) {
                e = true
            }
            if (t == null) {
                t = true
            }
            if (n == null) {
                n = false
            }
            var r = [],
                i = this.getChildren(e, t, n),
                s = 0,
                u = i.length,
                a, f;
            for (a = 0; a < u; a++) {
                f = i[a];
                if (!f._paused)
                    if (f._timeline._time >= f._startTime)
                        if (f._timeline._time < f._startTime + f._totalDuration / f._timeScale)
                            if (!o(f._timeline)) {
                                r[s++] = f
                            }
            }
            return r
        };
        u.getLabelAfter = function (e) {
            if (!e)
                if (e !== 0) {
                    e = this._time
                }
            var t = this.getLabelsArray(),
                n = t.length,
                r;
            for (r = 0; r < n; r++) {
                if (t[r].time > e) {
                    return t[r].name
                }
            }
            return null
        };
        u.getLabelBefore = function (e) {
            if (e == null) {
                e = this._time
            }
            var t = this.getLabelsArray(),
                n = t.length;
            while (--n > -1) {
                if (t[n].time < e) {
                    return t[n].name
                }
            }
            return null
        };
        u.getLabelsArray = function () {
            var e = [],
                t = 0,
                n;
            for (n in this._labels) {
                e[t++] = {
                    time: this._labels[n],
                    name: n
                }
            }
            e.sort(function (e, t) {
                return e.time - t.time
            });
            return e
        };
        u.progress = function (e) {
            return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * e + this._cycle * this._duration, false)
        };
        u.totalProgress = function (e) {
            return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * e, false)
        };
        u.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    e.prototype.totalDuration.call(this);
                    this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat
                }
                return this._totalDuration
            }
            return this._repeat == -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        u.time = function (e, t) {
            if (!arguments.length) {
                return this._time
            }
            if (this._dirty) {
                this.totalDuration()
            }
            if (e > this._duration) {
                e = this._duration
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                e = this._duration - e + this._cycle * (this._duration + this._repeatDelay)
            } else if (this._repeat != 0) {
                e += this._cycle * (this._duration + this._repeatDelay)
            }
            return this.totalTime(e, t)
        };
        u.repeat = function (e) {
            if (!arguments.length) {
                return this._repeat
            }
            this._repeat = e;
            return this._uncache(true)
        };
        u.repeatDelay = function (e) {
            if (!arguments.length) {
                return this._repeatDelay
            }
            this._repeatDelay = e;
            return this._uncache(true)
        };
        u.yoyo = function (e) {
            if (!arguments.length) {
                return this._yoyo
            }
            this._yoyo = e;
            return this
        };
        u.currentLabel = function (e) {
            if (!arguments.length) {
                return this.getLabelBefore(this._time + 1e-8)
            }
            return this.seek(e, true)
        };
        return r
    }, true);
    _gsDefine("plugins.BezierPlugin", ["plugins.TweenPlugin"], function (e) {
        var t = function (t, n) {
            e.call(this, "bezier", -1);
            this._overwriteProps.pop();
            this._func = {};
            this._round = {}
        }, n = t.prototype = new e("bezier", 1),
            i = 180 / Math.PI,
            s = [],
            o = [],
            u = [],
            f = {}, c = function (t, n, r, i) {
                this.a = t;
                this.b = n;
                this.c = r;
                this.d = i;
                this.da = i - t;
                this.ca = r - t;
                this.ba = n - t
            }, h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            p = t.bezierThrough = function (e, t, n, i, c, p) {
                var d = {}, g = [],
                    y, b;
                c = typeof c === "string" ? "," + c + "," : h;
                if (t == null) {
                    t = 1
                }
                for (b in e[0]) {
                    g.push(b)
                }
                s.length = o.length = u.length = 0;
                y = g.length;
                while (--y > -1) {
                    b = g[y];
                    f[b] = c.indexOf("," + b + ",") !== -1;
                    d[b] = v(e, b, f[b], p)
                }
                y = s.length;
                while (--y > -1) {
                    s[y] = Math.sqrt(s[y]);
                    o[y] = Math.sqrt(o[y])
                }
                if (!i) {
                    y = g.length;
                    while (--y > -1) {
                        if (f[b]) {
                            a = d[g[y]];
                            l = a.length - 1;
                            for (j = 0; j < l; j++) {
                                r = a[j + 1].da / o[j] + a[j].da / s[j];
                                u[j] = (u[j] || 0) + r * r
                            }
                        }
                    }
                    y = u.length;
                    while (--y > -1) {
                        u[y] = Math.sqrt(u[y])
                    }
                }
                y = g.length;
                while (--y > -1) {
                    b = g[y];
                    m(d[b], t, n, i, f[b])
                }
                return d
            }, d = function (e, t, n) {
                t = t || "soft";
                var r = {}, i = t === "cubic" ? 3 : 2,
                    s = t === "soft",
                    o = [],
                    u, a, f, l, h, p, d, v, m, g, y;
                if (s && n) {
                    e = [n].concat(e)
                }
                if (e == null || e.length < i + 1) {
                    throw "invalid Bezier data"
                }
                for (m in e[0]) {
                    o.push(m)
                }
                p = o.length;
                while (--p > -1) {
                    m = o[p];
                    r[m] = h = [];
                    g = 0;
                    v = e.length;
                    for (d = 0; d < v; d++) {
                        u = n == null ? e[d][m] : typeof (y = e[d][m]) === "string" && y.charAt(1) === "=" ? n[m] + Number(y.charAt(0) + y.substr(2)) : Number(y);
                        if (s)
                            if (d > 1)
                                if (d < v - 1) {
                                    h[g++] = (u + h[g - 2]) / 2
                                }
                        h[g++] = u
                    }
                    v = g - i + 1;
                    g = 0;
                    for (d = 0; d < v; d += i) {
                        u = h[d];
                        a = h[d + 1];
                        f = h[d + 2];
                        l = i === 2 ? 0 : h[d + 3];
                        h[g++] = y = i === 3 ? new c(u, a, f, l) : new c(u, (2 * a + u) / 3, (2 * a + f) / 3, f)
                    }
                    h.length = g
                }
                return r
            }, v = function (e, t, n, r) {
                var i = [],
                    u, a, f, l, h, p, d, v;
                if (r) {
                    e = [r].concat(e);
                    a = e.length;
                    while (--a > -1) {
                        if (typeof (v = e[a][t]) === "string")
                            if (v.charAt(1) === "=") {
                                e[a][t] = r[t] + Number(v.charAt(0) + v.substr(2))
                            }
                    }
                }
                u = e.length - 2;
                if (u < 0) {
                    i[0] = new c(e[0][t], 0, 0, e[u < -1 ? 0 : 1][t]);
                    return i
                }
                for (a = 0; a < u; a++) {
                    l = e[a][t];
                    h = e[a + 1][t];
                    i[a] = new c(l, 0, 0, h);
                    if (n) {
                        p = e[a + 2][t];
                        s[a] = (s[a] || 0) + (h - l) * (h - l);
                        o[a] = (o[a] || 0) + (p - h) * (p - h)
                    }
                }
                i[a] = new c(e[a][t], 0, 0, e[a + 1][t]);
                return i
            }, m = function (e, t, n, r, i) {
                var a = e.length - 1,
                    f = 0,
                    l = e[0].a,
                    c, h, p, d, v, m, y, b, w, E, S, x, T;
                for (c = 0; c < a; c++) {
                    v = e[f];
                    h = v.a;
                    p = v.d;
                    d = e[f + 1].d;
                    if (i) {
                        S = s[c];
                        x = o[c];
                        T = (x + S) * t * .25 / (r ? .5 : u[c] || .5);
                        m = p - (p - h) * (r ? t * .5 : T / S);
                        y = p + (d - p) * (r ? t * .5 : T / x);
                        b = p - (m + (y - m) * (S * 3 / (S + x) + .5) / 4)
                    } else {
                        m = p - (p - h) * t * .5;
                        y = p + (d - p) * t * .5;
                        b = p - (m + y) / 2
                    }
                    m += b;
                    y += b;
                    v.c = w = m;
                    if (c != 0) {
                        v.b = l
                    } else {
                        v.b = l = v.a + (v.c - v.a) * .6
                    }
                    v.da = p - h;
                    v.ca = w - h;
                    v.ba = l - h;
                    if (n) {
                        E = g(h, l, w, p);
                        e.splice(f, 1, E[0], E[1], E[2], E[3]);
                        f += 4
                    } else {
                        f++
                    }
                    l = y
                }
                v = e[f];
                v.b = l;
                v.c = l + (v.d - l) * .4;
                v.da = v.d - v.a;
                v.ca = v.c - v.a;
                v.ba = l - v.a;
                if (n) {
                    E = g(v.a, l, v.c, v.d);
                    e.splice(f, 1, E[0], E[1], E[2], E[3])
                }
            }, g = t.cubicToQuadratic = function (e, t, n, r) {
                var i = {
                    a: e
                }, s = {}, o = {}, u = {
                        c: r
                    }, a = (e + t) / 2,
                    f = (t + n) / 2,
                    l = (n + r) / 2,
                    c = (a + f) / 2,
                    h = (f + l) / 2,
                    p = (h - c) / 8;
                i.b = a + (e - a) / 4;
                s.b = c + p;
                i.c = s.a = (i.b + s.b) / 2;
                s.c = o.a = (c + h) / 2;
                o.b = h - p;
                u.b = l + (r - l) / 4;
                o.c = u.a = (o.b + u.b) / 2;
                return [i, s, o, u]
            }, y = t.quadraticToCubic = function (e, t, n) {
                return new c(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
            }, b = function (e, t) {
                t = t >> 0 || 6;
                var n = [],
                    r = [],
                    i = 0,
                    s = 0,
                    o = t - 1,
                    u = [],
                    a = [],
                    f, l, c, h;
                for (f in e) {
                    w(e[f], n, t)
                }
                c = n.length;
                for (l = 0; l < c; l++) {
                    i += Math.sqrt(n[l]);
                    h = l % t;
                    a[h] = i;
                    if (h === o) {
                        s += i;
                        h = l / t >> 0;
                        u[h] = a;
                        r[h] = s;
                        i = 0;
                        a = []
                    }
                }
                return {
                    length: s,
                    lengths: r,
                    segments: u
                }
            }, w = function (e, t, n) {
                var r = 1 / n,
                    i = e.length,
                    s, o, u, a, f, l, c, h, p, d, v;
                while (--i > -1) {
                    d = e[i];
                    u = d.a;
                    a = d.d - u;
                    f = d.c - u;
                    l = d.b - u;
                    s = o = 0;
                    for (h = 1; h <= n; h++) {
                        c = r * h;
                        p = 1 - c;
                        s = o - (o = (c * c * a + 3 * p * (c * f + p * l)) * c);
                        v = i * n + h - 1;
                        t[v] = (t[v] || 0) + s * s
                    }
                }
            };
        n.constructor = t;
        t.API = 2;
        n._onInitTween = function (e, t, n) {
            this._target = e;
            if (t instanceof Array) {
                t = {
                    values: t
                }
            }
            this._props = [];
            this._timeRes = t.timeResolution == null ? 6 : parseInt(t.timeResolution);
            var r = t.values || [],
                i = {}, s = r[0],
                o = t.autoRotate || n.vars.orientToBezier,
                u, a, f, l, c;
            this._autoRotate = o ? o instanceof Array ? o : [
                ["x", "y", "rotation", o === true ? 0 : Number(o) || 0]
            ] : null;
            for (u in s) {
                this._props.push(u)
            }
            f = this._props.length;
            while (--f > -1) {
                u = this._props[f];
                this._overwriteProps.push(u);
                a = this._func[u] = typeof e[u] === "function";
                i[u] = !a ? parseFloat(e[u]) : e[u.indexOf("set") || typeof e["get" + u.substr(3)] !== "function" ? u : "get" + u.substr(3)]();
                if (!c)
                    if (i[u] !== r[0][u]) {
                        c = i
                    }
            }
            this._beziers = t.type !== "cubic" && t.type !== "quadratic" && t.type !== "soft" ? p(r, isNaN(t.curviness) ? 1 : t.curviness, false, t.type === "thruBasic", t.correlate, c) : d(r, t.type, i);
            this._segCount = this._beziers[u].length;
            if (this._timeRes) {
                var h = b(this._beziers, this._timeRes);
                this._length = h.length;
                this._lengths = h.lengths;
                this._segments = h.segments;
                this._l1 = this._li = this._s1 = this._si = 0;
                this._l2 = this._lengths[0];
                this._curSeg = this._segments[0];
                this._s2 = this._curSeg[0];
                this._prec = 1 / this._curSeg.length
            }
            if (o = this._autoRotate) {
                if (!(o[0] instanceof Array)) {
                    this._autoRotate = o = [o]
                }
                f = o.length;
                while (--f > -1) {
                    for (l = 0; l < 3; l++) {
                        u = o[f][l];
                        this._func[u] = typeof e[u] === "function" ? e[u.indexOf("set") || typeof e["get" + u.substr(3)] !== "function" ? u : "get" + u.substr(3)] : false
                    }
                }
            }
            return true
        };
        n.setRatio = function (e) {
            var t = this._segCount,
                n = this._func,
                r = this._target,
                s, o, u, a, f, l, c, h, p, d;
            if (!this._timeRes) {
                s = e < 0 ? 0 : e >= 1 ? t - 1 : t * e >> 0;
                l = (e - s * (1 / t)) * t
            } else {
                p = this._lengths;
                d = this._curSeg;
                e *= this._length;
                u = this._li;
                if (e > this._l2 && u < t - 1) {
                    h = t - 1;
                    while (u < h && (this._l2 = p[++u]) <= e) {}
                    this._l1 = p[u - 1];
                    this._li = u;
                    this._curSeg = d = this._segments[u];
                    this._s2 = d[this._s1 = this._si = 0]
                } else if (e < this._l1 && u > 0) {
                    while (u > 0 && (this._l1 = p[--u]) >= e) {}
                    if (u === 0 && e < this._l1) {
                        this._l1 = 0
                    } else {
                        u++
                    }
                    this._l2 = p[u];
                    this._li = u;
                    this._curSeg = d = this._segments[u];
                    this._s1 = d[(this._si = d.length - 1) - 1] || 0;
                    this._s2 = d[this._si]
                }
                s = u;
                e -= this._l1;
                u = this._si;
                if (e > this._s2 && u < d.length - 1) {
                    h = d.length - 1;
                    while (u < h && (this._s2 = d[++u]) <= e) {}
                    this._s1 = d[u - 1];
                    this._si = u
                } else if (e < this._s1 && u > 0) {
                    while (u > 0 && (this._s1 = d[--u]) >= e) {}
                    if (u === 0 && e < this._s1) {
                        this._s1 = 0
                    } else {
                        u++
                    }
                    this._s2 = d[u];
                    this._si = u
                }
                l = (u + (e - this._s1) / (this._s2 - this._s1)) * this._prec
            }
            o = 1 - l;
            u = this._props.length;
            while (--u > -1) {
                a = this._props[u];
                f = this._beziers[a][s];
                c = (l * l * f.da + 3 * o * (l * f.ca + o * f.ba)) * l + f.a;
                if (this._round[a]) {
                    c = c + (c > 0 ? .5 : -.5) >> 0
                }
                if (n[a]) {
                    r[a](c)
                } else {
                    r[a] = c
                }
            }
            if (this._autoRotate) {
                var v = this._autoRotate,
                    m, g, y, b, w, E, S;
                u = v.length;
                while (--u > -1) {
                    a = v[u][2];
                    E = v[u][3] || 0;
                    S = v[u][4] == true ? 1 : i;
                    f = this._beziers[v[u][0]][s];
                    m = this._beziers[v[u][1]][s];
                    g = f.a + (f.b - f.a) * l;
                    b = f.b + (f.c - f.b) * l;
                    g += (b - g) * l;
                    b += (f.c + (f.d - f.c) * l - b) * l;
                    y = m.a + (m.b - m.a) * l;
                    w = m.b + (m.c - m.b) * l;
                    y += (w - y) * l;
                    w += (m.c + (m.d - m.c) * l - w) * l;
                    c = Math.atan2(w - y, b - g) * S + E;
                    if (n[a]) {
                        n[a].call(r, c)
                    } else {
                        r[a] = c
                    }
                }
            }
        };
        n._roundProps = function (e, t) {
            var n = this._overwriteProps,
                r = n.length;
            while (--r > -1) {
                if (e[n[r]] || e.bezier || e.bezierThrough) {
                    this._round[n[r]] = t
                }
            }
        };
        n._kill = function (t) {
            var n = this._props,
                r, i;
            for (r in _beziers) {
                if (r in t) {
                    delete this._beziers[r];
                    delete this._func[r];
                    i = n.length;
                    while (--i > -1) {
                        if (n[i] === r) {
                            n.splice(i, 1)
                        }
                    }
                }
            }
            return e.prototype._kill.call(this, t)
        };
        e.activate([t]);
        return t
    }, true);
    _gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (e, t) {
        "use strict";
        var n = function () {
            e.call(this, "css");
            this._overwriteProps.pop()
        }, r = n.prototype = new e("css");
        r.constructor = n;
        n.API = 2;
        n.suffixMap = {
            top: "px",
            right: "px",
            bottom: "px",
            left: "px",
            width: "px",
            height: "px",
            fontSize: "px",
            padding: "px",
            margin: "px"
        };
        var i = /[^\d\-\.]/g,
            s = /(\d|\-|\+|=|#|\.)*/g,
            o = /(\d|\.)+/g,
            u = /opacity *= *([^)]*)/,
            a = /opacity:([^;]*)/,
            f = /([A-Z])/g,
            l = /-([a-z])/gi,
            c = function (e, t) {
                return t.toUpperCase()
            }, h = /(Left|Right|Width)/i,
            p = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            d = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            v = Math.PI / 180,
            m = 180 / Math.PI,
            g = {}, y = document,
            b = y.createElement("div"),
            w = navigator.userAgent,
            E, S, x, T, N = function () {
                var e = w.indexOf("Android"),
                    t = y.createElement("div"),
                    n;
                x = w.indexOf("Safari") !== -1 && w.indexOf("Chrome") === -1 && (e === -1 || Number(w.substr(e + 8, 1)) > 3);
                /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(w);
                T = parseFloat(RegExp.$1);
                t.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
                n = t.getElementsByTagName("a")[0];
                return n ? /^0.55/.test(n.style.opacity) : false
            }(),
            C = function (e) {
                if (!e || e === "") {
                    return V.black
                } else if (V[e]) {
                    return V[e]
                } else if (typeof e === "number") {
                    return [e >> 16, e >> 8 & 255, e & 255]
                } else if (e.charAt(0) === "#") {
                    if (e.length === 4) {
                        var t = e.charAt(1),
                            n = e.charAt(2),
                            r = e.charAt(3);
                        e = "#" + t + t + n + n + r + r
                    }
                    e = parseInt(e.substr(1), 16);
                    return [e >> 16, e >> 8 & 255, e & 255]
                } else {
                    return e.match(o) || V.transparent
                }
            }, k = function (e) {
                return u.test(typeof e === "string" ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, L = y.defaultView ? y.defaultView.getComputedStyle : function (e, t) {}, A = function (e, t, n, r) {
                if (!N && t === "opacity") {
                    return k(e)
                } else if (!r && e.style[t]) {
                    return e.style[t]
                } else if (n = n || L(e, null)) {
                    e = n.getPropertyValue(t.replace(f, "-$1").toLowerCase());
                    return e || n.length ? e : n[t]
                } else if (e.currentStyle) {
                    n = e.currentStyle, r = n[t];
                    if (!r && t === "backgroundPosition") {
                        return n[t + "X"] + " " + n[t + "Y"]
                    }
                    return r
                }
                return null
            }, O = function (e, t) {
                var n = {}, r;
                if (t = t || L(e, null)) {
                    if (r = t.length) {
                        while (--r > -1) {
                            n[t[r].replace(l, c)] = t.getPropertyValue(t[r])
                        }
                    } else {
                        for (r in t) {
                            n[r] = t[r]
                        }
                    }
                } else if (t = e.currentStyle || e.style) {
                    for (r in t) {
                        n[r.replace(l, c)] = t[r]
                    }
                }
                if (!N) {
                    n.opacity = k(e)
                }
                var i = F(e, t, false);
                n.rotation = i.rotation * m;
                n.skewX = i.skewX * m;
                n.scaleX = i.scaleX;
                n.scaleY = i.scaleY;
                n.x = i.x;
                n.y = i.y;
                if (n.filters != null) {
                    delete n.filters
                }
                return n
            }, M = function (e, t, n, r) {
                var s = {}, o, u;
                for (u in t) {
                    if (u !== "cssText")
                        if (u !== "length")
                            if (isNaN(u))
                                if (e[u] != (o = t[u]))
                                    if (o !== B)
                                        if (typeof o === "number" || typeof o === "string") {
                                            s[u] = (o === "" || o === "auto") && typeof e[u] === "string" && e[u].replace(i, "") !== "" ? 0 : o;
                                            if (r) {
                                                r.props.push(u)
                                            }
                                        }
                }
                if (n) {
                    for (u in n) {
                        if (u !== "className") {
                            s[u] = n[u]
                        }
                    }
                }
                return s
            }, _ = {
                scaleX: 1,
                scaleY: 1,
                x: 1,
                y: 1,
                rotation: 1,
                shortRotation: 1,
                skewX: 1,
                skewY: 1,
                scale: 1
            }, D = "",
            P = "",
            H = function (e, t) {
                t = t || b;
                var n = t.style,
                    r, i;
                if (n[e] !== undefined) {
                    return e
                }
                e = e.substr(0, 1).toUpperCase() + e.substr(1);
                r = ["O", "Moz", "ms", "Ms", "Webkit"];
                i = 5;
                while (--i > -1 && n[r[i] + e] === undefined) {}
                if (i >= 0) {
                    P = i === 3 ? "ms" : r[i];
                    D = "-" + P.toLowerCase() + "-";
                    return P + e
                }
                return null
            }, B = H("transform"),
            j = D + "transform",
            F = function (e, t, n) {
                var r = e._gsTransform,
                    i;
                if (B) {
                    i = A(e, j, t, true)
                } else if (e.currentStyle) {
                    i = e.currentStyle.filter.match(p);
                    i = i && i.length === 4 ? i[0].substr(4) + "," + Number(i[2].substr(4)) + "," + Number(i[1].substr(4)) + "," + i[3].substr(4) + "," + (r ? r.x : 0) + "," + (r ? r.y : 0) : null
                }
                var s = (i || "").replace(/[^\d\-\.e,]/g, "").split(","),
                    o = s.length >= 6,
                    u = o ? Number(s[0]) : 1,
                    a = o ? Number(s[1]) : 0,
                    f = o ? Number(s[2]) : 0,
                    l = o ? Number(s[3]) : 1,
                    c = 1e-6,
                    h = n ? r || {
                        skewY: 0
                    } : {
                        skewY: 0
                    }, d = h.scaleX < 0;
                h.x = o ? Number(s[4]) : 0;
                h.y = o ? Number(s[5]) : 0;
                h.scaleX = Math.sqrt(u * u + a * a);
                h.scaleY = Math.sqrt(l * l + f * f);
                h.rotation = u || a ? Math.atan2(a, u) : h.rotation || 0;
                h.skewX = f || l ? Math.atan2(f, l) + h.rotation : h.skewX || 0;
                if (Math.abs(h.skewX) > Math.PI / 2) {
                    if (d) {
                        h.scaleX *= -1;
                        h.skewX += h.rotation <= 0 ? Math.PI : -Math.PI;
                        h.rotation += h.rotation <= 0 ? Math.PI : -Math.PI
                    } else {
                        h.scaleY *= -1;
                        h.skewX += h.skewX <= 0 ? Math.PI : -Math.PI
                    }
                }
                if (h.rotation < c)
                    if (h.rotation > -c)
                        if (u || a) {
                            h.rotation = 0
                        }
                if (h.skewX < c)
                    if (h.skewX > -c)
                        if (a || f) {
                            h.skewX = 0
                        }
                if (n) {
                    e._gsTransform = h
                }
                return h
            }, I = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            }, q = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            R = function (e, t, n) {
                var r = parseFloat(e === "width" ? t.offsetWidth : t.offsetHeight),
                    i = I[e],
                    s = i.length,
                    n = n || L(t, null);
                while (--s > -1) {
                    r -= parseFloat(A(t, "padding" + i[s], n, true)) || 0;
                    r -= parseFloat(A(t, "border" + i[s] + "Width", n, true)) || 0
                }
                return r
            }, U = function (e, t, n, r, i) {
                if (r === "px" || !r) {
                    return n
                }
                if (r === "auto" || !n) {
                    return 0
                }
                var s = h.test(t),
                    o = e,
                    u = b.style,
                    a = n < 0;
                if (a) {
                    n = -n
                }
                u.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
                if (r === "%" || r === "em" || !o.appendChild) {
                    o = e.parentNode || y.body;
                    u[s ? "width" : "height"] = n + r
                } else {
                    u[s ? "borderLeftWidth" : "borderTopWidth"] = n + r
                }
                o.appendChild(b);
                var f = parseFloat(b[s ? "offsetWidth" : "offsetHeight"]);
                o.removeChild(b);
                if (f === 0 && !i) {
                    f = U(e, t, n, r, true)
                }
                return a ? -f : f
            }, z = function (e, t) {
                if (e == null || e === "" || e === "auto" || e === "auto auto") {
                    e = "0 0"
                }
                t = t || {};
                var n = e.indexOf("left") !== -1 ? "0%" : e.indexOf("right") !== -1 ? "100%" : e.split(" ")[0],
                    r = e.indexOf("top") !== -1 ? "0%" : e.indexOf("bottom") !== -1 ? "100%" : e.split(" ")[1];
                if (r == null) {
                    r = "0"
                } else if (r === "center") {
                    r = "50%"
                }
                if (n === "center") {
                    n = "50%"
                }
                t.oxp = n.indexOf("%") !== -1;
                t.oyp = r.indexOf("%") !== -1;
                t.oxr = n.charAt(1) === "=";
                t.oyr = r.charAt(1) === "=";
                t.ox = parseFloat(n.replace(i, ""));
                t.oy = parseFloat(r.replace(i, ""));
                return t
            }, W = function (e, t) {
                return e == null ? t : typeof e === "string" && e.indexOf("=") === 1 ? Number(e.split("=").join("")) + t : Number(e)
            }, X = function (e, t) {
                var n = e.indexOf("rad") === -1 ? v : 1,
                    r = e.indexOf("=") === 1;
                e = Number(e.replace(i, "")) * n;
                return r ? e + t : e
            }, V = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            };
        r._onInitTween = function (e, t, r) {
            if (!e.nodeType) {
                return false
            }
            this._target = e;
            this._tween = r;
            this._classData = this._transform = null;
            E = t.autoRound;
            var i = this._style = e.style,
                s = L(e, ""),
                o, u, f;
            if (S)
                if (i.zIndex === "") {
                    f = A(e, "zIndex", s);
                    if (f === "auto" || f === "") {
                        i.zIndex = 0
                    }
                }
            if (typeof t === "string") {
                o = i.cssText;
                u = O(e, s);
                i.cssText = o + ";" + t;
                f = M(u, O(e));
                if (!N && a.test(t)) {
                    f.opacity = parseFloat(RegExp.$1)
                }
                t = f;
                i.cssText = o
            } else if (t.className) {
                o = e.className;
                this._classData = {
                    b: o,
                    e: t.className.charAt(1) !== "=" ? t.className : t.className.charAt(0) === "+" ? e.className + " " + t.className.substr(2) : e.className.split(t.className.substr(2)).join(""),
                    props: []
                };
                if (r._duration) {
                    u = O(e, s);
                    e.className = this._classData.e;
                    t = M(u, O(e), t, this._classData);
                    e.className = o
                } else {
                    t = {}
                }
            }
            this._parseVars(t, e, s, t.suffixMap || n.suffixMap);
            return true
        };
        r._parseVars = function (e, t, n, r) {
            var o = this._style,
                u, a, f, l, c, h, p, d, v, m, g, y;
            for (u in e) {
                a = e[u];
                if (u === "transform" || u === B) {
                    this._parseTransform(t, a, n, r);
                    continue
                } else if (_[u] || u === "transformOrigin") {
                    this._parseTransform(t, e, n, r);
                    continue
                } else if (u === "alpha" || u === "autoAlpha") {
                    u = "opacity"
                } else if (u === "margin" || u === "padding") {
                    g = (a + "").split(" ");
                    v = g.length;
                    f = {};
                    f[u + "Top"] = g[0];
                    f[u + "Right"] = v > 1 ? g[1] : g[0];
                    f[u + "Bottom"] = v === 4 ? g[2] : g[0];
                    f[u + "Left"] = v === 4 ? g[3] : v === 2 ? g[1] : g[0];
                    this._parseVars(f, t, n, r);
                    continue
                } else if (u === "backgroundPosition" || u === "backgroundSize") {
                    f = z(a);
                    m = z(l = A(t, u, n));
                    this._firstPT = f = {
                        _next: this._firstPT,
                        t: o,
                        p: u,
                        b: l,
                        f: false,
                        n: "css_" + u,
                        type: 3,
                        s: m.ox,
                        c: f.oxr ? f.ox : f.ox - m.ox,
                        ys: m.oy,
                        yc: f.oyr ? f.oy : f.oy - m.oy,
                        sfx: f.oxp ? "%" : "px",
                        ysfx: f.oyp ? "%" : "px",
                        r: !f.oxp && e.autoRound !== false
                    };
                    f.e = f.s + f.c + f.sfx + " " + (f.ys + f.yc) + f.ysfx;
                    continue
                } else if (u === "border") {
                    g = (a + "").split(" ");
                    this._parseVars({
                        borderWidth: g[0],
                        borderStyle: g[1] || "none",
                        borderColor: g[2] || "#000000"
                    }, t, n, r);
                    continue
                } else if (u === "bezier") {
                    this._parseBezier(a, t, n, r);
                    continue
                } else if (u === "autoRound") {
                    continue
                }
                l = A(t, u, n);
                l = l != null ? l + "" : "";
                this._firstPT = f = {
                    _next: this._firstPT,
                    t: o,
                    p: u,
                    b: l,
                    f: false,
                    n: "css_" + u,
                    sfx: "",
                    r: false,
                    type: 0
                };
                if (u === "opacity")
                    if (e.autoAlpha != null) {
                        if (l === "1")
                            if (A(t, "visibility", n) === "hidden") {
                                l = f.b = "0"
                            }
                        this._firstPT = f._prev = {
                            _next: f,
                            t: o,
                            p: "visibility",
                            f: false,
                            n: "css_visibility",
                            r: false,
                            type: -1,
                            b: Number(l) !== 0 ? "visible" : "hidden",
                            i: "visible",
                            e: Number(a) === 0 ? "hidden" : "visible"
                        };
                        this._overwriteProps.push("css_visibility")
                    }
                y = typeof a === "string";
                if (u === "color" || u === "fill" || u === "stroke" || u.indexOf("Color") !== -1 || y && !a.indexOf("rgb(")) {
                    c = C(l);
                    h = C(a);
                    f.e = f.i = (h.length > 3 ? "rgba(" : "rgb(") + h.join(",") + ")";
                    f.b = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")";
                    f.s = Number(c[0]);
                    f.c = Number(h[0]) - f.s;
                    f.gs = Number(c[1]);
                    f.gc = Number(h[1]) - f.gs;
                    f.bs = Number(c[2]);
                    f.bc = Number(h[2]) - f.bs;
                    f.type = 1;
                    if (c.length > 3 || h.length > 3) {
                        if (N) {
                            f.as = c.length < 4 ? 1 : Number(c[3]);
                            f.ac = (h.length < 4 ? 1 : Number(h[3])) - f.as;
                            f.type = 2
                        } else {
                            if (h[3] == 0) {
                                f.e = f.i = "transparent";
                                f.type = -1
                            }
                            if (c[3] == 0) {
                                f.b = "transparent"
                            }
                        }
                    }
                } else {
                    p = l.replace(s, "");
                    if (l === "" || l === "auto") {
                        if (u === "width" || u === "height") {
                            m = R(u, t, n);
                            p = "px"
                        } else {
                            m = u !== "opacity" ? 0 : 1;
                            p = ""
                        }
                    } else {
                        m = l.indexOf(" ") === -1 ? parseFloat(l.replace(i, "")) : NaN
                    } if (y) {
                        v = a.charAt(1) === "=";
                        d = a.replace(s, "");
                        a = a.indexOf(" ") === -1 ? parseFloat(a.replace(i, "")) : NaN
                    } else {
                        v = false;
                        d = ""
                    } if (d === "") {
                        d = r[u] || p
                    }
                    f.e = a || a === 0 ? (v ? a + m : a) + d : e[u];
                    if (p !== d)
                        if (d !== "")
                            if (a || a === 0)
                                if (m || m === 0) {
                                    m = U(t, u, m, p);
                                    if (d === "%") {
                                        m /= U(t, u, 100, "%") / 100;
                                        if (m > 100) {
                                            m = 100
                                        }
                                    } else if (d === "em") {
                                        m /= U(t, u, 1, "em")
                                    } else {
                                        a = U(t, u, a, d);
                                        d = "px"
                                    } if (v)
                                        if (a || a === 0) {
                                            f.e = a + m + d
                                        }
                                }
                    if ((m || m === 0) && (a || a === 0) && (f.c = v ? a : a - m)) {
                        f.s = m;
                        f.sfx = d;
                        if (u === "opacity") {
                            if (!N) {
                                f.type = 4;
                                f.p = "filter";
                                f.b = "alpha(opacity=" + f.s * 100 + ")";
                                f.e = "alpha(opacity=" + (f.s + f.c) * 100 + ")";
                                f.dup = e.autoAlpha != null;
                                this._style.zoom = 1
                            }
                        } else if (E !== false && (d === "px" || u === "zIndex")) {
                            f.r = true
                        }
                    } else {
                        f.type = -1;
                        f.i = u === "display" && f.e === "none" ? f.b : f.e;
                        f.s = f.c = 0
                    }
                }
                this._overwriteProps.push("css_" + u);
                if (f._next) {
                    f._next._prev = f
                }
            }
        };
        r._parseTransform = function (e, t, n, r) {
            if (this._transform) {
                return
            }
            var i = this._transform = F(e, n, true),
                s = this._style,
                o = 1e-6,
                u, a, f, l, c, h;
            if (typeof t === "object") {
                u = {
                    scaleX: W(t.scaleX != null ? t.scaleX : t.scale, i.scaleX),
                    scaleY: W(t.scaleY != null ? t.scaleY : t.scale, i.scaleY),
                    x: W(t.x, i.x),
                    y: W(t.y, i.y)
                };
                if (t.shortRotation != null) {
                    u.rotation = typeof t.shortRotation === "number" ? t.shortRotation * v : X(t.shortRotation, i.rotation);
                    var p = (u.rotation - i.rotation) % (Math.PI * 2);
                    if (p !== p % Math.PI) {
                        p += Math.PI * (p < 0 ? 2 : -2)
                    }
                    u.rotation = i.rotation + p
                } else {
                    u.rotation = t.rotation == null ? i.rotation : typeof t.rotation === "number" ? t.rotation * v : X(t.rotation, i.rotation)
                }
                u.skewX = t.skewX == null ? i.skewX : typeof t.skewX === "number" ? t.skewX * v : X(t.skewX, i.skewX);
                u.skewY = t.skewY == null ? i.skewY : typeof t.skewY === "number" ? t.skewY * v : X(t.skewY, i.skewY);
                if (a = u.skewY - i.skewY) {
                    u.skewX += a;
                    u.rotation += a
                }
                if (u.skewY < o)
                    if (u.skewY > -o) {
                        u.skewY = 0
                    }
                if (u.skewX < o)
                    if (u.skewX > -o) {
                        u.skewX = 0
                    }
                if (u.rotation < o)
                    if (u.rotation > -o) {
                        u.rotation = 0
                    }
                if ((h = t.transformOrigin) != null) {
                    if (B) {
                        f = B + "Origin";
                        this._firstPT = l = {
                            _next: this._firstPT,
                            t: s,
                            p: f,
                            s: 0,
                            c: 0,
                            n: f,
                            f: false,
                            r: false,
                            b: s[f],
                            e: h,
                            i: h,
                            type: -1,
                            sfx: ""
                        };
                        if (l._next) {
                            l._next._prev = l
                        }
                    } else {
                        z(h, i)
                    }
                }
            } else if (typeof t === "string" && B) {
                c = s[B];
                s[B] = t;
                u = F(e, null, false);
                s[B] = c
            } else {
                return
            } if (!B) {
                s.zoom = 1
            } else if (x) {
                S = true;
                if (s.WebkitBackfaceVisibility === "") {
                    s.WebkitBackfaceVisibility = "hidden"
                }
                if (s.zIndex === "") {
                    c = A(e, "zIndex", n);
                    if (c === "auto" || c === "") {
                        s.zIndex = 0
                    }
                }
            }
            for (f in _) {
                if (i[f] !== u[f] || g[f] != null)
                    if (f !== "shortRotation")
                        if (f !== "scale") {
                            this._firstPT = l = {
                                _next: this._firstPT,
                                t: i,
                                p: f,
                                s: i[f],
                                c: u[f] - i[f],
                                n: f,
                                f: false,
                                r: false,
                                b: i[f],
                                e: u[f],
                                type: 0,
                                sfx: 0
                            };
                            if (l._next) {
                                l._next._prev = l
                            }
                            this._overwriteProps.push("css_" + f)
                        }
            }
        };
        r._parseBezier = function (e, t, n, r) {
            if (!window.com.greensock.plugins.BezierPlugin) {
                console.log("Error: BezierPlugin not loaded.");
                return
            }
            if (e instanceof Array) {
                e = {
                    values: e
                }
            }
            var i = e.values || [],
                s = i.length,
                o = [],
                u = this._bezier = {
                    _pt: []
                }, a = u._proxy = {}, f = 0,
                l = 0,
                c = {}, h = s - 1,
                p = g,
                d = u._plugin = new window.com.greensock.plugins.BezierPlugin,
                v, m, y, b, w, E;
            for (m = 0; m < s; m++) {
                w = {};
                this._transform = null;
                b = this._firstPT;
                this._parseVars(g = i[m], t, n, r);
                y = this._firstPT;
                if (m === 0) {
                    E = this._transform;
                    while (y !== b) {
                        a[y.p] = y.s;
                        u._pt[l++] = c[y.p] = y;
                        if (y.type === 1 || y.type === 2) {
                            a[y.p + "_g"] = y.gs;
                            a[y.p + "_b"] = y.bs;
                            if (y.type === 2) {
                                a[y.p + "_a"] = y.as
                            }
                        } else if (y.type === 3) {
                            a[y.p + "_y"] = y.ys
                        }
                        y = y._next
                    }
                    y = this._firstPT
                } else {
                    this._firstPT = b;
                    if (b._prev) {
                        b._prev._next = null
                    }
                    b._prev = null;
                    b = null
                }
                while (y !== b) {
                    if (c[y.p]) {
                        w[y.p] = y.s + y.c;
                        if (m === h) {
                            c[y.p].e = y.e
                        }
                        if (y.type === 1 || y.type === 2) {
                            w[y.p + "_g"] = y.gs + y.gc;
                            w[y.p + "_b"] = y.bs + y.bc;
                            if (y.type === 2) {
                                w[y.p + "_a"] = y.as + y.ac
                            }
                        } else if (y.type === 3) {
                            w[y.p + "_y"] = y.ys + y.yc
                        }
                        if (m === 0) {
                            y.c = y.ac = y.gc = y.bc = y.yc = 0
                        }
                    }
                    y = y._next
                }
                o[f++] = w
            }
            this._transform = E;
            g = p;
            e.values = o;
            if (e.autoRotate === 0) {
                e.autoRotate = true
            }
            if (e.autoRotate)
                if (!(e.autoRotate instanceof Array)) {
                    m = e.autoRotate == true ? 0 : Number(e.autoRotate) * Math.PI / 180;
                    e.autoRotate = o[0].left != null ? [
                        ["left", "top", "rotation", m, true]
                    ] : o[0].x != null ? [
                        ["x", "y", "rotation", m, true]
                    ] : false
                }
            if (u._autoRotate = e.autoRotate)
                if (!E) {
                    this._transform = F(t, n, true)
                }
            d._onInitTween(a, e, this._tween);
            e.values = i
        };
        r.setRatio = function (e) {
            var t = this._firstPT,
                n = this._bezier,
                r = 1e-6,
                i, o, a;
            if (n) {
                n._plugin.setRatio(e);
                var f = n._pt,
                    l = n._proxy;
                o = f.length;
                while (--o > -1) {
                    t = f[o];
                    t.s = l[t.p];
                    if (t.type === 1 || t.type === 2) {
                        t.gs = l[t.p + "_g"];
                        t.bs = l[t.p + "_b"];
                        if (t.type === 2) {
                            t.as = l[t.p + "_a"]
                        }
                    } else if (t.type === 3) {
                        t.ys = l[t.p + "_y"]
                    }
                }
                if (n._autoRotate) {
                    this._transform.rotation = l.rotation
                }
            }
            if (e === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (t) {
                    t.t[t.p] = t.e;
                    if (t.type === 4)
                        if (t.s + t.c === 1) {
                            this._style.removeAttribute("filter");
                            if (A(this._target, "filter")) {
                                t.t[t.p] = t.e
                            }
                        }
                    t = t._next
                }
            } else if (e || !(this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (t) {
                    i = t.c * e + t.s;
                    if (t.r) {
                        i = i > 0 ? i + .5 >> 0 : i - .5 >> 0
                    } else if (i < r)
                        if (i > -r) {
                            i = 0
                        }
                    if (!t.type) {
                        t.t[t.p] = i + t.sfx
                    } else if (t.type === 1) {
                        t.t[t.p] = "rgb(" + (i >> 0) + ", " + (t.gs + e * t.gc >> 0) + ", " + (t.bs + e * t.bc >> 0) + ")"
                    } else if (t.type === 2) {
                        t.t[t.p] = "rgba(" + (i >> 0) + ", " + (t.gs + e * t.gc >> 0) + ", " + (t.bs + e * t.bc >> 0) + ", " + (t.as + e * t.ac) + ")"
                    } else if (t.type === -1) {
                        t.t[t.p] = t.i
                    } else if (t.type === 3) {
                        a = t.ys + e * t.yc;
                        if (t.r) {
                            a = a > 0 ? a + .5 >> 0 : a - .5 >> 0
                        }
                        t.t[t.p] = i + t.sfx + " " + a + t.ysfx
                    } else {
                        if (t.dup) {
                            t.t.filter = t.t.filter || "alpha(opacity=100)"
                        }
                        if (t.t.filter.indexOf("opacity") === -1) {
                            t.t.filter += " alpha(opacity=" + (i * 100 >> 0) + ")"
                        } else {
                            t.t.filter = t.t.filter.replace(u, "opacity=" + (i * 100 >> 0))
                        }
                    }
                    t = t._next
                }
            } else {
                while (t) {
                    t.t[t.p] = t.b;
                    if (t.type === 4)
                        if (t.s === 1) {
                            this._style.removeAttribute("filter");
                            if (A(this._target, "filter")) {
                                t.t[t.p] = t.b
                            }
                        }
                    t = t._next
                }
            } if (this._transform) {
                t = this._transform;
                if (B && !t.rotation && !t.skewX) {
                    this._style[B] = (t.x || t.y ? "translate(" + t.x + "px," + t.y + "px) " : "") + (t.scaleX !== 1 || t.scaleY !== 1 ? "scale(" + t.scaleX + "," + t.scaleY + ")" : "") || "translate(0px,0px)"
                } else {
                    var c = B ? t.rotation : -t.rotation,
                        h = B ? c - t.skewX : c + t.skewX,
                        p = Math.cos(c) * t.scaleX,
                        v = Math.sin(c) * t.scaleX,
                        m = Math.sin(h) * -t.scaleY,
                        g = Math.cos(h) * t.scaleY,
                        y;
                    if (p < r)
                        if (p > -r) {
                            p = 0
                        }
                    if (v < r)
                        if (v > -r) {
                            v = 0
                        }
                    if (m < r)
                        if (m > -r) {
                            m = 0
                        }
                    if (g < r)
                        if (g > -r) {
                            g = 0
                        }
                    if (B) {
                        this._style[B] = "matrix(" + p + "," + v + "," + m + "," + g + "," + t.x + "," + t.y + ")"
                    } else if (y = this._target.currentStyle) {
                        r = v;
                        v = -m;
                        m = -r;
                        var b = y.filter;
                        this._style.filter = "";
                        var w = this._target.offsetWidth,
                            E = this._target.offsetHeight,
                            S = y.position !== "absolute",
                            x = "progid:DXImageTransform.Microsoft.Matrix(M11=" + p + ", M12=" + v + ", M21=" + m + ", M22=" + g,
                            N = t.x,
                            C = t.y,
                            k, L;
                        if (t.ox != null) {
                            k = (t.oxp ? w * t.ox * .01 : t.ox) - w / 2;
                            L = (t.oyp ? E * t.oy * .01 : t.oy) - E / 2;
                            N = k - (k * p + L * v) + t.x;
                            C = L - (k * m + L * g) + t.y
                        }
                        if (!S) {
                            var O = T < 8 ? 1 : -1,
                                M, _, D;
                            k = t.ieOffsetX || 0;
                            L = t.ieOffsetY || 0;
                            t.ieOffsetX = Math.round((w - ((p < 0 ? -p : p) * w + (v < 0 ? -v : v) * E)) / 2 + N);
                            t.ieOffsetY = Math.round((E - ((g < 0 ? -g : g) * E + (m < 0 ? -m : m) * w)) / 2 + C);
                            for (o = 0; o < 4; o++) {
                                _ = q[o];
                                M = y[_];
                                i = M.indexOf("px") !== -1 ? parseFloat(M) : U(this._target, _, parseFloat(M), M.replace(s, "")) || 0;
                                if (i !== t[_]) {
                                    D = o < 2 ? -t.ieOffsetX : -t.ieOffsetY
                                } else {
                                    D = o < 2 ? k - t.ieOffsetX : L - t.ieOffsetY
                                }
                                this._style[_] = (t[_] = Math.round(i - D * (o === 0 || o === 2 ? 1 : O))) + "px"
                            }
                            x += ", sizingMethod='auto expand')"
                        } else {
                            k = w / 2, L = E / 2;
                            x += ", Dx=" + (k - (k * p + L * v) + N) + ", Dy=" + (L - (k * m + L * g) + C) + ")"
                        } if (b.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                            this._style.filter = b.replace(d, x)
                        } else {
                            this._style.filter = x + " " + b
                        } if (e === 0 || e === 1)
                            if (p === 1)
                                if (v === 0)
                                    if (m === 0)
                                        if (g === 1)
                                            if (!S || x.indexOf("Dx=0, Dy=0") !== -1)
                                                if (!u.test(b) || parseFloat(RegExp.$1) === 100) {
                                                    this._style.removeAttribute("filter")
                                                }
                    }
                }
            }
            if (this._classData) {
                t = this._classData;
                if (e === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                    var o = t.props.length;
                    while (--o > -1) {
                        this._style[t.props[o]] = ""
                    }
                    this._target.className = t.e
                } else if (this._target.className !== t.b) {
                    this._target.className = t.b
                }
            }
        };
        r._kill = function (t) {
            var n = t,
                r;
            if (t.autoAlpha || t.alpha) {
                n = {};
                for (r in t) {
                    n[r] = t[r]
                }
                n.opacity = 1;
                if (n.autoAlpha) {
                    n.visibility = 1
                }
            }
            return e.prototype._kill.call(this, n)
        };
        e.activate([n]);
        return n
    }, true);
    _gsDefine("plugins.RoundPropsPlugin", ["plugins.TweenPlugin"], function (e) {
        var t = function (t, n) {
            e.call(this, "roundProps", -1);
            this._overwriteProps.length = 0
        }, n = t.prototype = new e("roundProps", -1);
        n.constructor = t;
        t.API = 2;
        n._onInitTween = function (e, t, n) {
            this._tween = n;
            return true
        };
        n._onInitAllProps = function () {
            var e = this._tween,
                t = e.vars.roundProps instanceof Array ? e.vars.roundProps : e.vars.roundProps.split(","),
                n = t.length,
                r = {}, i = e._propLookup.roundProps,
                s, o, u;
            while (--n > -1) {
                r[t[n]] = 1
            }
            n = t.length;
            while (--n > -1) {
                s = t[n];
                o = e._firstPT;
                while (o) {
                    u = o._next;
                    if (o.pg) {
                        o.t._roundProps(r, true)
                    } else if (o.n === s) {
                        this._add(o.t, s, o.s, o.c);
                        if (u) {
                            u._prev = o._prev
                        }
                        if (o._prev) {
                            o._prev._next = u
                        } else if (_tween._firstPT === o) {
                            e._firstPT = u
                        }
                        o._next = o._prev = null;
                        e._propLookup[s] = i
                    }
                    o = u
                }
            }
            return false
        };
        n._add = function (e, t, n, r) {
            this._addTween(e, t, n, n + r, t, true);
            this._overwriteProps.push(t)
        };
        e.activate([t]);
        return t
    }, true);
    _gsDefine("easing.Back", ["easing.Ease"], function (e) {
        var t = window.com.greensock,
            n = t._class,
            r = function (t, r) {
                var i = n("easing." + t, function () {}, true),
                    s = i.prototype = new e;
                s.constructor = i;
                s.getRatio = r;
                return i
            }, i = function (t, r) {
                var i = n("easing." + t, function (e) {
                    this._p1 = e || e === 0 ? e : 1.70158;
                    this._p2 = this._p1 * 1.525
                }, true),
                    s = i.prototype = new e;
                s.constructor = i;
                s.getRatio = r;
                s.config = function (e) {
                    return new i(e)
                };
                return i
            }, s = i("BackOut", function (e) {
                return (e = e - 1) * e * ((this._p1 + 1) * e + this._p1) + 1
            }),
            o = i("BackIn", function (e) {
                return e * e * ((this._p1 + 1) * e - this._p1)
            }),
            u = i("BackInOut", function (e) {
                return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
            }),
            a = r("BounceOut", function (e) {
                if (e < 1 / 2.75) {
                    return 7.5625 * e * e
                } else if (e < 2 / 2.75) {
                    return 7.5625 * (e -= 1.5 / 2.75) * e + .75
                } else if (e < 2.5 / 2.75) {
                    return 7.5625 * (e -= 2.25 / 2.75) * e + .9375
                } else {
                    return 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                }
            }),
            f = r("BounceIn", function (e) {
                if ((e = 1 - e) < 1 / 2.75) {
                    return 1 - 7.5625 * e * e
                } else if (e < 2 / 2.75) {
                    return 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75)
                } else if (e < 2.5 / 2.75) {
                    return 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375)
                } else {
                    return 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                }
            }),
            l = r("BounceInOut", function (e) {
                var t = e < .5;
                if (t) {
                    e = 1 - e * 2
                } else {
                    e = e * 2 - 1
                } if (e < 1 / 2.75) {
                    e = 7.5625 * e * e
                } else if (e < 2 / 2.75) {
                    e = 7.5625 * (e -= 1.5 / 2.75) * e + .75
                } else if (e < 2.5 / 2.75) {
                    e = 7.5625 * (e -= 2.25 / 2.75) * e + .9375
                } else {
                    e = 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                }
                return t ? (1 - e) * .5 : e * .5 + .5
            }),
            c = r("CircOut", function (e) {
                return Math.sqrt(1 - (e = e - 1) * e)
            }),
            h = r("CircIn", function (e) {
                return -(Math.sqrt(1 - e * e) - 1)
            }),
            p = r("CircInOut", function (e) {
                return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
            }),
            d = Math.PI * 2,
            v = function (t, r, i) {
                var s = n("easing." + t, function (e, t) {
                    this._p1 = e || 1;
                    this._p2 = t || i;
                    this._p3 = this._p2 / d * (Math.asin(1 / this._p1) || 0)
                }, true),
                    o = s.prototype = new e;
                o.constructor = s;
                o.getRatio = r;
                o.config = function (e, t) {
                    return new s(e, t)
                };
                return s
            }, m = v("ElasticOut", function (e) {
                return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * d / this._p2) + 1
            }, .3),
            g = v("ElasticIn", function (e) {
                return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * d / this._p2))
            }, .3),
            y = v("ElasticInOut", function (e) {
                return (e *= 2) < 1 ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * d / this._p2) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * d / this._p2) * .5 + 1
            }, .45),
            b = r("ExpoOut", function (e) {
                return 1 - Math.pow(2, -10 * e)
            }),
            w = r("ExpoIn", function (e) {
                return Math.pow(2, 10 * (e - 1)) - .001
            }),
            E = r("ExpoInOut", function (e) {
                return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
            }),
            S = Math.PI / 2,
            x = r("SineOut", function (e) {
                return Math.sin(e * S)
            }),
            T = r("SineIn", function (e) {
                return -Math.cos(e * S) + 1
            }),
            N = r("SineInOut", function (e) {
                return -.5 * (Math.cos(Math.PI * e) - 1)
            }),
            C = n("easing.SlowMo", function (e, t, n) {
                t = t || t === 0 ? t : .7;
                if (e == null) {
                    e = .7
                } else if (e > 1) {
                    e = 1
                }
                this._p = e != 1 ? t : 0;
                this._p1 = (1 - e) / 2;
                this._p2 = e;
                this._p3 = this._p1 + this._p2;
                this._calcEnd = n === true
            }, true),
            k = C.prototype = new e;
        k.constructor = C;
        k.getRatio = function (e) {
            var t = e + (.5 - e) * this._p;
            if (e < this._p1) {
                return this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t
            } else if (e > this._p3) {
                return this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e
            }
            return this._calcEnd ? 1 : t
        };
        C.ease = new C(.7, .7);
        k.config = C.config = function (e, t, n) {
            return new C(e, t, n)
        };
        var L = n("easing.SteppedEase", function (e) {
            e = e || 1;
            this._p1 = 1 / e;
            this._p2 = e + 1
        }, true);
        k = L.prototype = new e;
        k.constructor = L;
        k.getRatio = function (e) {
            if (e < 0) {
                e = 0
            } else if (e >= 1) {
                e = .999999999
            }
            return (this._p2 * e >> 0) * this._p1
        };
        k.config = L.config = function (e) {
            return new L(e)
        };
        n("easing.Bounce", {
            easeOut: new a,
            easeIn: new f,
            easeInOut: new l
        }, true);
        n("easing.Circ", {
            easeOut: new c,
            easeIn: new h,
            easeInOut: new p
        }, true);
        n("easing.Elastic", {
            easeOut: new m,
            easeIn: new g,
            easeInOut: new y
        }, true);
        n("easing.Expo", {
            easeOut: new b,
            easeIn: new w,
            easeInOut: new E
        }, true);
        n("easing.Sine", {
            easeOut: new x,
            easeIn: new T,
            easeInOut: new N
        }, true);
        return {
            easeOut: new s,
            easeIn: new o,
            easeInOut: new u
        }
    }, true)
});
(function (e) {
    "use strict";
    var t = function (t) {
        var n = t.split("."),
            r = e,
            i;
        for (i = 0; i < n.length; i++) {
            r[n[i]] = r = r[n[i]] || {}
        }
        return r
    }, n = t("com.greensock"),
        r, i, s, o, u, a, f = {}, l = function (n, r, i, s) {
            this.sc = f[n] ? f[n].sc : [];
            f[n] = this;
            this.gsClass = null;
            this.def = i;
            var o = r || [],
                u = [];
            this.check = function (r) {
                var a = o.length,
                    c = 0,
                    h;
                while (--a > -1) {
                    if ((h = f[o[a]] || new l(o[a])).gsClass) {
                        u[a] = h.gsClass
                    } else {
                        c++;
                        if (r) {
                            h.sc.push(this)
                        }
                    }
                }
                if (c === 0 && i) {
                    var p = ("com.greensock." + n).split("."),
                        d = p.pop(),
                        v = t(p.join("."))[d] = this.gsClass = i.apply(i, u);
                    if (s) {
                        (e.GreenSockGlobals || e)[d] = v;
                        if (typeof define === "function" && define.amd) {
                            define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").join("/"), [], function () {
                                return v
                            })
                        } else if (typeof module !== "undefined" && module.exports) {
                            module.exports = v
                        }
                    }
                    for (a = 0; a < this.sc.length; a++) {
                        this.sc[a].check(false)
                    }
                }
            };
            this.check(true)
        }, c = n._class = function (e, t, n) {
            new l(e, [], function () {
                return t
            }, n);
            return t
        };
    e._gsDefine = function (e, t, n, r) {
        return new l(e, t, n, r)
    };
    var h = [0, 0, 1, 1],
        p = [],
        d = c("easing.Ease", function (e, t, n, r) {
            this._func = e;
            this._type = n || 0;
            this._power = r || 0;
            this._params = t ? h.concat(t) : h
        }, true);
    u = d.prototype;
    u._calcEnd = false;
    u.getRatio = function (e) {
        if (this._func) {
            this._params[0] = e;
            return this._func.apply(null, this._params)
        } else {
            var t = this._type,
                n = this._power,
                r = t === 1 ? 1 - e : t === 2 ? e : e < .5 ? e * 2 : (1 - e) * 2;
            if (n === 1) {
                r *= r
            } else if (n === 2) {
                r *= r * r
            } else if (n === 3) {
                r *= r * r * r
            } else if (n === 4) {
                r *= r * r * r * r
            }
            return t === 1 ? 1 - r : t === 2 ? r : e < .5 ? r / 2 : 1 - r / 2
        }
    };
    r = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
    i = r.length;
    while (--i > -1) {
        s = c("easing." + r[i], function () {}, true);
        o = c("easing.Power" + i, function () {}, true);
        s.easeOut = o.easeOut = new d(null, null, 1, i);
        s.easeIn = o.easeIn = new d(null, null, 2, i);
        s.easeInOut = o.easeInOut = new d(null, null, 3, i)
    }
    c("easing.Strong", n.easing.Power4, true);
    n.easing.Linear.easeNone = n.easing.Linear.easeIn;
    u = c("events.EventDispatcher", function (e) {
        this._listeners = {};
        this._eventTarget = e || this
    }).prototype;
    u.addEventListener = function (e, t, n, r, i) {
        i = i || 0;
        var s = this._listeners[e],
            o = 0,
            u, a;
        if (s == null) {
            this._listeners[e] = s = []
        }
        a = s.length;
        while (--a > -1) {
            u = s[a];
            if (u.c === t) {
                s.splice(a, 1)
            } else if (o === 0 && u.pr < i) {
                o = a + 1
            }
        }
        s.splice(o, 0, {
            c: t,
            s: n,
            up: r,
            pr: i
        })
    };
    u.removeEventListener = function (e, t) {
        var n = this._listeners[e];
        if (n) {
            var r = n.length;
            while (--r > -1) {
                if (n[r].c === t) {
                    n.splice(r, 1);
                    return
                }
            }
        }
    };
    u.dispatchEvent = function (e) {
        var t = this._listeners[e];
        if (t) {
            var n = t.length,
                r, i = this._eventTarget;
            while (--n > -1) {
                r = t[n];
                if (r.up) {
                    r.c.call(r.s || i, {
                        type: e,
                        target: i
                    })
                } else {
                    r.c.call(r.s || i)
                }
            }
        }
    };
    var v = e.requestAnimationFrame,
        m = e.cancelAnimationFrame,
        g = Date.now || function () {
            return (new Date).getTime()
        };
    r = ["ms", "moz", "webkit", "o"];
    i = r.length;
    while (--i > -1 && !v) {
        v = e[r[i] + "RequestAnimationFrame"];
        m = e[r[i] + "CancelAnimationFrame"] || e[r[i] + "CancelRequestAnimationFrame"]
    }
    if (!m) {
        m = function (t) {
            e.clearTimeout(t)
        }
    }
    c("Ticker", function (t, n) {
        this.time = 0;
        this.frame = 0;
        var r = this,
            i = g(),
            s = n !== false,
            o, u, a, f, l;
        this.tick = function () {
            r.time = (g() - i) / 1e3;
            if (!o || r.time >= l) {
                r.frame++;
                l = r.time + f - (r.time - l) - 5e-4;
                if (l <= r.time) {
                    l = r.time + .001
                }
                r.dispatchEvent("tick")
            }
            a = u(r.tick)
        };
        this.fps = function (t) {
            if (!arguments.length) {
                return o
            }
            o = t;
            f = 1 / (o || 60);
            l = this.time + f;
            u = o === 0 ? function (e) {} : !s || !v ? function (t) {
                return e.setTimeout(t, (l - r.time) * 1e3 + 1 >> 0 || 1)
            } : v;
            m(a);
            a = u(r.tick)
        };
        this.useRAF = function (e) {
            if (!arguments.length) {
                return s
            }
            s = e;
            this.fps(o)
        };
        this.fps(t)
    });
    u = n.Ticker.prototype = new n.events.EventDispatcher;
    u.constructor = n.Ticker;
    var y = c("core.Animation", function (e, t) {
        this.vars = t || {};
        this._duration = this._totalDuration = e || 0;
        this._delay = Number(this.vars.delay) || 0;
        this._timeScale = 1;
        this._active = this.vars.immediateRender == true;
        this.data = this.vars.data;
        this._reversed = this.vars.reversed == true;
        if (!L) {
            return
        }
        if (!a) {
            b.tick();
            a = true
        }
        var n = this.vars.useFrames ? k : L;
        n.insert(this, n._time);
        if (this.vars.paused) {
            this.paused(true)
        }
    }),
        b = y.ticker = new n.Ticker;
    u = y.prototype;
    u._dirty = u._gc = u._initted = u._paused = false;
    u._totalTime = u._time = 0;
    u._rawPrevTime = -1;
    u._next = u._last = u._onUpdate = u._timeline = u.timeline = null;
    u._paused = false;
    u.play = function (e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        this.reversed(false);
        return this.paused(false)
    };
    u.pause = function (e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.paused(true)
    };
    u.resume = function (e, t) {
        if (arguments.length) {
            this.seek(e, t)
        }
        return this.paused(false)
    };
    u.seek = function (e, t) {
        return this.totalTime(Number(e), t != false)
    };
    u.restart = function (e, t) {
        this.reversed(false);
        this.paused(false);
        return this.totalTime(e ? -this._delay : 0, t != false)
    };
    u.reverse = function (e, t) {
        if (arguments.length) {
            this.seek(e || this.totalDuration(), t)
        }
        this.reversed(true);
        return this.paused(false)
    };
    u.render = function () {};
    u.invalidate = function () {
        return this
    };
    u._enabled = function (e, t) {
        this._gc = !e;
        this._active = e && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration;
        if (t != true) {
            if (e && this.timeline == null) {
                this._timeline.insert(this, this._startTime - this._delay)
            } else if (!e && this.timeline != null) {
                this._timeline._remove(this, true)
            }
        }
        return false
    };
    u._kill = function (e, t) {
        return this._enabled(false, false)
    };
    u.kill = function (e, t) {
        this._kill(e, t);
        return this
    };
    u._uncache = function (e) {
        var t = e ? this : this.timeline;
        while (t) {
            t._dirty = true;
            t = t.timeline
        }
        return this
    };
    u.eventCallback = function (e, t, n, r) {
        if (e == null) {
            return null
        } else if (e.substr(0, 2) === "on") {
            if (arguments.length === 1) {
                return this.vars[e]
            }
            if (t == null) {
                delete this.vars[e]
            } else {
                this.vars[e] = t;
                this.vars[e + "Params"] = n;
                this.vars[e + "Scope"] = r;
                if (n) {
                    var i = n.length;
                    while (--i > -1) {
                        if (n[i] === "{self}") {
                            n = this.vars[e + "Params"] = n.concat();
                            n[i] = this
                        }
                    }
                }
            } if (e === "onUpdate") {
                this._onUpdate = t
            }
        }
        return this
    };
    u.delay = function (e) {
        if (!arguments.length) {
            return this._delay
        }
        if (this._timeline.smoothChildTiming) {
            this.startTime(this._startTime + e - this._delay)
        }
        this._delay = e;
        return this
    };
    u.duration = function (e) {
        if (!arguments.length) {
            this._dirty = false;
            return this._duration
        }
        this._duration = this._totalDuration = e;
        this._uncache(true);
        if (this._timeline.smoothChildTiming)
            if (this._active)
                if (e != 0) {
                    this.totalTime(this._totalTime * (e / this._duration), true)
                }
        return this
    };
    u.totalDuration = function (e) {
        this._dirty = false;
        return !arguments.length ? this._totalDuration : this.duration(e)
    };
    u.time = function (e, t) {
        if (!arguments.length) {
            return this._time
        }
        if (this._dirty) {
            this.totalDuration()
        }
        if (e > this._duration) {
            e = this._duration
        }
        return this.totalTime(e, t)
    };
    u.totalTime = function (e, t) {
        if (!arguments.length) {
            return this._totalTime
        }
        if (this._timeline) {
            if (e < 0) {
                e += this.totalDuration()
            }
            if (this._timeline.smoothChildTiming) {
                if (this._dirty) {
                    this.totalDuration()
                }
                if (e > this._totalDuration) {
                    e = this._totalDuration
                }
                this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - (!this._reversed ? e : this._totalDuration - e) / this._timeScale;
                if (!this._timeline._dirty) {
                    this._uncache(false)
                }
                if (!this._timeline._active) {
                    var n = this._timeline;
                    while (n._timeline) {
                        n.totalTime(n._totalTime, true);
                        n = n._timeline
                    }
                }
            }
            if (this._gc) {
                this._enabled(true, false)
            }
            if (this._totalTime != e) {
                this.render(e, t, false)
            }
        }
        return this
    };
    u.startTime = function (e) {
        if (!arguments.length) {
            return this._startTime
        }
        if (e != this._startTime) {
            this._startTime = e;
            if (this.timeline)
                if (this.timeline._sortChildren) {
                    this.timeline.insert(this, e - this._delay)
                }
        }
        return this
    };
    u.timeScale = function (e) {
        if (!arguments.length) {
            return this._timeScale
        }
        e = e || 1e-6;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var t = this._pauseTime || this._pauseTime == 0 ? this._pauseTime : this._timeline._totalTime;
            this._startTime = t - (t - this._startTime) * this._timeScale / e
        }
        this._timeScale = e;
        return this._uncache(false)
    };
    u.reversed = function (e) {
        if (!arguments.length) {
            return this._reversed
        }
        if (e != this._reversed) {
            this._reversed = e;
            this.totalTime(this._totalTime, true)
        }
        return this
    };
    u.paused = function (e) {
        if (!arguments.length) {
            return this._paused
        }
        if (e != this._paused)
            if (this._timeline) {
                if (!e && this._timeline.smoothChildTiming) {
                    this._startTime += this._timeline.rawTime() - this._pauseTime;
                    this._uncache(false)
                }
                this._pauseTime = e ? this._timeline.rawTime() : null;
                this._paused = e;
                this._active = !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration
            }
        if (this._gc)
            if (!e) {
                this._enabled(true, false)
            }
        return this
    };
    var w = c("core.SimpleTimeline", function (e) {
        y.call(this, 0, e);
        this.autoRemoveChildren = this.smoothChildTiming = true
    });
    u = w.prototype = new y;
    u.constructor = w;
    u.kill()._gc = false;
    u._first = u._last = null;
    u._sortChildren = false;
    u.insert = function (e, t) {
        e._startTime = Number(t || 0) + e._delay;
        if (e._paused)
            if (this !== e._timeline) {
                e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale
            }
        if (e.timeline) {
            e.timeline._remove(e, true)
        }
        e.timeline = e._timeline = this;
        if (e._gc) {
            e._enabled(true, true)
        }
        var n = this._last;
        if (this._sortChildren) {
            var r = e._startTime;
            while (n && n._startTime > r) {
                n = n._prev
            }
        }
        if (n) {
            e._next = n._next;
            n._next = e
        } else {
            e._next = this._first;
            this._first = e
        } if (e._next) {
            e._next._prev = e
        } else {
            this._last = e
        }
        e._prev = n;
        if (this._timeline) {
            this._uncache(true)
        }
        return this
    };
    u._remove = function (e, t) {
        if (e.timeline === this) {
            if (!t) {
                e._enabled(false, true)
            }
            e.timeline = null;
            if (e._prev) {
                e._prev._next = e._next
            } else if (this._first === e) {
                this._first = e._next
            }
            if (e._next) {
                e._next._prev = e._prev
            } else if (this._last === e) {
                this._last = e._prev
            }
            if (this._timeline) {
                this._uncache(true)
            }
        }
        return this
    };
    u.render = function (e, t, n) {
        var r = this._first,
            i;
        this._totalTime = this._time = this._rawPrevTime = e;
        while (r) {
            i = r._next;
            if (r._active || e >= r._startTime && !r._paused) {
                if (!r._reversed) {
                    r.render((e - r._startTime) * r._timeScale, t, false)
                } else {
                    r.render((!r._dirty ? r._totalDuration : r.totalDuration()) - (e - r._startTime) * r._timeScale, t, false)
                }
            }
            r = i
        }
    };
    u.rawTime = function () {
        return this._totalTime
    };
    var E = c("TweenLite", function (e, t, n) {
        y.call(this, t, n);
        if (e == null) {
            throw "Cannot tween an undefined reference."
        }
        this.target = e;
        this._overwrite = this.vars.overwrite == null ? C[E.defaultOverwrite] : typeof this.vars.overwrite === "number" ? this.vars.overwrite >> 0 : C[this.vars.overwrite];
        var r, i, s;
        if ((e instanceof Array || e.jquery) && typeof e[0] === "object") {
            this._targets = e.slice(0);
            this._propLookup = [];
            this._siblings = [];
            for (i = 0; i < this._targets.length; i++) {
                s = this._targets[i];
                if (s.jquery) {
                    this._targets.splice(i--, 1);
                    this._targets = this._targets.concat(s.constructor.makeArray(s));
                    continue
                }
                this._siblings[i] = A(s, this, false);
                if (this._overwrite === 1)
                    if (this._siblings[i].length > 1) {
                        O(s, this, null, 1, this._siblings[i])
                    }
            }
        } else {
            this._propLookup = {};
            this._siblings = A(e, this, false);
            if (this._overwrite === 1)
                if (this._siblings.length > 1) {
                    O(e, this, null, 1, this._siblings)
                }
        } if (this.vars.immediateRender || t === 0 && this._delay === 0 && this.vars.immediateRender != false) {
            this.render(-this._delay, false, true)
        }
    }, true);
    u = E.prototype = new y;
    u.constructor = E;
    u.kill()._gc = false;
    u.ratio = 0;
    u._firstPT = u._targets = u._overwrittenProps = null;
    u._notifyPluginsOfEnabled = false;
    E.version = 12;
    E.defaultEase = u._ease = new d(null, null, 1, 1);
    E.defaultOverwrite = "auto";
    E.ticker = b;
    var S = E._plugins = {}, x = E._tweenLookup = {}, T = 0,
        N = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            orientToBezier: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1
        }, C = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }, k = y._rootFramesTimeline = new w,
        L = y._rootTimeline = new w;
    L._startTime = b.time;
    k._startTime = b.frame;
    L._active = k._active = true;
    y._updateRoot = function () {
        L.render((b.time - L._startTime) * L._timeScale, false, false);
        k.render((b.frame - k._startTime) * k._timeScale, false, false);
        if (!(b.frame % 120)) {
            var e, t, n;
            for (n in x) {
                t = x[n].tweens;
                e = t.length;
                while (--e > -1) {
                    if (t[e]._gc) {
                        t.splice(e, 1)
                    }
                }
                if (t.length === 0) {
                    delete x[n]
                }
            }
        }
    };
    b.addEventListener("tick", y._updateRoot);
    var A = function (e, t, n) {
        var r = e._gsTweenID,
            i, s;
        if (!x[r || (e._gsTweenID = r = "t" + T++)]) {
            x[r] = {
                target: e,
                tweens: []
            }
        }
        if (t) {
            i = x[r].tweens;
            i[s = i.length] = t;
            if (n) {
                while (--s > -1) {
                    if (i[s] === t) {
                        i.splice(s, 1)
                    }
                }
            }
        }
        return x[r].tweens
    }, O = function (e, t, n, r, i) {
            var s, o, u;
            if (r === 1 || r >= 4) {
                var a = i.length;
                for (s = 0; s < a; s++) {
                    if ((u = i[s]) !== t) {
                        if (!u._gc)
                            if (u._enabled(false, false)) {
                                o = true
                            }
                    } else if (r === 5) {
                        break
                    }
                }
                return o
            }
            var f = t._startTime + 1e-10,
                l = [],
                c = 0,
                h;
            s = i.length;
            while (--s > -1) {
                if ((u = i[s]) === t || u._gc || u._paused) {} else if (u._timeline !== t._timeline) {
                    h = h || M(t, 0);
                    if (M(u, h) === 0) {
                        l[c++] = u
                    }
                } else if (u._startTime <= f)
                    if (u._startTime + u.totalDuration() / u._timeScale + 1e-10 > f)
                        if (!((t._duration === 0 || !u._initted) && f - u._startTime <= 2e-10)) {
                            l[c++] = u
                        }
            }
            s = c;
            while (--s > -1) {
                u = l[s];
                if (r === 2)
                    if (u._kill(n, e)) {
                        o = true
                    }
                if (r !== 2 || !u._firstPT && u._initted) {
                    if (u._enabled(false, false)) {
                        o = true
                    }
                }
            }
            return o
        }, M = function (e, t) {
            var n = e._timeline,
                r = n._timeScale,
                i = e._startTime;
            while (n._timeline) {
                i += n._startTime;
                r *= n._timeScale;
                if (n._paused) {
                    return -100
                }
                n = n._timeline
            }
            i /= r;
            return i > t ? i - t : !e._initted && i - t < 2e-10 ? 1e-10 : (i = i + e.totalDuration() / e._timeScale / r) > t ? 0 : i - t - 1e-10
        };
    u._init = function () {
        if (this.vars.startAt) {
            this.vars.startAt.overwrite = 0;
            this.vars.startAt.immediateRender = true;
            E.to(this.target, 0, this.vars.startAt)
        }
        var e, t, n;
        if (this.vars.ease instanceof d) {
            this._ease = this.vars.easeParams instanceof Array ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease
        } else if (typeof this.vars.ease === "function") {
            this._ease = new d(this.vars.ease, this.vars.easeParams)
        } else {
            this._ease = E.defaultEase
        }
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets) {
            e = this._targets.length;
            while (--e > -1) {
                if (this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], this._overwrittenProps ? this._overwrittenProps[e] : null)) {
                    t = true
                }
            }
        } else {
            t = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps)
        } if (t) {
            E._onPluginEvent("_onInitAllProps", this)
        }
        if (this._overwrittenProps)
            if (this._firstPT == null)
                if (typeof this.target !== "function") {
                    this._enabled(false, false)
                }
        if (this.vars.runBackwards) {
            n = this._firstPT;
            while (n) {
                n.s += n.c;
                n.c = -n.c;
                n = n._next
            }
        }
        this._onUpdate = this.vars.onUpdate;
        this._initted = true
    };
    u._initProps = function (e, t, n, r) {
        var i, s, o, u, a, f;
        if (e == null) {
            return false
        }
        for (i in this.vars) {
            if (N[i]) {
                if (i === "onStartParams" || i === "onUpdateParams" || i === "onCompleteParams" || i === "onReverseCompleteParams" || i === "onRepeatParams")
                    if (a = this.vars[i]) {
                        s = a.length;
                        while (--s > -1) {
                            if (a[s] === "{self}") {
                                a = this.vars[i] = a.concat();
                                a[s] = this
                            }
                        }
                    }
            } else if (S[i] && (u = new S[i])._onInitTween(e, this.vars[i], this)) {
                this._firstPT = f = {
                    _next: this._firstPT,
                    t: u,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: true,
                    n: i,
                    pg: true,
                    pr: u._priority
                };
                s = u._overwriteProps.length;
                while (--s > -1) {
                    t[u._overwriteProps[s]] = this._firstPT
                }
                if (u._priority || u._onInitAllProps) {
                    o = true
                }
                if (u._onDisable || u._onEnable) {
                    this._notifyPluginsOfEnabled = true
                }
            } else {
                this._firstPT = t[i] = f = {
                    _next: this._firstPT,
                    t: e,
                    p: i,
                    f: typeof e[i] === "function",
                    n: i,
                    pg: false,
                    pr: 0
                };
                f.s = !f.f ? parseFloat(e[i]) : e[i.indexOf("set") || typeof e["get" + i.substr(3)] !== "function" ? i : "get" + i.substr(3)]();
                f.c = typeof this.vars[i] === "number" ? this.vars[i] - f.s : typeof this.vars[i] === "string" ? parseFloat(this.vars[i].split("=").join("")) : 0
            } if (f)
                if (f._next) {
                    f._next._prev = f
                }
        }
        if (r)
            if (this._kill(r, e)) {
                return this._initProps(e, t, n, r)
            }
        if (this._overwrite > 1)
            if (this._firstPT)
                if (n.length > 1)
                    if (O(e, this, t, this._overwrite, n)) {
                        this._kill(t, e);
                        return this._initProps(e, t, n, r)
                    }
        return o
    };
    u.render = function (e, t, n) {
        var r = this._time,
            i, s, o;
        if (e >= this._duration) {
            this._totalTime = this._time = this._duration;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
            if (!this._reversed) {
                i = true;
                s = "onComplete"
            }
            if (this._duration === 0) {
                if (e === 0 || this._rawPrevTime < 0)
                    if (this._rawPrevTime !== e) {
                        n = true
                    }
                this._rawPrevTime = e
            }
        } else if (e <= 0) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (r !== 0 || this._duration === 0 && this._rawPrevTime > 0) {
                s = "onReverseComplete";
                i = this._reversed
            }
            if (e < 0) {
                this._active = false;
                if (this._duration === 0) {
                    if (this._rawPrevTime >= 0) {
                        n = true
                    }
                    this._rawPrevTime = e
                }
            } else if (!this._initted) {
                n = true
            }
        } else {
            this._totalTime = this._time = e;
            if (this._easeType) {
                var u = e / this._duration,
                    a = this._easeType,
                    f = this._easePower;
                if (a === 1 || a === 3 && u >= .5) {
                    u = 1 - u
                }
                if (a === 3) {
                    u *= 2
                }
                if (f === 1) {
                    u *= u
                } else if (f === 2) {
                    u *= u * u
                } else if (f === 3) {
                    u *= u * u * u
                } else if (f === 4) {
                    u *= u * u * u * u
                }
                if (a === 1) {
                    this.ratio = 1 - u
                } else if (a === 2) {
                    this.ratio = u
                } else if (e / this._duration < .5) {
                    this.ratio = u / 2
                } else {
                    this.ratio = 1 - u / 2
                }
            } else {
                this.ratio = this._ease.getRatio(e / this._duration)
            }
        } if (this._time === r && !n) {
            return
        } else if (!this._initted) {
            this._init();
            if (!i && this._time) {
                this.ratio = this._ease.getRatio(this._time / this._duration)
            }
        }
        if (!this._active)
            if (!this._paused) {
                this._active = true
            }
        if (r === 0)
            if (this.vars.onStart)
                if (this._time !== 0 || this._duration === 0)
                    if (!t) {
                        this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || p)
                    }
        o = this._firstPT;
        while (o) {
            if (o.f) {
                o.t[o.p](o.c * this.ratio + o.s)
            } else {
                o.t[o.p] = o.c * this.ratio + o.s
            }
            o = o._next
        }
        if (this._onUpdate)
            if (!t) {
                this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || p)
            }
        if (s)
            if (!this._gc) {
                if (i) {
                    if (this._timeline.autoRemoveChildren) {
                        this._enabled(false, false)
                    }
                    this._active = false
                }
                if (!t)
                    if (this.vars[s]) {
                        this.vars[s].apply(this.vars[s + "Scope"] || this, this.vars[s + "Params"] || p)
                    }
            }
    };
    u._kill = function (e, t) {
        if (e === "all") {
            e = null
        }
        if (e == null)
            if (t == null || t == this.target) {
                return this._enabled(false, false)
            }
        t = t || this._targets || this.target;
        var n, r, i, s, o, u, a, f;
        if ((t instanceof Array || t.jquery) && typeof t[0] === "object") {
            n = t.length;
            while (--n > -1) {
                if (this._kill(e, t[n])) {
                    u = true
                }
            }
        } else {
            if (this._targets) {
                n = this._targets.length;
                while (--n > -1) {
                    if (t === this._targets[n]) {
                        o = this._propLookup[n] || {};
                        this._overwrittenProps = this._overwrittenProps || [];
                        r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                        break
                    }
                }
            } else if (t !== this.target) {
                return false
            } else {
                o = this._propLookup;
                r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
            } if (o) {
                a = e || o;
                f = e != r && r != "all" && e != o && (e == null || e._tempKill != true);
                for (i in a) {
                    if (s = o[i]) {
                        if (s.pg && s.t._kill(a)) {
                            u = true
                        }
                        if (!s.pg || s.t._overwriteProps.length === 0) {
                            if (s._prev) {
                                s._prev._next = s._next
                            } else if (s === this._firstPT) {
                                this._firstPT = s._next
                            }
                            if (s._next) {
                                s._next._prev = s._prev
                            }
                            s._next = s._prev = null
                        }
                        delete o[i]
                    }
                    if (f) {
                        r[i] = 1
                    }
                }
            }
        }
        return u
    };
    u.invalidate = function () {
        if (this._notifyPluginsOfEnabled) {
            E._onPluginEvent("_onDisable", this)
        }
        this._firstPT = null;
        this._overwrittenProps = null;
        this._onUpdate = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = false;
        this._propLookup = this._targets ? {} : [];
        return this
    };
    u._enabled = function (e, t) {
        if (e && this._gc) {
            if (this._targets) {
                var n = this._targets.length;
                while (--n > -1) {
                    this._siblings[n] = A(this._targets[n], this, true)
                }
            } else {
                this._siblings = A(this.target, this, true)
            }
        }
        y.prototype._enabled.call(this, e, t);
        if (this._notifyPluginsOfEnabled)
            if (this._firstPT) {
                return E._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
            }
        return false
    };
    E.to = function (e, t, n) {
        return new E(e, t, n)
    };
    E.from = function (e, t, n) {
        n.runBackwards = true;
        if (n.immediateRender != false) {
            n.immediateRender = true
        }
        return new E(e, t, n)
    };
    E.fromTo = function (e, t, n, r) {
        r.startAt = n;
        if (n.immediateRender) {
            r.immediateRender = true
        }
        return new E(e, t, r)
    };
    E.delayedCall = function (e, t, n, r, i) {
        return new E(t, 0, {
            delay: e,
            onComplete: t,
            onCompleteParams: n,
            onCompleteScope: r,
            onReverseComplete: t,
            onReverseCompleteParams: n,
            onReverseCompleteScope: r,
            immediateRender: false,
            useFrames: i,
            overwrite: 0
        })
    };
    E.set = function (e, t) {
        return new E(e, 0, t)
    };
    E.killTweensOf = E.killDelayedCallsTo = function (e, t) {
        var n = E.getTweensOf(e),
            r = n.length;
        while (--r > -1) {
            n[r]._kill(t, e)
        }
    };
    E.getTweensOf = function (e) {
        if (e == null) {
            return
        }
        var t, n, r, i;
        if ((e instanceof Array || e.jquery) && typeof e[0] === "object") {
            t = e.length;
            n = [];
            while (--t > -1) {
                n = n.concat(E.getTweensOf(e[t]))
            }
            t = n.length;
            while (--t > -1) {
                i = n[t];
                r = t;
                while (--r > -1) {
                    if (i === n[r]) {
                        n.splice(t, 1)
                    }
                }
            }
        } else {
            n = A(e).concat();
            t = n.length;
            while (--t > -1) {
                if (n[t]._gc) {
                    n.splice(t, 1)
                }
            }
        }
        return n
    };
    var _ = c("plugins.TweenPlugin", function (e, t) {
        this._overwriteProps = (e || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = t || 0
    }, true);
    u = _.prototype;
    _.version = 12;
    _.API = 2;
    u._firstPT = null;
    u._addTween = function (e, t, n, r, i, s) {
        var o;
        if (r != null && (o = typeof r === "number" || r.charAt(1) !== "=" ? Number(r) - n : Number(r.split("=").join("")))) {
            this._firstPT = {
                _next: this._firstPT,
                t: e,
                p: t,
                s: n,
                c: o,
                f: typeof e[t] === "function",
                n: i || t,
                r: s
            };
            if (this._firstPT._next) {
                this._firstPT._next._prev = this._firstPT
            }
        }
    };
    u.setRatio = function (e) {
        var t = this._firstPT,
            n;
        while (t) {
            n = t.c * e + t.s;
            if (t.r) {
                n = n + (n > 0 ? .5 : -.5) >> 0
            }
            if (t.f) {
                t.t[t.p](n)
            } else {
                t.t[t.p] = n
            }
            t = t._next
        }
    };
    u._kill = function (e) {
        if (e[this._propName] != null) {
            this._overwriteProps = []
        } else {
            var t = this._overwriteProps.length;
            while (--t > -1) {
                if (e[this._overwriteProps[t]] != null) {
                    this._overwriteProps.splice(t, 1)
                }
            }
        }
        var n = this._firstPT;
        while (n) {
            if (e[n.n] != null) {
                if (n._next) {
                    n._next._prev = n._prev
                }
                if (n._prev) {
                    n._prev._next = n._next;
                    n._prev = null
                } else if (this._firstPT === n) {
                    this._firstPT = n._next
                }
            }
            n = n._next
        }
        return false
    };
    u._roundProps = function (e, t) {
        var n = this._firstPT;
        while (n) {
            if (e[this._propName] || n.n != null && e[n.n.split(this._propName + "_").join("")]) {
                n.r = t
            }
            n = n._next
        }
    };
    E._onPluginEvent = function (e, t) {
        var n = t._firstPT,
            r;
        if (e === "_onInitAllProps") {
            var i, s, o, u;
            while (n) {
                u = n._next;
                i = s;
                while (i && i.pr > n.pr) {
                    i = i._next
                }
                if (n._prev = i ? i._prev : o) {
                    n._prev._next = n
                } else {
                    s = n
                } if (n._next = i) {
                    i._prev = n
                } else {
                    o = n
                }
                n = u
            }
            n = t._firstPT = s
        }
        while (n) {
            if (n.pg)
                if (typeof n.t[e] === "function")
                    if (n.t[e]()) {
                        r = true
                    }
            n = n._next
        }
        return r
    };
    _.activate = function (e) {
        var t = e.length;
        while (--t > -1) {
            if (e[t].API === _.API) {
                E._plugins[(new e[t])._propName] = e[t]
            }
        }
        return true
    };
    if (r = e._gsQueue) {
        for (i = 0; i < r.length; i++) {
            r[i]()
        }
        for (u in f) {
            if (!f[u].def) {
                console.log("Warning: TweenLite encountered missing dependency: com.greensock." + u)
            }
        }
    }
})(window);
(function (e) {
    var t = function (e, n, r, i, s, o, u, a, f, l) {
        var c = this;
        var h = t.prototype;
        this.parent = e;
        this.mainHolder_do = null;
        this.background_do = null;
        this.animationHolder_do = null;
        this.animationImage_do = null;
        this.closeButton_do = null;
        this.backgroundImage_img = n;
        this.closeButtonN_img = r;
        this.closeButtonS_img = i;
        this.animationImage_img = s;
        this.stageWidth;
        this.stageHeight;
        this.totalWidth = this.backgroundImage_img.width;
        this.totalHeight = this.backgroundImage_img.height;
        this.segmentWidth = o;
        this.segmentHeight = u;
        this.totalSegments = a;
        this.animDelay = f || 300;
        this.count = 0;
        this.delayTimerId_int;
        this.positionId_int;
        this.hideAndShowId_to;
        this.hideCompleteId_to;
        this.isShowed_bl = true;
        this.hasTouchSupport_bl = l;
        this.disableInteraction_bl = false;
        this.init = function () {
            this.setOverflow("visible");
            this.setY(-5e3);
            this.setupDos();
            this.setupCloseButton();
            this.positionId_int = setInterval(this.resizeHandler, 100);
            this.hideAndShowId_to = setTimeout(this.hideAndShow, 200)
        };
        this.resizeHandler = function () {
            if (c.stageWidth == c.parent.main_do.getWidth() && c.stageHeight == c.parent.main_do.getHeight()) return;
            c.stageWidth = c.parent.main_do.getWidth();
            c.stageHeight = c.parent.main_do.getHeight();
            c.setX(parseInt((c.stageWidth - c.totalWidth) / 2));
            c.setY(parseInt((c.stageHeight - c.totalHeight) / 2))
        };
        this.setupDos = function () {
            this.mainHolder_do = new FWDDisplayObject("div");
            this.mainHolder_do.setWidth(this.totalWidth);
            this.mainHolder_do.setHeight(this.totalHeight);
            this.addChild(this.mainHolder_do);
            this.animationHolder_do = new FWDDisplayObject("div");
            this.animationHolder_do.setWidth(this.segmentWidth);
            this.animationHolder_do.setHeight(this.segmentHeight);
            this.animationHolder_do.setX(21);
            this.animationHolder_do.setY(50);
            this.mainHolder_do.addChild(this.animationHolder_do);
            this.background_do = new FWDDisplayObject("img");
            this.background_do.setScreen(this.backgroundImage_img);
            this.mainHolder_do.addChild(this.background_do);
            this.animationImage_do = new FWDDisplayObject("img");
            this.animationImage_do.setScreen(this.animationImage_img);
            this.animationHolder_do.addChild(this.animationImage_do)
        };
        this.setupCloseButton = function () {
            FWDSimpleButton.setPrototype();
            this.closeButton_do = new FWDSimpleButton(this.closeButtonN_img, this.closeButtonS_img, this.hasTouchSupport_bl);
            this.closeButton_do.setX(264);
            this.closeButton_do.addListener(FWDSimpleButton.CLICK, this.closeButtonOnClickHandler);
            this.mainHolder_do.addChild(this.closeButton_do)
        };
        this.closeButtonOnClickHandler = function (e) {
            if (c.disableInteraction_bl) return;
            c.hide(true);
            c.disableInteraction_bl = true
        };
        this.start = function () {
            clearInterval(this.delayTimerId_int);
            this.delayTimerId_int = setInterval(this.updatePreloader, this.animDelay)
        };
        this.stop = function () {
            clearInterval(this.delayTimerId_int)
        };
        this.updatePreloader = function () {
            c.count++;
            if (c.count > c.totalSegments - 1) c.count = 0;
            var e = c.count * c.segmentWidth;
            c.animationImage_do.setX(-e)
        };
        this.hideAndShow = function () {
            c.hide(false);
            c.show(true)
        };
        this.show = function () {
            if (this.isShowed_bl) return;
            this.setVisible(true);
            this.start();
            TweenMax.killTweensOf(this.mainHolder_do);
            TweenMax.to(this.mainHolder_do, .9, {
                x: 0,
                delay: .5,
                ease: Expo.easeInOut
            });
            this.isShowed_bl = true
        };
        this.hide = function (e) {
            if (!this.isShowed_bl) return;
            TweenMax.killTweensOf(this.mainHolder_do);
            if (e) {
                TweenMax.to(this.mainHolder_do, .9, {
                    x: -(this.stageWidth - (this.stageWidth + this.totalWidth) / 2) - this.totalWidth,
                    ease: Expo.easeInOut
                });
                this.hideCompleteId_to = setTimeout(this.onHideComplete, 900)
            } else {
                this.setVisible(false);
                this.mainHolder_do.setX((this.stageWidth + this.totalWidth) / 2 + 2)
            }
            this.isShowed_bl = false
        };
        this.onHideComplete = function () {
            c.stop();
            c.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.cleanMainEvents = function () {
            clearInterval(this.delayTimerId_int);
            clearInterval(this.positionId_int);
            clearTimeout(this.hideAndShowId_to);
            clearTimeout(this.hideCompleteId_to)
        };
        this.destroy = function () {
            this.cleanMainEvents();
            this.closeButton_do.destroy();
            TweenMax.killTweensOf(this);
            this.stop();
            TweenMax.killTweensOf(this.mainHolder_do);
            this.mainHolder_do.destroy();
            this.background_do.destroy();
            this.animationImage_do.destroy();
            this.animationHolder_do.destroy();
            this.parent = null;
            this.mainHolder_do = null;
            this.background_do = null;
            this.animationHolder_do = null;
            this.animationImage_do = null;
            this.closeButton_do = null;
            this.closeButtonN_do = null;
            this.closeButtonS_do = null;
            this.backgroundImage_img = null;
            this.closeButtonN_img = null;
            this.closeButtonS_img = null;
            this.animationImage_img = null;
            n = null;
            r = null;
            i = null;
            s = null;
            c.setInnerHTML("");
            h.destroy();
            c = null;
            h = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDNavigationHelpScreen = t
})(window);
(function (e) {
    var t = function (e, n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.imageSource_img = e;
        this.image_do = null;
        this.segmentWidth = n;
        this.segmentHeight = r;
        this.totalSegments = i;
        this.animDelay = s || 300;
        this.count = 0;
        this.delayTimerId_int;
        this.isShowed_bl = false;
        this.init = function () {
            this.setWidth(this.segmentWidth);
            this.setHeight(this.segmentHeight);
            this.image_do = new FWDDisplayObject("img");
            this.image_do.setScreen(this.imageSource_img);
            this.addChild(this.image_do);
            this.hide(false)
        };
        this.start = function () {
            clearInterval(this.delayTimerId_int);
            this.delayTimerId_int = setInterval(this.updatePreloader, this.animDelay)
        };
        this.stop = function () {
            clearInterval(this.delayTimerId_int)
        };
        this.updatePreloader = function () {
            o.count++;
            if (o.count > o.totalSegments - 1) o.count = 0;
            var e = o.count * o.segmentWidth;
            o.image_do.setX(-e)
        };
        this.show = function () {
            this.setVisible(true);
            this.start();
            TweenMax.killTweensOf(this);
            TweenMax.to(this, 1, {
                alpha: 1
            });
            this.isShowed_bl = true
        };
        this.hide = function (e) {
            if (!this.isShowed_bl) return;
            TweenMax.killTweensOf(this);
            if (e) {
                TweenMax.to(this, 1, {
                    alpha: 0,
                    onComplete: this.onHideComplete
                })
            } else {
                this.setVisible(false);
                this.setAlpha(0)
            }
            this.isShowed_bl = false
        };
        this.onHideComplete = function () {
            o.setVisible(false);
            o.stop();
            o.dispatchEvent(t.HIDE_COMPLETE)
        };
        this.destroy = function () {
            TweenMax.killTweensOf(this);
            this.stop();
            this.image_do.destroy();
            this.imageSource_img = null;
            this.image_do = null;
            e = null;
            o.setInnerHTML("");
            u.destroy();
            o = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.HIDE_COMPLETE = "hideComplete";
    t.prototype = null;
    e.FWDPreloader = t
})(window);
(function (e) {
    var t = function (n, r, i) {
        var s = this;
        var o = t.prototype;
        this.nImg = n;
        this.sImg = r;
        this.n_do;
        this.s_do;
        this.hasTouchSupport_bl = i;
        this.isDisabled_bl = false;
        this.init = function () {
            this.setupMainContainers()
        };
        this.setupMainContainers = function () {
            this.n_do = new FWDDisplayObject("img");
            this.n_do.setScreen(this.nImg);
            this.s_do = new FWDDisplayObject("img");
            this.s_do.setScreen(this.sImg);
            this.addChild(this.s_do);
            this.addChild(this.n_do);
            this.setWidth(this.nImg.width);
            this.setHeight(this.nImg.height);
            this.setButtonMode(true);
            if (this.hasTouchSupport_bl) {
                this.screen.addEventListener("touchend", this.onClick)
            } else if (e.addEventListener) {
                this.screen.addEventListener("mouseover", this.onMouseOver);
                this.screen.addEventListener("mouseout", this.onMouseOut);
                this.screen.addEventListener("click", this.onClick)
            } else {
                this.screen.attachEvent("onmouseover", this.onMouseOver);
                this.screen.attachEvent("onmouseout", this.onMouseOut);
                this.screen.attachEvent("onclick", this.onClick)
            }
        };
        this.onMouseOver = function () {
            if (FWDData.hasTouchStarted_bl) return;
            TweenMax.to(s.n_do, .9, {
                alpha: 0,
                ease: Expo.easeOut
            })
        };
        this.onMouseOut = function () {
            if (FWDData.hasTouchStarted_bl) return;
            TweenMax.to(s.n_do, .9, {
                alpha: 1
            })
        };
        this.onClick = function (e) {
            if (s.isDisabled_bl) return;
            s.dispatchEvent(t.CLICK)
        };
        this.destroy = function () {
            if (this.hasTouchSupport_bl) {
                this.screen.removeEventListener("touchend", this.onClick)
            } else if (e.removeEventListener) {
                this.screen.removeEventListener("mouseover", this.onMouseOver);
                this.screen.removeEventListener("mouseout", this.onMouseOut);
                this.screen.removeEventListener("click", this.onClick)
            } else {
                this.screen.detachEvent("onmouseover", this.onMouseOver);
                this.screen.detachEvent("onmouseout", this.onMouseOut);
                this.screen.detachEvent("onclick", this.onClick)
            }
            TweenMax.killTweensOf(this.n_do);
            this.n_do.destroy();
            this.s_do.destroy();
            this.nImg = null;
            this.sImg = null;
            this.n_do = null;
            this.s_do = null;
            n = null;
            r = null;
            o.destroy();
            s = null;
            o = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = null;
        t.prototype = new FWDDisplayObject("div")
    };
    t.CLICK = "onClick";
    t.prototype = null;
    e.FWDSimpleButton = t
})(window);
(function (e) {
    var t = function (e, n, r, i, s) {
        var o = this;
        var u = t.prototype;
        this.imageSource_img = e;
        this.image_do = null;
        this.tweenObj = {
            currentPos: 0
        };
        this.segmentWidth = n;
        this.segmentHeight = r;
        this.totalSegments = i;
        this.duration = s / 1e3;
        this.delayTimerId_int;
        this.init = function () {
            this.setWidth(this.segmentWidth);
            this.setHeight(this.segmentHeight);
            this.image_do = new FWDDisplayObject("img");
            this.image_do.setScreen(this.imageSource_img);
            this.addChild(this.image_do);
            this.onUpdateHandler();
            this.hide(false)
        };
        this.animIn = function () {
            TweenMax.killTweensOf(this.tweenObj);
            this.currentPos = 0;
            TweenMax.to(this.tweenObj, this.duration, {
                currentPos: 1,
                ease: Linear.easeNone,
                onUpdate: this.onUpdateHandler
            })
        };
        this.animOut = function () {
            TweenMax.killTweensOf(this.tweenObj);
            TweenMax.to(this.tweenObj, .8, {
                currentPos: 0,
                onUpdate: this.onUpdateHandler
            })
        };
        this.onUpdateHandler = function () {
            var e = Math.round(o.tweenObj.currentPos / 1 * (o.totalSegments - 1)) * o.segmentWidth;
            o.image_do.setX(-e)
        };
        this.show = function () {
            this.setVisible(true);
            if (this.opacityType == "opacity") {
                TweenMax.killTweensOf(this.image_do);
                TweenMax.to(this.image_do, 1, {
                    alpha: 1
                })
            } else {
                this.setWidth(this.segmentWidth)
            }
        };
        this.hide = function (e) {
            if (e) {
                if (this.opacityType == "opacity") {
                    TweenMax.killTweensOf(this.image_do);
                    TweenMax.to(this.image_do, 1, {
                        alpha: 0
                    })
                } else {
                    this.setWidth(0)
                }
            } else {
                if (this.opacityType == "opacity") {
                    TweenMax.killTweensOf(this.image_do);
                    this.setVisible(false);
                    this.image_do.setAlpha(0)
                } else {
                    this.setWidth(0)
                }
            }
        };
        this.destroy = function () {
            TweenMax.killTweensOf(this);
            TweenMax.killTweensOf(this.tweenObj);
            TweenMax.killTweensOf(this.image_do);
            this.image_do.destroy();
            this.imageSource_img = null;
            this.image_do = null;
            this.tweenObj = null;
            e = null;
            this.setInnerHTML("");
            u.destroy();
            o = null;
            u = null;
            t.prototype = null
        };
        this.init()
    };
    t.HIDE_COMPLETE;
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.prototype = null;
    e.FWDSlideShowPreloader = t
})(window);
(function (e) {
    var t = function (e, n, r, i, s, o) {
        var u = this;
        var a = t.prototype;
        this.parent = e;
        this.background_do = null;
        this.smallImage_do = null;
        this.overlay_do = null;
        this.dumyHit_do = null;
        this.smallImage_img = null;
        this.icon_img = null;
        this.backgroundColor_str = n;
        this.thumbPath_str;
        this.iconPath_str;
        this.totalWidth = 0;
        this.totalHeight = 0;
        this.imageFinalWidth = 0;
        this.imageFinalHeight = 0;
        this.finalX;
        this.finalY;
        this.imageFinalX = 0;
        this.imageFinalY = 0;
        this.smallImageOriginalW = 0;
        this.smallImageOriginalH = 0;
        this.iconWidth = 24;
        this.iconHeight = 24;
        this.overlayOpacity = r;
        this.gridPosition;
        this.checkHitId_int;
        this.loadTimeOutId_to;
        this.isMobile_bl = s;
        this.isSmallImageLoaded_bl = false;
        this.hasOverlay_bl = i;
        this.hasIcon_bl = o;
        this.hasIconAdded_bl = false;
        this.hasDumyAdded_bl = false;
        this.isAvailable_bl = true;
        this.isNormalState_bl = false;
        this.isMouseDown_bl = false;
        this.init = function () {
            this.setupBackgroundAndOverlay();
            this.addEvents();
            if (FWDUtils.isAndroid) u.setBackfaceVisibility()
        };
        this.setupBackgroundAndOverlay = function () {
            this.background_do = new FWDDisplayObject("div");
            this.background_do.setBkColor(this.backgroundColor_str);
            if (FWDUtils.isAndroid) u.background_do.setBackfaceVisibility();
            this.addChild(this.background_do);
            this.smallImage_do = new FWDDisplayObject("img");
            if (this.hasOverlay_bl) {
                this.overlay_do = new FWDDisplayObject("div");
                this.overlay_do.setBkColor("#000000");
                this.overlay_do.setAlpha(this.overlayOpacity);
                this.addChild(u.overlay_do)
            }
            if (!this.isMobile_bl) {
                this.dumyHit_do = new FWDDisplayObject("div");
                this.dumyHit_do.setBkColor("#FF0000")
            }
        };
        this.addDumy = function () {
            if (this.isMobile_bl) return;
            if (this.hasDumyAdded_bl) return;
            this.dumyHit_do.setWidth(this.totalWidth);
            this.dumyHit_do.setHeight(this.totalHeight);
            this.dumyHit_do.setAlpha(0);
            this.dumyHit_do.setButtonMode(true);
            this.addChild(this.dumyHit_do);
            this.hasDumyAdded_bl = true
        };
        this.removeDumy = function () {
            if (this.isMobile_bl) return;
            if (!this.hasDumyAdded_bl) return;
            try {
                this.removeChild(this.dumyHit_do)
            } catch (e) {}
            this.hasDumyAdded_bl = false
        };
        this.addIconImage = function () {
            if (!this.hasIcon_bl) return;
            if (this.hasIconAdded_bl) return;
            if (!this.icon_img) {
                this.icon_img = new Image;
                this.icon_img.style.position = "absolute";
                this.icon_img.style.margin = "0px";
                this.icon_img.style.padding = "0px"
            }
            if (this.opacityType == "opacity") {
                this.icon_img.style.left = parseInt((this.totalWidth - 80) / 2) + "px";
                this.icon_img.style.top = parseInt((this.totalHeight - 80) / 2) + "px";
                this.icon_img.style.width = "80px";
                this.icon_img.style.height = "80px";
                this.icon_img.style.opacity = 0;
                TweenMax.killTweensOf(this.icon_img);
                TweenMax.to(this.icon_img, .5, {
                    css: {
                        opacity: 1,
                        left: parseInt((this.totalWidth - this.iconWidth) / 2),
                        top: parseInt((this.totalHeight - this.iconHeight) / 2),
                        width: this.iconWidth,
                        height: this.iconHeight
                    },
                    delay: .1,
                    ease: Expo.easeInOut
                })
            } else {
                this.icon_img.style.left = parseInt((this.totalWidth - this.iconWidth) / 2) + "px";
                this.icon_img.style.top = parseInt((this.totalHeight - this.iconHeight) / 2) + "px";
                this.icon_img.style.width = this.iconWidth + "px";
                this.icon_img.style.height = this.iconHeight + "px";
                this.icon_img.style.opacity = 0
            }
            this.icon_img.src = this.iconPath_str;
            this.screen.appendChild(this.icon_img);
            this.hasIconAdded_bl = true
        };
        this.removeIconImage = function () {
            if (!this.hasIcon_bl) return;
            if (!this.hasIconAdded_bl) return;
            TweenMax.killTweensOf(this.icon_img);
            try {
                this.screen.removeChild(this.icon_img)
            } catch (e) {}
            this.hasIconAdded_bl = false
        };
        this.addEvents = function () {
            this.screen.ontouchend = this.onTouchEndHandler;
            this.screen.onmouseover = this.onMouseOverHandler;
            this.screen.onmousedown = this.onMouseDownHandler;
            this.screen.onmouseup = this.onMouseUpHandler
        };
        this.onMouseOverHandler = function () {
            if (FWDData.hasTouchStarted_bl) return;
            if (!u.isNormalState_bl) return;
            u.dispatchEvent(t.MOUSE_OVER);
            u.isNormalState_bl = false
        };
        this.onMouseDownHandler = function () {
            if (FWDData.hasTouchStarted_bl) return;
            u.isMouseDown_bl = true;
            u.setNormalState(false, 0)
        };
        this.onMouseUpHandler = function () {
            if (FWDData.hasTouchStarted_bl) return;
            u.setSelectedState();
            if (u.isMouseDown_bl || u.isMobile_bl) u.dispatchEvent(t.MOUSE_DONE);
            u.isMouseDown_bl = false
        };
        this.onTouchEndHandler = function () {
            u.setSelectedState();
            if (u.isMouseDown_bl || u.isMobile_bl) u.dispatchEvent(t.MOUSE_DONE);
            u.isMouseDown_bl = false
        };
        this.startToCheckHit = function () {
            clearInterval(this.checkHitId_int);
            this.checkHitId_int = setInterval(this.checkHitHandler, 100)
        };
        this.checkHitHandler = function () {
            if (!FWDUtils.hitTest(u.screen, u.parent.globalX, u.parent.globalY)) {
                clearInterval(u.checkHitId_int);
                u.setNormalState();
                u.isNormalState_bl = true
            }
        };
        this.resizeThumb = function () {
            this.setWidth(this.totalWidth);
            this.setHeight(this.totalHeight);
            this.background_do.setWidth(this.totalWidth);
            this.background_do.setHeight(this.totalHeight);
            if (this.overlay_do) {
                this.overlay_do.setWidth(this.totalWidth);
                this.overlay_do.setHeight(this.totalHeight)
            }
        };
        this.resizeImage = function () {
            var e = this.totalWidth / this.smallImageOriginalW;
            var t = this.totalHeight / this.smallImageOriginalH;
            var n = 0;
            if (e >= t) {
                n = e
            } else if (e <= t) {
                n = t
            }
            this.imageFinalWidth = Math.round(this.smallImageOriginalW * n);
            this.imageFinalHeight = Math.round(this.smallImageOriginalH * n);
            this.imageFinalX = Math.round((this.totalWidth - this.imageFinalWidth) / 2);
            this.imageFinalY = Math.round((this.totalHeight - this.imageFinalHeight) / 2);
            this.smallImage_do.setX(this.imageFinalX);
            this.smallImage_do.setY(this.imageFinalY);
            this.smallImage_do.setWidth(this.imageFinalWidth);
            this.smallImage_do.setHeight(this.imageFinalHeight)
        };
        this.loadAndAddSmallImage = function (e) {
            this.isNormalState_bl = true;
            this.thumbPath_str = e;
            this.resizeThumb();
            clearTimeout(this.loadTimeOutId_to);
            this.loadTimeOutId_to = setTimeout(this.startToLoadSmallImage, Math.random() * 600)
        };
        this.startToLoadSmallImage = function () {
            u.smallImage_img = new Image;
            u.smallImage_img.onload = u.onSmallImageLoad;
            u.smallImage_img.src = u.thumbPath_str
        };
        this.onSmallImageLoad = function () {
            u.smallImageOriginalW = u.smallImage_img.width;
            u.smallImageOriginalH = u.smallImage_img.height;
            u.smallImage_do.setScreen(u.smallImage_img);
            u.addChildAt(u.smallImage_do, 1);
            u.resizeImage();
            u.smallImage_do.setAlpha(0);
            TweenMax.to(u.smallImage_do, .6, {
                alpha: 1,
                delay: Math.random()
            });
            u.isSmallImageLoaded_bl = true
        };
        this.removeSmallImage = function () {
            clearTimeout(this.loadTimeOutId_to);
            if (this.smallImage_img) {
                try {
                    this.setNormalState(true);
                    if (this.contains(this.smallImage_do)) this.removeChild(this.smallImage_do);
                    TweenMax.killTweensOf(this.smallImage_do);
                    this.smallImage_do.disposeImage()
                } catch (e) {}
                this.smallImage_img.onload = null
            }
            this.isSmallImageLoaded_bl = false;
            this.isNormalState_bl = true
        };
        this.showFirstTime = function () {
            this.background_do.setAlpha(0);
            TweenMax.to(this.background_do, .6, {
                alpha: 1,
                delay: Math.random()
            })
        };
        this.setNormalState = function (e, t) {
            if (t == undefined) t = .2;
            if (e) {
                if (this.overlay_do) {
                    TweenMax.killTweensOf(this.overlay_do);
                    this.overlay_do.setAlpha(this.overlayOpacity)
                }
            } else {
                if (this.overlay_do) {
                    TweenMax.killTweensOf(this.overlay_do);
                    TweenMax.to(this.overlay_do, .6, {
                        alpha: this.overlayOpacity,
                        delay: t
                    })
                }
            }
            u.removeIconImage();
            u.removeDumy()
        };
        this.setSelectedState = function () {
            if (u.overlay_do) {
                TweenMax.killTweensOf(u.overlay_do);
                TweenMax.to(u.overlay_do, .2, {
                    alpha: 0
                })
            }
            this.addIconImage();
            this.addDumy();
            this.startToCheckHit()
        };
        this.cleanMainEvents = function () {
            clearTimeout(this.loadTimeOutId_to);
            clearInterval(this.checkHitId_int);
            this.screen.ontouchend = null;
            this.screen.onmouseover = null;
            this.screen.onmousedown = null;
            this.screen.onmouseup = null;
            this.screen.onclick = null
        };
        this.destroy = function () {
            this.cleanMainEvents();
            TweenMax.killTweensOf(this.background_do);
            this.background_do.destroy();
            if (this.smallImage_do) {
                TweenMax.killTweensOf(this.smallImage_do);
                this.smallImage_do.disposeImage();
                this.smallImage_do.destroy()
            }
            if (this.overlay_do) {
                TweenMax.killTweensOf(this.overlay_do);
                this.overlay_do.destroy()
            }
            if (this.dumyHit_do) this.dumyHit_do.destroy();
            if (this.smallImage_img) {
                this.smallImage_img.onload = null
            }
            if (this.icon_img) {
                TweenMax.killTweensOf(this.icon_img);
                this.icon_img.src = null
            }
            this.parent = null;
            this.smallImage_img = null;
            this.icon_img = null;
            this.background_do = null;
            this.smallImage_do = null;
            this.overlay_do = null;
            this.dumyHit_do = null;
            this.backgroundColor_str = null;
            this.thumbPath_str = null;
            this.iconPath_str = null;
            e = null;
            this.setInnerHTML("");
            a.destroy();
            u = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.MOUSE_OVER = "onMouseOver";
    t.MOUSE_OUT = "onMouseOut";
    t.MOUSE_DOWN = "onMouseDown";
    t.MOUSE_DONE = "onMouseDone";
    t.prototype = null;
    e.FWDThumb = t
})(window);
(function (e) {
    var t = function (n, r, i) {
        var s = this;
        var o = t.prototype;
        this.currentThumb_do;
        this.main_do;
        this.mainBk_do;
        this.text_do;
        this.lastT_do;
        this.hit_do;
        this.backgroundColor_str = n;
        this.backgroundOpacity = r;
        this.finalX;
        this.finalY;
        this.borderW = i;
        this.finalW = 0;
        this.finalH = 0;
        this.globalX = 0;
        this.globalY = 0;
        this.hideWithDelayId_to;
        this.positionTextWithDelay_to;
        this.checkMousePositonId_int;
        this.clearTextId_to;
        this.isShowed_bl = false;
        this.tweenAlphaUp_bl = false;
        this.tweenAlphaDown_bl = false;
        this.init = function () {
            this.setButtonMode(true);
            this.setupMainContainers()
        };
        this.setupMainContainers = function () {
            this.main_do = new FWDDisplayObject("div");
            this.main_do.setResizableSizeAfterParent();
            this.mainBk_do = new FWDDisplayObject("div");
            this.mainBk_do.setResizableSizeAfterParent();
            this.mainBk_do.setBkColor(this.backgroundColor_str);
            this.mainBk_do.setAlpha(this.backgroundOpacity);
            this.text_do = new FWDDisplayObject("div");
            this.hit_do = new FWDDisplayObject("div");
            this.hit_do.setButtonMode(true);
            if (FWDUtils.isIE()) {
                this.hit_do.setBkColor("#FFFFFF");
                this.hit_do.setAlpha(.01)
            }
            this.main_do.addChild(this.mainBk_do);
            this.main_do.addChild(this.text_do);
            this.main_do.addChild(this.hit_do);
            this.addChild(this.main_do);
            if (this.getScreen().addEventListener) {
                this.getScreen().addEventListener("click", this.onClick)
            } else {
                this.getScreen().attachEvent("onclick", this.onClick)
            }
            this.activate()
        };
        this.onClick = function (e) {
            if (!s.currentThumb_do) return;
            s.dispatchEvent(FWDThumb.CLICK, {
                text: s.currentThumb_do.id
            })
        };
        this.onMouseMoveHandler = function (e) {
            var t = FWDUtils.getViewportMouseCoordinates(e);
            s.globalX = t.screenX;
            s.globalY = t.screenY
        };
        this.hideOrShowBasedOnMousePosition = function () {
            if (!s.currentThumb_do) return;
            if (FWDUtils.hitTest(s.currentThumb_do.screen, s.globalX, s.globalY)) {
                s.showMainDo()
            } else {
                s.hideMainDo(true, true)
            }
        };
        this.showCurrentText = function (e) {
            var t;
            if (s.text_do.getNumChildren() != 0) {
                t = s.text_do.getChildAt(s.text_do.getNumChildren() - 1);
                TweenMax.killTweensOf(t);
                if (FWDUtils.isFirefox()) {
                    s.cleanTextChildren(0)
                } else {
                    TweenMax.to(t, .4, {
                        alpha: 0,
                        ease: Expo.easeOut
                    });
                    clearTimeout(s.clearTextId_to);
                    s.clearTextId_to = setTimeout(s.cleanTextChildren, 400)
                }
            }
            s.lastT_do = new FWDDisplayObject("div");
            s.lastT_do.getStyle().width = "100%";
            s.lastT_do.setInnerHTML(e);
            s.lastT_do.setAlpha(0);
            s.text_do.addChild(s.lastT_do);
            clearTimeout(s.positionTextWithDelay_to);
            s.positionTextWithDelay_to = setTimeout(this.positionTextWithDelay, 400)
        };
        this.positionTextWithDelay = function () {
            s.text_do.setY(Math.round((s.finalH - s.lastT_do.getHeight()) / 2));
            TweenMax.to(s.lastT_do, .8, {
                alpha: 1,
                delay: .2
            })
        };
        this.cleanTextChildren = function (e) {
            if (e == undefined) e = 1;
            var t;
            while (s.text_do.getNumChildren() > e) {
                t = s.text_do.getChildAt(0);
                TweenMax.killTweensOf(t);
                s.text_do.removeChild(t);
                t.destroy()
            }
            t = null
        };
        this.show = function (e, t) {
            if (!s) return;
            if (this.currentThumb_do == e) return;
            this.currentThumb_do = e;
            this.showCurrentText(t);
            this.finalX = this.currentThumb_do.finalX + this.borderW;
            this.finalY = this.currentThumb_do.finalY + this.borderW;
            this.finalW = this.currentThumb_do.finalW - this.borderW * 2;
            this.finalH = this.currentThumb_do.finalH - this.borderW * 2;
            this.text_do.setWidth(this.finalW);
            this.text_do.setHeight(this.finalH);
            this.setWidth(this.finalW);
            this.setHeight(this.finalH);
            this.hit_do.setWidth(this.finalW);
            this.hit_do.setHeight(this.finalH);
            TweenMax.killTweensOf(this);
            if (this.isShowed_bl) {
                TweenMax.to(this, .8, {
                    x: this.finalX,
                    y: this.finalY,
                    ease: Expo.easeOut
                })
            } else {
                this.setX(this.finalX);
                this.setY(this.finalY);
                this.hideMainDo(false, false)
            }
            this.showMainDo()
        };
        this.showMainDo = function () {
            if (s.tweenAlphaUp_bl) return;
            clearTimeout(s.hideWithDelayId_to);
            TweenMax.killTweensOf(s.main_do);
            TweenMax.to(s.main_do, .8, {
                x: 0,
                y: 0,
                w: s.finalW,
                h: s.finalH,
                ease: Expo.easeInOut
            });
            if (s.lastT_do) TweenMax.to(s.lastT_do, .8, {
                alpha: 1,
                delay: .6
            });
            s.isShowed_bl = true;
            s.tweenAlphaUp_bl = true;
            s.tweenAlphaDown_bl = false
        };
        this.hideMainDo = function (e, t) {
            if (s.tweenAlphaDown_bl) return;
            if (t) {
                s.hideWithDelayId_to = setTimeout(s.hideMainDoWithDelay, 1e3)
            } else {
                s.hideMainDoWithDelay(e)
            }
            s.tweenAlphaDown_bl = true;
            s.tweenAlphaUp_bl = false
        };
        this.hideMainDoWithDelay = function (e) {
            if (e == undefined) e = true;
            TweenMax.killTweensOf(s.main_do);
            if (e) {
                TweenMax.to(s.main_do, .8, {
                    x: s.finalW / 2,
                    y: s.finalH / 2,
                    w: 0,
                    h: 0,
                    ease: Expo.easeInOut,
                    onComplete: s.onHideMainDoWithDelayComplete
                });
                if (s.lastT_do) TweenMax.to(s.lastT_do, .4, {
                    alpha: 0
                })
            } else {
                s.main_do.setX(parseInt(s.finalW / 2));
                s.main_do.setY(parseInt(s.finalH / 2));
                s.main_do.setWidth(0);
                s.main_do.setHeight(0);
                s.onHideMainDoWithDelayComplete()
            }
        };
        this.onHideMainDoWithDelayComplete = function () {
            s.isShowed_bl = false
        };
        this.reset = function () {
            clearTimeout(s.hideWithDelayId_to);
            s.hideMainDoWithDelay(false);
            s.currentThumb_do = null
        };
        this.activate = function () {
            if (e.addEventListener) {
                e.addEventListener("mousemove", this.onMouseMoveHandler)
            } else {
                document.documentElement.attachEvent("onmousemove", this.onMouseMoveHandler)
            }
            clearInterval(this.checkMousePositonId_int);
            this.checkMousePositonId_int = setInterval(this.hideOrShowBasedOnMousePosition, 100)
        };
        this.hibernate = function () {
            if (e.addEventListener) {
                e.removeEventListener("mousemove", this.onMouseMoveHandler)
            } else {
                document.documentElement.detachEvent("onmousemove", this.onMouseMoveHandler)
            }
            clearInterval(this.checkMousePositonId_int);
            this.hideMainDo(true, true)
        };
        this.destroy = function () {
            clearTimeout(this.hideWithDelayId_to);
            clearTimeout(this.positionTextWithDelay_to);
            clearTimeout(this.clearTextId_to);
            clearInterval(this.checkMousePositonId_int);
            if (e.addEventListener) {
                e.removeEventListener("mousemove", s.onMouseMoveHandler)
            } else {
                document.documentElement.detachEvent("onmousemove", s.onMouseMoveHandler)
            }
            this.cleanTextChildren(0);
            TweenMax.killTweensOf(this);
            TweenMax.killTweensOf(this.main_do);
            this.main_do.destroy();
            this.mainBk_do.destroy();
            this.text_do.destroy();
            this.hit_do.destroy();
            this.currentThumb_do = null;
            this.main_do = null;
            this.mainBk_do = null;
            this.text_do = null;
            this.lastT_do = null;
            this.hit_do = null;
            s.setInnerHTML("");
            o.destroy();
            s = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.prototype = null;
    e.FWDThumbOverlay = t
})(window);
(function (e) {
    var t = function (n) {
        var r = this;
        var i = t.prototype;
        this.thumbsHolder_do;
        this.dataPaths_ar = n.playListData_ar;
        this.links_ar = n.links_ar;
        this.poolThumbs_ar = [];
        this.thumbs_ar = [];
        this.grid_ar = [];
        this.backgroundColor_str = n.backgroundColor_str;
        this.thumbnailBackgroundColor_str = n.thumbnailBackgroundColor_str;
        this.grabIconPath_str = n.grabIconPath_str;
        this.grabIconModernBrowsersPath_str = n.grabIconModernBrowsersPath_str;
        this.dragDirection_str = n.dragDirection_str;
        this.mouseWheelDirection_str = n.mouseWheelDirection_str;
        this.stageWidth;
        this.stageHeight;
        this.thumbnailMaxWidth = n.thumbnailMaxWidth;
        this.thumbnailMaxHeight = n.thumbnailMaxHeight;
        this.originalThumbWidth;
        this.originalThumbHeight;
        this.maxColumns = 10;
        this.row;
        this.col;
        this.nrImgH;
        this.nrImgV;
        this.posX;
        this.posY;
        this.newPosX;
        this.newPosY;
        this.curMaximizedRow;
        this.curMaximizedCol;
        this.colRef;
        this.colRow;
        this.lastColRef = 1e3;
        this.lastRowRef = 1e3;
        this.friction = .9;
        this.vx = 0;
        this.vy = 0;
        this.globalX = 0;
        this.globalY = 0;
        this.lastMouseX;
        this.lastMouseY;
        this.lastThumsbHolderX;
        this.lastThumsbHolderY;
        this.thumbWidth = 0;
        this.thumbHeight = 0;
        this.newThumbWidth = 0;
        this.newThumbHeight = 0;
        this.totalThumbs = this.dataPaths_ar.length;
        this.verticalSpacer = 1;
        this.horizontalSpacer = 1;
        this.curId = 0;
        this.maxThumbs = 180;
        this.prevWidth;
        this.resizeHandlerIntervalId_int;
        this.loopId_int;
        this.disableOpenLighboxId_to;
        this.initGridWhenStageIsAvailableId_to;
        this.isMobile_bl = FWDUtils.isMobile;
        this.isDragged_bl = false;
        this.isShowedAtLeastOneTime_bl = false;
        this.disableOpenLighbox_bl = false;
        this.addMouseWheelSupport_bl = n.addMouseWheelSupport_bl;
        this.init = function () {
            this.setResizableSizeAfterParent();
            this.setBkColor(this.backgroundColor_str);
            this.initComponentId_to = setTimeout(this.initializeComponent, 100)
        };
        this.initializeComponent = function () {
            r.setupThumbsHolder();
            r.setupPoolThumbs();
            r.startResizeHandler();
            r.setupDispatchHideHelpScreen();
            r.setupGlobalMousePosition();
            setTimeout(r.initilizeAndStartGrid, 150)
        };
        this.startResizeHandler = function () {
            this.stopResizeHandler();
            this.resizeHandlerIntervalId_int = setInterval(this.resizeHandler, 100)
        };
        this.stopResizeHandler = function () {
            clearInterval(this.resizeHandlerIntervalId_int)
        };
        this.resizeHandler = function (e) {
            var t = r.getWidth();
            var n = r.getHeight();
            if (r.stageWidth == t && r.stageHeight == n && !e) return;
            r.stageWidth = t;
            r.stageHeight = n
        };
        this.setupGlobalMousePosition = function () {
            if (this.isMobile_bl) return;
            if (e.addEventListener) {
                e.addEventListener("mousemove", this.setGlobalMousePositionOnMouseMoveHandler)
            } else {
                document.attachEvent("onmousemove", this.setGlobalMousePositionOnMouseMoveHandler)
            }
        };
        this.setGlobalMousePositionOnMouseMoveHandler = function (e) {
            var t = FWDUtils.getViewportMouseCoordinates(e);
            r.globalX = t.screenX;
            r.globalY = t.screenY
        };
        this.setupThumbsHolder = function () {
            this.thumbsHolder_do = new FWDDisplayObject("div");
            this.thumbsHolder_do.getStyle().overflow = "visible";
            this.addChild(this.thumbsHolder_do)
        };
        this.setupPoolThumbs = function () {
            var e;
            var t;
            var r;
            var i = this.dataPaths_ar.length;
            if (this.isMobile_bl) {
                this.maxThumbs = 100
            } else if (this.stageWidth < 1900) {
                this.maxThumbs = 200
            }
            for (var s = 0; s < this.maxThumbs; s++) {
                FWDThumb.setPrototype();
                e = new FWDThumb(this, this.thumbnailBackgroundColor_str, n.thumbnailOverlayOpacity, n.showThumbnailOverlay_bl, this.isMobile_bl, n.showThumbnailIcon_bl);
                e.setVisible(false);
                e.addListener(FWDThumb.MOUSE_OVER, this.onMouseOverHandler);
                e.addListener(FWDThumb.MOUSE_DONE, this.onMouseDoneHandler);
                this.poolThumbs_ar[s] = e;
                this.thumbsHolder_do.addChild(e)
            }
        };
        this.onMouseOverHandler = function (e) {
            if (r.isDragged_bl) return;
            var t = e.target;
            t.setSelectedState()
        };
        this.onMouseDoneHandler = function (e) {
            if (r.disableOpenLighbox_bl) return;
            e.target.setNormalState(false, 0);
            r.getCorrectId(e.target.id)
        };
        this.getCorrectId = function (n) {
            var i = n;
            var s = n;
            var o = this.dataPaths_ar[i].mediaType;
            if (o == "link") {
                for (var u = 0; u < this.totalThumbs; u++) {
                    if (u < n && this.dataPaths_ar[u].mediaType == "media") {
                        i -= 1
                    }
                }
            } else if (o == "media") {
                for (var u = 0; u < this.totalThumbs; u++) {
                    if (u < n && this.dataPaths_ar[u].mediaType == "link") {
                        i -= 1
                    }
                }
            }
            if (o == "link") {
                e.open(this.links_ar[i].url, this.links_ar[i].target)
            } else {
                r.dispatchEvent(t.MOUSE_DONE, {
                    id: i
                })
            }
        };
        this.getThumb = function () {
            var e;
            var t = false;
            var n = 0;
            while (!t) {
                e = this.poolThumbs_ar[n];
                if (!e) return;
                if (e.isAvailable_bl) {
                    e.setVisible(true);
                    e.isAvailable_bl = false;
                    t = true;
                    return e
                }
                n++
            }
        };
        this.addThumbBack = function (e) {
            TweenMax.killTweensOf(e);
            e.isAvailable_bl = true;
            e.setVisible(false)
        };
        this.startToLoop = function () {
            this.loopId_int = setInterval(this.animLoop, 16)
        };
        this.stopToLoop = function () {
            clearInterval(this.loopId_int)
        };
        this.animLoop = function () {
            r.scrollGrid();
            r.setColumnsLimit();
            r.drawGrid();
            r.removeThumbsIfNotOnScreen()
        };
        this.initilizeAndStartGrid = function () {
            if (r == null) return;
            if (isNaN(r.stageWidth)) {
                clearTimeout(r.initGridWhenStageIsAvailableId_to);
                r.initGridWhenStageIsAvailableId_to = setTimeout(function () {
                    r.initilizeAndStartGrid()
                }, 100);
                return
            }
            r.initGrid();
            if (r.isMobile_bl) {
                r.setupScrollingForMobile()
            } else {
                r.setupScrollingForPc();
                if (r.addMouseWheelSupport_bl) r.addMouseWheelSupport()
            }
            r.startToLoop()
        };
        this.initGrid = function () {
            var e;
            var n;
            var i;
            var s;
            var o;
            var u;
            var a;
            var f;
            var l;
            var c;
            var h;
            var p;
            var d = 0;
            var v;
            var m;
            e = this.stageWidth - this.horizontalSpacer;
            n = this.stageHeight - this.verticalSpacer;
            i = Math.floor(n / this.thumbnailMaxHeight);
            s = Math.floor(e / this.thumbnailMaxWidth);
            this.thumbHeight = Math.round(n / i - Math.floor(this.verticalSpacer / i));
            this.thumbWidth = Math.round(e / s - Math.floor(this.horizontalSpacer / s));
            if (this.thumbWidth > this.thumbnailMaxWidth) s++;
            if (this.thumbHeight > this.thumbnailMaxHeight) i++;
            this.thumbHeight = Math.round(n / i - Math.floor(this.verticalSpacer / i));
            if (s > this.maxColumns) {
                s = this.maxColumns;
                this.thumbWidth = Math.round(e / s - Math.floor(this.horizontalSpacer / s));
                this.thumbHeight = Math.round(this.thumbHeight * (this.thumbWidth / this.thumbnailMaxWidth))
            } else {
                this.thumbWidth = Math.round(e / s - Math.floor(this.horizontalSpacer / s))
            }
            this.prevWidth = this.originalThumbWidth = this.thumbWidth;
            this.originalThumbHeight = this.thumbHeight;
            this.posX = -(this.thumbWidth + this.horizontalSpacer) * t.GRID_SIZE / 2;
            this.posY = -(this.thumbHeight + this.verticalSpacer) * t.GRID_SIZE / 2 - 1;
            this.thumbsHolder_do.setX(this.posX);
            this.thumbsHolder_do.setY(this.posY);
            h = Math.ceil(e / (this.thumbWidth + this.horizontalSpacer));
            p = Math.ceil(n / (this.thumbHeight + this.verticalSpacer));
            for (l = 0; l < p; l++) {
                for (c = 0; c < h; c++) {
                    v = t.GRID_SIZE / 2 + l;
                    m = t.GRID_SIZE / 2 + c;
                    f = v * t.GRID_SIZE + m;
                    a = d % r.totalThumbs;
                    this.grid_ar[f] = a;
                    o = this.getThumb();
                    this.thumbs_ar[f] = o;
                    o.gridPosition = f;
                    o.id = a;
                    o.totalWidth = this.thumbWidth;
                    o.totalHeight = this.thumbHeight;
                    o.finalX = m * (this.thumbWidth + this.horizontalSpacer);
                    o.finalY = v * (this.thumbHeight + this.verticalSpacer);
                    o.setX(o.finalX);
                    o.setY(o.finalY);
                    o.isAvailable_bl = false;
                    o.resizeThumb();
                    o.showFirstTime();
                    o.setVisible(true);
                    o.iconPath_str = this.dataPaths_ar[a].thumbIconPath;
                    o.loadAndAddSmallImage(this.dataPaths_ar[a].thumbPath);
                    d++
                }
            }
        };
        this.setColumnsLimit = function () {
            var e;
            stageW = this.stageWidth - this.horizontalSpacer;
            stageH = this.stageHeight - this.verticalSpacer;
            if (stageW / this.maxColumns > this.originalThumbWidth + this.horizontalSpacer) {
                rowRef = Math.floor(this.posY / -(this.thumbHeight + this.verticalSpacer));
                colRef = Math.floor(this.posX / -(this.thumbWidth + this.horizontalSpacer));
                this.thumbWidth = Math.round(stageW / this.maxColumns - Math.floor(this.horizontalSpacer / this.maxColumns));
                this.thumbHeight = Math.round(this.originalThumbHeight * (this.thumbWidth / this.thumbnailMaxWidth));
                this.posX = -colRef * (this.thumbWidth + this.horizontalSpacer);
                this.posY = -rowRef * (this.thumbHeight + this.horizontalSpacer);
                this.originalThumbWidth = this.thumbWidth;
                this.thumbsHolder_do.setX(this.posX);
                this.thumbsHolder_do.setY(this.posY);
                nrImgH = Math.ceil(stageW / (this.thumbWidth + this.horizontalSpacer));
                nrImgV = Math.ceil(stageH / (this.thumbHeight + this.verticalSpacer));
                rowRef = Math.floor(this.posY / -(this.thumbHeight + this.verticalSpacer));
                colRef = Math.floor(this.posX / -(this.thumbWidth + this.horizontalSpacer));
                for (row = 0; row < nrImgV; row++) {
                    for (col = 0; col < nrImgH; col++) {
                        curMatrixRow = rowRef + row;
                        curMatrixCol = colRef + col;
                        curPositionInGrid = curMatrixRow * t.GRID_SIZE + curMatrixCol;
                        e = this.thumbs_ar[curPositionInGrid];
                        if (!e) return;
                        e.totalWidth = this.thumbWidth;
                        e.totalHeight = this.thumbHeight;
                        e.finalX = curMatrixCol * (this.thumbWidth + this.horizontalSpacer);
                        e.finalY = curMatrixRow * (this.thumbHeight + this.verticalSpacer);
                        e.setX(e.finalX);
                        e.setY(e.finalY);
                        e.isAvailable_bl = false;
                        e.resizeThumb();
                        e.resizeImage()
                    }
                }
            }
        };
        this.drawGrid = function () {
            var e;
            var n;
            var i;
            var s;
            var o;
            var u;
            var a;
            var f;
            var l;
            var c;
            var h;
            var p;
            var d;
            e = this.stageWidth - this.horizontalSpacer;
            n = this.stageHeight - this.verticalSpacer;
            c = Math.ceil(e / (this.thumbWidth + this.horizontalSpacer)) + 1;
            h = Math.ceil(n / (this.thumbHeight + this.verticalSpacer)) + 1;
            p = Math.floor(this.posY / -(this.thumbHeight + this.verticalSpacer));
            d = Math.floor(this.posX / -(this.thumbWidth + this.horizontalSpacer));
            for (u = 0; u < h; u++) {
                for (a = 0; a < c; a++) {
                    f = p + u;
                    l = d + a;
                    o = f * t.GRID_SIZE + l;
                    if (!this.thumbs_ar[o]) {
                        if (!this.grid_ar[o]) {
                            i = false;
                            while (!i) {
                                i = true;
                                s = Math.floor(Math.random() * this.totalThumbs);
                                if (r.grid_ar[(f - 1) * t.GRID_SIZE + l - 1] == s) {
                                    i = false
                                }
                                if (r.grid_ar[f * t.GRID_SIZE + l - 1] == s) {
                                    i = false
                                }
                                if (r.grid_ar[(f + 1) * t.GRID_SIZE + l - 1] == s) {
                                    i = false
                                }
                                if (r.grid_ar[(f - 1) * t.GRID_SIZE + l] == s) {
                                    i = false
                                }
                                if (r.grid_ar[(f + 1) * t.GRID_SIZE + l] == s) {
                                    i = false
                                }
                                if (r.grid_ar[(f - 1) * t.GRID_SIZE + l + 1] == s) {
                                    i = false
                                }
                                if (r.grid_ar[f * t.GRID_SIZE + l + 1] == s) {
                                    i = false
                                }
                                if (r.grid_ar[(f + 1) * t.GRID_SIZE + l + 1] == s) {
                                    i = false
                                }
                            }
                        } else {
                            s = this.grid_ar[o]
                        }
                        this.grid_ar[o] = s;
                        thumb = this.getThumb();
                        if (!thumb) return;
                        this.thumbs_ar[o] = thumb;
                        thumb.gridPosition = o;
                        thumb.id = s;
                        thumb.totalWidth = this.thumbWidth;
                        thumb.totalHeight = this.thumbHeight;
                        thumb.finalX = l * (this.thumbWidth + this.horizontalSpacer);
                        thumb.finalY = f * (this.thumbHeight + this.verticalSpacer);
                        thumb.setX(thumb.finalX);
                        thumb.setY(thumb.finalY);
                        thumb.isAvailable_bl = false;
                        thumb.resizeThumb();
                        thumb.setVisible(true);
                        thumb.iconPath_str = this.dataPaths_ar[s].thumbIconPath;
                        thumb.loadAndAddSmallImage(this.dataPaths_ar[thumb.id].thumbPath)
                    }
                }
            }
        };
        this.setupScrollingForMobile = function () {
            this.screen.addEventListener("touchstart", this.onTouchStart)
        };
        this.onTouchStart = function (t) {
            t.preventDefault();
            r.vx = 0;
            r.vy = 0;
            r.lastMouseX = t.touches[0].pageX - e.pageXOffset;
            r.lastMouseY = t.touches[0].pageY - e.pageYOffset;
            e.addEventListener("touchend", r.windowOnTouchEnd);
            e.addEventListener("touchmove", r.windowOnTouchMove)
        };
        this.windowOnTouchMove = function (t) {
            t.preventDefault();
            var n = t.touches[0].pageX - e.pageXOffset - r.lastMouseX;
            var i = t.touches[0].pageY - e.pageYOffset - r.lastMouseY;
            r.disableOpenLighbox_bl = true;
            if (r.dragDirection_str == "both") {
                r.posX += n;
                r.posY += i
            } else if (r.dragDirection_str == "horizontal") {
                r.posX += n
            } else if (r.dragDirection_str == "vertical") {
                r.posY += i
            }
            r.lastMouseX = t.touches[0].pageX - e.pageXOffset;
            r.lastMouseY = t.touches[0].pageY - e.pageYOffset;
            r.isDragged_bl = true
        };
        this.windowOnTouchEnd = function (t) {
            e.removeEventListener("touchend", r.windowOnTouchEnd);
            e.removeEventListener("touchmove", r.windowOnTouchMove);
            clearTimeout(r.disableOpenLighboxId_to);
            r.disableOpenLighboxId_to = setTimeout(function () {
                r.disableOpenLighbox_bl = false
            }, 100);
            r.isDragged_bl = false
        };
        this.setupScrollingForPc = function () {
            if (this.screen.addEventListener) {
                this.screen.addEventListener("mousedown", this.onMouseDown)
            } else {
                this.screen.attachEvent("onmousedown", this.onMouseDown)
            }
        };
        this.onMouseDown = function (t) {
            if (t.preventDefault) t.preventDefault();
            var n = FWDUtils.getViewportMouseCoordinates(t);
            r.screen.style.cursor = "url(" + r.grabIconPath_str + "), default";
            r.vx = 0;
            r.vy = 0;
            r.lastMouseX = n.screenX;
            r.lastMouseY = n.screenY;
            if (e.addEventListener) {
                setTimeout(function () {
                    if (r == null) return;
                    e.addEventListener("mouseup", r.windowOnMoveUp);
                    e.addEventListener("mousemove", r.windowOnMouseMove)
                }, 10)
            } else {
                setTimeout(function () {
                    if (r == null) return;
                    document.attachEvent("onmousemove", r.windowOnMouseMove);
                    document.attachEvent("onmouseup", r.windowOnMoveUp)
                }, 10)
            }
        };
        this.windowOnMouseMove = function (e) {
            var t = FWDUtils.getViewportMouseCoordinates(e);
            var n = t.screenX - r.lastMouseX;
            var i = t.screenY - r.lastMouseY;
            r.disableOpenLighbox_bl = true;
            if (r.dragDirection_str == "both") {
                r.posX += n;
                r.posY += i
            } else if (r.dragDirection_str == "horizontal") {
                r.posX += n
            } else if (r.dragDirection_str == "vertical") {
                r.posY += i
            }
            r.lastMouseX = t.screenX;
            r.lastMouseY = t.screenY;
            r.isDragged_bl = true
        };
        this.windowOnMoveUp = function () {
            r.screen.style.cursor = "default";
            if (r.screen.addEventListener) {
                e.removeEventListener("mouseup", r.windowOnMoveUp);
                e.removeEventListener("mousemove", r.windowOnMouseMove)
            } else {
                document.detachEvent("onmouseup", r.windowOnMoveUp);
                document.detachEvent("onmousemove", r.windowOnMouseMove)
            }
            clearTimeout(r.disableOpenLighboxId_to);
            r.disableOpenLighboxId_to = setTimeout(function () {
                r.disableOpenLighbox_bl = false
            }, 100);
            r.isDragged_bl = false
        };
        this.scrollGrid = function () {
            if (this.vx > 80) {
                this.vx = 80
            } else if (this.vx < -80) {
                this.vx = -80
            }
            if (this.vy > 80) {
                this.vy = 80
            } else if (this.vy < -80) {
                this.vy = -80
            }
            if (this.isDragged_bl) {
                this.vx = this.posX - this.lastThumsbHolderX;
                this.vy = this.posY - this.lastThumsbHolderY;
                this.lastThumsbHolderX = this.posX;
                this.lastThumsbHolderY = this.posY
            } else {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.posX += Math.round(this.vx);
                this.posY += Math.round(this.vy)
            } if (r.dragDirection_str == "both") {
                this.thumbsHolder_do.setX(this.posX);
                this.thumbsHolder_do.setY(this.posY)
            } else if (r.dragDirection_str == "horizontal") {
                this.thumbsHolder_do.setX(this.posX)
            } else if (r.dragDirection_str == "vertical") {
                this.thumbsHolder_do.setY(this.posY)
            }
        };
        this.addMouseWheelSupport = function () {
            if (e.addEventListener) {
                r.screen.addEventListener("mousewheel", r.mouseWheelHandler);
                r.screen.addEventListener("DOMMouseScroll", r.mouseWheelHandler)
            } else if (document.attachEvent) {
                r.screen.attachEvent("onmousewheel", r.mouseWheelHandler)
            }
        };
        r.mouseWheelHandler = function (e) {
            if (e.preventDefault) e.preventDefault();
            if (r.isDragged_bl) return;
            var n = e.detail || e.wheelDelta;
            if (e.wheelDelta) n *= -1;
            if (n > 0) {
                if (r.mouseWheelDirection_str == "horizontal") {
                    r.vx = -20
                } else {
                    r.vy = -20
                }
            } else if (n < 0) {
                if (r.mouseWheelDirection_str == "horizontal") {
                    r.vx = 20
                } else {
                    r.vy = 20
                }
            }
            r.dispatchEvent(t.HIDE_HELP_SCREEN);
            r.scrollGrid();
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                return false
            }
        };
        this.setupDispatchHideHelpScreen = function () {
            if (this.isMobile_bl) {
                this.screen.addEventListener("touchstart", this.onHideMouseDown)
            } else {
                if (this.screen.addEventListener) {
                    this.screen.addEventListener("mousedown", this.onHideMouseDown)
                } else {
                    this.screen.attachEvent("onmousedown", this.onHideMouseDown)
                }
            }
        };
        this.onHideMouseDown = function () {
            if (r.isMobile_bl) {
                setTimeout(function () {
                    if (r == null) return;
                    e.addEventListener("touchmove", r.windowOnHideMouseMove)
                }, 10)
            } else {
                if (e.addEventListener) {
                    setTimeout(function () {
                        if (r == null) return;
                        e.addEventListener("mousemove", r.windowOnHideMouseMove)
                    }, 10)
                } else {
                    setTimeout(function () {
                        if (r == null) return;
                        document.attachEvent("onmousemove", r.windowOnHideMouseMove)
                    }, 10)
                }
            }
        };
        this.windowOnHideMouseMove = function (n) {
            if (r.isMobile_bl) {
                e.removeEventListener("touchmove", r.windowOnHideMouseMove);
                r.screen.removeEventListener("touchstart", r.onHideMouseDown)
            } else {
                if (r.screen.addEventListener) {
                    r.screen.removeEventListener("mousedown", r.onHideMouseDown);
                    e.removeEventListener("mousemove", r.windowOnHideMouseMove)
                } else {
                    r.screen.detachEvent("onmousedown", r.onHideMouseDown);
                    document.detachEvent("onmousemove", r.windowOnHideMouseMove)
                }
            }
            r.dispatchEvent(t.HIDE_HELP_SCREEN)
        };
        this.removeThumbsIfNotOnScreen = function () {
            var e;
            var t;
            for (t = 0; t < this.maxThumbs; t++) {
                e = this.poolThumbs_ar[t];
                if (this.posX + e.finalX < -this.thumbWidth || this.posX + e.finalX > this.stageWidth || this.posY + e.finalY < -this.thumbHeight + 1 || this.posY + e.finalY > this.stageHeight) {
                    if (!e.isAvailable_bl) {
                        e.removeSmallImage();
                        this.addThumbBack(e);
                        this.thumbs_ar[e.gridPosition] = undefined
                    }
                }
            }
        };
        this.cleanMainEvents = function () {
            clearInterval(this.resizeHandlerIntervalId_int);
            clearInterval(this.loopId_int);
            clearTimeout(this.disableOpenLighboxId_to);
            clearTimeout(this.initGridWhenStageIsAvailableId_to);
            clearTimeout(this.initComponentId_to);
            if (this.isMobile_bl) {
                this.screen.removeEventListener("touchstart", this.onTouchStart);
                e.removeEventListener("touchend", this.windowOnTouchEnd);
                e.removeEventListener("touchmove", this.windowOnTouchMove);
                this.screen.removeEventListener("touchstart", this.onHideMouseDown);
                e.removeEventListener("touchmove", this.windowOnHideMouseMove)
            } else {
                if (this.screen.removeEventListener) {
                    this.screen.removeEventListener("mousewheel", r.mouseWheelHandler);
                    this.screen.removeEventListener("DOMMouseScroll", r.mouseWheelHandler);
                    this.screen.removeEventListener("mousedown", this.onMouseDown);
                    e.removeEventListener("mouseup", this.windowOnMoveUp);
                    e.removeEventListener("mousemove", this.windowOnMouseMove);
                    this.screen.removeEventListener("mousedown", this.onHideMouseDown);
                    e.removeEventListener("mousemove", this.windowOnHideMouseMove);
                    e.removeEventListener("mousemove", this.setGlobalMousePositionOnMouseMoveHandler)
                } else {
                    this.screen.detachEvent("onmousewheel", r.mouseWheelHandler);
                    this.screen.detachEvent("onmousedown", this.onMouseDown);
                    document.detachEvent("onmouseup", this.windowOnMoveUp);
                    document.detachEvent("onmousemove", this.windowOnMouseMove);
                    this.screen.detachEvent("onmousedown", this.onHideMouseDown);
                    document.detachEvent("onmousemove", this.windowOnHideMouseMove);
                    document.detachEvent("onmousemove", this.setGlobalMousePositionOnMouseMoveHandler)
                }
            }
        };
        this.destroy = function () {
            var e;
            this.cleanMainEvents();
            for (var s = 0; s < this.maxThumbs; s++) {
                e = this.poolThumbs_ar[s];
                if (e) e.destroy()
            }
            if (this.thumbsHolder_do) this.thumbsHolder_do.destroy();
            this.thumbsHolder_do = null;
            n = null;
            this.dataPaths_ar = null;
            this.links_ar = null;
            this.poolThumbs_ar = null;
            this.thumbs_ar = null;
            this.grid_ar = null;
            this.setInnerHTML("");
            i.destroy();
            r = null;
            t.prototype = null
        };
        this.init()
    };
    t.setPrototype = function () {
        t.prototype = new FWDDisplayObject("div")
    };
    t.GRID_SIZE = 2e3;
    t.MOUSE_DONE = "onMouseDown";
    t.HIDE_HELP_SCREEN = "onHideHelpScreen";
    t.prototype = null;
    e.FWDThumbsManager = t
})(window);
(function (e) {
    var t = function (e, n) {
        var r = this;
        var i = t.prototype;
        this.timeOutId;
        this.delay = e;
        this.isStopped_bl = !n;
        this.stop = function () {
            clearTimeout(this.timeOutId);
            this.dispatchEvent(t.STOP)
        };
        this.start = function () {
            if (!this.isStopped_bl) {
                this.timeOutId = setTimeout(this.onTimeHanlder, this.delay);
                this.dispatchEvent(t.START)
            }
        };
        this.onTimeHanlder = function () {
            r.dispatchEvent(t.TIME)
        };
        this.destroy = function () {
            clearTimeout(this.timeOutId);
            i.destroy();
            r = null;
            i = null;
            t.prototype = null
        }
    };
    t.setProtptype = function () {
        t.prototype = new FWDEventDispatcher
    };
    t.START = "start";
    t.STOP = "stop";
    t.TIME = "time";
    t.prototype = null;
    e.FWDTimerManager = t
})(window);
(function (e) {
    function n() {
        var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"];
        var n;
        var r;
        while (n = e.shift()) {
            if (typeof t.dumy.style[n] !== "undefined") {
                t.dumy.style.position = "absolute";
                r = t.dumy.getBoundingClientRect().left;
                t.dumy.style[n] = "translate3d(500px, 0px, 0px)";
                r = Math.abs(t.dumy.getBoundingClientRect().left - r);
                if (r > 100 && r < 900) {
                    try {
                        document.documentElement.removeChild(t.dumy)
                    } catch (i) {}
                    return true
                }
            }
        }
        try {
            document.documentElement.removeChild(t.dumy)
        } catch (i) {}
        return false
    }

    function r() {
        var e = ["transform", "msTransform", "WebkitTransform", "MozTransform", "OTransform", "KhtmlTransform"];
        var n;
        while (n = e.shift()) {
            if (typeof t.dumy.style[n] !== "undefined") {
                return true
            }
        }
        try {
            document.documentElement.removeChild(t.dumy)
        } catch (r) {}
        return false
    }
    var t = function () {};
    t.dumy = document.createElement("div");
    t.trim = function (e) {
        return e.replace(/\s/gi, "")
    };
    t.trimAndFormatUrl = function (e) {
        e = e.toLocaleLowerCase();
        e = e.replace(/ /g, "-");
        e = e.replace(/Ã¤/g, "a");
        e = e.replace(/Ã¢/g, "a");
        e = e.replace(/Ã¢/g, "a");
        e = e.replace(/Ã /g, "a");
        e = e.replace(/Ã¨/g, "e");
        e = e.replace(/Ã©/g, "e");
        e = e.replace(/Ã«/g, "e");
        e = e.replace(/Ã¯/g, "i");
        e = e.replace(/Ã®/g, "i");
        e = e.replace(/Ã¹/g, "u");
        e = e.replace(/Ã´/g, "o");
        e = e.replace(/Ã¹/g, "u");
        e = e.replace(/Ã»/g, "u");
        e = e.replace(/Ã¿/g, "y");
        e = e.replace(/Ã§/g, "c");
        e = e.replace(/Å“/g, "ce");
        return e
    };
    t.splitAndTrim = function (e) {
        var n = e.split(",");
        var r = n.length;
        for (var i = 0; i < r; i++) {
            n[i] = t.trim(n[i])
        }
        return n
    };
    t.indexOfArray = function (e, t) {
        var n = e.length;
        for (var r = 0; r < n; r++) {
            if (e[r] === t) return r
        }
        return -1
    };
    t.randomizeArray = function (e) {
        var t = [];
        var n = e.concat();
        var r = n.length;
        for (var i = 0; i < r; i++) {
            var s = Math.floor(Math.random() * n.length);
            t.push(n[s]);
            n.splice(s, 1)
        }
        return t
    };
    t.parent = function (e, t) {
        if (t === undefined) t = 1;
        while (t-- && e) e = e.parentNode;
        if (!e || e.nodeType !== 1) return null;
        return e
    };
    t.sibling = function (e, t) {
        while (e && t !== 0) {
            if (t > 0) {
                if (e.nextElementSibling) {
                    e = e.nextElementSibling
                } else {
                    for (var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
                }
                t--
            } else {
                if (e.previousElementSibling) {
                    e = e.previousElementSibling
                } else {
                    for (var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
                }
                t++
            }
        }
        return e
    };
    t.getChildAt = function (e, n) {
        var r = t.getChildren(e);
        if (n < 0) n += r.length;
        if (n < 0) return null;
        return r[n]
    };
    t.getChildById = function (e) {
        return document.getElementById(e) || undefined
    };
    t.getChildren = function (e, t) {
        var n = [];
        for (var r = e.firstChild; r != null; r = r.nextSibling) {
            if (t) {
                n.push(r)
            } else if (r.nodeType === 1) {
                n.push(r)
            }
        }
        return n
    };
    t.getChildrenFromAttribute = function (e, n, r) {
        var i = [];
        for (var s = e.firstChild; s != null; s = s.nextSibling) {
            if (r && t.hasAttribute(s, n)) {
                i.push(s)
            } else if (s.nodeType === 1 && t.hasAttribute(s, n)) {
                i.push(s)
            }
        }
        return i.length == 0 ? undefined : i
    };
    t.getChildFromAttribute = function (e, n, r) {
        for (var i = e.firstChild; i != null; i = i.nextSibling) {
            if (r && t.hasAttribute(i, n)) {
                return i
            } else if (i.nodeType === 1 && t.hasAttribute(i, n)) {
                return i
            }
        }
        return undefined
    };
    t.getAttributeValue = function (e, n) {
        if (!t.hasAttribute(e, n)) return undefined;
        return e.getAttribute(n)
    };
    t.hasAttribute = function (e, t) {
        if (e.hasAttribute) {
            return e.hasAttribute(t)
        } else {
            var n = e.attributes[t];
            return n ? true : false
        }
    };
    t.insertNodeAt = function (e, n, r) {
        var i = t.children(e);
        if (r < 0 || r > i.length) {
            throw new Error("invalid index!")
        } else {
            e.insertBefore(n, i[r])
        }
    };
    t.hasCanvas = function () {
        return Boolean(document.createElement("canvas"))
    };
    t.hitTest = function (e, t, n) {
        var r = false;
        if (!e) throw Error("Hit test target is null!");
        var i = e.getBoundingClientRect();
        if (t >= i.left && t <= i.left + (i.right - i.left) && n >= i.top && n <= i.top + (i.bottom - i.top)) return true;
        return false
    };
    t.getScrollOffsets = function () {
        if (e.pageXOffset != null) return {
            x: e.pageXOffset,
            y: e.pageYOffset
        };
        if (document.compatMode == "CSS1Compat") {
            return {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            }
        }
    };
    t.getViewportSize = function () {
        if (t.isMobile) return {
            w: e.innerWidth,
            h: e.innerHeight
        };
        return {
            w: document.documentElement.clientWidth || e.innerWidth,
            h: document.documentElement.clientHeight || e.innerHeight
        }
    };
    t.getViewportMouseCoordinates = function (e) {
        var n = t.getScrollOffsets();
        if (e.touches) {
            return {
                screenX: e.touches[0].pageX - n.x,
                screenY: e.touches[0].pageY - n.y
            }
        }
        return {
            screenX: e.clientX == undefined ? e.pageX - n.x : e.clientX,
            screenY: e.clientY == undefined ? e.pageY - n.y : e.clientY
        }
    };
    t.isMobile = function () {
        var e = ["android", "webos", "iphone", "ipad", "blackberry"];
        for (i in e) {
            if (navigator.userAgent.toLowerCase().indexOf(e[i].toLowerCase()) != -1) {
                return true
            }
        }
        return false
    }();
    t.isAndroid = function () {
        return navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1
    }();
    t.isChrome = function () {
        return navigator.userAgent.toLowerCase().indexOf("chrome") != -1
    }();
    t.isSafari = function () {
        return navigator.userAgent.toLowerCase().indexOf("safari") != -1 && navigator.userAgent.toLowerCase().indexOf("chrome") == -1
    }();
    t.isFirefox = function () {
        return navigator.userAgent.toLowerCase().indexOf("firefox") != -1
    }();
    t.isIE = function () {
        return navigator.userAgent.toLowerCase().indexOf("msie") != -1;
    }();
    t.isApple = function () {
        return navigator.appVersion.toLowerCase().indexOf("mac") != -1;
    }();
    t.hasFullScreen = function () {
        return t.dumy.requestFullScreen || t.dumy.mozRequestFullScreen || t.dumy.webkitRequestFullScreen || t.dumy.msieRequestFullScreen
    }();
    t.hasTouch = function () {
        var t = false;
        if ("ontouchstart" in e || e.DocumentTouch && document instanceof DocumentTouch) t = true;
        return t
    }();
    t.onReady = function (e) {
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", function () {
                document.documentElement.appendChild(t.dumy);
                t.hasTransform3d = n();
                t.hasTransform2d = r();
                e()
            })
        } else {
            document.onreadystatechange = function () {
                document.documentElement.appendChild(t.dumy);
                t.hasTransform3d = n();
                t.hasTransform2d = r();
                if (document.readyState == "complete") e()
            }
        }
    };
    t.disableElementSelection = function (e) {
        try {
            e.style.userSelect = "none"
        } catch (e) {}
        try {
            e.style.MozUserSelect = "none"
        } catch (e) {}
        try {
            e.style.webkitUserSelect = "none"
        } catch (e) {}
        try {
            e.style.khtmlUserSelect = "none"
        } catch (e) {}
        try {
            e.style.oUserSelect = "none"
        } catch (e) {}
        try {
            e.style.msUserSelect = "none"
        } catch (e) {}
        try {
            e.msUserSelect = "none"
        } catch (e) {}
        e.onselectstart = function () {
            return false
        }
    };
    t.getUrlArgs = function (t) {
        var n = {};
        var r = t.substr(t.indexOf("?") + 1) || location.search.substring(1);
        var i = r.split("&");
        for (var s = 0; s < i.length; s++) {
            var o = i[s].indexOf("=");
            var u = i[s].substring(0, o);
            var a = i[s].substring(o + 1);
            a = decodeURIComponent(a);
            n[u] = a
        }
        return n
    };
    t.validateEmail = function (e) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
            return true
        }
        return false
    };
    t.resizeDoWithLimit = function (e, t, n, r, i, s, o, u, a, f, l, c, h) {
        var t = t - s;
        var n = n - o;
        var p = t / r;
        var d = n / i;
        var v = 0;
        if (p <= d) {
            v = p
        } else if (p >= d) {
            v = d
        }
        var m = Math.round(r * v);
        var g = Math.round(i * v);
        var y = Math.floor((t - r * v) / 2 + u);
        var b = Math.floor((n - i * v) / 2 + a);
        if (f) {
            TweenMax.to(e, l, {
                x: y,
                y: b,
                w: m,
                h: g,
                delay: c,
                ease: h
            })
        } else {
            e.x = y;
            e.y = b;
            e.w = m;
            e.h = g
        }
    };
    e.FWDUtils = t
})(window)