import React, { useState, useMemo } from 'react';
import colors256 from './colors-256';
import './Output.scss';

// Map format names to CSS classes
const formatMap = {
  BOLD: 'fmt-bold',
  DIM: 'fmt-dim',
  UNDERLINED: 'fmt-underlined',
  INVERT: 'fmt-invert',
  HIDDEN: 'fmt-hidden',
};

// Build a map from color variable name to hex
function buildColorVarMap(lines) {
  const colorVarMap = {};
  lines.forEach((line) => {
    const match = line.match(/^C_([A-Z0-9_]+)=["'][^[]*\[([34]8);5;(\d+)m["']/); // C_NAME="\e[38;5;196m"
    if (match) {
      const [, name, fgOrBg, colorId] = match;
      const color = colors256.find(c => c[1] === Number(colorId));
      if (color) {
        colorVarMap[`C_${name}`] = {
          hex: color[2],
          type: fgOrBg === '38' ? 'fg' : 'bg',
        };
      }
    }
  });
  return colorVarMap;
}

function renderLine(line, visualize, colorVarMap) {
  if (line.startsWith('#')) {
    return <span className="line-comment">{line}</span>;
  }

  // Format variable lines
  const formatMatch = line.match(/^F_([A-Z_]+)=(.*)$/);
  if (formatMatch) {
    const fmt = formatMatch[1];
    const rest = formatMatch[2];
    return (
      <span>
        <span>{`F_${fmt}=`}</span>
        <span className={visualize ? formatMap[fmt] : ''}>{rest}</span>
      </span>
    );
  }

  // Color variable lines
  const colorMatch = line.match(/^C_([A-Z0-9_]+)=(.*)$/);
  if (colorMatch) {
    const colorVar = `C_${colorMatch[1]}`;
    const rest = colorMatch[2];
    const colorObj = colorVarMap[colorVar];
    const style = {};
    if (visualize && colorObj) {
      if (colorObj.type === 'fg') style.color = colorObj.hex;
      if (colorObj.type === 'bg') style.background = colorObj.hex;
    }
    return (
      <span>
        <span>{`${colorVar}=`}</span>
        <span style={style}>{rest}</span>
      </span>
    );
  }

  // echo line: look for ${C_...} and ${F_...}
  if (/echo -e/.test(line)) {
    if (!visualize) return <span>{line}</span>;
    // Match: echo -e "...${C_FG}${C_BG}text${NO_FORMAT}"
    const echoMatch = line.match(/^(echo -e ")(.*)(")$/);
    if (echoMatch) {
      const [, before, mid, after] = echoMatch;
      // Find the last } before ${NO_FORMAT}
      // eslint-disable-next-line no-template-curly-in-string
      const noFormatIdx = mid.lastIndexOf('${NO_FORMAT}');
      let beforeText = mid;
      let text = '';
      let afterText = '';
      if (noFormatIdx !== -1) {
        beforeText = mid.slice(0, noFormatIdx);
        afterText = mid.slice(noFormatIdx);
        // Find the last } before afterText
        const lastBrace = beforeText.lastIndexOf('}');
        if (lastBrace !== -1) {
          text = beforeText.slice(lastBrace + 1);
          beforeText = beforeText.slice(0, lastBrace + 1);
        }
      }
      // Find which color vars are used
      const style = {};
      Object.keys(colorVarMap).forEach((varName) => {
        if (beforeText.includes(`\${${varName}}`)) {
          const colorObj = colorVarMap[varName];
          if (colorObj.type === 'fg') style.color = colorObj.hex;
          if (colorObj.type === 'bg') style.background = colorObj.hex;
        }
      });
      // Find which format vars are used
      const classNames = [];
      Object.keys(formatMap).forEach((fmt) => {
        if (beforeText.includes(`F_${fmt}`)) classNames.push(formatMap[fmt]);
      });
      return (
        <span>
          <span>{before}</span>
          <span>{beforeText}</span>
          <span className={classNames.join(' ')} style={style}>{text}</span>
          <span>{afterText}{after}</span>
        </span>
      );
    }
    return <span>{line}</span>;
  }

  return <span>{line}</span>;
}

const Line = ({ children, type = 'default' }) =>
  <div className={`line line-${type}`}>{children}</div>;

export default function Output({ lines }) {
  const [visualize, setVisualize] = useState(true);

  const colorVarMap = useMemo(() => buildColorVarMap(lines), [lines]);

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 4 }}>
        <label
          htmlFor="visualize-formatting"
          style={{ fontSize: 13, cursor: 'pointer', userSelect: 'none' }}
        >
          <input
            id="visualize-formatting"
            type="checkbox"
            checked={visualize}
            onChange={e => setVisualize(e.target.checked)}
            style={{ marginRight: 4 }}
          />
          Visualize formatting
        </label>
      </div>
      <div className="output">
        <Line type="comment"># How to implement it</Line>
        {lines.map(l => (
          <Line key={l}>
            {renderLine(l, visualize, colorVarMap)}
          </Line>
        ))}
      </div>
    </div>
  );
}
