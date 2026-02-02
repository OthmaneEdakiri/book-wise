<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\BorrowRequestRessource;
use App\Mail\BookBorrowedConfirmationMail;
use App\Mail\BookReturnConfirmationMail;
use App\Models\Book;
use App\Models\BorrowRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class BorrowRequestController extends Controller
{
    public function index(Request $request)
    {
        $borrowRequests = BorrowRequest::with(["user", "book"])->paginate(8);
        return BorrowRequestRessource::collection($borrowRequests);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => ["required", "exists:books,id"]
        ]);

        $book_id = $validated["book_id"];
        $user_id = Auth::id();

        $exists = BorrowRequest::where("user_id", $user_id)
            ->where("book_id", $book_id)
            ->whereIn('status', ['pending', 'borrowed', 'overdue'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'You already have a request or active borrow for this book.'
            ], 409);
        }

        $borrowRequest = BorrowRequest::create([
            "book_id" => $book_id,
            "user_id" => $user_id,
            "status" => "pending"
        ]);

        return response()->json([
            'message' => 'Borrow request created successfully.',
            'data' => $borrowRequest
        ]);
    }

    public function updateStatus(Request $request, BorrowRequest $borrowRequest)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['pending', 'borrowed', 'returned', 'overdue', 'expired'])]
        ]);

        // pending -> borrowed
        if ($borrowRequest->status === 'pending' && $validated['status'] === 'borrowed') {
            $book = Book::findOrFail($borrowRequest->book_id);

            if ($book->available_copies <= 0) {
                return response()->json([
                    'message' => 'No available copies for this book.',
                    'book_id' => $book->id,
                ], 409);
            }

            Mail::to($borrowRequest->user->email)->send(new BookBorrowedConfirmationMail($borrowRequest));

            $borrowRequest->update([
                'status'        => 'borrowed',
                'borrowed_date' => Carbon::now(),
                'due_date'      => Carbon::now()->addDays(10),
            ]);

            $book->update([
                'available_copies' => $book->available_copies - 1
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'data'    => $borrowRequest,
            ], 200);
        }

        // borrowed -> returned
        if ($borrowRequest->status === 'borrowed' && $validated['status'] === 'returned') {
            $book = Book::findOrFail($borrowRequest->book_id);
            $borrowRequest->update([
                'status'      => 'returned',
                'return_date' => Carbon::now(),
            ]);

            Mail::to($borrowRequest->user->email)->send(new BookReturnConfirmationMail($borrowRequest));

            $book->update([
                'available_copies' => $book->available_copies + 1
            ]);

            return response()->json([
                'message' => 'Status updated successfully.',
                'data'    => $borrowRequest,
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid status transition.',
            'current_status' => $borrowRequest->status,
            'requested_status' => $validated['status'],
        ], 422);
    }

    public function userRequests(Request $request)
    {
        $user = $request->user();
        $borrowRequests = BorrowRequest::where('user_id', $user->id)
            ->with('book')
            ->get();

        return BorrowRequestRessource::collection($borrowRequests)->resolve();
    }
}
