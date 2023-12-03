const logoutHandler = async () => {

    try {

      const response = await fetch('/api/users/logout', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' }

      });

      if (response.ok) {

        document.location.replace('/');

      } else {

        alert('Logout attempt unsuccessful!');

      }

    } catch (error) {

      console.error('Logout unsuccessful.', error);

    }

  };

  document.querySelector('#logout').addEventListener('click', logoutHandler);