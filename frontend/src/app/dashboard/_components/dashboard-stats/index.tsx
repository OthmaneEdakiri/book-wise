import React, { Suspense } from "react";
import StatCard from "./StatCard";
import DashboardCardLoader from "../DashboardCardLoader";

interface Props {
  stats: {
    books: {
      total: Number;
      diff: Number;
      trend: string;
    };

    borrow_requests: {
      total: Number;
      diff: Number;
      trend: string;
    };

    users: {
      total: Number;
      diff: Number;
      trend: string;
    };
  };
}

const DashboardStats = ({ stats }: Props) => {
  const statsItems = [
    {
      title: "Barrowed Books",
      trend: stats.borrow_requests.trend,
      total: stats.borrow_requests.total,
      diff: stats.borrow_requests.diff,
    },
    {
      title: "Total Users",
      trend: stats.users.trend,
      total: stats.users.total,
      diff: stats.users.diff,
    },
    {
      title: "Total Books",
      trend: stats.books.trend,
      total: stats.books.total,
      diff: stats.books.diff,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {statsItems.map((stat, index) => (
        <Suspense key={index} fallback={<DashboardCardLoader />}>
          <StatCard stat={stat} />
        </Suspense>
      ))}
    </div>
  );
};

export default DashboardStats;
