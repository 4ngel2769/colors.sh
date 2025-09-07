import React from 'react';
import allFormats from './formats';
import ColorChooser from './ColorChooser';
import './Controls.scss';

const themes = ['light', 'dark'];
const escapeChars = ['\\033', '\\e', '\\x1B'];

const FormatField = ({ formats, setFormat, format }) => {
  const inputId = `format-checkbox-${format.name}`;
  return (
    <label htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        onChange={evt => setFormat(format.name, evt.target.checked)}
        checked={!!formats.find(f => f.name === format.name)}
      />
      {format.name}
    </label>
  );
};

const Settings = ({ terminalTheme, setTerminalTheme, escapeChar, setEscapeChar }) => (
  <div className="settings">
    <label htmlFor="terminal-theme-select">
      Terminal theme:
      <select
        id="terminal-theme-select"
        value={terminalTheme}
        onChange={e => setTerminalTheme(e.target.value)}
      >
        {themes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </label>
    <label htmlFor="escape-char-select">
      Escape character:
      <select
        id="escape-char-select"
        value={escapeChar}
        onChange={e => setEscapeChar(e.target.value)}
      >
        {escapeChars.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  </div>
);

export default class Controls extends React.Component {
  state = { settingsOpen: false };

  toggleSettings() {
    this.setState({ settingsOpen: !this.state.settingsOpen });
  }

  render() {
    const { selectedColor, selectedBgColor, setColor, setBgColor, formats, setFormat }
      = this.props;
    return (
      <div className="controls">
        <ColorChooser label="Foreground" callback={setColor} color={selectedColor} />
        <ColorChooser label="Background" callback={setBgColor} color={selectedBgColor} />
        {allFormats.map(format =>
          <FormatField key={format.name} {...{ formats, setFormat, format }} />)}
        <button
          title="Settings"
          className="toggle-settings"
          onClick={() => this.toggleSettings()}
        >
          <span role="img" aria-label="Settings">⚙️</span>
        </button>
        {this.state.settingsOpen && <Settings {...this.props} />}
      </div>
    );
  }
}
