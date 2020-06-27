# KINDER SLIDER - a kinder slider than you might have found before.

## Download Kinder slider - https://github.com/bazhena-matyuk/Kinder_slider_project

## How to use Kinder slider

1. Create the HTML where the slider should be:

```
<div class="your-class">
  <div>your content</div>
  <div>your content</div>
  <div>your content</div>
</div>
```

2. Add kinder-slider.css in your tag "head".
Add the new style.css if you want to change the default style.

```
<head>
    <title>Document</title>
    <link rel="stylesheet" href="./css/kinder-slider.css">
    <link rel="stylesheet" href="./css/style.css">
</head>
```

3. Add kinder-slider.js before your closing tag "body". 
Add script.js in the same place if you want to change the default settings.

```
<script src="./js/kinder-slider.js"></script>
    <script src="./js/script.js"></script>
</body>
```

4. Congratulations, you can fill the slider with content and change its settings!

## Settings
NAME | WHAT IS IT? | DEFAULT VALUE | POSSIBLE VALUES
------------ | ------------- | ------------- | -------------
*slidesWidth* | The width of your slide in px | 600 | your number
*slidesHeight*|	The height of your slide in px	| 400 |your number
*nav*|	Show navigation	|false	|true/false
*autoplay*	|Turn on and off autoplay|	false	|true/false
*autoplaySpeed*	|Autoplay speed in milliseconds|	2000	|your number
*slides*	|Number of slides displayed simultaneously	|2	|your number
*loop*	|Turn on and off an infinite loop	|false	|true/false
*dots*	|Show dot indicators	|false	|true/false
