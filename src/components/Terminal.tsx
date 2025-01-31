/* eslint-disable linebreak-style */
import * as React from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

// eslint-disable-next-line linebreak-style
import { StyleContext } from "../contexts/StyleContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useClickOutsideEvent } from "../hooks/terminal";

import Controls from "./Controls";
import Editor from "./Editor";

interface TerminalProps {
  enableInput: boolean;
  caret: boolean;
  theme: string;
  showControlBar: boolean;
  showControlButtons: boolean;
  controlButtonLabels: Array<string>;
  prompt: string;
  commands: object;
  welcomeMessage: string | PropTypes.func | PropTypes.node;
  errorMessage: PropTypes.func | string | PropTypes.node;
  defaultHandler: PropTypes.func;
}

export default function Terminal(props: TerminalProps) {
  const wrapperRef = React.useRef(null);
  const [consoleFocused, setConsoleFocused] = React.useState(!isMobile);
  const style = React.useContext(StyleContext);
  const themeStyles = React.useContext(ThemeContext);

  useClickOutsideEvent(wrapperRef, consoleFocused, setConsoleFocused);

  // Get all props destructively
  const {
    caret = true,
    theme = "light",
    showControlBar = true,
    showControlButtons = true,
    controlButtonLabels = ["close", "minimize", "maximize"],
    prompt = ">>>",
    commands = {},
    welcomeMessage = "",
    errorMessage = "not found!",
    enableInput = true,
    defaultHandler = null,
  } = props;

  const controls = showControlBar ? (
    <Controls
      consoleFocused={consoleFocused}
      showControlButtons={showControlButtons}
      controlButtonLabels={controlButtonLabels}
    />
  ) : null;

  const editor = (
    <Editor
      caret={caret}
      consoleFocused={consoleFocused}
      prompt={prompt}
      commands={commands}
      welcomeMessage={welcomeMessage}
      errorMessage={errorMessage}
      enableInput={enableInput}
      showControlBar={showControlBar}
      defaultHandler={defaultHandler}
    />
  );

  return (
    <div
      ref={wrapperRef}
      id={style.terminalContainer}
      className={style[`theme--${theme}`]}
      data-testid="terminal"
    >
      <div
        className={`${style.terminal}`}
        style={{
          background: themeStyles.themeToolbarColor,
          color: themeStyles.themeColor,
        }}
      >
        {controls}
        {editor}
      </div>
    </div>
  );
}
