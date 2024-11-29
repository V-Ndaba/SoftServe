using LevelUpAPI.Models;

namespace LevelUpAPI.Repository
{
    public interface IGraduateRepository
    {
        //Add
        Task<bool> AddGradAsync(Graduate graduate);
        //Read
        Task<Graduate> GetGradAsync(Guid ID);
        //Read All
        Task<List<Graduate>?> GetAllGradAsync();
        //Update
        Task<bool> UpdateGradAsync(Graduate graduate);
        //Delete
        Task<bool> DeleteGradAsync(Guid ID);
    }
}
