function isPalindrome(x: number): boolean {
    // Negative numbers and non-zero numbers ending in 0 cannot be palindromes.
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false
    }

    let reversedHalf = 0

    // Reverse only half of the number to avoid unnecessary work and overflow.
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + x % 10
        x = Math.floor(x / 10)
    }

    // For odd digit counts, discard the middle digit from reversedHalf.
    return x === reversedHalf || x === Math.floor(reversedHalf / 10)
}

export {}
