import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API } from '../constant';
import axios from 'axios';
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

const Formtambah = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = useSelector((state) => state.auth )
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);


  const [formData, setFormData] = useState({
    owner_name:"",
    owner_email:"",
    phone_number:"",
    name: "",
    property_type:"",
    address:"",
    room_count:0,
    img_path:""
  });

  const handleValidation = () => {
    console.log(formData)
    for (const key in formData) {
      if (key != "img_path" && !formData[key]) {
        alert(`Please fill in ${key.replace(/_/g, ' ')}`);
        return false;
      }
    }

    return true;
  };

  const handleImageUpload = async () => {
    const form = new FormData()
    form.append('file', selectedImage)

    try {
      const res = await axios.post(API.INSERT_PROPERTIES_IMAGE, form, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });

      if (res.status === 201) {
        const path = res.data.data.path
        setFormData((prevFormData) => ({ ...prevFormData, img_path: path}));
        return path
      }
    } catch (err) {
      alert('Server Error');
      console.error(err);
    }
    return null
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!selectedImage) {
      alert('upload image first')
      return 
    }

    if(!handleValidation() ) {
      return 
    }

    await handleImageUpload()
  };

  useEffect(() => {
    if (formData.img_path !== '') {
        axios.post(API.INSERT_PROPERTIES, formData, {headers: {Authorization: 'Bearer ' + auth.token}}).then((res)=> {
        if(res.status == 201) {
          navigate("/list-iklan")
        }
      }).catch((err) => {
        if (err.response.status == 404) {
          alert(err.response.data.detail)
        } else {
          alert("Server Error! Coba lagi beberapa saat")
        }
        return 
      })
    }
  },[formData.img_path, formData, auth.token,  navigate])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
        <Navbar />
      <div className="w-[1148px] mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[36px] font-bold mt-[65px]">Buat Iklan</h1>
          <hr className="mt-[10px] h-[2px] bg-gray-300" />
          <div className="mt-[20px]">
            <h1 className="text-[32px]">Nama Pemilik</h1>
            <input
              type="text"
              name='owner_name'
              placeholder="Masukkan Nama"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="mt-[20px]">
            <h1 className="text-[32px]">Email</h1>
            <input
              type="email"
              name='owner_email'
              autoComplete='on'
              placeholder="Masukkan Email"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="mt-[20px]">
            <h1 className="text-[32px]">No. Handphone</h1>
            <input
              type="text"
              name='phone_number'
              placeholder="Masukkan No. Handphone"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="mt-[20px]">
            <h1 className="text-[32px]">Nama Properti</h1>
            <input
              type="text"
              name='name'
              placeholder="Masukkan Nama Properti"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="mt-[20px]">
            <h1 className="text-[32px]">Tipe Properti</h1>
            <input
              type="text"
              name='property_type'
              placeholder="Masukkan Tipe Properti"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="mt-[20px]">
            <h1 className="text-[32px]">Alamat</h1>
            <input
              type="text"
              name='address'
              placeholder="Masukkan Alamat"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="mt-[20px]">
            <h1 className="text-[32px]">Jumlah Kamar</h1>
            <input
              type="text"
              name='room_count'
              placeholder="Masukkan Jumlah Kamar"
              onChange={handleChange}
              className="w-[1148px] h-[65px] border-none rounded-[10px] bg-gray-300 text-[24px] mt-[7px]"
            />
          </div>
          <div className="flex flex-col justify-center w-[270px] h-[209px] mt-[34px]">
            <h1 className="text-[32px]">Foto Properti</h1>

            <label className="flex flex-col items-center justify-center w-[270px] h-[209px] rounded-lg cursor-pointer bg-gray-300">
              {selectedImage ? (   
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img src={URL.createObjectURL(selectedImage)} alt="" className='w-[270px] h-[209px]' />
              </div>):(   
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-[64px]">+</p>
                <p className="text-[24px]">Tambahkan Gambar</p>
              </div>)}
           
              <input type="file" onChange={handleImageChange} name='img' className="hidden" />
            </label>
          </div>
          <div className="mt-[32px] flex gap-3">
            <input
              type="checkbox"
              name='valid'
              className="w-[45px] h-[41px] bg-gray-300 border-none"
            />
            <h1 className="text-[25px]">Pastikan semua data sudah benar!</h1>
          </div>
          <button className="w-[311px] h-[71px] justify-center items-center flex mx-auto bg-[#4E97D1] text-white text-[26px] rounded-[10px] mt-[59px]">
            Pasang Iklan
          </button>
        </form>
      </div>
      <div className="mt-[50px]">
        <Footer />
      </div>
    </div>
  )
}

export default Formtambah