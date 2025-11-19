export class PauseableAsync {
  private pauseResolve: (() => void) | null = null;
  private isPaused: boolean = false;
  constructor(private task: () => Promise<void>) {}

  public async pausePoint(): Promise<void> {
    if (!this.isPaused) return;
    return new Promise<void>((resolve) => {
      this.pauseResolve = resolve;
    });
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    if (this.pauseResolve) {
      this.pauseResolve();
      this.pauseResolve = null;
    }
    this.isPaused = false;
  }

  public start() {
    this.task();
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }
}
