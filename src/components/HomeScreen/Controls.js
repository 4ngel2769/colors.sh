import React from 'react';
import allFormats from './formats';
import ColorChooser from './ColorChooser';
import './Controls.scss';

const themes = ['light', 'dark'];
const escapeChars = ['\\033', '\\e', '\\x1B'];

const FormatField = React.memo(({ formats, setFormat, format }) => {
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
});

const Settings = React.memo(({ terminalTheme, setTerminalTheme, escapeChar, setEscapeChar }) => (
  <div
    className="settings"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      justifyContent: 'center',
      marginTop: 12,
      marginBottom: 8,
    }}
  >
    <div className="app-text" style={{ fontWeight: 'bold', marginRight: 12, whiteSpace: 'nowrap' }}>
      <span role="img" aria-label="Settings">⚙️</span> Settings
    </div>
    <label htmlFor="terminal-theme-select" style={{ margin: 0 }}>
      Terminal theme:
      <select
        id="terminal-theme-select"
        value={terminalTheme}
        onChange={e => setTerminalTheme(e.target.value)}
        style={{ marginLeft: 4 }}
      >
        {themes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </label>
    <label htmlFor="escape-char-select" style={{ margin: 0, marginLeft: 12 }}>
      Escape character:
      <select
        id="escape-char-select"
        value={escapeChar}
        onChange={e => setEscapeChar(e.target.value)}
        style={{ marginLeft: 4 }}
      >
        {escapeChars.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </label>
  </div>
));

export default function Controls(props) {
  const { selectedColor, selectedBgColor, setColor, setBgColor, formats, setFormat } = props;
  return (
    <div className="controls">
      <ColorChooser label="Foreground" callback={setColor} color={selectedColor} />
      <ColorChooser label="Background" callback={setBgColor} color={selectedBgColor} />
      {allFormats.map(format =>
        <FormatField key={format.name} formats={formats} setFormat={setFormat} format={format} />)}
      <Settings {...props} />
    </div>
  );
}
