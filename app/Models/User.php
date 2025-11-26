<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'score',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'score' => 'integer',
            'is_admin' => 'boolean',
        ];
    }

    /**
     * Get the submissions for the user.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    /**
     * Get the challenges that the user has solved.
     */
    public function challengesSolved(): BelongsToMany
    {
        return $this->belongsToMany(Challenge::class, 'submissions')
            ->wherePivot('is_correct', true);
    }

    /**
     * Check if the user has solved a specific challenge.
     */
    public function hasSolved(Challenge $challenge): bool
    {
        return $this->submissions()
            ->where('challenge_id', $challenge->id)
            ->where('is_correct', true)
            ->exists();
    }

    /**
     * Add points to the user's score.
     */
    public function addScore(int $points): void
    {
        $this->increment('score', $points);
    }
}
