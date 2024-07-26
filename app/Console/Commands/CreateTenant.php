<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Template\Template;
use App\Models\Tenant\Tenant;
use App\Models\Tenant\TenantCategory;
use Database\Seeders\Classified\DatabaseSeeder as ClassifiedDatabaseSeeder;
use Database\Seeders\Club\DatabaseSeeder as ClubDatabaseSeeder;
use Database\Seeders\Crypto\DatabaseSeeder as CryptoDatabaseSeeder;
use Database\Seeders\Gambling\DatabaseSeeder as GamblingDatabaseSeeder;
use Database\Seeders\Shop\DatabaseSeeder as ShopDatabaseSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;

class CreateTenant extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $data['name'] = $this->ask('Enter tenant name');

        $data['package'] = $this->anticipate('Enter package of tenant', [
            'club',
            'classified',
            'shop',
            'crypto',
            'gambling',
        ]);

        $data['language'] = $this->anticipate('Enter default language of tenant', [
            'en',
            'fa',
        ]);

        $data['domain'] = $this->ask('Enter domain name');

        $tenants = [
            'club' => [
                'tenant_category_id' => TenantCategory::TENANT_CATEGORY_GENERAL,
                'template_id'        => Template::TEMPLATE_INSPINIA,
            ],
            'classified' => [
                'tenant_category_id' => TenantCategory::TENANT_CATEGORY_GENERAL,
                'template_id'        => Template::TEMPLATE_HOUZING,
            ],
            'shop' => [
                'tenant_category_id' => TenantCategory::TENANT_CATEGORY_GENERAL,
                'template_id'        => Template::TEMPLATE_FAAMA_GMBH,
            ],
            'crypto' => [
                'tenant_category_id' => TenantCategory::TENANT_CATEGORY_GENERAL,
                'template_id'        => Template::TEMPLATE_CRYPTO,
            ],
            'gambling' => [
                'tenant_category_id' => TenantCategory::TENANT_CATEGORY_GENERAL,
                'template_id'        => Template::TEMPLATE_CRYPTO,
            ],
        ];

        $tenantData = Tenant::factory()
            ->create([
                'tenant_category_id' => $tenants[$data['package']]['tenant_category_id'],
                'template_id'        => $tenants[$data['package']]['template_id'],
                'name'               => $data['name'],
                'slug'               => $data['name'],
            ]);

        if ($tenantData instanceof Tenant) {
            App::setLocale($data['language']);
            Carbon::setLocale($data['language']);

            $tenantData->tenantDomains()->create([
                'name'   => $data['domain'],
                'slug'   => $data['domain'],
                'status' => 'Enable',
            ]);

            $data['tenant'] = $tenantData;

            if ('club' === $data['package']) {
                (new ClubDatabaseSeeder())->run($data);
            }

            if ('classified' === $data['package']) {
                (new ClassifiedDatabaseSeeder())->run($data);
            }

            if ('shop' === $data['package']) {
                (new ShopDatabaseSeeder())->run($data);
            }

            if ('crypto' === $data['package']) {
                (new CryptoDatabaseSeeder())->run($data);
            }

            if ('gambling' === $data['package']) {
                (new GamblingDatabaseSeeder())->run($data);
            }
        }
    }
}
