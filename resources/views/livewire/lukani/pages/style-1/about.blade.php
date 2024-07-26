<section class="bg-white dark:bg-gray-900">
    <div class="mx-auto px-4 mt-8">
        <div class="flex flex-col md:flex-row">
            <div class="w-full">
                @if ($errors->any())
                    <div class="text-lg text-red-800">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </div>
                @elseif (session('success'))
                    <div class="text-lg text-green-800 text-center">{{ session('success') }}</div>
                @endif

                <form class="space-y-8 p-5" action="{{ route('contacts.store') }}" method="POST">
                    @csrf

                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300" for="email">{{ __('form.email') }}</label>
                        <input type="email" name="email" class="focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-800 dark:focus:border-green-800 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="name@example.com" dir="ltr" required>
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300" for="email">{{ __('form.phone') }}</label>
                        <input type="text" name="phone" class="focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-800 dark:focus:border-green-800 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" placeholder="09121452463" dir="ltr" required>
                    </div>

                    <div>
                        @php
                            if (request()->query('name') && request()->query('slug') && request()->query('token')) {
                                $subject = 'درخواست خرید ' . request()->query('name');

                                $message = 'سلام ' . 'درخواست خرید ' . request()->query('name') . 'با کد محصول ' . request()->query('token') . ' را دارم.';
                            }
                        @endphp

                        <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300" for="subject">{{ __('form.subject') }}</label>
                        <input type="text" name="subject" class="focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-800 dark:focus:border-green-800 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" value="{{ $subject ?? '' }}" placeholder="{{ __('پیغام خود را با ما به اشتراک بگذارید') }}" required>
                    </div>

                    <div class="sm:col-span-2">
                        <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400" for="description">{{ __('form.description') }}</label>
                        <textarea name="description" class="focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-800 dark:focus:border-green-800 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" rows="6" placeholder="{{ __('پیغام شما') }}">{{ $message ?? '' }}</textarea>
                    </div>

                    <button type="submit" class="hover:bg-green-800/90 bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-green-800 px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4">{{ __('ارسال پیغام') }}</button>
                </form>
            </div>

            <div class="aspect-h-1 aspect-w-1 lg:aspect-h-1 lg:aspect-w-3 overflow-hidden my-8 w-full">
                <iframe src="https://maps.google.com/maps?width=800&height=800&hl=en&q=Tehran+Jordan+houshang-flowers&ie=UTF8&t=&z=14&iwloc=B&output=embed" class="rounded-lg" aria-hidden="false" style="border:0;" frameborder="0" allowfullscreen tabindex="0"></iframe>
            </div>
        </div>
    </div>
</section>
