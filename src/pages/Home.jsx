import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section px-4 md:px-8 lg:px-16 py-12 text-center">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold py-6">
        Shop Everything you need <span className="text-indigo-700">online</span> from us
      </h1>
      <div className="mx-auto w-fit pb-6">
        <Button variant="outline">Get Started</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
        <Card className="min-w-[250px] h-80 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="https://us.tonies.com/cdn/shop/files/Tonies-PDP-Assets-headphones-green-main.jpg?v=1713251407&width=3000"
            alt=""
          />
        </Card>
        <Card className="min-w-[250px] h-80 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="https://purplesecret.in/cdn/shop/files/TBAG00422_1.jpg?v=1710245990"
            alt=""
          />
        </Card>
        <Card className="min-w-[250px] h-80 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </Card>
        <Card className="min-w-[250px] h-80 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="https://www.atulhost.com/wp-content/uploads/2024/07/best-laptop-brands.jpg"
            alt=""
          />
        </Card>
      </div>
    </section>
      {/* Section 2 */}
      <section>
        <div className="bg-gray-50 dark:bg-slate-700 py-24 sm:py-32 rounded-md">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base/7 font-semibold text-indigo-600">
              Trusted products
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 dark:text-white sm:text-5xl">
              Everything you need, we have
            </p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Easy Returns
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </p>
                  </div>
                  <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw]  border-gray-700 bg-gray-900 shadow-2xl">
                      <img
                        className="size-full object-cover object-top"
                        src="https://plus.unsplash.com/premium_photo-1676559916183-d4033c0b51ed?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
              </div>
              <div className="relative max-lg:row-start-1">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Quick Delivery
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit
                      maiores impedit.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                    <img
                      className="w-full rounded max-lg:max-w-xs "
                      src="https://plus.unsplash.com/premium_photo-1673460448921-9126847f12b8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
              </div>
              <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                <div className="absolute inset-px rounded-lg bg-white"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Security
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                      suspendisse semper morbi.
                    </p>
                  </div>
                  <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                    <img
                      className="h-[min(152px,40cqw)] object-cover"
                      src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
              </div>
              <div className="relative lg:row-span-2">
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
                  <img
                    className="h-full object-cover"
                    src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
