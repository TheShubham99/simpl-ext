function addToWishlistOnPage() {
    // Insert code here to interact with the Shopify store page and add to wishlist
}

const productPagePattern = /^https:\/\/\w+\.myshopify\.com\/products\/\w+/;

const loadUI = () => {
    const newDiv = document.createElement('div');

    // Set the innerHTML of the new <div> with your desired HTML content
    newDiv.innerHTML = `<div style="position: fixed;top: 0;right: 0;width: 100px;height: 100px;z-index:100;">hi</div>`

    document.body.appendChild(newDiv)
}

if (productPagePattern.test(window.location.href)) {
    // Send a message to the background script to open the popup
    loadUI()
}

