<script>
  // import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  // import QRCode from 'qrcode';
  import {
    defaultImg,
    formatId,
    fromGlobalId,
    loadImageToDataUri,
    loadAvatarDataUri,
  } from '$lib/utils';
  // export let yearKeywords = 'Web3-Matters';
  /** @type {import('./$types').PageData} */

  import backgroundUrl from '$lib/images/identity-background.png';

  export let userData;
  // export let userGraphData;
  export let el;
  export let alsoKnownAs;

  $: {
    console.log('received userData:', userData);
  }
  $: dateBirth = new Date(
    userData?.data?.user?.info?.createdAt ?? userData?.data?.createdAt ?? '2017-12-01',
  );
  $: displayName =
    (userData?.data?.user?.displayName ?? userData?.data?.displayName)?.trim() || '未知作者';
  $: numberId = fromGlobalId(userData?.data?.user?.id) ?? userData?.data?.id ?? 0;
  $: userName = userData?.data?.user?.userName ?? userData?.data?.userName ?? '';
  $: badges = userData?.data?.user?.info?.badges?.map(({ type }) => type) ?? userData?.data?.badges;
  $: badgesInfo = {
    traveloggers: userData?.data?.user?.info?.cryptoWallet?.hasNFTs || false,
    goldenMotor: badges?.includes('golden_motor') || false,
    seed: badges?.includes('seed') || false,
    architect: badges?.includes('architect') || false,
  };
  let badgesOffsetX = { traveloggers: 99, goldenMotor: 0, seed: 0, architect: 0 };
  $: {
    badgesOffsetX.goldenMotor = badgesOffsetX.traveloggers;
    if (badgesInfo.traveloggers) badgesOffsetX.goldenMotor += 267 - 99;
    badgesOffsetX.seed = badgesOffsetX.goldenMotor;
    if (badgesInfo.goldenMotor) badgesOffsetX.seed += 387 - 267;
    badgesOffsetX.architect = badgesOffsetX.seed;
    if (badgesInfo.seed) badgesOffsetX.architect += 523 - 387;
  }

  $: avatarImg = userData?.data?.user?.avatar ?? userData?.data?.avatar;
  let userImgDataUri, backgroundImgDataUri;
  $: if (browser) {
    if (avatarImg)
      loadAvatarDataUri(avatarImg).then((dataUri) => {
        userImgDataUri = dataUri;
      }),
        Promise.all([
          loadImageToDataUri(backgroundUrl).then((uri) => {
            backgroundImgDataUri = uri;
          }),
        ]);
  }
</script>

<svg
  viewBox="0 0 1200 754"
  preserveAspectRatio="xMidYMid meet"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  bind:this={el}
