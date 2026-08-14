<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env(
            'SEED_SUPER_ADMIN_EMAIL',
            'admin@icgsosa.org'
        );

        $admin = User::where('email', $adminEmail)
            ->where('role', 'super_admin')
            ->firstOrFail();

        News::updateOrCreate(
            [
                'slug' => 'golden-jubilee-a-homecoming-fifty-years-in-the-making',
            ],
            [
                'title' => 'Golden Jubilee: A Homecoming Fifty Years in the Making',
                'category' => 'Golden Jubilee',
                'excerpt' => 'As ICGS approaches its golden anniversary, generations of old students are preparing to return, reconnect and renew their commitment to the school that shaped them.',
                'body' => <<<'TEXT'
In September 2026, the Igbotako Community Grammar School family will gather for more than an anniversary. It will be a homecoming built around memory, gratitude and a shared responsibility for the future.

Fifty years of education have produced teachers, entrepreneurs, public servants, professionals and community leaders across Nigeria and beyond. Though their journeys have taken different directions, the values learned at ICGS continue to connect them: knowledge, character and service.

The reunion programme is being designed to make room for meaningful conversations as well as celebration. Alumni will reconnect with classmates, honour those who served the school, recognise outstanding contributions and consider practical ways to strengthen opportunities for today’s students.

Fundraising remains an important part of the preparation. Every contribution—financial support, professional expertise, volunteering or advocacy—will help the association deliver a fitting celebration and establish a stronger foundation for the years ahead.

The golden jubilee belongs to every graduating set and every member of the wider ICGS family. As September approaches, alumni are encouraged to update their profiles, reconnect with their set administrators and participate in the planning. Fifty years is a remarkable milestone; what we build together from it can become an even greater legacy.
TEXT,
                'image_url' => config('app.url')
                    . '/storage/news/golden-reunion-community.png',
                'created_by' => $admin->id,
                'pinned' => true,
                'featured' => true,
                'published_at' => now(),
            ]
        );

        News::updateOrCreate(
            [
                'slug' => 'alumni-mentorship-turning-experience-into-opportunity',
            ],
            [
                'title' => 'Alumni Mentorship: Turning Experience into Opportunity',
                'category' => 'Education & Impact',
                'excerpt' => 'A new mentorship focus will connect experienced alumni with students who need practical career guidance, encouragement and a clearer view of the opportunities ahead.',
                'body' => <<<'TEXT'
The most valuable resource within an alumni association is not only its network—it is the experience carried by its members. Across professions, industries and communities, ICGS old students have lessons that can help younger people make better-informed decisions about education, careers and service.

The association’s mentorship initiative is intended to turn that experience into structured support for students. Alumni volunteers will share practical guidance on choosing courses, preparing for further education, developing workplace skills and understanding the character required to succeed over the long term.

Mentorship works best when it is consistent and personal. Beyond occasional speeches, the programme will encourage small-group conversations, career clinics and follow-up sessions where students can ask honest questions and receive realistic advice. It will also expose students to a wider range of professions and pathways than they may encounter in their immediate environment.

For alumni, the initiative offers a direct and meaningful way to give back. A single conversation can help a student recognise an ability, avoid a costly mistake or imagine a future that previously felt out of reach.

Members interested in volunteering will be invited to indicate their professional field and availability through the alumni portal. Together, the association can ensure that the knowledge earned by one generation becomes an opportunity for the next.
TEXT,
                'image_url' => config('app.url')
                    . '/storage/news/alumni-mentorship.png',
                'created_by' => $admin->id,
                'pinned' => true,
                'featured' => false,
                'published_at' => now()->subMinute(),
            ]
        );
    }
}
