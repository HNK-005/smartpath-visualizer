import './style.css';
import { GridView, NavView } from './views';
import { NavController } from './controllers/nav.controller';
import { GridController } from './controllers/grid.controller';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<nav id="nav-container"></nav>
<div id="grid-container"></div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const navView = new NavView('nav-container');
  const navContainer = new NavController(navView);
  const gridView = new GridView('grid-container');
  const gridContainer = new GridController(gridView);

  navContainer.handleVisualize(
    (algorithm) => {
      return gridContainer.visualize(algorithm);
    },
    () => {
      gridContainer.setIsVisualization(false);
    },
  );

  navContainer.handleClearWalls(() => {
    if (gridContainer.getIsVisualization()) return;
    gridContainer.clearWalls();
  });

  navContainer.handleClearPath(() => {
    if (gridContainer.getIsVisualization()) return;
    gridContainer.clearPath();
  });
});
