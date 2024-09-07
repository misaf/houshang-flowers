<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Rules\GoogleRecaptcha;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class ContactRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'string',
                'between:10, 50',
            ],
            'phone' => [
                'required','string',
                'between:5,255',
            ],
            'subject' => [
                'required',
                'string',
                'max:100',
            ],
            'description' => [
                'required',
                'string',
                'between:5,255',
            ],
            // 'g-recaptcha-response' => [
            //     Rule::requiredIf(app()->environment('production')),
            //     new GoogleRecaptcha(),
            // ],
        ];
    }
}
