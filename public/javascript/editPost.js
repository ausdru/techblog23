const editPostForm = async (event) => {

    event.preventDefault();
  
    const postId = window.location.pathname.split('/')[2];

    console.log('post-ID:', postId);

    const title = document.querySelector('#title').value.trim();

    const content = document.querySelector('#content').value.trim();

    if (!title || !content) {

      alert('Please type in post!');

      return;
    }
  
    try {

      const response = await fetch(`/api/posts/${postId}`, {

        method: 'PUT',

        body: JSON.stringify({ title, content }),

        headers: {'Content-Type': 'application/json'}

      });
  
      if (response.ok) {

        const data = await response.json();

        console.log('Post successfully updated!', data);

        window.location.replace('/dashboard');

      } else {

        const errormsg = await response.json();

        console.error('Unable to edit post!', errmsg);

        alert('Edit unsuccessful. Please try again.');

      }

    } catch (error) {

      console.error('Post edit unsuccessful', error);

      alert('Unsuccessful. Please try again!');

    }

  };
  
  document
    .querySelector('.editPost')
    .addEventListener('submit', editPostForm);