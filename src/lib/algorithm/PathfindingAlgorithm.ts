import { Grid, Node } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export abstract class PathfindingAlgorithm {
    abstract findPath(grid: Grid, start: Node, end: Node): PathfindingResult;

    protected getNeighbors(node: Node, grid: Grid): Node[] {
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        const neighbors: Node[] = [];

        for (const [dRow, dCol] of directions) {
            const newRow = node.getRow() + dRow;
            const newCol = node.getCol() + dCol;

            if (
                newRow >= 0 &&
                newCol >= 0 &&
                newRow < grid.getNumRows() &&
                newCol < grid.getNumCols()
            ) {
                const neighbor = grid.getNode(newRow, newCol);
                if (!neighbor.getIsWall()) {
                    neighbors.push(neighbor);
                }
            }
        }

        return neighbors;
    }

    protected reconstructPath(endNode: Node): Node[] {
        const path: Node[] = [];
        let current: Node | null = endNode;

        while (current) {
            path.unshift(current);
            current = current.getPrevious();
        }

        return path;
    }
}
