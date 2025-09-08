import React from 'react';
import { createRoot } from 'react-dom/client';
import RootContainer from './containers/RootContainer/RootContainer';
import { ThemeProvider } from './components/HomeScreen/Theme';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <RootContainer />
  </ThemeProvider>,
);

setTimeout(() => {
  document.documentElement.classList.remove('no-theme-transition');
}, 0);
