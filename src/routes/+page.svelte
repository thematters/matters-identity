<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  // import { browser } from '$app/environment';

  // import { title, description, keywords, canonicalOrigin } from '$lib/consts';
  import {
    PUBLIC_CANONICAL_ORIGIN,
    PUBLIC_SITE_DESCRIPTION,
    PUBLIC_SITE_NAME,
  } from '$env/static/public';
  import MattersIdentity from './MattersIdentity.svelte';

  import { loadViewerData, rasterize } from '$lib/utils';

  /** @type {import('./$types').PageData} */
  export let data;

  let userName = data?.searchParams?.userName;

  // let yearKeywords = data?.searchParams?.yearKeywords || 'Web3 Matters';
  let alsoKnownAs = data?.searchParams?.aka || '';
  $: displayName =
    (data?.data?.user?.displayName ?? data?.data?.displayName)?.trim() || '未找到作者';

  let dataSvgEl;
  async function downloadAsPng(event) {
    // console.log('event is:', event, dataSvgEl, data);
    const blob = await rasterize(dataSvgEl, { scale: 1.25, width: 1200, height: 754 });
    // console.log(`got blob:`, blob);
    const blobUrl = URL.createObjectURL(blob);
    // console.log('got blobUrl:', blobUrl);
    const link = document.createElement('a');
    link.download = `${displayName ?? 'untitled'}.png`;
    link.href = blobUrl;
    link.click();
    // always revoke, avoid leaking
    URL.revokeObjectURL(blobUrl);
  }

  $: shareUrl = `${PUBLIC_CANONICAL_ORIGIN}/${$page.url.search}`;
  $: updatedTitle = PUBLIC_SITE_NAME + (displayName ? ` - ${displayName.trim()}` : '');

  let viewerData;
  onMount(() => {
    (async function () {
      if (!userName) {
        viewerData = await loadViewerData();
        console.log('no input, fetch viewer data:', viewerData);
      }
    })();
  });
</script>

<svelte:head>
  <title>{updatedTitle}</title>
  <meta name="description" content={PUBLIC_SITE_DESCRIPTION} />
  <meta name="keywords" content={'matters,identity'} />
  <meta property="og:title" content={updatedTitle} />
  <meta property="og:description" content={PUBLIC_SITE_DESCRIPTION} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={`${PUBLIC_CANONICAL_ORIGIN}/img/screenshot.png`} />
  <meta property="og:url" content={shareUrl} />
  <meta property="twitter:title" content={updatedTitle} />
  <meta property="twitter:description" content={PUBLIC_SITE_DESCRIPTION} />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content={`${PUBLIC_CANONICAL_ORIGIN}/img/screenshot.png`} />
  <meta property="twitter:url" content={shareUrl} />
  <meta property="meta:userDescription" content={`${data?.user?.info?.description}`} />
  <link rel="canonical" href={shareUrl} />
</svelte:head>

<section>
  <MattersIdentity userData={userName ? data : viewerData} {alsoKnownAs} bind:el={dataSvgEl} />

  <div class="row flex-1">
    <div class="download-links">
      <button class="btn" on:click={downloadAsPng}>下載截圖</button>
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 0.5rem 0;
  }

  button.btn {
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: white;
    color: black;
    padding: 0.5rem 1rem;
    font-size: 16px;
    cursor: pointer;
    width: 20rem;
    border-color: #ccc;
    color: #278e7b;
  }
  button.btn:hover {
    background-color: #278e7b;
    color: white;
  }
  .download-links {
    margin-bottom: 1rem;
  }
</style>
