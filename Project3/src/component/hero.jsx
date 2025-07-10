const Hero = () => {
  return (
    <>
      <div className="main-container">
        <div className="content">
          <h1>
            <i>Beyond the Books of BIAS BHIMTAL </i>
          </h1>

          <h2>(..Chaar yaar..)</h2>
          <p>
            Karan, known for his non-stop chatter, witty comments, and constant
            stream of advice. <br /> Chandu, who complements Karan's
            talkativeness with his signature "kho kho" laughter, making them an
            inseparable pair.
            <br />
            Krishna, the "king of the corner," whose popular hangout spot is the
            center of all social gatherings. He's the go-to person for any
            problem or fun plan due to his excellent social skills. <br />
            Himanshu, the "naughty boy" and daredevil, always ready with a
            mischievous plan, adding adventure and risk to their escapades. hai.
          </p>

          <div className="wrap">
            <button className="btn">Agree</button>
            <button className="btn">Not Agree</button>
          </div>
        </div>
        <div className="pic">
          <img src="./public/image/photo.jpg" alt="" />
        </div>
      </div>
    </>
  );
};
export default Hero;
