import { AlgorithmType } from '../lib/algorithm/AlgorithmFactory';
import { FileHandler } from '../lib/file';
import { NavView } from '../views';

export class NavController {
  private view: NavView;
  private isVisualizing: boolean = false;

  constructor(navView: NavView) {
    this.view = navView;
    this.view.initialize();
  }

  public toggleButton(): void {
    const visualizeButton = this.view.getVisualizeButton();
    if (visualizeButton.classList.contains('btn-start')) {
      visualizeButton.classList.remove('btn-start');
      visualizeButton.classList.add('btn-stop');
      visualizeButton.textContent = 'Stop Visualizing';
      this.isVisualizing = true;
    } else {
      visualizeButton.classList.remove('btn-stop');
      visualizeButton.classList.add('btn-start');
      visualizeButton.textContent = 'Visualize';
      this.isVisualizing = false;
    }
  }

  public buttonDisabled(state: boolean): void {
    this.view.getClearPathButton().disabled = state;
    this.view.getClearWallsButton().disabled = state;
    this.view.getClearBoardButton().disabled = state;
    this.view.getSaveFileButton().disabled = state;
    this.view.getOpenFileButton().disabled = state;
  }

  public handleVisualize(
    run: (algorithm: AlgorithmType) => Promise<any>,
    stop: () => void,
  ): void {
    const visualizeButton = this.view.getVisualizeButton();
    visualizeButton.addEventListener('click', async () => {
      this.toggleButton();
      if (this.isVisualizing) {
        this.buttonDisabled(true);
        const selectedAlgorithm = this.view.getAlgorithmSelectElement().value;
        await run(selectedAlgorithm as AlgorithmType);
        if (this.isVisualizing) {
          this.toggleButton();
        }
        this.buttonDisabled(false);
      } else {
        stop();
      }
    });
  }

  handleClearWalls(clear: () => void): void {
    const clearWallsButton = this.view.getClearWallsButton();
    clearWallsButton.addEventListener('click', () => {
      if (!this.isVisualizing) {
        clear();
      }
    });
  }

  handleClearPath(clear: () => void): void {
    const clearPathButton = this.view.getClearPathButton();
    clearPathButton.addEventListener('click', () => {
      if (!this.isVisualizing) {
        clear();
      }
    });
  }

  handleClearBoard(clear: () => void): void {
    const clearBoardButton = this.view.getClearBoardButton();
    clearBoardButton.addEventListener('click', () => {
      if (!this.isVisualizing) {
        clear();
      }
    });
  }

  handleSaveFile(save: () => string): void {
    const saveFileButton = this.view.getSaveFileButton();
    saveFileButton.addEventListener('click', async () => {
      if (!this.isVisualizing) {
        const text = save();
        if (text) {
          const fileHandle = new FileHandler();
          await fileHandle.saveFile(text);
          alert('File saved successfully!');
        }
      }
    });
  }

  handleOpenFile(open: (content: string) => void): void {
    const openFileButton = this.view.getOpenFileButton();
    openFileButton.addEventListener('click', async () => {
      if (!this.isVisualizing) {
        const fileHandle = new FileHandler();
        const content = await fileHandle.readFile();
        if (content) {
          open(content);
        }
      }
    });
  }

  public getIsVisualizing(): boolean {
    return this.isVisualizing;
  }
}
