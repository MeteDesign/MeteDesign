## color文件夹：

- 包含colors文件，定义了主题样式的基本颜色

## core文件夹：

- base文件，定义了基本元素的统一样式
- normalize文件，统一不同浏览器元素间的差异
- index文件，出口文件	

## mixins文件夹：

- clearfix文件，定义的消除文件代码块
- compatibility文件，解决浏览器兼容性问题，后面补充
- motion文件，定义动画代码块，后面补充
- size文件，定义size代码块

## themes文件夹：

- default文件，默认主题风格文件，定义所有的公共变量

### 要求

- 在组件样式中多次出现的要写成变量形式
- 在其他组件中也会用到的要写成变量形式
- 再更改组件样式时需要更改的要写成变量形式
- 变量首先在themes下的default文件里找，如果没有，写好注释自己定义
- 不要使用没有设置参数的@mixin，他们应该是.class或者%placeholders;
- 不要轻意（从不使用）@extend调用.class。会得到你意想不到的结果，特别是定义的.class出现在嵌套或其他的样式表中，你应该使用@extend调用%placeholders;
- 不要使用太深的选择器嵌套。
- 如果你能避免，不要使用标签名。这不是一个taxative规则，但比id或者类名的性能要更低；
- 不要使用子选择器符号>，在SASS中很无效；
- 不要使用同史选择器+，配合你当前的标记他是非常无效。
- 不要太相信SASS的自动编译，你应该时时检查生成的CSS。在SASS中纠错能力比较差；

# Sass用法

## 1、变量

### 变量默认值!default
假设变量申明带有!default，那么如果在此申明之前没有这个变量的申明，则用这个值，反之如果之前有申明，则用申明的值。当然如果你先!default申明，然后再申明一次，那就没什么意思了，这就是基本的变量覆盖，第一次申明的有无!default都一样。所以你要区分这两种情况：
```scss
//第一种，使用默认值 
//变量申明带有!default，但是之前没有这个变量的申明 
$color:blue !default; 
p{ color:$color;//blue }

//第二种，使用前面定义的值
$color:red; 
//变量申明带有!default，但是前面还有这个变量的申明
$color:blue !default;
p{
    color:$color;//red
}

//第三种错误的用法，先!default申明
$color:red !default;
$color:blue;
```
### 变量后面加...

一般来说我们的@mixin传递的参数是以,来分隔的，但是css3的一些属性可以设置多个值，并且多个值以,分开，如box-shadow:0 0 3px rgba(0,0,0,0.3),inset 0 0 3px rgba(255,255,255,0.3);这让@mixin如何给box-shadow传递参数啊。所以这种变量后面加...的变量就出现了。
```scss
@mixin box-shadow($shadow...){
    -webkit-box-shadow:$shadow;
    -moz-box-shadow:$shadow;
    box-shadow:$shadow;
}
```

### 变量用#{}包裹

一般来说，我们设置的变量都是用于属性值的，而如果用在属性或者选择器上，就得以#{}包裹起来了。
```scss
$btnClass: btn !default;
$borderDirection:  top !default;

.#{$btnClass}{
    border-#{$borderDirection}:1px solid #ccc;
}
```
解析成的css：
```css
.btn{
    border-top:1px solid #ccc;
}
```

### 多个变量一起申明

其实这个还是很实用的，把多个相关的值写在一个变量里，然后通过nth($var,index)来获取第几个值。
```scss
$linkColor: red blue !default;

a{
    color:nth($linkColor,1);

    &:hover{
        color:nth($linkColor,2);
    }
}
```
解析成的css：
```scss
a {
    color: red; 
}
a:hover {
    color: blue; 
}
```

## 2、嵌套

嵌套不要超过三层

## 3、继承
SASS的继承，可以将相同样式规则定义在一个类中，然后能过`@extend`来调用。这样就可以把相同样式合并在一起。       通过@extend引用的类名，你要有绝对的自信，它从未用在几个地方。                                                                                 在大作数情况下@mixin会比@extend更好，但是它们俩都有自己的一席之地。当样式和选择器之间的关系在某些方面比较紧密的时候，使用@extend。除此之外，你可以使用@mixin在任何地方。

例如：

```scss
/*定义一个类*/
.block {
    margin: 10px 5px;
    padding:2px;
}
p {
    @extend .block;/*继承.block选择器下所有样式*/
    border: 1px solid #eee;
}
ul,ol {
    @extend .block;/*继承.block选择器下所有样式*/
    color:#333;
    text-transform: uppercase;
}
```

上面的SCSS代码将编译出CSS：

```scss
.block,
p,
ul,
ol {
    margin: 10px 5px;
    padding: 2px;
}
p {
    border: 1px solid #eee;
}
ul,
ol {
    color: #333;
    text-transform: uppercase;
}
```

正如上面所看到的，上面的代码`.block`的样式将会被插入到相应的你要继承的选择器中，但需要注意的是优先级的问题。

