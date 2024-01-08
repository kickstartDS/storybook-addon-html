import React from "react";
import { makeDecorator } from "@storybook/preview-api";

export const createDecorator = (name: string) =>
  makeDecorator({
    name,
    parameterName: name,
    skipIfNoParametersOrOptions: false,
    wrapper: (storyFn, context) => (
      // @ts-expect-error
      <div className={name}>{storyFn(context)}</div>
    ),
  });
