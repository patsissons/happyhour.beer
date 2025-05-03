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

  const drinkTypeEmojis: Record<string, string> = {
    beer: '🍺',
    wine: '🍷',
    cocktail: '🍸',
    champers: '🍾',
  };

  const foodTypeEmojis: Record<string, string> = {
    burger: '🍔',
    pizza: '🍕',
    sushi: '🍣',
    wings: '🍗',
  };

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
</script>

<div class="grid h-full grid-rows-[auto_1fr_auto]">
  <header class="bg-base-200 z-10 pb-2 shadow-md">
    <div class="container mx-auto">
      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-[1fr_auto_1fr] gap-2">
          <div></div>
          <h1 class="text-center text-2xl font-bold">🍻 Happy Hour Finder 🍻</h1>
          <div></div>
        </div>

        <search
          style="--max-cols: repeat({allTags.size > 0 ? 4 : 3}, minmax(0, 1fr))"
          class="bg-base-200 grid grid-cols-1 gap-2 rounded-lg p-2 md:grid-cols-3"
        >
          <div>
            <label class="label" for="search">Search</label>
            <input
              class="input w-full"
              name="search"
              type="text"
              placeholder="Enter venue name, city, or address..."
              bind:value={searchQuery}
            />
          </div>

          <div>
            <label class="label" for="day">Filter by day</label>
            <select class="select w-full" name="day" bind:value={selectedDay}>
              <option value={null}>Any day</option>
              {#each days as day (day)}
                <option value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>
              {/each}
            </select>
          </div>

          <div>
            <label class="label" for="price-range">Filter by price range</label>
            <select class="select w-full" name="price-range" bind:value={selectedPriceRange}>
              <option value={null}>Any price</option>
              {#each priceRanges as range (range.label)}
                <option value={range.label}>{range.label}</option>
              {/each}
            </select>
          </div>

          {#if allTags.size > 0}
            <div class="flex flex-col gap-2 md:row-span-3">
              <fieldset class="flex flex-wrap gap-2" name="tags">
                {#each allTags as tag (tag)}
                  <button
                    class="btn btn-xs {selectedTags.includes(tag) ? 'btn-primary' : 'btn-outline'}"
                    onclick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                {/each}
              </fieldset>
            </div>
          {/if}
        </search>
      </div>
    </div>
  </header>

  <main class="overflow-y-auto">
    <div class="container mx-auto px-2 py-8">
      {#if filteredVenues.length > 0}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {#each filteredVenues as venue (venue.slug)}
            <div class="card bg-base-100 shadow-xl">
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
                <a class="link-hover" href={`/venue/${venue.slug}`}>
                  <h2 class="card-title">{venue.name}</h2>
                </a>
                <p class="text-sm">{venue.address}, {venue.city}, {venue.region}</p>

                <div class="mt-2">
                  <h3 class="font-semibold">Happy Hours:</h3>
                  {#each venue.happyHours as hh (JSON.stringify(hh))}
                    <div class="bg-base-300 my-1 h-px w-full first-of-type:hidden"></div>
                    <div class="mt-1 text-sm">
                      <span class="font-medium"
                        >{hh.days
                          .map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3))
                          .join(', ')}</span
                      >
                      {#if hh.start || hh.end}
                        <span
                          >&ndash; ({hh.start ? formatTime(hh.start) : 'Open'} - {hh.end
                            ? formatTime(hh.end)
                            : 'Close'})</span
                        >
                      {:else}
                        <span>&ndash; All day</span>
                      {/if}
                      {#if hh.drinks && hh.drinks.length > 0}
                        <div class="mt-1">
                          <span class="font-medium">Drinks:</span>
                          <ul>
                            {#each hh.drinks as drink (drink.label)}
                              <li class="flex items-center justify-between gap-1">
                                <span>${drink.price} {drink.label}</span>
                                <span>{drinkTypeEmojis[drink.type] || '🥃'}</span>
                              </li>
                            {/each}
                          </ul>
                        </div>
                      {/if}
                      {#if hh.food && hh.food.length > 0}
                        <div class="mt-1">
                          <span class="font-medium">Food:</span>
                          <ul>
                            {#each hh.food as food (food.label)}
                              <li class="flex items-center justify-between gap-1">
                                <span>${food.price} {food.label}</span>
                                <span>{foodTypeEmojis[food.type] || '🍴'}</span>
                              </li>
                            {/each}
                          </ul>
                        </div>
                      {/if}
                    </div>
                  {/each}
                </div>

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
                  {#if venue.website}
                    <a
                      href={venue.website}
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

                <div class="card-actions mt-2 justify-end">
                  <a
                    href={`/venue/${venue.slug}`}
                    class="btn btn-primary btn-sm hover:bg-primary/80">View Details</a
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="py-8 text-center">
          <h3 class="text-xl font-semibold">No venues found</h3>
          <p class="text-gray-600">Try adjusting your search criteria</p>
        </div>
      {/if}
    </div>
  </main>

  <footer
    class="bg-base-200 z-10 shadow-[0_-4px_6px_-1px_rgb(0_0_0_/0.1),0_-2px_4px_-2px_rgb(0_0_0_/_0.1)]"
  >
    <div class="container mx-auto">
      <div class="grid place-items-center p-2">
        <p class="text-xs">
          Open source at <a
            class="link text-secondary-content hover:text-secondary-content/50"
            href="https://github.com/patsissons/happyhour.beer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  </footer>
</div>
