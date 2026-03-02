import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useState } from "preact/hooks";

export default async () => {
  render(<TextComponent/>, document.body);
};
function TextComponent (Type="generic",Tone="custom") {
return <s-box>
              <s-text type={Type} tone={Tone}>
                Email
              </s-text>
            </s-box>;
}