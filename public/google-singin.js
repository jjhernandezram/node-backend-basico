const url = window.location.hostname.includes('localhost') ? 'http://localhost:8081/api/auth/google' : 'heroku_URL';

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const id_token = googleUser.getAuthResponse().id_token;
  const data = { id_token };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => console.log('Nuestro server: ', data))
    .catch((err) => console.log(err));
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
