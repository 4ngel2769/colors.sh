import React from 'react';
import HomeScreen from '../../components/HomeScreen/HomeScreen';
import './RootContainer.scss';
import ThemeSwitch from '../../components/HomeScreen/ThemeSwitch';

export default function RootContainer() {
  return (
    <div>
      <div className="navbar">
        <span className="logo app-text">
          <span role="img" aria-label="rainbow">🌈</span>
          <span role="img" aria-label="laptop">💻</span>
          Colors.sh
        </span>
        <ThemeSwitch />
      </div>
      <HomeScreen />
      <footer className="app-text">
        <div className="github-buttons">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=messutied&repo=colors.sh&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="90px"
            height="20px"
            title="Github stars"
          />
          <iframe
            src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=fork&count=false"
            frameBorder="0"
            scrolling="0"
            width="60px"
            height="20px"
            title="Github stars"
          />
        </div>
        <div className="footer-info">
          <a
            href="https://misc.flogisoft.com/bash/tip_colors_and_formatting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source docs
          </a>
          <div className="author">
            Made by&nbsp;
            <a href="https://twitter.com/messutied" target="_blank" rel="noopener noreferrer">
              @messutied
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
