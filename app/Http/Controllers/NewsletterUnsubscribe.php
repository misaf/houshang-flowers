<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\NewsletterUnSubscribeRequest;
use App\Mail\UnSubscribeMail;
use App\Models\Newsletter\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

final class NewsletterUnsubscribe extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  NewsletterUnSubscribeRequest $newsletterUnSubscribeRequest
     * @return RedirectResponse
     */
    public function __invoke(NewsletterUnSubscribeRequest $newsletterUnSubscribeRequest): RedirectResponse
    {
        $newsletterUnSubscriber = NewsletterSubscriber::where('name', $newsletterUnSubscribeRequest->input('name'));
        $newsletterUnSubscriber->delete();

        Mail::to($newsletterUnSubscribeRequest->input('name'))->send(new UnSubscribeMail(route('home')));
    }
}
