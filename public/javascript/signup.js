async function signupFormHandler(event) {

    event.preventDefault();

    const user_name = document.querySelector('#username-signup').value.trim();

    const password = document.querySelector('#password-signup').value.trim();

    if (user_name && password) {

        const response = await fetch('/api/user', {

            method: 'POST',

            body: JSON.stringify({ user_name, password }),
            
            headers: { 'Content-Type': 'application/json' }

        });

        if (response.ok) {

            document.location.replace('/dashboard');

        } else {

            alert(response.statusText);

        }

    }

}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

