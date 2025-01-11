const { User, sequelize } = require('./model');

async function createUser(userId, gitAcc) {
    let user;
    try {
        const userExists = await getUser(userId);

        if (userExists) {
            throw new Error('ID already exists.')
        }

        if (typeof gitAcc !== 'string') {
            throw new Error('gitAcc must be a string');
        }

        if (typeof userId !== 'string') {
            throw new Error('id must be a string');
        }

        user = await User.create({
        id: userId,
        gitAcc: gitAcc 
        });
      
    } catch (error) {
      console.error('Error creating user:', error);
    }

    if (user) {
        return user;
    }
  }

async function getUser(userId) {
    await sequelize.sync();
    const user = await User.findByPk(userId);
  
    if (user) {
        return user;
    }
    else {
        return false;
    }
}

async function updateUser(userId, newValues) {
  await sequelize.sync();

 try {
    const user = await getUser(userId);
    const newValuesKeys = Object.keys(newValues);
    const userKeys = Object.keys(user.dataValues);
  
    newValuesKeys.forEach((key) => {
      if (!userKeys.includes(key)) {
          throw new Error('Provided key not matching: ' + key);
      };
    })
  
    if (!user) {
      throw new Error('User not found');
    }
  
    Object.assign(user, newValues);
  
    await user.save();
  
    console.log('Updated user:', user.toJSON());
  
    return user; 

    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function deleteUser(userId) {
    try {
      // Find the user by ID
      const user = await getUser(userId);
  
      if (!user) {
        console.log('User not found');
        return null;
      }
  
      // Remove the user from the database
      await user.destroy();
  
      console.log(`User with ID ${userId} deleted successfully.`);
      return true; // Return true to indicate successful deletion

    } catch (error) {
      console.error('Error deleting user:', error);
      return false; // Return false if an error occurred
    }
  }  

/* async function updateAllUsers(newKey, defaultValue) {
  await syncDatabase(); // Ensure database is synced

  // Fetch all users
  const users = await User.findAll();

  // Loop through users and update the new key
  for (const user of users) {
    user[newKey] = defaultValue; // Set the new key (e.g., 'emailVerified')
    await user.save();           // Save changes to the database
    console.log(`Updated user ${user.id} with ${newKey}: ${defaultValue}`);
  }

  console.log("All users updated.");
} */

module.exports = { 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser 
};