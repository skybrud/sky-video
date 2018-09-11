# sky-video

A Vue component for showing YouTube and Vimeo videos.

## Installation
```bash
npm install sky-video
```
or
```bash
yarn add sky-video
```


## Usage
Begin by importing and installing the SkyVideo Vue plugin
```js
import Vue from 'vue';
import SkyVideo from 'sky-video';

// If you want to use the baseline scss add the following line
import '${YOUR-PROJECT-ROOT-PATH}/node_modules/sky-swiper/src/v.scss';

Vue.use(SkyVideo);

```

`<sky-video src="URL" poster="imageURL"></sky-video>`

- `src` should be a valid Vimeo or YouTube embed URL.
- `poster` is just a URL to an image.

## Credits

This module is made by the Frontenders at [skybrud.dk](http://www.skybrud.dk/). Feel free to use it in any way you want. Feedback, questions and bugreports should be posted as issues. Pull-requests appreciated!
