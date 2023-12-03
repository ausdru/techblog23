const deletePostHandler = async (postId) => {

    try {

      const response = await fetch(`/api/posts/${postId}`, {

        method: "DELETE",

      });
  
      if (response.ok) {

        const data = await response.json();

        console.log('Post successfully deleted.', data);

        document.location.replace("/dashboard");

      } else {

        const errmsg = await response.json();

        console.error('Unable to delete post!', errmsg);

      }

    } catch (error) {

      console.error('Post deletion error', error);

    }

  };