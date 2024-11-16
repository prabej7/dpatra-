const Home: React.FC = () => {
  return (
    <div
      className="h-screen w-screen  flex justify-center items-center"
      style={{
        backgroundImage: `url("/assets/imgs/bg.jpg")`,
        backgroundSize: 'contain',
      }}
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-gradient text-6xl font-bold text-green-500">
          Securing Nepal's Data
        </h1>
        <p>One block at a time...</p>
      </div>
    </div>
  );
};

export default Home;
