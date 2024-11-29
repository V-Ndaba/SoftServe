using LevelUpAPI.DTO;
using LevelUpAPI.Models;
using LevelUpAPI.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LevelUpAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GraduateController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;
        public GraduateController(IConfiguration configs, LevelUpDBContext dbContext)
        {
            _unitOfWork = new UnitOfWork.UnitOfWork(configs, dbContext);
        }

        [HttpPost("CreateGraduate")]
        public async Task<ActionResult<ResponseDTO>> CreateGraduate(ViewUpdateGradDTO dto)
        {
            //setup a fail safe
            ResponseDTO response = new ResponseDTO { StatusCode = BadRequest().StatusCode, Data = false };

            //Create new GUID
            Graduate grad = ViewUpdateGradDTO.fromDTO(dto);
            grad.GraduateId = Guid.NewGuid();
            grad.UserName = grad.FirstName + " " + grad.LastName;
            //Save to Database
            await _unitOfWork.gradRepo.AddGradAsync(grad);
            await _unitOfWork.SaveAsync();
            response.StatusCode = Ok().StatusCode;
            response.Data = true;
            return response;
        }

        [HttpPost("GetAllGraduates")]
        public async Task<ActionResult<ResponseDTO>> GetAllGraduates()
        {
            //setup a fail safe
            ResponseDTO response = new ResponseDTO { StatusCode = BadRequest().StatusCode, Data = false };

            //Get ALL graduates
            List<Graduate>? graduates = await _unitOfWork.gradRepo.GetAllGradAsync();
            if (graduates.IsNullOrEmpty())
            {
                response.StatusCode = Ok().StatusCode;
                response.Data = graduates.Select(grad => ViewUpdateGradDTO.toDTO(grad));
            }
            return response;            
        }

        [HttpGet("GetGraduate")]
        public async Task<ActionResult<ResponseDTO>> GetGraduate(Guid id)
        {
            ResponseDTO response = new ResponseDTO { StatusCode = BadRequest().StatusCode, Data = false };

            //Get the graduate
            Graduate? Grad = await _unitOfWork.gradRepo.GetGradAsync(id);

            if (Grad == null)
            {
                response.Data = Grad;
                response.StatusCode = Ok().StatusCode;
            }
            return response; 
        }

        [HttpPut("UpdateGraduate")]
        public async Task<ActionResult<ResponseDTO>> updateGraduate(ViewUpdateGradDTO dto)
        {
            //setup a fail safe
            ResponseDTO response = new ResponseDTO { StatusCode = BadRequest().StatusCode, Data = false };

            //Create new DateEdited
            Graduate grad = ViewUpdateGradDTO.fromDTO(dto);
            grad.DateEdited = DateOnly.MaxValue; //CURRENT DATE

            //Save to Database
            await _unitOfWork.gradRepo.UpdateGradAsync(grad);
            await _unitOfWork.SaveAsync();
            response.StatusCode = Ok().StatusCode;
            response.Data = true;
            return response;
        }

        [HttpDelete("DeleteGraduate")]
        public async Task<ActionResult<ResponseDTO>> DeleteGraduate(Guid id)
        {
            //setup a fail safe
            ResponseDTO response = new ResponseDTO { StatusCode = BadRequest().StatusCode, Data = false };

            //Save to Database
            await _unitOfWork.gradRepo.DeleteGradAsync(id);
            await _unitOfWork.SaveAsync();
            response.StatusCode = Ok().StatusCode;
            response.Data = true;
            return response;
        }
    }
}
