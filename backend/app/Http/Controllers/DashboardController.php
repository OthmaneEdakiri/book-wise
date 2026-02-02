<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BorrowRequest;
use App\Models\User;

class DashboardController extends Controller
{
    public function stats()
    {
        $startLastMonth = now()->subMonth()->startOfMonth();
        $endLastMonth   = now()->subMonth()->endOfMonth();

        $startPrevMonth = now()->subMonths(2)->startOfMonth();
        $endPrevMonth   = now()->subMonths(2)->endOfMonth();

        // BOOKS
        $booksLastMonth = Book::whereBetween('created_at', [$startLastMonth, $endLastMonth])->count();
        $booksPrevMonth = Book::whereBetween('created_at', [$startPrevMonth, $endPrevMonth])->count();

        // BORROW REQUESTS
        $borrowsLastMonth = BorrowRequest::whereBetween('created_at', [$startLastMonth, $endLastMonth])->count();
        $borrowsPrevMonth = BorrowRequest::whereBetween('created_at', [$startPrevMonth, $endPrevMonth])->count();

        // USERS
        $usersLastMonth = User::whereBetween('created_at', [$startLastMonth, $endLastMonth])->count();
        $usersPrevMonth = User::whereBetween('created_at', [$startPrevMonth, $endPrevMonth])->count();

        return response()->json([
            'books' => $this->monthlyStats(
                Book::count(),
                $booksLastMonth,
                $booksPrevMonth
            ),

            'borrow_requests' => $this->monthlyStats(
                BorrowRequest::count(),
                $borrowsLastMonth,
                $borrowsPrevMonth
            ),

            'users' => $this->monthlyStats(
                User::count(),
                $usersLastMonth,
                $usersPrevMonth
            ),
        ]);
    }

    private function monthlyStats($total, $lastMonth, $prevMonth)
    {
        $diff = $lastMonth - $prevMonth;

        return [
            'total'        => $total,
            'diff'         => abs($diff),
            'trend'        => $diff > 0 ? 'up' : ($diff < 0 ? 'down' : 'same'),
        ];
    }
}
