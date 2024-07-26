<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class ManipulationImageRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // 'name' => ['sometimes', 'string', 'between:1,100'],
            // presets
            // 'p'  => [
            //     'sometimes',
            //     'string',
            //     Rule::in(config('glide.presets'))
            // ],

            // Allowed Orientation
            'or' => ['sometimes', 'string', Rule::in(config('glide.allowed.orientation'))],

            // Width
            'w' => ['required', 'numeric', 'between:1, 10000'],

            // Height
            'h' => ['sometimes', 'numeric', 'between:1, 10000'],

            // Fit
            'fit' => ['sometimes', 'string', Rule::in(config('glide.allowed.size.fit'))],

            // Device pixel ratio
            'dpr' => [
                'sometimes',
                'numeric',
                'between:1, 8',
            ],

            // Brightness
            'bri' => [
                'sometimes',
                'numeric',
                'between:-100, 100',
            ],

            // Contrast
            'con' => [
                'sometimes',
                'numeric',
                'between:-100, 100',
            ],

            // Gamma
            'gam' => [
                'sometimes',
                'numeric',
                'between:0.1, 9.99',
            ],

            // Sharpen
            'sharp' => [
                'sometimes',
                'numeric',
                'between:0, 100',
            ],

            // Background
            'bg' => [
                'sometimes',
                'string',
                Rule::in(config('glide.allowed.background')),
            ],

            // Quality
            'q' => [
                'sometimes',
                'numeric',
                'between:0, 100',
            ],

            // Format
            'fm' => [
                'sometimes',
                'string',
                Rule::in(config('glide.allowed.format')),
            ],
        ];
    }
}
