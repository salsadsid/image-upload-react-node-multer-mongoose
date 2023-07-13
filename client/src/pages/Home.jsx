
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/file")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err, "it has an error"));
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);
    formData.append("name", data.name);
    console.log(formData);
    const res = await fetch("http://localhost:8080", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };
  return (
    <div>
      <div>
        <h1>Hello</h1>
      </div>
      <div className="card">
        <p>image-upload-react-node-multer-mongoose</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name: </label>
          <input type="text" {...register("name")} />
          <br />
          <input type="file" {...register("file")} />
          <br />
          <input type="submit" />
        </form>
      </div>
      <div>
        {data?.map((singleData) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(singleData.img.data.data))
          );
          return (
            <>
              <p>{singleData.name}</p>
              <img src={`data:image/png;base64,${base64String}`} width="200" />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
