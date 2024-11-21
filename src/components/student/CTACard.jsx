import { ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";

export default function CTACard() {
  return (
    <div className="relative w-full md:w-1/3 mx-auto p-6 rounded-lg bg-gradient-to-r from-primary to-secondary">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-opacity-90 bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]"></div>
      <div className="absolute inset-0 bg-black opacity-10 z-[2] rounded-lg"></div>

      <div className="relative z-10 text-white">
        {/* Course Information */}
        <div className="p-4">
          <h3 className="text-2xl font-bold mb-4">Start Learning Today!</h3>
          <p className="text-md mb-6">
            Get access to a wide variety of courses. Learn from experts,
            collaborate with peers, and boost your career.
          </p>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <Button variant="secondary" size="lg">
              <ShoppingBasket className="mr-2" />
              Buy Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
