import { MatrixModel, NodeModel } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export abstract class PathfindingAlgorithm {
    abstract findPath(
        board: MatrixModel,
        start: NodeModel,
        end: NodeModel
    ): PathfindingResult;

    protected getNeighbors(node: NodeModel, board: MatrixModel): NodeModel[] {
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        const neighbors: NodeModel[] = [];

        for (const [dRow, dCol] of directions) {
            const newRow = node.getRow() + dRow;
            const newCol = node.getCol() + dCol;

            if (
                newRow >= 0 &&
                newCol >= 0 &&
                newRow < board.getNumRows() &&
                newCol < board.getNumCols()
            ) {
                const neighbor = board.getNode(newRow, newCol);
                if (!neighbor.getIsWall()) {
                    neighbors.push(neighbor);
                }
            }
        }

        return neighbors;
    }

    protected reconstructPath(endNode: NodeModel): NodeModel[] {
        const path: NodeModel[] = [];
        let current: NodeModel | null = endNode;

        while (current) {
            path.unshift(current);
            current = current.getPrevious();
        }

        return path;
    }
}
