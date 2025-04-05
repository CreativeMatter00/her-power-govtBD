import Lottie from "lottie-react";
import herPowerLottie from "../../../../public/assets/data1.json";
import Image from "next/image";

type IDesignType = {
  logoHeight: string;
  logoWidth: string;
  text: boolean;
  textHeight: string;
  textWidth: string;
};

const Logo = (props: IDesignType) => {
  return (
    <div className="flex items-center">
      <Lottie
        animationData={herPowerLottie}
        loop={true}
        className={`${props.logoHeight} ${props.logoWidth}`}
      />
      {props.text === true && (
        <Image
          src={`/assets/logoText.png`}
          width={587}
          height={302}
          alt="Logo Text"
          className={`${props.textHeight} ${props.textWidth}`}
          priority
        />
      )}
    </div>
  );
};

export default Logo;
