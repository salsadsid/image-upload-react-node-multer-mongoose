import './App.css'
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);
    formData.append("name", data.name);
    console.log(formData)
    const res = await fetch("http://localhost:8080", {
        method: "POST",
        body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };
  return (
    <>
      <div>
        <h1>Hello</h1>
      </div>
      <div className="card">
        <p>
        image-upload-react-node-multer-mongoose
        </p>
      </div>
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name: </label>
                <input type="text"{...register("name")} />
                <br />
                <input type="file" {...register("file")} />
                <br />
                <input type="submit" />
            </form>
      </div>
    </>
  )
}

export default App
