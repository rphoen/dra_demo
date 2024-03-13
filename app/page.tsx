import * as React from "react";

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // <React.Suspense
    //   fallback={<DataTableSkeleton columnCount={4} filterableColumnCount={2} />}
    // ></React.Suspense>
    <div></div>
  );
}
