/// <reference path="jquery-1.4.4.js" />
/**
*base
**/
(function ($, window) {
  if (window._benSetupCore) return;
  window._benSetupCore = true;
  var _ben = {
    extend: function () {
      $.extend.apply(this, arguments);
    }
  };

  var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\bbase\b/ : /.*/;
  // The base Class implementation (does nothing)
  var Class = function () { };

  // Create a new Class that inherits from this class
  Class.extend = function (ns, prop) {
    if (arguments.length == 2) {
      var firstLetter = ns.split('')[0];
      if (firstLetter.toUpperCase() != firstLetter) {
        throw new Error("Class must begin with Uppercase letters:" + ns);
      }
      _ben[ns] = this.extend(prop);
      return;
    }
    var base = this.prototype, prop = arguments[0];
    initializing = true;
    var prototype = new this();
    initializing = false;
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof base[name] == "function" && fnTest.test(prop[name]) ?
        (function (name, fn) {
          return function () {
            var tmp = this.base;

            // Add a new .base() method that is the same method
            // but on the super-class
            this.base = base[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this.base = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    function _Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init)
        this.init.apply(this, arguments);
    }

    _Class.prototype = prototype;

    _Class.prototype.constructor = _Class;

    _Class.extend = arguments.callee;

    return _Class;
  };
  _ben.Class = Class;
  window.ue = _ben;
})(jQuery, this);

/**
*ui
**/
(function ($, _ben) {
  var toString = Object.prototype.toString;
  $.fn.findUI = function (uiAttr, attrValue) {
    var selector = '[data-ui-' + uiAttr;
    if (attrValue) {
      selector += '="' + attrValue + '"';
    }
    selector += ']';
    return this.find(selector);
  };
  $.findUI = function (uiAttr, attrValue) {
    var selector = '[data-ui-' + uiAttr;
    if (attrValue) {
      selector += '="' + attrValue + '"';
    }
    selector += ']';
    return $(selector);
  };
  $.fn.findMark = function (markName) {
    var selector = '[data-ui-mark="' + markName + '"]';
    return this.find(selector);
  };
  $.fn.uiData = function (attr) {
    return this.attr('data-ui-' + attr);
  };
  var _staticTypeString = {
    obj: '[object Object]'
  };

  _ben.extend({
    processAll: function (rootElement) {
      var els = $(rootElement)
        .find('[data-ui-control]')
        .each(function () {
          var me = $(this), control = me.attr('data-ui-control');
          if (control && _ben[control]) {
            _ben.controlInstance[control] = _ben.controlInstance[control] || [];
            _ben.controlInstance[control].push(new _ben[control](this));
          }
        });
    },
    controlInstance: {}
  });
  _ben.Class.extend('UI', {
    initMark: function () {
      var me = this;
      this.mark = {};
      if (this.box) {
        this.box.findUI('mark')
          .each(function () {
            me.mark[$(this).uiData('mark')] = $(this);
          });
      }
    },
    init: function () {
      var el, options = el_options = {};
      if (!arguments[1]) {
        var argType = $.isPlainObject(arguments[0]);
        if (argType) {
          options = arguments[0];
        }
        else {
          el = arguments[0];
        }
      }
      else {
        el = arguments[0];
        options = arguments[1];
      }
      if (el) {
        this.box = $(el);
        el_options = this.box.attr('data-ui-option');
        el_options = $.parseJSON(el_options);
      }
      this.opt = $.extend({}, options, el_options);
    }
  });

  //提供html5 data-xxx式的描述式调用接口,此类ui控件参数顺序为,html元素上的描述 > 手动调用的配置 > 默认配置
  $(function () {
    _ben.processAll($(document.body));
  });
})(jQuery, ue);


/**
*slideshow
**/
(function ($, _ben) {
  //提供jquery调用接口
  $.fn.farmerSlide = function (options) {
    this.each(function (i, n) {
      new _ben.Slide(n, options)
    });
  };
  var isIE = !!window.ActiveXObject;
  var isIE6 = isIE && !window.XMLHttpRequest;
  _ben.UI.extend('Slide', {
    //初始化一些参数
    init: function (el, options) {
      this.base(el, options);
      this.opt = $.extend({}, _ben.Slide.defaultOptions, this.opt);
      this.currentIndex = 0;
      this.isAnimating = false;
      //页面中没有模版,则使用js里配置的模版
      if (!this.box.findMark('imageContainer')[0]) {
        this.box.append(this.opt.template);
      }
      this.opt.boxWidth = parseFloat(this.box.css('width'));
      this.opt.boxHeight = parseFloat(this.box.css('height'));
      this.initMark();
      this.setup();
    },
    //安装各部件
    setup: function () {
      var me = this;
      me.mark.imageContainer.width(me.opt.boxWidth).height(me.opt.boxHeight);
      me.mark.data && me.mark.data.hide();
      me.loadData();
      me.initThumbs();
      me.start();
      //先加载第一张图片，完毕后再预加载剩下的所有图片
      $(new Image()).load(function () {
        me.data[0].loaded = true;
        //me.preDownLoadImage.call(me);
      }).attr('src', me.data[0].img);
    },
    //加载幻灯片数据(不包括图片内容本身),目前只有从html标签中获取,在配置项里配置两种方式
    loadData: function () {
      var me = this;
      me.data = [];
      if (me.mark.data) {
        me.mark.data.find('li').each(function () {
          var dataEl = $(this), _data = {}, imgEl = dataEl.findUI('data', 'img'),
            imgElAniType = imgEl.uiData('slide-animate'), thumbImg = dataEl.findUI('data', 'thumb');
          thumbImg = thumbImg || imgEl;
          _data.img = imgEl.attr('data-src');
          _data.thumbImg = thumbImg.attr('data-src');
          if (me.opt.onLoadDataing) {
            _data = me.opt.onEachDataLoading.call(me, dataEl, _data);
          }
          me.data.push(_data);
        });
      }
      else if (me.opt.data) {
        me.data = me.opt.data;
      }
      if (me.randomShow) {
        me.data.sort(function (a, b) { return Math.random() - 0.5; });
      }
      me.total = me.data.length;
    },
    preDownLoadImage: function () {
      var me = this, img = new Image(), index = 0;
      $.each(me.data, function (i, n) {
        $(img).load(function () {
          me.data[i].loaded = true;
        }).attr('src', this.img);
      });
    },
    pushData: function () {
    },
    //图片下载完毕后,开始运行各部件
    start: function () {
      var me = this;
      me.setCurrentImage();
      me.mark.tool && me.mark.tool.fadeIn(500);
      me.bindAction();
      me.autoToggle();
    },
    //根据参数设置当前图片,没有参数则使用当前配置的图片
    setCurrentImage: function (index, fn) {
      var me = this;
      index = index === undefined ? me.currentIndex : index;
      me.currentIndex = index;
      var _data = me.data[index];
      if (_data.loaded) {
        me.mark.loading.hide();
        me.mark.img.attr('src', _data.img);
        me.onPageLoaded(index);
        fn && fn();
      }
      else {
        me.mark.loading.show();
        $(new Image()).load(function () {
          me.mark.loading.hide();
          _data.loaded = true;
          me.mark.img.attr('src', _data.img);
          me.onPageLoaded(index);
          fn && fn();
        }).attr('src', _data.img);
      }
    },
    autoToggle: function () {
      var me = this;
      if (!me.opt.autoPlay) return;
      me.thumbDirect = 'right';
      me.clearTimer();
      me.timer = setTimeout(function () {
        me.isAuto = true;
        me.nextPage();
      }, me.opt.interval);
    },
    //初始化缩略条
    initThumbs: function () {
      var me = this;
      var thumbs = '';
      $.each(me.data, function (i, _data) {
        thumbs += me.getThumbItem(i);
      });
      me.mark.thumbs.empty();
      me.mark.thumbs.append(thumbs);
      var thumbItems = me.mark.thumbs.find('.focus-thumb-item');
      me.thumbItemWidth = thumbItems.outerWidth(true);
      //可见预览框数量
      me.totalVisableThumb = Math.ceil(me.mark.thumbsbox.innerWidth() / me.thumbItemWidth);
      me.noRepeat = me.totalVisableThumb >= me.total;
      if (!me.noRepeat) {
        me.mark.thumbsClone = me.mark.thumbs.clone();
        me.mark.thumbs.after(me.mark.thumbsClone);
      }
      //创建预览相框
      me.getThumbGrid();
    },
    getThumbGrid: function () {
      var me = this;
      me.mark.thumbGrid = $('<div class="focus-thumb-grid"></div>');
      me.mark.thumbsbox.append(me.mark.thumbGrid);
    },
    getThumbItem: function (index) {
      var me = this, _data = me.data[index];
      var thumb = '<p class="focus-thumb-item" data-ui-thumb-item><a href="javascript://"><img data-ui-rel="' + index + '" src="' + _data.thumbImg + '"/></a></p>';
      return thumb;
    },
    onThumbAniFinish: function (index) {
      var me = this;
      var currentThumb = me.mark.thumbs.find('.focus-thumb-item:eq(' + index + ')');
      currentThumb.addClass('current');
      if (!me.noRepeat) {
        currentThumb = me.mark.thumbsClone.find('.focus-thumb-item:eq(' + index + ')');
        currentThumb.addClass('current');
      }
      me.autoToggle();
      me.isAnimating = false;
    },
    setCurrentThumb: function (index) {
      this.isAnimating = true;
      var me = this, index = parseInt(index);
      var currentMarginLeft = parseInt(me.mark.thumbs.css('marginLeft')),
        targetMarginLeft = -index * me.thumbItemWidth;
      var leftIndex = Math.abs(currentMarginLeft / me.thumbItemWidth);
      if (!me.isAuto) {
        for (var i = 0; i < me.totalVisableThumb; i++) {
          var visibleThumbIndex = (leftIndex * 1 + i) % (me.total);
          if (index === visibleThumbIndex) {
            var gridLeft = parseInt(me.mark.thumbGrid.css('left'));
            var targetGridLeft = i * me.thumbItemWidth;
            if (gridLeft != targetGridLeft) {
              me.mark.thumbGrid.animate({ 'left': targetGridLeft }, me.opt.thumbAniInterval, '');
            }
            me.box.find('.focus-thumb-item').removeClass('current');
            me.onThumbAniFinish.call(me, index);
            return
          }
        }
      }
      if (currentMarginLeft != targetMarginLeft) {
        if (me.thumbDirect == 'right') {
          //如果第一预览条已滚动出视野,则重置
          var maxMarginLeft = -me.total * me.thumbItemWidth;
          if (currentMarginLeft == maxMarginLeft) {
            me.mark.thumbs.css('margin-left', 0);
            currentMarginLeft = targetMarginLeft = 0;
          }
          targetMarginLeft = currentMarginLeft - me.thumbItemWidth;
        }
        else if (me.thumbDirect == 'left') {
          if (index === me.total - 1) {
            currentMarginLeft = -me.total * me.thumbItemWidth
            me.mark.thumbs.css('margin-left', currentMarginLeft);
          }
          targetMarginLeft = currentMarginLeft + me.thumbItemWidth;
        }
        me.box.find('.focus-thumb-item').removeClass('current');
        me.mark.thumbs.animate({ 'margin-left': targetMarginLeft }, me.thumbAniInterval, '', function () {
          me.onThumbAniFinish.call(me, index);
        });
      }
      else {
        me.onThumbAniFinish(index);
      }
    },
    onPageLoaded: function (index) {
      this.setCurrentThumb(index);
    },
    //跳转到指定页面,会根据配置播放动画
    goToPage: function (index) {
      var me = this;
      if (index >= 0 && !me.isAnimating && index < me.total) {
        var _data = me.data[me.currentIndex], _aniType = _data.aniType || me.opt.defaultAni;
        if (me.opt.fuckIe6 && isIE6) _aniType = '';
        var oldIndex = me.currentIndex;
        me.setCurrentImage(index, function () {
          if (me.animateLists[_aniType]) {
            me.box.find('.ben-slide-clonebox').remove();
            me.animateLists[_aniType].call(me, oldIndex, index);
          }
        });
      }
    },
    //跳转到下一页
    nextPage: function () {
      var me = this, index = me.currentIndex * 1 + 1;
      if (index >= me.total) index = 0;
      me.goToPage(index);
    },
    //跳转到上一页
    prevPage: function () {
      var me = this, index = me.currentIndex - 1;
      if (index < 0) index = me.total - 1;
      me.goToPage(index);
    },
    getBoxClone: function (index) {
      var _data = this.data[index];
      var box_clone = $('<div class="ben-slide-clonebox"><a href="' + _data.link + '" target="_blank"><img src="' + _data.img + '" /></a></div>');
      return box_clone;
    },
    appendBoxClone: function (boxClone) {
      this.mark.imageContainer.append(boxClone);
    },
    onAnimateBegin: function (oldIndex, nextIndex) {
      var me = this;
      me.clearTimer();
      //me.isAnimating = true;
    },
    onAnimateFinish: function (oldIndex, nextIndex) {
      var me = this;
      //me.isAnimating = false;
      //me.timer = setTimeout(function () {
      me.box.find('.ben-slide-clonebox').remove();
      me.autoToggle();
      //}, time);
    },
    clearTimer: function () {
      clearTimeout(this.timer);
      clearTimeout(this.thumbTimer);
    },
    //给html元素绑定幻灯片操作
    bindAction: function () {
      var me = this;
      if (me.mark.next) {
        me.mark.next.click(function () {
          me.isAuto = false;
          me.thumbDirect = 'right';
          me.nextPage();
        });
      }
      if (me.mark.prev) {
        me.mark.prev.click(function () {
          me.isAuto = false;
          me.thumbDirect = 'left';
          me.prevPage();
        });
      }
      if (me.mark.thumbs) {
        me.mark.thumbsbox.click(function (e) {
          var index = $(e.target).uiData('rel');
          if (index !== undefined && index !== null) {
            me.thumbDirect = 'right';
            me.isAuto = false;
            me.goToPage(index);
          }
        });
      }
    },
    //动画列表,要扩展可继承并重载此列表
    animateLists: {
      random: function (oldIndex, nextIndex) {
        var aniArr = ['slideRight', 'lineRight', 'lineTop', 'lineLeft', 'lineBottom', 'line'];
        var index = Math.floor(Math.random() * 6);
        this.animateLists[aniArr[index]].call(this, oldIndex, nextIndex);
      },
      slideRight: function (oldIndex, nextIndex) {
        this.animateLists.line.call(this, oldIndex, nextIndex, { direction: 'right', total: 1 });
      },
      lineRight: function (oldIndex, nextIndex) {
        this.animateLists.line.call(this, oldIndex, nextIndex, { direction: 'right', total: 1 });
      },
      lineTop: function (oldIndex, nextIndex) {
        this.animateLists.line.call(this, oldIndex, nextIndex, { direction: 'top', total: 8 });
      },
      lineLeft: function (oldIndex, nextIndex) {
        this.animateLists.line.call(this, oldIndex, nextIndex, { direction: 'left', total: 8 });
      },
      lineBottom: function (oldIndex, nextIndex) {
        this.animateLists.line.call(this, oldIndex, nextIndex, { direction: 'bottom', total: 8 });
      },
      line: function (oldIndex, nextIndex, options) {
        var me = this, width = me.opt.boxWidth, height = me.opt.boxHeight,
        currentImg = me.data[oldIndex].img,
        nextImg = me.data[nextIndex].img;
        me.onAnimateBegin(oldIndex, nextIndex);
        var options = $.extend({}, { direction: 'top', delayType: 'quence', total: 5 }, options || {});
        var easing = this.opt.easing ? this.opt.easing : '';
        var time = 1200 / me.opt.animateSpeed;
        var total = options.total;
        for (i = 0; i < total; i++) {
          switch (options.direction) {
            case 'right':

              var cloneWidth = width;
              var cloneHeight = Math.ceil(height / total);

              var _itopc = (cloneHeight * i);
              var _ileftc = 0;
              var _ftopc = _itopc;
              var _fleftc = cloneWidth;

              var _itopn = _itopc;
              var _ileftn = -_fleftc;
              var _ftopn = _itopc;
              var _fleftn = 0;

              var _vtop_image = -_itopc;
              var _vleft_image = 0;
              break;
            case 'top':
              var cloneWidth = Math.ceil(this.opt.boxWidth / total);
              var cloneHeight = this.opt.boxHeight;

              var _itopc = 0;
              var _ileftc = (cloneWidth * i);
              var _ftopc = -cloneHeight;
              var _fleftc = _ileftc;

              var _itopn = cloneHeight;
              var _ileftn = _ileftc;
              var _ftopn = 0;
              var _fleftn = _ileftc;

              var _vtop_image = 0;
              var _vleft_image = -_ileftc;
              break;
            case 'left':
              var cloneWidth = this.opt.boxWidth;
              var cloneHeight = Math.ceil(this.opt.boxHeight / total);

              var _itopc = (cloneHeight * i);
              var _ileftc = 0;
              var _ftopc = _itopc;
              var _fleftc = -cloneWidth;

              var _itopn = _itopc;
              var _ileftn = -_fleftc;
              var _ftopn = _itopc;
              var _fleftn = 0;

              var _vtop_image = -_itopc;
              var _vleft_image = 0;
              break;
            case 'bottom':
              var cloneWidth = Math.ceil(this.opt.boxWidth / total);
              var cloneHeight = this.opt.boxHeight;

              var _itopc = 0;
              var _ileftc = (cloneWidth * i);
              var _ftopc = cloneHeight;
              var _fleftc = _ileftc;

              var _itopn = -cloneHeight;
              var _ileftn = _ileftc;
              var _ftopn = 0;
              var _fleftn = _ileftc;

              var _vtop_image = 0;
              var _vleft_image = -_ileftc;
              break;
          }

          switch (options.delayType) {
            case 'zebra': default: var delay_time = (i % 2 == 0) ? 0 : 150; break;
            case 'random': var delay_time = 30 * (Math.random() * 30); break;
            case 'quence': var delay_time = i * 100; break;
          }

          var boxClone = me.getBoxClone(oldIndex);
          boxClone.find('img').css({ left: _vleft_image, top: _vtop_image });
          boxClone.css({ top: _itopc, left: _ileftc, width: cloneWidth, height: cloneHeight });
          me.appendBoxClone(boxClone);
          boxClone.show();
          boxClone.delay(delay_time).animate({ top: _ftopc, left: _fleftc }, time, easing);

          var boxNextClone = me.getBoxClone(nextIndex);
          boxNextClone.find('img').css({ left: _vleft_image, top: _vtop_image });
          boxNextClone.css({ top: _itopn, left: _ileftn, width: cloneWidth, height: cloneHeight });
          me.appendBoxClone(boxNextClone);
          boxNextClone.show();
          var callback = (i == (total - 1)) ? function () {
            me.onAnimateFinish(oldIndex, nextIndex);
          } : '';
          boxNextClone.delay(delay_time).animate({ top: _ftopn, left: _fleftn }, time, easing, callback);
        }
      },
      fadeIn: function (oldIndex, nextIndex) {
        var me = this, width = me.opt.boxWidth, height = me.opt.boxHeight,
          currentImg = me.data[oldIndex].img,
          nextImg = me.data[nextIndex].img;
        me.onAnimateBegin(oldIndex, nextIndex);
        var boxClone = me.getBoxClone(oldIndex);
        boxClone.css({ top: 0, left: 0, width: width, height: height });
        me.appendBoxClone(boxClone);
        boxClone.show();
        boxClone.fadeOut(1000, function () {
          me.onAnimateFinish(oldIndex, nextIndex);
        });
      }
    }
  });

  //默认配置
  _ben.Slide.defaultOptions = {
    data: null,
    //ie6下是否禁用过渡效果
    fuckIe6: false,
    onEachDataLoading: null,
    label: true,
    randomShow: false,
    preDownloadImages: true,
    autoPlay: false,
    animateSpeed: 1.5,
    defaultAni: 'fadeIn',
    thumbAniInterval: 200,
    interval: 2500,
    template: ' <a href="#yongmaoie6" data-ui-mark="prev"><span>上一张</span></a>'
              + '<a href="#yongmaoie6" data-ui-mark="next"><span>下一张</span></a>'
              + '<span class="page" data-ui-mark="pageTool"></span>'
              + '<div class="village_container" data-ui-mark="imageContainer">'
                  + '<div class="image">'
                      + '<a href="#yongnimeiie6"><img src="" alt="" class="image_main" data-ui-mark="img" data-ui-bind=""/></a>'
                      + '<div class="village_label" data-ui-mark="desc"></div>'
                  + '</div>'
              + '</div>'
  };
})(jQuery, ue);

