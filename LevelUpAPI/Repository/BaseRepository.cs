using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LevelUpAPI.Repository
{
    public abstract class BaseRepository<T> where T : class
    {
        protected internal DbSet<T> _DbSet;

        public BaseRepository(DbSet<T> dbSet)
        {
            _DbSet = dbSet;
        }

        //Add
        protected async Task<bool> AddAsync(T Obj)
        {
            try
            {
                await _DbSet.AddAsync(Obj);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        //Read
        protected async Task<T?> GetAsync<T2>(T2 Id)
        {
            try
            {
                return await _DbSet.FindAsync(Id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        protected async Task<List<T>?> GetAllAsync()
        {
            try
            {
                return await _DbSet.ToListAsync();
            }
            catch (Exception)
            { return null; }
        }


        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _DbSet.Where(expression);
        }


        protected async Task<bool> UpdateAsync(T Obj)
        {
            try
            {
                return await Task.Run(() =>
                {
                    _DbSet.Update(Obj);
                    return true;
                });
            }
            catch (Exception)
            { return false; }
        }


        //Delete
        protected async Task<bool> DeleteAsync<T2>(T2 Id)
        {
            try
            {
                dynamic? Obj = await GetAsync(Id);
                if (Obj == null)
                    return false;

                _DbSet.Remove(Obj);
                return true;
            }
            catch (Exception)
            { return false; }
        }

    }
}
