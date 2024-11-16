import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-t from-green-50 to-green-400">
        <div className="flex justify-between p-3">
          <div className="flex w-[55%]">
            <div className="flex-1">
              <a className="text-3xl font-bold text-[#16a34a]  pl-8">DPatra</a>
            </div>
            <div>
              <ul className="text-gray-800 flex gap-8 pt-3">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Services</a>
                </li>
                <li>
                  <a href="">About us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <button className="btn btn-square mr-8 border-none bg-gradient-green text-white w-[100px]">
              Get started
            </button>
          </div>
        </div>

        <div className="flex justify-between w-[100%] h-32 mt-10">
          <div className="tracking-wide  w-[100%]  pl-7 text-6xl font-bold mt-16  text-[#16a34a]">
            Securing Nepal's Identity
          </div>
          <div className="w-[100%] flex justify-center">
            <img src="/privacy.png" alt="" className="h-[300px]" />
          </div>
        </div>
        <div className="mt-20">
          <p className="pl-8 text-[#3faa66]">
            It is a blockchain-based platform developed to securely store
            citizens' data in a decentralized manner .<br /> This system
            addresses cybersecurity concerns and fraud risks, ensuring the
            safety, privacy of sensitive data
          </p>
        </div>
        <button className="tracking-widest mt-10 ml-8  width-[300px] btn bg-gradient-green text-white border-none">
          Discover now
          <FaArrowRight />
        </button>
        <div className="w-screen h-[150px] bg-white mt-14 rounded-[100%] bg-gradient-diagonal"></div>
      </div>
    </>
  );
};

export default Home;
