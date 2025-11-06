import { AlgorithmType } from '../lib/algorithm/AlgorithmFactory';

export class NavView {
  private navContainer: HTMLElement;
  private navHeader: HTMLElement;
  private navControls: HTMLElement;
  private algorithmOptions: { value: AlgorithmType; label: string }[] = [
    { value: 'BFS', label: 'Breadth-First Search (BFS)' },
    { value: 'DFS', label: 'Depth-First Search (DFS)' },
    { value: 'Dijkstra', label: "Dijkstra's Algorithm" },
    { value: 'A*', label: 'A* Search Algorithm' },
  ];

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.navContainer = container;
    this.navHeader = this.initHeader();
    this.navControls = this.initControls();
  }

  public initialize(): void {
    this.navContainer.innerHTML = '';
    this.navContainer.appendChild(this.navHeader);
    this.navContainer.appendChild(this.navControls);
    this.render();
  }

  private initHeader(): HTMLElement {
    const navHeader = document.createElement('div');
    navHeader.classList.add('nav-header');
    return navHeader;
  }

  private initControls(): HTMLElement {
    const navControls = document.createElement('div');
    navControls.classList.add('nav-controls');
    return navControls;
  }

  private renderHeader(): void {
    this.navHeader.innerHTML = '<a href="#">SmartPath Visualizer</a>';
  }

  private renderControls(): void {
    this.navControls.innerHTML = `
    <div class="algorithm">
        <label for="algorithm" class="combobox-label">Algorithm:</label>
        <select>
          ${this.algorithmOptions
            .map(
              (option) =>
                `<option value="${option.value}">${option.label}</option>`,
            )
            .join('')}
        </select> 
    </div>
    <div class="action">
      <button class="clear-walls btn btn-clear">
        Clear Walls
      </button>
      <button class="clear-path btn btn-clear">
        Clear Path
      </button>
      <button class="visualize btn btn-start">
        Visualize
      </button>
    </div>
    `;
  }

  public render(): void {
    this.renderHeader();
    this.renderControls();
  }

  public getAlgorithmOptions(): { value: AlgorithmType; label: string }[] {
    return this.algorithmOptions;
  }

  public getAlgorithmSelectElement(): HTMLSelectElement {
    return this.navControls.querySelector(
      '.algorithm select',
    ) as HTMLSelectElement;
  }

  public getVisualizeButton(): HTMLButtonElement {
    return this.navControls.querySelector('.visualize') as HTMLButtonElement;
  }

  public getClearWallsButton(): HTMLButtonElement {
    return this.navControls.querySelector('.clear-walls') as HTMLButtonElement;
  }

  public getClearPathButton(): HTMLButtonElement {
    return this.navControls.querySelector('.clear-path') as HTMLButtonElement;
  }
}
