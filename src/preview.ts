import type { Decorator, ReactRenderer } from "@storybook/react";
import type { StoryContext } from "@storybook/types";
import { defaultDecorateStory, useChannel } from "@storybook/preview-api";
import { makeDecorator } from "@storybook/preview-api";
import { renderToStaticMarkup } from "react-dom/server";
import { EVENT_CODE_RECEIVED, EVENT_ERROR, PARAM_KEY } from "./constants";
import { HtmlParameters } from "./params";

const withHtmlAddonDecorator = makeDecorator({
  name: "withHtml",
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters = {} }) => {
    const emit = useChannel({});
    try {
      if (context.parameters.renderer !== "react") {
        throw new Error("This addon is not compatible with your storybook");
      }

      const { decorators } = parameters as HtmlParameters;
      const decoratedStoryFn = decorators
        ? defaultDecorateStory(
            context.undecoratedStoryFn,
            ([] as Decorator[]).concat(decorators)
          )(context as StoryContext<ReactRenderer>)
        : storyFn(context);

      const html = renderToStaticMarkup(decoratedStoryFn);
      emit(EVENT_CODE_RECEIVED, { html });
    } catch (error) {
      console.error(error);
      emit(EVENT_ERROR, error);
    }
    return storyFn(context);
  },
});

const preview = {
  decorators: [withHtmlAddonDecorator],
};

export default preview;
