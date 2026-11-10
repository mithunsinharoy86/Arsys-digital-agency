import { redirect } from 'react-router';

export function loader() {
  return redirect('/blogs', 301);
}

export function clientLoader() {
  return redirect('/blogs', 301);
}

export default function InsightsRedirect() {
  return null;
}
