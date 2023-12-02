<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(OrganizationsTableSeeder::class);
        $this->call(ProjectsTableSeeder::class);
        $this->call(MilestonesTableSeeder::class);
        $this->call(DeliverablesTableSeeder::class);
        $this->call(InvoicesTableSeeder::class);
        $this->call(NotificationsTableSeeder::class);
   
    }
}
