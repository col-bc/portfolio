export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto max-w-5xl p-4 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Colby Cooper. All rights reserved.
      </div>
    </footer>
  );
}
