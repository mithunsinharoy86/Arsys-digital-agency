import { redirect, type LoaderFunctionArgs } from 'react-router';

export function loader({ params }: LoaderFunctionArgs) {
  return redirect(`/blogs/${params.slug || ''}`, 301);
}

export default function InsightDetailRedirect() {
  return null;
}
