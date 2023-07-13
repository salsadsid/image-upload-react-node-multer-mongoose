import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

const AllUsers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/file")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err, "it has an error"));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
    })
      .then((res) => res, json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err, "it has an error"));
  };
  return (
    <div className="overflow-x-auto max-w-lg mx-auto">
      <div></div>
      <table className="table table-xs">
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
