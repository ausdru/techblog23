document.addEventListener('DOMContentLoaded', () => {
    const editForm = document.getElementById('edit-post-form');
    if (editForm) {
      editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
        const postId = window.location.pathname.split('/').pop();
  
        if (title && content) {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to update post');
          }
        }
      });
    }
  
    document.addEventListener('click', function(event) {
        if (event.target.matches('.edit-post-btn')) {
            const postId = event.target.getAttribute('data-id');
            document.location.replace(`/dashboard/edit-post/${postId}`);
          }
    
      if (event.target.matches('.delete-post-btn')) {
        const postId = event.target.getAttribute('data-id');
        deletePost(postId);
      }
    });

});