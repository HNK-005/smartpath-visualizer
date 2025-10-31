import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { MatrixModel, NodeModel } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export class DijkstraAlgorithm extends PathfindingAlgorithm {
    findPath(
        board: MatrixModel,
        start: NodeModel,
        end: NodeModel
    ): PathfindingResult {
        const visitedOrder: NodeModel[] = [];
        start.setDistance(0);

        const unvisited: NodeModel[] = [];
        for (let r = 0; r < board.getNumRows(); r++) {
            for (let c = 0; c < board.getNumCols(); c++) {
                unvisited.push(board.getNode(r, c));
            }
        }

        while (unvisited.length > 0) {
            unvisited.sort((a, b) => a.getDistance() - b.getDistance());
            const current = unvisited.shift()!;
            if (current.getIsWall()) continue;
            if (current.getDistance() === Infinity) break;

            visitedOrder.push(current);
            if (current === end) {
                return {
                    visitedNodesInOrder: visitedOrder,
                    shortestPath: this.reconstructPath(end),
                };
            }

            for (const neighbor of this.getNeighbors(current, board)) {
                const newDist = current.getDistance() + 1;
                if (newDist < neighbor.getDistance()) {
                    neighbor.setDistance(newDist);
                    neighbor.setPrevious(current);
                }
            }
        }

        return {
            visitedNodesInOrder: visitedOrder,
            shortestPath: [],
        };
    }
}
