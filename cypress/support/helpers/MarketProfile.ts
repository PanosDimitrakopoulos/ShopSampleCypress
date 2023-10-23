export function selectProductFromMenu(category: string, productIndex: string) {
    return `#${category}locator > .locator(${productIndex}) > .locator`;
}

