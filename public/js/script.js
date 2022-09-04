function rerouteToMovie(movieID) {
  location.href = `/movies/${movieID}`;
}

function rerouteToHome() {
  location.href = `/`;
}

function rerouteToLogin() {
  location.href = `/login`;
}

function rerouteToEdit(movieID) {
  location.href = `${movieID}/edit`;
}