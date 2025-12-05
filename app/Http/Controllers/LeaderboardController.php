<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    /**
     * Display the leaderboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Get top users by score
        $users = User::select('id', 'name', 'score')
            ->orderBy('score', 'desc')
            ->orderBy('updated_at', 'asc') // Tie-breaker: earlier updates rank higher
            ->limit(100)
            ->get()
            ->map(function ($user, $index) {
                return [
                    'rank' => $index + 1,
                    'id' => $user->id,
                    'name' => $user->name,
                    'score' => $user->score,
                ];
            });

        // Get current user's rank if authenticated
        $userRank = null;
        if ($user) {
            $rank = User::where('score', '>', $user->score)
                ->orWhere(function ($query) use ($user) {
                    $query->where('score', '=', $user->score)
                          ->where('updated_at', '<', $user->updated_at);
                })
                ->count() + 1;

            $userRank = [
                'rank' => $rank,
                'name' => $user->name,
                'score' => $user->score,
            ];
        }

        return Inertia::render('ctf/Leaderboard', [
            'users' => $users,
            'userRank' => $userRank,
        ]);
    }
}

