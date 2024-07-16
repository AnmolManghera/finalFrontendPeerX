import './imageUpload.css'
import { Button } from '@material-tailwind/react'

import React, { useState } from 'react'

function ImageUpload({url, setUrl}) {
  const [image, setImage] = useState(null);
  
  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dy1yi8ejo");

    try {
      if(image === null){
        console.log("no image")
      }

      const res = await fetch('https://api.cloudinary.com/v1_1/dy1yi8ejo/image/upload',{
        method : "POST",
        body : data
      })

      const cloudData = await res.json();
      setUrl(cloudData.url);
      console.log(cloudData.url);
      
    } catch (error) {
      
    }
  }


  console.log(url)
  return (
    <div className='flex justify-center items-center '>
      <div className="p-10 rounded-xl">
        <div className="input flex justify-center mb-5">
          <label
            htmlFor="file-upload"
            className="custom-file-upload">
            {image
              ? <img
                className=" w-72 lg:w-96  rounded-xl"
                src={image ? URL.createObjectURL(image) : ""}
                alt="img"
              />
              : <img
                src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                className="h-20 w-20"
              />}
          </label>
          <input
            id="file-upload"
            className=' text-white'
            type="file"
            onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="">
          <Button
            className=' w-72 lg:w-96  bg-[#0f172a]'
            onClick={saveImage}
          >
            Upload Image
          </Button>
          
        </div>
      </div>
    </div>
  )
}

export default ImageUpload