import { redirect } from 'react-router';

export function clientLoader() {
  return redirect('/blogs', 301);
}
clientLoader.hydrate = true;

export default function InsightsRedirect() {
  return null;
}
