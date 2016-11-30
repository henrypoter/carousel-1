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

#参数
<table>
<thead><tr>
<th>key</th> <th>value</th> <th>type</th> <th>description</th>
</tr></thead>
<tbody>
  <tr>
    <th>type</th>
    <td>normal or opacity</td>
    <td>"string"</td>
    <td>normal普通的无缝轮播，opacity改变透明度的轮播，默认为normal</td>
  </tr>
  <tr>
    <th>width</th>
    <td>number or percent</td>
    <td>"string"</td>
    <td>设置轮播的宽度，支持百分比，数值时不加px，默认为100%</td>
  </tr>
  <tr>
    <th>speed</th>
    <td>num</td>
    <td>"number"</td>
    <td>设置轮播的速度，默认为600</td>
  </tr>
  <tr>
    <th>autoplay</th>
    <td>num</td>
    <td>"number"</td>
    <td>设置自动轮播的时间间隔，如果不需要自动轮播则设置为0，默认为3000</td>
  </tr>
  <tr>
    <th>pause</th>
    <td>hover</td>
    <td>"string"</td>
    <td>鼠标hover到轮播图上时，暂停轮播，如不需要则设置为空，默认为hover</td>
  </tr>
  <tr>
    <th>arrow</th>
    <td>hover</td>
    <td>"string"</td>
    <td>鼠标hover到轮播图上时，显示左右箭头，一直显示时设置为空，默认为hover</td>
  </tr>
</tbody>
