<script lang="ts">
  import { days, priceRanges } from '$lib/constants';
  import type { Day, Venue } from '$lib/types';
  import type { LayoutProps } from './$types';

  let { data }: LayoutProps = $props();

  let { venues, allTags } = $derived(data);

  let searchQuery = $state('');
  let selectedTags = $state<string[]>([]);
  let selectedDay = $state<Day | null>(null);
  let selectedPriceRange = $state<string | null>(null);

  // Filter venues based on search criteria
  let filteredVenues = $derived(
    venues.filter((venue) => {
      // Filter by name or location
      const matchesSearch =
        searchQuery === '' ||
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by tags
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => venue.tags?.includes(tag));

      // Filter by day
      const matchesDay =
        !selectedDay ||
        venue.happyHours.some((hh) => !selectedDay || hh.days.includes(selectedDay));

      // Filter by price range
      const matchesPriceRange =
        !selectedPriceRange ||
        venue.happyHours.some((hh) => {
          const range = priceRanges.find((r) => r.label === selectedPriceRange);
          if (!range) return true;

          const hasMatchingDrink = hh.drinks?.some(
            (drink) => drink.price >= range.min && drink.price <= range.max,
          );

          const hasMatchingFood = hh.food?.some(
            (food) => food.price >= range.min && food.price <= range.max,
          );

          return hasMatchingDrink || hasMatchingFood;
        });

      return matchesSearch && matchesTags && matchesDay && matchesPriceRange;
    }),
  );

  // Toggle tag selection
  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }

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

  // Get directions URL
  function getDirectionsUrl(venue: Venue): string {
    if (venue.googlePlaceId) {
      return `https://www.google.com/maps/dir/?api=1&destination=place_id:${venue.googlePlaceId}`;
    } else if (venue.address) {
      const address = encodeURIComponent(
        `${venue.address}, ${venue.city}, ${venue.region}, ${venue.country}`,
      );
      return `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    }
    return '#';
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="mb-8 text-center text-4xl font-bold">🍻 Happy Hour Finder 🍻</h1>

  <!-- Search and Filter Section -->
  <div class="bg-base-200 mb-8 rounded-lg p-6 shadow-md">
    <div class="form-control mb-4 w-full">
      <label class="label" for="search">
        <span class="label-text">Search by name or location</span>
      </label>
      <input
        class="input input-bordered w-full"
        name="search"
        type="text"
        placeholder="Enter venue name, city, or address..."
        bind:value={searchQuery}
      />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <!-- Day Filter -->
      <div class="form-control">
        <label class="label" for="day">
          <span class="label-text">Filter by day</span>
        </label>
        <select class="select select-bordered w-full" name="day" bind:value={selectedDay}>
          <option value={null}>Any day</option>
          {#each days as day (day)}
            <option value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>
          {/each}
        </select>
      </div>

      <!-- Price Range Filter -->
      <div class="form-control">
        <label class="label" for="price-range">
          <span class="label-text">Filter by price range</span>
        </label>
        <select
          class="select select-bordered w-full"
          name="price-range"
          bind:value={selectedPriceRange}
        >
          <option value={null}>Any price</option>
          {#each priceRanges as range (range.label)}
            <option value={range.label}>{range.label}</option>
          {/each}
        </select>
      </div>

      <!-- Tags Filter -->
      {#if allTags.size > 0}
        <div class="form-control">
          <label class="label" for="tags">
            <span class="label-text">Filter by tags</span>
          </label>
          <fieldset class="mt-2 flex flex-wrap gap-2" name="tags">
            {#each allTags as tag (tag)}
              <button
                class="btn btn-sm {selectedTags.includes(tag) ? 'btn-primary' : 'btn-outline'}"
                onclick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            {/each}
          </fieldset>
        </div>
      {/if}
    </div>
  </div>

  <!-- Results Section -->
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each filteredVenues as venue (venue.slug)}
      <div class="card bg-base-100 shadow-xl">
        <!-- Image Carousel -->
        {#if venue.images && venue.images.length > 0}
          <div class="carousel h-48 w-full">
            {#each venue.images as image, i (image)}
              <div id={`slide${venue.slug}-${i}`} class="carousel-item relative w-full">
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
                      href={`#slide${venue.slug}-${i === 0 ? venue.images.length - 1 : i - 1}`}
                      class="btn btn-circle">❮</a
                    >
                    <a
                      href={`#slide${venue.slug}-${i === venue.images.length - 1 ? 0 : i + 1}`}
                      class="btn btn-circle">❯</a
                    >
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}

        <div class="card-body">
          <h2 class="card-title">{venue.name}</h2>
          <p class="text-sm">{venue.address}, {venue.city}, {venue.region}</p>

          <!-- Happy Hour Summary -->
          <div class="mt-2">
            <h3 class="font-semibold">Happy Hours:</h3>
            {#each venue.happyHours as hh (JSON.stringify(hh))}
              <div class="mt-1 text-sm">
                <span class="font-medium">{hh.days.join(', ')}</span>
                {#if hh.start && hh.end}
                  <span> ({formatTime(hh.start)} - {formatTime(hh.end)})</span>
                {/if}
                {#if hh.drinks && hh.drinks.length > 0}
                  <div class="mt-1">
                    <span class="font-medium">Drinks:</span>
                    {hh.drinks.map((d) => `${d.label} ($${d.price})`).join(', ')}
                  </div>
                {/if}
                {#if hh.food && hh.food.length > 0}
                  <div class="mt-1">
                    <span class="font-medium">Food:</span>
                    {hh.food.map((f) => `${f.label} ($${f.price})`).join(', ')}
                  </div>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Links -->
          <div class="card-actions mt-4 justify-end">
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
            <a
              href={getDirectionsUrl(venue)}
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Directions
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

          <!-- View Details Button -->
          <div class="card-actions mt-2 justify-end">
            <a href={`/venue/${venue.slug}`} class="btn btn-primary btn-sm">View Details</a>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- No Results Message -->
  {#if filteredVenues.length === 0}
    <div class="py-8 text-center">
      <h3 class="text-xl font-semibold">No venues found</h3>
      <p class="text-gray-600">Try adjusting your search criteria</p>
    </div>
  {/if}
</div>
