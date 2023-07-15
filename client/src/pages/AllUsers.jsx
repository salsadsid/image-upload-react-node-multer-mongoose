import  { useEffect, useState } from "react";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    fetch("https://image-upload-xn1d.onrender.com/file")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err, "it has an error"));
  }, [change]);

  const handleDelete = (id) => {
    fetch(`https://image-upload-xn1d.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.success){
          alert("Successfully Deleted.");
        }
      })
      .catch((err) => console.log(err, "it has an error"));

      setChange((prevState)=>!prevState)
  };
  return (
    <div className="overflow-x-auto max-w-xl mx-auto">
      <div></div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((singleData, i) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.img.data.data))
            );
            return (
              <tr key={singleData._id} className="my-2">
                <th>{i + 1}</th>
                <td className="flex justify-center items-center py-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                      <img
                        src={`data:image/png;base64,${base64String}`}
                        width="24"
                      />
                    </div>
                  </div>
                </td>
                <td>{singleData.name}</td>
                <td>{singleData.email}</td>
                <td>
                  <button
                    className="btn btn-xs btn-warning normal-case"
                    onClick={() => handleDelete(singleData._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
