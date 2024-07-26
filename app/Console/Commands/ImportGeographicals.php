<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportGeographicals extends Command
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
    protected $signature = 'command:ImportGeographicals';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tenant = DB::table('tenants')->whereName($this->ask('Enter tenant name'))->first();

        DB::table('countries')->oldest('id')->each(function ($item) use ($tenant): void {
            DB::table('geographical_countries')->insert([
                'tenant_id'            => $tenant->id,
                'geographical_zone_id' => DB::table('geographical_zones')->where('tenant_id', $tenant->id)->value('id'),
                'name'                 => $item->name,
                'slug'                 => Str::slug($item->name),
                'iso_code'             => $item->shortname,
                'created_at'           => date('Y-m-d H:i:s'),
                'updated_at'           => date('Y-m-d H:i:s'),
            ]);
        });

        DB::table('states')->oldest('country_id')->each(function ($item) use ($tenant): void {
            $country = DB::table('countries')->find($item->country_id);

            DB::table('geographical_states')->insert([
                'tenant_id'               => $tenant->id,
                'geographical_country_id' => DB::table('geographical_countries')->where('tenant_id', $tenant->id)->whereName($country->name)->value('id'),
                'name'                    => $item->name,
                'slug'                    => Str::slug($item->name),
                'created_at'              => date('Y-m-d H:i:s'),
                'updated_at'              => date('Y-m-d H:i:s'),
            ]);
        });

        DB::table('cities')->oldest('state_id')->each(function ($item) use ($tenant): void {
            $state = DB::table('states')->find($item->state_id);

            DB::table('geographical_cities')->insert([
                'tenant_id'             => $tenant->id,
                'geographical_state_id' => DB::table('geographical_states')->where('tenant_id', $tenant->id)->whereName($state->name)->value('id'),
                'name'                  => $item->name,
                'slug'                  => Str::slug($item->name),
                'created_at'            => date('Y-m-d H:i:s'),
                'updated_at'            => date('Y-m-d H:i:s'),
            ]);
        });
    }
}
