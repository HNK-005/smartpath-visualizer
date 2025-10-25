import { Node } from "../models/node";

describe("Node model", () => {
    test("default properties", () => {
        const n = new Node(2, 3);
        expect(n.getRow()).toBe(2);
        expect(n.getCol()).toBe(3);
        expect(n.getIsWall()).toBe(false);
        expect(n.getIsStart()).toBe(false);
        expect(n.getIsEnd()).toBe(false);
        expect(n.getDistance()).toBe(Infinity);
        expect(n.getHeuristic()).toBe(0);
        expect(n.getPrevious()).toBeNull();
    });

    test("setters and getters", () => {
        const a = new Node(0, 0);
        const b = new Node(1, 1);

        a.setWall(true);
        expect(a.getIsWall()).toBe(true);

        a.setStart(true);
        expect(a.getIsStart()).toBe(true);

        a.setEnd(true);
        expect(a.getIsEnd()).toBe(true);

        a.setDistance(42);
        expect(a.getDistance()).toBe(42);

        a.setHeuristic(7);
        expect(a.getHeuristic()).toBe(7);

        a.setPrevious(b);
        expect(a.getPrevious()).toBe(b);

        a.setPrevious(null);
        expect(a.getPrevious()).toBeNull();
    });
});
