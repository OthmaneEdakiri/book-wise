import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const ChevronRight = ({ className, ...props }: IconProps) => {
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
        d="M1.91498 0.75L0.25 2.21875L5.65823 7L0.25 11.7812L1.91498 13.25L9 7L1.91498 0.75Z"
        fill="white"
      />
    </svg>
  );
};

export default ChevronRight;
