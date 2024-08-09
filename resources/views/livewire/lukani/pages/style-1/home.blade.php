@section('pageTitle', __('خرید'))

<div>
    @include('lukani.partials.banner')

    <livewire:lukani.product.widgets.style-1.product :lazy="false" />

    <x-lukani.home.widgets.intro.style1.intro />

    <livewire:lukani.blog.blogPost.widgets.style-1.latest-blog-posts :lazy="false" />

    <livewire:lukani.newsletter.widgets.style-1.newsletter :lazy="false" />
</div>
