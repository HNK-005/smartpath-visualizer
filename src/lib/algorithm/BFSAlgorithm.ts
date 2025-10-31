import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { MatrixModel, NodeModel } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export class BFSAlgorithm extends PathfindingAlgorithm {
    findPath(board: MatrixModel, start: NodeModel, end: NodeModel): PathfindingResult {
        const queue: NodeModel[] = [start];
        const visited = new Set<NodeModel>([start]);
        const visitedOrder: NodeModel[] = [];

        while (queue.length > 0) {
            const current = queue.shift()!;
            visitedOrder.push(current);

            if (current === end) {
                return {
                    visitedNodesInOrder: visitedOrder,
                    shortestPath: this.reconstructPath(end),
                };
            }

            for (const neighbor of this.getNeighbors(current, board)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    neighbor.setPrevious(current);
                    queue.push(neighbor);
                }
            }
        }

        return {
            visitedNodesInOrder: visitedOrder,
            shortestPath: [],
        };
    }
}