>
  <rect width="1200" height="754" fill="url(#pattern0)" />
  <rect
    x="847"
    y="200"
    width="256"
    height="256"
    rx="128"
    fill="url(#pattern1)"
    stroke="#333333"
    stroke-width="4"
  />
  <path
    d="M107.825 529.175C108.167 529.5 108.167 530.033 107.825 530.358C107.5 530.683 106.967 530.683 106.642 530.358C105.861 529.577 105.423 528.517 105.423 527.413C105.423 526.308 105.861 525.248 106.642 524.467L109.592 521.517C110.373 520.736 111.433 520.298 112.538 520.298C113.642 520.298 114.702 520.736 115.483 521.517C116.264 522.298 116.702 523.358 116.702 524.463C116.702 525.567 116.264 526.627 115.483 527.408L114.242 528.65C114.25 527.967 114.142 527.283 113.908 526.633L114.3 526.233C114.534 526.002 114.719 525.727 114.846 525.424C114.972 525.121 115.037 524.795 115.037 524.467C115.037 524.138 114.972 523.813 114.846 523.509C114.719 523.206 114.534 522.931 114.3 522.7C114.069 522.466 113.794 522.281 113.491 522.154C113.187 522.028 112.862 521.963 112.533 521.963C112.205 521.963 111.879 522.028 111.576 522.154C111.273 522.281 110.998 522.466 110.767 522.7L107.825 525.642C107.591 525.873 107.406 526.148 107.279 526.451C107.153 526.754 107.088 527.08 107.088 527.408C107.088 527.737 107.153 528.062 107.279 528.366C107.406 528.669 107.591 528.944 107.825 529.175ZM110.175 525.642C110.5 525.317 111.033 525.317 111.358 525.642C112.139 526.423 112.577 527.483 112.577 528.588C112.577 529.692 112.139 530.752 111.358 531.533L108.408 534.483C107.627 535.264 106.567 535.702 105.463 535.702C104.358 535.702 103.298 535.264 102.517 534.483C101.736 533.702 101.298 532.642 101.298 531.538C101.298 530.433 101.736 529.373 102.517 528.592L103.758 527.35C103.75 528.033 103.858 528.717 104.092 529.375L103.7 529.767C103.466 529.998 103.281 530.273 103.154 530.576C103.028 530.879 102.963 531.205 102.963 531.533C102.963 531.862 103.028 532.187 103.154 532.491C103.281 532.794 103.466 533.069 103.7 533.3C103.931 533.534 104.206 533.719 104.509 533.846C104.813 533.972 105.138 534.037 105.467 534.037C105.795 534.037 106.121 533.972 106.424 533.846C106.727 533.719 107.002 533.534 107.233 533.3L110.175 530.358C110.409 530.127 110.594 529.852 110.721 529.549C110.847 529.246 110.912 528.92 110.912 528.592C110.912 528.263 110.847 527.938 110.721 527.634C110.594 527.331 110.409 527.056 110.175 526.825C110.094 526.749 110.03 526.658 109.985 526.556C109.941 526.454 109.919 526.344 109.919 526.233C109.919 526.122 109.941 526.013 109.985 525.911C110.03 525.809 110.094 525.718 110.175 525.642Z"
    fill="#29BCA0"
  />
  <text
    fill="#333333"
    xml:space="preserve"
    style="white-space: pre"
    font-family="Noto Sans TC"
    font-size="20"
    letter-spacing="0em"><tspan x="127" y="536.4">本市住址</tspan></text
  >
  <text
    fill="#333333"
    xml:space="preserve"
    style="white-space: pre"
    font-family="Noto Sans TC"
    font-size="20"
    letter-spacing="0em"><tspan x="215" y="536.4">https://matters.town/@{userName}</tspan></text
  >
  <path
    d="M105.667 567.667C105.431 567.667 105.233 567.587 105.073 567.427C104.913 567.267 104.833 567.069 104.833 566.833C104.833 566.597 104.913 566.399 105.073 566.239C105.233 566.079 105.431 565.999 105.667 566C105.903 566 106.101 566.08 106.261 566.24C106.421 566.4 106.501 566.598 106.5 566.833C106.5 567.069 106.42 567.268 106.26 567.428C106.1 567.588 105.902 567.667 105.667 567.667ZM109 567.667C108.764 567.667 108.566 567.587 108.406 567.427C108.246 567.267 108.166 567.069 108.167 566.833C108.167 566.597 108.247 566.399 108.407 566.239C108.567 566.079 108.764 565.999 109 566C109.236 566 109.434 566.08 109.594 566.24C109.754 566.4 109.834 566.598 109.833 566.833C109.833 567.069 109.753 567.268 109.593 567.428C109.433 567.588 109.236 567.667 109 567.667ZM112.333 567.667C112.097 567.667 111.899 567.587 111.739 567.427C111.579 567.267 111.499 567.069 111.5 566.833C111.5 566.597 111.58 566.399 111.74 566.239C111.9 566.079 112.098 565.999 112.333 566C112.569 566 112.768 566.08 112.928 566.24C113.088 566.4 113.167 566.598 113.167 566.833C113.167 567.069 113.087 567.268 112.927 567.428C112.767 567.588 112.569 567.667 112.333 567.667ZM103.167 574.333C102.708 574.333 102.316 574.17 101.989 573.843C101.663 573.517 101.499 573.124 101.5 572.667V561C101.5 560.542 101.663 560.149 101.99 559.823C102.317 559.496 102.709 559.333 103.167 559.333H104V558.479C104 558.243 104.08 558.049 104.24 557.896C104.4 557.743 104.598 557.667 104.833 557.667C105.069 557.667 105.268 557.747 105.428 557.907C105.588 558.067 105.667 558.264 105.667 558.5V559.333H112.333V558.479C112.333 558.243 112.413 558.049 112.573 557.896C112.733 557.743 112.931 557.667 113.167 557.667C113.403 557.667 113.601 557.747 113.761 557.907C113.921 558.067 114.001 558.264 114 558.5V559.333H114.833C115.292 559.333 115.684 559.497 116.011 559.823C116.338 560.15 116.501 560.542 116.5 561V572.667C116.5 573.125 116.337 573.518 116.01 573.844C115.683 574.171 115.291 574.334 114.833 574.333H103.167ZM103.167 572.667H114.833V564.333H103.167V572.667ZM103.167 562.667H114.833V561H103.167V562.667Z"
    fill="#29BCA0"
  />
  <text
    fill="#333333"
    xml:space="preserve"
    style="white-space: pre"
    font-family="Noto Sans TC"
    font-size="20"
    letter-spacing="0em"><tspan x="127" y="574.4">進駐日期</tspan></text
  >
  <text
    fill="#333333"
    xml:space="preserve"
    style="white-space: pre"
    font-family="Noto Sans TC"
    font-size="20"
    letter-spacing="0em"
    ><tspan x="215" y="574.4"
      >{dateBirth.getFullYear()} 年 {dateBirth.getMonth() + 1} 月 {dateBirth.getDate()} 日</tspan
    ></text
  >

  {#if badgesInfo.traveloggers}
    <g transform={`translate(${badgesOffsetX.traveloggers},635)`}>
      <rect width="144" height="32" rx="16" fill="#333333" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        fill="url(#paint0_linear_1098_26)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.6217 21.9011H12.3012C11.1966 21.9011 10.3012 21.0059 10.3012 19.9013V15.8054C10.3012 14.8655 10.3925 13.9255 10.6737 13.0842C10.0102 12.4986 9.24787 11.6009 9.43043 10.8706C9.63133 10.067 11.1503 10.509 12.1828 10.9561C13.0094 10.3612 14.1781 10 15.8163 10C17.4295 10 18.6224 10.3502 19.4924 10.929C20.2157 10.4796 21.1705 10.0751 21.7785 10.4126C22.4622 10.7922 21.7697 12.019 21.1018 12.8968C21.4811 13.7848 21.6217 14.7951 21.6217 15.8054V19.9013C21.6217 21.0059 20.7263 21.9011 19.6217 21.9011ZM18.4286 15.5152C18.4286 16.7977 17.389 17.8373 16.1065 17.8373C14.824 17.8373 13.7843 16.7977 13.7843 15.5152C13.7843 14.2327 14.824 13.193 16.1065 13.193C17.389 13.193 18.4286 14.2327 18.4286 15.5152ZM16.9774 16.0957C17.4583 16.0957 17.8482 15.7058 17.8482 15.2249C17.8482 14.7439 17.4583 14.3541 16.9774 14.3541C16.4964 14.3541 16.1066 14.7439 16.1066 15.2249C16.1066 15.7058 16.4964 16.0957 16.9774 16.0957Z"
        fill="white"
      />
      <text
        fill="#F4F3EE"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Noto Sans TC"
        font-size="16"
        letter-spacing="0em"><tspan x="36" y="22.72">Traveloggers</tspan></text
      >
      <defs>
        <linearGradient
          id="paint0_linear_1098_26"
          x1="5.62162"
          y1="13.3"
          x2="26.7027"
          y2="13.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1CB0AB" />
          <stop offset="1" stop-color="#33A5C9" />
        </linearGradient>
      </defs>
    </g>
  {/if}

  {#if badgesInfo.goldenMotor}
    <g transform={`translate(${badgesOffsetX.goldenMotor},635)`}>
      <rect width="96" height="32" rx="16" fill="#333333" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        fill="#C0A46B"
      />
      <g clip-path="url(#clip0_1098_39)">
        <path
          d="M14.0158 9.09985H17.0458C17.2614 9.09985 17.4124 9.30967 17.3405 9.50882L15.5506 14.5622C15.4787 14.7613 15.6297 14.9711 15.8453 14.9711H19.666C20.3058 14.9711 20.7083 15.6575 20.3884 16.2051L15.8777 23.9434C15.6979 24.2528 15.2163 24.0607 15.3062 23.7158L16.7439 18.0294C16.7942 17.8339 16.6432 17.6454 16.442 17.6454H12.6644C11.8773 17.6454 11.3166 16.8915 11.5538 16.1482L13.7175 9.31678C13.7571 9.18876 13.8793 9.09985 14.0158 9.09985Z"
          fill="white"
        />
      </g>
      <text
        fill="#F4F3EE"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Noto Sans TC"
        font-size="16"
        letter-spacing="0em"><tspan x="36" y="22.72">金馬達</tspan></text
      >
      <defs>
        <clipPath id="clip0_1098_39">
          <rect width="9" height="15" fill="white" transform="translate(11.5 9.09985)" />
        </clipPath>
      </defs>
    </g>
  {/if}

  {#if badgesInfo.seed}
    <g transform={`translate(${badgesOffsetX.seed},635)`}>
      <rect width="112" height="32" rx="16" fill="#333333" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        fill="#F3D26E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 19.75L11.5916 22.0676L12.4335 17.1588L8.86708 13.6824L13.7958 12.9662L16 8.5L18.2042 12.9662L23.1329 13.6824L19.5665 17.1588L20.4084 22.0676L16 19.75Z"
        fill="white"
      />
      <text
        fill="#F4F3EE"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Noto Sans TC"
        font-size="16"
        letter-spacing="0em"><tspan x="36" y="22.72">種子用戶</tspan></text
      >
    </g>
  {/if}

  {#if badgesInfo.architect}
    <g transform={`translate(${badgesOffsetX.architect},635)`}>
      <rect width="144" height="32" rx="16" fill="#333333" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        fill="#DC752B"
      />
      <path
        d="M22.9775 20.4199C22.7529 20.6445 22.432 20.6887 22.2624 20.519L20.514 18.7706C20.3289 18.5856 19.979 18.6349 19.734 18.8798L18.899 19.7149C18.6537 19.9602 18.605 20.31 18.7898 20.4948L20.5382 22.2432C20.7076 22.4126 20.6621 22.733 20.4376 22.9575C20.3635 23.0316 20.2738 23.0894 20.1792 23.1241C18.9704 23.568 17.7996 23.411 17.0478 22.7039C16.2066 21.9133 16.0487 20.5336 16.6449 19.1891L16.6511 19.1749L12.8215 15.3453L12.8073 15.3515C11.4624 15.9481 10.0824 15.7899 9.29214 14.9489C8.58535 14.1968 8.42801 13.0263 8.87194 11.8176C8.90701 11.7226 8.96438 11.6333 9.03847 11.5592C9.26301 11.3347 9.58371 11.2894 9.75282 11.4586L11.5012 13.207C11.6863 13.392 12.0362 13.3427 12.2811 13.0978L13.1158 12.2631C13.3611 12.0178 13.4098 11.668 13.225 11.4832L11.4763 9.73451C11.3063 9.56454 11.3509 9.24393 11.5754 9.01939C11.6476 8.94719 11.7349 8.89076 11.8275 8.85634C13.073 8.39622 14.266 8.57088 15.0189 9.32374C15.8302 10.1351 15.9657 11.4636 15.3728 12.7911L15.3666 12.8053L19.1908 16.6295L19.205 16.6233C20.5325 16.0304 21.8613 16.1662 22.6724 16.9772C23.4252 17.7301 23.5999 18.9231 23.1398 20.1686C23.1055 20.2622 23.0504 20.3469 22.9775 20.4199Z"
        fill="white"
      />
      <text
        fill="#F4F3EE"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Noto Sans TC"
        font-size="16"
        letter-spacing="0em"><tspan x="36" y="22.72">馬特市建築師</tspan></text
      >
    </g>
  {/if}

  <g transform="translate(99,416)">
    <text
      fill="#333333"
      xml:space="preserve"
      style="white-space: pre"
      font-family="Noto Sans TC"
      font-size="28"
      font-weight="bold"
      letter-spacing="0em"><tspan>{displayName}</tspan></text
    >
  </g>
  {#if alsoKnownAs}
    <g transform="translate(99,452)">
      <text
        fill="#333333"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Noto Sans TC"
        font-size="20"
        font-weight="500"
        letter-spacing="0em"><tspan>{alsoKnownAs}</tspan></text
      >
    </g>
  {/if}

  <g transform="translate(99,328)">
    <rect width="260" height="40" rx="20" fill="#149880" />
  </g>
  <text
    fill="#F4F3EE"
    xml:space="preserve"
    style="white-space: pre"
    font-family="Noto Sans TC"
    font-size="20"
    letter-spacing="0em"><tspan x="115" y="355.4">市民編號</tspan></text
  >
  <text
    fill="#F4F3EE"
    xml:space="preserve"
    style="white-space: pre"
    font-family="Noto Sans TC"
    font-size="20"
    letter-spacing="0em"><tspan x="203" y="355.4">MTRS {formatId(numberId)}</tspan></text
  >

  <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use
        xlink:href="#image0_1098_7"
        transform="matrix(0.000244141 0 0 0.000388553 0 -0.000261625)"
      />
    </pattern>
    <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlink:href="#image1_1098_7" transform="translate(-0.0121183) scale(0.000484731)" />
    </pattern>
    <image
      id="image0_1098_7"
      width="4096"
      height="2575"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xlink:href={backgroundImgDataUri ?? backgroundUrl}
      preserveAspectRatio="xMinYMin slice"
    />
    <image
      id="image1_1098_7"
      width="2113"
      height="2063"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      href={userImgDataUri ?? defaultImg}
      xlink:href={userImgDataUri ?? defaultImg}
      preserveAspectRatio="xMinYMin slice"
    />
  </defs>
</svg>
