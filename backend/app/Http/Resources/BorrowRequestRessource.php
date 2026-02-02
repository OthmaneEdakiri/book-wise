<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowRequestRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "book" => new BookResource($this->book),
            "user" => $this->when(
                ! $request->routeIs('borrow-requests.my'),
                new UserResource($this->user)
            ),
            "status" => $this->status,
            "borrowed_date" => $this->borrowed_date,
            "due_date" => $this->due_date,
            "return_date" => $this->return_date,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }

    public static function collection($resource)
    {
        return parent::collection($resource);
    }
}
