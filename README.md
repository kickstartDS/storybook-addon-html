# Storybook Addon HTML

This addon for Storybook adds a tab that displays the compiled HTML for each
story.

## Getting Started

With NPM:

```sh
npm i --save-dev @kickstartds/storybook-addon-html
```

With Yarn:

```sh
yarn add -D @kickstartds/storybook-addon-html
```

### Register addon

```js
// .storybook/main.js

module.exports = {
  // ...
  addons: [
    "@kickstartds/storybook-addon-html",
    // ...
  ],
};
```

## Usage

You can add
[decorators](https://storybook.js.org/docs/react/writing-stories/decorators) to
wrap the story. This is usefull if you only want a subset of your decorators being applied for the html output.

```js
export const parameters = {
  html: {
    decorators: [
      (storyFn, context) => (
        <MyProvider>
          {storyFn(context)}
        </MyProvider>
      )
    ],
  },
};
```

## Supported frameworks

- React
