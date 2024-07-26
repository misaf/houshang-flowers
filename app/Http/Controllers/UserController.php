<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User\User;
use Illuminate\View\View;

final class UserController extends Controller
{
    public function index(): View
    {
        $users = User::filterBySlug([
            'role' => request()->query('role'),
        ])->where('extra_attributes->visibility', 'Public')->where('status', 'Enable')->get();

        return view(config('settings.ADMIN_TEMPLATE') . '.user.index', compact('users'));
    }

    /**
     * Display the specified resource.
     *
     * @param  User $user
     * @return View
     */
    public function show(User $user): View
    {
        return view(config('settings.ADMIN_TEMPLATE') . '.user.show', compact('user'));
    }
}
