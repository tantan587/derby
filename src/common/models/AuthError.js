var method = AuthError.prototype;

function AuthError() {
    this.login = {username:"", password:""}
    this.signup = {username:"", password:"", email:""}
    this.foundError = false
    this.addError = (route,field,message) =>
    {
        this.foundError = true;
        this[route][field] = message;
    }
}


module.exports = AuthError;
