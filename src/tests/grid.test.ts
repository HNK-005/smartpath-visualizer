import { Grid } from "../models/grid";
import { Node } from "../models/node";

describe("Grid model", () => {
    test("constructs grid with correct dimensions and nodes", () => {
        const rows = 3;
        const cols = 4;
        const g = new Grid(rows, cols);

        expect(g.getNumRows()).toBe(rows);
        expect(g.getNumCols()).toBe(cols);

        const n = g.getNode(1, 2);
        expect(n).toBeInstanceOf(Node);
        expect(n.getRow()).toBe(1);
        expect(n.getCol()).toBe(2);

        // Ensure distinct node instances
        const n00 = g.getNode(0, 0);
        const n01 = g.getNode(0, 1);
        expect(n00).not.toBe(n01);
    });
});
