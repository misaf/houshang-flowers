<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\NewsletterSubscribeRequest;
use App\Mail\SubscribeMail;
use App\Models\Newsletter\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

final class NewsletterSubscribe extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  NewsletterSubscribeRequest $newsletterSubscribedRequest
     * @return RedirectResponse
     */
    public function __invoke(NewsletterSubscribeRequest $newsletterSubscribedRequest): RedirectResponse
    {
        $newsletterSubscriber = new NewsletterSubscriber();
        $newsletterSubscriber->name = $newsletterSubscribedRequest->route('name');
        $newsletterSubscriber->save();

        if ($newsletterSubscriber->wasRecentlyCreated) {
            Mail::to($newsletterSubscribedRequest->route('name'))->send(new SubscribeMail(route('home')));
        }

        return to_route('home');
    }
}
