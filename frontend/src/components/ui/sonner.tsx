import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      style={{ fontFamily: "inherit", overflowWrap: "anywhere" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-background text-foreground border-foreground border-2 border-r-8 border-b-8 font-body shadow-lg rounded-lg text-sm flex items-center gap-2.5 p-4 w-[356px] [&:has(button)]:justify-between",
          description: "font-body text-muted-foreground",
          actionButton:
            "font-body border-2 border-r-4 border-b-4 text-xs h-6 px-2 bg-primary text-primary-foreground border-foreground rounded shrink-0",
          cancelButton:
            "font-body border-2 border-r-4 border-b-4 text-xs h-6 px-2 bg-muted text-muted-foreground border-foreground rounded shrink-0",
          error: "bg-destructive text-destructive-foreground border-destructive",
          success: "bg-primary text-primary-foreground border-primary",
          warning: "bg-accent text-accent-foreground border-accent",
          loading:
            "[&[data-sonner-toast]_[data-icon]]:flex [&[data-sonner-toast]_[data-icon]]:size-4 [&[data-sonner-toast]_[data-icon]]:relative [&[data-sonner-toast]_[data-icon]]:justify-start [&[data-sonner-toast]_[data-icon]]:items-center [&[data-sonner-toast]_[data-icon]]:flex-shrink-0",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
