const baseUlr = 'https://jsonplaceholder.typicode.com';
const main = document.getElementById('main');

let usersList = '';
let usersData;

const fetchUsers = async () => {
  const response = await fetch(`${baseUlr}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

const fetchPosts = async (userId) => {
  const response = await fetch(`${baseUlr}/users/${userId}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
};

const setEvents = () => {
  const getPostsButtons = document.querySelectorAll('.buttons');
  getPostsButtons.forEach((getPostsButton, index) => {
    getPostsButton.addEventListener('click', () => {
      main.innerHTML = `
        <div class="loading">
            <div class="lds-circle"><div></div></div>
        </div>`;
      fetchPosts(usersData[index].id).then((posts) => {
        main.innerHTML = `
        <div class="users">
          <div class="container">
              <div>
                  <h3>${usersData[index].name}</h3>
                  <p class="emails">J${usersData[index].email}</p>
              </div>
              <div class="button-borders" id="hide-border">
                <button class="buttons" id="hide"><span class="button-text">Close</span></button>
              </div>  
          </div>
          <h4 class="posts-number">
             ${posts.length} Posts
          </h4>
          <div class="posts-container">
            ${posts.map(
              (post) =>
                `<div class="posts">
                  <h4>
                      ${post.title}
                  </h4>
                  <p>${post.body}</p>
              </div>`
            )}
          </div>
        </div>`;

        const closeButton = document.getElementById('hide');

        closeButton.addEventListener('click', () => {
          main.innerHTML = usersList;
          setEvents();
        });
      });
    });
  });
};

fetchUsers().then((users) => {
  usersData = users;
  users.forEach((user) => {
    usersList += `<div class="users">
    <h3>${user.name}</h3>
    <p class="emails">${user.email}</p>
    <div class="button-borders">
      <button class="buttons"><span class="button-text">Get ${
        user.name.split(' ')[0]
      }'s posts</span></button>
    </div>
  </div>`;
  });
  main.innerHTML = usersList;
  setEvents();
});
