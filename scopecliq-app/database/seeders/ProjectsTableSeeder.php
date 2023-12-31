<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
 
    public function run(): void
    {

        $termsPlaceholder = 
"Text Content - All content material (copy, product images and details, etc)  is to be provided by the client. Should more content be needed, we can arrange for Content Creation to complete missing pieces of the website. (*See add-ons)

Images - We primarily use images provided by clients. Additionally, we are free to use CC0 License images (a.k.a. Free License Images ) available online.

Requests and revisions - Realistically, revisions are always part of any design process which is why revision rounds are allotted to the project. Once designs are approved and implemented on the website and/or when allotted revisions are exhausted, additional requests will be billed separately at  regular hourly rate. Itemized invoice of revision work order will be issued for your approval before we proceed.

What is minor and major revision? Moving photos and text around the page and changing colors mean we are doing layout changes and that's a major revision. However, changing a short text phrase here and there is a minor revision.
    3 revisions max for homepage
    2 revisions max for template-pages
    1 revision per regular page

Technical Support and Website Care - Technical support and minor troubleshooting. Should you need substantial amount of regular posting of products and other content, feel free to check the addons.";

        DB::table('projects')->insert([
            [
                'organization_id' => 1,
                'name' => 'WaveKo Surf Lounge',
                'about' => 'Design and build of resort villa',
                'budget' => 88000,
                'portal_domain' => 'waveko',
                'portal_password' => 'beach',
                'datetime_due' => Carbon::create(2023, 12, 15, 0, 0, 0),
                'consultant_user_id' => 1,
                'terms' => $termsPlaceholder,
            ],
            [
                'organization_id' => 2,
                'name' => 'Siesta Farm and Restaurant',
                'about' => 'Markekting package. Farm to table artisinal easy dining',
                'budget' => 40600,
                'portal_domain' => 'siesta',
                'portal_password' => 'pizza',
                'datetime_due' => null,
                'consultant_user_id' => 1,
                'terms' => $termsPlaceholder,
            ],
            [
                'organization_id' => 3,
                'name' => 'Lettered Leather',
                'about' => 'Markating package. Local leathered goods',
                'budget' => 8000,
                'portal_domain' => 'lettered-leather',
                'portal_password' => 'luna',
                'datetime_due' => Carbon::create(2023, 12, 25, 0, 0, 0),
                'consultant_user_id' => 1,
                'terms' => $termsPlaceholder,
            ],
            [
                'organization_id' => 2,
                'name' => 'TechMate',
                'about' => 'Mobile App',
                'budget' => 8000,
                'portal_domain' => 'techmate',
                'portal_password' => 'luna',
                'datetime_due' => Carbon::create(2023, 11, 29, 0, 0, 0),
                'consultant_user_id' => 1,
                'terms' => $termsPlaceholder,        
            ],

            [
                'organization_id' => 2,
                'name' => 'Truck Flow Digital',
                'about' => 'Logistic system',
                'budget' => 4200,
                'portal_domain' => 'truckflow',
                'portal_password' => 'bobcat',
                'datetime_due' => Carbon::create(2023, 9, 1, 0, 0, 0),
                'consultant_user_id' => 1,
                'terms' => $termsPlaceholder,
            ],
        ]);
    }
}
