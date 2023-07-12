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
                <input type="file" {...register("file")} />

                <input type="submit" />
            </form>
      </div>
    </>
  )
}

export default App
