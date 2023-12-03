const signupFormHandler = async (event) => {

    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();

    const password = document.querySelector('#password').value.trim();

    const passwordAgain = document.querySelector('#passwordAgain').value.trim();
  
    if (password !== passwordAgain) {

      alert('Passwords are not the same!');

      return;

    }
  
    if (username && password && passwordAgain) {

      try {

        const response = await fetch('/api/users/signup', {

          method: 'POST',

          body: JSON.stringify({ username, password }),

          headers: { 'Content-Type': 'application/json' }

        });
  
        if (responseponse.ok) {

          const data = await response.json();

          console.log('Signed up successfully!', data);

          document.location.replace('/dashboard');

        } else {

          const errormsg = await response.json();

          console.error('Signup unsuccessful', errormsg);

          alert('Unable to signup! Please check your inputs, and try again.');

        }

      } catch (error) {

        console.error('Signup unsuccessful', error);

        alert('Unsuccessful. Please try again.');

      }

    }

  };

document.querySelector('.signUpForm').addEventListener('submit', signupFormHandler);