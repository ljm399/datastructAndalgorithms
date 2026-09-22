export type Color = "RED" | "BLACK"

export class RedBlackTreeNode<K, V> {
    color: Color = "RED"
    left: RedBlackTreeNode<K, V> | null = null
    right: RedBlackTreeNode<K, V> | null = null
    parent: RedBlackTreeNode<K, V> | null = null

    constructor(public key: K, public value: V) {}
}

/** A red-black tree. Keys are ordered by the supplied comparator. */
export default class RedBlackTree<K, V> {
    private root: RedBlackTreeNode<K, V> | null = null
    private readonly compare: (a: K, b: K) => number

    constructor(compare?: (a: K, b: K) => number) {
        this.compare = compare ?? ((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0
        })
    }

    getRoot(): RedBlackTreeNode<K, V> | null { return this.root }

    get(key: K): V | undefined {
        return this.findNode(key)?.value
    }

    has(key: K): boolean { return this.findNode(key) !== null }

    insert(key: K, value: V): RedBlackTreeNode<K, V> {
        let parent: RedBlackTreeNode<K, V> | null = null
        let current = this.root
        while (current) {
            parent = current
            const order = this.compare(key, current.key)
            if (order === 0) {
                current.value = value
                return current
            }
            current = order < 0 ? current.left : current.right
        }

        const node = new RedBlackTreeNode(key, value)
        node.parent = parent
        if (!parent) this.root = node
        else if (this.compare(key, parent.key) < 0) parent.left = node
        else parent.right = node
        this.fixAfterInsert(node)
        return node
    }

    /** Alias matching the existing tree examples in this repository. */
    inserted(key: K, value: V): RedBlackTreeNode<K, V> { return this.insert(key, value) }

    remove(key: K): boolean {
        const target = this.findNode(key)
        if (!target) return false

        let removed = target
        let removedColor = removed.color
        let replacement: RedBlackTreeNode<K, V> | null
        let replacementParent: RedBlackTreeNode<K, V> | null

        if (!target.left) {
            replacement = target.right
            replacementParent = target.parent
            this.transplant(target, target.right)
        } else if (!target.right) {
            replacement = target.left
            replacementParent = target.parent
            this.transplant(target, target.left)
        } else {
            removed = this.minimum(target.right)
            removedColor = removed.color
            replacement = removed.right
            if (removed.parent === target) {
                replacementParent = removed
                if (replacement) replacement.parent = removed
            } else {
                replacementParent = removed.parent
                this.transplant(removed, removed.right)
                removed.right = target.right
                removed.right.parent = removed
            }
            this.transplant(target, removed)
            removed.left = target.left
            removed.left.parent = removed
            removed.color = target.color
        }

        if (removedColor === "BLACK") this.fixAfterDelete(replacement, replacementParent)
        target.parent = target.left = target.right = null
        return true
    }

    search(key: K): boolean { return this.has(key) }

    inOrder(): Array<{ key: K, value: V }> {
        const result: Array<{ key: K, value: V }> = []
        const visit = (node: RedBlackTreeNode<K, V> | null): void => {
            if (!node) return
            visit(node.left)
            result.push({ key: node.key, value: node.value })
            visit(node.right)
        }
        visit(this.root)
        return result
    }

    /** Throws when any of the five red-black tree properties is violated. */
    validate(): true {
        if (this.root && this.root.color !== "BLACK") throw new Error("根节点必须是黑色")
        const check = (node: RedBlackTreeNode<K, V> | null): number => {
            if (!node) return 1
            if (node.color === "RED" && (this.colorOf(node.left) === "RED" || this.colorOf(node.right) === "RED")) {
                throw new Error("红色节点不能有红色子节点")
            }
            const left = check(node.left)
            const right = check(node.right)
            if (left !== right) throw new Error("任意路径的黑高必须相同")
            return left + (node.color === "BLACK" ? 1 : 0)
        }
        check(this.root)
        return true
    }

    private findNode(key: K): RedBlackTreeNode<K, V> | null {
        let current = this.root
        while (current) {
            const order = this.compare(key, current.key)
            if (order === 0) return current
            current = order < 0 ? current.left : current.right
        }
        return null
    }

    private colorOf(node: RedBlackTreeNode<K, V> | null): Color { return node?.color ?? "BLACK" }
    private parentOf(node: RedBlackTreeNode<K, V> | null): RedBlackTreeNode<K, V> | null { return node?.parent ?? null }
    private setColor(node: RedBlackTreeNode<K, V> | null, color: Color): void { if (node) node.color = color }

