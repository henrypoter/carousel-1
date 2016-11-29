/**
 * Created by wangliang on 16-11-29.
 */
!function ($) {
    $.fn.carousel = function (options) {
        var defaults = {
            width: "",
            speed: 500,
            autoplay: 5000,
            pause: "hover",
            arrow: "hover",
            callback: function () {
            }
        };

        var opts = $.extend({}, defaults, options);

        var $this = $(this),
            $items = $this.find(".carousel-inner .item"),
            $inner = $this.find(".carousel-inner"),
            w = opts.width ? opts.width : $(window).width(),
            timer, index = 0,
            size = $items.length + 1,
            $pagination = $this.find(".carousel-pagination li"),
            moving = false, //防止连续点击左右造成的BUG
            paginationClick = false; //点击页面导航切换返回层数

        var init = function () {
            //克隆第一张图片
            var clone = $items.first().clone();
            $inner.append(clone);
            $items = $this.find(".carousel-inner .item");

            setSize();
            opts.autoplay ? autoPlay() : clearInterval(timer);
            addEvenListener();
        };

        //设置轮播的高度宽度
        var setSize = function () {
            $this.find(".carousel-box").css({
                width: w + "px"
            });
            $inner.css({
                width: w * $items.length + "px"
            });
            $items.css({
                width: w + "px"
            })
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

            setTimeout(function () {
                moving = false;
            }, opts.speed);

            $pagination.removeClass("active");
            if (index == $pagination.length) {
                $pagination.eq(0).addClass("active");
            } else {
                $pagination.eq(index).addClass("active");
            }

            paginationClick ? opts.callback(index) : opts.callback(index - 1);
            paginationClick = false

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

            $pagination.on("click", function () {
                paginationClick = true;
                index = parseInt($(this).attr("data-slide-to"));
                move()
            });

            if (opts.pause === "hover") {
                $this.on("mouseover", function () {
                    clearInterval(timer)
                });
                $this.on("mouseout", function () {
                    opts.autoplay ? autoPlay() : clearInterval(timer);
                })
            }

            if (opts.arrow === "hover") {
                $pageControl.find("div").hide();
                $this.on("mouseover", function () {
                    $pageControl.find("div").show();
                });
                $this.on("mouseout", function () {
                    $pageControl.find("div").hide();
                })
            }

            $(window).on("resize", function () {
                w = opts.width ? opts.width : $(window).width();
                setSize();
                //解决缩放时已经轮播的元素会错位的BUG
                $inner.css({
                    transform: "translate3d(" + (-index * w) + "px,0,0)"
                });
            })
        };

        init()
    }
}(Zepto);
