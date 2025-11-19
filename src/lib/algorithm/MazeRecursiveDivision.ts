import { MatrixModel, NodeModel } from '../../models';

export class MazeRecursiveDivision {
  constructor(private grid: MatrixModel) {}

  public generate(start: NodeModel, end: NodeModel): void {
    const rows = this.grid.getNumRows();
    const cols = this.grid.getNumCols();

    // Tạo khung viền tường
    for (let c = 0; c < cols; c++) {
      this.setWallSafe(0, c, start, end);
      this.setWallSafe(rows - 1, c, start, end);
    }
    for (let r = 0; r < rows; r++) {
      this.setWallSafe(r, 0, start, end);
      this.setWallSafe(r, cols - 1, start, end);
    }

    // Gọi đệ quy bên trong khung
    this.divide(1, 1, rows - 2, cols - 2, start, end);
  }

  private divide(
    rowStart: number,
    colStart: number,
    rowEnd: number,
    colEnd: number,
    start: NodeModel,
    end: NodeModel,
  ): void {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
      return;
    }

    const horizontal = this.shouldDivideHorizontally(
      rowStart,
      colStart,
      rowEnd,
      colEnd,
    );

    if (horizontal) {
      // Chọn hàng chặn tường
      const possibleRows: number[] = [];
      for (let r = rowStart + 1; r < rowEnd; r++) {
        if (r % 2 === 0) possibleRows.push(r);
      }
      if (possibleRows.length === 0) return;
      const wallRow =
        possibleRows[Math.floor(Math.random() * possibleRows.length)];

      // Chọn cột lẻ để chừa lối đi
      const possibleCols: number[] = [];
      for (let c = colStart; c <= colEnd; c++) {
        if (c % 2 === 1) possibleCols.push(c);
      }
      const passageCol =
        possibleCols[Math.floor(Math.random() * possibleCols.length)];

      for (let c = colStart; c <= colEnd; c++) {
        if (c === passageCol) continue;
        this.setWallSafe(wallRow, c, start, end);
      }

      // Đệ quy 2 vùng
      this.divide(rowStart, colStart, wallRow - 1, colEnd, start, end);
      this.divide(wallRow + 1, colStart, rowEnd, colEnd, start, end);
    } else {
      // Chọn cột chặn tường
      const possibleCols: number[] = [];
      for (let c = colStart + 1; c < colEnd; c++) {
        if (c % 2 === 0) possibleCols.push(c);
      }
      if (possibleCols.length === 0) return;
      const wallCol =
        possibleCols[Math.floor(Math.random() * possibleCols.length)];

      // Chọn hàng lẻ để  chừa lối đi
      const possibleRows: number[] = [];
      for (let r = rowStart; r <= rowEnd; r++) {
        if (r % 2 === 1) possibleRows.push(r);
      }
      const passageRow =
        possibleRows[Math.floor(Math.random() * possibleRows.length)];

      for (let r = rowStart; r <= rowEnd; r++) {
        if (r === passageRow) continue;
        this.setWallSafe(r, wallCol, start, end);
      }

      // Đệ quy 2 vùng
      this.divide(rowStart, colStart, rowEnd, wallCol - 1, start, end);
      this.divide(rowStart, wallCol + 1, rowEnd, colEnd, start, end);
    }
  }

  private shouldDivideHorizontally(
    rowStart: number,
    colStart: number,
    rowEnd: number,
    colEnd: number,
  ): boolean {
    const height = rowEnd - rowStart;
    const width = colEnd - colStart;
    if (height > width) return true;
    if (width > height) return false;
    return Math.random() < 0.5;
  }

  private setWallSafe(
    r: number,
    c: number,
    start: NodeModel,
    end: NodeModel,
  ): void {
    const node = this.grid.getNode(r, c);
    if (node === start || node === end) return;
    node.setWall(true);
  }
}