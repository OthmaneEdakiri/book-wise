<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $profileImagePath = $this->profile_image ? 'storage/profile/' . $this->profile_image : 'storage/profile/profile_image.jpg';
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'university_id' => $this->university_id,
            'status' => $this->status,
            'role' => $this->role,
            'profile_image' => url($profileImagePath),
            'borrow_requests_count' => $this->borrow_requests_count,
            'created_at' => $this->created_at,
        ];
    }

    public static function collection($resource)
    {
        return parent::collection($resource);
    }
}
