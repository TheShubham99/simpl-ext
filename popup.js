document.addEventListener('DOMContentLoaded', function () {
    const addToWishlistButton = document.getElementById('addToWishlist');
    const successMessage = document.getElementById('successMessage');

    addToWishlistButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: addToWishlistOnPage
            }, function (results) {
                const success = results[0].result;
                if (success) {
                    successMessage.classList.remove('hidden');
                }
            });
        });
    });
});







