import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const ChevronLeft = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={className}
      width="9"
      height="14"
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.08502 0.75L8.75 2.21875L3.34177 7L8.75 11.7812L7.08502 13.25L0 7L7.08502 0.75Z"
        fill="white"
      />
    </svg>
  );
};

export default ChevronLeft;
