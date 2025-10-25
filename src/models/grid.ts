import { Node } from "./node";

export class Grid {
    private nodes: Node[][];
    private numRows: number;
    private numCols: number;

    constructor(numRows: number, numCols: number) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.nodes = [];
        for (let row = 0; row < numRows; row++) {
            const currentRow: Node[] = [];
            for (let col = 0; col < numCols; col++) {
                currentRow.push(new Node(row, col));
            }
            this.nodes.push(currentRow);
        }
    }

    public getNode(row: number, col: number): Node {
        return this.nodes[row][col];
    }

    public getNumRows(): number {
        return this.numRows;
    }
    public getNumCols(): number {
        return this.numCols;
    }
}
