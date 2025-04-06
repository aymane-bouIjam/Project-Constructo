<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        User::factory()->withTemporaryPassword()->create([
            'name' => 'Root',
            'email' => 'root@constructo.ma',
        ]);
    }
}
