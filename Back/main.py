from fastapi  import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.graph_controller import graph_api


app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL, e.g., ["http://localhost:3000"]
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers (e.g., Content-Type, Authorization)
)
app.include_router(graph_api)




