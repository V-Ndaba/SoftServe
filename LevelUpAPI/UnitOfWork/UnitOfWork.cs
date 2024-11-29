using LevelUpAPI.Models;
using LevelUpAPI.Repository;

namespace LevelUpAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly IConfiguration Configuration;
        private LevelUpDBContext _DbContext;
        public UnitOfWork(IConfiguration Config, LevelUpDBContext DbContext)
        {
            Configuration = Config;
            _DbContext = DbContext;

            gradRepo = new GraduateRepository(DbContext);
        }

        public IGraduateRepository gradRepo { get; private set; }

        public ValueTask DisposeAsync()
        {
            return ((IAsyncDisposable)_DbContext).DisposeAsync();
        }

        public async Task SaveAsync()
        {
            await _DbContext.SaveChangesAsync();
        }
    }
}
