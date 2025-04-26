<script lang="ts">
  import { page } from '$app/state';
  import '../app.css';

  let { children } = $props();

  // Default metadata
  const defaultTitle = 'Happy Hour Finder - Find the Best Happy Hours Near You';
  const defaultDescription =
    'Discover the best happy hour deals at bars and restaurants near you. Search by location, day, price range, and more.';
  const defaultImage = '/images/og-image.jpg'; // We'll create this image

  // Get current page metadata or use defaults
  let title = $derived(page.data.title || defaultTitle);
  let description = $derived(page.data.description || defaultDescription);
  let image = $derived(page.data.image || defaultImage);
  let url = $derived(page.url.href);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- OpenGraph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={image} />
</svelte:head>

<div data-theme="light" class="min-h-dvh max-w-dvw overflow-x-clip">
  {@render children()}
</div>
