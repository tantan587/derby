var method = AuthError.prototype;

function AuthError(route,field,message) {
    this.login = {username:"", password:""}
    this.signup = {username:"", password:"", email:""}
    this[route][field] = message;
}



module.exports = AuthError;
