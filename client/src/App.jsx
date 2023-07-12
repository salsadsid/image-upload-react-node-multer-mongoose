import './App.css'
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data)
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
