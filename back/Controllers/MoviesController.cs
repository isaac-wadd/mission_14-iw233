
using Microsoft.AspNetCore.Mvc;
using back.Models;

namespace back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase {
    private MovieDbContext _ctxt;
    public MoviesController(MovieDbContext tmp) { _ctxt = tmp; }
    public IEnumerable<Movie> Get() {
        return _ctxt.Movies.ToArray();
    }
}