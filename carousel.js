/**
 * Created by wangliang on 16-11-29.
 */
!function ($) {
    $.fn.carousel = function (options) {
        var defaults = {
            type: "normal",
            width: "100%",
            speed: 600,
            autoplay: 3000,
            pause: "hover",
            arrow: "hover"
        };

        var opts = $.extend({}, defaults, options);

        var $this = $(this),
            $items = $this.find(".carousel-inner .item"),
            $inner = $this.find(".carousel-inner"),
            pageW = $("body").width(),
            w = opts.width ? opts.width.indexOf("%") > -1 ? parseInt(opts.width) / 100 * pageW : opts.width : pageW,
            timer, index = 0,
            size = opts.type === "normal" ? $items.length + 1 : $items.length,
            $pagination = $this.find(".carousel-pagination li"),
            moving = false; //防止连续点击左右造成的BUG

        var init = function () {
            if (opts.type === "normal") {
                //克隆第一张图片
                var clone = $items.first().clone();
                $inner.append(clone);
                $items = $this.find(".carousel-inner .item");
            }

            setSize();
            addEvenListener();
            opts.autoplay ? autoPlay() : clearInterval(timer);
        };

        //设置轮播的高度宽度
        var setSize = function () {

            $this.find(".carousel-box").css({
                width: w + "px"
            });

            $items.css({
                width: w + "px"
            });

            if (opts.type === "normal") {
                $inner.css({
                    width: w * $items.length + "px"
                });
            } else if (opts.type === "opacity") {
                $inner.css({
                    width: w + "px",
                    height: $items.eq(0).height() + "px"
                });
                $items.css({
                    position: "absolute",
                    top: 0,
                    left: 0
                });
                $items.eq(0).css({
                    "z-index": 1
                })
            }
        };

        var autoPlay = function () {
            timer && clearInterval(timer);
            timer = setInterval(function () {
                controlClick("right")
            }, opts.autoplay);
        };

        var controlClick = function (type) {
            if (moving) {
                return
            }

            if (type === "left") {
                index--;
            } else {
                index++;
            }

            moving = true;
            move()
        };

        var move = function () {
            if (opts.type === "normal") {
                normalMove()
            } else if (opts.type === "opacity") {
                opacityMove();
            }

            //防止连续点击左右造成的BUG
            setTimeout(function () {
                moving = false;
            }, opts.speed);

            $pagination.removeClass("active");
            if (index == $pagination.length) {
                $pagination.eq(0).addClass("active");
            } else {
                $pagination.eq(index).addClass("active");
            }
        };

        var normalMove = function () {
            if (index === size) {
                index = 1;
                $inner.css({
                    transform: "translate3d(0,0,0)"
                })
            }

            if (index < 0) {
                index = size - 2;
                $inner.css({
                    transform: "translate3d(" + -(size - 1) * w + "px,0,0)"
                })
            }

            $inner.animate({
                transform: "translate3d(" + (-index * w) + "px,0,0)"
            }, opts.speed);
        };

        var opacityMove = function () {
            if (index === size) {
                index = 0
            }

            if (index < 0) {
                index = size - 1
            }

            $items.not($items.eq(index)).animate({
                opacity: 0
            });
            $items.eq(index).animate({
                opacity: 1
            }, opts.speed)
        };

        //添加事件
        var addEvenListener = function () {
            var $pageControl = $this.find(".carousel-control");

            //左右箭头点击
            $pageControl.find(".left").on("click", function () {
                controlClick("left")
            });
            $pageControl.find(".right").on("click", function () {
                controlClick("right")
            });

            //分页点击
            $pagination.on("click", function () {
                index = parseInt($(this).attr("data-slide-to"));
                opts.autoplay ? autoPlay() : clearInterval(timer);
                move()
            });

            //hover是否暂停轮播
            if (opts.pause === "hover") {
                $this.on("mouseover", function () {
                    clearInterval(timer)
                });
                $this.on("mouseout", function () {
                    opts.autoplay ? autoPlay() : clearInterval(timer);
                })
            }

            //hover显示箭头
            if (opts.arrow === "hover") {
                $pageControl.find("div").hide();
                $this.on("mouseover", function () {
                    $pageControl.find("div").show();
                });
                $this.on("mouseout", function () {
                    $pageControl.find("div").hide();
                })
            }

            //改变窗口
            $(window).on("resize", function () {
                pageW = $("body").width();
                w = opts.width ? opts.width.indexOf("%") > -1 ? parseInt(opts.width) / 100 * pageW : opts.width : pageW;

                setSize();
                if (opts.type === "normal") {
                    //解决缩放时已经轮播的元素会错位的BUG
                    $inner.css({
                        transform: "translate3d(" + (-index * w) + "px,0,0)"
                    });
                }
            })
        };

        init()
    }
}(Zepto);
