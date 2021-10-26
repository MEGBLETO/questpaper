import axios from 'axios';
import React, {useState} from 'react'

const Upload = () => {

    const [file, setFile] = useState('');
    //const [filename, setFilename] = useState("choisissez un fichier au format pdf");
 
    

    const getFile = e =>{
      
       setFile(e.target.files[0].name)
    }


    const submitForm =  async (e) =>{
      e.preventDefault();
      const formData = new FormData();
      

     try {
         const res = await axios.post('http://localhost:5000/api/user/post', formData, {
             headers: {
                 'Content-Type' : 'multipart/form-data'
             }
         })
     } catch (error) {
         if(error.status === 500){
             console.log('there was a problem uploading the file')
         }
         
     }

    }

    return (
        <div className="h-screen p-4">
            <form onSubmit={submitForm} className="relative flex flex-col place-items-center justify-center  h-2/3 inset-y-1/2 transform -translate-y-1/2">
                 <input  className="p-2 w-full cursor-pointer text-white border-2 border-dotted border-gray-300 h-1/2"  type="file"  name="file"  onChange={getFile}/>
                 <label htmlFor='filelabel'>{file}</label>
                 <input className="p-3 cursor-pointer w-full m-3 hover:bg-gray-400" type="submit"  value="Upload" />
            </form>
        </div>
    )
}

export default Upload
