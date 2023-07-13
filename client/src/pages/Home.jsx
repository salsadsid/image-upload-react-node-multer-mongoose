import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  useEffect(() => {
    fetch("http://localhost:8080/file")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err, "it has an error"));
  });
  const onSubmit = async (data) => {
    setError({
      isError: false,
      message: "",
    });
    const formData = new FormData();
    const file = data.file[0];
    if(file.size >200800){
        setError({
            isError: true,
            message: "Maximun size: 200Kb",
          });
          return;
    }
    if (
      file.type == "image/webp" ||
      file.type == "image/jpeg" ||
      file.type == "image/png"
    ) {
      formData.append("image", data.file[0]);

      formData.append("name", data.name);
      formData.append("email", data.email);
      console.log(formData);
      const res = await fetch("http://localhost:8080", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    }else{
        setError({
            isError: true,
            message: "Only png, jpeg, webp files are valid.",
          });
          return;
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="text-3xl font-medium">
        <p>Create A Profile</p>
      </div>
      <div className="flex justify-center items-center max-w-md border rounded bg-slate-200 m-5 p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-start gap-y-5"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              {...register("name")}
              className="input input-sm input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name">Email: </label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })}
              className="input input-sm input-bordered input-accent w-full max-w-xs"
            />
            {errors.email?.message && (
              <small className="text-orange-700">{errors.email.message}</small>
            )}
          </div>
          <div className="max-w-xs flex flex-col gap-y-2">
            <label htmlFor="name">Upload Profile Picture: </label>
            <input
              type="file"
              {...register("file")}
              className="file-input file-input-bordered file-input-accent file-input-sm  max-w-xs"
            />
            {error.isError && (
              <small className="text-orange-700">{error.message}</small>
            )}
          </div>

          <input type="submit" className="btn btn-accent btn-sm" />
        </form>
      </div>
      <div>
        {data?.map((singleData) => {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(singleData.img.data.data))
          );
          return (
            <>
              <p>Name: {singleData.name}</p>
              <p>Email: {singleData.email}</p>
              <img src={`data:image/png;base64,${base64String}`} width="200" />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
