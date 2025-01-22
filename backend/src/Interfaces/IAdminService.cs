using backend.Models;


namespace backend.Interfaces
{
    public interface IAdminService
    {

        Task <bool> UpgadeUserRole(User user, Role role);

        Task <bool> RemoveUser(User user);

        Task <bool> DemoteUserRole(User user, Role role);
    }
}