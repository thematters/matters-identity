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

  let userName = data?.searchParams?.userName?.trim()?.replace(/^@+/, '');

  // let yearKeywords = data?.searchParams?.yearKeywords || 'Web3 Matters';
  let alsoKnownAs = data?.searchParams?.aka || '';
  $: displayName = (data?.data?.user?.displayName ?? data?.data?.displayName)?.trim() || '';

  let dataSvgEl;
  async function downloadAsPng(event) {
    // console.log('event is:', event, dataSvgEl, data);
    const blob = await rasterize(dataSvgEl, { scale: 1.25, width: 1200, height: 754 });
    // const blob = await rasterize(dataSvgEl, { scale: 2, width: 3000, height: 1885 });
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
        userName = viewerData?.data?.user?.userName || '';
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

<h1>{PUBLIC_SITE_DESCRIPTION}</h1>
<section>
  <div id="frame">
    {#if data?.searchParams?.userName}
      <MattersIdentity userData={data} {alsoKnownAs} bind:el={dataSvgEl} />
    {:else}
      <form data-sveltekit-reload>
        <div class="row">
          <!-- <label for="userName">用戶名 (@userName):</label> -->
          <input
            type="text"
            name="userName"
            id="userName"
            size={20}
            maxlength={20}
            placeholder="Enter your userName from Matters.Town/@userName"
            pattern="[A-z0-9À-ž]+"
            min-length="2"
            bind:value={userName}
          />
        </div>
        <div class="row">
          <!-- <label for="alsoKnownAs">Also Known As:</label> -->
          <input
            type="text"
            name="aka"
            id="alsoKnownAs"
            size={20}
            maxlength={20}
            placeholder="also known as"
            bind:value={alsoKnownAs}
          />
        </div>
        <div class="row flex-1">
          <button type="submit" class="btn">Enter</button>
        </div>
      </form>
    {/if}
  </div>

  {#if data?.searchParams?.userName}
    <div class="row flex-1">
      <div class="download-links">
        <button class="btn" on:click={downloadAsPng}>下載截圖</button>
      </div>
    </div>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  div#frame {
    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 2 / 1;
    width: 100%;
    /* background: teal; */
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 0.5rem 0;
  }
  @media (min-width: 768px) {
    form {
      flex-direction: row;
      justify-content: space-evenly;
    }
    form .row {
      justify-content: center;
    }
  }
  form .row input {
    font-size: 1.1rem;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    width: 28rem;
    border: 1px solid black;
    border-radius: 0.5rem;
  }
  form .row input:focus {
    outline: none !important;
    border: 1px solid red;
    box-shadow: 0 0 10px #278e7b;
  }
  .flex-1 {
    flex: 0 0 100%;
  }

  button.btn {
    border: 1px solid black;
    border-radius: 0.5rem;
    box-sizing: content-box;
    background-color: white;
    color: black;
    padding: 0.5rem 1rem;
    font-size: 16px;
    cursor: pointer;
    width: 28rem;
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
