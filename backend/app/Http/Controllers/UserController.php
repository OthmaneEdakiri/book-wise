<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Mail\AccountApprovedMail;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index()
    {
        $users = User::withCount('borrowRequests')->get();
        $admins = Admin::get();

        $all = $users->concat($admins)
            ->sortByDesc('created_at')
            ->values();

        return UserResource::collection($all)->resolve();
    }

    public function destroy(Request $request, $id)
    {
        $type = $request->query("type", "");

        if (!in_array($type, ["admin", "user"])) {
            return response()->json([
                "message" => "Invalid type. must be user or admin"
            ], 400);
        }

        $model = $type === "admin" ? Admin::class : User::class;

        $person = $model::find($id);
        if (!$person) {
            return response()->json([
                "message" => ucfirst($type) . " not found"
            ], 404);
        }

        $person->delete();

        return response()->json([
            "message" => ucfirst($type) . " deleted successfully"
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'type'   => 'required|in:user,admin',
            'current_status' => 'required|in:pending,approved,revoked',
        ]);

        $model = $validated['type'] === 'admin'
            ? Admin::class
            : User::class;

        $account = $model::findOrFail($id);

        if($validated['current_status'] === 'pending'){
            Mail::to($account->email)->send(new AccountApprovedMail($account));
        }

         $new_status = $validated['current_status'] === "approved" ? "revoked" : "approved";

        $account->update([
            'status' => $new_status,
        ]);

        return response()->json([
            'message' => 'Account status updated successfully.',
            'data' => $account,
        ]);
    }
}
