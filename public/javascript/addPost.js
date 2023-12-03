const createPostForm = async (event) => {

    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();

    const content = document.querySelector('#content').value.trim();
  
    if (!title || !content) {

      alert('Inputs cannot be empty.');

      return;

    }
  
    try {

      const response = await fetch("/api/posts", {

        method: "POST",

        body: JSON.stringify({ title, content }),

        headers: {"Content-Type": "application/json"},

      });
  
      if (response.ok) {

        const data = await response.json();

        console.log('Post successfully created.', data);
  
        window.location.replace("/dashboard");

      } else {

        const errmsg = await response.json();

        console.error('Unable to create post!', errmsg);

        alert('Post unsuccessful. Please try again.');

      }

    } catch (error) {

      console.error('Post creation error', error);

      alert('Unsuccessful. Please try again!');
    }
    
  };