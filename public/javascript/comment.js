const CommentFormHandler = async (event) => {

    event.preventDefault();
  
    const comment_text = document.querySelector("#comment_text").value.trim();
    
    const post_id = document.querySelector("input[name='post_id']").value;
  
    if (!comment_text) {

      alert('Please type a comment!');

      return;
    }
  
    try {

      const response = await fetch("/api/comments", {

        method: "POST",

        body: JSON.stringify({ post_id, text: comment_text }),

        headers: {"Content-Type": "application/json"}

      });
  
      if (response.ok) {

        const data = await response.json();

        console.log('Comment successfully posted.', data);

        window.location.reload();

      } else {

        const errmsg = await response.json();

        console.error('Unable to post comment!', errmsg);

        alert('Comment unsuccessful, Please try again.');

      }

    } catch (error) {

      console.error('Comment creation error', error);

      alert('Unsuccessful. Please try again!');
    }
  };