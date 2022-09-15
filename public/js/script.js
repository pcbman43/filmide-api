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
  location.href = `${window.location.href}/edit`;
  // there ARE two ways
}