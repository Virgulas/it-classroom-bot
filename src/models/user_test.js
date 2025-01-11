const { createUser, getUser, updateUser } = require('./user');

(async () => {
    let user = await getUser('245562669044727809');
    
    if (user) {
        console.log(user)
    }
})()
