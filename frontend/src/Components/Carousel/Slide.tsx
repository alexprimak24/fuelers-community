import React, { useState } from "react";

interface SlideProps {
  imageUrl: string;
  title: string;
  contentUrl: string;
}

export default function Slide({ imageUrl, title, contentUrl }: SlideProps) {
  const [hover, setHover] = useState(false);
  const defaultShadow = "0 0 10px 7px var(--Default-green, #00F58C)";
  const hoverShadow = "0 0 5px 7px var(--Default-green, #00F58C)";

  return (
    <div className="flex flex-col gap-[10px] mx-[15px] mb-[7px] pt-[31px]">
      <a
        href={contentUrl}
        target="_blank"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className="transition-shadow duration-400 ease-in-out border-[4px] border-defaultgreen shadow-fancy hover:shadow-fancy-hover transition-shadow duration-300 ease-in-out rounded-lg"
        style={{
          height: "100%",
          boxShadow: hover ? hoverShadow : defaultShadow,
        }}
      >
        <img src={imageUrl} alt="" className="max-h-[420px] " />
      </a>
      <p className="text-defaultwhite text-opacity-50 text-2xl">{title}</p>
    </div>
  );
}

// const dbPost = await appwriteService.createPost({
//   title: data.title,
//   slug: data.slug,
//   content: data.content,
//   featuredImage: fileId,
//   status: data.status,
//   userId: userData.$id,
// });
