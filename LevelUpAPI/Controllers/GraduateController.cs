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
            //Save to Database
            await _unitOfWork.gradRepo.AddGradAsync(grad);
            await _unitOfWork.SaveAsync();
            response.StatusCode = Ok().StatusCode;
            response.Data = true;
            return response;
        }

        [HttpGet("GetAllGraduates")]
        public async Task<ActionResult<ResponseDTO>> GetAllGraduates()
        {
            //setup a fail safe
            ResponseDTO response = new ResponseDTO { StatusCode = BadRequest().StatusCode, Data = false };

            //Get ALL graduates
            List<Graduate>? graduates = await _unitOfWork.gradRepo.GetAllGradAsync();
            if (graduates != null)
            {
                response.StatusCode = Ok().StatusCode;
                //Only display Graduates that have not been deleted
                response.Data = graduates
                                        .Where(grad => grad.IsDeleted == false) 
                                        .Select(grad => ViewUpdateGradDTO.toDTO(grad))
                                        .ToList();

            }
            return response;            
        }

        [HttpGet("GetGraduate")]
        public async Task<ActionResult<ResponseDTO>> GetGraduate([FromQuery] Guid id)
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
            //grad.DateEdited = DateOnly.MaxValue; //CURRENT DATE

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
            //await _unitOfWork.gradRepo.DeleteGradAsync(id);
            Graduate grad = await _unitOfWork.gradRepo.GetGradAsync(id);
            if (grad != null)
            {
                grad.IsDeleted = true;
                await _unitOfWork.gradRepo.UpdateGradAsync(grad);
                await _unitOfWork.SaveAsync();
                response.StatusCode = Ok().StatusCode;
                response.Data = true;
            }
            
            return response;
        }
    }
}
