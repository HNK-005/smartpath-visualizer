export class Heap<T> {
  protected heap: T[];

  constructor(data: T[] = []) {
    this.heap = data;
  }

  getParentIndex(i: number) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i: number) {
    return 2 * i + 1;
  }
  getRightChildIndex(i: number) {
    return 2 * i + 2;
  }

  swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size() {
    return this.heap.length;
  }
}

export class MinHeap<T> extends Heap<T> {
  private comparator: (a: T, b: T) => number;
  private indexMap = new Map<T, number>(); // Map<Item, IndexInHeapArray>

  constructor(data: T[] = [], comparator: (a: T, b: T) => number) {
    super(data); // this.heap = data
    this.comparator = comparator;

    // FIX 1: Populate the indexMap with initial data
    this.heap.forEach((item, index) => {
      this.indexMap.set(item, index);
    });

    this.buildHeap();
  }

  // FIX 2: Override the swap method to update the indexMap
  swap(i: number, j: number) {
    const itemI = this.heap[i];
    const itemJ = this.heap[j];

    // Swap items in the array
    super.swap(i, j);

    // Update their positions in the map
    this.indexMap.set(itemI, j);
    this.indexMap.set(itemJ, i);
  }

  private buildHeap() {
    for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  contains(item: T): boolean {
    return this.indexMap.has(item);
  }

  insert(item: T) {
    this.heap.push(item);
    this.indexMap.set(item, this.heap.length - 1);
    this.heapifyUp(this.heap.length - 1);
  }

  decreaseKey(item: T) {
    const idx = this.indexMap.get(item);
    if (idx !== undefined) {
      this.heapifyUp(idx);
    }
  }

  shift(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop();

    this.indexMap.delete(root);

    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.indexMap.set(last, 0);
      this.heapifyDown(0);
    }

    return root;
  }

  private heapifyUp(i: number) {
    let currentIndex = i;
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (
        this.comparator(this.heap[currentIndex], this.heap[parentIndex]) >= 0
      ) {
        break;
      }
      this.swap(currentIndex, parentIndex); // Use the overridden swap
      currentIndex = parentIndex;
    }
  }

  private heapifyDown(i: number) {
    const size = this.size();
    let currentIndex = i;

    while (true) {
      const left = this.getLeftChildIndex(currentIndex);
      const right = this.getRightChildIndex(currentIndex);
      let smallest = currentIndex;

      if (
        left < size &&
        this.comparator(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < size &&
        this.comparator(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === currentIndex) {
        break;
      }

      this.swap(currentIndex, smallest); // Use the overridden swap
      currentIndex = smallest;
    }
  }
}
