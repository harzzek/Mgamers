using backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace backend.Services
{
    public class UserService
    {
        private List<User> _users = new List<User>();

        public UserService()
        {

        }

        public List<User> GetAllUsers()
        {
            return _users;
        }

        public User GetUserById(int id)
        {
            User user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                throw new System.Exception("User not found");
            }
            return user;
        }

        public User AddUser(User user)
        {
            user.Id = _users.Count + 1;
            _users.Add(user);
            return user;
        }

        public User CreateUser(User user)
        {
            _users.Add(user);
            return user;
        }


        public User UpdateUser(int id, User user)
        {
           return user;
        }

    }


}