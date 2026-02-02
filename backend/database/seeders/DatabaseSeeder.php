<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(5)->create();

        User::create([
            'firstname' => 'othmane',
            'lastname' => 'user',
            "university_id" => 90324423789,
            'email' => 'user@example.com',
            'password' => '12345678'
        ]);

        Admin::create([
            'firstname' => 'othmane',
            'lastname' => 'user',
            "university_id" => 45641243423,
            'email' => 'admin@example.com',
            'password' => '12345678'
        ]);
    }
}
