import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import { linkTo } from "@storybook/addon-links";
import { setupGraphiQL } from "@storybook/addon-graphql";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs/react";
import { withNotes } from "@storybook/addon-notes";

// setup the graphiql helper which can be used with the add method later
const graphiql = setupGraphiQL({ url: "http://localhost:3100/graphql" });
storiesOf("button", module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add(
    "with text",
    withNotes(`
Clicking this button will take you to the next story.
`)(() => (
      <button onClick={linkTo("button", "with some emoji")}>
        Hello Button
      </button>
    ))
  )
  .add("with some emoji", () => (
    <button onClick={action("clicked")}>😀 😎 👍 💯</button>
  ))
  .add("Inaccessible", () => (
    <button style={{ backgroundColor: "red", color: "darkRed" }}>
      Inaccessible button
    </button>
  ))
  .add(
    "get user info DontTest",
    graphiql(`{
            user(id: "1") {
                name
            }
        }`)
  )
  .add("with a button", () => (
    <button disabled={boolean("Disabled", false)}>
      {text("Label", "Hello Button")}
    </button>
  ))
  .add("as dynamic variables", () => {
    const name = text("Name", "Arunoda Susiripala");
    const age = number("Age", 89);
    const content = `I am ${name} and I'm ${age} years old.`;
    return <div>{content}</div>;
  });
