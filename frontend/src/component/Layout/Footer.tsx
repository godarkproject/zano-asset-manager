import Logo from "../../assets/zanohub_network.svg";

export const Footer = () => {
  return (
    <div
      className="btm-nav z-30 flex justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
    shadow-sm"
    >
      <div></div>
      <div>
        <img src={Logo} width={110} alt="" />
      </div>
      <div></div>
    </div>
  );
};
