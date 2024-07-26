<?php

declare(strict_types=1);

namespace App\View\Components;

use Illuminate\Support\Arr;
use Illuminate\View\Component;

final class ResponsiveImage extends Component
{
    public $fileExtension;

    public $fileName;

    public $image;

    public function __construct(array $item, array $results)
    {
        $this->setImageInformation($item, $results);
    }

    public function render()
    {
        return view('components.responsive-image');
    }

    private function setImageInformation(array $item, array $results): void
    {
        $this->image = null;

        if ( ! empty($item['relationships']['multimedia']['data'])) {
            $multimediaData = Arr::first($item['relationships']['multimedia']['data']);

            $this->image = collect($results['included'])
                ->where('type', 'multimedia')
                ->where('id', $multimediaData['id'])
                ->first();

            if ($this->image) {
                $this->fileName = pathinfo($this->image['attributes']['file_name'], PATHINFO_FILENAME);
                $this->fileExtension = pathinfo($this->image['attributes']['file_name'], PATHINFO_EXTENSION);
            }
        }
    }
}
