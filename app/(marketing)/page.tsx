import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2"
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ]
});

const MarketingPage = () => {
  return (
    <div
      className="flex items-center justify-center flex-col h-screen w-screen"
      style={{
        backgroundImage: `url('https://th.bing.com/th/id/R.9f5c3a0c047650b5ee3add01ad021cc7?rik=ek82priMHw90Lg&riu=http%3a%2f%2fphotos.fleetmon.com%2fvessels%2fnyk-hawk_9741413_1725795_Large.jpg&ehk=UQsyK2zW3%2fl3e5m9KfD3ZhKrF5N5TcnTNYE2eBu%2fUCM%3d&risl=&pid=ImgRaw&r=0')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        padding: 30,
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className 
        )}
      >
        <h1
          className="text-5xl md:text-6xl text-center text-neutral-800 mb-6"
          style={{
            marginTop: -100,
            color: "#F8FBFF",
            fontFamily: "helvetica",
            fontWeight: 1000,
            width: '100vw',
            textShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)', // Adding text shadow for stroke effect
          }}
        >
          NYK-FIL MARITIME E-TRAINING, INC.
        </h1>
        <div
          className={cn(
            "text-3xl md:text-5xl bg-gradient-to-r from-blue-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit",
            "relative z-1" // Add relative positioning and z-index
          )}
          style={{
            fontFamily: "Verdana",
            textShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
            fontWeight: 550,
            opacity: .9, // Adding text shadow for stroke effect
          }}
        >
           Ensuring Sea Safety
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
        style={{
          color: 'WHITE',
          fontFamily: "helvetica",
          textShadow: '2px 2px 2px rgba(1, 1, 1, 10)', // Adding text shadow for stroke effect
        }}
      >
        Leading provider of world-class merchant marine personnel for NYK Line 
      </div>
    </div>
  );
};

export default MarketingPage;
