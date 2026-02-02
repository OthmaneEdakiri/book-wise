"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BorrowRequestStatus } from "@/constants/enums";
import { updateBorrowStatus } from "@/lib/actions/borrow-request";
import { BorrowRequestWithRelation } from "@/types/borrow-request";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SelectStatus = ({
  currentStatus,
  borrowId,
}: {
  currentStatus: BorrowRequestWithRelation['status'];
  borrowId: BorrowRequestWithRelation['id'];
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const statusStyles: Record<string, string> = {
    [BorrowRequestStatus.BORROWED]: "text-[#6941C6] bg-[#F9F5FF]",
    [BorrowRequestStatus.EXPIRED]: "text-[#344054] bg-[#F2F4F7]",
    [BorrowRequestStatus.OVERDUE]: "text-[#C01048] bg-[#FFF1F3]",
    [BorrowRequestStatus.PENDING]: "text-[#B54708] bg-[#FFFAEB]",
    [BorrowRequestStatus.RETURNED]: "text-[#026AA2] bg-[#F0F9FF]",
  };

  const items = [
    {
      label: "Pending",
      value: BorrowRequestStatus.PENDING,
    },
    {
      label: "Borrowed",
      value: BorrowRequestStatus.BORROWED,
    },
    {
      label: "Expired",
      value: BorrowRequestStatus.EXPIRED,
    },
    {
      label: "overdue",
      value: BorrowRequestStatus.OVERDUE,
    },
    {
      label: "returned",
      value: BorrowRequestStatus.RETURNED,
    },
  ];

  const allowedTransitions: Record<string, string[]> = {
    [BorrowRequestStatus.PENDING]: [BorrowRequestStatus.BORROWED],
    [BorrowRequestStatus.BORROWED]: [BorrowRequestStatus.RETURNED],
    [BorrowRequestStatus.OVERDUE]: [BorrowRequestStatus.RETURNED],
    [BorrowRequestStatus.EXPIRED]: [],
    [BorrowRequestStatus.RETURNED]: [],
  };

  const visibleItems = items.filter((item) =>
    allowedTransitions[currentStatus]?.includes(item.value)
  );

  const changeStatusHandler = async (newStatus: BorrowRequestWithRelation['status']) => {
    setLoading(true);
    const response = await updateBorrowStatus(borrowId, newStatus);

    if (response.status === 200) {
      setStatus(response.newStatus);
      setLoading(false);
      toast.success(response.message);
    } else {
      setLoading(false);
      toast.warning(response.message);
    }
  };

  if (loading) {
    return <Loader2 className="animate-spin h-7 w-7" />;
  }

  return (
    <Select value={status} onValueChange={changeStatusHandler}>
      <SelectTrigger
        className={`${statusStyles[status]}  !h-[24px] rounded-2xl border-0 shadow-none [&>svg]:hidden capitalize focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
      >
        <SelectValue className={`font-[500] px-2.5`}>{status}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {visibleItems.length === 0 ? (
            <SelectLabel className="text-gray-500 px-2 py-1 text-sm">
              No actions available
            </SelectLabel>
          ) : (
            visibleItems.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                <span
                  className={`${
                    statusStyles[item.value]
                  } font-[500] px-2.5 h-[24px] rounded-2xl block`}
                >
                  {item.label}
                </span>
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
