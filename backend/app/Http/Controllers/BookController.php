<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Rules\TotalCopiesRule;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort   = $request->query('sort', 'newest');

        $booksQuery = Book::query();

        if (!empty($search)) {
            $booksQuery->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('genre', 'like', "%{$search}%");
            });
        }

        match ($sort) {
            'oldest' => $booksQuery->orderBy('created_at', 'asc'),
            'newest' => $booksQuery->orderBy('created_at', 'desc'),
            'available' => $booksQuery->where('available_copies', '>', 0),
            default => $booksQuery->orderBy('created_at', 'desc'),
        };

        $books = $booksQuery->paginate(12)->withQueryString();

        return BookResource::collection($books);
    }
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'genre' => ['required', 'string', 'max:50'],
            'author' => ['required', 'string', 'max:100'],
            'total_copies' => ['required', 'integer', 'min:1', 'max:1000'],
            'image' => ['required', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:10240'],
            'summary' => ['required', 'string', 'max:1255'],
            'description' => ['required', 'string', 'max:500']
        ]);

        $this->storeUploadImage($request, $formFields);

        $formFields['available_copies'] = $formFields['total_copies'];

        $book = Book::create($formFields);

        return response()->json([
            'book' => BookResource::make($book)->resolve(),
            'message' => __('Book created successfully')
        ]);
    }

    public function show(Book $book)
    {
        return BookResource::make($book)->resolve();
    }

    public function update(Request $request, Book $book)
    {
        $formFields = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'genre' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'total_copies' => ['required', 'integer', 'min:1', 'max:1000', new TotalCopiesRule($book)],
            'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:10240'],
            'summary' => ['required', 'string', 'max:1255'],
            'description' => ['required', 'string', 'max:500']
        ]);

        $formFields['available_copies'] = $formFields['total_copies'] - $book->total_copies;

        $this->updateUploadImage($request, $formFields, $book);


        $book->fill($formFields)->save();

        return response()->json([
            'book' => $book,
            'message' => __('Book updated successfully')
        ]);
    }

    public function destroy(Book $book)
    {
        if ($book->image &&  \Illuminate\Support\Facades\Storage::disk('public')->exists($book->image)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($book->image);
        }
        $book->delete();
        return response()->json([
            'message' => __('Book deleted successfully')
        ]);
    }

    private function storeUploadImage(Request $request, array &$formFields)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            $formFields['image'] = $request->file('image')->store('book', 'public');
        }
    }

    private function updateUploadImage(Request $request, array &$formFields, Book $book)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            if ($book->image &&  \Illuminate\Support\Facades\Storage::disk('public')->exists($book->image)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($book->image);
            }

            $formFields['image'] = $request->file('image')->store('book', 'public');
        }
    }
}
