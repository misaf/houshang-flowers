<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Page\Page;
use Illuminate\View\View;

final class PageController extends Controller
{
    public function show(Page $page): View
    {
        return view(config('settings.ADMIN_TEMPLATE') . '.page.show', compact('page'));
    }
}
