<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class NewsletterSubscriberRequest extends FormRequest
{
    protected $stopOnFirstFailure = false;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'email',
                'between:1,255',
                'unique:newsletter_subscribers,name,' . $this->input('name') . ',id,tenant_id, ' . app('currentTenant')->id . ',deleted_at,NULL',
            ],
            'privacy_policy' => [
                'required',
                'accepted',
            ],
        ];
    }
}
