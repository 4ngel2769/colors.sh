import React, { useRef, useEffect } from 'react';
import './Terminal.scss';

export default ({ text, color, bgColor, formats, theme, onTextChange }) => {
  const inverted = formats.includes('Invert');
  const dimmed = formats.includes('Dim');
  const finalFgColor = inverted ? bgColor : color;
  const finalBgColor = inverted ? color : bgColor;
  const style = { color: dimmed ? `${finalFgColor}7f` : finalFgColor, background: finalBgColor };
  const className = `text ${formats.map(f => `format-${f.toLowerCase()}`).join(' ')}`;
  const editableRef = useRef();

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.textContent = text;
    }
  }, []);

  const handleInput = (e) => {
    if (onTextChange) onTextChange(e.currentTarget.textContent);
  };

  const handleBlur = (e) => {
    if (onTextChange) onTextChange(e.currentTarget.textContent);
  };

  return (
    <div className={`terminal ${theme}`}>
      <div className="terminal-header">
        <div className="btns">
          <div />
          <div />
          <div />
        </div>
        colors.sh -- preview
      </div>
      <div className="terminal-body">
        <div className="body-inner-content">
          <span className="arrow">&gt;</span>
          <span
            ref={editableRef}
            className={className}
            style={style}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};
