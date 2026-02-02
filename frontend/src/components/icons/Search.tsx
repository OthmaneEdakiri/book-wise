import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const Search = ({ className, ...props }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.5004 22.4999L16.4373 16.4368M16.4373 16.4368C18.0783 14.7958 19.0002 12.5701 19.0002 10.2494C19.0002 7.92862 18.0783 5.70294 16.4373 4.06194C14.7963 2.42093 12.5706 1.49902 10.2498 1.49902C7.92911 1.49902 5.70343 2.42093 4.06242 4.06194C2.42142 5.70294 1.49951 7.92862 1.49951 10.2494C1.49951 12.5701 2.42142 14.7958 4.06242 16.4368C5.70343 18.0778 7.92911 18.9997 10.2498 18.9997C12.5706 18.9997 14.7963 18.0778 16.4373 16.4368Z"
        stroke="#FFE1BD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Search;
