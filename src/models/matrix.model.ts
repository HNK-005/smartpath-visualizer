import { NodeModel } from "./node.model";

export class MatrixModel {
    private nodes: NodeModel[][];
    private numRows: number;
    private numCols: number;

    constructor(numRows: number, numCols: number) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.nodes = [];
        this.initializeMatrix();
    }

    initializeMatrix(): void {
        for (let row = 0; row < this.numRows; row++) {
            const currentRow: NodeModel[] = [];
            for (let col = 0; col < this.numCols; col++) {
                currentRow.push(new NodeModel(row, col));
            }
            this.nodes.push(currentRow);
        }
    }

    public getNode(row: number, col: number): NodeModel {
        return this.nodes[row][col];
    }

    public getNumRows(): number {
        return this.numRows;
    }
    public getNumCols(): number {
        return this.numCols;
    }
}
