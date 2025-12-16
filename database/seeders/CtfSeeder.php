<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Challenge;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CtfSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Categories
        $categories = [
            [
                'name' => 'Web Exploitation',
                'slug' => 'web-exploitation',
                'description' => 'Challenges involving web vulnerabilities, SQL injection, XSS, and more.',
            ],
            [
                'name' => 'Cryptography',
                'slug' => 'cryptography',
                'description' => 'Encryption, decryption, and cryptographic puzzles.',
            ],
            [
                'name' => 'Forensics',
                'slug' => 'forensics',
                'description' => 'Digital forensics, file analysis, and data recovery challenges.',
            ],
            [
                'name' => 'Reverse Engineering',
                'slug' => 'reverse-engineering',
                'description' => 'Binary analysis, malware analysis, and reverse engineering tasks.',
            ],
            [
                'name' => 'Miscellaneous',
                'slug' => 'miscellaneous',
                'description' => 'Various challenges that don\'t fit into other categories.',
            ],
        ];

        $categoryModels = [];
        foreach ($categories as $categoryData) {
            $categoryModels[$categoryData['slug']] = Category::create($categoryData);
        }

        // Create Challenges
        $challenges = [
            // Web Exploitation
            [
                'category_id' => $categoryModels['web-exploitation']->id,
                'title' => 'SQL Injection Basics',
                'description' => 'Find the flag by exploiting a SQL injection vulnerability in the login form.',
                'flag' => Hash::make('THC{SQL_INJECTION_101}'),
                'points' => 100,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['web-exploitation']->id,
                'title' => 'XSS Challenge',
                'description' => 'Inject a script to steal the admin cookie and retrieve the flag.',
                'flag' => Hash::make('THC{XSS_MASTER}'),
                'points' => 150,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['web-exploitation']->id,
                'title' => 'Directory Traversal',
                'description' => 'Navigate through directories to find the hidden flag file.',
                'flag' => Hash::make('THC{DIR_TRAVERSAL}'),
                'points' => 75,
                'is_active' => true,
            ],

            // Cryptography
            [
                'category_id' => $categoryModels['cryptography']->id,
                'title' => 'Caesar Cipher',
                'description' => 'Decode this message: KHO{FRPSXWHU_VHFXULWB}',
                'flag' => Hash::make('THC{COMPUTER_SECURITY}'),
                'points' => 50,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['cryptography']->id,
                'title' => 'Base64 Encoding',
                'description' => 'Decode this base64 string: VEhDe0JBU0U2NF9GTEFHfQ==',
                'flag' => Hash::make('THC{BASE64_FLAG}'),
                'points' => 50,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['cryptography']->id,
                'title' => 'RSA Challenge',
                'description' => 'Decrypt the RSA encrypted message using the provided public key.',
                'flag' => Hash::make('THC{RSA_DECRYPTED}'),
                'points' => 200,
                'is_active' => true,
            ],

            // Forensics
            [
                'category_id' => $categoryModels['forensics']->id,
                'title' => 'Hidden in Image',
                'description' => 'The flag is hidden in this image file. Use steganography tools to extract it.',
                'flag' => Hash::make('THC{STEGANOGRAPHY}'),
                'points' => 125,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['forensics']->id,
                'title' => 'PCAP Analysis',
                'description' => 'Analyze this network capture file to find the exfiltrated data.',
                'flag' => Hash::make('THC{PCAP_ANALYSIS}'),
                'points' => 175,
                'is_active' => true,
            ],

            // Reverse Engineering
            [
                'category_id' => $categoryModels['reverse-engineering']->id,
                'title' => 'Crack the Binary',
                'description' => 'Reverse engineer this binary to find the correct password.',
                'flag' => Hash::make('THC{REVERSE_ENGINEER}'),
                'points' => 250,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['reverse-engineering']->id,
                'title' => 'Assembly Analysis',
                'description' => 'Analyze the assembly code to understand what this program does.',
                'flag' => Hash::make('THC{ASSEMBLY_MASTER}'),
                'points' => 300,
                'is_active' => true,
            ],

            // Miscellaneous
            [
                'category_id' => $categoryModels['miscellaneous']->id,
                'title' => 'Welcome Challenge',
                'description' => 'Your first flag! Welcome to THC CTF Arena.',
                'flag' => Hash::make('THC{WELCOME_TO_THC}'),
                'points' => 10,
                'is_active' => true,
            ],
            [
                'category_id' => $categoryModels['miscellaneous']->id,
                'title' => 'OSINT Challenge',
                'description' => 'Use open source intelligence to find information about this target.',
                'flag' => Hash::make('THC{OSINT_SKILLS}'),
                'points' => 150,
                'is_active' => true,
            ],
        ];

        $challengeModels = [];
        foreach ($challenges as $challengeData) {
            $challenge = Challenge::create($challengeData);
            $challengeModels[] = $challenge;
        }

        // Create Users
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@thc.local',
                'password' => Hash::make('password'),
                'score' => 0,
                'is_admin' => true,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Alice Hacker',
                'email' => 'alice@thc.local',
                'password' => Hash::make('password'),
                'score' => 0,
                'is_admin' => false,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Bob Security',
                'email' => 'bob@thc.local',
                'password' => Hash::make('password'),
                'score' => 0,
                'is_admin' => false,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Charlie Crypto',
                'email' => 'charlie@thc.local',
                'password' => Hash::make('password'),
                'score' => 0,
                'is_admin' => false,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Diana Forensics',
                'email' => 'diana@thc.local',
                'password' => Hash::make('password'),
                'score' => 0,
                'is_admin' => false,
                'email_verified_at' => now(),
            ],
        ];

        $userModels = [];
        foreach ($users as $userData) {
            $user = User::create($userData);
            $userModels[] = $user;
        }

        // Create Submissions (some correct, some incorrect)
        // Alice solves some challenges
        $alice = $userModels[1];
        $aliceSolved = [
            $challengeModels[0], // SQL Injection - 100 points
            $challengeModels[3], // Caesar Cipher - 50 points
            $challengeModels[4], // Base64 - 50 points
            $challengeModels[10], // Welcome - 10 points
        ];
        foreach ($aliceSolved as $challenge) {
            Submission::create([
                'user_id' => $alice->id,
                'challenge_id' => $challenge->id,
                'submitted_flag' => 'THC{FLAG}',
                'is_correct' => true,
            ]);
            $alice->addScore($challenge->points);
        }
        // Add some incorrect submissions for Alice
        Submission::create([
            'user_id' => $alice->id,
            'challenge_id' => $challengeModels[1]->id,
            'submitted_flag' => 'wrong_flag',
            'is_correct' => false,
        ]);

        // Bob solves different challenges
        $bob = $userModels[2];
        $bobSolved = [
            $challengeModels[1], // XSS - 150 points
            $challengeModels[2], // Directory Traversal - 75 points
            $challengeModels[6], // Hidden in Image - 125 points
            $challengeModels[10], // Welcome - 10 points
        ];
        foreach ($bobSolved as $challenge) {
            Submission::create([
                'user_id' => $bob->id,
                'challenge_id' => $challenge->id,
                'submitted_flag' => 'THC{FLAG}',
                'is_correct' => true,
            ]);
            $bob->addScore($challenge->points);
        }

        // Charlie focuses on crypto
        $charlie = $userModels[3];
        $charlieSolved = [
            $challengeModels[3], // Caesar Cipher - 50 points
            $challengeModels[4], // Base64 - 50 points
            $challengeModels[5], // RSA - 200 points
            $challengeModels[10], // Welcome - 10 points
        ];
        foreach ($charlieSolved as $challenge) {
            Submission::create([
                'user_id' => $charlie->id,
                'challenge_id' => $challenge->id,
                'submitted_flag' => 'THC{FLAG}',
                'is_correct' => true,
            ]);
            $charlie->addScore($challenge->points);
        }

        // Diana solves forensics challenges
        $diana = $userModels[4];
        $dianaSolved = [
            $challengeModels[6], // Hidden in Image - 125 points
            $challengeModels[7], // PCAP Analysis - 175 points
            $challengeModels[10], // Welcome - 10 points
        ];
        foreach ($dianaSolved as $challenge) {
            Submission::create([
                'user_id' => $diana->id,
                'challenge_id' => $challenge->id,
                'submitted_flag' => 'THC{FLAG}',
                'is_correct' => true,
            ]);
            $diana->addScore($challenge->points);
        }

        // Add some incorrect submissions for variety
        Submission::create([
            'user_id' => $bob->id,
            'challenge_id' => $challengeModels[5]->id,
            'submitted_flag' => 'incorrect_flag_attempt',
            'is_correct' => false,
        ]);

        Submission::create([
            'user_id' => $charlie->id,
            'challenge_id' => $challengeModels[8]->id,
            'submitted_flag' => 'wrong_password',
            'is_correct' => false,
        ]);
    }
}