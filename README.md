# vue-selectable

## Overview

It's common task to make mouse selection of some objects on the page. This directive makes this task
extremely easy, all you need to implement object selection is two lines of code.
It was designed after jQuery Selectable interaction, with some details borrowed from `angular-multiple-selection`.
Now it supports plain mouse selection and adding to previously selected values with
`Ctrl` key pressed during selection.

## Requirements

* vue: ^1.0

Vue.js 2.x version is still WIP

## Install

From npm:
```
$ npm install vue-selectable  --save
```

## Usage

To use directive normally you'll need two arrays, one for selected items - with boolean values for 
every selectable item, another for items under selection box. By default elements identified by
`selectable` class will be considered as selectable items.
Another thing that you'll definitely need is a element that will be selection box. Directive
will change `height`, `width`, `top`, and `left` attributes of this element, and toggle its
visibility by changing `display` attribute from `block` to `none` and vise versa.

```html
<div v-selectable="selected" selecting="selecting" id="app">
        <div class="selection"></div>
        <div v-for="item in items"
             :class="{ selected: !!selected[$index], selecting: !!selecting[$index] }"
         	 class="selectable" >{{ item }}</div>
</div>
```

```js
import selectable from 'vue-selectable';

new Vue({
	el: '#app',
    data: {
        selected: [],
        selecting: []
    },
    
    directives: {
        selectable
    }
});
```

## Options

`v-selectable` requires one mandatory parameter - directive parameter - array of items selection 
status (array of boolean). If you have 5 selectable items, this array will have 5 elements initially
set to `false`. When user selects some item(s), values change to `true` accordingly.

Other parameters available:
* `selecting` - array of items selection status during selection drag (array of boolean). Must
  be used to display realtime selection visual feedback.
* `items` - CSS selector to identify selectable items, by default it is set to `.selectable`
  (elements with CSS class "selectable")
* `box` - selection box element. By default it tries to use element with `selection` CSS class
* `constraint` - box that constrains selection area (selection box can be only inside area
  limited to this element), by default selection area limited to element with directive

## Examples

Example usages can be found in `examples` directory.

## License

[MIT](http://opensource.org/licenses/MIT)