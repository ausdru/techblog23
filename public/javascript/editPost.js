async function editFormHandler(event) {

    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value;

    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    const post_id = window.location.toString().split('/')[

        window.location.toString().split('/').length - 1

    ];

    const response = await fetch (`/api/post/${post_id}`, {

        method: 'PUT',

        body: JSON.stringify({ post_title, post_content }),

        headers: { 'Content-Type': 'application/json'}

    });

    if (response.ok) {
 
        document.location.replace('/dashboard');

    } else {

        alert(response.statusText);

    }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);