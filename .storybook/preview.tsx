import type { Preview } from "@storybook/react";
import htmlAddonPreview from "../src/preview";
import { createDecorator } from "./decorators";

const preview: Preview = {
  decorators: [
    createDecorator("wrapper-from-preview-ts"),
    ...htmlAddonPreview.decorators,
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
