@section('pageTitle', __('خرید'))

<div>
    <!-- Banner -->
    @include('lukani.partials.banner')

    <!-- Product Category -->
    <livewire:lukani.product.widgets.style-1.product :lazy="false" />

    <!-- Intro -->
    <x-lukani.home.widgets.intro.style-1.intro />

    <!-- BlogPosts -->
    <livewire:lukani.blog.blogPost.widgets.style-1.latest-blog-posts :lazy="false" />

    <!-- Newsletter -->
    <livewire:lukani.newsletter.widgets.style-1.newsletter :lazy="false" />
</div>
