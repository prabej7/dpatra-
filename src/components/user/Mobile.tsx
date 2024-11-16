interface Props {
  children: React.ReactNode;
}
const Mobile: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display ">
          <div className="artboard  phone-1 bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
