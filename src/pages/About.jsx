import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import React from "react";

function About() {
  return (
    <section className="px-4 md:px-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-2xl font-bold tracking text-center text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <p className="font-light sm:text-lg">
            At EzShop, we are a diverse team of passionate professionals, each bringing
            unique talents and expertise to deliver exceptional service. Together, we are
            committed to building the best eCommerce experience for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent>
              <CardHeader>
                <img
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  alt="Team Member 1"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-white">Jane Doe</h3>
              </CardHeader>
              <p className="text-primary font-semibold">CEO & Founder</p>
              <p className="mt-4 text-gray-600 text-sm">
                Jane brings over 10 years of leadership experience in the tech industry. Her vision
                is to create an innovative, user-centric eCommerce platform that empowers both
                merchants and customers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <CardHeader>
                <img
                  src="https://media.istockphoto.com/id/1372641618/photo/portrait-of-a-businessman-on-gray-background.jpg?s=612x612&w=0&k=20&c=dr9mAhOR4Nu826FRDcMojzObpbswEEMMGrWoLA2iz4w="
                  alt="Team Member 1"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-white">Jane Doe</h3>
              </CardHeader>
              <p className="text-primary font-semibold">CEO & Founder</p>
              <p className="mt-4 text-gray-600 text-sm">
                Jane brings over 10 years of leadership experience in the tech industry. Her vision
                is to create an innovative, user-centric eCommerce platform that empowers both
                merchants and customers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <CardHeader>
                <img
                  src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg"
                  alt="Team Member 1"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl text-center font-semibold text-gray-800 dark:text-white">Jane Doe</h3>
              </CardHeader>
              <p className="text-primary font-semibold">CEO & Founder</p>
              <p className="mt-4 text-gray-600 text-sm">
                Jane brings over 10 years of leadership experience in the tech industry. Her vision
                is to create an innovative, user-centric eCommerce platform that empowers both
                merchants and customers.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Mission</h3>
          <p className="font-light text-gray-700">
            At EzShop, our mission is to revolutionize the way eCommerce works. We aim to provide
            a seamless shopping experience for users and create a reliable, efficient platform for
            merchants to grow their businesses. We believe in innovation, quality, and customer
            satisfaction.
          </p>
        </div>
      </div>
      <footer className="text-center py-4 text-gray-900 dark:text-gray-400">
        @EzShop All rights Reserved! 2025
      </footer>
    </section>
  );
}

export default About;