    private rotateLeft(node: RedBlackTreeNode<K, V>): void {
        const pivot = node.right
        if (!pivot) return
        node.right = pivot.left
        if (pivot.left) pivot.left.parent = node
        pivot.parent = node.parent
        if (!node.parent) this.root = pivot
        else if (node === node.parent.left) node.parent.left = pivot
        else node.parent.right = pivot
        pivot.left = node
        node.parent = pivot
    }

    private rotateRight(node: RedBlackTreeNode<K, V>): void {
        const pivot = node.left
        if (!pivot) return
        node.left = pivot.right
        if (pivot.right) pivot.right.parent = node
        pivot.parent = node.parent
        if (!node.parent) this.root = pivot
        else if (node === node.parent.right) node.parent.right = pivot
        else node.parent.left = pivot
        pivot.right = node
        node.parent = pivot
    }

    private fixAfterInsert(node: RedBlackTreeNode<K, V>): void {
        let current = node
        while (current.parent?.color === "RED") {
            const parent = current.parent
            const grandparent = parent.parent!
            if (parent === grandparent.left) {
                const uncle = grandparent.right
                if (this.colorOf(uncle) === "RED") {
                    parent.color = uncle!.color = "BLACK"
                    grandparent.color = "RED"
                    current = grandparent
                } else {
                    if (current === parent.right) { current = parent; this.rotateLeft(current) }
                    current.parent!.color = "BLACK"
                    grandparent.color = "RED"
                    this.rotateRight(grandparent)
                }
            } else {
                const uncle = grandparent.left
                if (this.colorOf(uncle) === "RED") {
                    parent.color = uncle!.color = "BLACK"
                    grandparent.color = "RED"
                    current = grandparent
                } else {
                    if (current === parent.left) { current = parent; this.rotateRight(current) }
                    current.parent!.color = "BLACK"
                    grandparent.color = "RED"
                    this.rotateLeft(grandparent)
                }
            }
        }
        if (this.root) this.root.color = "BLACK"
    }

    private fixAfterDelete(node: RedBlackTreeNode<K, V> | null, parent: RedBlackTreeNode<K, V> | null): void {
        let current = node
        let currentParent = parent
        while (current !== this.root && this.colorOf(current) === "BLACK") {
            if (!currentParent) break
            if (current === currentParent.left) {
                let sibling = currentParent.right
                if (this.colorOf(sibling) === "RED") {
                    sibling!.color = "BLACK"; currentParent.color = "RED"; this.rotateLeft(currentParent); sibling = currentParent.right
                }
                if (this.colorOf(sibling?.left ?? null) === "BLACK" && this.colorOf(sibling?.right ?? null) === "BLACK") {
                    this.setColor(sibling, "RED"); current = currentParent; currentParent = current.parent
                } else {
                    if (this.colorOf(sibling?.right ?? null) === "BLACK") { this.setColor(sibling?.left ?? null, "BLACK"); this.setColor(sibling, "RED"); if (sibling) this.rotateRight(sibling); sibling = currentParent.right }
                    this.setColor(sibling, currentParent.color); currentParent.color = "BLACK"; this.setColor(sibling?.right ?? null, "BLACK"); this.rotateLeft(currentParent); current = this.root; currentParent = null
                }
            } else {
                let sibling = currentParent.left
                if (this.colorOf(sibling) === "RED") {
                    sibling!.color = "BLACK"; currentParent.color = "RED"; this.rotateRight(currentParent); sibling = currentParent.left
                }
                if (this.colorOf(sibling?.right ?? null) === "BLACK" && this.colorOf(sibling?.left ?? null) === "BLACK") {
                    this.setColor(sibling, "RED"); current = currentParent; currentParent = current.parent
                } else {
                    if (this.colorOf(sibling?.left ?? null) === "BLACK") { this.setColor(sibling?.right ?? null, "BLACK"); this.setColor(sibling, "RED"); if (sibling) this.rotateLeft(sibling); sibling = currentParent.left }
                    this.setColor(sibling, currentParent.color); currentParent.color = "BLACK"; this.setColor(sibling?.left ?? null, "BLACK"); this.rotateRight(currentParent); current = this.root; currentParent = null
                }
            }
        }
        this.setColor(current, "BLACK")
    }

    private transplant(from: RedBlackTreeNode<K, V>, to: RedBlackTreeNode<K, V> | null): void {
        if (!from.parent) this.root = to
        else if (from === from.parent.left) from.parent.left = to
        else from.parent.right = to
        if (to) to.parent = from.parent
    }

    private minimum(node: RedBlackTreeNode<K, V>): RedBlackTreeNode<K, V> {
        while (node.left) node = node.left
        return node
    }
}
