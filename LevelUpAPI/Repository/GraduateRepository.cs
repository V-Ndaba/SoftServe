using LevelUpAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LevelUpAPI.Repository
{
    public class GraduateRepository : BaseRepository<Graduate>, IGraduateRepository
    {
        public GraduateRepository(LevelUpDBContext dbContext) : base(dbContext.Set<Graduate>())
        {
        }

        public async Task<bool> AddGradAsync(Graduate graduate)
        {
            return await base.AddAsync(graduate);
        }

        public async Task<bool> DeleteGradAsync(Guid ID)
        {
            return await base.DeleteAsync(ID);
        }

        public async Task<List<Graduate>?> GetAllGradAsync()
        {
            return await base.GetAllAsync();
        }

        public async Task<Graduate> GetGradAsync(Guid ID)
        {
            return await base.GetAsync(ID);
        }

        public async Task<bool> UpdateGradAsync(Graduate graduate)
        {
            return await base.UpdateAsync(graduate);
        }
    }
}
