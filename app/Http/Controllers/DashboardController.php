<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $ctfStats = null;
        if ($user) {
            $totalChallenges = Challenge::where('is_active', true)->count();
            $solvedChallenges = Submission::where('user_id', $user->id)
                ->where('is_correct', true)
                ->distinct('challenge_id')
                ->count('challenge_id');
            $totalPoints = $user->score;

            // Calculate rank
            $rank = User::where('score', '>', $user->score)
                ->orWhere(function ($query) use ($user) {
                    $query->where('score', '=', $user->score)
                          ->where('updated_at', '<', $user->updated_at);
                })
                ->count() + 1;

            $ctfStats = [
                'totalChallenges' => $totalChallenges,
                'solvedChallenges' => $solvedChallenges,
                'totalPoints' => $totalPoints,
                'rank' => $rank,
            ];
        }

        return Inertia::render('Dashboard', [
            'ctfStats' => $ctfStats,
        ]);
    }
}

