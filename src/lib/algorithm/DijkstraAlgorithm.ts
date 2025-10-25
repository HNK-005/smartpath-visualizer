import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { Grid, Node } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export class DijkstraAlgorithm extends PathfindingAlgorithm {
    findPath(grid: Grid, start: Node, end: Node): PathfindingResult {
        const visitedOrder: Node[] = [];
        start.setDistance(0);

        const unvisited: Node[] = [];
        for (let r = 0; r < grid.getNumRows(); r++) {
            for (let c = 0; c < grid.getNumCols(); c++) {
                unvisited.push(grid.getNode(r, c));
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

            for (const neighbor of this.getNeighbors(current, grid)) {
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
