@extends('lukani.layout', ['pageTitle' => __(request()->query('sort') ? 'product.' . request()->query('sort') . '_products' : 'products')])

@section('content')
    <x-tailwind-ui.ecommerce.components.category-filters.inline-actions-and-expandable-sidebar-filters />
@endsection
