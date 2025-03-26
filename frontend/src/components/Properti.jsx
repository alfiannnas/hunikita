import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const Properti = (props) => {
  const publicURL =  import.meta.env.VITE_PUBLIC_URL
  const { name, address, img_path } = props;
  const path = publicURL + "/" + img_path.replace(/\\/g, '/')
  return (
    <div className="w-full justify-center flex mt-[38px]">
      <div className="w-[1150px] h-[320px] shadow-xl rounded-[10px] flex gap-4 items-center justify-around hover:shadow-2xl">
        <div className="w-[488px] ml-[25px]">
          <img  src={path} alt="" className='w-[270px] h-[209px]'/>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[32px] font-semibold">{name}</h1>
          <div className="flex gap-2 justify-center items-center">
            <div>
              <img src="/logo-map-list-properti.png" alt="" />
            </div>
            <p className="text-[20px]">
                {address}
            </p>
          </div>
          <Link to="/form-edit">
            <div className="flex bg-[#4E97D1] w-[81px] h-[35px] rounded-[8px] items-center justify-center text-white gap-2 cursor-pointer mt-[20px]">
              <span>Edit</span>
              <div>
                <img src="/logo-edit.png" alt="" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

Properti.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  img_path: PropTypes.string.isRequired
};

export default Properti