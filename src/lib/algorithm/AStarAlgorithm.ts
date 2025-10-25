import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { Grid, Node } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export class AStarAlgorithm extends PathfindingAlgorithm {
    private heuristic(a: Node, b: Node): number {
        return (
            Math.abs(a.getRow() - b.getRow()) +
            Math.abs(a.getCol() - b.getCol())
        );
    }

    findPath(grid: Grid, start: Node, end: Node): PathfindingResult {
        const openSet: Node[] = [start];
        const visitedOrder: Node[] = [];
        const gScore = new Map<Node, number>([[start, 0]]);
        const fScore = new Map<Node, number>([
            [start, this.heuristic(start, end)],
        ]);

        while (openSet.length > 0) {
            openSet.sort(
                (a, b) =>
                    (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity)
            );
            const current = openSet.shift()!;
            visitedOrder.push(current);

            if (current === end) {
                return {
                    visitedNodesInOrder: visitedOrder,
                    shortestPath: this.reconstructPath(end),
                };
            }

            for (const neighbor of this.getNeighbors(current, grid)) {
                const tentativeG = (gScore.get(current) ?? Infinity) + 1;
                if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
                    neighbor.setPrevious(current);
                    gScore.set(neighbor, tentativeG);
                    fScore.set(
                        neighbor,
                        tentativeG + this.heuristic(neighbor, end)
                    );
                    if (!openSet.includes(neighbor)) openSet.push(neighbor);
                }
            }
        }

        return {
            visitedNodesInOrder: visitedOrder,
            shortestPath: [],
        };
    }
}
