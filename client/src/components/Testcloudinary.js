import React, { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";

const Testcloudinary = () => {
  const [imageSelected, setImageSelected] = useState("");
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "lyxwlobx");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dhn6kqmnu/image/upload",
      formData
    ).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => setImageSelected(event.target.files[0])}
      />
      <button onClick={uploadImage}>Upload Image</button>
      <Image
        cloudName="dhn6kqmnu"
        publicId="https://res.cloudinary.com/dhn6kqmnu/image/upload/v1681350444/t6ujfzd0qixwl0i1szyq.jpg"
      />
    </div>
  );
};

export default Testcloudinary;
