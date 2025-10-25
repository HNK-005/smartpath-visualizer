import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { Grid, Node } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export class DFSAlgorithm extends PathfindingAlgorithm {
    findPath(grid: Grid, start: Node, end: Node): PathfindingResult {
        const stack: Node[] = [start];
        const visited = new Set<Node>([start]);
        const visitedOrder: Node[] = [];

        while (stack.length > 0) {
            const current = stack.pop()!;
            visitedOrder.push(current);

            if (current === end) {
                return {
                    visitedNodesInOrder: visitedOrder,
                    shortestPath: this.reconstructPath(end),
                };
            }

            for (const neighbor of this.getNeighbors(current, grid)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    neighbor.setPrevious(current);
                    stack.push(neighbor);
                }
            }
        }

        return {
            visitedNodesInOrder: visitedOrder,
            shortestPath: [],
        };
    }
}