但这种做法有时候会生成一些没必要的代码，比如说，仅有部分样式相同，但并不想独自创建一个类名，以免增生无用之代码，这个时候可以将类`.`换成`%`，在上例的基础上做以调整：

```scss
%block {
    margin: 10px 5px;
    padding: 2px;
}
p {
    @extend %block;
    border: 1px solid #eee;
}
ul,ol {
    @extend %block;
    color: #333;
    text-transfomr:uppercase;
}
```

此时编译出来的CSS如下：

```scss
p, ul, ol {
  margin: 10px 5px;
  padding: 2px; }

p {
  border: 1px solid #eee; }

ul, ol {
  color: #333;
  text-transfomr: uppercase; }
```

相比这下，使用`%`代替`.`定义公用样式，再通过`@extend`调用，编译出来的CSS要干净很多。

## 4、mixins混合

### 向Mixin块传递参数

```scss
@mixin Mixins名称（参数:参数值）{
    /*公用样式*/
}
```

的方式将相同的样式风格定义成一个模块，然后在需要使用的地方通过`@include`将`@mixin`定义好的模块调用进来：

```scss
selector {
    @includ Mixins名称(参数值);
}
```

### 向Mixin传递样式片段

除了传递参数，也可以直接传递一个样式片段给Mixin。在Mixin中，添加@content;语句，然后传递的样式片段就会代替@content;出现在相应的位置。

```scss
@mixin button {  
    font-size: 1em;  
    padding: 0.5em 1.0em;  
    text-decoration: none;  
    color: #fff;  
    @content;  
}
```
```scss
.button-green {  
    @include button {  
        background: green  
    }
}
```
.button-green中调用了Mixin。@include指令传递了一个将背景色设置为绿色的CSS片段，然后这个片段就会代替@content语句出现在mixin中相应的位置。

这段Sass被编译成：
```scss
.button-green {  
    font-size: 1em;  
    padding: 0.5em 1.0em;  
    text-decoration: none;  
    color: #fff;  
    background: green;  
}
```
如果是设置成这样，也可以只放一个@content语句在mixin中，然后使用@include传递包括选择器在内的所有东西。
```scss
@mixin button {  
    @content;  
}

@include button {  
    .background-green {  
        font-size: 1em;  
        padding: 0.5em 1.0em;  
        text-decoration: none;  
        color: #fff;  
        background: green;  
    }
};
```
这段Sass编译出来的结果跟刚才一样


Mixins的黄金规则是将相似的风格定义在一个@mixin中。请注意这里的一个关键词相似的，另外Mixins主要是用于重用，而不是用来指定具体的属性值。例如这个实例，我们应该用@mxin来创建不同半径的圆角，而不是用来创建一个具体值的@mixin。换句话来说，如果你创建的Mixins没有传参数，那您就是一种错误的使用方法。基于这点出发，我们可以把上例中的@mixin rounded传入一个$radius参数：

@mixin rounded($radius){
```scss
-webkit-border-radius: $radius;
-moz-border-radius: $radius;
-o-border-radius: $radius;
-ms-border-radius: $radius;
border-radius: $radius;
```
}
在@mixin中，我们除了可以传参之外，还可以给参数设置一个默认值：

@mixin rounded($radius:5px){
```scss
-webkit-border-radius: $radius;
-moz-border-radius: $radius;
-o-border-radius: $radius;
-ms-border-radius: $radius;
border-radius: $radius;
```
}
如此一来，我们就可以在调用的时候传入不同的参数值，当然，要是传入的参数值是一样的，同样会出现上面的现象。这是使用Mixins无法避免的。

## 5、%占位符
%只是一个占位符，他不是正常的选择器，不像.classes或者#ids，只要不通过@extend调用，他是不会产生任何代码量。这个功能对于我们用他来取代.class与@extend是最完美的了。而且其使用方法也非常简单。
首先使用%placeholders定义一个公用样式，类似于.class：
```scss
%placeholders {/*公用样式*/}
```
在需要使用的地方通过@extend来调用：
```scss
selector {
    @extend %placeholders;
}
```
## 注意

通过前面的介绍@mixin需要@include来调用，而.class和%placeholders需要@extend来调用，那么两者有何区别呢？

@include主要是用来调用@mixin定义的函数模块。在@mixin中可以定义一个相似功能样式，而且可以设置变量、定义参数和默认参数值；
@extend主要是用来调用.class或者%placeholders定义的属性模块；在.class或者%placeholders中可以定义一个相同样式，但这里面不能定义参数；
@include每次调用相同的@mixin时，编译出来的CSS相同样式不会进行合并；
@extend每次调用相同的 .class时，如果.class在样式出现多次，那么编译出来的CSS有可能不是您需要的样式；
@extend每次调用相同的%placeholders时，编译出来的CSS相同样式会进行合并。
