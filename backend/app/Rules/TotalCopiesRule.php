<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class TotalCopiesRule implements Rule
{
    protected $book;

    public function __construct($book)
    {
        $this->book = $book;
    }

    public function passes($attribute, $value)
    {
        $borrowed_book = $this->book->total_copies - $this->book->available_copies;
        return $value >= $borrowed_book;
    }

    public function message()
    {
        $borrowed_book = $this->book->total_copies - $this->book->available_copies;
        return "Total copies cannot be less than the number of borrowed copies ({$borrowed_book}).";
    }
}
