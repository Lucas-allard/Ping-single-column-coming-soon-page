// verify Email before submit
const verifyEmail = (email) => {
    // check if email is valid
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
}

// if email is invalid, show error message
const createError = (message, id) => {

    if (document.getElementById(id)) {
        // if error message already exists, remove it
        document.getElementById(id).remove();
    }

    // create error message
    const error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = message;
    error.id = id;
    return error;
}


window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("contact-form").addEventListener("submit", async (event) => {
        // prevent form from submitting
        event.preventDefault();
        // get form
        const form = event.target;
        //get data from form
        const data = new FormData(form);
        // get form button
        const button = form.querySelector("button[type='submit']");
        // get email value
        const email = data.get("email");
        // get error message
        const error = document.getElementById("email-error");

        if (!email) {
            // if email is empty, show error message
            form.appendChild(createError(
                "Whoops! It looks like you forgot to add your email",
                "email-error")
            );
        } else if (!verifyEmail(email)) {
            // if email is invalid, show error message
            form.appendChild(createError(
                "Please enter a valid email address",
                "email-error")
            )
        }


        if (email && verifyEmail(email)) {
            // if email is valid, disable button
            button.disabled = true;
            button.innerHTML = "Sending...";

            // send data to server
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            // get response from server
            if (response.ok) {
                // if response is ok, clear form, clear error message, show success message
                form.reset();
                error ? error.remove() : null;
                form.innerHTML = "<h2>Thanks for subscribing!</h2>";
            }
        }
    })
})
