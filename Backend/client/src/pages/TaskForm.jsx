import { useState, useEffect } from "react";
import { createTask, fetchTask, updateTask, deleteTask, fetchTasks} from "../api/tasks";
import { useParams, useNavigate } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     if (!params.id) {
  //       const res = await createTask({ title, description, phone });

  //       fetchTasks()
  //         .then((res) => {
  //           console.log(res)
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     } else {
  //       const res = await updateTask(params.id, { title, description, phone });

  //       fetchTasks()
  //         .then((res) => {
  //           console.log(res)
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   e.target.reset();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let res;
      if (!params.id) {
        // Crear una nueva tarea
        res = await createTask({ title, description, phone });
      } else {
        // Actualizar una tarea existente
        res = await updateTask(params.id, { title, description, phone });
      }
  
      // Realizar acciones después de la creación/actualización exitosa
      console.log("Respuesta del servidor:", res);
  
      // Refetch tasks (si es necesario)
      try {
        const tasksResponse = await fetchTasks();
        console.log("Tareas actualizadas:", tasksResponse);
      } catch (fetchError) {
        console.error("Error al obtener tareas:", fetchError);
      }
  
      // Navegar a la página principal o a otra ruta según sea necesario
      navigate("/");
    } catch (error) {
      // Manejar errores en la creación/actualización de la tarea
      console.error("Error en la creación/actualización de la tarea:", error);
    } finally {
      // Resetear el formulario en todos los casos
      e.target.reset();
    }
  };

  useEffect(() => {
    fetchTasks()
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.error(error);
      });

    if (params.id) {
      fetchTask(params.id)
        .then((res) => {
          console.log(res)
          setTitle(res.data.title);
          setPhone(res.data.phone)
          setDescription(res.data.description);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4">Crear Task</h1>
          <input
            type="number"
            placeholder="phone"
            className="block p-2 py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            autoFocus
          />
          <input
            type="text"
            placeholder="title"
            className="block p-2 py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          /><textarea
            placeholder="description"
            className="block p-2 py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 font-bold py-2 px-4 rounded">
            {params.id ? "Update" : "Create"}
          </button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async () => {
              try {
                const res = await deleteTask(params.id);
                console.log(res);
                navigate("/");
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;
