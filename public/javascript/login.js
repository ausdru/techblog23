const loginFormHandler = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();

    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {

      try {

        const response = await fetch('/api/users/login', {

          method: 'POST',

          body: JSON.stringify({ username, password }),

          headers: { 'Content-Type': 'application/json' },

        });
  
        if (response.ok) {

          document.location.replace('/dashboard');

        } else {

          console.error('Login unsuccessful.');

          alert('Unable to login! Please check your inputs, and try again.');
        
        }

      } catch (error) {

        console.error('Login unsuccessful.', error);

        alert('Unsuccessful. Please try again.');

      }

    }

  };
  
document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);