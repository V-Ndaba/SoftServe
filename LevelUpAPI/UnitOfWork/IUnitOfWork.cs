using LevelUpAPI.Repository;

namespace LevelUpAPI.UnitOfWork
{
    public interface IUnitOfWork
    {
        IGraduateRepository gradRepo { get; }
        ValueTask DisposeAsync();
        Task SaveAsync();
    }
}
