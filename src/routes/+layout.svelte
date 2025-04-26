<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div data-theme="light" class="min-h-dvh max-w-dvw overflow-x-clip">
  {@render children()}
</div>
