# &lt;Icon /&gt;

An element for displaying icon.  
It can be placed between a text, inside button, in the menu, etc.

## Preview

```jsx
<Icon icon='instagram' theme='primary' size='lg' />
```
Rendered to:
```
<span class="c1 thPrimary szLg" style="--v59:url("/icons/instagram.svg");">...</span>
```

## Features
* 1500+ pre-defined images + your custom images.
* 5 size variants: small (sm), normal (nm), medium (md), large (lg), text size (1em), -or- custom size.
* Themeable (default themes are: primary, secondary, success, info, warning, danger, dark & light).
* Normal mode (uses theme color).
* Mild mode (uses light theme color).
* Dynamic theming. All theming stuff based on `css variables`, no compilation required after modification.
* Theming is customizable & shared to another Nodestrap based components (via `css variables`).
* Written with TypeScript (superset of JavaScript) & compiled to ES6 module.
* IntelliSense supported.

## Installation

Using npm:
```
npm i @nodestrap/icon
```
Then copy folder `fonts` & `icons` from our `@nodestrap/icon/public` to your public folder, let's say `/shared`, so it becomes:
* /shared/fonts/**
* /shared/icons/**

Then add your custom icons (*.svg or *.png) into `/shared/icons/`

Then add code below after the `import` statements:
```js
import { Icon, config as iconConfig } from '@nodestrap/icon';

// path relative to *browser*, not physical path on *server*
iconConfig.font.path = '/shared/fonts';
iconConfig.img.path = '/shared/icons';
iconConfig.img.files.push(
	'my-logo.svg', // your custom logo
	'phone.png',   // your custom phone icon
	// ... add more ...
);
```

And finally you can use your icons:
```jsx
<Icon icon='my-logo' theme='primary' size='lg' />
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
