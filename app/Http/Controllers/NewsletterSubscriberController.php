<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\NewsletterSubscriberRequest;
use App\Mail\NewsletterSubscriberMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

final class NewsletterSubscriberController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  NewsletterSubscriberRequest $newsletterSubscriberRequest
     * @return RedirectResponse
     */
    public function store(NewsletterSubscriberRequest $newsletterSubscriberRequest): RedirectResponse
    {
        $url = URL::temporarySignedRoute(
            'newsletter-subscribers.subscribe',
            Carbon::now()->addMinutes(60),
            [
                'name' => $newsletterSubscriberRequest->input('name'),
            ],
        );

        if ($url) {
            Mail::to($newsletterSubscriberRequest->input('name'))->send(new NewsletterSubscriberMail($url));
        }

        return back();
    }
}
