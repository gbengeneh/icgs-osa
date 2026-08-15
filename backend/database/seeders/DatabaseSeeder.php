<?php

namespace Database\Seeders;

use App\Models\AlumniSet;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([1989, 1992, 1995, 1998, 2004, 2010] as $year) AlumniSet::firstOrCreate(['year' => $year], ['description' => "ICGS graduating class of $year"]);
        $adminEmail = env('SEED_SUPER_ADMIN_EMAIL', 'admin@icgsosa.org');
        $adminPassword = env('SEED_SUPER_ADMIN_PASSWORD', 'ChangeMe123!');
        $admin = User::updateOrCreate(['email' => $adminEmail], ['name' => 'ICGS-OSA Administrator', 'password' => $adminPassword, 'graduating_year' => 1995, 'role' => 'super_admin', 'status' => 'active']);
        $primary = User::firstOrCreate(['email' => 'kayode@example.com'], ['name' => 'Kayode Arowolo', 'password' => 'ChangeMe123!', 'graduating_year' => 1998, 'occupation' => 'Business Consultant', 'location' => 'Akure, Nigeria', 'role' => 'coordinator', 'status' => 'active']);
        foreach ([['Adeola Akindele', 'adeola@example.com'], ['Morenike Adeyemi', 'morenike@example.com'], ['Femi Olatunji', 'femi@example.com']] as [$name, $email]) User::firstOrCreate(['email' => $email], ['name' => $name, 'password' => 'ChangeMe123!', 'graduating_year' => 1998, 'role' => 'member', 'status' => 'active']);
        $set = AlumniSet::where('year', 1998)->firstOrFail();
        $set->update(['coordinator_id' => $primary->id]);
        DB::table('alumni_set_admins')->updateOrInsert(['alumni_set_id' => $set->id, 'user_id' => $primary->id], ['assigned_by' => $admin->id, 'is_primary' => true, 'active' => true, 'created_at' => now(), 'updated_at' => now()]);
        Event::updateOrCreate(['title' => 'ICGS 50th Anniversary and Reunion'], ['description' => 'The biggest gathering of the ICGS alumni family, featuring networking, reminiscences, strategic engagement and alumni recognition. Fundraising is ongoing toward a befitting golden anniversary celebration.', 'starts_at' => '2026-09-03 09:00:00', 'ends_at' => '2026-09-06 18:00:00', 'location' => 'Igbotako, Ondo State', 'category' => 'Golden anniversary reunion', 'image_url' => env('FRONTEND_URL', 'http://localhost:3000') . '/icgs-50th-anniversary.jpeg', 'created_by' => $admin->id, 'published' => true, 'featured' => true]);
        $this->call(NewsSeeder::class);
    }
}
