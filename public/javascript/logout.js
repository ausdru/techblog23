document.addEventListener('DOMContentLoaded', () => {

    const logoutButton = document.querySelector('#logout');

    if (logoutButton) {

        logoutButton.addEventListener('click', logout);

    }

});

async function logout() {

    console.log('Logout button selected.')

    const response = await fetch('/api/user/logout', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' }

    });

    if (response.ok) {

        document.location.replace('/');
    
    } else {

        alert(response.statusText);

    }
    
}