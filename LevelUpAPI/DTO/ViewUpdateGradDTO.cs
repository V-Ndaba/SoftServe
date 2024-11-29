using LevelUpAPI.Models;

namespace LevelUpAPI.DTO
{
    public class ViewUpdateGradDTO
    {
        public Guid GraduateID { get; set; } = Guid.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty ;
        public string EmailAddress { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; } = DateOnly.MinValue;
        public int Age { get; set; } = -1;
        public DateOnly DateCreated { get; set; } = DateOnly.MinValue;
        public DateOnly? DateEdited { get; set; } = DateOnly.MinValue;
        public bool isDeleted { get; set; } = false;

        public static ViewUpdateGradDTO toDTO(Graduate model)
        {
            return new ViewUpdateGradDTO
            {
                GraduateID = model.GraduateId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                EmailAddress = model.EmailAddress,
                DateOfBirth = model.DateOfBirth,
                Age = model.Age,
                DateCreated = model.DateCreated,
                DateEdited = model.DateEdited,
                isDeleted = model.IsDeleted,
            };
        }
        
        public static Graduate fromDTO(ViewUpdateGradDTO dto)
        {
            return new Graduate
            {
                GraduateId = dto.GraduateID,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                EmailAddress = dto.EmailAddress,
                DateOfBirth = dto.DateOfBirth,
                Age = dto.Age,
                DateCreated = dto.DateCreated,
                DateEdited = dto.DateEdited,
                IsDeleted = dto.isDeleted,
            };
        }
    }
}
