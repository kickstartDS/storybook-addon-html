import React, { useState } from "react";
import { AddonPanel, SyntaxHighlighter } from "@storybook/components";
import type { Addon_RenderOptions } from "@storybook/types";
import { useChannel } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import { EVENT_CODE_RECEIVED, EVENT_ERROR } from "./constants";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;

  .SyntaxHighlighter {
    height: 100%;
    overflow: auto !important;
  }
`;

const Error = styled.div(({ theme }) => ({
  background: theme.background.critical,
  color: theme.color.critical,
  padding: theme.layoutMargin,
}));

export function Panel({ active }: Partial<Addon_RenderOptions>) {
  const [code, setCode] = useState<string>();
  const [error, setError] = useState<Error>();

  useChannel({
    [EVENT_CODE_RECEIVED]: ({ html }) => {
      setError(undefined);
      setCode(html);
    },
    [EVENT_ERROR]: (error) => {
      setError(error);
    },
  });
  return (
    <AddonPanel active={!!active}>
      {error ? (
        <Error>{error.toString()}</Error>
      ) : (
        <Wrapper>
          <SyntaxHighlighter
            language="html"
            copyable
            padded
            format="html"
            className="SyntaxHighlighter"
          >
            {code}
          </SyntaxHighlighter>
        </Wrapper>
      )}
    </AddonPanel>
  );
}
