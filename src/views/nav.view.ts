import { AlgorithmEnum, SpeedEnum, WeightEnum } from '../app.enum';

export class NavView {
  private algorithmOptions = [
    { value: AlgorithmEnum.DIJKSTRA, label: 'Dijkstra' },
    { value: AlgorithmEnum.ASTAR, label: 'A*' },
    { value: AlgorithmEnum.BFS, label: 'Breadth-First Search' },
    { value: AlgorithmEnum.DFS, label: 'Depth-First Search' },
  ];

  private speedOptions = [
    { value: SpeedEnum.SLOW, label: 'Slow' },
    { value: SpeedEnum.MEDIUM, label: 'Medium' },
    { value: SpeedEnum.FAST, label: 'Fast' },
  ];

  private weightOptions = [
    { value: WeightEnum.LOW, label: `Low (${WeightEnum.LOW})` },
    { value: WeightEnum.MEDIUM, label: `Medium (${WeightEnum.MEDIUM})` },
    { value: WeightEnum.HIGH, label: `High (${WeightEnum.HIGH})` },
  ];

  private selectWeight: HTMLSelectElement;
  private selectAlgorithm: HTMLSelectElement;
  private selectSpeed: HTMLSelectElement;
  private btnRun: HTMLButtonElement;
  private btnPause: HTMLButtonElement;
  private btnResetGrid: HTMLButtonElement;
  private btnClearPath: HTMLButtonElement;
  private btnClearWalls: HTMLButtonElement;
  private btnGenerateMaze: HTMLButtonElement;
  private btnExportFile: HTMLButtonElement;
  private btnImportFile: HTMLButtonElement;

  constructor() {
    this.selectWeight = document.getElementById('weight') as HTMLSelectElement;
    this.selectAlgorithm = document.getElementById(
      'algorithm',
    ) as HTMLSelectElement;
    this.selectSpeed = document.getElementById('speed') as HTMLSelectElement;
    this.btnRun = document.getElementById('btn-run') as HTMLButtonElement;
    this.btnPause = document.getElementById('btn-pause') as HTMLButtonElement;
    this.btnResetGrid = document.getElementById(
      'btn-reset-grid',
    ) as HTMLButtonElement;
    this.btnClearPath = document.getElementById(
      'btn-clear-path',
    ) as HTMLButtonElement;
    this.btnClearWalls = document.getElementById(
      'btn-clear-walls',
    ) as HTMLButtonElement;
    this.btnGenerateMaze = document.getElementById(
      'btn-generate-maze',
    ) as HTMLButtonElement;
    this.btnExportFile = document.getElementById(
      'btn-export-file',
    ) as HTMLButtonElement;
    this.btnImportFile = document.getElementById(
      'btn-import-file',
    ) as HTMLButtonElement;
    this.renderOptions(
      this.algorithmOptions,
      this.speedOptions,
      this.weightOptions,
    );
  }

  public renderOptions(
    algorithms: { value: AlgorithmEnum; label: string }[],
    speeds: { value: SpeedEnum; label: string }[],
    weights: { value: WeightEnum; label: string }[],
  ): void {
    this.selectAlgorithm.innerHTML = algorithms
      .map(
        (option) => `<option value="${option.value}">${option.label}</option>`,
      )
      .join('');
    this.selectSpeed.innerHTML = speeds
      .map(
        (option) =>
          `<option value="${option.value}" ${
            option.value === SpeedEnum.MEDIUM ? 'selected' : ''
          }>${option.label}</option>`,
      )
      .join('');
    this.selectWeight.innerHTML = weights
      .map(
        (option) => `<option value="${option.value}">${option.label}</option>`,
      )
      .join('');
  }

  public bindSelectWeightChange(): void {
    this.selectWeight.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const weight = parseInt(target.value, 10);
      document.dispatchEvent(
        new CustomEvent('weight-change', { detail: { weight } }),
      );
    });
  }

  public bindSelectAlgorithmChange(): void {
    this.selectAlgorithm.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const selectedAlgorithm = target.value as AlgorithmEnum;
      document.dispatchEvent(
        new CustomEvent('algorithm-change', {
          detail: { algorithm: selectedAlgorithm },
        }),
      );
    });
  }

  public bindSelectSpeedChange(): void {
    this.selectSpeed.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      const selectedSpeed = target.value as unknown as SpeedEnum;
      document.dispatchEvent(
        new CustomEvent('speed-change', {
          detail: { speed: selectedSpeed },
        }),
      );
    });
  }

  public bindButtonRunClick(handle: () => void): void {
    this.btnRun.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonPauseClick(handle: () => void): void {
    this.btnPause.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonResetGridClick(handle: () => void): void {
    this.btnResetGrid.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonClearPathClick(handle: () => void): void {
    this.btnClearPath.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonClearWallsClick(handle: () => void): void {
    this.btnClearWalls.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonGenerateMazeClick(handle: () => void): void {
    this.btnGenerateMaze.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonExportFile(handle: () => void): void {
    this.btnExportFile.addEventListener('click', () => {
      handle();
    });
  }

  public bindButtonImportFile(handle: () => void): void {
    this.btnImportFile.addEventListener('click', () => {
      handle();
    });
  }

  public getBtnRun(): HTMLButtonElement {
    return this.btnRun;
  }

  public getBtnPause(): HTMLButtonElement {
    return this.btnPause;
  }

  public getSelectAlgorithm(): HTMLSelectElement {
    return this.selectAlgorithm;
  }

  public getBtnResetGrid(): HTMLButtonElement {
    return this.btnResetGrid;
  }

  public getBtnClearPath(): HTMLButtonElement {
    return this.btnClearPath;
  }

  public getBtnClearWalls(): HTMLButtonElement {
    return this.btnClearWalls;
  }

  public getBtnGenerateMaze(): HTMLButtonElement {
    return this.btnGenerateMaze;
  }
}
