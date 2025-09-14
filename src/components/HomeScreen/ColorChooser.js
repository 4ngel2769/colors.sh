import React, { useState, useRef, useEffect, useCallback } from 'react';
import colors from './colors-256';
import './ColorChooser.scss';

const ColorBtn = React.memo(({ color: [name, id, hex], onSelect, selected }) => (
  <button
    className={`color${selected ? ' selected' : ''}`}
    onClick={() => onSelect(id)}
    title={name}
    style={{ background: hex }}
    type="button"
    tabIndex={0}
    aria-pressed={selected}
  />
));

export default function ColorChooser({ label, callback, color }) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isActive, handleClickOutside]);

  const handleToggle = () => setIsActive((active) => !active);

  return (
    <div className={`color-chooser${isActive ? ' active' : ''}`} ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isActive}
      >
        <span className="content">{label}</span>
        <span className="arrow">⌄</span>
      </button>
      {isActive && (
        <div className="colors" role="listbox">
          {colors.map((c) => (
            <ColorBtn
              key={c[1]}
              color={c}
              onSelect={callback}
              selected={c[1] === color.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
