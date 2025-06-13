import { cn } from "@client/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Star, StarHalf } from "lucide-react";
import type React from "react";

const starRatingVariants = cva("text-yellow-400", {
  variants: {
    variant: {
      filled: "fill-yellow-400",
      half: "fill-yellow-400",
      empty: "fill-none",
    },
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    },
  },
  defaultVariants: {
    variant: "filled",
    size: "md",
  },
});

interface StarRatingProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof starRatingVariants> {
  rating: number;
  maxRating?: number;
}

function StarRating({
  rating,
  maxRating = 5,
  className,
  size,
  ...props
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`star-${i}`} className={starRatingVariants({ size })} />
      ))}

      {hasHalfStar && (
        <div className="relative">
          <StarHalf
            className={cn(
              "absolute inset-0",
              starRatingVariants({ variant: "half", size }),
            )}
          />
          <Star
            className={cn(
              "inset-0",
              starRatingVariants({ variant: "empty", size }),
            )}
          />
        </div>
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-star-${i}`}
          className={starRatingVariants({ variant: "empty", size })}
        />
      ))}
    </div>
  );
}

export { StarRating };
