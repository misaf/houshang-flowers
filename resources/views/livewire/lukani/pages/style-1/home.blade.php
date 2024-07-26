<div>
    <!-- Banner -->
    @include('lukani.partials.banner')

    <!-- Product Category -->
    <livewire:lukani.product.widgets.style1.product :lazy="false" />

    <!-- Intro -->
    <x-lukani.home.widgets.intro.style1.intro />

    <!-- BlogPosts -->
    <livewire:lukani.blog.blogPost.widgets.style1.latest-blog-posts :lazy="false" />

    <!-- Newsletter -->
    <livewire:lukani.newsletter.widgets.style1.newsletter :lazy="false" />
</div>
