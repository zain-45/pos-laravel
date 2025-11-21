<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if user already exists
        $existingUser = User::where('email', 'admin@infy-pos.com')->first();
        if ($existingUser) {
            $this->command->info('Default admin user already exists. Skipping user creation.');
            return;
        }

        $input = [
            'first_name' => 'admin',
            'email' => 'admin@infy-pos.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123456'),
            'status' => 1,
            'language' => 'en',
        ];
        $user = User::create($input);
        
        /** @var Role $adminRole */
        $adminRole = Role::whereName('admin')->first();
        if ($user && $adminRole) {
            $user->assignRole($adminRole);
            $this->command->info('Default admin user created successfully.');
        } elseif (!$adminRole) {
            $this->command->warn('Admin role not found. User created but role not assigned. Please run DefaultRoleSeeder first.');
        }
    }
}
