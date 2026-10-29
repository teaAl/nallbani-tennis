// Re-mounts on every navigation, so each public page fades and rises in.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
