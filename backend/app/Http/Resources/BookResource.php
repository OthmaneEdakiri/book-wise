<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'genre' => $this->genre,
            'author' => $this->author,
            'total_copies' => $this->total_copies,
            'available_copies' => $this->available_copies,
            'image' => url('storage/'. $this->image),
            'summary' => $this->summary,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'rating' => $this->rating,
        ];
    }

    public static function collection($resource)
    {
        return parent::collection($resource);
    }
}
