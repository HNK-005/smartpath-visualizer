import { PathfindingAlgorithm } from "./PathfindingAlgorithm";
import { MatrixModel, NodeModel } from "../../models";
import { PathfindingResult } from "./PathfindingResult";

export class AStarAlgorithm extends PathfindingAlgorithm {
    private heuristic(a: NodeModel, b: NodeModel): number {
        return (
            Math.abs(a.getRow() - b.getRow()) +
            Math.abs(a.getCol() - b.getCol())
        );
    }

    findPath(
        grid: MatrixModel,
        start: NodeModel,
        end: NodeModel
    ): PathfindingResult {
        const openSet: NodeModel[] = [start];
        const visitedOrder: NodeModel[] = [];
        const gScore = new Map<NodeModel, number>([[start, 0]]);
        const fScore = new Map<NodeModel, number>([
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
