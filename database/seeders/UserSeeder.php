<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 🔐 Only create the user if it doesn't exist
        if (!User::where('email', 'admin@gmail.com')->exists()) {

            // Create the Admin user
            $admin = User::create([
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // ✅ Optional: make sure the role exists
            $adminRole = Role::firstOrCreate(['name' => 'admin']);
            $admin->assignRole($adminRole);

            // ✅ Assign all permissions to admin
            $admin->givePermissionTo(Permission::all());
        }
    }
}
