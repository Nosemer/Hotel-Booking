<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ Define permissions
        $permissions = [
            'view branches',
            'manage branches',
            'view rooms',
            'manage rooms',
            'view room types',
            'manage room types',
            'view discounts',
            'manage discounts',
            'view vouchers',
            'manage vouchers',
            'view bookings',
            'manage bookings',
            'approve bookings',
            'cancel bookings',
            'book room',
        ];

        // ✅ Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ✅ Create roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $receptionist = Role::firstOrCreate(['name' => 'receptionist']);
        $customer = Role::firstOrCreate(['name' => 'customer']);

        // ✅ Assign permissions to roles
        $admin->givePermissionTo(Permission::all());

        $receptionist->givePermissionTo([
            'view branches',
            'view rooms',
            'view room types',
            'view bookings',
            'manage bookings',
            'approve bookings',
            'cancel bookings',
            'view discounts',
            'view vouchers',
        ]);

        $customer->givePermissionTo([
            'view rooms',
            'book room',
            'view bookings',
            'view vouchers',
        ]);
    }
}
