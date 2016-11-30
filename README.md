# carousel
基于Zepto的轮播效果，兼容IE10+

#需要引入
```html
<link rel="stylesheet" href="index.css">
<script src="zepto.min.js"></script>
<script src="carousel.js"></script>
```

#html结构
```html
<div class="carousel">
    <div class="carousel-box">
        <ul class="carousel-inner">
            <li class="item"><img src="banner1.jpg"></li>
            <li class="item"><img src="banner2.jpg"></li>
            <li class="item"><img src="banner3.jpg"></li>
        </ul>

        <ol class="carousel-pagination">
            <li data-slide-to="0" class="active"></li>
            <li data-slide-to="1"></li>
            <li data-slide-to="2"></li>
        </ol>

        <div class="carousel-control">
            <div class="left"><</div>
            <div class="right">></div>
        </div>
    </div>
</div>
```

#使用
```js
$(".carousel").carousel()
```
