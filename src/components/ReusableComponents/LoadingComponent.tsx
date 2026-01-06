export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-background inset-0 fixed">
        <div className="rounded-full border-primary border-t-transparent border-4 w-10 h-10 animate-spin"></div>
        <h1 className="font-header-font font-semibold text-3xl mt-7">Loading decks...</h1>
        <p className=" !text-sm dark:text-foreground/80">This may take a while.</p>
    </div>
  )
}
