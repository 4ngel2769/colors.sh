/* eslint no-octal-escape: 0 */

import React from 'react';
import { autorun } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react';
import Store from './store';
import Terminal from './Terminal';
import './HomeScreen.scss';
import Output from './Output';
import Controls from './Controls';

function useUrlPersistedStore() {
  return useLocalObservable(() => {
    const settingsStr = window.location.hash.replace('#settings=', '');
    let initialState;
    if (settingsStr.length > 0) {
      try {
        initialState = JSON.parse(decodeURIComponent(settingsStr));
      } catch {
        // Ignore parse errors
      }
    }
    const store = new Store(initialState);
    let firstAutorunCalled = false;
    autorun(() => {
      const state = encodeURIComponent(JSON.stringify(store.toJSON()));
      if (firstAutorunCalled) {
        window.location.hash = `settings=${state}`;
      }
      firstAutorunCalled = true;
    });
    return store;
  });
}

const HomeScreen = observer(() => {
  const store = useUrlPersistedStore();
  const { selectedColor, selectedBgColor, text, formats, terminalTheme, outputLines, setText } = store;

  return (
    <div className="home-screen">
      <div className="help app-text">
        Colors.sh helps you add colors and formatting to your bash scripts. <br />
        Pick some options to format the terminal&#39;s preview 👇
      </div>
      <Controls {...store} />
      <Terminal
        text={text}
        color={selectedColor.hex}
        bgColor={selectedBgColor.hex}
        formats={formats.map(f => f.name)}
        theme={terminalTheme}
        onTextChange={setText}
      />
      <div className="app-text">
        <Output lines={outputLines} />
      </div>
    </div>
  );
});

export default HomeScreen;
