async function deletePost(postId) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete post');
  }
};