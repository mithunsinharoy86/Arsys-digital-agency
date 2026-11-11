import { redirect, type LoaderFunctionArgs } from 'react-router';

export function clientLoader({ params }: LoaderFunctionArgs) {
  const safeSlug = (params.slug || '').replace(/[^a-zA-Z0-9-_]/g, '');
  return redirect(`/blogs/${safeSlug}`, 301);
}
clientLoader.hydrate = true;

export default function InsightDetailRedirect() {
  return null;
}
