import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Upload = () => {
  const [donneeform, setDonneeForm] = useState([]);

  const [filename, setFilename] = useState();

  //file data to be appended
  const [file, setFile] = useState();

  //level and speciality data

  const [specialite, setSpecialite] = useState();
  const [level, setLevel] = useState();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setDonneeForm(data);

  const sendData = async (formData) => {

    if(formData){
        await axios
           .post("http://localhost:5000/api/user/upload", formData)
           .then((res) => console.log(res))
           .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    try {
      if (donneeform) {
        setFile(donneeform.file[0]);
        setLevel(donneeform.year);
        setSpecialite(donneeform.specialite);

        const formData = new FormData();

        formData.append("name", filename);
        formData.append("subject", file);
        formData.append("year", level);
        formData.append("domaine", specialite);

        sendData(formData);
      }
    } catch (error) {}
  }, [onSubmit]);

  const getFile = (e) => {
    setFilename(e.target.files[0].name);

    setFile(e.target.files[0]);
  };

  

  return (
    <div className="h-screen p-4 lg:w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-full p-2 flex flex-col justify-evenly"
        //onSubmit={submitForm}
      >
        <div className="flex flex-col ">
          <label htmlFor="level">Niveau d'étude:</label>
          <select
            {...register("year")}
            className="p-2  bg-gray-500 text-white"
            id="year"
            name="year"
          >
            <option value="none" selected disabled hidden>
              Renseignez une année d'étude
            </option>
            <option value="1">License 1</option>
            <option value="2">License 2</option>
            <option value="3">License 3</option>
            <option value="4">Master 1</option>
            <option value="5">Master 2</option>
          </select>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="Specialite">Specialite:</label>
          <select
            {...register("specialite")}
            className="p-2 bg-gray-500 text-white"
            id="specialite"
            name="specialite"
          >
            <option value="none" selected disabled hidden>
              Renseignez une specialité
            </option>
            <option value="anglais">Anglais</option>
            <option value="informatique">Informatique</option>
            <option value="biologie">Biologie</option>
            <option value="commerce">commerce</option>
            <option value="droit">Droit</option>
          </select>
        </div>

        <div className="relative h-2/6 flex flex-col ">
          <input
            className="p-2 shadow-lg cursor-pointer h-5/6 text-white border-2 border-dotted border-gray-300"
            type="file"
            accept=".pdf"
            name="subject"
            {...register("file")}
            onChange={getFile}
          />
          <label htmlFor="filelabel">{filename}</label>
        </div>

        <input
          className="p-3 cursor-pointer  m-3 hover:bg-gray-400"
          type="submit"
          value="Upload"
        />
      </form>
    </div>
  );
};

export default Upload;
