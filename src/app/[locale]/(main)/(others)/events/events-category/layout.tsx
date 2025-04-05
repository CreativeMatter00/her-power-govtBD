import CategorySidebar from "@/components/events/eventsCategory/CategorySidebar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <section className="container p-4">
      <main className="pt-24">
        <p className="text-3xl text-brandPrimary">Events Category</p>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-[20%]">
            <CategorySidebar />
          </div>
          <div className="mt-4 w-[80%]">{children}</div>
        </div>
      </main>
    </section>
  );
}

export default layout;
