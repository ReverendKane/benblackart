import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";

const pages = [{ name: "About", href: "/about", current: true }];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
        <BreadcrumbNavigation pages={pages} />
        <div
          id="contentBlock"
          className="flex flex-col w-full max-w-[820px] mx-auto mt-[30px]"
        >
          <div
            id="aboutText"
            className="flex font-sans text-[12pt] mobile:text-[10pt] text-[#333] mx-[10px]"
          >
            <p>
              I would describe myself as fine artist, illustrator, programmer,
              and 3d technical artist based out of Aliso Viejo, California.
              While working for decades in the fields of advertising,
              web/technology, and gaming, I also regularly spent much of my free
              time creating fine art at night and on the weekends. For about a
              ten year span starting in the late 2000s I took part in many group
              shows in the Los Angeles area, culminating in my first one man
              show in a small gallery that was around for a very short time in
              downtown LA. After this show, life pulled me away from art outside
              of what I was creating for my career. Many years later, I have
              been drawn back to art, and decided that I should invest in an
              etching press and some 2d/3d printing equipment, the goal being to
              get back in touch with my creative side and to put my work up for
              sale online. I’m not sure what will materialize, but I’m hoping in
              this coming age of AI that there will still be interest out there
              for human created art that required skill and effort to create.
            </p>
          </div>
          <div
            id="imageWithCaption"
            className="flex flex-col items-center justify-center w-full my-[40px]"
          >
            <div
              id="pictureOfMe"
              className="flex items-center justify-center w-full "
            >
              <Image
                src="/images/personal/studio.jpg"
                width={800}
                height={598}
                alt="Studio"
              />
            </div>
            <div
              id="imageCaption"
              className="font-sans text-[10pt] text-[#333] mx-[10px] mt-[5px]"
            >
              Me with some of my art in the studio.
            </div>
          </div>
          <FaqSection />
        </div>
      </div>
    </div>
  );
}
