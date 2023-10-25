import { useState } from "react";
import cn from "classnames";
import '../../styles/global.css'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
  }
const Image = ({ className, ...props } : ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img alt="img"
      className={cn("inline-block align-top opacity-0 transition-opacity", {
        "opacity-100": loaded,
        [className!]: className,
      })}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
};

export default Image;
