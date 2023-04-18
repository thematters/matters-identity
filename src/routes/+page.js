// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

import { loadUserData, loadViewerData } from '$lib/utils';

// import moment from 'moment';

/** @type {import('./$types').PageLoad} */
export async function load({ url, route, params, fetch }) {
  // console.log('from url:', url, Object.fromEntries(url.searchParams.entries()));
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const year = Number.parseInt(url.searchParams.get('year'), 10) || 2023;

  const viewerData = await loadViewerData(searchParams?.userName, fetch);
  console.log('fetched viewerData:', viewerData, viewerData?.errors);

  return {
    // year,
    searchParams, // : Object.fromEntries(url.searchParams.entries()),
    ...(await loadUserData(searchParams?.userName ?? 'hi176', year, fetch)),
    ...viewerData,
  };
}
