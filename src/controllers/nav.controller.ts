import { FileHandler } from '../lib/file';
import { NavView } from '../views';

export class NavController {
  private view: NavView;

  constructor(navView: NavView) {
    this.view = navView;
  }

  public hanldeSelectWeightChange(): void {
    this.view.bindSelectWeightChange();
  }

  public handleSelectAlgorithmChange(): void {
    this.view.bindSelectAlgorithmChange();
  }

  public handleSelectSpeedChange(): void {
    this.view.bindSelectSpeedChange();
  }

  public handleButtonRunClick(handle: () => void): void {
    this.view.bindButtonRunClick(handle);
  }

  public handleButtonPauseClick(handle: () => void): void {
    this.view.bindButtonPauseClick(handle);
  }

  public handleButtonResetGridClick(handle: () => void): void {
    this.view.bindButtonResetGridClick(handle);
  }

  public handleButtonClearPathClick(handle: () => void): void {
    this.view.bindButtonClearPathClick(handle);
  }

  public handleButtonClearWallsClick(handle: () => void): void {
    this.view.bindButtonClearWallsClick(handle);
  }

  public handleButtonGenerateMazeClick(handle: () => void): void {
    this.view.bindButtonGenerateMazeClick(handle);
  }

  public handleButtonExportFile(exportFile: () => string): void {
    this.view.bindButtonExportFile(() => {
      const fileHandler = new FileHandler();
      const content = exportFile();
      fileHandler.saveFile(content);
    });
  }

  public handleButtonImportFile(importFile: (content: string) => void): void {
    this.view.bindButtonImportFile(() => {
      const fileHandler = new FileHandler();

      fileHandler.readFile().then((content) => {
        if (content) importFile(content);
      });
    });
  }
}
