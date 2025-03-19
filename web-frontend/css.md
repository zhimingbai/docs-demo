# css

CSS即层叠样式表（Cascading Style Sheets），是一种用于描述HTML或XML（包括如SVG、XHTML之类的XML分支）文档外观和格式的样式表语言。它的主要用途是将文档的结构（由HTML或XML定义）与表现（如颜色、字体、间距等）分离，从而实现网页的美观呈现和高效维护。下面从几个方面详细介绍CSS：

### 主要作用

- **美化页面**：借助CSS，你能够为网页元素设定各种样式，像字体、颜色、背景等，从而让页面更具吸引力。
- **布局控制**：可以精准地控制网页元素的位置和大小，实现如多列布局、响应式设计等效果。
- **提高维护性**：把样式信息集中于CSS文件，修改时只需调整CSS，就能让所有引用该样式的页面同步更新。

### 基本语法

CSS规则由选择器和声明块构成。选择器用于指定要应用样式的HTML元素，声明块则包含一个或多个声明，每个声明由属性和值组成。示例如下：

```css
/* 选择器为 p 元素 */
p {
  /* 属性为 color，值为 red */
  color: red;
  /* 属性为 font-size，值为 16px */
  font-size: 16px; 
}
```

此规则意味着所有`<p>`元素的文本颜色会变成红色，字体大小为16像素。

### 引入方式

- **内联样式**：直接在HTML元素的`style`属性中添加CSS样式。

```html
<p style="color: red; font-size: 16px;">这是一个段落。</p>
```

- **内部样式表**：在HTML文档的`<head>`标签里使用`<style>`标签来定义CSS样式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    p {
      color: red;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <p>这是一个段落。</p>
</body>
</html>
```

- **外部样式表**：把CSS代码存于独立的`.css`文件，再在HTML文档里通过`<link>`标签引入。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <p>这是一个段落。</p>
</body>
</html>
```

styles.css文件内容如下：

```css
p {
  color: red;
  font-size: 16px;
}
```

### 选择器类型

- **元素选择器**：依据HTML元素名称选取元素。

```css
p {
  color: red;
}
```

- **类选择器**：借助元素的`class`属性选取元素。

```css
.my-class {
  color: blue;
}
```

```html
<p class="my-class">这是一个应用了类选择器的段落。</p>
```

- **ID选择器**：通过元素的`id`属性选取元素。

```css
#my-id {
  color: green;
}
```

```html
<p id="my-id">这是一个应用了ID选择器的段落。</p>
```

- **属性选择器**：按照元素的属性及其值来选取元素。

```css
input[type="text"] {
  border: 1px solid gray;
}
```

- **伪类选择器**：根据元素的特定状态选取元素。

```css
a:hover {
  color: orange;
}
```

CSS功能强大且灵活，在网页设计和开发中扮演着关键角色。通过运用CSS，你可以创建出美观、易用且响应式的网页。
