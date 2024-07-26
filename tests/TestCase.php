<?php

declare(strict_types=1);

namespace Tests;

use App\Models\Tenant\Tenant;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    protected $seed = false;

    protected function setUp(): void
    {
        parent::setUp();

        // app('laravellocalization')->setSupportedLocales(['en', 'fa']);

        // app('laravellocalization')->setLocale('fa');

        Tenant::whereSlug('nikan-human-resources')->first()->makeCurrent();

        DB::beginTransaction();
    }

    protected function tearDown(): void
    {
        DB::rollBack();

        parent::tearDown();
    }
}
