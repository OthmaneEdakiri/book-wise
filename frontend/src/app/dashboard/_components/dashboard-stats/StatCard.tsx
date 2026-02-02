import ChevronDown from "@/components/icons/admin/ChevronDown";
import ChevronUp from "@/components/icons/admin/ChevronUp";
import React from "react";

interface Props {
  stat: {
    title: string;
    trend: string;
    total: Number;
    diff: Number;
  };
}

const StatCard = ({ stat }: Props) => {
  const statHandler = () => {
    switch (stat.trend) {
      case "up":
        return (
          <div className="flex items-center gap-2 text-[#2CC171]">
            <ChevronDown />
            {stat.diff.toString()}
          </div>
        );
      case "down":
        return (
          <div className="flex items-center gap-2 text-[#E27233]">
            <ChevronUp />
            {stat.diff.toString()}
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="p-5 bg-white space-y-5 rounded-[14px]">
      <div className="flex items-center gap-2.5">
        <span className="text-[#64748B]">{stat.title}</span>
        {statHandler()}
      </div>

      <h3 className="font-semibold text-[28px] leading-[32px] tracking-[-2%]">
        {stat.total.toString()}
      </h3>
    </div>
  );
};

export default StatCard;
