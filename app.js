// UI variables
const form = document.querySelector("form");
const formInput = document.querySelector("#input-url");
const outputField = document.querySelector(".output-field");
const spinner = document.querySelector(".loader");
const outputUrl = document.querySelector(".output-url");
const label = document.querySelector("label");
const copy = document.querySelector(".shorten");

// listen for form submit
form.addEventListener("submit", e => {
    e.preventDefault();
    if (formInput.value === "") {
        showErrors("Enter a url", "rgba(185, 7, 7, 0.932)", "block");
    } else {
        // show spinner
        showSpinner('block')
        fetch(`https://api.shrtco.de/v2/shorten?url=${formInput.value}`)
            .then(data => data.json())
            .then(data => {
                // remove spinner after content loads
                showSpinner('none')
                outputUrl.value = data.result.full_short_link;
                outputField.style.display = "flex";
                // remove errors
                showErrors('', 'black', '')
            })
            .catch(err => console.log(err));
    }
});

// error message for input,label,spinner
function showErrors(message, color, display) {
    label.style.display = display;
    formInput.style.borderColor = color;
    label.textContent = message;

    // remove error message after 2s
    setTimeout(() => {
        label.remove();
    }, 2000);
}

function showSpinner(display) {
    spinner.style.display = display;
}

// listen for copy
copy.addEventListener('click', () => {
    // get text
    const copiedText = document.querySelector('.output-url');
    // select text
    copiedText.focus()
    copiedText.select()

    /* Copy the text inside the text field */
    document.execCommand("copy");

    copy.textContent = 'copied!'
})
