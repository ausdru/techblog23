document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();

      fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            window.location.href = '/login';
          } else {
            response.text().then(text => {
              console.error('Logout failed:', text);
              alert(text);
            });
          }
        })
        .catch((error) => {
          console.error('Logout error:', error);
          alert('An error occurred while trying to log out.');
        });
    });
  }
});

  