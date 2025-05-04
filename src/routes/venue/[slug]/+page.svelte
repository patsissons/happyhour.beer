<script lang="ts">
  import { typeEmojis } from '$lib/constants';
  import type { Venue } from '$lib/types';
  import type { LayoutProps } from './$types';

  let { data }: LayoutProps = $props();

  let { venue } = $derived(data);

  // Format time for display
  function formatTime(time: string | undefined): string {
    if (!time) return '';

    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${ampm}`;
  }

  // Get Google Maps URL
  function getGoogleMapsUrl(venue: Venue): string {
    if (venue.googlePlaceId) {
      return `https://www.google.com/maps/place/?q=place_id:${venue.googlePlaceId}`;
    } else if (venue.address) {
      const address = encodeURIComponent(
        `${venue.address}, ${venue.city}, ${venue.region}, ${venue.country}`,
      );
      return `https://www.google.com/maps/search/?api=1&query=${address}`;
    }
    return '#';
  }

  // Format day names
  function formatDay(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1, 3);
  }
</script>

{#if venue}
  <div class="container mx-auto px-4 py-8">
    <!-- Back Button -->
    <a href="/" class="btn btn-ghost mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Search
    </a>

    <!-- Venue Header -->
    <div class="bg-base-200 mb-8 rounded-lg p-6 shadow-md">
      <div class="flex flex-col gap-6 md:flex-row">
        <!-- Image Carousel -->
        {#if venue.images && venue.images.length > 0}
          <div class="w-full md:w-1/3">
            <div class="carousel h-64 w-full overflow-hidden rounded-lg">
              {#each venue.images as image, i (image)}
                <div id={`slide${i}`} class="carousel-item relative w-full">
                  <img
                    src={image}
                    class="h-full w-full object-cover"
                    alt={`${venue.name} image ${i + 1}`}
                  />
                  {#if venue.images.length > 1}
                    <div
                      class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between"
                    >
                      <a
                        href={`#slide${i === 0 ? venue.images.length - 1 : i - 1}`}
                        class="btn btn-circle">❮</a
                      >
                      <a
                        href={`#slide${i === venue.images.length - 1 ? 0 : i + 1}`}
                        class="btn btn-circle">❯</a
                      >
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Venue Info -->
        <div class="flex-1">
          <h1 class="mb-2 text-3xl font-bold">{venue.name}</h1>
          <p class="mb-4 text-lg">{venue.address}, {venue.city}, {venue.region}, {venue.country}</p>

          {#if venue.description}
            <p class="mb-4">{venue.description}</p>
          {/if}

          {#if venue.notes}
            <p class="text-base-content/70 mb-4 text-xs">{venue.notes}</p>
          {/if}

          {#if venue.tags && venue.tags.length > 0}
            <div class="mb-4 flex gap-1">
              {#each venue.tags || [] as tag (tag)}
                <span class="badge badge-secondary h-auto px-1 text-xs">{tag}</span>
              {/each}
            </div>
          {/if}

          <!-- Contact Links -->
          <div class="mb-4 flex flex-wrap gap-2">
            <a
              href={getGoogleMapsUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Map
            </a>
            {#if venue.website}
              <a href={venue.website} target="_blank" rel="noopener noreferrer" class="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Website
              </a>
            {/if}
            {#if venue.phone}
              <a href={`tel:${venue.phone}`} class="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call
              </a>
            {/if}
            {#if venue.email}
              <a href={`mailto:${venue.email}`} class="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email
              </a>
            {/if}
          </div>

          <!-- Social Links -->
          {#if venue.socials && venue.socials.length > 0}
            <div class="flex gap-2">
              {#each venue.socials as social (social.type)}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-circle btn-sm"
                >
                  {#if social.type === 'facebook'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  {:else if social.type === 'instagram'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  {:else if social.type === 'twitter'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  {/if}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Happy Hours Section -->
    <div class="bg-base-200 mb-8 rounded-lg p-6 shadow-md">
      <h2 class="mb-4 text-2xl font-bold">Happy Hours</h2>

      {#if venue.happyHours.length === 0}
        <p>No happy hour information available.</p>
      {:else}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {#each venue.happyHours as hh (JSON.stringify(hh))}
            <div class="card bg-base-100 shadow-md">
              <div class="card-body">
                <h3 class="card-title">
                  {hh.days.map(formatDay).join(', ')}
                </h3>

                {#if hh.start || hh.end}
                  <p class="text-base-content/70 text-sm font-medium">
                    {hh.start ? formatTime(hh.start) : 'Open'} - {hh.end
                      ? formatTime(hh.end)
                      : 'Close'}
                  </p>
                {:else}
                  <p class="text-lg font-medium">All day</p>
                {/if}

                {#if hh.notes}
                  <p class="text-sm italic">{hh.notes}</p>
                {/if}

                {#if hh.drinks && hh.drinks.length > 0}
                  <div class="mt-4">
                    <h4 class="text-lg font-semibold">Drinks</h4>
                    <div class="overflow-x-auto">
                      <table class="table-zebra table-xs table w-full">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Price</th>
                            {#if hh.drinks.some((d) => d.notes)}
                              <th>Notes</th>
                            {/if}
                          </tr>
                        </thead>
                        <tbody>
                          {#each hh.drinks as drink (drink.label)}
                            <tr>
                              <td class="text-center"
                                >{typeEmojis.drink[drink.type] || typeEmojis.drink.default}</td
                              >
                              <td>{drink.label}</td>
                              <td>${drink.price}</td>
                              {#if hh.drinks.some((d) => d.notes)}
                                <td>{drink.notes || ''}</td>
                              {/if}
                            </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  </div>
                {/if}

                {#if hh.food && hh.food.length > 0}
                  <div class="mt-4">
                    <h4 class="text-lg font-semibold">Food</h4>
                    <div class="overflow-x-auto">
                      <table class="table-zebra table w-full">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Item</th>
                            <th>Price</th>
                            {#if hh.food.some((f) => f.notes)}
                              <th>Notes</th>
                            {/if}
                          </tr>
                        </thead>
                        <tbody>
                          {#each hh.food as food (food.label)}
                            <tr>
                              <td class="text-center"
                                >{typeEmojis.food[food.type] || typeEmojis.food.default}</td
                              >
                              <td>{food.label}</td>
                              <td>${food.price}</td>
                              {#if hh.food.some((f) => f.notes)}
                                <td>{food.notes || ''}</td>
                              {/if}
                            </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Menus Section -->
    {#if venue.menus && venue.menus.length > 0}
      <div class="bg-base-200 mb-8 rounded-lg p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-bold">Menus</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {#each venue.menus as menu (menu.label)}
            <a
              href={menu.url}
              target="_blank"
              rel="noopener noreferrer"
              class="card bg-base-100 shadow-md transition-shadow hover:shadow-lg"
            >
              {#if menu.image}
                <figure class="px-4 pt-4">
                  <img
                    src={menu.image}
                    alt={menu.label}
                    class="h-32 w-full rounded-xl object-cover"
                  />
                </figure>
              {/if}
              <div class="card-body">
                <h3 class="card-title">{menu.label}</h3>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class="container mx-auto px-4 py-8 text-center">
    <h1 class="mb-4 text-3xl font-bold">Venue Not Found</h1>
    <p class="mb-4">The venue you're looking for doesn't exist or has been removed.</p>
    <a href="/" class="btn btn-primary">Back to Search</a>
  </div>
{/if}
