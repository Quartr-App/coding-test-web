import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, createContext, useContext } from "react";
import { Image, type ImageProps } from "@/components/image";
import { Text, type TextProps } from "@/components/text";
import { cn } from "@/website/styles/cn";
import { type UseHeadlessList, type UseHeadlessListProps, useHeadlessList } from "./use-headless-list";

function createListStateContext<T>() {
  return createContext<UseHeadlessList<T> | null>(null);
}

const ListStateContext = createListStateContext();

function useListStateContext() {
  const ctx = useContext(ListStateContext);
  if (!ctx) {
    throw new Error("List* components must be inside <List>");
  }
  return ctx;
}

const listVariants = cva(["space-y-4"], {
  defaultVariants: { ordered: false },
  variants: {
    ordered: {
      false: "list-disc",
      true: "list-decimal",
    },
  },
});

type ListProps<T> = UseHeadlessListProps<T> &
  VariantProps<typeof listVariants> & {
    orderType?: "1" | "A" | "a" | "I" | "i";
  } & (ComponentPropsWithoutRef<"ul"> | ComponentPropsWithoutRef<"ol">);

export function List<T>({ children, className, items, ordered = false, orderType, ...props }: ListProps<T>) {
  const api = useHeadlessList({ items });
  const Component = ordered ? "ol" : "ul";

  return (
    <ListStateContext value={api}>
      <Component className={cn(listVariants({ ordered }), className)} role="list" type={orderType} {...props}>
        {children}
      </Component>
    </ListStateContext>
  );
}

const listItemVariants = cva([], {
  variants: {
    divider: {
      default: "border-be border-zinc-950/10 pbe-4",
      soft: "border-be border-zinc-950/5 pbe-4",
    },
  },
});

type ListItemProps = VariantProps<typeof listItemVariants> & ComponentPropsWithoutRef<"li">;

export function ListItem({ children, divider, className, ...props }: ListItemProps) {
  const { getListItemProps } = useListStateContext();

  return (
    <li className={cn(listItemVariants({ divider }), className)} {...getListItemProps(props)}>
      {children}
    </li>
  );
}

export function ListItemImage({ width = 48, height = 48, className, ...props }: ImageProps) {
  return (
    <Image
      className={cn("block-12 inline-12 outline outline-offset-1 outline-black/10", className)}
      objectFit="contain"
      {...props}
      height={height}
      width={width}
    />
  );
}

export function ListItemTitle({ children, className, ...props }: TextProps) {
  return (
    <Text className={cn("font-medium text-inherit sm:text-base/6", className)} {...props}>
      {children}
    </Text>
  );
}

export function ListItemDetails({ children, className, ...props }: TextProps) {
  return (
    <Text className={cn("text-sm", className)} {...props}>
      {children}
    </Text>
  );
}

List.Item = ListItem;
List.ItemImage = ListItemImage;
List.ItemTitle = ListItemTitle;
List.ItemDetails = ListItemDetails;
