<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class NewsletterUnSubscribeRequest extends FormRequest
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
                'unique:newsletter_subscribers,name,tenant_id, ' . app('currentTenant')->id . ',deleted_at,NULL',
            ],
        ];
    }
}
